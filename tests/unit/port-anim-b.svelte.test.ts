import { render, screen } from "@testing-library/svelte";
import { createRawSnippet, tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import TextRotate from "../../components/text-rotate/TextRotate.svelte";
import TextScramble from "../../components/text-scramble/TextScramble.svelte";
import TypingText from "../../components/typing-text/TypingText.svelte";
import UnderlineLink from "../../components/underline-link/UnderlineLink.svelte";
import VariableWeightText from "../../components/variable-weight-text/VariableWeightText.svelte";
import VerticalCutReveal from "../../components/vertical-cut-reveal/VerticalCutReveal.svelte";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  // jsdom has no Element.animate; tests that stub it remove it again.
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
});

/** A fake Web Animations API whose animations finish right away. */
const stubAnimate = () => {
  const animate = vi.fn(() => ({
    finished: Promise.resolve(),
    cancel: vi.fn(),
  }));
  HTMLElement.prototype.animate = animate as unknown as HTMLElement["animate"];
  return animate;
};

const stubReducedMotion = () =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true })),
  );

/** Lets pending promise callbacks run. */
const flush = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve();
};

const unitTexts = (container: Element) =>
  [...container.querySelectorAll("[data-unit]")].map((el) => el.textContent);

describe("Svelte TextRotate", () => {
  it("reads every word once and splits the first word into units", () => {
    const { container } = render(TextRotate, {
      words: ["Laravel", "React"],
      class: "text-muted",
      id: "stack",
    });
    const root = container.querySelector("#stack")!;
    expect(root.className).toContain("inline-flex");
    expect(root.className.endsWith("text-muted")).toBe(true);
    expect(screen.getByText("Laravel, React")).toHaveClass("sr-only");
    expect(unitTexts(container)).toEqual(Array.from("Laravel"));
    expect(root.querySelector("[data-unit]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("keeps the space after each word when split by words", () => {
    const { container } = render(TextRotate, {
      words: ["with confidence", "faster"],
      split: "words",
    });
    expect(unitTexts(container)).toEqual(["with ", "confidence"]);
  });

  it("swaps to the next word after the interval", async () => {
    vi.useFakeTimers();
    const animate = stubAnimate();
    const { container } = render(TextRotate, {
      words: ["Laravel", "React"],
      interval: 1000,
    });
    await tick();
    vi.advanceTimersByTime(1000);
    await flush();
    await tick();
    expect(unitTexts(container)).toEqual(Array.from("React"));
    // Seven exits, five enters, and one width change.
    expect(animate).toHaveBeenCalledTimes(7 + 5 + 1);
  });

  it("stays on the first word with reduced motion", async () => {
    vi.useFakeTimers();
    stubReducedMotion();
    const { container } = render(TextRotate, { words: ["Laravel", "React"] });
    vi.advanceTimersByTime(6000);
    await tick();
    expect(unitTexts(container)).toEqual(Array.from("Laravel"));
  });
});

describe("Svelte TextScramble", () => {
  it("renders the text for readers, a width holder, and the visible layer", () => {
    const { container } = render(TextScramble, {
      text: "Open the brief",
      class: "ml-1",
    });
    const root = container.firstElementChild!;
    expect(root.className).toBe("inline-grid tabular-nums ml-1");
    expect(screen.getByText("Open the brief", { selector: ".sr-only" }));
    expect(root.querySelector(".invisible")).toHaveTextContent(
      "Open the brief",
    );
    expect(root.lastElementChild).toHaveTextContent("Open the brief");
  });

  it("scrambles right away on mount, keeps spaces, and decodes back", async () => {
    vi.useFakeTimers();
    const { container } = render(TextScramble, {
      text: "Access granted",
      trigger: "mount",
      charset: "binary",
      duration: 200,
    });
    await tick();
    const layer = container.firstElementChild!.lastElementChild!;
    const scrambled = layer.textContent ?? "";
    expect(scrambled).not.toBe("Access granted");
    expect(scrambled).toHaveLength("Access granted".length);
    expect(scrambled).toMatch(/^[01]{6} [01]{7}$/);
    vi.advanceTimersByTime(400);
    await tick();
    expect(layer).toHaveTextContent("Access granted");
  });
});

describe("Svelte TypingText", () => {
  it("shows the first word, reads every word, and hides the caret on request", () => {
    const { container } = render(TypingText, {
      words: ["Laravel", "React"],
      cursor: false,
      class: "text-muted",
    });
    expect(container.firstElementChild!.className).toBe("inline text-muted");
    expect(screen.getByText("Laravel, React")).toHaveClass("sr-only");
    expect(screen.getByText("Laravel")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("[aria-hidden=true]")).toHaveLength(1);
  });

  it("deletes the word and types the next one", async () => {
    vi.useFakeTimers();
    const { container } = render(TypingText, {
      words: ["Vue", "Svelte"],
      typeSpeed: 10,
      deleteSpeed: 10,
      pause: 100,
    });
    await tick();
    const typed = container.querySelector(".sr-only + span")!;
    vi.advanceTimersByTime(125);
    await tick();
    expect(typed.textContent).toBe("");
    vi.advanceTimersByTime(70);
    await tick();
    expect(typed).toHaveTextContent("Svelte");
  });
});

describe("Svelte UnderlineLink", () => {
  it("marks the current page, keeps the user class last, and draws one line", () => {
    render(UnderlineLink, {
      href: "/docs",
      active: true,
      class: "text-ink",
      children: createRawSnippet(() => ({ render: () => "<span>Docs</span>" })),
    });
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link.className.endsWith("text-ink")).toBe(true);
    expect(link.querySelectorAll("span[aria-hidden=true]")).toHaveLength(1);
  });

  it("replaces unsafe hrefs and renders two lines or a scribble", () => {
    const { container } = render(UnderlineLink, {
      href: " javascript:alert(1)",
      variant: "goes-out-comes-in",
    });
    const link = container.querySelector("a")!;
    expect(link).toHaveAttribute("href", "#");
    expect(link).not.toHaveAttribute("aria-current");
    expect(link.querySelectorAll("span[aria-hidden=true]")).toHaveLength(2);

    const scribble = render(UnderlineLink, { href: "#", variant: "scribble" });
    const svg = scribble.container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg.querySelector("path")).toHaveAttribute("pathLength", "1");
  });
});

describe("Svelte VariableWeightText", () => {
  it("renders one letter per character at the min weight", () => {
    stubReducedMotion();
    const { container } = render(VariableWeightText, {
      text: "Hai",
      min: 200,
      class: "text-6xl",
    });
    expect(container.firstElementChild!.className).toBe("inline text-6xl");
    expect(screen.getByText("Hai")).toHaveClass("sr-only");
    const letters = [
      ...container.querySelectorAll<HTMLElement>("[data-letter]"),
    ];
    expect(letters.map((el) => el.textContent)).toEqual(["H", "a", "i"]);
    expect(letters[0]!.style.fontWeight).toBe("200");
    expect(letters[0]!.style.fontVariationSettings).toMatch(
      /^["']wght["'] 200$/,
    );
  });
});

describe("Svelte VerticalCutReveal", () => {
  it("splits words, chars, and lines into units behind a cut", () => {
    stubReducedMotion();
    const words = render(VerticalCutReveal, { text: "Team plan" });
    expect(screen.getByText("Team plan")).toHaveClass("sr-only");
    expect(unitTexts(words.container)).toEqual(["Team", "plan"]);
    expect(
      words.container.querySelector("[data-unit]")!.parentElement,
    ).toHaveClass("overflow-hidden");

    const chars = render(VerticalCutReveal, { text: "Rp 9", split: "chars" });
    expect(unitTexts(chars.container)).toEqual(["R", "p", "9"]);

    const lines = render(VerticalCutReveal, {
      text: "Design once.\nShip it.",
      split: "lines",
    });
    expect(unitTexts(lines.container)).toEqual(["Design once.", "Ship it."]);
    expect(screen.getByText("Design once. Ship it.")).toHaveClass("sr-only");
  });

  it("reveals every unit with a stagger from the last one", async () => {
    const animate = stubAnimate();
    const { container } = render(VerticalCutReveal, {
      text: "a b c",
      from: "last",
      stagger: 10,
      delay: 5,
      direction: "down",
    });
    await tick();
    expect(animate).toHaveBeenCalledTimes(3);
    const delays = animate.mock.calls.map(
      (call) => (call as unknown as [unknown, { delay: number }])[1].delay,
    );
    expect(delays).toEqual([25, 15, 5]);
    const units = [...container.querySelectorAll<HTMLElement>("[data-unit]")];
    expect(units.every((el) => el.style.transform === "")).toBe(true);
  });
});
