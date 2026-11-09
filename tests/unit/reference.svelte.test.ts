import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet, tick } from "svelte";
import { describe, expect, it, vi } from "vitest";
import Button from "../../components/button/Button.svelte";
import Modal from "../../components/modal/Modal.svelte";
import Switch from "../../components/switch/Switch.svelte";
import ModalHarness from "./fixtures/ModalHarness.svelte";
import SwitchHarness from "./fixtures/SwitchHarness.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe("Svelte Button", () => {
  it("defaults to type=button, primary, md and forwards attributes", () => {
    render(Button, { children: text("Save"), "aria-label": "Save draft" });
    const button = screen.getByRole("button", { name: "Save draft" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("h-10");
  });

  it("variant, size, type, and the user class come last", () => {
    render(Button, {
      children: text("Delete"),
      variant: "danger",
      size: "sm",
      type: "submit",
      class: "w-full",
      disabled: true,
    });
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
    expect(button.className).toContain("bg-danger");
    expect(button.className).toContain("h-8");
    expect(button.className.endsWith("w-full")).toBe(true);
  });
});

describe("Svelte Switch", () => {
  it("is a native switch linked to its label with a generated id", async () => {
    render(SwitchHarness);
    const control = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(control).toHaveAttribute("type", "checkbox");
    expect(control.id).not.toBe("");
    expect(control.className.endsWith("ml-1")).toBe(true);
    expect(screen.getByText("off")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Wi-Fi"));
    expect(control).toBeChecked();
    expect(screen.getByText("on")).toBeInTheDocument();
  });

  it("keeps an explicit id and forwards name, disabled, and aria-label", () => {
    render(Switch, {
      id: "beta",
      name: "beta",
      disabled: true,
      "aria-label": "Beta features",
    });
    const control = screen.getByRole("switch", { name: "Beta features" });
    expect(control).toHaveAttribute("id", "beta");
    expect(control).toHaveAttribute("name", "beta");
    expect(control).toBeDisabled();
    expect(document.querySelector("label")).toBeNull();
  });
});

describe("Svelte Modal", () => {
  it("opens from the trigger, labels the dialog, and translates the close button", async () => {
    const onclose = vi.fn();
    render(ModalHarness, { onclose });
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(dialog.className.endsWith("max-w-sm")).toBe(true);

    await userEvent.click(
      screen.getByRole("button", { name: "Delete project" }),
    );
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("dialog", { name: "Delete project?" })).toBe(
      dialog,
    );

    dialog.close();
    await tick();
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(onclose).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("button", { name: "Tutup", hidden: true }),
    ).toHaveAttribute("type", "submit");
  });

  it("closes on a backdrop click and omits trigger and footer when empty", async () => {
    render(Modal, { title: "Notice", id: "notice" });
    const dialog = document.getElementById("notice") as HTMLDialogElement;
    expect(dialog).toHaveAttribute("aria-labelledby", "notice-title");
    expect(
      screen.getByRole("button", { name: "Close", hidden: true }),
    ).toBeInTheDocument();
    expect(dialog.querySelectorAll("form")).toHaveLength(1);
    dialog.showModal();
    await userEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
  });
});
