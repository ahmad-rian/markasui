import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AvatarGroup } from "../../components/avatar-group/AvatarGroup";
import { Marquee } from "../../components/marquee/Marquee";
import { NumberTicker } from "../../components/number-ticker/NumberTicker";
import { ScrollProgress } from "../../components/scroll-progress/ScrollProgress";
import { SpotlightCard } from "../../components/spotlight-card/SpotlightCard";
import { TypingText } from "../../components/typing-text/TypingText";

const team = [
  { name: "Dewi Lestari", src: "/dewi.png" },
  { name: "Budi Santoso" },
  { name: "Siti Aminah" },
  { name: "John Carter" },
  { name: "Maya Putri" },
  { name: "Ana Lim" },
];

/** Paksa prefers-reduced-motion: reduce selama satu tes. */
const preferReducedMotion = () =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({ matches: true } as MediaQueryList),
  );

/** Mock Web Animations API yang tidak ada di jsdom. */
function mockAnimate() {
  const animation = { pause: vi.fn(), play: vi.fn(), cancel: vi.fn() };
  const animate = vi.fn().mockReturnValue(animation);
  HTMLElement.prototype.animate =
    animate as typeof HTMLElement.prototype.animate;
  return { animate, animation };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
});

describe("React AvatarGroup", () => {
  it("shows max avatars, named images, and a +N chip with hidden names", () => {
    const { container } = render(
      <AvatarGroup items={team} max={3} className="mt-2" />,
    );
    const group = screen.getByRole("group", { name: "Members" });
    expect(group.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByRole("img", { name: "Dewi Lestari" })).toHaveAttribute(
      "src",
      "/dewi.png",
    );
    expect(screen.getByRole("img", { name: "Budi Santoso" })).toHaveTextContent(
      "BS",
    );
    expect(screen.queryByRole("img", { name: "John Carter" })).toBeNull();
    expect(screen.getByText("3 more")).toHaveClass("sr-only");
    expect(screen.getByText("+3")).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getByText("John Carter, Maya Putri, Ana Lim"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(5);
  });

  it("hides the chip when everyone fits and applies the size", () => {
    render(<AvatarGroup items={team.slice(1, 3)} size="lg" />);
    expect(screen.queryByText(/more/)).toBeNull();
    expect(screen.getByRole("img", { name: "Siti Aminah" })).toHaveClass(
      "size-12",
    );
  });

  it("overrides groupLabel and moreLabel", () => {
    render(
      <AvatarGroup
        items={team}
        max={4}
        groupLabel="Anggota proyek"
        moreLabel="{count} lainnya"
      />,
    );
    expect(
      screen.getByRole("group", { name: "Anggota proyek" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2 lainnya")).toBeInTheDocument();
  });
});

describe("React NumberTicker", () => {
  it("counts from `from` to the formatted value with prefix and suffix", async () => {
    const { container } = render(
      <NumberTicker
        value={12480.5}
        decimals={1}
        prefix="$"
        suffix="+"
        duration={60}
        className="text-2xl"
      />,
    );
    const root = container.firstElementChild!;
    expect(root.className.endsWith("text-2xl")).toBe(true);
    expect(
      screen.getByText("$12,480.5+", { selector: ".sr-only" }),
    ).toBeInTheDocument();
    const counter = root.lastElementChild!;
    expect(counter).toHaveAttribute("aria-hidden", "true");
    expect(counter).toHaveTextContent("$0.0+");
    await waitFor(() => expect(counter).toHaveTextContent("$12,480.5+"));
  });

  it("formats with the locale and counts down from a higher number", async () => {
    const { container } = render(
      <NumberTicker value={1500} from={9000} locale="id-ID" duration={40} />,
    );
    const counter = container.firstElementChild!.lastElementChild!;
    expect(counter).toHaveTextContent("9.000");
    await waitFor(() => expect(counter).toHaveTextContent("1.500"));
  });

  it("shows the final value right away with reduced motion", () => {
    preferReducedMotion();
    const { container } = render(<NumberTicker value={42} duration={5000} />);
    expect(container.firstElementChild!.lastElementChild).toHaveTextContent(
      "42",
    );
  });
});

describe("React TypingText", () => {
  it("pauses on the first word, deletes it, and types the next one", () => {
    vi.useFakeTimers();
    const { container } = render(
      <TypingText
        words={["ab", "cd"]}
        typeSpeed={10}
        deleteSpeed={5}
        pause={100}
        className="text-muted"
      />,
    );
    const root = container.firstElementChild!;
    const typed = root.children[1]!;
    expect(root.className.endsWith("text-muted")).toBe(true);
    expect(screen.getByText("ab, cd")).toHaveClass("sr-only");
    expect(typed).toHaveAttribute("aria-hidden", "true");
    expect(typed).toHaveTextContent("ab");

    act(() => vi.advanceTimersByTime(100));
    expect(typed).toHaveTextContent("a");
    act(() => vi.advanceTimersByTime(5));
    expect(typed.textContent).toBe("");
    act(() => vi.advanceTimersByTime(5 + 10));
    expect(typed).toHaveTextContent("c");
    act(() => vi.advanceTimersByTime(10));
    expect(typed).toHaveTextContent("cd");
  });

  it("stops on the last word without loop and can hide the cursor", () => {
    vi.useFakeTimers();
    const { container } = render(
      <TypingText words={["go"]} loop={false} cursor={false} typeSpeed={10} />,
    );
    expect(container.firstElementChild!.children).toHaveLength(2);
    act(() => vi.advanceTimersByTime(5000));
    expect(container.firstElementChild!.children[1]).toHaveTextContent("go");
  });

  it("blinks the cursor and stays on the first word with reduced motion", () => {
    vi.useFakeTimers();
    const { animate } = mockAnimate();
    const { container, unmount } = render(
      <TypingText words={["one", "two"]} />,
    );
    expect(animate).toHaveBeenCalledTimes(1);
    expect(container.firstElementChild!.children[2]).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    unmount();

    preferReducedMotion();
    animate.mockClear();
    const view = render(<TypingText words={["one", "two"]} pause={10} />);
    act(() => vi.advanceTimersByTime(1000));
    expect(view.container.firstElementChild!.children[1]).toHaveTextContent(
      "one",
    );
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("React Marquee", () => {
  it("renders the content twice with an inert, hidden copy", () => {
    const { container } = render(
      <Marquee className="my-4">
        <span>Laravel</span>
      </Marquee>,
    );
    const root = container.firstElementChild!;
    expect(root.className.endsWith("my-4")).toBe(true);
    expect(root).toHaveClass("flex-row", "mask-x-from-85%");
    const [first, copy] = Array.from(root.children);
    expect(first).not.toHaveAttribute("aria-hidden");
    expect(first).not.toHaveAttribute("inert");
    expect(copy).toHaveAttribute("aria-hidden", "true");
    expect(copy).toHaveAttribute("inert");
    expect(screen.getAllByText("Laravel")).toHaveLength(2);
  });

  it("animates each copy and pauses on hover and focus", () => {
    const { animate, animation } = mockAnimate();
    const { container } = render(
      <Marquee vertical reverse duration={10} fade={false}>
        <a href="/a">Link</a>
      </Marquee>,
    );
    const root = container.firstElementChild!;
    expect(root).toHaveClass("flex-col");
    expect(root).not.toHaveClass("mask-y-from-85%");
    expect(animate).toHaveBeenCalledTimes(2);
    expect(animate).toHaveBeenCalledWith(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
      { duration: 10000, iterations: Infinity, direction: "reverse" },
    );
    fireEvent.mouseEnter(root);
    expect(animation.pause).toHaveBeenCalledTimes(2);
    fireEvent.mouseLeave(root);
    expect(animation.play).toHaveBeenCalledTimes(2);
    fireEvent.focusIn(screen.getAllByText("Link")[0]!);
    expect(animation.pause).toHaveBeenCalledTimes(4);
  });

  it("keeps running on hover without pauseOnHover and stays still with reduced motion", () => {
    const { animate, animation } = mockAnimate();
    const { container, unmount } = render(
      <Marquee pauseOnHover={false}>x</Marquee>,
    );
    fireEvent.mouseEnter(container.firstElementChild!);
    expect(animation.pause).not.toHaveBeenCalled();
    unmount();
    expect(animation.cancel).toHaveBeenCalledTimes(2);

    preferReducedMotion();
    animate.mockClear();
    render(<Marquee>x</Marquee>);
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("React ScrollProgress", () => {
  it("is a hidden fixed bar for the page by default", () => {
    const { container } = render(<ScrollProgress className="z-40" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).toHaveClass("fixed", "top-0", "h-0.5");
    expect(root.className.endsWith("z-40")).toBe(true);
    expect((root.firstElementChild as HTMLElement).style.transform).toBe(
      "scaleX(0)",
    );
  });

  it("follows the scroll position of its parent", async () => {
    const { container } = render(
      <div data-testid="box">
        <ScrollProgress target="parent" color="success" size="lg" />
      </div>,
    );
    const box = screen.getByTestId("box");
    Object.defineProperties(box, {
      scrollHeight: { value: 600 },
      clientHeight: { value: 200 },
      scrollTop: { value: 200, writable: true },
    });
    const root = container.querySelector("[aria-hidden]") as HTMLElement;
    const fill = root.firstElementChild as HTMLElement;
    expect(root).toHaveClass("sticky", "h-1.5");
    expect(fill).toHaveClass("bg-success");
    fireEvent.scroll(box);
    await waitFor(() => expect(fill.style.transform).toBe("scaleX(0.5)"));
  });
});

describe("React SpotlightCard", () => {
  it("renders content, hidden light layers, and follows the pointer", () => {
    const onPointerMove = vi.fn();
    const { container } = render(
      <SpotlightCard
        color="success"
        className="w-64"
        onPointerMove={onPointerMove}
      >
        <p>Content</p>
      </SpotlightCard>,
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.className.endsWith("w-64")).toBe(true);
    expect(card).toHaveClass("[--spot-color:var(--color-success)]");
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    expect(screen.getByText("Content")).toBeInTheDocument();
    fireEvent.pointerMove(card, { clientX: 40, clientY: 24 });
    expect(card.style.getPropertyValue("--spot-x")).toBe("40px");
    expect(card.style.getPropertyValue("--spot-y")).toBe("24px");
    expect(onPointerMove).toHaveBeenCalledTimes(1);
  });
});
