import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet, tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import Alert from "../../components/alert/Alert.svelte";
import Badge from "../../components/badge/Badge.svelte";
import Faq from "../../components/faq/Faq.svelte";
import LogoCloud from "../../components/logo-cloud/LogoCloud.svelte";
import NotFound from "../../components/not-found/NotFound.svelte";
import Progress from "../../components/progress/Progress.svelte";
import Skeleton from "../../components/skeleton/Skeleton.svelte";
import { dismissToast } from "../../components/toast/Toast.svelte";
import FaqHarness from "./fixtures/PortFeedbackFaqHarness.svelte";
import ToastHarness from "./fixtures/PortFeedbackToastHarness.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

const items = [
  {
    question: "Is there a trial?",
    answer: "Yes, 14 days.",
    category: "Billing",
  },
  { question: "Where is data?", answer: "In Jakarta.", category: "Account" },
  { question: "Can I export?", answer: "Any time.", category: "Account" },
];

describe("Svelte Alert, Badge, Skeleton", () => {
  it("alert defaults to role alert and accepts role, title, and class", () => {
    render(Alert, { title: "Saved", children: text("Done") });
    expect(screen.getByRole("alert")).toHaveTextContent(/Saved\s*Done/);
    render(Alert, { role: "status", variant: "warning", class: "mt-2" });
    const status = screen.getByRole("status");
    expect(status.className).toContain("bg-warning/10");
    expect(status.className.endsWith("mt-2")).toBe(true);
  });

  it("badge renders a dot by default and none with dot false", () => {
    const { container } = render(Badge, {
      variant: "danger",
      children: text("Failed"),
    });
    expect(container.querySelector("[aria-hidden=true]")).toHaveClass(
      "bg-danger",
    );
    const plain = render(Badge, { dot: false, children: text("3") });
    expect(plain.container.querySelector("[aria-hidden]")).toBeNull();
  });

  it("skeleton is aria-hidden and keeps the user class last", () => {
    const { container } = render(Skeleton, {
      shape: "circle",
      class: "size-12",
    });
    const element = container.querySelector("div")!;
    expect(element).toHaveAttribute("aria-hidden", "true");
    expect(element.className).toContain("rounded-full");
    expect(element.className.endsWith("size-12")).toBe(true);
  });
});

describe("Svelte Progress", () => {
  it("links the label with a generated id and rounds the percentage", () => {
    render(Progress, { label: "Storage used", value: 3, max: 4 });
    const bar = screen.getByRole("progressbar", { name: "Storage used" });
    expect(bar.id).not.toBe("");
    expect(bar).toHaveAttribute("value", "3");
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("is indeterminate without a value and forwards aria-label", () => {
    render(Progress, { "aria-label": "Preparing", id: "prep" });
    const bar = screen.getByRole("progressbar", { name: "Preparing" });
    expect(bar).toHaveAttribute("id", "prep");
    expect(bar).not.toHaveAttribute("value");
  });
});

describe("Svelte Toast", () => {
  afterEach(() => vi.useRealTimers());

  it("shows toasts in the live region and closes them with the translated button", async () => {
    render(ToastHarness, { closeLabel: "Tutup" });
    const region = screen.getByRole("status");
    expect(region).toHaveAccessibleName("Notifications");
    expect(region.className.endsWith("bottom-8")).toBe(true);
    await userEvent.click(screen.getByRole("button", { name: "Show" }));
    expect(region).toHaveTextContent(/Saved\s*Profile updated/);
    expect(region.querySelector("[data-state=open]")).toHaveClass(
      "border-success/40",
    );
    await userEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(region.querySelector("[data-state=open]")).toBeNull();
  });

  it("dismisses after the duration and through dismissToast", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(ToastHarness);
    const region = screen.getByRole("status");
    screen.getByRole("button", { name: "Temporary" }).click();
    await tick();
    expect(region).toHaveTextContent("Draft");
    vi.advanceTimersByTime(1100);
    await tick();
    expect(region).not.toHaveTextContent("Draft");
    dismissToast(999);
  });
});

describe("Svelte Faq", () => {
  it("renders the contact snippet in the split header and the schema", () => {
    const { container } = render(FaqHarness);
    const section = screen.getByRole("region", { name: "Help" });
    expect(section).toHaveAttribute("id", "help");
    expect(screen.getByRole("link", { name: "support" })).toBeInTheDocument();
    const schema = container.querySelector(
      "script[type='application/ld+json']",
    );
    expect(JSON.parse(schema!.textContent!).mainEntity).toHaveLength(2);
  });

  it("filters questions and announces when nothing matches", async () => {
    const { container } = render(Faq, {
      items,
      variant: "searchable",
      emptyLabel: "Tidak ada",
    });
    const search = screen.getByRole("searchbox", { name: "Search questions" });
    await userEvent.type(search, "jakarta");
    const visible = [...container.querySelectorAll("details")].filter(
      (item) => !item.hidden,
    );
    expect(visible).toHaveLength(1);
    await userEvent.type(search, "zzz");
    expect(screen.getByRole("status")).toHaveTextContent("Tidak ada");
  });

  it("moves between category tabs with the arrow keys", async () => {
    render(Faq, { items, variant: "categories", exclusive: true });
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent)).toEqual(["Billing", "Account"]);
    tabs[0]!.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Can I export?");
    await userEvent.keyboard("{Home}");
    expect(tabs[0]).toHaveFocus();
  });
});

describe("Svelte LogoCloud", () => {
  const logos = [
    { name: "Sagara", path: "M0 0h1", href: "javascript:alert(1)" },
    { name: "Rimba", path: "M0 0h1", wordmark: false },
  ];

  it("sanitizes hrefs, labels path-only logos, and names an untitled section", () => {
    render(LogoCloud, { logos, logosLabel: "Pelanggan" });
    expect(screen.getByRole("link", { name: "Sagara" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(screen.getByRole("img", { name: "Rimba" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Pelanggan" }),
    ).toBeInTheDocument();
  });

  it("marks the marquee copy aria-hidden and inert", () => {
    const { container } = render(LogoCloud, {
      logos,
      variant: "marquee",
      title: "Customers",
    });
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect((lists[0] as HTMLElement).inert).toBe(false);
    expect(lists[1]).toHaveAttribute("aria-hidden", "true");
    expect((lists[1] as HTMLElement).inert).toBe(true);
  });
});

describe("Svelte NotFound", () => {
  it("filters links and announces an empty result", async () => {
    render(NotFound, {
      variant: "search",
      links: [
        { label: "Pricing", href: "/pricing" },
        { label: "Docs", href: "/docs" },
      ],
    });
    const search = screen.getByRole("searchbox", { name: "Search pages" });
    await userEvent.type(search, "pri");
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    await userEvent.type(search, "zzz");
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent(
      "No pages match your search",
    );
  });

  it("labels the section with the heading and sanitizes the home link", () => {
    render(NotFound, {
      id: "nf",
      variant: "terminal",
      homeHref: "javascript:void(0)",
      homeLabel: "Beranda",
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "404: Page not found",
    );
    expect(screen.getByRole("link", { name: "Beranda" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(document.getElementById("nf-title")).not.toBeNull();
  });
});
