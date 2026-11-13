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
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Button } from "../../components/button/button.component";
import { Command } from "../../components/command/command.component";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

beforeEach(() => {
  document.body.innerHTML = "";
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
  imports: [Button, Command],
  template: `
    <markas-command
      hotkey
      searchLabel="Cari"
      class="max-w-sm"
      [items]="items"
      (selected)="chosen.push($event)"
    >
      <button markas-button trigger>Open command palette</button>
    </markas-command>
    <markas-command id="palette" [items]="plain" />
  `,
})
class CommandHost {
  chosen: string[] = [];
  readonly items = [
    { group: "Suggestions", label: "Calendar", value: "calendar" },
    { group: "Suggestions", label: "Calculator" },
    { group: "Settings", label: "Billing", shortcut: "Ctrl+B" },
    { group: "Docs", label: "Bad link", href: "javascript:alert(1)" },
  ];
  readonly plain = [{ group: "A", label: "One" }];
}

describe("Angular Command", () => {
  it("opens from the trigger, filters, navigates, and emits selected", async () => {
    const fixture = await mount(CommandHost);
    const dialog = document.querySelector<HTMLDialogElement>("dialog")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(dialog.classList).toContain("max-w-sm");

    await userEvent.click(
      screen.getByRole("button", { name: "Open command palette" }),
    );
    await fixture.whenStable();
    expect(dialog).toHaveAttribute("data-state", "open");
    const input = screen.getByRole("combobox", { name: "Cari" });
    const option = (name: string) => screen.getByRole("option", { name });
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      option("Calendar").id,
    );
    expect(screen.getByRole("option", { name: "Bad link" })).toHaveAttribute(
      "href",
      "#",
    );

    await userEvent.type(input, "cal");
    await fixture.whenStable();
    expect(screen.getAllByRole("option")).toHaveLength(2);
    await userEvent.keyboard("{ArrowDown}");
    await fixture.whenStable();
    expect(option("Calculator")).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{Enter}");
    await fixture.whenStable();
    expect(fixture.componentInstance.chosen).toEqual(["Calculator"]);
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(input).toHaveValue("");
  });

  it("shows the empty message and toggles with Ctrl+K", async () => {
    const fixture = await mount(CommandHost);
    const dialog = document.querySelector<HTMLDialogElement>("dialog")!;
    await userEvent.keyboard("{Control>}k{/Control}");
    await fixture.whenStable();
    expect(dialog).toHaveAttribute("open");
    const input = screen.getByRole("combobox", { name: "Cari" });
    await userEvent.type(input, "zzz");
    await fixture.whenStable();
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).not.toHaveAttribute("aria-activedescendant");
    await userEvent.keyboard("{Control>}k{/Control}");
    expect(dialog).not.toHaveAttribute("open");
  });

  it("keeps an explicit id on the dialog, English labels, and closes on the backdrop", async () => {
    await mount(CommandHost);
    const dialog = document.getElementById("palette") as HTMLDialogElement;
    expect(dialog.tagName).toBe("DIALOG");
    expect(dialog.closest("markas-command")).not.toHaveAttribute("id");
    expect(dialog).toHaveAttribute("aria-label", "Command palette");
    const input = dialog.querySelector("input")!;
    expect(input).toHaveAttribute("aria-label", "Search commands");
    expect(input).toHaveAttribute("aria-controls", "palette-list");
    dialog.showModal();
    await userEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
  });
});
