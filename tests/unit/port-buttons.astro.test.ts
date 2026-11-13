// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import CopyButton from "../../components/copy-button/CopyButton.astro";
import FlipButton from "../../components/flip-button/FlipButton.astro";
import GithubStarsButton from "../../components/github-stars-button/GithubStarsButton.astro";
import HoldButton from "../../components/hold-button/HoldButton.astro";
import RippleButton from "../../components/ripple-button/RippleButton.astro";
import ShimmerButton from "../../components/shimmer-button/ShimmerButton.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const tag = (html: string, name: string) =>
  html.match(new RegExp(`<${name}[^>]*>`))?.[0] ?? "";

describe("Astro CopyButton", () => {
  it("renders an idle button with the text, the copied label, and an empty status", async () => {
    const html = await container.renderToString(CopyButton, {
      props: { text: "INV-2048", copiedLabel: "Tersalin", class: "ml-1" },
      slots: { default: "Copy ID" },
    });
    const button = tag(html, "button");
    expect(button).toContain('type="button"');
    expect(button).toContain('data-state="idle"');
    expect(button).toContain('data-markas-copy-button="INV-2048"');
    expect(button).toContain('data-copied-label="Tersalin"');
    expect(button).toMatch(/class="[^"]*h-10[^"]*ml-1"/);
    expect(html).toContain("Copy ID");
    expect(html).toMatch(/<span role="status" class="sr-only"><\/span>/);
  });

  it("is square and named by copyLabel without a label", async () => {
    const html = await container.renderToString(CopyButton, {
      props: { text: "abc", size: "sm", copyLabel: "Salin" },
    });
    expect(tag(html, "button")).toContain("size-8");
    expect(tag(html, "button")).not.toContain("px-3");
    expect(html).toContain('<span class="sr-only">Salin</span>');
  });
});

describe("Astro FlipButton", () => {
  it("puts the back slot on an aria-hidden face", async () => {
    const html = await container.renderToString(FlipButton, {
      props: { size: "lg", class: "mt-2", backLabel: "ignored" },
      slots: { default: "Download", back: "<em>PDF</em>" },
    });
    expect(tag(html, "button")).toMatch(/class="[^"]*h-12[^"]*mt-2"/);
    expect(html).toMatch(/aria-hidden="true"[^>]*>\s*<em>PDF<\/em>/);
    expect(html).not.toContain("ignored");
  });

  it("prefers backLabel, then falls back to the label", async () => {
    const labelled = await container.renderToString(FlipButton, {
      props: { backLabel: "No card needed" },
      slots: { default: "Start trial" },
    });
    expect(labelled).toMatch(/aria-hidden="true"[^>]*>\s*No card needed/);

    const plain = await container.renderToString(FlipButton, {
      props: { variant: "danger" },
      slots: { default: "Delete" },
    });
    expect(plain.match(/Delete/g)).toHaveLength(2);
  });
});

describe("Astro HoldButton", () => {
  it("links the hint, sets the duration, and keeps the user style and class", async () => {
    const html = await container.renderToString(HoldButton, {
      props: {
        duration: 2000,
        holdLabel: "Tahan untuk konfirmasi",
        class: "mt-2",
        style: "color: red",
      },
      slots: { default: "Hapus" },
    });
    const button = tag(html, "button");
    const hintId = button.match(/aria-describedby="([^"]+)"/)?.[1];
    expect(hintId).toMatch(/^markas-hold-button-/);
    expect(html).toContain(
      `<span id="${hintId}" class="sr-only">Tahan untuk konfirmasi</span>`,
    );
    expect(button).toContain('data-state="idle"');
    expect(button).toContain('data-markas-hold-button="2000"');
    expect(button).toContain('style="color: red;--hold-duration: 2000ms"');
    expect(button).toMatch(/class="[^"]*mt-2"/);
  });

  it("defaults to 1500ms and the English hint", async () => {
    const html = await container.renderToString(HoldButton, {
      slots: { default: "Hold" },
    });
    expect(tag(html, "button")).toContain('style="--hold-duration: 1500ms"');
    expect(html).toContain("Press and hold to confirm");
  });
});

describe("Astro RippleButton", () => {
  it("renders the wave layer first and keeps type and class", async () => {
    const html = await container.renderToString(RippleButton, {
      props: { type: "submit", variant: "secondary", class: "mt-2" },
      slots: { default: "Send" },
    });
    const button = tag(html, "button");
    expect(button).toContain('type="submit"');
    expect(button).toContain("data-markas-ripple-button");
    expect(button).toMatch(/class="[^"]*border-line[^"]*mt-2"/);
    expect(html).toMatch(/<button[^>]*>\s*<span class="[^"]*-z-10"/);
  });
});

describe("Astro ShimmerButton", () => {
  it("wraps the button in the custom element with the duration and an aria-hidden sheen", async () => {
    const html = await container.renderToString(ShimmerButton, {
      props: { variant: "secondary", duration: 3000, class: "w-full" },
      slots: { default: "Upgrade" },
    });
    expect(html).toContain(
      '<markas-shimmer-button class="contents" data-duration="3000">',
    );
    expect(tag(html, "button")).toMatch(/class="[^"]*w-full"/);
    expect(html).toMatch(/data-markas-sheen[^>]*via-primary\/10/);
  });
});

describe("Astro GithubStarsButton", () => {
  it("blocks unsafe hrefs, shows a compact count, and labels the full count", async () => {
    const html = await container.renderToString(GithubStarsButton, {
      props: {
        href: "javascript:alert(1)",
        stars: 1240000,
        starsLabel: "{count} bintang",
        class: "mt-2",
      },
      slots: { default: "Bintang" },
    });
    expect(html).toContain('data-stars="1240000"');
    const link = tag(html, "a");
    expect(link).toContain('href="#"');
    expect(link).toMatch(/class="[^"]*border-line[^"]*mt-2"/);
    expect(html).toMatch(/aria-hidden="true">1\.2M</);
    expect(html).toMatch(/class="sr-only">\s*1,240,000 bintang\s*</);
  });

  it("keeps safe hrefs and the English label", async () => {
    const html = await container.renderToString(GithubStarsButton, {
      props: { href: "https://github.com/o/r", stars: 980 },
      slots: { default: "Star" },
    });
    expect(tag(html, "a")).toContain('href="https://github.com/o/r"');
    expect(html).toMatch(/aria-hidden="true">980</);
    expect(html).toContain("980 stars");
  });
});
