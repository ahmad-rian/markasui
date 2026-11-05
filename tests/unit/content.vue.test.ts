import { fireEvent, render, screen, within } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Carousel from "../../components/carousel/Carousel.vue";
import CodeBlock from "../../components/code-block/CodeBlock.vue";
import ScrollArea from "../../components/scroll-area/ScrollArea.vue";

const SLIDE_WIDTH = 300;
const TRACK_WIDTH = 900;
const originalScrollTo = Element.prototype.scrollTo;

/** jsdom tidak menghitung layout: setiap slide selebar SLIDE_WIDTH, scrollTo memicu event scroll. */
function mockScrollLayout() {
  vi.spyOn(Element.prototype, "clientWidth", "get").mockReturnValue(
    SLIDE_WIDTH,
  );
  vi.spyOn(Element.prototype, "scrollWidth", "get").mockReturnValue(
    TRACK_WIDTH,
  );
  vi.spyOn(HTMLElement.prototype, "offsetLeft", "get").mockImplementation(
    function (this: HTMLElement) {
      const siblings = Array.from(this.parentElement?.children ?? []);
      return siblings.indexOf(this) * SLIDE_WIDTH;
    },
  );
  const scrollTo = vi.fn(function (this: Element, options: ScrollToOptions) {
    this.scrollLeft = options.left ?? 0;
    this.dispatchEvent(new Event("scroll"));
  });
  Element.prototype.scrollTo = scrollTo as unknown as Element["scrollTo"];
  return scrollTo;
}

describe("Vue ScrollArea", () => {
  it("merender region yang bisa difokus dengan label bawaan", () => {
    render(ScrollArea, { slots: { default: "Content" } });
    const region = screen.getByRole("region", { name: "Scrollable content" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveAttribute("data-orientation", "vertical");
    expect(region).toHaveClass("overflow-y-auto", "overflow-x-hidden");
    expect(region).toHaveTextContent("Content");
  });

  it.each([
    ["horizontal", ["overflow-x-auto", "overflow-y-hidden"]],
    ["both", ["overflow-auto"]],
  ] as const)(
    "orientation %s memakai class overflow yang sesuai",
    (orientation, classes) => {
      render(ScrollArea, { props: { orientation } });
      const region = screen.getByRole("region");
      expect(region).toHaveClass(...classes);
      expect(region).toHaveAttribute("data-orientation", orientation);
    },
  );

  it("label menimpa default dan class user di akhir", () => {
    render(ScrollArea, {
      props: { label: "Rilis" },
      attrs: { class: "max-h-56", "data-testid": "area" },
    });
    const region = screen.getByRole("region", { name: "Rilis" });
    expect(region).toHaveAttribute("data-testid", "area");
    expect(region.className.endsWith("max-h-56")).toBe(true);
  });
});

describe("Vue CodeBlock", () => {
  const code = 'const a = 1;\n\nconsole.log("a");\n';

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("merender judul, pre yang bisa difokus, dan satu span per baris", () => {
    const { container } = render(CodeBlock, {
      props: { code, title: "app.ts" },
    });
    expect(screen.getByText("app.ts")).toHaveClass("text-muted");
    const pre = container.querySelector("pre");
    expect(pre).toHaveAttribute("tabindex", "0");
    expect(pre).toHaveClass("overflow-x-auto", "font-mono");
    expect(pre?.querySelectorAll("code > span")).toHaveLength(3);
    expect(pre?.textContent).toBe('const a = 1;console.log("a");');
  });

  it("nomor baris tersembunyi dari pembaca layar", () => {
    const { container } = render(CodeBlock, {
      props: { code, showLineNumbers: true },
    });
    const numbers = container.querySelectorAll("code [aria-hidden='true']");
    expect(Array.from(numbers, (n) => n.textContent)).toEqual(["1", "2", "3"]);
    expect(numbers[0]).toHaveClass("select-none");
  });

  it("menyalin kode lalu kembali ke label awal setelah dua detik", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(CodeBlock, { props: { code } });
    const button = screen.getByRole("button", { name: "Copy code" });

    await fireEvent.click(button);
    await vi.waitFor(() => expect(button).toHaveAccessibleName("Copied"));
    expect(writeText).toHaveBeenCalledWith(code);
    expect(button).toHaveAttribute("data-state", "copied");

    await vi.advanceTimersByTimeAsync(2000);
    expect(button).toHaveAccessibleName("Copy code");
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("tetap di label awal kalau clipboard gagal", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(CodeBlock, { props: { code: "x" } });
    const button = screen.getByRole("button", { name: "Copy code" });
    await fireEvent.click(button);
    await vi.waitFor(() => expect(writeText).toHaveBeenCalled());
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("label menimpa default dan class user di akhir", async () => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const { container } = render(CodeBlock, {
      props: { code: "x", copyLabel: "Salin kode", copiedLabel: "Tersalin" },
      attrs: { class: "mt-4" },
    });
    const button = screen.getByRole("button", { name: "Salin kode" });
    await fireEvent.click(button);
    await vi.waitFor(() => expect(button).toHaveAccessibleName("Tersalin"));
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("rounded-xl", "bg-subtle");
    expect(root.className.endsWith("mt-4")).toBe(true);
  });
});

describe("Vue Carousel", () => {
  let scrollTo: ReturnType<typeof mockScrollLayout>;
  const slides = "<div>One</div><div>Two</div><div>Three</div>";

  beforeEach(() => {
    scrollTo = mockScrollLayout();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    Element.prototype.scrollTo = originalScrollTo;
  });

  const renderCarousel = (
    props: Record<string, unknown> = {},
    attrs: Record<string, unknown> = {},
  ) =>
    render(Carousel, {
      props: { label: "Tour", ...props },
      attrs,
      slots: { default: slides },
    });

  it("merender region carousel dan slide bernomor", () => {
    renderCarousel();
    const region = screen.getByRole("region", { name: "Tour" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    const groups = within(region).getAllByRole("group");
    expect(groups.map((s) => s.getAttribute("aria-label"))).toEqual([
      "1 of 3",
      "2 of 3",
      "3 of 3",
    ]);
    expect(groups[0]).toHaveAttribute("aria-roledescription", "slide");
    expect(groups[0]).toHaveClass("snap-start", "basis-full");
    expect(groups[1]).toHaveTextContent("Two");
    expect(screen.queryByRole("button", { name: /Go to slide/ })).toBeNull();
  });

  it("tombol Previous dan Next bergeser per slide dan nonaktif di ujung", async () => {
    renderCarousel();
    const previous = screen.getByRole("button", { name: "Previous slide" });
    const next = screen.getByRole("button", { name: "Next slide" });
    expect(previous).toBeDisabled();
    expect(next).toBeEnabled();

    await fireEvent.click(next);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: SLIDE_WIDTH });
    expect(previous).toBeEnabled();

    await fireEvent.click(next);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: SLIDE_WIDTH * 2 });
    expect(next).toBeDisabled();

    await fireEvent.click(previous);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: SLIDE_WIDTH });
  });

  it("panah kiri dan kanan bergeser saat fokus di dalam carousel", async () => {
    renderCarousel();
    const region = screen.getByRole("region", { name: "Tour" });
    await fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: SLIDE_WIDTH });
    await fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0 });
  });

  it("titik menandai slide aktif dan melompat ke slide", async () => {
    renderCarousel({ showDots: true });
    const dots = screen.getAllByRole("button", { name: /Go to slide/ });
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute("aria-current", "true");

    await fireEvent.click(dots[2]!);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: SLIDE_WIDTH * 2 });
    expect(dots[2]).toHaveAttribute("aria-current", "true");
    expect(dots[2]).toHaveAttribute("data-state", "active");
    expect(dots[0]).not.toHaveAttribute("aria-current");
  });

  it("label menimpa default, perView, dan class user di akhir", () => {
    renderCarousel(
      {
        showDots: true,
        perView: 2,
        previousLabel: "Slide sebelumnya",
        nextLabel: "Slide berikutnya",
        slideLabel: "{index} dari {total}",
        dotLabel: "Ke slide {index}",
      },
      { class: "max-w-md" },
    );
    expect(
      screen.getByRole("button", { name: "Slide sebelumnya" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Slide berikutnya" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "2 dari 3" })).toHaveClass(
      "basis-[calc((100%-1rem)/2)]",
    );
    expect(
      screen.getByRole("button", { name: "Ke slide 3" }),
    ).toBeInTheDocument();
    const region = screen.getByRole("region", { name: "Tour" });
    expect(region.className.endsWith("max-w-md")).toBe(true);
  });
});
