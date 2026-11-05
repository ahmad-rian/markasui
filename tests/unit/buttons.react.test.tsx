import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "../../components/copy-button/CopyButton";
import { FlipButton } from "../../components/flip-button/FlipButton";
import { GithubStarsButton } from "../../components/github-stars-button/GithubStarsButton";
import { HoldButton } from "../../components/hold-button/HoldButton";
import { RippleButton } from "../../components/ripple-button/RippleButton";
import { ShimmerButton } from "../../components/shimmer-button/ShimmerButton";

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

describe("React CopyButton", () => {
  it("copies the text, swaps to copied, announces, and resets", async () => {
    vi.useFakeTimers();
    render(
      <CopyButton text="npm i markasui" className="mt-2">
        Copy
      </CopyButton>,
    );
    const button = screen.getByRole("button", { name: "Copy" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-state", "idle");
    expect(button.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByRole("status")).toHaveTextContent("");

    await act(async () => fireEvent.click(button));
    expect(writeText).toHaveBeenCalledWith("npm i markasui");
    expect(button).toHaveAttribute("data-state", "copied");
    expect(screen.getByRole("status")).toHaveTextContent("Copied");

    act(() => vi.advanceTimersByTime(2000));
    expect(button).toHaveAttribute("data-state", "idle");
    expect(screen.getByRole("status")).toHaveTextContent("");
  });

  it("is square and named by copyLabel without a label, labels override", async () => {
    render(
      <CopyButton
        text="abc"
        size="sm"
        copyLabel="Salin"
        copiedLabel="Tersalin"
      />,
    );
    const button = screen.getByRole("button", { name: "Salin" });
    expect(button.className).toContain("size-8");
    await act(async () => fireEvent.click(button));
    expect(screen.getByRole("status")).toHaveTextContent("Tersalin");
  });

  it("stays idle when the clipboard rejects or onClick prevents default", async () => {
    writeText.mockRejectedValue(new Error("blocked"));
    const { rerender } = render(<CopyButton text="abc">Copy</CopyButton>);
    const button = screen.getByRole("button", { name: "Copy" });
    await act(async () => fireEvent.click(button));
    expect(button).toHaveAttribute("data-state", "idle");

    writeText.mockResolvedValue(undefined);
    rerender(
      <CopyButton text="abc" onClick={(event) => event.preventDefault()}>
        Copy
      </CopyButton>,
    );
    await act(async () => fireEvent.click(button));
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute("data-state", "idle");
  });
});

describe("React ShimmerButton", () => {
  it("renders a button with an aria-hidden sheen and the user class last", () => {
    render(
      <ShimmerButton variant="secondary" size="lg" className="w-full">
        Upgrade
      </ShimmerButton>,
    );
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
    const first = render(<ShimmerButton>Go</ShimmerButton>);
    expect(animate).not.toHaveBeenCalled();
    first.unmount();

    stubReducedMotion(false);
    const second = render(<ShimmerButton duration={3000}>Go</ShimmerButton>);
    expect(animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ duration: 3000, iterations: Infinity }),
    );
    second.unmount();
    expect(animation.cancel).toHaveBeenCalled();
  });
});

describe("React RippleButton", () => {
  it("calls onClick, keeps type, and appends the user class last", () => {
    const onClick = vi.fn();
    render(
      <RippleButton type="submit" className="mt-2" onClick={onClick}>
        Send
      </RippleButton>,
    );
    const button = screen.getByRole("button", { name: "Send" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute("type", "submit");
    expect(button.className.endsWith("mt-2")).toBe(true);
  });

  it("adds a wave that removes itself when the animation ends", () => {
    const { animate, animation } = stubAnimate();
    render(<RippleButton>Send</RippleButton>);
    const button = screen.getByRole("button", { name: "Send" });
    const layer = button.querySelector("span[aria-hidden=true]");
    fireEvent.click(button, { detail: 1, clientX: 5, clientY: 5 });
    expect(animate).toHaveBeenCalledTimes(1);
    expect(layer?.children).toHaveLength(1);
    animation.onfinish?.();
    expect(layer?.children).toHaveLength(0);
  });

  it("draws nothing with reduced motion", () => {
    const { animate } = stubAnimate();
    stubReducedMotion(true);
    render(<RippleButton>Send</RippleButton>);
    fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("React FlipButton", () => {
  it("shows the back label on an aria-hidden face and keeps the front name", () => {
    render(
      <FlipButton backLabel="No card needed" className="mt-2">
        Start trial
      </FlipButton>,
    );
    const button = screen.getByRole("button", { name: "Start trial" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("No card needed")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("falls back to the label on the back", () => {
    render(<FlipButton variant="danger">Delete</FlipButton>);
    expect(screen.getAllByText("Delete")).toHaveLength(2);
  });
});

describe("React HoldButton", () => {
  beforeEach(() => vi.useFakeTimers());

  it("completes after the full hold and calls onComplete", () => {
    const onComplete = vi.fn();
    render(
      <HoldButton duration={1000} onComplete={onComplete} className="mt-2">
        Hold to delete
      </HoldButton>,
    );
    const button = screen.getByRole("button", { name: "Hold to delete" });
    expect(button).toHaveAccessibleDescription("Press and hold to confirm");
    expect(button.style.getPropertyValue("--hold-duration")).toBe("1000ms");
    expect(button.className.endsWith("mt-2")).toBe(true);

    fireEvent.keyDown(button, { key: " " });
    expect(button).toHaveAttribute("data-state", "holding");
    act(() => vi.advanceTimersByTime(1000));
    expect(button).toHaveAttribute("data-state", "complete");
    expect(onComplete).toHaveBeenCalledTimes(1);
    fireEvent.keyUp(button, { key: " " });
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("cancels when released early, with pointer or Enter", () => {
    const onComplete = vi.fn();
    render(<HoldButton onComplete={onComplete}>Hold</HoldButton>);
    const button = screen.getByRole("button", { name: "Hold" });

    fireEvent.pointerDown(button, { button: 0 });
    expect(button).toHaveAttribute("data-state", "holding");
    act(() => vi.advanceTimersByTime(700));
    fireEvent.pointerLeave(button);
    expect(button).toHaveAttribute("data-state", "idle");

    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.keyDown(button, { key: "Enter", repeat: true });
    act(() => vi.advanceTimersByTime(700));
    fireEvent.keyUp(button, { key: "Enter" });
    act(() => vi.advanceTimersByTime(2000));
    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.pointerDown(button, { button: 2 });
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("overrides holdLabel", () => {
    render(<HoldButton holdLabel="Tahan untuk konfirmasi">Hapus</HoldButton>);
    expect(
      screen.getByRole("button", { name: "Hapus" }),
    ).toHaveAccessibleDescription("Tahan untuk konfirmasi");
  });
});

describe("React GithubStarsButton", () => {
  it("links to the repo with a compact count and the full count for screen readers", () => {
    render(
      <GithubStarsButton
        href="https://github.com/markasui/markasui"
        stars={12480}
        className="mt-2"
      >
        Star
      </GithubStarsButton>,
    );
    const link = screen.getByRole("link", { name: /Star\s*12,480 stars/ });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/markasui/markasui",
    );
    expect(link.className).toContain("border-line");
    expect(link.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("12.5k")).toHaveAttribute("aria-hidden", "true");
  });

  it("formats small and large counts, overrides starsLabel, and blocks unsafe hrefs", () => {
    const { rerender } = render(
      <GithubStarsButton href="javascript:alert(1)" stars={980}>
        Star
      </GithubStarsButton>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "#");
    expect(screen.getByText("980")).toBeInTheDocument();

    rerender(
      <GithubStarsButton
        href="/repo"
        stars={1240000}
        starsLabel="{count} bintang"
      >
        Bintang
      </GithubStarsButton>,
    );
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
    render(
      <GithubStarsButton href="/repo" stars={500}>
        Star
      </GithubStarsButton>,
    );
    expect(screen.getByText("0")).toBeInTheDocument();
    notify([{ isIntersecting: true }]);
    frames.shift()?.(performance.now() + 5000);
    expect(screen.getByText("500")).toBeInTheDocument();
  });
});
