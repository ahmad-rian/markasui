import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LetterSwap } from "../../components/letter-swap/LetterSwap";
import { TextRotate } from "../../components/text-rotate/TextRotate";
import { TextScramble } from "../../components/text-scramble/TextScramble";
import { UnderlineLink } from "../../components/underline-link/UnderlineLink";
import { VariableWeightText } from "../../components/variable-weight-text/VariableWeightText";
import { VerticalCutReveal } from "../../components/vertical-cut-reveal/VerticalCutReveal";

/** Paksa prefers-reduced-motion: reduce selama satu tes. */
const preferReducedMotion = () =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({ matches: true } as MediaQueryList),
  );

/** Mock Web Animations API yang tidak ada di jsdom. */
function mockAnimate() {
  const animate = vi.fn().mockImplementation(() => ({
    cancel: vi.fn(),
    finished: Promise.resolve(),
  }));
  HTMLElement.prototype.animate =
    animate as typeof HTMLElement.prototype.animate;
  return animate;
}

const fakeTimers = () =>
  vi.useFakeTimers({
    toFake: [
      "setTimeout",
      "clearTimeout",
      "setInterval",
      "clearInterval",
      "requestAnimationFrame",
      "cancelAnimationFrame",
      "performance",
    ],
  });

/** Teks yang tampil (lapisan aria-hidden terakhir). */
const shown = (container: HTMLElement) =>
  container.querySelector(".invisible + span")?.textContent;

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
});

describe("React LetterSwap", () => {
  it("renders hidden letters with a copy, one readable text, and the user class last", () => {
    const { container } = render(
      <a href="#">
        <LetterSwap text="Docs" className="mt-2" />
      </a>,
    );
    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
    const root = container.querySelector("a > span")!;
    expect(root.className.endsWith("mt-2")).toBe(true);
    const letters = root.querySelectorAll("[data-letter]");
    expect(letters).toHaveLength(4);
    expect(letters[0]).toHaveAttribute("aria-hidden", "true");
    expect(letters[0]!.querySelector("span")).toHaveClass("top-full");
  });

  it("swaps every letter in order on hover of the parent link and ignores hover while busy", () => {
    const animate = mockAnimate();
    render(
      <a href="#">
        <LetterSwap text="Blog" stagger={10} duration={200} />
      </a>,
    );
    const link = screen.getByRole("link");
    fireEvent.pointerEnter(link);
    expect(animate).toHaveBeenCalledTimes(4);
    expect(animate.mock.calls.map((call) => call[1].delay)).toEqual([
      0, 10, 20, 30,
    ]);
    expect(animate.mock.calls[0]![0][1]).toEqual({
      transform: "translateY(-100%)",
    });
    fireEvent.pointerEnter(link);
    expect(animate).toHaveBeenCalledTimes(4);
  });

  it("uses a fixed shuffled order in random mode and moves down", () => {
    const animate = mockAnimate();
    render(
      <button type="button">
        <LetterSwap text="Status" mode="random" direction="down" stagger={1} />
      </button>,
    );
    fireEvent.focusIn(screen.getByRole("button"));
    const delays = animate.mock.calls.map((call) => call[1].delay);
    expect([...delays].sort()).toEqual([0, 1, 2, 3, 4, 5]);
    expect(delays).not.toEqual([0, 1, 2, 3, 4, 5]);
    expect(animate.mock.calls[0]![0][1]).toEqual({
      transform: "translateY(100%)",
    });
  });

  it("pingpong moves in on hover and back on leave", () => {
    const { container } = render(
      <a href="#">
        <LetterSwap text="Hi" mode="pingpong" />
      </a>,
    );
    const letter = container.querySelector<HTMLElement>("[data-letter]")!;
    fireEvent.pointerEnter(screen.getByRole("link"));
    expect(letter.style.transform).toBe("translateY(-100%)");
    fireEvent.pointerLeave(screen.getByRole("link"));
    expect(letter.style.transform).toBe("");
  });

  it("does not animate with reduced motion", () => {
    preferReducedMotion();
    const animate = mockAnimate();
    render(
      <a href="#">
        <LetterSwap text="Docs" />
      </a>,
    );
    fireEvent.pointerEnter(screen.getByRole("link"));
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("React TextScramble", () => {
  it("starts scrambled on mount with the charset, then decodes to the text", () => {
    fakeTimers();
    const { container } = render(
      <TextScramble
        text="12 34"
        trigger="mount"
        charset="binary"
        duration={500}
        className="mt-2"
      />,
    );
    const root = container.firstElementChild!;
    expect(root.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("12 34", { selector: ".sr-only" })).toBeVisible();
    act(() => vi.advanceTimersByTime(20));
    expect(shown(container)).toMatch(/^[01]{2} [01]{2}$/);
    act(() => vi.advanceTimersByTime(700));
    expect(shown(container)).toBe("12 34");
  });

  it("scrambles on hover of the closest link and keeps an invisible holder", () => {
    fakeTimers();
    const { container } = render(
      <a href="#">
        <TextScramble text="Work" charset="digits" />
      </a>,
    );
    expect(shown(container)).toBe("Work");
    expect(container.querySelector(".invisible")).toHaveTextContent("Work");
    fireEvent.pointerEnter(screen.getByRole("link", { name: "Work" }));
    act(() => vi.advanceTimersByTime(60));
    expect(shown(container)).toMatch(/^\d+[A-Za-z]*$/);
    act(() => vi.advanceTimersByTime(1000));
    expect(shown(container)).toBe("Work");
  });

  it("shows the final text with reduced motion", () => {
    preferReducedMotion();
    const { container } = render(<TextScramble text="Final" trigger="mount" />);
    expect(shown(container)).toBe("Final");
  });
});

describe("React TextRotate", () => {
  it("reads every word once and splits the first word into letters", () => {
    const { container } = render(
      <TextRotate words={["Vue", "React"]} className="mt-2" />,
    );
    expect(screen.getByText("Vue, React")).toHaveClass("sr-only");
    expect(container.querySelectorAll("[data-unit]")).toHaveLength(3);
    expect(container.firstElementChild!.className.endsWith("mt-2")).toBe(true);
  });

  it("splits by words and rotates to the next phrase after the interval", async () => {
    fakeTimers();
    mockAnimate();
    const { container } = render(
      <TextRotate
        words={["with confidence", "every Friday"]}
        split="words"
        interval={1000}
      />,
    );
    const units = () =>
      [...container.querySelectorAll("[data-unit]")].map((u) => u.textContent);
    expect(units()).toEqual(["with ", "confidence"]);
    await act(async () => vi.advanceTimersByTimeAsync(1000));
    expect(units()).toEqual(["every ", "Friday"]);
  });

  it("pauses while hovered", async () => {
    fakeTimers();
    mockAnimate();
    const { container } = render(
      <TextRotate words={["one", "two"]} interval={500} />,
    );
    fireEvent.pointerEnter(container.firstElementChild!);
    await act(async () => vi.advanceTimersByTimeAsync(1500));
    expect(container.querySelector("[data-unit]")).toHaveTextContent("o");
  });

  it("keeps the first word with reduced motion", async () => {
    preferReducedMotion();
    fakeTimers();
    const animate = mockAnimate();
    render(<TextRotate words={["one", "two"]} interval={500} />);
    await act(async () => vi.advanceTimersByTimeAsync(1500));
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("React VerticalCutReveal", () => {
  it("splits into words, letters, or lines behind cut wrappers", () => {
    const { container, rerender } = render(
      <VerticalCutReveal text="Ship it" className="mt-2" />,
    );
    const units = () => container.querySelectorAll("[data-unit]");
    expect(units()).toHaveLength(2);
    expect(units()[0]!.parentElement).toHaveClass("overflow-hidden");
    expect(container.firstElementChild!.className.endsWith("mt-2")).toBe(true);
    rerender(<VerticalCutReveal text="Ship it" split="chars" />);
    expect(units()).toHaveLength(6);
    rerender(<VerticalCutReveal text={"Design once.\nShip"} split="lines" />);
    expect(units()).toHaveLength(2);
    expect(screen.getByText("Design once. Ship")).toHaveClass("sr-only");
  });

  it("reveals each unit with a stagger, delay, and direction", () => {
    const animate = mockAnimate();
    render(
      <VerticalCutReveal
        text="a b c"
        direction="down"
        from="last"
        stagger={10}
        delay={100}
      />,
    );
    expect(animate.mock.calls.map((call) => call[1].delay)).toEqual([
      120, 110, 100,
    ]);
    expect(animate.mock.calls[0]![0][0]).toEqual({
      transform: "translateY(-120%)",
    });
  });

  it("staggers from the center", () => {
    const animate = mockAnimate();
    render(<VerticalCutReveal text="a b c" from="center" stagger={10} />);
    expect(animate.mock.calls.map((call) => call[1].delay)).toEqual([
      10, 0, 10,
    ]);
  });

  it("shows the text without animation with reduced motion", () => {
    preferReducedMotion();
    const animate = mockAnimate();
    render(<VerticalCutReveal text="Hello" />);
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("React UnderlineLink", () => {
  it("renders a link with one decorative line and the user class last", () => {
    render(
      <UnderlineLink href="/docs" className="text-ink">
        Docs
      </UnderlineLink>,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).not.toHaveAttribute("aria-current");
    expect(link.className.endsWith("text-ink")).toBe(true);
    const lines = link.querySelectorAll("[aria-hidden=true]");
    expect(lines).toHaveLength(1);
    expect(lines[0]).toHaveClass("group-focus-visible:scale-x-100");
  });

  it("marks the current page and blocks unsafe schemes", () => {
    render(
      <UnderlineLink href="javascript:alert(1)" active>
        Home
      </UnderlineLink>,
    );
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("href", "#");
  });

  it("draws two lines for goes-out-comes-in and an svg stroke for scribble", () => {
    const { rerender } = render(
      <UnderlineLink href="#" variant="goes-out-comes-in">
        A
      </UnderlineLink>,
    );
    expect(
      screen.getByRole("link").querySelectorAll("span[aria-hidden=true]"),
    ).toHaveLength(2);
    rerender(
      <UnderlineLink href="#" variant="scribble">
        A
      </UnderlineLink>,
    );
    const path = screen.getByRole("link").querySelector("svg path")!;
    expect(path).toHaveAttribute("pathLength", "1");
    expect(path.getAttribute("class")).toContain("[stroke-dashoffset:1]");
  });
});

describe("React VariableWeightText", () => {
  it("renders letters at the min weight and the user class last", () => {
    const { container } = render(
      <VariableWeightText text="Hi" min={200} className="text-6xl" />,
    );
    expect(screen.getByText("Hi")).toHaveClass("sr-only");
    const letter = container.querySelector<HTMLElement>("[data-letter]")!;
    expect(letter.style.fontWeight).toBe("200");
    expect(letter.style.fontVariationSettings).toBe("'wght' 200");
    expect(container.firstElementChild!.className.endsWith("text-6xl")).toBe(
      true,
    );
  });

  it("makes letters under the cursor bolder", () => {
    fakeTimers();
    const { container } = render(
      <VariableWeightText text="Hi" min={300} max={900} />,
    );
    fireEvent.pointerMove(window, { clientX: 0, clientY: 0 });
    act(() => vi.advanceTimersByTime(20));
    const letter = container.querySelector<HTMLElement>("[data-letter]")!;
    expect(letter.style.fontWeight).toBe("900");
  });

  it("breathes with wave and stays still with reduced motion", () => {
    fakeTimers();
    const { container, unmount } = render(
      <VariableWeightText text="Hey" wave min={100} max={900} />,
    );
    act(() => vi.advanceTimersByTime(600));
    const weights = [
      ...container.querySelectorAll<HTMLElement>("[data-letter]"),
    ].map((el) => el.style.fontWeight);
    expect(new Set(weights).size).toBeGreaterThan(1);
    unmount();

    preferReducedMotion();
    const still = render(<VariableWeightText text="Hey" wave min={100} />);
    act(() => vi.advanceTimersByTime(600));
    expect(
      still.container.querySelector<HTMLElement>("[data-letter]")!.style
        .fontWeight,
    ).toBe("100");
  });
});
