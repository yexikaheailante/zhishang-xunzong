"use strict";

const assert = require("assert");
const { parseFilename } = require("../filename-parser");

const cases = [
  {
    input:
      "【1941-11-18-《申报》0007版】招領迷途女孩 該女孩現在廣慈醫院.png",
    expected: {
      date: "1941-11-18",
      paper: "申报",
      edition: "0007版",
      title: "招領迷途女孩 該女孩現在廣慈醫院",
      author: "",
      status: "ready",
      style: "compound",
    },
  },
  {
    input:
      "【1935-10-2-《The China Press》0013版】Girls, Girls, Glorious Girls!.jpg",
    expected: {
      date: "1935-10-02",
      paper: "The China Press",
      edition: "0013版",
      title: "Girls, Girls, Glorious Girls!",
      author: "",
      status: "ready",
      style: "compound",
    },
  },
  {
    input: "【1935-4-17】【新华日报】五一的惊天一跃！【作者-鲁迅】.pdf",
    expected: {
      date: "1935-04-17",
      paper: "新华日报",
      edition: "",
      title: "五一的惊天一跃！",
      author: "鲁迅",
      status: "ready",
      style: "double",
    },
  },
  {
    input: "尚未整理的史料.png",
    expected: {
      date: "",
      paper: "",
      edition: "",
      title: "尚未整理的史料",
      author: "",
      status: "unparsed",
      style: "plain",
    },
  },
];

for (const item of cases) {
  const actual = parseFilename(item.input);
  for (const [key, value] of Object.entries(item.expected)) {
    assert.strictEqual(
      actual[key],
      value,
      `${item.input} 的 ${key} 解析结果不正确`
    );
  }
}

console.log(`文件名解析测试通过：${cases.length} 种格式`);
