// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Navbar from "../../components/navbar/Navbar.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const links = [
  { label: "Docs", href: "/docs", active: true },
  {
    label: "Products",
    children: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "Track usage",
        icon: "M3 3v18h18",
      },
      { label: "Danger", href: "javascript:alert(1)" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

describe("Astro Navbar", () => {
  it("renders slots, variant, sticky, user class, and attributes on the header", async () => {
    const html = await container.renderToString(Navbar, {
      props: {
        links,
        id: "site",
        variant: "floating",
        sticky: true,
        class: "mx-auto",
        "data-scrolled": "false",
      },
      slots: {
        brand: '<a href="/">Acme</a>',
        actions: '<button type="button">Sign in</button>',
      },
    });
    expect(html).toMatch(/<header[^>]*id="site"/);
    expect(html).toMatch(/<header[^>]*data-scrolled="false"/);
    expect(html).toMatch(
      /<header[^>]*class="[^"]*shadow-overlay[^"]*sticky z-40 mx-auto"/,
    );
    expect(html).toContain('<a href="/">Acme</a>');
    expect(html).toContain('<button type="button">Sign in</button>');
    expect(html).toContain('aria-controls="site-menu"');
    expect(html).toContain('aria-label="Menu"');
    expect(html).toMatch(/<div id="site-menu" data-state="closed" hidden/);
  });

  it("builds dropdowns, the active link, and neutralises unsafe hrefs", async () => {
    const html = await container.renderToString(Navbar, {
      props: { links, id: "site" },
    });
    expect(html).toContain('popovertarget="site-panel-1"');
    expect(html).toContain('aria-controls="site-panel-1"');
    expect(html).toMatch(/<div id="site-panel-1" popover="auto"/);
    expect(html).toContain('d="M3 3v18h18"');
    expect(html).toContain("Track usage");
    expect(html).toMatch(/href="\/docs" aria-current="page"/);
    expect(html).not.toContain("javascript:");
    expect(html).toContain("<summary");
  });

  it("generates an id, translates labels, and omits the brand wrapper", async () => {
    const html = await container.renderToString(Navbar, {
      props: {
        menuLabel: "Buka",
        navLabel: "Utama",
        mobileNavLabel: "Utama seluler",
      },
    });
    expect(html).toMatch(/<header[^>]*id="markas-navbar-[\w-]+"/);
    expect(html).toContain('aria-label="Buka"');
    expect(html).toContain('aria-label="Utama"');
    expect(html).toContain('aria-label="Utama seluler"');
    expect(html).not.toContain("font-semibold");
    expect(html).toContain("border-b border-line bg-surface");
  });
});
