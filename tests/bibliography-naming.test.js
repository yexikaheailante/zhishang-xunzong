"use strict";

const assert = require("assert");
const { buildTargetName } = require("../server");

const source = buildTargetName(
  {
    kind: "source",
    year: "1935",
    month: "2",
    day: "3",
    paper: "美丽",
    editionNumber: "18",
    editionUnit: "版",
    title: "你好",
    author: "",
  },
  "测试.jpg"
);
assert.strictEqual(
  source.targetName,
  "【1935-02-03-《美丽》18版】你好.jpg"
);

const journal = buildTargetName(
  {
    kind: "paper",
    paperType: "journal",
    paperAuthor: "李瑾",
    paperTitle: "女子学堂与辛亥革命——以上海宗孟女学堂为例",
    journal: "史林",
    paperYear: "2007",
    paperMonth: "",
    paperDay: "",
    issueNumber: "6",
    issueUnit: "期",
  },
  "测试.jpg"
);
assert.strictEqual(
  journal.targetName,
  "李瑾：《女子学堂与辛亥革命——以上海宗孟女学堂为例》，《史林》，2007年第6期。.jpg"
);

const thesis = buildTargetName(
  {
    kind: "paper",
    paperType: "thesis",
    paperAuthor: "杨洁",
    paperTitle: "民国时期上海女子教育研究",
    degree: "博士学位论文",
    institution: "华东师范大学教育学系",
    paperYear: "2000",
    paperMonth: "",
    paperDay: "",
  },
  "测试.pdf"
);
assert.strictEqual(
  thesis.targetName,
  "杨洁：《民国时期上海女子教育研究》，博士学位论文，华东师范大学教育学系，2000年。.pdf"
);

const book = buildTargetName(
  {
    kind: "book",
    bookAuthor: "汤涛主编",
    bookTitle: "王伯群与大夏大学",
    bookPlace: "上海",
    bookPublisher: "上海人民出版社",
    bookYear: "2015",
    bookMonth: "8",
    bookDay: "",
  },
  "测试.png"
);
assert.strictEqual(
  book.targetName,
  "汤涛主编：《王伯群与大夏大学》，上海：上海人民出版社，2015年8月.png"
);
assert.strictEqual(book.date, "2015-08");

console.log("三类资料命名测试通过：史料、期刊论文、学位论文、专著");
