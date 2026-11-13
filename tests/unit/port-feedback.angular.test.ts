import {
  Component,
  provideZonelessChangeDetection,
  type Type,
} from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from "@angular/platform-browser/testing";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Alert } from "../../components/alert/alert.component";
import { Badge } from "../../components/badge/badge.component";
import { Faq } from "../../components/faq/faq.component";
import { LogoCloud } from "../../components/logo-cloud/logo-cloud.component";
import { NotFound } from "../../components/not-found/not-found.component";
import { Progress } from "../../components/progress/progress.component";
import { Skeleton } from "../../components/skeleton/skeleton.component";
import {
  dismissToast,
  Toaster,
  toast,
} from "../../components/toast/toast.component";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

afterEach(() => {
  document.body.innerHTML = "";
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

const items = [
  {
    question: "Is there a trial?",
    answer: "Yes, 14 days.",
    category: "Billing",
  },
  { question: "Where is data?", answer: "In Jakarta.", category: "Account" },
  { question: "Can I export?", answer: "Any time.", category: "Account" },
];

@Component({
  imports: [Alert, Badge, Skeleton, Progress],
  template: `
    <markas-alert variant="danger" title="Could not save" class="mt-2">
      Try again.
    </markas-alert>
    <markas-alert role="status">Saved.</markas-alert>
    <span markas-badge variant="success" class="ml-1">Active</span>
    <span markas-badge [dot]="false">12</span>
    <div markas-skeleton shape="circle" class="size-12"></div>
    <markas-progress label="Storage used" [value]="3" [max]="4" class="h-3" />
    <markas-progress aria-label="Preparing" id="prep" />
  `,
})
class BasicsHost {}

@Component({
  imports: [Faq],
  template: `
    <markas-faq title="Help" variant="split" [items]="items" id="help" schema>
      <ng-container contact>Ask <a href="/contact">support</a></ng-container>
    </markas-faq>
    <markas-faq variant="searchable" [items]="items" emptyLabel="Tidak ada" />
    <markas-faq variant="categories" [items]="items" exclusive />
  `,
})
class FaqHost {
  readonly items = items;
}

@Component({
  imports: [LogoCloud, NotFound],
  template: `
    <markas-logo-cloud [logos]="logos" variant="marquee" title="Customers" />
    <markas-logo-cloud [logos]="logos" logosLabel="Pelanggan">
      <ng-template let-logo let-index="index">
        <img [alt]="index + ' ' + logo.name" src="/logo.svg" />
      </ng-template>
    </markas-logo-cloud>
    <markas-not-found
      variant="search"
      id="nf"
      homeHref="javascript:void(0)"
      [links]="links"
    />
  `,
})
class SectionsHost {
  readonly logos = [
    { name: "Sagara", path: "M0 0h1", href: "javascript:alert(1)" },
    { name: "Rimba", path: "M0 0h1", wordmark: false },
  ];
  readonly links = [
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
  ];
}

@Component({
  imports: [Toaster],
  template: `<markas-toaster closeLabel="Tutup" class="bottom-8" />`,
})
class ToastHost {}

describe("Angular Alert, Badge, Skeleton, Progress", () => {
  it("moves role, title, and class to the inner elements", async () => {
    await mount(BasicsHost);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/Could not save\s*Try again\./);
    expect(alert.classList).toContain("bg-danger/10");
    expect(alert.classList).toContain("mt-2");
    expect(alert.closest("markas-alert")).not.toHaveAttribute("title");
    expect(screen.getByRole("status")).toHaveTextContent("Saved.");

    const active = screen.getByText("Active");
    expect(active.classList).toContain("ml-1");
    expect(active.querySelector("[aria-hidden=true]")).toHaveClass(
      "bg-success",
    );
    expect(screen.getByText("12").querySelector("[aria-hidden]")).toBeNull();

    const skeleton = document.querySelector("[markas-skeleton]")!;
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton.classList).toContain("rounded-full");
    expect(skeleton.classList).toContain("size-12");
  });

  it("links the progress label, rounds the percentage, and stays indeterminate without value", async () => {
    await mount(BasicsHost);
    const storage = screen.getByRole("progressbar", { name: "Storage used" });
    expect(storage.id).toMatch(/^markas-progress-/);
    expect(storage.classList).toContain("h-3");
    expect(screen.getByText("75%")).toBeInTheDocument();
    const prep = screen.getByRole("progressbar", { name: "Preparing" });
    expect(prep).toHaveAttribute("id", "prep");
    expect(prep).not.toHaveAttribute("value");
    expect(prep.closest("markas-progress")).not.toHaveAttribute("id");
  });
});

describe("Angular Toast", () => {
  it("shows a toast, labels the close button, and dismisses it", async () => {
    const fixture = await mount(ToastHost);
    const region = screen.getByRole("status");
    expect(region).toHaveAccessibleName("Notifications");
    expect(region.classList).toContain("bottom-8");
    const id = toast({
      title: "Saved",
      description: "Profile updated",
      variant: "success",
      duration: 0,
    });
    await fixture.whenStable();
    expect(region).toHaveTextContent(/Saved\s*Profile updated/);
    expect(region.querySelector("[data-state=open]")).toHaveClass(
      "border-success/40",
    );
    await userEvent.click(screen.getByRole("button", { name: "Tutup" }));
    await fixture.whenStable();
    expect(region.querySelector("[data-state=open]")).toBeNull();
    dismissToast(id);
  });
});

describe("Angular Faq", () => {
  it("projects the contact line, adds the schema, and keeps the id on the section", async () => {
    await mount(FaqHost);
    const section = screen.getByRole("region", { name: "Help" });
    expect(section).toHaveAttribute("id", "help");
    expect(section.closest("markas-faq")).not.toHaveAttribute("title");
    expect(screen.getByRole("link", { name: "support" })).toBeVisible();
    const schema = section.querySelector("script[type='application/ld+json']");
    expect(JSON.parse(schema!.textContent!).mainEntity).toHaveLength(3);
  });

  it("filters questions and announces when nothing matches", async () => {
    const fixture = await mount(FaqHost);
    const search = screen.getByRole("searchbox", { name: "Search questions" });
    const list = search.closest("section")!;
    await userEvent.type(search, "jakarta");
    await fixture.whenStable();
    const visible = [...list.querySelectorAll("details")].filter(
      (item) => !item.hidden,
    );
    expect(visible).toHaveLength(1);
    await userEvent.type(search, "zzz");
    await fixture.whenStable();
    expect(list.querySelector("[role=status]")).toHaveTextContent("Tidak ada");
  });

  it("moves between category tabs with the arrow keys", async () => {
    const fixture = await mount(FaqHost);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent?.trim())).toEqual([
      "Billing",
      "Account",
    ]);
    tabs[0]!.focus();
    await userEvent.keyboard("{ArrowRight}");
    await fixture.whenStable();
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Can I export?");
    expect(
      tabs[0]!
        .closest("section")!
        .querySelector("details")!
        .getAttribute("name"),
    ).toMatch(/-item$/);
  });
});

describe("Angular LogoCloud and NotFound", () => {
  it("marks the marquee copy, sanitizes hrefs, and renders the logo template", async () => {
    await mount(SectionsHost);
    const marquee = screen.getByRole("region", { name: "Customers" });
    const lists = marquee.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect(lists[1]).toHaveAttribute("aria-hidden", "true");
    expect(lists[1]).toHaveAttribute("inert");
    expect(lists[0]).not.toHaveAttribute("inert");
    expect(marquee.querySelector("a")).toHaveAttribute("href", "#");
    expect(marquee.querySelector("[role=img]")).toHaveAttribute(
      "aria-label",
      "Rimba",
    );

    const custom = screen.getByRole("region", { name: "Pelanggan" });
    expect(custom.querySelector("img[alt='1 Rimba']")).not.toBeNull();
    expect(custom.querySelector("svg")).toBeNull();
  });

  it("filters not-found links and sanitizes the home link", async () => {
    const fixture = await mount(SectionsHost);
    const search = screen.getByRole("searchbox", { name: "Search pages" });
    await userEvent.type(search, "pri");
    await fixture.whenStable();
    const section = search.closest("section")!;
    expect(section.querySelectorAll("li")).toHaveLength(1);
    await userEvent.type(search, "zzz");
    await fixture.whenStable();
    expect(section.querySelector("ul")).toBeNull();
    expect(section.querySelector("[role=status]")).toHaveTextContent(
      "No pages match your search",
    );
    expect(section).toHaveAttribute("aria-labelledby", "nf-title");
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "#",
    );
  });
});
