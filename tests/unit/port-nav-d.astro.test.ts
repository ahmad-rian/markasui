// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Sidebar from "../../components/sidebar/Sidebar.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const sections = [
  {
    items: [
      { label: "Home", href: "/", icon: "M3 3h18", active: true },
      { label: "Danger", href: "javascript:alert(1)" },
      { label: "Locked", href: "/locked", disabled: true },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Projects",
        icon: "M3 3h18",
        children: [
          { label: "Mobile app", href: "/projects/mobile", active: true },
        ],
      },
    ],
  },
];

describe("Astro Sidebar", () => {
  it("renders both copies, ids, sanitized links, and user attributes on the root", async () => {
    const html = await container.renderToString(Sidebar, {
      props: { sections, id: "app", class: "h-96", "data-testid": "shell" },
      slots: {
        header: '<button popovertarget="ws">Brand</button><div id="ws"></div>',
        default: "<main>Page</main>",
      },
    });
    expect(html).toMatch(
      /<div id="app" data-markas-sidebar class="[^"]*@container[^"]*h-96"/,
    );
    expect(html).toContain('data-testid="shell"');
    expect(html).toContain('<aside id="app-aside" data-state="expanded"');
    expect(html).toContain('id="app-dialog" aria-label="Sidebar"');
    expect(html.match(/<nav aria-label="Sidebar"/g)).toHaveLength(2);
    expect(html).toContain('href="/" aria-current="page"');
    expect(html).not.toContain("javascript:");
    expect(html).toContain('role="link" aria-disabled="true"');
    expect(html).toContain('aria-label="Workspace"');
    // Header renders twice; the dialog copy gets m- ids.
    expect(html).toContain('popovertarget="ws"');
    expect(html).toContain('popovertarget="m-ws"');
    expect(html).toContain('id="m-ws"');
    // The group holding the active page starts open in both copies.
    expect(html).toContain('aria-controls="app-d-g1-0"');
    expect(html).toContain('id="app-m-g1-0" data-state="open"');
    expect(html).toContain('aria-expanded="true" aria-controls="app-d-g1-0"');
    expect(html).toContain("<main>Page</main>");
    expect(html).not.toContain("border-t border-line px-4 py-3");
  });

  it("starts in the rail, generates an id, and accepts label overrides", async () => {
    const html = await container.renderToString(Sidebar, {
      props: {
        sections,
        collapsed: true,
        navLabel: "Navigasi samping",
        expandLabel: "Bentangkan sidebar",
        collapseLabel: "Ciutkan sidebar",
        openLabel: "Buka sidebar",
        closeLabel: "Tutup sidebar",
        variant: "floating",
        breakpoint: "lg",
      },
      slots: { footer: "Profile" },
    });
    const id = html.match(/id="(markas-sidebar-[\w-]{8})"/)?.[1];
    expect(id).toBeDefined();
    expect(html).toContain(`<aside id="${id}-aside" data-state="collapsed"`);
    expect(html).toContain("m-2 rounded-xl border border-line @4xl:flex");
    expect(html).toContain(
      'aria-label="Bentangkan sidebar" aria-expanded="false"',
    );
    expect(html).toContain('data-collapse-label="Ciutkan sidebar"');
    expect(html).toContain('aria-label="Buka sidebar" aria-haspopup="dialog"');
    expect(html).toContain('aria-label="Tutup sidebar"');
    expect(html).toContain('<nav aria-label="Navigasi samping"');
    expect(html.match(/Profile/g)).toHaveLength(2);
  });
});
