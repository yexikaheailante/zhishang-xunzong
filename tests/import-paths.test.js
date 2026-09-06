"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { scanImportSourcePaths } = require("../server");

test("混合扫描文件与文件夹时过滤格式、递归并去重", (t) => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "paper-trail-import-"));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  const folder = path.join(temp, "史料夹");
  const nested = path.join(folder, "子目录");
  fs.mkdirSync(nested, { recursive: true });
  const firstPdf = path.join(folder, "一.pdf");
  const nestedImage = path.join(nested, "二.png");
  const separateImage = path.join(temp, "三.jpg");
  fs.writeFileSync(firstPdf, "pdf");
  fs.writeFileSync(nestedImage, "png");
  fs.writeFileSync(separateImage, "jpg");
  fs.writeFileSync(path.join(folder, "说明.txt"), "ignored");

  const result = scanImportSourcePaths(
    [folder, firstPdf, separateImage, separateImage],
    true
  );
  assert.equal(result.length, 3);
  assert.equal(new Set(result.map((item) => item.sourcePath.toLocaleLowerCase())).size, 3);
  assert.deepEqual(
    new Set(result.map((item) => item.name)),
    new Set(["一.pdf", "二.png", "三.jpg"])
  );
  assert.ok(result.some((item) => item.relativePath.includes("子目录")));
});

test("关闭递归后只扫描文件夹第一层，但仍接收单独文件", (t) => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "paper-trail-import-flat-"));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  const folder = path.join(temp, "来源");
  fs.mkdirSync(path.join(folder, "深层"), { recursive: true });
  fs.writeFileSync(path.join(folder, "表层.pdf"), "pdf");
  fs.writeFileSync(path.join(folder, "深层", "隐藏.png"), "png");
  const direct = path.join(temp, "单独.webp");
  fs.writeFileSync(direct, "webp");

  const result = scanImportSourcePaths([folder, direct], false);
  assert.deepEqual(
    result.map((item) => item.name).sort(),
    ["单独.webp", "表层.pdf"]
  );
});
