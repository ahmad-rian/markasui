import {
  Component,
  provideZonelessChangeDetection,
  signal,
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
import { Modal } from "../../components/modal/modal.component";
import { Switch } from "../../components/switch/switch.component";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
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
  imports: [Button],
  template: `
    <button markas-button>Save</button>
    <button
      markas-button
      variant="danger"
      size="sm"
      type="submit"
      class="w-full"
      disabled
      aria-label="Delete forever"
    >
      Delete
    </button>
  `,
})
class ButtonHost {}

@Component({
  imports: [Switch],
  template: `
    <markas-switch [(checked)]="on" label="Wi-Fi" name="wifi" class="ml-1" />
    <markas-switch id="beta" aria-label="Beta features" checked disabled />
    <output>{{ on() ? "on" : "off" }}</output>
  `,
})
class SwitchHost {
  readonly on = signal(false);
}

@Component({
  imports: [Button, Modal],
  template: `
    <markas-modal
      title="Delete project?"
      closeLabel="Tutup"
      class="max-w-sm"
      (closed)="closed = closed + 1"
    >
      <button markas-button trigger variant="danger">Delete project</button>
      Body text
      <ng-container footer>
        <button markas-button type="submit" value="cancel">Cancel</button>
      </ng-container>
    </markas-modal>
    <markas-modal title="Notice" id="notice">Plain</markas-modal>
  `,
})
class ModalHost {
  closed = 0;
}

describe("Angular Button", () => {
  it("defaults to type=button and keeps native attributes on the button", async () => {
    await mount(ButtonHost);
    const save = screen.getByRole("button", { name: "Save" });
    expect(save).toHaveAttribute("type", "button");
    expect(save.className).toContain("bg-primary");
    expect(save.className).toContain("h-10");

    const remove = screen.getByRole("button", { name: "Delete forever" });
    expect(remove).toHaveAttribute("type", "submit");
    expect(remove).toBeDisabled();
    expect(remove.className).toContain("bg-danger");
    expect(remove.className).toContain("h-8");
    expect(remove.classList).toContain("w-full");
  });
});

describe("Angular Switch", () => {
  it("toggles with two-way binding and moves name, id, and class to the input", async () => {
    const fixture = await mount(SwitchHost);
    const control = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(control).toHaveAttribute("name", "wifi");
    expect(control.id).toMatch(/^markas-switch-/);
    // Angular menyusun ulang class lewat [class], jadi cek keanggotaan, bukan urutan.
    expect(control.classList).toContain("ml-1");
    expect(control.classList).toContain("peer");
    expect(control.closest("markas-switch")).not.toHaveAttribute("name");

    await userEvent.click(screen.getByText("Wi-Fi"));
    await fixture.whenStable();
    expect(control).toBeChecked();
    expect(fixture.componentInstance.on()).toBe(true);
    expect(screen.getByText("on")).toBeInTheDocument();
  });

  it("static checked, disabled, id, and aria-label land on the input only", async () => {
    await mount(SwitchHost);
    const beta = screen.getByRole("switch", { name: "Beta features" });
    expect(beta).toHaveAttribute("id", "beta");
    expect(beta).toBeChecked();
    expect(beta).toBeDisabled();
    const host = beta.closest("markas-switch")!;
    expect(host).not.toHaveAttribute("id");
    expect(host).not.toHaveAttribute("aria-label");
  });
});

describe("Angular Modal", () => {
  it("opens from the trigger, labels the dialog, and emits closed", async () => {
    const fixture = await mount(ModalHost);
    const dialog =
      document.querySelector<HTMLDialogElement>("dialog[data-state]")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(dialog.classList).toContain("max-w-sm");
    expect(dialog.closest("markas-modal")).not.toHaveAttribute("title");

    await userEvent.click(
      screen.getByRole("button", { name: "Delete project" }),
    );
    await fixture.whenStable();
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("dialog", { name: "Delete project?" })).toBe(
      dialog,
    );
    expect(dialog.querySelector("form[hidden]")).toBeNull();

    dialog.close();
    await fixture.whenStable();
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(fixture.componentInstance.closed).toBe(1);
    expect(
      screen.getByRole("button", { name: "Tutup", hidden: true }),
    ).toHaveAttribute("type", "submit");
  });

  it("keeps an explicit id, hides an empty footer, and closes on the backdrop", async () => {
    await mount(ModalHost);
    const dialog = document.getElementById("notice") as HTMLDialogElement;
    expect(dialog.tagName).toBe("DIALOG");
    expect(dialog).toHaveAttribute("aria-labelledby", "notice-title");
    expect(dialog.querySelectorAll("form")[1]).toHaveAttribute("hidden");
    expect(
      dialog.querySelector("button[aria-label=Close]"),
    ).toBeInTheDocument();
    dialog.showModal();
    await userEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
  });
});
