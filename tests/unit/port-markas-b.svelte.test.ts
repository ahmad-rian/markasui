import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet, tick } from "svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import ImageTrail from "../../components/image-trail/ImageTrail.svelte";
import Magnet from "../../components/magnet/Magnet.svelte";
import PinnedList from "../../components/pinned-list/PinnedList.svelte";
import PixelTrail from "../../components/pixel-trail/PixelTrail.svelte";
import Screensaver from "../../components/screensaver/Screensaver.svelte";
import StackingCards from "../../components/stacking-cards/StackingCards.svelte";
import ThemeToggle from "../../components/theme-toggle/ThemeToggle.svelte";
import TiltCard from "../../components/tilt-card/TiltCard.svelte";
import CompareHarness from "./fixtures/PortMarkasBCompareHarness.svelte";
import PromptHarness from "./fixtures/PortMarkasBPromptHarness.svelte";

const html = (value: string) =>
  createRawSnippet(() => ({ render: () => value }));

const items = [
  { value: "a", label: "Alpha", description: "First" },
  { value: "b", label: "Beta", meta: "2h" },
];

beforeAll(() => {
  // jsdom has no Web Animations API.
  Element.prototype.animate ??= vi.fn() as unknown as Element["animate"];
});

afterEach(() => {
  document.documentElement.classList.remove("dark");
  localStorage.clear();
});

describe("Svelte ImageCompare", () => {
  it("is a labelled group with a slider that follows the keys and binds the position", async () => {
    render(CompareHarness);
    const group = screen.getByRole("group", { name: "Kitchen" });
    expect(group.className.endsWith("mt-2")).toBe(true);
    expect(group.getAttribute("style")).toContain("--position: 40%");
    const slider = screen.getByRole("slider", { name: "Posisi" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    slider.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(slider).toHaveAttribute("aria-valuenow", "45");
    await userEvent.keyboard("{End}");
    expect(slider).toHaveAttribute("aria-valuetext", "100%");
    expect(screen.getByText("100", { selector: "output" })).toBeTruthy();
    expect(screen.getByText("Old")).toBeTruthy();
    expect(screen.getByText("Before")).toBeTruthy();
  });

  it("vertical flips Up and Down", async () => {
    render(CompareHarness, { orientation: "vertical" });
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-orientation", "vertical");
    slider.focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(slider).toHaveAttribute("aria-valuenow", "35");
  });
});

describe("Svelte PinnedList", () => {
  it("pins a row, announces it, and calls onPinnedChange", async () => {
    const onPinnedChange = vi.fn();
    render(PinnedList, {
      items,
      defaultPinned: ["a"],
      onPinnedChange,
      pinLabel: "Sematkan {label}",
      class: "mt-2",
    });
    expect(screen.getByRole("list", { name: "Pinned" }).children).toHaveLength(
      1,
    );
    const beta = screen.getByRole("button", { name: "Sematkan Beta" });
    expect(beta).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(beta);
    await tick();
    // The row moves to the Pinned list, so it is a new element there.
    const pinned = screen.getByRole("button", { name: "Sematkan Beta" });
    expect(pinned).toHaveAttribute("aria-pressed", "true");
    expect(pinned.closest("ul")).toHaveAttribute("aria-label", "Pinned");
    expect(onPinnedChange).toHaveBeenLastCalledWith(["a", "b"]);
    expect(screen.getByRole("status")).toHaveTextContent("Beta pinned");
    expect(pinned).toHaveFocus();
  });
});

describe("Svelte PromptInput", () => {
  it("sends with Enter, clears, then the button stops loading", async () => {
    const onSend = vi.fn();
    render(PromptHarness, { onSend });
    const form = document.querySelector("form")!;
    expect(form.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("5/20")).toBeTruthy();
    const field = screen.getByRole("textbox", { name: "Message" });
    await userEvent.click(field);
    await userEvent.keyboard("{Enter}");
    expect(onSend).toHaveBeenCalledWith({ text: "Hello", files: [] });
    expect(field).toHaveValue("");
    const stop = screen.getByRole("button", { name: "Stop" });
    expect(stop).toHaveAttribute("data-state", "stop");
    await userEvent.click(stop);
    expect(screen.getByRole("button", { name: "Kirim" })).toBeDisabled();
    expect(onSend).toHaveBeenCalledOnce();
  });
});

describe("Svelte ThemeToggle", () => {
  it("toggles the html dark class, label, storage, and calls onThemeChange", async () => {
    const onThemeChange = vi.fn();
    render(ThemeToggle, { onThemeChange, class: "ml-1" });
    const button = screen.getByRole("button", { name: "Switch to dark theme" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.className.endsWith("ml-1")).toBe(true);
    await userEvent.click(button);
    await tick();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("markas-theme")).toBe("dark");
    expect(onThemeChange).toHaveBeenCalledWith("dark");
    await vi.waitFor(() =>
      expect(button).toHaveAccessibleName("Switch to light theme"),
    );
  });
});

describe("Svelte motion wrappers", () => {
  it("Magnet and TiltCard put the user class on the wrapper; glare can be turned off", () => {
    render(Magnet, { class: "mx-auto", children: html("<b>Go</b>") });
    expect(screen.getByText("Go").parentElement!.className).toMatch(
      /^w-fit .* mx-auto$/,
    );
    const { container } = render(TiltCard, {
      glare: false,
      class: "p-6",
      children: html("<p>Card</p>"),
    });
    const card = container.querySelector(".group\\/tilt")!;
    expect(card.className.endsWith("p-6")).toBe(true);
    expect(card.querySelector("[aria-hidden=true]")).toBeNull();
  });

  it("StackingCards, PixelTrail, Screensaver, and ImageTrail render their structure", () => {
    const stack = render(StackingCards, {
      top: 24,
      offset: 8,
      variant: "fan",
      children: html("<article>One</article>"),
    });
    const root = stack.container.querySelector<HTMLElement>(".grid")!;
    expect(root.getAttribute("style")).toContain("--stack-top: 24px");
    expect(root.className).toContain("rotate:calc");
    expect(screen.getByText("One").style.getPropertyValue("--stack-i")).toBe(
      "0",
    );

    const pixels = render(PixelTrail, { color: "success", showGrid: true });
    const canvas = pixels.container.querySelector("canvas")!;
    expect(canvas).toHaveAttribute("aria-hidden", "true");
    expect(canvas.className).toContain("text-success");
    expect(canvas.className).toContain("bg-size-");

    render(Screensaver, {
      tones: ["ink", "danger"],
      children: html("<span>Bounce</span>"),
    });
    expect(screen.getByText("Bounce")).toHaveAttribute("data-tone", "ink");

    const trail = render(ImageTrail);
    expect(
      trail.container.querySelector("[hidden] .rounded-full"),
    ).not.toBeNull();
  });
});
