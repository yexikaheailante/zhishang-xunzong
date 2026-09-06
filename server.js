"use strict";

const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFile, spawn } = require("child_process");
const { URL } = require("url");
const { normalizeDate, parseFilename } = require("./filename-parser");

const HOST = "127.0.0.1";
const APP_VERSION = "1.0.0";
const PORT = Number.parseInt(
  process.env.HISTORICAL_WORKBENCH_PORT || "32382",
  10
);
const UMI_OCR_BASE = "http://127.0.0.1:1224";
const APP_DIR = __dirname;
const OCR_RUNTIME_DIR = path.join(
  process.env.LOCALAPPDATA || APP_DIR,
  "HistoricalWorkbench"
);
const OCR_SETTINGS_PATH = path.join(OCR_RUNTIME_DIR, "ocr-settings.json");
const CLOUD_OCR_SETTINGS_PATH = path.join(
  OCR_RUNTIME_DIR,
  "cloud-ocr-settings.json"
);
const AI_SENTENCE_SETTINGS_PATH = path.join(
  OCR_RUNTIME_DIR,
  "ai-sentence-settings.json"
);
const TRANSLATION_SETTINGS_PATH = path.join(
  OCR_RUNTIME_DIR,
  "translation-settings.json"
);
const APP_SETTINGS_PATH = path.join(
  OCR_RUNTIME_DIR,
  "app-settings.json"
);
const ARGOS_RUNTIME_DIR = path.join(APP_DIR, "translation", "argos-runtime");
const ARGOS_PACKAGES_DIR = path.join(
  APP_DIR,
  "translation",
  "argos-packages"
);
const ARGOS_CACHE_DIR = path.join(APP_DIR, "translation", "argos-cache");
const ARGOS_PACKAGES_RELATIVE_DIR = path.join(
  "translation",
  "argos-packages"
);
const ARGOS_CACHE_RELATIVE_DIR = path.join("translation", "argos-cache");
const ARGOS_BRIDGE_PATH = path.join(APP_DIR, "translation", "argos_bridge.py");
const PUBLIC_DIR = path.join(APP_DIR, "public");
const DATA_DIR = path.join(APP_DIR, "data");
const STATE_PATH =
  process.env.HISTORICAL_WORKBENCH_DESKTOP === "1"
    ? path.join(OCR_RUNTIME_DIR, "app_state.json")
    : path.join(DATA_DIR, "app_state.json");
const TEST_LIBRARY = path.join(APP_DIR, "测试资料库");
const TEST_LIBRARY_MARKER = ".historical_library_test";
const LIBRARY_MARKER = ".historical_library";
const LIBRARY_DATA_FOLDER = ".historical-workbench";
const LIBRARY_DATA_FILE = "metadata.json";
const DEFAULT_SCREENSHOT_FOLDER = path.join(
  LIBRARY_DATA_FOLDER,
  "screenshots"
);
const SUPPORTED = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".pdf",
  ".tif",
  ".tiff",
  ".bmp",
  ".webp",
]);

const AI_SENTENCE_PROVIDER_PRESETS = {
  qwen: {
    name: "千问",
    protocol: "chat-completions",
    endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    authMode: "bearer",
    model: "qwen-plus",
  },
  claude: {
    name: "Claude",
    protocol: "anthropic-messages",
    endpoint: "https://api.anthropic.com/v1/messages",
    authMode: "x-api-key",
    model: "claude-sonnet-5",
  },
  deepseek: {
    name: "DeepSeek",
    protocol: "chat-completions",
    endpoint: "https://api.deepseek.com/chat/completions",
    authMode: "bearer",
    model: "deepseek-v4-flash",
  },
};

const TRANSLATION_PROVIDER_PRESETS = {
  qwen: {
    name: "千问",
    protocol: "chat-completions",
    endpoint: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    authMode: "bearer",
    model: "qwen-plus",
  },
  claude: {
    name: "Claude",
    protocol: "anthropic-messages",
    endpoint: "https://api.anthropic.com/v1/messages",
    authMode: "x-api-key",
    model: "claude-sonnet-5",
  },
  deepseek: {
    name: "DeepSeek",
    protocol: "chat-completions",
    endpoint: "https://api.deepseek.com/chat/completions",
    model: "deepseek-v4-flash",
  },
};

function loadAppSettings() {
  try {
    const parsed = JSON.parse(fs.readFileSync(APP_SETTINGS_PATH, "utf8"));
    return {
      lastLibrary:
        typeof parsed?.lastLibrary === "string" ? parsed.lastLibrary : "",
    };
  } catch {
    return { lastLibrary: "" };
  }
}

function initialLibraryPath() {
  const environmentLibrary = String(
    process.env.HISTORICAL_WORKBENCH_LIBRARY || ""
  ).trim();
  if (environmentLibrary && fs.existsSync(environmentLibrary)) {
    return path.resolve(environmentLibrary);
  }
  const savedLibrary = loadAppSettings().lastLibrary;
  if (savedLibrary && fs.existsSync(savedLibrary)) {
    return path.resolve(savedLibrary);
  }
  if (
    process.env.HISTORICAL_WORKBENCH_DESKTOP !== "1" &&
    fs.existsSync(TEST_LIBRARY)
  ) {
    return TEST_LIBRARY;
  }
  return path.join(OCR_RUNTIME_DIR, "尚未选择资料库");
}

function rememberCurrentLibrary() {
  if (!currentLibrary || !fs.existsSync(currentLibrary)) return;
  fs.mkdirSync(OCR_RUNTIME_DIR, { recursive: true });
  fs.writeFileSync(
    APP_SETTINGS_PATH,
    JSON.stringify({ lastLibrary: currentLibrary }, null, 2),
    "utf8"
  );
}

let currentLibrary = initialLibraryPath();
let libraryModel = null;
let state = loadAppState();
const folderImportSessions = new Map();
const edgeTranslationJobs = new Map();
const EDGE_TRANSLATION_JOB_TTL = 20 * 60 * 1000;
let cloudOcrSettings = loadCloudOcrSettings();
let aiSentenceSettings = loadAiSentenceSettings();
let translationSettings = loadTranslationSettings();
let baiduAccessTokenCache = {
  credentialHash: "",
  token: "",
  expiresAt: 0,
};

function now() {
  return new Date().toISOString();
}

function cleanupEdgeTranslationJobs() {
  const currentTime = Date.now();
  for (const [token, job] of edgeTranslationJobs.entries()) {
    if (job.expiresAt <= currentTime) edgeTranslationJobs.delete(token);
  }
}

function edgeTranslationJob(token) {
  cleanupEdgeTranslationJobs();
  const job = edgeTranslationJobs.get(String(token || ""));
  if (!job) throw new Error("Edge 翻译任务不存在或已过期");
  return job;
}

function edgeTranslationJobPayload(job) {
  return {
    ok: true,
    status: job.status,
    message: job.message,
    sourceText: job.sourceText,
    sourceLanguage: job.sourceLanguage,
    targetLanguage: job.targetLanguage,
    translatedText: job.translatedText,
    model: job.model,
    error: job.error,
    createdAt: job.createdAt,
    expiresAt: new Date(job.expiresAt).toISOString(),
  };
}

function findNamedFile(rootDirectory, fileName, remainingDepth = 4) {
  if (
    remainingDepth < 0 ||
    !rootDirectory ||
    !fs.existsSync(rootDirectory)
  ) {
    return "";
  }
  let entries;
  try {
    entries = fs.readdirSync(rootDirectory, { withFileTypes: true });
  } catch {
    return "";
  }
  const directFile = entries.find(
    (entry) =>
      entry.isFile() &&
      entry.name.toLowerCase() === fileName.toLowerCase()
  );
  if (directFile) return path.join(rootDirectory, directFile.name);
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const located = findNamedFile(
      path.join(rootDirectory, entry.name),
      fileName,
      remainingDepth - 1
    );
    if (located) return located;
  }
  return "";
}

function bundledUmiExecutable() {
  const direct = path.join(APP_DIR, "Umi-OCR.exe");
  if (fs.existsSync(direct)) return direct;
  return findNamedFile(path.join(APP_DIR, "Umi-OCR"), "Umi-OCR.exe", 4);
}

function resolvedUmiExecutable() {
  const bundled = bundledUmiExecutable();
  if (bundled) return { executable: bundled, bundled: true };
  const saved = String(state?.umiOcrExecutable || "");
  return {
    executable: saved && fs.existsSync(saved) ? saved : "",
    bundled: false,
  };
}

function loadOcrRuntimeSettings() {
  try {
    const parsed = JSON.parse(fs.readFileSync(OCR_SETTINGS_PATH, "utf8"));
    return {
      umiOcrExecutable:
        typeof parsed.umiOcrExecutable === "string"
          ? parsed.umiOcrExecutable
          : "",
    };
  } catch {
    return { umiOcrExecutable: "" };
  }
}

function defaultCloudOcrSettings() {
  return {
    kandian: {
      account: "",
      token: "",
      detMode: "auto",
      version: "v2",
    },
    baidu: {
      apiKey: "",
      secretKey: "",
      languageType: "CHN_ENG",
    },
  };
}

function loadCloudOcrSettings() {
  const defaults = defaultCloudOcrSettings();
  try {
    const parsed = JSON.parse(
      fs.readFileSync(CLOUD_OCR_SETTINGS_PATH, "utf8")
    );
    return {
      kandian: {
        account:
          typeof parsed?.kandian?.account === "string"
            ? parsed.kandian.account.slice(0, 200)
            : "",
        token:
          typeof parsed?.kandian?.token === "string"
            ? parsed.kandian.token.slice(0, 1000)
            : "",
        detMode: ["auto", "sp", "hp"].includes(parsed?.kandian?.detMode)
          ? parsed.kandian.detMode
          : defaults.kandian.detMode,
        version: ["default", "beta", "v2"].includes(
          parsed?.kandian?.version
        )
          ? parsed.kandian.version
          : defaults.kandian.version,
      },
      baidu: {
        apiKey:
          typeof parsed?.baidu?.apiKey === "string"
            ? parsed.baidu.apiKey.slice(0, 1000)
            : "",
        secretKey:
          typeof parsed?.baidu?.secretKey === "string"
            ? parsed.baidu.secretKey.slice(0, 1000)
            : "",
        languageType:
          typeof parsed?.baidu?.languageType === "string" &&
          parsed.baidu.languageType.trim()
            ? parsed.baidu.languageType.trim().slice(0, 40)
            : defaults.baidu.languageType,
      },
    };
  } catch {
    return defaults;
  }
}

function cloudOcrSettingsSummary() {
  const kandianConfigured = Boolean(
    cloudOcrSettings.kandian.account && cloudOcrSettings.kandian.token
  );
  const baiduConfigured = Boolean(
    cloudOcrSettings.baidu.apiKey && cloudOcrSettings.baidu.secretKey
  );
  return {
    kandian: {
      configured: kandianConfigured,
      account: cloudOcrSettings.kandian.account,
      tokenSaved: Boolean(cloudOcrSettings.kandian.token),
      detMode: cloudOcrSettings.kandian.detMode,
      version: cloudOcrSettings.kandian.version,
    },
    baidu: {
      configured: baiduConfigured,
      apiKeySaved: Boolean(cloudOcrSettings.baidu.apiKey),
      secretKeySaved: Boolean(cloudOcrSettings.baidu.secretKey),
      languageType: cloudOcrSettings.baidu.languageType,
    },
  };
}

function saveCloudOcrSettings() {
  fs.mkdirSync(OCR_RUNTIME_DIR, { recursive: true });
  fs.writeFileSync(
    CLOUD_OCR_SETTINGS_PATH,
    JSON.stringify(cloudOcrSettings, null, 2),
    "utf8"
  );
}

function updateCloudOcrSettings(payload) {
  const action = String(payload?.action || "save");
  const engine = String(payload?.engine || "");
  if (action === "clear") {
    if (engine === "kandian") {
      cloudOcrSettings.kandian = defaultCloudOcrSettings().kandian;
    } else if (engine === "baidu") {
      cloudOcrSettings.baidu = defaultCloudOcrSettings().baidu;
      baiduAccessTokenCache = {
        credentialHash: "",
        token: "",
        expiresAt: 0,
      };
    } else {
      throw new Error("没有这个云 OCR 配置");
    }
    saveCloudOcrSettings();
    return cloudOcrSettingsSummary();
  }

  if (payload?.kandian && typeof payload.kandian === "object") {
    const next = payload.kandian;
    const account = String(next.account || "").trim().slice(0, 200);
    const token = String(next.token || "").trim().slice(0, 1000);
    cloudOcrSettings.kandian = {
      account,
      token: token || cloudOcrSettings.kandian.token,
      detMode: ["auto", "sp", "hp"].includes(next.detMode)
        ? next.detMode
        : "auto",
      version: ["default", "beta", "v2"].includes(next.version)
        ? next.version
        : "v2",
    };
  }
  if (payload?.baidu && typeof payload.baidu === "object") {
    const next = payload.baidu;
    const apiKey = String(next.apiKey || "").trim().slice(0, 1000);
    const secretKey = String(next.secretKey || "").trim().slice(0, 1000);
    cloudOcrSettings.baidu = {
      apiKey: apiKey || cloudOcrSettings.baidu.apiKey,
      secretKey: secretKey || cloudOcrSettings.baidu.secretKey,
      languageType:
        String(next.languageType || "CHN_ENG").trim().slice(0, 40) ||
        "CHN_ENG",
    };
    baiduAccessTokenCache = {
      credentialHash: "",
      token: "",
      expiresAt: 0,
    };
  }
  saveCloudOcrSettings();
  return cloudOcrSettingsSummary();
}

function defaultAiSentenceSettings() {
  return {
    provider: "qwen",
    protocol: AI_SENTENCE_PROVIDER_PRESETS.qwen.protocol,
    endpoint: AI_SENTENCE_PROVIDER_PRESETS.qwen.endpoint,
    authMode: AI_SENTENCE_PROVIDER_PRESETS.qwen.authMode,
    apiKey: "",
    model: AI_SENTENCE_PROVIDER_PRESETS.qwen.model,
  };
}

function aiSentenceProviderName(provider) {
  return AI_SENTENCE_PROVIDER_PRESETS[provider]?.name || "AI 服务";
}

function validatedAiEndpoint(value, allowEmpty = false) {
  const text = String(value || "").trim().slice(0, 2000);
  if (!text && allowEmpty) return "";
  let endpoint;
  try {
    endpoint = new URL(text);
  } catch {
    throw new Error("AI 请求地址格式不正确");
  }
  if (endpoint.username || endpoint.password || endpoint.hash) {
    throw new Error("AI 请求地址不能包含账号、密码或片段标记");
  }
  const loopbackHosts = new Set(["127.0.0.1", "localhost", "[::1]"]);
  if (
    endpoint.protocol !== "https:" &&
    !(
      endpoint.protocol === "http:" &&
      loopbackHosts.has(endpoint.hostname.toLowerCase())
    )
  ) {
    throw new Error("AI 请求地址必须使用 HTTPS；本机回环地址可使用 HTTP");
  }
  return endpoint.toString();
}

function normalizeAiApiKey(value, authMode = "bearer") {
  let key = typeof value === "string" ? value : "";
  key = key.replace(/^\uFEFF/u, "").trim();
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const quoted =
      (key.startsWith('"') && key.endsWith('"')) ||
      (key.startsWith("'") && key.endsWith("'"));
    if (!quoted || key.length < 2) break;
    key = key.slice(1, -1).trim();
  }
  if (authMode === "bearer") {
    key = key.replace(/^Bearer\s+/iu, "").trim();
  }
  return key.slice(0, 2000);
}

function normalizeAiSentenceSettings(value) {
  const defaults = defaultAiSentenceSettings();
  const allowedProviders = ["qwen", "claude", "deepseek"];
  const provider = allowedProviders.includes(value?.provider)
    ? value.provider
    : "qwen";
  const removedProvider = Boolean(
    value?.provider && !allowedProviders.includes(value.provider)
  );
  const preset = AI_SENTENCE_PROVIDER_PRESETS[provider] || defaults;
  return {
    provider,
    protocol: preset.protocol,
    endpoint: preset.endpoint,
    authMode: preset.authMode,
    apiKey: removedProvider
      ? ""
      : normalizeAiApiKey(value?.apiKey, preset.authMode),
    model:
      !removedProvider &&
      typeof value?.model === "string" &&
      value.model.trim()
        ? value.model.trim().slice(0, 120)
        : preset.model || defaults.model,
  };
}

function loadAiSentenceSettings() {
  try {
    const parsed = JSON.parse(
      fs.readFileSync(AI_SENTENCE_SETTINGS_PATH, "utf8")
    );
    return normalizeAiSentenceSettings(parsed);
  } catch {
    return defaultAiSentenceSettings();
  }
}

function aiSentenceSettingsSummary() {
  const requiresKey = aiSentenceSettings.authMode !== "none";
  return {
    configured: Boolean(
      aiSentenceSettings.endpoint &&
        aiSentenceSettings.model &&
        (!requiresKey || aiSentenceSettings.apiKey)
    ),
    apiKeySaved: Boolean(aiSentenceSettings.apiKey),
    provider: aiSentenceSettings.provider,
    providerName: aiSentenceProviderName(aiSentenceSettings.provider),
    protocol: aiSentenceSettings.protocol,
    endpoint: aiSentenceSettings.endpoint,
    authMode: aiSentenceSettings.authMode,
    model: aiSentenceSettings.model,
  };
}

function saveAiSentenceSettings() {
  fs.mkdirSync(OCR_RUNTIME_DIR, { recursive: true });
  fs.writeFileSync(
    AI_SENTENCE_SETTINGS_PATH,
    JSON.stringify(aiSentenceSettings, null, 2),
    "utf8"
  );
}

function updateAiSentenceSettings(payload) {
  if (String(payload?.action || "save") === "clear") {
    aiSentenceSettings = defaultAiSentenceSettings();
    saveAiSentenceSettings();
    return aiSentenceSettingsSummary();
  }
  const provider = ["qwen", "claude", "deepseek"].includes(payload?.provider)
    ? payload.provider
    : "";
  if (!provider) throw new Error("AI 断句只支持 DeepSeek、千问和 Claude");
  const preset = AI_SENTENCE_PROVIDER_PRESETS[provider];
  const protocol = preset.protocol;
  const authMode = preset.authMode;
  const endpoint = preset.endpoint;
  const apiKey = normalizeAiApiKey(payload?.apiKey, authMode);
  const model = String(payload?.model || "")
    .trim()
    .slice(0, 120);
  if (!model || !/^[a-zA-Z0-9._:-]+$/.test(model)) {
    throw new Error("AI 模型名称格式不正确");
  }
  const credentialTargetChanged =
    provider !== aiSentenceSettings.provider;
  const nextApiKey =
    apiKey || (credentialTargetChanged ? "" : aiSentenceSettings.apiKey);
  if (!nextApiKey) throw new Error("请填写当前服务商的 API Key");
  aiSentenceSettings = {
    provider,
    protocol,
    endpoint,
    authMode,
    apiKey: nextApiKey,
    model,
  };
  saveAiSentenceSettings();
  return aiSentenceSettingsSummary();
}

function defaultTranslationSettings() {
  return {
    pythonExecutable: "",
    qwen: {
      apiKey: "",
      model: TRANSLATION_PROVIDER_PRESETS.qwen.model,
    },
    claude: {
      apiKey: "",
      model: TRANSLATION_PROVIDER_PRESETS.claude.model,
    },
    deepseek: {
      apiKey: "",
      model: TRANSLATION_PROVIDER_PRESETS.deepseek.model,
    },
  };
}

function normalizeTranslationSettings(value) {
  const defaults = defaultTranslationSettings();
  const profiles = {};
  for (const provider of ["qwen", "claude", "deepseek"]) {
    const profile = value?.[provider] || {};
    const model = String(profile.model || defaults[provider].model)
      .trim()
      .slice(0, 120);
    profiles[provider] = {
      apiKey: normalizeAiApiKey(
        profile.apiKey,
        TRANSLATION_PROVIDER_PRESETS[provider].authMode || "bearer"
      ),
      model:
        model && /^[a-zA-Z0-9._:-]+$/.test(model)
          ? model
          : defaults[provider].model,
    };
  }
  return {
    pythonExecutable:
      typeof value?.pythonExecutable === "string"
        ? value.pythonExecutable.trim().slice(0, 2000)
        : "",
    ...profiles,
  };
}

function loadTranslationSettings() {
  try {
    return normalizeTranslationSettings(
      JSON.parse(fs.readFileSync(TRANSLATION_SETTINGS_PATH, "utf8"))
    );
  } catch {
    return defaultTranslationSettings();
  }
}

function saveTranslationSettings() {
  fs.mkdirSync(OCR_RUNTIME_DIR, { recursive: true });
  fs.writeFileSync(
    TRANSLATION_SETTINGS_PATH,
    JSON.stringify(translationSettings, null, 2),
    "utf8"
  );
}

function translationCredential(provider) {
  const profile = translationSettings[provider] || {};
  if (profile.apiKey) {
    return {
      apiKey: profile.apiKey,
      model:
        profile.model || TRANSLATION_PROVIDER_PRESETS[provider]?.model || "",
      source: "translation",
    };
  }
  if (
    aiSentenceSettings.provider === provider &&
    aiSentenceSettings.apiKey
  ) {
    return {
      apiKey: aiSentenceSettings.apiKey,
      model:
        profile.model ||
        aiSentenceSettings.model ||
        TRANSLATION_PROVIDER_PRESETS[provider]?.model ||
        "",
      source: "ai-sentence",
    };
  }
  return {
    apiKey: "",
    model: profile.model || TRANSLATION_PROVIDER_PRESETS[provider]?.model || "",
    source: "",
  };
}

function translationSettingsSummary() {
  const profiles = {};
  for (const provider of ["qwen", "claude", "deepseek"]) {
    const credential = translationCredential(provider);
    profiles[provider] = {
      configured: Boolean(credential.apiKey && credential.model),
      apiKeySaved: Boolean(translationSettings[provider]?.apiKey),
      borrowedFromAiSentence: credential.source === "ai-sentence",
      model: credential.model,
      endpoint: TRANSLATION_PROVIDER_PRESETS[provider].endpoint,
      providerName: TRANSLATION_PROVIDER_PRESETS[provider].name,
    };
  }
  return {
    pythonExecutable: translationSettings.pythonExecutable || "",
    qwen: profiles.qwen,
    claude: profiles.claude,
    deepseek: profiles.deepseek,
  };
}

function updateTranslationSettings(payload) {
  const provider = String(payload?.provider || "");
  if (!["qwen", "claude", "deepseek"].includes(provider)) {
    throw new Error("翻译云引擎只支持 DeepSeek、千问与 Claude");
  }
  if (String(payload?.action || "save") === "clear") {
    translationSettings[provider] = {
      apiKey: "",
      model: TRANSLATION_PROVIDER_PRESETS[provider].model,
    };
    saveTranslationSettings();
    return translationSettingsSummary();
  }
  const apiKey = normalizeAiApiKey(
    payload?.apiKey,
    TRANSLATION_PROVIDER_PRESETS[provider].authMode || "bearer"
  );
  const model = String(payload?.model || "")
    .trim()
    .slice(0, 120);
  if (!model || !/^[a-zA-Z0-9._:-]+$/.test(model)) {
    throw new Error("翻译模型名称格式不正确");
  }
  translationSettings[provider] = {
    apiKey: apiKey || translationSettings[provider].apiKey,
    model,
  };
  if (!translationCredential(provider).apiKey) {
    throw new Error("请填写当前翻译服务商的 API Key");
  }
  saveTranslationSettings();
  return translationSettingsSummary();
}

function runChildProcess(executable, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, {
      cwd: options.cwd || APP_DIR,
      env: { ...process.env, ...(options.env || {}) },
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"],
    });
    const stdout = [];
    const stderr = [];
    let outputBytes = 0;
    const maxBytes = options.maxBytes || 8 * 1024 * 1024;
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(options.timeoutMessage || "本机组件运行超时"));
    }, options.timeout || 600000);
    child.stdout.on("data", (chunk) => {
      outputBytes += chunk.length;
      if (outputBytes <= maxBytes) stdout.push(chunk);
    });
    child.stderr.on("data", (chunk) => {
      outputBytes += chunk.length;
      if (outputBytes <= maxBytes) stderr.push(chunk);
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      const out = Buffer.concat(stdout).toString("utf8").trim();
      const err = Buffer.concat(stderr).toString("utf8").trim();
      if (outputBytes > maxBytes) {
        reject(new Error("本机组件返回内容过大"));
      } else if (code !== 0 && !options.allowNonZero) {
        reject(new Error(out || err || `本机组件退出代码 ${code}`));
      } else {
        resolve({ stdout: out, stderr: err, code });
      }
    });
    if (options.input !== undefined) {
      child.stdin.end(String(options.input));
    } else {
      child.stdin.end();
    }
  });
}

function pythonExecutableCandidates() {
  const candidates = [
    translationSettings.pythonExecutable,
    process.env.PYTHON,
    path.join(
      process.env.LOCALAPPDATA || "",
      "Programs",
      "Python",
      "Python311",
      "python.exe"
    ),
    path.join(
      process.env.LOCALAPPDATA || "",
      "Programs",
      "Python",
      "Python312",
      "python.exe"
    ),
  ].filter(Boolean);
  return [...new Set(candidates)];
}

function resolvedPythonExecutable() {
  const located = pythonExecutableCandidates().find((candidate) =>
    path.isAbsolute(candidate) ? fs.existsSync(candidate) : false
  );
  return located || "python.exe";
}

async function argosBridge(payload) {
  if (!fs.existsSync(ARGOS_BRIDGE_PATH)) {
    throw new Error("工作台缺少 Argos 本地桥接文件");
  }
  const python = resolvedPythonExecutable();
  const result = await runChildProcess(python, [ARGOS_BRIDGE_PATH], {
    input: JSON.stringify(payload || {}),
    timeout: payload?.action === "download-model" ? 1200000 : 600000,
    timeoutMessage:
      payload?.action === "download-model"
        ? "Argos 模型下载超时"
        : "Argos 本地翻译超时",
    env: {
      HISTORICAL_ARGOS_RUNTIME: ARGOS_RUNTIME_DIR,
      ARGOS_PACKAGES_DIR: ARGOS_PACKAGES_RELATIVE_DIR,
      XDG_CACHE_HOME: path.join(ARGOS_CACHE_RELATIVE_DIR, "cache"),
      XDG_DATA_HOME: path.join(ARGOS_CACHE_RELATIVE_DIR, "data"),
      STANZA_RESOURCES_DIR: path.join(ARGOS_CACHE_RELATIVE_DIR, "stanza"),
      ARGOS_DEVICE_TYPE: "cpu",
      PYTHONUTF8: "1",
      PYTHONIOENCODING: "utf-8",
    },
    cwd: APP_DIR,
    allowNonZero: true,
  });
  let parsed;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    throw new Error(
      result.stderr ||
        (result.code
          ? `Argos 本地组件退出代码 ${result.code}`
          : "Argos 本地组件返回了无法读取的结果")
    );
  }
  if (parsed.ok === false) throw new Error(parsed.error || "Argos 操作失败");
  if (
    path.isAbsolute(python) &&
    translationSettings.pythonExecutable !== python
  ) {
    translationSettings.pythonExecutable = python;
    saveTranslationSettings();
  }
  return parsed;
}

async function installArgosRuntime() {
  const python = resolvedPythonExecutable();
  fs.mkdirSync(ARGOS_RUNTIME_DIR, { recursive: true });
  fs.mkdirSync(ARGOS_PACKAGES_DIR, { recursive: true });
  fs.mkdirSync(ARGOS_CACHE_DIR, { recursive: true });
  await runChildProcess(
    python,
    [
      "-m",
      "pip",
      "install",
      "--disable-pip-version-check",
      "--upgrade",
      "--target",
      ARGOS_RUNTIME_DIR,
      "argostranslate",
    ],
    {
      timeout: 1800000,
      timeoutMessage: "Argos 本机组件安装超时",
      maxBytes: 16 * 1024 * 1024,
    }
  );
  if (path.isAbsolute(python)) {
    translationSettings.pythonExecutable = python;
    saveTranslationSettings();
  }
  return argosBridge({ action: "status" });
}

function translationLanguageName(code) {
  const names = {
    en: "英语",
    ja: "日语",
    de: "德语",
    fr: "法语",
    ru: "俄语",
    ko: "韩语",
    es: "西班牙语",
    zh: "简体中文",
    "zh-Hans": "简体中文",
    "zh-Hant": "繁体中文",
  };
  return names[code] || code;
}

async function translateTextWithCloud(
  text,
  provider,
  sourceLanguage,
  targetLanguage
) {
  const sourceText = cleanResearchText(text, 200000);
  if (!sourceText) throw new Error("请先投入需要翻译的文本");
  const preset = TRANSLATION_PROVIDER_PRESETS[provider];
  const credential = translationCredential(provider);
  if (!preset || !credential.apiKey || !credential.model) {
    throw new Error(`${preset?.name || "云翻译"}尚未完整配置`);
  }
  const instruction =
    `你是严谨的历史文献翻译助手。请把用户提供的${translationLanguageName(
      sourceLanguage
    )}原文翻译为${translationLanguageName(targetLanguage)}。` +
    "忠实保留人名、地名、机构名、年代、数字、引文层次和原有分段；不得摘要、解释或补写。遇到无法确定的旧词或专名，保留原文并用方括号标示。只输出译文正文。";
  const requestPayload =
    preset.protocol === "anthropic-messages"
      ? {
          model: credential.model,
          system: instruction,
          messages: [{ role: "user", content: sourceText }],
          max_tokens: 16000,
          thinking: { type: "disabled" },
        }
      : {
          model: credential.model,
          messages: [
            { role: "system", content: instruction },
            { role: "user", content: sourceText },
          ],
          stream: false,
          max_tokens: 16000,
        };
  const body = Buffer.from(JSON.stringify(requestPayload), "utf8");
  const serviceName = `${preset.name}翻译服务`;
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": body.length,
  };
  if (preset.authMode === "x-api-key") {
    headers["x-api-key"] = credential.apiKey;
    headers["anthropic-version"] = "2023-06-01";
  } else {
    headers.Authorization = `Bearer ${credential.apiKey}`;
  }
  const response = await aiApiRequest(preset.endpoint, {
    headers,
    body,
    serviceName,
    timeout: 240000,
  });
  const result = parseCloudJson(response, serviceName);
  if (result?.error) {
    throw new Error(
      result.error.message || result.error.code || `${serviceName}失败`
    );
  }
  const outputText = aiSentenceResponseText(result);
  if (!outputText) throw new Error(`${serviceName}没有返回可用译文`);
  return {
    text: outputText,
    provider: preset.name,
    model: credential.model,
  };
}

function normalizeFavoriteWebsiteUrl(value) {
  let text = String(value || "").trim();
  if (!text) throw new Error("请填写网站地址");
  if (!/^[a-z][a-z\d+.-]*:\/\//iu.test(text)) text = `https://${text}`;
  let parsed;
  try {
    parsed = new URL(text);
  } catch {
    throw new Error("网站地址格式不正确");
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error("网站地址只支持 http 或 https");
  }
  return parsed.href.slice(0, 2000);
}

function normalizeFavoriteWebsiteCategories(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map((item) => {
      const name = String(item?.name || "")
        .replace(/[\u0000-\u001f]/gu, " ")
        .replace(/\s+/gu, " ")
        .trim()
        .slice(0, 60);
      const id =
        typeof item?.id === "string" && item.id
          ? item.id.slice(0, 160)
          : `website-category-${crypto.randomUUID()}`;
      if (!name || seen.has(id)) return null;
      seen.add(id);
      return {
        id,
        name,
        createdAt: item?.createdAt || now(),
        updatedAt: item?.updatedAt || item?.createdAt || now(),
      };
    })
    .filter(Boolean)
    .slice(-50);
}

function normalizeFavoriteWebsites(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const name = String(item?.name || "")
        .replace(/[\u0000-\u001f]/gu, " ")
        .replace(/\s+/gu, " ")
        .trim()
        .slice(0, 120);
      try {
        return {
          id:
            typeof item?.id === "string" && item.id
              ? item.id.slice(0, 160)
              : `website-${crypto.randomUUID()}`,
          name,
          url: normalizeFavoriteWebsiteUrl(item?.url),
          categoryId:
            typeof item?.categoryId === "string"
              ? item.categoryId.slice(0, 160)
              : "",
          createdAt: item?.createdAt || now(),
          updatedAt: item?.updatedAt || item?.createdAt || now(),
          lastOpenedAt:
            typeof item?.lastOpenedAt === "string"
              ? item.lastOpenedAt.slice(0, 80)
              : "",
        };
      } catch {
        return null;
      }
    })
    .filter((item) => item?.name && item.url)
    .slice(-100);
}

function loadAppState() {
  const sharedOcrSettings = loadOcrRuntimeSettings();
  try {
    const parsed = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
    return {
      version: APP_VERSION,
      recentDates: Array.isArray(parsed.recentDates) ? parsed.recentDates : [],
      recentPapers: Array.isArray(parsed.recentPapers) ? parsed.recentPapers : [],
      favoriteWebsiteCategories: normalizeFavoriteWebsiteCategories(
        parsed.favoriteWebsiteCategories
      ),
      favoriteWebsites: normalizeFavoriteWebsites(parsed.favoriteWebsites),
      history: Array.isArray(parsed.history) ? parsed.history : [],
      operations: Array.isArray(parsed.operations) ? parsed.operations : [],
      umiOcrExecutable:
        typeof parsed.umiOcrExecutable === "string" &&
        parsed.umiOcrExecutable.trim()
          ? parsed.umiOcrExecutable
          : sharedOcrSettings.umiOcrExecutable,
      legacyMetadata:
        parsed.metadata && typeof parsed.metadata === "object" ? parsed.metadata : {},
    };
  } catch {
    return {
      version: APP_VERSION,
      recentDates: [],
      recentPapers: [],
      favoriteWebsiteCategories: [],
      favoriteWebsites: [],
      history: [],
      operations: [],
      umiOcrExecutable: sharedOcrSettings.umiOcrExecutable,
      legacyMetadata: {},
    };
  }
}

function saveAppState() {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  const payload = {
    version: APP_VERSION,
    recentDates: state.recentDates.slice(0, 30),
    recentPapers: state.recentPapers.slice(0, 100),
    favoriteWebsiteCategories: normalizeFavoriteWebsiteCategories(
      state.favoriteWebsiteCategories
    ),
    favoriteWebsites: normalizeFavoriteWebsites(state.favoriteWebsites),
    history: state.history.slice(-100),
    operations: state.operations.slice(-5000),
    umiOcrExecutable: state.umiOcrExecutable || "",
  };
  fs.writeFileSync(STATE_PATH, JSON.stringify(payload, null, 2), "utf8");
  fs.mkdirSync(OCR_RUNTIME_DIR, { recursive: true });
  fs.writeFileSync(
    OCR_SETTINGS_PATH,
    JSON.stringify(
      { umiOcrExecutable: state.umiOcrExecutable || "" },
      null,
      2
    ),
    "utf8"
  );
}

function sendJson(res, statusCode, value) {
  const body = JSON.stringify(value);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function sendError(res, statusCode, message) {
  sendJson(res, statusCode, { ok: false, error: message });
}

function readJson(req, maxBytes = 2 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxBytes) {
        reject(new Error("请求内容过大"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("请求格式不正确"));
      }
    });
    req.on("error", reject);
  });
}

function readBuffer(req, maxBytes = 24 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        reject(new Error("识别图像过大，请缩小框选范围后重试"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (!total) {
        reject(new Error("没有收到需要识别的图像"));
        return;
      }
      resolve(Buffer.concat(chunks));
    });
    req.on("error", reject);
  });
}

function writeRequestToFile(req, filePath, maxBytes = 2 * 1024 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const declaredSize = Number.parseInt(req.headers["content-length"] || "0", 10);
    if (declaredSize > maxBytes) {
      req.resume();
      reject(new Error("单份材料超过浏览器导入允许的大小"));
      return;
    }
    let total = 0;
    let settled = false;
    const output = fs.createWriteStream(filePath, { flags: "wx" });
    const cleanup = (error) => {
      if (settled) return;
      settled = true;
      output.once("close", () => {
        try {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch {}
      });
      output.destroy();
      reject(error);
    };
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        cleanup(new Error("单份材料超过浏览器导入允许的大小"));
        req.destroy();
      }
    });
    req.on("error", cleanup);
    req.on("aborted", () => cleanup(new Error("浏览器文件传输已中断")));
    output.on("error", cleanup);
    output.on("finish", () => {
      if (settled) return;
      settled = true;
      resolve(total);
    });
    req.pipe(output);
  });
}

function localHttpRequest(target, options = {}) {
  return new Promise((resolve, reject) => {
    const targetUrl = new URL(target);
    const serviceName = options.serviceName || "本机 OCR 服务";
    const request = http.request(
      targetUrl,
      {
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (response) => {
        const chunks = [];
        let total = 0;
        response.on("data", (chunk) => {
          total += chunk.length;
          if (total > 50 * 1024 * 1024) {
            request.destroy(new Error(`${serviceName}返回内容过大`));
            return;
          }
          chunks.push(chunk);
        });
        response.on("end", () => {
          const body = Buffer.concat(chunks);
          if ((response.statusCode || 500) >= 400) {
            reject(
              new Error(
                `${serviceName} HTTP ${response.statusCode}：${body
                  .toString("utf8")
                  .slice(0, 500)}`
              )
            );
            return;
          }
          resolve(body);
        });
      }
    );
    request.setTimeout(options.timeout || 120000, () => {
      request.destroy(new Error(`连接${serviceName}超时`));
    });
    request.on("error", reject);
    if (options.body) request.write(options.body);
    request.end();
  });
}

function cloudHttpsRequest(target, options = {}) {
  return new Promise((resolve, reject) => {
    const targetUrl = new URL(target);
    const allowedHosts = new Set([
      "ocr.kandianguji.com",
      "aip.baidubce.com",
    ]);
    if (
      targetUrl.protocol !== "https:" ||
      !allowedHosts.has(targetUrl.hostname)
    ) {
      reject(new Error("云服务请求地址不在允许范围内"));
      return;
    }
    const serviceName = options.serviceName || "云 OCR 服务";
    const request = https.request(
      targetUrl,
      {
        method: options.method || "POST",
        headers: options.headers || {},
      },
      (response) => {
        const chunks = [];
        let total = 0;
        response.on("data", (chunk) => {
          total += chunk.length;
          if (total > 20 * 1024 * 1024) {
            request.destroy(new Error(`${serviceName}返回内容过大`));
            return;
          }
          chunks.push(chunk);
        });
        response.on("end", () => {
          const body = Buffer.concat(chunks);
          if ((response.statusCode || 500) >= 400) {
            reject(
              new Error(
                `${serviceName} HTTP ${response.statusCode}：${body
                  .toString("utf8")
                  .slice(0, 500)}`
              )
            );
            return;
          }
          resolve(body);
        });
      }
    );
    request.setTimeout(options.timeout || 180000, () => {
      request.destroy(new Error(`连接${serviceName}超时`));
    });
    request.on("error", reject);
    if (options.body) request.write(options.body);
    request.end();
  });
}

function aiApiRequest(target, options = {}) {
  return new Promise((resolve, reject) => {
    let targetUrl;
    try {
      targetUrl = new URL(validatedAiEndpoint(target));
    } catch (error) {
      reject(error);
      return;
    }
    const transport = targetUrl.protocol === "https:" ? https : http;
    const serviceName = options.serviceName || "AI 断句服务";
    const request = transport.request(
      targetUrl,
      {
        method: "POST",
        headers: options.headers || {},
      },
      (response) => {
        const chunks = [];
        let total = 0;
        response.on("data", (chunk) => {
          total += chunk.length;
          if (total > 20 * 1024 * 1024) {
            request.destroy(new Error(`${serviceName}返回内容过大`));
            return;
          }
          chunks.push(chunk);
        });
        response.on("end", () => {
          const body = Buffer.concat(chunks);
          if ((response.statusCode || 500) >= 400) {
            const responseText = body.toString("utf8").slice(0, 2000);
            let responseError = null;
            try {
              responseError = JSON.parse(responseText);
            } catch {
              responseError = null;
            }
            const providerMessage =
              responseError?.error?.message ||
              responseError?.message ||
              responseText.slice(0, 500);
            const providerCode =
              responseError?.error?.code || responseError?.code || "";
            const requestId =
              responseError?.request_id ||
              responseError?.requestId ||
              response.headers["x-request-id"] ||
              "";
            const providerDetail = [
              providerCode ? `错误码 ${providerCode}` : "",
              providerMessage ? String(providerMessage).slice(0, 500) : "",
              requestId ? `请求编号 ${requestId}` : "",
            ]
              .filter(Boolean)
              .join("；");
            if (response.statusCode === 401) {
              const providerHint = serviceName.startsWith("DeepSeek")
                ? "请确认填写的是 DeepSeek 开放平台创建的真实 API Key，不是登录密码、网页 Token 或接口地址。"
                : "请确认 API Key 来自当前服务商的开放平台，并与当前请求地址相匹配。";
              reject(
                new Error(
                  `${serviceName}认证失败（HTTP 401）。${providerHint}` +
                    "只粘贴密钥本身；程序会自动去除误带的“Bearer ”、引号和首尾空格。" +
                    (providerDetail ? ` 服务商返回：${providerDetail}` : "")
                )
              );
              return;
            }
            reject(
              new Error(
                `${serviceName} HTTP ${response.statusCode}` +
                  (providerDetail ? `：${providerDetail}` : "")
              )
            );
            return;
          }
          resolve(body);
        });
      }
    );
    request.setTimeout(options.timeout || 240000, () => {
      request.destroy(new Error(`连接${serviceName}超时`));
    });
    request.on("error", reject);
    if (options.body) request.write(options.body);
    request.end();
  });
}

function probeLocalService(target, timeout = 1500) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    let request;
    try {
      request = http.request(new URL(target), { method: "GET" }, (response) => {
        response.resume();
        finish(true);
      });
    } catch {
      finish(false);
      return;
    }
    request.setTimeout(timeout, () => {
      request.destroy();
      finish(false);
    });
    request.on("error", () => finish(false));
    request.end();
  });
}

async function waitForLocalService(target, attempts = 40) {
  for (let index = 0; index < attempts; index += 1) {
    if (await probeLocalService(target)) return true;
    await waitMilliseconds(500);
  }
  return false;
}

function launchDetached(executable, args = [], options = {}) {
  const child = spawn(executable, args, {
    cwd: options.cwd || path.dirname(executable),
    detached: true,
    windowsHide: options.visible !== true,
    stdio: "ignore",
  });
  child.unref();
}

function chooseUmiExecutableDialog() {
  const script = [
    "Add-Type -AssemblyName System.Windows.Forms",
    "$dialog = New-Object System.Windows.Forms.OpenFileDialog",
    "$dialog.Title = '定位已经下载的 Umi-OCR.exe'",
    "$dialog.Filter = 'Umi-OCR 程序 (*.exe)|*.exe'",
    "$dialog.CheckFileExists = $true",
    "if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {",
    "  [Console]::OutputEncoding = [System.Text.Encoding]::UTF8",
    "  Write-Output $dialog.FileName",
    "}",
  ].join("; ");
  return new Promise((resolve, reject) => {
    execFile(
      "powershell.exe",
      ["-NoProfile", "-STA", "-Command", script],
      { encoding: "utf8", windowsHide: true },
      (error, stdout) => {
        if (error) return reject(error);
        resolve(String(stdout || "").trim());
      }
    );
  });
}

async function startUmiOcrService() {
  if (await probeLocalService(UMI_OCR_BASE)) return true;
  const located = resolvedUmiExecutable();
  const executable = located.executable;
  if (!executable) {
    throw new Error(
      "工作台目录中没有找到 Umi-OCR.exe。请重新下载含 Umi-OCR 的完整第五十七版压缩包。"
    );
  }
  if (state.umiOcrExecutable !== executable) {
    state.umiOcrExecutable = executable;
    saveAppState();
  }
  launchDetached(executable, [], {
    cwd: path.dirname(executable),
    visible: true,
  });
  if (await waitForLocalService(UMI_OCR_BASE, 60)) return true;
  throw new Error(
    "Umi-OCR 已打开但 HTTP 服务未就绪。请在 Umi-OCR 设置中启用 HTTP 服务并使用端口 1224。"
  );
}

async function ensureOcrService() {
  if (await probeLocalService(UMI_OCR_BASE)) return;
  await startUmiOcrService();
}

async function umiJson(pathname, payload, timeout = 120000) {
  const body = Buffer.from(JSON.stringify(payload), "utf8");
  const response = await localHttpRequest(`${UMI_OCR_BASE}${pathname}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": body.length,
    },
    body,
    timeout,
    serviceName: "Umi-OCR",
  });
  try {
    return JSON.parse(response.toString("utf8"));
  } catch {
    throw new Error("Umi-OCR 返回了无法读取的数据");
  }
}

function ocrTextFromResult(data) {
  if (typeof data === "string") return cleanResearchText(data, 200000);
  if (Array.isArray(data)) {
    return cleanResearchText(
      data
        .map((item) => {
          if (typeof item === "string") return item;
          if (typeof item?.text === "string") return item.text + (item.end || "");
          if (typeof item?.data === "string") return item.data;
          return "";
        })
        .filter(Boolean)
        .join("\n"),
      200000
    );
  }
  if (typeof data?.text === "string") {
    return cleanResearchText(data.text, 200000);
  }
  if (typeof data?.data === "string") {
    return cleanResearchText(data.data, 200000);
  }
  return "";
}

function normalizedImageBase64(base64) {
  const cleanBase64 = String(base64 || "")
    .replace(/^data:image\/[a-z0-9.+-]+;base64,/i, "")
    .replace(/\s+/g, "");
  if (!cleanBase64) throw new Error("没有收到框选区域图像");
  if (cleanBase64.length > 24 * 1024 * 1024) {
    throw new Error("框选区域图像过大，请缩小框选范围后重试");
  }
  return cleanBase64;
}

async function recognizeBase64WithUmi(base64) {
  const cleanBase64 = normalizedImageBase64(base64);
  const result = await umiJson("/api/ocr", {
    base64: cleanBase64,
    options: {
      "ocr.cls": true,
      "ocr.limit_side_len": 4320,
      "data.format": "text",
    },
  });
  if (result.code === 101) return "";
  if (result.code !== 100) {
    throw new Error(result.data || `Umi-OCR 识别失败（代码 ${result.code}）`);
  }
  return ocrTextFromResult(result.data);
}

function parseCloudJson(buffer, serviceName) {
  try {
    return JSON.parse(buffer.toString("utf8"));
  } catch {
    throw new Error(`${serviceName}返回了无法读取的数据`);
  }
}

function kandianTextFromResult(result) {
  const data = result?.data;
  const candidates = Array.isArray(data?.texts)
    ? data.texts
    : Array.isArray(data?.text_lines)
      ? data.text_lines
      : [];
  const lines = candidates
    .map((item) => {
      if (typeof item === "string") return item;
      if (typeof item?.text === "string") return item.text;
      if (typeof item?.words === "string") return item.words;
      return "";
    })
    .filter(Boolean);
  if (lines.length) {
    return cleanResearchText(lines.join("\n"), 200000);
  }
  return ocrTextFromResult(data);
}

async function recognizeBase64WithKandian(base64) {
  const settings = cloudOcrSettings.kandian;
  if (!settings.account || !settings.token) {
    throw new Error("看典古籍 OCR 尚未配置账号和 API Token");
  }
  const cleanBase64 = normalizedImageBase64(base64);
  const requestPayload = {
    token: settings.token,
    email: settings.account,
    image: cleanBase64,
    char_ocr: false,
    det_mode: settings.detMode,
    image_size: 0,
    return_position: true,
    return_choices: false,
    version: settings.version,
  };
  if (settings.version === "v2") {
    Object.assign(requestPayload, {
      det_layout: true,
      only_plain_text: false,
      return_layout: true,
      auto_insert_space: false,
    });
  }
  const body = Buffer.from(
    JSON.stringify(requestPayload),
    "utf8"
  );
  const response = await cloudHttpsRequest(
    "https://ocr.kandianguji.com/ocr_api",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": body.length,
      },
      body,
      serviceName: "看典古籍 OCR",
    }
  );
  const result = parseCloudJson(response, "看典古籍 OCR");
  if (result?.message !== "success") {
    throw new Error(result?.info || "看典古籍 OCR 识别失败");
  }
  return kandianTextFromResult(result);
}

async function baiduAccessToken() {
  const settings = cloudOcrSettings.baidu;
  if (!settings.apiKey || !settings.secretKey) {
    throw new Error("百度智能云 OCR 尚未配置 API Key 和 Secret Key");
  }
  const credentialHash = crypto
    .createHash("sha256")
    .update(`${settings.apiKey}\0${settings.secretKey}`)
    .digest("hex");
  if (
    baiduAccessTokenCache.credentialHash === credentialHash &&
    baiduAccessTokenCache.token &&
    baiduAccessTokenCache.expiresAt > Date.now() + 60_000
  ) {
    return baiduAccessTokenCache.token;
  }
  const tokenBody = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: settings.apiKey,
    client_secret: settings.secretKey,
  }).toString();
  const response = await cloudHttpsRequest(
    "https://aip.baidubce.com/oauth/2.0/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(tokenBody),
      },
      body: tokenBody,
      serviceName: "百度智能云鉴权服务",
      timeout: 60000,
    }
  );
  const result = parseCloudJson(response, "百度智能云鉴权服务");
  if (!result?.access_token) {
    throw new Error(
      result?.error_description ||
        result?.error ||
        "百度智能云没有返回 Access Token"
    );
  }
  const expiresIn = Math.max(300, Number(result.expires_in) || 2592000);
  baiduAccessTokenCache = {
    credentialHash,
    token: String(result.access_token),
    expiresAt: Date.now() + Math.max(60, expiresIn - 300) * 1000,
  };
  return baiduAccessTokenCache.token;
}

async function recognizeBase64WithBaidu(base64) {
  const cleanBase64 = normalizedImageBase64(base64);
  const token = await baiduAccessToken();
  const body = new URLSearchParams({
    image: cleanBase64,
    language_type: cloudOcrSettings.baidu.languageType || "CHN_ENG",
    recognize_granularity: "small",
    detect_direction: "true",
    vertexes_location: "true",
    paragraph: "true",
    probability: "true",
    char_probability: "true",
    multidirectional_recognize: "true",
  }).toString();
  if (Buffer.byteLength(body) > 10 * 1024 * 1024) {
    throw new Error(
      "图像 URL 编码后超过百度高精度含位置版的 10MB 限制，请缩小框选或降低页面尺寸"
    );
  }
  const response = await cloudHttpsRequest(
    `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate?access_token=${encodeURIComponent(
      token
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(body),
      },
      body,
      serviceName: "百度智能云高精度含位置 OCR",
    }
  );
  const result = parseCloudJson(
    response,
    "百度智能云高精度含位置 OCR"
  );
  if (result?.error_code) {
    throw new Error(
      `百度智能云 OCR ${result.error_code}：${
        result.error_msg || "识别失败"
      }`
    );
  }
  const lines = Array.isArray(result?.words_result)
    ? result.words_result
        .map((item) => String(item?.words || "").trim())
        .filter(Boolean)
    : [];
  return cleanResearchText(lines.join("\n"), 200000);
}

function normalizeOcrEngine(value) {
  return ["kandian", "baidu"].includes(value) ? value : "umi";
}

function ocrEngineLabel(value) {
  if (value === "kandian") return "看典古籍 OCR";
  if (value === "baidu") return "百度智能云 OCR（高精度含位置版）";
  return "Umi-OCR";
}

async function recognizeImageWithUmi(filePath) {
  return recognizeBase64WithUmi(fs.readFileSync(filePath).toString("base64"));
}

function buildMultipartDocument(filePath, page) {
  const boundary = `----HistoricalWorkbench${crypto.randomBytes(12).toString("hex")}`;
  const extension = path.extname(filePath).toLowerCase() || ".pdf";
  const safeFileName = `historical-document${extension}`;
  const options = JSON.stringify({
    "ocr.cls": true,
    "ocr.limit_side_len": 4320,
    pageList: [page],
    "doc.extractionMode": "fullPage",
  });
  const prefix = Buffer.from(
    `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="${safeFileName}"\r\n` +
      `Content-Type: application/pdf\r\n\r\n`,
    "utf8"
  );
  const middle = Buffer.from(
    `\r\n--${boundary}\r\n` +
      `Content-Disposition: form-data; name="json"\r\n\r\n${options}\r\n`,
    "utf8"
  );
  const suffix = Buffer.from(`--${boundary}--\r\n`, "utf8");
  return {
    boundary,
    body: Buffer.concat([prefix, fs.readFileSync(filePath), middle, suffix]),
  };
}

function waitMilliseconds(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function recognizePdfPageWithUmi(filePath, page) {
  const multipart = buildMultipartDocument(filePath, page);
  const uploadBuffer = await localHttpRequest(`${UMI_OCR_BASE}/api/doc/upload`, {
    method: "POST",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${multipart.boundary}`,
      "Content-Length": multipart.body.length,
    },
    body: multipart.body,
    timeout: 180000,
  });
  let upload;
  try {
    upload = JSON.parse(uploadBuffer.toString("utf8"));
  } catch {
    throw new Error("Umi-OCR 没有返回有效的 PDF 任务信息");
  }
  if (upload.code !== 100 || !upload.data) {
    throw new Error(upload.data || `Umi-OCR 无法接收 PDF（代码 ${upload.code}）`);
  }

  const missionId = String(upload.data);
  const parts = [];
  try {
    for (let attempt = 0; attempt < 300; attempt += 1) {
      await waitMilliseconds(1000);
      const result = await umiJson(
        "/api/doc/result",
        {
          id: missionId,
          is_data: true,
          is_unread: true,
          format: "text",
        },
        120000
      );
      if (result.code !== 100) {
        throw new Error(result.data || `PDF 识别状态错误（代码 ${result.code}）`);
      }
      const text = ocrTextFromResult(result.data);
      if (text) parts.push(text);
      if (result.is_done) {
        if (result.state !== "success") {
          throw new Error(result.message || "Umi-OCR 的 PDF 识别任务失败");
        }
        return cleanResearchText(parts.join("\n"), 200000);
      }
    }
    throw new Error("PDF 识别超过 5 分钟，任务已停止等待");
  } finally {
    localHttpRequest(
      `${UMI_OCR_BASE}/api/doc/clear/${encodeURIComponent(missionId)}`,
      { timeout: 10000 }
    ).catch(() => {});
  }
}

function sanitizeComponent(value) {
  return String(value ?? "")
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "＿")
    .replace(/\s+/g, " ")
    .replace(/[. ]+$/g, "");
}

function normalizeKind(value) {
  return ["source", "paper", "book"].includes(value) ? value : "source";
}

function splitEdition(value) {
  const text = sanitizeComponent(value);
  const match = text.match(/^(.*?)(版|期)$/u);
  return {
    number: sanitizeComponent(match ? match[1] : text),
    unit: match ? match[2] : "版",
  };
}

function stripTitleMarks(value) {
  return sanitizeComponent(value).replace(/^《|》$/gu, "");
}

const UNKNOWN_DATE_PART = "未知";

function isUnknownDatePart(value) {
  return String(value || "").trim() === UNKNOWN_DATE_PART;
}

function normalizedDatePart(value, width) {
  const text = String(value || "").trim();
  return isUnknownDatePart(text) ? UNKNOWN_DATE_PART : text.padStart(width, "0");
}

function validateFlexibleDate(year, month, day) {
  const y = String(year || "").trim();
  const m = String(month || "").trim();
  const d = String(day || "").trim();
  const currentYear = new Date().getFullYear();
  if (!isUnknownDatePart(y) && !/^\d{4}$/.test(y)) {
    throw new Error("年份应为4位数字或“未知”");
  }
  if (
    !isUnknownDatePart(y) &&
    (Number(y) < 1800 || Number(y) > currentYear)
  ) {
    throw new Error(`年份应在1800至${currentYear}之间`);
  }
  if (!m && d) throw new Error("填写日期时需要先填写月份");
  if (!m) return normalizedDatePart(y, 4);
  if (
    !isUnknownDatePart(m) &&
    (!/^\d{1,2}$/.test(m) || Number(m) < 1 || Number(m) > 12)
  ) {
    throw new Error("月份应为1至12、“未知”或留空");
  }
  if (!d) {
    return `${normalizedDatePart(y, 4)}-${normalizedDatePart(m, 2)}`;
  }
  if (
    !isUnknownDatePart(d) &&
    (!/^\d{1,2}$/.test(d) || Number(d) < 1 || Number(d) > 31)
  ) {
    throw new Error("日期应为1至31、“未知”或留空");
  }
  if (
    !isUnknownDatePart(y) &&
    !isUnknownDatePart(m) &&
    !isUnknownDatePart(d)
  ) {
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    if (
      date.getFullYear() !== Number(y) ||
      date.getMonth() !== Number(m) - 1 ||
      date.getDate() !== Number(d)
    ) {
      throw new Error("日期无效，请检查年月日");
    }
  }
  return `${normalizedDatePart(y, 4)}-${normalizedDatePart(
    m,
    2
  )}-${normalizedDatePart(d, 2)}`;
}

function chineseDate(value) {
  const parts = String(value || "").split("-");
  if (!parts[0]) return "";
  const readablePart = (part, suffix) =>
    isUnknownDatePart(part) ? `${UNKNOWN_DATE_PART}${suffix}` : `${Number(part)}${suffix}`;
  let result = readablePart(parts[0], "年");
  if (parts[1]) result += readablePart(parts[1], "月");
  if (parts[2]) result += readablePart(parts[2], "日");
  return result;
}

function cleanResearchText(value, limit = 6000) {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, limit);
}

function aiContentText(value) {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (
        ["text", "output_text"].includes(item?.type) &&
        typeof item.text === "string"
      ) {
        return item.text;
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function aiSentenceResponseText(result) {
  const parts = [];
  const anthropicContent = aiContentText(result?.content);
  if (anthropicContent) parts.push(anthropicContent);
  if (typeof result?.output_text === "string") {
    parts.push(result.output_text);
  }
  for (const item of Array.isArray(result?.output) ? result.output : []) {
    if (item?.type !== "message") continue;
    const text = aiContentText(item.content);
    if (text) parts.push(text);
  }
  const choices = Array.isArray(result?.choices)
    ? result.choices
    : Array.isArray(result?.output?.choices)
      ? result.output.choices
      : [];
  for (const choice of choices) {
    const text =
      aiContentText(choice?.message?.content) ||
      aiContentText(choice?.delta?.content) ||
      (typeof choice?.text === "string" ? choice.text : "");
    if (text) parts.push(text);
  }
  if (typeof result?.output?.text === "string") parts.push(result.output.text);
  if (typeof result?.text === "string") parts.push(result.text);
  return cleanResearchText(parts.join("\n"), 100000);
}

function aiProcessingSettings(providerOverride = "") {
  const provider = ["qwen", "claude", "deepseek"].includes(providerOverride)
    ? providerOverride
    : aiSentenceSettings.provider;
  if (
    provider === aiSentenceSettings.provider &&
    aiSentenceSettings.apiKey
  ) {
    return { ...aiSentenceSettings, provider };
  }
  const preset = AI_SENTENCE_PROVIDER_PRESETS[provider];
  const credential = translationCredential(provider);
  return {
    provider,
    protocol: preset.protocol,
    endpoint: preset.endpoint,
    authMode: preset.authMode,
    apiKey: credential.apiKey,
    model: credential.model || preset.model,
  };
}

function aiChatCompletionRequestPayload(
  processingSettings,
  messages,
  maxTokens
) {
  const payload = {
    model: processingSettings.model,
    messages,
    stream: false,
    max_tokens:
      processingSettings.provider === "qwen"
        ? Math.min(maxTokens, 8192)
        : maxTokens,
  };
  if (processingSettings.provider === "qwen") {
    payload.enable_thinking = false;
  }
  return payload;
}

function aiProviderRequestTimeout(processingSettings) {
  return processingSettings.provider === "qwen" ? 120000 : 240000;
}

async function segmentTextWithAi(
  value,
  task = "segment",
  providerOverride = ""
) {
  const translate = task === "segment-translate";
  const processingSettings = aiProcessingSettings(providerOverride);
  const text = cleanResearchText(value, 60000);
  if (!text) {
    throw new Error(
      translate ? "请先投入需要断句并翻译的文本" : "请先投入需要断句的文本"
    );
  }
  const requiresKey = processingSettings.authMode !== "none";
  if (
    !processingSettings.endpoint ||
    !processingSettings.model ||
    (requiresKey && !processingSettings.apiKey)
  ) {
    throw new Error(
      `${aiSentenceProviderName(processingSettings.provider)}尚未完整配置`
    );
  }
  const instruction = translate
    ? "你是严谨的历史文献翻译助手。先根据外文原意判断句界、恢复必要标点和分段，再将全文完整翻译为简体中文。不得遗漏、扩写、解释或虚构；人名、地名、机构名和年代须尽量准确，无法确认处保持审慎。只输出经过断句和翻译后的最终中文正文，不要输出中间外文、说明、标题或代码块。"
    : "你是中文史料与古籍断句助手。只为用户原文添加合适的中文标点和必要分段；不得增字、删字、改字、转写、释义、纠错或改变繁简体。保留原有异体字、旧字形、数字、空缺符号和无法辨认标记。只输出断句后的正文，不要解释，不要添加标题或代码块。";
  const requestPayload =
    processingSettings.protocol === "anthropic-messages"
      ? {
          model: processingSettings.model,
          system: instruction,
          messages: [{ role: "user", content: text }],
          max_tokens: 16000,
          thinking: { type: "disabled" },
        }
      : aiChatCompletionRequestPayload(
          processingSettings,
          [
            { role: "system", content: instruction },
            { role: "user", content: text },
          ],
          16000
        );
  const body = Buffer.from(JSON.stringify(requestPayload), "utf8");
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": body.length,
  };
  if (processingSettings.authMode === "x-api-key") {
    headers["x-api-key"] = normalizeAiApiKey(
      processingSettings.apiKey,
      "x-api-key"
    );
    headers["anthropic-version"] = "2023-06-01";
  } else if (processingSettings.authMode === "bearer") {
    headers.Authorization =
      `Bearer ${normalizeAiApiKey(processingSettings.apiKey, "bearer")}`;
  }
  const serviceName = `${aiSentenceProviderName(processingSettings.provider)}${
    translate ? "断句翻译服务" : "断句服务"
  }`;
  const response = await aiApiRequest(
    processingSettings.endpoint,
    {
      headers,
      body,
      serviceName,
      timeout: 240000,
    }
  );
  const result = parseCloudJson(response, serviceName);
  if (result?.error) {
    throw new Error(
      result.error.message || result.error.code || `${serviceName}失败`
    );
  }
  const outputText = aiSentenceResponseText(result);
  if (!outputText) {
    throw new Error(
      `${serviceName}没有返回可用的${translate ? "最终译文" : "断句文本"}`
    );
  }
  return outputText;
}

function researchMaterialTitle(record) {
  return cleanResearchText(
    path.basename(record.relativePath || "") ||
      record.title ||
      record.citation ||
      record.paper ||
      record.id,
    1000
  );
}

function researchMaterialKindLabel(kind) {
  if (kind === "paper") return "论文";
  if (kind === "book") return "专著";
  return "史料";
}

function buildResearchMaterialPayload(record, index, scope, textLimit) {
  const label = `M${index + 1}`;
  const kind = normalizeKind(record.kind);
  const title = researchMaterialTitle(record);
  const lines = [
    `[${label} | 记录ID:${record.id} | 类型:${researchMaterialKindLabel(
      kind
    )} | 标题:${title}]`,
  ];
  let remaining = Math.min(
    20000,
    Math.max(4000, Number.parseInt(textLimit, 10) || 10000)
  );
  const append = (heading, value) => {
    const text = cleanResearchText(value, remaining);
    if (!text || remaining <= 0) return;
    const block = `${heading}\n${text}`;
    const clipped = block.slice(0, remaining);
    lines.push(clipped);
    remaining -= clipped.length;
  };

  if (scope.metadata) {
    append(
      `[${label}-META] 书目信息与标签`,
      [
        record.date ? `日期：${record.date}` : "",
        record.paper ? `来源／书名：${record.paper}` : "",
        record.edition ? `版次：${record.edition}` : "",
        record.author ? `作者：${record.author}` : "",
        record.journal ? `期刊：${record.journal}` : "",
        record.institution ? `机构：${record.institution}` : "",
        record.citation ? `引文信息：${record.citation}` : "",
        (record.tags || []).length
          ? `标签：${parseTags(record.tags).join("、")}`
          : "",
        (record.projects || []).length
          ? `项目：${parseProjects(record.projects).join("、")}`
          : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
  }

  if (scope.ocr) {
    for (const page of normalizeOcrPages(record.ocrPages)) {
      if (remaining <= 0) break;
      const text = page.correctedText || page.rawText;
      append(
        `[${label}-P${page.page}] OCR ${
          page.correctedText ? "校订稿" : "原文"
        }`,
        text
      );
    }
  }

  if (scope.annotations) {
    const annotations = normalizeAnnotations(record.annotations);
    const annotationById = new Map(
      annotations.map((annotation) => [annotation.id, annotation])
    );
    for (const region of normalizeOcrRegions(record.ocrRegions, [])) {
      if (remaining <= 0 || !region.annotationId) continue;
      const annotation = annotationById.get(region.annotationId);
      const text = region.correctedText || region.rawText;
      append(
        `[${label}-A${region.annotationId}-P${region.page}] 框选${
          annotation?.text ? `“${annotation.text}”` : ""
        }`,
        text
      );
    }
    for (const annotation of annotations) {
      if (remaining <= 0) break;
      const hasTextRegion = normalizeOcrRegions(record.ocrRegions, []).some(
        (region) => region.annotationId === annotation.id
      );
      if (!hasTextRegion) {
        append(
          `[${label}-A${annotation.id}-P${annotation.page}] 框选位置`,
          annotation.text
        );
      }
    }
  }

  if (scope.notes) {
    for (const note of normalizeResearchNotes(record.researchNotes)) {
      if (remaining <= 0) break;
      const referenceText = (note.references || [])
        .map((reference) => {
          const page = reference.page ? `第${reference.page}页` : "";
          const region = reference.regionId
            ? `框选${reference.regionId}`
            : "";
          return [page, region, reference.excerpt].filter(Boolean).join("｜");
        })
        .filter(Boolean)
        .join("\n");
      append(
        `[${label}-NOTE-${note.id}] 记录笔记`,
        [note.text, referenceText ? `所引位置：\n${referenceText}` : ""]
          .filter(Boolean)
          .join("\n")
      );
    }
  }

  if (scope.translations) {
    for (const translation of normalizeTranslations(record.translations)) {
      if (remaining <= 0) break;
      append(
        `[${label}-TR-${translation.id}-P${translation.page}] 已保存译文`,
        [
          `来源语言：${translation.sourceLanguage}；目标语言：${translation.targetLanguage}`,
          translation.translatedText,
        ].join("\n")
      );
    }
  }

  return {
    material: {
      recordId: record.id,
      label,
      kind,
      title,
      name: path.basename(record.relativePath || ""),
      relativePath: record.relativePath || "",
    },
    text: lines.join("\n\n"),
  };
}

function parseResearchSuggestionJson(rawText) {
  const source = String(rawText || "").trim();
  const candidates = [
    source,
    source.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, ""),
  ];
  const firstBrace = source.indexOf("{");
  const lastBrace = source.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    candidates.push(source.slice(firstBrace, lastBrace + 1));
  }
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed && typeof parsed === "object") return parsed;
    } catch {
      // 保留原始回复，由后续回退记录承接。
    }
  }
  return null;
}

async function generateResearchSuggestionsWithAi(
  materialPayloads,
  types,
  provider
) {
  const processingSettings = aiProcessingSettings(provider);
  const requiresKey = processingSettings.authMode !== "none";
  if (
    !processingSettings.endpoint ||
    !processingSettings.model ||
    (requiresKey && !processingSettings.apiKey)
  ) {
    throw new Error(
      `${aiSentenceProviderName(processingSettings.provider)}尚未完整配置`
    );
  }
  const typeLabels = types.map((type) => AI_SUGGESTION_TYPE_LABELS[type]);
  const instruction =
    "你是严谨的历史研究助理。只能依据用户提供的材料提出研究辅助建议，不得补造史实、引文、页码或来源。" +
    "必须把材料直接陈述与分析性判断区分开：classification 为 fact 时，content 只能复述材料中可直接核对的事实；其余一律标为 inference。" +
    "每条建议必须给出 basis 数组，recordId 必须逐字使用材料中的记录ID；如依据带页码或框选编号，必须填写对应 page、annotationId，并摘录短句 excerpt。" +
    "不要声称已经查阅未提供的资料。只返回合法 JSON，不要输出代码块或说明文字。";
  const userText = [
    `请生成这些类型的建议：${typeLabels.join("、")}。`,
    "JSON 格式必须为：",
    '{"suggestions":[{"type":"lead|relation|gap|question|search","title":"简短标题","content":"具体建议","classification":"fact|inference","basis":[{"recordId":"原记录ID","page":0,"annotationId":"","excerpt":"短依据"}]}]}',
    "只使用请求的类型。后续检索词可以在 content 中用顿号分隔。每条建议均须有至少一项 basis。",
    "以下是已经由用户确认发送的材料纯文本：",
    ...materialPayloads.map((item) => item.text),
  ].join("\n\n");
  const requestPayload =
    processingSettings.protocol === "anthropic-messages"
      ? {
          model: processingSettings.model,
          system: instruction,
          messages: [{ role: "user", content: userText }],
          max_tokens: 16000,
          thinking: { type: "disabled" },
        }
      : aiChatCompletionRequestPayload(
          processingSettings,
          [
            { role: "system", content: instruction },
            { role: "user", content: userText },
          ],
          16000
        );
  const body = Buffer.from(JSON.stringify(requestPayload), "utf8");
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": body.length,
  };
  if (processingSettings.authMode === "x-api-key") {
    headers["x-api-key"] = normalizeAiApiKey(
      processingSettings.apiKey,
      "x-api-key"
    );
    headers["anthropic-version"] = "2023-06-01";
  } else if (processingSettings.authMode === "bearer") {
    headers.Authorization =
      `Bearer ${normalizeAiApiKey(processingSettings.apiKey, "bearer")}`;
  }
  const serviceName =
    `${aiSentenceProviderName(processingSettings.provider)}AI 建议服务`;
  const response = await aiApiRequest(processingSettings.endpoint, {
    headers,
    body,
    serviceName,
    timeout: aiProviderRequestTimeout(processingSettings),
  });
  const result = parseCloudJson(response, serviceName);
  if (result?.error) {
    throw new Error(
      result.error.message || result.error.code || `${serviceName}失败`
    );
  }
  const rawText = aiSentenceResponseText(result);
  if (!rawText) throw new Error(`${serviceName}没有返回可用内容`);
  const parsed = parseResearchSuggestionJson(rawText);
  const materials = materialPayloads.map((item) => item.material);
  let suggestions = normalizeAiSuggestionItems(
    parsed?.suggestions,
    materials
  ).filter((item) => types.includes(item.type));
  suggestions = suggestions.map((item) => {
    const basis = item.basis.length
      ? item.basis
      : [
          {
            recordId: materials[0].recordId,
            materialLabel: materials[0].title || materials[0].name,
            page: 0,
            annotationId: "",
            excerpt: "",
          },
        ];
    const directlyTraceable = basis.some(
      (entry) => entry.page || entry.annotationId || entry.excerpt
    );
    return {
      ...item,
      classification:
        item.classification === "fact" && directlyTraceable
          ? "fact"
          : "inference",
      basis,
    };
  });
  if (!suggestions.length) {
    suggestions = normalizeAiSuggestionItems(
      [
        {
          type: types[0] || "lead",
          title: "AI 原始研究建议",
          content: rawText,
          classification: "inference",
          basis: materials.slice(0, 3).map((material) => ({
            recordId: material.recordId,
            page: 0,
            annotationId: "",
            excerpt: "",
          })),
        },
      ],
      materials
    );
  }
  return {
    provider: processingSettings.provider,
    providerName: aiSentenceProviderName(processingSettings.provider),
    model: processingSettings.model,
    rawText,
    suggestions,
  };
}

function recentAiChatHistory(messages, limit = 30000) {
  const normalized = normalizeAiChatMessages(messages);
  const selected = [];
  let remaining = limit;
  for (let index = normalized.length - 1; index >= 0; index -= 1) {
    const message = normalized[index];
    const text = cleanResearchText(message.text, Math.min(10000, remaining));
    if (!text || remaining <= 0) break;
    selected.unshift({ role: message.role, content: text });
    remaining -= text.length;
  }
  return selected.slice(-20);
}

async function answerResearchQuestionWithAi(
  question,
  history,
  materialPayloads,
  provider
) {
  const processingSettings = aiProcessingSettings(provider);
  const requiresKey = processingSettings.authMode !== "none";
  if (
    !processingSettings.endpoint ||
    !processingSettings.model ||
    (requiresKey && !processingSettings.apiKey)
  ) {
    throw new Error(
      `${aiSentenceProviderName(processingSettings.provider)}尚未完整配置`
    );
  }
  const cleanQuestion = cleanResearchText(question, 20000);
  if (!cleanQuestion) throw new Error("请先输入问题");
  const hasMaterials = materialPayloads.length > 0;
  const instruction =
    "你是严谨的历史研究问答助手。回答必须清楚区分材料直接陈述、你的分析推测和需要继续核实的事项。" +
    "不得伪造史实、来源、引文、页码或档案号。若用户附加了材料，只能把材料中实际出现的内容称为材料依据，并尽量使用材料中的[M编号-P页码]或[M编号-A框选编号-P页码]标识回引。" +
    "若用户没有附加材料，应明确说明回答来自模型一般知识，不能视为史料依据。回答使用简体中文，结构清楚，不要输出代码块。";
  const currentUserContent = [
    cleanQuestion,
    hasMaterials
      ? "以下是操作者本轮明确确认附加的材料纯文本："
      : "本轮没有附加用户材料。",
    ...materialPayloads.map((item) => item.text),
  ].join("\n\n");
  const messages = [
    ...recentAiChatHistory(history),
    { role: "user", content: currentUserContent },
  ];
  const requestPayload =
    processingSettings.protocol === "anthropic-messages"
      ? {
          model: processingSettings.model,
          system: instruction,
          messages,
          max_tokens: 12000,
          thinking: { type: "disabled" },
        }
      : aiChatCompletionRequestPayload(
          processingSettings,
          [{ role: "system", content: instruction }, ...messages],
          12000
        );
  const body = Buffer.from(JSON.stringify(requestPayload), "utf8");
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": body.length,
  };
  if (processingSettings.authMode === "x-api-key") {
    headers["x-api-key"] = normalizeAiApiKey(
      processingSettings.apiKey,
      "x-api-key"
    );
    headers["anthropic-version"] = "2023-06-01";
  } else if (processingSettings.authMode === "bearer") {
    headers.Authorization =
      `Bearer ${normalizeAiApiKey(processingSettings.apiKey, "bearer")}`;
  }
  const serviceName =
    `${aiSentenceProviderName(processingSettings.provider)}AI 问答服务`;
  const response = await aiApiRequest(processingSettings.endpoint, {
    headers,
    body,
    serviceName,
    timeout: aiProviderRequestTimeout(processingSettings),
  });
  const result = parseCloudJson(response, serviceName);
  if (result?.error) {
    throw new Error(
      result.error.message || result.error.code || `${serviceName}失败`
    );
  }
  const text = aiSentenceResponseText(result);
  if (!text) throw new Error(`${serviceName}没有返回可用回答`);
  return {
    text,
    provider: processingSettings.provider,
    providerName: aiSentenceProviderName(processingSettings.provider),
    model: processingSettings.model,
  };
}

function normalizeRichTextSegments(value, fallbackText = "", limit = 6000) {
  const allowedColors = new Set(["black", "red", "blue"]);
  const source = Array.isArray(value)
    ? value
    : cleanResearchText(fallbackText, limit)
      ? [{
          text: cleanResearchText(fallbackText, limit),
          color: "black",
          size: 14,
          bold: false,
        }]
      : [];
  const normalized = [];
  let remaining = limit;
  for (const item of source) {
    if (remaining <= 0) break;
    const text = String(item?.text || "")
      .replace(/\r\n?/g, "\n")
      .replace(/\u0000/g, "")
      .slice(0, remaining);
    if (!text) continue;
    const color = allowedColors.has(item?.color) ? item.color : "black";
    const size = Math.min(
      28,
      Math.max(12, Number.parseInt(item?.size, 10) || 14)
    );
    const bold = Boolean(item?.bold);
    const previous = normalized[normalized.length - 1];
    if (
      previous?.color === color &&
      previous?.size === size &&
      previous?.bold === bold
    ) {
      previous.text += text;
    } else {
      normalized.push({ text, color, size, bold });
    }
    remaining -= text.length;
  }
  while (normalized.length && !normalized[0].text.trimStart()) {
    normalized.shift();
  }
  while (normalized.length && !normalized[normalized.length - 1].text.trimEnd()) {
    normalized.pop();
  }
  if (normalized.length) {
    normalized[0].text = normalized[0].text.trimStart();
    normalized[normalized.length - 1].text =
      normalized[normalized.length - 1].text.trimEnd();
  }
  return normalized.filter((item) => item.text);
}

function clampCoordinate(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(1, Math.max(0, number));
}

function normalizeAnnotations(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const text = cleanResearchText(item?.text, 200000);
      return {
        id:
          typeof item?.id === "string" && item.id
            ? item.id
            : `ann-${crypto.randomUUID()}`,
        page: Math.min(9999, Math.max(1, Number.parseInt(item?.page, 10) || 1)),
        x: clampCoordinate(item?.x),
        y: clampCoordinate(item?.y),
        width: clampCoordinate(item?.width),
        height: clampCoordinate(item?.height),
        coordinateSpace:
          item?.coordinateSpace === "media" ? "media" : "legacy-stage",
        color: ["red", "amber", "blue"].includes(item?.color)
          ? item.color
          : "red",
        text,
        recordRichText: normalizeRichTextSegments(
          item?.recordRichText,
          text,
          200000
        ),
        createdAt: item?.createdAt || now(),
        updatedAt: item?.updatedAt || item?.createdAt || now(),
      };
    })
    .filter(
      (item) =>
        item.text && item.width >= 0.005 && item.height >= 0.005
    )
    .slice(-500);
}

function normalizeResearchNotes(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const text = cleanResearchText(item?.text);
      return {
        id:
          typeof item?.id === "string" && item.id
            ? item.id
            : `note-${crypto.randomUUID()}`,
        text,
        richText: normalizeRichTextSegments(item?.richText, text),
        references: normalizeNoteReferences(item?.references),
        createdAt: item?.createdAt || now(),
        updatedAt: item?.updatedAt || item?.createdAt || now(),
      };
    })
    .filter((item) => item.text)
    .slice(-500);
}

function normalizeNoteReferences(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      type: ["ocr-raw", "ocr-corrected", "original"].includes(item?.type)
        ? item.type
        : "original",
      page: Math.min(9999, Math.max(1, Number.parseInt(item?.page, 10) || 1)),
      regionId:
        typeof item?.regionId === "string" ? item.regionId.slice(0, 120) : "",
      x: clampCoordinate(item?.x),
      y: clampCoordinate(item?.y),
      width: clampCoordinate(item?.width),
      height: clampCoordinate(item?.height),
      excerpt: cleanResearchText(item?.excerpt, 2000),
      sourceUpdatedAt:
        typeof item?.sourceUpdatedAt === "string" ? item.sourceUpdatedAt : "",
    }))
    .filter((item) => item.type === "original" || item.excerpt)
    .slice(-30);
}

function normalizeOcrRegions(value, legacyPages = []) {
  const source = Array.isArray(value) ? value : [];
  const legacy = Array.isArray(legacyPages)
    ? legacyPages.map((item) => ({
        ...item,
        id: item?.id || `ocr-legacy-page-${Number(item?.page) || 1}`,
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        legacyFullPage: true,
      }))
    : [];
  const byId = new Map();
  [...legacy, ...source].forEach((item) => {
    const rawText = cleanResearchText(item?.rawText, 200000);
    const correctedText = cleanResearchText(item?.correctedText, 200000);
    const translationSourceText = cleanResearchText(
      item?.translationSourceText,
      200000
    );
    if (!rawText && !correctedText) return;
    const id =
      typeof item?.id === "string" && item.id
        ? item.id.slice(0, 120)
        : `ocr-${crypto.randomUUID()}`;
    const x = clampCoordinate(item?.x);
    const y = clampCoordinate(item?.y);
    const width = Math.min(clampCoordinate(item?.width || 1), 1 - x);
    const height = Math.min(clampCoordinate(item?.height || 1), 1 - y);
    if (width < 0.005 || height < 0.005) return;
    byId.set(id, {
      id,
      page: Math.min(9999, Math.max(1, Number.parseInt(item?.page, 10) || 1)),
      x,
      y,
      width,
      height,
      mode:
        item?.mode === "full-page" || item?.legacyFullPage
          ? "full-page"
          : "region",
      rawText,
      correctedText,
      correctedRichText: normalizeRichTextSegments(
        item?.correctedRichText,
        correctedText,
        200000
      ),
      translationSourceText,
      translationSourceRichText: normalizeRichTextSegments(
        item?.translationSourceRichText,
        translationSourceText,
        200000
      ),
      translationSourceLanguage: String(
        item?.translationSourceLanguage || ""
      ).slice(0, 40),
      translationTargetLanguage: String(
        item?.translationTargetLanguage || ""
      ).slice(0, 40),
      translationEngine: String(item?.translationEngine || "").slice(0, 80),
      translationModel: String(item?.translationModel || "").slice(0, 120),
      correctedComplete: Boolean(item?.correctedComplete),
      correctedManual:
        Boolean(item?.correctedManual) ||
        (!rawText && Boolean(correctedText)) ||
        Boolean(rawText && correctedText && correctedText !== rawText),
      engine:
        [
          "Umi-OCR",
          "看典古籍 OCR",
          "百度智能云 OCR（高精度含位置版）",
          "Codex（云端）",
          "手工录入",
        ].includes(item?.engine)
          ? item.engine
          : typeof item?.engine === "string" && item.engine.trim()
            ? item.engine.trim().slice(0, 100)
            : rawText
              ? "Umi-OCR"
              : "手工录入",
      recognizedAt:
        typeof item?.recognizedAt === "string" ? item.recognizedAt : "",
      correctedAt:
        typeof item?.correctedAt === "string" ? item.correctedAt : "",
      updatedAt: item?.updatedAt || item?.recognizedAt || item?.correctedAt || now(),
      legacyFullPage: Boolean(item?.legacyFullPage),
      annotationId:
        typeof item?.annotationId === "string"
          ? item.annotationId.slice(0, 120)
          : "",
    });
  });
  return Array.from(byId.values())
    .sort((a, b) => {
      const pageOrder = a.page - b.page;
      return pageOrder || a.recognizedAt.localeCompare(b.recognizedAt);
    })
    .slice(-5000);
}

function normalizeOcrPages(value) {
  if (!Array.isArray(value)) return [];
  const byPage = new Map();
  value.forEach((item) => {
    const page = Math.min(
      9999,
      Math.max(1, Number.parseInt(item?.page, 10) || 1)
    );
    const normalized = {
      page,
      rawText: cleanResearchText(item?.rawText, 200000),
      correctedText: cleanResearchText(item?.correctedText, 200000),
      correctedComplete: Boolean(item?.correctedComplete),
      engine:
        typeof item?.engine === "string" && item.engine.trim()
          ? item.engine.trim().slice(0, 100)
          : "",
      recognizedAt:
        typeof item?.recognizedAt === "string" ? item.recognizedAt : "",
      correctedAt:
        typeof item?.correctedAt === "string" ? item.correctedAt : "",
      updatedAt: item?.updatedAt || item?.recognizedAt || item?.correctedAt || now(),
    };
    if (normalized.rawText || normalized.correctedText) byPage.set(page, normalized);
  });
  return Array.from(byPage.values())
    .sort((a, b) => a.page - b.page)
    .slice(-9999);
}

function normalizeTranslations(value) {
  if (!Array.isArray(value)) return [];
  const allowedEngines = new Set([
    "edge",
    "argos",
    "deepseek",
    "qwen",
    "claude",
  ]);
  return value
    .map((item) => ({
      id:
        typeof item?.id === "string" && item.id
          ? item.id.slice(0, 120)
          : `translation-${crypto.randomUUID()}`,
      page: Math.min(
        9999,
        Math.max(1, Number.parseInt(item?.page, 10) || 1)
      ),
      sourceLanguage:
        typeof item?.sourceLanguage === "string"
          ? item.sourceLanguage.slice(0, 40)
          : "en",
      targetLanguage:
        typeof item?.targetLanguage === "string"
          ? item.targetLanguage.slice(0, 40)
          : "zh",
      engine: allowedEngines.has(item?.engine) ? item.engine : "argos",
      engineLabel:
        typeof item?.engineLabel === "string"
          ? item.engineLabel.slice(0, 100)
          : "",
      sourceText: cleanResearchText(item?.sourceText, 200000),
      translatedText: cleanResearchText(item?.translatedText, 200000),
      model:
        typeof item?.model === "string" ? item.model.slice(0, 120) : "",
      sourceRegionId:
        typeof item?.sourceRegionId === "string"
          ? item.sourceRegionId.slice(0, 120)
          : "",
      createdAt: item?.createdAt || now(),
      updatedAt: item?.updatedAt || item?.createdAt || now(),
    }))
    .filter((item) => item.sourceText && item.translatedText)
    .slice(-2000);
}

const AI_SUGGESTION_TYPES = new Set([
  "lead",
  "relation",
  "gap",
  "question",
  "search",
]);

const AI_SUGGESTION_TYPE_LABELS = {
  lead: "研究线索",
  relation: "材料关联",
  gap: "矛盾与缺口",
  question: "待核问题",
  search: "后续检索词",
};

function normalizeAiSuggestionMaterials(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      recordId:
        typeof item?.recordId === "string" ? item.recordId.slice(0, 160) : "",
      label:
        typeof item?.label === "string" ? item.label.slice(0, 40) : "",
      kind: normalizeKind(item?.kind),
      title: cleanResearchText(item?.title, 1000),
      name: cleanResearchText(item?.name, 1000),
      relativePath:
        typeof item?.relativePath === "string"
          ? item.relativePath.slice(0, 2000)
          : "",
    }))
    .filter((item) => item.recordId)
    .slice(0, 20);
}

function refreshAiSuggestionMaterials(value) {
  return normalizeAiSuggestionMaterials(value).map((material) => {
    const record = libraryModel?.records?.[material.recordId];
    if (!record || record.missing) return material;
    return {
      ...material,
      kind: normalizeKind(record.kind),
      title: researchMaterialTitle(record),
      name: path.basename(record.relativePath || "") || material.name,
      relativePath: record.relativePath || material.relativePath,
    };
  });
}

function refreshedAiSuggestionRecords(value) {
  return normalizeAiSuggestionRecords(value).map((record) => {
    const materials = refreshAiSuggestionMaterials(record.materials);
    const currentNameById = new Map(
      materials.map((material) => [material.recordId, material.name])
    );
    return {
      ...record,
      materials,
      suggestions: record.suggestions.map((suggestion) => ({
        ...suggestion,
        basis: suggestion.basis.map((basis) => ({
          ...basis,
          materialLabel:
            currentNameById.get(basis.recordId) || basis.materialLabel,
        })),
      })),
    };
  });
}

function refreshedAiChatMessages(value) {
  return normalizeAiChatMessages(value).map((message) => {
    const contextMaterials = refreshAiSuggestionMaterials(
      message.contextMaterials
    );
    return {
      ...message,
      contextMaterials,
      contextMaterialCount: contextMaterials.length,
    };
  });
}

function normalizeAiSuggestionBasis(value, materials = []) {
  if (!Array.isArray(value)) return [];
  const materialById = new Map(
    materials.map((material) => [material.recordId, material])
  );
  return value
    .map((item) => {
      const recordId =
        typeof item?.recordId === "string"
          ? item.recordId.slice(0, 160)
          : "";
      const material = materialById.get(recordId);
      return {
        recordId,
        materialLabel:
          material?.title ||
          material?.name ||
          (typeof item?.materialLabel === "string"
            ? item.materialLabel.slice(0, 1000)
            : ""),
        page: Math.min(
          9999,
          Math.max(0, Number.parseInt(item?.page, 10) || 0)
        ),
        annotationId:
          typeof item?.annotationId === "string"
            ? item.annotationId.slice(0, 160)
            : "",
        excerpt: cleanResearchText(item?.excerpt, 1000),
      };
    })
    .filter((item) => item.recordId && materialById.has(item.recordId))
    .slice(0, 12);
}

function normalizeAiSuggestionItems(value, materials = []) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const type = AI_SUGGESTION_TYPES.has(item?.type)
        ? item.type
        : "lead";
      return {
        id:
          typeof item?.id === "string" && item.id
            ? item.id.slice(0, 160)
            : `suggestion-item-${crypto.randomUUID()}`,
        type,
        typeLabel: AI_SUGGESTION_TYPE_LABELS[type],
        title: cleanResearchText(item?.title, 1000) || "研究建议",
        content: cleanResearchText(item?.content, 20000),
        classification:
          item?.classification === "fact" ? "fact" : "inference",
        basis: normalizeAiSuggestionBasis(item?.basis, materials),
      };
    })
    .filter((item) => item.content)
    .slice(0, 100);
}

function normalizeAiSuggestionRecords(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const materials = normalizeAiSuggestionMaterials(item?.materials);
      const types = Array.isArray(item?.types)
        ? item.types.filter((type) => AI_SUGGESTION_TYPES.has(type)).slice(0, 5)
        : [];
      return {
        id:
          typeof item?.id === "string" && item.id
            ? item.id.slice(0, 160)
            : `ai-suggestion-${crypto.randomUUID()}`,
        createdAt: item?.createdAt || now(),
        provider:
          ["qwen", "claude", "deepseek"].includes(item?.provider)
            ? item.provider
            : "qwen",
        providerName:
          typeof item?.providerName === "string"
            ? item.providerName.slice(0, 100)
            : "",
        model:
          typeof item?.model === "string" ? item.model.slice(0, 160) : "",
        types,
        scope: {
          metadata: Boolean(item?.scope?.metadata),
          ocr: Boolean(item?.scope?.ocr),
          annotations: Boolean(item?.scope?.annotations),
          notes: Boolean(item?.scope?.notes),
          translations: Boolean(item?.scope?.translations),
        },
        textLimit: Math.min(
          20000,
          Math.max(4000, Number.parseInt(item?.textLimit, 10) || 10000)
        ),
        materials,
        suggestions: normalizeAiSuggestionItems(item?.suggestions, materials),
        rawText: cleanResearchText(item?.rawText, 200000),
      };
    })
    .filter((item) => item.materials.length && item.rawText)
    .slice(-500);
}

function normalizeAiChatMessages(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      id:
        typeof item?.id === "string" && item.id
          ? item.id.slice(0, 160)
          : `ai-chat-${crypto.randomUUID()}`,
      role: item?.role === "assistant" ? "assistant" : "user",
      text: cleanResearchText(item?.text, 100000),
      provider:
        ["qwen", "claude", "deepseek"].includes(item?.provider)
          ? item.provider
          : "",
      providerName:
        typeof item?.providerName === "string"
          ? item.providerName.slice(0, 100)
          : "",
      model:
        typeof item?.model === "string" ? item.model.slice(0, 160) : "",
      contextMaterialCount: Math.min(
        20,
        Math.max(0, Number.parseInt(item?.contextMaterialCount, 10) || 0)
      ),
      contextMaterials: normalizeAiSuggestionMaterials(
        item?.contextMaterials
      ),
      createdAt: item?.createdAt || now(),
    }))
    .filter((item) => item.text)
    .slice(-500);
}

function uniqueStrings(values, limit = 100) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map((item) => sanitizeComponent(item))
    .filter((item) => item && !seen.has(item) && seen.add(item))
    .slice(0, limit);
}

function parseTags(value) {
  const values = Array.isArray(value)
    ? value
    : String(value || "").split(/[,，、；;\n]+/);
  return uniqueStrings(values, 30);
}

function parseProjects(value) {
  return uniqueStrings(Array.isArray(value) ? value : [], 30);
}

function isTestLibrary(folder) {
  return fs.existsSync(path.join(folder, TEST_LIBRARY_MARKER));
}

function isFormalLibrary(folder) {
  return fs.existsSync(path.join(folder, LIBRARY_MARKER));
}

function isWritableLibrary(folder) {
  return isTestLibrary(folder) || isFormalLibrary(folder);
}

function ensureFolder(folder) {
  const resolved = path.resolve(String(folder || ""));
  const stats = fs.statSync(resolved);
  if (!stats.isDirectory()) throw new Error("所选位置不是文件夹");
  return resolved;
}

function isInsideLibrary(candidate) {
  const root = path.resolve(currentLibrary);
  const resolved = path.resolve(candidate);
  return resolved === root || resolved.startsWith(`${root}${path.sep}`);
}

function isSameOrInsideFolder(parent, candidate) {
  const relative = path.relative(path.resolve(parent), path.resolve(candidate));
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) &&
      relative !== ".." &&
      !path.isAbsolute(relative))
  );
}

function scanImportSourceFolder(folder, recursive) {
  const files = [];
  const queue = [folder];
  while (queue.length && files.length < 2000) {
    const current = queue.shift();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (
        entry.name.startsWith(".") ||
        entry.name === LIBRARY_DATA_FOLDER
      ) {
        continue;
      }
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (recursive) queue.push(fullPath);
        continue;
      }
      const extension = path.extname(entry.name).toLowerCase();
      if (!entry.isFile() || !SUPPORTED.has(extension)) continue;
      const stats = fs.statSync(fullPath);
      files.push({
        id: `folder-import-item-${crypto.randomUUID()}`,
        sourcePath: fullPath,
        name: entry.name,
        relativePath: path.relative(folder, fullPath),
        extension,
        size: stats.size,
      });
      if (files.length >= 2000) break;
    }
  }
  return files.sort((a, b) =>
    a.relativePath.localeCompare(b.relativePath, "zh-CN", {
      numeric: true,
    })
  );
}

function scanImportSourcePaths(sourcePaths, recursive = true) {
  const requested = Array.isArray(sourcePaths) ? sourcePaths : [];
  const roots = [];
  const seenRoots = new Set();
  for (const value of requested.slice(0, 2000)) {
    const resolved = path.resolve(String(value || ""));
    const key = resolved.toLocaleLowerCase();
    if (!String(value || "").trim() || seenRoots.has(key)) continue;
    if (!fs.existsSync(resolved)) {
      throw new Error(`导入来源不存在：${resolved}`);
    }
    seenRoots.add(key);
    roots.push(resolved);
  }
  const includeRootName = roots.length > 1;
  const items = [];
  const seenFiles = new Set();
  const appendFile = (sourcePath, relativePath) => {
    if (items.length >= 2000) return;
    const resolved = path.resolve(sourcePath);
    const key = resolved.toLocaleLowerCase();
    const extension = path.extname(resolved).toLocaleLowerCase();
    if (seenFiles.has(key) || !SUPPORTED.has(extension)) return;
    const stats = fs.statSync(resolved);
    if (!stats.isFile()) return;
    seenFiles.add(key);
    items.push({
      id: `folder-import-item-${crypto.randomUUID()}`,
      sourcePath: resolved,
      name: path.basename(resolved),
      relativePath,
      extension,
      size: stats.size,
    });
  };
  for (const root of roots) {
    if (items.length >= 2000) break;
    const stats = fs.statSync(root);
    if (stats.isFile()) {
      appendFile(root, path.basename(root));
      continue;
    }
    if (!stats.isDirectory()) continue;
    const prefix = includeRootName ? path.basename(root) : "";
    for (const item of scanImportSourceFolder(root, recursive)) {
      appendFile(
        item.sourcePath,
        prefix ? path.join(prefix, item.relativePath) : item.relativePath
      );
      if (items.length >= 2000) break;
    }
  }
  return items.sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath, "zh-CN", {
      numeric: true,
    })
  );
}

function toRelative(filePath) {
  return path.relative(currentLibrary, filePath);
}

function normalizedScreenshotFolder(value) {
  const raw = String(value || DEFAULT_SCREENSHOT_FOLDER).trim();
  const candidate = path.resolve(currentLibrary, raw);
  if (!isInsideLibrary(candidate)) return DEFAULT_SCREENSHOT_FOLDER;
  return path.relative(currentLibrary, candidate) || ".";
}

function screenshotDirectory() {
  ensureLibraryModel();
  return path.resolve(
    currentLibrary,
    normalizedScreenshotFolder(libraryModel.screenshotFolder)
  );
}

function screenshotBaseName(record, page) {
  const originalName = String(
    record?.originalName || record?.relativePath || record?.title || "未命名文件"
  );
  const originalBase = path.parse(path.basename(originalName)).name;
  const safeBase = sanitizeComponent(originalBase).slice(0, 180) || "未命名文件";
  return `scr-${safeBase}-${page}`;
}

function availableScreenshotFile(exportDirectory, baseName) {
  let sequence = 1;
  let fileName = `${baseName}.png`;
  while (fs.existsSync(path.join(exportDirectory, fileName))) {
    sequence += 1;
    fileName = `${baseName}-${sequence}.png`;
  }
  return fileName;
}

function modelPath() {
  return path.join(currentLibrary, LIBRARY_DATA_FOLDER, LIBRARY_DATA_FILE);
}

function physicalProject(relativePath) {
  const parts = relativePath.split(path.sep);
  return parts.length > 1 ? parts[0] : "未分类";
}

function physicalProjectDirectories() {
  if (!fs.existsSync(currentLibrary)) return [];
  return fs
    .readdirSync(currentLibrary, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith(".") &&
        entry.name !== LIBRARY_DATA_FOLDER
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));
}

function walkSupportedFiles(folder) {
  const found = [];
  const queue = [folder];
  while (queue.length) {
    const current = queue.shift();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === LIBRARY_DATA_FOLDER) continue;
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) queue.push(fullPath);
      else if (entry.isFile() && SUPPORTED.has(path.extname(entry.name).toLowerCase())) {
        found.push(fullPath);
      }
    }
  }
  return found;
}

function allSupportedPaths() {
  if (!fs.existsSync(currentLibrary)) return [];
  return walkSupportedFiles(currentLibrary).sort((a, b) =>
    toRelative(a).localeCompare(toRelative(b), "zh-CN", { numeric: true })
  );
}

function parseStem(stem) {
  return parseFilename(stem);
}

function buildImportReview(fileName) {
  const suggestion = parseFilename(fileName);
  return {
    status: suggestion.status,
    confidence: suggestion.confidence,
    rule: suggestion.rule,
    style: suggestion.style,
    detectedAt: now(),
    confirmedAt: "",
    suggested: {
      date: suggestion.date,
      paper: suggestion.paper,
      edition: suggestion.edition,
      title: suggestion.title,
      author: suggestion.author,
    },
  };
}

function fingerprintFile(filePath) {
  const stats = fs.statSync(filePath);
  const size = stats.size;
  const chunkSize = Math.min(65536, size);
  const first = Buffer.alloc(chunkSize);
  const last = Buffer.alloc(chunkSize);
  const handle = fs.openSync(filePath, "r");
  try {
    if (chunkSize) {
      fs.readSync(handle, first, 0, chunkSize, 0);
      fs.readSync(handle, last, 0, chunkSize, Math.max(0, size - chunkSize));
    }
  } finally {
    fs.closeSync(handle);
  }
  return `${size}:${crypto
    .createHash("sha256")
    .update(first)
    .update(last)
    .digest("hex")
    .slice(0, 24)}`;
}

function newRecord(filePath, legacyTags = []) {
  const relativePath = toRelative(filePath);
  const name = path.basename(filePath);
  const ext = path.extname(name);
  const parsed = parseFilename(name);
  const project = physicalProject(relativePath);
  return {
    id: `src-${crypto.randomUUID()}`,
    kind: "source",
    sourceLanguage: "chinese",
    paperType: "journal",
    relativePath,
    originalName: name,
    fingerprint: fingerprintFile(filePath),
    createdAt: now(),
    updatedAt: now(),
    date: parsed.date,
    paper: parsed.paper,
    edition: parsed.edition,
    editionNumber: splitEdition(parsed.edition).number,
    editionUnit: splitEdition(parsed.edition).unit,
    title: parsed.title,
    author: parsed.author,
    journal: "",
    issueNumber: "",
    issueUnit: "期",
    degree: "硕士学位论文",
    institution: "",
    bookPlace: "",
    bookPublisher: "",
    citation: "",
    annotations: [],
    ocrPages: [],
    ocrRegions: [],
    translations: [],
    researchNotes: [],
    tags: parseTags(legacyTags),
    status: "unread",
    importReview: buildImportReview(name),
    projects: project === "未分类" ? [] : [project],
    missing: false,
  };
}

function legacyTagsFor(relativePath) {
  const suffix = `::${relativePath.toLocaleLowerCase()}`;
  for (const [key, value] of Object.entries(state.legacyMetadata || {})) {
    if (
      key.toLocaleLowerCase().endsWith(suffix) &&
      value &&
      Array.isArray(value.tags)
    ) {
      return value.tags;
    }
  }
  return [];
}

function loadLibraryModel() {
  const filePath = modelPath();
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return {
      schemaVersion: 1,
      libraryId:
        typeof parsed.libraryId === "string"
          ? parsed.libraryId
          : `lib-${crypto.randomUUID()}`,
      createdAt: parsed.createdAt || now(),
      updatedAt: parsed.updatedAt || now(),
      projects: uniqueStrings(parsed.projects || []),
      screenshotFolder: normalizedScreenshotFolder(
        parsed.screenshotFolder
      ),
      records:
        parsed.records && typeof parsed.records === "object" ? parsed.records : {},
      aiSuggestions: normalizeAiSuggestionRecords(parsed.aiSuggestions),
      aiChatMessages: normalizeAiChatMessages(parsed.aiChatMessages),
    };
  } catch {
    return {
      schemaVersion: 1,
      libraryId: `lib-${crypto.randomUUID()}`,
      createdAt: now(),
      updatedAt: now(),
      projects: [],
      screenshotFolder: DEFAULT_SCREENSHOT_FOLDER,
      records: {},
      aiSuggestions: [],
      aiChatMessages: [],
    };
  }
}

function saveLibraryModel() {
  if (!libraryModel || !isWritableLibrary(currentLibrary)) return;
  const folder = path.dirname(modelPath());
  fs.mkdirSync(folder, { recursive: true });
  libraryModel.updatedAt = now();
  fs.writeFileSync(modelPath(), JSON.stringify(libraryModel, null, 2), "utf8");
}

function reconcileLibraryModel() {
  if (!libraryModel) libraryModel = loadLibraryModel();
  const paths = allSupportedPaths();
  const records = Object.values(libraryModel.records || {});
  const byRelative = new Map(
    records.map((record) => [String(record.relativePath).toLocaleLowerCase(), record])
  );
  const unmatchedRecords = new Set(records.map((record) => record.id));
  const nextRecords = {};

  for (const filePath of paths) {
    const relativePath = toRelative(filePath);
    let record = byRelative.get(relativePath.toLocaleLowerCase());
    if (!record) {
      const fingerprint = fingerprintFile(filePath);
      record = records.find(
        (candidate) =>
          unmatchedRecords.has(candidate.id) && candidate.fingerprint === fingerprint
      );
      if (record) record.relativePath = relativePath;
    }
    if (!record) record = newRecord(filePath, legacyTagsFor(relativePath));

    const project = physicalProject(relativePath);
    const currentName = path.basename(filePath);
    if (!record.importReview || typeof record.importReview !== "object") {
      const review = buildImportReview(currentName);
      record.importReview = review;
      const suggested = review.suggested;
      if (!record.date && suggested.date) record.date = suggested.date;
      if (!record.paper && suggested.paper) record.paper = suggested.paper;
      if (!record.edition && suggested.edition) record.edition = suggested.edition;
      if (!record.title && suggested.title) record.title = suggested.title;
      if (!record.author && suggested.author) record.author = suggested.author;
    }
    record.relativePath = relativePath;
    record.missing = false;
    record.kind = normalizeKind(record.kind);
    record.sourceLanguage =
      record.sourceLanguage === "foreign" ? "foreign" : "chinese";
    record.paperType =
      record.paperType === "thesis" ? "thesis" : "journal";
    record.tags = parseTags(record.tags);
    record.status = record.status === "organized" ? "organized" : "unread";
    record.edition = sanitizeComponent(record.edition || "");
    const editionParts = splitEdition(record.edition);
    record.editionNumber = sanitizeComponent(
      record.editionNumber || editionParts.number
    );
    record.editionUnit =
      record.editionUnit === "期" || editionParts.unit === "期" ? "期" : "版";
    record.journal = sanitizeComponent(record.journal || record.paper || "");
    record.issueNumber = sanitizeComponent(record.issueNumber || "");
    record.issueUnit = record.issueUnit === "卷" ? "卷" : "期";
    record.degree =
      record.degree === "博士学位论文" ? "博士学位论文" : "硕士学位论文";
    record.institution = sanitizeComponent(record.institution || "");
    record.citation = sanitizeComponent(record.citation || "");
    record.annotations = normalizeAnnotations(record.annotations);
    record.ocrPages = normalizeOcrPages(record.ocrPages);
    record.ocrRegions = normalizeOcrRegions(record.ocrRegions, record.ocrPages);
    record.translations = normalizeTranslations(record.translations);
    record.researchNotes = normalizeResearchNotes(record.researchNotes);
    record.projects = project === "未分类" ? [] : [project];
    if (!record.fingerprint) record.fingerprint = fingerprintFile(filePath);
    unmatchedRecords.delete(record.id);
    nextRecords[record.id] = record;
  }

  for (const record of records) {
    if (!unmatchedRecords.has(record.id)) continue;
    nextRecords[record.id] = { ...record, missing: true };
  }

  libraryModel.records = nextRecords;
  libraryModel.aiSuggestions = normalizeAiSuggestionRecords(
    libraryModel.aiSuggestions
  );
  libraryModel.aiChatMessages = normalizeAiChatMessages(
    libraryModel.aiChatMessages
  );
  libraryModel.screenshotFolder = normalizedScreenshotFolder(
    libraryModel.screenshotFolder
  );
  libraryModel.projects = uniqueStrings([
    ...physicalProjectDirectories(),
    ...libraryModel.projects,
    ...Object.values(nextRecords).flatMap((record) => record.projects || []),
  ]);
  saveLibraryModel();
}

function ensureLibraryModel() {
  if (!libraryModel) libraryModel = loadLibraryModel();
  reconcileLibraryModel();
  return libraryModel;
}

function recordFor(relativePath, id = "") {
  ensureLibraryModel();
  if (id && libraryModel.records[id] && !libraryModel.records[id].missing) {
    return libraryModel.records[id];
  }
  const lowered = String(relativePath || "").toLocaleLowerCase();
  return Object.values(libraryModel.records).find(
    (record) =>
      !record.missing && String(record.relativePath).toLocaleLowerCase() === lowered
  );
}

function ocrPageFor(record, page, create = false) {
  record.ocrPages = normalizeOcrPages(record.ocrPages);
  const normalizedPage = Math.min(
    9999,
    Math.max(1, Number.parseInt(page, 10) || 1)
  );
  let entry = record.ocrPages.find((item) => item.page === normalizedPage);
  if (!entry && create) {
    entry = {
      page: normalizedPage,
      rawText: "",
      correctedText: "",
      correctedComplete: false,
      engine: "",
      recognizedAt: "",
      correctedAt: "",
      updatedAt: now(),
    };
    record.ocrPages.push(entry);
    record.ocrPages.sort((a, b) => a.page - b.page);
  }
  return entry;
}

function listFiles() {
  ensureLibraryModel();
  return Object.values(libraryModel.records)
    .filter((record) => !record.missing)
    .map((record) => {
      const filePath = path.join(currentLibrary, record.relativePath);
      const name = path.basename(filePath);
      const ext = path.extname(name).toLowerCase();
      const project = physicalProject(record.relativePath);
      return {
        id: record.id,
        kind: normalizeKind(record.kind),
        sourceLanguage:
          record.sourceLanguage === "foreign" ? "foreign" : "chinese",
        paperType: record.paperType === "thesis" ? "thesis" : "journal",
        name,
        originalName: record.originalName || name,
        relativePath: record.relativePath,
        project,
        projects: parseProjects(record.projects),
        ext,
        type: ext.slice(1).toUpperCase(),
        date: record.date || "",
        paper: record.paper || "",
        edition: record.edition || "",
        editionNumber:
          record.editionNumber || splitEdition(record.edition).number,
        editionUnit:
          record.editionUnit === "期" ? "期" : splitEdition(record.edition).unit,
        title: record.title || parseStem(path.basename(name, ext)).title,
        author: record.author || "",
        journal: record.journal || "",
        issueNumber: record.issueNumber || "",
        issueUnit: record.issueUnit === "卷" ? "卷" : "期",
        degree:
          record.degree === "博士学位论文"
            ? "博士学位论文"
            : "硕士学位论文",
        institution: record.institution || "",
        bookPlace: record.bookPlace || "",
        bookPublisher: record.bookPublisher || "",
        citation: record.citation || "",
        annotations: normalizeAnnotations(record.annotations),
        ocrPages: normalizeOcrPages(record.ocrPages),
        ocrRegions: normalizeOcrRegions(record.ocrRegions, record.ocrPages),
        translations: normalizeTranslations(record.translations),
        researchNotes: normalizeResearchNotes(record.researchNotes),
        tags: parseTags(record.tags),
        status: record.status === "organized" ? "organized" : "unread",
        importReview: record.importReview || buildImportReview(name),
        updatedAt: record.updatedAt || "",
      };
    })
    .sort((a, b) => {
      const projectOrder = a.project.localeCompare(b.project, "zh-CN", {
        numeric: true,
      });
      return projectOrder || a.name.localeCompare(b.name, "zh-CN", { numeric: true });
    });
}

function projectSummary(files) {
  ensureLibraryModel();
  return libraryModel.projects.map((name) => ({
    name,
    count: files.filter((file) => file.project === name).length,
  }));
}

function importReviewSummary(files) {
  const summary = {
    ready: 0,
    needsReview: 0,
    unparsed: 0,
    confirmed: 0,
    pending: 0,
  };
  for (const file of files) {
    if (file.kind !== "source") continue;
    const status = file.importReview?.status || "unparsed";
    if (status === "ready") summary.ready += 1;
    else if (status === "needs-review") summary.needsReview += 1;
    else if (status === "confirmed") summary.confirmed += 1;
    else summary.unparsed += 1;
  }
  summary.pending = summary.ready + summary.needsReview + summary.unparsed;
  return summary;
}

function bootstrap() {
  const files = listFiles();
  const umiExecutable = resolvedUmiExecutable();
  const hasLibrary = fs.existsSync(currentLibrary);
  return {
    ok: true,
    version: APP_VERSION,
    hasLibrary,
    library: hasLibrary ? currentLibrary : "",
    libraryName: hasLibrary ? path.basename(currentLibrary) : "",
    libraryId: libraryModel.libraryId,
    isTestLibrary: isTestLibrary(currentLibrary),
    isFormalLibrary: isFormalLibrary(currentLibrary),
    isWritableLibrary: isWritableLibrary(currentLibrary),
    screenshotFolder: normalizedScreenshotFolder(
      libraryModel.screenshotFolder
    ),
    screenshotFolderAbsolute: screenshotDirectory(),
    files,
    importReview: importReviewSummary(files),
    projects: projectSummary(files),
    recentDates: state.recentDates.slice(0, 30),
    recentPapers: state.recentPapers.slice(0, 100),
    favoriteWebsiteCategories: normalizeFavoriteWebsiteCategories(
      state.favoriteWebsiteCategories
    ),
    favoriteWebsites: normalizeFavoriteWebsites(state.favoriteWebsites),
    umiOcrConfigured: Boolean(umiExecutable.executable),
    umiOcrBundled: umiExecutable.bundled,
    canUndo: state.history.length > 0,
    operations: state.operations.slice().reverse(),
    aiSuggestions: refreshedAiSuggestionRecords(
      libraryModel.aiSuggestions
    ).reverse(),
    aiChatMessages: refreshedAiChatMessages(libraryModel.aiChatMessages),
  };
}

function validateDate(year, month, day) {
  const y = String(year || "").trim();
  const m = String(month || "").trim();
  const d = String(day || "").trim();
  const currentYear = new Date().getFullYear();
  if (!isUnknownDatePart(y) && !/^\d{4}$/.test(y)) {
    throw new Error("年份应为4位数字或“未知”");
  }
  if (
    !isUnknownDatePart(y) &&
    (Number(y) < 1800 || Number(y) > currentYear)
  ) {
    throw new Error(`年份应在1800至${currentYear}之间`);
  }
  if (
    !isUnknownDatePart(m) &&
    (!/^\d{1,2}$/.test(m) || Number(m) < 1 || Number(m) > 12)
  ) {
    throw new Error("月份应为1至12或“未知”");
  }
  if (
    !isUnknownDatePart(d) &&
    (!/^\d{1,2}$/.test(d) || Number(d) < 1 || Number(d) > 31)
  ) {
    throw new Error("日期应为1至31或“未知”");
  }
  if (
    !isUnknownDatePart(y) &&
    !isUnknownDatePart(m) &&
    !isUnknownDatePart(d)
  ) {
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    if (
      date.getFullYear() !== Number(y) ||
      date.getMonth() !== Number(m) - 1 ||
      date.getDate() !== Number(d)
    ) {
      throw new Error("日期无效，请检查年月日");
    }
  }
  return `${normalizedDatePart(y, 4)}-${normalizedDatePart(
    m,
    2
  )}-${normalizedDatePart(d, 2)}`;
}

function buildTargetName(payload, sourceName) {
  const ext = path.extname(sourceName).toLowerCase();
  const kind = normalizeKind(payload.kind);

  if (kind === "book") {
    const author = sanitizeComponent(payload.bookAuthor);
    const title = stripTitleMarks(payload.bookTitle);
    const bookPlace = sanitizeComponent(payload.bookPlace);
    const bookPublisher = sanitizeComponent(payload.bookPublisher);
    const date = validateFlexibleDate(
      payload.bookYear,
      payload.bookMonth,
      payload.bookDay
    );
    if (!author) throw new Error("请填写专著作者");
    if (!title) throw new Error("请填写著作名");
    if (!bookPlace) throw new Error("请填写出版地名");
    if (!bookPublisher) throw new Error("请填写出版社名");
    const citation = `${author}：《${title}》，${bookPlace}：${bookPublisher}，${chineseDate(
      date
    )}`;
    return {
      targetName: `${citation}${ext}`,
      kind,
      paperType: "journal",
      date,
      paper: "",
      edition: "",
      editionNumber: "",
      editionUnit: "版",
      title,
      author,
      journal: "",
      issueNumber: "",
      issueUnit: "期",
      degree: "硕士学位论文",
      institution: "",
      bookPlace,
      bookPublisher,
      citation,
    };
  }

  if (kind === "paper") {
    const paperType = payload.paperType === "thesis" ? "thesis" : "journal";
    const date = validateFlexibleDate(
      payload.paperYear,
      payload.paperMonth,
      payload.paperDay
    );
    const author = sanitizeComponent(payload.paperAuthor);
    const title = stripTitleMarks(payload.paperTitle);
    if (!author) throw new Error("请填写论文作者");
    if (!title) throw new Error("请填写论文标题");
    if (paperType === "thesis") {
      const degree =
        payload.degree === "博士学位论文"
          ? "博士学位论文"
          : "硕士学位论文";
      const institution = sanitizeComponent(payload.institution);
      if (!institution) throw new Error("请填写学位授予单位");
      const stem = `${author}：《${title}》，${degree}，${institution}，${chineseDate(
        date
      )}。`;
      return {
        targetName: `${stem}${ext}`,
        kind,
        paperType,
        date,
        paper: "",
        edition: "",
        editionNumber: "",
        editionUnit: "版",
        title,
        author,
        journal: "",
        issueNumber: "",
        issueUnit: "期",
        degree,
        institution,
        bookPlace: "",
        bookPublisher: "",
        citation: "",
      };
    }

    const journal = stripTitleMarks(payload.journal);
    const issueNumber = sanitizeComponent(payload.issueNumber).replace(
      /(期|卷)$/u,
      ""
    );
    const issueUnit = payload.issueUnit === "卷" ? "卷" : "期";
    if (!journal) throw new Error("请填写期刊名");
    const issueText = issueNumber ? `第${issueNumber}${issueUnit}` : "";
    const dateAndIssue = `${chineseDate(date)}${issueText}`;
    const stem = `${author}：《${title}》，《${journal}》，${dateAndIssue}。`;
    return {
      targetName: `${stem}${ext}`,
      kind,
      paperType,
      date,
      paper: journal,
      edition: issueNumber ? `${issueNumber}${issueUnit}` : "",
      editionNumber: "",
      editionUnit: "版",
      title,
      author,
      journal,
      issueNumber,
      issueUnit,
      degree: "硕士学位论文",
      institution: "",
      bookPlace: "",
      bookPublisher: "",
      citation: "",
    };
  }

  const date = validateDate(payload.year, payload.month, payload.day);
  const paper = sanitizeComponent(payload.paper);
  const rawEditionNumber = sanitizeComponent(
    payload.editionNumber || payload.edition
  ).replace(/(版|期)$/u, "");
  const editionUnit = payload.editionUnit === "期" ? "期" : "版";
  const edition = rawEditionNumber
    ? `${rawEditionNumber}${editionUnit}`
    : "";
  const title = sanitizeComponent(payload.title);
  const author = sanitizeComponent(payload.author);
  if (!paper) throw new Error("请填写报刊名");
  if (!title) throw new Error("篇名不能为空");
  const sourceStyle = parseFilename(sourceName).style;
  let stem =
    edition || sourceStyle === "compound"
      ? `【${date}-《${paper}》${edition}】${title}`
      : `【${date}】【${paper}】${title}`;
  if (author) stem += `【作者-${author}】`;
  return {
    targetName: `${stem}${ext}`,
    kind,
    paperType: "journal",
    date,
    paper,
    edition,
    editionNumber: rawEditionNumber,
    editionUnit,
    title,
    author,
    journal: "",
    issueNumber: "",
    issueUnit: "期",
    degree: "硕士学位论文",
    institution: "",
    bookPlace: "",
    bookPublisher: "",
    citation: "",
  };
}

function remember(value, list, limit) {
  return [value, ...list.filter((item) => item !== value)].slice(0, limit);
}

function resolveCurrentFile(relativePath) {
  const candidate = path.resolve(currentLibrary, String(relativePath || ""));
  if (!isInsideLibrary(candidate) || candidate === path.resolve(currentLibrary)) {
    throw new Error("文件位置不正确");
  }
  if (!fs.existsSync(candidate)) throw new Error("当前文件已不存在，请刷新列表");
  if (!fs.statSync(candidate).isFile()) throw new Error("所选项目不是文件");
  if (!SUPPORTED.has(path.extname(candidate).toLowerCase())) {
    throw new Error("不支持这种文件格式");
  }
  return candidate;
}

function addOperation(type, summary, extra = {}) {
  const operation = {
    id: `op-${crypto.randomUUID()}`,
    type,
    summary,
    at: now(),
    ...extra,
  };
  state.operations.push(operation);
  state.operations = state.operations.slice(-200);
  return operation;
}

function assertWritableLibrary() {
  if (!isWritableLibrary(currentLibrary)) {
    throw new Error("资料库保护已阻止操作：未初始化的文件夹只能预览和搜索");
  }
}

function assertSafeLibraryInitializationTarget(folder) {
  const resolved = ensureFolder(folder);
  if (resolved === path.parse(resolved).root) {
    throw new Error("不能把整个磁盘根目录初始化为资料库");
  }
  const protectedFolders = [
    process.env.SystemRoot,
    process.env.ProgramFiles,
    process.env["ProgramFiles(x86)"],
    process.env.USERPROFILE,
    APP_DIR,
  ]
    .filter(Boolean)
    .map((item) => path.resolve(item).toLocaleLowerCase());
  if (protectedFolders.includes(resolved.toLocaleLowerCase())) {
    throw new Error("不能把系统目录、用户主目录或程序安装目录初始化为资料库");
  }
  return resolved;
}

function initializeCurrentLibrary() {
  const resolved = assertSafeLibraryInitializationTarget(currentLibrary);
  if (isWritableLibrary(resolved)) {
    rememberCurrentLibrary();
    return;
  }
  fs.writeFileSync(
    path.join(resolved, LIBRARY_MARKER),
    JSON.stringify(
      {
        type: "historical-workbench-library",
        schemaVersion: 1,
        createdAt: now(),
      },
      null,
      2
    ),
    "utf8"
  );
  libraryModel = null;
  ensureLibraryModel();
  saveLibraryModel();
  rememberCurrentLibrary();
}

let activeFolderDialog = null;

function chooseWindowsFolderDialog({
  description,
  showNewFolderButton = true,
  initialFolder = "",
}) {
  if (activeFolderDialog) {
    return Promise.reject(new Error("已有文件夹选择窗口正在等待操作"));
  }
  const script = [
    "$ErrorActionPreference = 'Stop'",
    "[Console]::OutputEncoding = [System.Text.Encoding]::UTF8",
    "$description = [Environment]::GetEnvironmentVariable('HISTORICAL_WORKBENCH_FOLDER_DIALOG_DESCRIPTION')",
    "$initialFolder = [Environment]::GetEnvironmentVariable('HISTORICAL_WORKBENCH_FOLDER_DIALOG_INITIAL')",
    `$options = 0x0001 -bor 0x0040${
      showNewFolderButton ? "" : " -bor 0x0200"
    }`,
    "$shell = New-Object -ComObject Shell.Application",
    "$folder = $null",
    "try {",
    "  $folder = $shell.BrowseForFolder(0, $description, $options, 0)",
    "  if ($null -ne $folder -and $null -ne $folder.Self) {",
    "    $selectedPath = [string]$folder.Self.Path",
    "    if ($selectedPath) { Write-Output $selectedPath }",
    "  }",
    "} finally {",
    "  if ($null -ne $folder) { [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($folder) }",
    "  if ($null -ne $shell) { [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($shell) }",
    "}",
  ].join("\r\n");
  const encodedScript = Buffer.from(script, "utf16le").toString("base64");
  let task;
  task = new Promise((resolve, reject) => {
    execFile(
      "powershell.exe",
      ["-NoProfile", "-STA", "-EncodedCommand", encodedScript],
      {
        encoding: "utf8",
        windowsHide: true,
        env: {
          ...process.env,
          HISTORICAL_WORKBENCH_FOLDER_DIALOG_DESCRIPTION: description,
          HISTORICAL_WORKBENCH_FOLDER_DIALOG_INITIAL: initialFolder,
        },
      },
      (error, stdout, stderr) => {
        if (activeFolderDialog === task) activeFolderDialog = null;
        if (error) {
          console.error(
            "Windows folder dialog failed:",
            error.code || error.message,
            String(stderr || "").trim()
          );
          return reject(
            new Error("Windows 文件夹选择窗口未能打开，请关闭其他选择窗口后重试")
          );
        }
        resolve(String(stdout || "").trim());
      }
    );
  });
  activeFolderDialog = task;
  return task;
}

function chooseLibraryDialog() {
  return chooseWindowsFolderDialog({
    description: "选择史料资料库根文件夹",
    showNewFolderButton: true,
    initialFolder: currentLibrary,
  });
}

function chooseImportSourceFolderDialog() {
  return chooseWindowsFolderDialog({
    description: "选择需要批量导入的材料文件夹",
    showNewFolderButton: false,
    initialFolder: path.dirname(currentLibrary),
  });
}

function numberedImportTarget(target) {
  const directory = path.dirname(target);
  const extension = path.extname(target);
  const stem = path.basename(target, extension);
  for (let index = 2; index <= 9999; index += 1) {
    const candidate = path.join(directory, `${stem}（${index}）${extension}`);
    if (!fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`无法为同名文件自动编号：${path.basename(target)}`);
}

function chooseScreenshotFolderDialog() {
  const initialFolder = fs.existsSync(screenshotDirectory())
    ? screenshotDirectory()
    : currentLibrary;
  return chooseWindowsFolderDialog({
    description: "选择当前资料库内部的截图保存文件夹",
    showNewFolderButton: true,
    initialFolder,
  });
}

async function apiHandler(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/bootstrap") {
    return sendJson(res, 200, bootstrap());
  }

  if (
    req.method === "POST" &&
    url.pathname === "/api/favorite-website-categories"
  ) {
    try {
      const payload = await readJson(req);
      state.favoriteWebsiteCategories = normalizeFavoriteWebsiteCategories(
        state.favoriteWebsiteCategories
      );
      state.favoriteWebsites = normalizeFavoriteWebsites(state.favoriteWebsites);
      const action = String(payload.action || "add");
      const categoryId = String(payload.categoryId || "");
      if (action === "delete") {
        const before = state.favoriteWebsiteCategories.length;
        state.favoriteWebsiteCategories = state.favoriteWebsiteCategories.filter(
          (item) => item.id !== categoryId
        );
        if (before === state.favoriteWebsiteCategories.length) {
          throw new Error("没有找到需要删除的网站分类");
        }
        state.favoriteWebsites.forEach((website) => {
          if (website.categoryId === categoryId) website.categoryId = "";
        });
        addOperation("favorite-website-category-delete", "删除一个常用网站分类");
      } else {
        const name = String(payload.name || "")
          .replace(/[\u0000-\u001f]/gu, " ")
          .replace(/\s+/gu, " ")
          .trim()
          .slice(0, 60);
        if (!name) throw new Error("请填写分类名称");
        const duplicate = state.favoriteWebsiteCategories.some(
          (item) =>
            item.name.toLocaleLowerCase() === name.toLocaleLowerCase() &&
            item.id !== categoryId
        );
        if (duplicate) throw new Error("已经存在同名网站分类");
        if (action === "update") {
          const category = state.favoriteWebsiteCategories.find(
            (item) => item.id === categoryId
          );
          if (!category) throw new Error("没有找到需要修改的网站分类");
          category.name = name;
          category.updatedAt = now();
          addOperation("favorite-website-category-update", `修改网站分类：${name}`);
        } else {
          state.favoriteWebsiteCategories.push({
            id: `website-category-${crypto.randomUUID()}`,
            name,
            createdAt: now(),
            updatedAt: now(),
          });
          state.favoriteWebsiteCategories = state.favoriteWebsiteCategories.slice(-50);
          addOperation("favorite-website-category-add", `添加网站分类：${name}`);
        }
      }
      saveAppState();
      return sendJson(res, 200, bootstrap());
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/favorite-websites") {
    try {
      const payload = await readJson(req);
      state.favoriteWebsites = normalizeFavoriteWebsites(state.favoriteWebsites);
      const action = String(payload.action || "add");
      if (action === "touch") {
        const website = state.favoriteWebsites.find(
          (item) => item.id === String(payload.websiteId || "")
        );
        if (!website) throw new Error("没有找到需要打开的网址");
        website.lastOpenedAt = now();
      } else if (action === "delete") {
        const websiteId = String(payload.websiteId || "");
        const before = state.favoriteWebsites.length;
        state.favoriteWebsites = state.favoriteWebsites.filter(
          (item) => item.id !== websiteId
        );
        if (before === state.favoriteWebsites.length) {
          throw new Error("没有找到需要删除的网址卡片");
        }
        addOperation("favorite-website-delete", "删除一张常用网站卡片");
      } else {
        const name = String(payload.name || "")
          .replace(/[\u0000-\u001f]/gu, " ")
          .replace(/\s+/gu, " ")
          .trim()
          .slice(0, 120);
        if (!name) throw new Error("请填写卡片名称");
        const websiteUrl = normalizeFavoriteWebsiteUrl(payload.url);
        const categoryId = String(payload.categoryId || "");
        if (
          categoryId &&
          !normalizeFavoriteWebsiteCategories(state.favoriteWebsiteCategories).some(
            (item) => item.id === categoryId
          )
        ) {
          throw new Error("所选网站分类不存在");
        }
        if (action === "update") {
          const website = state.favoriteWebsites.find(
            (item) => item.id === String(payload.websiteId || "")
          );
          if (!website) throw new Error("没有找到需要修改的网址卡片");
          website.name = name;
          website.url = websiteUrl;
          website.categoryId = categoryId;
          website.updatedAt = now();
          addOperation("favorite-website-update", `修改常用网站：${name}`);
        } else {
          state.favoriteWebsites.push({
            id: `website-${crypto.randomUUID()}`,
            name,
            url: websiteUrl,
            categoryId,
            createdAt: now(),
            updatedAt: now(),
            lastOpenedAt: "",
          });
          state.favoriteWebsites = state.favoriteWebsites.slice(-100);
          addOperation("favorite-website-add", `添加常用网站：${name}`);
        }
      }
      saveAppState();
      return sendJson(res, 200, bootstrap());
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/choose-library") {
    try {
      const payload = await readJson(req);
      const requestedFolder = String(payload.folderPath || "").trim();
      const selected = requestedFolder || (await chooseLibraryDialog());
      if (!selected) return sendJson(res, 200, { ok: true, cancelled: true });
      currentLibrary = ensureFolder(selected);
      libraryModel = null;
      rememberCurrentLibrary();
      return sendJson(res, 200, bootstrap());
    } catch (error) {
      return sendError(res, 400, `无法选择资料库：${error.message}`);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/initialize-library") {
    try {
      initializeCurrentLibrary();
      return sendJson(res, 200, bootstrap());
    } catch (error) {
      return sendError(res, 400, `无法初始化资料库：${error.message}`);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/open-test-library") {
    currentLibrary = TEST_LIBRARY;
    libraryModel = null;
    rememberCurrentLibrary();
    return sendJson(res, 200, bootstrap());
  }

  if (
    req.method === "POST" &&
    url.pathname === "/api/folder-import-scan"
  ) {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      ensureLibraryModel();
      const targetProject = sanitizeComponent(payload.targetProject);
      if (!targetProject || !libraryModel.projects.includes(targetProject)) {
        throw new Error("请先选择有效的目标项目");
      }
      const requestedPaths = Array.isArray(payload.sourcePaths)
        ? payload.sourcePaths.map((item) => String(item || "").trim()).filter(Boolean)
        : [];
      const selected = requestedPaths.length
        ? ""
        : String(payload.sourceFolder || "").trim()
          ? String(payload.sourceFolder).trim()
          : await chooseImportSourceFolderDialog();
      if (!selected && !requestedPaths.length) {
        return sendJson(res, 200, { ok: true, cancelled: true });
      }
      const sourcePaths = requestedPaths.length
        ? requestedPaths.map((item) => path.resolve(item))
        : [ensureFolder(selected)];
      for (const sourcePath of sourcePaths) {
        if (
          isSameOrInsideFolder(currentLibrary, sourcePath) ||
          isSameOrInsideFolder(sourcePath, currentLibrary)
        ) {
          throw new Error(
            "导入来源不能是当前资料库、资料库内部位置或包含当前资料库的上级文件夹"
          );
        }
      }
      const recursive = payload.recursive !== false;
      const items = scanImportSourcePaths(sourcePaths, recursive);
      const sourceFolder =
        sourcePaths.length === 1 ? sourcePaths[0] : `多个来源（${sourcePaths.length}项）`;
      const token = `folder-import-${crypto.randomUUID()}`;
      for (const [storedToken, session] of folderImportSessions) {
        if (
          session.library !== currentLibrary ||
          Date.now() - session.createdAt > 30 * 60 * 1000
        ) {
          folderImportSessions.delete(storedToken);
        }
      }
      folderImportSessions.set(token, {
        token,
        library: currentLibrary,
        sourceFolder,
        sourcePaths,
        recursive,
        createdAt: Date.now(),
        items,
      });
      return sendJson(res, 200, {
        ok: true,
        token,
        sourceFolder,
        recursive,
        capped: items.length >= 2000,
        items: items.map(({ sourcePath, ...item }) => item),
      });
    } catch (error) {
      return sendError(res, 400, `无法扫描导入文件夹：${error.message}`);
    }
  }

  if (
    req.method === "POST" &&
    url.pathname === "/api/folder-import-browser-file"
  ) {
    let temporaryPath = "";
    try {
      assertWritableLibrary();
      if (url.searchParams.get("consent") !== "true") {
        throw new Error("导入前必须核对文件清单并明确确认");
      }
      ensureLibraryModel();
      const targetProject = sanitizeComponent(
        url.searchParams.get("targetProject")
      );
      if (!targetProject || !libraryModel.projects.includes(targetProject)) {
        throw new Error("目标项目不存在，请重新选择");
      }
      const preserveStructure =
        url.searchParams.get("preserveStructure") !== "false";
      const conflictPolicy =
        url.searchParams.get("conflictPolicy") === "rename" ? "rename" : "skip";
      const rawRelative = String(
        url.searchParams.get("relativePath") || ""
      ).replaceAll("\\", "/");
      const parts = rawRelative
        .split("/")
        .map((part) => part.trim())
        .filter(Boolean);
      if (
        !parts.length ||
        parts.some(
          (part) =>
            part === "." ||
            part === ".." ||
            /[<>:"|?*\u0000-\u001f]/.test(part)
        )
      ) {
        throw new Error("浏览器提交的文件相对位置不正确");
      }
      const requestedRelative = preserveStructure
        ? parts.join(path.sep)
        : parts.at(-1);
      const extension = path.extname(requestedRelative).toLowerCase();
      if (!SUPPORTED.has(extension)) {
        throw new Error("该文件格式不在允许导入的材料类型中");
      }
      const projectPath = path.resolve(currentLibrary, targetProject);
      if (!isInsideLibrary(projectPath)) {
        throw new Error("目标项目位置不正确");
      }
      if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath);
      const realLibraryPath = fs.realpathSync(currentLibrary);
      const realProjectPath = fs.realpathSync(projectPath);
      if (!isSameOrInsideFolder(realLibraryPath, realProjectPath)) {
        throw new Error("目标项目不能通过链接指向资料库外部");
      }
      let target = path.resolve(projectPath, requestedRelative);
      if (!isSameOrInsideFolder(projectPath, target)) {
        throw new Error("文件相对位置不正确");
      }
      if (fs.existsSync(target)) {
        if (conflictPolicy === "skip") {
          req.resume();
          return sendJson(res, 200, {
            ok: true,
            importedCount: 0,
            skippedCount: 1,
          });
        }
        target = numberedImportTarget(target);
      }
      fs.mkdirSync(path.dirname(target), { recursive: true });
      const realTargetParent = fs.realpathSync(path.dirname(target));
      if (!isSameOrInsideFolder(realProjectPath, realTargetParent)) {
        throw new Error("目标子文件夹不能通过链接指向项目外部");
      }
      target = path.join(realTargetParent, path.basename(target));
      temporaryPath = path.join(
        realTargetParent,
        `.historical-import-${crypto.randomUUID()}.part`
      );
      await writeRequestToFile(req, temporaryPath);
      fs.renameSync(temporaryPath, target);
      temporaryPath = "";
      reconcileLibraryModel();
      addOperation(
        "folder-import",
        `从浏览器文件夹导入1份材料至项目：${targetProject}`,
        {
          project: targetProject,
          importedCount: 1,
          skippedCount: 0,
          failedCount: 0,
        }
      );
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ok: true,
        importedCount: 1,
        skippedCount: 0,
      });
    } catch (error) {
      if (temporaryPath) {
        try {
          if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
        } catch {}
      }
      return sendError(res, 400, `无法导入浏览器所选材料：${error.message}`);
    }
  }

  if (
    req.method === "POST" &&
    url.pathname === "/api/folder-import-commit"
  ) {
    try {
      assertWritableLibrary();
      const payload = await readJson(req, 2 * 1024 * 1024);
      if (payload.consent !== true) {
        throw new Error("导入前必须核对文件清单并明确确认");
      }
      ensureLibraryModel();
      const targetProject = sanitizeComponent(payload.targetProject);
      if (!targetProject || !libraryModel.projects.includes(targetProject)) {
        throw new Error("目标项目不存在，请重新选择");
      }
      const session = folderImportSessions.get(String(payload.token || ""));
      if (
        !session ||
        session.library !== currentLibrary ||
        Date.now() - session.createdAt > 30 * 60 * 1000
      ) {
        throw new Error("文件夹扫描结果已经失效，请重新选择文件夹");
      }
      const selectedIds = new Set(
        (Array.isArray(payload.itemIds) ? payload.itemIds : [])
          .map((id) => String(id || ""))
          .filter(Boolean)
          .slice(0, 2000)
      );
      if (!selectedIds.size) throw new Error("请至少勾选一份材料");
      const selectedItems = session.items.filter((item) =>
        selectedIds.has(item.id)
      );
      if (!selectedItems.length) {
        throw new Error("没有找到已勾选的材料，请重新扫描");
      }
      const preserveStructure = payload.preserveStructure !== false;
      const conflictPolicy =
        payload.conflictPolicy === "rename" ? "rename" : "skip";
      const projectPath = path.resolve(currentLibrary, targetProject);
      if (!isInsideLibrary(projectPath)) throw new Error("目标项目位置不正确");
      if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath);
      const realLibraryPath = fs.realpathSync(currentLibrary);
      const realProjectPath = fs.realpathSync(projectPath);
      if (!isSameOrInsideFolder(realLibraryPath, realProjectPath)) {
        throw new Error("目标项目不能通过链接指向当前资料库外部");
      }

      const copiedRelativePaths = [];
      const failures = [];
      let skippedCount = 0;
      for (const item of selectedItems) {
        try {
          if (
            !fs.existsSync(item.sourcePath) ||
            !fs.statSync(item.sourcePath).isFile() ||
            !SUPPORTED.has(path.extname(item.sourcePath).toLowerCase())
          ) {
            throw new Error("源文件已经不存在或格式不受支持");
          }
          const requestedRelative = preserveStructure
            ? item.relativePath
            : item.name;
          let target = path.resolve(projectPath, requestedRelative);
          if (!isSameOrInsideFolder(projectPath, target)) {
            throw new Error("文件相对位置不正确");
          }
          if (fs.existsSync(target)) {
            if (conflictPolicy === "skip") {
              skippedCount += 1;
              continue;
            }
            target = numberedImportTarget(target);
          }
          fs.mkdirSync(path.dirname(target), { recursive: true });
          const realTargetParent = fs.realpathSync(path.dirname(target));
          if (!isSameOrInsideFolder(realProjectPath, realTargetParent)) {
            throw new Error("目标子文件夹不能通过链接指向项目外部");
          }
          target = path.join(realTargetParent, path.basename(target));
          fs.copyFileSync(
            item.sourcePath,
            target,
            fs.constants.COPYFILE_EXCL
          );
          copiedRelativePaths.push(toRelative(target));
        } catch (error) {
          failures.push({
            name: item.name,
            relativePath: item.relativePath,
            message: String(error.message || error).slice(0, 300),
          });
        }
      }
      if (copiedRelativePaths.length) {
        reconcileLibraryModel();
        addOperation(
          "folder-import",
          `从文件夹导入${copiedRelativePaths.length}份材料至项目：${targetProject}`,
          {
            project: targetProject,
            sourceFolder: session.sourceFolder,
            importedCount: copiedRelativePaths.length,
            skippedCount,
            failedCount: failures.length,
          }
        );
        saveLibraryModel();
        saveAppState();
      }
      folderImportSessions.delete(session.token);
      return sendJson(res, 200, {
        ...bootstrap(),
        folderImportResult: {
          project: targetProject,
          importedCount: copiedRelativePaths.length,
          skippedCount,
          failedCount: failures.length,
          failures: failures.slice(0, 50),
        },
      });
    } catch (error) {
      return sendError(res, 400, `文件夹导入未完成：${error.message}`);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/create-project") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const projectName = sanitizeComponent(payload.name);
      if (!projectName) throw new Error("项目名称不能为空");
      if (projectName.startsWith(".")) throw new Error("项目名称不能以句点开头");
      ensureLibraryModel();
      if (libraryModel.projects.includes(projectName)) {
        throw new Error("已经存在同名项目");
      }
      const projectPath = path.join(currentLibrary, projectName);
      if (!isInsideLibrary(projectPath)) throw new Error("项目名称不正确");
      if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath);
      libraryModel.projects.push(projectName);
      addOperation("project", `新建项目：${projectName}`);
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, { ...bootstrap(), createdProject: projectName });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/import-review") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const items = Array.isArray(payload.items) ? payload.items.slice(0, 500) : [];
      if (!items.length) throw new Error("没有需要确认的解析结果");
      ensureLibraryModel();
      const renamePlans = [];
      const targetPaths = new Set();
      for (const item of items) {
        const record = libraryModel.records[String(item.id || "")];
        if (!record || record.missing || normalizeKind(record.kind) !== "source") {
          continue;
        }
        const date = normalizeDate(item.date);
        const paper = sanitizeComponent(item.paper);
        const edition = sanitizeComponent(item.edition);
        const title = sanitizeComponent(item.title);
        const author = sanitizeComponent(item.author);
        if (!date || !paper || !title) {
          throw new Error(
            `“${path.basename(record.relativePath)}”仍缺少有效日期、报刊名或篇名`
          );
        }
        const source = resolveCurrentFile(record.relativePath);
        const [year = "", month = "", day = ""] = date.split("-");
        const editionUnit = edition.endsWith("期") ? "期" : "版";
        const editionNumber = edition.replace(/(版|期)$/u, "");
        const built = buildTargetName(
          {
            kind: "source",
            year,
            month,
            day,
            paper,
            editionNumber,
            editionUnit,
            title,
            author,
          },
          path.basename(source)
        );
        const target = path.join(path.dirname(source), built.targetName);
        const targetKey = path.resolve(target).toLocaleLowerCase();
        if (targetPaths.has(targetKey)) {
          throw new Error(`多份材料将生成同一个文件名：${built.targetName}`);
        }
        targetPaths.add(targetKey);
        if (source !== target && fs.existsSync(target)) {
          throw new Error(`目标文件已经存在：${built.targetName}`);
        }
        renamePlans.push({
          record,
          beforeRecord: JSON.parse(JSON.stringify(record)),
          source,
          target,
          built,
        });
      }

      if (!renamePlans.length) throw new Error("没有找到可以确认的史料");
      const renamedPlans = [];
      try {
        for (const plan of renamePlans) {
          if (plan.source === plan.target) continue;
          fs.renameSync(plan.source, plan.target);
          renamedPlans.push(plan);
        }
      } catch (error) {
        for (const plan of renamedPlans.reverse()) {
          if (fs.existsSync(plan.target) && !fs.existsSync(plan.source)) {
            fs.renameSync(plan.target, plan.source);
          }
        }
        throw error;
      }

      let renamedCount = 0;
      for (const plan of renamePlans) {
        const { record, beforeRecord, source, target, built } = plan;
        const newRelative = toRelative(target);
        Object.assign(record, {
          relativePath: newRelative,
          date: built.date,
          paper: built.paper,
          edition: built.edition,
          editionNumber: built.editionNumber,
          editionUnit: built.editionUnit,
          title: built.title,
          author: built.author,
          updatedAt: now(),
          missing: false,
          importReview: {
            status: "confirmed",
            confidence: "confirmed",
            rule: record.importReview?.rule || "manual",
            style: parseFilename(built.targetName).style,
            detectedAt: record.importReview?.detectedAt || now(),
            confirmedAt: now(),
            suggested: {
              date: built.date,
              paper: built.paper,
              edition: built.edition,
              title: built.title,
              author: built.author,
            },
          },
        });
        if (source !== target) {
          renamedCount += 1;
          state.history.push({
            id: `undo-${crypto.randomUUID()}`,
            recordId: record.id,
            oldPath: source,
            newPath: target,
            beforeRecord,
            at: now(),
          });
        }
        state.recentDates = remember(built.date, state.recentDates, 30);
        state.recentPapers = remember(built.paper, state.recentPapers, 100);
      }
      const confirmedCount = renamePlans.length;
      if (!confirmedCount) throw new Error("没有找到可以确认的史料");
      addOperation(
        "import-review",
        `确认并重命名文件：${confirmedCount} 份（实际改名 ${renamedCount} 份）`
      );
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        confirmedCount,
        renamedCount,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/reparse-filenames") {
    try {
      assertWritableLibrary();
      ensureLibraryModel();
      let refreshedCount = 0;
      for (const record of Object.values(libraryModel.records)) {
        if (
          record.missing ||
          normalizeKind(record.kind) !== "source" ||
          record.importReview?.status === "confirmed"
        ) {
          continue;
        }
        const review = buildImportReview(path.basename(record.relativePath));
        record.importReview = review;
        const suggested = review.suggested;
        if (!record.date && suggested.date) record.date = suggested.date;
        if (!record.paper && suggested.paper) record.paper = suggested.paper;
        if (!record.edition && suggested.edition) record.edition = suggested.edition;
        if (!record.title && suggested.title) record.title = suggested.title;
        if (!record.author && suggested.author) record.author = suggested.author;
        refreshedCount += 1;
      }
      addOperation("reparse", `重新解析文件名：${refreshedCount} 份`);
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, { ...bootstrap(), refreshedCount });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (
    req.method === "GET" &&
    url.pathname === "/api/ai-sentence-settings"
  ) {
    return sendJson(res, 200, {
      ok: true,
      settings: aiSentenceSettingsSummary(),
      storage: "LOCALAPPDATA/HistoricalWorkbench/ai-sentence-settings.json",
    });
  }

  if (
    req.method === "POST" &&
    url.pathname === "/api/ai-sentence-settings"
  ) {
    try {
      const payload = await readJson(req);
      const settings = updateAiSentenceSettings(payload);
      return sendJson(res, 200, {
        ok: true,
        settings,
        message:
          payload.action === "clear"
            ? "AI 断句配置已从本机设置中清除"
            : "AI 断句配置已保存在本机；尚未发送任何文本",
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/ai-sentence") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req, 1024 * 1024);
      if (payload.consent !== true) {
        throw new Error("发送文本前必须明确确认允许上传");
      }
      const task =
        payload.task === "segment-translate"
          ? "segment-translate"
          : "segment";
      const provider = ["qwen", "claude", "deepseek"].includes(payload.provider)
        ? payload.provider
        : aiSentenceSettings.provider;
      const processingSettings = aiProcessingSettings(provider);
      const text = await segmentTextWithAi(payload.text, task, provider);
      return sendJson(res, 200, {
        ok: true,
        text,
        task,
        provider: aiSentenceProviderName(processingSettings.provider),
        model: processingSettings.model,
        protocol: processingSettings.protocol,
        storeRequested: null,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "GET" && url.pathname === "/api/ai-suggestions") {
    ensureLibraryModel();
    return sendJson(res, 200, {
      ok: true,
      aiSuggestions: refreshedAiSuggestionRecords(
        libraryModel.aiSuggestions
      ).reverse(),
    });
  }

  if (req.method === "POST" && url.pathname === "/api/ai-suggestions") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req, 2 * 1024 * 1024);
      ensureLibraryModel();
      if (payload.action === "delete") {
        const suggestionId = String(payload.suggestionId || "");
        const before = normalizeAiSuggestionRecords(
          libraryModel.aiSuggestions
        );
        const next = before.filter((item) => item.id !== suggestionId);
        if (!suggestionId || next.length === before.length) {
          throw new Error("没有找到需要删除的 AI 建议记录");
        }
        libraryModel.aiSuggestions = next;
        addOperation("ai-suggestion-delete", "删除一条独立 AI 建议记录", {
          suggestionId,
        });
        saveLibraryModel();
        saveAppState();
        return sendJson(res, 200, {
          ok: true,
          aiSuggestions: refreshedAiSuggestionRecords(
            libraryModel.aiSuggestions
          ).reverse(),
        });
      }
      if (payload.consent !== true) {
        throw new Error("发送材料文本前必须核对预览并明确确认");
      }
      const recordIds = Array.from(
        new Set(
          (Array.isArray(payload.recordIds) ? payload.recordIds : [])
            .map((id) => String(id || "").slice(0, 160))
            .filter(Boolean)
        )
      ).slice(0, 20);
      if (!recordIds.length) throw new Error("请至少选择一份材料");
      const types = Array.from(
        new Set(
          (Array.isArray(payload.types) ? payload.types : []).filter((type) =>
            AI_SUGGESTION_TYPES.has(type)
          )
        )
      ).slice(0, 5);
      if (!types.length) throw new Error("请至少选择一种建议类型");
      const scope = {
        metadata: Boolean(payload.scope?.metadata),
        ocr: Boolean(payload.scope?.ocr),
        annotations: Boolean(payload.scope?.annotations),
        notes: Boolean(payload.scope?.notes),
        translations: Boolean(payload.scope?.translations),
      };
      if (!Object.values(scope).some(Boolean)) {
        throw new Error("请至少选择一种发送文本范围");
      }
      const textLimit = Math.min(
        20000,
        Math.max(4000, Number.parseInt(payload.textLimit, 10) || 10000)
      );
      const provider = ["qwen", "claude", "deepseek"].includes(
        payload.provider
      )
        ? payload.provider
        : "qwen";
      const records = recordIds.map((id) => {
        const record = libraryModel.records[id];
        if (!record || record.missing) {
          throw new Error(`没有找到已选择的材料：${id}`);
        }
        return record;
      });
      const providerTotalTextLimit = provider === "qwen" ? 60000 : 120000;
      const effectiveTextLimit = Math.min(
        textLimit,
        Math.max(4000, Math.floor(providerTotalTextLimit / records.length))
      );
      const materialPayloads = records.map((record, index) =>
        buildResearchMaterialPayload(
          record,
          index,
          scope,
          effectiveTextLimit
        )
      );
      const generated = await generateResearchSuggestionsWithAi(
        materialPayloads,
        types,
        provider
      );
      const entry = normalizeAiSuggestionRecords([
        {
          id: `ai-suggestion-${crypto.randomUUID()}`,
          createdAt: now(),
          provider: generated.provider,
          providerName: generated.providerName,
          model: generated.model,
          types,
          scope,
          textLimit,
          materials: materialPayloads.map((item) => item.material),
          suggestions: generated.suggestions,
          rawText: generated.rawText,
        },
      ])[0];
      if (!entry) throw new Error("AI 建议结果无法建立本地记录");
      libraryModel.aiSuggestions = normalizeAiSuggestionRecords([
        ...(libraryModel.aiSuggestions || []),
        entry,
      ]);
      addOperation(
        "ai-suggestion-add",
        `生成并保存 AI 建议：${records.length} 份材料、${entry.suggestions.length} 条建议`,
        {
          suggestionId: entry.id,
          recordIds,
          provider: generated.provider,
        }
      );
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ok: true,
        aiSuggestionId: entry.id,
        aiSuggestions: refreshedAiSuggestionRecords(
          libraryModel.aiSuggestions
        ).reverse(),
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "GET" && url.pathname === "/api/ai-chat") {
    ensureLibraryModel();
    return sendJson(res, 200, {
      ok: true,
      aiChatMessages: refreshedAiChatMessages(
        libraryModel.aiChatMessages
      ),
    });
  }

  if (req.method === "POST" && url.pathname === "/api/ai-chat") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req, 2 * 1024 * 1024);
      ensureLibraryModel();
      if (payload.action === "clear") {
        libraryModel.aiChatMessages = [];
        addOperation("ai-chat-clear", "清空AI自由问答记录");
        saveLibraryModel();
        saveAppState();
        return sendJson(res, 200, {
          ok: true,
          aiChatMessages: [],
        });
      }
      if (payload.consent !== true) {
        throw new Error("每次发送问题前必须明确确认");
      }
      const question = cleanResearchText(payload.question, 20000);
      if (!question) throw new Error("请先输入问题");
      const provider = ["qwen", "claude", "deepseek"].includes(
        payload.provider
      )
        ? payload.provider
        : "qwen";
      const scope = {
        metadata: Boolean(payload.scope?.metadata),
        ocr: Boolean(payload.scope?.ocr),
        annotations: Boolean(payload.scope?.annotations),
        notes: Boolean(payload.scope?.notes),
        translations: Boolean(payload.scope?.translations),
      };
      const recordIds = Array.from(
        new Set(
          (Array.isArray(payload.recordIds) ? payload.recordIds : [])
            .map((id) => String(id || "").slice(0, 160))
            .filter(Boolean)
        )
      ).slice(0, 20);
      if (!recordIds.length) {
        throw new Error("请至少选择一份要附加的材料");
      }
      if (!Object.values(scope).some(Boolean)) {
        throw new Error("请至少选择一种附加文本范围");
      }
      const records = recordIds.map((id) => {
        const record = libraryModel.records[id];
        if (!record || record.missing) {
          throw new Error(`没有找到已选择的材料：${id}`);
        }
        return record;
      });
      const textLimit = Math.min(
        20000,
        Math.max(4000, Number.parseInt(payload.textLimit, 10) || 10000)
      );
      const providerTotalTextLimit = provider === "qwen" ? 40000 : 80000;
      const effectiveTextLimit = records.length
        ? Math.min(
            textLimit,
            Math.max(4000, Math.floor(providerTotalTextLimit / records.length))
          )
        : textLimit;
      const materialPayloads = records.map((record, index) =>
        buildResearchMaterialPayload(
          record,
          index,
          scope,
          effectiveTextLimit
        )
      );
      const history = normalizeAiChatMessages(
        libraryModel.aiChatMessages
      );
      const answer = await answerResearchQuestionWithAi(
        question,
        history,
        materialPayloads,
        provider
      );
      const createdAt = now();
      const contextMaterials = materialPayloads.map(
        (item) => item.material
      );
      libraryModel.aiChatMessages = normalizeAiChatMessages([
        ...history,
        {
          id: `ai-chat-user-${crypto.randomUUID()}`,
          role: "user",
          text: question,
          provider,
          providerName: aiSentenceProviderName(provider),
          contextMaterialCount: contextMaterials.length,
          contextMaterials,
          createdAt,
        },
        {
          id: `ai-chat-assistant-${crypto.randomUUID()}`,
          role: "assistant",
          text: answer.text,
          provider: answer.provider,
          providerName: answer.providerName,
          model: answer.model,
          contextMaterialCount: contextMaterials.length,
          contextMaterials,
          createdAt: now(),
        },
      ]);
      addOperation(
        "ai-chat-ask",
        `AI自由问答：${contextMaterials.length}份附加材料`,
        {
          provider: answer.provider,
          recordIds,
        }
      );
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ok: true,
        aiChatMessages: refreshedAiChatMessages(
          libraryModel.aiChatMessages
        ),
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (
    req.method === "GET" &&
    url.pathname === "/api/translation-settings"
  ) {
    return sendJson(res, 200, {
      ok: true,
      settings: translationSettingsSummary(),
      storage: "LOCALAPPDATA/HistoricalWorkbench/translation-settings.json",
    });
  }

  if (
    req.method === "POST" &&
    url.pathname === "/api/translation-settings"
  ) {
    try {
      const payload = await readJson(req);
      const settings = updateTranslationSettings(payload);
      return sendJson(res, 200, {
        ok: true,
        settings,
        message:
          payload.action === "clear"
            ? "该云翻译配置已从本机清除"
            : "云翻译配置已保存在本机；尚未发送任何文本",
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (
    req.method === "GET" &&
    url.pathname === "/api/translation/argos-status"
  ) {
    try {
      const status = await argosBridge({ action: "status" });
      return sendJson(res, 200, {
        ok: true,
        ...status,
        runtimeDirectory: ARGOS_RUNTIME_DIR,
        pythonExecutable: resolvedPythonExecutable(),
      });
    } catch (error) {
      return sendJson(res, 200, {
        ok: true,
        installed: false,
        pairs: [],
        runtimeDirectory: ARGOS_RUNTIME_DIR,
        pythonExecutable: resolvedPythonExecutable(),
        message: error.message,
      });
    }
  }

  if (
    req.method === "POST" &&
    url.pathname === "/api/translation/argos-action"
  ) {
    try {
      const payload = await readJson(req);
      const action = String(payload.action || "");
      if (action === "install") {
        const status = await installArgosRuntime();
        return sendJson(res, 200, {
          ok: true,
          ...status,
          message: "Argos 本机组件已安装；请继续下载所需语言模型",
        });
      }
      if (action === "download-model") {
        const status = await argosBridge({
          action,
          sourceLanguage: String(payload.sourceLanguage || ""),
          targetLanguage: String(payload.targetLanguage || ""),
        });
        return sendJson(res, 200, status);
      }
      throw new Error("没有这个 Argos 本地操作");
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (url.pathname === "/api/edge-translation-jobs") {
    try {
      const token = String(url.searchParams.get("token") || "");
      if (req.method === "POST" && !token) {
        const payload = await readJson(req, 1024 * 1024);
        const sourceText = cleanResearchText(payload.text, 200000);
        if (!sourceText) throw new Error("请先投入需要翻译的文本");
        const jobToken = crypto.randomBytes(24).toString("hex");
        const createdAt = now();
        edgeTranslationJobs.set(jobToken, {
          status: "pending",
          message: "等待 Edge 弹窗接收翻译任务…",
          sourceText,
          sourceLanguage: String(payload.sourceLanguage || "en").slice(0, 40),
          targetLanguage: String(payload.targetLanguage || "zh").slice(0, 40),
          translatedText: "",
          model: "",
          error: "",
          createdAt,
          expiresAt: Date.now() + EDGE_TRANSLATION_JOB_TTL,
        });
        return sendJson(res, 200, {
          ok: true,
          token: jobToken,
          url: `/edge-translator.html?token=${jobToken}`,
        });
      }

      if (!token) throw new Error("缺少 Edge 翻译任务凭证");
      const job = edgeTranslationJob(token);
      if (req.method === "GET") {
        return sendJson(res, 200, edgeTranslationJobPayload(job));
      }
      if (req.method === "DELETE") {
        edgeTranslationJobs.delete(token);
        return sendJson(res, 200, { ok: true });
      }
      if (req.method === "POST") {
        const payload = await readJson(req, 1024 * 1024);
        const status = String(payload.status || "");
        if (status === "running") {
          job.status = "running";
          job.message = cleanResearchText(
            payload.message || "Edge 正在准备本机翻译模型…",
            500
          );
        } else if (status === "complete") {
          const translatedText = cleanResearchText(
            payload.translatedText,
            200000
          );
          if (!translatedText) throw new Error("Edge 没有返回译文");
          job.status = "complete";
          job.message = "Edge（弹窗）翻译完成";
          job.translatedText = translatedText;
          job.model = cleanResearchText(payload.model, 120);
          job.error = "";
        } else if (status === "error") {
          job.status = "error";
          job.error = cleanResearchText(
            payload.error || "Edge（弹窗）翻译未完成",
            1000
          );
          job.message = job.error;
        } else {
          throw new Error("Edge 翻译任务状态无效");
        }
        return sendJson(res, 200, edgeTranslationJobPayload(job));
      }
      throw new Error("Edge 翻译任务请求方式无效");
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/translate") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req, 1024 * 1024);
      const engine = String(payload.engine || "");
      const sourceLanguage = String(payload.sourceLanguage || "en");
      const targetLanguage = String(payload.targetLanguage || "zh");
      const sourceText = cleanResearchText(payload.text, 200000);
      if (!sourceText) throw new Error("请先投入需要翻译的文本");
      if (engine === "argos") {
        if (targetLanguage === "zh-Hant") {
          throw new Error(
            "Argos 官方中文模型不区分繁体目标；请选择简体中文，或改用 Edge、DeepSeek、千问、Claude"
          );
        }
        const result = await argosBridge({
          action: "translate",
          text: sourceText,
          sourceLanguage,
          targetLanguage,
        });
        return sendJson(res, 200, {
          ok: true,
          text: result.text,
          provider: "Argos（本机）",
          model: `${sourceLanguage}->${targetLanguage}`,
        });
      }
      if (!["qwen", "claude", "deepseek"].includes(engine)) {
        throw new Error("Edge（弹窗）必须通过独立 Edge 窗口运行");
      }
      if (payload.consent !== true) {
        throw new Error("使用云翻译前必须明确确认允许上传当前文本");
      }
      const result = await translateTextWithCloud(
        sourceText,
        engine,
        sourceLanguage,
        targetLanguage
      );
      return sendJson(res, 200, { ok: true, ...result });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (
    req.method === "POST" &&
    url.pathname === "/api/translation-records"
  ) {
    try {
      assertWritableLibrary();
      const payload = await readJson(req, 1024 * 1024);
      const record = recordFor(payload.relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份资料");
      record.translations = normalizeTranslations(record.translations);
      let translationId = "";
      if (payload.action === "delete") {
        const before = record.translations.length;
        record.translations = record.translations.filter(
          (item) => item.id !== String(payload.translationId || "")
        );
        if (before === record.translations.length) {
          throw new Error("没有找到需要删除的译文记录");
        }
        addOperation("translation-delete", "删除一条译文记录", {
          recordId: record.id,
        });
      } else {
        const sourceText = cleanResearchText(payload.sourceText, 200000);
        const translatedText = cleanResearchText(
          payload.translatedText,
          200000
        );
        if (!sourceText || !translatedText) {
          throw new Error("原文和译文都不能为空");
        }
        const engine = ["edge", "argos", "deepseek", "qwen", "claude"].includes(
          payload.engine
        )
          ? payload.engine
          : "argos";
        const engineLabels = {
          edge: "Edge（弹窗）",
          argos: "Argos（本机）",
          deepseek: "DeepSeek",
          qwen: "千问",
          claude: "Claude",
        };
        const entry = {
          id: `translation-${crypto.randomUUID()}`,
          page: Math.min(
            9999,
            Math.max(1, Number.parseInt(payload.page, 10) || 1)
          ),
          sourceLanguage: String(payload.sourceLanguage || "en").slice(0, 40),
          targetLanguage: String(payload.targetLanguage || "zh").slice(0, 40),
          engine,
          engineLabel: engineLabels[engine],
          sourceText,
          translatedText,
          model: String(payload.model || "").slice(0, 120),
          sourceRegionId: String(payload.sourceRegionId || "").slice(0, 120),
          createdAt: now(),
          updatedAt: now(),
        };
        record.translations.push(entry);
        record.translations = normalizeTranslations(record.translations);
        translationId = entry.id;
        addOperation(
          "translation-add",
          `保存${engineLabels[engine]}译文：第 ${entry.page} 页`,
          { recordId: record.id }
        );
      }
      record.updatedAt = now();
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        translationId,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/screenshot-folder") {
    try {
      assertWritableLibrary();
      ensureLibraryModel();
      const payload = await readJson(req);
      if (payload.action === "reset") {
        libraryModel.screenshotFolder = DEFAULT_SCREENSHOT_FOLDER;
        addOperation("screenshot-folder", "恢复默认截图保存文件夹");
        saveLibraryModel();
        saveAppState();
        return sendJson(res, 200, {
          ...bootstrap(),
          message: "截图保存位置已恢复为资料库内的默认文件夹",
        });
      }
      if (payload.action !== "choose") {
        throw new Error("截图文件夹操作不正确");
      }
      const selected = await chooseScreenshotFolderDialog();
      if (!selected) {
        return sendJson(res, 200, { ok: true, cancelled: true });
      }
      const folder = ensureFolder(selected);
      if (!isInsideLibrary(folder)) {
        throw new Error(
          "为保护史料，截图文件夹必须位于当前带测试标记的资料库内部"
        );
      }
      libraryModel.screenshotFolder =
        path.relative(currentLibrary, folder) || ".";
      addOperation(
        "screenshot-folder",
        `设置截图保存文件夹：${libraryModel.screenshotFolder}`
      );
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        message: "截图保存位置已更新，仍严格限制在当前资料库内部",
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/screenshot-export") {
    try {
      assertWritableLibrary();
      const payload = Object.fromEntries(url.searchParams.entries());
      const record = recordFor(payload.relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份资料");
      const page = Math.min(
        9999,
        Math.max(1, Number.parseInt(payload.page, 10) || 1)
      );
      const scope = payload.scope === "region" ? "region" : "full-page";
      const image = await readBuffer(req, 32 * 1024 * 1024);
      if (!image.length) throw new Error("没有收到需要保存的图片");
      const exportDirectory = screenshotDirectory();
      if (!isInsideLibrary(exportDirectory)) {
        throw new Error("截图保存位置超出当前资料库");
      }
      fs.mkdirSync(exportDirectory, { recursive: true });
      const fileName = availableScreenshotFile(
        exportDirectory,
        screenshotBaseName(record, page)
      );
      const exportPath = path.join(exportDirectory, fileName);
      fs.writeFileSync(exportPath, image);
      addOperation(
        "screenshot-export",
        `保存原件截图：${fileName}`,
        { recordId: record.id }
      );
      saveAppState();
      return sendJson(res, 200, {
        ok: true,
        fileName,
        exportPath,
        message:
          "图片已保存到当前资料库；工作台没有打开网站或上传任何文件",
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "GET" && url.pathname === "/api/ocr-settings") {
    return sendJson(res, 200, {
      ok: true,
      settings: cloudOcrSettingsSummary(),
      storage: "LOCALAPPDATA/HistoricalWorkbench/cloud-ocr-settings.json",
    });
  }

  if (req.method === "POST" && url.pathname === "/api/ocr-settings") {
    try {
      const payload = await readJson(req);
      const settings = updateCloudOcrSettings(payload);
      return sendJson(res, 200, {
        ok: true,
        settings,
        message:
          payload.action === "clear"
            ? "云 OCR 配置已从本机设置中清除"
            : "云 OCR 配置已保存在本机；尚未发起识别请求",
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "GET" && url.pathname === "/api/ocr-service-status") {
    const requestedEngine = normalizeOcrEngine(
      url.searchParams.get("engine")
    );
    if (requestedEngine === "kandian") {
      const configured = Boolean(
        cloudOcrSettings.kandian.account && cloudOcrSettings.kandian.token
      );
      return sendJson(res, 200, {
        ok: true,
        engine: requestedEngine,
        running: configured,
        configured,
        message: configured
          ? "看典古籍 OCR 凭据已保存在本机；识别时会上传当前页或当前框"
          : "看典古籍 OCR 尚未配置账号和 API Token",
      });
    }
    if (requestedEngine === "baidu") {
      const configured = Boolean(
        cloudOcrSettings.baidu.apiKey &&
          cloudOcrSettings.baidu.secretKey
      );
      return sendJson(res, 200, {
        ok: true,
        engine: requestedEngine,
        running: configured,
        configured,
        message: configured
          ? "百度智能云 OCR 凭据已保存在本机；识别时会上传当前页或当前框"
          : "百度智能云 OCR 尚未配置 API Key 和 Secret Key",
      });
    }
    const running = await probeLocalService(UMI_OCR_BASE);
    const located = resolvedUmiExecutable();
    const configured = Boolean(located.executable);
    return sendJson(res, 200, {
      ok: true,
      engine: "umi",
      running,
      configured,
      message: running
        ? "Umi-OCR HTTP 服务已连接"
        : configured
          ? located.bundled
            ? "已找到工作台随附的 Umi-OCR，尚未启动 HTTP 服务"
            : "已记录 Umi-OCR 程序，但 HTTP 服务尚未连接"
          : "工作台目录中没有找到 Umi-OCR.exe",
    });
  }

  if (req.method === "POST" && url.pathname === "/api/ocr-service-action") {
    try {
      const payload = await readJson(req);
      const action = String(payload.action || "");
      if (action === "choose-start-umi") {
        const executable = await chooseUmiExecutableDialog();
        if (!executable) {
          return sendJson(res, 200, {
            ok: true,
            cancelled: true,
            message: "未定位 Umi-OCR.exe；如尚未下载 Umi-OCR，请先安装或解压该独立软件",
          });
        }
        if (path.extname(executable).toLowerCase() !== ".exe") {
          throw new Error("请选择 Umi-OCR 的 exe 主程序");
        }
        state.umiOcrExecutable = executable;
        saveAppState();
        await startUmiOcrService();
        return sendJson(res, 200, {
          ok: true,
          running: true,
          message: "Umi-OCR 已启动，HTTP 服务已连接",
        });
      }
      if (action === "start-umi") {
        await startUmiOcrService();
        return sendJson(res, 200, {
          ok: true,
          running: true,
          message: "Umi-OCR HTTP 服务已连接",
        });
      }
      throw new Error("没有这个 OCR 服务操作");
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/ocr-region-preview") {
    let requestedEngine = "umi";
    try {
      assertWritableLibrary();
      const payload = Object.fromEntries(url.searchParams.entries());
      requestedEngine = normalizeOcrEngine(payload.engine);
      if (
        requestedEngine !== "umi" &&
        payload.cloudConsent !== "true"
      ) {
        throw new Error(
          "使用云 OCR 前必须勾选“允许上传当前页或当前框”"
        );
      }
      const record = recordFor(payload.relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份资料");
      const page = Math.min(
        9999,
        Math.max(1, Number.parseInt(payload.page, 10) || 1)
      );
      const mode = payload.mode === "full-page" ? "full-page" : "region";
      const x = mode === "full-page" ? 0 : clampCoordinate(payload.x);
      const y = mode === "full-page" ? 0 : clampCoordinate(payload.y);
      const width =
        mode === "full-page"
          ? 1
          : Math.min(clampCoordinate(payload.width), 1 - x);
      const height =
        mode === "full-page"
          ? 1
          : Math.min(clampCoordinate(payload.height), 1 - y);
      if (width < 0.005 || height < 0.005) {
        throw new Error("框选范围太小，请重新框选");
      }
      if (payload.pixelFormat !== "encoded") {
        throw new Error("OCR 图片传输格式不正确");
      }
      const imageBuffer = await readBuffer(req, 32 * 1024 * 1024);
      const imageBase64 = imageBuffer.toString("base64");
      let rawText;
      if (requestedEngine === "kandian") {
        rawText = await recognizeBase64WithKandian(imageBase64);
      } else if (requestedEngine === "baidu") {
        rawText = await recognizeBase64WithBaidu(imageBase64);
      } else {
        await ensureOcrService();
        rawText = await recognizeBase64WithUmi(imageBase64);
      }
      const engine = ocrEngineLabel(requestedEngine);
      if (!rawText) {
        throw new Error(
          mode === "full-page"
            ? `${engine}没有在这一页识别到文字`
            : `${engine}没有在这个框选区域识别到文字`
        );
      }
      return sendJson(res, 200, {
        ok: true,
        pendingResult: {
          page,
          mode,
          x,
          y,
          width,
          height,
          rawText,
          engine,
          recognizedAt: now(),
          annotationId:
            typeof payload.annotationId === "string"
              ? payload.annotationId.slice(0, 120)
              : "",
        },
      });
    } catch (error) {
      const message =
        requestedEngine === "umi" && error.code === "ECONNREFUSED"
          ? "无法连接 Umi-OCR。请先打开 Umi-OCR，并确认 HTTP 服务端口为 1224。"
          : error.message;
      return sendError(res, 400, message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/ocr-region-save") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const record = recordFor(payload.relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份资料");
      const rawText = cleanResearchText(payload.rawText, 200000);
      if (!rawText) throw new Error("待保留的 OCR 结果不能为空");
      const mode = payload.mode === "full-page" ? "full-page" : "region";
      const x = mode === "full-page" ? 0 : clampCoordinate(payload.x);
      const y = mode === "full-page" ? 0 : clampCoordinate(payload.y);
      const width =
        mode === "full-page"
          ? 1
          : Math.min(clampCoordinate(payload.width), 1 - x);
      const height =
        mode === "full-page"
          ? 1
          : Math.min(clampCoordinate(payload.height), 1 - y);
      if (width < 0.005 || height < 0.005) {
        throw new Error("OCR 来源范围不正确");
      }
      const recognizedAt =
        typeof payload.recognizedAt === "string" && payload.recognizedAt
          ? payload.recognizedAt
          : now();
      const engine = [
        "Umi-OCR",
        "看典古籍 OCR",
        "百度智能云 OCR（高精度含位置版）",
      ].includes(payload.engine)
        ? payload.engine
        : "Umi-OCR";
      const annotationId =
        typeof payload.annotationId === "string"
          ? payload.annotationId.slice(0, 120)
          : "";
      if (mode === "region" && annotationId) {
        record.ocrRegions = normalizeOcrRegions(
          record.ocrRegions,
          record.ocrPages
        ).filter(
          (item) =>
            item.annotationId !== annotationId ||
            Boolean(item.correctedManual && item.correctedText)
        );
      }
      const entry = {
        id: `ocr-${crypto.randomUUID()}`,
        page: Math.min(
          9999,
          Math.max(1, Number.parseInt(payload.page, 10) || 1)
        ),
        x,
        y,
        width,
        height,
        rawText,
        correctedText: "",
        correctedComplete: false,
        correctedManual: false,
        engine,
        recognizedAt,
        correctedAt: "",
        updatedAt: now(),
        mode,
        legacyFullPage: false,
        annotationId,
      };
      record.ocrRegions = normalizeOcrRegions(record.ocrRegions, record.ocrPages);
      record.ocrRegions.push(entry);
      record.ocrRegions = normalizeOcrRegions(record.ocrRegions);
      record.updatedAt = now();
      addOperation(
        "ocr-region-save",
        `${mode === "full-page" ? "保留整页 OCR" : "保留框选 OCR"}：第 ${
          entry.page
        } 页`,
        { recordId: record.id }
      );
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        savedOcrRegionId: entry.id,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/ocr-region-text") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const record = recordFor(payload.relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份资料");
      record.ocrRegions = normalizeOcrRegions(record.ocrRegions, record.ocrPages);
      const regionId = String(payload.regionId || "");
      let entry = record.ocrRegions.find((item) => item.id === regionId);
      if (payload.action === "create-manual") {
        const correctedText = cleanResearchText(payload.correctedText, 200000);
        if (!correctedText) throw new Error("手工校订文本不能为空");
        const correctedRichText = normalizeRichTextSegments(
          payload.correctedRichText,
          correctedText,
          200000
        );
        const correctedAt = now();
        entry = {
          id: `manual-${crypto.randomUUID()}`,
          page: Math.min(
            9999,
            Math.max(1, Number.parseInt(payload.page, 10) || 1)
          ),
          x: 0,
          y: 0,
          width: 1,
          height: 1,
          rawText: "",
          correctedText,
          correctedRichText,
          correctedComplete: false,
          correctedManual: true,
          engine: "手工录入",
          recognizedAt: "",
          correctedAt,
          updatedAt: correctedAt,
          mode: "full-page",
          legacyFullPage: false,
          annotationId:
            typeof payload.annotationId === "string"
              ? payload.annotationId.slice(0, 120)
              : "",
        };
        record.ocrRegions.push(entry);
        record.ocrRegions = normalizeOcrRegions(record.ocrRegions);
        addOperation(
          "manual-corrected-save",
          `保存手工校订文本：第 ${entry.page} 页`,
          { recordId: record.id }
        );
      } else if (!entry) {
        throw new Error("没有找到这条对照文本记录");
      } else if (payload.action === "delete") {
        record.ocrRegions = record.ocrRegions.filter(
          (item) => item.id !== regionId
        );
        if (entry.legacyFullPage) {
          record.ocrPages = normalizeOcrPages(record.ocrPages).filter(
            (item) => item.page !== entry.page
          );
        }
        addOperation("ocr-region-delete", `删除一条已保留 OCR：第 ${entry.page} 页`, {
          recordId: record.id,
        });
      } else {
        const correctedText = cleanResearchText(payload.correctedText, 200000);
        if (!correctedText) throw new Error("校订文本不能为空");
        const correctedRichText = normalizeRichTextSegments(
          payload.correctedRichText,
          correctedText,
          200000
        );
        entry.correctedText = correctedText;
        entry.correctedRichText = correctedRichText;
        entry.correctedManual = true;
        entry.correctedAt = now();
        entry.updatedAt = entry.correctedAt;
        addOperation(
          "ocr-region-corrected-save",
          `保存${
            entry.engine === "手工录入" ? "手工校订文本" : "OCR 校订"
          }：第 ${entry.page} 页`,
          { recordId: record.id }
        );
      }
      record.updatedAt = now();
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        savedOcrRegionId: entry?.id || regionId,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/annotation-content") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const record = recordFor(payload.relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份资料");
      record.annotations = normalizeAnnotations(record.annotations);
      record.ocrRegions = normalizeOcrRegions(record.ocrRegions, record.ocrPages);
      const annotation = record.annotations.find(
        (item) => item.id === String(payload.annotationId || "")
      );
      if (!annotation) throw new Error("没有找到这条框选");
      const correctedText = cleanResearchText(payload.text, 200000);
      if (!correctedText) throw new Error("框选内容不能为空");
      const correctedRichText = normalizeRichTextSegments(
        payload.richText,
        correctedText,
        200000
      );
      const requestedTranslationSourceText = cleanResearchText(
        payload.translationSourceText,
        200000
      );
      const requestedTranslationSourceRichText = normalizeRichTextSegments(
        payload.translationSourceRichText,
        requestedTranslationSourceText,
        200000
      );
      const closeEnough = (left, right) =>
        Math.abs(Number(left) - Number(right)) < 0.002;
      const belongsToAnnotation = (item) =>
        item.mode === "region" &&
        (item.annotationId === annotation.id ||
          (Number(item.page) === Number(annotation.page) &&
            closeEnough(item.x, annotation.x) &&
            closeEnough(item.y, annotation.y) &&
            closeEnough(item.width, annotation.width) &&
            closeEnough(item.height, annotation.height)));
      const linked = record.ocrRegions.filter(belongsToAnnotation);
      const previousEntry =
        [...linked].sort((a, b) =>
          String(
            b.updatedAt || b.correctedAt || b.recognizedAt || ""
          ).localeCompare(
            String(a.updatedAt || a.correctedAt || a.recognizedAt || "")
          )
        )[0] || null;
      const correctedAt = now();
      const entry = {
        id: previousEntry?.id || `manual-${crypto.randomUUID()}`,
        page: annotation.page,
        x: annotation.x,
        y: annotation.y,
        width: annotation.width,
        height: annotation.height,
        rawText: "",
        correctedText,
        correctedRichText,
        translationSourceText:
          requestedTranslationSourceText ||
          previousEntry?.translationSourceText ||
          "",
        translationSourceRichText: requestedTranslationSourceText
          ? requestedTranslationSourceRichText
          : previousEntry?.translationSourceRichText || [],
        translationSourceLanguage: requestedTranslationSourceText
          ? String(payload.translationSourceLanguage || "").slice(0, 40)
          : previousEntry?.translationSourceLanguage || "",
        translationTargetLanguage: requestedTranslationSourceText
          ? String(payload.translationTargetLanguage || "").slice(0, 40)
          : previousEntry?.translationTargetLanguage || "",
        translationEngine: requestedTranslationSourceText
          ? String(payload.translationEngine || "").slice(0, 80)
          : previousEntry?.translationEngine || "",
        translationModel: requestedTranslationSourceText
          ? String(payload.translationModel || "").slice(0, 120)
          : previousEntry?.translationModel || "",
        correctedComplete: false,
        correctedManual: true,
        engine: "手工录入",
        recognizedAt: "",
        correctedAt,
        updatedAt: correctedAt,
        mode: "region",
        legacyFullPage: false,
        annotationId: annotation.id,
      };
      record.ocrRegions = normalizeOcrRegions([
        ...record.ocrRegions.filter((item) => !belongsToAnnotation(item)),
        entry,
      ]);
      record.updatedAt = now();
      addOperation(
        "annotation-content-save",
        `手工保存框选内容：${annotation.text.slice(0, 80)}`,
        { recordId: record.id }
      );
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        savedOcrRegionId: entry.id,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/annotations") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const record = recordFor(payload.relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份资料");
      record.annotations = normalizeAnnotations(record.annotations);
      let annotationId = "";
      if (payload.action === "delete") {
        const requestedAnnotationId = String(payload.annotationId || "");
        const before = record.annotations.length;
        record.annotations = record.annotations.filter(
          (item) => item.id !== requestedAnnotationId
        );
        if (before === record.annotations.length) {
          throw new Error("没有找到需要删除的框选批注");
        }
        record.ocrRegions = normalizeOcrRegions(
          record.ocrRegions,
          record.ocrPages
        ).filter((item) => item.annotationId !== requestedAnnotationId);
        addOperation("annotation-delete", "删除一条原件框选批注", {
          recordId: record.id,
        });
      } else if (payload.action === "rename") {
        const annotation = record.annotations.find(
          (item) => item.id === String(payload.annotationId || "")
        );
        if (!annotation) throw new Error("没有找到需要修改记录的框选批注");
        const text = cleanResearchText(payload.text, 200000);
        if (!text) throw new Error("框选记录不能为空");
        annotation.text = text;
        annotation.recordRichText = normalizeRichTextSegments(
          payload.richText,
          text,
          200000
        );
        annotation.updatedAt = now();
        annotationId = annotation.id;
        addOperation(
          "annotation-record-update",
          `修改框选记录：${text.slice(0, 80)}`,
          { recordId: record.id }
        );
      } else if (payload.action === "update") {
        const annotation = record.annotations.find(
          (item) => item.id === String(payload.annotationId || "")
        );
        if (!annotation) throw new Error("没有找到需要调整的框选批注");
        const x = clampCoordinate(payload.x);
        const y = clampCoordinate(payload.y);
        const width = Math.min(clampCoordinate(payload.width), 1 - x);
        const height = Math.min(clampCoordinate(payload.height), 1 - y);
        if (width < 0.005 || height < 0.005) {
          throw new Error("调整后的框选范围太小");
        }
        Object.assign(annotation, {
          page: Math.min(
            9999,
            Math.max(1, Number.parseInt(payload.page, 10) || annotation.page || 1)
          ),
          x,
          y,
          width,
          height,
          coordinateSpace: "media",
          updatedAt: now(),
        });
        annotationId = annotation.id;
        addOperation("annotation-update", "调整一条原件框选的位置和大小", {
          recordId: record.id,
        });
      } else {
        const text = cleanResearchText(payload.text, 200000);
        if (!text) throw new Error("请填写初始框选记录");
        const x = clampCoordinate(payload.x);
        const y = clampCoordinate(payload.y);
        const width = Math.min(clampCoordinate(payload.width), 1 - x);
        const height = Math.min(clampCoordinate(payload.height), 1 - y);
        if (width < 0.005 || height < 0.005) {
          throw new Error("框选范围太小，请重新拖动");
        }
        const annotation = {
          id: `ann-${crypto.randomUUID()}`,
          page: Math.min(
            9999,
            Math.max(1, Number.parseInt(payload.page, 10) || 1)
          ),
          x,
          y,
          width,
          height,
          coordinateSpace:
            payload.coordinateSpace === "media" ? "media" : "legacy-stage",
          color: ["red", "amber", "blue"].includes(payload.color)
            ? payload.color
            : "red",
          text,
          recordRichText: normalizeRichTextSegments(
            payload.richText,
            text,
            200000
          ),
          createdAt: now(),
          updatedAt: now(),
        };
        record.annotations.push(annotation);
        annotationId = annotation.id;
        addOperation("annotation-add", "新增一条原件框选批注", {
          recordId: record.id,
        });
      }
      record.updatedAt = now();
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, { ...bootstrap(), annotationId });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/research-notes") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const record = recordFor(payload.relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份资料");
      record.researchNotes = normalizeResearchNotes(record.researchNotes);
      let noteId = "";
      if (payload.action === "delete") {
        const before = record.researchNotes.length;
        record.researchNotes = record.researchNotes.filter(
          (item) => item.id !== String(payload.noteId || "")
        );
        if (before === record.researchNotes.length) {
          throw new Error("没有找到需要删除的研究笔记");
        }
        addOperation("note-delete", "删除一条研究笔记", {
          recordId: record.id,
        });
      } else if (payload.action === "update") {
        const targetIndex = record.researchNotes.findIndex(
          (item) => item.id === String(payload.noteId || "")
        );
        if (targetIndex < 0) throw new Error("没有找到需要修改的研究笔记");
        const text = cleanResearchText(payload.text);
        if (!text) throw new Error("研究笔记不能为空");
        const previous = record.researchNotes[targetIndex];
        record.researchNotes[targetIndex] = {
          ...previous,
          text,
          richText: normalizeRichTextSegments(payload.richText, text),
          updatedAt: now(),
        };
        noteId = previous.id;
        addOperation("note-update", "修改一条研究笔记", {
          recordId: record.id,
        });
      } else {
        const text = cleanResearchText(payload.text);
        if (!text) throw new Error("请填写研究笔记");
        const note = {
          id: `note-${crypto.randomUUID()}`,
          text,
          richText: normalizeRichTextSegments(payload.richText, text),
          references: normalizeNoteReferences(payload.references),
          createdAt: now(),
          updatedAt: now(),
        };
        record.researchNotes.push(note);
        noteId = note.id;
        addOperation("note-add", "新增一条研究笔记", {
          recordId: record.id,
        });
      }
      record.updatedAt = now();
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, { ...bootstrap(), noteId });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/source-language") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const record = recordFor(payload.relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份史料");
      const sourceLanguage =
        payload.sourceLanguage === "foreign" ? "foreign" : "chinese";
      const recordKind = normalizeKind(record.kind);
      const recordKindLabel =
        recordKind === "paper" ? "论文" : recordKind === "book" ? "专著" : "史料";
      record.sourceLanguage = sourceLanguage;
      record.updatedAt = now();
      addOperation(
        "source-language",
        `设置材料语言：${sourceLanguage === "foreign" ? "外文" : "中文"}${recordKindLabel}`,
        { recordId: record.id }
      );
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        updatedRecordId: record.id,
        sourceLanguage,
        message:
          sourceLanguage === "foreign"
            ? `已即时切换为外文${recordKindLabel}`
            : `已即时切换为中文${recordKindLabel}`,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/delete-project") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const rawProjectName = String(payload.projectName || "").trim();
      const projectName = sanitizeComponent(rawProjectName);
      if (!projectName || projectName !== rawProjectName) {
        throw new Error("项目名称不正确");
      }
      if (String(payload.confirmName || "") !== projectName) {
        throw new Error("删除确认的项目名称不一致，请刷新后重试");
      }

      const libraryRoot = path.resolve(currentLibrary);
      const projectPath = path.resolve(libraryRoot, projectName);
      if (
        projectPath === libraryRoot ||
        path.dirname(projectPath) !== libraryRoot ||
        !isInsideLibrary(projectPath)
      ) {
        throw new Error("项目位置不正确");
      }
      if (
        !fs.existsSync(projectPath) ||
        !fs.statSync(projectPath).isDirectory() ||
        !physicalProjectDirectories().includes(projectName)
      ) {
        throw new Error("当前项目文件夹已不存在，请刷新列表");
      }

      ensureLibraryModel();
      const deletedRecordIds = new Set(
        Object.values(libraryModel.records || {})
          .filter(
            (record) =>
              physicalProject(record.relativePath) === projectName
          )
          .map((record) => record.id)
      );
      const deletedFileCount = walkSupportedFiles(projectPath).length;

      fs.rmSync(projectPath, {
        recursive: true,
        force: false,
        maxRetries: 2,
        retryDelay: 100,
      });

      deletedRecordIds.forEach((recordId) => {
        delete libraryModel.records[recordId];
      });
      libraryModel.projects = libraryModel.projects.filter(
        (item) => item !== projectName
      );
      libraryModel.aiSuggestions = normalizeAiSuggestionRecords(
        libraryModel.aiSuggestions
      ).filter(
        (item) =>
          !(item.materials || []).some((material) =>
            deletedRecordIds.has(material.recordId)
          )
      );
      libraryModel.aiChatMessages = normalizeAiChatMessages(
        libraryModel.aiChatMessages
      ).filter(
        (item) =>
          !(item.contextMaterials || []).some((material) =>
            deletedRecordIds.has(material.recordId)
          )
      );
      state.history = state.history.filter(
        (item) => !deletedRecordIds.has(item.recordId)
      );
      state.operations = state.operations.filter(
        (item) =>
          !deletedRecordIds.has(item.recordId) &&
          !String(item.summary || "").includes(projectName)
      );
      addOperation("project-delete", "永久删除一个研究项目");

      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        deletedProject: projectName,
        deletedFileCount,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/delete-record") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const source = resolveCurrentFile(payload.relativePath);
      const relativePath = toRelative(source);
      const record = recordFor(relativePath, payload.recordId);
      if (!record) throw new Error("没有找到这份史料的工作台记录");

      const sourceName = path.basename(source);
      if (String(payload.confirmName || "") !== sourceName) {
        throw new Error("删除确认的文件名与当前史料不一致，请刷新后重试");
      }

      fs.unlinkSync(source);
      delete libraryModel.records[record.id];

      libraryModel.aiSuggestions = normalizeAiSuggestionRecords(
        libraryModel.aiSuggestions
      ).filter(
        (item) =>
          !(item.materials || []).some(
            (material) => material.recordId === record.id
          )
      );
      libraryModel.aiChatMessages = normalizeAiChatMessages(
        libraryModel.aiChatMessages
      ).filter(
        (item) =>
          !(item.contextMaterials || []).some(
            (material) => material.recordId === record.id
          )
      );
      state.history = state.history.filter(
        (item) => item.recordId !== record.id
      );
      state.operations = state.operations.filter(
        (item) => item.recordId !== record.id
      );
      addOperation("record-delete", "永久删除一份史料");

      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        deletedRecordId: record.id,
        deletedName: sourceName,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/delete-records") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req, 2 * 1024 * 1024);
      const requested = Array.isArray(payload.records) ? payload.records : [];
      if (!requested.length || requested.length > 500) {
        throw new Error("请选择 1 至 500 份需要删除的材料");
      }

      ensureLibraryModel();
      const seenRecordIds = new Set();
      const targets = requested.map((item) => {
        const source = resolveCurrentFile(item.relativePath);
        const relativePath = toRelative(source);
        const record = recordFor(relativePath, item.recordId);
        if (!record) throw new Error("有材料的工作台记录已经不存在，请刷新后重试");
        if (seenRecordIds.has(record.id)) {
          throw new Error("删除清单中出现了重复材料，请重新选择");
        }
        seenRecordIds.add(record.id);
        const sourceName = path.basename(source);
        if (String(item.confirmName || "") !== sourceName) {
          throw new Error(`删除确认的文件名已经变化：${sourceName}`);
        }
        if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
          throw new Error(`原始文件已经不存在：${sourceName}`);
        }
        return { source, sourceName, record };
      });

      targets.forEach(({ source }) => fs.unlinkSync(source));
      targets.forEach(({ record }) => {
        delete libraryModel.records[record.id];
      });

      libraryModel.aiSuggestions = normalizeAiSuggestionRecords(
        libraryModel.aiSuggestions
      ).filter(
        (item) =>
          !(item.materials || []).some((material) =>
            seenRecordIds.has(material.recordId)
          )
      );
      libraryModel.aiChatMessages = normalizeAiChatMessages(
        libraryModel.aiChatMessages
      ).filter(
        (item) =>
          !(item.contextMaterials || []).some((material) =>
            seenRecordIds.has(material.recordId)
          )
      );
      state.history = state.history.filter(
        (item) => !seenRecordIds.has(item.recordId)
      );
      state.operations = state.operations.filter(
        (item) => !seenRecordIds.has(item.recordId)
      );
      addOperation(
        "record-delete-batch",
        `永久删除 ${targets.length} 份史料`
      );

      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        deletedFileCount: targets.length,
        deletedRecordIds: [...seenRecordIds],
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/rename") {
    try {
      assertWritableLibrary();
      const payload = await readJson(req);
      const source = resolveCurrentFile(payload.relativePath);
      const oldRelative = toRelative(source);
      const record = recordFor(oldRelative, payload.id);
      if (!record) throw new Error("没有找到这份史料的元数据记录");
      const beforeRecord = JSON.parse(JSON.stringify(record));
      const built = buildTargetName(payload, path.basename(source));
      const target = path.join(path.dirname(source), built.targetName);
      const newRelative = toRelative(target);
      const primary = physicalProject(oldRelative);
      const projects = primary === "未分类" ? [] : [primary];
      const status = payload.status === "organized" ? "organized" : "unread";

      if (source !== target && fs.existsSync(target)) {
        throw new Error(`目标文件已经存在：${built.targetName}`);
      }

      if (source !== target) fs.renameSync(source, target);

      Object.assign(record, {
        relativePath: newRelative,
        kind: built.kind,
        sourceLanguage:
          built.kind === "source" && payload.sourceLanguage === "foreign"
            ? "foreign"
            : "chinese",
        paperType: built.paperType,
        date: built.date,
        paper: built.paper,
        edition: built.edition,
        editionNumber: built.editionNumber,
        editionUnit: built.editionUnit,
        title: built.title,
        author: built.author,
        journal: built.journal,
        issueNumber: built.issueNumber,
        issueUnit: built.issueUnit,
        degree: built.degree,
        institution: built.institution,
        bookPlace: built.bookPlace,
        bookPublisher: built.bookPublisher,
        citation: built.citation,
        tags: parseTags(payload.tags),
        status,
        projects,
        updatedAt: now(),
        missing: false,
        importReview: {
          status: "confirmed",
          confidence: "confirmed",
          rule:
            built.kind === "source"
              ? record.importReview?.rule || "manual"
              : `${built.kind}-manual`,
          style:
            built.kind === "source"
              ? parseFilename(built.targetName).style
              : built.kind,
          detectedAt: record.importReview?.detectedAt || now(),
          confirmedAt: now(),
          suggested: {
            date: built.date,
            paper: built.paper,
            edition: built.edition,
            title: built.title,
            author: built.author,
          },
        },
      });

      if (source !== target) {
        state.history.push({
          id: `undo-${crypto.randomUUID()}`,
          recordId: record.id,
          oldPath: source,
          newPath: target,
          beforeRecord,
          at: now(),
        });
      }

      const changedName = source !== target;
      addOperation(
        changedName ? "rename" : "metadata",
        changedName
          ? `重命名：${path.basename(source)} → ${built.targetName}`
          : `更新信息：${built.targetName}`,
        { recordId: record.id }
      );
      if (built.date) {
        state.recentDates = remember(built.date, state.recentDates, 30);
      }
      if (built.paper) {
        state.recentPapers = remember(built.paper, state.recentPapers, 100);
      }
      libraryModel.projects = uniqueStrings([
        ...physicalProjectDirectories(),
        ...libraryModel.projects,
      ]);
      saveLibraryModel();
      saveAppState();

      return sendJson(res, 200, {
        ...bootstrap(),
        unchanged: !changedName,
        renamedTo: built.targetName,
        renamedRelativePath: newRelative,
        recordId: record.id,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "POST" && url.pathname === "/api/undo") {
    try {
      assertWritableLibrary();
      if (!state.history.length) throw new Error("没有可以撤销的重命名操作");
      const action = state.history[state.history.length - 1];
      if (!fs.existsSync(action.newPath)) {
        throw new Error("上一次重命名后的文件已不存在或被移动");
      }
      if (fs.existsSync(action.oldPath)) {
        throw new Error(`原文件名已被占用：${path.basename(action.oldPath)}`);
      }
      fs.renameSync(action.newPath, action.oldPath);
      ensureLibraryModel();
      libraryModel.records[action.recordId] = action.beforeRecord;
      state.history.pop();
      addOperation("undo", `撤销重命名，恢复：${path.basename(action.oldPath)}`, {
        recordId: action.recordId,
      });
      saveLibraryModel();
      saveAppState();
      return sendJson(res, 200, {
        ...bootstrap(),
        restoredName: path.basename(action.oldPath),
        restoredRelativePath: action.beforeRecord.relativePath,
      });
    } catch (error) {
      return sendError(res, 400, error.message);
    }
  }

  if (req.method === "GET" && url.pathname === "/api/preview") {
    try {
      const relativePath = url.searchParams.get("path") || "";
      const filePath = resolveCurrentFile(relativePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentTypes = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".pdf": "application/pdf",
        ".tif": "image/tiff",
        ".tiff": "image/tiff",
        ".bmp": "image/bmp",
        ".webp": "image/webp",
      };
      const stats = fs.statSync(filePath);
      res.writeHead(200, {
        "Content-Type": contentTypes[ext] || "application/octet-stream",
        "Content-Length": stats.size,
        "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(
          path.basename(filePath)
        )}`,
        "Cache-Control": "no-store",
      });
      fs.createReadStream(filePath).pipe(res);
    } catch (error) {
      sendError(res, 404, error.message);
    }
    return;
  }

  sendError(res, 404, "未找到这个功能");
}

function serveStatic(res, pathname) {
  const requested = pathname === "/" ? "index.html" : pathname.slice(1);
  const safePath = path.normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);
  if (!filePath.startsWith(PUBLIC_DIR) || !fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".wasm": "application/wasm",
    ".svg": "image/svg+xml",
  };
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": contentTypes[ext] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  if (url.pathname.startsWith("/api/")) {
    try {
      await apiHandler(req, res, url);
    } catch (error) {
      sendError(res, 500, `程序内部错误：${error.message}`);
    }
    return;
  }
  serveStatic(res, decodeURIComponent(url.pathname));
});

server.on("error", (error) => {
  if (error.code !== "EADDRINUSE") {
    console.error(error);
    process.exitCode = 1;
  }
});

if (require.main === module) {
  server.listen(PORT, HOST, () => {
  console.log(`纸上寻踪 1.0.0正在运行：http://${HOST}:${PORT}`);
  });
}

module.exports = {
  APP_VERSION,
  HOST,
  PORT,
  server,
  buildTargetName,
  chineseDate,
  normalizeAnnotations,
  normalizeFavoriteWebsites,
  normalizeResearchNotes,
  normalizeOcrEngine,
  ocrEngineLabel,
  scanImportSourcePaths,
  splitEdition,
  validateFlexibleDate,
};
