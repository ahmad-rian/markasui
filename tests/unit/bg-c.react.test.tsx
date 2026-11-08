import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HeroHighlight } from "../../components/hero-highlight/HeroHighlight";
import { LampEffect } from "../../components/lamp-effect/LampEffect";
import { NoiseBackground } from "../../components/noise-background/NoiseBackground";
import { SpotlightBeam } from "../../components/spotlight-beam/SpotlightBeam";

const decorative = (root: HTMLElement) =>
  root.querySelector<HTMLElement>(':scope > [aria-hidden="true"]')!;

const box = { left: 0, top: 0, width: 200, height: 100 } as DOMRect;

/** IntersectionObserver stub that lets a test decide when the root scrolls into view. */
function stubObserver() {
  const instances: { fire: (hit: boolean) => void; disconnect: () => void }[] =
    [];
  class Observer {
    disconnect = vi.fn();
    constructor(private callback: IntersectionObserverCallback) {
      instances.push({
        fire: (hit) =>
          this.callback(
            [{ isIntersecting: hit } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          ),
        disconnect: this.disconnect,
      });
    }
    observe() {}
  }
  vi.stubGlobal("IntersectionObserver", Observer);
  return instances;
}

afterEach(() => vi.unstubAllGlobals());

describe("React bg-c: shared behavior", () => {
  const cases = [
    ["LampEffect", LampEffect],
    ["SpotlightBeam", SpotlightBeam],
    ["NoiseBackground", NoiseBackground],
    ["HeroHighlight", HeroHighlight],
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

  it("ships keyframes and stops every animation with reduced motion", () => {
    const animated = [
      [LampEffect, "markas-lamp"],
      [SpotlightBeam, "markas-beam"],
      [NoiseBackground, "markas-noise-drift"],
    ] as const;
    for (const [Component, keyframe] of animated) {
      const { container, unmount } = render(<Component />);
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
    const { container } = render(<HeroHighlight />);
    expect(container.querySelector("style")?.textContent).toContain(
      "@keyframes markas-highlight",
    );
    expect(container.firstElementChild).toHaveClass(
      "motion-reduce:[&_mark]:animate-none",
    );
  });

  it("entrances wait until the root scrolls into view, then play once", () => {
    for (const Component of [LampEffect, SpotlightBeam, HeroHighlight]) {
      const observers = stubObserver();
      const { unmount } = render(<Component data-testid="root" />);
      const root = screen.getByTestId("root");
      expect(root).not.toHaveAttribute("data-visible");
      observers[0]!.fire(false);
      expect(root).not.toHaveAttribute("data-visible");
      observers[0]!.fire(true);
      expect(root).toHaveAttribute("data-visible");
      expect(observers[0]!.disconnect).toHaveBeenCalled();
      unmount();
      vi.unstubAllGlobals();
    }
  });

  it("without IntersectionObserver the entrance starts right away", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<LampEffect data-testid="root" />);
    expect(screen.getByTestId("root")).toHaveAttribute("data-visible");
  });
});

describe("React LampEffect", () => {
  it("defaults: lamp with a line, primary, md, normal speed", () => {
    render(<LampEffect data-testid="root" />);
    const layer = decorative(screen.getByTestId("root"));
    expect(layer).toHaveClass(
      "text-primary",
      "[--markas-lamp-w:20rem]",
      "[--markas-lamp-speed:1.2s]",
    );
    expect(layer.children).toHaveLength(5);
    expect(layer.querySelector(".bg-current")).not.toBeNull();
  });

  it("variant, color, size, and speed change the light", () => {
    const { rerender } = render(
      <LampEffect
        data-testid="root"
        variant="stage"
        color="warning"
        size="lg"
        speed="fast"
      />,
    );
    const layer = () => decorative(screen.getByTestId("root"));
    expect(layer()).toHaveClass(
      "text-warning",
      "[--markas-lamp-w:28rem]",
      "[--markas-lamp-speed:0.7s]",
    );
    expect(layer().children).toHaveLength(4);
    expect(layer().children[0]!.className).toContain("origin-top-left");
    rerender(<LampEffect data-testid="root" variant="halo" />);
    expect(layer().children).toHaveLength(2);
  });
});

describe("React SpotlightBeam", () => {
  it("defaults: top-left, three beams, medium intensity", () => {
    render(<SpotlightBeam data-testid="root" />);
    const layer = decorative(screen.getByTestId("root"));
    expect(layer).toHaveClass(
      "text-primary",
      "[--markas-beam-strength:34%]",
      "[--markas-beam-speed:1.6s]",
    );
    const source = layer.firstElementChild!;
    expect(source).toHaveClass("[--markas-beam-angle:32deg]");
    expect(source.children).toHaveLength(3);
  });

  it("top-right mirrors the source and center points straight down", () => {
    const { rerender } = render(
      <SpotlightBeam
        data-testid="root"
        variant="top-right"
        intensity="strong"
      />,
    );
    const source = () =>
      decorative(screen.getByTestId("root")).firstElementChild!;
    expect(source()).toHaveClass("-scale-x-100");
    expect(decorative(screen.getByTestId("root"))).toHaveClass(
      "[--markas-beam-strength:50%]",
    );
    rerender(<SpotlightBeam data-testid="root" variant="center" />);
    expect(source()).toHaveClass("[--markas-beam-angle:90deg]");
  });

  it("follow leans the source toward the pointer, off by default", () => {
    const onPointerMove = vi.fn();
    const { rerender } = render(
      <SpotlightBeam data-testid="root" onPointerMove={onPointerMove} />,
    );
    const root = screen.getByTestId("root");
    root.getBoundingClientRect = () => box;
    fireEvent.pointerMove(root, { clientX: 200, clientY: 0 });
    expect(root.style.getPropertyValue("--markas-beam-x")).toBe("");
    expect(onPointerMove).toHaveBeenCalledTimes(1);

    rerender(
      <SpotlightBeam data-testid="root" follow onPointerMove={onPointerMove} />,
    );
    fireEvent.pointerMove(root, { clientX: 200, clientY: 0 });
    expect(root.style.getPropertyValue("--markas-beam-x")).toBe("1.000");
    expect(root.style.getPropertyValue("--markas-beam-y")).toBe("-1.000");
  });

  it("follow stays still with reduced motion", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    render(<SpotlightBeam data-testid="root" follow />);
    const root = screen.getByTestId("root");
    root.getBoundingClientRect = () => box;
    fireEvent.pointerMove(root, { clientX: 200, clientY: 0 });
    expect(root.style.getPropertyValue("--markas-beam-x")).toBe("");
  });
});

describe("React NoiseBackground", () => {
  it("defaults: grain texture as a mask over ink, no vignette", () => {
    render(<NoiseBackground data-testid="root" />);
    const layer = decorative(screen.getByTestId("root"));
    expect(layer).toHaveClass(
      "text-primary",
      "[--markas-noise-alpha:0.09]",
      "[--markas-noise-size:200px]",
      "[--markas-noise-speed:18s]",
    );
    const grain = layer.querySelector<HTMLElement>(".bg-ink")!;
    expect(grain.style.maskImage).toContain("feTurbulence");
    expect(grain.style.maskImage).toContain("baseFrequency='.85'");
    expect(layer.children).toHaveLength(2);
  });

  it("film adds a vignette, paper swaps the texture", () => {
    const { rerender } = render(
      <NoiseBackground
        data-testid="root"
        variant="film"
        intensity="high"
        size="coarse"
      />,
    );
    const layer = () => decorative(screen.getByTestId("root"));
    expect(layer().children).toHaveLength(3);
    expect(layer()).toHaveClass(
      "[--markas-noise-alpha:0.15]",
      "[--markas-noise-size:320px]",
    );
    rerender(<NoiseBackground data-testid="root" variant="paper" />);
    expect(layer().children).toHaveLength(2);
    expect(
      layer().querySelector<HTMLElement>(".bg-ink")!.style.maskImage,
    ).toContain("baseFrequency='.5 .12'");
  });
});

describe("React HeroHighlight", () => {
  it("defaults: dots, spacing 16, radius 160, primary marks", () => {
    render(
      <HeroHighlight data-testid="root" style={{ minHeight: 10 }}>
        <p>
          Hello <mark>world</mark>
        </p>
      </HeroHighlight>,
    );
    const root = screen.getByTestId("root");
    expect(root.style.getPropertyValue("--markas-hh-spacing")).toBe("16px");
    expect(root.style.getPropertyValue("--markas-hh-radius")).toBe("160px");
    expect(root.style.minHeight).toBe("10px");
    expect(root).toHaveClass("[--markas-hh-color:var(--markas-primary)]");
    expect(root.className).toContain("[&_mark]:animate-[markas-highlight");
    const [dim, glow] = [...decorative(root).children];
    expect(dim!.className).toContain("radial-gradient(currentColor_1px");
    expect(glow).toHaveClass("opacity-0", "group-hover/highlight:opacity-100");
    expect(screen.getByText("world").tagName).toBe("MARK");
  });

  it("grid variant, color, spacing, radius, and speed", () => {
    render(
      <HeroHighlight
        data-testid="root"
        variant="grid"
        color="success"
        spacing={32}
        radius={200}
        speed="slow"
      />,
    );
    const root = screen.getByTestId("root");
    expect(root.style.getPropertyValue("--markas-hh-spacing")).toBe("32px");
    expect(root.style.getPropertyValue("--markas-hh-radius")).toBe("200px");
    expect(root).toHaveClass(
      "[--markas-hh-color:var(--markas-success)]",
      "[--markas-hh-speed:1.6s]",
    );
    expect(decorative(root).children[0]!.className).toContain(
      "linear-gradient(to_right,currentColor_1px",
    );
  });

  it("stores the pointer position for the glow and keeps the user handler", () => {
    const onPointerMove = vi.fn();
    render(<HeroHighlight data-testid="root" onPointerMove={onPointerMove} />);
    const root = screen.getByTestId("root");
    root.getBoundingClientRect = () => ({ ...box, left: 10, top: 20 });
    fireEvent.pointerMove(root, { clientX: 60, clientY: 50 });
    expect(root.style.getPropertyValue("--markas-hh-x")).toBe("50px");
    expect(root.style.getPropertyValue("--markas-hh-y")).toBe("30px");
    expect(onPointerMove).toHaveBeenCalledTimes(1);
  });
});
