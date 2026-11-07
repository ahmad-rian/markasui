import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { h, nextTick } from "vue";
import LetterSwap from "../../components/letter-swap/LetterSwap.vue";
import TextRotate from "../../components/text-rotate/TextRotate.vue";
import TextScramble from "../../components/text-scramble/TextScramble.vue";
import UnderlineLink from "../../components/underline-link/UnderlineLink.vue";
import VariableWeightText from "../../components/variable-weight-text/VariableWeightText.vue";
import VerticalCutReveal from "../../components/vertical-cut-reveal/VerticalCutReveal.vue";

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

/** Jalankan timer palsu lalu tunggu render Vue. */
async function advance(ms: number) {
  await vi.advanceTimersByTimeAsync(ms);
  await nextTick();
}

/** Teks yang tampil (lapisan aria-hidden sesudah holder). */
const shown = (container: Element) =>
  container.querySelector(".invisible + span")?.textContent;

/** Bungkus komponen di dalam elemen interaktif, seperti di navbar. */
const inside = (
  tag: "a" | "button",
  component: object,
  props: Record<string, unknown>,
) => ({
  render: () =>
    h(tag, tag === "a" ? { href: "#" } : { type: "button" }, [
      h(component, props),
    ]),
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
});

describe("Vue LetterSwap", () => {
  it("renders hidden letters with a copy, one readable text, and the user class last", () => {
    const { container } = render(
      inside("a", LetterSwap, { text: "Docs", class: "mt-2" }),
    );
    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
    const root = container.querySelector("a > span")!;
    expect(root.className.endsWith("mt-2")).toBe(true);
    const letters = root.querySelectorAll("[data-letter]");
    expect(letters).toHaveLength(4);
    expect(letters[0]).toHaveAttribute("aria-hidden", "true");
    expect(letters[0]!.querySelector("span")).toHaveClass("top-full");
  });

  it("swaps every letter in order on hover of the parent link and ignores hover while busy", async () => {
    const animate = mockAnimate();
    render(inside("a", LetterSwap, { text: "Blog", stagger: 10 }));
    const link = screen.getByRole("link");
    await fireEvent.pointerEnter(link);
    expect(animate.mock.calls.map((call) => call[1].delay)).toEqual([
      0, 10, 20, 30,
    ]);
    expect(animate.mock.calls[0]![0][1]).toEqual({
      transform: "translateY(-100%)",
    });
    await fireEvent.pointerEnter(link);
    expect(animate).toHaveBeenCalledTimes(4);
  });

  it("uses a fixed shuffled order in random mode and moves down", async () => {
    const animate = mockAnimate();
    render(
      inside("button", LetterSwap, {
        text: "Status",
        mode: "random",
        direction: "down",
        stagger: 1,
      }),
    );
    await fireEvent.focusIn(screen.getByRole("button"));
    const delays = animate.mock.calls.map((call) => call[1].delay);
    expect([...delays].sort()).toEqual([0, 1, 2, 3, 4, 5]);
    expect(delays).not.toEqual([0, 1, 2, 3, 4, 5]);
    expect(animate.mock.calls[0]![0][1]).toEqual({
      transform: "translateY(100%)",
    });
  });

  it("pingpong moves in on hover and back on leave", async () => {
    const { container } = render(
      inside("a", LetterSwap, { text: "Hi", mode: "pingpong" }),
    );
    const letter = container.querySelector<HTMLElement>("[data-letter]")!;
    await fireEvent.pointerEnter(screen.getByRole("link"));
    expect(letter.style.transform).toBe("translateY(-100%)");
    await fireEvent.pointerLeave(screen.getByRole("link"));
    expect(letter.style.transform).toBe("");
  });

  it("does not animate with reduced motion", async () => {
    preferReducedMotion();
    const animate = mockAnimate();
    render(inside("a", LetterSwap, { text: "Docs" }));
    await fireEvent.pointerEnter(screen.getByRole("link"));
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Vue TextScramble", () => {
  it("starts scrambled on mount with the charset, then decodes to the text", async () => {
    fakeTimers();
    const { container } = render(TextScramble, {
      props: {
        text: "12 34",
        trigger: "mount",
        charset: "binary",
        duration: 500,
      },
      attrs: { class: "mt-2" },
    });
    await nextTick();
    expect(container.firstElementChild!.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("12 34", { selector: ".sr-only" })).toBeVisible();
    expect(shown(container)).toMatch(/^[01]{2} [01]{2}$/);
    await advance(700);
    expect(shown(container)).toBe("12 34");
  });

  it("scrambles on hover of the closest link and keeps an invisible holder", async () => {
    fakeTimers();
    const { container } = render(
      inside("a", TextScramble, { text: "Work", charset: "digits" }),
    );
    expect(shown(container)).toBe("Work");
    expect(container.querySelector(".invisible")).toHaveTextContent("Work");
    await fireEvent.pointerEnter(screen.getByRole("link", { name: "Work" }));
    await advance(60);
    expect(shown(container)).toMatch(/^\d+[A-Za-z]*$/);
    await advance(1000);
    expect(shown(container)).toBe("Work");
  });

  it("shows the final text with reduced motion", async () => {
    preferReducedMotion();
    const { container } = render(TextScramble, {
      props: { text: "Final", trigger: "mount" },
    });
    await nextTick();
    expect(shown(container)).toBe("Final");
  });
});

describe("Vue TextRotate", () => {
  it("reads every word once and splits the first word into letters", () => {
    const { container } = render(TextRotate, {
      props: { words: ["Vue", "React"] },
      attrs: { class: "mt-2" },
    });
    expect(screen.getByText("Vue, React")).toHaveClass("sr-only");
    expect(container.querySelectorAll("[data-unit]")).toHaveLength(3);
    expect(container.firstElementChild!.className.endsWith("mt-2")).toBe(true);
  });

  it("splits by words and rotates to the next phrase after the interval", async () => {
    fakeTimers();
    mockAnimate();
    const { container } = render(TextRotate, {
      props: {
        words: ["with confidence", "every Friday"],
        split: "words",
        interval: 1000,
      },
    });
    const units = () =>
      [...container.querySelectorAll("[data-unit]")].map((u) => u.textContent);
    expect(units()).toEqual(["with ", "confidence"]);
    await advance(1000);
    await nextTick();
    expect(units()).toEqual(["every ", "Friday"]);
  });

  it("pauses while hovered", async () => {
    fakeTimers();
    mockAnimate();
    const { container } = render(TextRotate, {
      props: { words: ["one", "two"], interval: 500 },
    });
    await fireEvent.pointerEnter(container.firstElementChild!);
    await advance(1500);
    expect(container.querySelector("[data-unit]")).toHaveTextContent("o");
  });

  it("keeps the first word with reduced motion", async () => {
    preferReducedMotion();
    fakeTimers();
    const animate = mockAnimate();
    render(TextRotate, { props: { words: ["one", "two"], interval: 500 } });
    await advance(1500);
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Vue VerticalCutReveal", () => {
  it("splits into words, letters, or lines behind cut wrappers", async () => {
    const { container, rerender } = render(VerticalCutReveal, {
      props: { text: "Ship it" },
      attrs: { class: "mt-2" },
    });
    const units = () => container.querySelectorAll("[data-unit]");
    expect(units()).toHaveLength(2);
    expect(units()[0]!.parentElement).toHaveClass("overflow-hidden");
    expect(container.firstElementChild!.className.endsWith("mt-2")).toBe(true);
    await rerender({ text: "Ship it", split: "chars" });
    expect(units()).toHaveLength(6);
    await rerender({ text: "Design once.\nShip", split: "lines" });
    expect(units()).toHaveLength(2);
    expect(screen.getByText("Design once. Ship")).toHaveClass("sr-only");
  });

  it("reveals each unit with a stagger, delay, and direction", () => {
    const animate = mockAnimate();
    render(VerticalCutReveal, {
      props: {
        text: "a b c",
        direction: "down",
        from: "last",
        stagger: 10,
        delay: 100,
      },
    });
    expect(animate.mock.calls.map((call) => call[1].delay)).toEqual([
      120, 110, 100,
    ]);
    expect(animate.mock.calls[0]![0][0]).toEqual({
      transform: "translateY(-120%)",
    });
  });

  it("staggers from the center", () => {
    const animate = mockAnimate();
    render(VerticalCutReveal, {
      props: { text: "a b c", from: "center", stagger: 10 },
    });
    expect(animate.mock.calls.map((call) => call[1].delay)).toEqual([
      10, 0, 10,
    ]);
  });

  it("shows the text without animation with reduced motion", () => {
    preferReducedMotion();
    const animate = mockAnimate();
    render(VerticalCutReveal, { props: { text: "Hello" } });
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Vue UnderlineLink", () => {
  it("renders a link with one decorative line and the user class last", () => {
    render(UnderlineLink, {
      props: { href: "/docs" },
      attrs: { class: "text-ink" },
      slots: { default: "Docs" },
    });
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).not.toHaveAttribute("aria-current");
    expect(link.className.endsWith("text-ink")).toBe(true);
    const lines = link.querySelectorAll("[aria-hidden=true]");
    expect(lines).toHaveLength(1);
    expect(lines[0]).toHaveClass("group-focus-visible:scale-x-100");
  });

  it("marks the current page and blocks unsafe schemes", () => {
    render(UnderlineLink, {
      props: { href: "javascript:alert(1)", active: true },
      slots: { default: "Home" },
    });
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("href", "#");
  });

  it("draws two lines for goes-out-comes-in and an svg stroke for scribble", async () => {
    const { rerender } = render(UnderlineLink, {
      props: { href: "#", variant: "goes-out-comes-in" },
      slots: { default: "A" },
    });
    expect(
      screen.getByRole("link").querySelectorAll("span[aria-hidden=true]"),
    ).toHaveLength(2);
    await rerender({ href: "#", variant: "scribble" });
    const path = screen.getByRole("link").querySelector("svg path")!;
    expect(path).toHaveAttribute("pathLength", "1");
    expect(path.getAttribute("class")).toContain("[stroke-dashoffset:1]");
  });
});

describe("Vue VariableWeightText", () => {
  it("renders letters at the min weight and the user class last", () => {
    const { container } = render(VariableWeightText, {
      props: { text: "Hi", min: 200 },
      attrs: { class: "text-6xl" },
    });
    expect(screen.getByText("Hi")).toHaveClass("sr-only");
    const letter = container.querySelector<HTMLElement>("[data-letter]")!;
    expect(letter.style.fontWeight).toBe("200");
    expect(letter.style.fontVariationSettings).toBe("'wght' 200");
    expect(container.firstElementChild!.className.endsWith("text-6xl")).toBe(
      true,
    );
  });

  it("makes letters under the cursor bolder", async () => {
    fakeTimers();
    const { container } = render(VariableWeightText, {
      props: { text: "Hi", min: 300, max: 900 },
    });
    await fireEvent.pointerMove(window, { clientX: 0, clientY: 0 });
    await advance(20);
    const letter = container.querySelector<HTMLElement>("[data-letter]")!;
    expect(letter.style.fontWeight).toBe("900");
  });

  it("breathes with wave and stays still with reduced motion", async () => {
    fakeTimers();
    const { container, unmount } = render(VariableWeightText, {
      props: { text: "Hey", wave: true, min: 100, max: 900 },
    });
    await advance(600);
    const weights = [
      ...container.querySelectorAll<HTMLElement>("[data-letter]"),
    ].map((el) => el.style.fontWeight);
    expect(new Set(weights).size).toBeGreaterThan(1);
    unmount();

    preferReducedMotion();
    const still = render(VariableWeightText, {
      props: { text: "Hey", wave: true, min: 100 },
    });
    await advance(600);
    expect(
      still.container.querySelector<HTMLElement>("[data-letter]")!.style
        .fontWeight,
    ).toBe("100");
  });
});
