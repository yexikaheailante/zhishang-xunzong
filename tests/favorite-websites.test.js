"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const rules = require("../public/workbench-ui-rules");
const { normalizeFavoriteWebsites } = require("../server");

const websites = [
  {
    id: "one",
    name: "国家图书馆",
    url: "https://www.nlc.cn/",
    categoryId: "library",
    lastOpenedAt: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "two",
    name: "近代报刊数据库",
    url: "https://example.test/newspaper",
    categoryId: "database",
    lastOpenedAt: "2026-08-22T10:00:00.000Z",
  },
  {
    id: "three",
    name: "档案检索",
    url: "https://archive.test/",
    categoryId: "",
    lastOpenedAt: "",
  },
];

test("收藏夹默认显示全部网站，并可按文件夹筛选", () => {
  assert.deepEqual(
    rules.filterFavoriteWebsites(websites, "", "").map((item) => item.id),
    ["one", "two", "three"]
  );
  assert.deepEqual(
    rules.filterFavoriteWebsites(websites, "library", "").map((item) => item.id),
    ["one"]
  );
});

test("收藏夹可搜索名称或域名", () => {
  assert.deepEqual(
    rules.filterFavoriteWebsites(websites, "", "archive.test").map((item) => item.id),
    ["three"]
  );
});

test("旧收藏夹数据规范化时保留最近打开时间", () => {
  const result = normalizeFavoriteWebsites([websites[0]]);
  assert.equal(result[0].lastOpenedAt, websites[0].lastOpenedAt);
});
