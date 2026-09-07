"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const http = require("node:http");

test("cloud settings persist new providers without exposing secrets or claiming saved credentials are authenticated", async t => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "ocr-settings-test-"));
  process.env.LOCALAPPDATA = temp;
  process.env.HISTORICAL_WORKBENCH_DESKTOP = "1";
  const { server, normalizeOcrEngine } = require("../server");
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); fs.rmSync(temp, { recursive: true, force: true }); });
  const base = `http://127.0.0.1:${server.address().port}`;
  const update = async body => {
    const res = await fetch(`${base}/api/ocr-settings`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    assert.equal(res.ok, true); return res.json();
  };
  await update({ baidu: { apiKey: "test-api", secretKey: "test-secret" } });
  const status = await (await fetch(`${base}/api/ocr-service-status?engine=baidu`)).json();
  assert.equal(status.configured, true);
  assert.equal(status.running, false, "saved credentials are not proof of a successful connection");
  for (const engine of ["qwen", "claude", "custom"]) {
    assert.equal(normalizeOcrEngine(engine), engine);
    const response = await update({ [engine]: { apiKey: "secret-vision", endpoint: "https://example.com/v1/messages", model: "test-vision", script: "traditional", protocol: engine === "claude" ? "anthropic-messages" : "chat-completions" } });
    assert.equal(JSON.stringify(response).includes("secret-vision"), false);
    const saved = JSON.parse(fs.readFileSync(path.join(temp, "HistoricalWorkbench", "cloud-ocr-settings.json"), "utf8"));
    assert.equal(saved[engine].apiKey, "secret-vision");
    const state = await (await fetch(`${base}/api/ocr-service-status?engine=${engine}`)).json();
    assert.equal(state.engine, engine);
    assert.equal(state.configured, true);
    assert.equal(state.running, false);
    await update({ action: "clear", engine });
    const cleared = await (await fetch(`${base}/api/ocr-service-status?engine=${engine}`)).json();
    assert.equal(cleared.configured, false);
  }
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a7WQAAAAASUVORK5CYII=", "base64");
  let calls = 0;
  const provider = http.createServer(async (req, res) => {
    const chunks = []; for await (const chunk of req) chunks.push(chunk);
    const body = JSON.parse(Buffer.concat(chunks));
    assert.equal(body.messages[0].content[1].image_url.url, `data:image/png;base64,${png.toString("base64")}`);
    calls++;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ choices: [{ message: { content: "框選原文" }, finish_reason: "stop" }] }));
  });
  await new Promise(resolve => provider.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => provider.close(resolve)));
  const post = async (route, body) => {
    const res = await fetch(`${base}${route}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json(); assert.equal(res.ok, true, data.error); return data;
  };
  const library = path.join(temp, "library"); fs.mkdirSync(library);
  const source = path.join(temp, "sample.png"); fs.writeFileSync(source, png);
  await post("/api/choose-library", { folderPath: library });
  await post("/api/initialize-library", {});
  await post("/api/create-project", { name: "样本" });
  const scan = await post("/api/folder-import-scan", { targetProject: "样本", sourcePaths: [source] });
  const imported = await post("/api/folder-import-commit", { token: scan.token, itemIds: scan.items.map(item => item.id), targetProject: "样本", consent: true, conflictPolicy: "skip" });
  const record = imported.files[0];
  await update({ custom: { apiKey: "fixture-key", endpoint: `http://127.0.0.1:${provider.address().port}/v1/chat/completions`, model: "fixture-vision" } });
  const params = new URLSearchParams({ engine: "custom", recordId: record.id, relativePath: record.relativePath, page: "1", mode: "region", x: "0.1", y: "0.2", width: "0.3", height: "0.4", pixelFormat: "encoded" });
  const refused = await fetch(`${base}/api/ocr-region-preview?${params}`, { method: "POST", body: png });
  assert.equal(refused.status, 400);
  assert.equal(calls, 0, "missing upload consent must not send an image");
  params.set("cloudConsent", "true");
  for (const mode of ["region", "full-page"]) {
    params.set("mode", mode);
    const res = await fetch(`${base}/api/ocr-region-preview?${params}`, { method: "POST", body: png });
    const result = await res.json(); assert.equal(res.ok, true, result.error);
    assert.equal(result.pendingResult.rawText, "框選原文");
    assert.equal(result.pendingResult.engine, "自定义 API OCR");
    assert.equal(result.pendingResult.width, mode === "region" ? 0.3 : 1);
    const saved = await post("/api/ocr-region-save", { ...result.pendingResult, recordId: record.id, relativePath: record.relativePath });
    const entries = saved.files[0].ocrRegions;
    assert.equal(entries.at(-1).engine, "自定义 API OCR");
    assert.equal(entries.at(-1).rawText, "框選原文");
  }
  assert.equal(calls, 2);
});
