import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DragElements } from "../../components/drag-elements/DragElements";
import { Float } from "../../components/float/Float";
import { Magnet } from "../../components/magnet/Magnet";
import { Screensaver } from "../../components/screensaver/Screensaver";

/** User classes kept in constants so the Tailwind Prettier plugin leaves their order alone. */
const BOARD_CLASS = "h-80 custom";
const SAVER_CLASS = "h-44 custom";

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reduce })),
  );

/** Give an element a fixed box so pointer math is predictable. */
const stubRect = (
  element: Element,
  { left = 0, top = 0, width = 100, height = 50 } = {},
) =>
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  });

/** jsdom has no Web Animations API; record each call instead. */
const stubAnimate = () => {
  const loops: { pause: () => void; play: () => void; cancel: () => void }[] =
    [];
  const animate = vi.fn(() => {
    const loop = { pause: vi.fn(), play: vi.fn(), cancel: vi.fn() };
    loops.push(loop);
    return loop;
  });
  Element.prototype.animate = animate as unknown as Element["animate"];
  return { animate, loops };
};

beforeEach(() => stubReducedMotion(false));
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  delete (Element.prototype as Partial<Element>).animate;
});

describe("React DragElements", () => {
  const renderBoard = (props = {}) =>
    render(
      <DragElements
        role="group"
        aria-label="Board"
        className={BOARD_CLASS}
        {...props}
      >
        <span>One</span>
        <span data-x="10" data-y="90" data-rotate="4">
          Two
        </span>
        <div>
          <button type="button">Inside</button>
        </div>
      </DragElements>,
    );
  const board = () => screen.getByRole("group", { name: "Board" });
  const item = (text: string) => screen.getByText(text);

  it("scatters items from the seed, honors data-x and data-y, and appends user classes", () => {
    renderBoard({ rotate: 0 });
    expect(board().className).toMatch(/overflow-hidden.* h-80 custom$/);
    const two = item("Two");
    expect(two.style.left).toBe("10%");
    expect(two.style.top).toBe("90%");
    expect(two.style.transform).toBe("translate(-10%, -90%)");
    expect(two.style.rotate).toBe("4deg");
    expect(item("One").style.rotate).toBe("0deg");
    expect(item("One").style.left).toMatch(/^\d+%$/);
  });

  it("makes every item focusable and describes it with hintLabel", () => {
    renderBoard({ hintLabel: "Seret untuk memindahkan" });
    const one = item("One");
    expect(one.tabIndex).toBe(0);
    expect(one).toHaveAccessibleDescription("Seret untuk memindahkan");
  });

  it("uses the English hint by default and the same seed gives the same layout", () => {
    const first = renderBoard();
    const spot = item("One").style.left;
    expect(item("One")).toHaveAccessibleDescription(
      "Drag to move, or use the arrow keys. Escape puts it back",
    );
    first.unmount();
    renderBoard();
    expect(item("One").style.left).toBe(spot);
  });

  it("moves the focused item with arrow keys inside the bounds and Escape puts it back", () => {
    renderBoard();
    stubRect(board(), { width: 400, height: 300 });
    const one = item("One");
    stubRect(one, { left: 20, top: 20 });
    one.focus();
    fireEvent.keyDown(one, { key: "ArrowRight" });
    expect(one.style.translate).toBe("10px 0px");
    fireEvent.keyDown(one, { key: "ArrowDown", shiftKey: true });
    expect(one.style.translate).toBe("10px 50px");
    fireEvent.keyDown(one, { key: "ArrowLeft", shiftKey: true });
    expect(one.style.translate).toBe("-10px 50px");
    expect(Number(one.style.zIndex)).toBeGreaterThan(0);
    const escape = new KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
      cancelable: true,
    });
    one.dispatchEvent(escape);
    expect(escape.defaultPrevented).toBe(true);
    expect(one.style.translate).toBe("0px 0px");
  });

  it("drags with the pointer and springs back with release=return", () => {
    renderBoard({ release: "return" });
    stubRect(board(), { width: 400, height: 300 });
    const one = item("One");
    stubRect(one, { left: 100, top: 100 });
    fireEvent.pointerDown(one, { button: 0, clientX: 110, clientY: 110 });
    expect(one).toHaveAttribute("data-dragging");
    fireEvent.pointerMove(one, { clientX: 160, clientY: 140 });
    expect(one.style.translate).toBe("50px 30px");
    fireEvent.pointerMove(one, { clientX: 900, clientY: 140 });
    expect(one.style.translate).toBe("200px 30px");
    fireEvent.pointerUp(one);
    expect(one).not.toHaveAttribute("data-dragging");
    expect(one.style.translate).toBe("0px 0px");
  });

  it("keeps the dropped spot with release=stay and ignores presses on inner buttons", () => {
    renderBoard({ release: "stay" });
    stubRect(board(), { width: 400, height: 300 });
    const one = item("One");
    stubRect(one, { left: 100, top: 100 });
    fireEvent.pointerDown(one, { button: 0, clientX: 110, clientY: 110 });
    fireEvent.pointerMove(one, { clientX: 130, clientY: 120 });
    fireEvent.pointerUp(one);
    expect(one.style.translate).toBe("20px 10px");

    fireEvent.pointerDown(screen.getByRole("button", { name: "Inside" }), {
      button: 0,
    });
    expect(screen.getByText("Inside").parentElement).not.toHaveAttribute(
      "data-dragging",
    );
  });
});

describe("React Float", () => {
  const renderFloat = (props = {}) =>
    render(
      <Float data-testid="float" className="custom" {...props}>
        <span>A</span>
        <span data-depth="1">B</span>
      </Float>,
    );

  it("starts one endless loop per child and appends user classes", () => {
    const { animate } = stubAnimate();
    renderFloat({ motion: "orbit", amplitude: 8 });
    expect(screen.getByTestId("float").className).toMatch(/ custom$/);
    expect(animate).toHaveBeenCalledTimes(2);
    const [frames, timing] = animate.mock.calls[0] as unknown as [
      Keyframe[],
      KeyframeAnimationOptions,
    ];
    expect(frames).toHaveLength(13);
    expect(String(frames[0]!.transform)).toMatch(/^translate\(/);
    expect(timing.iterations).toBe(Infinity);
    expect(Number(timing.delay)).toBeLessThanOrEqual(0);
  });

  it("pauses a child while it is hovered and resumes when the pointer leaves", () => {
    const { loops } = stubAnimate();
    renderFloat();
    fireEvent.pointerOver(screen.getByText("B"));
    expect(loops[1]!.pause).toHaveBeenCalled();
    expect(loops[0]!.pause).not.toHaveBeenCalled();
    fireEvent.pointerOut(screen.getByText("B"));
    expect(loops[1]!.play).toHaveBeenCalled();
  });

  it("shifts children toward the pointer by depth with parallax", () => {
    stubAnimate();
    renderFloat({ parallax: 20 });
    stubRect(screen.getByTestId("float"), { width: 200, height: 100 });
    fireEvent.pointerMove(window, { clientX: 200, clientY: 50 });
    expect(screen.getByText("B").style.translate).toBe("20px 0px");
  });

  it("pops children in one after another with entrance", () => {
    const { animate } = stubAnimate();
    renderFloat({ entrance: true });
    const delays = animate.mock.calls
      .map((call) => (call as unknown as [Keyframe[], { delay: number }])[1])
      .filter((timing) => timing.delay >= 0)
      .map((timing) => timing.delay);
    expect(delays).toEqual([0, 90]);
  });

  it("does nothing with reduced motion", () => {
    stubReducedMotion(true);
    const { animate } = stubAnimate();
    renderFloat({ parallax: 20 });
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("React Screensaver", () => {
  const frames: FrameRequestCallback[] = [];
  beforeEach(() => {
    frames.length = 0;
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((callback: FrameRequestCallback) => frames.push(callback)),
    );
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });
  const renderSaver = (props = {}) =>
    render(
      <Screensaver data-testid="saver" className={SAVER_CLASS} {...props}>
        <span>Logo</span>
        <span>Dot</span>
      </Screensaver>,
    );
  const runFrames = (count: number) => {
    for (let i = 0; i < count; i++) frames.shift()?.(i * 16);
  };

  it("places children and gives each its own starting tone", () => {
    renderSaver();
    expect(screen.getByTestId("saver").className).toMatch(/ h-44 custom$/);
    expect(screen.getByText("Logo")).toHaveAttribute("data-tone", "primary");
    expect(screen.getByText("Dot")).toHaveAttribute("data-tone", "success");
    expect(screen.getByText("Logo").style.translate).toMatch(/px .*px$/);
  });

  it("switches to the next tone on a wall hit (jsdom areas have no size, so every frame hits)", () => {
    renderSaver({ tones: ["warning", "danger"] });
    const logo = screen.getByText("Logo");
    expect(logo).toHaveAttribute("data-tone", "warning");
    runFrames(1);
    expect(logo).toHaveAttribute("data-tone", "danger");
  });

  it("squashes instead of changing tone with effect=squash", () => {
    const { animate } = stubAnimate();
    renderSaver({ effect: "squash" });
    expect(screen.getByText("Logo")).not.toHaveAttribute("data-tone");
    runFrames(4);
    expect(animate).toHaveBeenCalled();
  });

  it("stops while hovered or focused and resumes after", () => {
    renderSaver();
    const saver = screen.getByTestId("saver");
    fireEvent.pointerEnter(saver);
    frames.length = 0;
    fireEvent.focusIn(saver);
    fireEvent.pointerLeave(saver);
    expect(frames).toHaveLength(0);
    fireEvent.focusOut(saver);
    expect(frames).toHaveLength(1);
  });

  it("keeps moving on hover when pauseOnHover is false", () => {
    renderSaver({ pauseOnHover: false });
    frames.length = 0;
    fireEvent.pointerEnter(screen.getByTestId("saver"));
    expect(frames).toHaveLength(1);
  });

  it("only places children with reduced motion", () => {
    stubReducedMotion(true);
    renderSaver();
    expect(frames).toHaveLength(0);
    expect(screen.getByText("Logo")).toHaveAttribute("data-tone", "primary");
  });
});

describe("React Magnet", () => {
  const renderMagnet = (props = {}) => {
    render(
      <Magnet data-testid="magnet" className="custom" {...props}>
        <button type="button">
          Go <span data-depth="0.5">arrow</span>
        </button>
      </Magnet>,
    );
    const magnet = screen.getByTestId("magnet");
    stubRect(magnet, { left: 100, top: 100, width: 100, height: 40 });
    return magnet;
  };
  const point = (clientX: number, clientY: number, pointerType = "mouse") =>
    fireEvent.pointerMove(document, { clientX, clientY, pointerType });

  it("pulls toward a nearby mouse, moves depth layers further, and appends user classes", () => {
    const magnet = renderMagnet();
    expect(magnet.className).toMatch(/^w-fit .* custom$/);
    point(230, 120);
    expect(magnet.style.translate).toBe("17.5px 0px");
    expect(magnet).toHaveAttribute("data-state", "active");
    expect(screen.getByText("arrow").style.translate).toBe("8.75px 0px");
  });

  it("springs back once the mouse leaves the radius", () => {
    const magnet = renderMagnet({ radius: 40, strength: 0.5 });
    point(200, 120);
    expect(magnet.style.translate).toBe("25px 0px");
    point(400, 120);
    expect(magnet.style.translate).toBe("");
    expect(magnet).not.toHaveAttribute("data-state");
  });

  it("dodges away from the mouse with mode=repel", () => {
    const magnet = renderMagnet({ mode: "repel", strength: 0.5, radius: 80 });
    point(230, 120);
    expect(magnet.style.translate).toBe("-25px 0px");
  });

  it("ignores touch and stays still with reduced motion", () => {
    const magnet = renderMagnet();
    point(230, 120, "touch");
    expect(magnet.style.translate).toBe("");

    stubReducedMotion(true);
    render(<Magnet data-testid="still">x</Magnet>);
    const still = screen.getByTestId("still");
    stubRect(still, { left: 100, top: 100, width: 100, height: 40 });
    point(150, 120);
    expect(still.style.translate).toBe("");
  });
});
