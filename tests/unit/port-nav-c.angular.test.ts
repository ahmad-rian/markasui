import {
  Component,
  provideZonelessChangeDetection,
  type Type,
} from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from "@angular/platform-browser/testing";
import { fireEvent, screen } from "@testing-library/dom";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  Menubar,
  type MenubarMenu,
} from "../../components/menubar/menubar.component";
import {
  NavigationMenu,
  type NavigationMenuItem,
} from "../../components/navigation-menu/navigation-menu.component";

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
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  const native: Partial<HTMLElement> = HTMLElement.prototype;
  if (typeof native.showPopover === "function") return;
  HTMLElement.prototype.showPopover = function showPopover() {
    setPopover(this, true);
  };
  HTMLElement.prototype.hidePopover = function hidePopover() {
    setPopover(this, false);
  };
});

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

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
  { label: "Bad", href: "javascript:alert(1)" },
];

@Component({
  imports: [NavigationMenu],
  template: `
    <markas-navigation-menu [items]="items" class="mt-4" title="Site" />
  `,
})
class NavHost {
  readonly items = items;
}

@Component({
  imports: [NavigationMenu],
  template: `
    <markas-navigation-menu
      [items]="items"
      navLabel="Utama"
      id="site"
      [class]="glow"
    />
  `,
})
class LabelledHost {
  readonly items = items.map((item) => ({ ...item, active: false }));
  readonly glow = "min-w-0";
}

const trigger = (name: string) => screen.getByRole("button", { name });
const link = (name: string | RegExp) =>
  screen.getByRole("link", { name, hidden: true });
const panelOf = (name: string) =>
  document.getElementById(trigger(name).getAttribute("aria-controls")!)!;
const indicator = () =>
  document.querySelector<HTMLElement>("nav > span[aria-hidden=true]")!;

describe("Angular NavigationMenu", () => {
  it("renders a labelled nav with the user class on the nav, not the host", async () => {
    await mount(NavHost);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav.classList).toContain("mt-4");
    expect(nav.classList).toContain("overflow-x-auto");
    expect(nav.id).toMatch(/^markas-navigation-menu-/);
    const host = nav.closest("markas-navigation-menu")!;
    expect(host).not.toHaveAttribute("title");
    expect(host.classList).toContain("contents");

    const products = trigger("Products");
    expect(products).toHaveAttribute("type", "button");
    expect(products).toHaveAttribute("aria-expanded", "false");
    const panel = panelOf("Products");
    expect(panel.id).toBe(`${nav.id}-panel-0`);
    expect(panel).toHaveAttribute("popover", "auto");
    expect(products).toHaveAttribute("popovertarget", panel.id);
    expect(panel.classList).toContain("sm:grid-cols-[13rem_1fr]");

    expect(link("Pricing")).toHaveAttribute("aria-current", "page");
    expect(link("Bad")).toHaveAttribute("href", "#");
    expect(
      link(/Analytics/)
        .querySelector("path")
        ?.getAttribute("d"),
    ).toBe("M3 3v18h18");
    expect(link("Automation").querySelector("svg")).toBeNull();
    expect(indicator()).toHaveAttribute("data-state", "visible");
  });

  it("navLabel, id, and a bound class land on the nav; no active item hides the indicator", async () => {
    const fixture = await mount(LabelledHost);
    const nav = screen.getByRole("navigation", { name: "Utama" });
    expect(nav).toHaveAttribute("id", "site");
    expect(nav.classList).toContain("min-w-0");
    expect(nav.closest("markas-navigation-menu")).not.toHaveAttribute("id");
    expect(trigger("Products")).toHaveAttribute(
      "aria-controls",
      "site-panel-0",
    );
    expect(indicator()).toHaveAttribute("data-state", "hidden");
    panelOf("Developers").showPopover();
    await fixture.whenStable();
    expect(trigger("Developers")).toHaveAttribute("aria-expanded", "true");
    expect(indicator()).toHaveAttribute("data-state", "visible");
  });

  it("ArrowDown opens and focuses the first link, Escape restores focus, arrows rove", async () => {
    const fixture = await mount(NavHost);
    const products = trigger("Products");
    const press = async (key: string) => {
      fireEvent.keyDown(document.activeElement!, { key });
      await fixture.whenStable();
    };
    products.focus();
    await press("ArrowDown");
    expect(products).toHaveAttribute("aria-expanded", "true");
    expect(link(/Workflows 2.0/)).toHaveFocus();
    link("Automation").focus();
    await press("Escape");
    expect(products).toHaveAttribute("aria-expanded", "false");
    expect(products).toHaveFocus();

    await press("ArrowRight");
    expect(trigger("Developers")).toHaveFocus();
    await press("ArrowRight");
    expect(link("Pricing")).toHaveFocus();
    await press("ArrowLeft");
    expect(trigger("Developers")).toHaveFocus();
    await press("End");
    expect(link("Bad")).toHaveFocus();
    await press("ArrowRight");
    expect(products).toHaveFocus();
    await press("ArrowLeft");
    expect(link("Bad")).toHaveFocus();
    await press("Home");
    expect(products).toHaveFocus();
  });

  it("focus leaving an entry closes its panel and mouse hover opens after a delay", async () => {
    const fixture = await mount(NavHost);
    panelOf("Products").showPopover();
    await fixture.whenStable();
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "true");
    fireEvent.focusOut(trigger("Products"), {
      relatedTarget: trigger("Developers"),
    });
    await fixture.whenStable();
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");

    vi.useFakeTimers();
    const entry = trigger("Developers").parentElement!;
    fireEvent.pointerEnter(entry, { pointerType: "touch" });
    await vi.advanceTimersByTimeAsync(500);
    expect(panelOf("Developers").style.display).toBe("");
    fireEvent.pointerEnter(entry, { pointerType: "mouse" });
    await vi.advanceTimersByTimeAsync(50);
    expect(panelOf("Developers").style.display).toBe("");
    await vi.advanceTimersByTimeAsync(200);
    expect(panelOf("Developers").style.display).toBe("block");
    fireEvent.pointerLeave(entry, { pointerType: "mouse" });
    await vi.advanceTimersByTimeAsync(500);
    expect(panelOf("Developers").style.display).toBe("");
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

@Component({
  imports: [Menubar],
  template: `
    <markas-menubar
      [menus]="menus"
      label="Menu aplikasi"
      id="app"
      class="ml-2"
      (selected)="picked.push($event)"
    />
    <markas-menubar [menus]="menus" />
  `,
})
class MenubarHost {
  readonly menus = menus;
  readonly picked: string[] = [];
}

const menuitem = (name: string) =>
  screen.getAllByRole("menuitem", { name, hidden: true })[0]!;

describe("Angular Menubar", () => {
  it("moves id, label, and class to the bar and renders items", async () => {
    await mount(MenubarHost);
    const bar = screen.getByRole("menubar", { name: "Menu aplikasi" });
    expect(bar).toHaveAttribute("id", "app");
    expect(bar.classList).toContain("ml-2");
    expect(bar.closest("markas-menubar")).not.toHaveAttribute("id");
    const other = screen.getByRole("menubar", { name: "Menu" });
    expect(other.id).toMatch(/^markas-menubar-/);
    const file = menuitem("File");
    expect(file).toHaveAttribute("tabindex", "0");
    expect(menuitem("Edit")).toHaveAttribute("tabindex", "-1");
    expect(file).toHaveAttribute("aria-controls", "app-menu-0");
    expect(file).toHaveAttribute("popovertarget", "app-menu-0");
    expect(document.getElementById("app-menu-0")).toHaveAttribute(
      "aria-labelledby",
      "app-trigger-0",
    );
    expect(menuitem("Delete").classList).toContain("text-danger");
    expect(menuitem("Redo")).toBeDisabled();
    expect(menuitem("Docs")).toHaveAttribute("href", "#");
  });

  it("roves the bar, opens with arrows, switches menus, Escape returns, and emits selected", async () => {
    const fixture = await mount(MenubarHost);
    const press = async (key: string) => {
      fireEvent.keyDown(document.activeElement!, { key });
      await fixture.whenStable();
    };
    const file = menuitem("File");
    file.focus();
    await press("ArrowRight");
    expect(menuitem("Edit")).toHaveFocus();
    expect(menuitem("Edit")).toHaveAttribute("tabindex", "0");
    await press("End");
    expect(menuitem("Help")).toHaveFocus();
    await press("ArrowRight");
    expect(file).toHaveFocus();

    await press("ArrowUp");
    expect(file).toHaveAttribute("aria-expanded", "true");
    expect(file).toHaveAttribute("data-state", "open");
    expect(menuitem("Delete")).toHaveFocus();
    await press("Home");
    expect(menuitem("New file")).toHaveFocus();
    await press("ArrowLeft");
    expect(file).toHaveAttribute("aria-expanded", "false");
    expect(menuitem("Help")).toHaveAttribute("aria-expanded", "true");
    expect(menuitem("Docs")).toHaveFocus();
    await press("Escape");
    expect(menuitem("Help")).toHaveAttribute("aria-expanded", "false");
    expect(menuitem("Help")).toHaveFocus();

    file.focus();
    await press("ArrowDown");
    fireEvent.click(menuitem("Save"));
    await fixture.whenStable();
    expect(fixture.componentInstance.picked).toEqual(["Save"]);
    expect(file).toHaveAttribute("aria-expanded", "false");
    expect(file).toHaveFocus();
  });
});
