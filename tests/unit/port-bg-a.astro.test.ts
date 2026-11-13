// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import AuroraBackground from "../../components/aurora-background/AuroraBackground.astro";
import BackgroundBeams from "../../components/background-beams/BackgroundBeams.astro";
import BackgroundBoxes from "../../components/background-boxes/BackgroundBoxes.astro";
import BackgroundLines from "../../components/background-lines/BackgroundLines.astro";
import DotPattern from "../../components/dot-pattern/DotPattern.astro";
import GradientBorder from "../../components/gradient-border/GradientBorder.astro";
import GridPattern from "../../components/grid-pattern/GridPattern.astro";
import HeroHighlight from "../../components/hero-highlight/HeroHighlight.astro";
import LampEffect from "../../components/lamp-effect/LampEffect.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const count = (html: string, pattern: RegExp) =>
  html.match(new RegExp(pattern, "g"))?.length ?? 0;

describe("Astro background ports", () => {
  it("aurora: keyframes inline, decorative layer, user class and attributes on the root", async () => {
    const html = await container.renderToString(AuroraBackground, {
      props: { color: "danger", speed: "fast", class: "px-6", id: "hero" },
      slots: { default: "Hello" },
    });
    expect(html).toMatch(
      /<div id="hero" class="relative isolate overflow-hidden px-6">/,
    );
    expect(html).toContain("<style>@keyframes markas-aurora-a");
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("[--markas-aurora-color:var(--color-danger)]");
    expect(html).toContain("[--markas-aurora-speed:8s]");
    expect(html).toContain('<div class="relative">Hello</div>');
  });

  it("beams: curves clamped to 16 with timing, collide draws drops, user style kept", async () => {
    const html = await container.renderToString(BackgroundBeams, {
      props: { count: 40, style: "color: red" },
    });
    expect(html).toContain('style="--markas-beams-duration:7s;color: red"');
    expect(count(html, /stroke-dasharray="14 186"/)).toBe(16);
    expect(html).toContain(
      'style="stroke-dashoffset:-37;animation-delay:-900ms"',
    );

    const rain = await container.renderToString(BackgroundBeams, {
      props: { variant: "collide", count: 4 },
    });
    expect(rain).not.toContain("<svg");
    expect(count(rain, /markas-beams-fall_/)).toBe(4);
    expect(count(rain, /markas-beams-splash_/)).toBe(4);
  });

  it("boxes: rows times cols tiles with a few embers and css variables", async () => {
    const html = await container.renderToString(BackgroundBoxes, {
      props: { rows: 3, cols: 4, size: 28, speed: "slow" },
    });
    expect(html).toContain(
      "--markas-boxes-cols:4;--markas-boxes-size:28px;--markas-boxes-duration:9s",
    );
    expect(count(html, /<span /)).toBe(12);
    expect(html).toMatch(/markas-boxes-glow_[^"]*" style="animation-delay:/);
  });

  it("lines: one path per line with opacity and delay", async () => {
    const html = await container.renderToString(BackgroundLines, {
      props: { variant: "rays", count: 5 },
    });
    expect(count(html, /<path /)).toBe(5);
    expect(html).toContain('d="M 400 -40 L ');
    expect(html).toContain('style="opacity:0.5;animation-delay:-1300ms"');
  });

  it("dot and grid patterns: spacing variables and highlighted cells", async () => {
    const dots = await container.renderToString(DotPattern, {
      props: { spacing: 20, dotSize: 1.5, mask: "radial" },
    });
    expect(dots).toContain("--markas-dot-spacing:20px;--markas-dot-size:1.5px");
    expect(dots).toContain("[mask-image:radial-gradient");

    const grid = await container.renderToString(GridPattern, {
      props: {
        cellSize: 20,
        cells: [
          [2, 1],
          [5, 3],
        ],
      },
    });
    expect(count(grid, /<span /)).toBe(2);
    expect(grid).toContain(
      'style="left:101px;top:61px;width:19px;height:19px;animation-delay:800ms"',
    );
  });

  it("gradient border: glow adds a layer behind, radius sets both corners", async () => {
    const plain = await container.renderToString(GradientBorder, {
      slots: { default: "Plan" },
    });
    expect(count(plain, /aria-hidden="true"/)).toBe(1);

    const html = await container.renderToString(GradientBorder, {
      props: { glow: true, radius: "lg", variant: "shine" },
      slots: { default: "Plan" },
    });
    expect(count(html, /aria-hidden="true"/)).toBe(2);
    expect(html).toContain("-z-10 opacity-50 blur-lg");
    expect(html).toContain("rounded-lg");
    expect(html).toContain(
      '<div class="relative h-full bg-surface rounded-[7px]">Plan</div>',
    );
  });

  it("hero highlight and lamp: wrapped in a custom element that runs the per-instance script", async () => {
    const highlight = await container.renderToString(HeroHighlight, {
      props: { variant: "grid", spacing: 24, radius: 200 },
      slots: { default: "Hi <mark>there</mark>" },
    });
    expect(highlight).toMatch(/^<markas-hero-highlight class="contents">/);
    expect(highlight).toContain(
      "--markas-hh-spacing:24px;--markas-hh-radius:200px",
    );
    expect(highlight).toContain("<mark>there</mark>");

    const lamp = await container.renderToString(LampEffect, {
      props: { variant: "stage", size: "lg" },
    });
    expect(lamp).toMatch(/^<markas-lamp-effect class="contents">/);
    expect(lamp).toContain("[--markas-lamp-w:28rem]");
    expect(count(lamp, /markas-lamp_var/)).toBe(4);
  });
});
