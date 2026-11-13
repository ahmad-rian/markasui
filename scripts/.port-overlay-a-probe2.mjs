import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage();
p.on(
  "console",
  (m) =>
    m.type() === "error" &&
    console.log("console:", m.text(), JSON.stringify(m.location())),
);
p.on("pageerror", (e) =>
  console.log("pageerror:", e.message, e.stack?.slice(0, 300)),
);
await p.goto("http://localhost:5173/angular.html?c=tooltip");
await p.waitForTimeout(40000);
await b.close();
