const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const releaseDir = process.env.ZHISHANG_RELEASE_DIR
  ? path.resolve(process.env.ZHISHANG_RELEASE_DIR)
  : null;

function isFile(target) {
  return fs.existsSync(target) && fs.statSync(target).isFile();
}

function isDirectory(target) {
  return fs.existsSync(target) && fs.statSync(target).isDirectory();
}

test(
  "1.0.0以可直接启动的展开式免安装目录交付",
  { skip: releaseDir ? false : "设置 ZHISHANG_RELEASE_DIR 后检查实际发布目录" },
  () => {
  assert.equal(
    isFile(path.join(releaseDir, "纸上寻踪.exe")),
    true,
    "发布目录必须直接包含纸上寻踪.exe"
  );
  assert.equal(
    isDirectory(path.join(releaseDir, "resources")),
    true,
    "发布目录必须直接包含 resources"
  );
  assert.equal(
    isDirectory(path.join(releaseDir, "locales")),
    true,
    "发布目录必须直接包含 locales"
  );
  }
);
