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
import { fireEvent, screen } from "@testing-library/dom";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CopyButton } from "../../components/copy-button/copy-button.component";
import { FlipButton } from "../../components/flip-button/flip-button.component";
import { GithubStarsButton } from "../../components/github-stars-button/github-stars-button.component";
import { HoldButton } from "../../components/hold-button/hold-button.component";
import { RippleButton } from "../../components/ripple-button/ripple-button.component";
import { ShimmerButton } from "../../components/shimmer-button/shimmer-button.component";

const writeText = vi.fn<(text: string) => Promise<void>>();

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
  writeText.mockReset().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
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

/** Lets pending promise callbacks (the clipboard write) run. */
const flush = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve();
};

/** A fake Web Animations API that records calls. */
const stubAnimate = () => {
  const animation = {
    play: vi.fn(),
    pause: vi.fn(),
    cancel: vi.fn(),
    onfinish: null as null | (() => void),
  };
  const animate = vi.fn(() => animation);
  HTMLElement.prototype.animate = animate as unknown as HTMLElement["animate"];
  return { animate, animation };
};

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: reduce })),
  );

@Component({
  imports: [CopyButton],
  template: `
    <markas-copy-button
      text="INV-2048"
      copiedLabel="Tersalin"
      class="ml-1"
      id="copy-id"
    >
      Copy ID
    </markas-copy-button>
    <markas-copy-button text="abc" size="sm" copyLabel="Salin" />
  `,
})
class CopyHost {}

@Component({
  imports: [FlipButton],
  template: `
    <button markas-flip-button size="lg" class="mt-2">
      Download
      <ng-container back><em>PDF</em></ng-container>
    </button>
    <button markas-flip-button backLabel="No card needed">Start trial</button>
    <button markas-flip-button variant="secondary">Same on both</button>
  `,
})
class FlipHost {}

@Component({
  imports: [HoldButton],
  template: `
    <markas-hold-button
      [duration]="1000"
      class="mt-2"
      (complete)="completed = completed + 1"
    >
      Hold to delete
    </markas-hold-button>
    <markas-hold-button holdLabel="Tahan untuk konfirmasi">
      Hapus
    </markas-hold-button>
  `,
})
class HoldHost {
  completed = 0;
}

@Component({
  imports: [RippleButton],
  template: `
    <button
      markas-ripple-button
      type="submit"
      class="mt-2"
      (click)="clicks = clicks + 1"
    >
      Send
    </button>
  `,
})
class RippleHost {
  clicks = 0;
}

@Component({
  imports: [ShimmerButton],
  template: `
    <button
      markas-shimmer-button
      variant="secondary"
      size="lg"
      class="w-full"
      [duration]="3000"
    >
      Upgrade
    </button>
  `,
})
class ShimmerHost {}

@Component({
  imports: [GithubStarsButton],
  template: `
    <a
      markas-github-stars-button
      href="javascript:alert(1)"
      [stars]="1240000"
      starsLabel="{{ '{' }}count} bintang"
      class="mt-2"
    >
      Bintang
    </a>
    <a markas-github-stars-button href="https://github.com/o/r" stars="500">
      Star
    </a>
  `,
})
class StarsHost {}

describe("Angular CopyButton", () => {
  it("copies, announces, resets, and moves id and class to the button", async () => {
    const fixture = await mount(CopyHost);
    vi.useFakeTimers();
    const button = screen.getByRole("button", { name: "Copy ID" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("id", "copy-id");
    expect(button.classList).toContain("ml-1");
    expect(button.classList).toContain("h-10");
    expect(button.closest("markas-copy-button")).not.toHaveAttribute("id");

    fireEvent.click(button);
    await flush();
    fixture.detectChanges();
    expect(writeText).toHaveBeenCalledWith("INV-2048");
    expect(button).toHaveAttribute("data-state", "copied");
    expect(
      button.parentElement?.querySelector("[role=status]"),
    ).toHaveTextContent("Tersalin");

    vi.advanceTimersByTime(2000);
    fixture.detectChanges();
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("is square and named by copyLabel without projected content", async () => {
    await mount(CopyHost);
    const button = screen.getByRole("button", { name: "Salin" });
    expect(button.classList).toContain("size-8");
    expect(button.classList).not.toContain("px-3");
  });

  it("stays idle when the clipboard rejects", async () => {
    writeText.mockRejectedValue(new Error("blocked"));
    const fixture = await mount(CopyHost);
    const button = screen.getByRole("button", { name: "Copy ID" });
    fireEvent.click(button);
    await fixture.whenStable();
    expect(button).toHaveAttribute("data-state", "idle");
  });
});

describe("Angular FlipButton", () => {
  it("projects the back slot, prefers backLabel, and copies the label otherwise", async () => {
    await mount(FlipHost);
    const download = screen.getByRole("button", { name: "Download" });
    expect(download).toHaveAttribute("type", "button");
    expect(download.classList).toContain("h-12");
    expect(download.classList).toContain("mt-2");
    expect(screen.getByText("PDF").closest("[aria-hidden]")).toBeTruthy();
    expect(screen.getByText("No card needed")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getAllByText("Same on both")).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: "Same on both" }),
    ).toHaveAccessibleName("Same on both");
  });
});

describe("Angular HoldButton", () => {
  it("completes after the full hold and emits complete", async () => {
    const fixture = await mount(HoldHost);
    vi.useFakeTimers();
    const button = screen.getByRole("button", { name: "Hold to delete" });
    expect(button).toHaveAccessibleDescription("Press and hold to confirm");
    expect(button.style.getPropertyValue("--hold-duration")).toBe("1000ms");
    expect(button.classList).toContain("mt-2");

    fireEvent.keyDown(button, { key: " " });
    fixture.detectChanges();
    expect(button).toHaveAttribute("data-state", "holding");
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    expect(button).toHaveAttribute("data-state", "complete");
    expect(fixture.componentInstance.completed).toBe(1);
    fireEvent.keyUp(button, { key: " " });
    fixture.detectChanges();
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("cancels when released early, ignores the right button, translates the hint", async () => {
    const fixture = await mount(HoldHost);
    vi.useFakeTimers();
    const button = screen.getByRole("button", { name: "Hapus" });
    expect(button).toHaveAccessibleDescription("Tahan untuk konfirmasi");

    fireEvent.pointerDown(button, { button: 0 });
    fixture.detectChanges();
    expect(button).toHaveAttribute("data-state", "holding");
    vi.advanceTimersByTime(700);
    fireEvent.pointerLeave(button);
    fixture.detectChanges();
    expect(button).toHaveAttribute("data-state", "idle");

    fireEvent.keyDown(button, { key: "Enter" });
    vi.advanceTimersByTime(700);
    fireEvent.keyUp(button, { key: "Enter" });
    vi.advanceTimersByTime(2000);
    fixture.detectChanges();
    expect(button).toHaveAttribute("data-state", "idle");
    expect(fixture.componentInstance.completed).toBe(0);

    fireEvent.pointerDown(button, { button: 2 });
    fixture.detectChanges();
    expect(button).toHaveAttribute("data-state", "idle");
  });
});

describe("Angular RippleButton", () => {
  it("adds a wave that removes itself and keeps the user click handler", async () => {
    const { animate, animation } = stubAnimate();
    const fixture = await mount(RippleHost);
    const button = screen.getByRole("button", { name: "Send" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button.classList).toContain("mt-2");
    const layer = button.querySelector("span[aria-hidden=true]");
    expect(layer?.classList).toContain("absolute");
    fireEvent.click(button, { detail: 1, clientX: 5, clientY: 5 });
    expect(fixture.componentInstance.clicks).toBe(1);
    expect(animate).toHaveBeenCalledOnce();
    expect(layer?.children).toHaveLength(1);
    animation.onfinish?.();
    expect(layer?.children).toHaveLength(0);
  });

  it("draws nothing with reduced motion", async () => {
    const { animate } = stubAnimate();
    stubReducedMotion(true);
    await mount(RippleHost);
    fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Angular ShimmerButton", () => {
  it("renders the sheen for the variant and starts the sweep with motion", async () => {
    const { animate, animation } = stubAnimate();
    stubReducedMotion(false);
    const fixture = await mount(ShimmerHost);
    const button = screen.getByRole("button", { name: "Upgrade" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.classList).toContain("h-12");
    expect(button.classList).toContain("w-full");
    expect(button.querySelector("span[aria-hidden=true]")?.className).toContain(
      "via-primary/10",
    );
    expect(animate).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ duration: 3000, iterations: Infinity }),
    );
    fixture.destroy();
    expect(animation.cancel).toHaveBeenCalled();
  });

  it("skips the sweep with reduced motion", async () => {
    const { animate } = stubAnimate();
    stubReducedMotion(true);
    await mount(ShimmerHost);
    expect(animate).not.toHaveBeenCalled();
  });
});

describe("Angular GithubStarsButton", () => {
  it("blocks unsafe hrefs, shows a compact count, and labels the full count", async () => {
    await mount(StarsHost);
    const link = screen.getByRole("link", {
      name: /Bintang\s*1,240,000 bintang/,
    });
    expect(link).toHaveAttribute("href", "#");
    expect(link.classList).toContain("border-line");
    expect(link.classList).toContain("mt-2");
    expect(screen.getByText("1.2M")).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getByRole("link", { name: /Star\s*500 stars/ }),
    ).toHaveAttribute("href", "https://github.com/o/r");
  });

  it("counts up from zero once visible", async () => {
    stubReducedMotion(false);
    type Notify = (entries: { isIntersecting: boolean }[]) => void;
    const observed = new Map<Element, Notify>();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(private readonly callback: Notify) {}
        observe(element: Element) {
          observed.set(element, this.callback);
        }
        disconnect() {}
      },
    );
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
      frames.push(callback),
    );
    await mount(StarsHost);
    const link = screen.getByRole("link", { name: /Star\s*500 stars/ });
    const number = link.querySelectorAll("span[aria-hidden=true]")[1];
    expect(number).toHaveTextContent("0");
    observed.get(number!)?.([{ isIntersecting: true }]);
    // Angular's scheduler may queue frames too, so run them all.
    for (const frame of frames.splice(0)) frame(performance.now() + 5000);
    expect(number).toHaveTextContent("500");
  });
});
