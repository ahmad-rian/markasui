import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NotFound } from "../../components/not-found/NotFound";

const links = [
  { label: "Documentation", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Danger", href: "javascript:alert(1)" },
];

afterEach(() => vi.restoreAllMocks());

describe("NotFound (React)", () => {
  it("renders a section labelled by the default English title", () => {
    render(<NotFound />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Page not found");
    expect(screen.getByRole("region", { name: "Page not found" })).toBe(
      heading.closest("section"),
    );
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Go back" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("shows a custom code and title, and the code in the terminal heading", () => {
    const { container, rerender } = render(
      <NotFound code="500" title="Server error" />,
    );
    expect(container.querySelector("[aria-hidden=true]")).toHaveTextContent(
      "500",
    );
    rerender(
      <NotFound
        variant="terminal"
        code="403"
        title="Forbidden"
        path="/admin"
      />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent("403: Forbidden");
    expect(container).toHaveTextContent("$ cd /admin");
  });

  it("overrides every built-in label", () => {
    render(
      <NotFound
        variant="search"
        links={links}
        homeLabel="Kembali ke beranda"
        backLabel="Kembali"
        searchLabel="Cari halaman"
        emptyLabel="Tidak ada"
      />,
    );
    expect(
      screen.getByRole("link", { name: "Kembali ke beranda" }),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Kembali" })).toBeTruthy();
    const search = screen.getByRole("searchbox", { name: "Cari halaman" });
    fireEvent.change(search, { target: { value: "zzz" } });
    expect(screen.getByRole("status")).toHaveTextContent("Tidak ada");
  });

  it("filters links case-insensitively and sanitises unsafe hrefs", () => {
    render(<NotFound variant="search" links={links} />);
    expect(screen.getByRole("link", { name: "Danger" })).toHaveAttribute(
      "href",
      "#",
    );
    const search = screen.getByRole("searchbox", { name: "Search pages" });
    fireEvent.change(search, { target: { value: "  PRI " } });
    expect(screen.getByRole("link", { name: "Pricing" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Documentation" })).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("");
    fireEvent.change(search, { target: { value: "nothing" } });
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent(
      "No pages match your search",
    );
  });

  it("Go back uses history.back when there is history, otherwise follows homeHref", () => {
    const back = vi.spyOn(history, "back").mockImplementation(() => {});
    const length = vi.spyOn(history, "length", "get").mockReturnValue(3);
    render(<NotFound homeHref="#home" />);
    const link = screen.getByRole("link", { name: "Go back" });
    expect(fireEvent.click(link)).toBe(false);
    expect(back).toHaveBeenCalledOnce();
    length.mockReturnValue(1);
    expect(fireEvent.click(link)).toBe(true);
    expect(back).toHaveBeenCalledOnce();
  });

  it("appends user classes last and passes attributes to the section", () => {
    render(<NotFound id="oops" className="py-24" data-testid="nf" />);
    const section = screen.getByTestId("nf");
    expect(section.className.endsWith("py-24")).toBe(true);
    expect(section).toHaveAttribute("id", "oops");
    expect(section).toHaveAttribute("aria-labelledby", "oops-title");
  });
});
