import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import NavigationMenu, {
  type NavigationMenuItem,
} from "../../components/navigation-menu/NavigationMenu.vue";

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

describe("Vue NavigationMenu", async () => {
  it("merender nav berlabel, pemicu disclosure, link biasa, dan class user di akhir", async () => {
    const { container } = render(NavigationMenu, {
      props: { items },
      attrs: { class: "mt-4", "data-testid": "nav" },
    });
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

  it("navLabel menimpa label bawaan dan id dari user dipakai", async () => {
    render(NavigationMenu, {
      props: { items, navLabel: "Utama", id: "site" },
    });
    const nav = screen.getByRole("navigation", { name: "Utama" });
    expect(nav).toHaveAttribute("id", "site");
    expect(trigger("Products")).toHaveAttribute(
      "aria-controls",
      "site-panel-0",
    );
  });

  it("indikator tersembunyi tanpa item aktif dan muncul saat panel terbuka", async () => {
    const plain = items.map((item) => ({ ...item, active: false }));
    const { container } = render(NavigationMenu, { props: { items: plain } });
    expect(indicator(container)).toHaveAttribute("data-state", "hidden");
    panelOf("Developers").showPopover();
    await nextTick();
    expect(indicator(container)).toHaveAttribute("data-state", "visible");
  });

  it("ArrowDown membuka panel dan memfokuskan link pertama, Escape di panel menutup dan mengembalikan fokus", async () => {
    render(NavigationMenu, { props: { items } });
    const products = trigger("Products");
    products.focus();
    await fireEvent.keyDown(products, { key: "ArrowDown" });
    expect(products).toHaveAttribute("aria-expanded", "true");
    expect(link(/Workflows 2.0/)).toHaveFocus();

    link("Automation").focus();
    await fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(products).toHaveAttribute("aria-expanded", "false");
    expect(products).toHaveFocus();
  });

  it("panah kiri dan kanan, Home, dan End berpindah antar item tingkat atas", async () => {
    render(NavigationMenu, { props: { items } });
    trigger("Products").focus();
    await fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(trigger("Developers")).toHaveFocus();
    await fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(link("Pricing")).toHaveFocus();
    await fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(trigger("Products")).toHaveFocus();
    await fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
    expect(link("Pricing")).toHaveFocus();
    await fireEvent.keyDown(document.activeElement!, { key: "Home" });
    expect(trigger("Products")).toHaveFocus();
    await fireEvent.keyDown(document.activeElement!, { key: "End" });
    expect(link("Pricing")).toHaveFocus();
  });

  it("fokus yang keluar dari entri menutup panelnya", async () => {
    render(NavigationMenu, { props: { items } });
    panelOf("Products").showPopover();
    await nextTick();
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "true");
    await fireEvent.focusOut(trigger("Products"), {
      relatedTarget: trigger("Developers"),
    });
    expect(trigger("Products")).toHaveAttribute("aria-expanded", "false");
  });

  it("hover mouse membuka setelah jeda, pointer sentuh diabaikan, keluar menutup", async () => {
    vi.useFakeTimers();
    render(NavigationMenu, { props: { items } });
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

  it("href berbahaya diganti #", async () => {
    render(NavigationMenu, {
      props: {
        items: [
          { label: "Bad", href: "javascript:alert(1)" },
          { label: "Menu", links: [{ label: "Evil", href: " javascript:x" }] },
        ],
      },
    });
    expect(link("Bad")).toHaveAttribute("href", "#");
    expect(link("Evil")).toHaveAttribute("href", "#");
  });
});
