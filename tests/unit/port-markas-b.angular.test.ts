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
import { screen } from "@testing-library/dom";
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
import { ImageCompare } from "../../components/image-compare/image-compare.component";
import { ImageTrail } from "../../components/image-trail/image-trail.component";
import { Magnet } from "../../components/magnet/magnet.component";
import { PinnedList } from "../../components/pinned-list/pinned-list.component";
import { PixelTrail } from "../../components/pixel-trail/pixel-trail.component";
import {
  PromptInput,
  type PromptInputValue,
} from "../../components/prompt-input/prompt-input.component";
import { Screensaver } from "../../components/screensaver/screensaver.component";
import { StackingCards } from "../../components/stacking-cards/stacking-cards.component";
import { ThemeToggle } from "../../components/theme-toggle/theme-toggle.component";
import { TiltCard } from "../../components/tilt-card/tilt-card.component";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  // jsdom has no Web Animations API.
  Element.prototype.animate ??= vi.fn() as unknown as Element["animate"];
});

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

afterEach(() => {
  document.body.innerHTML = "";
  document.documentElement.classList.remove("dark");
  localStorage.clear();
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

@Component({
  imports: [ImageCompare],
  template: `
    <markas-image-compare
      [(position)]="position"
      aria-label="Kitchen"
      sliderLabel="Posisi"
      class="mt-2"
    >
      <span before>Old</span>
      <span after>New</span>
    </markas-image-compare>
  `,
})
class CompareHost {
  readonly position = signal(40);
}

@Component({
  imports: [PinnedList],
  template: `
    <markas-pinned-list
      [items]="items"
      [(pinned)]="pinned"
      pinLabel="Sematkan {label}"
      class="mt-2"
    />
  `,
})
class PinnedHost {
  readonly items = [
    { value: "a", label: "Alpha", description: "First" },
    { value: "b", label: "Beta", meta: "2h" },
  ];
  readonly pinned = signal(["a"]);
}

@Component({
  imports: [PromptInput],
  template: `
    <markas-prompt-input
      [(value)]="text"
      [loading]="loading()"
      [maxLength]="20"
      sendLabel="Kirim"
      class="mt-2"
      (send)="onSend($event)"
      (stop)="loading.set(false)"
    />
  `,
})
class PromptHost {
  readonly text = signal("Hello");
  readonly loading = signal(false);
  sent: PromptInputValue[] = [];
  onSend(value: PromptInputValue) {
    this.sent.push(value);
    this.loading.set(true);
  }
}

@Component({
  imports: [ThemeToggle],
  template: `<button
    markas-theme-toggle
    class="ml-1"
    (themeChange)="last = $event"
  ></button>`,
})
class ThemeHost {
  last = "";
}

@Component({
  imports: [
    Magnet,
    TiltCard,
    StackingCards,
    PixelTrail,
    Screensaver,
    ImageTrail,
  ],
  template: `
    <markas-magnet class="mx-auto"><b>Go</b></markas-magnet>
    <markas-tilt-card [glare]="false" class="p-6"><p>Card</p></markas-tilt-card>
    <markas-stacking-cards [top]="24" [offset]="8" variant="fan">
      <article>One</article>
    </markas-stacking-cards>
    <markas-pixel-trail color="success" showGrid />
    <markas-screensaver [tones]="['ink', 'danger']" aria-hidden="true">
      <span>Bounce</span>
    </markas-screensaver>
    <markas-image-trail />
  `,
})
class MotionHost {}

describe("Angular ImageCompare", () => {
  it("projects both sides, follows the keys, and updates [(position)]", async () => {
    const fixture = await mount(CompareHost);
    const group = screen.getByRole("group", { name: "Kitchen" });
    expect(group.classList).toContain("mt-2");
    expect(group.closest("markas-image-compare")).not.toHaveAttribute(
      "aria-label",
    );
    expect(screen.getByText("Old")).toBeTruthy();
    const slider = screen.getByRole("slider", { name: "Posisi" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    slider.focus();
    await userEvent.keyboard("{ArrowLeft}");
    await fixture.whenStable();
    expect(slider).toHaveAttribute("aria-valuenow", "35");
    expect(fixture.componentInstance.position()).toBe(35);
    expect(group.style.getPropertyValue("--position")).toBe("35%");
  });
});

describe("Angular PinnedList", () => {
  it("pins a row into Pinned, announces it, and updates [(pinned)]", async () => {
    const fixture = await mount(PinnedHost);
    expect(document.querySelector(".grid.gap-5")!.classList).toContain("mt-2");
    await userEvent.click(
      screen.getByRole("button", { name: "Sematkan Beta" }),
    );
    await fixture.whenStable();
    const beta = screen.getByRole("button", { name: "Sematkan Beta" });
    expect(beta).toHaveAttribute("aria-pressed", "true");
    expect(beta.closest("ul")).toHaveAttribute("aria-label", "Pinned");
    expect(fixture.componentInstance.pinned()).toEqual(["a", "b"]);
    expect(screen.getByRole("status")).toHaveTextContent("Beta pinned");
  });
});

describe("Angular PromptInput", () => {
  it("sends with Enter, clears [(value)], and the stop button ends loading", async () => {
    const fixture = await mount(PromptHost);
    expect(document.querySelector("form")!.classList).toContain("mt-2");
    expect(screen.getByText("5/20")).toBeTruthy();
    const field = screen.getByRole("textbox", { name: "Message" });
    await userEvent.click(field);
    await userEvent.keyboard("{Enter}");
    await fixture.whenStable();
    expect(fixture.componentInstance.sent).toEqual([
      { text: "Hello", files: [] },
    ]);
    expect(fixture.componentInstance.text()).toBe("");
    const stop = screen.getByRole("button", { name: "Stop" });
    await userEvent.click(stop);
    await fixture.whenStable();
    expect(screen.getByRole("button", { name: "Kirim" })).toBeDisabled();
    expect(fixture.componentInstance.sent).toHaveLength(1);
  });
});

describe("Angular ThemeToggle", () => {
  it("toggles the html dark class, label, storage, and emits themeChange", async () => {
    const fixture = await mount(ThemeHost);
    const button = screen.getByRole("button", { name: "Switch to dark theme" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.classList).toContain("ml-1");
    await userEvent.click(button);
    await fixture.whenStable();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("markas-theme")).toBe("dark");
    expect(fixture.componentInstance.last).toBe("dark");
    await vi.waitFor(() =>
      expect(button).toHaveAccessibleName("Switch to light theme"),
    );
  });
});

describe("Angular motion wrappers", () => {
  it("keeps hosts out of layout and moves class and aria-hidden inside", async () => {
    await mount(MotionHost);
    expect(screen.getByText("Go").parentElement!.classList).toContain(
      "mx-auto",
    );
    const card = screen.getByText("Card").parentElement!;
    expect(card.classList).toContain("p-6");
    expect(card.querySelector("[aria-hidden=true]")).toBeNull();
    const stack = screen.getByText("One").parentElement!;
    expect(stack.style.getPropertyValue("--stack-top")).toBe("24px");
    expect(screen.getByText("One").style.getPropertyValue("--stack-i")).toBe(
      "0",
    );
    const canvas = document.querySelector("canvas")!;
    expect(canvas.classList).toContain("text-success");
    const area = screen.getByText("Bounce").parentElement!;
    expect(area).toHaveAttribute("aria-hidden", "true");
    expect(area.closest("markas-screensaver")).not.toHaveAttribute(
      "aria-hidden",
    );
    expect(screen.getByText("Bounce")).toHaveAttribute("data-tone", "ink");
    expect(
      document.querySelector("markas-image-trail [hidden] .rounded-full"),
    ).not.toBeNull();
  });
});
