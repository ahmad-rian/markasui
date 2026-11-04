import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import {
  components,
  frameworks,
  openFixture,
  openModal,
  themes,
} from "./helpers";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const framework of frameworks) {
  for (const component of components) {
    for (const theme of themes) {
      test(`${framework} ${component} (${theme}) lolos axe-core`, async ({
        page,
      }) => {
        await openFixture(page, framework, component, theme);
        if (component === "modal") await openModal(page);

        const { violations } = await new AxeBuilder({ page })
          .withTags(WCAG_TAGS)
          .analyze();
        expect(
          violations.map(
            (v) =>
              `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
          ),
        ).toEqual([]);
      });
    }
  }
}
