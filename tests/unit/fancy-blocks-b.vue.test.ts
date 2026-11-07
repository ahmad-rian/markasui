import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ElasticLine from "../../components/elastic-line/ElasticLine.vue";
import ImageTrail from "../../components/image-trail/ImageTrail.vue";
import PixelTrail from "../../components/pixel-trail/PixelTrail.vue";
import StackingCards from "../../components/stacking-cards/StackingCards.vue";

/** requestAnimationFrame callbacks wait here until the test runs them. */
let frames: FrameRequestCallback[] = [];
const runFrames = (times = 1, now = 0) => {
  for (let i = 0; i < times; i++) {
    const queue = frames;
    frames = [];
    for (const callback of queue) callback(now);
  }
};

/** IntersectionObserver that the test drives by hand. */
let observed: {
  callback: IntersectionObserverCallback;
  disconnect: () => void;
}[] = [];
const intersect = (isIntersecting = true) => {
  for (const item of observed)
    item.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
};

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reduce })),
  );

const stubRect = (element: Element, width = 200, height = 100) =>
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    left: 0,
    top: 0,
    width,
    height,
    right: width,
    bottom: height,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });

beforeEach(() => {
  frames = [];
  observed = [];
  stubReducedMotion(false);
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn((callback: FrameRequestCallback) => frames.push(callback)),
  );
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      callback: IntersectionObserverCallback;
      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
        observed.push(this);
      }
      observe() {}
      disconnect = vi.fn();
    },
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Vue ImageTrail", () => {
  const animate = vi.fn<(...args: unknown[]) => { onfinish: null }>(() => ({
    onfinish: null,
  }));
  beforeEach(() => {
    animate.mockClear();
    Element.prototype.animate = animate as unknown as Element["animate"];
  });

  const renderTrail = (props: Record<string, unknown> = {}, attrs = {}) =>
    render(ImageTrail, {
      props,
      attrs: { "data-testid": "trail", ...attrs },
      slots: {
        items: '<span data-kind="a">A</span><span data-kind="b">B</span>',
        default: "<p>Move here</p>",
      },
    });
  const layerOf = (root: HTMLElement) =>
    root.querySelector("[aria-hidden=true]")!;

  it("renders content, hidden source items, an aria-hidden layer, and the user class last", () => {
    renderTrail({}, { class: "h-72" });
    const root = screen.getByTestId("trail");
    expect(root.className).toMatch(/ h-72$/);
    expect(screen.getByText("Move here")).toBeVisible();
    expect(root.querySelector("[hidden]")!.children).toHaveLength(2);
    expect(layerOf(root).children).toHaveLength(0);
  });

  it("falls back to a primary dot when no items are given", () => {
    render(ImageTrail, { attrs: { "data-testid": "trail" } });
    const source = screen.getByTestId("trail").querySelector("[hidden]")!;
    expect(source.firstElementChild!.className).toContain("bg-primary");
  });

  it("clones items in turn at the pointer once it travels the threshold, up to max", async () => {
    renderTrail({ threshold: 40, max: 3 });
    const root = screen.getByTestId("trail");
    stubRect(root);
    const layer = layerOf(root);

    await fireEvent.pointerMove(root, { clientX: 10, clientY: 20 });
    await fireEvent.pointerMove(root, { clientX: 30, clientY: 20 });
    expect(layer.children).toHaveLength(1);
    const first = layer.firstElementChild as HTMLElement;
    expect(first.dataset.kind).toBe("a");
    expect(first.style.left).toBe("10px");
    expect(first.style.top).toBe("20px");

    await fireEvent.pointerMove(root, { clientX: 60, clientY: 20 });
    await fireEvent.pointerMove(root, { clientX: 110, clientY: 20 });
    await fireEvent.pointerMove(root, { clientX: 160, clientY: 20 });
    const kinds = [...layer.children].map(
      (item) => (item as HTMLElement).dataset.kind,
    );
    expect(kinds).toEqual(["b", "a", "b"]);
    expect(animate).toHaveBeenCalledTimes(4);
    expect(animate.mock.calls[0]).toEqual([
      [{ opacity: 1 }, { opacity: 0 }],
      expect.objectContaining({ duration: 800, fill: "forwards" }),
    ]);
  });

  it("piles items up in stack and fades them all out when the pointer leaves", async () => {
    renderTrail({ variant: "stack", duration: 1000 });
    const root = screen.getByTestId("trail");
    stubRect(root);
    await fireEvent.pointerMove(root, { clientX: 10, clientY: 10 });
    await fireEvent.pointerMove(root, { clientX: 90, clientY: 10 });
    expect(animate.mock.calls[0]![1]).toMatchObject({ duration: 400 });
    expect(layerOf(root).children).toHaveLength(2);

    await fireEvent.pointerLeave(root);
    expect(animate).toHaveBeenCalledTimes(4);
    expect(animate.mock.calls[3]![0]).toEqual([{ opacity: 1 }, { opacity: 0 }]);
  });

  it("draws nothing with reduced motion", async () => {
    stubReducedMotion(true);
    renderTrail({ autoplay: true });
    const root = screen.getByTestId("trail");
    stubRect(root);
    await fireEvent.pointerMove(root, { clientX: 10, clientY: 10 });
    expect(layerOf(root).children).toHaveLength(0);
    expect(observed).toHaveLength(0);
  });

  it("autoplay draws while visible and stops when it scrolls away or unmounts", () => {
    const { unmount } = renderTrail({ autoplay: true, threshold: 1 });
    const root = screen.getByTestId("trail");
    stubRect(root, 400, 200);
    expect(frames).toHaveLength(0);
    intersect(true);
    runFrames(1, 1000);
    expect(layerOf(root).children).toHaveLength(1);
    intersect(false);
    expect(cancelAnimationFrame).toHaveBeenCalled();
    unmount();
    expect(observed[0]!.disconnect).toHaveBeenCalled();
  });
});

describe("Vue StackingCards", () => {
  const renderStack = (props: Record<string, unknown> = {}, attrs = {}) =>
    render(StackingCards, {
      props,
      attrs: { "data-testid": "stack", ...attrs },
      slots: {
        default:
          "<article>One</article><article>Two</article><article>Three</article>",
      },
    });
  /** Fake layout boxes: every card 100px tall at the given offsetTop. */
  const layout = (tops: number[]) =>
    [...screen.getByTestId("stack").children].forEach((card, i) => {
      Object.defineProperty(card, "offsetTop", {
        value: tops[i],
        configurable: true,
      });
      Object.defineProperty(card, "offsetHeight", {
        value: 100,
        configurable: true,
      });
    });
  const depths = () =>
    [...screen.getByTestId("stack").children].map((card) =>
      (card as HTMLElement).style.getPropertyValue("--stack-depth"),
    );

  it("indexes the cards, sets the sticky offsets, and keeps the user class last", () => {
    renderStack({ top: 24, offset: 12 }, { class: "gap-4" });
    const stack = screen.getByTestId("stack");
    expect(stack.className).toMatch(/ gap-4$/);
    expect(stack.className).toContain("[&>*]:sticky");
    expect(stack.style.getPropertyValue("--stack-top")).toBe("24px");
    expect(stack.style.getPropertyValue("--stack-step")).toBe("12px");
    const cards = [...stack.children] as HTMLElement[];
    expect(cards.map((c) => c.style.getPropertyValue("--stack-i"))).toEqual([
      "0",
      "1",
      "2",
    ]);
    expect(cards[1]!.style.getPropertyValue("--stack-turn")).toBe("1");
  });

  it("uses the class set of each variant", () => {
    renderStack({ variant: "fan" });
    expect(screen.getByTestId("stack").className).toContain("rotate:");
    render(StackingCards, {
      props: { variant: "blur" },
      attrs: { "data-testid": "blur" },
    });
    expect(screen.getByTestId("blur").className).toContain("blur(");
  });

  it("sets --stack-depth from how much the later cards cover each card", () => {
    const add = vi.spyOn(document, "addEventListener");
    const remove = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderStack({ offset: 16 });
    layout([0, 16, 66]);
    intersect(true);
    expect(add).toHaveBeenCalledWith("scroll", expect.any(Function), {
      capture: true,
      passive: true,
    });
    runFrames();
    expect(depths()).toEqual(["1.595", "0.595", "0"]);

    layout([0, 16, 32]);
    window.dispatchEvent(new Event("resize"));
    runFrames();
    expect(depths()).toEqual(["2", "1", "0"]);
    unmount();
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function), {
      capture: true,
      passive: true,
    });
  });

  it("never measures with reduced motion", () => {
    stubReducedMotion(true);
    renderStack();
    expect(observed).toHaveLength(0);
    expect(depths()).toEqual(["", "", ""]);
  });
});

describe("Vue ElasticLine", () => {
  const path = () => document.querySelector("path")!;
  const controlY = () => Number(path().getAttribute("d")!.split(" ")[2]);
  const renderLine = (props: Record<string, unknown> = {}) =>
    render(ElasticLine, { props, attrs: { "data-testid": "line" } });

  it("is a horizontal separator by default with a straight path and the user class last", () => {
    render(ElasticLine, { attrs: { class: "my-4" } });
    const line = screen.getByRole("separator");
    expect(line).toHaveAttribute("aria-orientation", "horizontal");
    expect(line.className).toMatch(/text-line my-4$/);
    expect(line.style.getPropertyValue("--reach")).toBe("24px");
    expect(path()).toHaveAttribute("d", "M0 50Q50 50 100 50");
    expect(path()).toHaveAttribute("stroke-width", "1.5");
  });

  it("can be vertical, colored, or decorative", async () => {
    const { container, rerender } = render(ElasticLine, {
      props: { orientation: "vertical", color: "primary", reach: 10 },
    });
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
    expect(path()).toHaveAttribute("d", "M50 0Q50 50 50 100");
    expect(screen.getByRole("separator").className).toContain("text-primary");
    await rerender({ decorative: true });
    expect(screen.queryByRole("separator")).toBeNull();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("bends toward the pointer with pull and springs back after it leaves", async () => {
    renderLine();
    const line = screen.getByTestId("line");
    stubRect(line, 200, 48);
    await fireEvent.pointerMove(line, { clientX: 50, clientY: 44 });
    runFrames(60);
    expect(path().getAttribute("d")).toMatch(/^M0 50Q25 /);
    expect(controlY()).toBeGreaterThan(110);

    await fireEvent.pointerLeave(line);
    runFrames(400);
    expect(path()).toHaveAttribute("d", "M0 50Q25 50 100 50");
    expect(frames).toHaveLength(0);
  });

  it("bends away from the pointer with push", async () => {
    renderLine({ variant: "push" });
    const line = screen.getByTestId("line");
    stubRect(line, 200, 48);
    await fireEvent.pointerMove(line, { clientX: 100, clientY: 30 });
    runFrames(60);
    expect(controlY()).toBeLessThan(40);
  });

  it("follows the pointer in pluck only after it touches the line", async () => {
    renderLine({ variant: "pluck" });
    const line = screen.getByTestId("line");
    stubRect(line, 200, 48);
    await fireEvent.pointerMove(line, { clientX: 100, clientY: 10 });
    runFrames(30);
    expect(controlY()).toBeCloseTo(50, 0);
    await fireEvent.pointerMove(line, { clientX: 100, clientY: 26 });
    await fireEvent.pointerMove(line, { clientX: 100, clientY: 38 });
    runFrames(30);
    expect(controlY()).toBeGreaterThan(80);
  });

  it("twangs once on view, and stays straight with reduced motion", async () => {
    renderLine({ playOnView: true });
    stubRect(screen.getByTestId("line"), 200, 48);
    intersect(true);
    runFrames(3);
    expect(controlY()).not.toBe(50);

    observed = [];
    stubReducedMotion(true);
    render(ElasticLine, {
      props: { playOnView: true },
      attrs: { "data-testid": "still" },
    });
    const still = screen.getByTestId("still");
    await fireEvent.pointerMove(still, { clientX: 10, clientY: 40 });
    expect(observed).toHaveLength(0);
    expect(still.querySelector("path")).toHaveAttribute(
      "d",
      "M0 50Q50 50 100 50",
    );
  });
});

describe("Vue PixelTrail", () => {
  const context = {
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    rect: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    setTransform: vi.fn(),
    fillStyle: "",
    globalAlpha: 1,
  };
  beforeEach(() => {
    for (const fn of Object.values(context))
      if (typeof fn === "function") fn.mockClear();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      context as unknown as CanvasRenderingContext2D,
    );
    vi.spyOn(performance, "now").mockReturnValue(0);
  });

  const renderPixels = (props: Record<string, unknown> = {}, attrs = {}) =>
    render(PixelTrail, {
      props,
      attrs: { "data-testid": "pixels", ...attrs },
      slots: { default: '<button type="button">Get started</button>' },
    });

  it("renders an aria-hidden canvas behind the content with the user class last", async () => {
    const { rerender } = renderPixels({ color: "success" }, { class: "h-72" });
    const root = screen.getByTestId("pixels");
    expect(root.className).toMatch(/ h-72$/);
    expect(root.style.getPropertyValue("--cell")).toBe("24px");
    const canvas = root.querySelector("canvas")!;
    expect(canvas).toHaveAttribute("aria-hidden", "true");
    expect(canvas.className).toContain("text-success");
    expect(canvas.className).not.toContain("linear-gradient");
    await rerender({ showGrid: true });
    expect(root.querySelector("canvas")!.className).toContain(
      "linear-gradient",
    );
  });

  it("lights the cell under the pointer and fades it out", async () => {
    renderPixels({ cellSize: 20, fade: 500 });
    const root = screen.getByTestId("pixels");
    stubRect(root);
    await fireEvent.pointerMove(root, { clientX: 45, clientY: 25 });
    runFrames(1, 250);
    expect(context.rect).toHaveBeenCalledWith(40.5, 20.5, 19, 19);
    expect(context.globalAlpha).toBe(0.5);

    context.rect.mockClear();
    runFrames(1, 600);
    expect(context.rect).not.toHaveBeenCalled();
    expect(frames).toHaveLength(0);
  });

  it("fills the gap between fast moves", async () => {
    renderPixels({ cellSize: 20 });
    const root = screen.getByTestId("pixels");
    stubRect(root);
    await fireEvent.pointerMove(root, { clientX: 5, clientY: 5 });
    await fireEvent.pointerMove(root, { clientX: 95, clientY: 5 });
    runFrames(1, 10);
    expect(context.rect).toHaveBeenCalledTimes(5);
  });

  it("draws dots, and the brush lights the neighbours too", async () => {
    const { unmount } = renderPixels({ variant: "dot", cellSize: 20 });
    stubRect(screen.getByTestId("pixels"));
    await fireEvent.pointerMove(screen.getByTestId("pixels"), {
      clientX: 5,
      clientY: 5,
    });
    runFrames(1, 10);
    expect(context.arc).toHaveBeenCalledWith(10, 10, 6.4, 0, 7);
    unmount();

    renderPixels({ variant: "brush", cellSize: 20 });
    stubRect(screen.getByTestId("pixels"));
    await fireEvent.pointerMove(screen.getByTestId("pixels"), {
      clientX: 50,
      clientY: 50,
    });
    runFrames(1, 10);
    expect(context.rect).toHaveBeenCalledTimes(25);
  });

  it("lights the cells around an element that gets keyboard focus", async () => {
    renderPixels({ cellSize: 10 });
    const root = screen.getByTestId("pixels");
    const button = screen.getByRole("button");
    stubRect(root);
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue({
      left: 20,
      top: 20,
      right: 40,
      bottom: 30,
      width: 20,
      height: 10,
      x: 20,
      y: 20,
      toJSON: () => ({}),
    });
    vi.spyOn(button, "matches").mockReturnValue(true);
    await fireEvent.focusIn(button);
    runFrames(1, 10);
    // A ring from column 1 to 5 and row 1 to 4: 5 + 5 + 2 + 2 cells.
    expect(context.rect).toHaveBeenCalledTimes(14);
  });

  it("does nothing with reduced motion", async () => {
    stubReducedMotion(true);
    renderPixels({ autoplay: true });
    await fireEvent.pointerMove(screen.getByTestId("pixels"), {
      clientX: 5,
      clientY: 5,
    });
    expect(frames).toHaveLength(0);
    expect(observed).toHaveLength(0);
  });

  it("autoplay draws only while visible", () => {
    renderPixels({ autoplay: true });
    expect(frames).toHaveLength(0);
    intersect(true);
    expect(frames).toHaveLength(1);
    intersect(false);
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });
});
