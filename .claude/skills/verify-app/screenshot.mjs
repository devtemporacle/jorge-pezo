// Desktop + mobile screenshots of the served site with real viewport emulation.
// Usage: node screenshot.mjs <url> <outDir> <chrome-or-edge-executable>
// Run from a scratch folder that has puppeteer-core installed (see SKILL.md → Evidence).
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const [url, outDir, exe] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: exe,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
  userDataDir: fileURLToPath(new URL("./profile", import.meta.url)),
});
try {
  const page = await browser.newPage();
  for (const [name, viewport] of [
    ["desktop", { width: 1280, height: 900 }],
    ["mobile", { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
  ]) {
    await page.setViewport(viewport);
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    const state = await page.evaluate(() => ({
      vw: innerWidth,
      sw: document.documentElement.scrollWidth,
      h1: document.querySelector("h1")?.textContent,
      h1px: document.querySelector("h1") && getComputedStyle(document.querySelector("h1")).fontSize,
    }));
    console.log(name, JSON.stringify(state));
    await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  }
} finally {
  await browser.close();
}
