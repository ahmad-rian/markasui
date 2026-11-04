import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Drawer from "../../components/drawer/Drawer.vue";
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.vue";
import Tooltip from "../../components/tooltip/Tooltip.vue";

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

describe("Vue DropdownMenu", () => {
  const items = [
    { label: "Ubah", value: "ubah" },
    { label: "Duplikat" },
    { label: "Arsipkan", value: "arsip", disabled: true },
    { separator: true as const },
    { label: "Bantuan", href: "/bantuan" },
    { label: "Hapus", value: "hapus", danger: true },
  ];
  const renderMenu = () =>
    render(DropdownMenu, {
      props: { id: "aksi", label: "Aksi", items },
      attrs: { class: "ms-auto" },
    });
  const trigger = () => screen.getByRole("button", { name: "Aksi" });
  const menu = () => screen.getByRole("menu", { hidden: true });
  const item = (name: string) =>
    screen.getByRole("menuitem", { name, hidden: true });
  const press = (key: string) =>
    fireEvent.keyDown(document.activeElement!, { key });

  it("menghubungkan pemicu dan panel menu, class user di akhir", () => {
    const { container } = renderMenu();
    expect(trigger()).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).toHaveAttribute("popovertarget", "aksi");
    expect(trigger()).toHaveAttribute("aria-controls", "aksi");
    expect(menu()).toHaveAttribute("popover", "auto");
    expect(menu()).toHaveAttribute("aria-labelledby", "aksi-trigger");
    expect(menu()).toHaveAttribute("data-state", "closed");
    expect(container.firstElementChild!.className.endsWith("ms-auto")).toBe(
      true,
    );
  });

  it("merender separator, link, item nonaktif, dan item danger", () => {
    renderMenu();
    expect(screen.getByRole("separator", { hidden: true })).toHaveClass(
      "bg-line",
    );
    expect(item("Bantuan").tagName).toBe("A");
    expect(item("Bantuan")).toHaveAttribute("href", "/bantuan");
    expect(item("Arsipkan")).toBeDisabled();
    expect(item("Hapus")).toHaveClass("text-danger");
  });

  it("panah bawah membuka dan fokus item pertama, navigasi melewati item nonaktif", async () => {
    renderMenu();
    await fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    expect(menu()).toHaveAttribute("data-state", "open");
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(item("Ubah")).toHaveFocus();

    await press("ArrowDown");
    expect(item("Duplikat")).toHaveFocus();
    await press("ArrowDown");
    expect(item("Bantuan")).toHaveFocus();
    await press("End");
    expect(item("Hapus")).toHaveFocus();
    await press("ArrowDown");
    expect(item("Ubah")).toHaveFocus();
    await press("ArrowUp");
    expect(item("Hapus")).toHaveFocus();
    await press("Home");
    expect(item("Ubah")).toHaveFocus();
    await press("a");
    expect(item("Ubah")).toHaveFocus();
  });

  it("panah atas membuka dan fokus item terakhir, panah saat terbuka memindah fokus", async () => {
    renderMenu();
    await fireEvent.keyDown(trigger(), { key: "ArrowUp" });
    expect(item("Hapus")).toHaveFocus();
    await fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    expect(item("Ubah")).toHaveFocus();
    await fireEvent.keyDown(trigger(), { key: "Enter" });
    expect(item("Ubah")).toHaveFocus();
  });

  it("Escape menutup dan mengembalikan fokus ke pemicu, Tab menutup menu", async () => {
    renderMenu();
    await fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    await press("Escape");
    expect(menu()).toHaveAttribute("data-state", "closed");
    expect(trigger()).toHaveFocus();

    await fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    await press("Tab");
    expect(menu()).toHaveAttribute("data-state", "closed");
  });

  it("memilih item memancarkan select dengan value atau label lalu menutup", async () => {
    const { emitted } = renderMenu();
    await fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    await fireEvent.click(item("Ubah"));
    await fireEvent.click(item("Duplikat"));
    expect(emitted().select).toEqual([["ubah"], ["Duplikat"]]);
    expect(menu()).toHaveAttribute("data-state", "closed");
    expect(trigger()).toHaveFocus();
  });

  it("menu pindah ke atas pemicu kalau di bawah tidak muat", async () => {
    renderMenu();
    vi.spyOn(trigger(), "getBoundingClientRect").mockReturnValue(
      rect(700, 1000, 80, 40),
    );
    vi.spyOn(menu(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 192, 200),
    );
    await fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    expect(menu().style.top).toBe(`${700 - 4 - 200}px`);
    expect(menu().style.left).toBe(`${window.innerWidth - 192 - 4}px`);
  });

  it("slot trigger menggantikan label dan id otomatis dibuat", () => {
    render(DropdownMenu, {
      props: { items },
      slots: { trigger: "<span>Lainnya</span>" },
    });
    const button = screen.getByRole("button", { name: "Lainnya" });
    expect(button.getAttribute("popovertarget")).toBe(menu().id);
    expect(menu().id).not.toBe("");
  });

  it("label default Opsi tanpa item tetap aman dibuka", async () => {
    render(DropdownMenu, { props: { items: [] } });
    const button = screen.getByRole("button", { name: "Opsi" });
    await fireEvent.keyDown(button, { key: "ArrowDown" });
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Vue Tooltip", () => {
  const renderTooltip = (side?: "top" | "bottom") =>
    render(Tooltip, {
      props: { content: "Salin tautan", ...(side ? { side } : {}) },
      attrs: { class: "ms-2" },
      slots: { default: '<button aria-describedby="lain">Salin</button>' },
    });
  const tooltip = () => screen.getByRole("tooltip", { hidden: true });
  const button = () => screen.getByRole("button", { name: "Salin" });

  it("pemicu diberi aria-describedby ke tooltip dan class user di akhir", () => {
    const { container } = renderTooltip();
    expect(tooltip()).toHaveAttribute("popover", "manual");
    expect(tooltip()).toHaveTextContent("Salin tautan");
    expect(button().getAttribute("aria-describedby")).toBe(
      `lain ${tooltip().id}`,
    );
    expect(container.firstElementChild!.className.endsWith("ms-2")).toBe(true);
  });

  it("muncul saat fokus, hilang saat blur dan Escape", async () => {
    renderTooltip();
    await fireEvent.focusIn(button());
    expect(tooltip()).toHaveAttribute("data-state", "open");
    await fireEvent.focusOut(button());
    expect(tooltip()).toHaveAttribute("data-state", "closed");

    await fireEvent.focusIn(button());
    await fireEvent.keyDown(document, { key: "Enter" });
    expect(tooltip()).toHaveAttribute("data-state", "open");
    await fireEvent.keyDown(document, { key: "Escape" });
    expect(tooltip()).toHaveAttribute("data-state", "closed");
  });

  it("hover menunggu 300ms sebelum muncul, mouseleave menyembunyikan", async () => {
    vi.useFakeTimers();
    const { container } = renderTooltip();
    const root = container.firstElementChild!;
    await fireEvent.mouseEnter(root);
    vi.advanceTimersByTime(299);
    await Promise.resolve();
    expect(tooltip()).toHaveAttribute("data-state", "closed");
    vi.advanceTimersByTime(1);
    await fireEvent.mouseMove(root);
    expect(tooltip()).toHaveAttribute("data-state", "open");
    await fireEvent.mouseLeave(root);
    expect(tooltip()).toHaveAttribute("data-state", "closed");
  });

  it("posisi default di atas tengah, pindah ke bawah kalau tidak muat", async () => {
    const { container } = renderTooltip();
    const anchor = vi
      .spyOn(
        container.firstElementChild as HTMLElement,
        "getBoundingClientRect",
      )
      .mockReturnValue(rect(100, 200, 100, 40));
    vi.spyOn(tooltip(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 60, 24),
    );
    await fireEvent.focusIn(button());
    expect(tooltip().style.top).toBe(`${100 - 6 - 24}px`);
    expect(tooltip().style.left).toBe(`${200 + 50 - 30}px`);
    await fireEvent.focusOut(button());

    anchor.mockReturnValue(rect(10, 200, 100, 40));
    await fireEvent.focusIn(button());
    expect(tooltip().style.top).toBe(`${10 + 40 + 6}px`);
  });

  it("side bottom menaruh tooltip di bawah pemicu", async () => {
    const { container } = renderTooltip("bottom");
    vi.spyOn(
      container.firstElementChild as HTMLElement,
      "getBoundingClientRect",
    ).mockReturnValue(rect(100, 200, 100, 40));
    vi.spyOn(tooltip(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 60, 24),
    );
    await fireEvent.focusIn(button());
    expect(tooltip().style.top).toBe(`${100 + 40 + 6}px`);
  });
});

describe("Vue Drawer", () => {
  const renderDrawer = (side?: "left" | "right") =>
    render(Drawer, {
      props: { title: "Filter", ...(side ? { side } : {}) },
      attrs: { class: "max-w-md" },
      slots: {
        trigger: "<button>Buka</button>",
        default: "<p>Isi drawer</p>",
        footer: '<button type="submit">OK</button>',
      },
    });

  it("tertutup di awal, diberi label dari judul, sisi kanan default", () => {
    renderDrawer();
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
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

  it("pemicu membuka, close menutup, klik backdrop menutup", async () => {
    renderDrawer();
    await fireEvent.click(screen.getByRole("button", { name: "Buka" }));
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");

    await fireEvent.click(screen.getByText("Isi drawer"));
    expect(dialog).toHaveAttribute("open");

    await fireEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "closed");
  });
});

describe("Vue DropdownMenu href aman", () => {
  const unsafe = ["javascript:alert(1)", " JaVaScRiPt:x", "data:text/html,x"];
  const safe = ["/a", "https://x.id", "mailto:a@b.c", "#top"];

  it("skema berbahaya menjadi # dan href aman tetap", () => {
    const hrefs = [...unsafe, ...safe];
    const { container } = render(DropdownMenu, {
      props: {
        items: hrefs.map((href, index) => ({ label: `Item ${index}`, href })),
      },
    });
    const links = [...container.querySelectorAll("a")];
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      ...unsafe.map(() => "#"),
      ...safe,
    ]);
  });
});
