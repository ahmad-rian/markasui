import { fireEvent, render, screen } from "@testing-library/svelte";
import { createRawSnippet, tick } from "svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CopyButton from "../../components/copy-button/CopyButton.svelte";
import FlipButton from "../../components/flip-button/FlipButton.svelte";
import GithubStarsButton from "../../components/github-stars-button/GithubStarsButton.svelte";
import HoldButton from "../../components/hold-button/HoldButton.svelte";
import RippleButton from "../../components/ripple-button/RippleButton.svelte";
import ShimmerButton from "../../components/shimmer-button/ShimmerButton.svelte";
import CopyButtonHarness from "./fixtures/CopyButtonHarness.svelte";
import FlipButtonHarness from "./fixtures/FlipButtonHarness.svelte";

const writeText = vi.fn<(text: string) => Promise<void>>();

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

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

describe("Svelte CopyButton", () => {
  it("copies, announces the translated label, resets, and keeps the user class last", async () => {
    vi.useFakeTimers();
    render(CopyButtonHarness);
    const button = screen.getByRole("button", { name: "Copy ID" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-state", "idle");
    expect(button.className).toContain("h-10");
    expect(button.className.endsWith("ml-1")).toBe(true);

    await fireEvent.click(button);
    await tick();
    expect(writeText).toHaveBeenCalledWith("INV-2048");
    expect(button).toHaveAttribute("data-state", "copied");
    expect(screen.getByRole("status")).toHaveTextContent("Tersalin");

    vi.advanceTimersByTime(2000);
    await tick();
    expect(button).toHaveAttribute("data-state", "idle");
    expect(screen.getByRole("status")).toHaveTextContent("");
  });

  it("is square and named by copyLabel without children", () => {
    render(CopyButton, { text: "abc", size: "sm", copyLabel: "Salin" });
    const button = screen.getByRole("button", { name: "Salin" });
    expect(button.className).toContain("size-8");
    expect(button.className).not.toContain("px-3");
  });

  it("stays idle when the clipboard rejects", async () => {
    writeText.mockRejectedValue(new Error("blocked"));
    render(CopyButton, { text: "abc", children: text("Copy") });
    const button = screen.getByRole("button", { name: "Copy" });
    await fireEvent.click(button);
    await tick();
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("calls the user onclick first and skips the copy when it prevents default", async () => {
    const onclick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(CopyButtonHarness, { onclick });
    await fireEvent.click(screen.getByRole("button", { name: "Copy ID" }));
    expect(onclick).toHaveBeenCalledOnce();
    expect(writeText).not.toHaveBeenCalled();
  });
});

describe("Svelte FlipButton", () => {
  it("renders the back snippet aria-hidden and falls back to the label", () => {
    render(FlipButtonHarness);
    const download = screen.getByRole("button", { name: "Download" });
    expect(download).toHaveAttribute("type", "button");
    expect(download.className).toContain("h-12");
    expect(screen.getByText("PDF").closest("[aria-hidden]")).toBeTruthy();
    expect(screen.getAllByText("Same on both")).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: "Same on both" }),
    ).toHaveAccessibleName("Same on both");
  });

  it("prefers backLabel over the label and appends the user class", () => {
    render(FlipButton, {
      backLabel: "No card needed",
      class: "mt-2",
      children: text("Start trial"),
    });
    const button = screen.getByRole("button", { name: "Start trial" });
    expect(button.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("No card needed")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});

describe("Svelte HoldButton", () => {
  beforeEach(() => vi.useFakeTimers());

  it("completes after the full hold and calls oncomplete", async () => {
    const oncomplete = vi.fn();
    render(HoldButton, {
      duration: 1000,
      oncomplete,
      class: "mt-2",
      children: text("Hold to delete"),
    });
    const button = screen.getByRole("button", { name: "Hold to delete" });
    expect(button).toHaveAccessibleDescription("Press and hold to confirm");
    expect(button.style.getPropertyValue("--hold-duration")).toBe("1000ms");
    expect(button.className.endsWith("mt-2")).toBe(true);

    await fireEvent.keyDown(button, { key: " " });
    expect(button).toHaveAttribute("data-state", "holding");
    vi.advanceTimersByTime(1000);
    await tick();
    expect(button).toHaveAttribute("data-state", "complete");
    expect(oncomplete).toHaveBeenCalledOnce();
    await fireEvent.keyUp(button, { key: " " });
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("cancels when released early and ignores the right button", async () => {
    const oncomplete = vi.fn();
    const onpointerleave = vi.fn();
    render(HoldButton, {
      oncomplete,
      onpointerleave,
      holdLabel: "Tahan untuk konfirmasi",
      children: text("Hold"),
    });
    const button = screen.getByRole("button", { name: "Hold" });
    expect(button).toHaveAccessibleDescription("Tahan untuk konfirmasi");

    await fireEvent.pointerDown(button, { button: 0 });
    expect(button).toHaveAttribute("data-state", "holding");
    vi.advanceTimersByTime(700);
    await fireEvent.pointerLeave(button);
    expect(onpointerleave).toHaveBeenCalledOnce();
    expect(button).toHaveAttribute("data-state", "idle");

    await fireEvent.keyDown(button, { key: "Enter" });
    vi.advanceTimersByTime(700);
    await fireEvent.keyUp(button, { key: "Enter" });
    vi.advanceTimersByTime(2000);
    expect(oncomplete).not.toHaveBeenCalled();

    await fireEvent.pointerDown(button, { button: 2 });
    expect(button).toHaveAttribute("data-state", "idle");
  });
});

describe("Svelte RippleButton", () => {
  it("adds a wave that removes itself, then calls onclick", async () => {
    const { animate, animation } = stubAnimate();
    const onclick = vi.fn();
    render(RippleButton, {
      type: "submit",
      class: "mt-2",
      onclick,
      children: text("Send"),
    });
    const button = screen.getByRole("button", { name: "Send" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button.className.endsWith("mt-2")).toBe(true);
    const layer = button.querySelector("span[aria-hidden=true]");
    await fireEvent.click(button, { detail: 1, clientX: 5, clientY: 5 });
    expect(onclick).toHaveBeenCalledOnce();
    expect(animate).toHaveBeenCalledOnce();
    expect(layer?.children).toHaveLength(1);
    animation.onfinish?.();
    expect(layer?.children).toHaveLength(0);
  });

  it("draws nothing with reduced motion", async () => {
    const { animate } = stubAnimate();
    stubReducedMotion(true);
    render(RippleButton, { children: text("Send") });
    await fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Svelte ShimmerButton", () => {
  it("renders an aria-hidden sheen for the variant and the user class last", () => {
    render(ShimmerButton, {
      variant: "secondary",
      size: "lg",
      class: "w-full",
      children: text("Upgrade"),
    });
    const button = screen.getByRole("button", { name: "Upgrade" });
    expect(button.className).toContain("h-12");
    expect(button.className.endsWith("w-full")).toBe(true);
    expect(button.querySelector("span[aria-hidden=true]")?.className).toContain(
      "via-primary/10",
    );
  });

  it("starts the sweep with motion, skips it with reduced motion, cancels on unmount", async () => {
    const { animate, animation } = stubAnimate();
    stubReducedMotion(true);
    const first = render(ShimmerButton, { children: text("Go") });
    await tick();
    expect(animate).not.toHaveBeenCalled();
    first.unmount();

    stubReducedMotion(false);
    const second = render(ShimmerButton, {
      duration: 3000,
      children: text("Go"),
    });
    await tick();
    expect(animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ duration: 3000, iterations: Infinity }),
    );
    second.unmount();
    expect(animation.cancel).toHaveBeenCalled();
  });
});

describe("Svelte GithubStarsButton", () => {
  it("links with a compact count, the full count for screen readers, and blocks unsafe hrefs", () => {
    render(GithubStarsButton, {
      href: "javascript:alert(1)",
      stars: 1240000,
      starsLabel: "{count} bintang",
      class: "mt-2",
      children: text("Bintang"),
    });
    const link = screen.getByRole("link", {
      name: /Bintang\s*1,240,000 bintang/,
    });
    expect(link).toHaveAttribute("href", "#");
    expect(link.className).toContain("border-line");
    expect(link.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("1.2M")).toHaveAttribute("aria-hidden", "true");
  });

  it("counts up from zero once visible", async () => {
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
      href: "https://github.com/markasui/markasui",
      stars: 500,
      children: text("Star"),
    });
    await tick();
    expect(screen.getByText("0")).toBeInTheDocument();
    notify([{ isIntersecting: true }]);
    frames.shift()?.(performance.now() + 5000);
    expect(screen.getByText("500")).toBeInTheDocument();
  });
});
