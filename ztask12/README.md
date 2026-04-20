# Variable Explorer (Node + Static UI)

This project serves a small **frontend UI** (HTML/CSS/JS) using a **Node.js + Express** server.
The UI loads `variables.json` and lets you search/filter theme color variables by mode/category.

## Folder structure

- `public/`
  - `index.html` – UI layout
  - `style.css` – UI styling
  - `script.js` – UI logic (fetch + filter + render)
  - `variables.json` – generated dataset consumed by the UI
- `source/`
  - `Untitled.cs` – input source used to generate `variables.json`
- `server.js` – Express server that hosts `public/` on `http://localhost:<PORT>`
- `build-variables-json.js` – generator script: `source/Untitled.cs` → `public/variables.json`

## Prerequisites

- Node.js 18+ (recommended)

## Install

```bash
npm install
```

## Run the app (local server)

```bash
npm start
```

Then open:

- `http://localhost:3000`

To use a different port:

```bash
# PowerShell
$env:PORT=3001
npm start
```

## Regenerate `variables.json`

Whenever `source/Untitled.cs` changes, regenerate the JSON:

```bash
npm run build:variables
```

## CI/CD (GitHub Actions) quick test

This repo includes a workflow that runs on every push/PR and regenerates `public/variables.json`.

To verify CI is working with a repo variable:

- In GitHub, go to **Settings → Secrets and variables → Actions → Variables**
- Add a repository variable named `PIPELINE_TEST_MESSAGE` (example value: `hello-from-ci`)
- Push any commit that changes something under `ztask12/`
- In the Actions run logs, you should see a line like:
  - `ci.pipeline_test_message = hello-from-ci`

## Why Node is used here

The UI fetches `./variables.json`. Browsers often block `fetch()` when opening files directly via `file://`,
so we run a local HTTP server (Express) to serve the files correctly over `http://`.

CI trigger