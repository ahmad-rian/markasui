import type { Page } from "@playwright/test";

export const frameworks = ["blade", "react", "vue"] as const;
export type Framework = (typeof frameworks)[number];

export const components = ["button", "input", "modal", "tabs"] as const;
export type ComponentName = (typeof components)[number];

export const themes = ["light", "dark"] as const;
export type Theme = (typeof themes)[number];

export async function openFixture(
  page: Page,
  framework: Framework,
  component: ComponentName,
  theme: Theme = "light",
) {
  await page.goto(`/${framework}.html?c=${component}&theme=${theme}`);
  await page.locator("body[data-ready=true]").waitFor();
}

export async function openModal(page: Page) {
  await page.getByRole("button", { name: "Hapus proyek" }).click();
  await page.locator("dialog[open]").waitFor();
}
