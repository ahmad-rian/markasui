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
  Footer,
  type FooterColumn,
  type FooterSocial,
} from "../../components/footer/footer.component";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
  document.body.innerHTML = "";
});

async function mount<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  document.body.append(fixture.nativeElement);
  await fixture.whenStable();
  return fixture;
}

const columns: FooterColumn[] = [
  { title: "Product", links: [{ label: "Docs", href: "/docs" }] },
  { links: [{ label: "Evil", href: " javascript:alert(1)" }] },
];
const socials: FooterSocial[] = [
  { label: "GitHub", href: "https://github.com", icon: "M0 0" },
];
const legal = [{ label: "Privacy", href: "/privacy" }];

@Component({
  imports: [Footer],
  template: `
    <footer
      markas-footer
      id="site-footer"
      class="mt-8"
      copyright="© 2026"
      description="Short line"
      backToTop
      [columns]="columns"
      [socials]="socials"
      [legal]="legal"
    >
      <strong brand>Markas</strong>
      <a actions href="/status">Status</a>
    </footer>
  `,
})
class ColumnsHost {
  columns = columns;
  socials = socials;
  legal = legal;
}

@Component({
  imports: [Footer],
  template: `
    <footer
      markas-footer
      navLabel="Navigasi kaki"
      legalLabel="Hukum"
      socialLabel="Media sosial"
      backToTopLabel="Kembali ke atas"
      backToTop
      [columns]="columns"
      [socials]="socials"
      [legal]="legal"
    ></footer>
  `,
})
class LabelsHost {
  columns = columns;
  socials = socials;
  legal = legal;
}

@Component({
  imports: [Footer],
  template: `<footer
    markas-footer
    variant="newsletter"
    subscribeLabel="Join"
  ></footer>`,
})
class NewsletterHost {}

@Component({
  imports: [Footer],
  template: `
    <footer markas-footer variant="newsletter">
      <form newsletter aria-label="Custom form"></form>
    </footer>
  `,
})
class CustomNewsletterHost {}

@Component({
  imports: [Footer],
  template: `
    <footer
      markas-footer
      variant="cta"
      heading="Ship it"
      description="Short line"
    >
      <ng-container actions><a href="/start">Start</a></ng-container>
    </footer>
    <footer markas-footer variant="big-brand" wordmark="Markas"></footer>
    <footer
      markas-footer
      variant="centered"
      copyright="© 2026"
      [socials]="socials"
    ></footer>
  `,
})
class LayoutsHost {
  socials = socials;
}

describe("Angular Footer", () => {
  it("keeps id and class on the native footer and renders navs, slots, and safe links", async () => {
    await mount(ColumnsHost);
    const footer = document.getElementById("site-footer")!;
    expect(footer.tagName).toBe("FOOTER");
    expect(footer.classList).toContain("mt-8");
    expect(footer.classList).toContain("@container");
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Legal" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Product" }).tagName).toBe("H2");
    expect(screen.getByRole("link", { name: "Evil" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com",
    );
    expect(screen.getByRole("link", { name: "Back to top" })).toHaveAttribute(
      "href",
      "#top",
    );
    expect(screen.getByText("Markas").parentElement).not.toHaveAttribute(
      "hidden",
    );
    expect(screen.getAllByRole("link", { name: "Status" })).toHaveLength(1);
    expect(
      screen.getByRole("link", { name: "Status" }).parentElement,
    ).not.toHaveAttribute("hidden");
  });

  it("accepts label overrides and hides empty brand and actions wrappers", async () => {
    await mount(LabelsHost);
    expect(
      screen.getByRole("navigation", { name: "Navigasi kaki" }),
    ).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Hukum" })).toBeVisible();
    expect(screen.getByRole("list", { name: "Media sosial" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Kembali ke atas" })).toBeVisible();
    expect(document.querySelectorAll("footer div[hidden]")).toHaveLength(2);
  });

  it("newsletter form shows the success message and resets the field", async () => {
    const fixture = await mount(NewsletterHost);
    const status = screen.getByRole("status");
    expect(status).toBeEmptyDOMElement();
    const email = screen.getByRole("textbox", { name: "Email address" });
    await userEvent.type(email, "ani@markasui.dev");
    await userEvent.click(screen.getByRole("button", { name: "Join" }));
    await fixture.whenStable();
    expect(status).toHaveTextContent("Thanks for subscribing");
    expect(email).toHaveValue("");
  });

  it("the newsletter slot replaces the built-in form", async () => {
    await mount(CustomNewsletterHost);
    expect(screen.getByRole("form", { name: "Custom form" })).toBeVisible();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("cta, big-brand, and centered layouts", async () => {
    await mount(LayoutsHost);
    expect(screen.getByRole("heading", { name: "Ship it" })).toBeVisible();
    expect(screen.getAllByText("Short line")).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Start" })).toHaveLength(1);
    const wordmark = document.querySelector<HTMLElement>(
      "[aria-hidden=true][style]",
    )!;
    expect(wordmark.style.getPropertyValue("--chars")).toBe("6");
    expect(wordmark.textContent?.trim()).toBe("Markas");
    const list = screen.getByRole("list", { name: "Social media" });
    expect(
      list.compareDocumentPosition(screen.getByText("© 2026")) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
