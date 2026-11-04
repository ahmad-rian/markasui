import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion } from "../../components/accordion/Accordion";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { Navbar } from "../../components/navbar/Navbar";
import { Pagination, pageRange } from "../../components/pagination/Pagination";

const accordionItems = [
  { value: "a", title: "One", content: "Content one" },
  { value: "b", title: "Two", content: "Content two" },
  { value: "c", title: "Three", content: "Content three" },
];

describe("React Accordion", () => {
  it("single: semua details memakai name yang sama, defaultValue terbuka", () => {
    const { container } = render(
      <Accordion items={accordionItems} defaultValue="b" className="mt-4" />,
    );
    const details = [...container.querySelectorAll("details")];
    expect(details).toHaveLength(3);
    const name = details[0]!.getAttribute("name");
    expect(name).toBeTruthy();
    expect(details.every((d) => d.getAttribute("name") === name)).toBe(true);
    expect(details.map((d) => d.open)).toEqual([false, true, false]);
    expect(
      (container.firstElementChild as HTMLElement).className.endsWith("mt-4"),
    ).toBe(true);
  });

  it("single hanya membuka nilai pertama dari array", () => {
    const { container } = render(
      <Accordion items={accordionItems} defaultValue={["a", "c"]} />,
    );
    const details = [...container.querySelectorAll("details")];
    expect(details.map((d) => d.open)).toEqual([true, false, false]);
  });

  it("multiple: tanpa name dan bisa membuka beberapa bagian", () => {
    const { container } = render(
      <Accordion
        items={accordionItems}
        type="multiple"
        defaultValue={["a", "c"]}
      />,
    );
    const details = [...container.querySelectorAll("details")];
    expect(details.some((d) => d.hasAttribute("name"))).toBe(false);
    expect(details.map((d) => d.open)).toEqual([true, false, true]);
  });

  it("summary berisi judul dan ikon tersembunyi dari pembaca layar", () => {
    const { container } = render(<Accordion items={accordionItems} />);
    const summary = container.querySelector("summary")!;
    expect(summary).toHaveTextContent("One");
    expect(summary.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Content one")).toBeInTheDocument();
  });
});

describe("React Breadcrumb", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Category" },
    { label: "Product", href: "/product" },
  ];

  it("nav berlabel, item terakhir aria-current tanpa link", () => {
    render(<Breadcrumb items={items} className="mb-2" />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.className).toBe("mb-2");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.queryByRole("link", { name: "Product" })).toBeNull();
    expect(screen.getByText("Product")).toHaveAttribute("aria-current", "page");
  });

  it("item tengah tanpa href dirender sebagai teks, pemisah aria-hidden", () => {
    const { container } = render(<Breadcrumb items={items} />);
    expect(screen.queryByRole("link", { name: "Category" })).toBeNull();
    const separators = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(separators).toHaveLength(2);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});

describe("pageRange (React)", () => {
  it.each([
    [1, 10, 1, [1, 2, 3, 4, 5, "ellipsis", 10]],
    [4, 10, 1, [1, 2, 3, 4, 5, "ellipsis", 10]],
    [5, 10, 1, [1, "ellipsis", 4, 5, 6, "ellipsis", 10]],
    [7, 10, 1, [1, "ellipsis", 6, 7, 8, 9, 10]],
    [10, 10, 1, [1, "ellipsis", 6, 7, 8, 9, 10]],
    [1, 1, 1, [1]],
    [3, 7, 1, [1, 2, 3, 4, 5, 6, 7]],
    [10, 20, 2, [1, "ellipsis", 8, 9, 10, 11, 12, "ellipsis", 20]],
    [99, 10, 1, [1, "ellipsis", 6, 7, 8, 9, 10]],
    [1, 0, 1, []],
  ] as const)(
    "halaman %i dari %i (siblings %i)",
    (page, total, s, expected) => {
      expect(pageRange(page, total, s)).toEqual(expected);
    },
  );
});

describe("React Pagination", () => {
  it("halaman aktif aria-current, link prev dan next memakai pola href", () => {
    render(
      <Pagination page={5} total={10} href="/p/{page}" className="mt-6" />,
    );
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(nav.className).toBe("@container mt-6");
    const active = screen.getByRole("link", { name: "5" });
    expect(active).toHaveAttribute("aria-current", "page");
    expect(active).toHaveAttribute("data-state", "active");
    expect(screen.getByRole("link", { name: "4" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/p/4",
    );
    const next = screen.getByRole("link", { name: "Next" });
    expect(next).toHaveAttribute("href", "/p/6");
    expect(next).toHaveAttribute("rel", "next");
  });

  it("Sebelumnya nonaktif di halaman pertama, default href ?page=", () => {
    render(<Pagination page={1} total={3} />);
    expect(screen.queryByRole("link", { name: "Previous" })).toBeNull();
    expect(screen.getByText("Previous").parentElement).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "?page=2",
    );
  });

  it("Berikutnya nonaktif di halaman terakhir", () => {
    render(<Pagination page={3} total={3} />);
    expect(screen.queryByRole("link", { name: "Next" })).toBeNull();
    expect(screen.getByText("Next").parentElement).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});

describe("React Navbar", () => {
  const links = [
    { label: "Home", href: "/", active: true },
    { label: "Blog", href: "/blog" },
  ];

  it("tertutup di awal, tombol terhubung ke panel lewat aria-controls", () => {
    render(<Navbar links={links} brand="Markas" className="sticky" />);
    const button = screen.getByRole("button", { name: "Menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    const panel = document.getElementById(
      button.getAttribute("aria-controls")!,
    )!;
    expect(panel).toHaveAttribute("data-state", "closed");
    expect(panel).not.toBeVisible();
    expect(screen.getByRole("banner").className.endsWith("sticky")).toBe(true);
    expect(screen.getByText("Markas")).toBeInTheDocument();
  });

  it("link aktif memakai aria-current di menu desktop dan seluler", () => {
    render(<Navbar links={links} id="nav" />);
    expect(screen.getByRole("banner")).toHaveAttribute("id", "nav");
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-controls",
      "nav-menu",
    );
    const current = document.querySelectorAll('a[aria-current="page"]');
    expect(current).toHaveLength(2);
    expect(current[0]).toHaveTextContent("Home");
  });

  it("klik membuka panel, Escape menutup dan mengembalikan fokus", async () => {
    render(<Navbar links={links} actions={<a href="/sign-in">Sign in</a>} />);
    const button = screen.getByRole("button", { name: "Menu" });
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById(
      button.getAttribute("aria-controls")!,
    )!;
    expect(panel).toHaveAttribute("data-state", "open");
    expect(panel).toBeVisible();

    const blog = panel.querySelector("a[href='/blog']") as HTMLElement;
    blog.focus();
    fireEvent.keyDown(blog, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("data-state", "closed");
    expect(button).toHaveFocus();
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
  });
});

describe("React href aman", () => {
  const unsafe = ["javascript:alert(1)", " JaVaScRiPt:x", "data:text/html,x"];
  const safe = ["/a", "https://x.id", "mailto:a@b.c", "#top"];
  const hrefs = [...unsafe, ...safe];
  const expected = [...unsafe.map(() => "#"), ...safe];
  const hrefsOf = (container: HTMLElement) =>
    [...container.querySelectorAll("a")].map((a) => a.getAttribute("href"));

  it("Breadcrumb mengganti skema berbahaya dengan #", () => {
    const items = [
      ...hrefs.map((href, index) => ({ label: `Item ${index}`, href })),
      { label: "End" },
    ];
    const { container } = render(<Breadcrumb items={items} />);
    expect(hrefsOf(container)).toEqual(expected);
  });

  it("Navbar mengganti skema berbahaya dengan # di menu desktop dan seluler", () => {
    const links = hrefs.map((href, index) => ({
      label: `Item ${index}`,
      href,
    }));
    const { container } = render(<Navbar links={links} />);
    expect(hrefsOf(container)).toEqual([...expected, ...expected]);
  });

  it.each(unsafe)("Pagination dengan href %j menjadi #", (href) => {
    const { container } = render(
      <Pagination page={1} total={2} href={`${href}{page}`} />,
    );
    expect(hrefsOf(container)).toEqual(["#", "#", "#"]);
  });

  it.each(safe)("Pagination dengan href %j tetap", (href) => {
    const { container } = render(
      <Pagination page={1} total={2} href={`${href}?p={page}`} />,
    );
    expect(hrefsOf(container)).toEqual([
      `${href}?p=1`,
      `${href}?p=2`,
      `${href}?p=2`,
    ]);
  });
});

describe("React label bawaan", () => {
  it("default Inggris di Breadcrumb, Pagination, dan Navbar", () => {
    render(
      <>
        <Breadcrumb items={[{ label: "Home" }]} />
        <Pagination page={1} total={2} />
        <Navbar links={[{ label: "Home", href: "/" }]} />
      </>,
    );
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
    render(<Breadcrumb items={[{ label: "Beranda" }]} navLabel="Jejak" />);
    expect(
      screen.getByRole("navigation", { name: "Jejak" }),
    ).toBeInTheDocument();
  });

  it("navLabel, previousLabel, dan nextLabel menimpa label Pagination", () => {
    render(
      <Pagination
        page={2}
        total={3}
        navLabel="Navigasi halaman"
        previousLabel="Sebelumnya"
        nextLabel="Berikutnya"
      />,
    );
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
    render(
      <Navbar
        links={[{ label: "Beranda", href: "/" }]}
        menuLabel="Buka menu"
        navLabel="Utama"
        mobileNavLabel="Utama seluler"
      />,
    );
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
