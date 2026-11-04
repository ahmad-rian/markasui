import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Button } from "../../components/button/Button";
import { Drawer } from "../../components/drawer/Drawer";
import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";
import { Tooltip } from "../../components/tooltip/Tooltip";

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

describe("React DropdownMenu", () => {
  const items = [
    { label: "Edit", value: "edit" },
    { label: "Duplicate" },
    { label: "Archive", value: "archive", disabled: true },
    { separator: true as const },
    { label: "Help", href: "/help" },
    { label: "Delete", value: "delete", danger: true },
  ];
  const renderMenu = (onSelect = vi.fn()) =>
    render(
      <DropdownMenu
        id="actions"
        label="Actions"
        items={items}
        onSelect={onSelect}
        className="ms-auto"
      />,
    );
  const trigger = () => screen.getByRole("button", { name: "Actions" });
  const item = (name: string) =>
    screen.getByRole("menuitem", { name, hidden: true });

  it("menghubungkan pemicu dan panel menu", () => {
    const { container } = renderMenu();
    const menu = screen.getByRole("menu", { hidden: true });
    expect(trigger()).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).toHaveAttribute("popovertarget", "actions");
    expect(trigger()).toHaveAttribute("aria-controls", "actions");
    expect(menu).toHaveAttribute("id", "actions");
    expect(menu).toHaveAttribute("popover", "auto");
    expect(menu).toHaveAttribute("data-state", "closed");
    expect(menu).toHaveAttribute("aria-labelledby", "actions-trigger");
    expect(container.firstElementChild!.className.endsWith("ms-auto")).toBe(
      true,
    );
  });

  it("merender separator, link, item nonaktif, dan item danger", () => {
    renderMenu();
    expect(screen.getByRole("separator", { hidden: true })).toHaveClass(
      "bg-line",
    );
    expect(item("Help").tagName).toBe("A");
    expect(item("Help")).toHaveAttribute("href", "/help");
    expect(item("Archive")).toBeDisabled();
    expect(item("Delete")).toHaveClass("text-danger");
    expect(item("Edit")).toHaveAttribute("tabindex", "-1");
  });

  it("panah bawah membuka dan fokus item pertama, navigasi melewati item nonaktif", () => {
    renderMenu();
    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    expect(screen.getByRole("menu", { hidden: true })).toHaveAttribute(
      "data-state",
      "open",
    );
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(item("Edit")).toHaveFocus();

    const press = (key: string) =>
      fireEvent.keyDown(document.activeElement!, { key });
    press("ArrowDown");
    expect(item("Duplicate")).toHaveFocus();
    press("ArrowDown");
    expect(item("Help")).toHaveFocus();
    press("End");
    expect(item("Delete")).toHaveFocus();
    press("ArrowDown");
    expect(item("Edit")).toHaveFocus();
    press("ArrowUp");
    expect(item("Delete")).toHaveFocus();
    press("Home");
    expect(item("Edit")).toHaveFocus();
    press("a");
    expect(item("Edit")).toHaveFocus();
  });

  it("panah atas membuka dan fokus item terakhir, panah saat terbuka memindah fokus", () => {
    renderMenu();
    fireEvent.keyDown(trigger(), { key: "ArrowUp" });
    expect(item("Delete")).toHaveFocus();
    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    expect(item("Edit")).toHaveFocus();
    fireEvent.keyDown(trigger(), { key: "Enter" });
    expect(item("Edit")).toHaveFocus();
  });

  it("Escape menutup menu dan mengembalikan fokus ke pemicu, Tab menutup menu", () => {
    renderMenu();
    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(screen.getByRole("menu", { hidden: true })).toHaveAttribute(
      "data-state",
      "closed",
    );
    expect(trigger()).toHaveFocus();

    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    fireEvent.keyDown(document.activeElement!, { key: "Tab" });
    expect(screen.getByRole("menu", { hidden: true })).toHaveAttribute(
      "data-state",
      "closed",
    );
  });

  it("memilih item memanggil onSelect dengan value atau label lalu menutup", async () => {
    const onSelect = vi.fn();
    renderMenu(onSelect);
    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    await userEvent.click(item("Edit"));
    expect(onSelect).toHaveBeenLastCalledWith("edit");
    expect(screen.getByRole("menu", { hidden: true })).toHaveAttribute(
      "data-state",
      "closed",
    );
    expect(trigger()).toHaveFocus();

    await userEvent.click(item("Duplicate"));
    expect(onSelect).toHaveBeenLastCalledWith("Duplicate");
  });

  it("menu pindah ke atas pemicu kalau di bawah tidak muat", () => {
    renderMenu();
    vi.spyOn(trigger(), "getBoundingClientRect").mockReturnValue(
      rect(700, 1000, 80, 40),
    );
    vi.spyOn(
      screen.getByRole("menu", { hidden: true }),
      "getBoundingClientRect",
    ).mockReturnValue(rect(0, 0, 192, 200));
    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    const menu = screen.getByRole("menu", { hidden: true });
    expect(menu.style.top).toBe(`${700 - 4 - 200}px`);
    expect(menu.style.left).toBe(`${window.innerWidth - 192 - 4}px`);
  });

  it("prop trigger menggantikan label dan id otomatis dibuat", () => {
    render(<DropdownMenu items={items} trigger={<span>More</span>} />);
    const button = screen.getByRole("button", { name: "More" });
    expect(button.getAttribute("popovertarget")).toBe(
      screen.getByRole("menu", { hidden: true }).id,
    );
    expect(screen.getByRole("menu", { hidden: true }).id).not.toBe("");
  });

  it("label default Options", () => {
    render(<DropdownMenu items={[]} />);
    expect(screen.getByRole("button", { name: "Options" })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("button"), { key: "ArrowDown" });
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("prop label menimpa label default", () => {
    render(<DropdownMenu items={[]} label="Opsi" />);
    expect(screen.getByRole("button", { name: "Opsi" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Options" })).toBeNull();
  });
});

describe("React Tooltip", () => {
  const renderTooltip = (side?: "top" | "bottom") =>
    render(
      <Tooltip content="Copy link" side={side} className="ms-2">
        <Button aria-describedby="other">Copy</Button>
      </Tooltip>,
    );
  const tooltip = () => screen.getByRole("tooltip", { hidden: true });

  it("pemicu diberi aria-describedby ke tooltip dan class user di akhir", () => {
    const { container } = renderTooltip();
    const button = screen.getByRole("button", { name: "Copy" });
    expect(tooltip()).toHaveAttribute("popover", "manual");
    expect(tooltip()).toHaveTextContent("Copy link");
    expect(button.getAttribute("aria-describedby")).toBe(
      `other ${tooltip().id}`,
    );
    expect(container.firstElementChild!.className.endsWith("ms-2")).toBe(true);
  });

  it("muncul saat fokus, hilang saat blur dan Escape", () => {
    renderTooltip();
    const button = screen.getByRole("button", { name: "Copy" });
    fireEvent.focus(button);
    expect(tooltip()).toHaveAttribute("data-state", "open");
    fireEvent.blur(button);
    expect(tooltip()).toHaveAttribute("data-state", "closed");

    fireEvent.focus(button);
    fireEvent.keyDown(document, { key: "Enter" });
    expect(tooltip()).toHaveAttribute("data-state", "open");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(tooltip()).toHaveAttribute("data-state", "closed");
  });

  it("hover menunggu 300ms sebelum muncul, mouseleave menyembunyikan", () => {
    vi.useFakeTimers();
    const { container } = renderTooltip();
    const root = container.firstElementChild!;
    fireEvent.mouseEnter(root);
    act(() => vi.advanceTimersByTime(299));
    expect(tooltip()).toHaveAttribute("data-state", "closed");
    act(() => vi.advanceTimersByTime(1));
    expect(tooltip()).toHaveAttribute("data-state", "open");
    fireEvent.mouseLeave(root);
    expect(tooltip()).toHaveAttribute("data-state", "closed");
  });

  it("posisi default di atas tengah, pindah ke bawah kalau tidak muat", () => {
    const { container } = renderTooltip();
    const root = container.firstElementChild as HTMLElement;
    const anchor = vi
      .spyOn(root, "getBoundingClientRect")
      .mockReturnValue(rect(100, 200, 100, 40));
    vi.spyOn(tooltip(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 60, 24),
    );
    fireEvent.focus(screen.getByRole("button"));
    expect(tooltip().style.top).toBe(`${100 - 6 - 24}px`);
    expect(tooltip().style.left).toBe(`${200 + 50 - 30}px`);
    fireEvent.blur(screen.getByRole("button"));

    anchor.mockReturnValue(rect(10, 200, 100, 40));
    fireEvent.focus(screen.getByRole("button"));
    expect(tooltip().style.top).toBe(`${10 + 40 + 6}px`);
  });

  it("side bottom menaruh tooltip di bawah pemicu", () => {
    const { container } = renderTooltip("bottom");
    vi.spyOn(
      container.firstElementChild as HTMLElement,
      "getBoundingClientRect",
    ).mockReturnValue(rect(100, 200, 100, 40));
    vi.spyOn(tooltip(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 60, 24),
    );
    fireEvent.focus(screen.getByRole("button"));
    expect(tooltip().style.top).toBe(`${100 + 40 + 6}px`);
  });
});

describe("React Drawer", () => {
  const renderDrawer = (side?: "left" | "right", onClose = vi.fn()) =>
    render(
      <Drawer
        title="Filter"
        side={side}
        trigger={<Button>Open</Button>}
        footer={
          <Button type="submit" value="ok">
            OK
          </Button>
        }
        onClose={onClose}
        className="max-w-md"
      >
        Drawer content
      </Drawer>,
    );

  it("tertutup di awal, diberi label dari judul, sisi kanan default", () => {
    renderDrawer();
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(dialog).not.toHaveAttribute("open");
    expect(dialog).toHaveClass("right-0", "border-l");
    expect(dialog.className.endsWith("max-w-md")).toBe(true);
    expect(
      document.getElementById(dialog.getAttribute("aria-labelledby")!),
    ).toHaveTextContent("Filter");
    expect(dialog.querySelectorAll('form[method="dialog"]')).toHaveLength(2);
  });

  it("side left memakai sisi kiri", () => {
    renderDrawer("left");
    expect(document.querySelector("dialog")).toHaveClass("left-0", "border-r");
  });

  it("pemicu membuka, close menutup dan memanggil onClose, klik backdrop menutup", async () => {
    const onClose = vi.fn();
    renderDrawer("right", onClose);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");

    fireEvent.click(screen.getByText("Drawer content"));
    expect(dialog).toHaveAttribute("open");

    fireEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(onClose).toHaveBeenCalled();
  });

  it("tombol tutup berlabel Close secara default dan closeLabel menimpanya", () => {
    const { unmount } = renderDrawer();
    expect(
      screen.getByRole("button", { name: "Close", hidden: true }),
    ).toBeInTheDocument();
    unmount();

    render(
      <Drawer title="Filter" closeLabel="Tutup">
        Drawer content
      </Drawer>,
    );
    expect(
      screen.getByRole("button", { name: "Tutup", hidden: true }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Close", hidden: true }),
    ).toBeNull();
  });
});

describe("React DropdownMenu href aman", () => {
  const unsafe = ["javascript:alert(1)", " JaVaScRiPt:x", "data:text/html,x"];
  const safe = ["/a", "https://x.id", "mailto:a@b.c", "#top"];

  it("skema berbahaya menjadi # dan href aman tetap", () => {
    const hrefs = [...unsafe, ...safe];
    const { container } = render(
      <DropdownMenu
        items={hrefs.map((href, index) => ({ label: `Item ${index}`, href }))}
      />,
    );
    const links = [...container.querySelectorAll("a")];
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      ...unsafe.map(() => "#"),
      ...safe,
    ]);
  });
});
