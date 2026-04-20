const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "source", "Untitled.cs");
const OUTPUT_FILE = path.join(__dirname, "public", "variables.json");

const css = fs.readFileSync(INPUT_FILE, "utf8");
const lines = css.split(/\r?\n/);

// ---------- helpers ----------
function cleanValue(v) {
  return v.replace(/\s*!important\s*$/i, "").trim();
}

function getMode(selector) {
  const s = (selector || "").toLowerCase();

  if (s.includes("night-mode")) return "night_mode";
  if (s.includes("[data-theme-variant=dark]") || s.includes("data-theme-variant='dark'")) return "dark_mode";
  if (s.includes("[data-theme-variant=light]")) return "light_mode";
  if (s.includes("[data-theme-variant=system_default]")) return "system_default";

  return "base";
}

function getCategory(varName) {
  const n = varName.toLowerCase();

  if (n.startsWith("--theme-")) return "theme_colors";

  if (
    n.includes("font") || n.includes("text") || n.includes("label") ||
    n.includes("desc") || n.includes("icon")
  ) return "typography_and_icons";

  if (
    n.includes("bg") || n.includes("background") || n.includes("fill") ||
    n.includes("overlay")
  ) return "backgrounds";

  if (
    n.includes("border") || n.includes("stroke") || n.includes("separator") ||
    n.includes("outline")
  ) return "borders_and_strokes";

  if (n.includes("navbar") || n.includes("topbar") || n.includes("nav")) return "navigation";
  if (n.includes("button") || n.includes("btn")) return "buttons";
  if (n.includes("link") || n.includes("hover")) return "links_and_hover";
  if (n.includes("dialog") || n.includes("popup") || n.includes("modal")) return "dialogs_and_popups";
  if (n.includes("chart")) return "charts";
  if (n.includes("dashboard")) return "dashboard";
  if (n.includes("zia")) return "zia";
  if (n.includes("feedback")) return "feedback";

  return "other";
}

function isColorLike(value, varName) {
  const v = value.trim().toLowerCase();
  const n = varName.toLowerCase();

  // direct color values
  if (/#[0-9a-f]{3,8}\b/i.test(v)) return true;
  if (/^(rgb|rgba|hsl|hsla)\(/i.test(v)) return true;
  if (v.includes("gradient(")) return true;
  if (v === "transparent") return true;

  // named colors seen in file (e.g. aliceblue, white, black)
  if (/^[a-z]+$/i.test(v)) {
    const named = new Set([
      "white", "black", "red", "green", "blue", "orange", "yellow", "purple",
      "brown", "gray", "grey", "aliceblue", "transparent"
    ]);
    if (named.has(v)) return true;
  }

  // var(--x) can still represent a color
  if (/^var\(\s*--[a-z0-9_-]+\s*\)$/i.test(v)) return true;

  // fallback by variable name
  if (
    n.includes("color") || n.includes("bg") || n.includes("background") ||
    n.includes("border") || n.includes("stroke") || n.includes("icon") ||
    n.includes("hover") || n.includes("font") || n.includes("text")
  ) return true;

  return false;
}

function ensure(obj, keys) {
  let cur = obj;
  for (const k of keys) {
    if (!cur[k]) cur[k] = {};
    cur = cur[k];
  }
  return cur;
}

// ---------- parse ----------
const result = {
  source: "Untitled.cs",
  generated_at: new Date().toISOString(),
  ui: {
    tab_order: ["base", "light_mode", "dark_mode", "night_mode"],
    tab_labels: {
      base: "Base",
      light_mode: "Light",
      dark_mode: "Dark",
      night_mode: "Night"
    }
  },
  modes: {}
};

// stack to track current selector blocks
const selectorStack = [];

// keep last seen value for var resolution
const latestByName = {};

// keep list of raw entries
const entries = [];

for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const lineNo = i + 1;
  const line = raw.trim();

  // open block
  if (line.includes("{")) {
    const before = line.split("{")[0].trim();
    if (before) {
      let selector = before;

      // resolve SCSS-like "&"
      if (selector.startsWith("&")) {
        const parent = selectorStack.length ? selectorStack[selectorStack.length - 1] : "";
        selector = selector.replace(/&/g, parent);
      }

      selectorStack.push(selector);
    } else {
      selectorStack.push(selectorStack.length ? selectorStack[selectorStack.length - 1] : "global");
    }
  }

  // variable line
  const m = line.match(/--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/);
  if (m) {
    const name = `--${m[1]}`;
    const value = cleanValue(m[2]);
    const selector = selectorStack.length ? selectorStack[selectorStack.length - 1] : "global";

    entries.push({
      name,
      raw_value: value,
      selector,
      line: lineNo
    });

    latestByName[name] = value;
  }

  // close block(s)
  if (line.includes("}")) {
    const count = (line.match(/}/g) || []).length;
    for (let c = 0; c < count; c++) selectorStack.pop();
  }
}

// resolve simple var(--x)
function resolveSimpleVar(v, depth = 0) {
  if (depth > 8) return v;

  const t = (v || "").trim();
  const mm = t.match(/^var\(\s*(--[a-zA-Z0-9_-]+)\s*\)$/);
  if (!mm) return t;

  const ref = mm[1];
  const next = latestByName[ref];
  if (!next) return t;

  return resolveSimpleVar(cleanValue(next), depth + 1);
}

// build output with dedupe
const seen = new Set();

for (const e of entries) {
  const resolved = resolveSimpleVar(e.raw_value);

  if (!isColorLike(resolved, e.name)) continue;

  const mode = getMode(e.selector);
  const category = getCategory(e.name);
  const key = `${mode}|${category}|${e.name}|${resolved}|${e.selector}`;

  if (seen.has(key)) continue;
  seen.add(key);

  const bucket = ensure(result, ["modes", mode, "categories", category]);
  if (!bucket.variables) bucket.variables = [];

  bucket.variables.push({
    name: e.name,
    value: resolved,
    original_value: e.raw_value,
    selector: e.selector,
    line: e.line
  });
}

// sort for readability
for (const mode of Object.keys(result.modes)) {
  const cats = result.modes[mode].categories;
  for (const cat of Object.keys(cats)) {
    cats[cat].variables.sort((a, b) => {
      if (a.name !== b.name) return a.name.localeCompare(b.name);
      return a.value.localeCompare(b.value);
    });
  }
}

// write file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), "utf8");
console.log("Created:", OUTPUT_FILE);