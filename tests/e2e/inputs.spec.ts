import { expect, test, type Page } from "@playwright/test";
import {
  expectSameAcrossFrameworks,
  frameworks,
  openFixture,
  screenshot,
  themes,
} from "./helpers";

const combobox = (page: Page) =>
  page.getByRole("combobox", { name: "Country" });
const listbox = (page: Page) => page.getByRole("listbox", { name: "Country" });
const option = (page: Page, name: string) =>
  page.getByRole("option", { name, exact: true });
const hiddenValue = (page: Page) => page.locator('input[name="country"]');

/** Pastikan aria-activedescendant menunjuk opsi bernama `name` dan opsi itu aria-selected. */
async function expectActive(page: Page, name: string) {
  const target = option(page, name);
  await expect(target).toHaveAttribute("aria-selected", "true");
  const id = await target.getAttribute("id");
  await expect(combobox(page)).toHaveAttribute("aria-activedescendant", id!);
}

const digit = (page: Page, index: number) =>
  page.getByRole("textbox", { name: `Digit ${index} of 6` });

async function paste(page: Page, text: string) {
  await page.evaluate((value) => {
    const data = new DataTransfer();
    data.setData("text/plain", value);
    document.activeElement!.dispatchEvent(
      new ClipboardEvent("paste", {
        clipboardData: data,
        bubbles: true,
        cancelable: true,
      }),
    );
  }, text);
}

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("combobox: panah membuka dan berpindah, Enter memilih, Escape mengosongkan", async ({
      page,
    }) => {
      await openFixture(page, framework, "combobox");
      const input = combobox(page);
      const press = (key: string) => page.keyboard.press(key);

      await press("Tab");
      await expect(input).toBeFocused();
      await expect(input).toHaveAttribute("aria-expanded", "false");
      await expect(input).toHaveAttribute("aria-autocomplete", "list");
      await expect(input).not.toHaveAttribute("aria-activedescendant");
      await expect(listbox(page)).toBeHidden();

      await press("ArrowDown");
      await expect(listbox(page)).toBeVisible();
      await expect(input).toHaveAttribute("aria-expanded", "true");
      await expect(input).toHaveAttribute(
        "aria-controls",
        (await listbox(page).getAttribute("id"))!,
      );
      await expectActive(page, "Australia");
      await press("ArrowDown");
      await expectActive(page, "Indonesia");
      await press("ArrowUp");
      await press("ArrowUp");
      await expectActive(page, "Vietnam");
      await expect(input).toBeFocused();

      await press("Enter");
      await expect(listbox(page)).toBeHidden();
      await expect(input).toHaveValue("Vietnam");
      await expect(input).toHaveAttribute("aria-expanded", "false");
      await expect(hiddenValue(page)).toHaveValue("vn");

      await press("ArrowUp");
      await expectActive(page, "Vietnam");
      await expect(option(page, "Vietnam")).toHaveAttribute(
        "data-state",
        "checked",
      );
      await press("Escape");
      await expect(listbox(page)).toBeHidden();
      await expect(input).toHaveValue("Vietnam");

      await press("Escape");
      await expect(input).toHaveValue("");
      await expect(hiddenValue(page)).toHaveValue("");
    });

    test("combobox: mengetik memfilter, daftar kosong menampilkan No results", async ({
      page,
    }) => {
      await openFixture(page, framework, "combobox");
      const input = combobox(page);

      await input.focus();
      await page.keyboard.type("ia");
      await expect(listbox(page)).toBeVisible();
      await expect(page.getByRole("option")).toHaveText([
        "Australia",
        "Indonesia",
        "Malaysia",
      ]);
      await expect(input).not.toHaveAttribute("aria-activedescendant");

      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowDown");
      await expectActive(page, "Indonesia");
      await page.keyboard.press("Enter");
      await expect(input).toHaveValue("Indonesia");
      await expect(hiddenValue(page)).toHaveValue("id");

      await page.keyboard.press("Backspace");
      await expect(hiddenValue(page)).toHaveValue("");
      await expect(page.getByRole("option")).toHaveText(["Indonesia"]);

      await input.fill("zzz");
      await expect(page.getByRole("option")).toHaveCount(0);
      await expect(page.getByText("No results")).toBeVisible();
    });

    test("combobox: klik opsi memilih, klik di luar menutup, daftar di bawah input", async ({
      page,
    }) => {
      await openFixture(page, framework, "combobox");
      const input = combobox(page);

      await input.click();
      await expect(listbox(page)).toBeVisible();
      const inputBox = (await input.boundingBox())!;
      const popup = page.locator('[popover="manual"]');
      const popupBox = (await popup.boundingBox())!;
      expect(popupBox.y).toBeGreaterThan(inputBox.y + inputBox.height);
      expect(Math.round(popupBox.x)).toBe(Math.round(inputBox.x));
      expect(Math.round(popupBox.width)).toBe(Math.round(inputBox.width));

      await option(page, "Japan").click();
      await expect(listbox(page)).toBeHidden();
      await expect(input).toHaveValue("Japan");
      await expect(input).toBeFocused();
      await expect(hiddenValue(page)).toHaveValue("jp");

      await input.click();
      await expect(listbox(page)).toBeVisible();
      await page.mouse.click(700, 500);
      await expect(listbox(page)).toBeHidden();
    });

    test("input-otp: mengetik maju, Backspace mundur, panah, Home, End", async ({
      page,
    }) => {
      await openFixture(page, framework, "input-otp");
      const group = page.getByRole("group", { name: "Verification code" });
      const hidden = page.locator('input[name="code"]');
      const press = (key: string) => page.keyboard.press(key);

      await expect(group.getByRole("textbox")).toHaveCount(6);
      await expect(digit(page, 1)).toHaveAttribute(
        "autocomplete",
        "one-time-code",
      );
      await expect(digit(page, 1)).toHaveAttribute("inputmode", "numeric");

      await press("Tab");
      await expect(digit(page, 1)).toBeFocused();
      await page.keyboard.type("12a3");
      await expect(digit(page, 1)).toHaveValue("1");
      await expect(digit(page, 2)).toHaveValue("2");
      await expect(digit(page, 3)).toHaveValue("3");
      await expect(digit(page, 4)).toBeFocused();
      await expect(digit(page, 4)).toHaveValue("");

      await press("Backspace");
      await expect(digit(page, 3)).toBeFocused();
      await expect(digit(page, 3)).toHaveValue("");
      await press("ArrowLeft");
      await expect(digit(page, 2)).toBeFocused();
      await press("ArrowRight");
      await expect(digit(page, 3)).toBeFocused();

      await page.keyboard.type("3456");
      await expect(hidden).toHaveValue("123456");
      await expect(digit(page, 6)).toBeFocused();

      await press("Home");
      await expect(digit(page, 1)).toBeFocused();
      await page.keyboard.type("9");
      await expect(digit(page, 1)).toHaveValue("9");
      await expect(digit(page, 2)).toBeFocused();
      await press("End");
      await expect(digit(page, 6)).toBeFocused();
      await press("Backspace");
      await expect(digit(page, 6)).toHaveValue("");
      await expect(hidden).toHaveValue("92345");
    });

    test("input-otp: menempel kode mengisi semua kotak", async ({ page }) => {
      await openFixture(page, framework, "input-otp");
      const hidden = page.locator('input[name="code"]');

      await digit(page, 3).focus();
      await paste(page, "48-29-13");
      for (const [index, value] of [..."482913"].entries())
        await expect(digit(page, index + 1)).toHaveValue(value);
      await expect(hidden).toHaveValue("482913");
      await expect(digit(page, 6)).toBeFocused();

      await digit(page, 5).focus();
      await paste(page, "7");
      await expect(hidden).toHaveValue("482973");
    });

    test("label: tanda wajib tidak dibacakan, teks sr-only ikut nama aksesibel", async ({
      page,
    }) => {
      await openFixture(page, framework, "label--checkbox");
      const terms = page.getByRole("checkbox", {
        name: "I accept the terms of service required",
        exact: true,
      });
      const newsletter = page.getByRole("checkbox", {
        name: "Send me the monthly newsletter Optional",
        exact: true,
      });

      await expect(terms).not.toBeChecked();
      await page.getByText("I accept the terms of service").click();
      await expect(terms).toBeChecked();
      await expect(newsletter).not.toBeChecked();
      await expect(page.locator('label [aria-hidden="true"]')).toHaveText("*");
    });
  });
}

for (const theme of themes) {
  test(`combobox terbuka (${theme}) tampil sama`, async ({
    page,
  }, testInfo) => {
    await expectSameAcrossFrameworks(
      page,
      testInfo,
      "combobox",
      theme,
      async (p) => {
        await combobox(p).focus();
        await p.keyboard.press("ArrowDown");
        await p.keyboard.press("ArrowDown");
        await listbox(p).waitFor();
        await p.mouse.move(0, 0);
        return screenshot(p, "page");
      },
    );
  });
}
