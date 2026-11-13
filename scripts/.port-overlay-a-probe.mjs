import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage();
const errs = [];
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
p.on("pageerror", (e) => errs.push(String(e)));
for (const url of process.argv.slice(2)) {
  const t = Date.now();
  await p.goto("http://localhost:5173/" + url);
  const ok = await p
    .locator("body[data-ready=true]")
    .waitFor({ timeout: 60000 })
    .then(
      () => true,
      () => false,
    );
  console.log(
    url,
    ok,
    Date.now() - t,
    "ms",
    errs.splice(0).join(" | ").slice(0, 300),
  );
}
await b.close();
