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
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { ContextMenu } from "../../components/context-menu/context-menu.component";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";

// jsdom has no Popover API yet. Small polyfill: show the element and fire beforetoggle and toggle like a browser.
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

const menuItems = [
  { label: "Edit", value: "edit" },
  { label: "Docs", href: "javascript:alert(1)" },
  { label: "Archive", value: "archive", disabled: true },
  { separator: true as const },
  { label: "Delete", value: "delete", danger: true },
];

@Component({
  imports: [DropdownMenu],
  template: `
    <markas-dropdown-menu
      [items]="items"
      class="ml-2"
      (selected)="chosen = $event"
    />
    <markas-dropdown-menu id="project" [items]="items">
      <ng-container trigger>Project</ng-container>
    </markas-dropdown-menu>
  `,
})
class DropdownHost {
  readonly items = menuItems;
  chosen = "";
}

@Component({
  imports: [ContextMenu],
  template: `
    <markas-context-menu
      id="files"
      aria-label="Report.pdf"
      class="mt-1"
      menuLabel="Menu konteks"
      hintLabel="Tekan Shift+F10"
      [items]="items"
      (selected)="chosen = $event"
    >
      <p>Right-click here</p>
    </markas-context-menu>
    <markas-context-menu [items]="items">Plain</markas-context-menu>
  `,
})
class ContextHost {
  readonly items = menuItems;
  chosen = "";
}

describe("Angular DropdownMenu", () => {
  it("links trigger and menu, moves id to the menu and class to the root", async () => {
    await mount(DropdownHost);
    const trigger = screen.getByRole("button", { name: "Options" });
    const menu = document.getElementById(
      trigger.getAttribute("aria-controls")!,
    )!;
    expect(menu.id).toMatch(/^markas-dropdown-menu-/);
    expect(menu.classList).toContain("shadow-overlay");
    expect(trigger.id).toBe(`${menu.id}-trigger`);
    expect(trigger).toHaveAttribute("popovertarget", menu.id);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveAttribute("role", "menu");
    expect(menu).toHaveAttribute("aria-labelledby", trigger.id);
    expect(trigger.parentElement!.classList).toContain("ml-2");
    expect(trigger.parentElement!.classList).toContain("inline-block");
    expect(menu.querySelector("a")).toHaveAttribute("href", "#");
    expect(menu.querySelector("button[disabled]")).toHaveTextContent("Archive");

    const project = screen.getByRole("button", { name: "Project" });
    expect(project.id).toBe("project-trigger");
    expect(project.closest("markas-dropdown-menu")).not.toHaveAttribute("id");
  });

  it("opens with arrows, moves focus, selects, and emits the value", async () => {
    const fixture = await mount(DropdownHost);
    const trigger = screen.getByRole("button", { name: "Options" });
    const menu = document.getElementById(
      trigger.getAttribute("aria-controls")!,
    )!;
    const item = (name: string) =>
      [...menu.querySelectorAll<HTMLElement>("[role=menuitem]")].find(
        (el) => el.textContent?.trim() === name,
      )!;

    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    await fixture.whenStable();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveAttribute("data-state", "open");
    expect(item("Edit")).toHaveFocus();
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(item("Delete")).toHaveFocus();
    fireEvent.keyDown(menu, { key: "Home" });
    expect(item("Edit")).toHaveFocus();

    await userEvent.click(item("Delete"));
    await fixture.whenStable();
    expect(fixture.componentInstance.chosen).toBe("delete");
    expect(menu).toHaveAttribute("data-state", "closed");
    expect(trigger).toHaveFocus();
  });
});

describe("Angular ContextMenu", () => {
  it("moves aria-label and class to the area and id to the menu", async () => {
    await mount(ContextHost);
    const area = screen.getByRole("group", { name: "Report.pdf" });
    expect(area).toHaveAttribute("tabindex", "0");
    expect(area).toHaveAttribute("aria-describedby", "files-hint");
    expect(area.classList).toContain("mt-1");
    expect(area.classList).toContain("rounded-lg");
    const host = area.closest("markas-context-menu")!;
    expect(host).not.toHaveAttribute("id");
    expect(host).not.toHaveAttribute("aria-label");
    expect(document.getElementById("files-hint")).toHaveTextContent(
      "Tekan Shift+F10",
    );
    expect(document.getElementById("files")).toHaveAttribute(
      "aria-label",
      "Menu konteks",
    );

    const plain = screen.getByText("Plain");
    expect(plain.getAttribute("aria-describedby")).toMatch(
      /^markas-context-menu-\d+-hint$/,
    );
    expect(
      document.getElementById(plain.getAttribute("aria-describedby")!),
    ).toHaveTextContent("Press Shift+F10 to open the context menu");
  });

  it("opens with Shift+F10, closes with Escape, and emits the selected value", async () => {
    const fixture = await mount(ContextHost);
    const area = screen.getByRole("group", { name: "Report.pdf" });
    const menu = document.getElementById("files")!;
    expect(menu.classList).toContain("shadow-overlay");
    const edit = menu.querySelector<HTMLElement>("[role=menuitem]")!;

    area.focus();
    fireEvent.keyDown(area, { key: "F10", shiftKey: true });
    await fixture.whenStable();
    expect(menu).toHaveAttribute("data-state", "open");
    expect(area).toHaveAttribute("data-state", "open");
    expect(edit).toHaveFocus();

    fireEvent.keyDown(menu, { key: "Escape" });
    await fixture.whenStable();
    expect(menu).toHaveAttribute("data-state", "closed");
    expect(area).toHaveFocus();

    fireEvent.contextMenu(area, { clientX: 10, clientY: 10 });
    await fixture.whenStable();
    expect(menu).toHaveAttribute("data-state", "open");
    await userEvent.click(edit);
    expect(fixture.componentInstance.chosen).toBe("edit");
  });
});
