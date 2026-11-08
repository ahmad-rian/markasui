import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import type { Component } from "vue";
import Meteors from "../../components/meteors/Meteors.vue";
import ShootingStars from "../../components/shooting-stars/ShootingStars.vue";
import Sparkles from "../../components/sparkles/Sparkles.vue";
import WavyBackground from "../../components/wavy-background/WavyBackground.vue";

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

describe("Vue set B backgrounds: shared behavior", () => {
  const cases = [
    ["WavyBackground", WavyBackground, "markas-wave"],
    ["Meteors", Meteors, "markas-meteor"],
    ["ShootingStars", ShootingStars, "markas-shooting-star"],
    ["Sparkles", Sparkles, "markas-sparkle"],
  ] as const;

  for (const [name, component, keyframe] of cases) {
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

    it(`${name}: ships its keyframes and stops with reduced motion`, () => {
      const { container } = render(component);
      expect(container.querySelector("style")?.textContent).toContain(
        `@keyframes ${keyframe}`,
      );
      const moving = container.querySelectorAll(
        `[class*="animate-[${keyframe}"]`,
      );
      expect(moving.length).toBeGreaterThan(0);
      for (const element of moving)
        expect(element).toHaveClass("motion-reduce:animate-none");
    });
  }
});

describe("Vue WavyBackground", () => {
  it("defaults to 4 filled ocean waves in primary with blur", () => {
    const { root } = renderRoot(WavyBackground);
    const layer = decorative(root);
    expect(layer).toHaveClass("text-primary", "blur-[2px]");
    const waves = layer.querySelectorAll("svg");
    expect(waves).toHaveLength(4);
    expect(waves[0]!.querySelector("path")).toHaveAttribute(
      "fill",
      "currentColor",
    );
    expect(waves[0]).toHaveStyle({ animationDuration: "30s" });
    expect(waves[3]).toHaveStyle({ animationDuration: "18s" });
    expect(waves[1]!.style.animationDirection).toBe("reverse");
  });

  it("silk draws thin strokes, clamps waves to 3..5, and applies color and speed", async () => {
    const { root, rerender } = renderRoot(WavyBackground, {
      variant: "silk",
      color: "success",
      speed: "fast",
      waves: 9,
    });
    const layer = decorative(root);
    expect(layer).toHaveClass("text-success");
    const waves = layer.querySelectorAll("svg");
    expect(waves).toHaveLength(5);
    const path = waves[0]!.querySelector("path")!;
    expect(path).toHaveAttribute("fill", "none");
    expect(path).toHaveAttribute("stroke", "currentColor");
    expect(waves[4]).toHaveStyle({ animationDuration: "10s" });

    await rerender({ variant: "layered", waves: 1 });
    expect(decorative(root).querySelectorAll("svg")).toHaveLength(3);
  });
});

describe("Vue Meteors", () => {
  it("rain renders 20 thin meteors at 35 degrees by default", () => {
    const { root } = renderRoot(Meteors);
    const layer = decorative(root);
    expect(layer.style.getPropertyValue("--markas-meteor-angle")).toBe(
      "215deg",
    );
    const meteors = layer.querySelectorAll("span");
    expect(meteors).toHaveLength(20);
    expect(meteors[0]).toHaveClass("size-px");
    expect(meteors[0]!.style.getPropertyValue("--markas-meteor-tail")).toMatch(
      /^\d+px$/,
    );
  });

  it("comet is fewer and thicker; count, angle, color, and seed apply", async () => {
    const { root, rerender } = renderRoot(Meteors, {
      variant: "comet",
      color: "warning",
    });
    expect(decorative(root).querySelectorAll("span")).toHaveLength(6);
    expect(decorative(root).querySelector("span")).toHaveClass("size-1");
    expect(decorative(root)).toHaveClass("text-warning");

    await rerender({ variant: "rain", count: 500, angle: 90, seed: 4 });
    const layer = decorative(root);
    expect(layer.querySelectorAll("span")).toHaveLength(60);
    expect(layer.style.getPropertyValue("--markas-meteor-angle")).toBe(
      "270deg",
    );
  });
});

describe("Vue ShootingStars", () => {
  it("night: 70 stars and 3 streaks with a primary trail", () => {
    const { root } = renderRoot(ShootingStars);
    const layer = decorative(root);
    expect(layer).toHaveClass("text-primary");
    expect(layer.querySelectorAll('[class*="markas-star-blink"]')).toHaveLength(
      70,
    );
    const streaks = layer.querySelectorAll('[class*="markas-shooting-star"]');
    expect(streaks).toHaveLength(3);
    expect(streaks[0]).toHaveStyle({ animationDuration: "9000ms" });
  });

  it("dawn adds a warm glow and a warning trail; frequency and trailColor apply", async () => {
    const { root, rerender } = renderRoot(ShootingStars, { variant: "dawn" });
    const layer = decorative(root);
    expect(layer).toHaveClass("text-warning");
    expect(layer.querySelector(".from-warning\\/25")).not.toBeNull();

    await rerender({
      variant: "night",
      frequency: "high",
      trailColor: "danger",
      stars: 0,
    });
    const next = decorative(root);
    expect(next).toHaveClass("text-danger");
    expect(next.querySelector(".from-warning\\/25")).toBeNull();
    expect(next.querySelectorAll('[class*="markas-star-blink"]')).toHaveLength(
      0,
    );
    expect(
      next.querySelector<HTMLElement>('[class*="markas-shooting-star"]'),
    ).toHaveStyle({ animationDuration: "4500ms" });
  });
});

describe("Vue Sparkles", () => {
  it("field mixes stars and dots in warning", () => {
    const { root } = renderRoot(Sparkles, { density: 40 });
    const layer = decorative(root);
    expect(layer).toHaveClass("text-warning");
    expect(layer.querySelectorAll("svg")).toHaveLength(40);
    expect(layer.querySelectorAll("circle").length).toBeGreaterThan(0);
    expect(layer.querySelectorAll("path").length).toBeGreaterThan(0);
  });

  it("text keeps stars in the edge bands around the content", () => {
    const { root } = renderRoot(Sparkles, { variant: "text", density: 30 });
    expect(decorative(root).querySelectorAll("circle")).toHaveLength(0);
    for (const sparkle of decorative(root).querySelectorAll<SVGElement>(
      "svg",
    )) {
      const nearEdge = (v: number) => v <= 15 || v >= 85;
      expect(
        nearEdge(parseFloat(sparkle.style.left)) ||
          nearEdge(parseFloat(sparkle.style.top)),
      ).toBe(true);
    }
  });

  it("burst hides sparkles at the center until hover or focus", () => {
    const { root } = renderRoot(Sparkles, {
      variant: "burst",
      size: "lg",
      density: 500,
    });
    expect(root).toHaveClass("group/sparkles");
    const sparkles = decorative(root).querySelectorAll<SVGElement>("svg");
    expect(sparkles).toHaveLength(120);
    expect(sparkles[0]).toHaveClass("opacity-0", "top-1/2", "left-1/2");
    expect(sparkles[0]!.getAttribute("class")).toContain(
      "motion-safe:group-hover/sparkles:animate-[markas-sparkle-burst",
    );
    expect(sparkles[0]!.style.getPropertyValue("--markas-sparkle-y")).toMatch(
      /^-?\d+px$/,
    );
  });

  it("applies color and size", () => {
    const { root } = renderRoot(Sparkles, { color: "success", size: "sm" });
    expect(decorative(root)).toHaveClass("text-success");
    for (const sparkle of decorative(root).querySelectorAll<SVGElement>("svg"))
      expect(parseInt(sparkle.style.width)).toBeLessThan(8);
  });
});
