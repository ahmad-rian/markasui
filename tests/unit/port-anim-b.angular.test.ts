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
import { screen } from "@testing-library/dom";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { TextRotate } from "../../components/text-rotate/text-rotate.component";
import { TextScramble } from "../../components/text-scramble/text-scramble.component";
import { TypingText } from "../../components/typing-text/typing-text.component";
import { UnderlineLink } from "../../components/underline-link/underline-link.component";
import { VariableWeightText } from "../../components/variable-weight-text/variable-weight-text.component";
import { VerticalCutReveal } from "../../components/vertical-cut-reveal/vertical-cut-reveal.component";

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
  vi.useRealTimers();
  vi.unstubAllGlobals();
  // jsdom has no Element.animate; tests that stub it remove it again.
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  document.body.replaceChildren();
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

/** Mounts without waiting for the scheduler, which never settles under fake timers. */
function mountNow<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  fixture.detectChanges();
  return fixture;
}

/** Lets pending promise callbacks run. */
const flush = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve();
};

/** A fake Web Animations API whose animations finish right away. */
const stubAnimate = () => {
  const animate = vi.fn(() => ({
    finished: Promise.resolve(),
    cancel: vi.fn(),
  }));
  HTMLElement.prototype.animate = animate as unknown as HTMLElement["animate"];
  return animate;
};

const stubReducedMotion = () =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true })),
  );

const unitTexts = (root: ParentNode = document) =>
  [...root.querySelectorAll("[data-unit]")].map((el) => el.textContent);

@Component({
  imports: [TextRotate],
  template: `<span
      markas-text-rotate
      id="stack"
      [words]="words"
      interval="1000"
      class="text-muted"
    ></span>
    <span
      markas-text-rotate
      id="phrases"
      [words]="phrases"
      split="words"
    ></span>`,
})
class RotateHost {
  words = ["Laravel", "React"];
  phrases = ["with confidence", "faster"];
}

@Component({
  imports: [TextScramble],
  template: `<a href="#"
      ><span markas-text-scramble text="Open the brief" class="ml-1"></span></a
    ><span
      markas-text-scramble
      id="mount"
      text="Access granted"
      trigger="mount"
      charset="binary"
      duration="200"
    ></span>`,
})
class ScrambleHost {}

@Component({
  imports: [TypingText],
  template: `<span
      markas-typing-text
      id="typed"
      [words]="words"
      typeSpeed="10"
      deleteSpeed="10"
      pause="100"
      class="text-muted"
    ></span>
    <span
      markas-typing-text
      id="no-caret"
      [words]="words"
      [cursor]="false"
    ></span>`,
})
class TypingHost {
  words = ["Vue", "Svelte"];
}

@Component({
  imports: [UnderlineLink],
  template: `<a markas-underline-link href="/docs" active class="text-ink"
      >Docs</a
    >
    <a
      markas-underline-link
      href=" javascript:alert(1)"
      variant="goes-out-comes-in"
      >Changelog</a
    >
    <a markas-underline-link href="#" variant="scribble">Guide</a>`,
})
class LinkHost {}

@Component({
  imports: [VariableWeightText],
  template: `<span
    markas-variable-weight-text
    text="Hai"
    min="200"
    class="text-6xl"
  ></span>`,
})
class WeightHost {}

@Component({
  imports: [VerticalCutReveal],
  template: `<span
      markas-vertical-cut-reveal
      id="words"
      text="Team plan"
    ></span>
    <span
      markas-vertical-cut-reveal
      id="chars"
      text="Rp 9"
      split="chars"
    ></span>
    <span
      markas-vertical-cut-reveal
      id="lines"
      [text]="lines"
      split="lines"
    ></span>`,
})
class RevealHost {
  lines = "Design once.\nShip it.";
}

@Component({
  imports: [VerticalCutReveal],
  template: `<span
    markas-vertical-cut-reveal
    text="a b c"
    from="last"
    stagger="10"
    delay="5"
    direction="down"
  ></span>`,
})
class StaggerHost {}

describe("Angular TextRotate", () => {
  it("reads every word once, keeps the user class, and splits the first word", async () => {
    stubReducedMotion();
    await mount(RotateHost);
    const root = document.getElementById("stack")!;
    expect(root.classList).toContain("inline-flex");
    expect(root.classList).toContain("text-muted");
    expect(screen.getByText("Laravel, React")).toHaveClass("sr-only");
    expect(unitTexts(root)).toEqual(Array.from("Laravel"));
    expect(root.querySelector("[data-unit]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(unitTexts(document.getElementById("phrases")!)).toEqual([
      "with ",
      "confidence",
    ]);
  });

  it("swaps to the next word after the interval", async () => {
    vi.useFakeTimers();
    const animate = stubAnimate();
    mountNow(RotateHost);
    const root = document.getElementById("stack")!;
    vi.advanceTimersByTime(1000);
    await flush();
    TestBed.tick();
    expect(unitTexts(root)).toEqual(Array.from("React"));
    // Seven exits, five enters, and one width change. The second rotator waits 2500 ms.
    expect(animate).toHaveBeenCalledTimes(7 + 5 + 1);
  });
});

describe("Angular TextScramble", () => {
  it("renders the text for readers, a width holder, and the visible layer", async () => {
    stubReducedMotion();
    await mount(ScrambleHost);
    const root = document.querySelector("a > span")!;
    expect(root.classList).toContain("inline-grid");
    expect(root.classList).toContain("ml-1");
    expect(root.querySelector(".sr-only")).toHaveTextContent("Open the brief");
    expect(root.querySelector(".invisible")).toHaveTextContent(
      "Open the brief",
    );
    expect(root.lastElementChild).toHaveTextContent("Open the brief");
  });

  it("scrambles right away on mount, keeps spaces, and decodes back", async () => {
    vi.useFakeTimers();
    const fixture = mountNow(ScrambleHost);
    const layer = document.getElementById("mount")!.lastElementChild!;
    const scrambled = layer.textContent ?? "";
    expect(scrambled).toMatch(/^[01]{6} [01]{7}$/);
    vi.advanceTimersByTime(400);
    fixture.detectChanges();
    expect(layer).toHaveTextContent("Access granted");
  });
});

describe("Angular TypingText", () => {
  it("shows the first word, reads every word, and hides the caret on request", async () => {
    stubReducedMotion();
    await mount(TypingHost);
    const root = document.getElementById("typed")!;
    expect(root.classList).toContain("inline");
    expect(root.classList).toContain("text-muted");
    expect(root.querySelector(".sr-only")).toHaveTextContent("Vue, Svelte");
    expect(root.querySelectorAll("[aria-hidden=true]")).toHaveLength(2);
    const plain = document.getElementById("no-caret")!;
    expect(plain.querySelectorAll("[aria-hidden=true]")).toHaveLength(1);
    expect(plain.querySelector("[aria-hidden=true]")).toHaveTextContent("Vue");
  });

  it("deletes the word and types the next one", async () => {
    vi.useFakeTimers();
    const fixture = mountNow(TypingHost);
    const typed = document.querySelector("#typed .sr-only + span")!;
    vi.advanceTimersByTime(125);
    fixture.detectChanges();
    expect(typed.textContent).toBe("");
    vi.advanceTimersByTime(70);
    fixture.detectChanges();
    expect(typed).toHaveTextContent("Svelte");
  });
});

describe("Angular UnderlineLink", () => {
  it("marks the current page, cleans the href, and draws lines or a scribble", async () => {
    await mount(LinkHost);
    const docs = screen.getByRole("link", { name: "Docs" });
    expect(docs).toHaveAttribute("href", "/docs");
    expect(docs).toHaveAttribute("aria-current", "page");
    expect(docs.classList).toContain("group");
    expect(docs.classList).toContain("text-ink");
    expect(docs.querySelectorAll("span[aria-hidden=true]")).toHaveLength(1);

    const changelog = screen.getByRole("link", { name: "Changelog" });
    expect(changelog).toHaveAttribute("href", "#");
    expect(changelog).not.toHaveAttribute("aria-current");
    expect(changelog.querySelectorAll("span[aria-hidden=true]")).toHaveLength(
      2,
    );

    const svg = screen
      .getByRole("link", { name: "Guide" })
      .querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg.querySelector("path")).toHaveAttribute("pathLength", "1");
  });
});

describe("Angular VariableWeightText", () => {
  it("renders one letter per character at the min weight", async () => {
    stubReducedMotion();
    await mount(WeightHost);
    const root = document.querySelector("[markas-variable-weight-text]")!;
    expect(root.classList).toContain("text-6xl");
    expect(screen.getByText("Hai")).toHaveClass("sr-only");
    const letters = [...root.querySelectorAll<HTMLElement>("[data-letter]")];
    expect(letters.map((el) => el.textContent)).toEqual(["H", "a", "i"]);
    expect(letters[0]!.style.fontWeight).toBe("200");
    expect(letters[0]!.style.fontVariationSettings).toMatch(
      /^["']wght["'] 200$/,
    );
  });
});

describe("Angular VerticalCutReveal", () => {
  it("splits words, chars, and lines into units behind a cut", async () => {
    stubReducedMotion();
    await mount(RevealHost);
    const words = document.getElementById("words")!;
    expect(words.querySelector(".sr-only")).toHaveTextContent("Team plan");
    expect(unitTexts(words)).toEqual(["Team", "plan"]);
    expect(words.querySelector("[data-unit]")!.parentElement).toHaveClass(
      "overflow-hidden",
    );
    // A real space between the words, as in React.
    expect(words.querySelector("[aria-hidden=true]")!.textContent).toBe(
      "Team plan",
    );
    expect(unitTexts(document.getElementById("chars")!)).toEqual([
      "R",
      "p",
      "9",
    ]);
    const lines = document.getElementById("lines")!;
    expect(unitTexts(lines)).toEqual(["Design once.", "Ship it."]);
    expect(lines.querySelector(".sr-only")).toHaveTextContent(
      "Design once. Ship it.",
    );
  });

  it("reveals every unit with a stagger from the last one", async () => {
    const animate = stubAnimate();
    await mount(StaggerHost);
    expect(animate).toHaveBeenCalledTimes(3);
    const delays = animate.mock.calls.map(
      (call) => (call as unknown as [unknown, { delay: number }])[1].delay,
    );
    expect(delays).toEqual([25, 15, 5]);
    const units = [...document.querySelectorAll<HTMLElement>("[data-unit]")];
    expect(units.every((el) => el.style.transform === "")).toBe(true);
  });
});
