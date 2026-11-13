// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Command from "../../components/command/Command.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const commandItems = [
  { group: "Suggestions", label: "Calendar", value: "calendar" },
  { group: "Settings", label: "Billing", shortcut: "Ctrl+B" },
  { group: "Suggestions", label: "Calculator" },
  { group: "Docs", label: "Bad link", href: "javascript:alert(1)" },
];

describe("Astro Command", () => {
  it("renders the combobox, grouped options, and the first highlighted option", async () => {
    const html = await container.renderToString(Command, {
      props: {
        items: commandItems,
        id: "palette",
        hotkey: true,
        searchLabel: "Cari",
        class: "max-w-sm",
      },
      slots: { trigger: "<button>Open</button>" },
    });
    expect(html).toContain("data-markas-command-trigger");
    expect(html).toContain("data-hotkey");
    expect(html).toMatch(/<dialog[^>]*class="[^"]*max-w-sm"/);
    expect(html).toContain('aria-label="Command palette"');
    expect(html).toContain('aria-label="Cari"');
    expect(html).toContain('aria-controls="palette-list"');
    expect(html).toContain('aria-activedescendant="palette-option-0"');
    expect(html).toContain('aria-expanded="true"');
    // Groups follow first appearance; Calculator (index 2) joins Suggestions.
    const order = [...html.matchAll(/id="(palette-option-\d)"/g)].map(
      (m) => m[1],
    );
    expect(order).toEqual([
      "palette-option-0",
      "palette-option-2",
      "palette-option-1",
      "palette-option-3",
    ]);
    expect(html.match(/role="group"/g)).toHaveLength(3);
    expect(html).toContain('data-value="calendar"');
    expect(html).toContain('data-value="Calculator"');
    expect(html).toContain("Ctrl+B</kbd>");
    expect(html).toMatch(/<a[^>]*href="#"[^>]*id="palette-option-3"/);
    expect(html).toMatch(/<p[^>]*hidden[^>]*>No results found\.<\/p>/);
  });

  it("generates an id, omits the trigger, and uses English labels", async () => {
    const html = await container.renderToString(Command, {
      props: { items: [{ group: "A", label: "One" }] },
    });
    expect(html).not.toContain("data-markas-command-trigger");
    expect(html).not.toContain("data-hotkey");
    expect(html).toMatch(/id="markas-command-[\w-]+"/);
    expect(html).toContain('aria-label="Search commands"');
    expect(html).toContain('placeholder="Type a command or search..."');
  });
});
