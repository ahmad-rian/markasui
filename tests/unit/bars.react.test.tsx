import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Kbd } from "../../components/kbd/Kbd";
import { Menubar } from "../../components/menubar/Menubar";
import { Separator } from "../../components/separator/Separator";

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

const press = (key: string) =>
  fireEvent.keyDown(document.activeElement!, { key });

describe("React Menubar", () => {
  const menus = [
    {
      label: "File",
      items: [
        { label: "New file", value: "new" },
        { label: "Save" },
        { separator: true as const },
        { label: "Help", href: "javascript:alert(1)" },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", value: "undo" },
        { label: "Redo", value: "redo", disabled: true },
        { label: "Delete", value: "delete", danger: true },
      ],
    },
    { label: "View", items: [{ label: "Zoom in", value: "zoom-in" }] },
  ];
  const renderBar = (onSelect = vi.fn()) =>
    render(
      <Menubar
        id="app"
        menus={menus}
        onSelect={onSelect}
        className="ms-auto"
      />,
    );
  const top = (name: string) => screen.getByRole("menuitem", { name });
  const item = (name: string) =>
    screen.getByRole("menuitem", { name, hidden: true });
  const menuIds: Record<string, string> = {
    File: "app-menu-0",
    Edit: "app-menu-1",
    View: "app-menu-2",
  };
  const menu = (name: string) => document.getElementById(menuIds[name]!)!;

  it("merender menubar dengan label default, roving tabindex, dan class user di akhir", () => {
    renderBar();
    const bar = screen.getByRole("menubar", { name: "Menu" });
    expect(bar.className.endsWith("ms-auto")).toBe(true);
    expect(top("File")).toHaveAttribute("tabindex", "0");
    expect(top("Edit")).toHaveAttribute("tabindex", "-1");
    expect(top("File")).toHaveAttribute("aria-haspopup", "menu");
    expect(top("File")).toHaveAttribute("aria-expanded", "false");
    expect(top("File")).toHaveAttribute("popovertarget", "app-menu-0");
    expect(top("File")).toHaveAttribute("aria-controls", "app-menu-0");
    expect(menu("File")).toHaveAttribute("popover", "auto");
    expect(menu("File")).toHaveAttribute("aria-labelledby", "app-trigger-0");
    expect(menu("File")).toHaveAttribute("data-state", "closed");
  });

  it("prop label menimpa nama aksesibel bar", () => {
    render(<Menubar label="Menu aplikasi" menus={menus} />);
    expect(
      screen.getByRole("menubar", { name: "Menu aplikasi" }),
    ).toBeInTheDocument();
  });

  it("merender separator, item danger, item nonaktif, dan href aman", () => {
    renderBar();
    expect(screen.getByRole("separator", { hidden: true })).toHaveClass(
      "bg-line",
    );
    expect(item("Delete")).toHaveClass("text-danger");
    expect(item("Redo")).toBeDisabled();
    expect(item("Help").tagName).toBe("A");
    expect(item("Help")).toHaveAttribute("href", "#");
  });

  it("panah kiri, kanan, Home, dan End berpindah antar item bar", () => {
    renderBar();
    top("File").focus();
    press("ArrowRight");
    expect(top("Edit")).toHaveFocus();
    expect(top("Edit")).toHaveAttribute("tabindex", "0");
    expect(top("File")).toHaveAttribute("tabindex", "-1");
    press("End");
    expect(top("View")).toHaveFocus();
    press("ArrowRight");
    expect(top("File")).toHaveFocus();
    press("ArrowLeft");
    expect(top("View")).toHaveFocus();
    press("Home");
    expect(top("File")).toHaveFocus();
    press("a");
    expect(top("File")).toHaveFocus();
  });

  it("panah bawah membuka menu, navigasi di dalam menu melewati item nonaktif", () => {
    renderBar();
    top("Edit").focus();
    press("ArrowDown");
    expect(menu("Edit")).toHaveAttribute("data-state", "open");
    expect(top("Edit")).toHaveAttribute("aria-expanded", "true");
    expect(item("Undo")).toHaveFocus();
    press("ArrowDown");
    expect(item("Delete")).toHaveFocus();
    press("ArrowDown");
    expect(item("Undo")).toHaveFocus();
    press("ArrowUp");
    expect(item("Delete")).toHaveFocus();
    press("Home");
    expect(item("Undo")).toHaveFocus();
    press("End");
    expect(item("Delete")).toHaveFocus();
    press("x");
    expect(item("Delete")).toHaveFocus();
  });

  it("panah atas membuka dan fokus item terakhir, panah saat terbuka memindah fokus", () => {
    renderBar();
    top("File").focus();
    press("ArrowUp");
    expect(item("Help")).toHaveFocus();
    fireEvent.keyDown(top("File"), { key: "ArrowDown" });
    expect(item("New file")).toHaveFocus();
    fireEvent.keyDown(top("File"), { key: "Enter" });
    expect(item("New file")).toHaveFocus();
  });

  it("panah kanan dan kiri di dalam menu pindah ke menu sebelah dan membukanya", () => {
    renderBar();
    top("File").focus();
    press("ArrowDown");
    press("ArrowRight");
    expect(menu("File")).toHaveAttribute("data-state", "closed");
    expect(menu("Edit")).toHaveAttribute("data-state", "open");
    expect(top("Edit")).toHaveAttribute("tabindex", "0");
    expect(item("Undo")).toHaveFocus();
    press("ArrowLeft");
    press("ArrowLeft");
    expect(menu("View")).toHaveAttribute("data-state", "open");
    expect(item("Zoom in")).toHaveFocus();
  });

  it("Escape menutup menu dan mengembalikan fokus ke item bar, Tab menutup menu", () => {
    renderBar();
    top("Edit").focus();
    press("ArrowDown");
    press("Escape");
    expect(menu("Edit")).toHaveAttribute("data-state", "closed");
    expect(top("Edit")).toHaveFocus();
    expect(top("Edit")).toHaveAttribute("aria-expanded", "false");

    press("ArrowDown");
    press("Tab");
    expect(menu("Edit")).toHaveAttribute("data-state", "closed");
  });

  it("memilih item memanggil onSelect dengan value atau label lalu menutup", async () => {
    const onSelect = vi.fn();
    renderBar(onSelect);
    top("File").focus();
    press("ArrowDown");
    await userEvent.click(item("New file"));
    expect(onSelect).toHaveBeenLastCalledWith("new");
    expect(menu("File")).toHaveAttribute("data-state", "closed");
    expect(top("File")).toHaveFocus();
    await userEvent.click(item("Save"));
    expect(onSelect).toHaveBeenLastCalledWith("Save");
  });

  it("menu diletakkan di bawah item bar dan mengikuti resize", () => {
    renderBar();
    vi.spyOn(top("File"), "getBoundingClientRect").mockReturnValue({
      top: 10,
      left: 20,
      bottom: 42,
      right: 80,
      width: 60,
      height: 32,
      x: 20,
      y: 10,
      toJSON: () => ({}),
    });
    top("File").focus();
    press("ArrowDown");
    expect(menu("File").style.top).toBe("46px");
    expect(menu("File").style.left).toBe("20px");
    menu("File").style.top = "";
    fireEvent(window, new Event("resize"));
    expect(menu("File").style.top).toBe("46px");
  });
});

describe("React Separator", () => {
  it("dekoratif secara default dengan role none, class user di akhir", () => {
    const { container } = render(<Separator className="my-4" />);
    const line = container.firstElementChild!;
    expect(line).toHaveAttribute("role", "none");
    expect(line).not.toHaveAttribute("aria-orientation");
    expect(line).toHaveClass("h-px", "w-full", "bg-line");
    expect(line.className.endsWith("my-4")).toBe(true);
  });

  it("decorative false memakai role separator dan aria-orientation", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    const line = screen.getByRole("separator");
    expect(line).toHaveAttribute("aria-orientation", "vertical");
    expect(line).toHaveClass("w-px", "self-stretch");
  });

  it("label tampil di tengah garis dan menjadi nama separator", () => {
    render(<Separator decorative={false} label="atau" className="my-2" />);
    const line = screen.getByRole("separator", { name: "atau" });
    expect(line).toHaveTextContent("atau");
    expect(line.querySelectorAll(".bg-line")).toHaveLength(2);
    expect(line.className.endsWith("my-2")).toBe(true);
  });

  it("label pada separator dekoratif tanpa aria-label", () => {
    const { container } = render(
      <Separator label="or" orientation="vertical" />,
    );
    const line = container.firstElementChild!;
    expect(line).toHaveAttribute("role", "none");
    expect(line).not.toHaveAttribute("aria-label");
    expect(line).toHaveClass("flex-col");
  });
});

describe("React Kbd", () => {
  it("merender satu keycap dengan ukuran md, class user di akhir", () => {
    const { container } = render(<Kbd className="ml-auto">Esc</Kbd>);
    const key = container.firstElementChild!;
    expect(key.tagName).toBe("KBD");
    expect(key).toHaveTextContent("Esc");
    expect(key).toHaveClass("h-6", "bg-surface", "ring-line");
    expect(key.className.endsWith("ml-auto")).toBe(true);
  });

  it("keys merender kbd terpisah dengan pemisah +", () => {
    const { container } = render(
      <Kbd keys={["Ctrl", "K"]} size="sm" className="ml-2" />,
    );
    const group = container.firstElementChild!;
    const keys = group.querySelectorAll("kbd");
    expect(group.tagName).toBe("KBD");
    expect(group.className.endsWith("ml-2")).toBe(true);
    expect(keys).toHaveLength(2);
    expect(keys[0]).toHaveClass("h-5");
    expect(group).toHaveTextContent("Ctrl+K");
    expect(group.querySelector("span")).toHaveClass("text-muted");
  });

  it("prop separator menimpa pemisah default", () => {
    const { container } = render(<Kbd keys={["G", "N"]} separator="lalu" />);
    expect(container.firstElementChild).toHaveTextContent("GlaluN");
  });
});
