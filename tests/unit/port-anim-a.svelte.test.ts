import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet, tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import AvatarGroup from "../../components/avatar-group/AvatarGroup.svelte";
import Marquee from "../../components/marquee/Marquee.svelte";
import NumberTicker from "../../components/number-ticker/NumberTicker.svelte";
import ScrollProgress from "../../components/scroll-progress/ScrollProgress.svelte";
import SpotlightCard from "../../components/spotlight-card/SpotlightCard.svelte";
import TextHighlighter from "../../components/text-highlighter/TextHighlighter.svelte";
import HighlighterHarness from "./fixtures/PortAnimAHighlighterHarness.svelte";
import LinksHarness from "./fixtures/PortAnimALinksHarness.svelte";

const team = [
  { name: "Dewi Lestari", src: "/dewi.png" },
  { name: "Budi Santoso" },
  { name: "Siti Aminah" },
  { name: "John Carter" },
  { name: "Maya Putri" },
  { name: "Ana Lim" },
];

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

/** Forces prefers-reduced-motion: reduce for one test. */
const preferReducedMotion = () =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({ matches: true } as MediaQueryList),
  );

/** jsdom has no Web Animations API. */
function mockAnimate() {
  const animation = { pause: vi.fn(), play: vi.fn(), cancel: vi.fn() };
  const animate = vi.fn().mockReturnValue(animation);
  HTMLElement.prototype.animate =
    animate as typeof HTMLElement.prototype.animate;
  return { animate, animation };
}

afterEach(() => {
  vi.unstubAllGlobals();
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
});

describe("Svelte AvatarGroup", () => {
  it("names the group and each person, and collapses the rest into a chip", () => {
    const { container } = render(AvatarGroup, {
      items: team,
      max: 3,
      size: "lg",
      groupLabel: "Assignees",
      moreLabel: "{count} lainnya",
      class: "mt-2",
    });
    const group = screen.getByRole("group", { name: "Assignees" });
    expect(group.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByRole("img", { name: "Dewi Lestari" })).toHaveAttribute(
      "src",
      "/dewi.png",
    );
    expect(screen.getByRole("img", { name: "Budi Santoso" })).toHaveTextContent(
      "BS",
    );
    expect(screen.getByText("3 lainnya")).toHaveClass("sr-only");
    expect(screen.getByText("+3")).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getByText("John Carter, Maya Putri, Ana Lim"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll(".size-12")).toHaveLength(4);
  });

  it("uses the English defaults and skips the chip when everyone fits", () => {
    render(AvatarGroup, { items: team.slice(0, 2) });
    expect(screen.getByRole("group", { name: "Members" })).toBeInTheDocument();
    expect(screen.queryByText(/more/)).toBeNull();
  });
});

describe("Svelte LetterSwap", () => {
  it("reads the text once and swaps every letter on hover of the link", async () => {
    const { animate } = mockAnimate();
    render(LinksHarness);
    const link = screen.getByRole("link", { name: "Pricing" });
    const letters = link.querySelectorAll("[data-letter]");
    expect(letters).toHaveLength(7);
    expect(letters[0]).toHaveAttribute("aria-hidden", "true");
    expect(letters[0]!.lastElementChild).toHaveClass("bottom-full");
    await fireEvent.pointerEnter(link);
    expect(animate).toHaveBeenCalledTimes(7);
    expect(animate.mock.calls[0]![0]).toEqual([
      { transform: "none" },
      { transform: "translateY(100%)" },
    ]);
  });

  it("pingpong holds the swap with a transition until the pointer leaves", async () => {
    render(LinksHarness, { mode: "pingpong" });
    const link = screen.getByRole("link", { name: "Pricing" });
    const first = link.querySelector<HTMLElement>("[data-letter]")!;
    await fireEvent.focusIn(link);
    expect(first.style.transform).toBe("translateY(100%)");
    await fireEvent.focusOut(link);
    expect(first.style.transform).toBe("");
  });

  it("stays still with reduced motion", async () => {
    preferReducedMotion();
    const { animate } = mockAnimate();
    render(LinksHarness);
    await fireEvent.pointerEnter(screen.getByRole("link"));
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Svelte Marquee", () => {
  it("renders a hidden inert copy, animates both, and pauses on hover", async () => {
    const { animate, animation } = mockAnimate();
    const { container } = render(Marquee, {
      vertical: true,
      reverse: true,
      duration: 10,
      class: "h-64",
      children: text("Laravel"),
    });
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("flex-col", "mask-y-from-85%");
    expect(root.className.endsWith("h-64")).toBe(true);
    const [first, copy] = [...root.children];
    expect(first).not.toHaveAttribute("aria-hidden");
    expect(copy).toHaveAttribute("aria-hidden", "true");
    // Svelte sets inert as a property; jsdom does not reflect it to the attribute.
    expect((copy as HTMLElement).inert || copy!.hasAttribute("inert")).toBe(
      true,
    );
    expect(screen.getAllByText("Laravel")).toHaveLength(2);
    expect(animate).toHaveBeenCalledTimes(2);
    expect(animate.mock.calls[0]![1]).toMatchObject({
      duration: 10000,
      direction: "reverse",
    });
    await fireEvent.mouseEnter(root);
    expect(animation.pause).toHaveBeenCalledTimes(2);
  });

  it("does not animate with reduced motion and can drop the fade", () => {
    preferReducedMotion();
    const { animate } = mockAnimate();
    const { container } = render(Marquee, {
      fade: false,
      children: text("Vue"),
    });
    expect(container.firstElementChild!.className).not.toContain("mask");
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Svelte NumberTicker", () => {
  it("counts from `from` to the formatted value", async () => {
    const { container } = render(NumberTicker, {
      value: 1500,
      from: 9000,
      locale: "id-ID",
      prefix: "Rp",
      duration: 40,
      class: "text-2xl",
    });
    const root = container.firstElementChild!;
    expect(root.className.endsWith("text-2xl")).toBe(true);
    expect(
      screen.getByText("Rp1.500", { selector: ".sr-only" }),
    ).toBeInTheDocument();
    const counter = root.lastElementChild!;
    expect(counter).toHaveTextContent("Rp9.000");
    await waitFor(() => expect(counter).toHaveTextContent("Rp1.500"));
  });

  it("shows the final value right away with reduced motion", () => {
    preferReducedMotion();
    const { container } = render(NumberTicker, {
      value: 99.9,
      decimals: 1,
      suffix: "%",
    });
    expect(container.firstElementChild!.lastElementChild).toHaveTextContent(
      "99.9%",
    );
  });
});

describe("Svelte ScrollProgress", () => {
  it("is a hidden fixed bar for the page by default", () => {
    const { container } = render(ScrollProgress, { class: "z-40" });
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).toHaveClass("fixed", "top-0", "h-0.5");
    expect(root.className.endsWith("z-40")).toBe(true);
    expect((root.firstElementChild as HTMLElement).style.transform).toBe(
      "scaleX(0)",
    );
  });

  it("follows the scroll position of its parent", async () => {
    render(LinksHarness);
    const box = screen.getByTestId("box");
    Object.defineProperties(box, {
      scrollHeight: { value: 600 },
      clientHeight: { value: 200 },
      scrollTop: { value: 200, writable: true },
    });
    const root = box.firstElementChild as HTMLElement;
    const fill = root.firstElementChild as HTMLElement;
    expect(root).toHaveClass("sticky", "h-1.5");
    expect(fill).toHaveClass("bg-success");
    await fireEvent.scroll(box);
    await waitFor(() => expect(fill.style.transform).toBe("scaleX(0.5)"));
  });
});

describe("Svelte SpotlightCard", () => {
  it("renders content, hidden light layers, and follows the pointer", async () => {
    const onpointermove = vi.fn();
    const { container } = render(SpotlightCard, {
      color: "success",
      class: "w-64",
      onpointermove,
      children: text("Content"),
    });
    const card = container.firstElementChild as HTMLElement;
    expect(card.className.endsWith("w-64")).toBe(true);
    expect(card).toHaveClass("[--spot-color:var(--color-success)]");
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    expect(screen.getByText("Content")).toBeInTheDocument();
    await fireEvent.pointerMove(card, { clientX: 40, clientY: 24 });
    expect(card.style.getPropertyValue("--spot-x")).toBe("40px");
    expect(card.style.getPropertyValue("--spot-y")).toBe("24px");
    expect(onpointermove).toHaveBeenCalledTimes(1);
  });
});

describe("Svelte TextHighlighter", () => {
  it("renders the chosen tag with state, direction, and timing", () => {
    const { container } = render(TextHighlighter, {
      as: "strong",
      trigger: "manual",
      active: true,
      variant: "marker",
      color: "primary",
      duration: 400,
      delay: 100,
      class: "font-bold",
      children: text("Key"),
    });
    const mark = container.querySelector("strong")!;
    expect(mark).toHaveAttribute("data-state", "active");
    expect(mark).toHaveAttribute("data-direction", "ltr");
    expect(mark).toHaveAttribute("data-trigger", "manual");
    expect(mark).toHaveClass("[--markas-th-c:var(--color-primary)]");
    expect(mark.className.endsWith("font-bold")).toBe(true);
    expect(mark.style.transitionDuration).toBe("400ms");
    expect(mark.style.transitionDelay).toBe("100ms");
  });

  it("follows active, animate(direction), and reset() for trigger manual", async () => {
    render(HighlighterHarness);
    const mark = document.querySelector("mark")!;
    expect(mark).toHaveAttribute("data-state", "inactive");
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(mark).toHaveAttribute("data-state", "active");
    await userEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(mark).toHaveAttribute("data-state", "inactive");
    await userEvent.click(screen.getByRole("button", { name: "Animate" }));
    await tick();
    expect(mark).toHaveAttribute("data-state", "active");
    expect(mark).toHaveAttribute("data-direction", "rtl");
  });

  it("hover and focus on the closest link draw the highlight", async () => {
    render(HighlighterHarness);
    const link = screen.getByRole("link", { name: "Docs" });
    const mark = link.firstElementChild!;
    expect(mark).toHaveAttribute("data-direction", "btt");
    await fireEvent.pointerEnter(link);
    expect(mark).toHaveAttribute("data-state", "active");
    await fireEvent.pointerLeave(link);
    expect(mark).toHaveAttribute("data-state", "inactive");
    await fireEvent.focusIn(link);
    expect(mark).toHaveAttribute("data-state", "active");
  });

  it("draws once when the text scrolls into view", async () => {
    let notify: IntersectionObserverCallback = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          notify = callback;
        }
        observe() {}
        disconnect = disconnect;
      },
    );
    const { container } = render(TextHighlighter, { children: text("Seen") });
    const mark = container.firstElementChild!;
    expect(mark).toHaveAttribute("data-state", "inactive");
    notify(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    await tick();
    expect(mark).toHaveAttribute("data-state", "active");
    expect(disconnect).toHaveBeenCalled();
  });
});
