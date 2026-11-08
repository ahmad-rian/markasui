import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import type { Component } from "vue";
import BackgroundBeams from "../../components/background-beams/BackgroundBeams.vue";
import BackgroundBoxes from "../../components/background-boxes/BackgroundBoxes.vue";
import BackgroundLines from "../../components/background-lines/BackgroundLines.vue";
import GradientBorder from "../../components/gradient-border/GradientBorder.vue";

const decorative = (root: HTMLElement) =>
  root.querySelector<HTMLElement>(':scope > [aria-hidden="true"]')!;

const renderRoot = (
  component: Component,
  props: Record<string, unknown> = {},
) => {
  const result = render(component, { props, attrs: { "data-testid": "root" } });
  return { ...result, root: screen.getByTestId("root") };
};

describe("Vue background set A: shared behavior", () => {
  const cases = [
    ["BackgroundBeams", BackgroundBeams],
    ["BackgroundBoxes", BackgroundBoxes],
    ["BackgroundLines", BackgroundLines],
    ["GradientBorder", GradientBorder],
  ] as const;

  for (const [name, component] of cases) {
    it(`${name}: content outside the aria-hidden layer, user class last, attributes and style passed through`, () => {
      render(component, {
        attrs: {
          "data-testid": "root",
          id: "hero",
          class: "rounded-xl",
          style: "color: red",
        },
        slots: { default: "<h2>Launch</h2>" },
      });
      const root = screen.getByTestId("root");
      expect(root).toHaveAttribute("id", "hero");
      expect(root).toHaveClass("relative", "isolate");
      expect(root.className.endsWith("rounded-xl")).toBe(true);
      expect(root.style.color).toBe("red");
      expect(root.getAttribute("style")).toContain("--markas-");
      expect(decorative(root)).not.toContainElement(
        screen.getByRole("heading", { name: "Launch" }),
      );
    });
  }

  it("every animated element stops with reduced motion and its keyframes ship inline", () => {
    const animated = [
      [BackgroundBeams, {}, "markas-beams-flow"],
      [BackgroundBeams, { variant: "pulse" }, "markas-beams-pulse"],
      [BackgroundBeams, { variant: "collide" }, "markas-beams-fall"],
      [BackgroundBeams, { variant: "collide" }, "markas-beams-splash"],
      [BackgroundBoxes, {}, "markas-boxes-glow"],
      [BackgroundLines, {}, "markas-lines-draw"],
      [GradientBorder, {}, "markas-gb-spin"],
      [GradientBorder, { variant: "shine" }, "markas-gb-shine"],
      [GradientBorder, { variant: "pulse" }, "markas-gb-pulse"],
    ] as const;
    for (const [component, props, keyframe] of animated) {
      const { container, unmount } = render(component, { props });
      expect(container.querySelector("style")?.textContent).toContain(
        `@keyframes ${keyframe}`,
      );
      const moving = container.querySelectorAll(
        `[class*="animate-[${keyframe}"]`,
      );
      expect(moving.length).toBeGreaterThan(0);
      for (const node of moving)
        expect(node.getAttribute("class")).toContain(
          "motion-reduce:animate-none",
        );
      unmount();
    }
  });
});

describe("Vue BackgroundBeams", () => {
  it("flow: 8 curves by default with a dashed glint", () => {
    const { root, container } = renderRoot(BackgroundBeams);
    expect(root.style.getPropertyValue("--markas-beams-duration")).toBe("7s");
    expect(container.querySelectorAll("svg g")).toHaveLength(8);
    expect(container.querySelector("svg g path:last-child")).toHaveAttribute(
      "stroke-dasharray",
      "14 186",
    );
  });

  it("pulse drops the dash; collide renders capped drops and splashes", async () => {
    const { container, rerender } = renderRoot(BackgroundBeams, {
      variant: "pulse",
      count: 3,
    });
    expect(container.querySelectorAll("svg g")).toHaveLength(3);
    expect(container.querySelector("[stroke-dasharray]")).toBeNull();
    await rerender({ variant: "collide", count: 40, speed: "fast" });
    expect(container.querySelector("svg")).toBeNull();
    expect(
      container.querySelectorAll('[class*="markas-beams-fall"]'),
    ).toHaveLength(16);
    expect(
      container.querySelectorAll('[class*="markas-beams-splash"]'),
    ).toHaveLength(16);
  });
});

describe("Vue BackgroundBoxes", () => {
  it("renders rows x cols tiles, caps at 600, and lets the pointer reach the tiles", async () => {
    const { root, rerender } = renderRoot(BackgroundBoxes, {
      rows: 4,
      cols: 5,
      size: 32,
    });
    expect(root.style.getPropertyValue("--markas-boxes-cols")).toBe("5");
    expect(root.style.getPropertyValue("--markas-boxes-size")).toBe("32px");
    expect(decorative(root).querySelectorAll("span")).toHaveLength(20);
    expect(decorative(root)).not.toHaveClass("pointer-events-none");
    expect(root.lastElementChild).toHaveClass("pointer-events-none");
    await rerender({ rows: 99, cols: 99, variant: "perspective" });
    expect(decorative(root).querySelectorAll("span")).toHaveLength(600);
    expect(decorative(root).innerHTML).toContain("rotateX(58deg)");
  });
});

describe("Vue BackgroundLines", () => {
  it("waves by default, rays from one point, capped at 24", async () => {
    const { container, rerender } = renderRoot(BackgroundLines);
    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(12);
    expect(paths[0]).toHaveAttribute("pathLength", "100");
    expect((paths[1] as SVGPathElement).style.animationDelay).toBe("-650ms");
    await rerender({ variant: "rays", count: 5 });
    for (const path of container.querySelectorAll("path"))
      expect(path.getAttribute("d")).toMatch(/^M 400 -40 L/);
    await rerender({ variant: "lattice", count: 50 });
    expect(container.querySelectorAll("path")).toHaveLength(24);
  });
});

describe("Vue GradientBorder", () => {
  it("spin by default; glow, radius, color, and speed apply", async () => {
    const { root, rerender } = renderRoot(GradientBorder);
    expect(root).toHaveClass("rounded-xl", "p-px");
    expect(root.querySelectorAll(':scope > [aria-hidden="true"]')).toHaveLength(
      1,
    );
    expect(root.lastElementChild).toHaveClass("bg-surface", "rounded-[11px]");
    await rerender({
      glow: true,
      radius: "full",
      color: "success",
      speed: "fast",
    });
    const layers = root.querySelectorAll(':scope > [aria-hidden="true"]');
    expect(layers).toHaveLength(2);
    expect(layers[0]).toHaveClass("blur-lg", "-z-10", "text-success");
    expect(root).toHaveClass("rounded-full");
    expect(root.style.getPropertyValue("--markas-gb-duration")).toBe("2s");
  });
});
