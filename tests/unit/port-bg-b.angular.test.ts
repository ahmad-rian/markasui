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
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { Meteors } from "../../components/meteors/meteors.component";
import { NoiseBackground } from "../../components/noise-background/noise-background.component";
import { RetroGrid } from "../../components/retro-grid/retro-grid.component";
import { RippleBackground } from "../../components/ripple-background/ripple-background.component";
import { ShootingStars } from "../../components/shooting-stars/shooting-stars.component";
import { Sparkles } from "../../components/sparkles/sparkles.component";
import { SpotlightBeam } from "../../components/spotlight-beam/spotlight-beam.component";
import { StarsBackground } from "../../components/stars-background/stars-background.component";
import { WavyBackground } from "../../components/wavy-background/wavy-background.component";

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
  document.body.replaceChildren();
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

/** Root by id, its decorative layer, and the content wrapper. */
const parts = (id: string) => {
  const root = document.getElementById(id)!;
  const layer = root.querySelector<HTMLElement>(":scope > [aria-hidden=true]")!;
  return { root, layer, content: root.lastElementChild as HTMLElement };
};

@Component({
  imports: [
    Meteors,
    NoiseBackground,
    RetroGrid,
    RippleBackground,
    ShootingStars,
    Sparkles,
    SpotlightBeam,
    StarsBackground,
    WavyBackground,
  ],
  template: `
    <div markas-meteors id="meteors" class="rounded-xl" aria-label="Hero">
      Hello
    </div>
    <div markas-meteors id="comet" variant="comet" angle="500"></div>
    <div markas-meteors id="many" count="500"></div>
    <div markas-noise-background id="noise" intensity="high" size="fine">
      Hello
    </div>
    <div markas-noise-background id="film" variant="film"></div>
    <div
      markas-retro-grid
      id="grid"
      cellSize="40"
      angle="72"
      style="color: red"
    >
      Hello
    </div>
    <div markas-ripple-background id="ripple" rings="3" size="40" gap="24">
      Hello
    </div>
    <div markas-shooting-stars id="night" stars="10">Hello</div>
    <div
      markas-shooting-stars
      id="dawn"
      variant="dawn"
      stars="0"
      trailColor="danger"
    ></div>
    <div markas-sparkles id="field" density="30">Hello</div>
    <div markas-sparkles id="burst" variant="burst" density="4"></div>
    <div markas-spotlight-beam id="beam" follow variant="center">Hello</div>
    <div markas-spotlight-beam id="still">Hello</div>
    <div markas-stars-background id="stars" count="12" color="success">
      Hello
    </div>
    <div markas-wavy-background id="ocean" waves="9">Hello</div>
    <div markas-wavy-background id="silk" variant="silk" waves="1"></div>
  `,
})
class BackgroundsHost {}

describe("Angular backgrounds", () => {
  it("keep the user class and attributes on the root, with an aria-hidden layer and content", async () => {
    await mount(BackgroundsHost);
    for (const id of [
      "meteors",
      "noise",
      "grid",
      "ripple",
      "night",
      "field",
      "beam",
      "stars",
      "ocean",
    ]) {
      const { root, layer, content } = parts(id);
      expect(root.classList, id).toContain("isolate");
      expect(layer.classList, id).toContain("pointer-events-none");
      expect(content, id).toHaveClass("relative");
      expect(content, id).toHaveTextContent("Hello");
    }
    const meteors = parts("meteors").root;
    expect(meteors.classList).toContain("rounded-xl");
    expect(meteors).toHaveAttribute("aria-label", "Hero");
    expect(document.head.textContent).toContain("@keyframes markas-meteor");
  });

  it("meteors follow the variant count, the angle clamp, and the 60 cap", async () => {
    await mount(BackgroundsHost);
    const rain = parts("meteors").layer;
    expect(rain.querySelectorAll("span")).toHaveLength(20);
    expect(rain.style.getPropertyValue("--markas-meteor-angle")).toBe("215deg");
    expect(
      rain
        .querySelector("span")!
        .style.getPropertyValue("--markas-meteor-tail"),
    ).toMatch(/^\d+px$/);
    const comet = parts("comet").layer;
    expect(comet.querySelectorAll("span")).toHaveLength(6);
    expect(comet.style.getPropertyValue("--markas-meteor-angle")).toBe(
      "360deg",
    );
    expect(parts("many").layer.querySelectorAll("span")).toHaveLength(60);
  });

  it("stars, shooting stars, and ripples render the requested items", async () => {
    await mount(BackgroundsHost);
    const stars = parts("stars").layer;
    expect(stars.querySelectorAll("span")).toHaveLength(12);
    expect(stars.classList).toContain("text-success");
    expect(parts("night").layer.querySelectorAll("span")).toHaveLength(13);
    const dawn = parts("dawn").layer;
    expect(dawn.querySelectorAll("span")).toHaveLength(3);
    expect(dawn.querySelector("div")!.className).toContain("from-warning");
    expect(dawn.classList).toContain("text-danger");
    const rings = [...parts("ripple").layer.querySelectorAll("span")];
    expect(rings.map((ring) => ring.style.width)).toEqual([
      "40px",
      "64px",
      "88px",
    ]);
  });

  it("retro grid sets its variables next to the user style", async () => {
    await mount(BackgroundsHost);
    const { root } = parts("grid");
    expect(root.style.getPropertyValue("--markas-retro-cell")).toBe("40px");
    expect(root.style.getPropertyValue("--markas-retro-angle")).toBe("72deg");
    expect(root.style.color).toBe("red");
  });

  it("waves clamp to 3 to 5, sparkles burst carries offsets, noise film adds a vignette", async () => {
    await mount(BackgroundsHost);
    expect(parts("ocean").layer.querySelectorAll("svg")).toHaveLength(5);
    const silk = parts("silk").layer.querySelectorAll("path");
    expect(silk).toHaveLength(3);
    expect(silk[0]).toHaveAttribute("vector-effect", "non-scaling-stroke");

    const burst = parts("burst").layer.querySelectorAll("svg");
    expect(burst).toHaveLength(4);
    expect(burst[0]!.getAttribute("class")).toContain("opacity-0");
    expect(burst[0]!.style.getPropertyValue("--markas-sparkle-x")).toMatch(
      /^-?\d+px$/,
    );
    expect(
      parts("field").layer.querySelectorAll("circle").length,
    ).toBeGreaterThan(0);

    const noise = parts("noise").layer;
    expect(noise.className).toContain("[--markas-noise-alpha:0.15]");
    expect(noise.querySelectorAll("div")).toHaveLength(2);
    expect(parts("film").layer.querySelectorAll("div")).toHaveLength(3);
  });
});

describe("Angular SpotlightBeam", () => {
  const rect = { left: 0, top: 0, width: 200, height: 100 } as DOMRect;
  const move = (root: HTMLElement) => {
    root.getBoundingClientRect = () => rect;
    root.dispatchEvent(
      new MouseEvent("pointermove", { clientX: 150, clientY: 25 }),
    );
  };

  it("shows the entrance without IntersectionObserver and leans toward the pointer with follow", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    await mount(BackgroundsHost);
    const beam = parts("beam");
    expect(beam.root).toHaveAttribute("data-visible", "");
    expect(beam.layer.firstElementChild!.className).toContain(
      "[--markas-beam-angle:90deg]",
    );
    move(beam.root);
    expect(beam.root.style.getPropertyValue("--markas-beam-x")).toBe("0.500");
    expect(beam.root.style.getPropertyValue("--markas-beam-y")).toBe("-0.500");

    const still = parts("still").root;
    move(still);
    expect(still.style.getPropertyValue("--markas-beam-x")).toBe("");
  });

  it("stays still with reduced motion", async () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    await mount(BackgroundsHost);
    const beam = parts("beam").root;
    move(beam);
    expect(beam.style.getPropertyValue("--markas-beam-x")).toBe("");
  });
});
