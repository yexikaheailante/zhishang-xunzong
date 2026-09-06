"use strict";

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  shell,
} = require("electron");

const APP_ID = "cn.zhishangxunzong.desktop";
let mainWindow = null;
let backend = null;
let backendUrl = "";
const floatingWindows = new Set();

app.setAppUserModelId(APP_ID);

const singleInstanceLock = app.requestSingleInstanceLock();
if (!singleInstanceLock) {
  app.quit();
}

function workbenchRoot() {
  return app.isPackaged
    ? path.join(process.resourcesPath, "workbench")
    : path.resolve(__dirname, "..");
}

function startBackend() {
  return new Promise((resolve, reject) => {
    process.env.HISTORICAL_WORKBENCH_DESKTOP = "1";
    process.env.HISTORICAL_WORKBENCH_PORT = "0";
    backend = require(path.join(workbenchRoot(), "server.js"));
    const handleError = (error) => reject(error);
    backend.server.once("error", handleError);
    backend.server.listen(0, backend.HOST, () => {
      backend.server.off("error", handleError);
      const address = backend.server.address();
      backendUrl = `http://${backend.HOST}:${address.port}`;
      resolve(backendUrl);
    });
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1680,
    height: 1040,
    minWidth: 1180,
    minHeight: 720,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#f7fbfb",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, "preload.js"),
      partition: "persist:historical-workbench",
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url) && !url.startsWith(backendUrl)) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith(backendUrl)) return;
    event.preventDefault();
    if (/^https?:/i.test(url)) shell.openExternal(url);
  });
  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.loadURL(backendUrl);
}

function createFloatingReader(payload = {}) {
  const floatingWindow = new BrowserWindow({
    width: 540,
    height: Math.min(
      820,
      Math.max(360, Number.parseInt(payload.height, 10) || 520)
    ),
    minWidth: 360,
    minHeight: 260,
    alwaysOnTop: payload.alwaysOnTop !== false,
    autoHideMenuBar: true,
    backgroundColor: "#ffffff",
    title: String(payload.title || "悬浮阅读").slice(0, 160),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  floatingWindow.historicalReaderId = String(payload.readerId || "").slice(
    0,
    120
  );
  floatingWindows.add(floatingWindow);
  floatingWindow.on("closed", () => floatingWindows.delete(floatingWindow));
  floatingWindow.webContents.once("did-finish-load", () => {
    floatingWindow.webContents.send("floating-reader:data", {
      title: String(payload.title || "悬浮阅读"),
      text: String(payload.text || ""),
      fontSize: Number.parseInt(payload.fontSize, 10) || 16,
      readerId: floatingWindow.historicalReaderId,
      editable: Boolean(payload.editable),
    });
  });
  floatingWindow.loadFile(path.join(__dirname, "floating-reader.html"));
  return true;
}

function edgeExecutablePath() {
  const candidates = [
    process.env["ProgramFiles(x86)"]
      ? path.join(
          process.env["ProgramFiles(x86)"],
          "Microsoft",
          "Edge",
          "Application",
          "msedge.exe"
        )
      : "",
    process.env.ProgramFiles
      ? path.join(
          process.env.ProgramFiles,
          "Microsoft",
          "Edge",
          "Application",
          "msedge.exe"
        )
      : "",
    process.env.LOCALAPPDATA
      ? path.join(
          process.env.LOCALAPPDATA,
          "Microsoft",
          "Edge",
          "Application",
          "msedge.exe"
        )
      : "",
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate)) || "";
}

function validatedEdgeTranslatorUrl(value) {
  if (!backendUrl) throw new Error("本机服务尚未准备好");
  const target = new URL(String(value || ""));
  const backendOrigin = new URL(backendUrl).origin;
  if (
    target.origin !== backendOrigin ||
    target.pathname !== "/edge-translator.html"
  ) {
    throw new Error("Edge 翻译窗口地址无效");
  }
  return target.href;
}

ipcMain.handle("floating-reader:open", (_event, payload) =>
  createFloatingReader(payload)
);

ipcMain.handle("floating-reader:update", (event, payload = {}) => {
  const sourceWindow = BrowserWindow.fromWebContents(event.sender);
  if (!sourceWindow || !floatingWindows.has(sourceWindow)) {
    throw new Error("悬浮窗口来源无效");
  }
  const readerId = String(payload.readerId || "").slice(0, 120);
  if (!readerId || readerId !== sourceWindow.historicalReaderId) {
    throw new Error("悬浮窗口已经失效");
  }
  mainWindow?.webContents.send("floating-reader:edit", {
    readerId,
    text: String(payload.text || "").slice(0, 200000),
  });
  return true;
});

ipcMain.handle("folder-dialog:choose", async (_event, payload = {}) => {
  const result = await dialog.showOpenDialog(mainWindow || undefined, {
    title: String(payload.title || "选择文件夹"),
    defaultPath: String(payload.defaultPath || ""),
    properties: [
      "openDirectory",
      ...(payload.createDirectory === false ? [] : ["createDirectory"]),
    ],
  });
  return {
    cancelled: result.canceled || !result.filePaths.length,
    folderPath: result.filePaths[0] || "",
  };
});

ipcMain.handle("file-dialog:choose", async (_event, payload = {}) => {
  const result = await dialog.showOpenDialog(mainWindow || undefined, {
    title: String(payload.title || "选择文件"),
    defaultPath: String(payload.defaultPath || ""),
    properties: ["openFile", "multiSelections"],
    filters: [
      {
        name: "史料文件",
        extensions: ["pdf", "png", "jpg", "jpeg", "tif", "tiff", "bmp", "webp"],
      },
      { name: "所有文件", extensions: ["*"] },
    ],
  });
  return {
    cancelled: result.canceled || !result.filePaths.length,
    filePaths: result.filePaths,
  };
});

ipcMain.handle("edge-translator:check", () => {
  const executable = edgeExecutablePath();
  return {
    installed: Boolean(executable),
    executable,
  };
});

ipcMain.handle("edge-translator:open", async (_event, payload = {}) => {
  const targetUrl = validatedEdgeTranslatorUrl(payload.url);
  const executable = edgeExecutablePath();
  if (!executable) {
    throw new Error("没有找到 Microsoft Edge，请先确认 Edge 已安装");
  }
  const child = spawn(
    executable,
    [`--app=${targetUrl}`, "--new-window"],
    {
      detached: true,
      stdio: "ignore",
      windowsHide: false,
    }
  );
  child.unref();
  return { opened: true };
});

app.on("second-instance", () => {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
});

app.whenReady().then(async () => {
  try {
    await startBackend();
    createMainWindow();
  } catch (error) {
    const { dialog } = require("electron");
    dialog.showErrorBox(
      "纸上寻踪未能启动",
      `本机服务启动失败：${error.message}`
    );
    app.quit();
  }
});

app.on("activate", () => {
  if (!mainWindow && backendUrl) createMainWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("before-quit", () => {
  for (const floatingWindow of floatingWindows) {
    if (!floatingWindow.isDestroyed()) floatingWindow.destroy();
  }
  if (backend?.server?.listening) backend.server.close();
});
