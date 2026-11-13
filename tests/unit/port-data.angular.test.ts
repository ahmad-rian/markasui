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
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { Avatar, getInitials } from "../../components/avatar/avatar.component";
import { Card } from "../../components/card/card.component";
import { Carousel } from "../../components/carousel/carousel.component";
import { CodeBlock } from "../../components/code-block/code-block.component";
import { Kbd } from "../../components/kbd/kbd.component";
import { ScrollArea } from "../../components/scroll-area/scroll-area.component";
import { Separator } from "../../components/separator/separator.component";
import { Table } from "../../components/table/table.component";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

@Component({
  imports: [Kbd, Separator, ScrollArea],
  template: `
    <kbd markas-kbd size="sm" class="ml-auto">Esc</kbd>
    <kbd
      markas-kbd
      [keys]="['G', 'N']"
      separator="then"
      aria-hidden="true"
    ></kbd>
    <div markas-separator class="my-4"></div>
    <div
      markas-separator
      [decorative]="false"
      orientation="vertical"
      label="or"
    ></div>
    <div markas-scroll-area>Default</div>
    <div
      markas-scroll-area
      label="Konten"
      orientation="horizontal"
      class="max-h-40"
    >
      Body
    </div>
  `,
})
class StaticHost {}

@Component({
  imports: [Avatar],
  template: `
    <markas-avatar name="Dewi Lestari" src="/broken.png" size="lg" />
    <markas-avatar name="Budi Santoso" alt="" class="ring-2" />
  `,
})
class AvatarHost {}

@Component({
  imports: [Card],
  template: `
    <article
      markas-card
      title="Pro plan"
      description="For teams"
      class="max-w-sm"
    >
      Body text
      <button footer type="button">Choose</button>
    </article>
    <article markas-card id="empty"></article>
  `,
})
class CardHost {}

@Component({
  imports: [Table],
  template: `
    <div
      markas-table
      caption="Orders"
      [columns]="columns"
      [rows]="rows"
      rowKey="id"
      [cells]="{ status: statusCell }"
      bordered
      striped
      [footer]="{ name: 'Total', total: '$30' }"
      class="mt-2"
    ></div>
    <ng-template #statusCell let-row>
      <strong>{{ row.status ?? "None" }}</strong>
    </ng-template>
    <div
      markas-table
      [columns]="[{ key: 'a', label: 'A' }]"
      [rows]="[{ a: 1 }]"
      square
    ></div>
  `,
})
class TableHost {
  readonly columns = [
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "total", label: "Total", align: "right" as const },
  ];
  readonly rows = [
    { id: 1, name: "Budi", status: "Paid", total: "$10" },
    { id: 2, name: "Siti", status: null, total: "$20" },
  ];
}

@Component({
  imports: [CodeBlock],
  template: `
    <div
      markas-code-block
      code="a&#10;b&#10;"
      title="x.ts"
      showLineNumbers
      copyLabel="Salin"
      copiedLabel="Tersalin"
    ></div>
  `,
})
class CodeBlockHost {}

@Component({
  imports: [Carousel],
  template: `
    <markas-carousel
      label="Tour"
      showDots
      [items]="slides"
      nextLabel="Berikutnya"
      slideLabel="Slide {index} dari {total}"
      class="max-w-sm"
    >
      <ng-template let-title let-index="index">
        <p>{{ index + 1 }}. {{ title }}</p>
      </ng-template>
    </markas-carousel>
  `,
})
class CarouselHost {
  readonly slides = ["Plan", "Share", "Track"];
}

describe("Angular Kbd, Separator, ScrollArea", () => {
  it("kbd keeps attributes on the native element and nests keys", async () => {
    await mount(StaticHost);
    const [single, combo] =
      document.querySelectorAll<HTMLElement>("kbd[markas-kbd]");
    expect(single).toHaveTextContent("Esc");
    expect(single!.classList).toContain("h-5");
    expect(single!.classList).toContain("ml-auto");
    expect(combo).toHaveAttribute("aria-hidden", "true");
    expect(combo!.classList).toContain("gap-1");
    expect(
      [...combo!.querySelectorAll("kbd")].map((k) => k.textContent),
    ).toEqual(["G", "N"]);
    expect(combo!.textContent).toBe("GthenN");
  });

  it("separator is decorative by default and named when semantic", async () => {
    await mount(StaticHost);
    const decorative = document.querySelector("[role=none]")!;
    expect(decorative.classList).toContain("h-px");
    expect(decorative.classList).toContain("my-4");
    const line = screen.getByRole("separator", { name: "or" });
    expect(line).toHaveAttribute("aria-orientation", "vertical");
    expect(line.classList).toContain("flex-col");
    expect(line.querySelectorAll("span")).toHaveLength(3);
  });

  it("scroll area is a focusable region with a translatable label", async () => {
    await mount(StaticHost);
    const region = screen.getByRole("region", { name: "Scrollable content" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveAttribute("data-orientation", "vertical");
    const custom = screen.getByRole("region", { name: "Konten" });
    expect(custom.classList).toContain("overflow-x-auto");
    expect(custom.classList).toContain("max-h-40");
  });
});

describe("Angular Avatar", () => {
  it("builds initials from the first and last word", () => {
    expect(getInitials("Ahmad Rian Putra")).toBe("AP");
    expect(getInitials("Maria José García")).toBe("MG");
  });

  it("falls back to named initials when the image fails", async () => {
    const fixture = await mount(AvatarHost);
    const img = screen.getByRole("img", { name: "Dewi Lestari" });
    expect(img.tagName).toBe("IMG");
    fireEvent.error(img);
    await fixture.whenStable();
    const fallback = screen.getByRole("img", { name: "Dewi Lestari" });
    expect(fallback.tagName).toBe("SPAN");
    expect(fallback).toHaveTextContent("DL");
    expect(fallback.classList).toContain("size-12");
  });

  it("hides decorative initials and moves the class to them", async () => {
    await mount(AvatarHost);
    const fallback = screen.getByText("BS");
    expect(fallback).toHaveAttribute("aria-hidden", "true");
    expect(fallback).not.toHaveAttribute("role");
    expect(fallback.classList).toContain("ring-2");
  });
});

describe("Angular Card", () => {
  it("renders header, body, and footer and clears the host title", async () => {
    await mount(CardHost);
    const card = document.querySelector("article")!;
    expect(card).not.toHaveAttribute("title");
    expect(card.classList).toContain("max-w-sm");
    expect(screen.getByRole("heading", { name: "Pro plan" })).toBeVisible();
    expect(card.querySelector("[hidden]")).toBeNull();
    expect(card.querySelector(".text-sm.text-ink")).toHaveTextContent(
      "Body text",
    );
    expect(screen.getByRole("button", { name: "Choose" })).toBeInTheDocument();
  });

  it("hides the empty body and footer", async () => {
    await mount(CardHost);
    const empty = document.getElementById("empty")!;
    expect(empty.querySelector("header")).toBeNull();
    expect(empty.querySelectorAll("[hidden]")).toHaveLength(2);
  });
});

describe("Angular Table", () => {
  it("renders a named region with custom cells, footer, and row styles", async () => {
    await mount(TableHost);
    const region = screen.getByRole("region", { name: "Orders" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region.classList).toContain("rounded-xl");
    expect(region.classList).toContain("mt-2");
    expect(region.querySelector("caption")).toHaveClass("sr-only");
    expect(screen.getByText("Paid").tagName).toBe("STRONG");
    expect(screen.getByText("None").tagName).toBe("STRONG");
    const row = region.querySelector("tbody tr")!;
    expect(row.classList).toContain("even:bg-subtle/40");
    expect(row.querySelector("td")!.classList).toContain("border-l");
    expect(region.querySelector("tfoot")).toHaveTextContent("Total $30");
    expect(region.querySelectorAll("td.text-right")).toHaveLength(3);
  });

  it("falls back to Table and square corners without a caption", async () => {
    await mount(TableHost);
    const region = screen.getByRole("region", { name: "Table" });
    expect(region.classList).not.toContain("rounded-xl");
    expect(region.querySelector("caption")).toBeNull();
  });
});

describe("Angular CodeBlock", () => {
  it("renders numbered lines and copies the code", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const fixture = await mount(CodeBlockHost);
    const root = document.querySelector("[markas-code-block]")!;
    expect(root).not.toHaveAttribute("title");
    expect(screen.getByText("x.ts")).toBeInTheDocument();
    expect(root.querySelectorAll("code > span")).toHaveLength(2);
    const button = screen.getByRole("button", { name: "Salin" });
    expect(button).toHaveAttribute("data-state", "idle");

    fireEvent.click(button);
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("a\nb\n"));
    await fixture.whenStable();
    expect(button).toHaveAttribute("data-state", "copied");
    expect(button).toHaveAccessibleName("Tersalin");
  });
});

describe("Angular Carousel", () => {
  it("labels the region, slides, dots, and buttons", async () => {
    await mount(CarouselHost);
    const region = screen.getByRole("region", { name: "Tour" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(region.classList).toContain("max-w-sm");
    expect(region.id).toMatch(/^markas-carousel-/);
    expect(region.closest("markas-carousel")).not.toHaveAttribute("id");
    expect(
      screen.getByRole("group", { name: "Slide 2 dari 3" }),
    ).toHaveTextContent("2. Share");
    const dot = screen.getByRole("button", { name: "Go to slide 1" });
    expect(dot).toHaveAttribute("aria-current", "true");
    expect(dot).toHaveAttribute("aria-controls", `${region.id}-viewport`);
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Berikutnya" }),
    ).toBeInTheDocument();
  });

  it("moves with the arrow keys only", async () => {
    await mount(CarouselHost);
    const viewport = document.querySelector<HTMLElement>("[id$='-viewport']")!;
    const scrollTo = vi.fn();
    expect(viewport.classList).toContain("snap-x");
    viewport.scrollTo = scrollTo;
    fireEvent.keyDown(viewport, { key: "ArrowRight" });
    expect(scrollTo).toHaveBeenCalledOnce();
    fireEvent.keyDown(viewport, { key: "Enter" });
    expect(scrollTo).toHaveBeenCalledOnce();
  });
});
