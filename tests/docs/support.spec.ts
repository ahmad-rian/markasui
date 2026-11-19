import { expect, test, type Page, type Route } from "@playwright/test";

/**
 * "Buy me a coffee" pages. /api/donate and the Sumopod checkout are mocked with page.route, so these tests run
 * against the static build without the donation service (deploy/donate/server.mjs, tested in tests/unit).
 */
const CHECKOUT = "https://pay.sumopod.com/pay/0b6f3c1e-test";
const ORDER = "KOPI-20261119-ABCDEFGHIJKLMNOP";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("markas-splash", "1"));
  await page.route("https://pay.sumopod.com/**", (route) =>
    route.fulfill({ contentType: "text/html", body: "<title>Sumopod</title>" }),
  );
});

/** Records the JSON bodies sent to /api/donate and answers with `reply`. */
async function mockDonate(
  page: Page,
  reply: (route: Route) => Promise<void> = (route) =>
    route.fulfill({ json: { url: CHECKOUT } }),
) {
  const bodies: unknown[] = [];
  await page.route("**/api/donate", async (route) => {
    bodies.push(route.request().postDataJSON());
    await reply(route);
  });
  return bodies;
}

test("sends the chosen amount, name and message, then opens the Sumopod checkout", async ({
  page,
}) => {
  const bodies = await mockDonate(page);
  await page.goto("/support");
  await expect(
    page.getByRole("heading", { level: 1, name: "Support MarkasUI" }),
  ).toBeVisible();
  const submit = page.getByRole("button", { name: "Buy me a coffee" });
  await expect(submit).toBeEnabled();

  await page.getByRole("button", { name: "Rp 50.000" }).click();
  await expect(page.getByRole("button", { name: "Rp 50.000" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByLabel("Amount", { exact: true })).toHaveValue(
    "50.000",
  );
  await page.getByLabel("Name").fill("  Rian ");
  await page.getByLabel("Message").fill("Keep going");
  await submit.click();

  await page.waitForURL(CHECKOUT);
  expect(bodies).toEqual([
    { amount: 50_000, name: "Rian", message: "Keep going", locale: "en" },
  ]);
});

test("formats a custom amount and blocks amounts outside the range", async ({
  page,
}) => {
  const bodies = await mockDonate(page);
  await page.goto("/support");
  const amount = page.getByLabel("Amount", { exact: true });
  await amount.fill("");
  await amount.pressSequentially("123456");
  await expect(amount).toHaveValue("123.456");
  await expect(page.locator("[data-preset][aria-pressed=true]")).toHaveCount(0);

  await amount.fill("5000");
  await page.getByRole("button", { name: "Buy me a coffee" }).click();
  await expect(
    page.getByText("Enter an amount from Rp 10.000 to Rp 5.000.000."),
  ).toBeVisible();
  await expect(amount).toHaveAttribute("aria-invalid", "true");
  await expect(amount).toBeFocused();
  expect(bodies).toEqual([]);
});

test("shows an error and allows a retry when the service fails, and sends one request per click", async ({
  page,
}) => {
  let calls = 0;
  await mockDonate(page, async (route) => {
    calls += 1;
    await new Promise((done) => setTimeout(done, 300));
    await route.fulfill({
      status: calls === 1 ? 429 : 502,
      json: { error: "x" },
    });
  });
  await page.goto("/support");
  const submit = page.getByRole("button", { name: "Buy me a coffee" });
  await submit.click();
  await page.locator("[data-support-form]").evaluate((form) => {
    (form as HTMLFormElement).requestSubmit();
    (form as HTMLFormElement).requestSubmit();
  });
  await expect(page.getByRole("alert")).toHaveText(
    "Too many attempts. Wait a minute and try again.",
  );
  expect(calls).toBe(1);

  await page.getByRole("button", { name: "Buy me a coffee" }).click();
  await expect(page.getByRole("alert")).toHaveText(
    "The payment page could not be opened. Try again in a moment.",
  );
  expect(calls).toBe(2);
});

test("ignores a checkout URL that is not a Sumopod checkout host", async ({
  page,
}) => {
  await mockDonate(page, (route) =>
    route.fulfill({ json: { url: "https://evil.example/pay" } }),
  );
  await page.goto("/support");
  await page.getByRole("button", { name: "Buy me a coffee" }).click();
  await expect(page.getByRole("alert")).toContainText("could not be opened");
  expect(new URL(page.url()).pathname).toBe("/support");
});

test("accepts the checkout.pymnt.app host used by Live payments", async ({
  page,
}) => {
  const live = "https://checkout.pymnt.app/payment-links/test";
  await page.route("https://checkout.pymnt.app/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Checkout</title>",
    }),
  );
  await mockDonate(page, (route) => route.fulfill({ json: { url: live } }));
  await page.goto("/support");
  await page.getByRole("button", { name: "Buy me a coffee" }).click();
  await page.waitForURL(live);
});

test("Indonesian page sends locale id", async ({ page }) => {
  const bodies = await mockDonate(page);
  await page.goto("/id/support");
  await expect(
    page.getByRole("heading", { level: 1, name: "Dukung MarkasUI" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Traktir kopi" }).click();
  await page.waitForURL(CHECKOUT);
  expect(bodies).toEqual([{ amount: 25_000, locale: "id" }]);
});

test("footer links to the support page", async ({ page }) => {
  await page.goto("/components");
  await expect(
    page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Buy me a coffee" }),
  ).toHaveAttribute("href", "/support");
  await page.goto("/id/components");
  await expect(
    page.getByRole("contentinfo").getByRole("link", { name: "Traktir kopi" }),
  ).toHaveAttribute("href", "/id/support");
});

/** The visible thanks message (the hidden ones stay in the DOM for the other states). */
const shown = (page: Page) =>
  page.locator("[data-support-status] [data-state]:visible");

test.describe("thanks page", () => {
  const status = (page: Page, value: string) =>
    page.route("**/api/donate/status?**", (route) =>
      route.fulfill({ json: { status: value } }),
    );

  test("says the payment was received once the webhook confirmed it", async ({
    page,
  }) => {
    await status(page, "completed");
    await page.goto(`/support/thanks?order=${ORDER}`);
    await expect(shown(page)).toHaveText(
      "Payment received. Thank you for the coffee.",
    );
  });

  test("keeps waiting while the payment is pending", async ({ page }) => {
    await page.clock.install();
    let calls = 0;
    await page.route("**/api/donate/status?**", (route) => {
      calls += 1;
      return route.fulfill({ json: { status: "pending" } });
    });
    await page.goto(`/id/support/thanks?order=${ORDER}`);
    await expect(shown(page)).toHaveText("Memeriksa pembayaran");
    // Five lookups 3 s apart; each timer starts after the previous lookup answered.
    for (let attempt = 1; attempt < 5; attempt++) {
      await expect.poll(() => calls).toBe(attempt);
      await page.clock.runFor(3_000);
    }
    await expect(shown(page)).toContainText(
      "Kami akan mengonfirmasi begitu pembayaran masuk",
    );
    expect(calls).toBe(5);
  });

  test("offers to try again after an expired payment", async ({ page }) => {
    await status(page, "expired");
    await page.goto(`/support/thanks?order=${ORDER}`);
    await expect(shown(page)).toContainText("expired or was not completed");
    await expect(page.getByRole("link", { name: "Try again" })).toHaveAttribute(
      "href",
      "/support",
    );
  });

  test("does not call the API without a valid order id", async ({ page }) => {
    let calls = 0;
    await page.route("**/api/donate/status?**", (route) => {
      calls += 1;
      return route.fulfill({ json: { status: "completed" } });
    });
    await page.goto("/support/thanks?order=<script>");
    await expect(shown(page)).toContainText(
      "We will confirm once the payment arrives",
    );
    expect(calls).toBe(0);
  });
});

test("thanks and cancel pages are not indexed, /support is in the sitemap", async ({
  page,
  request,
}) => {
  for (const path of [
    "/support/thanks",
    "/support/cancel",
    "/id/support/cancel",
  ]) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex",
    );
  }
  await expect(page.getByRole("link", { name: "Coba lagi" })).toHaveAttribute(
    "href",
    "/id/support",
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/support</loc>");
  expect(sitemap).toContain("/id/support</loc>");
  expect(sitemap).not.toContain("/support/thanks");
  expect(sitemap).not.toContain("/support/cancel");
});
