import { render, screen } from "@testing-library/svelte";
import { createRawSnippet, tick } from "svelte";
import { beforeAll, describe, expect, it, vi } from "vitest";
import HoverCard from "../../components/hover-card/HoverCard.svelte";
import Popover from "../../components/popover/Popover.svelte";
import HoverCardHarness from "./fixtures/HoverCardHarness.svelte";
import PopoverHarness from "./fixtures/PopoverHarness.svelte";

// jsdom has no Popover API yet. Small polyfill: track state and fire beforetoggle and toggle like a browser.
const shownPopovers = new WeakSet<HTMLElement>();
function setPopover(element: HTMLElement, open: boolean) {
  if (shownPopovers.has(element) === open) return;
  if (open) shownPopovers.add(element);
  else shownPopovers.delete(element);
  // jsdom hides [popover] with display: none, which also blocks focus().
  element.style.display = open ? "block" : "";
  const states = {
    newState: open ? "open" : "closed",
    oldState: open ? "closed" : "open",
  };
  element.dispatchEvent(Object.assign(new Event("beforetoggle"), states));
  element.dispatchEvent(Object.assign(new Event("toggle"), states));
}

beforeAll(() => {
  const native: Partial<HTMLElement> = HTMLElement.prototype;
  if (typeof native.showPopover === "function") return;
  HTMLElement.prototype.showPopover = function showPopover() {
    setPopover(this, true);
  };
  HTMLElement.prototype.hidePopover = function hidePopover() {
    setPopover(this, false);
  };
});

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe("Svelte Popover", () => {
  it("links the trigger to a labelled dialog panel with a generated id", () => {
    render(Popover, { children: text("Body") });
    const trigger = screen.getByRole("button", { name: "Open" });
    const panel = document.querySelector<HTMLElement>("[popover=auto]")!;
    expect(panel.id).not.toBe("");
    expect(trigger.id).toBe(`${panel.id}-trigger`);
    expect(trigger).toHaveAttribute("popovertarget", panel.id);
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-controls", panel.id);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("role", "dialog");
    expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
    expect(panel).toHaveAttribute("data-state", "closed");
  });

  it("uses the trigger snippet, explicit id, and puts the user class on the root", () => {
    render(PopoverHarness);
    const trigger = screen.getByRole("button", {
      name: "Notification settings",
    });
    expect(trigger.id).toBe("share-trigger");
    expect(screen.queryByText("Open")).toBeNull();
    const root = screen.getByTestId("root");
    expect(root.className).toBe("inline-block ml-2");
    expect(root).toContainElement(document.getElementById("share"));
  });

  it("opens, focuses the first focusable element, and Escape returns focus", async () => {
    render(PopoverHarness);
    const trigger = screen.getByRole("button", {
      name: "Notification settings",
    });
    const panel = document.getElementById("share")!;
    panel.showPopover();
    await tick();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(panel).toHaveAttribute("data-state", "open");
    expect(
      screen.getByRole("button", { name: "Copy link", hidden: true }),
    ).toHaveFocus();

    panel.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    await tick();
    expect(panel).toHaveAttribute("data-state", "closed");
    expect(trigger).toHaveFocus();
  });
});

describe("Svelte HoverCard", () => {
  it("describes the trigger with the card, keeping existing descriptions", () => {
    render(HoverCardHarness);
    const link = screen.getByRole("link", { name: "@markasui" });
    const card = document.querySelector<HTMLElement>("[popover=manual]")!;
    expect(card.id).not.toBe("");
    expect(link).toHaveAttribute("aria-describedby", `note ${card.id}`);
    expect(card).toHaveTextContent("MarkasUI preview");
    expect(card).toHaveAttribute("data-state", "closed");
    expect(screen.getByTestId("root").className).toBe("inline-block ml-2");
  });

  it("shows on focus, hides on Escape, and waits before showing on hover", async () => {
    vi.useFakeTimers();
    try {
      render(HoverCard, {
        id: "card",
        children: createRawSnippet(() => ({
          render: () => `<a href="/profile">Profile</a>`,
        })),
        content: text("Preview"),
      });
      const link = screen.getByRole("link", { name: "Profile" });
      const card = document.getElementById("card")!;
      expect(link).toHaveAttribute("aria-describedby", "card");

      link.focus();
      await tick();
      expect(card).toHaveAttribute("data-state", "open");
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
      await tick();
      expect(card).toHaveAttribute("data-state", "closed");

      const root = link.parentElement!;
      root.dispatchEvent(new MouseEvent("mouseenter"));
      vi.advanceTimersByTime(399);
      await tick();
      expect(card).toHaveAttribute("data-state", "closed");
      vi.advanceTimersByTime(1);
      await tick();
      expect(card).toHaveAttribute("data-state", "open");
      root.dispatchEvent(new MouseEvent("mouseleave"));
      vi.advanceTimersByTime(100);
      await tick();
      expect(card).toHaveAttribute("data-state", "closed");
    } finally {
      vi.useRealTimers();
    }
  });
});
