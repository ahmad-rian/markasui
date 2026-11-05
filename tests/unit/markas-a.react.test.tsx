import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BottomNavigation } from "../../components/bottom-navigation/BottomNavigation";
import { Dock, type DockItem } from "../../components/dock/Dock";
import { PinnedList } from "../../components/pinned-list/PinnedList";

afterEach(() => {
  vi.unstubAllGlobals();
  // jsdom has no Element.animate; tests that stub it remove it again.
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
});

const navItems = [
  { value: "home", label: "Home", icon: "M3 3h18" },
  { value: "inbox", label: "Inbox", icon: "M3 3h18", badge: 4 },
  { value: "me", label: "Me", icon: "M3 3h18", href: "javascript:alert(1)" },
];

describe("React BottomNavigation", () => {
  it("marks the first item current, moves the pill index, and calls onValueChange", () => {
    const onValueChange = vi.fn();
    render(
      <BottomNavigation
        items={navItems}
        onValueChange={onValueChange}
        className="fixed"
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(nav.style.getPropertyValue("--bn-count")).toBe("3");
    expect(nav.style.getPropertyValue("--bn-index")).toBe("0");

    fireEvent.click(screen.getByRole("button", { name: /^Inbox/ }));
    expect(onValueChange).toHaveBeenCalledWith("inbox");
    expect(screen.getByRole("button", { name: /^Inbox/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(nav.style.getPropertyValue("--bn-index")).toBe("1");
    expect(nav.parentElement?.className.endsWith("fixed")).toBe(true);
  });

  it("reads badges through badgeLabel, renders links safely, and overrides labels", () => {
    render(
      <BottomNavigation
        items={navItems}
        defaultValue="me"
        navLabel="Utama"
        badgeLabel="{count} baru"
      />,
    );
    expect(screen.getByRole("navigation", { name: "Utama" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: /^Inbox\s?4 baru$/ }),
    ).toBeVisible();
    const link = screen.getByRole("link", { name: "Me" });
    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("renders the action button only with action and names it by actionLabel", () => {
    const onAction = vi.fn();
    const { rerender } = render(<BottomNavigation items={navItems} />);
    expect(screen.queryByRole("button", { name: "Create" })).toBeNull();

    rerender(
      <BottomNavigation
        items={navItems}
        action={<svg />}
        onAction={onAction}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    expect(onAction).toHaveBeenCalledOnce();

    rerender(
      <BottomNavigation items={navItems} action={<svg />} actionLabel="Buat" />,
    );
    expect(screen.getByRole("button", { name: "Buat" })).toBeVisible();
  });

  it("collapses while the parent scrolls down and expands on scroll up", () => {
    const { container } = render(
      <div>
        <div data-testid="scroller" />
        <BottomNavigation items={navItems} shrinkOnScroll />
      </div>,
    );
    const scroller = screen.getByTestId("scroller");
    const root = container.querySelector("[data-bottom-nav]")!;
    const scrollTo = (top: number) => {
      scroller.scrollTop = top;
      fireEvent.scroll(scroller);
    };
    scrollTo(0);
    scrollTo(120);
    expect(root).toHaveAttribute("data-state", "collapsed");
    scrollTo(60);
    expect(root).toHaveAttribute("data-state", "expanded");
  });
});

const pinItems = [
  { value: "a", label: "Alpha", description: "First", meta: "1" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma" },
];

describe("React PinnedList", () => {
  it("moves a pinned row into the Pinned group, announces it, and keeps focus", () => {
    const onPinnedChange = vi.fn();
    render(
      <PinnedList
        items={pinItems}
        onPinnedChange={onPinnedChange}
        className="mt-4"
      />,
    );
    const pinned = screen.getByRole("list", { name: "Pinned", hidden: true });
    expect(pinned.parentElement).toHaveAttribute("hidden");

    const pin = screen.getByRole("button", { name: "Pin Beta" });
    expect(pin).toHaveAttribute("aria-pressed", "false");
    expect(pin).toHaveAttribute("title", "Pin Beta");
    fireEvent.click(pin);

    expect(onPinnedChange).toHaveBeenCalledWith(["b"]);
    expect(pinned.parentElement).not.toHaveAttribute("hidden");
    expect(within(pinned).getByText("Beta")).toBeVisible();
    const moved = screen.getByRole("button", { name: "Pin Beta" });
    expect(moved).toHaveAttribute("aria-pressed", "true");
    expect(moved).toHaveAttribute("title", "Unpin Beta");
    expect(moved).toHaveFocus();
    expect(screen.getByRole("status")).toHaveTextContent("Beta pinned");
    expect(
      pinned.parentElement?.parentElement?.className.endsWith("mt-4"),
    ).toBe(true);
  });

  it("returns an unpinned row to its original place", () => {
    render(<PinnedList items={pinItems} defaultPinned={["c"]} />);
    fireEvent.click(screen.getByRole("button", { name: "Pin Gamma" }));
    const all = screen.getByRole("list", { name: "All" });
    expect(
      within(all)
        .getAllByRole("listitem")
        .map((row) => row.dataset.value),
    ).toEqual(["a", "b", "c"]);
    expect(screen.getByRole("status")).toHaveTextContent("Gamma unpinned");
  });

  it("animates rows with FLIP unless reduced motion is on", () => {
    const animate = vi.fn();
    HTMLElement.prototype.animate =
      animate as unknown as HTMLElement["animate"];
    let top = 0;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      () => ({ left: 0, top: (top += 10) }) as DOMRect,
    );
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false })),
    );
    render(<PinnedList items={pinItems} />);
    fireEvent.click(screen.getByRole("button", { name: "Pin Gamma" }));
    expect(animate).toHaveBeenCalled();

    animate.mockClear();
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    fireEvent.click(screen.getByRole("button", { name: "Pin Alpha" }));
    expect(animate).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it("supports controlled pinned values and label overrides", () => {
    render(
      <PinnedList
        items={pinItems}
        pinned={["a"]}
        pinLabel="Sematkan {label}"
        unpinLabel="Lepas {label}"
        pinnedLabel="Disematkan"
        allLabel="Semua"
        pinnedMessage="{label} disematkan"
      />,
    );
    expect(screen.getByRole("list", { name: "Disematkan" })).toBeVisible();
    expect(screen.getByRole("list", { name: "Semua" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Sematkan Alpha" }),
    ).toHaveAttribute("title", "Lepas Alpha");
    fireEvent.click(screen.getByRole("button", { name: "Sematkan Beta" }));
    expect(screen.getByRole("status")).toHaveTextContent("Beta disematkan");
    // Controlled: the parent did not update pinned, so Beta stays in Semua.
    expect(
      within(screen.getByRole("list", { name: "Semua" })).getByText("Beta"),
    ).toBeVisible();
  });
});

const dockItems: DockItem[] = [
  { label: "Files", icon: "M3 3h18", active: true },
  { label: "Mail", value: "mail", icon: "M3 3h18" },
  { separator: true },
  { label: "Blog", icon: "M3 3h18", href: "/blog" },
];

describe("React Dock", () => {
  it("renders a toolbar with roving tabindex, a separator, and the user class last", () => {
    render(<Dock items={dockItems} className="mx-auto" />);
    const toolbar = screen.getByRole("toolbar", { name: "Dock" });
    expect(toolbar.className.endsWith("mx-auto")).toBe(true);
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
    const files = screen.getByRole("button", { name: "Files" });
    expect(files).toHaveAttribute("tabindex", "0");
    expect(files).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("button", { name: "Mail" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
  });

  it("moves focus with arrows, Home, and End and wraps around", () => {
    render(<Dock items={dockItems} />);
    const files = screen.getByRole("button", { name: "Files" });
    const mail = screen.getByRole("button", { name: "Mail" });
    const blog = screen.getByRole("link", { name: "Blog" });
    files.focus();
    fireEvent.keyDown(files, { key: "ArrowRight" });
    expect(mail).toHaveFocus();
    expect(mail).toHaveAttribute("tabindex", "0");
    expect(files).toHaveAttribute("tabindex", "-1");
    fireEvent.keyDown(mail, { key: "End" });
    expect(blog).toHaveFocus();
    fireEvent.keyDown(blog, { key: "ArrowRight" });
    expect(files).toHaveFocus();
    fireEvent.keyDown(files, { key: "ArrowLeft" });
    expect(blog).toHaveFocus();
    fireEvent.keyDown(blog, { key: "Home" });
    expect(files).toHaveFocus();
  });

  it("magnifies near the pointer, resets on leave, and calls onItemSelect", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false })),
    );
    const onItemSelect = vi.fn();
    render(
      <Dock items={dockItems} magnification={2} onItemSelect={onItemSelect} />,
    );
    const toolbar = screen.getByRole("toolbar");
    const wrappers = toolbar.querySelectorAll<HTMLElement>("[data-dock-item]");
    fireEvent.pointerMove(toolbar, { clientX: 0 });
    // jsdom rects are all zero, so every item sits under the pointer.
    expect(wrappers[0]?.style.getPropertyValue("--dock-scale")).toBe("2");
    fireEvent.pointerLeave(toolbar);
    expect(wrappers[0]?.style.getPropertyValue("--dock-scale")).toBe("1");

    fireEvent.click(screen.getByRole("button", { name: "Mail" }));
    fireEvent.click(screen.getByRole("button", { name: "Files" }));
    expect(onItemSelect.mock.calls).toEqual([["mail"], ["Files"]]);
  });

  it("stays at base size with reduced motion and overrides dockLabel", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    render(<Dock items={dockItems} dockLabel="Dok" />);
    const toolbar = screen.getByRole("toolbar", { name: "Dok" });
    fireEvent.pointerMove(toolbar, { clientX: 0 });
    expect(
      toolbar
        .querySelector<HTMLElement>("[data-dock-item]")
        ?.style.getPropertyValue("--dock-scale"),
    ).toBe("1");
  });
});
