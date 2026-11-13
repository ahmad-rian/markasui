import { chromium } from "@playwright/test";
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  for (const [fw, c] of process.argv.slice(2).map((s) => s.split(":"))) {
    const t = Date.now();
    await page.goto(`http://localhost:5173/${fw}.html?c=${c}`);
    const ok = await page
      .locator("body[data-ready=true]")
      .waitFor({ timeout: 240000 })
      .then(
        () => true,
        () => false,
      );
    console.log(
      fw,
      c,
      ok,
      Date.now() - t,
      "ms",
      errors.splice(0).join(" | ").slice(0, 600),
    );
    if (ok)
      console.log(
        (await page.locator("main").innerText())
          .slice(0, 300)
          .replace(/\n/g, " / "),
      );
  }
} finally {
  await browser.close();
}
