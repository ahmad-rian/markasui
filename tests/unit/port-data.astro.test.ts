// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Avatar from "../../components/avatar/Avatar.astro";
import Card from "../../components/card/Card.astro";
import CodeBlock from "../../components/code-block/CodeBlock.astro";
import Kbd from "../../components/kbd/Kbd.astro";
import ScrollArea from "../../components/scroll-area/ScrollArea.astro";
import Separator from "../../components/separator/Separator.astro";
import Table from "../../components/table/Table.astro";
import CarouselHarness from "./fixtures/PortDataCarouselHarness.astro";
import TableHarness from "./fixtures/PortDataTableHarness.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const render = (
  component: Parameters<AstroContainer["renderToString"]>[0],
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
) => container.renderToString(component, { props, slots: slots as never });

describe("Astro Kbd", () => {
  it("renders a single keycap with the user class last", async () => {
    const html = await render(
      Kbd,
      { size: "sm", class: "ml-auto" },
      {
        default: "Esc",
      },
    );
    expect(html).toMatch(/<kbd class="[^"]*h-5[^"]*ml-auto">Esc<\/kbd>/);
  });

  it("renders keys as nested keycaps without whitespace", async () => {
    const html = await render(Kbd, {
      keys: ["G", "N"],
      separator: "then",
      "aria-hidden": "true",
    });
    expect(html).toContain('aria-hidden="true"');
    expect(html.match(/<kbd/g)).toHaveLength(3);
    expect(html.replace(/<[^>]+>/g, "")).toBe("GthenN");
  });
});

describe("Astro Separator", () => {
  it("is decorative by default", async () => {
    const html = await render(Separator, { class: "my-4" });
    expect(html).toContain('role="none"');
    expect(html).not.toContain("aria-orientation");
    expect(html).toMatch(/class="h-px[^"]*my-4"/);
  });

  it("semantic with a label is a named separator", async () => {
    const html = await render(Separator, {
      decorative: false,
      orientation: "vertical",
      label: "or",
    });
    expect(html).toContain('role="separator"');
    expect(html).toContain('aria-orientation="vertical"');
    expect(html).toContain('aria-label="or"');
    expect(html).toContain("flex-col");
    expect(html).toContain("<span>or</span>");
  });
});

describe("Astro ScrollArea", () => {
  it("is a focusable region with a translatable label", async () => {
    const html = await render(ScrollArea, {}, { default: "Body" });
    expect(html).toContain('role="region"');
    expect(html).toContain('aria-label="Scrollable content"');
    expect(html).toContain('tabindex="0"');
    expect(html).toContain('data-orientation="vertical"');

    const custom = await render(ScrollArea, {
      label: "Konten",
      orientation: "horizontal",
      class: "max-h-40",
    });
    expect(custom).toContain('aria-label="Konten"');
    expect(custom).toMatch(/class="[^"]*overflow-x-auto[^"]*max-h-40"/);
  });
});

describe("Astro Avatar", () => {
  it("renders the image with a hidden initials fallback", async () => {
    const html = await render(Avatar, {
      name: "Dewi Lestari",
      src: "/dewi.png",
      size: "lg",
    });
    expect(html).toMatch(/<img[^>]*alt="Dewi Lestari"[^>]*data-markas-avatar/);
    expect(html).toMatch(/<span[^>]*hidden[^>]*>DL<\/span>/);
    expect(html).toContain('aria-label="Dewi Lestari"');
  });

  it("shows decorative initials without an image", async () => {
    const html = await render(Avatar, {
      name: "Budi Santoso",
      alt: "",
      class: "ring-2",
    });
    expect(html).not.toContain("<img");
    expect(html).not.toMatch(/\shidden[\s>]/);
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain('role="img"');
    expect(html).toMatch(/class="[^"]*ring-2">BS<\/span>/);
  });
});

describe("Astro Card", () => {
  it("renders header, body, and footer", async () => {
    const html = await render(
      Card,
      { title: "Pro plan", description: "For teams", class: "max-w-sm" },
      { default: "Body text", footer: "<button>Choose</button>" },
    );
    expect(html).toMatch(/<article class="[^"]*max-w-sm"/);
    expect(html).toContain(">Pro plan</h3>");
    expect(html).toContain(">For teams</p>");
    expect(html).toContain("Body text");
    expect(html).toContain("<button>Choose</button>");
  });

  it("omits empty parts", async () => {
    const html = await render(Card);
    expect(html).not.toContain("<header");
    expect(html).not.toContain("<div");
  });
});

describe("Astro Table", () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "total", label: "Total", align: "right" },
  ];
  const rows = [
    { name: "Budi", status: "Paid", total: "$10" },
    { name: "Siti", status: null, total: "$20" },
  ];

  it("renders a named region with styles, footer, and custom cells", async () => {
    const html = await render(TableHarness);
    expect(html).toContain('aria-label="Orders"');
    expect(html).toMatch(/class="[^"]*rounded-xl mt-2"/);
    expect(html).toContain('<caption class="sr-only">');
    expect(html).toContain("<strong>Paid</strong>");
    expect(html).toContain("<strong>None</strong>");
    expect(html).toContain("even:bg-subtle/40");
    expect(html).toContain("border-l border-line");
    expect(html).toMatch(/<tfoot>/);
    expect(html.match(/text-right/g)).toHaveLength(4);
  });

  it("falls back to Table, plain values, and square corners", async () => {
    const html = await render(Table, { columns, rows, square: true });
    expect(html).toContain('aria-label="Table"');
    expect(html).not.toContain("rounded-xl");
    expect(html).not.toContain("<caption");
    expect(html).toContain(">Paid</td>");
  });
});

describe("Astro CodeBlock", () => {
  it("renders numbered lines and a labelled copy button", async () => {
    const html = await render(CodeBlock, {
      code: "a\nb\n",
      title: "x.ts",
      showLineNumbers: true,
      copyLabel: "Salin",
      copiedLabel: "Tersalin",
    });
    expect(html).toContain(">x.ts</span>");
    expect(html).toContain('data-copy-label="Salin"');
    expect(html).toContain('data-copied-label="Tersalin"');
    expect(html).toContain('data-state="idle"');
    expect(html).toContain('<span aria-live="polite">Salin</span>');
    expect(html.match(/min-h-6 whitespace-pre/g)).toHaveLength(2);
    expect(html.match(/select-none/g)).toHaveLength(2);
  });
});

describe("Astro Carousel", () => {
  it("renders labelled slides, dots, and the initial button state", async () => {
    const html = await render(CarouselHarness, {
      label: "Tour",
      showDots: true,
      id: "tour",
      nextLabel: "Berikutnya",
      slideLabel: "Slide {index} dari {total}",
    });
    expect(html).toContain('aria-roledescription="carousel"');
    expect(html).toContain('aria-label="Tour"');
    expect(html).toContain('id="tour-viewport"');
    expect(html).toContain('aria-label="Slide 2 dari 3"');
    expect(html).toContain("<p>2. Share</p>");
    expect(html.match(/data-dot=/g)).toHaveLength(3);
    expect(html).toContain('aria-label="Go to slide 1"');
    expect(html.match(/aria-current="true"/g)).toHaveLength(1);
    expect(html).toContain('aria-label="Berikutnya"');
    expect(html).toMatch(/aria-label="Previous slide"[^>]*disabled/);
  });

  it("disables next for a single slide and hides dots by default", async () => {
    const html = await render(CarouselHarness, { items: ["Only"] });
    expect(html).not.toContain("data-dot=");
    expect(html).toMatch(/aria-label="Next slide"[^>]*disabled/);
    expect(html).toMatch(/id="markas-carousel-[\w-]+"/);
  });
});
