import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Navbar, type NavbarLink } from "../../components/navbar/Navbar";

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

describe("React Navbar dropdown", () => {
  it("item dengan children menjadi pemicu popover tertutup dengan aria-controls", () => {
    render(<Navbar links={links} id="site" />);
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
    render(<Navbar links={links} />);
    act(() => panel().showPopover());
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    act(() => panel().hidePopover());
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("ArrowDown membuka panel dan memfokuskan link pertama", () => {
    render(<Navbar links={links} />);
    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link", { name: /Analytics/ })[0]).toHaveFocus();
  });

  it("klik mouse pada pemicu terbuka dibatalkan supaya panel tetap terbuka", () => {
    render(<Navbar links={links} />);
    act(() => panel().showPopover());
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      detail: 1,
    });
    trigger().dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("hover mouse membuka setelah jeda dan menutup setelah keluar, pointer sentuh diabaikan", () => {
    vi.useFakeTimers();
    render(<Navbar links={links} />);
    const entry = trigger().closest("li")!;

    fireEvent.pointerEnter(entry, { pointerType: "touch" });
    act(() => vi.advanceTimersByTime(500));
    expect(trigger()).toHaveAttribute("aria-expanded", "false");

    fireEvent.pointerEnter(entry, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(60));
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    act(() => vi.advanceTimersByTime(100));
    expect(trigger()).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerLeave(entry, { pointerType: "mouse" });
    act(() => vi.advanceTimersByTime(100));
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    act(() => vi.advanceTimersByTime(120));
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("menu seluler menampilkan children sebagai details dengan link aman", async () => {
    render(<Navbar links={links} />);
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    const mobile = screen.getByRole("navigation", { name: "Main mobile" });
    const group = mobile.querySelector("details")!;
    expect(group.querySelector("summary")).toHaveTextContent("Products");
    expect(
      [...group.querySelectorAll("a")].map((a) => a.getAttribute("href")),
    ).toEqual(["/analytics", "#"]);
    expect(panel().querySelectorAll("a")[1]).toHaveAttribute("href", "#");
  });
});

describe("React Navbar varian dan label", () => {
  it("variant, sticky, dan class user di akhir", () => {
    render(<Navbar links={links} variant="floating" sticky className="mt-4" />);
    const header = screen.getByRole("banner");
    expect(header.className).toContain("rounded-2xl");
    expect(header.className).toContain("sticky");
    expect(header.className.endsWith("mt-4")).toBe(true);
  });

  it("variant blur dan default tanpa sticky", () => {
    const { unmount } = render(<Navbar links={links} variant="blur" />);
    expect(screen.getByRole("banner").className).toContain("backdrop-blur-md");
    unmount();
    render(<Navbar links={links} />);
    const header = screen.getByRole("banner");
    expect(header.className).toContain("border-b");
    expect(header.className).not.toContain("sticky");
  });

  it("label menimpa default", () => {
    render(
      <Navbar
        links={links}
        menuLabel="Buka menu"
        navLabel="Utama"
        mobileNavLabel="Utama seluler"
      />,
    );
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
