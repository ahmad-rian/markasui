import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import Navbar, { type NavbarLink } from "../../components/navbar/Navbar.vue";

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
  HTMLElement.prototype.togglePopover = function togglePopover(force) {
    const open = typeof force === "boolean" ? force : !shownPopovers.has(this);
    setPopover(this, open);
    return open;
  };
});

afterEach(() => {
  vi.useRealTimers();
});

const links: NavbarLink[] = [
  { label: "Home", href: "/", active: true },
  {
    label: "Products",
    children: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "Track usage",
        icon: "M3 3v18h18",
      },
      { label: "Automation", href: "javascript:alert(1)" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

const trigger = () => screen.getByRole("button", { name: "Products" });
const panel = () =>
  document.getElementById(trigger().getAttribute("popovertarget")!)!;

describe("Vue Navbar dropdown", () => {
  it("item dengan children menjadi pemicu popover tertutup dengan aria-controls", () => {
    render(Navbar, { props: { links, id: "site" } });
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).toHaveAttribute("aria-controls", "site-panel-1");
    expect(panel()).toHaveAttribute("popover", "auto");
    expect(panel().querySelector("svg path")).toHaveAttribute(
      "d",
      "M3 3v18h18",
    );
    expect(panel()).toHaveTextContent("Track usage");
  });

  it("toggle panel memperbarui aria-expanded", () => {
    render(Navbar, { props: { links } });
    panel().showPopover();
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    panel().hidePopover();
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("ArrowDown membuka panel dan memfokuskan link pertama", async () => {
    render(Navbar, { props: { links } });
    await fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link", { name: /Analytics/ })[0]).toHaveFocus();
  });

  it("klik mouse pada pemicu terbuka dibatalkan supaya panel tetap terbuka", () => {
    render(Navbar, { props: { links } });
    panel().showPopover();
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      detail: 1,
    });
    trigger().dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("hover mouse membuka setelah jeda dan menutup setelah keluar, pointer sentuh diabaikan", async () => {
    vi.useFakeTimers();
    render(Navbar, { props: { links } });
    const entry = trigger().closest("li")!;

    await fireEvent.pointerEnter(entry, { pointerType: "touch" });
    await vi.advanceTimersByTimeAsync(500);
    expect(trigger()).toHaveAttribute("aria-expanded", "false");

    await fireEvent.pointerEnter(entry, { pointerType: "mouse" });
    await vi.advanceTimersByTimeAsync(60);
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    await vi.advanceTimersByTimeAsync(100);
    expect(trigger()).toHaveAttribute("aria-expanded", "true");

    await fireEvent.pointerLeave(entry, { pointerType: "mouse" });
    await vi.advanceTimersByTimeAsync(100);
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    await vi.advanceTimersByTimeAsync(120);
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("menu seluler menampilkan children sebagai details dengan link aman", async () => {
    render(Navbar, { props: { links } });
    await fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    await nextTick();
    const mobile = screen.getByRole("navigation", { name: "Main mobile" });
    const group = mobile.querySelector("details")!;
    expect(group.querySelector("summary")).toHaveTextContent("Products");
    expect(
      [...group.querySelectorAll("a")].map((a) => a.getAttribute("href")),
    ).toEqual(["/analytics", "#"]);
    expect(panel().querySelectorAll("a")[1]).toHaveAttribute("href", "#");
  });

  it("Escape di menu seluler menutup dan mengembalikan fokus ke tombol menu", async () => {
    render(Navbar, { props: { links } });
    const button = screen.getByRole("button", { name: "Menu" });
    await fireEvent.click(button);
    const summary = document.querySelector("summary")!;
    await fireEvent.keyDown(summary, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });
});

describe("Vue Navbar varian dan label", () => {
  it("variant, sticky, dan class user di akhir", () => {
    render(Navbar, {
      props: { links, variant: "floating", sticky: true },
      attrs: { class: "mt-4" },
    });
    const header = screen.getByRole("banner");
    expect(header.className).toContain("rounded-2xl");
    expect(header.className).toContain("sticky");
    expect(header.className.endsWith("mt-4")).toBe(true);
  });

  it("variant blur dan default tanpa sticky", () => {
    const { unmount } = render(Navbar, {
      props: { links, variant: "blur" },
    });
    expect(screen.getByRole("banner").className).toContain("backdrop-blur-md");
    unmount();
    render(Navbar, { props: { links } });
    const header = screen.getByRole("banner");
    expect(header.className).toContain("border-b");
    expect(header.className).not.toContain("sticky");
  });

  it("label menimpa default", () => {
    render(Navbar, {
      props: {
        links,
        menuLabel: "Buka menu",
        navLabel: "Utama",
        mobileNavLabel: "Utama seluler",
      },
    });
    expect(
      screen.getByRole("button", { name: "Buka menu" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Utama" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Utama seluler", hidden: true }),
    ).toBeInTheDocument();
  });
});
