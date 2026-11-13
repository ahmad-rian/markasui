import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet, tick } from "svelte";
import { beforeAll, describe, expect, it, vi } from "vitest";
import ContextMenu from "../../components/context-menu/ContextMenu.svelte";
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.svelte";

// jsdom has no Popover API yet. Small polyfill: show the element and fire beforetoggle and toggle like a browser.
const shownPopovers = new WeakSet<HTMLElement>();
function setPopover(element: HTMLElement, open: boolean) {
  if (shownPopovers.has(element) === open) return;
  if (open) shownPopovers.add(element);
  else shownPopovers.delete(element);
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

const snippet = (html: string) =>
  createRawSnippet(() => ({ render: () => html }));

const menuItems = [
  { label: "Edit", value: "edit" },
  { label: "Docs", href: "javascript:alert(1)" },
  { label: "Archive", value: "archive", disabled: true },
  { separator: true as const },
  { label: "Delete", value: "delete", danger: true },
];

describe("Svelte DropdownMenu", () => {
  it("links trigger and menu with a generated id and puts the user class on the root", () => {
    const { container } = render(DropdownMenu, {
      items: menuItems,
      class: "ml-2",
      "data-testid": "root",
    });
    const trigger = screen.getByRole("button", { name: "Options" });
    const menu = container.querySelector<HTMLElement>("[role=menu]")!;
    expect(menu.id).not.toBe("");
    expect(trigger).toHaveAttribute("id", `${menu.id}-trigger`);
    expect(trigger).toHaveAttribute("popovertarget", menu.id);
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveAttribute("popover", "auto");
    expect(menu).toHaveAttribute("aria-labelledby", trigger.id);
    const root = screen.getByTestId("root");
    expect(root.className.endsWith("ml-2")).toBe(true);
    expect(root).not.toHaveAttribute("id");
    expect(screen.getByText("Docs", { selector: "a" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(screen.getByText("Archive")).toBeDisabled();
    expect(screen.getByText("Delete").className).toContain("text-danger");
    expect(menu.querySelectorAll("[role=separator]")).toHaveLength(1);
  });

  it("opens with arrows, moves focus, selects, and closes back to the trigger", async () => {
    const onselect = vi.fn();
    render(DropdownMenu, {
      items: menuItems,
      id: "actions",
      trigger: snippet("<span>Project</span>"),
      onselect,
    });
    const trigger = screen.getByRole("button", { name: "Project" });
    const menu = document.getElementById("actions")!;

    await fireEvent.keyDown(trigger, { key: "ArrowUp" });
    await tick();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveAttribute("data-state", "open");
    expect(screen.getByText("Delete")).toHaveFocus();

    await fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(screen.getByText("Edit")).toHaveFocus();
    await fireEvent.keyDown(menu, { key: "End" });
    expect(screen.getByText("Delete")).toHaveFocus();

    await userEvent.click(screen.getByText("Delete"));
    await tick();
    expect(onselect).toHaveBeenCalledWith("delete");
    expect(menu).toHaveAttribute("data-state", "closed");
    expect(trigger).toHaveFocus();
  });
});

describe("Svelte ContextMenu", () => {
  it("describes the area with the hint and forwards attributes and class to it", () => {
    render(ContextMenu, {
      items: menuItems,
      id: "files",
      class: "mt-1",
      "aria-label": "Report.pdf",
      menuLabel: "Menu konteks",
      hintLabel: "Tekan Shift+F10",
      children: snippet("<p>Right-click here</p>"),
    });
    const area = screen.getByRole("group", { name: "Report.pdf" });
    expect(area).toHaveAttribute("tabindex", "0");
    expect(area).toHaveAttribute("aria-describedby", "files-hint");
    expect(area.className.endsWith("mt-1")).toBe(true);
    expect(area).not.toHaveAttribute("id");
    expect(document.getElementById("files-hint")).toHaveTextContent(
      "Tekan Shift+F10",
    );
    const menu = document.getElementById("files")!;
    expect(menu).toHaveAttribute("role", "menu");
    expect(menu).toHaveAttribute("aria-label", "Menu konteks");
  });

  it("opens with Shift+F10, focuses the first item, and selects an item", async () => {
    const onselect = vi.fn();
    render(ContextMenu, {
      items: menuItems,
      onselect,
      children: snippet("<p>Right-click here</p>"),
    });
    const area = screen.getByRole("group");
    const menu = screen.getByRole("menu", { hidden: true });
    expect(screen.getByText("Press Shift+F10 to open the context menu")).toBe(
      document.getElementById(area.getAttribute("aria-describedby")!),
    );
    expect(menu).toHaveAttribute("aria-label", "Context menu");

    area.focus();
    await fireEvent.keyDown(area, { key: "F10", shiftKey: true });
    await tick();
    expect(menu).toHaveAttribute("data-state", "open");
    expect(area).toHaveAttribute("data-state", "open");
    expect(screen.getByText("Edit")).toHaveFocus();

    await fireEvent.keyDown(menu, { key: "Escape" });
    await tick();
    expect(menu).toHaveAttribute("data-state", "closed");
    expect(area).toHaveFocus();

    await fireEvent.contextMenu(area, { clientX: 10, clientY: 10 });
    await userEvent.click(screen.getByText("Edit"));
    expect(onselect).toHaveBeenCalledWith("edit");
  });
});
