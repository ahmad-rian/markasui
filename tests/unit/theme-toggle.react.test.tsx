import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "../../components/theme-toggle/ThemeToggle";

const root = document.documentElement;
const stubDarkSystem = (matches: boolean) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches })),
  );

/** jsdom has no Web Animations API: record the calls instead. */
const animate = vi.fn();

beforeEach(() => {
  localStorage.clear();
  root.classList.remove("dark");
  animate.mockReset();
  Element.prototype.animate = animate as unknown as Element["animate"];
});

afterEach(() => {
  vi.unstubAllGlobals();
  root.classList.remove("dark");
});

const durations = () =>
  animate.mock.calls.map(
    ([, options]) => (options as KeyframeAnimationOptions).duration,
  );

describe("React ThemeToggle", () => {
  it("toggles the dark class, saves the choice, and dispatches the event", async () => {
    const onThemeChange = vi.fn();
    const onEvent = vi.fn();
    document.addEventListener("markas-theme-change", onEvent);
    render(<ThemeToggle onThemeChange={onThemeChange} className="ml-2" />);
    const button = screen.getByRole("button", { name: "Switch to dark theme" });

    expect(button).toHaveAttribute("type", "button");
    expect(button.className.endsWith("ml-2")).toBe(true);
    await act(async () => {
      fireEvent.click(button);
      await Promise.resolve();
    });

    expect(root).toHaveClass("dark");
    expect(localStorage.getItem("markas-theme")).toBe("dark");
    expect(onThemeChange).toHaveBeenCalledWith("dark");
    expect((onEvent.mock.calls[0]?.[0] as CustomEvent).detail).toBe("dark");
    expect(button).toHaveAccessibleName("Switch to light theme");

    fireEvent.click(button);
    expect(root).not.toHaveClass("dark");
    expect(onThemeChange).toHaveBeenLastCalledWith("light");
    document.removeEventListener("markas-theme-change", onEvent);
  });

  it("tracks data-state, jumps on mount, and plays keyframes on click", async () => {
    stubDarkSystem(false);
    render(<ThemeToggle animation="spring" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-state", "light");
    expect(durations().every((duration) => duration === 0)).toBe(true);

    animate.mockClear();
    await act(async () => {
      fireEvent.click(button);
      await Promise.resolve();
    });
    expect(button).toHaveAttribute("data-state", "dark");
    expect(durations()).toContain(650);
  });

  it("plays there and back on markas-theme-demo without changing the theme", () => {
    stubDarkSystem(false);
    render(<ThemeToggle animation="flip" />);
    animate.mockClear();
    act(() => {
      document.dispatchEvent(new Event("markas-theme-demo"));
    });
    expect(root).not.toHaveClass("dark");
    expect(animate.mock.calls[0]?.[1]).toMatchObject({
      iterations: 2,
      direction: "alternate",
    });
  });

  it("stays still with reduced motion", async () => {
    stubDarkSystem(true);
    root.classList.add("dark");
    render(<ThemeToggle />);
    animate.mockClear();
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
      await Promise.resolve();
    });
    expect(durations().every((duration) => duration === 0)).toBe(true);
  });

  it("follows a theme changed elsewhere on the page", async () => {
    render(<ThemeToggle />);
    await act(async () => {
      root.classList.add("dark");
      await Promise.resolve();
    });
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "dark");
  });

  it("does not change the page on mount when nothing is saved", () => {
    root.classList.add("dark");
    render(<ThemeToggle />);
    expect(root).toHaveClass("dark");
  });

  it("applies a saved choice from a custom storageKey on mount", () => {
    localStorage.setItem("site-theme", "dark");
    render(<ThemeToggle storageKey="site-theme" />);
    expect(root).toHaveClass("dark");
    fireEvent.click(screen.getByRole("button"));
    expect(localStorage.getItem("site-theme")).toBe("light");
  });

  it("follows prefers-color-scheme when nothing is saved", () => {
    stubDarkSystem(true);
    render(<ThemeToggle />);
    expect(root).toHaveClass("dark");
  });

  it("keeps a controlled theme until the parent changes it", () => {
    const onThemeChange = vi.fn();
    const { rerender } = render(
      <ThemeToggle theme="light" onThemeChange={onThemeChange} />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onThemeChange).toHaveBeenCalledWith("dark");
    expect(root).not.toHaveClass("dark");

    rerender(<ThemeToggle theme="dark" onThemeChange={onThemeChange} />);
    expect(root).toHaveClass("dark");
  });

  it("shows the label as text and accepts label overrides", async () => {
    render(
      <ThemeToggle
        showText
        size="lg"
        variant="solid"
        darkLabel="Mode gelap"
        lightLabel="Mode terang"
      />,
    );
    const button = screen.getByRole("button", { name: "Mode gelap" });
    expect(button).toHaveClass("h-12", "bg-primary");
    expect(screen.getByText("Mode gelap")).not.toHaveClass("sr-only");
    await act(async () => {
      fireEvent.click(button);
      await Promise.resolve();
    });
    expect(button).toHaveAccessibleName("Mode terang");
  });

  it("keeps the label screen reader only without showText", () => {
    render(<ThemeToggle />);
    expect(screen.getByText("Switch to dark theme")).toHaveClass("sr-only");
  });

  it("lets onClick cancel the switch", () => {
    render(<ThemeToggle onClick={(event) => event.preventDefault()} />);
    fireEvent.click(screen.getByRole("button"));
    expect(root).not.toHaveClass("dark");
  });
});
