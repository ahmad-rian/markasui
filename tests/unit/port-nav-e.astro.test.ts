// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Footer from "../../components/footer/Footer.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const columns = [
  { title: "Product", links: [{ label: "Docs", href: "/docs" }] },
  { links: [{ label: "Evil", href: " javascript:alert(1)" }] },
];
const socials = [{ label: "GitHub", href: "https://github.com", icon: "M0 0" }];
const legal = [{ label: "Privacy", href: "/privacy" }];

describe("Astro Footer", () => {
  it("renders labelled navs, safe links, socials, legal, and back to top", async () => {
    const html = await container.renderToString(Footer, {
      props: {
        columns,
        socials,
        legal,
        copyright: "© 2026",
        backToTop: true,
        id: "site-footer",
        class: "mt-8",
      },
      slots: { brand: "Markas", actions: '<a href="/status">Status</a>' },
    });
    expect(html).toMatch(/<footer[^>]*id="site-footer"/);
    expect(html).toMatch(/<footer[^>]*class="@container[^"]*mt-8"/);
    expect(html).toContain('aria-label="Footer"');
    expect(html).toContain('aria-label="Legal"');
    expect(html).toContain('aria-label="Social media"');
    expect(html).toContain('aria-label="GitHub"');
    expect(html).toContain('<a href="/docs"');
    expect(html).toContain('<a href="#" class="rounded-sm');
    expect(html).toContain('href="#top"');
    expect(html).toContain(">Back to top<svg");
    expect(html).toContain(">Markas</div>");
    expect(html.match(/href="\/status"/g)).toHaveLength(1);
    expect(html).not.toContain('role="status"');
  });

  it("accepts label overrides", async () => {
    const html = await container.renderToString(Footer, {
      props: {
        columns,
        socials,
        legal,
        backToTop: true,
        navLabel: "Navigasi kaki",
        legalLabel: "Hukum",
        socialLabel: "Media sosial",
        backToTopLabel: "Kembali ke atas",
      },
    });
    expect(html).toContain('aria-label="Navigasi kaki"');
    expect(html).toContain('aria-label="Hukum"');
    expect(html).toContain('aria-label="Media sosial"');
    expect(html).toContain(">Kembali ke atas<svg");
  });

  it("newsletter renders the built-in form or the newsletter slot", async () => {
    const html = await container.renderToString(Footer, {
      props: { variant: "newsletter", emailLabel: "Alamat email" },
    });
    expect(html).toContain("data-markas-footer-form");
    expect(html).toContain('aria-label="Alamat email"');
    expect(html).toContain('placeholder="Alamat email"');
    expect(html).toMatch(
      /role="status"[^>]*data-message="Thanks for subscribing"><\/p>/,
    );
    expect(html).toContain("Subscribe to our newsletter");

    const custom = await container.renderToString(Footer, {
      props: { variant: "newsletter" },
      slots: { newsletter: '<form aria-label="Custom"></form>' },
    });
    expect(custom).toContain('aria-label="Custom"');
    expect(custom).not.toContain("data-markas-footer-form");
  });

  it("cta, compact, centered, and big-brand layouts", async () => {
    const cta = await container.renderToString(Footer, {
      props: { variant: "cta", heading: "Ship it", description: "Short line" },
      slots: { actions: '<a href="/start">Start</a>' },
    });
    expect(cta).toContain("Ship it</h2>");
    expect(cta.match(/Short line/g)).toHaveLength(1);
    expect(cta.match(/href="\/start"/g)).toHaveLength(1);

    const compact = await container.renderToString(Footer, {
      props: { variant: "compact", description: "Short line" },
    });
    expect(compact).not.toContain("Short line");

    const centered = await container.renderToString(Footer, {
      props: { variant: "centered", socials, copyright: "© 2026" },
    });
    expect(centered.indexOf("Social media")).toBeLessThan(
      centered.indexOf("© 2026"),
    );

    const big = await container.renderToString(Footer, {
      props: { variant: "big-brand", wordmark: "Markas" },
    });
    expect(big).toContain('style="--chars: 6"');
    expect(big).toMatch(/aria-hidden="true"[^>]*>\s*<p[^>]*>Markas<\/p>/);
  });
});
