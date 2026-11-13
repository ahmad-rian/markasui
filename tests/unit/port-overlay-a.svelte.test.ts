import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import AlertDialog from "../../components/alert-dialog/AlertDialog.svelte";
import Drawer from "../../components/drawer/Drawer.svelte";
import Tooltip from "../../components/tooltip/Tooltip.svelte";
import AlertDialogHarness from "./fixtures/AlertDialogHarness.svelte";
import DrawerHarness from "./fixtures/DrawerHarness.svelte";
import TooltipHarness from "./fixtures/TooltipHarness.svelte";

// jsdom has no Popover API yet: a small polyfill that toggles and dispatches toggle like a browser.
const shownPopovers = new WeakSet<HTMLElement>();
function setPopover(element: HTMLElement, open: boolean) {
  if (shownPopovers.has(element) === open) return;
  if (open) shownPopovers.add(element);
  else shownPopovers.delete(element);
  const states = {
    newState: open ? "open" : "closed",
    oldState: open ? "closed" : "open",
  };
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

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

const rect = (top: number, left: number, width: number, height: number) =>
  ({
    top,
    left,
    width,
    height,
    bottom: top + height,
    right: left + width,
    x: left,
    y: top,
    toJSON: () => ({}),
  }) as DOMRect;

describe("Svelte AlertDialog", () => {
  it("opens from the trigger with focus on cancel and labels from props", async () => {
    render(AlertDialogHarness);
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("role", "alertdialog");
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(dialog.className.endsWith("max-w-sm")).toBe(true);

    await userEvent.click(
      screen.getByRole("button", { name: "Delete account" }),
    );
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("alertdialog", { name: "Delete account?" })).toBe(
      dialog,
    );
    expect(screen.getByRole("alertdialog")).toHaveAccessibleDescription(
      "This cannot be undone.",
    );
    const cancel = screen.getByRole("button", { name: "Batal" });
    expect(cancel).toHaveFocus();
    expect(screen.getByRole("button", { name: "Hapus" }).className).toContain(
      "bg-danger",
    );
  });

  it("calls onaction for the action value and oncancel for anything else", async () => {
    const onaction = vi.fn();
    const oncancel = vi.fn();
    render(AlertDialogHarness, { onaction, oncancel });
    const dialog = document.querySelector("dialog")!;

    dialog.showModal();
    dialog.close("action");
    await tick();
    expect(onaction).toHaveBeenCalledOnce();
    expect(dialog).toHaveAttribute("data-state", "closed");

    dialog.showModal();
    dialog.returnValue = "";
    dialog.close();
    await tick();
    expect(oncancel).toHaveBeenCalledOnce();
    expect(dialog.returnValue).toBe("cancel");
  });

  it("uses default labels, a generated id, and ignores backdrop clicks", async () => {
    render(AlertDialog, { title: "Publish?" });
    const dialog = document.querySelector("dialog")!;
    expect(dialog.id).not.toBe("");
    expect(dialog).toHaveAttribute("aria-labelledby", `${dialog.id}-title`);
    expect(dialog).toHaveAttribute(
      "aria-describedby",
      `${dialog.id}-description`,
    );
    expect(
      screen.getByRole("button", { name: "Cancel", hidden: true }),
    ).toHaveAttribute("value", "cancel");
    expect(
      screen.getByRole("button", { name: "Continue", hidden: true }).className,
    ).toContain("bg-primary");
    dialog.showModal();
    await userEvent.click(dialog);
    expect(dialog).toHaveAttribute("open");
  });
});

describe("Svelte Drawer", () => {
  it("opens from the trigger on the right side and closes on the backdrop", async () => {
    const onclose = vi.fn();
    render(DrawerHarness, { onclose });
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveClass("right-0", "border-l");
    expect(dialog.className.endsWith("max-w-md")).toBe(true);

    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("dialog", { name: "Filter" })).toBe(dialog);
    expect(screen.getByRole("button", { name: "Tutup" })).toHaveAttribute(
      "type",
      "submit",
    );

    await userEvent.click(dialog);
    await tick();
    expect(dialog).not.toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(onclose).toHaveBeenCalledOnce();
  });

  it("side left, explicit id, default close label, no footer when empty", () => {
    render(Drawer, { title: "Menu", side: "left", id: "menu" });
    const dialog = document.getElementById("menu")!;
    expect(dialog).toHaveClass("left-0", "border-r");
    expect(dialog).toHaveAttribute("aria-labelledby", "menu-title");
    expect(
      screen.getByRole("button", { name: "Close", hidden: true }),
    ).toBeInTheDocument();
    expect(dialog.querySelectorAll("form")).toHaveLength(1);
  });
});

describe("Svelte Tooltip", () => {
  const tooltip = () => screen.getByRole("tooltip", { hidden: true });
  const button = () => screen.getByRole("button", { name: "Copy" });

  it("describes the trigger, keeps the user class on the root, id on the tooltip", async () => {
    render(TooltipHarness);
    await tick();
    expect(tooltip()).toHaveAttribute("popover", "manual");
    expect(tooltip()).toHaveTextContent("Copy link");
    expect(button().getAttribute("aria-describedby")).toBe(
      `other ${tooltip().id}`,
    );
    const root = screen.getByTestId("root");
    expect(root.className.endsWith("ms-2")).toBe(true);
    expect(root).not.toHaveAttribute("id");
  });

  it("shows on focus, hides on blur and Escape", async () => {
    render(TooltipHarness);
    await fireEvent.focusIn(button());
    expect(tooltip()).toHaveAttribute("data-state", "open");
    await fireEvent.focusOut(button());
    expect(tooltip()).toHaveAttribute("data-state", "closed");

    await fireEvent.focusIn(button());
    await fireEvent.keyDown(document, { key: "Escape" });
    expect(tooltip()).toHaveAttribute("data-state", "closed");
  });

  it("waits 300ms on hover and hides on mouseleave", async () => {
    vi.useFakeTimers();
    render(TooltipHarness);
    const root = screen.getByTestId("root");
    await fireEvent.mouseEnter(root);
    vi.advanceTimersByTime(299);
    await tick();
    expect(tooltip()).toHaveAttribute("data-state", "closed");
    vi.advanceTimersByTime(1);
    await tick();
    expect(tooltip()).toHaveAttribute("data-state", "open");
    await fireEvent.mouseLeave(root);
    expect(tooltip()).toHaveAttribute("data-state", "closed");
  });

  it("places above by default and flips below when there is no room", async () => {
    render(TooltipHarness);
    const anchor = vi
      .spyOn(screen.getByTestId("root"), "getBoundingClientRect")
      .mockReturnValue(rect(100, 200, 100, 40));
    vi.spyOn(tooltip(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 60, 24),
    );
    await fireEvent.focusIn(button());
    expect(tooltip().style.top).toBe(`${100 - 6 - 24}px`);
    expect(tooltip().style.left).toBe(`${200 + 50 - 30}px`);
    await fireEvent.focusOut(button());

    anchor.mockReturnValue(rect(10, 200, 100, 40));
    await fireEvent.focusIn(button());
    expect(tooltip().style.top).toBe(`${10 + 40 + 6}px`);
  });

  it("side bottom places the tooltip below and an explicit id is kept", async () => {
    render(Tooltip, { content: "Hint", side: "bottom", id: "hint" });
    const tip = document.getElementById("hint")!;
    expect(tip).toHaveAttribute("role", "tooltip");
    vi.spyOn(tip.parentElement!, "getBoundingClientRect").mockReturnValue(
      rect(100, 200, 100, 40),
    );
    vi.spyOn(tip, "getBoundingClientRect").mockReturnValue(rect(0, 0, 60, 24));
    tip.showPopover();
    await tick();
    expect(tip.style.top).toBe(`${100 + 40 + 6}px`);
  });
});
