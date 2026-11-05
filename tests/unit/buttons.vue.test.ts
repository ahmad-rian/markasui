import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import CopyButton from "../../components/copy-button/CopyButton.vue";
import FlipButton from "../../components/flip-button/FlipButton.vue";
import GithubStarsButton from "../../components/github-stars-button/GithubStarsButton.vue";
import HoldButton from "../../components/hold-button/HoldButton.vue";
import RippleButton from "../../components/ripple-button/RippleButton.vue";
import ShimmerButton from "../../components/shimmer-button/ShimmerButton.vue";

const writeText = vi.fn<(text: string) => Promise<void>>();

beforeEach(() => {
  writeText.mockReset().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  // jsdom has no Element.animate; tests that stub it remove it again.
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
});

/** A fake Web Animations API that records calls. */
const stubAnimate = () => {
  const animation = {
    play: vi.fn(),
    pause: vi.fn(),
    cancel: vi.fn(),
    onfinish: null as null | (() => void),
  };
  const animate = vi.fn(() => animation);
  HTMLElement.prototype.animate = animate as unknown as HTMLElement["animate"];
  return { animate, animation };
};

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reduce })),
  );

/** Lets the awaited clipboard promise and the re-render settle. */
const flush = async () => {
  await Promise.resolve();
  await nextTick();
};

describe("Vue CopyButton", () => {
  it("copies the text, swaps to copied, announces, and resets", async () => {
    vi.useFakeTimers();
    render(CopyButton, {
      props: { text: "npm i markasui" },
      attrs: { class: "mt-2" },
      slots: { default: "Copy" },
    });
    const button = screen.getByRole("button", { name: "Copy" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-state", "idle");
    expect(button.className.endsWith("mt-2")).toBe(true);

    await fireEvent.click(button);
    await flush();
    expect(writeText).toHaveBeenCalledWith("npm i markasui");
    expect(button).toHaveAttribute("data-state", "copied");
    expect(screen.getByRole("status")).toHaveTextContent("Copied");

    vi.advanceTimersByTime(2000);
    await nextTick();
    expect(button).toHaveAttribute("data-state", "idle");
    expect(screen.getByRole("status")).toHaveTextContent("");
  });

  it("is square and named by copyLabel without a label, labels override", async () => {
    render(CopyButton, {
      props: {
        text: "abc",
        size: "sm",
        copyLabel: "Salin",
        copiedLabel: "Tersalin",
      },
    });
    const button = screen.getByRole("button", { name: "Salin" });
    expect(button.className).toContain("size-8");
    await fireEvent.click(button);
    await flush();
    expect(screen.getByRole("status")).toHaveTextContent("Tersalin");
  });

  it("stays idle when the clipboard rejects and emits click", async () => {
    writeText.mockRejectedValue(new Error("blocked"));
    const onClick = vi.fn();
    render(CopyButton, {
      props: { text: "abc", onClick },
      slots: { default: "Copy" },
    });
    const button = screen.getByRole("button", { name: "Copy" });
    await fireEvent.click(button);
    await flush();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute("data-state", "idle");
  });
});

describe("Vue ShimmerButton", () => {
  it("renders a button with an aria-hidden sheen and the user class last", () => {
    render(ShimmerButton, {
      props: { variant: "secondary", size: "lg" },
      attrs: { class: "w-full" },
      slots: { default: "Upgrade" },
    });
    const button = screen.getByRole("button", { name: "Upgrade" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("h-12");
    expect(button.className.endsWith("w-full")).toBe(true);
    const sheen = button.querySelector("span[aria-hidden=true]");
    expect(sheen?.className).toContain("via-primary/10");
  });

  it("starts the sweep with motion and skips it with reduced motion", () => {
    const { animate, animation } = stubAnimate();
    stubReducedMotion(true);
    const first = render(ShimmerButton, { slots: { default: "Go" } });
    expect(animate).not.toHaveBeenCalled();
    first.unmount();

    stubReducedMotion(false);
    const second = render(ShimmerButton, {
      props: { duration: 3000 },
      slots: { default: "Go" },
    });
    expect(animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ duration: 3000, iterations: Infinity }),
    );
    second.unmount();
    expect(animation.cancel).toHaveBeenCalled();
  });
});

describe("Vue RippleButton", () => {
  it("forwards click and type, and appends the user class last", async () => {
    const onClick = vi.fn();
    render(RippleButton, {
      attrs: { type: "submit", class: "mt-2", onClick },
      slots: { default: "Send" },
    });
    const button = screen.getByRole("button", { name: "Send" });
    await fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute("type", "submit");
    expect(button.className.endsWith("mt-2")).toBe(true);
  });

  it("adds a wave that removes itself when the animation ends", async () => {
    const { animate, animation } = stubAnimate();
    render(RippleButton, { slots: { default: "Send" } });
    const button = screen.getByRole("button", { name: "Send" });
    const layer = button.querySelector("span[aria-hidden=true]");
    await fireEvent.click(button, { detail: 1, clientX: 5, clientY: 5 });
    expect(animate).toHaveBeenCalledTimes(1);
    expect(layer?.children).toHaveLength(1);
    animation.onfinish?.();
    expect(layer?.children).toHaveLength(0);
  });

  it("draws nothing with reduced motion", async () => {
    const { animate } = stubAnimate();
    stubReducedMotion(true);
    render(RippleButton, { slots: { default: "Send" } });
    await fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Vue FlipButton", () => {
  it("shows the back label on an aria-hidden face and keeps the front name", () => {
    render(FlipButton, {
      props: { backLabel: "No card needed" },
      attrs: { class: "mt-2" },
      slots: { default: "Start trial" },
    });
    const button = screen.getByRole("button", { name: "Start trial" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("No card needed")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("prefers the back slot and falls back to the label", () => {
    const { unmount } = render(FlipButton, {
      props: { backLabel: "Ignored" },
      slots: { default: "Download", back: "PDF, 2.4 MB" },
    });
    expect(screen.getByText("PDF, 2.4 MB")).toBeInTheDocument();
    expect(screen.queryByText("Ignored")).not.toBeInTheDocument();
    unmount();

    render(FlipButton, {
      props: { variant: "danger" },
      slots: { default: "Delete" },
    });
    expect(screen.getAllByText("Delete")).toHaveLength(2);
  });
});

describe("Vue HoldButton", () => {
  beforeEach(() => vi.useFakeTimers());

  it("completes after the full hold and emits complete", async () => {
    const onComplete = vi.fn();
    render(HoldButton, {
      props: { duration: 1000, onComplete },
      attrs: { class: "mt-2" },
      slots: { default: "Hold to delete" },
    });
    const button = screen.getByRole("button", { name: "Hold to delete" });
    expect(button).toHaveAccessibleDescription("Press and hold to confirm");
    expect(button.style.getPropertyValue("--hold-duration")).toBe("1000ms");
    expect(button.className.endsWith("mt-2")).toBe(true);

    await fireEvent.keyDown(button, { key: " " });
    expect(button).toHaveAttribute("data-state", "holding");
    vi.advanceTimersByTime(1000);
    await nextTick();
    expect(button).toHaveAttribute("data-state", "complete");
    expect(onComplete).toHaveBeenCalledTimes(1);
    await fireEvent.keyUp(button, { key: " " });
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("cancels when released early, with pointer or Enter", async () => {
    const onComplete = vi.fn();
    render(HoldButton, {
      props: { onComplete },
      slots: { default: "Hold" },
    });
    const button = screen.getByRole("button", { name: "Hold" });

    await fireEvent.pointerDown(button, { button: 0 });
    expect(button).toHaveAttribute("data-state", "holding");
    vi.advanceTimersByTime(700);
    await fireEvent.pointerLeave(button);
    expect(button).toHaveAttribute("data-state", "idle");

    await fireEvent.keyDown(button, { key: "Enter" });
    await fireEvent.keyDown(button, { key: "Enter", repeat: true });
    vi.advanceTimersByTime(700);
    await fireEvent.keyUp(button, { key: "Enter" });
    vi.advanceTimersByTime(2000);
    expect(onComplete).not.toHaveBeenCalled();

    await fireEvent.pointerDown(button, { button: 2 });
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("overrides holdLabel", () => {
    render(HoldButton, {
      props: { holdLabel: "Tahan untuk konfirmasi" },
      slots: { default: "Hapus" },
    });
    expect(
      screen.getByRole("button", { name: "Hapus" }),
    ).toHaveAccessibleDescription("Tahan untuk konfirmasi");
  });
});

describe("Vue GithubStarsButton", () => {
  it("links to the repo with a compact count and the full count for screen readers", () => {
    render(GithubStarsButton, {
      props: { href: "https://github.com/markasui/markasui", stars: 12480 },
      attrs: { class: "mt-2" },
      slots: { default: "Star" },
    });
    const link = screen.getByRole("link", { name: /Star\s*12,480 stars/ });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/markasui/markasui",
    );
    expect(link.className).toContain("border-line");
    expect(link.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("12.5k")).toHaveAttribute("aria-hidden", "true");
  });

  it("formats counts, overrides starsLabel, and blocks unsafe hrefs", () => {
    const { unmount } = render(GithubStarsButton, {
      props: { href: "javascript:alert(1)", stars: 980 },
      slots: { default: "Star" },
    });
    expect(screen.getByRole("link")).toHaveAttribute("href", "#");
    expect(screen.getByText("980")).toBeInTheDocument();
    unmount();

    render(GithubStarsButton, {
      props: { href: "/repo", stars: 1240000, starsLabel: "{count} bintang" },
      slots: { default: "Bintang" },
    });
    expect(
      screen.getByRole("link", { name: /Bintang\s*1,240,000 bintang/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("1.2M")).toBeInTheDocument();
  });

  it("counts up from zero once visible", () => {
    stubReducedMotion(false);
    let notify: (entries: { isIntersecting: boolean }[]) => void = () => {};
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: typeof notify) {
          notify = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
      frames.push(callback),
    );
    render(GithubStarsButton, {
      props: { href: "/repo", stars: 500 },
      slots: { default: "Star" },
    });
    expect(screen.getByText("0")).toBeInTheDocument();
    notify([{ isIntersecting: true }]);
    frames.shift()?.(performance.now() + 5000);
    expect(screen.getByText("500")).toBeInTheDocument();
  });
});
