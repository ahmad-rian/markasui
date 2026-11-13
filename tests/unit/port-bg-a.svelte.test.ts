import { fireEvent, render, screen } from "@testing-library/svelte";
import { createRawSnippet, tick } from "svelte";
import { describe, expect, it, vi } from "vitest";
import AuroraBackground from "../../components/aurora-background/AuroraBackground.svelte";
import BackgroundBeams from "../../components/background-beams/BackgroundBeams.svelte";
import BackgroundBoxes from "../../components/background-boxes/BackgroundBoxes.svelte";
import BackgroundLines from "../../components/background-lines/BackgroundLines.svelte";
import DotPattern from "../../components/dot-pattern/DotPattern.svelte";
import GradientBorder from "../../components/gradient-border/GradientBorder.svelte";
import GridPattern from "../../components/grid-pattern/GridPattern.svelte";
import HeroHighlight from "../../components/hero-highlight/HeroHighlight.svelte";
import LampEffect from "../../components/lamp-effect/LampEffect.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

const rootOf = (container: HTMLElement) =>
  container.querySelector<HTMLElement>(".isolate")!;
const layerOf = (container: HTMLElement) =>
  rootOf(container).querySelector<HTMLElement>(":scope > [aria-hidden=true]")!;

describe("Svelte background ports", () => {
  it("aurora: decorative layer, color and speed tokens, user class and attributes on the root", () => {
    const { container } = render(AuroraBackground, {
      children: text("Hello"),
      color: "danger",
      speed: "fast",
      class: "px-6",
      id: "hero",
    });
    const root = rootOf(container);
    expect(root.id).toBe("hero");
    expect(root.className.endsWith("px-6")).toBe(true);
    expect(root.querySelector("style")?.textContent).toContain(
      "@keyframes markas-aurora-a",
    );
    const layer = layerOf(container);
    expect(layer.className).toContain("pointer-events-none");
    expect(layer.className).toContain(
      "[--markas-aurora-color:var(--color-danger)]",
    );
    expect(layer.className).toContain("[--markas-aurora-speed:8s]");
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("beams: curves by default, rain with collide, count clamped to 16, user style kept", () => {
    const { container, unmount } = render(BackgroundBeams, {
      count: 40,
      style: "color: red",
    });
    const root = rootOf(container);
    expect(root.style.getPropertyValue("--markas-beams-duration")).toBe("7s");
    expect(root.style.color).toBe("red");
    const beams = container.querySelectorAll<SVGPathElement>(
      "path[stroke-dasharray]",
    );
    expect(beams).toHaveLength(16);
    expect(beams[1]!.style.animationDelay).toBe("-900ms");
    expect(beams[1]!.style.strokeDashoffset).toBe("-37");
    unmount();

    const rain = render(BackgroundBeams, { variant: "collide", count: 4 });
    expect(rain.container.querySelector("svg")).toBeNull();
    const drops = layerOf(rain.container).querySelectorAll(
      ":scope > span > span",
    );
    expect(drops).toHaveLength(8);
  });

  it("boxes: rows times cols tiles, a few embers, css variables on the root", () => {
    const { container } = render(BackgroundBoxes, {
      rows: 3,
      cols: 4,
      size: 28,
      speed: "slow",
    });
    const root = rootOf(container);
    expect(root.style.getPropertyValue("--markas-boxes-cols")).toBe("4");
    expect(root.style.getPropertyValue("--markas-boxes-size")).toBe("28px");
    expect(root.style.getPropertyValue("--markas-boxes-duration")).toBe("9s");
    const tiles = layerOf(container).querySelectorAll("span");
    expect(tiles).toHaveLength(12);
    const embers = [...tiles].filter((tile) =>
      tile.className.includes("markas-boxes-glow"),
    );
    expect(embers.length).toBeGreaterThan(0);
    expect(embers[0]!.getAttribute("style")).toMatch(/^animation-delay:/);
  });

  it("lines: one path per line with an opacity and delay", () => {
    const { container } = render(BackgroundLines, {
      variant: "rays",
      count: 5,
    });
    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(5);
    expect(paths[0]!.getAttribute("d")).toMatch(/^M 400 -40 L /);
    expect(paths[2]!.style.opacity).toBe("0.5");
    expect(paths[2]!.style.animationDelay).toBe("-1300ms");
  });

  it("dot pattern and grid pattern: spacing and highlighted cells", () => {
    const dots = render(DotPattern, {
      spacing: 20,
      dotSize: 1.5,
      mask: "radial",
    });
    expect(
      rootOf(dots.container).style.getPropertyValue("--markas-dot-spacing"),
    ).toBe("20px");
    expect(layerOf(dots.container).className).toContain(
      "[mask-image:radial-gradient",
    );

    const grid = render(GridPattern, {
      cellSize: 20,
      cells: [
        [2, 1],
        [5, 3],
      ],
    });
    const cells = layerOf(grid.container).querySelectorAll("span");
    expect(cells).toHaveLength(2);
    const { left, top, width, height, animationDelay } = cells[1]!.style;
    expect([left, top, width, height, animationDelay]).toEqual([
      "101px",
      "61px",
      "19px",
      "19px",
      "800ms",
    ]);
  });

  it("gradient border: glow adds a second layer, radius sets both corners", () => {
    const { container } = render(GradientBorder, {
      children: text("Plan"),
      glow: true,
      radius: "lg",
      variant: "shine",
    });
    const root = rootOf(container);
    expect(root.className).toContain("rounded-lg");
    const layers = root.querySelectorAll(":scope > [aria-hidden=true]");
    expect(layers).toHaveLength(2);
    expect(layers[0]!.className).toContain("-z-10");
    expect(screen.getByText("Plan").parentElement!.className).toContain(
      "rounded-[7px]",
    );
  });

  it("hero highlight: becomes visible, tracks the pointer, then calls the user handler", async () => {
    const onpointermove = vi.fn();
    const { container } = render(HeroHighlight, {
      children: text("Hi"),
      variant: "grid",
      spacing: 24,
      onpointermove,
    });
    await tick();
    const root = rootOf(container);
    expect(root).toHaveAttribute("data-visible");
    expect(root.style.getPropertyValue("--markas-hh-spacing")).toBe("24px");
    await fireEvent.pointerMove(root, { clientX: 40, clientY: 30 });
    expect(root.style.getPropertyValue("--markas-hh-x")).toBe("40px");
    expect(root.style.getPropertyValue("--markas-hh-y")).toBe("30px");
    expect(onpointermove).toHaveBeenCalledOnce();
  });

  it("lamp: part count per variant and the entrance starts once visible", async () => {
    const { container } = render(LampEffect, { variant: "stage", size: "lg" });
    await tick();
    expect(rootOf(container)).toHaveAttribute("data-visible");
    const layer = layerOf(container);
    expect(layer.querySelectorAll("div")).toHaveLength(4);
    expect(layer.className).toContain("[--markas-lamp-w:28rem]");
  });
});
