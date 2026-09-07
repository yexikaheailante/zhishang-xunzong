const test = require("node:test");
const assert = require("node:assert/strict");
const { baiduAuthError } = require("../server");
test("Baidu invalid_client explains which credentials to check without echoing response secrets", () => {
  assert.equal(typeof baiduAuthError, "function");
  const message = baiduAuthError('{"error":"invalid_client","error_description":"Client authentication failed","extra":"private-secret"}');
  assert.match(message, /Secret Key/);
  assert.equal(message.includes("private-secret"), false);
  assert.match(baiduAuthError('{"error_description":"unknown client id"}'), /API Key/);
});
