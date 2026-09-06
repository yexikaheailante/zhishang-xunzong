(function attachFloatingReaderHistory(root, factory) {
  const rules = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = rules;
  } else {
    root.FloatingReaderHistory = rules;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createRules() {
  "use strict";

  function createHistory(text = "") {
    return {
      text: String(text || ""),
      undoStack: [],
    };
  }

  function recordText(state, value) {
    if (!state) return false;
    const nextText = String(value || "");
    if (nextText === state.text) return false;
    state.undoStack.push(state.text);
    if (state.undoStack.length > 100) state.undoStack.shift();
    state.text = nextText;
    return true;
  }

  function undoText(state) {
    if (!state?.undoStack?.length) return null;
    state.text = state.undoStack.pop();
    return state.text;
  }

  function isUndoShortcut(event = {}) {
    return Boolean(
      event.ctrlKey &&
      !event.altKey &&
      !event.shiftKey &&
      String(event.key || "").toLocaleLowerCase() === "z"
    );
  }

  return {
    createHistory,
    isUndoShortcut,
    recordText,
    undoText,
  };
});
