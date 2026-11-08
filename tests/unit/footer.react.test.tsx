import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../../components/footer/Footer";

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

describe("Footer (React)", () => {
  it("renders columns with h2 titles inside a labelled nav", () => {
    render(<Footer brand="Rapi" columns={columns} copyright="© 2026 Rapi" />);
    const nav = screen.getByRole("navigation", { name: "Footer" });
    expect(within(nav).getAllByRole("heading", { level: 2 })).toHaveLength(2);
    expect(within(nav).getAllByRole("list")).toHaveLength(2);
    expect(screen.getByRole("contentinfo")).toHaveTextContent("© 2026 Rapi");
  });

  it("flattens links into one list for centered, cta, and compact", () => {
    for (const variant of ["centered", "cta", "compact"] as const) {
      const { unmount } = render(
        <Footer variant={variant} columns={columns} />,
      );
      const nav = screen.getByRole("navigation", { name: "Footer" });
      expect(within(nav).queryByRole("heading")).toBeNull();
      expect(within(nav).getAllByRole("link")).toHaveLength(3);
      unmount();
    }
  });

  it("gives social links accessible names and hides icons", () => {
    render(<Footer socials={socials} />);
    const list = screen.getByRole("list", { name: "Social media" });
    const link = within(list).getByRole("link", { name: "LinkedIn" });
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("replaces unsafe hrefs with #", () => {
    render(
      <Footer
        columns={[{ links: [{ label: "Bad", href: " javascript:alert(1)" }] }]}
        legal={[{ label: "Mail", href: "mailto:hi@rapi.id" }]}
      />,
    );
    expect(screen.getByRole("link", { name: "Bad" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(screen.getByRole("link", { name: "Mail" })).toHaveAttribute(
      "href",
      "mailto:hi@rapi.id",
    );
  });

  it("adds a back to top link only when requested", () => {
    const { rerender } = render(<Footer />);
    expect(screen.queryByRole("link", { name: "Back to top" })).toBeNull();
    rerender(<Footer backToTop />);
    expect(screen.getByRole("link", { name: "Back to top" })).toHaveAttribute(
      "href",
      "#top",
    );
  });

  it("shows the success message after a valid newsletter submit", () => {
    render(<Footer variant="newsletter" />);
    const status = screen.getByRole("status");
    expect(status).toBeEmptyDOMElement();
    const email = screen.getByRole("textbox", { name: "Email address" });
    expect(email).toBeRequired();
    expect(email).toHaveAttribute("type", "email");
    fireEvent.change(email, { target: { value: "ani@rapi.id" } });
    fireEvent.submit(email.closest("form")!);
    expect(status).toHaveTextContent("Thanks for subscribing");
    expect(email).toHaveValue("");
  });

  it("renders the newsletter slot instead of the built-in form", () => {
    render(<Footer variant="newsletter" newsletter={<p>Custom form</p>} />);
    expect(screen.getByText("Custom form")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  it("renders the cta heading with actions and an aria-hidden wordmark", () => {
    const { container, rerender } = render(
      <Footer
        variant="cta"
        heading="Start today"
        actions={<button>Try</button>}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Start today" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try" })).toBeInTheDocument();
    rerender(<Footer variant="big-brand" wordmark="Rapi" />);
    const mark = container.querySelector("[aria-hidden=true]") as HTMLElement;
    expect(mark).toHaveTextContent("Rapi");
    expect(mark.style.getPropertyValue("--chars")).toBe("4");
  });

  it("lets label props override the English defaults", () => {
    render(
      <Footer
        variant="newsletter"
        columns={columns}
        socials={socials}
        legal={legal}
        backToTop
        navLabel="Navigasi kaki"
        legalLabel="Hukum"
        socialLabel="Media sosial"
        newsletterLabel="Berlangganan"
        emailLabel="Alamat email"
        subscribeLabel="Langganan"
        successLabel="Terima kasih"
        backToTopLabel="Kembali ke atas"
      />,
    );
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
    const email = screen.getByRole("textbox", { name: "Alamat email" });
    fireEvent.change(email, { target: { value: "ani@rapi.id" } });
    fireEvent.click(screen.getByRole("button", { name: "Langganan" }));
    expect(screen.getByRole("status")).toHaveTextContent("Terima kasih");
  });

  it("puts the user class last and forwards attributes", () => {
    render(<Footer className="mt-20" data-testid="site-footer" />);
    const footer = screen.getByTestId("site-footer");
    expect(footer.tagName).toBe("FOOTER");
    expect(footer.className.endsWith(" mt-20")).toBe(true);
  });
});
