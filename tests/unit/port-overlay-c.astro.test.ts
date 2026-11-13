// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import HoverCard from "../../components/hover-card/HoverCard.astro";
import Popover from "../../components/popover/Popover.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

describe("Astro Popover", () => {
  it("links the trigger to a labelled dialog panel with the default label", async () => {
    const html = await container.renderToString(Popover, {
      slots: { default: "<p>Body</p>" },
    });
    const id = html.match(/id="(markas-popover-\w+)"/)![1];
    expect(html).toContain(`id="${id}-trigger"`);
    expect(html).toContain(`popovertarget="${id}"`);
    expect(html).toContain(`aria-controls="${id}"`);
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain(`aria-labelledby="${id}-trigger"`);
    expect(html).toContain('popover="auto"');
    expect(html).toContain('role="dialog"');
    expect(html).toContain('data-side="bottom"');
    expect(html).toContain('data-align="start"');
    expect(html).toMatch(/>\s*Open\s*<\/button>/);
  });

  it("uses the trigger slot, explicit id, side, align, and puts the user class on the root", async () => {
    const html = await container.renderToString(Popover, {
      props: { id: "share", side: "top", align: "end", class: "ml-2" },
      slots: {
        default: "Body",
        trigger: '<span class="sr-only">Notification settings</span>',
      },
    });
    expect(html).toMatch(/^<div class="inline-block ml-2"/);
    expect(html).toContain('id="share-trigger"');
    expect(html).toContain('id="share"');
    expect(html).toContain('data-side="top"');
    expect(html).toContain('data-align="end"');
    expect(html).toContain("Notification settings");
    expect(html).not.toMatch(/>\s*Open\s*</);
  });
});

describe("Astro HoverCard", () => {
  it("renders the trigger, a manual popover card, and a generated id", async () => {
    const html = await container.renderToString(HoverCard, {
      props: { class: "ml-2" },
      slots: {
        default: '<a href="https://github.com/markasui">@markasui</a>',
        content: "<span>MarkasUI preview</span>",
      },
    });
    expect(html).toMatch(/^<markas-hover-card class="contents">/);
    expect(html).toContain('<span class="inline-block ml-2">');
    expect(html).toMatch(/<\/a><span id="markas-hover-card-[\w-]+"/);
    expect(html).toContain('popover="manual"');
    expect(html).toContain('data-state="closed"');
    expect(html).toContain("<span>MarkasUI preview</span></span></span>");
  });

  it("keeps an explicit id on the card, not on the root", async () => {
    const html = await container.renderToString(HoverCard, {
      props: { id: "card" },
      slots: { default: '<a href="/profile">Profile</a>' },
    });
    expect(html.match(/id="card"/g)).toHaveLength(1);
    expect(html).toMatch(/<span id="card" popover="manual"/);
  });
});
