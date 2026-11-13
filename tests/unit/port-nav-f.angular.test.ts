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
import {
  Navbar,
  type NavbarLink,
} from "../../components/navbar/navbar.component";

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

const links: NavbarLink[] = [
  { label: "Docs", href: "/docs", active: true },
  {
    label: "Products",
    children: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "Track usage",
        icon: "M3 3v18h18",
      },
      { label: "Danger", href: "javascript:alert(1)" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

@Component({
  imports: [Navbar],
  template: `
    <header
      markas-navbar
      id="site"
      variant="floating"
      sticky
      class="mx-auto"
      menuLabel="Buka"
      data-scrolled="true"
      [links]="links"
    >
      <a brand href="/">Acme</a>
      <button actions type="button">Sign in</button>
    </header>
  `,
})
class NavbarHost {
  readonly links = links;
}

@Component({
  imports: [Navbar],
  template: `<header
    markas-navbar
    navLabel="Utama"
    mobileNavLabel="Utama seluler"
  ></header>`,
})
class BareNavbarHost {}

describe("Angular Navbar", () => {
  it("keeps id, class, and data attributes on the native header", async () => {
    await mount(NavbarHost);
    const header = document.getElementById("site")!;
    expect(header.tagName).toBe("HEADER");
    expect(header).toHaveAttribute("data-scrolled", "true");
    expect(header.classList).toContain("mx-auto");
    expect(header.classList).toContain("shadow-overlay");
    expect(header.classList).toContain("sticky");
    const brand = screen.getByRole("link", { name: "Acme" }).parentElement!;
    expect(brand).not.toHaveAttribute("hidden");
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("marks the active link, builds dropdowns, and neutralises unsafe hrefs", async () => {
    await mount(NavbarHost);
    const desktop = screen.getByRole("navigation", { name: "Main" });
    expect(desktop.querySelector("[aria-current=page]")).toHaveTextContent(
      "Docs",
    );
    const trigger = desktop.querySelector("button")!;
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", "site-panel-1");
    expect(trigger).toHaveAttribute("popovertarget", "site-panel-1");
    const panel = document.getElementById("site-panel-1")!;
    expect(panel).toHaveAttribute("popover", "auto");
    expect(panel.querySelector("svg path")).toHaveAttribute("d", "M3 3v18h18");
    expect(panel.querySelectorAll("a")[1]).toHaveAttribute("href", "#");
    expect(document.querySelector("#site-menu summary")).toHaveTextContent(
      "Products",
    );
  });

  it("opens the mobile menu, closes on Escape, and returns focus", async () => {
    const fixture = await mount(NavbarHost);
    const toggle = screen.getByRole("button", { name: "Buka" });
    const menu = document.getElementById("site-menu")!;
    expect(toggle).toHaveAttribute("aria-controls", "site-menu");
    expect(menu).toHaveAttribute("hidden");

    await userEvent.click(toggle);
    await fixture.whenStable();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(menu).not.toHaveAttribute("hidden");
    expect(menu).toHaveAttribute("data-state", "open");

    menu.querySelector("a")!.focus();
    await userEvent.keyboard("{Escape}");
    await fixture.whenStable();
    expect(menu).toHaveAttribute("hidden");
    expect(menu).toHaveAttribute("data-state", "closed");
    expect(toggle).toHaveFocus();
  });

  it("generates an id, translates nav labels, and hides an empty brand", async () => {
    await mount(BareNavbarHost);
    const header = document.querySelector("header")!;
    expect(header.id).toMatch(/^markas-navbar-/);
    expect(header.classList).toContain("border-b");
    expect(
      screen.getByRole("navigation", { name: "Utama", hidden: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Utama seluler", hidden: true }),
    ).toBeInTheDocument();
    expect(header.querySelector(".font-semibold")).toHaveAttribute("hidden");
  });
});
