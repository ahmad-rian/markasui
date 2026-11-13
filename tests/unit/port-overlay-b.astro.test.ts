// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import ContextMenu from "../../components/context-menu/ContextMenu.astro";
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const menuItems = [
  { label: "Edit", value: "edit" },
  { label: "Docs", href: "javascript:alert(1)" },
  { label: "Archive", value: "archive", disabled: true },
  { separator: true as const },
  { label: "Delete", danger: true },
];

describe("Astro DropdownMenu", () => {
  it("links trigger and menu with an explicit id and puts the class on the root", async () => {
    const html = await container.renderToString(DropdownMenu, {
      props: { items: menuItems, id: "actions", class: "ml-2" },
    });
    expect(html).toMatch(/^<div class="inline-block ml-2"/);
    expect(html).toContain('id="actions-trigger"');
    expect(html).toContain('popovertarget="actions"');
    expect(html).toContain('aria-controls="actions"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toMatch(
      /<div id="actions" popover="auto" role="menu" aria-labelledby="actions-trigger"/,
    );
    expect(html).toContain(">Options<");
    expect(html).toMatch(/<a href="#" role="menuitem"[^>]*data-value="Docs"/);
    expect(html).toMatch(/<button[^>]*disabled[^>]*data-value="archive"/);
    expect(html).toMatch(/data-value="Delete"[^>]*class="[^"]*text-danger/);
    expect(html.match(/role="separator"/g)).toHaveLength(1);
    expect(html.match(/role="menuitem"/g)).toHaveLength(4);
  });

  it("generates an id and replaces the label with the trigger slot", async () => {
    const html = await container.renderToString(DropdownMenu, {
      props: { items: menuItems },
      slots: { trigger: "<span>Project</span>" },
    });
    const id = html.match(/role="menu"/) && html.match(/<div id="([^"]+)"/)![1];
    expect(id).toMatch(/^markas-dropdown-menu-/);
    expect(html).toContain(`popovertarget="${id}"`);
    expect(html).toContain("<span>Project</span>");
    expect(html).not.toContain(">Options<");
  });
});

describe("Astro ContextMenu", () => {
  it("describes the area with the hint and forwards attributes and class to it", async () => {
    const html = await container.renderToString(ContextMenu, {
      props: {
        items: menuItems,
        id: "files",
        class: "mt-1",
        "aria-label": "Report.pdf",
        menuLabel: "Menu konteks",
        hintLabel: "Tekan Shift+F10",
      },
      slots: { default: "<p>Right-click here</p>" },
    });
    const area = html.match(/<div aria-label="Report.pdf"[^>]*>/)![0];
    expect(area).toContain('role="group"');
    expect(area).toContain('tabindex="0"');
    expect(area).toContain('aria-describedby="files-hint"');
    expect(area).toContain('data-markas-context-menu="files"');
    expect(area).toMatch(/class="[^"]*mt-1"/);
    expect(html).toContain(
      '<span id="files-hint" class="sr-only">Tekan Shift+F10</span>',
    );
    expect(html).toMatch(
      /<div id="files" popover="auto" role="menu" aria-label="Menu konteks"/,
    );
    expect(html).toContain("<p>Right-click here</p>");
    expect(html).toMatch(/<a href="#" role="menuitem"/);
  });

  it("uses English labels and a generated id by default", async () => {
    const html = await container.renderToString(ContextMenu, {
      props: { items: menuItems },
      slots: { default: "Plain" },
    });
    const id = html.match(/data-markas-context-menu="([^"]+)"/)![1];
    expect(id).toMatch(/^markas-context-menu-/);
    expect(html).toContain(
      `<span id="${id}-hint" class="sr-only">Press Shift+F10 to open the context menu</span>`,
    );
    expect(html).toContain('aria-label="Context menu"');
  });
});
