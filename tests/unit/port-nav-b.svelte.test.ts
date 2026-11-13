import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { describe, expect, it, vi } from "vitest";
import Pagination, {
  pageRange,
} from "../../components/pagination/Pagination.svelte";
import Tabs from "../../components/tabs/Tabs.svelte";
import TabsHarness from "./fixtures/PortNavTabsHarness.svelte";

describe("Svelte Tabs", () => {
  it("links tabs and panels with a generated id and appends the user class", () => {
    render(TabsHarness);
    const account = screen.getByRole("tab", { name: "Account" });
    const root = account.closest("[role=tablist]")!.parentElement!;
    expect(root.id).not.toBe("");
    expect(root.className.endsWith("mt-2")).toBe(true);
    expect(account).toHaveAttribute("aria-selected", "true");
    expect(account).toHaveAttribute("tabindex", "0");
    expect(account).toHaveAttribute("id", `${root.id}-tab-account`);
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", account.id);
    expect(panel.querySelector("strong")).toHaveTextContent("Account text");
  });

  it("click and arrow keys select, focus, bind the value, and call onValueChange", async () => {
    const onValueChange = vi.fn();
    render(TabsHarness, { onValueChange });
    await userEvent.click(screen.getByRole("tab", { name: "Password" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Password text");
    expect(screen.getByText("password", { selector: "output" })).toBeTruthy();
    expect(onValueChange).toHaveBeenLastCalledWith("password");

    await userEvent.keyboard("{ArrowRight}");
    await tick();
    expect(screen.getByRole("tab", { name: "Alerts" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await tick();
    expect(screen.getByRole("tab", { name: "Account" })).toHaveFocus();
    await userEvent.keyboard("{End}");
    await tick();
    expect(screen.getByRole("tab", { name: "Alerts" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await userEvent.keyboard("{Home}{ArrowLeft}");
    await tick();
    expect(screen.getByRole("tab", { name: "Alerts" })).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("alerts");
  });

  it("keeps an explicit id and honours defaultValue", () => {
    render(Tabs, {
      id: "plans",
      defaultValue: "b",
      items: [
        { value: "a", label: "A", content: "First" },
        { value: "b", label: "B", content: "Second" },
      ],
    });
    expect(document.getElementById("plans-tab-b")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(document.getElementById("plans-panel-a")).toHaveAttribute("hidden");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Second");
  });
});

describe("Svelte Pagination", () => {
  it("marks the current page and builds prev and next links", () => {
    render(Pagination, {
      page: 5,
      total: 10,
      href: "?p={page}",
      class: "mt-4",
    });
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(nav.className.endsWith("mt-4")).toBe(true);
    expect(screen.getByRole("link", { name: "5" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "?p=4",
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "rel",
      "next",
    );
    expect(
      screen.getAllByRole("link").map((link) => link.textContent?.trim()),
    ).toEqual(["Previous", "1", "4", "5", "6", "10", "Next"]);
  });

  it("disables the ends, translates labels, and blocks unsafe hrefs", () => {
    render(Pagination, {
      page: 1,
      total: 1,
      href: "javascript:alert({page})",
      navLabel: "Navigasi halaman",
      previousLabel: "Sebelumnya",
      nextLabel: "Berikutnya",
    });
    const nav = screen.getByRole("navigation", { name: "Navigasi halaman" });
    expect(nav.querySelectorAll("[aria-disabled=true]")).toHaveLength(2);
    expect(nav).toHaveTextContent("Sebelumnya");
    expect(nav).toHaveTextContent("Berikutnya");
    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "#",
    );
  });

  it("exports pageRange with the same logic as React", () => {
    expect(pageRange(5, 10, 1)).toEqual([
      1,
      "ellipsis",
      4,
      5,
      6,
      "ellipsis",
      10,
    ]);
    expect(pageRange(1, 10, 1)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
    expect(pageRange(2, 4, 1)).toEqual([1, 2, 3, 4]);
    expect(pageRange(1, 0, 1)).toEqual([]);
  });
});
