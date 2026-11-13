// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Alert from "../../components/alert/Alert.astro";
import Badge from "../../components/badge/Badge.astro";
import Faq from "../../components/faq/Faq.astro";
import LogoCloud from "../../components/logo-cloud/LogoCloud.astro";
import NotFound from "../../components/not-found/NotFound.astro";
import Progress from "../../components/progress/Progress.astro";
import Skeleton from "../../components/skeleton/Skeleton.astro";
import Toast from "../../components/toast/Toast.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const items = [
  {
    question: "Is there a trial?",
    answer: "Yes, 14 days.",
    category: "Billing",
  },
  { question: "Where is data?", answer: "In <Jakarta>.", category: "Security" },
];

describe("Astro Alert, Badge, Skeleton", () => {
  it("alert defaults to role alert, renders the title, and appends the user class", async () => {
    const html = await container.renderToString(Alert, {
      props: { variant: "danger", title: "Could not save", class: "mt-2" },
      slots: { default: "Try again." },
    });
    expect(html).toContain('role="alert"');
    expect(html).toMatch(/class="[^"]*bg-danger\/10[^"]*mt-2"/);
    expect(html).toContain(">Could not save</p>");
    const status = await container.renderToString(Alert, {
      props: { role: "status" },
      slots: { default: "Saved." },
    });
    expect(status).toContain('role="status"');
    expect(status).not.toContain("font-semibold");
  });

  it("badge shows a dot unless dot is false", async () => {
    const dotted = await container.renderToString(Badge, {
      props: { variant: "success" },
      slots: { default: "Active" },
    });
    expect(dotted).toContain("bg-success");
    expect(dotted).toContain('aria-hidden="true"');
    const plain = await container.renderToString(Badge, {
      props: { dot: false, class: "tabular-nums" },
      slots: { default: "12" },
    });
    expect(plain).not.toContain("aria-hidden");
    expect(plain).toContain("tabular-nums");
  });

  it("skeleton is hidden from assistive technology", async () => {
    const html = await container.renderToString(Skeleton, {
      props: { shape: "circle", class: "size-12" },
    });
    expect(html).toContain('aria-hidden="true"');
    expect(html).toMatch(/class="[^"]*rounded-full[^"]*size-12"/);
  });
});

describe("Astro Progress", () => {
  it("links the label, shows the percentage, and generates an id", async () => {
    const html = await container.renderToString(Progress, {
      props: { label: "Storage used", value: 3, max: 4 },
    });
    const id = html.match(/<progress[^>]*id="([^"]+)"/)![1];
    expect(id).toMatch(/^markas-progress-/);
    expect(html).toContain(`<label for="${id}"`);
    expect(html).toContain("75%");
  });

  it("is indeterminate without a value", async () => {
    const html = await container.renderToString(Progress, {
      props: { "aria-label": "Preparing export", id: "export" },
    });
    expect(html).not.toMatch(/<progress[^>]*value=/);
    expect(html).toContain('aria-label="Preparing export"');
    expect(html).not.toContain("<label");
  });
});

describe("Astro Toast", () => {
  it("renders an empty labelled live region and a card template", async () => {
    const html = await container.renderToString(Toast, {
      props: { closeLabel: "Tutup", regionLabel: "Notifikasi" },
    });
    expect(html).toMatch(
      /role="status" aria-live="polite" aria-label="Notifikasi"[^>]*><\/div>/,
    );
    expect(html).toContain("<template>");
    expect(html).toContain('aria-label="Tutup"');
    expect(html).toContain("&quot;initial&quot;:[]");
  });
});

describe("Astro Faq", () => {
  it("renders category tabs with the first panel active and escapes the schema", async () => {
    const html = await container.renderToString(Faq, {
      props: { items, variant: "categories", id: "help", schema: true },
    });
    expect(html).toContain('id="help-tab-0"');
    expect(html).toMatch(/id="help-tab-0"[^>]*aria-selected="true"/);
    expect(html).toMatch(/id="help-panel-1"[^>]*hidden/);
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain("\\u003cJakarta>");
    expect(html).toContain('aria-label="Question categories"');
  });

  it("renders the contact slot and the empty search message holder", async () => {
    const html = await container.renderToString(Faq, {
      props: { items, variant: "searchable", searchLabel: "Cari" },
      slots: { contact: 'Ask <a href="/contact">us</a>' },
    });
    expect(html).toContain('placeholder="Cari"');
    expect(html).toContain('<a href="/contact">us</a>');
    expect(html).toContain('data-label="No questions match your search"');
    expect(html).toMatch(/id="markas-faq-[\w-]+"/);
  });
});

describe("Astro LogoCloud", () => {
  const logos = [
    { name: "Sagara", path: "M0 0h1", href: "javascript:alert(1)" },
    { name: "Rimba", path: "M0 0h1", wordmark: false },
  ];

  it("sanitizes hrefs and labels path-only logos", async () => {
    const html = await container.renderToString(LogoCloud, {
      props: { logos, logosLabel: "Pelanggan" },
    });
    expect(html).toContain('href="#"');
    expect(html).toContain('aria-label="Rimba"');
    expect(html).toContain('aria-label="Pelanggan"');
  });

  it("repeats the marquee list once as an inert copy", async () => {
    const html = await container.renderToString(LogoCloud, {
      props: { logos, variant: "marquee", title: "Customers" },
    });
    expect(html.match(/<ul/g)).toHaveLength(2);
    expect(html).toMatch(/<ul[^>]*aria-hidden="true"[^>]*inert/);
    expect(html).toContain("@keyframes markas-logo-cloud");
  });
});

describe("Astro NotFound", () => {
  it("renders the terminal heading and translated labels", async () => {
    const html = await container.renderToString(NotFound, {
      props: { variant: "terminal", id: "nf", backLabel: "Kembali" },
    });
    expect(html).toContain('aria-labelledby="nf-title"');
    expect(html).toMatch(/<h1 id="nf-title"[^>]*>404: /);
    expect(html).toContain("Kembali");
    expect(html).toContain("data-markas-not-found-back");
  });

  it("renders the search links and sanitizes the home href", async () => {
    const html = await container.renderToString(NotFound, {
      props: {
        variant: "search",
        homeHref: "javascript:void(0)",
        links: [{ label: "Pricing", href: "/pricing" }],
      },
    });
    expect(html).toContain('data-label="pricing"');
    expect(html).toContain('placeholder="Search pages"');
    expect(html).not.toContain("javascript:");
  });
});

describe("Astro LogoCloud logo slot", () => {
  it("calls the logo function slot once per logo", async () => {
    const { default: Harness } =
      await import("./fixtures/PortFeedbackLogoSlot.astro");
    const html = await container.renderToString(Harness);
    expect(html).toContain('<img src="/logos/Sagara.svg" alt="0 Sagara">');
    expect(html).toContain('alt="1 Rimba"');
    expect(html).not.toContain("<span>Sagara</span>");
  });
});
