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
import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  Sidebar,
  type SidebarSection,
} from "../../components/sidebar/sidebar.component";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

beforeEach(() => {
  document.body.innerHTML = "";
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

const sections: SidebarSection[] = [
  {
    items: [
      { label: "Home", href: "/", icon: "M3 3h18", active: true },
      { label: "Inbox", href: "/inbox", icon: "M3 3h18", badge: 3 },
      { label: "Danger", href: "javascript:alert(1)" },
      { label: "Locked", href: "/locked", disabled: true },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Projects",
        icon: "M3 3h18",
        children: [{ label: "Mobile app", href: "/projects/mobile" }],
      },
    ],
  },
];

@Component({
  imports: [Sidebar],
  template: `
    <markas-sidebar
      [(collapsed)]="collapsed"
      [sections]="sections"
      class="h-96"
      navLabel="Navigasi samping"
    >
      <ng-template #header><span>Brand</span></ng-template>
      <ng-template #footer><span>Profile</span></ng-template>
      <main>Page</main>
    </markas-sidebar>
    <output>{{ collapsed() ? "rail" : "full" }}</output>
  `,
})
class SidebarHost {
  readonly collapsed = signal(false);
  readonly sections = sections;
}

@Component({
  imports: [Sidebar],
  template: `<markas-sidebar id="app" collapsed [sections]="sections" />`,
})
class RailHost {
  readonly sections = sections;
}

const aside = () => document.querySelector("aside")!;

describe("Angular Sidebar", () => {
  it("renders links, templates twice, and moves class and id to the root", async () => {
    await mount(SidebarHost);
    const host = document.querySelector("markas-sidebar")!;
    expect(host.classList).toContain("contents");
    const root = host.firstElementChild as HTMLElement;
    expect(root.id).toMatch(/^markas-sidebar-\d+$/);
    expect(root.classList).toContain("h-96");
    expect(root.classList).toContain("@container");
    expect(aside().id).toBe(`${root.id}-aside`);

    const nav = within(aside()).getByRole("navigation", {
      name: "Navigasi samping",
    });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(nav).getByRole("link", { name: "Danger" })).toHaveAttribute(
      "href",
      "#",
    );
    const locked = within(nav).getByRole("link", { name: "Locked" });
    expect(locked).toHaveAttribute("aria-disabled", "true");
    expect(locked).not.toHaveAttribute("href");
    expect(screen.getAllByText("Brand")).toHaveLength(2);
    expect(screen.getAllByText("Profile")).toHaveLength(2);
    expect(screen.getByRole("main")).toHaveTextContent("Page");
  });

  it("toggles groups, the rail with [(collapsed)], and the mobile dialog", async () => {
    const fixture = await mount(SidebarHost);
    const projects = within(aside()).getByRole("button", { name: "Projects" });
    expect(projects).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(projects);
    await fixture.whenStable();
    expect(projects).toHaveAttribute("aria-expanded", "true");
    expect(
      document.getElementById(projects.getAttribute("aria-controls")!),
    ).toHaveAttribute("data-state", "open");

    await userEvent.click(
      within(aside()).getByRole("button", { name: "Collapse sidebar" }),
    );
    await fixture.whenStable();
    expect(aside()).toHaveAttribute("data-state", "collapsed");
    expect(screen.getByText("rail")).toBeInTheDocument();

    await userEvent.click(projects);
    await fixture.whenStable();
    expect(aside()).toHaveAttribute("data-state", "expanded");
    expect(projects).toHaveAttribute("aria-expanded", "true");

    const open = screen.getByRole("button", { name: "Open sidebar" });
    const dialog = document.getElementById(
      open.getAttribute("aria-controls")!,
    ) as HTMLDialogElement;
    await userEvent.click(open);
    expect(dialog.open).toBe(true);
    const close = within(dialog).getByRole("button", { name: "Close sidebar" });
    expect(close).toHaveAttribute("type", "submit");
    expect(close.closest("form")).toHaveAttribute("method", "dialog");
  });

  it("keeps an explicit id and starts in the rail from a static attribute", async () => {
    await mount(RailHost);
    expect(document.getElementById("app")).not.toBeNull();
    expect(document.querySelector("markas-sidebar")).not.toHaveAttribute("id");
    expect(aside()).toHaveAttribute("data-state", "collapsed");
    expect(
      within(aside()).getByRole("button", { name: "Expand sidebar" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
