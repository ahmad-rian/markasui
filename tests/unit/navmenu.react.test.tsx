import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  NavigationMenu,
  type NavigationMenuItem,
} from "../../components/navigation-menu/NavigationMenu";

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
  vi.restoreAllMocks();
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
const indicator = (container: Element) =>
  container.querySelector<HTMLElement>("nav > span[aria-hidden=true]")!;

describe("React NavigationMenu", () => {
  it("merender nav berlabel, pemicu disclosure, link biasa, dan class user di akhir", () => {
    const { container } = render(
      <NavigationMenu items={items} className="mt-4" data-testid="nav" />,
    );
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toHaveAttribute("data-testid", "nav");
    expect(nav.className.endsWith("mt-4")).toBe(true);

    const products = trigger("Products");
    expect(products).toHaveAttribute("type", "button");
    expect(products).toHaveAttribute("aria-expanded", "false");
    const panel = panelOf("Products");
    expect(panel).toHaveAttribute("popover", "auto");
    expect(products).toHaveAttribute("popovertarget", panel.id);

    expect(link("Pricing")).toHaveAttribute("aria-current", "page");
    expect(link("Pricing")).toHaveAttribute("href", "/pricing");
    expect(link(/Workflows 2.0/)).toHaveAttribute("href", "/workflows");
    expect(link(/Analytics/)).toHaveTextContent(
      "AnalyticsSee where visitors come from",
    );
    expect(
      link(/Analytics/)
        .querySelector("path")
        ?.getAttribute("d"),
    ).toBe("M3 3v18h18");
    expect(link("Automation").querySelector("svg")).toBeNull();
    expect(indicator(container)).toHaveAttribute("data-state", "visible");
  });

  it("navLabel menimpa label bawaan dan id dari user dipakai", () => {
    render(<NavigationMenu items={items} navLabel="Utama" id="site" />);
    const nav = screen.getByRole("navigation", { name: "Utama" });
    expect(nav).toHaveAttribute("id", "site");
    expect(trigger("Products")).toHaveAttribute(
      "aria-controls",
      "site-panel-0",
    );
  });

  it("indikator tersembunyi tanpa item aktif dan muncul saat panel terbuka", () => {
    const plain = items.map((item) => ({ ...item, active: false }));
    const { container } = render(<NavigationMenu items={plain} />);
    expect(indicator(container)).toHaveAttribute("data-state", "hidden");
    act(() => panelOf("Developers").showPopover());
    expect(indicator(container)).toHaveAttribute("data-state", "visible");
  });

  it("ArrowDown membuka panel dan memfokuskan link pertama, Escape di panel menutup dan mengembalikan fokus", () => {
    render(<NavigationMenu items={items} />);
    const products = trigger("Products");
    products.focus();
    fireEvent.keyDown(products, { key: "ArrowDown" });
    expect(products).toHaveAttribute("aria-expanded", "true");
    expect(link(/Workflows 2.0/)).toHaveFocus();

    link("Automation").focus();
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(products).toHaveAttribute("aria-expanded", "false");
    expect(products).toHaveFocus();
  });

  it("panah kiri dan kanan, Home, dan End berpindah antar item tingkat atas", () => {
    render(<NavigationMenu items={items} />);
    trigger("Products").focus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(trigger("Developers")).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(link("Pricing")).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(trigger("Products")).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
    expect(link("Pricing")).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: "Home" });
    expect(trigger("Products")).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: "End" });
    expect(link("Pricing")).toHaveFocus();
  });

  it("fokus yang keluar dari entri menutup panelnya", () => {
    render(<NavigationMenu items={items} />);
    act(() => panelOf("Products").showPopover());
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "true");
    fireEvent.blur(trigger("Products"), {
      relatedTarget: trigger("Developers"),
    });
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");
  });

  it("hover mouse membuka setelah jeda, pointer sentuh diabaikan, keluar menutup", () => {
    vi.useFakeTimers();
    render(<NavigationMenu items={items} />);
    const entry = trigger("Products").parentElement!;

    fireEvent.pointerEnter(entry, { pointerType: "touch" });
    act(() => vi.advanceTimersByTime(500));
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");

    fireEvent.pointerEnter(entry, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(50));
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");
    act(() => vi.advanceTimersByTime(200));
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerLeave(entry, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(500));
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");
  });

  it("href berbahaya diganti #", () => {
    render(
      <NavigationMenu
        items={[
          { label: "Bad", href: "javascript:alert(1)" },
          { label: "Menu", links: [{ label: "Evil", href: " javascript:x" }] },
        ]}
      />,
    );
    expect(link("Bad")).toHaveAttribute("href", "#");
    expect(link("Evil")).toHaveAttribute("href", "#");
  });
});
