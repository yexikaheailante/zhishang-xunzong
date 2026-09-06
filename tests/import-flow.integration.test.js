"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

test("混合来源经过核对后复制到目标项目且不移动源文件", async (t) => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "paper-trail-flow-"));
  const library = path.join(temp, "资料库");
  const sourceFolder = path.join(temp, "来源文件夹");
  const directFile = path.join(temp, "单独图片.png");
  fs.mkdirSync(library, { recursive: true });
  fs.mkdirSync(sourceFolder, { recursive: true });
  fs.writeFileSync(path.join(sourceFolder, "报刊.pdf"), "pdf-source");
  fs.writeFileSync(directFile, "image-source");
  process.env.LOCALAPPDATA = path.join(temp, "runtime");
  process.env.HISTORICAL_WORKBENCH_DESKTOP = "1";
  process.env.HISTORICAL_WORKBENCH_PORT = "0";
  const { HOST, server } = require("../server");
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, HOST, resolve);
  });
  t.after(async () => {
    if (server.listening) {
      await new Promise((resolve) => server.close(resolve));
    }
    fs.rmSync(temp, { recursive: true, force: true });
  });
  const base = `http://${HOST}:${server.address().port}`;
  const post = async (pathname, body) => {
    const response = await fetch(`${base}${pathname}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    assert.equal(response.ok, true, data.error || pathname);
    return data;
  };

  await post("/api/choose-library", { folderPath: library });
  await post("/api/initialize-library", {});
  await post("/api/create-project", { name: "未归档资料" });
  const scan = await post("/api/folder-import-scan", {
    targetProject: "未归档资料",
    recursive: true,
    sourcePaths: [sourceFolder, directFile],
  });
  assert.equal(scan.items.length, 2);
  const committed = await post("/api/folder-import-commit", {
    token: scan.token,
    itemIds: scan.items.map((item) => item.id),
    targetProject: "未归档资料",
    preserveStructure: true,
    conflictPolicy: "skip",
    consent: true,
  });
  assert.equal(committed.folderImportResult.importedCount, 2);
  assert.equal(fs.existsSync(path.join(sourceFolder, "报刊.pdf")), true);
  assert.equal(fs.existsSync(directFile), true);
  const importedNames = fs
    .readdirSync(path.join(library, "未归档资料"), { recursive: true })
    .map(String);
  assert.ok(importedNames.some((name) => name.endsWith("报刊.pdf")));
  assert.ok(importedNames.some((name) => name.endsWith("单独图片.png")));
});
