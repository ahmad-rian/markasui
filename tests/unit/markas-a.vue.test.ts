import { fireEvent, render, screen, within } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import BottomNavigation from "../../components/bottom-navigation/BottomNavigation.vue";
import Dock from "../../components/dock/Dock.vue";
import PinnedList from "../../components/pinned-list/PinnedList.vue";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  // jsdom has no Element.animate; tests that stub it remove it again.
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
});

const navItems = [
  { value: "home", label: "Home", icon: "M3 3h18" },
  { value: "inbox", label: "Inbox", icon: "M3 3h18", badge: 4 },
  { value: "me", label: "Me", icon: "M3 3h18", href: "javascript:alert(1)" },
];

describe("Vue BottomNavigation", () => {
  it("marks the current item, moves the pill index, and updates v-model", async () => {
    const { emitted } = render(BottomNavigation, {
      props: { items: navItems },
      attrs: { class: "fixed" },
    });
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(nav.style.getPropertyValue("--bn-count")).toBe("3");

    await fireEvent.click(screen.getByRole("button", { name: /^Inbox/ }));
    expect(emitted("update:modelValue")).toEqual([["inbox"]]);
    expect(screen.getByRole("button", { name: /^Inbox/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(nav.style.getPropertyValue("--bn-index")).toBe("1");
    expect(nav.parentElement?.className.endsWith("fixed")).toBe(true);
  });

  it("reads badges through badgeLabel, renders links safely, and overrides labels", () => {
    render(BottomNavigation, {
      props: {
        items: navItems,
        defaultValue: "me",
        navLabel: "Utama",
        badgeLabel: "{count} baru",
      },
    });
    expect(screen.getByRole("navigation", { name: "Utama" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: /^Inbox\s?4 baru$/ }),
    ).toBeVisible();
    const link = screen.getByRole("link", { name: "Me" });
    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("renders the action button only with the action slot", async () => {
    const { emitted, unmount } = render(BottomNavigation, {
      props: { items: navItems, actionLabel: "Buat" },
      slots: { action: "<svg />" },
    });
    await fireEvent.click(screen.getByRole("button", { name: "Buat" }));
    expect(emitted("action")).toHaveLength(1);
    unmount();

    render(BottomNavigation, { props: { items: navItems } });
    expect(screen.queryByRole("button", { name: "Create" })).toBeNull();
  });

  it("collapses while the parent scrolls down and expands on scroll up", async () => {
    const Host = defineComponent(
      () => () =>
        h("div", [
          h("div", { "data-testid": "scroller" }),
          h(BottomNavigation, { items: navItems, shrinkOnScroll: true }),
        ]),
    );
    const { container } = render(Host);
    const scroller = screen.getByTestId("scroller");
    const root = container.querySelector("[data-bottom-nav]")!;
    const scrollTo = async (top: number) => {
      scroller.scrollTop = top;
      await fireEvent.scroll(scroller);
    };
    await scrollTo(0);
    await scrollTo(120);
    expect(root).toHaveAttribute("data-state", "collapsed");
    await scrollTo(60);
    expect(root).toHaveAttribute("data-state", "expanded");
  });
});

const pinItems = [
  { value: "a", label: "Alpha", description: "First", meta: "1" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma" },
];

describe("Vue PinnedList", () => {
  it("moves a pinned row into the Pinned group, announces it, and keeps focus", async () => {
    const { emitted, container } = render(PinnedList, {
      props: { items: pinItems },
      attrs: { class: "mt-4" },
    });
    expect((container.firstElementChild as HTMLElement).className).toMatch(
      /mt-4$/,
    );
    const pinned = screen.getByRole("list", { name: "Pinned", hidden: true });
    expect(pinned.parentElement).toHaveAttribute("hidden");

    await fireEvent.click(screen.getByRole("button", { name: "Pin Beta" }));
    await nextTick();
    expect(emitted("update:pinned")).toEqual([[["b"]]]);
    expect(pinned.parentElement).not.toHaveAttribute("hidden");
    expect(within(pinned).getByText("Beta")).toBeVisible();
    const moved = screen.getByRole("button", { name: "Pin Beta" });
    expect(moved).toHaveAttribute("aria-pressed", "true");
    expect(moved).toHaveAttribute("title", "Unpin Beta");
    expect(moved).toHaveFocus();
    expect(screen.getByRole("status")).toHaveTextContent("Beta pinned");
  });

  it("returns an unpinned row to its original place", async () => {
    render(PinnedList, { props: { items: pinItems, defaultPinned: ["c"] } });
    await fireEvent.click(screen.getByRole("button", { name: "Pin Gamma" }));
    const all = screen.getByRole("list", { name: "All" });
    expect(
      within(all)
        .getAllByRole("listitem")
        .map((row) => row.dataset.value),
    ).toEqual(["a", "b", "c"]);
    expect(screen.getByRole("status")).toHaveTextContent("Gamma unpinned");
  });

  it("animates rows with FLIP unless reduced motion is on", async () => {
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
    render(PinnedList, { props: { items: pinItems } });
    await fireEvent.click(screen.getByRole("button", { name: "Pin Gamma" }));
    await nextTick();
    expect(animate).toHaveBeenCalled();

    animate.mockClear();
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    await fireEvent.click(screen.getByRole("button", { name: "Pin Alpha" }));
    await nextTick();
    expect(animate).not.toHaveBeenCalled();
  });

  it("follows v-model:pinned and overrides labels", async () => {
    const pinned = ref(["a"]);
    const Host = defineComponent(
      () => () =>
        h(PinnedList, {
          items: pinItems,
          pinned: pinned.value,
          "onUpdate:pinned": (value?: string[]) => (pinned.value = value ?? []),
          pinLabel: "Sematkan {label}",
          unpinLabel: "Lepas {label}",
          pinnedLabel: "Disematkan",
          allLabel: "Semua",
          pinnedMessage: "{label} disematkan",
        }),
    );
    render(Host);
    expect(
      screen.getByRole("button", { name: "Sematkan Alpha" }),
    ).toHaveAttribute("title", "Lepas Alpha");
    await fireEvent.click(
      screen.getByRole("button", { name: "Sematkan Beta" }),
    );
    expect(pinned.value).toEqual(["a", "b"]);
    expect(
      within(screen.getByRole("list", { name: "Disematkan" })).getByText(
        "Beta",
      ),
    ).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("Beta disematkan");
  });
});

const dockItems = [
  { label: "Files", icon: "M3 3h18", active: true },
  { label: "Mail", value: "mail", icon: "M3 3h18" },
  { separator: true as const },
  { label: "Blog", icon: "M3 3h18", href: "/blog" },
];

describe("Vue Dock", () => {
  it("renders a toolbar with roving tabindex, a separator, and the user class last", () => {
    render(Dock, { props: { items: dockItems }, attrs: { class: "mx-auto" } });
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

  it("moves focus with arrows, Home, and End and wraps around", async () => {
    render(Dock, { props: { items: dockItems } });
    const files = screen.getByRole("button", { name: "Files" });
    const mail = screen.getByRole("button", { name: "Mail" });
    const blog = screen.getByRole("link", { name: "Blog" });
    files.focus();
    await fireEvent.keyDown(files, { key: "ArrowRight" });
    expect(mail).toHaveFocus();
    expect(mail).toHaveAttribute("tabindex", "0");
    expect(files).toHaveAttribute("tabindex", "-1");
    await fireEvent.keyDown(mail, { key: "End" });
    expect(blog).toHaveFocus();
    await fireEvent.keyDown(blog, { key: "ArrowRight" });
    expect(files).toHaveFocus();
    await fireEvent.keyDown(files, { key: "ArrowLeft" });
    expect(blog).toHaveFocus();
    await fireEvent.keyDown(blog, { key: "Home" });
    expect(files).toHaveFocus();
  });

  it("magnifies near the pointer, resets on leave, and emits select", async () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false })),
    );
    const { emitted } = render(Dock, {
      props: { items: dockItems, magnification: 2 },
    });
    const toolbar = screen.getByRole("toolbar");
    const first = toolbar.querySelector<HTMLElement>("[data-dock-item]");
    await fireEvent.pointerMove(toolbar, { clientX: 0 });
    // jsdom rects are all zero, so every item sits under the pointer.
    expect(first?.style.getPropertyValue("--dock-scale")).toBe("2");
    await fireEvent.pointerLeave(toolbar);
    expect(first?.style.getPropertyValue("--dock-scale")).toBe("1");

    await fireEvent.click(screen.getByRole("button", { name: "Mail" }));
    await fireEvent.click(screen.getByRole("button", { name: "Files" }));
    expect(emitted("select")).toEqual([["mail"], ["Files"]]);
  });

  it("stays at base size with reduced motion and overrides dockLabel", async () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    render(Dock, { props: { items: dockItems, dockLabel: "Dok" } });
    const toolbar = screen.getByRole("toolbar", { name: "Dok" });
    await fireEvent.pointerMove(toolbar, { clientX: 0 });
    expect(
      toolbar
        .querySelector<HTMLElement>("[data-dock-item]")
        ?.style.getPropertyValue("--dock-scale"),
    ).toBe("1");
  });
});
