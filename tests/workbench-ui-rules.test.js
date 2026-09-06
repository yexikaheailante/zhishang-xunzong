"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const rules = require("../public/workbench-ui-rules");

test("零值可选计数保持安静，正数按指定方式显示", () => {
  assert.equal(rules.optionalCount(0), "");
  assert.equal(rules.optionalCount(-1), "");
  assert.equal(rules.optionalCount(3), "3");
  assert.equal(rules.optionalCount(3, (count) => `${count} 份`), "3 份");
});

test("未打开资料时不显示进度，打开后显示当前位置", () => {
  assert.equal(rules.progressText(-1, 0), "");
  assert.equal(rules.progressText(-1, 12), "");
  assert.equal(rules.progressText(0, 12), "1 / 12");
  assert.equal(rules.progressText(11, 12), "12 / 12");
});

test("拖入项目解析为唯一的本地路径", () => {
  const files = [{ id: "a" }, { id: "b" }, { id: "a-again" }, { id: "bad" }];
  const paths = rules.collectDropPaths(files, (file) => {
    if (file.id === "bad") throw new Error("无法解析");
    if (file.id === "a-again") return "C:\\史料\\一.pdf";
    return file.id === "a" ? "C:\\史料\\一.pdf" : "C:\\史料\\二.png";
  });
  assert.deepEqual(paths, ["C:\\史料\\一.pdf", "C:\\史料\\二.png"]);
});

test("可编辑的悬浮文本在修改后标记为待保存", () => {
  const createState = rules.createFloatingReaderEditState;
  const updateText = rules.updateFloatingReaderEditText;
  const state = typeof createState === "function"
    ? createState({ text: "原文", editable: true, saveText: async () => true })
    : null;
  const changed = typeof updateText === "function"
    ? updateText(state, "修改后的文字")
    : false;

  assert.equal(changed, true);
  assert.equal(state?.text, "修改后的文字");
  assert.equal(state?.dirty, true);
});

test("可编辑的悬浮文本可以撤销到上一次修改前的内容", () => {
  const state = rules.createFloatingReaderEditState({
    text: "原文",
    editable: true,
    saveText: async () => true,
  });

  rules.updateFloatingReaderEditText(state, "第一次修改");
  rules.updateFloatingReaderEditText(state, "第二次修改");
  const undone = rules.undoFloatingReaderEditText(state);

  assert.equal(undone, true);
  assert.equal(state.text, "第一次修改");
  assert.equal(state.dirty, true);
});

test("悬浮阅读只把 Ctrl+Z 识别为撤销快捷键", () => {
  assert.equal(
    rules.isFloatingReaderUndoShortcut({ key: "z", ctrlKey: true }),
    true
  );
  assert.equal(
    rules.isFloatingReaderUndoShortcut({ key: "Z", ctrlKey: true }),
    true
  );
  assert.equal(
    rules.isFloatingReaderUndoShortcut({
      key: "z",
      ctrlKey: true,
      shiftKey: true,
    }),
    false
  );
  assert.equal(
    rules.isFloatingReaderUndoShortcut({ key: "z", ctrlKey: false }),
    false
  );
});

test("只读悬浮文本拒绝修改", () => {
  const createState = rules.createFloatingReaderEditState;
  const updateText = rules.updateFloatingReaderEditText;
  const state = typeof createState === "function"
    ? createState({ text: "OCR 原文", editable: false })
    : null;
  const changed = typeof updateText === "function"
    ? updateText(state, "不应保存")
    : true;

  assert.equal(changed, false);
  assert.equal(state?.text, "OCR 原文");
  assert.equal(state?.dirty, false);
});

test("悬浮文本保存完成后清除待保存状态", async () => {
  let savedText = "";
  const createState = rules.createFloatingReaderEditState;
  const updateText = rules.updateFloatingReaderEditText;
  const flush = rules.flushFloatingReaderEdit;
  const state = typeof createState === "function"
    ? createState({
        text: "原文",
        editable: true,
        saveText: async (text) => {
          savedText = text;
          return true;
        },
      })
    : null;
  if (typeof updateText === "function") updateText(state, "已校订");
  const saved = typeof flush === "function" ? await flush(state) : false;

  assert.equal(saved, true);
  assert.equal(savedText, "已校订");
  assert.equal(state?.dirty, false);
  assert.equal(state?.saving, false);
});
