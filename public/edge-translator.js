"use strict";

const statusElement = document.querySelector("#edgeTranslationStatus");
const progressElement = document.querySelector("#edgeTranslationProgress");
const startButton = document.querySelector("#startEdgeTranslation");
const closeButton = document.querySelector("#closeEdgeTranslation");
const token = new URLSearchParams(window.location.search).get("token") || "";
let taskFinished = false;

function setStatus(message, progress) {
  statusElement.textContent = String(message || "");
  if (Number.isFinite(progress)) {
    progressElement.style.width = `${Math.min(100, Math.max(8, progress))}%`;
  }
}

function edgeLanguageCode(code) {
  return code === "zh" ? "zh-Hans" : code;
}

function translatedText(value) {
  if (typeof value === "string") return value.trim();
  if (!value || typeof value !== "object") return "";
  return String(value.translatedText || value.translation || value.text || "").trim();
}

async function jobRequest(options = {}) {
  const response = await fetch(
    `/api/edge-translation-jobs?token=${encodeURIComponent(token)}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );
  const payload = await response.json();
  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || "Edge 翻译任务通信失败");
  }
  return payload;
}

async function reportRunning(message) {
  setStatus(message);
  await jobRequest({
    method: "POST",
    body: JSON.stringify({ status: "running", message }),
  });
}

async function translateStreaming(session, sourceText) {
  if (typeof session.translateStreaming !== "function") return "";
  const stream = await session.translateStreaming(sourceText);
  let result = "";
  for await (const chunk of stream) result += translatedText(chunk);
  return result.trim();
}

function translatorOptions(sourceLanguage, targetLanguage) {
  return {
    sourceLanguage,
    targetLanguage,
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (event) => {
        const progress = event.total > 0
          ? Math.round((event.loaded / event.total) * 100)
          : 12;
        setStatus(`Edge 正在准备语言模型：${progress}%`, progress);
      });
    },
  };
}

function createTranslatorFromUserGesture(options, availability) {
  return new Promise((resolve, reject) => {
    startButton.hidden = false;
    startButton.disabled = false;
    startButton.textContent =
      availability === "downloading"
        ? "继续准备并开始翻译"
        : "下载语言模型并开始翻译";
    startButton.addEventListener(
      "click",
      () => {
        startButton.disabled = true;
        startButton.textContent = "正在准备语言模型…";
        let creation;
        try {
          // 必须在点击事件内立即调用 create，Edge 才会接受模型下载手势。
          creation = globalThis.Translator.create(options);
        } catch (error) {
          reject(error);
          return;
        }
        setStatus("Edge 正在准备当前语言模型，请保持此窗口打开…", 12);
        void jobRequest({
          method: "POST",
          body: JSON.stringify({
            status: "running",
            message: "已确认下载，Edge 正在准备当前语言模型…",
          }),
        }).catch(() => {});
        Promise.resolve(creation).then(resolve, reject);
      },
      { once: true }
    );
  });
}

async function runEdgeTranslation() {
  if (!token) throw new Error("缺少 Edge 翻译任务凭证");
  if (
    !globalThis.Translator ||
    typeof globalThis.Translator.availability !== "function" ||
    typeof globalThis.Translator.create !== "function"
  ) {
    throw new Error("当前 Microsoft Edge 没有提供本机 Translator 接口，请确认 Edge 版本及本机翻译能力");
  }

  const job = await jobRequest();
  const sourceLanguage = edgeLanguageCode(job.sourceLanguage);
  const targetLanguage = edgeLanguageCode(job.targetLanguage);
  await reportRunning("正在检查 Edge 的当前语言模型…");
  const availability = await globalThis.Translator.availability({
    sourceLanguage,
    targetLanguage,
  });
  if (availability === "unavailable") {
    throw new Error("Edge 不支持当前语言组合");
  }

  const options = translatorOptions(sourceLanguage, targetLanguage);
  let session;
  if (availability === "downloadable" || availability === "downloading") {
    await reportRunning("首次使用需要在 Edge 弹窗中点击“下载并开始翻译”…");
    session = await createTranslatorFromUserGesture(options, availability);
  } else {
    await reportRunning("Edge 语言模型已就绪，正在建立本机会话…");
    session = await globalThis.Translator.create(options);
  }
  startButton.hidden = true;

  try {
    setStatus("Edge 正在本机翻译…", 86);
    let result = translatedText(await session.translate(job.sourceText));
    if (!result) result = await translateStreaming(session, job.sourceText);
    if (!result) throw new Error("Edge 已建立本机会话，但没有生成译文");
    await jobRequest({
      method: "POST",
      body: JSON.stringify({
        status: "complete",
        translatedText: result,
        model: `${sourceLanguage}->${targetLanguage}`,
      }),
    });
    taskFinished = true;
    setStatus("翻译已完成，译文正在返回纸上寻踪。窗口即将自动关闭。", 100);
    window.setTimeout(() => window.close(), 650);
  } finally {
    if (typeof session.destroy === "function") {
      try {
        session.destroy();
      } catch {
        // 翻译结果已经回传时，不让会话清理错误覆盖结果。
      }
    }
  }
}

runEdgeTranslation().catch(async (error) => {
  const message = error?.message || "Edge（弹窗）翻译未完成";
  setStatus(message, 100);
  if (!token) return;
  try {
    await jobRequest({
      method: "POST",
      body: JSON.stringify({ status: "error", error: message }),
    });
    taskFinished = true;
  } catch {
    // 主窗口轮询会处理任务通信失败。
  }
});

closeButton.addEventListener("click", () => window.close());

window.addEventListener("pagehide", () => {
  if (taskFinished || !token) return;
  const payload = new Blob(
    [JSON.stringify({ status: "error", error: "Edge 翻译窗口已关闭" })],
    { type: "application/json" }
  );
  navigator.sendBeacon(
    `/api/edge-translation-jobs?token=${encodeURIComponent(token)}`,
    payload
  );
});
