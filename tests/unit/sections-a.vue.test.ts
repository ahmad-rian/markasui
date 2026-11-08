import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Faq, { type FaqItem } from "../../components/faq/Faq.vue";
import LogoCloud, {
  type LogoCloudLogo,
} from "../../components/logo-cloud/LogoCloud.vue";

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

describe("Vue Faq", () => {
  it("renders a labelled section with native details", () => {
    render(Faq, { props: { title: "FAQ", description: "Answers", items } });
    const section = screen.getByRole("region", { name: "FAQ" });
    expect(section.querySelectorAll("details")).toHaveLength(3);
    expect(section.querySelector("details")).not.toHaveAttribute("name");
  });

  it("shares one name across details when exclusive", () => {
    const { container } = render(Faq, { props: { items, exclusive: true } });
    const names = [...container.querySelectorAll("details")].map((d) =>
      d.getAttribute("name"),
    );
    expect(names[0]).toBeTruthy();
    expect(new Set(names).size).toBe(1);
  });

  it("renders the contact slot", () => {
    render(Faq, {
      props: { items, variant: "split", title: "FAQ" },
      slots: { contact: "Ask us" },
    });
    expect(screen.getByText("Ask us").parentElement).toContainElement(
      screen.getByRole("heading", { name: "FAQ" }),
    );
  });

  it("filters questions and announces an empty result", async () => {
    const { container } = render(Faq, {
      props: { items, variant: "searchable" },
    });
    const search = screen.getByRole("searchbox", { name: "Search questions" });
    await fireEvent.update(search, "jakarta");
    expect(
      [...container.querySelectorAll("details")].map((d) => d.hidden),
    ).toEqual([true, true, false]);
    await fireEvent.update(search, "zzz");
    expect(screen.getByRole("status")).toHaveTextContent(
      "No questions match your search",
    );
  });

  it("switches category tabs with arrow keys, Home, and End", async () => {
    render(Faq, { props: { items, variant: "categories" } });
    const tablist = screen.getByRole("tablist", {
      name: "Question categories",
    });
    const [billing, security] = screen.getAllByRole("tab");
    expect(billing).toHaveAttribute("aria-selected", "true");
    await fireEvent.keyDown(tablist, { key: "ArrowRight" });
    expect(security).toHaveAttribute("aria-selected", "true");
    expect(security).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("In Jakarta.");
    await fireEvent.keyDown(tablist, { key: "Home" });
    expect(billing).toHaveAttribute("aria-selected", "true");
    await fireEvent.keyDown(tablist, { key: "End" });
    expect(security).toHaveAttribute("tabindex", "0");
  });

  it("overrides built-in labels", async () => {
    render(Faq, {
      props: {
        items,
        variant: "searchable",
        searchLabel: "Cari",
        emptyLabel: "Kosong",
      },
    });
    await fireEvent.update(
      screen.getByRole("searchbox", { name: "Cari" }),
      "zzz",
    );
    expect(screen.getByRole("status")).toHaveTextContent("Kosong");
    render(Faq, {
      props: { items, variant: "categories", categoriesLabel: "Kategori" },
    });
    expect(
      screen.getByRole("tablist", { name: "Kategori" }),
    ).toBeInTheDocument();
  });

  it("renders escaped FAQPage JSON-LD only when schema is on", () => {
    const tricky = [{ question: "</script>?", answer: "Safe" }];
    const { container } = render(Faq, {
      props: { items: tricky, schema: true },
    });
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    )!;
    expect(script.innerHTML).not.toContain("</script>");
    const data = JSON.parse(script.textContent!);
    expect(data.mainEntity[0].name).toBe("</script>?");
    const plain = render(Faq, { props: { items: tricky } });
    expect(plain.container.querySelector("script")).toBeNull();
  });

  it("puts user classes last on the section", () => {
    render(Faq, {
      props: { title: "FAQ", items },
      attrs: { class: USER_CLASS },
    });
    expect(
      screen
        .getByRole("region", { name: "FAQ" })
        .className.endsWith(USER_CLASS),
    ).toBe(true);
  });
});

describe("Vue LogoCloud", () => {
  it("names every logo and sanitises unsafe hrefs", () => {
    render(LogoCloud, { props: { title: "Trusted by", logos } });
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Kopi Kita" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(screen.getByRole("img", { name: "Sagara" })).toBeInTheDocument();
  });

  it("uses logosLabel when there is no title", () => {
    render(LogoCloud, { props: { logos, logosLabel: "Pelanggan" } });
    expect(
      screen.getByRole("region", { name: "Pelanggan" }),
    ).toBeInTheDocument();
  });

  it("duplicates the marquee list as an aria-hidden inert copy", () => {
    const { container } = render(LogoCloud, {
      props: { logos, variant: "marquee" },
    });
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect(lists[1]).toHaveAttribute("aria-hidden", "true");
    expect(lists[1]).toHaveAttribute("inert");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders quotes, stats, and the logo slot", () => {
    const quoted = [{ name: "Rimba", quote: "Fast", author: "Dewi" }];
    render(LogoCloud, { props: { logos: quoted, variant: "cards" } });
    expect(screen.getByText("Fast").tagName).toBe("BLOCKQUOTE");
    render(LogoCloud, {
      props: {
        logos: quoted,
        variant: "stats",
        stats: [{ value: "2,000+", label: "Teams" }],
      },
      slots: { logo: '<img src="/l.svg" alt="Custom logo" />' },
    });
    expect(screen.getByText("2,000+").tagName).toBe("DD");
    expect(
      screen.getByRole("img", { name: "Custom logo" }),
    ).toBeInTheDocument();
  });

  it("puts user classes last on the section", () => {
    render(LogoCloud, {
      props: { title: "Trusted by", logos },
      attrs: { class: USER_CLASS },
    });
    expect(
      screen
        .getByRole("region", { name: "Trusted by" })
        .className.endsWith(USER_CLASS),
    ).toBe(true);
  });
});
