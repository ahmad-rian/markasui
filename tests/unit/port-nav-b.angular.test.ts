import {
  Component,
  provideZonelessChangeDetection,
  signal,
  type Type,
} from "@angular/core";
import { TestBed } from "@angular/core/testing";
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from "@angular/platform-browser/testing";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  Pagination,
  pageRange,
} from "../../components/pagination/pagination.component";
import { TabPanel, Tabs } from "../../components/tabs/tabs.component";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

@Component({
  imports: [Tabs, TabPanel],
  template: `
    <markas-tabs [items]="items" [(value)]="active" class="mt-2">
      <ng-template markasTabPanel="account"
        ><strong>Account text</strong></ng-template
      >
      <ng-template markasTabPanel="password">Password text</ng-template>
      <ng-template markasTabPanel="alerts">Alerts text</ng-template>
    </markas-tabs>
    <markas-tabs [items]="plans" id="plans" defaultValue="b">
      <ng-template markasTabPanel="a">First</ng-template>
      <ng-template markasTabPanel="b">Second</ng-template>
    </markas-tabs>
  `,
})
class TabsHost {
  readonly active = signal<string | undefined>(undefined);
  readonly items = [
    { value: "account", label: "Account" },
    { value: "password", label: "Password" },
    { value: "alerts", label: "Alerts" },
  ];
  readonly plans = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
  ];
}

@Component({
  imports: [Pagination],
  template: `
    <nav markas-pagination page="5" total="10" [href]="href" class="mt-4"></nav>
    <nav
      markas-pagination
      page="1"
      total="1"
      href="javascript:alert(1)"
      navLabel="Navigasi halaman"
      previousLabel="Sebelumnya"
      nextLabel="Berikutnya"
    ></nav>
  `,
})
class PaginationHost {
  readonly href = "?p={page}";
}

describe("Angular Tabs", () => {
  it("links tabs and panels with a generated id and moves class to the root", async () => {
    await mount(TabsHost);
    const account = screen.getByRole("tab", { name: "Account" });
    const root = account.closest("[role=tablist]")!.parentElement!;
    expect(root.id).toMatch(/^markas-tabs-/);
    expect(root.classList).toContain("mt-2");
    expect(root.closest("markas-tabs")).not.toHaveAttribute("id");
    expect(account).toHaveAttribute("aria-selected", "true");
    expect(account).toHaveAttribute("id", `${root.id}-tab-account`);
    const [panel] = screen.getAllByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", account.id);
    expect(panel!.querySelector("strong")).toHaveTextContent("Account text");
  });

  it("click and arrow keys select, focus, and update [(value)]", async () => {
    const fixture = await mount(TabsHost);
    await userEvent.click(screen.getByRole("tab", { name: "Password" }));
    await fixture.whenStable();
    expect(fixture.componentInstance.active()).toBe("password");
    expect(screen.getAllByRole("tabpanel")[0]).toHaveTextContent(
      "Password text",
    );

    await userEvent.keyboard("{ArrowRight}");
    await fixture.whenStable();
    expect(screen.getByRole("tab", { name: "Alerts" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await fixture.whenStable();
    expect(screen.getByRole("tab", { name: "Account" })).toHaveFocus();
    await userEvent.keyboard("{End}");
    await fixture.whenStable();
    expect(fixture.componentInstance.active()).toBe("alerts");
    await userEvent.keyboard("{Home}{ArrowLeft}");
    await fixture.whenStable();
    expect(screen.getByRole("tab", { name: "Alerts" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Alerts" })).toHaveAttribute(
      "tabindex",
      "0",
    );
  });

  it("keeps an explicit id and honours defaultValue", async () => {
    await mount(TabsHost);
    expect(document.getElementById("plans-tab-b")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(document.getElementById("plans-panel-a")).toHaveAttribute("hidden");
    expect(document.getElementById("plans-panel-b")).toHaveTextContent(
      "Second",
    );
  });
});

describe("Angular Pagination", () => {
  it("stays on the native nav and marks the current page", async () => {
    await mount(PaginationHost);
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    expect(nav.classList).toContain("mt-4");
    expect(nav.classList).toContain("@container");
    expect(screen.getAllByRole("link", { name: "5" })[0]).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      [...nav.querySelectorAll("a")].map((link) => link.textContent?.trim()),
    ).toEqual(["Previous", "1", "4", "5", "6", "10", "Next"]);
    expect(nav.querySelector("a[rel=prev]")).toHaveAttribute("href", "?p=4");
    expect(nav.querySelector("a[rel=next]")).toHaveAttribute("href", "?p=6");
  });

  it("disables the ends, translates labels, and blocks unsafe hrefs", async () => {
    await mount(PaginationHost);
    const nav = screen.getByRole("navigation", { name: "Navigasi halaman" });
    expect(nav.querySelectorAll("[aria-disabled=true]")).toHaveLength(2);
    expect(nav).toHaveTextContent("Sebelumnya");
    expect(nav).toHaveTextContent("Berikutnya");
    expect(nav.querySelector("a")).toHaveAttribute("href", "#");
  });

  it("exports pageRange with the same logic as React", () => {
    expect(pageRange(5, 10, 1)).toEqual([
      1,
      "ellipsis",
      4,
      5,
      6,
      "ellipsis",
      10,
    ]);
    expect(pageRange(10, 10, 1)).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
  });
});
