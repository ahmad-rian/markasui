// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import AvatarGroup from "../../components/avatar-group/AvatarGroup.astro";
import LetterSwap from "../../components/letter-swap/LetterSwap.astro";
import Marquee from "../../components/marquee/Marquee.astro";
import NumberTicker from "../../components/number-ticker/NumberTicker.astro";
import ScrollProgress from "../../components/scroll-progress/ScrollProgress.astro";
import SpotlightCard from "../../components/spotlight-card/SpotlightCard.astro";
import TextHighlighter from "../../components/text-highlighter/TextHighlighter.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const team = [
  { name: "Dewi Lestari", src: "/dewi.png" },
  { name: "Budi Santoso" },
  { name: "Siti Aminah" },
  { name: "John Carter" },
  { name: "Maya Putri" },
  { name: "Ana Lim" },
];

/** The opening tag of the first element that has this attribute or class. */
const tagWith = (html: string, needle: string) =>
  html.match(new RegExp(`<[a-z-]+[^>]*${needle}[^>]*>`))![0];

describe("Astro AvatarGroup", () => {
  it("names the group and each person, and collapses the rest into a chip", async () => {
    const html = await container.renderToString(AvatarGroup, {
      props: {
        items: team,
        max: 3,
        size: "lg",
        groupLabel: "Assignees",
        moreLabel: "{count} lainnya",
        class: "mt-2",
      },
    });
    expect(tagWith(html, 'role="group"')).toMatch(
      /aria-label="Assignees".*class="[^"]*items-center mt-2"/,
    );
    expect(html).toMatch(/<img src="\/dewi.png" alt="Dewi Lestari"/);
    expect(html).toMatch(/role="img" aria-label="Budi Santoso"[^>]*>BS</);
    expect(html).toContain('<span class="sr-only">3 lainnya</span>');
    expect(html).toContain('<span aria-hidden="true">+3</span>');
    expect(html).toContain("John Carter, Maya Putri, Ana Lim");
    expect(html.match(/size-12/g)).toHaveLength(4);
  });

  it("uses the English defaults and skips the chip when everyone fits", async () => {
    const html = await container.renderToString(AvatarGroup, {
      props: { items: team.slice(0, 2) },
    });
    expect(html).toContain('aria-label="Members"');
    expect(html).not.toContain("sr-only");
  });
});

describe("Astro LetterSwap", () => {
  it("reads the text once and hides the letters, with options for the script", async () => {
    const html = await container.renderToString(LetterSwap, {
      props: {
        text: "Docs",
        mode: "pingpong",
        direction: "down",
        stagger: 20,
        class: "ml-1",
      },
    });
    expect(html).toMatch(/^<markas-letter-swap class="contents"/);
    expect(html).toMatch(
      /data-mode="pingpong" data-direction="down" data-stagger="20" data-duration="400"/,
    );
    expect(html).toContain('<span class="sr-only">Docs</span>');
    expect(html.match(/data-letter/g)).toHaveLength(4);
    expect(html).toContain("absolute inset-x-0 bottom-full");
    expect(html).toMatch(/class="relative inline-flex overflow-hidden ml-1"/);
  });
});

describe("Astro Marquee", () => {
  it("renders the slot twice, the copy hidden and inert", async () => {
    const html = await container.renderToString(Marquee, {
      props: { vertical: true, reverse: true, duration: 10, class: "h-64" },
      slots: { default: "<span>Laravel</span>" },
    });
    expect(html).toMatch(/data-vertical data-reverse data-duration="10"/);
    expect(html).toMatch(
      /class="flex overflow-hidden flex-col mask-y-from-85% h-64"/,
    );
    expect(html.match(/<span>Laravel<\/span>/g)).toHaveLength(2);
    expect(html).toMatch(
      /<div aria-hidden="true" inert class="[^"]*min-h-full/,
    );
  });

  it("drops the fade and pause on hover when asked", async () => {
    const html = await container.renderToString(Marquee, {
      props: { fade: false, pauseOnHover: false },
      slots: { default: "Vue" },
    });
    expect(html).not.toContain("mask-x");
    expect(html).not.toContain("data-pause-on-hover");
  });
});

describe("Astro NumberTicker", () => {
  it("renders the final formatted value on the server", async () => {
    const html = await container.renderToString(NumberTicker, {
      props: {
        value: 1500,
        from: 9000,
        locale: "id-ID",
        prefix: "Rp",
        class: "text-2xl",
      },
    });
    expect(html).toContain('<span class="sr-only">Rp1.500</span>');
    expect(html.match(/Rp1\.500/g)).toHaveLength(3);
    expect(html).toMatch(/data-value="1500" data-from="9000"/);
    expect(html).toContain('class="inline-grid tabular-nums text-2xl"');
  });
});

describe("Astro ScrollProgress", () => {
  it("is a hidden bar with the target for the script", async () => {
    const page = await container.renderToString(ScrollProgress, {
      props: { class: "z-40" },
    });
    expect(page).toContain('data-target="page"');
    expect(page).toMatch(
      /aria-hidden="true" class="[^"]*fixed[^"]*h-0.5 z-40"/,
    );
    expect(page).toContain('style="transform: scaleX(0)"');

    const parent = await container.renderToString(ScrollProgress, {
      props: { target: "parent", color: "success", size: "lg" },
    });
    expect(parent).toContain('data-target="parent"');
    expect(parent).toMatch(/sticky top-0 left-0 h-1.5/);
    expect(parent).toContain("bg-success");
  });
});

describe("Astro SpotlightCard", () => {
  it("renders content between two hidden light layers", async () => {
    const html = await container.renderToString(SpotlightCard, {
      props: { color: "success", class: "w-64", id: "card" },
      slots: { default: "<p>Content</p>" },
    });
    expect(tagWith(html, "data-markas-spotlight-card")).toMatch(
      /id="card".*class="[^"]*\[--spot-color:var\(--color-success\)\] w-64"/,
    );
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(2);
    expect(html).toContain('<div class="relative"><p>Content</p></div>');
  });
});

describe("Astro TextHighlighter", () => {
  it("renders the chosen tag with state, direction, timing, and the user class", async () => {
    const html = await container.renderToString(TextHighlighter, {
      props: {
        as: "strong",
        trigger: "manual",
        active: true,
        variant: "marker",
        color: "primary",
        duration: 400,
        delay: 100,
        class: "font-bold",
      },
      slots: { default: "Key" },
    });
    const mark = html.match(/<strong[^>]*>/)![0];
    expect(mark).toContain('data-state="active"');
    expect(mark).toContain('data-direction="ltr"');
    expect(mark).toContain('data-trigger="manual"');
    expect(mark).toContain(
      'style="transition-duration: 400ms; transition-delay: 100ms"',
    );
    expect(mark).toMatch(/\[--markas-th-c:var\(--color-primary\)\] font-bold"/);
    expect(html).toContain(">Key</strong></markas-text-highlighter>");
  });

  it("falls back to span for an invalid tag and passes view options", async () => {
    const html = await container.renderToString(TextHighlighter, {
      props: { as: "<script>", once: false, threshold: 0.8 },
      slots: { default: "Seen" },
    });
    expect(html).toContain('data-threshold="0.8"');
    expect(html).not.toContain("data-once");
    expect(html).toMatch(/<span data-state="inactive"[^>]*>Seen<\/span>/);
  });
});
