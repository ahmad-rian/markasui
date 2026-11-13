// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import ImageCompare from "../../components/image-compare/ImageCompare.astro";
import ImageTrail from "../../components/image-trail/ImageTrail.astro";
import Magnet from "../../components/magnet/Magnet.astro";
import PinnedList from "../../components/pinned-list/PinnedList.astro";
import PixelTrail from "../../components/pixel-trail/PixelTrail.astro";
import PromptInput from "../../components/prompt-input/PromptInput.astro";
import Screensaver from "../../components/screensaver/Screensaver.astro";
import StackingCards from "../../components/stacking-cards/StackingCards.astro";
import ThemeToggle from "../../components/theme-toggle/ThemeToggle.astro";
import TiltCard from "../../components/tilt-card/TiltCard.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

describe("Astro ImageCompare", () => {
  it("renders both slots, the clamped position, and a labelled slider", async () => {
    const html = await container.renderToString(ImageCompare, {
      props: {
        position: 140,
        orientation: "vertical",
        sliderLabel: "Posisi",
        "aria-label": "Kitchen",
        class: "mt-2",
      },
      slots: { before: "<span>Old</span>", after: "<span>New</span>" },
    });
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Kitchen"');
    expect(html).toContain("--position: 100%");
    expect(html).toContain('aria-valuenow="100"');
    expect(html).toContain('aria-label="Posisi"');
    expect(html).toContain('aria-orientation="vertical"');
    expect(html).toMatch(/class="[^"]*cursor-ns-resize[^"]*mt-2"/);
    expect(html.indexOf("New")).toBeLessThan(html.indexOf("Old"));
  });
});

describe("Astro PinnedList", () => {
  it("renders pinned rows first with pressed buttons and translated labels", async () => {
    const html = await container.renderToString(PinnedList, {
      props: {
        items: [
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta", meta: "2h" },
        ],
        defaultPinned: ["b"],
        pinLabel: "Sematkan {label}",
        allLabel: "Semua",
      },
    });
    expect(html).toContain('aria-label="Semua"');
    expect(html.indexOf('data-value="b"')).toBeLessThan(
      html.indexOf('data-value="a"'),
    );
    expect(html).toMatch(/aria-pressed="true"[^>]*aria-label="Sematkan Beta"/);
    expect(html).toContain('title="Unpin Beta"');
    expect(html).toContain('role="status"');
  });
});

describe("Astro PromptInput", () => {
  it("renders the field, counter, model picker, and a disabled send button", async () => {
    const html = await container.renderToString(PromptInput, {
      props: {
        maxLength: 500,
        models: ["Markas Pro", "Markas Mini"],
        model: "Markas Mini",
        sendLabel: "Kirim",
      },
    });
    expect(html).toContain('aria-label="Message"');
    expect(html).toContain('placeholder="Ask anything"');
    expect(html).toContain(">0/500</span>");
    expect(html).toMatch(/<option value="Markas Mini" selected/);
    expect(html).toMatch(
      /<button type="submit" aria-label="Kirim"[^>]*disabled/,
    );
    expect(html).toContain('aria-label="Attach files"');
  });

  it("renders a stop button while loading and no attach button when off", async () => {
    const html = await container.renderToString(PromptInput, {
      props: { value: "Hi", loading: true, attachments: false },
    });
    expect(html).toContain('aria-label="Stop"');
    expect(html).toContain('data-state="stop"');
    expect(html).not.toContain("Attach files");
    expect(html).toContain(">Hi</textarea>");
  });
});

describe("Astro ThemeToggle", () => {
  it("renders a button with the dark label and a unique mask", async () => {
    const html = await container.renderToString(ThemeToggle, {
      props: { showText: true, darkLabel: "Dark mode", class: "ml-1" },
    });
    expect(html).toContain('type="button"');
    expect(html).toContain(">Dark mode</span>");
    expect(html).toMatch(/class="[^"]*h-10[^"]*ml-1"/);
    const mask = html.match(/<mask id="([^"]+)"/)![1];
    expect(html).toContain(`mask="url(#${mask})"`);
  });
});

describe("Astro motion wrappers", () => {
  it("renders wrappers with their options and user classes", async () => {
    const magnet = await container.renderToString(Magnet, {
      props: { mode: "repel", class: "mx-auto" },
      slots: { default: "<b>Go</b>" },
    });
    expect(magnet).toContain('data-mode="repel"');
    expect(magnet).toMatch(/class="w-fit [^"]*mx-auto"/);

    const tilt = await container.renderToString(TiltCard, {
      props: { glare: false, maxAngle: 4 },
      slots: { default: "<p>Card</p>" },
    });
    expect(tilt).toContain('data-markas-tilt-card="4"');
    expect(tilt).not.toContain("aria-hidden");

    const stack = await container.renderToString(StackingCards, {
      props: { top: 24, offset: 8 },
      slots: { default: "<article>One</article>" },
    });
    expect(stack).toContain("--stack-top: 24px; --stack-step: 8px;");

    const pixels = await container.renderToString(PixelTrail, {
      props: { color: "success", showGrid: true },
    });
    expect(pixels).toMatch(
      /<canvas aria-hidden="true" class="[^"]*text-success/,
    );

    const saver = await container.renderToString(Screensaver, {
      props: { tones: ["ink"], "aria-hidden": "true" },
      slots: { default: "<span>Bounce</span>" },
    });
    expect(saver).toContain("&quot;tones&quot;:[&quot;ink&quot;]");

    const trail = await container.renderToString(ImageTrail, {});
    expect(trail).toContain("size-4 rounded-full bg-primary");
  });
});
