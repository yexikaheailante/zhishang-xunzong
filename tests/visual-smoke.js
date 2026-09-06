"use strict";

const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const output = path.join(os.tmpdir(), "paper-trail-visual-output");
const runtimeData = path.join(os.tmpdir(), "paper-trail-visual-runtime");
fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(runtimeData, { recursive: true });
process.env.LOCALAPPDATA = runtimeData;
process.env.HISTORICAL_WORKBENCH_DESKTOP = "1";
process.env.HISTORICAL_WORKBENCH_PORT = "0";

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function freePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

function edgePath() {
  const candidates = [
    path.join(process.env["ProgramFiles(x86)"] || "", "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(process.env.ProgramFiles || "", "Microsoft", "Edge", "Application", "msedge.exe"),
  ];
  const found = candidates.find((candidate) => candidate && fs.existsSync(candidate));
  if (!found) throw new Error("未找到 Microsoft Edge");
  return found;
}

async function connectCdp(port) {
  let page;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const pages = await response.json();
      page = pages.find((item) => item.type === "page");
      if (page?.webSocketDebuggerUrl) break;
    } catch {}
    await wait(100);
  }
  if (!page?.webSocketDebuggerUrl) throw new Error("无法连接本地浏览器检查页面");
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  let sequence = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++sequence;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  return { socket, send };
}

async function capture(send, name) {
  const result = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  fs.writeFileSync(path.join(output, `${name}.png`), Buffer.from(result.data, "base64"));
}

async function evaluate(send, expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "页面脚本执行失败");
  }
  return result.result.value;
}

(async () => {
  const backend = require(path.join(root, "server.js"));
  await new Promise((resolve, reject) => {
    backend.server.once("error", reject);
    backend.server.listen(0, backend.HOST, resolve);
  });
  const appPort = backend.server.address().port;
  const debugPort = await freePort();
  const edge = spawn(
    edgePath(),
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--disable-software-rasterizer",
      "--no-first-run",
      "--hide-scrollbars",
      "--window-size=1680,1040",
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${path.join(runtimeData, "edge-profile")}`,
      `http://${backend.HOST}:${appPort}`,
    ],
    { windowsHide: true, stdio: "ignore" }
  );
  try {
    const { socket, send } = await connectCdp(debugPort);
    await send("Page.enable");
    await send("Runtime.enable");
    await wait(900);
    await capture(send, "workspace-empty");

    await evaluate(send, 'document.querySelector("#favoriteWebsitesNavButton").click()');
    await wait(220);
    await capture(send, "favorite-websites");
    const favoriteMetrics = await evaluate(send, `(() => {
      const modal = document.querySelector('.favorite-websites-modal');
      const layout = document.querySelector('.favorite-bookmark-layout');
      const search = document.querySelector('#favoriteWebsiteSearchInput');
      return {
        modal: modal?.getBoundingClientRect().toJSON(),
        layout: layout?.getBoundingClientRect().toJSON(),
        search: {
          placeholder: search?.placeholder,
          value: search?.value,
          rect: search?.getBoundingClientRect().toJSON(),
          fontSize: search ? getComputedStyle(search).fontSize : '',
          color: search ? getComputedStyle(search).color : '',
        },
        bodyOverflowX: document.body.scrollWidth > document.body.clientWidth,
      };
    })()`);

    await evaluate(
      send,
      'document.querySelector("#closeFavoriteWebsitesButton").click(); document.querySelector("#folderImportButton").click()'
    );
    await wait(220);
    await capture(send, "folder-import");
    const importMetrics = await evaluate(send, `(() => {
      const modal = document.querySelector('.folder-import-modal');
      return {
        modal: modal?.getBoundingClientRect().toJSON(),
        consentPresent: Boolean(document.querySelector('#folderImportConsent')),
        advancedOpen: Boolean(document.querySelector('.folder-import-advanced')?.open),
        commitText: document.querySelector('#commitFolderImportButton')?.textContent.trim(),
        bodyOverflowX: document.body.scrollWidth > document.body.clientWidth,
      };
    })()`);
    console.log(JSON.stringify({ favoriteMetrics, importMetrics }, null, 2));
    await send("Browser.close").catch(() => {});
    socket.close();
  } finally {
    if (!edge.killed) edge.kill();
    await new Promise((resolve) => backend.server.close(resolve));
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
