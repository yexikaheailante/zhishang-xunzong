"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

let historyRules = {};
try {
  historyRules = require("../desktop/floating-reader-history");
} catch {}

test("置顶悬浮窗可以逐步记录并撤销文本修改", () => {
  assert.equal(typeof historyRules.createHistory, "function");
  assert.equal(typeof historyRules.recordText, "function");
  assert.equal(typeof historyRules.undoText, "function");

  const state = historyRules.createHistory("原文");
  historyRules.recordText(state, "第一次修改");
  historyRules.recordText(state, "第二次修改");

  assert.equal(historyRules.undoText(state), "第一次修改");
  assert.equal(historyRules.undoText(state), "原文");
  assert.equal(historyRules.undoText(state), null);
});

test("置顶悬浮窗只响应 Ctrl+Z 撤销", () => {
  assert.equal(typeof historyRules.isUndoShortcut, "function");
  if (typeof historyRules.isUndoShortcut !== "function") return;
  assert.equal(
    historyRules.isUndoShortcut({ key: "z", ctrlKey: true }),
    true
  );
  assert.equal(
    historyRules.isUndoShortcut({ key: "z", ctrlKey: true, shiftKey: true }),
    false
  );
  assert.equal(
    historyRules.isUndoShortcut({ key: "z", ctrlKey: false }),
    false
  );
});
