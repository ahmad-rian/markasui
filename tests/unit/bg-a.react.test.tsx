import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BackgroundBeams } from "../../components/background-beams/BackgroundBeams";
import { BackgroundBoxes } from "../../components/background-boxes/BackgroundBoxes";
import { BackgroundLines } from "../../components/background-lines/BackgroundLines";
import { GradientBorder } from "../../components/gradient-border/GradientBorder";

const decorative = (root: HTMLElement) =>
  root.querySelector<HTMLElement>(':scope > [aria-hidden="true"]')!;

describe("React background set A: shared behavior", () => {
  const cases = [
    ["BackgroundBeams", BackgroundBeams],
    ["BackgroundBoxes", BackgroundBoxes],
    ["BackgroundLines", BackgroundLines],
    ["GradientBorder", GradientBorder],
  ] as const;

  for (const [name, Component] of cases) {
    it(`${name}: content outside the aria-hidden layer, user class last, attributes and style passed through`, () => {
      render(
        <Component
          data-testid="root"
          id="hero"
          className="rounded-xl"
          style={{ color: "red" }}
        >
          <h2>Launch</h2>
        </Component>,
      );
      const root = screen.getByTestId("root");
      expect(root).toHaveAttribute("id", "hero");
      expect(root).toHaveClass("relative", "isolate");
      expect(root.className.endsWith("rounded-xl")).toBe(true);
      expect(root.style.color).toBe("red");
      expect(decorative(root)).not.toContainElement(
        screen.getByRole("heading", { name: "Launch" }),
      );
    });
  }

  it("every animated element stops with reduced motion and its keyframes ship inline", () => {
    const animated = [
      [<BackgroundBeams key="a" />, "markas-beams-flow"],
      [<BackgroundBeams key="b" variant="pulse" />, "markas-beams-pulse"],
      [<BackgroundBeams key="c" variant="collide" />, "markas-beams-fall"],
      [<BackgroundBeams key="d" variant="collide" />, "markas-beams-splash"],
      [<BackgroundBoxes key="e" />, "markas-boxes-glow"],
      [<BackgroundLines key="f" />, "markas-lines-draw"],
      [<GradientBorder key="g" />, "markas-gb-spin"],
      [<GradientBorder key="h" variant="shine" />, "markas-gb-shine"],
      [<GradientBorder key="i" variant="pulse" />, "markas-gb-pulse"],
    ] as const;
    for (const [element, keyframe] of animated) {
      const { container, unmount } = render(element);
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

describe("React BackgroundBeams", () => {
  it("flow: 8 curves by default, each with a track and a dashed glint", () => {
    const { container } = render(<BackgroundBeams data-testid="root" />);
    const root = screen.getByTestId("root");
    expect(root.style.getPropertyValue("--markas-beams-duration")).toBe("7s");
    expect(container.querySelectorAll("svg g")).toHaveLength(8);
    const glint = container.querySelector("svg g path:last-child")!;
    expect(glint).toHaveAttribute("stroke-dasharray", "14 186");
    expect(decorative(root).getAttribute("class")).toContain("text-primary");
  });

  it("pulse drops the dash, collide renders drops with splashes, count is capped at 16", () => {
    const { container, rerender } = render(
      <BackgroundBeams variant="pulse" count={3} />,
    );
    expect(container.querySelectorAll("svg g")).toHaveLength(3);
    expect(container.querySelector("[stroke-dasharray]")).toBeNull();

    rerender(
      <BackgroundBeams
        variant="collide"
        count={40}
        speed="fast"
        color="danger"
      />,
    );
    expect(container.querySelector("svg")).toBeNull();
    expect(
      container.querySelectorAll('[class*="markas-beams-fall"]'),
    ).toHaveLength(16);
    expect(
      container.querySelectorAll('[class*="markas-beams-splash"]'),
    ).toHaveLength(16);
    expect(container.firstElementChild).toHaveStyle({
      "--markas-beams-duration": "4s",
    });
  });

  it("produces the same markup on every render (deterministic)", () => {
    const first = render(<BackgroundBeams variant="collide" />).container
      .innerHTML;
    const second = render(<BackgroundBeams variant="collide" />).container
      .innerHTML;
    expect(second).toBe(first);
  });
});

describe("React BackgroundBoxes", () => {
  it("renders rows x cols tiles, a few of them glowing on their own", () => {
    const { container } = render(
      <BackgroundBoxes data-testid="root" rows={4} cols={5} size={32} />,
    );
    const root = screen.getByTestId("root");
    expect(root.style.getPropertyValue("--markas-boxes-cols")).toBe("5");
    expect(root.style.getPropertyValue("--markas-boxes-size")).toBe("32px");
    const tiles = decorative(root).querySelectorAll("span");
    expect(tiles).toHaveLength(20);
    const lit = [...tiles].filter((tile) =>
      tile.className.includes("markas-boxes-glow"),
    );
    expect(lit.length).toBeGreaterThan(0);
    expect(lit.length).toBeLessThan(tiles.length / 4);
    expect(tiles[1]).toHaveClass("hover:bg-current/40");
    expect(container.querySelector("style")).not.toBeNull();
  });

  it("caps the grid at 600 tiles and lets the pointer reach the tiles", () => {
    render(<BackgroundBoxes data-testid="root" rows={99} cols={99} />);
    const root = screen.getByTestId("root");
    expect(decorative(root).querySelectorAll("span")).toHaveLength(600);
    expect(decorative(root)).not.toHaveClass("pointer-events-none");
    expect(root.lastElementChild).toHaveClass("pointer-events-none");
  });

  it("variant changes the grid transform", () => {
    const { container, rerender } = render(<BackgroundBoxes />);
    const grid = () => container.querySelector('[class*="grid-cols"]')!;
    expect(grid().className).toContain("skewX(-48deg)");
    rerender(<BackgroundBoxes variant="perspective" />);
    expect(grid().className).toContain("rotateX(58deg)");
    rerender(<BackgroundBoxes variant="flat" />);
    expect(grid()).toHaveClass("-translate-x-1/2");
  });
});

describe("React BackgroundLines", () => {
  it("waves: 12 drawn paths by default with staggered delays", () => {
    const { container } = render(<BackgroundLines />);
    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(12);
    expect(paths[0]).toHaveAttribute("pathLength", "100");
    expect(paths[0]!.getAttribute("d")).toMatch(/^M -40 \d+ C/);
    expect((paths[1] as SVGPathElement).style.animationDelay).toBe("-650ms");
  });

  it("rays start from one point and lattice crosses lines, capped at 24", () => {
    const { container, rerender } = render(
      <BackgroundLines variant="rays" count={5} />,
    );
    for (const path of container.querySelectorAll("path"))
      expect(path.getAttribute("d")).toMatch(/^M 400 -40 L/);
    rerender(<BackgroundLines variant="lattice" count={50} speed="slow" />);
    expect(container.querySelectorAll("path")).toHaveLength(24);
    expect(container.firstElementChild).toHaveStyle({
      "--markas-lines-duration": "12s",
    });
  });
});

describe("React GradientBorder", () => {
  it("spin by default: one gradient layer, inner surface with matching radius", () => {
    render(
      <GradientBorder data-testid="root">
        <p>Plan</p>
      </GradientBorder>,
    );
    const root = screen.getByTestId("root");
    expect(root).toHaveClass("rounded-xl", "p-px");
    expect(root.querySelectorAll(':scope > [aria-hidden="true"]')).toHaveLength(
      1,
    );
    expect(screen.getByText("Plan").parentElement).toHaveClass(
      "bg-surface",
      "rounded-[11px]",
    );
    expect(root.style.getPropertyValue("--markas-gb-duration")).toBe("4s");
  });

  it("glow adds a blurred layer behind; radius, color, and speed apply", () => {
    render(
      <GradientBorder
        data-testid="root"
        glow
        radius="full"
        color="success"
        speed="fast"
      />,
    );
    const root = screen.getByTestId("root");
    const layers = root.querySelectorAll(':scope > [aria-hidden="true"]');
    expect(layers).toHaveLength(2);
    expect(layers[0]).toHaveClass("blur-lg", "-z-10", "text-success");
    expect(root).toHaveClass("rounded-full");
    expect(root.style.getPropertyValue("--markas-gb-duration")).toBe("2s");
  });
});
