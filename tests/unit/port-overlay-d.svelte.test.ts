import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { describe, expect, it, vi } from "vitest";
import Command from "../../components/command/Command.svelte";
import CommandHarness from "./fixtures/CommandHarness.svelte";

describe("Svelte Command", () => {
  it("opens from the trigger, filters, navigates, and selects with Enter", async () => {
    const onselect = vi.fn();
    render(CommandHarness, { onselect });
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(dialog.className.endsWith("max-w-sm")).toBe(true);

    await userEvent.click(
      screen.getByRole("button", { name: "Open command palette" }),
    );
    expect(dialog).toHaveAttribute("data-state", "open");
    const input = screen.getByRole("combobox", { name: "Cari" });
    const option = (name: string) => screen.getByRole("option", { name });
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      option("Calendar").id,
    );

    await userEvent.type(input, "cal");
    expect(screen.getAllByRole("option")).toHaveLength(2);
    await userEvent.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      option("Calculator").id,
    );
    expect(option("Calculator")).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{Enter}");
    expect(onselect).toHaveBeenCalledWith("Calculator");
    await tick();
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(input).toHaveValue("");
  });

  it("shows the empty message, sanitizes unsafe hrefs, and toggles with Ctrl+K", async () => {
    render(CommandHarness);
    const dialog = document.querySelector("dialog")!;
    expect(
      screen.getByRole("option", { name: "Bad link", hidden: true }),
    ).toHaveAttribute("href", "#");

    await userEvent.keyboard("{Control>}k{/Control}");
    expect(dialog).toHaveAttribute("open");
    const input = screen.getByRole("combobox", { name: "Cari" });
    await userEvent.type(input, "zzz");
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).not.toHaveAttribute("aria-activedescendant");
    await userEvent.keyboard("{Control>}k{/Control}");
    expect(dialog).not.toHaveAttribute("open");
  });

  it("keeps an explicit id, uses English labels, and closes on the backdrop", async () => {
    render(Command, {
      id: "palette",
      items: [{ group: "A", label: "One" }],
    });
    const dialog = document.getElementById("palette") as HTMLDialogElement;
    expect(dialog).toHaveAttribute("aria-label", "Command palette");
    const input = screen.getByRole("combobox", { hidden: true });
    expect(input).toHaveAttribute("aria-label", "Search commands");
    expect(input).toHaveAttribute("aria-controls", "palette-list");
    expect(input).toHaveAttribute("placeholder", "Type a command or search...");
    expect(document.getElementById("palette-option-0")).not.toBeNull();
    dialog.showModal();
    await userEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
  });
});
