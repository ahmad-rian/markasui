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
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { HoverCard } from "../../components/hover-card/hover-card.component";
import { Popover } from "../../components/popover/popover.component";

// jsdom has no Popover API yet. Small polyfill: track state and fire beforetoggle and toggle like a browser.
const shownPopovers = new WeakSet<HTMLElement>();
function setPopover(element: HTMLElement, open: boolean) {
  if (shownPopovers.has(element) === open) return;
  if (open) shownPopovers.add(element);
  else shownPopovers.delete(element);
  // jsdom hides [popover] with display: none, which also blocks focus().
  element.style.display = open ? "block" : "";
  const states = {
    newState: open ? "open" : "closed",
    oldState: open ? "closed" : "open",
  };
  element.dispatchEvent(Object.assign(new Event("beforetoggle"), states));
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

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

@Component({
  imports: [Popover],
  template: `
    <markas-popover>Body</markas-popover>
    <markas-popover id="share" class="ml-2" align="end">
      <ng-container trigger>
        <span class="sr-only">Notification settings</span>
      </ng-container>
      <button type="button">Copy link</button>
    </markas-popover>
  `,
})
class PopoverHost {}

@Component({
  imports: [HoverCard],
  template: `
    <markas-hover-card class="ml-2">
      <a href="https://github.com/markasui" aria-describedby="note"
        >&#64;markasui</a
      >
      <span content>MarkasUI preview</span>
    </markas-hover-card>
    <markas-hover-card id="card">
      <a href="/profile">Profile</a>
      <span content>Preview</span>
    </markas-hover-card>
    <p id="note">Note</p>
  `,
})
class HoverCardHost {}

describe("Angular Popover", () => {
  it("links the trigger to a labelled dialog panel with a generated id and default label", async () => {
    await mount(PopoverHost);
    const trigger = screen.getByRole("button", { name: "Open" });
    const panel = document.getElementById(
      trigger.getAttribute("aria-controls")!,
    )!;
    expect(panel.id).toMatch(/^markas-popover-/);
    expect(panel.classList).toContain("w-72");
    expect(trigger.id).toBe(`${panel.id}-trigger`);
    expect(trigger).toHaveAttribute("popovertarget", panel.id);
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("popover", "auto");
    expect(panel).toHaveAttribute("role", "dialog");
    expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
    expect(panel).toHaveAttribute("data-state", "closed");
  });

  it("projects the trigger slot, moves id and class off the host", async () => {
    await mount(PopoverHost);
    const trigger = screen.getByRole("button", {
      name: "Notification settings",
    });
    expect(trigger.id).toBe("share-trigger");
    expect(trigger).not.toHaveTextContent("Open");
    const host = trigger.closest("markas-popover")!;
    expect(host).not.toHaveAttribute("id");
    const root = host.firstElementChild!;
    expect(root.classList).toContain("inline-block");
    expect(root.classList).toContain("ml-2");
  });

  it("opens, focuses the first focusable element, and Escape returns focus", async () => {
    const fixture = await mount(PopoverHost);
    const trigger = screen.getByRole("button", {
      name: "Notification settings",
    });
    const panel = document.getElementById("share")!;
    panel.showPopover();
    await fixture.whenStable();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(panel).toHaveAttribute("data-state", "open");
    expect(
      screen.getByRole("button", { name: "Copy link", hidden: true }),
    ).toHaveFocus();

    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    await fixture.whenStable();
    expect(panel).toHaveAttribute("data-state", "closed");
    expect(trigger).toHaveFocus();
  });
});

describe("Angular HoverCard", () => {
  it("describes the trigger with the card, keeping existing descriptions", async () => {
    await mount(HoverCardHost);
    const link = screen.getByRole("link", { name: "@markasui" });
    const card = link.nextElementSibling!;
    expect(card).toHaveAttribute("popover", "manual");
    expect(card.id).toMatch(/^markas-hover-card-/);
    expect(card.classList).toContain("shadow-overlay");
    expect(link).toHaveAttribute("aria-describedby", `note ${card.id}`);
    expect(card).toHaveTextContent("MarkasUI preview");
    expect(card).toHaveAttribute("data-state", "closed");
    expect(link.parentElement!.classList).toContain("ml-2");
    expect(link.closest("markas-hover-card")).not.toHaveAttribute(
      "class",
      "ml-2",
    );
  });

  it("shows on focus, hides on Escape, and waits before showing on hover", async () => {
    const fixture = await mount(HoverCardHost);
    const link = screen.getByRole("link", { name: "Profile" });
    const card = document.getElementById("card")!;
    expect(link).toHaveAttribute("aria-describedby", "card");
    expect(link.closest("markas-hover-card")).not.toHaveAttribute("id");

    link.focus();
    await fixture.whenStable();
    expect(card).toHaveAttribute("data-state", "open");
    fireEvent.keyDown(document, { key: "Escape" });
    await fixture.whenStable();
    expect(card).toHaveAttribute("data-state", "closed");

    vi.useFakeTimers();
    try {
      const root = link.parentElement!;
      root.dispatchEvent(new MouseEvent("mouseenter"));
      vi.advanceTimersByTime(399);
      expect(shownPopovers.has(card)).toBe(false);
      vi.advanceTimersByTime(1);
      expect(shownPopovers.has(card)).toBe(true);
      root.dispatchEvent(new MouseEvent("mouseleave"));
      vi.advanceTimersByTime(100);
      expect(shownPopovers.has(card)).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});
