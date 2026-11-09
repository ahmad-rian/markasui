// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Button from "../../components/button/Button.astro";
import Modal from "../../components/modal/Modal.astro";
import Switch from "../../components/switch/Switch.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const parse = (html: string) => {
  const attributes = (tag: string) =>
    Object.fromEntries(
      [...tag.matchAll(/([\w-:]+)(?:="([^"]*)")?/g)]
        .slice(1)
        .map((match) => [match[1], match[2] ?? ""]),
    );
  return { html, attributes };
};

describe("Astro Button", () => {
  it("defaults to type=button, forwards attributes, and appends the user class", async () => {
    const html = await container.renderToString(Button, {
      props: { "aria-label": "Save draft" },
      slots: { default: "Save" },
    });
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-label="Save draft"');
    expect(html).toContain("bg-primary");
    expect(html).toContain(">Save</button>");

    const danger = await container.renderToString(Button, {
      props: { variant: "danger", size: "sm", type: "submit", class: "w-full" },
      slots: { default: "Delete" },
    });
    expect(danger).toContain('type="submit"');
    expect(danger).toMatch(/class="[^"]*bg-danger[^"]*h-8[^"]*w-full"/);
  });
});

describe("Astro Switch", () => {
  it("renders a native switch linked to its label with a generated id", async () => {
    const html = await container.renderToString(Switch, {
      props: { label: "Wi-Fi", name: "wifi", checked: true, class: "ml-1" },
    });
    const { attributes } = parse(html);
    const input = attributes(html.match(/<input[^>]*>/)![0]);
    expect(input.type).toBe("checkbox");
    expect(input.role).toBe("switch");
    expect(input.name).toBe("wifi");
    expect(input).toHaveProperty("checked");
    expect(input.id).toMatch(/^markas-switch-/);
    expect(input.class.endsWith("ml-1")).toBe(true);
    expect(html).toContain(`<label for="${input.id}"`);
  });

  it("keeps an explicit id and renders no label without one", async () => {
    const html = await container.renderToString(Switch, {
      props: { id: "beta", "aria-label": "Beta features", disabled: true },
    });
    expect(html).toContain('id="beta"');
    expect(html).toContain('aria-label="Beta features"');
    expect(html).toContain("disabled");
    expect(html).not.toContain("<label");
  });
});

describe("Astro Modal", () => {
  it("renders trigger, labelled dialog, footer, and the translated close label", async () => {
    const html = await container.renderToString(Modal, {
      props: {
        title: "Delete project?",
        closeLabel: "Tutup",
        id: "danger",
        class: "max-w-sm",
      },
      slots: {
        default: "Body text",
        trigger: "<button>Delete project</button>",
        footer: '<button type="submit">Cancel</button>',
      },
    });
    expect(html).toContain('data-markas-modal-trigger="danger"');
    expect(html).toContain('aria-labelledby="danger-title"');
    expect(html).toContain('<h2 id="danger-title"');
    expect(html).toContain('data-state="closed"');
    expect(html).toContain('aria-label="Tutup"');
    expect(html).toMatch(/<dialog[^>]*class="[^"]*max-w-sm"/);
    expect(html.match(/method="dialog"/g)).toHaveLength(2);
  });

  it("omits the trigger wrapper and footer when the slots are empty", async () => {
    const html = await container.renderToString(Modal, {
      props: { title: "Notice" },
      slots: { default: "Plain" },
    });
    expect(html).not.toContain("data-markas-modal-trigger");
    expect(html.match(/method="dialog"/g)).toHaveLength(1);
    expect(html).toContain('aria-label="Close"');
    expect(html).toMatch(/id="markas-modal-[\w-]+"/);
  });
});
