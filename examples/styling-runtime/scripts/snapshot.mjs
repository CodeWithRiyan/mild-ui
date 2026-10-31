// Visual snapshot of the built runtime example, with and without the `?accent=` parameter.
//
// Serves dist/ over HTTP (ES modules do not load from file://), opens each variant in Chromium,
// writes a screenshot to snapshots/, and checks the primary button's computed background, so the
// override is verified by the browser, not just by the screenshot file existing.
//
//   pnpm --filter @mild-ui/example-styling-runtime build
//   pnpm --filter @mild-ui/example-styling-runtime snapshot
//
// Needs a browser: `pnpm exec playwright install chromium` once per machine.
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const snapshots = join(root, "snapshots");

const DEFAULT_ACCENT = "rgb(14, 165, 233)"; // --mild-color-primary-500 (#0ea5e9)
const OVERRIDE = "#e11d48";
const OVERRIDE_RGB = "rgb(225, 29, 72)";

const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
};

function serve(directory) {
  const server = createServer(async (request, response) => {
    const path = new URL(request.url, "http://localhost").pathname;
    const file = join(directory, path === "/" ? "index.html" : path);
    try {
      const body = await readFile(file);
      response.writeHead(200, {
        "content-type": types[extname(file)] ?? "application/octet-stream",
      });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  return new Promise((done) => server.listen(0, "127.0.0.1", () => done(server)));
}

const variants = [
  { name: "default", query: "", expected: DEFAULT_ACCENT },
  {
    name: "accent-override",
    query: `?accent=${encodeURIComponent(OVERRIDE)}`,
    expected: OVERRIDE_RGB,
  },
];

const server = await serve(dist);
const { port } = server.address();
const browser = await chromium.launch();
let failures = 0;

try {
  await mkdir(snapshots, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 720, height: 560 } });

  for (const { name, query, expected } of variants) {
    await page.goto(`http://127.0.0.1:${port}/${query}`, { waitUntil: "networkidle" });
    const file = join(snapshots, `${name}.png`);
    await page.screenshot({ path: file, fullPage: true });

    const actual = await page.$eval(
      '[data-probe="primary"]',
      (el) => getComputedStyle(el).backgroundColor,
    );
    const token = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--mild-color-accent").trim(),
    );
    const ok = actual === expected;
    if (!ok) failures++;
    console.log(
      `${ok ? "✔" : "✘"} ${name.padEnd(16)} --mild-color-accent=${token.padEnd(10)} ` +
        `primary button background=${actual} (expected ${expected}) -> ${file}`,
    );
  }
} finally {
  await browser.close();
  server.close();
}

if (failures > 0) {
  console.error(`snapshot: ${failures} variant(s) did not show the expected accent.`);
  process.exit(1);
}
