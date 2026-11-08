import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Faq, type FaqItem } from "../../components/faq/Faq";
import {
  LogoCloud,
  type LogoCloudLogo,
} from "../../components/logo-cloud/LogoCloud";

/** User class kept in a constant so the Tailwind Prettier plugin leaves its order alone. */
const USER_CLASS = "mt-10 custom";

const items: FaqItem[] = [
  {
    question: "Is there a free trial?",
    answer: "Yes, 14 days.",
    category: "Billing",
  },
  { question: "Can I cancel?", answer: "Any time.", category: "Billing" },
  {
    question: "Where is data stored?",
    answer: "In Jakarta.",
    category: "Security",
  },
];

const logos: LogoCloudLogo[] = [
  { name: "Nusantara Labs", path: "M12 2 21 7v10l-9 5-9-5V7Z" },
  { name: "Kopi Kita", href: "javascript:alert(1)" },
  {
    name: "Sagara",
    path: "M2 13h20v7H2Z",
    wordmark: false,
    href: "https://example.com",
  },
];

describe("React Faq", () => {
  it("renders a labelled section with native details", () => {
    render(<Faq title="FAQ" description="Answers" items={items} />);
    const section = screen.getByRole("region", { name: "FAQ" });
    expect(section.querySelectorAll("details")).toHaveLength(3);
    expect(screen.getByText("Answers")).toBeInTheDocument();
    expect(section.querySelector("details")).not.toHaveAttribute("name");
  });

  it("shares one name across details when exclusive", () => {
    const { container } = render(<Faq items={items} exclusive />);
    const names = [...container.querySelectorAll("details")].map((d) =>
      d.getAttribute("name"),
    );
    expect(names[0]).toBeTruthy();
    expect(new Set(names).size).toBe(1);
  });

  it("puts the contact block beside the heading in split and after the list elsewhere", () => {
    const { container, rerender } = render(
      <Faq title="FAQ" items={items} variant="split" contact="Ask us" />,
    );
    expect(screen.getByText("Ask us").parentElement).toContainElement(
      screen.getByRole("heading", { name: "FAQ" }),
    );
    rerender(<Faq title="FAQ" items={items} contact="Ask us" />);
    const last = container.querySelector("section > div")!.lastElementChild;
    expect(last).toHaveTextContent("Ask us");
  });

  it("filters questions and announces an empty result", () => {
    const { container } = render(<Faq items={items} variant="searchable" />);
    const search = screen.getByRole("searchbox", { name: "Search questions" });
    fireEvent.change(search, { target: { value: "jakarta" } });
    const hidden = [...container.querySelectorAll("details")].map(
      (d) => d.hidden,
    );
    expect(hidden).toEqual([true, true, false]);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    fireEvent.change(search, { target: { value: "zzz" } });
    expect(screen.getByRole("status")).toHaveTextContent(
      "No questions match your search",
    );
  });

  it("switches category tabs with arrow keys, Home, and End", () => {
    render(<Faq items={items} variant="categories" />);
    const tablist = screen.getByRole("tablist", {
      name: "Question categories",
    });
    const [billing, security] = screen.getAllByRole("tab");
    expect(billing).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Can I cancel?");
    fireEvent.keyDown(tablist, { key: "ArrowRight" });
    expect(security).toHaveAttribute("aria-selected", "true");
    expect(security).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("In Jakarta.");
    fireEvent.keyDown(tablist, { key: "Home" });
    expect(billing).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tablist, { key: "End" });
    expect(security).toHaveAttribute("tabindex", "0");
  });

  it("overrides built-in labels", () => {
    render(
      <>
        <Faq
          items={items}
          variant="searchable"
          searchLabel="Cari"
          emptyLabel="Kosong"
        />
        <Faq items={items} variant="categories" categoriesLabel="Kategori" />
      </>,
    );
    const search = screen.getByRole("searchbox", { name: "Cari" });
    fireEvent.change(search, { target: { value: "zzz" } });
    expect(screen.getByRole("status")).toHaveTextContent("Kosong");
    expect(
      screen.getByRole("tablist", { name: "Kategori" }),
    ).toBeInTheDocument();
  });

  it("renders escaped FAQPage JSON-LD only when schema is on", () => {
    const tricky = [{ question: "</script>?", answer: "Safe" }];
    const { container, rerender } = render(<Faq items={tricky} />);
    expect(container.querySelector("script")).toBeNull();
    rerender(<Faq items={tricky} schema />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    )!;
    expect(script.innerHTML).not.toContain("</script>");
    const data = JSON.parse(script.textContent!);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity[0].name).toBe("</script>?");
    expect(data.mainEntity[0].acceptedAnswer.text).toBe("Safe");
  });

  it("puts user classes last on the section", () => {
    render(<Faq title="FAQ" items={items} className={USER_CLASS} />);
    expect(
      screen
        .getByRole("region", { name: "FAQ" })
        .className.endsWith(USER_CLASS),
    ).toBe(true);
  });
});

describe("React LogoCloud", () => {
  it("names every logo and sanitises unsafe hrefs", () => {
    render(<LogoCloud title="Trusted by" logos={logos} />);
    const section = screen.getByRole("region", { name: "Trusted by" });
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Nusantara Labs")).toBeInTheDocument();
    expect(section.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("link", { name: "Kopi Kita" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(screen.getByRole("link", { name: "Sagara" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
    expect(screen.getByRole("img", { name: "Sagara" })).toBeInTheDocument();
  });

  it("uses logosLabel when there is no title", () => {
    const { rerender } = render(<LogoCloud logos={logos} />);
    expect(
      screen.getByRole("region", { name: "Customer logos" }),
    ).toBeInTheDocument();
    rerender(<LogoCloud logos={logos} logosLabel="Pelanggan" />);
    expect(
      screen.getByRole("region", { name: "Pelanggan" }),
    ).toBeInTheDocument();
  });

  it("duplicates the marquee list as an aria-hidden inert copy", () => {
    const { container } = render(<LogoCloud logos={logos} variant="marquee" />);
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect(lists[0]).not.toHaveAttribute("aria-hidden");
    expect(lists[1]).toHaveAttribute("aria-hidden", "true");
    expect(lists[1]).toHaveAttribute("inert");
    expect(container.querySelector("style")?.textContent).toContain(
      "markas-logo-cloud",
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders quotes in cards and stats as a description list", () => {
    const quoted = [{ name: "Rimba", quote: "Fast", author: "Dewi" }];
    const { rerender } = render(<LogoCloud logos={quoted} variant="cards" />);
    expect(screen.getByText("Fast").tagName).toBe("BLOCKQUOTE");
    expect(screen.getByText("Dewi")).toBeInTheDocument();
    rerender(
      <LogoCloud
        logos={quoted}
        variant="stats"
        stats={[{ value: "2,000+", label: "Teams" }]}
      />,
    );
    expect(screen.queryByText("Fast")).toBeNull();
    expect(screen.getByText("2,000+").tagName).toBe("DD");
    expect(screen.getByText("Teams").tagName).toBe("DT");
  });

  it("toggles grayscale and renders custom logo content", () => {
    const { rerender } = render(<LogoCloud logos={logos} />);
    expect(screen.getByText("Nusantara Labs").parentElement).toHaveClass(
      "grayscale",
    );
    rerender(
      <LogoCloud
        grayscale={false}
        logos={[{ name: "Laju", logo: <img src="/l.svg" alt="Laju" /> }]}
      />,
    );
    const image = screen.getByRole("img", { name: "Laju" });
    expect(image.parentElement).not.toHaveClass("grayscale");
  });

  it("puts user classes last on the section", () => {
    render(
      <LogoCloud title="Trusted by" logos={logos} className={USER_CLASS} />,
    );
    expect(
      screen
        .getByRole("region", { name: "Trusted by" })
        .className.endsWith(USER_CLASS),
    ).toBe(true);
  });
});
