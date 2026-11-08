import { fireEvent, render, screen, within } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Footer from "../../components/footer/Footer.vue";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Invoicing", href: "/invoicing" },
      { label: "Payroll", href: "/payroll" },
    ],
  },
  { title: "Company", links: [{ label: "About", href: "/about" }] },
];
const socials = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "M2 2h20" },
];
const legal = [{ label: "Privacy", href: "/privacy" }];

describe("Footer (Vue)", () => {
  it("renders columns with h2 titles inside a labelled nav", () => {
    render(Footer, {
      props: { columns, copyright: "© 2026 MarkasUI" },
      slots: { brand: "MarkasUI" },
    });
    const nav = screen.getByRole("navigation", { name: "Footer" });
    expect(within(nav).getAllByRole("heading", { level: 2 })).toHaveLength(2);
    expect(within(nav).getAllByRole("list")).toHaveLength(2);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "© 2026 MarkasUI",
    );
    expect(screen.getByText("MarkasUI")).toBeInTheDocument();
  });

  it("flattens links into one list for centered, cta, and compact", () => {
    for (const variant of ["centered", "cta", "compact"] as const) {
      const { unmount } = render(Footer, { props: { variant, columns } });
      const nav = screen.getByRole("navigation", { name: "Footer" });
      expect(within(nav).queryByRole("heading")).toBeNull();
      expect(within(nav).getAllByRole("link")).toHaveLength(3);
      unmount();
    }
  });

  it("renders socials once, before the copyright only when centered", () => {
    const { container, unmount } = render(Footer, {
      props: { variant: "centered", socials, copyright: "© MarkasUI" },
    });
    expect(screen.getAllByRole("list", { name: "Social media" })).toHaveLength(
      1,
    );
    const bottom = container.querySelector("ul[aria-label]")!.parentElement!;
    expect(bottom.firstElementChild!.tagName).toBe("UL");
    unmount();
    render(Footer, { props: { socials, copyright: "© MarkasUI" } });
    const link = screen.getByRole("link", { name: "LinkedIn" });
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("replaces unsafe hrefs with #", () => {
    render(Footer, {
      props: {
        columns: [{ links: [{ label: "Bad", href: " javascript:alert(1)" }] }],
        legal: [{ label: "Mail", href: "mailto:hi@markasui.dev" }],
      },
    });
    expect(screen.getByRole("link", { name: "Bad" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(screen.getByRole("link", { name: "Mail" })).toHaveAttribute(
      "href",
      "mailto:hi@markasui.dev",
    );
  });

  it("adds a back to top link to #top", () => {
    render(Footer, { props: { backToTop: true } });
    expect(screen.getByRole("link", { name: "Back to top" })).toHaveAttribute(
      "href",
      "#top",
    );
  });

  it("shows the success message after a valid newsletter submit", async () => {
    render(Footer, { props: { variant: "newsletter" } });
    const status = screen.getByRole("status");
    expect(status).toBeEmptyDOMElement();
    const email = screen.getByRole("textbox", { name: "Email address" });
    expect(email).toBeRequired();
    await fireEvent.update(email, "ani@markasui.dev");
    await fireEvent.submit(email.closest("form")!);
    expect(status).toHaveTextContent("Thanks for subscribing");
    expect(email).toHaveValue("");
  });

  it("renders the newsletter slot instead of the built-in form", () => {
    render(Footer, {
      props: { variant: "newsletter" },
      slots: { newsletter: "<p>Custom form</p>" },
    });
    expect(screen.getByText("Custom form")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  it("renders the cta heading with actions and an aria-hidden wordmark", () => {
    render(Footer, {
      props: { variant: "cta", heading: "Start today" },
      slots: { actions: "<button>Try</button>" },
    });
    expect(
      screen.getByRole("heading", { name: "Start today" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try" })).toBeInTheDocument();
    const { container } = render(Footer, {
      props: { variant: "big-brand", wordmark: "MarkasUI" },
    });
    const mark = container.querySelector("[aria-hidden=true]") as HTMLElement;
    expect(mark).toHaveTextContent("MarkasUI");
    expect(mark.style.getPropertyValue("--chars")).toBe("8");
  });

  it("lets label props override the English defaults", async () => {
    render(Footer, {
      props: {
        variant: "newsletter",
        columns,
        socials,
        legal,
        backToTop: true,
        navLabel: "Navigasi kaki",
        legalLabel: "Hukum",
        socialLabel: "Media sosial",
        newsletterLabel: "Berlangganan",
        emailLabel: "Alamat email",
        subscribeLabel: "Langganan",
        successLabel: "Terima kasih",
        backToTopLabel: "Kembali ke atas",
      },
    });
    expect(
      screen.getByRole("navigation", { name: "Navigasi kaki" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Hukum" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Media sosial" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Berlangganan" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Kembali ke atas" }),
    ).toBeInTheDocument();
    await fireEvent.update(
      screen.getByRole("textbox", { name: "Alamat email" }),
      "a@b.id",
    );
    await fireEvent.submit(
      screen.getByRole("button", { name: "Langganan" }).closest("form")!,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Terima kasih");
  });

  it("puts the user class last and forwards attributes", () => {
    render(Footer, { attrs: { class: "mt-20", "data-testid": "site-footer" } });
    const footer = screen.getByTestId("site-footer");
    expect(footer.tagName).toBe("FOOTER");
    expect(footer.className.endsWith(" mt-20")).toBe(true);
  });
});
