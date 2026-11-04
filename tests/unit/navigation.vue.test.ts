import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Accordion from "../../components/accordion/Accordion.vue";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.vue";
import Navbar from "../../components/navbar/Navbar.vue";
import Pagination, {
  pageRange,
} from "../../components/pagination/Pagination.vue";

const accordionItems = [
  { value: "a", title: "Satu" },
  { value: "b", title: "Dua" },
  { value: "c", title: "Tiga" },
];
const accordionSlots = { a: "Isi satu", b: "Isi dua", c: "Isi tiga" };

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
    expect(details[1]).toHaveTextContent("Isi dua");
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
          { label: "Beranda", href: "/" },
          { label: "Kategori" },
          { label: "Produk", href: "/produk" },
        ],
      },
      attrs: { class: "mb-2" },
    });
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.className).toBe("mb-2");
    expect(screen.getByRole("link", { name: "Beranda" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.queryByRole("link", { name: "Kategori" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Produk" })).toBeNull();
    expect(screen.getByText("Produk")).toHaveAttribute("aria-current", "page");
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
    const nav = screen.getByRole("navigation", { name: "Navigasi halaman" });
    expect(nav.className).toBe("@container mt-6");
    expect(screen.getByRole("link", { name: "5" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Sebelumnya" })).toHaveAttribute(
      "rel",
      "prev",
    );
    expect(screen.getByRole("link", { name: "Berikutnya" })).toHaveAttribute(
      "href",
      "/p/6",
    );
  });

  it("ujung kiri dan kanan nonaktif saat total 1", () => {
    render(Pagination, { props: { page: 1, total: 1 } });
    expect(screen.queryByRole("link", { name: "Sebelumnya" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Berikutnya" })).toBeNull();
    expect(screen.getByText("Berikutnya").parentElement).toHaveAttribute(
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
    { label: "Beranda", href: "/", active: true },
    { label: "Blog", href: "/blog" },
  ];

  it("tertutup di awal, id user dipakai, slot brand dan actions tampil", () => {
    render(Navbar, {
      props: { links, id: "nav" },
      attrs: { class: "sticky" },
      slots: { brand: "Markas", actions: '<a href="/masuk">Masuk</a>' },
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
    expect(screen.getByRole("link", { name: "Masuk" })).toBeInTheDocument();
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
      { label: "Akhir" },
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
