import {
  Component,
  provideZonelessChangeDetection,
  type Type,
} from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from "@angular/platform-browser/testing";
import { fireEvent, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { AlertDialog } from "../../components/alert-dialog/alert-dialog.component";
import { Button } from "../../components/button/button.component";
import { Drawer } from "../../components/drawer/drawer.component";
import { Tooltip } from "../../components/tooltip/tooltip.component";

// jsdom has no Popover API yet: a small polyfill that toggles and dispatches toggle like a browser.
const shownPopovers = new WeakSet<HTMLElement>();
function setPopover(element: HTMLElement, open: boolean) {
  if (shownPopovers.has(element) === open) return;
  if (open) shownPopovers.add(element);
  else shownPopovers.delete(element);
  const states = {
    newState: open ? "open" : "closed",
    oldState: open ? "closed" : "open",
  };
  element.dispatchEvent(Object.assign(new Event("toggle"), states));
}

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  const native: Partial<HTMLElement> = HTMLElement.prototype;
  if (typeof native.showPopover === "function") return;
  HTMLElement.prototype.showPopover = function showPopover() {
    setPopover(this, true);
  };
  HTMLElement.prototype.hidePopover = function hidePopover() {
    setPopover(this, false);
  };
});

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

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

@Component({
  imports: [AlertDialog, Button],
  template: `
    <markas-alert-dialog
      title="Delete account?"
      variant="danger"
      cancelLabel="Batal"
      actionLabel="Hapus"
      class="max-w-sm"
      (action)="actions = actions + 1"
      (cancelled)="cancels = cancels + 1"
    >
      <button markas-button trigger variant="danger">Delete account</button>
      This cannot be undone.
    </markas-alert-dialog>
    <markas-alert-dialog title="Publish?" id="publish"
      >Body</markas-alert-dialog
    >
  `,
})
class AlertDialogHost {
  actions = 0;
  cancels = 0;
}

@Component({
  imports: [Button, Drawer],
  template: `
    <markas-drawer
      title="Filter"
      closeLabel="Tutup"
      class="max-w-md"
      (closed)="closed = closed + 1"
    >
      <button markas-button trigger>Open</button>
      <p>Drawer content</p>
      <ng-container footer>
        <button markas-button type="submit" value="ok">OK</button>
      </ng-container>
    </markas-drawer>
    <markas-drawer title="Menu" side="left" id="menu">Links</markas-drawer>
  `,
})
class DrawerHost {
  closed = 0;
}

@Component({
  imports: [Tooltip],
  template: `
    <markas-tooltip content="Copy link" class="ms-2" data-testid="root">
      <button aria-describedby="other">Copy</button>
    </markas-tooltip>
    <markas-tooltip content="Hint" side="bottom" id="hint">
      <button>Help</button>
    </markas-tooltip>
  `,
})
class TooltipHost {}

describe("Angular AlertDialog", () => {
  it("opens from the trigger with focus on cancel and translated labels", async () => {
    const fixture = await mount(AlertDialogHost);
    const dialog = document.querySelector<HTMLDialogElement>(
      "dialog[role=alertdialog]",
    )!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(dialog.classList).toContain("max-w-sm");
    expect(dialog.closest("markas-alert-dialog")).not.toHaveAttribute("title");

    await userEvent.click(
      screen.getByRole("button", { name: "Delete account" }),
    );
    await fixture.whenStable();
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("alertdialog", { name: "Delete account?" })).toBe(
      dialog,
    );
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
    expect(screen.getByRole("button", { name: "Batal" })).toHaveFocus();
    expect(screen.getByRole("button", { name: "Hapus" }).classList).toContain(
      "bg-danger",
    );
  });

  it("emits action for the action value and cancelled for anything else", async () => {
    const fixture = await mount(AlertDialogHost);
    const dialog = document.querySelector<HTMLDialogElement>(
      "dialog[role=alertdialog]",
    )!;
    dialog.showModal();
    dialog.close("action");
    await fixture.whenStable();
    expect(fixture.componentInstance.actions).toBe(1);

    dialog.showModal();
    dialog.returnValue = "";
    dialog.close();
    await fixture.whenStable();
    expect(fixture.componentInstance.cancels).toBe(1);
    expect(dialog.returnValue).toBe("cancel");
    expect(dialog).toHaveAttribute("data-state", "closed");
  });

  it("keeps an explicit id, uses default labels, ignores backdrop clicks", async () => {
    await mount(AlertDialogHost);
    const dialog = document.getElementById("publish") as HTMLDialogElement;
    expect(dialog.tagName).toBe("DIALOG");
    expect(dialog).toHaveAttribute("aria-labelledby", "publish-title");
    expect(dialog).toHaveAttribute("aria-describedby", "publish-description");
    expect(dialog.querySelector("button[value=cancel]")).toHaveTextContent(
      "Cancel",
    );
    expect(dialog.querySelector("button[value=action]")).toHaveTextContent(
      "Continue",
    );
    dialog.showModal();
    await userEvent.click(dialog);
    expect(dialog).toHaveAttribute("open");
  });
});

describe("Angular Drawer", () => {
  it("opens from the trigger, closes on the backdrop, and emits closed", async () => {
    const fixture = await mount(DrawerHost);
    const dialog = document.querySelector<HTMLDialogElement>("dialog")!;
    expect(dialog.classList).toContain("right-0");
    expect(dialog.classList).toContain("max-w-md");
    expect(dialog.id).toMatch(/^markas-drawer-/);

    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await fixture.whenStable();
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("dialog", { name: "Filter" })).toBe(dialog);
    expect(screen.getByRole("button", { name: "Tutup" })).toBeInTheDocument();
    expect(dialog.querySelector("form[hidden]")).toBeNull();

    await userEvent.click(dialog);
    await fixture.whenStable();
    expect(dialog).not.toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(fixture.componentInstance.closed).toBe(1);
  });

  it("side left, explicit id, default close label, hidden empty footer", async () => {
    await mount(DrawerHost);
    const dialog = document.getElementById("menu")!;
    expect(dialog.tagName).toBe("DIALOG");
    expect(dialog.classList).toContain("left-0");
    expect(dialog.classList).toContain("border-r");
    expect(dialog.closest("markas-drawer")).not.toHaveAttribute("id");
    expect(dialog.querySelector("button[aria-label=Close]")).not.toBeNull();
    expect(dialog.querySelectorAll("form")[1]).toHaveAttribute("hidden");
  });
});

describe("Angular Tooltip", () => {
  const tooltip = () =>
    screen.getAllByRole("tooltip", { hidden: true })[0] as HTMLElement;
  const button = () => screen.getByRole("button", { name: "Copy" });

  it("describes the trigger, keeps class on the host, moves id to the tooltip", async () => {
    await mount(TooltipHost);
    expect(tooltip()).toHaveAttribute("popover", "manual");
    expect(tooltip()).toHaveTextContent("Copy link");
    expect(tooltip().id).toMatch(/^markas-tooltip-/);
    expect(button().getAttribute("aria-describedby")).toBe(
      `other ${tooltip().id}`,
    );
    const root = screen.getByTestId("root");
    expect(root.classList).toContain("inline-flex");
    expect(root.classList).toContain("ms-2");
    const hint = document.getElementById("hint")!;
    expect(hint).toHaveAttribute("role", "tooltip");
    expect(hint.closest("markas-tooltip")).not.toHaveAttribute("id");
  });

  it("shows on focus, hides on blur and Escape", async () => {
    const fixture = await mount(TooltipHost);
    fireEvent.focusIn(button());
    await fixture.whenStable();
    expect(tooltip()).toHaveAttribute("data-state", "open");
    fireEvent.focusOut(button());
    await fixture.whenStable();
    expect(tooltip()).toHaveAttribute("data-state", "closed");

    fireEvent.focusIn(button());
    fireEvent.keyDown(document, { key: "Escape" });
    await fixture.whenStable();
    expect(tooltip()).toHaveAttribute("data-state", "closed");
  });

  it("waits 300ms on hover and hides on mouseleave", async () => {
    const fixture = await mount(TooltipHost);
    vi.useFakeTimers();
    const root = screen.getByTestId("root");
    fireEvent.mouseEnter(root);
    vi.advanceTimersByTime(299);
    expect(tooltip()).toHaveAttribute("data-state", "closed");
    vi.advanceTimersByTime(1);
    vi.useRealTimers();
    await fixture.whenStable();
    expect(tooltip()).toHaveAttribute("data-state", "open");
    fireEvent.mouseLeave(root);
    await fixture.whenStable();
    expect(tooltip()).toHaveAttribute("data-state", "closed");
  });

  it("places above by default and flips below when there is no room", async () => {
    await mount(TooltipHost);
    const anchor = vi
      .spyOn(screen.getByTestId("root"), "getBoundingClientRect")
      .mockReturnValue(rect(100, 200, 100, 40));
    vi.spyOn(tooltip(), "getBoundingClientRect").mockReturnValue(
      rect(0, 0, 60, 24),
    );
    fireEvent.focusIn(button());
    expect(tooltip().style.top).toBe(`${100 - 6 - 24}px`);
    expect(tooltip().style.left).toBe(`${200 + 50 - 30}px`);
    fireEvent.focusOut(button());

    anchor.mockReturnValue(rect(10, 200, 100, 40));
    fireEvent.focusIn(button());
    expect(tooltip().style.top).toBe(`${10 + 40 + 6}px`);
  });
});
