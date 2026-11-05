import { fireEvent, render, within } from "@testing-library/vue";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { defineComponent, h, ref } from "vue";
import Sidebar, {
  type SidebarSection,
} from "../../components/sidebar/Sidebar.vue";

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

const aside = (container: Element) =>
  within(container.querySelector("aside") as HTMLElement);

describe("Vue Sidebar", () => {
  it("merender grup, judul, badge, aria-current, dan class user di akhir", () => {
    const { container } = render(Sidebar, {
      props: { sections, id: "app" },
      attrs: { class: "h-96", "data-test": "shell" },
    });
    const root = container.firstElementChild as HTMLElement;
    expect(root.id).toBe("app");
    expect(root).toHaveAttribute("data-test", "shell");
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
    const { container } = render(Sidebar, { props: { sections } });
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

  it("grup dengan item aktif terbuka, tombol membuka dan menutup grup", async () => {
    const { container } = render(Sidebar, { props: { sections } });
    const side = aside(container);
    const projects = side.getByRole("button", { name: "Projects" });
    const reports = side.getByRole("button", { name: "Reports" });
    expect(projects).toHaveAttribute("aria-expanded", "true");
    expect(reports).toHaveAttribute("aria-expanded", "false");
    const region = document.getElementById(
      reports.getAttribute("aria-controls")!,
    )!;
    expect(region).toHaveAttribute("data-state", "closed");
    await fireEvent.click(reports);
    expect(reports).toHaveAttribute("aria-expanded", "true");
    expect(region).toHaveAttribute("data-state", "open");
    await fireEvent.click(reports);
    expect(region).toHaveAttribute("data-state", "closed");
  });

  it("tombol rail tidak terkontrol mengubah data-state, label, dan memancarkan update:collapsed", async () => {
    const { container, emitted } = render(Sidebar, { props: { sections } });
    const asideEl = container.querySelector("aside")!;
    const toggle = aside(container).getByRole("button", {
      name: "Collapse sidebar",
    });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-controls", asideEl.id);
    await fireEvent.click(toggle);
    expect(asideEl).toHaveAttribute("data-state", "collapsed");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName("Expand sidebar");
    expect(emitted()["update:collapsed"]).toEqual([[true]]);
  });

  it("v-model:collapsed mengontrol rail, item induk di rail membentangkan sidebar", async () => {
    const collapsed = ref(true);
    const Host = defineComponent(
      () => () =>
        h(Sidebar, {
          sections,
          collapsed: collapsed.value,
          "onUpdate:collapsed": (value?: boolean) =>
            (collapsed.value = !!value),
        }),
    );
    const { container } = render(Host);
    const asideEl = container.querySelector("aside")!;
    expect(asideEl).toHaveAttribute("data-state", "collapsed");
    const reports = aside(container).getByRole("button", { name: "Reports" });
    await fireEvent.click(reports);
    expect(collapsed.value).toBe(false);
    expect(asideEl).toHaveAttribute("data-state", "expanded");
    expect(reports).toHaveAttribute("aria-expanded", "true");
  });

  it("collapsed tanpa v-model memulai rail dan tetap bisa diubah", async () => {
    const { container } = render(Sidebar, {
      props: { sections, collapsed: true },
    });
    const asideEl = container.querySelector("aside")!;
    expect(asideEl).toHaveAttribute("data-state", "collapsed");
    await fireEvent.click(
      aside(container).getByRole("button", { name: "Expand sidebar" }),
    );
    expect(asideEl).toHaveAttribute("data-state", "expanded");
  });

  it("tombol seluler membuka dialog, link di dialog menutupnya", async () => {
    const { container } = render(Sidebar, { props: { sections } });
    const dialog = container.querySelector("dialog")!;
    const open = within(container as HTMLElement).getByRole("button", {
      name: "Open sidebar",
    });
    expect(open).toHaveAttribute("aria-controls", dialog.id);
    expect(open).toHaveAttribute("aria-haspopup", "dialog");
    await fireEvent.click(open);
    expect(dialog).toHaveAttribute("open");
    await fireEvent.click(within(dialog).getByRole("link", { name: "Mobile" }));
    expect(dialog).not.toHaveAttribute("open");
  });

  it("id judul dan region berbeda antara sidebar dan dialog", () => {
    const { container } = render(Sidebar, { props: { sections } });
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("label bawaan bisa ditimpa", () => {
    const { container } = render(Sidebar, {
      props: {
        sections,
        navLabel: "Navigasi samping",
        collapseLabel: "Ciutkan",
        openLabel: "Buka",
        closeLabel: "Tutup",
      },
    });
    const side = aside(container);
    expect(
      side.getByRole("navigation", { name: "Navigasi samping" }),
    ).toBeTruthy();
    expect(side.getByRole("button", { name: "Ciutkan" })).toBeTruthy();
    expect(
      within(container as HTMLElement).getByRole("button", { name: "Buka" }),
    ).toBeTruthy();
    const dialog = container.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("aria-label", "Navigasi samping");
    expect(dialog.querySelector('[aria-label="Tutup"]')).toBeTruthy();
    const { container: rail } = render(Sidebar, {
      props: { sections, collapsed: true, expandLabel: "Bentangkan" },
    });
    expect(
      aside(rail).getByRole("button", { name: "Bentangkan" }),
    ).toBeTruthy();
  });

  it("slot header, footer, dan konten dirender", () => {
    const { container } = render(Sidebar, {
      props: { sections },
      slots: {
        header: "<span>Acme</span>",
        footer: "<span>Rina</span>",
        default: "<main>Page</main>",
      },
    });
    expect(aside(container).getByText("Acme")).toBeTruthy();
    expect(aside(container).getByText("Rina")).toBeTruthy();
    expect(
      within(container as HTMLElement).getByRole("main"),
    ).toHaveTextContent("Page");
  });
});
