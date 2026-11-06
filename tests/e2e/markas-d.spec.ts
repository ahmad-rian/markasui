import { expect, test, type Page } from "@playwright/test";
import { frameworks, openFixture } from "./helpers";

const fileInput = (page: Page) => page.locator("input[type=file]");
const fakeFile = (name: string, mimeType: string, size = 64) => ({
  name,
  mimeType,
  buffer: Buffer.alloc(size, 1),
});

/** Fire a drag event carrying files, the way a desktop drag arrives. */
const dragFiles = (
  page: Page,
  type: "dragenter" | "drop",
  files: { name: string; type: string }[],
) =>
  page.locator("label").evaluate(
    (zone, { type, files }) => {
      const transfer = new DataTransfer();
      for (const file of files)
        transfer.items.add(new File(["x"], file.name, { type: file.type }));
      zone.dispatchEvent(
        new DragEvent(type, {
          dataTransfer: transfer,
          bubbles: true,
          cancelable: true,
        }),
      );
    },
    { type, files },
  );

/** Pemilih file native Chromium kadang tidak terbuka pada tekanan pertama; coba lagi beberapa kali. */
const CHOOSER_ATTEMPTS = 3;
const CHOOSER_TIMEOUT_MS = 3000;
async function chooserFrom(page: Page, key: string) {
  for (let attempt = 1; attempt <= CHOOSER_ATTEMPTS; attempt++) {
    try {
      const [chooser] = await Promise.all([
        page.waitForEvent("filechooser", { timeout: CHOOSER_TIMEOUT_MS }),
        page.keyboard.press(key),
      ]);
      return chooser;
    } catch (error) {
      if (attempt === CHOOSER_ATTEMPTS) throw error;
    }
  }
  throw new Error("file chooser did not open");
}

for (const framework of frameworks) {
  test.describe(framework, () => {
    test("file-dropzone: Enter and Space on the focused input open the picker", async ({
      page,
    }) => {
      await openFixture(page, framework, "file-dropzone");
      await page.keyboard.press("Tab");
      await expect(fileInput(page)).toBeFocused();
      await expect(
        page.getByLabel("Drop files here or browse", { exact: false }),
      ).toBeFocused();

      const byEnter = await chooserFrom(page, "Enter");
      expect(byEnter.isMultiple()).toBe(true);
      await byEnter.setFiles([]);

      const bySpace = await chooserFrom(page, "Space");
      await bySpace.setFiles([
        fakeFile("poster.png", "image/png"),
        fakeFile("notes.txt", "text/plain"),
      ]);
      const items = page.getByRole("listitem");
      await expect(items).toHaveCount(5);
      await expect(items.nth(3)).toContainText("poster.png");
      await expect(items.nth(4).getByRole("alert")).toHaveText(
        "File type not allowed",
      );
    });

    test("file-dropzone: validates picks, keeps valid files on the input, and removes", async ({
      page,
    }) => {
      await openFixture(page, framework, "file-dropzone");
      await fileInput(page).setInputFiles([
        fakeFile("one.jpg", "image/jpeg"),
        fakeFile("huge.png", "image/png", 6 * 1024 * 1024),
        fakeFile("two.pdf", "application/pdf"),
        fakeFile("three.png", "image/png"),
      ]);
      const alerts = page.getByRole("alert");
      await expect(alerts).toHaveText([
        "Larger than 5 MB",
        "Larger than 5 MB",
        "Only 4 files allowed",
      ]);
      const posted = () =>
        fileInput(page).evaluate((input: HTMLInputElement) =>
          [...(input.files ?? [])].map((file) => file.name),
        );
      expect(await posted()).toEqual(["one.jpg", "two.pdf"]);

      await page.getByRole("button", { name: "Remove one.jpg" }).click();
      await expect(page.getByText("one.jpg")).toHaveCount(0);
      expect(await posted()).toEqual(["two.pdf"]);
    });

    test("file-dropzone: highlights on drag over and lists dropped files", async ({
      page,
    }) => {
      await openFixture(page, framework, "file-dropzone");
      const zone = page.locator("label");
      const files = [{ name: "dropped.png", type: "image/png" }];
      await dragFiles(page, "dragenter", files);
      await expect(zone).toHaveAttribute("data-state", "over");
      await dragFiles(page, "drop", files);
      await expect(zone).toHaveAttribute("data-state", "idle");
      await expect(page.getByRole("listitem").last()).toContainText(
        "dropped.png",
      );
    });

    test("image-compare: slider keys follow the APG slider pattern", async ({
      page,
    }) => {
      await openFixture(page, framework, "image-compare");
      const slider = page.getByRole("slider", { name: "Comparison position" });
      await page.keyboard.press("Tab");
      await expect(slider).toBeFocused();
      await expect(slider).toHaveAttribute("aria-valuenow", "50");

      const presses: [string, string][] = [
        ["ArrowRight", "55"],
        ["ArrowUp", "60"],
        ["ArrowLeft", "55"],
        ["ArrowDown", "50"],
        ["PageUp", "60"],
        ["PageDown", "50"],
        ["End", "100"],
        ["ArrowRight", "100"],
        ["Home", "0"],
      ];
      for (const [key, value] of presses) {
        await page.keyboard.press(key);
        await expect(slider, key).toHaveAttribute("aria-valuenow", value);
      }
      await expect(slider).toHaveAttribute("aria-valuetext", "0%");
    });

    test("image-compare: a click moves the divider and a drag follows the pointer", async ({
      page,
    }) => {
      await openFixture(page, framework, "image-compare");
      const group = page.getByRole("group", {
        name: "Photo edit, before and after",
      });
      const slider = page.getByRole("slider");
      const box = (await group.boundingBox())!;
      const y = box.y + box.height * 0.8;

      await page.mouse.click(box.x + box.width * 0.25, y);
      await expect(slider).toHaveAttribute("aria-valuenow", "25");
      await expect(slider).toBeFocused();

      await page.mouse.move(box.x + box.width * 0.25, y);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.8, y, { steps: 5 });
      await expect(group).toHaveAttribute("data-dragging", "");
      await page.mouse.up();
      await expect(slider).toHaveAttribute("aria-valuenow", "80");
      await expect(group).not.toHaveAttribute("data-dragging");
    });

    test("image-compare: vertical moves with Up and Down and reads clientY", async ({
      page,
    }) => {
      await openFixture(page, framework, "image-compare--vertical");
      const slider = page.getByRole("slider");
      await expect(slider).toHaveAttribute("aria-orientation", "vertical");
      await expect(slider).toHaveAttribute("aria-valuenow", "45");
      await slider.focus();
      await page.keyboard.press("ArrowDown");
      await expect(slider).toHaveAttribute("aria-valuenow", "50");
      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("ArrowUp");
      await expect(slider).toHaveAttribute("aria-valuenow", "40");

      const box = (await page.getByRole("group").boundingBox())!;
      await page.mouse.click(box.x + 20, box.y + box.height * 0.75);
      await expect(slider).toHaveAttribute("aria-valuenow", "75");
    });

    test("tilt-card: tilts toward the pointer and settles when it leaves", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await openFixture(page, framework, "tilt-card");
      const card = page.locator("[data-depth]").first().locator("..");
      const box = (await card.boundingBox())!;
      // Listener pointer bisa terpasang sesaat setelah fixture siap (hydration/Alpine), dan
      // kemiringan diperbarui di requestAnimationFrame: masuk ulang sampai keduanya terlihat.
      await expect(async () => {
        await page.mouse.move(5, 5);
        await page.mouse.move(box.x + box.width - 4, box.y + 4);
        await expect(card).toHaveAttribute("data-state", "active", {
          timeout: 500,
        });
        await expect
          .poll(
            () =>
              card.evaluate((el) =>
                Math.min(
                  parseFloat(el.style.getPropertyValue("--tilt-x")) || 0,
                  parseFloat(el.style.getPropertyValue("--tilt-y")) || 0,
                ),
              ),
            { timeout: 1000 },
          )
          .toBeGreaterThan(8);
        await expect
          .poll(
            () =>
              card.evaluate(
                (el) =>
                  (el.querySelector("[data-depth]") as HTMLElement).style
                    .translate,
              ),
            { timeout: 1000 },
          )
          .not.toBe("");
      }).toPass({ timeout: 10_000 });

      await page.mouse.move(5, 5);
      await expect(card).not.toHaveAttribute("data-state");
      expect(
        await card.evaluate((el) => el.style.getPropertyValue("--tilt-x")),
      ).toBe("");
    });

    test("tilt-card: stays flat with reduced motion, and lifts on keyboard focus", async ({
      page,
    }) => {
      await openFixture(page, framework, "tilt-card--product");
      const button = page.getByRole("button", { name: "Add to cart" });
      const card = page.locator("[data-depth]").locator("..");
      const box = (await card.boundingBox())!;
      await page.mouse.move(box.x + 10, box.y + 10);
      await expect(card).not.toHaveAttribute("data-state");

      const lift = () =>
        card.evaluate((el) => getComputedStyle(el).translate || "none");
      expect(await lift()).toMatch(/^(none|0px)$/);
      await page.keyboard.press("Tab");
      await expect(button).toBeFocused();
      expect(await lift()).toBe("0px -4px");
    });
  });
}
