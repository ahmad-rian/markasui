import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Collapsible } from "../../components/collapsible/Collapsible";
import { Command } from "../../components/command/Command";
import { ContextMenu } from "../../components/context-menu/ContextMenu";

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

describe("React Collapsible", () => {
  it("memakai details dan summary, tertutup secara default, class user di akhir", () => {
    const { container } = render(
      <Collapsible title="Show details" className="mt-4" data-testid="c">
        Hidden content
      </Collapsible>,
    );
    const details = container.querySelector("details")!;
    expect(details).not.toHaveAttribute("open");
    expect(details).toHaveAttribute("data-testid", "c");
    expect(details.className.endsWith("mt-4")).toBe(true);
    expect(details.querySelector("summary")).toHaveTextContent("Show details");
    expect(details.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Hidden content")).toBeInTheDocument();
  });

  it("prop open membuka bagian sejak awal", () => {
    const { container } = render(
      <Collapsible title={<strong>Rich</strong>} open>
        Body
      </Collapsible>,
    );
    expect(container.querySelector("details")).toHaveAttribute("open");
    expect(container.querySelector("summary strong")).toHaveTextContent("Rich");
  });
});

describe("React ContextMenu", () => {
  const items = [
    { label: "Open", value: "open" },
    { label: "Rename" },
    { label: "Archive", value: "archive", disabled: true },
    { separator: true as const },
    { label: "Help", href: "/help" },
    { label: "Bad", href: "javascript:alert(1)" },
    { label: "Delete", value: "delete", danger: true },
  ];
  const renderMenu = (onSelect = vi.fn()) =>
    render(
      <ContextMenu
        id="ctx"
        items={items}
        onSelect={onSelect}
        className="h-40"
        aria-label="Canvas"
      >
        Right-click here
      </ContextMenu>,
    );
  const area = () => screen.getByRole("group", { name: "Canvas" });
  const menu = () => screen.getByRole("menu", { hidden: true });
  const item = (name: string) =>
    screen.getByRole("menuitem", { name, hidden: true });

  it("area bisa difokus, dideskripsikan petunjuk, atribut dan class user jatuh ke area", () => {
    renderMenu();
    expect(area()).toHaveAttribute("tabindex", "0");
    expect(area()).toHaveTextContent("Right-click here");
    expect(area().className.endsWith("h-40")).toBe(true);
    expect(area()).toHaveAccessibleDescription(
      "Press Shift+F10 to open the context menu",
    );
    expect(menu()).toHaveAttribute("id", "ctx");
    expect(menu()).toHaveAttribute("popover", "auto");
    expect(menu()).toHaveAttribute("aria-label", "Context menu");
    expect(menu()).toHaveAttribute("data-state", "closed");
  });

  it("merender separator, link aman, item nonaktif, dan item danger", () => {
    renderMenu();
    expect(screen.getByRole("separator", { hidden: true })).toHaveClass(
      "bg-line",
    );
    expect(item("Help").tagName).toBe("A");
    expect(item("Help")).toHaveAttribute("href", "/help");
    expect(item("Bad")).toHaveAttribute("href", "#");
    expect(item("Archive")).toBeDisabled();
    expect(item("Delete")).toHaveClass("text-danger");
    expect(item("Open")).toHaveAttribute("tabindex", "-1");
  });

  it("klik kanan membuka menu di posisi kursor dan fokus ke item pertama", () => {
    renderMenu();
    vi.spyOn(area(), "getBoundingClientRect").mockReturnValue(
      rect(100, 50, 300, 200),
    );
    vi.spyOn(menu(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 192, 150),
    );
    const event = fireEvent.contextMenu(area(), { clientX: 120, clientY: 160 });
    expect(event).toBe(false);
    expect(menu()).toHaveAttribute("data-state", "open");
    expect(area()).toHaveAttribute("data-state", "open");
    expect(menu().style.left).toBe("120px");
    expect(menu().style.top).toBe("160px");
    expect(item("Open")).toHaveFocus();
  });

  it("menu bergeser ke dalam layar dan pindah ke atas titik kalau tidak muat", () => {
    renderMenu();
    vi.spyOn(area(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, window.innerWidth, window.innerHeight),
    );
    vi.spyOn(menu(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 192, 150),
    );
    fireEvent.contextMenu(area(), {
      clientX: window.innerWidth - 10,
      clientY: window.innerHeight - 10,
    });
    expect(menu().style.left).toBe(`${window.innerWidth - 192 - 4}px`);
    expect(menu().style.top).toBe(`${window.innerHeight - 10 - 150}px`);
  });

  it("Shift+F10 dan tombol ContextMenu membuka di sudut area", () => {
    renderMenu();
    vi.spyOn(area(), "getBoundingClientRect").mockReturnValue(
      rect(80, 40, 300, 200),
    );
    vi.spyOn(menu(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 192, 150),
    );
    fireEvent.keyDown(area(), { key: "F10" });
    expect(menu()).toHaveAttribute("data-state", "closed");
    fireEvent.keyDown(area(), { key: "F10", shiftKey: true });
    expect(menu()).toHaveAttribute("data-state", "open");
    expect(menu().style.top).toBe("80px");
    expect(menu().style.left).toBe("40px");
    expect(item("Open")).toHaveFocus();

    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(menu()).toHaveAttribute("data-state", "closed");
    expect(area()).toHaveFocus();

    fireEvent.keyDown(area(), { key: "ContextMenu" });
    expect(menu()).toHaveAttribute("data-state", "open");
  });

  it("panah, Home, dan End berpindah item dan melewati item nonaktif; Tab menutup", () => {
    renderMenu();
    fireEvent.keyDown(area(), { key: "ContextMenu" });
    const press = (key: string) =>
      fireEvent.keyDown(document.activeElement!, { key });
    press("ArrowDown");
    expect(item("Rename")).toHaveFocus();
    press("ArrowDown");
    expect(item("Help")).toHaveFocus();
    press("End");
    expect(item("Delete")).toHaveFocus();
    press("ArrowDown");
    expect(item("Open")).toHaveFocus();
    press("ArrowUp");
    expect(item("Delete")).toHaveFocus();
    press("Home");
    expect(item("Open")).toHaveFocus();
    press("Tab");
    expect(menu()).toHaveAttribute("data-state", "closed");
  });

  it("memilih item memanggil onSelect dengan value atau label lalu menutup", () => {
    const onSelect = vi.fn();
    renderMenu(onSelect);
    fireEvent.contextMenu(area());
    fireEvent.click(item("Open"));
    expect(onSelect).toHaveBeenLastCalledWith("open");
    expect(menu()).toHaveAttribute("data-state", "closed");
    expect(area()).toHaveFocus();

    fireEvent.contextMenu(area());
    fireEvent.click(item("Rename"));
    expect(onSelect).toHaveBeenLastCalledWith("Rename");
  });

  it("klik kanan di dalam menu tidak membuka menu bawaan browser", () => {
    renderMenu();
    fireEvent.contextMenu(area());
    expect(fireEvent.contextMenu(item("Open"))).toBe(false);
  });

  it("menuLabel dan hintLabel menimpa default, id otomatis dibuat", () => {
    render(
      <ContextMenu
        items={items}
        menuLabel="Menu konteks"
        hintLabel="Tekan Shift+F10"
      >
        Area
      </ContextMenu>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveAccessibleDescription("Tekan Shift+F10");
    expect(screen.getByRole("menu", { hidden: true })).toHaveAttribute(
      "aria-label",
      "Menu konteks",
    );
    expect(screen.getByRole("menu", { hidden: true }).id).not.toBe("");
  });
});

describe("React Command", () => {
  const items = [
    { group: "Pages", label: "Dashboard", value: "dashboard" },
    { group: "Actions", label: "Create project", shortcut: "Ctrl+N" },
    { group: "Pages", label: "Projects", href: "/projects" },
    { group: "Actions", label: "Delete project", value: "delete" },
  ];
  const renderCommand = (onSelect = vi.fn(), hotkey = false) =>
    render(
      <Command
        id="cmd"
        items={items}
        hotkey={hotkey}
        onSelect={onSelect}
        className="max-w-xl"
        trigger={<button>Open palette</button>}
      />,
    );
  const dialog = () => document.querySelector("dialog")!;
  const input = () => screen.getByRole("combobox", { hidden: true });
  const option = (name: string | RegExp) =>
    screen.getByRole("option", { name, hidden: true });
  const openPalette = () =>
    fireEvent.click(screen.getByRole("button", { name: "Open palette" }));
  const type = (value: string) =>
    fireEvent.change(input(), { target: { value } });
  const press = (key: string) => fireEvent.keyDown(input(), { key });

  it("dialog tertutup di awal, combobox terhubung ke listbox, class user di akhir", () => {
    renderCommand();
    expect(dialog()).toHaveAttribute("data-state", "closed");
    expect(dialog()).toHaveAttribute("aria-label", "Command palette");
    expect(dialog().className.endsWith("max-w-xl")).toBe(true);
    const listbox = screen.getByRole("listbox", { hidden: true });
    expect(input()).toHaveAttribute("aria-controls", listbox.id);
    expect(input()).toHaveAttribute("aria-label", "Search commands");
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(input()).toHaveAttribute(
      "placeholder",
      "Type a command or search...",
    );
  });

  it("mengelompokkan item per grup sesuai urutan kemunculan dengan heading", () => {
    renderCommand();
    const groups = screen.getAllByRole("group", { hidden: true });
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveAccessibleName("Pages");
    expect(groups[1]).toHaveAccessibleName("Actions");
    expect(
      Array.from(groups[0]!.querySelectorAll('[role="option"]')).map(
        (el) => el.firstElementChild!.textContent,
      ),
    ).toEqual(["Dashboard", "Projects"]);
    expect(option("Projects").tagName).toBe("A");
    expect(option("Projects")).toHaveAttribute("href", "/projects");
    expect(option(/^Create project/).querySelector("kbd")).toHaveTextContent(
      "Ctrl+N",
    );
  });

  it("pemicu membuka dialog, opsi pertama aktif lewat aria-activedescendant", () => {
    renderCommand();
    openPalette();
    expect(dialog()).toHaveAttribute("open");
    expect(dialog()).toHaveAttribute("data-state", "open");
    expect(input()).toHaveAttribute(
      "aria-activedescendant",
      option("Dashboard").id,
    );
    expect(option("Dashboard")).toHaveAttribute("aria-selected", "true");
    expect(option("Projects")).toHaveAttribute("aria-selected", "false");
  });

  it("panah bawah dan atas memindah opsi aktif sesuai urutan tampil dan berputar", () => {
    renderCommand();
    openPalette();
    const active = () => input().getAttribute("aria-activedescendant");
    press("ArrowDown");
    expect(active()).toBe(option("Projects").id);
    press("ArrowDown");
    expect(active()).toBe(option(/^Create project/).id);
    press("ArrowDown");
    press("ArrowDown");
    expect(active()).toBe(option("Dashboard").id);
    press("ArrowUp");
    expect(active()).toBe(option("Delete project").id);
  });

  it("mengetik menyaring tanpa membedakan huruf besar dan kecil", () => {
    renderCommand();
    openPalette();
    type("PROJ");
    expect(
      screen.queryByRole("option", { name: "Dashboard", hidden: true }),
    ).toBeNull();
    expect(screen.getAllByRole("option", { hidden: true })).toHaveLength(3);
    expect(input()).toHaveAttribute(
      "aria-activedescendant",
      option("Projects").id,
    );
    type("delete");
    expect(screen.getAllByRole("group", { hidden: true })).toHaveLength(1);
  });

  it("tanpa hasil menampilkan emptyLabel dan menyembunyikan listbox", () => {
    renderCommand();
    openPalette();
    type("zzz");
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(screen.getByRole("listbox", { hidden: true })).toHaveAttribute(
      "hidden",
    );
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).not.toHaveAttribute("aria-activedescendant");
  });

  it("Enter memilih opsi aktif, memanggil onSelect, menutup, dan mengosongkan pencarian", () => {
    const onSelect = vi.fn();
    renderCommand(onSelect);
    openPalette();
    type("create");
    press("Enter");
    expect(onSelect).toHaveBeenLastCalledWith("Create project");
    expect(dialog()).not.toHaveAttribute("open");
    expect(dialog()).toHaveAttribute("data-state", "closed");
    expect(input()).toHaveValue("");

    openPalette();
    fireEvent.click(option("Dashboard"));
    expect(onSelect).toHaveBeenLastCalledWith("dashboard");
  });

  it("hover memindah opsi aktif dan klik backdrop menutup", () => {
    renderCommand();
    openPalette();
    fireEvent.mouseMove(option("Delete project"));
    expect(option("Delete project")).toHaveAttribute("aria-selected", "true");
    fireEvent.click(dialog());
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("hotkey Ctrl+K dan Cmd+K membuka dan menutup hanya bila hotkey aktif", () => {
    const { unmount } = renderCommand(vi.fn(), false);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(dialog()).not.toHaveAttribute("open");
    unmount();

    renderCommand(vi.fn(), true);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(dialog()).toHaveAttribute("open");
    fireEvent.keyDown(window, { key: "K", metaKey: true });
    expect(dialog()).not.toHaveAttribute("open");
    fireEvent.keyDown(window, { key: "k" });
    expect(dialog()).not.toHaveAttribute("open");
  });

  it("label teks menimpa default", () => {
    render(
      <Command
        items={items}
        placeholderLabel="Ketik perintah..."
        emptyLabel="Tidak ada hasil."
        searchLabel="Cari perintah"
        dialogLabel="Palet perintah"
      />,
    );
    expect(input()).toHaveAttribute("placeholder", "Ketik perintah...");
    expect(input()).toHaveAttribute("aria-label", "Cari perintah");
    expect(dialog()).toHaveAttribute("aria-label", "Palet perintah");
    expect(dialog().id).not.toBe("");
    type("zzz");
    expect(screen.getByText("Tidak ada hasil.")).toBeInTheDocument();
  });
});
