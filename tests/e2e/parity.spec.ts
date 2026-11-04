import { expect, test, type Page } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import {
  components,
  openFixture,
  openModal,
  themes,
  type ComponentName,
  type Framework,
  type Theme,
} from "./helpers";

/** Batas selisih piksel dari PRD bagian 11. */
const MAX_DIFF_RATIO = 0.005;

async function capture(
  page: Page,
  framework: Framework,
  component: ComponentName,
  theme: Theme,
): Promise<PNG> {
  await openFixture(page, framework, component, theme);
  if (component === "modal") {
    await openModal(page);
    await page.mouse.move(0, 0);
    return PNG.sync.read(
      await page.screenshot({ animations: "disabled", caret: "hide" }),
    );
  }
  return PNG.sync.read(
    await page
      .locator("#fixture")
      .screenshot({ animations: "disabled", caret: "hide" }),
  );
}

for (const component of components) {
  for (const theme of themes) {
    test(`${component} (${theme}) tampil sama di Blade, React, dan Vue`, async ({
      page,
    }, testInfo) => {
      const reference = await capture(page, "react", component, theme);

      for (const framework of ["blade", "vue"] as const) {
        const candidate = await capture(page, framework, component, theme);
        expect(
          [candidate.width, candidate.height],
          `ukuran ${framework} berbeda dari react`,
        ).toEqual([reference.width, reference.height]);

        const diff = new PNG({
          width: reference.width,
          height: reference.height,
        });
        const changed = pixelmatch(
          reference.data,
          candidate.data,
          diff.data,
          reference.width,
          reference.height,
          {
            threshold: 0.1,
          },
        );
        const ratio = changed / (reference.width * reference.height);

        if (ratio > MAX_DIFF_RATIO) {
          await testInfo.attach(`${framework}-diff.png`, {
            body: PNG.sync.write(diff),
            contentType: "image/png",
          });
          await testInfo.attach(`${framework}.png`, {
            body: PNG.sync.write(candidate),
            contentType: "image/png",
          });
          await testInfo.attach("react.png", {
            body: PNG.sync.write(reference),
            contentType: "image/png",
          });
        }
        expect(
          ratio,
          `selisih piksel ${framework} vs react`,
        ).toBeLessThanOrEqual(MAX_DIFF_RATIO);
      }
    });
  }
}
