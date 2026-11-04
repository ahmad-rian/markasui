import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Accordion from "../../components/accordion/Accordion.vue";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.vue";
import Navbar from "../../components/navbar/Navbar.vue";
import Pagination, {
  pageRange,
} from "../../components/pagination/Pagination.vue";

const accordionItems = [
  { value: "a", title: "One" },
  { value: "b", title: "Two" },
  { value: "c", title: "Three" },
];
const accordionSlots = {
  a: "Content one",
  b: "Content two",
  c: "Content three",
};

describe("Vue Accordion", () => {
  it("single: name sama, defaultValue terbuka, class user di akhir", () => {
    const { container } = render(Accordion, {
      props: { items: accordionItems, defaultValue: "b" },
      attrs: { class: "mt-4" },
      slots: accordionSlots,
    });
    const details = [...container.querySelectorAll("details")];
    const name = details[0]!.getAttribute("name");
    expect(name).toBeTruthy();
    expect(details.every((d) => d.getAttribute("name") === name)).toBe(true);
    expect(details.map((d) => d.open)).toEqual([false, true, false]);
    expect(details[1]).toHaveTextContent("Content two");
    expect(
      (container.firstElementChild as HTMLElement).className.endsWith("mt-4"),
    ).toBe(true);
  });

  it("multiple: tanpa name dan membuka semua nilai di array", () => {
    const { container } = render(Accordion, {
      props: {
        items: accordionItems,
        type: "multiple",
        defaultValue: ["a", "c"],
      },
      slots: accordionSlots,
    });
    const details = [...container.querySelectorAll("details")];
    expect(details.some((d) => d.hasAttribute("name"))).toBe(false);
    expect(details.map((d) => d.open)).toEqual([true, false, true]);
  });

  it("single hanya membuka nilai pertama dari array", () => {
    const { container } = render(Accordion, {
      props: { items: accordionItems, defaultValue: ["c", "a"] },
      slots: accordionSlots,
    });
    const details = [...container.querySelectorAll("details")];
    expect(details.map((d) => d.open)).toEqual([false, false, true]);
  });
});

describe("Vue Breadcrumb", () => {
  it("nav berlabel, item terakhir aria-current tanpa link, class user", () => {
    const { container } = render(Breadcrumb, {
      props: {
        items: [
          { label: "Home", href: "/" },
          { label: "Category" },
          { label: "Product", href: "/product" },
        ],
      },
      attrs: { class: "mb-2" },
    });
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.className).toBe("mb-2");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.queryByRole("link", { name: "Category" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Product" })).toBeNull();
    expect(screen.getByText("Product")).toHaveAttribute("aria-current", "page");
    expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(
      2,
    );
  });
});

describe("pageRange (Vue)", () => {
  it.each([
    [1, 10, 1, [1, 2, 3, 4, 5, "ellipsis", 10]],
    [5, 10, 1, [1, "ellipsis", 4, 5, 6, "ellipsis", 10]],
    [10, 10, 1, [1, "ellipsis", 6, 7, 8, 9, 10]],
    [1, 1, 1, [1]],
    [10, 20, 2, [1, "ellipsis", 8, 9, 10, 11, 12, "ellipsis", 20]],
    [1, 0, 1, []],
  ] as const)(
    "halaman %i dari %i (siblings %i)",
    (page, total, s, expected) => {
      expect(pageRange(page, total, s)).toEqual(expected);
    },
  );
});

describe("Vue Pagination", () => {
  it("halaman aktif, pola href, dan class user", () => {
    render(Pagination, {
      props: { page: 5, total: 10, href: "/p/{page}" },
      attrs: { class: "mt-6" },
    });
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(nav.className).toBe("@container mt-6");
    expect(screen.getByRole("link", { name: "5" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "rel",
      "prev",
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/p/6",
    );
  });

  it("ujung kiri dan kanan nonaktif saat total 1", () => {
    render(Pagination, { props: { page: 1, total: 1 } });
    expect(screen.queryByRole("link", { name: "Previous" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Next" })).toBeNull();
    expect(screen.getByText("Next").parentElement).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "?page=1",
    );
  });
});

describe("Vue Navbar", () => {
  const links = [
    { label: "Home", href: "/", active: true },
    { label: "Blog", href: "/blog" },
  ];

  it("tertutup di awal, id user dipakai, slot brand dan actions tampil", () => {
    render(Navbar, {
      props: { links, id: "nav" },
      attrs: { class: "sticky" },
      slots: { brand: "Markas", actions: '<a href="/sign-in">Sign in</a>' },
    });
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("id", "nav");
    expect(header.className.endsWith("sticky")).toBe(true);
    const button = screen.getByRole("button", { name: "Menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "nav-menu");
    expect(document.getElementById("nav-menu")).toHaveAttribute(
      "data-state",
      "closed",
    );
    expect(screen.getByText("Markas")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
    expect(document.querySelectorAll('a[aria-current="page"]')).toHaveLength(2);
  });

  it("klik membuka panel, Escape menutup dan mengembalikan fokus", async () => {
    render(Navbar, { props: { links } });
    const button = screen.getByRole("button", { name: "Menu" });
    await fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById(
      button.getAttribute("aria-controls")!,
    )!;
    expect(panel).toHaveAttribute("data-state", "open");
    expect(panel).not.toHaveAttribute("hidden");

    await fireEvent.keyDown(panel.querySelector("a")!, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("hidden");
    expect(button).toHaveFocus();
  });
});

describe("Vue href aman", () => {
  const unsafe = ["javascript:alert(1)", " JaVaScRiPt:x", "data:text/html,x"];
  const safe = ["/a", "https://x.id", "mailto:a@b.c", "#top"];
  const hrefs = [...unsafe, ...safe];
  const expected = [...unsafe.map(() => "#"), ...safe];
  const hrefsOf = (container: Element) =>
    [...container.querySelectorAll("a")].map((a) => a.getAttribute("href"));

  it("Breadcrumb mengganti skema berbahaya dengan #", () => {
    const items = [
      ...hrefs.map((href, index) => ({ label: `Item ${index}`, href })),
      { label: "End" },
    ];
    const { container } = render(Breadcrumb, { props: { items } });
    expect(hrefsOf(container)).toEqual(expected);
  });

  it("Navbar mengganti skema berbahaya dengan # di menu desktop dan seluler", () => {
    const links = hrefs.map((href, index) => ({
      label: `Item ${index}`,
      href,
    }));
    const { container } = render(Navbar, { props: { links } });
    expect(hrefsOf(container)).toEqual([...expected, ...expected]);
  });

  it.each(unsafe)("Pagination dengan href %j menjadi #", (href) => {
    const { container } = render(Pagination, {
      props: { page: 1, total: 2, href: `${href}{page}` },
    });
    expect(hrefsOf(container)).toEqual(["#", "#", "#"]);
  });

  it.each(safe)("Pagination dengan href %j tetap", (href) => {
    const { container } = render(Pagination, {
      props: { page: 1, total: 2, href: `${href}?p={page}` },
    });
    expect(hrefsOf(container)).toEqual([
      `${href}?p=1`,
      `${href}?p=2`,
      `${href}?p=2`,
    ]);
  });
});

describe("Vue label bawaan", () => {
  it("default Inggris di Breadcrumb, Pagination, dan Navbar", () => {
    render(Breadcrumb, { props: { items: [{ label: "Home" }] } });
    render(Pagination, { props: { page: 1, total: 2 } });
    render(Navbar, { props: { links: [{ label: "Home", href: "/" }] } });
    for (const name of ["Breadcrumb", "Pagination", "Main"]) {
      expect(screen.getByRole("navigation", { name })).toBeInTheDocument();
    }
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
    expect(
      document.querySelector('nav[aria-label="Main mobile"]'),
    ).toBeInTheDocument();
  });

  it("navLabel menimpa label Breadcrumb", () => {
    render(Breadcrumb, {
      props: { items: [{ label: "Beranda" }], navLabel: "Jejak" },
    });
    expect(
      screen.getByRole("navigation", { name: "Jejak" }),
    ).toBeInTheDocument();
  });

  it("navLabel, previousLabel, dan nextLabel menimpa label Pagination", () => {
    render(Pagination, {
      props: {
        page: 2,
        total: 3,
        navLabel: "Navigasi halaman",
        previousLabel: "Sebelumnya",
        nextLabel: "Berikutnya",
      },
    });
    expect(
      screen.getByRole("navigation", { name: "Navigasi halaman" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sebelumnya" })).toHaveAttribute(
      "rel",
      "prev",
    );
    expect(screen.getByRole("link", { name: "Berikutnya" })).toHaveAttribute(
      "rel",
      "next",
    );
    expect(screen.queryByText("Previous")).toBeNull();
  });

  it("menuLabel, navLabel, dan mobileNavLabel menimpa label Navbar", () => {
    render(Navbar, {
      props: {
        links: [{ label: "Beranda", href: "/" }],
        menuLabel: "Buka menu",
        navLabel: "Utama",
        mobileNavLabel: "Utama seluler",
      },
    });
    expect(
      screen.getByRole("button", { name: "Buka menu" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Utama" }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('nav[aria-label="Utama seluler"]'),
    ).toBeInTheDocument();
  });
});
