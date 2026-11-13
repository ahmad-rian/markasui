// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import AlertDialog from "../../components/alert-dialog/AlertDialog.astro";
import Drawer from "../../components/drawer/Drawer.astro";
import Tooltip from "../../components/tooltip/Tooltip.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

describe("Astro AlertDialog", () => {
  it("renders trigger, alertdialog labelling, variant, and translated labels", async () => {
    const html = await container.renderToString(AlertDialog, {
      props: {
        title: "Delete account?",
        variant: "danger",
        cancelLabel: "Batal",
        actionLabel: "Hapus",
        id: "danger",
        class: "max-w-sm",
      },
      slots: {
        default: "This cannot be undone.",
        trigger: "<button>Delete account</button>",
      },
    });
    expect(html).toContain('data-markas-alert-dialog-trigger="danger"');
    expect(html).toContain('role="alertdialog"');
    expect(html).toContain('aria-labelledby="danger-title"');
    expect(html).toContain('aria-describedby="danger-description"');
    expect(html).toContain('<h2 id="danger-title"');
    expect(html).toMatch(/<dialog[^>]*class="[^"]*max-w-sm"/);
    expect(html).toMatch(/value="cancel"[^>]*>\s*Batal\s*</);
    expect(html).toMatch(/value="action"[^>]*class="[^"]*bg-danger[^"]*"/);
    expect(html).toMatch(/>\s*Hapus\s*</);
  });

  it("uses default labels, a generated id, and no trigger wrapper when empty", async () => {
    const html = await container.renderToString(AlertDialog, {
      props: { title: "Publish?" },
      slots: { default: "Body" },
    });
    expect(html).not.toContain("data-markas-alert-dialog-trigger");
    expect(html).toMatch(/id="markas-alert-dialog-[\w-]+"/);
    expect(html).toMatch(/>\s*Cancel\s*</);
    expect(html).toMatch(/>\s*Continue\s*</);
    expect(html).toContain("bg-primary");
  });
});

describe("Astro Drawer", () => {
  it("renders trigger, labelled dialog on the right, footer, and close label", async () => {
    const html = await container.renderToString(Drawer, {
      props: {
        title: "Filter",
        closeLabel: "Tutup",
        id: "f",
        class: "max-w-md",
      },
      slots: {
        default: "Content",
        trigger: "<button>Open</button>",
        footer: '<button type="submit">OK</button>',
      },
    });
    expect(html).toContain('data-markas-drawer-trigger="f"');
    expect(html).toContain('aria-labelledby="f-title"');
    expect(html).toContain('aria-label="Tutup"');
    expect(html).toMatch(/<dialog[^>]*class="[^"]*right-0[^"]*max-w-md"/);
    expect(html.match(/method="dialog"/g)).toHaveLength(2);
  });

  it("side left, generated id, default close label, no footer when empty", async () => {
    const html = await container.renderToString(Drawer, {
      props: { title: "Menu", side: "left" },
      slots: { default: "Links" },
    });
    expect(html).toMatch(/<dialog[^>]*class="[^"]*left-0[^"]*border-r/);
    expect(html).toMatch(/id="markas-drawer-[\w-]+"/);
    expect(html).toContain('aria-label="Close"');
    expect(html).not.toContain("data-markas-drawer-trigger");
    expect(html.match(/method="dialog"/g)).toHaveLength(1);
  });
});

describe("Astro Tooltip", () => {
  it("renders a manual popover tooltip after the trigger with the user class on the root", async () => {
    const html = await container.renderToString(Tooltip, {
      props: { content: "Copy link", class: "ms-2", "data-testid": "root" },
      slots: { default: "<button>Copy</button>" },
    });
    expect(html).toContain('<markas-tooltip class="contents" data-side="top"');
    expect(html).toMatch(/<span class="inline-flex ms-2" data-testid="root">/);
    expect(html).toMatch(
      /<button>Copy<\/button><span id="markas-tooltip-[\w-]+" popover="manual" role="tooltip" data-state="closed"/,
    );
    expect(html).toContain(">Copy link</span>");
  });

  it("keeps an explicit id on the tooltip and passes the side", async () => {
    const html = await container.renderToString(Tooltip, {
      props: { content: "Hint", side: "bottom", id: "hint" },
      slots: { default: "<button>Help</button>" },
    });
    expect(html).toContain('data-side="bottom"');
    expect(html).toContain('<span id="hint" popover="manual"');
    expect(html.match(/id="/g)).toHaveLength(1);
  });
});
