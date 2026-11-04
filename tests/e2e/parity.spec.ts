import { test } from "@playwright/test";
import {
  components,
  expectSameAcrossFrameworks,
  openModal,
  screenshot,
  themes,
} from "./helpers";

// Keadaan awal setiap komponen. Keadaan terbuka (overlay) diuji di spec masing-masing.
for (const component of components) {
  for (const theme of themes) {
    test(`${component} (${theme}) tampil sama di Blade, React, dan Vue`, async ({
      page,
    }, testInfo) => {
      await expectSameAcrossFrameworks(page, testInfo, component, theme);
    });
  }
}

for (const theme of themes) {
  test(`modal terbuka (${theme}) tampil sama`, async ({ page }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "modal",
      theme,
      async (p) => {
        await openModal(p);
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });
}
