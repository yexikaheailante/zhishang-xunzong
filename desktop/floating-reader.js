"use strict";

const title = document.querySelector("#title");
const text = document.querySelector("#text");
const fontSizeOutput = document.querySelector("#fontSize");
const fontDown = document.querySelector("#fontDown");
const fontUp = document.querySelector("#fontUp");
let fontSize = 16;
let readerId = "";
let editable = false;
let editHistory = FloatingReaderHistory.createHistory();

function applyFontSize(nextSize) {
  fontSize = Math.min(32, Math.max(12, Number(nextSize) || 16));
  text.style.fontSize = `${fontSize}px`;
  fontSizeOutput.textContent = `${fontSize}px`;
  fontDown.disabled = fontSize <= 12;
  fontUp.disabled = fontSize >= 32;
}

window.historicalWorkbenchDesktop?.onFloatingReaderData((payload = {}) => {
  const nextTitle = String(payload.title || "悬浮阅读");
  document.title = nextTitle;
  title.textContent = nextTitle;
  editHistory = FloatingReaderHistory.createHistory(payload.text);
  text.textContent = editHistory.text;
  readerId = String(payload.readerId || "");
  editable = Boolean(payload.editable && readerId);
  text.contentEditable = editable ? "plaintext-only" : "false";
  text.setAttribute("aria-readonly", String(!editable));
  applyFontSize(payload.fontSize);
});

text.addEventListener("input", () => {
  if (!editable) return;
  if (!FloatingReaderHistory.recordText(editHistory, text.innerText)) return;
  window.historicalWorkbenchDesktop?.updateFloatingReaderText({
    readerId,
    text: editHistory.text,
  });
});

text.addEventListener("keydown", (event) => {
  if (!editable || !FloatingReaderHistory.isUndoShortcut(event)) return;
  event.preventDefault();
  const restoredText = FloatingReaderHistory.undoText(editHistory);
  if (restoredText === null) return;
  text.textContent = restoredText;
  text.focus();
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(text);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  window.historicalWorkbenchDesktop?.updateFloatingReaderText({
    readerId,
    text: restoredText,
  });
});

fontDown.addEventListener("click", () => applyFontSize(fontSize - 1));
fontUp.addEventListener("click", () => applyFontSize(fontSize + 1));
