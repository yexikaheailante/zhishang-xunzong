(function attachWorkbenchUiRules(root, factory) {
  const rules = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = rules;
  } else {
    root.WorkbenchUiRules = rules;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createRules() {
  "use strict";

  function optionalCount(count, formatter = (value) => String(value)) {
    const value = Number(count);
    if (!Number.isFinite(value) || value <= 0) return "";
    return formatter(value);
  }

  function progressText(index, total) {
    const currentIndex = Number(index);
    const totalCount = Number(total);
    if (
      !Number.isInteger(currentIndex) ||
      !Number.isInteger(totalCount) ||
      currentIndex < 0 ||
      totalCount <= 0 ||
      currentIndex >= totalCount
    ) {
      return "";
    }
    return `${currentIndex + 1} / ${totalCount}`;
  }

  function favoriteWebsiteSearchText(website) {
    let hostname = "";
    try {
      hostname = new URL(website?.url || "").hostname;
    } catch {
      hostname = String(website?.url || "");
    }
    return `${website?.name || ""} ${hostname} ${website?.url || ""}`.toLocaleLowerCase();
  }

  function filterFavoriteWebsites(websites, categoryId = "all", query = "") {
    const normalizedQuery = String(query || "").trim().toLocaleLowerCase();
    const filtered = (Array.isArray(websites) ? websites : []).filter((website) => {
      if (
        normalizedQuery &&
        !favoriteWebsiteSearchText(website).includes(normalizedQuery)
      ) {
        return false;
      }
      if (categoryId === "recent") return Boolean(website?.lastOpenedAt);
      if (categoryId === "uncategorized") return !website?.categoryId;
      if (!categoryId || categoryId === "all") return true;
      return website?.categoryId === categoryId;
    });
    if (categoryId === "recent") {
      return filtered.sort(
        (left, right) =>
          Date.parse(right.lastOpenedAt || 0) - Date.parse(left.lastOpenedAt || 0)
      );
    }
    return filtered;
  }

  function collectDropPaths(files, resolver) {
    const paths = [];
    const seen = new Set();
    for (const file of Array.from(files || [])) {
      try {
        const resolved = String(resolver(file) || "").trim();
        const key = resolved.toLocaleLowerCase();
        if (!resolved || seen.has(key)) continue;
        seen.add(key);
        paths.push(resolved);
      } catch {}
    }
    return paths;
  }

  function createFloatingReaderEditState(options = {}) {
    return {
      text: String(options.text || ""),
      editable: Boolean(options.editable && typeof options.saveText === "function"),
      saveText: typeof options.saveText === "function" ? options.saveText : null,
      undoStack: [],
      dirty: false,
      saving: false,
      queued: false,
    };
  }

  function updateFloatingReaderEditText(state, value) {
    if (!state?.editable) return false;
    const nextText = String(value || "");
    if (nextText === state.text) return false;
    state.undoStack.push(state.text);
    if (state.undoStack.length > 100) state.undoStack.shift();
    state.text = nextText;
    state.dirty = true;
    if (state.saving) state.queued = true;
    return true;
  }

  function undoFloatingReaderEditText(state) {
    if (!state?.editable || !state.undoStack.length) return false;
    state.text = state.undoStack.pop();
    state.dirty = true;
    if (state.saving) state.queued = true;
    return true;
  }

  function isFloatingReaderUndoShortcut(event = {}) {
    return Boolean(
      event.ctrlKey &&
      !event.altKey &&
      !event.shiftKey &&
      String(event.key || "").toLocaleLowerCase() === "z"
    );
  }

  async function flushFloatingReaderEdit(state) {
    if (!state?.editable || !state.dirty) return false;
    if (state.saving) {
      state.queued = true;
      return false;
    }
    const text = String(state.text || "").trim();
    if (!text) throw new Error("悬浮文本不能为空");
    state.dirty = false;
    state.saving = true;
    try {
      const saved = await state.saveText(text);
      if (saved === false) throw new Error("悬浮文本保存未完成");
    } catch (error) {
      state.dirty = true;
      throw error;
    } finally {
      state.saving = false;
    }
    if (state.queued) {
      state.queued = false;
      if (state.dirty) await flushFloatingReaderEdit(state);
    }
    return true;
  }

  return {
    createFloatingReaderEditState,
    flushFloatingReaderEdit,
    isFloatingReaderUndoShortcut,
    optionalCount,
    progressText,
    filterFavoriteWebsites,
    collectDropPaths,
    undoFloatingReaderEditText,
    updateFloatingReaderEditText,
  };
});
