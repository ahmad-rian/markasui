import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AuroraBackground } from "../../components/aurora-background/AuroraBackground";
import { DotPattern } from "../../components/dot-pattern/DotPattern";
import { GridPattern } from "../../components/grid-pattern/GridPattern";
import { RetroGrid } from "../../components/retro-grid/RetroGrid";
import { RippleBackground } from "../../components/ripple-background/RippleBackground";
import { StarsBackground } from "../../components/stars-background/StarsBackground";

const decorative = (root: HTMLElement) =>
  root.querySelector<HTMLElement>(':scope > [aria-hidden="true"]')!;

describe("React backgrounds: shared behavior", () => {
  const cases = [
    ["DotPattern", DotPattern],
    ["GridPattern", GridPattern],
    ["AuroraBackground", AuroraBackground],
    ["StarsBackground", StarsBackground],
    ["RetroGrid", RetroGrid],
    ["RippleBackground", RippleBackground],
  ] as const;

  for (const [name, Component] of cases) {
    it(`${name}: content above an aria-hidden layer, user class last, attributes passed through`, () => {
      render(
        <Component data-testid="root" id="hero" className="rounded-xl">
          <h2>Launch</h2>
        </Component>,
      );
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
      [
        GridPattern,
        "markas-grid-cell",
        { cells: [[1, 1]] as [number, number][] },
      ],
      [AuroraBackground, "markas-aurora-a", {}],
      [StarsBackground, "markas-twinkle", {}],
      [RetroGrid, "markas-retro-grid", {}],
      [RippleBackground, "markas-ripple", {}],
    ] as const;
    for (const [Component, keyframe, props] of animated) {
      const { container, unmount } = render(<Component {...props} />);
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

describe("React DotPattern", () => {
  it("default spacing 16px, dot 1px, muted, no mask", () => {
    render(<DotPattern data-testid="root" />);
    const root = screen.getByTestId("root");
    expect(root.style.getPropertyValue("--markas-dot-spacing")).toBe("16px");
    expect(root.style.getPropertyValue("--markas-dot-size")).toBe("1px");
    expect(decorative(root)).toHaveClass("text-muted/50");
    expect(decorative(root).className).not.toContain("mask-image");
  });

  it("applies spacing, dotSize, color, mask, and keeps the user style", () => {
    render(
      <DotPattern
        data-testid="root"
        spacing={24}
        dotSize={1.5}
        color="success"
        mask="radial"
        style={{ minHeight: 200 }}
      />,
    );
    const root = screen.getByTestId("root");
    expect(root.style.getPropertyValue("--markas-dot-spacing")).toBe("24px");
    expect(root.style.getPropertyValue("--markas-dot-size")).toBe("1.5px");
    expect(root.style.minHeight).toBe("200px");
    expect(decorative(root)).toHaveClass("text-success/50");
    expect(decorative(root).className).toContain(
      "[mask-image:radial-gradient(",
    );
  });
});

describe("React GridPattern", () => {
  it("places highlighted cells inside the grid lines with staggered delays", () => {
    render(
      <GridPattern
        data-testid="root"
        cellSize={20}
        color="primary"
        mask="linear"
        cells={[
          [2, 1],
          [0, 3],
        ]}
      />,
    );
    const root = screen.getByTestId("root");
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
    render(<GridPattern data-testid="root" />);
    expect(decorative(screen.getByTestId("root")).children).toHaveLength(0);
  });
});

describe("React AuroraBackground", () => {
  it("defaults to success at normal speed and accepts other tokens", () => {
    const { rerender } = render(<AuroraBackground data-testid="root" />);
    const layer = () => decorative(screen.getByTestId("root"));
    expect(layer()).toHaveClass(
      "[--markas-aurora-color:var(--color-success)]",
      "[--markas-aurora-speed:14s]",
    );
    expect(layer().children).toHaveLength(2);
    rerender(
      <AuroraBackground data-testid="root" color="warning" speed="slow" />,
    );
    expect(layer()).toHaveClass(
      "[--markas-aurora-color:var(--color-warning)]",
      "[--markas-aurora-speed:24s]",
    );
  });
});

describe("React StarsBackground", () => {
  const starStyles = (root: HTMLElement) =>
    [...decorative(root).querySelectorAll("span")].map((s) => s.style.cssText);

  it("renders count stars with the same layout for the same seed", () => {
    const { unmount } = render(
      <StarsBackground data-testid="root" count={30} seed={5} />,
    );
    const first = starStyles(screen.getByTestId("root"));
    expect(first).toHaveLength(30);
    unmount();
    render(<StarsBackground data-testid="root" count={30} seed={5} />);
    expect(starStyles(screen.getByTestId("root"))).toEqual(first);
  });

  it("matches the shared Park-Miller sequence used by Blade and Vue", () => {
    render(<StarsBackground data-testid="root" count={1} seed={7} />);
    const star = decorative(screen.getByTestId("root")).querySelector("span")!;
    // seed 7 -> state 8 -> 386168 (size 1), 1460846352 (left), 1741224500 (top)
    expect(star.style.width).toBe("1px");
    expect(star.style.left).toBe("63.52%");
    expect(star.style.top).toBe("45%");
  });

  it("changes layout with a different seed, clamps count, and colors stars", () => {
    const { unmount } = render(<StarsBackground data-testid="root" seed={1} />);
    const a = starStyles(screen.getByTestId("root"));
    expect(a).toHaveLength(80);
    expect(decorative(screen.getByTestId("root"))).toHaveClass("text-primary");
    unmount();
    render(
      <StarsBackground
        data-testid="root"
        seed={2}
        count={9999}
        color="warning"
      />,
    );
    const b = starStyles(screen.getByTestId("root"));
    expect(b).toHaveLength(400);
    expect(b.slice(0, 80)).not.toEqual(a);
    expect(decorative(screen.getByTestId("root"))).toHaveClass("text-warning");
  });

  it("renders no stars for a negative count", () => {
    render(<StarsBackground data-testid="root" count={-5} />);
    expect(starStyles(screen.getByTestId("root"))).toHaveLength(0);
  });
});

describe("React RetroGrid", () => {
  it("sets cell size and angle as CSS variables and applies the color token", () => {
    const { rerender } = render(<RetroGrid data-testid="root" />);
    const root = () => screen.getByTestId("root");
    expect(root().style.getPropertyValue("--markas-retro-cell")).toBe("60px");
    expect(root().style.getPropertyValue("--markas-retro-angle")).toBe("65deg");
    expect(decorative(root())).toHaveClass("text-muted/40");
    rerender(
      <RetroGrid data-testid="root" cellSize={40} angle={72} color="success" />,
    );
    expect(root().style.getPropertyValue("--markas-retro-cell")).toBe("40px");
    expect(root().style.getPropertyValue("--markas-retro-angle")).toBe("72deg");
    expect(decorative(root())).toHaveClass("text-success/50");
  });
});

describe("React RippleBackground", () => {
  it("grows and fades each ring and staggers the pulse from the center", () => {
    render(
      <RippleBackground
        data-testid="root"
        rings={3}
        size={80}
        gap={40}
        color="success"
      />,
    );
    const layer = decorative(screen.getByTestId("root"));
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
    const { unmount } = render(<RippleBackground data-testid="root" />);
    expect(decorative(screen.getByTestId("root")).children).toHaveLength(6);
    unmount();
    render(<RippleBackground data-testid="root" rings={50} />);
    const rings = decorative(screen.getByTestId("root")).querySelectorAll(
      "span",
    );
    expect(rings).toHaveLength(12);
    expect(rings[11]!.style.opacity).toBe("0.1");
  });
});
