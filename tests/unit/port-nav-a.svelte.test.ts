import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet, tick } from "svelte";
import { describe, expect, it, vi } from "vitest";
import Accordion from "../../components/accordion/Accordion.svelte";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.svelte";
import Collapsible from "../../components/collapsible/Collapsible.svelte";
import AccordionHarness from "./fixtures/PortNavAccordionHarness.svelte";
import CollapsibleHarness from "./fixtures/PortNavCollapsibleHarness.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

const items = [
  { value: "a", title: "First", content: "Alpha" },
  { value: "b", title: "Second", content: "Beta" },
  { value: "c", title: "Third", content: "Gamma" },
];

describe("Svelte Accordion", () => {
  it("single: shares a generated name and opens only the first default", () => {
    render(Accordion, { items, defaultValue: ["b", "c"] });
    const details = document.querySelectorAll("details");
    expect(details).toHaveLength(3);
    const name = details[0]!.getAttribute("name");
    expect(name).toBeTruthy();
    details.forEach((el) => expect(el.getAttribute("name")).toBe(name));
    expect(details[0]).not.toHaveAttribute("open");
    expect(details[1]).toHaveAttribute("open");
    expect(details[2]).not.toHaveAttribute("open");
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("multiple: no name and every default value opens", () => {
    render(Accordion, { items, type: "multiple", defaultValue: ["a", "c"] });
    const details = document.querySelectorAll("details");
    details.forEach((el) => expect(el).not.toHaveAttribute("name"));
    expect(details[0]).toHaveAttribute("open");
    expect(details[2]).toHaveAttribute("open");
  });

  it("renders snippet content, appends the user class, and toggles on click", async () => {
    render(AccordionHarness);
    const root = document.querySelector("details")!.parentElement!;
    expect(root.className.endsWith("px-4")).toBe(true);
    expect(root.className).toContain("divide-y");
    expect(screen.getByRole("link", { name: "Compare plans" })).toBeVisible();
    const upgrade = document.querySelectorAll("details")[1]!;
    await userEvent.click(screen.getByText("Upgrade"));
    expect(upgrade).toHaveAttribute("open");
    expect(screen.getByText("Open billing.")).toBeInTheDocument();
  });
});

describe("Svelte Collapsible", () => {
  it("renders closed with a string title and forwards attributes", () => {
    render(Collapsible, {
      title: "Show details",
      class: "mt-2",
      "aria-label": "Order details",
      children: text("Body"),
    });
    const details = document.querySelector("details")!;
    expect(details).not.toHaveAttribute("open");
    expect(details).toHaveAttribute("aria-label", "Order details");
    expect(details.className.endsWith("mt-2")).toBe(true);
    expect(screen.getByText("Show details").closest("summary")).not.toBeNull();
    expect(details.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("starts open with open=true", () => {
    render(Collapsible, { title: "Notes", open: true, children: text("x") });
    expect(document.querySelector("details")).toHaveAttribute("open");
  });

  it("supports a title snippet and bind:open", async () => {
    render(CollapsibleHarness);
    const details = document.getElementById("details")!;
    expect(details.className).toContain("border-t");
    expect(details.querySelector("summary strong")).toHaveTextContent("3");
    expect(screen.getByText("closed")).toBeInTheDocument();
    await userEvent.click(details.querySelector("summary")!);
    await tick();
    expect(details).toHaveAttribute("open");
    await vi.waitFor(() => screen.getByText("open"));
  });
});

describe("Svelte Breadcrumb", () => {
  it("links ancestors, marks the current page, and hides separators", () => {
    render(Breadcrumb, {
      items: [
        { label: "Home", href: "/" },
        { label: "Docs" },
        { label: "Bad", href: "javascript:alert(1)" },
        { label: "Current", href: "/current" },
      ],
      class: "mb-4",
    });
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toHaveClass("mb-4");
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getAllByRole("link").map((a) => a.textContent)).toEqual([
      "Home",
      "Bad",
    ]);
    expect(screen.getByRole("link", { name: "Bad" })).toHaveAttribute(
      "href",
      "#",
    );
    const current = screen.getByText("Current");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).not.toHaveAttribute("href");
    expect(nav.querySelectorAll("svg[aria-hidden=true]")).toHaveLength(3);
  });

  it("translates the nav label", () => {
    render(Breadcrumb, {
      items: [{ label: "Beranda" }],
      navLabel: "Jejak navigasi",
    });
    expect(
      screen.getByRole("navigation", { name: "Jejak navigasi" }),
    ).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeNull();
  });
});
