// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Meteors from "../../components/meteors/Meteors.astro";
import NoiseBackground from "../../components/noise-background/NoiseBackground.astro";
import RetroGrid from "../../components/retro-grid/RetroGrid.astro";
import RippleBackground from "../../components/ripple-background/RippleBackground.astro";
import ShootingStars from "../../components/shooting-stars/ShootingStars.astro";
import Sparkles from "../../components/sparkles/Sparkles.astro";
import SpotlightBeam from "../../components/spotlight-beam/SpotlightBeam.astro";
import StarsBackground from "../../components/stars-background/StarsBackground.astro";
import WavyBackground from "../../components/wavy-background/WavyBackground.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

type Component = Parameters<AstroContainer["renderToString"]>[0];

const render = (
  component: Component,
  props: Record<string, unknown> = {},
  slot = "Hello",
) => container.renderToString(component, { props, slots: { default: slot } });

/** Number of times a pattern occurs in the HTML. */
const count = (html: string, pattern: RegExp) =>
  [...html.matchAll(new RegExp(pattern, "g"))].length;

describe("Astro backgrounds share one shape", () => {
  it.each([
    ["Meteors", Meteors],
    ["NoiseBackground", NoiseBackground],
    ["RetroGrid", RetroGrid],
    ["RippleBackground", RippleBackground],
    ["ShootingStars", ShootingStars],
    ["Sparkles", Sparkles],
    ["SpotlightBeam", SpotlightBeam],
    ["StarsBackground", StarsBackground],
    ["WavyBackground", WavyBackground],
  ])(
    "%s: user class and attributes on the root, keyframes, aria-hidden layer, slot in front",
    async (_, component) => {
      const html = await render(component as Component, {
        class: "rounded-xl",
        id: "hero",
        "aria-label": "Hero",
      });
      const root = html.match(/<div[^>]*class="[^"]*isolate[^"]*"[^>]*>/)![0];
      expect(root).toContain('id="hero"');
      expect(root).toContain('aria-label="Hero"');
      expect(root).toMatch(/class="[^"]*rounded-xl"/);
      expect(html).toMatch(/<style>@keyframes markas-/);
      expect(html).toMatch(
        /<div aria-hidden="true" class="pointer-events-none/,
      );
      expect(html).toContain('<div class="relative">Hello</div>');
    },
  );
});

describe("Astro generated layers", () => {
  it("meteors follow the variant count and the angle clamp", async () => {
    const rain = await render(Meteors);
    expect(count(rain, /<span class="absolute rounded-full/)).toBe(20);
    expect(rain).toContain("--markas-meteor-angle:215deg");
    expect(rain).toContain("--markas-meteor-tail:");

    const comet = await render(Meteors, { variant: "comet", angle: 500 });
    expect(count(comet, /size-1 shadow/)).toBe(6);
    expect(comet).toContain("--markas-meteor-angle:360deg");
    expect(count(await render(Meteors, { count: 500 }), /<span /)).toBe(60);
  });

  it("stars, shooting stars, and ripples render the requested items", async () => {
    expect(count(await render(StarsBackground, { count: 12 }), /<span /)).toBe(
      12,
    );
    const dawn = await render(ShootingStars, {
      variant: "dawn",
      stars: 5,
      trailColor: "danger",
    });
    expect(count(dawn, /<span /)).toBe(8);
    expect(dawn).toContain("from-warning/25");
    expect(dawn).toContain("text-danger");

    const ripple = await render(RippleBackground, {
      rings: 3,
      size: 40,
      gap: 24,
    });
    expect(count(ripple, /<span /)).toBe(3);
    expect(ripple).toContain("width:88px;height:88px");
    expect(ripple).toContain("animation-delay:240ms");
  });

  it("retro grid puts its variables before the user style", async () => {
    const html = await render(RetroGrid, {
      cellSize: 40,
      angle: 72,
      style: "color: red",
    });
    expect(html).toContain(
      'style="--markas-retro-cell: 40px; --markas-retro-angle: 72deg; color: red"',
    );
  });

  it("waves clamp to 3 to 5 and silk draws strokes", async () => {
    expect(count(await render(WavyBackground, { waves: 9 }), /<svg /)).toBe(5);
    const silk = await render(WavyBackground, { variant: "silk", waves: 1 });
    expect(count(silk, /<svg /)).toBe(3);
    expect(count(silk, /vector-effect="non-scaling-stroke"/)).toBe(3);
    expect(silk).toContain("animation-direction:reverse");
  });

  it("sparkles burst carries travel offsets, noise film adds a vignette", async () => {
    const burst = await render(Sparkles, { variant: "burst", density: 4 });
    expect(count(burst, /<svg /)).toBe(4);
    expect(count(burst, /--markas-sparkle-x:-?\d+px/)).toBe(4);
    expect(burst).toContain("opacity-0");

    const grain = await render(NoiseBackground, { intensity: "high" });
    expect(grain).toContain("[--markas-noise-alpha:0.15]");
    expect(grain).toContain("mask-image:url(");
    expect(count(grain, /<div /)).toBe(5);
    const film = await render(NoiseBackground, { variant: "film" });
    expect(count(film, /<div /)).toBe(6);
  });

  it("spotlight beam wraps a custom element and marks follow on the root", async () => {
    const html = await render(SpotlightBeam, {
      follow: true,
      variant: "center",
    });
    expect(html).toMatch(/^<markas-spotlight-beam class="contents">/);
    expect(html).toContain("data-markas-spotlight-beam-follow");
    expect(html).toContain("[--markas-beam-angle:90deg]");
    expect(await render(SpotlightBeam)).not.toContain(
      "data-markas-spotlight-beam-follow",
    );
  });
});
