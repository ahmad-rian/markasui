// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Accordion from "../../components/accordion/Accordion.astro";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.astro";
import Collapsible from "../../components/collapsible/Collapsible.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const tags = (html: string, tag: string) =>
  html.match(new RegExp(`<${tag}\\b[^>]*>`, "g")) ?? [];

describe("Astro Accordion", () => {
  const items = [
    { value: "a", title: "First", content: "Alpha" },
    { value: "b", title: "Second" },
    { value: "c", title: "Third", content: "Gamma" },
  ];

  it("single: shared generated name, first default only, slot content, user class", async () => {
    const html = await container.renderToString(Accordion, {
      props: { items, defaultValue: ["b", "c"], class: "px-4" },
      slots: { b: "<strong>Rich beta</strong>" },
    });
    const details = tags(html, "details");
    expect(details).toHaveLength(3);
    const name = details[0]!.match(/name="([^"]+)"/)![1]!;
    expect(name).toMatch(/^markas-accordion-/);
    details.forEach((tag) => expect(tag).toContain(`name="${name}"`));
    expect(details.map((tag) => /\sopen\b/.test(tag))).toEqual([
      false,
      true,
      false,
    ]);
    expect(html).toContain("<strong>Rich beta</strong>");
    expect(html).toContain("Alpha");
    expect(html).toMatch(/<div class="[^"]*divide-y[^"]*px-4"/);
  });

  it("multiple: no name and every default value opens", async () => {
    const html = await container.renderToString(Accordion, {
      props: { items, type: "multiple", defaultValue: ["a", "c"] },
    });
    const details = tags(html, "details");
    details.forEach((tag) => expect(tag).not.toContain("name="));
    expect(details.map((tag) => /\sopen\b/.test(tag))).toEqual([
      true,
      false,
      true,
    ]);
  });
});

describe("Astro Collapsible", () => {
  it("renders closed with a title, forwards attributes, and appends the user class", async () => {
    const html = await container.renderToString(Collapsible, {
      props: { title: "Show details", class: "mt-2", id: "order" },
      slots: { default: "Body" },
    });
    const details = tags(html, "details")[0]!;
    expect(details).not.toMatch(/\sopen\b/);
    expect(details).toContain('id="order"');
    expect(details).toMatch(/class="group w-full mt-2"/);
    expect(html).toContain("<span>Show details</span>");
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("Body</div>");
  });

  it("starts open and lets the title slot replace the title", async () => {
    const html = await container.renderToString(Collapsible, {
      props: { title: "Plain", open: true },
      slots: { title: "Show <strong>3</strong> more", default: "x" },
    });
    expect(tags(html, "details")[0]).toMatch(/\sopen\b/);
    expect(html).toContain("<span>Show <strong>3</strong> more</span>");
    expect(html).not.toContain("Plain");
  });
});

describe("Astro Breadcrumb", () => {
  it("links ancestors, marks the current page, and neutralises unsafe hrefs", async () => {
    const html = await container.renderToString(Breadcrumb, {
      props: {
        class: "mb-4",
        items: [
          { label: "Home", href: "/" },
          { label: "Docs" },
          { label: "Bad", href: "javascript:alert(1)" },
          { label: "Current", href: "/current" },
        ],
      },
    });
    expect(tags(html, "nav")[0]).toContain('aria-label="Breadcrumb"');
    expect(tags(html, "nav")[0]).toContain('class="mb-4"');
    expect(tags(html, "li")).toHaveLength(4);
    expect(
      tags(html, "a").map((tag) => tag.match(/href="([^"]*)"/)![1]),
    ).toEqual(["/", "#"]);
    expect(html).toMatch(
      /<span aria-current="page"[^>]*>\s*Current\s*<\/span>/,
    );
    expect(html).not.toContain("/current");
    expect(tags(html, "svg")).toHaveLength(3);
  });

  it("translates the nav label", async () => {
    const html = await container.renderToString(Breadcrumb, {
      props: { items: [{ label: "Beranda" }], navLabel: "Jejak navigasi" },
    });
    expect(html).toContain('aria-label="Jejak navigasi"');
    expect(tags(html, "svg")).toHaveLength(0);
  });
});
