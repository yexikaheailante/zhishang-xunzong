"use strict";

const { contextBridge, ipcRenderer, webUtils } = require("electron");

contextBridge.exposeInMainWorld("historicalWorkbenchDesktop", {
  openFloatingReader(payload) {
    return ipcRenderer.invoke("floating-reader:open", payload);
  },
  updateFloatingReaderText(payload) {
    return ipcRenderer.invoke("floating-reader:update", payload);
  },
  chooseFolder(payload) {
    return ipcRenderer.invoke("folder-dialog:choose", payload);
  },
  chooseFiles(payload) {
    return ipcRenderer.invoke("file-dialog:choose", payload);
  },
  pathForFile(file) {
    return webUtils.getPathForFile(file);
  },
  checkEdgeTranslator() {
    return ipcRenderer.invoke("edge-translator:check");
  },
  openEdgeTranslator(payload) {
    return ipcRenderer.invoke("edge-translator:open", payload);
  },
  onFloatingReaderData(callback) {
    if (typeof callback !== "function") return;
    ipcRenderer.on("floating-reader:data", (_event, payload) => {
      callback(payload);
    });
  },
  onFloatingReaderEdit(callback) {
    if (typeof callback !== "function") return;
    ipcRenderer.on("floating-reader:edit", (_event, payload) => {
      callback(payload);
    });
  },
});
