import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { AlertDialog } from "../../components/alert-dialog/AlertDialog";
import { Button } from "../../components/button/Button";
import { HoverCard } from "../../components/hover-card/HoverCard";
import { Popover } from "../../components/popover/Popover";

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

describe("React AlertDialog", () => {
  const renderDialog = (
    props: Partial<Parameters<typeof AlertDialog>[0]> = {},
  ) =>
    render(
      <AlertDialog
        title="Delete account?"
        trigger={<Button>Delete</Button>}
        className="max-w-sm"
        {...props}
      >
        This cannot be undone.
      </AlertDialog>,
    );
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
    expect(cancel.closest("form")).toHaveAttribute("method", "dialog");
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

  it("pemicu membuka dialog dan fokus awal di tombol batal", () => {
    renderDialog();
    open();
    expect(dialog()).toHaveAttribute("open");
    expect(dialog()).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
  });

  it("klik backdrop tidak menutup dialog", () => {
    renderDialog();
    open();
    fireEvent.click(dialog());
    expect(dialog()).toHaveAttribute("open");
  });

  it("returnValue action memanggil onAction, selain itu memanggil onCancel", async () => {
    const onAction = vi.fn();
    const onCancel = vi.fn();
    const onClose = vi.fn();
    renderDialog({ onAction, onCancel, onClose });

    open();
    act(() => dialog().close("action"));
    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1));
    expect(onCancel).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(dialog()).toHaveAttribute("data-state", "closed");

    open();
    expect(dialog().returnValue).toBe("");
    act(() => dialog().close());
    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
    expect(dialog().returnValue).toBe("cancel");
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe("React Popover", () => {
  const renderPopover = (props: Partial<Parameters<typeof Popover>[0]> = {}) =>
    render(
      <Popover id="share" label="Share" className="ms-auto" {...props}>
        <p>Share project</p>
        <button type="button">Copy link</button>
      </Popover>,
    );
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
    expect(panel()).toHaveAttribute("data-state", "closed");
    expect(container.firstElementChild!.className.endsWith("ms-auto")).toBe(
      true,
    );
  });

  it("label default Open dan prop trigger menggantikan label", () => {
    const { unmount } = render(<Popover>Body</Popover>);
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    unmount();
    render(<Popover trigger={<span>Settings</span>}>Body</Popover>);
    const button = screen.getByRole("button", { name: "Settings" });
    expect(button.getAttribute("popovertarget")).toBe(
      screen.getByRole("dialog", { hidden: true }).id,
    );
  });

  it("membuka memindahkan fokus ke elemen pertama, Escape menutup dan fokus ke pemicu", () => {
    renderPopover();
    act(() => panel().showPopover());
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(panel()).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("button", { name: "Copy link" })).toHaveFocus();

    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(panel()).toHaveAttribute("data-state", "closed");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).toHaveFocus();
  });

  it("light dismiss: fokus di body kembali ke pemicu", () => {
    renderPopover();
    act(() => panel().showPopover());
    (document.activeElement as HTMLElement).blur();
    act(() => panel().hidePopover());
    expect(trigger()).toHaveFocus();
  });

  it("side bottom align start secara default, flip ke atas kalau tidak muat", () => {
    renderPopover();
    vi.spyOn(trigger(), "getBoundingClientRect").mockReturnValue(
      rect(100, 50, 80, 40),
    );
    vi.spyOn(panel(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 288, 120),
    );
    act(() => panel().showPopover());
    expect(panel().style.top).toBe(`${100 + 40 + 4}px`);
    expect(panel().style.left).toBe("50px");

    act(() => panel().hidePopover());
    vi.spyOn(trigger(), "getBoundingClientRect").mockReturnValue(
      rect(window.innerHeight - 50, 50, 80, 40),
    );
    act(() => panel().showPopover());
    expect(panel().style.top).toBe(`${window.innerHeight - 50 - 4 - 120}px`);
  });

  it("side top dan align end/center", () => {
    const { unmount } = renderPopover({ side: "top", align: "end" });
    vi.spyOn(trigger(), "getBoundingClientRect").mockReturnValue(
      rect(300, 400, 80, 40),
    );
    vi.spyOn(panel(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 288, 120),
    );
    act(() => panel().showPopover());
    expect(panel().style.top).toBe(`${300 - 4 - 120}px`);
    expect(panel().style.left).toBe(`${480 - 288}px`);
    unmount();

    renderPopover({ align: "center" });
    vi.spyOn(trigger(), "getBoundingClientRect").mockReturnValue(
      rect(300, 400, 80, 40),
    );
    vi.spyOn(panel(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 288, 120),
    );
    act(() => panel().showPopover());
    expect(panel().style.left).toBe(`${440 - 144}px`);
  });
});

describe("React HoverCard", () => {
  const renderCard = () =>
    render(
      <HoverCard
        id="profile"
        className="ms-1"
        content={<span>Markas UI profile</span>}
      >
        <a href="/markasui">@markasui</a>
      </HoverCard>,
    );
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

  it("hover menunggu 400ms, mouse keluar menyembunyikan", () => {
    vi.useFakeTimers();
    renderCard();
    fireEvent.mouseEnter(link());
    act(() => vi.advanceTimersByTime(399));
    expect(card()).toHaveAttribute("data-state", "closed");
    act(() => vi.advanceTimersByTime(1));
    expect(card()).toHaveAttribute("data-state", "open");

    fireEvent.mouseLeave(link());
    act(() => vi.advanceTimersByTime(200));
    expect(card()).toHaveAttribute("data-state", "closed");
  });

  it("fokus menampilkan langsung, blur dan Escape menyembunyikan", () => {
    renderCard();
    act(() => link().focus());
    expect(card()).toHaveAttribute("data-state", "open");
    act(() => link().blur());
    expect(card()).toHaveAttribute("data-state", "closed");

    act(() => link().focus());
    fireEvent.keyDown(document, { key: "Escape" });
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
    act(() => link().focus());
    expect(card().style.top).toBe(`${100 + 20 + 8}px`);
    expect(card().style.left).toBe(`${240 - 144}px`);

    act(() => link().blur());
    vi.spyOn(root, "getBoundingClientRect").mockReturnValue(
      rect(window.innerHeight - 30, 200, 80, 20),
    );
    act(() => link().focus());
    expect(card().style.top).toBe(`${window.innerHeight - 30 - 8 - 100}px`);
  });
});
