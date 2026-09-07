"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
let vision = {};
try { vision = require("../vision-ocr"); } catch (error) { if (error.code !== "MODULE_NOT_FOUND") throw error; }
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a7WQAAAAASUVORK5CYII=", "base64");

test("vision request preserves selected image and uses protocol-specific image authentication", () => {
  assert.equal(typeof vision.buildVisionRequest, "function", "vision adapter not implemented");
  const profile = { endpoint: "https://example.com/v1/chat/completions", apiKey: "private-key", model: "vision-model", protocol: "chat-completions", script: "traditional" };
  const openai = vision.buildVisionRequest(profile, png);
  assert.equal(openai.headers.Authorization, "Bearer private-key");
  assert.equal(openai.body.messages[0].content[1].image_url.url, `data:image/png;base64,${png.toString("base64")}`);
  assert.equal(openai.body.model, "vision-model");
  assert.match(openai.body.messages[0].content[0].text, /繁體/);
  const claude = vision.buildVisionRequest({ ...profile, protocol: "anthropic-messages", script: "simplified" }, png);
  assert.equal(claude.headers["x-api-key"], "private-key");
  assert.equal(claude.headers.Authorization, undefined);
  assert.equal(claude.body.messages[0].content[1].source.data, png.toString("base64"));
  assert.equal(claude.body.messages[0].content[1].source.media_type, "image/png");
  assert.match(claude.body.messages[0].content[0].text, /简体/);
});

test("configuration never silently forwards a saved key to a changed endpoint", () => {
  assert.equal(typeof vision.mergeProfile, "function");
  const old = { ...vision.defaultProfiles().custom, endpoint: "https://a.example/v1/messages", apiKey: "private-key", model: "vision" };
  assert.throws(() => vision.mergeProfile(old, { endpoint: "https://b.example/v1/messages" }), /重新.*密钥/);
  assert.equal(vision.mergeProfile(old, { model: "new-model", apiKey: "" }).apiKey, "private-key");
  const summary = vision.profileSummary(old);
  assert.equal(summary.configured, true);
  assert.equal(JSON.stringify(summary).includes("private-key"), false);
  for (const endpoint of ["http://example.com/api", "https://user:pass@example.com/api", "https://example.com/api?key=secret"]) {
    assert.throws(() => vision.mergeProfile(old, { endpoint, apiKey: "new-key" }));
  }
});

test("real image transport returns text but rejects truncation, redirects and credential-echo errors", async (t) => {
  assert.equal(typeof vision.recognizeVision, "function");
  let mode = "ok";
  const received = [];
  const provider = http.createServer(async (req, res) => {
    const chunks = []; for await (const chunk of req) chunks.push(chunk);
    received.push({ path: req.url, auth: req.headers.authorization, claudeKey: req.headers["x-api-key"], body: JSON.parse(Buffer.concat(chunks)) });
    res.setHeader("Content-Type", "application/json");
    if (mode === "redirect") { res.writeHead(302, { Location: "/stolen" }); res.end(); }
    else if (mode === "error") { res.writeHead(401); res.end(JSON.stringify({ error: { message: "private-key invalid" } })); }
    else if (req.headers["x-api-key"]) res.end(JSON.stringify({ id: "msg_test", type: "message", role: "assistant", content: [{ type: "text", text: "史料原文" }], model: "vision", stop_reason: mode === "truncated" ? "max_tokens" : "end_turn", stop_sequence: null, usage: { input_tokens: 12, output_tokens: 4 } }));
    else res.end(JSON.stringify({ choices: [{ message: { content: "史料原文" }, finish_reason: mode === "truncated" ? "length" : "stop" }] }));
  });
  await new Promise(resolve => provider.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => provider.close(resolve)));
  const profile = { endpoint: `http://127.0.0.1:${provider.address().port}/v1/chat/completions`, apiKey: "private-key", model: "vision", protocol: "chat-completions", script: "traditional" };
  assert.equal(await vision.recognizeVision(profile, png), "史料原文");
  assert.equal(received[0].auth, "Bearer private-key");
  assert.equal(received[0].body.messages[0].content[1].image_url.url, `data:image/png;base64,${png.toString("base64")}`);
  assert.equal(await vision.recognizeVision({ ...profile, protocol: "anthropic-messages" }, png), "史料原文");
  assert.equal(received[1].claudeKey, "private-key");
  assert.equal(received[1].body.messages[0].content[1].source.data, png.toString("base64"));
  mode = "truncated";
  await assert.rejects(vision.recognizeVision(profile, png), /截断|截斷|完整/);
  await assert.rejects(vision.recognizeVision({ ...profile, protocol: "anthropic-messages" }, png), /截断|完整/);
  mode = "error";
  await assert.rejects(vision.recognizeVision(profile, png), error => !error.message.includes("private-key") && /401/.test(error.message));
  mode = "redirect";
  await assert.rejects(vision.recognizeVision(profile, png), /重定向/);
  assert.equal(received.length, 6, "failed calls must not retry or follow redirects");
});
