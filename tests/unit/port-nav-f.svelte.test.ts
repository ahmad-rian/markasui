import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { describe, expect, it, vi } from "vitest";
import Navbar from "../../components/navbar/Navbar.svelte";
import NavbarHarness from "./fixtures/PortNavNavbarHarness.svelte";

const links = [
  { label: "Docs", href: "/docs", active: true },
  {
    label: "Products",
    children: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "Track usage",
        icon: "M3 3v18h18",
      },
      { label: "Danger", href: "javascript:alert(1)" },
    ],
  },
  { label: "Pricing", href: " javascript:alert(1)" },
];

describe("Svelte Navbar", () => {
  it("renders variant, sticky, user class, slots, and a generated id", () => {
    render(NavbarHarness, { links });
    const header = screen.getByTestId("navbar");
    expect(header.tagName).toBe("HEADER");
    expect(header.id).not.toBe("");
    expect(header.className).toContain("shadow-overlay");
    expect(header.className).toContain("sticky");
    expect(header.className.endsWith("mx-auto")).toBe(true);
    expect(screen.getByRole("link", { name: "Acme" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-controls", `${header.id}-menu`);
  });

  it("marks the active link, builds dropdowns, and neutralises unsafe hrefs", () => {
    render(NavbarHarness, { links, id: "site" });
    const desktop = screen.getByRole("navigation", { name: "Main" });
    expect(desktop.querySelector("[aria-current=page]")).toHaveTextContent(
      "Docs",
    );
    const trigger = desktop.querySelector("button")!;
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", "site-panel-1");
    expect(trigger).toHaveAttribute("popovertarget", "site-panel-1");
    const panel = document.getElementById("site-panel-1")!;
    expect(panel).toHaveAttribute("popover", "auto");
    expect(panel.querySelector("svg path")).toHaveAttribute("d", "M3 3v18h18");
    expect(panel.querySelectorAll("a")[1]).toHaveAttribute("href", "#");
    expect(
      desktop.querySelector(":scope>ul>li:last-child>a"),
    ).toHaveTextContent("Pricing");
    const mobile = document.getElementById("site-menu")!;
    expect(mobile.querySelector("summary")).toHaveTextContent("Products");
  });

  it("opens the mobile menu, closes on Escape, and returns focus", async () => {
    const onkeydown = vi.fn();
    render(NavbarHarness, { links, id: "site", menuLabel: "Buka", onkeydown });
    const toggle = screen.getByRole("button", { name: "Buka" });
    const menu = document.getElementById("site-menu")!;
    expect(menu).toHaveAttribute("hidden");
    expect(menu).toHaveAttribute("data-state", "closed");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(menu).not.toHaveAttribute("hidden");
    expect(menu).toHaveAttribute("data-state", "open");

    menu.querySelector("a")!.focus();
    await userEvent.keyboard("{Escape}");
    await tick();
    expect(menu).toHaveAttribute("hidden");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(onkeydown).toHaveBeenCalled();
  });

  it("translates the nav labels and omits the brand wrapper without a brand", () => {
    render(Navbar, {
      links: [],
      navLabel: "Utama",
      mobileNavLabel: "Utama seluler",
    });
    expect(
      screen.getByRole("navigation", { name: "Utama", hidden: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Utama seluler", hidden: true }),
    ).toBeInTheDocument();
    expect(document.querySelector("header")!.className).toContain("border-b");
    expect(document.querySelector(".font-semibold")).toBeNull();
  });
});
