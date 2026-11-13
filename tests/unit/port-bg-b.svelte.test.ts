import { fireEvent, render } from "@testing-library/svelte";
import { createRawSnippet, type Component, type Snippet } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import Meteors from "../../components/meteors/Meteors.svelte";
import NoiseBackground from "../../components/noise-background/NoiseBackground.svelte";
import RetroGrid from "../../components/retro-grid/RetroGrid.svelte";
import RippleBackground from "../../components/ripple-background/RippleBackground.svelte";
import ShootingStars from "../../components/shooting-stars/ShootingStars.svelte";
import Sparkles from "../../components/sparkles/Sparkles.svelte";
import SpotlightBeam from "../../components/spotlight-beam/SpotlightBeam.svelte";
import StarsBackground from "../../components/stars-background/StarsBackground.svelte";
import WavyBackground from "../../components/wavy-background/WavyBackground.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

/** The root, its decorative layer, and the content wrapper. */
const parts = (container: HTMLElement) => {
  const root = container.querySelector<HTMLElement>(".isolate")!;
  const layer = root.querySelector<HTMLElement>(":scope > [aria-hidden=true]")!;
  return { root, layer, content: root.lastElementChild as HTMLElement };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

/** The props every background shares, so one test can render them all. */
type Shared = Component<{
  children?: Snippet;
  class?: string;
  id?: string;
  "aria-label"?: string;
}>;

describe("Svelte backgrounds share one shape", () => {
  it.each<[string, Shared]>([
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
    "%s: user class and attributes on the root, aria-hidden layer, children in front",
    (_, Background) => {
      const { container } = render(Background, {
        children: text("Hello"),
        class: "rounded-xl",
        "aria-label": "Hero",
        id: "hero",
      });
      const { root, layer, content } = parts(container);
      expect(root.id).toBe("hero");
      expect(root).toHaveAttribute("aria-label", "Hero");
      expect(root.className.endsWith("rounded-xl")).toBe(true);
      expect(layer.className).toContain("pointer-events-none");
      expect(content).toHaveClass("relative");
      expect(content).toHaveTextContent("Hello");
      expect(container.querySelector("style")?.textContent).toMatch(
        /@keyframes markas-/,
      );
    },
  );
});

describe("Svelte Meteors", () => {
  it("draws 20 rain or 6 comet meteors from the seed, capped at 60", () => {
    const { container, unmount } = render(Meteors);
    const { layer } = parts(container);
    expect(layer.querySelectorAll("span")).toHaveLength(20);
    expect(layer.style.getPropertyValue("--markas-meteor-angle")).toBe(
      "215deg",
    );
    const first = layer.querySelector("span")!.getAttribute("style");
    unmount();

    const again = render(Meteors);
    expect(
      parts(again.container).layer.querySelector("span")!.getAttribute("style"),
    ).toBe(first);
    again.unmount();

    const comet = render(Meteors, { variant: "comet", angle: 500 });
    const cometLayer = parts(comet.container).layer;
    expect(cometLayer.querySelectorAll("span")).toHaveLength(6);
    expect(cometLayer.querySelector("span")!.className).toContain("size-1");
    expect(cometLayer.style.getPropertyValue("--markas-meteor-angle")).toBe(
      "360deg",
    );
    comet.unmount();

    const many = render(Meteors, { count: 500 });
    expect(parts(many.container).layer.querySelectorAll("span")).toHaveLength(
      60,
    );
  });
});

describe("Svelte StarsBackground and ShootingStars", () => {
  it("place count stars, and the shooting sky adds three streaks and a dawn glow", () => {
    const stars = render(StarsBackground, { count: 12, color: "success" });
    const layer = parts(stars.container).layer;
    expect(layer.querySelectorAll("span")).toHaveLength(12);
    expect(layer).toHaveClass("text-success");
    stars.unmount();

    const night = render(ShootingStars, { stars: 10 });
    const nightLayer = parts(night.container).layer;
    expect(nightLayer.querySelectorAll("span")).toHaveLength(13);
    expect(nightLayer.querySelector("div")).toBeNull();
    expect(nightLayer).toHaveClass("text-primary");
    night.unmount();

    const dawn = render(ShootingStars, {
      variant: "dawn",
      stars: 0,
      trailColor: "danger",
    });
    const dawnLayer = parts(dawn.container).layer;
    expect(dawnLayer.querySelector("div")!.className).toContain("from-warning");
    expect(dawnLayer.querySelectorAll("span")).toHaveLength(3);
    expect(dawnLayer).toHaveClass("text-danger");
  });
});

describe("Svelte RippleBackground and RetroGrid", () => {
  it("grows each ring by gap and keeps the user style after the grid variables", () => {
    const ripple = render(RippleBackground, { rings: 3, size: 40, gap: 24 });
    const rings = [...parts(ripple.container).layer.querySelectorAll("span")];
    expect(rings.map((ring) => ring.style.width)).toEqual([
      "40px",
      "64px",
      "88px",
    ]);
    expect(rings.map((ring) => ring.style.animationDelay)).toEqual([
      "0ms",
      "120ms",
      "240ms",
    ]);
    ripple.unmount();

    const grid = render(RetroGrid, {
      cellSize: 40,
      angle: 72,
      style: "color: red",
    });
    const root = parts(grid.container).root;
    expect(root.style.getPropertyValue("--markas-retro-cell")).toBe("40px");
    expect(root.style.getPropertyValue("--markas-retro-angle")).toBe("72deg");
    expect(root.style.color).toBe("red");
  });
});

describe("Svelte WavyBackground, Sparkles, and NoiseBackground", () => {
  it("clamps waves, draws silk as strokes, and alternates direction", () => {
    const ocean = render(WavyBackground, { waves: 9 });
    const svgs = parts(ocean.container).layer.querySelectorAll("svg");
    expect(svgs).toHaveLength(5);
    expect(svgs[0]!.querySelector("path")).toHaveAttribute(
      "fill",
      "currentColor",
    );
    expect(svgs[1]!.style.animationDirection).toBe("reverse");
    ocean.unmount();

    const silk = render(WavyBackground, { variant: "silk", waves: 1 });
    const paths = parts(silk.container).layer.querySelectorAll("path");
    expect(paths).toHaveLength(3);
    expect(paths[0]).toHaveAttribute("fill", "none");
    expect(paths[0]).toHaveAttribute("vector-effect", "non-scaling-stroke");
  });

  it("burst sparkles start hidden in the center and carry their travel offsets", () => {
    const burst = render(Sparkles, { variant: "burst", density: 4 });
    const items = parts(burst.container).layer.querySelectorAll("svg");
    expect(items).toHaveLength(4);
    expect(items[0]!.getAttribute("class")).toContain("opacity-0");
    expect(items[0]!.style.getPropertyValue("--markas-sparkle-x")).toMatch(
      /^-?\d+px$/,
    );
    burst.unmount();

    const field = render(Sparkles, { density: 30 });
    const layer = parts(field.container).layer;
    expect(layer.querySelectorAll("circle").length).toBeGreaterThan(0);
    expect(layer.querySelectorAll("path").length).toBeGreaterThan(0);
    expect(layer).toHaveClass("text-warning");
  });

  it("noise uses the texture as a mask, and film adds a vignette", () => {
    const grain = render(NoiseBackground, { intensity: "high", size: "fine" });
    const layer = parts(grain.container).layer;
    expect(layer.querySelectorAll("div")).toHaveLength(2);
    expect(layer.className).toContain("[--markas-noise-alpha:0.15]");
    expect(layer.className).toContain("[--markas-noise-size:120px]");
    expect(layer.querySelectorAll("div")[1]!.style.maskImage).toContain(
      "baseFrequency='.85'",
    );
    grain.unmount();

    const film = render(NoiseBackground, { variant: "film" });
    expect(parts(film.container).layer.querySelectorAll("div")).toHaveLength(3);
  });
});

describe("Svelte SpotlightBeam", () => {
  const rect = { left: 0, top: 0, width: 200, height: 100 } as DOMRect;

  it("shows the entrance without IntersectionObserver and leans toward the pointer with follow", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const onpointermove = vi.fn();
    const { container } = render(SpotlightBeam, {
      follow: true,
      variant: "center",
      onpointermove,
    });
    const { root, layer } = parts(container);
    expect(root).toHaveAttribute("data-visible", "");
    expect(layer.firstElementChild!.className).toContain(
      "[--markas-beam-angle:90deg]",
    );
    root.getBoundingClientRect = () => rect;
    await fireEvent.pointerMove(root, { clientX: 150, clientY: 25 });
    expect(root.style.getPropertyValue("--markas-beam-x")).toBe("0.500");
    expect(root.style.getPropertyValue("--markas-beam-y")).toBe("-0.500");
    expect(onpointermove).toHaveBeenCalledTimes(1);
  });

  it("stays still without follow or with reduced motion", async () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    const still = render(SpotlightBeam, { follow: true });
    const root = parts(still.container).root;
    root.getBoundingClientRect = () => rect;
    await fireEvent.pointerMove(root, { clientX: 150, clientY: 25 });
    expect(root.style.getPropertyValue("--markas-beam-x")).toBe("");
    still.unmount();
    vi.unstubAllGlobals();

    const plain = render(SpotlightBeam);
    const plainRoot = parts(plain.container).root;
    plainRoot.getBoundingClientRect = () => rect;
    await fireEvent.pointerMove(plainRoot, { clientX: 150, clientY: 25 });
    expect(plainRoot.style.getPropertyValue("--markas-beam-x")).toBe("");
  });
});
