"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  normalizeAnnotations,
  normalizeOcrEngine,
  normalizeResearchNotes,
} = require("../server");

test("框选批注会清理文本、页码、坐标和颜色", () => {
  const result = normalizeAnnotations([
    {
      id: "ann-test",
      page: "3",
      x: -0.2,
      y: 0.25,
      width: 0.4,
      height: 0.3,
      color: "blue",
      text: "  这一段值得引用  ",
    },
    {
      page: 1,
      x: 0.1,
      y: 0.1,
      width: 0,
      height: 0,
      text: "无效的小框",
    },
  ]);

  assert.equal(result.length, 1);
  assert.equal(result[0].id, "ann-test");
  assert.equal(result[0].page, 3);
  assert.equal(result[0].x, 0);
  assert.equal(result[0].color, "blue");
  assert.equal(result[0].text, "这一段值得引用");
});

test("个人研究笔记与框选批注使用独立数据结构", () => {
  const result = normalizeResearchNotes([
    { id: "note-test", text: "  这是一条个人研究判断  " },
    { text: "   " },
  ]);

  assert.deepEqual(
    result.map(({ id, text }) => ({ id, text })),
    [{ id: "note-test", text: "这是一条个人研究判断" }]
  );
});

test("已经停用的 Codex OCR 设置自动回到本机 Umi-OCR", () => {
  assert.equal(normalizeOcrEngine("codex"), "umi");
});
