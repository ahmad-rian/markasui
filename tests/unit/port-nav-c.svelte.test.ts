import { fireEvent, render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Menubar, {
  type MenubarMenu,
} from "../../components/menubar/Menubar.svelte";
import NavigationMenu, {
  type NavigationMenuItem,
} from "../../components/navigation-menu/NavigationMenu.svelte";

// jsdom belum punya Popover API. Polyfill kecil: tampilkan elemen dan kirim event beforetoggle dan toggle seperti browser.
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

afterEach(() => {
  vi.useRealTimers();
});

const items: NavigationMenuItem[] = [
  {
    label: "Products",
    featured: {
      title: "Workflows 2.0",
      href: "/workflows",
      description: "Visual editor",
    },
    links: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "See where visitors come from",
        icon: "M3 3v18h18",
      },
      { label: "Automation", href: "/automation" },
    ],
  },
  {
    label: "Developers",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  { label: "Pricing", href: "/pricing", active: true },
];

const trigger = (name: string) => screen.getByRole("button", { name });
const link = (name: string | RegExp) =>
  screen.getByRole("link", { name, hidden: true });
const panelOf = (name: string) =>
  document.getElementById(trigger(name).getAttribute("aria-controls")!)!;
const indicator = () =>
  document.querySelector<HTMLElement>("nav > span[aria-hidden=true]")!;
const press = (key: string) =>
  fireEvent.keyDown(document.activeElement!, { key });

describe("Svelte NavigationMenu", () => {
  it("renders a labelled nav, disclosure triggers, plain links, and the user class last", async () => {
    render(NavigationMenu, { items, class: "mt-4", "data-testid": "nav" });
    await tick();
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toHaveAttribute("data-testid", "nav");
    expect(nav.className.endsWith("mt-4")).toBe(true);
    expect(nav.id).not.toBe("");

    const products = trigger("Products");
    expect(products).toHaveAttribute("type", "button");
    expect(products).toHaveAttribute("aria-expanded", "false");
    const panel = panelOf("Products");
    expect(panel.id).toBe(`${nav.id}-panel-0`);
    expect(panel).toHaveAttribute("popover", "auto");
    expect(products).toHaveAttribute("popovertarget", panel.id);
    expect(panel.className).toContain("sm:grid-cols-[13rem_1fr]");
    expect(panelOf("Developers").className).not.toContain("sm:grid-cols");

    expect(link("Pricing")).toHaveAttribute("aria-current", "page");
    expect(link(/Workflows 2.0/)).toHaveAttribute("href", "/workflows");
    expect(link(/Analytics/)).toHaveTextContent(
      /^Analytics\s*See where visitors come from$/,
    );
    expect(
      link(/Analytics/)
        .querySelector("path")
        ?.getAttribute("d"),
    ).toBe("M3 3v18h18");
    expect(link("Automation").querySelector("svg")).toBeNull();
    expect(indicator()).toHaveAttribute("data-state", "visible");
  });

  it("navLabel overrides the default label and a user id is kept", () => {
    render(NavigationMenu, { items, navLabel: "Utama", id: "site" });
    const nav = screen.getByRole("navigation", { name: "Utama" });
    expect(nav).toHaveAttribute("id", "site");
    expect(trigger("Products")).toHaveAttribute(
      "aria-controls",
      "site-panel-0",
    );
  });

  it("hides the indicator without an active item and shows it while a panel is open", async () => {
    render(NavigationMenu, {
      items: items.map((item) => ({ ...item, active: false })),
    });
    await tick();
    expect(indicator()).toHaveAttribute("data-state", "hidden");
    panelOf("Developers").showPopover();
    await tick();
    expect(trigger("Developers")).toHaveAttribute("aria-expanded", "true");
    expect(indicator()).toHaveAttribute("data-state", "visible");
  });

  it("ArrowDown opens the panel and focuses the first link; Escape closes it and restores focus", async () => {
    render(NavigationMenu, { items });
    const products = trigger("Products");
    products.focus();
    await press("ArrowDown");
    expect(products).toHaveAttribute("aria-expanded", "true");
    expect(link(/Workflows 2.0/)).toHaveFocus();

    link("Automation").focus();
    await press("Escape");
    expect(products).toHaveAttribute("aria-expanded", "false");
    expect(products).toHaveFocus();
  });

  it("arrows, Home, and End move between top-level items", async () => {
    render(NavigationMenu, { items });
    trigger("Products").focus();
    await press("ArrowRight");
    expect(trigger("Developers")).toHaveFocus();
    await press("ArrowRight");
    expect(link("Pricing")).toHaveFocus();
    await press("ArrowRight");
    expect(trigger("Products")).toHaveFocus();
    await press("ArrowLeft");
    expect(link("Pricing")).toHaveFocus();
    await press("Home");
    expect(trigger("Products")).toHaveFocus();
    await press("End");
    expect(link("Pricing")).toHaveFocus();
  });

  it("closes a panel when focus leaves its entry or a panel link is clicked", async () => {
    render(NavigationMenu, { items });
    panelOf("Products").showPopover();
    await tick();
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "true");
    await fireEvent.focusOut(trigger("Products"), {
      relatedTarget: trigger("Developers"),
    });
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");

    panelOf("Developers").showPopover();
    await tick();
    link("Changelog").addEventListener("click", (e) => e.preventDefault());
    await fireEvent.click(link("Changelog"));
    expect(trigger("Developers")).toHaveAttribute("aria-expanded", "false");
  });

  it("mouse hover opens after a delay, ignores touch, and closes on leave", async () => {
    vi.useFakeTimers();
    render(NavigationMenu, { items });
    const entry = trigger("Products").parentElement!;

    await fireEvent.pointerEnter(entry, { pointerType: "touch" });
    await vi.advanceTimersByTimeAsync(500);
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");

    await fireEvent.pointerEnter(entry, { pointerType: "mouse" });
    await vi.advanceTimersByTimeAsync(50);
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");
    await vi.advanceTimersByTimeAsync(200);
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "true");

    await fireEvent.pointerLeave(entry, { pointerType: "mouse" });
    await vi.advanceTimersByTimeAsync(500);
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");
  });

  it("replaces unsafe hrefs with #", () => {
    render(NavigationMenu, {
      items: [
        { label: "Bad", href: "javascript:alert(1)" },
        { label: "Menu", links: [{ label: "Evil", href: " javascript:x" }] },
      ],
    });
    expect(link("Bad")).toHaveAttribute("href", "#");
    expect(link("Evil")).toHaveAttribute("href", "#");
  });
});

const menus: MenubarMenu[] = [
  {
    label: "File",
    items: [
      { label: "New file", value: "new" },
      { label: "Save" },
      { separator: true },
      { label: "Delete", value: "delete", danger: true },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", value: "undo" },
      { label: "Redo", value: "redo", disabled: true },
    ],
  },
  { label: "Help", items: [{ label: "Docs", href: "javascript:alert(1)" }] },
];

const menuitem = (name: string) =>
  screen.getByRole("menuitem", { name, hidden: true });

describe("Svelte Menubar", () => {
  it("renders a labelled menubar with roving tabindex, ids, and the user class", () => {
    render(Menubar, { menus, class: "ml-2", id: "app" });
    const bar = screen.getByRole("menubar", { name: "Menu" });
    expect(bar).toHaveAttribute("id", "app");
    expect(bar.className.endsWith("ml-2")).toBe(true);
    const file = menuitem("File");
    expect(file).toHaveAttribute("tabindex", "0");
    expect(menuitem("Edit")).toHaveAttribute("tabindex", "-1");
    expect(file).toHaveAttribute("aria-controls", "app-menu-0");
    expect(file).toHaveAttribute("aria-haspopup", "menu");
    expect(document.getElementById("app-menu-0")).toHaveAttribute(
      "aria-labelledby",
      "app-trigger-0",
    );
    expect(menuitem("Delete").className).toContain("text-danger");
    expect(menuitem("Redo")).toBeDisabled();
    expect(menuitem("Docs")).toHaveAttribute("href", "#");
    expect(screen.getAllByRole("separator", { hidden: true })).toHaveLength(1);
  });

  it("translates the label and generates an id", () => {
    render(Menubar, { menus, label: "Menu aplikasi" });
    const bar = screen.getByRole("menubar", { name: "Menu aplikasi" });
    expect(bar.id).not.toBe("");
    expect(menuitem("File")).toHaveAttribute("id", `${bar.id}-trigger-0`);
  });

  it("moves between bar items with arrows, Home, and End", async () => {
    render(Menubar, { menus });
    menuitem("File").focus();
    await press("ArrowRight");
    expect(menuitem("Edit")).toHaveFocus();
    expect(menuitem("Edit")).toHaveAttribute("tabindex", "0");
    expect(menuitem("File")).toHaveAttribute("tabindex", "-1");
    await press("End");
    expect(menuitem("Help")).toHaveFocus();
    await press("ArrowRight");
    expect(menuitem("File")).toHaveFocus();
    await press("ArrowLeft");
    expect(menuitem("Help")).toHaveFocus();
    await press("Home");
    expect(menuitem("File")).toHaveFocus();
  });

  it("opens with ArrowDown, moves through items, switches menus, and Escape returns focus", async () => {
    render(Menubar, { menus });
    const file = menuitem("File");
    file.focus();
    await press("ArrowDown");
    await tick();
    expect(file).toHaveAttribute("aria-expanded", "true");
    expect(file).toHaveAttribute("data-state", "open");
    expect(menuitem("New file")).toHaveFocus();
    await press("ArrowDown");
    expect(menuitem("Save")).toHaveFocus();
    await press("End");
    expect(menuitem("Delete")).toHaveFocus();
    await press("ArrowRight");
    await tick();
    expect(file).toHaveAttribute("aria-expanded", "false");
    expect(menuitem("Edit")).toHaveAttribute("aria-expanded", "true");
    expect(menuitem("Undo")).toHaveFocus();
    await press("ArrowDown");
    expect(menuitem("Undo")).toHaveFocus();
    await press("Escape");
    await tick();
    expect(menuitem("Edit")).toHaveAttribute("aria-expanded", "false");
    expect(menuitem("Edit")).toHaveFocus();
    await press("ArrowUp");
    expect(menuitem("Undo")).toHaveFocus();
  });

  it("selecting an item calls onselect with the value or label and closes", async () => {
    const onselect = vi.fn();
    render(Menubar, { menus, onselect });
    document
      .getElementById(menuitem("File").getAttribute("aria-controls")!)!
      .showPopover();
    await tick();
    await fireEvent.click(menuitem("Save"));
    expect(onselect).toHaveBeenCalledWith("Save");
    await tick();
    expect(menuitem("File")).toHaveAttribute("aria-expanded", "false");
    expect(menuitem("File")).toHaveFocus();
  });
});
