import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import type { Component } from "vue";
import AuroraBackground from "../../components/aurora-background/AuroraBackground.vue";
import DotPattern from "../../components/dot-pattern/DotPattern.vue";
import GridPattern from "../../components/grid-pattern/GridPattern.vue";
import RetroGrid from "../../components/retro-grid/RetroGrid.vue";
import RippleBackground from "../../components/ripple-background/RippleBackground.vue";
import StarsBackground from "../../components/stars-background/StarsBackground.vue";

const decorative = (root: HTMLElement) =>
  root.querySelector<HTMLElement>(':scope > [aria-hidden="true"]')!;

const renderRoot = (
  component: Component,
  props: Record<string, unknown> = {},
  attrs: Record<string, unknown> = {},
) => {
  const result = render(component, {
    props,
    attrs: { "data-testid": "root", ...attrs },
  });
  return { ...result, root: screen.getByTestId("root") };
};

describe("Vue backgrounds: shared behavior", () => {
  const cases = [
    ["DotPattern", DotPattern],
    ["GridPattern", GridPattern],
    ["AuroraBackground", AuroraBackground],
    ["StarsBackground", StarsBackground],
    ["RetroGrid", RetroGrid],
    ["RippleBackground", RippleBackground],
  ] as const;

  for (const [name, component] of cases) {
    it(`${name}: content above an aria-hidden layer, user class last, attributes passed through`, () => {
      render(component, {
        attrs: { "data-testid": "root", id: "hero", class: "rounded-xl" },
        slots: { default: "<h2>Launch</h2>" },
      });
      const root = screen.getByTestId("root");
      expect(root).toHaveAttribute("id", "hero");
      expect(root).toHaveClass("relative", "isolate", "overflow-hidden");
      expect(root.className.endsWith("rounded-xl")).toBe(true);

      const layer = decorative(root);
      expect(layer).toHaveClass("pointer-events-none", "absolute", "inset-0");
      expect(layer).not.toContainElement(screen.getByRole("heading"));
      expect(
        screen.getByRole("heading", { name: "Launch" }).parentElement,
      ).toHaveClass("relative");
    });
  }

  it("animated backgrounds stop with reduced motion and ship their keyframes", () => {
    const animated = [
      [GridPattern, "markas-grid-cell", { cells: [[1, 1]] }],
      [AuroraBackground, "markas-aurora-a", {}],
      [StarsBackground, "markas-twinkle", {}],
      [RetroGrid, "markas-retro-grid", {}],
      [RippleBackground, "markas-ripple", {}],
    ] as const;
    for (const [component, keyframe, props] of animated) {
      const { container, unmount } = render(component, { props });
      expect(container.querySelector("style")?.textContent).toContain(
        `@keyframes ${keyframe}`,
      );
      const moving = container.querySelectorAll(
        `[class*="animate-[${keyframe}"]`,
      );
      expect(moving.length).toBeGreaterThan(0);
      for (const element of moving)
        expect(element).toHaveClass("motion-reduce:animate-none");
      unmount();
    }
  });
});

describe("Vue DotPattern", () => {
  it("default spacing 16px, dot 1px, muted, no mask", () => {
    const { root } = renderRoot(DotPattern);
    expect(root.style.getPropertyValue("--markas-dot-spacing")).toBe("16px");
    expect(root.style.getPropertyValue("--markas-dot-size")).toBe("1px");
    expect(decorative(root)).toHaveClass("text-muted/50");
    expect(decorative(root).className).not.toContain("mask-image");
  });

  it("applies spacing, dotSize, color, mask, and keeps the user style", () => {
    const { root } = renderRoot(
      DotPattern,
      { spacing: 24, dotSize: 1.5, color: "success", mask: "radial" },
      { style: "min-height: 200px" },
    );
    expect(root.style.getPropertyValue("--markas-dot-spacing")).toBe("24px");
    expect(root.style.getPropertyValue("--markas-dot-size")).toBe("1.5px");
    expect(root.style.minHeight).toBe("200px");
    expect(decorative(root)).toHaveClass("text-success/50");
    expect(decorative(root).className).toContain(
      "[mask-image:radial-gradient(",
    );
  });
});

describe("Vue GridPattern", () => {
  it("places highlighted cells inside the grid lines with staggered delays", () => {
    const { root } = renderRoot(GridPattern, {
      cellSize: 20,
      color: "primary",
      mask: "linear",
      cells: [
        [2, 1],
        [0, 3],
      ],
    });
    expect(root.style.getPropertyValue("--markas-grid-size")).toBe("20px");
    const layer = decorative(root);
    expect(layer).toHaveClass("text-primary/15");
    expect(layer.className).toContain("[mask-image:linear-gradient(");
    const cells = layer.querySelectorAll("span");
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveStyle({
      left: "41px",
      top: "21px",
      width: "19px",
      height: "19px",
    });
    expect(cells[1]).toHaveStyle({ left: "1px", top: "61px" });
    expect(cells[1]!.style.animationDelay).toBe("800ms");
  });

  it("renders no cells by default", () => {
    const { root } = renderRoot(GridPattern);
    expect(decorative(root).children).toHaveLength(0);
  });
});

describe("Vue AuroraBackground", () => {
  it("defaults to success at normal speed and accepts other tokens", async () => {
    const { root, rerender } = renderRoot(AuroraBackground);
    expect(decorative(root)).toHaveClass(
      "[--markas-aurora-color:var(--color-success)]",
      "[--markas-aurora-speed:14s]",
    );
    expect(decorative(root).children).toHaveLength(2);
    await rerender({ color: "warning", speed: "slow" });
    expect(decorative(root)).toHaveClass(
      "[--markas-aurora-color:var(--color-warning)]",
      "[--markas-aurora-speed:24s]",
    );
  });
});

describe("Vue StarsBackground", () => {
  const starStyles = (root: HTMLElement) =>
    [...decorative(root).querySelectorAll("span")].map((s) => s.style.cssText);

  it("renders count stars with the same layout for the same seed", () => {
    const first = renderRoot(StarsBackground, { count: 30, seed: 5 });
    const styles = starStyles(first.root);
    expect(styles).toHaveLength(30);
    first.unmount();
    const second = renderRoot(StarsBackground, { count: 30, seed: 5 });
    expect(starStyles(second.root)).toEqual(styles);
  });

  it("matches the shared Park-Miller sequence used by Blade and React", () => {
    const { root } = renderRoot(StarsBackground, { count: 1, seed: 7 });
    const star = decorative(root).querySelector("span")!;
    // seed 7 -> state 8 -> 386168 (size 1), 1460846352 (left), 1741224500 (top)
    expect(star.style.width).toBe("1px");
    expect(star.style.left).toBe("63.52%");
    expect(star.style.top).toBe("45%");
  });

  it("changes layout with a different seed, clamps count, and colors stars", () => {
    const first = renderRoot(StarsBackground, { seed: 1 });
    const a = starStyles(first.root);
    expect(a).toHaveLength(80);
    expect(decorative(first.root)).toHaveClass("text-primary");
    first.unmount();
    const second = renderRoot(StarsBackground, {
      seed: 2,
      count: 9999,
      color: "warning",
    });
    const b = starStyles(second.root);
    expect(b).toHaveLength(400);
    expect(b.slice(0, 80)).not.toEqual(a);
    expect(decorative(second.root)).toHaveClass("text-warning");
  });

  it("renders no stars for a negative count", () => {
    const { root } = renderRoot(StarsBackground, { count: -5 });
    expect(starStyles(root)).toHaveLength(0);
  });
});

describe("Vue RetroGrid", () => {
  it("sets cell size and angle as CSS variables and applies the color token", async () => {
    const { root, rerender } = renderRoot(RetroGrid);
    expect(root.style.getPropertyValue("--markas-retro-cell")).toBe("60px");
    expect(root.style.getPropertyValue("--markas-retro-angle")).toBe("65deg");
    expect(decorative(root)).toHaveClass("text-muted/40");
    await rerender({ cellSize: 40, angle: 72, color: "success" });
    expect(root.style.getPropertyValue("--markas-retro-cell")).toBe("40px");
    expect(root.style.getPropertyValue("--markas-retro-angle")).toBe("72deg");
    expect(decorative(root)).toHaveClass("text-success/50");
  });
});

describe("Vue RippleBackground", () => {
  it("grows and fades each ring and staggers the pulse from the center", () => {
    const { root } = renderRoot(RippleBackground, {
      rings: 3,
      size: 80,
      gap: 40,
      color: "success",
    });
    const layer = decorative(root);
    expect(layer).toHaveClass("text-success");
    const rings = [...layer.querySelectorAll("span")];
    expect(rings.map((r) => r.style.width)).toEqual(["80px", "120px", "160px"]);
    expect(rings.map((r) => r.style.opacity)).toEqual(["0.6", "0.5", "0.4"]);
    expect(rings.map((r) => r.style.animationDelay)).toEqual([
      "0ms",
      "120ms",
      "240ms",
    ]);
  });

  it("defaults to 6 rings and caps at 12", () => {
    const first = renderRoot(RippleBackground);
    expect(decorative(first.root).children).toHaveLength(6);
    first.unmount();
    const second = renderRoot(RippleBackground, { rings: 50 });
    const rings = decorative(second.root).querySelectorAll("span");
    expect(rings).toHaveLength(12);
    expect(rings[11]!.style.opacity).toBe("0.1");
  });
});
