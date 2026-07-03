# Setup Guide - New Relic Synthetics local workspace

A local environment for developing and debugging New Relic Synthetics
**Scripted Browser** and **Scripted API** monitors, aligned with New Relic's
current Node 22 runtime.

The steps are the same on every platform - install the prerequisites, install
the generator, generate a workspace, then run the examples. Platform-specific
details are called out where they differ.

> **Tested on:** Windows and macOS (hands-on). The Linux steps are standard and
> expected to work but have not been separately verified.

---

## 1. Prerequisites

Install these first. On a fresh machine you will need all of them.

### Node.js 22 LTS (or newer)
The runtime everything runs on; it includes `npm`.

- **Windows**: download the **Windows Installer (.msi), LTS** from
  <https://nodejs.org> and run it with defaults. The *"Tools for Native
  Modules"* checkbox is **optional** - leave it unticked; this workspace
  installs without a compiler.
- **macOS**: download the **macOS Installer (.pkg), LTS** from
  <https://nodejs.org>, or `brew install node` if you use Homebrew.
- **Linux**: install via your distro (`apt install nodejs npm`,
  `dnf install nodejs`), [nvm](https://github.com/nvm-sh/nvm), or the tarball
  from <https://nodejs.org>. Ensure the version is **22.x or newer**.

### Google Chrome
Required for Scripted Browser tests.

- **Windows / macOS**: install the standard desktop Chrome from
  <https://www.google.com/chrome/> if not already present.
- **Linux**: install Google Chrome (or Chromium) via your package manager.
  A headed browser needs a display; on headless servers see the note under
  *Running the examples*.

### Git *(optional)*
Only needed if you prefer cloning the repo over installing from npm.
- **Windows**: <https://git-scm.com/download/win>
- **macOS**: preinstalled, or `brew install git`
- **Linux**: `apt install git` / `dnf install git`

### A terminal
- **Windows**: **PowerShell** (search "PowerShell" in the Start menu).
- **macOS**: **Terminal** (zsh).
- **Linux**: your shell of choice.

### Verify the prerequisites
Run each command - you should get version numbers back:

```bash
node --version     # expect v22.x.x or higher
npm --version
```

If `node` is "not recognized" (Windows) or "command not found", close and
reopen your terminal so the updated PATH is picked up, or reboot.

---

## 2. Install the generator

```bash
npm install -g yo @crshanks/generator-nrsynthetics-workspace
```

---

## 3. Generate a workspace

Run from wherever you want the workspace folder created (e.g. your Desktop):

**Windows (PowerShell):**
```powershell
cd $env:USERPROFILE\Desktop
yo @crshanks/nrsynthetics-workspace
```

**macOS / Linux:**
```bash
cd ~/Desktop
yo @crshanks/nrsynthetics-workspace
```

Answer the prompts:

- *Enable Download/Upload of Synthetics scripts to your account?* → **Yes**
  (or **No** if you only want to run the local examples)
- *Enter your user API Key* → paste a New Relic **User API key** (only asked if
  you answered Yes)
- *Initialize local Git repo?* → **Yes**

This creates a `synthetics-local` folder.

---

## 4. Install workspace dependencies and run the examples

```bash
cd synthetics-local
npm install
```

Then run the examples. Note the path separator differs by platform:

**Windows:**
```powershell
node examples\apiTest.js
node examples\scriptedBrowser.js
```

**macOS / Linux:**
```bash
node examples/apiTest.js
node examples/scriptedBrowser.js
```

### What success looks like
- **`apiTest.js`** →
  ```
  Response body: { widgetType: 'gear', widgetCount: 10 }
  main(): Script execution completed
  ```
- **`scriptedBrowser.js`** → one Chrome window opens, loads a page, runs the
  checks, and ends with `main(): Script execution completed`. The first run may
  pause a few seconds while the matching browser driver downloads automatically.

> **Linux (headless servers):** the scripted browser example launches a visible
> Chrome window by default and needs a display. On a headless machine, either
> run under a virtual display (e.g. `xvfb-run node examples/scriptedBrowser.js`)
> or edit `lib/simulator.js` to add Chrome's `headless=new` argument.

---

## Normal - not errors

- **`npm install` deprecation warnings and an `npm audit` report** (a few
  "vulnerabilities"): expected and safe to ignore. They come from build/tooling
  dependencies pinned to match New Relic's runtime. **Do not run
  `npm audit fix --force`** - it would break runtime compatibility.
- **Trailing Chrome log lines** after the scripted browser test finishes
  (most noticeable on Windows), e.g. `PHONE_REGISTRATION_ERROR`,
  `USB: ... Element not found`, `Created TensorFlow Lite XNNPACK delegate`:
  harmless Chrome shutdown noise. The test has already completed successfully by
  the time these appear.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `node` / `npm` / `yo` "not recognized" / "command not found" | Close & reopen the terminal (or reboot) so PATH updates. Confirm the global install in step 2 succeeded. |
| Scripted browser can't find Chrome | Ensure Chrome is a standard install; note its version. On Linux, confirm Chrome/Chromium is on PATH. |
| **Downloads hang or fail** (`npm install` stalls, or the browser driver won't download), often a **corporate proxy/firewall** | Ask IT for the proxy URL, then: `npm config set proxy http://PROXY_HOST:PORT` and `npm config set https-proxy http://PROXY_HOST:PORT`. If the driver download is blocked, the proxy/firewall may need to allow `googlechromelabs.github.io` and `storage.googleapis.com`. |
| `npm install` fails asking for Visual Studio / Python / a compiler | Shouldn't happen with this workspace; if it does, note the exact package name and report it. |

---

## Acknowledgements

This project is a fork of
[generator-nrsynthetics-workspace](https://github.com/tanben/generator-nrsynthetics-workspace),
originally created by **Benedicto Tan**.
