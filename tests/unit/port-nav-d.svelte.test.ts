import { render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PortNavSidebarHarness from "./fixtures/PortNavSidebarHarness.svelte";

const aside = () => document.querySelector("aside")!;

describe("Svelte Sidebar", () => {
  it("renders links, badge, sanitized href, disabled item, and user attributes on the root", () => {
    render(PortNavSidebarHarness);
    const shell = screen.getByTestId("shell");
    expect(shell.className).toContain("@container");
    expect(shell.className.endsWith("h-96")).toBe(true);
    expect(shell.id).not.toBe("");
    expect(aside().id).toBe(`${shell.id}-aside`);

    const nav = within(aside()).getByRole("navigation", { name: "Sidebar" });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(nav).getByText("3")).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Danger" })).toHaveAttribute(
      "href",
      "#",
    );
    const locked = within(nav).getByRole("link", { name: "Locked" });
    expect(locked).toHaveAttribute("aria-disabled", "true");
    expect(locked).not.toHaveAttribute("href");
    expect(within(nav).getByRole("list", { name: "Workspace" })).toBeVisible();
    expect(aside()).toHaveTextContent("Brand");
    expect(aside()).toHaveTextContent("Profile");
    expect(screen.getByRole("main")).toHaveTextContent("Page");
  });

  it("toggles sub-items in both copies and the rail with bind:collapsed", async () => {
    render(PortNavSidebarHarness);
    const projects = within(aside()).getByRole("button", { name: "Projects" });
    expect(projects).toHaveAttribute("aria-expanded", "false");
    const region = document.getElementById(
      projects.getAttribute("aria-controls")!,
    )!;
    expect(region).toHaveAttribute("data-state", "closed");
    await userEvent.click(projects);
    expect(projects).toHaveAttribute("aria-expanded", "true");
    expect(region).toHaveAttribute("data-state", "open");

    const toggle = within(aside()).getByRole("button", {
      name: "Collapse sidebar",
    });
    expect(toggle).toHaveAttribute("aria-controls", aside().id);
    await userEvent.click(toggle);
    expect(aside()).toHaveAttribute("data-state", "collapsed");
    expect(toggle).toHaveAccessibleName("Expand sidebar");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("rail")).toBeInTheDocument();

    // In the rail a parent item expands the sidebar and keeps its group open.
    await userEvent.click(projects);
    expect(aside()).toHaveAttribute("data-state", "expanded");
    expect(projects).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("full")).toBeInTheDocument();
  });

  it("opens the mobile dialog and uses label overrides", async () => {
    render(PortNavSidebarHarness, { navLabel: "Navigasi samping" });
    const open = screen.getByRole("button", { name: "Open sidebar" });
    expect(open).toHaveAttribute("aria-haspopup", "dialog");
    const dialog = document.getElementById(
      open.getAttribute("aria-controls")!,
    ) as HTMLDialogElement;
    expect(dialog).toHaveAttribute("aria-label", "Navigasi samping");
    expect(dialog).toHaveTextContent("Brand");
    await userEvent.click(open);
    expect(dialog.open).toBe(true);
    const close = within(dialog).getByRole("button", { name: "Close sidebar" });
    expect(close).toHaveAttribute("type", "submit");
    expect(close.closest("form")).toHaveAttribute("method", "dialog");
  });
});
