// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import TextRotate from "../../components/text-rotate/TextRotate.astro";
import TextScramble from "../../components/text-scramble/TextScramble.astro";
import TypingText from "../../components/typing-text/TypingText.astro";
import UnderlineLink from "../../components/underline-link/UnderlineLink.astro";
import VariableWeightText from "../../components/variable-weight-text/VariableWeightText.astro";
import VerticalCutReveal from "../../components/vertical-cut-reveal/VerticalCutReveal.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const tag = (html: string, name: string) =>
  html.match(new RegExp(`<${name}[^>]*>`))?.[0] ?? "";

const units = (html: string) =>
  [...html.matchAll(/data-unit="" class="[^"]*">([^<]*)</g)].map(
    (match) => match[1],
  );

describe("Astro TextRotate", () => {
  it("renders a plain span root with the first word split into units", async () => {
    const html = await container.renderToString(TextRotate, {
      props: {
        words: ["Laravel", "React"],
        from: "last",
        interval: 2000,
        class: "text-muted",
      },
    });
    expect(html.startsWith("<span")).toBe(true);
    expect(tag(html, "span")).toMatch(
      /class="[^"]*inline-flex[^"]*text-muted"/,
    );
    // The custom element is the visually hidden copy of every word.
    const reader = tag(html, "markas-text-rotate");
    expect(reader).toContain('class="sr-only"');
    expect(reader).toContain('data-from="last"');
    expect(reader).toContain('data-interval="2000"');
    expect(reader).toContain("data-words=");
    expect(html).toContain(">Laravel, React</markas-text-rotate>");
    expect(units(html)).toEqual(Array.from("Laravel"));
  });

  it("keeps the space after each word when split by words", async () => {
    const html = await container.renderToString(TextRotate, {
      props: { words: ["with confidence", "faster"], split: "words" },
    });
    expect(units(html)).toEqual(["with ", "confidence"]);
  });
});

describe("Astro TextScramble", () => {
  it("renders the real text three times and passes the charset", async () => {
    const html = await container.renderToString(TextScramble, {
      props: {
        text: "99.98%",
        trigger: "view",
        charset: "digits",
        delay: 150,
        class: "ml-1",
      },
    });
    const host = tag(html, "markas-text-scramble");
    expect(host).toContain('data-trigger="view"');
    expect(host).toContain('data-charset="0123456789"');
    expect(host).toContain('data-delay="150"');
    expect(html).toMatch(/class="inline-grid tabular-nums ml-1"/);
    expect(html).toContain('<span class="sr-only">99.98%</span>');
    expect(html.match(/>99\.98%</g)).toHaveLength(3);
  });
});

describe("Astro TypingText", () => {
  it("shows the first word, reads every word, and drops the caret on request", async () => {
    const html = await container.renderToString(TypingText, {
      props: { words: ["Laravel", "React"], loop: false, class: "text-muted" },
    });
    expect(tag(html, "markas-typing-text")).toContain('data-loop="false"');
    expect(html).toContain('class="inline text-muted"');
    expect(html).toContain('<span class="sr-only">Laravel, React</span>');
    expect(html).toMatch(/data-markas-typed[^>]*>Laravel</);
    expect(html).toContain("data-markas-caret");

    const plain = await container.renderToString(TypingText, {
      props: { words: ["packed"], cursor: false },
    });
    expect(plain).not.toContain("data-markas-caret");
  });
});

describe("Astro UnderlineLink", () => {
  it("marks the current page and keeps the user class last", async () => {
    const html = await container.renderToString(UnderlineLink, {
      props: { href: "/docs", active: true, class: "text-ink" },
      slots: { default: "Docs" },
    });
    const link = tag(html, "a");
    expect(link).toContain('href="/docs"');
    expect(link).toContain('aria-current="page"');
    expect(link).toMatch(/class="group [^"]*text-ink"/);
    expect(html.match(/<span aria-hidden="true"/g)).toHaveLength(1);
    expect(html).not.toContain("<script");
  });

  it("replaces unsafe hrefs and renders two lines or a scribble", async () => {
    const html = await container.renderToString(UnderlineLink, {
      props: { href: " javascript:alert(1)", variant: "goes-out-comes-in" },
      slots: { default: "Changelog" },
    });
    expect(tag(html, "a")).toContain('href="#"');
    expect(tag(html, "a")).not.toContain("aria-current");
    expect(html.match(/<span aria-hidden="true"/g)).toHaveLength(2);

    const scribble = await container.renderToString(UnderlineLink, {
      props: { href: "#", variant: "scribble" },
      slots: { default: "Guide" },
    });
    expect(tag(scribble, "svg")).toContain('aria-hidden="true"');
    expect(tag(scribble, "path")).toContain('pathLength="1"');
  });
});

describe("Astro VariableWeightText", () => {
  it("renders one letter per character at the min weight", async () => {
    const html = await container.renderToString(VariableWeightText, {
      props: { text: "Hai", min: 200, max: 900, wave: true },
    });
    const host = tag(html, "markas-variable-weight-text");
    expect(host).toContain('data-min="200"');
    expect(host).toContain('data-max="900"');
    expect(host).toContain('data-wave="true"');
    expect(html).toContain('<span class="sr-only">Hai</span>');
    expect(html.match(/data-letter=""/g)).toHaveLength(3);
    expect(html).toContain(
      "style=\"font-variation-settings: 'wght' 200; font-weight: 200\"",
    );
  });
});

describe("Astro VerticalCutReveal", () => {
  it("splits words with a real space between them", async () => {
    const html = await container.renderToString(VerticalCutReveal, {
      props: { text: "Team plan", direction: "down", from: "center" },
    });
    const host = tag(html, "markas-vertical-cut-reveal");
    expect(host).toContain('data-offset="translateY(-120%)"');
    expect(host).toContain('data-from="center"');
    expect(html).toContain('<span class="sr-only">Team plan</span>');
    expect(units(html)).toEqual(["Team", "plan"]);
    expect(html).toMatch(/<\/span><\/span> <span class="inline-flex/);
  });

  it("splits chars and lines", async () => {
    const chars = await container.renderToString(VerticalCutReveal, {
      props: { text: "Rp 9", split: "chars" },
    });
    expect(units(chars)).toEqual(["R", "p", "9"]);

    const lines = await container.renderToString(VerticalCutReveal, {
      props: { text: "Design once.\nShip it.", split: "lines" },
    });
    expect(units(lines)).toEqual(["Design once.", "Ship it."]);
    expect(lines).toContain(
      '<span class="sr-only">Design once. Ship it.</span>',
    );
  });
});
