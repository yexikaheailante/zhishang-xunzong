"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const publicDir = path.join(__dirname, "..", "public");
const html = fs.readFileSync(path.join(publicDir, "index.html"), "utf8");
const app = fs.readFileSync(path.join(publicDir, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(publicDir, "styles.css"), "utf8");
const desktopDir = path.join(__dirname, "..", "desktop");
const desktopFloatingHtml = fs.readFileSync(
  path.join(desktopDir, "floating-reader.html"),
  "utf8"
);
const desktopPreload = fs.readFileSync(
  path.join(desktopDir, "preload.js"),
  "utf8"
);
const favoriteModal = html.slice(
  html.indexOf('id="favoriteWebsitesModal"'),
  html.indexOf('id="historyModal"')
);

test("初始界面不呈现无意义的零值计数", () => {
  assert.doesNotMatch(html, />\s*0\s*份\s*</);
  assert.doesNotMatch(html, />\s*0\s*\/\s*0\s*</);
  assert.doesNotMatch(html, /id="(?:source|paper|book)KindCount"/);
  assert.doesNotMatch(html, /id="notesViewCount"[^>]*>\s*0\s*</);
});

test("分类和项目导航不附带重复资料总数", () => {
  assert.doesNotMatch(app, /elements\.(?:source|paper|book)KindCount\.textContent/);
  const renderProjectList = app.slice(
    app.indexOf("function renderProjectList()"),
    app.indexOf("function renderReadingStatus()")
  );
  assert.doesNotMatch(renderProjectList, /<small>/);
});

test("常用网站只保留搜索、文件夹和网站列表", () => {
  assert.match(html, /id="favoriteWebsiteSearchInput"/);
  assert.match(html, /id="favoriteWebsiteFolders"/);
  assert.doesNotMatch(
    favoriteModal,
    /data-favorite-folder="(?:all|recent|uncategorized)"/
  );
  assert.doesNotMatch(favoriteModal, />\s*(?:全部网站|最近使用|未分类)\s*</);
  assert.match(app, /data-delete-favorite-category=/);
  assert.match(html, /id="showFavoriteWebsiteEditorButton"/);
  assert.match(html, /id="favoriteWebsiteEditor"[^>]*class="[^"]*hidden/);
  assert.doesNotMatch(html, />管理分类</);
});

test("网站文件夹使用纯文字行和直接的关闭式删除按钮", () => {
  const categoryRenderer = app.slice(
    app.indexOf("function renderFavoriteWebsiteCategories()"),
    app.indexOf("async function addFavoriteWebsiteCategory()")
  );
  assert.doesNotMatch(categoryRenderer, /aria-hidden="true">□<\/span>/);
  assert.match(
    categoryRenderer,
    /class="favorite-folder-delete"[\s\S]*?data-delete-favorite-category=[\s\S]*?aria-label="删除文件夹[\s\S]*?>×<\/button>/
  );
  assert.doesNotMatch(categoryRenderer, /<details class="favorite-folder-menu">/);
  assert.match(categoryRenderer, /confirmAction\([\s\S]*?确定删除文件夹/);
  assert.doesNotMatch(styles, /\.favorite-category-row button\s*\{/);
  assert.match(
    styles,
    /\.favorite-category-list\s*\{[^}]*display:\s*flex;[^}]*overflow-x:\s*auto/s
  );
  assert.match(
    styles,
    /\.favorite-category-row\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+28px/s
  );
});

test("常用网站使用横向文件夹栏和独立网站内容区", () => {
  assert.match(
    styles,
    /\.favorite-bookmark-layout\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column/s
  );
  assert.match(
    styles,
    /\.favorite-website-folders\s*\{[^}]*grid-template-areas:\s*"heading folders"\s*"manager manager"/s
  );
  assert.doesNotMatch(styles, /grid-template-columns:\s*210px\s+minmax/);
  assert.doesNotMatch(styles, /grid-template-columns:\s*150px\s+minmax/);
  assert.doesNotMatch(app, /暂无自定义文件夹/);
  assert.match(
    app,
    /favoriteWebsiteCategoryFilter === button\.dataset\.favoriteFolder\s*\? ""\s*:\s*button\.dataset\.favoriteFolder/s
  );
});

test("常用网站以紧凑卡片网格排列", () => {
  const websiteRenderer = app.slice(
    app.indexOf("function renderFavoriteWebsites()"),
    app.indexOf("function openFavoriteWebsites(")
  );
  assert.match(
    styles,
    /\.favorite-websites-list\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*repeat\(auto-fill,\s*minmax\(220px,\s*260px\)\)/s
  );
  assert.match(
    styles,
    /\.favorite-website-row\s*\{[^}]*min-height:\s*88px;[^}]*border:\s*1px\s+solid\s+var\(--line\);[^}]*border-radius:\s*12px/s
  );
  assert.doesNotMatch(
    styles,
    /\.favorite-website-row\s*\{[^}]*border-bottom:/s
  );
  assert.doesNotMatch(websiteRenderer, /favorite-website-open-mark/);
});

test("网站卡片操作在卡片内展开而不被列表边界裁切", () => {
  assert.match(
    styles,
    /\.favorite-website-row \.favorite-website-menu\[open\]\s*\{[^}]*display:\s*contents/s
  );
  assert.match(
    styles,
    /\.favorite-website-row \.favorite-website-menu > div\s*\{[^}]*position:\s*static;[^}]*grid-column:\s*1\s*\/\s*-1;[^}]*box-shadow:\s*none/s
  );
});

test("网站文件夹支持双击原地改名", () => {
  const renameFlow = app.slice(
    app.indexOf("function beginFavoriteWebsiteCategoryRename("),
    app.indexOf("function renderFavoriteWebsiteCategories()")
  );
  const categoryRenderer = app.slice(
    app.indexOf("function renderFavoriteWebsiteCategories()"),
    app.indexOf("async function addFavoriteWebsiteCategory()")
  );
  assert.match(categoryRenderer, /addEventListener\("dblclick"/);
  assert.match(categoryRenderer, /beginFavoriteWebsiteCategoryRename/);
  assert.match(app, /className = "favorite-folder-rename-input"/);
  assert.match(
    app,
    /action: "update",[\s\S]*?categoryId:[\s\S]*?name,/
  );
  assert.match(app, /event\.key === "Enter"/);
  assert.match(app, /event\.key === "Escape"/);
  assert.match(
    renameFlow,
    /event\.key === "Escape"[\s\S]*?event\.stopPropagation\(\)/
  );
  assert.match(styles, /\.favorite-folder-rename-input\s*\{/);
});

test("导入保留文件、文件夹和拖放能力但不增加说明区块", () => {
  assert.match(html, /id="globalImportDropOverlay"/);
  assert.match(html, /id="chooseImportSourceFilesButton"/);
  assert.match(html, /id="chooseImportSourceFolderButton"/);
  assert.doesNotMatch(html, /<details[^>]*class="folder-import-advanced"/);
  assert.doesNotMatch(html, /也可以把文件或文件夹直接拖到窗口中/);
  assert.doesNotMatch(html, />\s*高级设置\s*</);
  assert.doesNotMatch(html, /id="folderImportConsent"/);
  assert.match(html, /id="commitFolderImportButton"[^>]*>\s*导入\s*</);
});

test("资料搜索范围按钮不显示数量角标", () => {
  assert.doesNotMatch(html, /id="searchScopeBadge"/);
  assert.doesNotMatch(app, /elements\.searchScopeBadge/);
});

test("OCR 引擎不再呈现 Codex 云端入口", () => {
  assert.doesNotMatch(html, /<option value="codex">/);
  assert.doesNotMatch(html, /data-cloud-settings="codex"/);
  assert.doesNotMatch(html, /id="codexConfiguredStatus"/);
  assert.doesNotMatch(app, /appState\.ocrEngine === "codex"/);
});

test("悬浮阅读正文可编辑且不增加保存按钮", () => {
  const floatingReader = html.slice(
    html.indexOf('id="floatingReader"'),
    html.indexOf('id="annotationFloatingEditor"')
  );
  assert.match(
    floatingReader,
    /id="floatingReaderText"[^>]*contenteditable="plaintext-only"/
  );
  assert.doesNotMatch(floatingReader, /保存/);
});

test("工作台悬浮修改会自动同步，置顶窗也可回传修改", () => {
  assert.match(app, /floatingReaderText\.addEventListener\("input"/);
  assert.match(app, /flushFloatingReaderEdit/);
  assert.match(
    desktopFloatingHtml,
    /id="text"[^>]*contenteditable="plaintext-only"/
  );
  assert.match(desktopPreload, /updateFloatingReaderText/);
  assert.match(desktopPreload, /onFloatingReaderEdit/);
});
