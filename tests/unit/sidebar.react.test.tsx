import { fireEvent, render, within } from "@testing-library/react";
import { useState } from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Sidebar, type SidebarSection } from "../../components/sidebar/Sidebar";

const sections: SidebarSection[] = [
  {
    items: [
      { label: "Home", href: "/", icon: "M4 4h16" },
      { label: "Inbox", href: "/inbox", badge: 12 },
      { label: "Danger", href: "javascript:alert(1)" },
      { label: "Billing", href: "/billing", disabled: true },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Projects",
        icon: "M4 4h16",
        children: [
          { label: "Website", href: "/projects/website", active: true },
          { label: "Mobile", href: "/projects/mobile" },
        ],
      },
      {
        label: "Reports",
        children: [{ label: "Weekly", href: "/reports/weekly" }],
      },
    ],
  },
];

beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
});

const aside = (container: HTMLElement) =>
  within(container.querySelector("aside")!);

describe("React Sidebar", () => {
  it("merender grup, judul, badge, aria-current, dan class user di akhir", () => {
    const { container } = render(
      <Sidebar sections={sections} className="h-96" id="app" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.id).toBe("app");
    expect(root.className.endsWith("h-96")).toBe(true);
    const side = aside(container);
    expect(side.getByRole("navigation", { name: "Sidebar" })).toBeTruthy();
    expect(side.getByRole("list", { name: "Workspace" })).toBeTruthy();
    expect(side.getByRole("link", { name: /^Inbox\s?12$/ })).toHaveAttribute(
      "href",
      "/inbox",
    );
    expect(side.getByRole("link", { name: "Website" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(container.querySelectorAll("aside [aria-current]")).toHaveLength(1);
  });

  it("href berbahaya diganti # dan item nonaktif tanpa href", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const side = aside(container);
    expect(side.getByRole("link", { name: "Danger" })).toHaveAttribute(
      "href",
      "#",
    );
    const billing = side.getByText("Billing", {
      selector: "span:not([aria-hidden])",
    }).parentElement!;
    expect(billing).toHaveAttribute("aria-disabled", "true");
    expect(billing).not.toHaveAttribute("href");
  });

  it("grup dengan item aktif terbuka, tombol membuka dan menutup grup", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const side = aside(container);
    const projects = side.getByRole("button", { name: "Projects" });
    const reports = side.getByRole("button", { name: "Reports" });
    expect(projects).toHaveAttribute("aria-expanded", "true");
    expect(reports).toHaveAttribute("aria-expanded", "false");
    const region = document.getElementById(
      reports.getAttribute("aria-controls")!,
    )!;
    expect(region).toHaveAttribute("data-state", "closed");
    fireEvent.click(reports);
    expect(reports).toHaveAttribute("aria-expanded", "true");
    expect(region).toHaveAttribute("data-state", "open");
    fireEvent.click(reports);
    expect(region).toHaveAttribute("data-state", "closed");
  });

  it("tombol rail tidak terkontrol mengubah data-state dan label", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const asideEl = container.querySelector("aside")!;
    const toggle = aside(container).getByRole("button", {
      name: "Collapse sidebar",
    });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-controls", asideEl.id);
    expect(asideEl).toHaveAttribute("data-state", "expanded");
    fireEvent.click(toggle);
    expect(asideEl).toHaveAttribute("data-state", "collapsed");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName("Expand sidebar");
  });

  it("terkontrol: collapsed dari prop, onCollapsedChange dipanggil", () => {
    const onChange = vi.fn();
    const { container, rerender } = render(
      <Sidebar sections={sections} collapsed onCollapsedChange={onChange} />,
    );
    const asideEl = container.querySelector("aside")!;
    expect(asideEl).toHaveAttribute("data-state", "collapsed");
    fireEvent.click(
      aside(container).getByRole("button", { name: "Expand sidebar" }),
    );
    expect(onChange).toHaveBeenCalledWith(false);
    expect(asideEl).toHaveAttribute("data-state", "collapsed");
    rerender(
      <Sidebar
        sections={sections}
        collapsed={false}
        onCollapsedChange={onChange}
      />,
    );
    expect(asideEl).toHaveAttribute("data-state", "expanded");
  });

  it("di rail, item induk membentangkan sidebar dan membuka grupnya", () => {
    function Controlled() {
      const [collapsed, setCollapsed] = useState(true);
      return (
        <Sidebar
          sections={sections}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      );
    }
    const { container } = render(<Controlled />);
    const reports = aside(container).getByRole("button", { name: "Reports" });
    fireEvent.click(reports);
    expect(container.querySelector("aside")).toHaveAttribute(
      "data-state",
      "expanded",
    );
    expect(reports).toHaveAttribute("aria-expanded", "true");
  });

  it("defaultCollapsed memulai dalam mode rail", () => {
    const { container } = render(
      <Sidebar sections={sections} defaultCollapsed />,
    );
    expect(container.querySelector("aside")).toHaveAttribute(
      "data-state",
      "collapsed",
    );
  });

  it("tombol seluler membuka dialog, link di dialog menutupnya", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const dialog = container.querySelector("dialog")!;
    const open = within(container).getByRole("button", {
      name: "Open sidebar",
    });
    expect(open).toHaveAttribute("aria-controls", dialog.id);
    expect(open).toHaveAttribute("aria-haspopup", "dialog");
    fireEvent.click(open);
    expect(dialog).toHaveAttribute("open");
    fireEvent.click(within(dialog).getByRole("link", { name: "Mobile" }));
    expect(dialog).not.toHaveAttribute("open");
  });

  it("id judul dan region berbeda antara sidebar dan dialog", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("label bawaan bisa ditimpa", () => {
    const { container } = render(
      <Sidebar
        sections={sections}
        navLabel="Navigasi samping"
        collapseLabel="Ciutkan"
        openLabel="Buka"
        closeLabel="Tutup"
      />,
    );
    const side = aside(container);
    expect(
      side.getByRole("navigation", { name: "Navigasi samping" }),
    ).toBeTruthy();
    expect(side.getByRole("button", { name: "Ciutkan" })).toBeTruthy();
    expect(
      within(container).getByRole("button", { name: "Buka" }),
    ).toBeTruthy();
    const dialog = container.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("aria-label", "Navigasi samping");
    expect(dialog.querySelector('[aria-label="Tutup"]')).toBeTruthy();
    const { container: rail } = render(
      <Sidebar sections={sections} defaultCollapsed expandLabel="Bentangkan" />,
    );
    expect(
      aside(rail).getByRole("button", { name: "Bentangkan" }),
    ).toBeTruthy();
  });

  it("header, footer, dan konten dirender", () => {
    const { container } = render(
      <Sidebar
        sections={sections}
        header={<span>Acme</span>}
        footer={<span>Rina</span>}
      >
        <main>Page</main>
      </Sidebar>,
    );
    expect(aside(container).getByText("Acme")).toBeTruthy();
    expect(aside(container).getByText("Rina")).toBeTruthy();
    expect(within(container).getByRole("main")).toHaveTextContent("Page");
  });
});
