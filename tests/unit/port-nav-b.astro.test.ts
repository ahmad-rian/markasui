// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Pagination from "../../components/pagination/Pagination.astro";
import Tabs from "../../components/tabs/Tabs.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const items = [
  { value: "account", label: "Account" },
  { value: "password", label: "Password" },
];

describe("Astro Tabs", () => {
  it("renders linked tabs and slot panels with a generated id", async () => {
    const html = await container.renderToString(Tabs, {
      props: { items, class: "mt-2" },
      slots: { account: "<strong>Account text</strong>", password: "Pw" },
    });
    const id = html.match(/<div id="(markas-tabs-[^"]+)"/)![1];
    expect(html).toMatch(new RegExp(`id="${id}" class="w-full mt-2"`));
    expect(html).toContain(`aria-controls="${id}-panel-account"`);
    expect(html).toMatch(
      /id="[^"]+-tab-account"[^>]*aria-selected="true"[^>]*tabindex="0"/,
    );
    expect(html).toMatch(/aria-selected="false"[^>]*tabindex="-1"/);
    expect(html).toContain("<strong>Account text</strong>");
    expect(html).toMatch(/id="[^"]+-panel-password"[^>]*hidden/);
    expect(html).toContain('data-markas-tab="password"');
  });

  it("keeps an explicit id and honours defaultValue", async () => {
    const html = await container.renderToString(Tabs, {
      props: { items, id: "plans", defaultValue: "password" },
      slots: { account: "A", password: "B" },
    });
    expect(html).toMatch(/id="plans-tab-password"[^>]*aria-selected="true"/);
    expect(html).toMatch(/id="plans-panel-account"[^>]*hidden/);
    expect(html).not.toMatch(/id="plans-panel-password"[^>]*hidden/);
  });
});

describe("Astro Pagination", () => {
  it("marks the current page and builds prev and next links", async () => {
    const html = await container.renderToString(Pagination, {
      props: { page: 5, total: 10, href: "?p={page}", class: "mt-4" },
    });
    expect(html).toContain('aria-label="Pagination"');
    expect(html).toContain('class="@container mt-4"');
    expect(html).toMatch(/href="\?p=5" aria-current="page"/);
    expect(html).toMatch(/href="\?p=4" rel="prev"/);
    expect(html).toMatch(/href="\?p=6" rel="next"/);
    const pages = [...html.matchAll(/data-state="[a-z]+"[^>]*>(\d+)</g)].map(
      (match) => match[1],
    );
    expect(pages).toEqual(["1", "4", "5", "6", "10"]);
    expect(html.match(/aria-hidden="true">…/g)).toHaveLength(2);
  });

  it("disables the ends, translates labels, and blocks unsafe hrefs", async () => {
    const html = await container.renderToString(Pagination, {
      props: {
        page: 1,
        total: 1,
        href: "javascript:alert({page})",
        navLabel: "Navigasi halaman",
        previousLabel: "Sebelumnya",
        nextLabel: "Berikutnya",
      },
    });
    expect(html).toContain('aria-label="Navigasi halaman"');
    expect(html.match(/aria-disabled="true"/g)).toHaveLength(2);
    expect(html).toContain("Sebelumnya");
    expect(html).toContain("Berikutnya");
    expect(html).toContain('href="#"');
  });
});
