import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Meteors } from "../../components/meteors/Meteors";
import { ShootingStars } from "../../components/shooting-stars/ShootingStars";
import { Sparkles } from "../../components/sparkles/Sparkles";
import { WavyBackground } from "../../components/wavy-background/WavyBackground";

const decorative = (root: HTMLElement) =>
  root.querySelector<HTMLElement>(':scope > [aria-hidden="true"]')!;

const renderRoot = (ui: React.ReactElement) => {
  const result = render(ui);
  return { ...result, root: screen.getByTestId("root") };
};

describe("React set B backgrounds: shared behavior", () => {
  const cases = [
    ["WavyBackground", WavyBackground, "markas-wave"],
    ["Meteors", Meteors, "markas-meteor"],
    ["ShootingStars", ShootingStars, "markas-shooting-star"],
    ["Sparkles", Sparkles, "markas-sparkle"],
  ] as const;

  for (const [name, Component, keyframe] of cases) {
    it(`${name}: content above an aria-hidden layer, user class last, attributes passed through`, () => {
      const { root } = renderRoot(
        <Component data-testid="root" id="hero" className="rounded-xl">
          <h2>Launch</h2>
        </Component>,
      );
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
      const { container } = render(<Component />);
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

describe("React WavyBackground", () => {
  it("defaults to 4 filled ocean waves in primary with blur", () => {
    const { root } = renderRoot(<WavyBackground data-testid="root" />);
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

  it("silk draws thin strokes, clamps waves to 3..5, and applies color and speed", () => {
    const { root, rerender } = renderRoot(
      <WavyBackground
        data-testid="root"
        variant="silk"
        color="success"
        speed="fast"
        waves={9}
      />,
    );
    const layer = decorative(root);
    expect(layer).toHaveClass("text-success");
    const waves = layer.querySelectorAll("svg");
    expect(waves).toHaveLength(5);
    const path = waves[0]!.querySelector("path")!;
    expect(path).toHaveAttribute("fill", "none");
    expect(path).toHaveAttribute("stroke", "currentColor");
    expect(waves[4]).toHaveStyle({ animationDuration: "10s" });

    rerender(<WavyBackground data-testid="root" variant="layered" waves={1} />);
    expect(
      decorative(screen.getByTestId("root")).querySelectorAll("svg"),
    ).toHaveLength(3);
  });

  it("wave paths cover the full width so the loop is seamless", () => {
    const { root } = renderRoot(<WavyBackground data-testid="root" />);
    for (const path of decorative(root).querySelectorAll("path")) {
      const xs = [...path.getAttribute("d")!.matchAll(/[MQT](-?\d+)/g)].map(
        (m) => Number(m[1]),
      );
      expect(Math.min(...xs)).toBeLessThanOrEqual(0);
      expect(Math.max(...xs)).toBeGreaterThanOrEqual(1200);
    }
  });
});

describe("React Meteors", () => {
  it("rain renders 20 thin meteors at 35 degrees by default", () => {
    const { root } = renderRoot(<Meteors data-testid="root" />);
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

  it("comet is fewer and thicker; count, angle, color, and seed apply", () => {
    const { root, rerender } = renderRoot(
      <Meteors data-testid="root" variant="comet" color="warning" />,
    );
    expect(decorative(root).querySelectorAll("span")).toHaveLength(6);
    expect(decorative(root).querySelector("span")).toHaveClass("size-1");
    expect(decorative(root)).toHaveClass("text-warning");

    rerender(<Meteors data-testid="root" count={500} angle={90} seed={4} />);
    const layer = decorative(screen.getByTestId("root"));
    expect(layer.querySelectorAll("span")).toHaveLength(60);
    expect(layer.style.getPropertyValue("--markas-meteor-angle")).toBe(
      "270deg",
    );
  });

  it("the same seed gives the same shower, another seed differs", () => {
    const styles = (seed: number) => {
      const { container, unmount } = render(<Meteors seed={seed} />);
      const result = [...container.querySelectorAll("span")].map(
        (s) => s.getAttribute("style") ?? "",
      );
      unmount();
      return result;
    };
    expect(styles(3)).toEqual(styles(3));
    expect(styles(3)).not.toEqual(styles(4));
  });
});

describe("React ShootingStars", () => {
  it("night: 70 stars over the whole sky and 3 streaks with a primary trail", () => {
    const { root } = renderRoot(<ShootingStars data-testid="root" />);
    const layer = decorative(root);
    expect(layer).toHaveClass("text-primary");
    expect(layer.querySelectorAll('[class*="markas-star-blink"]')).toHaveLength(
      70,
    );
    const streaks = layer.querySelectorAll('[class*="markas-shooting-star"]');
    expect(streaks).toHaveLength(3);
    expect(streaks[0]).toHaveStyle({ animationDuration: "9000ms" });
  });

  it("dawn adds a warm glow and a warning trail; frequency and trailColor apply", () => {
    const { root, rerender } = renderRoot(
      <ShootingStars data-testid="root" variant="dawn" />,
    );
    const layer = decorative(root);
    expect(layer).toHaveClass("text-warning");
    expect(layer.querySelector(".from-warning\\/25")).not.toBeNull();
    for (const star of layer.querySelectorAll<HTMLElement>(
      '[class*="markas-star-blink"]',
    ))
      expect(parseFloat(star.style.top)).toBeLessThan(60);

    rerender(
      <ShootingStars
        data-testid="root"
        frequency="high"
        trailColor="danger"
        stars={0}
      />,
    );
    const next = decorative(screen.getByTestId("root"));
    expect(next).toHaveClass("text-danger");
    expect(next.querySelectorAll('[class*="markas-star-blink"]')).toHaveLength(
      0,
    );
    expect(
      next.querySelector<HTMLElement>('[class*="markas-shooting-star"]'),
    ).toHaveStyle({ animationDuration: "4500ms" });
  });
});

describe("React Sparkles", () => {
  it("field mixes stars and dots in warning", () => {
    const { root } = renderRoot(<Sparkles data-testid="root" density={40} />);
    const layer = decorative(root);
    expect(layer).toHaveClass("text-warning");
    expect(layer.querySelectorAll("svg")).toHaveLength(40);
    expect(layer.querySelectorAll("circle").length).toBeGreaterThan(0);
    expect(layer.querySelectorAll("path").length).toBeGreaterThan(0);
  });

  it("text keeps stars in the edge bands around the content", () => {
    const { root } = renderRoot(
      <Sparkles data-testid="root" variant="text" density={30} />,
    );
    const sparkles = decorative(root).querySelectorAll<SVGElement>("svg");
    expect(decorative(root).querySelectorAll("circle")).toHaveLength(0);
    for (const sparkle of sparkles) {
      const left = parseFloat(sparkle.style.left);
      const top = parseFloat(sparkle.style.top);
      const nearEdge = (v: number) => v <= 15 || v >= 85;
      expect(nearEdge(left) || nearEdge(top)).toBe(true);
    }
  });

  it("burst hides sparkles at the center until hover or focus, with motion-safe only", () => {
    const { root } = renderRoot(
      <Sparkles data-testid="root" variant="burst" size="lg" density={500} />,
    );
    expect(root).toHaveClass("group/sparkles");
    const sparkles = decorative(root).querySelectorAll<SVGElement>("svg");
    expect(sparkles).toHaveLength(120);
    const first = sparkles[0]!;
    expect(first).toHaveClass("opacity-0", "top-1/2", "left-1/2");
    expect(first.getAttribute("class")).toContain(
      "motion-safe:group-hover/sparkles:animate-[markas-sparkle-burst",
    );
    expect(first.getAttribute("class")).toContain(
      "motion-safe:group-focus-within/sparkles:animate-[markas-sparkle-burst",
    );
    expect(first.style.getPropertyValue("--markas-sparkle-x")).toMatch(
      /^-?\d+px$/,
    );
    expect(parseInt(first.style.width)).toBeGreaterThanOrEqual(10);
  });

  it("applies color and size", () => {
    const { root } = renderRoot(
      <Sparkles data-testid="root" color="success" size="sm" />,
    );
    expect(decorative(root)).toHaveClass("text-success");
    for (const sparkle of decorative(root).querySelectorAll<SVGElement>("svg"))
      expect(parseInt(sparkle.style.width)).toBeLessThan(8);
  });
});
