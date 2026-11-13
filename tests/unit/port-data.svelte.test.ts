import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { createRawSnippet, tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import Avatar, { getInitials } from "../../components/avatar/Avatar.svelte";
import Card from "../../components/card/Card.svelte";
import CodeBlock from "../../components/code-block/CodeBlock.svelte";
import Kbd from "../../components/kbd/Kbd.svelte";
import ScrollArea from "../../components/scroll-area/ScrollArea.svelte";
import Separator from "../../components/separator/Separator.svelte";
import Table from "../../components/table/Table.svelte";
import CardHarness from "./fixtures/PortDataCardHarness.svelte";
import CarouselHarness from "./fixtures/PortDataCarouselHarness.svelte";
import TableHarness from "./fixtures/PortDataTableHarness.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

afterEach(() => vi.restoreAllMocks());

describe("Svelte Kbd", () => {
  it("renders a single keycap from children with the user class", () => {
    render(Kbd, { children: text("Esc"), size: "sm", class: "ml-auto" });
    const kbd = document.querySelector("kbd")!;
    expect(kbd).toHaveTextContent("Esc");
    expect(kbd.className).toContain("h-5");
    expect(kbd.className.endsWith("ml-auto")).toBe(true);
  });

  it("renders keys as nested keycaps with the separator", () => {
    render(Kbd, { keys: ["G", "N"], separator: "then", "aria-hidden": "true" });
    const outer = document.querySelector("kbd")!;
    expect(outer).toHaveAttribute("aria-hidden", "true");
    expect(outer.className).toContain("gap-1");
    expect(
      [...outer.querySelectorAll("kbd")].map((k) => k.textContent),
    ).toEqual(["G", "N"]);
    expect(outer.textContent).toBe("GthenN");
  });
});

describe("Svelte Separator", () => {
  it("is decorative by default", () => {
    render(Separator, { class: "my-4" });
    const line = document.querySelector("[role=none]")!;
    expect(line.className).toContain("h-px");
    expect(line.className.endsWith("my-4")).toBe(true);
    expect(screen.queryByRole("separator")).toBeNull();
  });

  it("semantic with a label names the separator", () => {
    render(Separator, {
      decorative: false,
      orientation: "vertical",
      label: "or",
    });
    const line = screen.getByRole("separator", { name: "or" });
    expect(line).toHaveAttribute("aria-orientation", "vertical");
    expect(line.className).toContain("flex-col");
    expect(line.querySelectorAll("span")).toHaveLength(3);
  });
});

describe("Svelte ScrollArea", () => {
  it("is a focusable named region with the orientation classes", () => {
    render(ScrollArea, { children: text("Body") });
    const region = screen.getByRole("region", { name: "Scrollable content" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveAttribute("data-orientation", "vertical");
    expect(region.className).toContain("overflow-y-auto");
  });

  it("takes a translated label and a horizontal orientation", () => {
    render(ScrollArea, {
      label: "Konten",
      orientation: "horizontal",
      class: "max-h-40",
    });
    const region = screen.getByRole("region", { name: "Konten" });
    expect(region.className).toContain("overflow-x-auto");
    expect(region.className.endsWith("max-h-40")).toBe(true);
  });
});

describe("Svelte Avatar", () => {
  it("builds initials from the first and last word", () => {
    expect(getInitials("Ahmad Rian Putra")).toBe("AP");
    expect(getInitials("  rina ")).toBe("R");
    expect(getInitials("Maria José García")).toBe("MG");
  });

  it("falls back to named initials when the image fails", async () => {
    render(Avatar, { name: "Dewi Lestari", src: "/broken.png", size: "lg" });
    const img = screen.getByRole("img", { name: "Dewi Lestari" });
    expect(img.tagName).toBe("IMG");
    await fireEvent.error(img);
    const fallback = screen.getByRole("img", { name: "Dewi Lestari" });
    expect(fallback.tagName).toBe("SPAN");
    expect(fallback).toHaveTextContent("DL");
    expect(fallback.className).toContain("size-12");
  });

  it("hides decorative initials with an empty alt", () => {
    render(Avatar, { name: "Budi Santoso", alt: "", class: "ring-2" });
    const fallback = document.querySelector("span")!;
    expect(fallback).toHaveAttribute("aria-hidden", "true");
    expect(fallback).not.toHaveAttribute("role");
    expect(fallback.className.endsWith("ring-2")).toBe(true);
  });
});

describe("Svelte Card", () => {
  it("renders header, body, and footer", () => {
    render(CardHarness);
    const card = document.querySelector("article")!;
    expect(card.className.endsWith("max-w-sm")).toBe(true);
    expect(screen.getByRole("heading", { name: "Pro plan" })).toBeVisible();
    expect(screen.getByText("For teams")).toBeInTheDocument();
    expect(card.children).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Choose" })).toBeInTheDocument();
  });

  it("omits the header, body, and footer when empty", () => {
    render(Card, {});
    expect(document.querySelector("article")!.children).toHaveLength(0);
  });
});

describe("Svelte Table", () => {
  it("renders a named region with custom cells, footer, and row styles", () => {
    render(TableHarness);
    const region = screen.getByRole("region", { name: "Orders" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region.className).toContain("rounded-xl");
    expect(region.className.endsWith("mt-2")).toBe(true);
    expect(document.querySelector("caption")).toHaveClass("sr-only");
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    expect(screen.getByText("Paid").tagName).toBe("STRONG");
    expect(screen.getByText("None").tagName).toBe("STRONG");
    const body = document.querySelectorAll("tbody tr");
    expect(body[0]!.className).toContain("even:bg-subtle/40");
    expect(body[0]!.querySelector("td")!.className).toContain("border-l");
    expect(document.querySelector("tfoot")).toHaveTextContent("Total$30");
    expect(document.querySelectorAll("td.text-right")).toHaveLength(3);
  });

  it("falls back to Table and square corners without a caption", () => {
    render(Table, {
      columns: [{ key: "a", label: "A" }],
      rows: [{ a: 1 }],
      square: true,
    });
    const region = screen.getByRole("region", { name: "Table" });
    expect(region.className).not.toContain("rounded-xl");
    expect(document.querySelector("caption")).toBeNull();
  });
});

describe("Svelte CodeBlock", () => {
  it("renders lines with numbers and copies the code", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(CodeBlock, {
      code: "a\nb\n",
      title: "x.ts",
      showLineNumbers: true,
      copyLabel: "Salin",
      copiedLabel: "Tersalin",
    });
    expect(screen.getByText("x.ts")).toBeInTheDocument();
    expect(document.querySelectorAll("code > span")).toHaveLength(2);
    expect(
      document.querySelectorAll("[aria-hidden=true].select-none"),
    ).toHaveLength(2);
    const button = screen.getByRole("button", { name: "Salin" });
    expect(button).toHaveAttribute("data-state", "idle");

    await fireEvent.click(button);
    await waitFor(() => expect(button).toHaveAttribute("data-state", "copied"));
    expect(writeText).toHaveBeenCalledWith("a\nb\n");
    expect(button).toHaveAccessibleName("Tersalin");
  });

  it("stays idle when the clipboard rejects", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
    });
    render(CodeBlock, { code: "x" });
    const button = screen.getByRole("button", { name: "Copy code" });
    await fireEvent.click(button);
    await tick();
    expect(button).toHaveAttribute("data-state", "idle");
    expect(document.querySelector("pre")).toHaveAttribute("tabindex", "0");
  });
});

describe("Svelte Carousel", () => {
  it("labels the region, slides, dots, and buttons", () => {
    render(CarouselHarness);
    const region = screen.getByRole("region", { name: "Tour" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(region.className.endsWith("max-w-sm")).toBe(true);
    expect(region.id).not.toBe("");
    const slide = screen.getByRole("group", { name: "Slide 2 dari 3" });
    expect(slide).toHaveTextContent("2. Share");
    const viewport = document.getElementById(`${region.id}-viewport`)!;
    expect(viewport).toHaveAttribute("tabindex", "0");
    const dot = screen.getByRole("button", { name: "Go to slide 1" });
    expect(dot).toHaveAttribute("aria-current", "true");
    expect(dot).toHaveAttribute("aria-controls", viewport.id);
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Berikutnya" }),
    ).toBeInTheDocument();
  });

  it("hides the dots by default and moves with the arrow keys", async () => {
    render(CarouselHarness, { showDots: false });
    expect(screen.queryByRole("button", { name: /Go to slide/ })).toBeNull();
    const viewport = document.querySelector<HTMLElement>("[tabindex='0']")!;
    const scrollTo = vi.fn();
    viewport.scrollTo = scrollTo;
    await fireEvent.keyDown(viewport, { key: "ArrowRight" });
    expect(scrollTo).toHaveBeenCalledOnce();
    await fireEvent.keyDown(viewport, { key: "Enter" });
    expect(scrollTo).toHaveBeenCalledOnce();
  });
});
