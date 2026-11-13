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
import { fireEvent, screen, waitFor, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { AvatarGroup } from "../../components/avatar-group/avatar-group.component";
import { LetterSwap } from "../../components/letter-swap/letter-swap.component";
import { Marquee } from "../../components/marquee/marquee.component";
import { NumberTicker } from "../../components/number-ticker/number-ticker.component";
import { ScrollProgress } from "../../components/scroll-progress/scroll-progress.component";
import { SpotlightCard } from "../../components/spotlight-card/spotlight-card.component";
import { TextHighlighter } from "../../components/text-highlighter/text-highlighter.component";

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
  vi.unstubAllGlobals();
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  document.body.replaceChildren();
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

/** Forces prefers-reduced-motion: reduce for one test. */
const preferReducedMotion = () =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({ matches: true } as MediaQueryList),
  );

/** jsdom has no Web Animations API. */
function mockAnimate() {
  const animation = { pause: vi.fn(), play: vi.fn(), cancel: vi.fn() };
  const animate = vi.fn().mockReturnValue(animation);
  HTMLElement.prototype.animate =
    animate as typeof HTMLElement.prototype.animate;
  return { animate, animation };
}

@Component({
  imports: [AvatarGroup],
  template: `
    <div
      markas-avatar-group
      [items]="team"
      [max]="3"
      size="lg"
      groupLabel="Assignees"
      moreLabel="{{ '{' }}count} lainnya"
      class="mt-2"
    ></div>
    <div markas-avatar-group [items]="pair"></div>
  `,
})
class AvatarGroupHost {
  readonly team = [
    { name: "Dewi Lestari", src: "/dewi.png" },
    { name: "Budi Santoso" },
    { name: "Siti Aminah" },
    { name: "John Carter" },
    { name: "Maya Putri" },
    { name: "Ana Lim" },
  ];
  readonly pair = this.team.slice(0, 2);
}

@Component({
  imports: [LetterSwap, ScrollProgress],
  template: `
    <a href="/pricing"
      ><span
        markas-letter-swap
        text="Pricing"
        [mode]="mode()"
        direction="down"
        stagger="20"
      ></span
    ></a>
    <div data-testid="box">
      <div
        markas-scroll-progress
        target="parent"
        color="success"
        size="lg"
      ></div>
    </div>
    <div markas-scroll-progress class="z-40"></div>
  `,
})
class LinksHost {
  readonly mode = signal<"forward" | "pingpong">("forward");
}

@Component({
  imports: [Marquee],
  template: `
    <div markas-marquee vertical reverse duration="10" class="h-64">
      <span>Laravel</span>
    </div>
  `,
})
class MarqueeHost {}

@Component({
  imports: [NumberTicker],
  template: `
    <span
      markas-number-ticker
      value="1500"
      from="9000"
      locale="id-ID"
      prefix="Rp"
      duration="40"
      class="text-2xl"
    ></span>
  `,
})
class NumberTickerHost {}

@Component({
  imports: [SpotlightCard],
  template: `
    <div
      markas-spotlight-card
      color="success"
      class="w-64"
      (pointermove)="moves = moves + 1"
    >
      <p>Content</p>
    </div>
  `,
})
class SpotlightCardHost {
  moves = 0;
}

@Component({
  imports: [TextHighlighter],
  template: `
    <p>
      Check the
      <mark
        markas-text-highlighter
        #mark="markasTextHighlighter"
        trigger="manual"
        [active]="active()"
        variant="marker"
        color="primary"
        duration="400"
        delay="100"
        class="font-bold"
        >title</mark
      >.
    </p>
    <a href="/docs"
      ><span
        markas-text-highlighter
        trigger="hover"
        direction="btt"
        color="success"
        >Docs</span
      ></a
    >
    <button type="button" (click)="active.set(!active())">Toggle</button>
    <button type="button" (click)="mark.animate('rtl')">Animate</button>
    <button type="button" (click)="mark.reset()">Reset</button>
  `,
})
class HighlighterHost {
  readonly active = signal(false);
}

describe("Angular AvatarGroup", () => {
  it("names the group and each person, and collapses the rest into a chip", async () => {
    await mount(AvatarGroupHost);
    const group = screen.getByRole("group", { name: "Assignees" });
    expect(group.classList).toContain("mt-2");
    expect(group.classList).toContain("isolate");
    const inGroup = within(group);
    expect(inGroup.getByRole("img", { name: "Dewi Lestari" })).toHaveAttribute(
      "src",
      "/dewi.png",
    );
    expect(
      inGroup.getByRole("img", { name: "Budi Santoso" }),
    ).toHaveTextContent("BS");
    expect(screen.getByText("3 lainnya")).toHaveClass("sr-only");
    expect(screen.getByText("+3")).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getByText("John Carter, Maya Putri, Ana Lim"),
    ).toHaveAttribute("aria-hidden", "true");
    expect(group.querySelectorAll(".size-12")).toHaveLength(4);
  });

  it("uses the English defaults and skips the chip when everyone fits", async () => {
    await mount(AvatarGroupHost);
    const group = screen.getByRole("group", { name: "Members" });
    expect(group.querySelector(".sr-only")).toBeNull();
  });
});

describe("Angular LetterSwap", () => {
  it("reads the text once and swaps every letter on hover of the link", async () => {
    const { animate } = mockAnimate();
    await mount(LinksHost);
    const link = screen.getByRole("link", { name: "Pricing" });
    const letters = link.querySelectorAll("[data-letter]");
    expect(letters).toHaveLength(7);
    expect(letters[0]).toHaveAttribute("aria-hidden", "true");
    expect(letters[0]!.lastElementChild).toHaveClass("bottom-full");
    fireEvent.pointerEnter(link);
    expect(animate).toHaveBeenCalledTimes(7);
    expect(animate.mock.calls[1]![1]).toMatchObject({ delay: 20 });
  });

  it("pingpong holds the swap with a transition until focus leaves", async () => {
    const fixture = await mount(LinksHost);
    fixture.componentInstance.mode.set("pingpong");
    await fixture.whenStable();
    const link = screen.getByRole("link", { name: "Pricing" });
    const first = link.querySelector<HTMLElement>("[data-letter]")!;
    fireEvent.focusIn(link);
    expect(first.style.transform).toBe("translateY(100%)");
    fireEvent.focusOut(link);
    expect(first.style.transform).toBe("");
  });

  it("stays still with reduced motion", async () => {
    preferReducedMotion();
    const { animate } = mockAnimate();
    await mount(LinksHost);
    fireEvent.pointerEnter(screen.getByRole("link"));
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Angular Marquee", () => {
  it("clones the items into a hidden inert copy and pauses on hover", async () => {
    const { animate, animation } = mockAnimate();
    await mount(MarqueeHost);
    const root = document.querySelector<HTMLElement>("[markas-marquee]")!;
    expect(root.classList).toContain("flex-col");
    expect(root.classList).toContain("mask-y-from-85%");
    expect(root.classList).toContain("h-64");
    const [first, copy] = [...root.children];
    expect(first).not.toHaveAttribute("aria-hidden");
    expect(copy).toHaveAttribute("aria-hidden", "true");
    expect(copy).toHaveAttribute("inert");
    expect(screen.getAllByText("Laravel")).toHaveLength(2);
    expect(animate).toHaveBeenCalledTimes(2);
    expect(animate.mock.calls[0]![1]).toMatchObject({
      duration: 10000,
      direction: "reverse",
    });
    fireEvent.mouseEnter(root);
    expect(animation.pause).toHaveBeenCalledTimes(2);
  });

  it("does not animate with reduced motion", async () => {
    preferReducedMotion();
    const { animate } = mockAnimate();
    await mount(MarqueeHost);
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Angular NumberTicker", () => {
  it("counts from `from` to the formatted value", async () => {
    await mount(NumberTickerHost);
    const root = document.querySelector("[markas-number-ticker]")!;
    expect(root.classList).toContain("text-2xl");
    expect(root.classList).toContain("tabular-nums");
    expect(
      screen.getByText("Rp1.500", { selector: ".sr-only" }),
    ).toBeInTheDocument();
    const counter = root.lastElementChild!;
    await waitFor(() => expect(counter).toHaveTextContent("Rp1.500"));
  });

  it("shows the final value right away with reduced motion", async () => {
    preferReducedMotion();
    await mount(NumberTickerHost);
    const root = document.querySelector("[markas-number-ticker]")!;
    expect(root.lastElementChild).toHaveTextContent("Rp1.500");
  });
});

describe("Angular ScrollProgress", () => {
  it("is a hidden fixed bar for the page by default", async () => {
    await mount(LinksHost);
    const root = document.querySelector<HTMLElement>(".z-40")!;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).toHaveClass("fixed", "top-0", "h-0.5");
    expect((root.firstElementChild as HTMLElement).style.transform).toBe(
      "scaleX(0)",
    );
  });

  it("follows the scroll position of its parent", async () => {
    await mount(LinksHost);
    const box = screen.getByTestId("box");
    Object.defineProperties(box, {
      scrollHeight: { value: 600 },
      clientHeight: { value: 200 },
      scrollTop: { value: 200, writable: true },
    });
    const root = box.firstElementChild as HTMLElement;
    const fill = root.firstElementChild as HTMLElement;
    expect(root).toHaveClass("sticky", "h-1.5");
    expect(fill).toHaveClass("bg-success");
    fireEvent.scroll(box);
    await waitFor(() => expect(fill.style.transform).toBe("scaleX(0.5)"));
  });
});

describe("Angular SpotlightCard", () => {
  it("renders content, hidden light layers, and follows the pointer", async () => {
    const fixture = await mount(SpotlightCardHost);
    const card = document.querySelector<HTMLElement>(
      "[markas-spotlight-card]",
    )!;
    expect(card.classList).toContain("w-64");
    expect(card).toHaveClass("[--spot-color:var(--color-success)]");
    expect(card.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    expect(screen.getByText("Content")).toBeInTheDocument();
    fireEvent.pointerMove(card, { clientX: 40, clientY: 24 });
    expect(card.style.getPropertyValue("--spot-x")).toBe("40px");
    expect(card.style.getPropertyValue("--spot-y")).toBe("24px");
    expect(fixture.componentInstance.moves).toBe(1);
  });
});

describe("Angular TextHighlighter", () => {
  it("highlights the element it sits on, with state, direction, and timing", async () => {
    await mount(HighlighterHost);
    const mark = document.querySelector<HTMLElement>("mark")!;
    expect(mark).toHaveAttribute("data-state", "inactive");
    expect(mark).toHaveAttribute("data-direction", "ltr");
    expect(mark).toHaveAttribute("data-trigger", "manual");
    expect(mark.classList).toContain("[--markas-th-c:var(--color-primary)]");
    expect(mark.classList).toContain("font-bold");
    expect(mark.style.transitionDuration).toBe("400ms");
    expect(mark.style.transitionDelay).toBe("100ms");
  });

  it("follows active, animate(direction), and reset() for trigger manual", async () => {
    const fixture = await mount(HighlighterHost);
    const mark = document.querySelector("mark")!;
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    await fixture.whenStable();
    expect(mark).toHaveAttribute("data-state", "active");
    await userEvent.click(screen.getByRole("button", { name: "Reset" }));
    await fixture.whenStable();
    expect(mark).toHaveAttribute("data-state", "inactive");
    await userEvent.click(screen.getByRole("button", { name: "Animate" }));
    await fixture.whenStable();
    expect(mark).toHaveAttribute("data-state", "active");
    expect(mark).toHaveAttribute("data-direction", "rtl");
  });

  it("hover and focus on the closest link draw the highlight", async () => {
    const fixture = await mount(HighlighterHost);
    const link = screen.getByRole("link", { name: "Docs" });
    const mark = link.firstElementChild!;
    expect(mark).toHaveAttribute("data-direction", "btt");
    fireEvent.pointerEnter(link);
    await fixture.whenStable();
    expect(mark).toHaveAttribute("data-state", "active");
    fireEvent.pointerLeave(link);
    await fixture.whenStable();
    expect(mark).toHaveAttribute("data-state", "inactive");
  });
});
