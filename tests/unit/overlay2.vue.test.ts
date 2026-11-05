import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import AlertDialog from "../../components/alert-dialog/AlertDialog.vue";
import HoverCard from "../../components/hover-card/HoverCard.vue";
import Popover from "../../components/popover/Popover.vue";

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

describe("Vue AlertDialog", () => {
  const renderDialog = (props: Record<string, unknown> = {}) =>
    render(AlertDialog, {
      props: { title: "Delete account?", ...props },
      attrs: { class: "max-w-sm" },
      slots: {
        default: "This cannot be undone.",
        trigger: '<button type="button">Delete</button>',
      },
    });
  const dialog = () => document.querySelector("dialog")!;
  const open = () =>
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

  it("role alertdialog, diberi label dan deskripsi, class user di akhir", () => {
    renderDialog();
    expect(dialog()).toHaveAttribute("role", "alertdialog");
    expect(dialog()).toHaveAttribute("data-state", "closed");
    expect(
      document.getElementById(dialog().getAttribute("aria-labelledby")!),
    ).toHaveTextContent("Delete account?");
    expect(
      document.getElementById(dialog().getAttribute("aria-describedby")!),
    ).toHaveTextContent("This cannot be undone.");
    expect(dialog().className.endsWith("max-w-sm")).toBe(true);
  });

  it("label default Cancel dan Continue, aksi default primary", () => {
    renderDialog();
    const cancel = screen.getByRole("button", { name: "Cancel", hidden: true });
    const action = screen.getByRole("button", {
      name: "Continue",
      hidden: true,
    });
    expect(cancel).toHaveAttribute("value", "cancel");
    expect(action).toHaveAttribute("value", "action");
    expect(action).toHaveClass("bg-primary");
  });

  it("cancelLabel, actionLabel, dan variant danger menimpa default", () => {
    renderDialog({
      cancelLabel: "Batal",
      actionLabel: "Hapus",
      variant: "danger",
    });
    expect(
      screen.getByRole("button", { name: "Batal", hidden: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Hapus", hidden: true }),
    ).toHaveClass("bg-danger");
  });

  it("pemicu membuka dialog, fokus di tombol batal, backdrop tidak menutup", async () => {
    renderDialog();
    await open();
    expect(dialog()).toHaveAttribute("open");
    expect(dialog()).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
    await fireEvent.click(dialog());
    expect(dialog()).toHaveAttribute("open");
  });

  it("returnValue action memancarkan action, selain itu memancarkan cancel", async () => {
    const { emitted } = renderDialog();
    await open();
    dialog().close("action");
    await waitFor(() => expect(emitted().action).toHaveLength(1));
    expect(emitted().cancel).toBeUndefined();
    await nextTick();
    expect(dialog()).toHaveAttribute("data-state", "closed");

    await open();
    expect(dialog().returnValue).toBe("");
    dialog().close();
    await waitFor(() => expect(emitted().cancel).toHaveLength(1));
    expect(dialog().returnValue).toBe("cancel");
    expect(emitted().action).toHaveLength(1);
  });
});

describe("Vue Popover", () => {
  const renderPopover = (props: Record<string, unknown> = {}) =>
    render(Popover, {
      props: { id: "share", label: "Share", ...props },
      attrs: { class: "ms-auto" },
      slots: {
        default: '<p>Share project</p><button type="button">Copy link</button>',
      },
    });
  const trigger = () => screen.getByRole("button", { name: "Share" });
  const panel = () => screen.getByRole("dialog", { hidden: true });

  it("menghubungkan pemicu dan panel, class user di akhir", () => {
    const { container } = renderPopover();
    expect(trigger()).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).toHaveAttribute("popovertarget", "share");
    expect(trigger()).toHaveAttribute("aria-controls", "share");
    expect(panel()).toHaveAttribute("popover", "auto");
    expect(panel()).toHaveAttribute("aria-labelledby", "share-trigger");
    expect(container.firstElementChild!.className.endsWith("ms-auto")).toBe(
      true,
    );
  });

  it("label default Open dan slot trigger menggantikan label", () => {
    const { unmount } = render(Popover, { slots: { default: "Body" } });
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    unmount();
    render(Popover, {
      slots: { default: "Body", trigger: "<span>Settings</span>" },
    });
    const button = screen.getByRole("button", { name: "Settings" });
    expect(button.getAttribute("popovertarget")).toBe(
      screen.getByRole("dialog", { hidden: true }).id,
    );
  });

  it("membuka memindahkan fokus ke elemen pertama, Escape menutup dan fokus ke pemicu", async () => {
    renderPopover();
    panel().showPopover();
    await nextTick();
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(panel()).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("button", { name: "Copy link" })).toHaveFocus();

    await fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(panel()).toHaveAttribute("data-state", "closed");
    expect(trigger()).toHaveFocus();
  });

  it("light dismiss: fokus di body kembali ke pemicu", () => {
    renderPopover();
    panel().showPopover();
    (document.activeElement as HTMLElement).blur();
    panel().hidePopover();
    expect(trigger()).toHaveFocus();
  });

  it("posisi: bawah rata awal, flip ke atas, side top align end", async () => {
    const { unmount } = renderPopover();
    vi.spyOn(trigger(), "getBoundingClientRect").mockReturnValue(
      rect(100, 50, 80, 40),
    );
    vi.spyOn(panel(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 288, 120),
    );
    panel().showPopover();
    expect(panel().style.top).toBe(`${100 + 40 + 4}px`);
    expect(panel().style.left).toBe("50px");
    panel().hidePopover();
    vi.spyOn(trigger(), "getBoundingClientRect").mockReturnValue(
      rect(window.innerHeight - 50, 50, 80, 40),
    );
    panel().showPopover();
    expect(panel().style.top).toBe(`${window.innerHeight - 50 - 4 - 120}px`);
    unmount();

    renderPopover({ side: "top", align: "end" });
    vi.spyOn(trigger(), "getBoundingClientRect").mockReturnValue(
      rect(300, 400, 80, 40),
    );
    vi.spyOn(panel(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 288, 120),
    );
    panel().showPopover();
    expect(panel().style.top).toBe(`${300 - 4 - 120}px`);
    expect(panel().style.left).toBe(`${480 - 288}px`);
  });
});

describe("Vue HoverCard", () => {
  const renderCard = () =>
    render(HoverCard, {
      props: { id: "profile" },
      attrs: { class: "ms-1" },
      slots: {
        default: '<a href="/markasui">@markasui</a>',
        content: "<span>Markas UI profile</span>",
      },
    });
  const link = () => screen.getByRole("link", { name: "@markasui" });
  const card = () => document.getElementById("profile")!;

  it("popover manual, pemicu diberi aria-describedby, class user di akhir", () => {
    const { container } = renderCard();
    expect(card()).toHaveAttribute("popover", "manual");
    expect(card()).toHaveAttribute("data-state", "closed");
    expect(link()).toHaveAttribute("aria-describedby", "profile");
    expect(link()).toHaveAccessibleDescription("Markas UI profile");
    expect(container.firstElementChild!.className.endsWith("ms-1")).toBe(true);
  });

  it("hover menunggu 400ms, mouse keluar menyembunyikan", async () => {
    vi.useFakeTimers();
    const { container } = renderCard();
    const root = container.firstElementChild as HTMLElement;
    await fireEvent.mouseEnter(root);
    vi.advanceTimersByTime(399);
    await nextTick();
    expect(card()).toHaveAttribute("data-state", "closed");
    vi.advanceTimersByTime(1);
    await nextTick();
    expect(card()).toHaveAttribute("data-state", "open");

    await fireEvent.mouseLeave(root);
    vi.advanceTimersByTime(200);
    await nextTick();
    expect(card()).toHaveAttribute("data-state", "closed");
  });

  it("fokus menampilkan langsung, blur dan Escape menyembunyikan", async () => {
    renderCard();
    link().focus();
    await nextTick();
    expect(card()).toHaveAttribute("data-state", "open");
    link().blur();
    await nextTick();
    expect(card()).toHaveAttribute("data-state", "closed");

    link().focus();
    await fireEvent.keyDown(document, { key: "Escape" });
    expect(card()).toHaveAttribute("data-state", "closed");
  });

  it("kartu di bawah tengah pemicu, pindah ke atas kalau tidak muat", () => {
    const { container } = renderCard();
    const root = container.firstElementChild as HTMLElement;
    vi.spyOn(root, "getBoundingClientRect").mockReturnValue(
      rect(100, 200, 80, 20),
    );
    vi.spyOn(card(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 288, 100),
    );
    link().focus();
    expect(card().style.top).toBe(`${100 + 20 + 8}px`);
    expect(card().style.left).toBe(`${240 - 144}px`);
    link().blur();
    vi.spyOn(root, "getBoundingClientRect").mockReturnValue(
      rect(window.innerHeight - 30, 200, 80, 20),
    );
    link().focus();
    expect(card().style.top).toBe(`${window.innerHeight - 30 - 8 - 100}px`);
  });
});
