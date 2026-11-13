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
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Accordion } from "../../components/accordion/accordion.component";
import { Breadcrumb } from "../../components/breadcrumb/breadcrumb.component";
import { Collapsible } from "../../components/collapsible/collapsible.component";

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
  imports: [Accordion],
  template: `
    <ng-template #rich><a href="/plans">Compare plans</a></ng-template>
    <markas-accordion
      class="px-4"
      [items]="[
        { value: 'a', title: 'First', content: rich },
        { value: 'b', title: 'Second', content: 'Beta' },
        { value: 'c', title: 'Third' },
      ]"
      [defaultValue]="['b', 'c']"
    />
    <markas-accordion
      type="multiple"
      [items]="[
        { value: 'x', title: 'X', content: 'Ex' },
        { value: 'y', title: 'Y', content: 'Why' },
      ]"
      [defaultValue]="['x', 'y']"
    />
  `,
})
class AccordionHost {}

@Component({
  imports: [Collapsible],
  template: `
    <details
      markas-collapsible
      title="Show details"
      class="mt-2"
      id="plain"
      (toggle)="toggles = toggles + 1"
    >
      Body
    </details>
    <details markas-collapsible open id="rich">
      <ng-container title>Show <strong>3</strong> more</ng-container>
      Rich body
    </details>
  `,
})
class CollapsibleHost {
  toggles = 0;
}

@Component({
  imports: [Breadcrumb],
  template: `
    <nav
      markas-breadcrumb
      class="mb-4"
      [items]="[
        { label: 'Home', href: '/' },
        { label: 'Docs' },
        { label: 'Bad', href: 'javascript:alert(1)' },
        { label: 'Current', href: '/current' },
      ]"
    ></nav>
    <nav
      markas-breadcrumb
      navLabel="Jejak navigasi"
      [items]="[{ label: 'Beranda' }]"
    ></nav>
  `,
})
class BreadcrumbHost {}

describe("Angular Accordion", () => {
  it("single: shared generated name, first default only, template content, user class", async () => {
    await mount(AccordionHost);
    const [first, second, third] = [
      ...document.querySelectorAll<HTMLDetailsElement>(
        "markas-accordion:first-of-type details",
      ),
    ];
    const name = first!.getAttribute("name");
    expect(name).toMatch(/^markas-accordion-/);
    expect(second).toHaveAttribute("name", name!);
    expect(first!.open).toBe(false);
    expect(second!.open).toBe(true);
    expect(third!.open).toBe(false);
    expect(first!.querySelector("a")).toHaveTextContent("Compare plans");
    expect(third!.querySelector("div")!.textContent!.trim()).toBe("");
    const root = first!.parentElement!;
    expect(root.classList).toContain("px-4");
    expect(root.classList).toContain("divide-y");

    await userEvent.click(screen.getByText("First"));
    expect(first!.open).toBe(true);
  });

  it("multiple: no name and every default value opens", async () => {
    await mount(AccordionHost);
    const details = document.querySelectorAll<HTMLDetailsElement>(
      "markas-accordion:last-of-type details",
    );
    details.forEach((el) => {
      expect(el).not.toHaveAttribute("name");
      expect(el.open).toBe(true);
    });
  });
});

describe("Angular Collapsible", () => {
  it("stays on the native details, clears the title tooltip, and toggles", async () => {
    const fixture = await mount(CollapsibleHost);
    const details = document.getElementById("plain") as HTMLDetailsElement;
    expect(details.tagName).toBe("DETAILS");
    expect(details).not.toHaveAttribute("title");
    expect(details.open).toBe(false);
    expect(details.classList).toContain("mt-2");
    expect(details.classList).toContain("group");
    expect(details.querySelector("summary")).toHaveTextContent("Show details");

    await userEvent.click(details.querySelector("summary")!);
    expect(details.open).toBe(true);
    await expect
      .poll(() => fixture.componentInstance.toggles)
      .toBeGreaterThan(0);
  });

  it("starts open and projects a rich title", async () => {
    await mount(CollapsibleHost);
    const details = document.getElementById("rich") as HTMLDetailsElement;
    expect(details.open).toBe(true);
    expect(details.querySelector("summary strong")).toHaveTextContent("3");
    expect(details.querySelector("summary")).toHaveTextContent("Show 3 more");
  });
});

describe("Angular Breadcrumb", () => {
  it("links ancestors, marks the current page, and keeps the nav class", async () => {
    await mount(BreadcrumbHost);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toHaveClass("mb-4");
    expect(nav.querySelectorAll("li")).toHaveLength(4);
    const links = [...nav.querySelectorAll("a")];
    expect(links.map((a) => a.textContent)).toEqual(["Home", "Bad"]);
    expect(links[1]).toHaveAttribute("href", "#");
    const current = nav.querySelector('[aria-current="page"]')!;
    expect(current).toHaveTextContent("Current");
    expect(current).not.toHaveAttribute("href");
    expect(nav.querySelectorAll("svg[aria-hidden=true]")).toHaveLength(3);
  });

  it("translates the nav label", async () => {
    await mount(BreadcrumbHost);
    const nav = screen.getByRole("navigation", { name: "Jejak navigasi" });
    expect(nav.querySelector("svg")).toBeNull();
  });
});
