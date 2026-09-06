"use strict";

const path = require("path");

const UNKNOWN_DATE_PART = "未知";
const UNKNOWN_DATE_ALIASES = new Set([UNKNOWN_DATE_PART, "不详"]);

function normalizeDatePart(value, width) {
  const text = String(value || "").trim();
  if (UNKNOWN_DATE_ALIASES.has(text)) return UNKNOWN_DATE_PART;
  return String(Number(text)).padStart(width, "0");
}

function normalizeDate(value) {
  const match = String(value || "").match(
    /^(\d{4}|未知|不详)-(\d{1,2}|未知|不详)-(\d{1,2}|未知|不详)$/u
  );
  if (!match) return "";
  const yearUnknown = UNKNOWN_DATE_ALIASES.has(match[1]);
  const monthUnknown = UNKNOWN_DATE_ALIASES.has(match[2]);
  const dayUnknown = UNKNOWN_DATE_ALIASES.has(match[3]);
  const year = yearUnknown ? null : Number(match[1]);
  const month = monthUnknown ? null : Number(match[2]);
  const day = dayUnknown ? null : Number(match[3]);
  const currentYear = new Date().getFullYear();
  if (!yearUnknown && (year < 1800 || year > currentYear)) return "";
  if (!monthUnknown && (month < 1 || month > 12)) return "";
  if (!dayUnknown) {
    if (day < 1 || day > 31) return "";
    if (!yearUnknown && !monthUnknown) {
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return "";
      }
    }
  }
  return `${normalizeDatePart(match[1], 4)}-${normalizeDatePart(
    match[2],
    2
  )}-${normalizeDatePart(match[3], 2)}`;
}

function clean(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function splitAuthor(value) {
  let title = clean(value);
  let author = "";
  const match = title.match(/【作者\s*[-—:：]\s*([^】]+)】$/u);
  if (match) {
    author = clean(match[1]);
    title = clean(title.slice(0, -match[0].length));
  }
  return { title, author };
}

function splitPaperAndEdition(value) {
  const text = clean(value);
  const books = text.match(/^《(.+?)》\s*(.*?)$/u);
  if (!books) return { paper: text, edition: "" };
  return {
    paper: clean(books[1]),
    edition: clean(books[2]),
  };
}

function parseFilename(fileName) {
  const parsedPath = path.parse(String(fileName || ""));
  const stem = parsedPath.name;
  let date = "";
  let paper = "";
  let edition = "";
  let remaining = stem;
  let rule = "none";
  let style = "plain";

  const compound = stem.match(
    /^【((?:\d{4}|未知|不详)-(?:\d{1,2}|未知|不详)-(?:\d{1,2}|未知|不详))-《(.+?)》([^】]*)】(.*)$/u
  );
  if (compound) {
    date = normalizeDate(compound[1]);
    paper = clean(compound[2]);
    edition = clean(compound[3]);
    remaining = compound[4];
    rule = "compound-bracket-v1";
    style = "compound";
  } else {
    const doubleBracket = stem.match(
      /^【((?:\d{4}|未知|不详)-(?:\d{1,2}|未知|不详)-(?:\d{1,2}|未知|不详))】【([^】]+)】(.*)$/u
    );
    if (doubleBracket) {
      date = normalizeDate(doubleBracket[1]);
      const second = splitPaperAndEdition(doubleBracket[2]);
      paper = second.paper;
      edition = second.edition;
      remaining = doubleBracket[3];
      rule = "double-bracket-v1";
      style = "double";
    }
  }

  const trailing = splitAuthor(remaining);
  const title = trailing.title;
  const author = trailing.author;
  const hasPrefix = rule !== "none";
  const complete = Boolean(date && paper && title);
  const status = complete ? "ready" : hasPrefix ? "needs-review" : "unparsed";
  const confidence = complete ? "high" : hasPrefix ? "medium" : "none";

  return {
    date,
    paper,
    edition,
    title: title || clean(stem),
    author,
    status,
    confidence,
    rule,
    style,
    originalStem: stem,
  };
}

module.exports = {
  normalizeDate,
  parseFilename,
};
