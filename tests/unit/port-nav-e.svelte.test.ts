import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Footer from "../../components/footer/Footer.svelte";
import FooterHarness from "./fixtures/PortNavFooterHarness.svelte";

const columns = [
  { title: "Product", links: [{ label: "Docs", href: "/docs" }] },
];

describe("Svelte Footer", () => {
  it("renders labelled navs, columns, socials, legal, and back to top", () => {
    render(Footer, {
      columns,
      legal: [{ label: "Privacy", href: "/privacy" }],
      socials: [{ label: "GitHub", href: "https://github.com", icon: "M0 0" }],
      copyright: "© 2026",
      backToTop: true,
      id: "site-footer",
      class: "mt-8",
    });
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("id", "site-footer");
    expect(footer.className).toContain("@container");
    expect(footer.className.endsWith("mt-8")).toBe(true);
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Legal" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Product" }).tagName).toBe("H2");
    expect(screen.getByRole("list", { name: "Social media" })).toBeVisible();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com",
    );
    expect(screen.getByRole("link", { name: "Back to top" })).toHaveAttribute(
      "href",
      "#top",
    );
  });

  it("accepts label overrides", () => {
    render(Footer, {
      columns,
      legal: [{ label: "Privasi", href: "/privasi" }],
      socials: [{ label: "X", href: "https://x.com", icon: "M0 0" }],
      backToTop: true,
      navLabel: "Navigasi kaki",
      legalLabel: "Hukum",
      socialLabel: "Media sosial",
      backToTopLabel: "Kembali ke atas",
    });
    expect(
      screen.getByRole("navigation", { name: "Navigasi kaki" }),
    ).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Hukum" })).toBeVisible();
    expect(screen.getByRole("list", { name: "Media sosial" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Kembali ke atas" })).toBeVisible();
  });

  it("replaces unsafe hrefs and renders brand and actions snippets", () => {
    render(FooterHarness);
    expect(screen.getByRole("link", { name: "Evil" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(screen.getByText("Markas")).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Status" })).toHaveLength(1);
    expect(screen.getByText("Short line")).toBeVisible();
  });

  it("newsletter form shows the success message and resets the field", async () => {
    render(Footer, { variant: "newsletter", subscribeLabel: "Join" });
    const status = screen.getByRole("status");
    expect(status).toBeEmptyDOMElement();
    const email = screen.getByRole("textbox", { name: "Email address" });
    expect(email).toHaveAttribute("placeholder", "Email address");
    await userEvent.type(email, "ani@markasui.dev");
    await userEvent.click(screen.getByRole("button", { name: "Join" }));
    expect(status).toHaveTextContent("Thanks for subscribing");
    expect(email).toHaveValue("");
  });

  it("newsletter snippet replaces the built-in form", () => {
    render(FooterHarness, { variant: "newsletter", withNewsletter: true });
    expect(screen.getByRole("form", { name: "Custom form" })).toBeVisible();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("cta puts heading, description, and actions in the call to action block", () => {
    render(FooterHarness, { variant: "cta" });
    expect(screen.getByRole("heading", { name: "Ship it" })).toBeVisible();
    expect(screen.getAllByText("Short line")).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Status" })).toHaveLength(1);
  });

  it("big-brand renders a decorative wordmark sized by its length", () => {
    const { container } = render(FooterHarness, { variant: "big-brand" });
    const box = container.querySelector("[aria-hidden=true][style]")!;
    expect(box.getAttribute("style")).toContain("--chars: 6");
    expect(box.textContent).toBe("Markas");
  });

  it("centered places socials before the copyright, compact hides the description", () => {
    const { container, unmount } = render(FooterHarness, {
      variant: "centered",
    });
    const list = screen.getByRole("list", { name: "Social media" });
    const copyright = screen.getByText("© 2026");
    expect(
      list.compareDocumentPosition(copyright) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(container.querySelector("footer")).toBeTruthy();
    unmount();
    render(FooterHarness, { variant: "compact" });
    expect(screen.queryByText("Short line")).toBeNull();
  });
});
