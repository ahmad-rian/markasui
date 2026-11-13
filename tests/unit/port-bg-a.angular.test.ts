import {
  Component,
  provideZonelessChangeDetection,
  signal,
  type Type,
} from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from "@angular/platform-browser/testing";
import { fireEvent, screen } from "@testing-library/dom";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { AuroraBackground } from "../../components/aurora-background/aurora-background.component";
import { BackgroundBeams } from "../../components/background-beams/background-beams.component";
import { BackgroundBoxes } from "../../components/background-boxes/background-boxes.component";
import { BackgroundLines } from "../../components/background-lines/background-lines.component";
import { DotPattern } from "../../components/dot-pattern/dot-pattern.component";
import { GradientBorder } from "../../components/gradient-border/gradient-border.component";
import { GridPattern } from "../../components/grid-pattern/grid-pattern.component";
import { HeroHighlight } from "../../components/hero-highlight/hero-highlight.component";
import { LampEffect } from "../../components/lamp-effect/lamp-effect.component";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

const byId = (id: string) => document.getElementById(id)!;
const layerOf = (root: HTMLElement) =>
  root.querySelector<HTMLElement>(":scope > [aria-hidden=true]")!;

@Component({
  imports: [
    AuroraBackground,
    BackgroundBeams,
    BackgroundBoxes,
    BackgroundLines,
  ],
  template: `
    <div
      markas-aurora-background
      id="aurora"
      color="danger"
      speed="fast"
      class="px-6"
      style="color: red"
    >
      Hello
    </div>
    <div markas-background-beams id="beams" count="40"></div>
    <div
      markas-background-beams
      id="rain"
      variant="collide"
      [count]="count()"
    ></div>
    <div
      markas-background-boxes
      id="boxes"
      rows="3"
      cols="4"
      size="28"
      speed="slow"
    ></div>
    <div markas-background-lines id="lines" variant="rays" count="5"></div>
  `,
})
class AnimatedHost {
  readonly count = signal(4);
}

@Component({
  imports: [DotPattern, GradientBorder, GridPattern, HeroHighlight, LampEffect],
  template: `
    <div
      markas-dot-pattern
      id="dots"
      spacing="20"
      dotSize="1.5"
      mask="radial"
    ></div>
    <div markas-grid-pattern id="grid" cellSize="20" [cells]="cells"></div>
    <div markas-gradient-border id="border" glow radius="lg" variant="shine">
      Plan
    </div>
    <div
      markas-hero-highlight
      id="highlight"
      variant="grid"
      spacing="24"
      (pointermove)="moves = moves + 1"
    >
      Hi <mark>there</mark>
    </div>
    <div markas-lamp-effect id="lamp" variant="stage" size="lg"></div>
  `,
})
class StaticHost {
  readonly cells: [number, number][] = [
    [2, 1],
    [5, 3],
  ];
  moves = 0;
}

describe("Angular background ports", () => {
  it("aurora: classes on the host, user class and style kept, keyframes in the head", async () => {
    await mount(AnimatedHost);
    const root = byId("aurora");
    expect(root.classList).toContain("isolate");
    expect(root.classList).toContain("px-6");
    expect(root.style.color).toBe("red");
    expect(layerOf(root).classList).toContain(
      "[--markas-aurora-color:var(--color-danger)]",
    );
    expect(layerOf(root).classList).toContain("[--markas-aurora-speed:8s]");
    expect(screen.getByText("Hello")).toBeInTheDocument();
    const styles = [...document.querySelectorAll("style")].map(
      (style) => style.textContent,
    );
    expect(styles.some((css) => css?.includes("markas-aurora-a"))).toBe(true);
  });

  it("beams: count clamped to 16, collide draws drops and follows the count", async () => {
    const fixture = await mount(AnimatedHost);
    const beams = byId("beams");
    expect(beams.style.getPropertyValue("--markas-beams-duration")).toBe("7s");
    const paths = beams.querySelectorAll("path[stroke-dasharray]");
    expect(paths).toHaveLength(16);
    expect((paths[1] as SVGElement).style.animationDelay).toBe("-900ms");

    const rain = byId("rain");
    expect(rain.querySelector("svg")).toBeNull();
    expect(layerOf(rain).querySelectorAll(":scope > span > span")).toHaveLength(
      8,
    );
    fixture.componentInstance.count.set(2);
    await fixture.whenStable();
    expect(layerOf(rain).querySelectorAll(":scope > span > span")).toHaveLength(
      4,
    );
  });

  it("boxes and lines: tiles, embers, and paths from the same formulas", async () => {
    await mount(AnimatedHost);
    const boxes = byId("boxes");
    expect(boxes.style.getPropertyValue("--markas-boxes-cols")).toBe("4");
    expect(boxes.style.getPropertyValue("--markas-boxes-size")).toBe("28px");
    expect(boxes.style.getPropertyValue("--markas-boxes-duration")).toBe("9s");
    const tiles = [...layerOf(boxes).querySelectorAll<HTMLElement>("span")];
    expect(tiles).toHaveLength(12);
    const embers = tiles.filter((tile) =>
      tile.className.includes("markas-boxes-glow"),
    );
    expect(embers.length).toBeGreaterThan(0);
    expect(embers[0]!.style.animationDelay).toMatch(/ms$/);

    const lines = byId("lines").querySelectorAll("path");
    expect(lines).toHaveLength(5);
    expect(lines[0]!.getAttribute("d")).toMatch(/^M 400 -40 L /);
    expect(lines[2]!.style.opacity).toBe("0.5");
    expect(lines[2]!.style.animationDelay).toBe("-1300ms");
  });

  it("dot and grid patterns: spacing variables and highlighted cells", async () => {
    await mount(StaticHost);
    const dots = byId("dots");
    expect(dots.style.getPropertyValue("--markas-dot-spacing")).toBe("20px");
    expect(dots.style.getPropertyValue("--markas-dot-size")).toBe("1.5px");
    expect(layerOf(dots).className).toContain("[mask-image:radial-gradient");

    const grid = byId("grid");
    expect(grid.style.getPropertyValue("--markas-grid-size")).toBe("20px");
    const cells = layerOf(grid).querySelectorAll<HTMLElement>("span");
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

  it("gradient border: glow adds a layer behind, radius sets both corners", async () => {
    await mount(StaticHost);
    const border = byId("border");
    expect(border.classList).toContain("rounded-lg");
    const layers = border.querySelectorAll(":scope > [aria-hidden=true]");
    expect(layers).toHaveLength(2);
    expect(layers[0]!.classList).toContain("-z-10");
    expect(screen.getByText("Plan").classList).toContain("rounded-[7px]");
  });

  it("hero highlight and lamp: visible once mounted, pointer tracked, user handler still runs", async () => {
    const fixture = await mount(StaticHost);
    const highlight = byId("highlight");
    expect(highlight).toHaveAttribute("data-visible");
    expect(highlight.style.getPropertyValue("--markas-hh-spacing")).toBe(
      "24px",
    );
    fireEvent.pointerMove(highlight, { clientX: 40, clientY: 30 });
    expect(highlight.style.getPropertyValue("--markas-hh-x")).toBe("40px");
    expect(highlight.style.getPropertyValue("--markas-hh-y")).toBe("30px");
    expect(fixture.componentInstance.moves).toBe(1);

    const lamp = byId("lamp");
    expect(lamp).toHaveAttribute("data-visible");
    expect(layerOf(lamp).querySelectorAll("div")).toHaveLength(4);
    expect(layerOf(lamp).classList).toContain("[--markas-lamp-w:28rem]");
  });
});
