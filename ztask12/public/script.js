const VARIABLES_JSON_FILE = "./variables.json";

let colorVariables = [];
let activeMode = "base";
const categoryDropdown = document.getElementById("categoryDropdown");
const categoryBtn = document.getElementById("categoryBtn");
const categoryMenu = document.getElementById("categoryMenu");

let selectedCategory = "__all__";

const tbody = document.getElementById("colorsBody");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const clearBtn = document.getElementById("clearBtn");
const toast = document.getElementById("toast");
const activeScope = document.getElementById("activeScope");
let colorPopoverEl = null;

function getSelectedCategory() {
  return selectedCategory === "__all__" ? null : selectedCategory;
}
function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add("show");

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(function () {
    toast.classList.remove("show");
    toast.hidden = true;
  }, 900);
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      function () {
        showToast("Copied!");
      },
      function () {
        fallbackCopy(text);
      }
    );
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const t = document.createElement("textarea");
  t.value = text;
  t.style.position = "fixed";
  t.style.left = "-9999px";
  document.body.appendChild(t);
  t.select();
  document.execCommand("copy");
  document.body.removeChild(t);
  showToast("Copied!");
}

function firstHex(value) {
  const m = (value || "").match(/#[0-9a-fA-F]{3,8}\b/);
  return m ? m[0] : null;
}

function prettyText(value) {
  return value
    .split("_")
    .map(function (x) {
      return x.charAt(0).toUpperCase() + x.slice(1);
    })
    .join(" ");
}

function flattenVariablesJson(data) {
  const rows = [];
  if (!data || !data.modes) return rows;

  const modeKeys = Object.keys(data.modes);
  // Deduplicate within a mode by (name + value). The same variable is often
  // declared in multiple selectors with identical values; showing all of them
  // makes the Base tab noisy.
  const seenByModeNameValue = new Set();

  for (let i = 0; i < modeKeys.length; i++) {
    const modeKey = modeKeys[i];
    const modeObj = data.modes[modeKey];
    if (!modeObj || !modeObj.categories) continue;

    const categoryKeys = Object.keys(modeObj.categories);

    for (let j = 0; j < categoryKeys.length; j++) {
      const categoryKey = categoryKeys[j];
      const categoryObj = modeObj.categories[categoryKey];
      if (!categoryObj || !Array.isArray(categoryObj.variables)) continue;

      const vars = categoryObj.variables;

      for (let k = 0; k < vars.length; k++) {
        const v = vars[k];
        const name = v.name || "";
        const value = v.value || "";

        const dedupeKey = modeKey + "|" + name + "|" + value;
        if (seenByModeNameValue.has(dedupeKey)) continue;
        seenByModeNameValue.add(dedupeKey);

        rows.push({
          mode: modeKey,
          category: categoryKey,
          categoryLabel: prettyText(modeKey) + " / " + prettyText(categoryKey),
          name,
          value,
          selector: v.selector || ""
        });
      }
    }
  }

  return rows;
}

function rebuildCategoryOptions() {
  const categoriesSet = {};

  for (let i = 0; i < colorVariables.length; i++) {
    const item = colorVariables[i];
    if (item.mode !== activeMode) continue;
    categoriesSet[item.category] = true;
  }

  const categories = Object.keys(categoriesSet).sort();

  categoryMenu.innerHTML = "";

  const allItem = document.createElement("li");
  allItem.className = "dropdownItem" + (selectedCategory === "__all__" ? " active" : "");
  allItem.textContent = "All categories";
  allItem.dataset.value = "__all__";
  categoryMenu.appendChild(allItem);

  for (let i = 0; i < categories.length; i++) {
    const value = categories[i];
    const li = document.createElement("li");
    li.className = "dropdownItem" + (selectedCategory === value ? " active" : "");
    li.textContent = prettyText(value);
    li.dataset.value = value;
    categoryMenu.appendChild(li);
  }

  // update button label
  if (selectedCategory === "__all__") {
    categoryBtn.firstChild.nodeValue = "All categories ";
  } else {
    categoryBtn.firstChild.nodeValue = prettyText(selectedCategory) + " ";
  }
}

function updateScopeText() {
  if (!activeScope) return;

  const modeLabel = prettyText(activeMode);
  const categoryLabel = selectedCategory === "__all__" ? "All" : prettyText(selectedCategory);

  activeScope.textContent = "Mode: " + modeLabel + " | Category: " + categoryLabel;
}

function ensureColorPopover() {
  if (colorPopoverEl) return colorPopoverEl;

  const el = document.createElement("div");
  el.className = "colorPopover";
  el.hidden = true;
  el.addEventListener("click", function (e) {
    // prevent "click outside" handler from immediately closing it
    e.stopPropagation();
  });

  document.body.appendChild(el);
  colorPopoverEl = el;

  document.addEventListener("click", function () {
    hideColorPopover();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hideColorPopover();
  });

  return el;
}

function hideColorPopover() {
  if (!colorPopoverEl) return;
  colorPopoverEl.hidden = true;
  colorPopoverEl.innerHTML = "";
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function bestPopoverLeft(rect, popWidth, margin) {
  const vw = window.innerWidth;
  const minLeft = margin;
  const maxLeft = vw - margin - popWidth;

  const candidates = [
    rect.left, // align with anchor left
    rect.right - popWidth, // align with anchor right
    rect.left + rect.width / 2 - popWidth / 2 // center on anchor
  ];

  // Pick the candidate with least overflow; then clamp.
  let best = candidates[2];
  let bestOverflow = Infinity;

  for (let i = 0; i < candidates.length; i++) {
    const left = candidates[i];
    const overflowLeft = Math.max(0, minLeft - left);
    const overflowRight = Math.max(0, left - maxLeft);
    const overflow = overflowLeft + overflowRight;

    if (overflow < bestOverflow) {
      bestOverflow = overflow;
      best = left;
    }
  }

  return clamp(best, minLeft, maxLeft);
}

function showColorPopover(anchorEl, item) {
  const el = ensureColorPopover();
  const modeLabel = prettyText(item.mode || activeMode);
  const categoryLabel = prettyText(item.category || "");
  const selector = item.selector || "";

  el.innerHTML =
    '<div class="colorPopoverTitle">Color details</div>' +
    '<div class="colorPopoverVar"></div>' +
    '<div class="colorPopoverRow"><div class="colorPopoverKey">Value</div><div class="colorPopoverVal"></div></div>' +
    '<div class="colorPopoverRow"><div class="colorPopoverKey">Mode</div><div class="colorPopoverVal"></div></div>' +
    '<div class="colorPopoverRow"><div class="colorPopoverKey">Category</div><div class="colorPopoverVal"></div></div>' +
    (selector ? '<div class="colorPopoverRow"><div class="colorPopoverKey">Selector</div><div class="colorPopoverVal"></div></div>' : "") +
    '<div class="colorPopoverActions">' +
    '<button class="colorPopoverBtn" type="button" data-action="copyValue">Copy value</button>' +
    '<button class="colorPopoverBtn" type="button" data-action="copyName">Copy var</button>' +
    "</div>";

  el.querySelector(".colorPopoverVar").textContent = item.name || "";
  el.querySelector(".colorPopoverRow .colorPopoverVal").textContent = item.value || "";

  const rows = el.querySelectorAll(".colorPopoverRow");
  // rows[0] = value, rows[1] = mode, rows[2] = category, rows[3] = selector (optional)
  if (rows[1]) rows[1].querySelector(".colorPopoverVal").textContent = modeLabel;
  if (rows[2]) rows[2].querySelector(".colorPopoverVal").textContent = categoryLabel;
  if (selector && rows[3]) rows[3].querySelector(".colorPopoverVal").textContent = selector;

  el.querySelectorAll("[data-action]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const action = btn.getAttribute("data-action");
      if (action === "copyValue") copyToClipboard(item.value || "");
      if (action === "copyName") copyToClipboard(item.name || "");
    });
  });

  // position near the preview box
  el.hidden = false;
  const rect = anchorEl.getBoundingClientRect();
  const margin = 10;

  // measure after un-hiding
  const popRect = el.getBoundingClientRect();
  const preferBelow = rect.bottom + margin + popRect.height <= window.innerHeight - margin;

  const top = preferBelow ? rect.bottom + margin : rect.top - margin - popRect.height;
  const left = bestPopoverLeft(rect, popRect.width, margin);

  el.style.top = Math.round(top) + "px";
  el.style.left = Math.round(left) + "px";
}

function applyFilters() {
  const searchText = (searchInput.value || "").trim().toLowerCase();
  const selectedCategory = getSelectedCategory();

  const filtered = colorVariables.filter(function (item) {
    if (item.mode !== activeMode) return false;
    if (selectedCategory && item.category !== selectedCategory) return false;

    if (!searchText) return true;

    const text = (
      item.mode + " " + item.category + " " + item.name + " " + item.value + " " + item.selector
    ).toLowerCase();

    return text.indexOf(searchText) !== -1;
  });

  renderTable(filtered);
  updateScopeText();
}

function renderTable(items) {
  tbody.innerHTML = "";
  noResults.hidden = items.length > 0;
  resultCount.textContent = items.length + " result" + (items.length === 1 ? "" : "s");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const tr = document.createElement("tr");

    const tdCategory = document.createElement("td");
    tdCategory.textContent = item.categoryLabel;

    const tdName = document.createElement("td");
    tdName.textContent = item.name;
    tdName.className = "valueCell";
    tdName.title = "Double-click to copy variable name";
    tdName.addEventListener("dblclick", function () {
      copyToClipboard(item.name);
    });

    const tdValue = document.createElement("td");
    tdValue.textContent = item.value;
    tdValue.className = "valueCell";

    const tdPreview = document.createElement("td");
    const previewBox = document.createElement("div");
    previewBox.className = "preview";

    const lower = (item.value || "").toLowerCase();
    if (lower.indexOf("gradient(") !== -1) {
      previewBox.style.backgroundImage = item.value;
      previewBox.style.backgroundColor = "transparent";
      previewBox.style.backgroundSize = "cover";
      previewBox.style.backgroundPosition = "center";
    } else {
      const hex = firstHex(item.value);
      previewBox.style.backgroundColor = hex ? hex : item.value;
    }

    previewBox.title = "Click for details";
    previewBox.addEventListener("click", function (e) {
      e.stopPropagation();
      showColorPopover(previewBox, item);
    });

    tdPreview.appendChild(previewBox);

    tr.appendChild(tdCategory);
    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdPreview);

    tbody.appendChild(tr);
  }
}

function setupModeTabs() {
  const tabs = document.querySelectorAll(".modeTab");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activeMode = tab.dataset.mode;

      tabs.forEach(function (t) {
        t.classList.remove("active");
      });
      tab.classList.add("active");

      rebuildCategoryOptions();
      applyFilters();
    });
  });
}

function setupCategoryDropdown() {
  categoryBtn.addEventListener("click", function () {
    const isOpen = !categoryMenu.hidden;
    categoryMenu.hidden = isOpen;
    categoryBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  categoryMenu.addEventListener("click", function (e) {
    const item = e.target.closest(".dropdownItem");
    if (!item) return;

    selectedCategory = item.dataset.value;
    categoryMenu.hidden = true;
    categoryBtn.setAttribute("aria-expanded", "false");

    rebuildCategoryOptions();
    applyFilters();
  });

  document.addEventListener("click", function (e) {
    if (!categoryDropdown.contains(e.target)) {
      categoryMenu.hidden = true;
      categoryBtn.setAttribute("aria-expanded", "false");
    }
  });
}
async function loadData() {
  try {
    const response = await fetch(VARIABLES_JSON_FILE, { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status);

    const jsonData = await response.json();
    colorVariables = flattenVariablesJson(jsonData);

    const modeOrder = ["base", "light_mode", "dark_mode", "night_mode", "system_default"];
    for (let i = 0; i < modeOrder.length; i++) {
      const mode = modeOrder[i];
      if (colorVariables.some(function (x) { return x.mode === mode; })) {
        activeMode = mode;
        break;
      }
    }

    const tabs = document.querySelectorAll(".modeTab");
    tabs.forEach(function (t) {
      t.classList.toggle("active", t.dataset.mode === activeMode);
    });
  } catch (error) {
    console.warn("Could not load variables.json. Use local server (not file://).", error);
    colorVariables = [];
  }
 
  rebuildCategoryOptions();
  applyFilters();
}

searchInput.addEventListener("input", applyFilters);


clearBtn.addEventListener("click", function () {
  searchInput.value = "";
  selectedCategory = "__all__";
  rebuildCategoryOptions();
  applyFilters();
});

renderTable([]);
setupModeTabs();
setupCategoryDropdown();
loadData();