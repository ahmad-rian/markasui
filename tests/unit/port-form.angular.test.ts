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
import { fireEvent, screen } from "@testing-library/dom";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Combobox } from "../../components/combobox/combobox.component";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "../../components/checkbox/checkbox.component";
import { Input } from "../../components/input/input.component";
import { Label } from "../../components/label/label.component";
import { Textarea } from "../../components/textarea/textarea.component";
import { RadioGroup } from "../../components/radio-group/radio-group.component";
import { Slider } from "../../components/slider/slider.component";
import { Toggle } from "../../components/toggle/toggle.component";
import {
  ToggleGroup,
  ToggleGroupItemTemplate,
} from "../../components/toggle-group/toggle-group.component";
import { InputOTP } from "../../components/input-otp/input-otp.component";
import { Select } from "../../components/select/select.component";

// jsdom belum punya Popover API: kirim beforetoggle dan toggle seperti browser.
const shownPopovers = new WeakSet<HTMLElement>();
function setPopover(element: HTMLElement, open: boolean) {
  if (shownPopovers.has(element) === open) return;
  if (open) shownPopovers.add(element);
  else shownPopovers.delete(element);
  const states = {
    newState: open ? "open" : "closed",
    oldState: open ? "closed" : "open",
  };
  element.dispatchEvent(Object.assign(new Event("beforetoggle"), states));
  element.dispatchEvent(Object.assign(new Event("toggle"), states));
}

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  const native: Partial<HTMLElement> = HTMLElement.prototype;
  if (typeof native.showPopover === "function") return;
  HTMLElement.prototype.showPopover = function showPopover() {
    setPopover(this, true);
  };
  HTMLElement.prototype.hidePopover = function hidePopover() {
    setPopover(this, false);
  };
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

const options = [
  { value: "au", label: "Australia" },
  { value: "id", label: "Indonesia" },
  { value: "jp", label: "Japan" },
  { value: "my", label: "Malaysia" },
];

@Component({
  imports: [Combobox],
  template: `
    <markas-combobox
      [(value)]="country"
      id="c"
      name="country"
      label="Country"
      placeholder="Search"
      emptyLabel="Tidak ada hasil"
      class="max-w-xs"
      [options]="options"
    />
    <output>{{ country() }}</output>
    <markas-combobox
      aria-label="Plain"
      hint="Pick one"
      error="Required"
      [options]="options"
    />
  `,
})
class ComboboxHost {
  readonly country = signal("au");
  readonly options = options;
}

const combobox = () =>
  screen.getByRole<HTMLInputElement>("combobox", { name: "Country" });
const optionNames = () =>
  [...document.querySelectorAll("#c-listbox [role=option]")].map((el) =>
    el.textContent?.trim(),
  );

describe("Angular Combobox", () => {
  it("moves id, placeholder, and class to the input and name to the hidden input", async () => {
    await mount(ComboboxHost);
    const input = combobox();
    expect(input).toHaveAttribute("id", "c");
    expect(input).toHaveAttribute("placeholder", "Search");
    expect(input).toHaveAttribute("aria-controls", "c-listbox");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("autocomplete", "off");
    expect(input).not.toHaveAttribute("name");
    expect(input.classList).toContain("max-w-xs");
    expect(input).toHaveValue("Australia");
    const host = input.closest("markas-combobox")!;
    expect(host).not.toHaveAttribute("id");
    expect(host).not.toHaveAttribute("name");
    expect(host).not.toHaveAttribute("placeholder");
    const hidden = host.querySelector<HTMLInputElement>("input[type=hidden]")!;
    expect(hidden).toHaveAttribute("name", "country");
    expect(hidden).toHaveValue("au");
    expect(
      screen.getByRole("listbox", { name: "Country", hidden: true }),
    ).toHaveAttribute("id", "c-listbox");
  });

  it("arrows highlight with wrapping, Enter selects and updates [(value)]", async () => {
    const fixture = await mount(ComboboxHost);
    const input = combobox();
    const press = async (key: string) => {
      fireEvent.keyDown(input, { key });
      await fixture.whenStable();
    };
    await press("ArrowDown");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute("data-state", "open");
    expect(input).toHaveAttribute("aria-activedescendant", "c-option-0");
    await press("ArrowUp");
    expect(input).toHaveAttribute("aria-activedescendant", "c-option-3");
    await press("Enter");
    expect(input).toHaveValue("Malaysia");
    expect(fixture.componentInstance.country()).toBe("my");
    expect(screen.getByText("my")).toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-activedescendant");

    fixture.componentInstance.country.set("jp");
    await fixture.whenStable();
    expect(input).toHaveValue("Japan");

    await press("Escape");
    expect(input).toHaveValue("");
    expect(fixture.componentInstance.country()).toBe("");
  });

  it("typing filters and shows the empty label, a click selects", async () => {
    const fixture = await mount(ComboboxHost);
    const input = combobox();
    input.value = "ia";
    fireEvent.input(input);
    await fixture.whenStable();
    expect(fixture.componentInstance.country()).toBe("");
    expect(optionNames()).toEqual(["Australia", "Indonesia", "Malaysia"]);
    input.value = "zz";
    fireEvent.input(input);
    await fixture.whenStable();
    expect(optionNames()).toEqual([]);
    expect(screen.getByText("Tidak ada hasil")).toBeInTheDocument();

    input.value = "";
    fireEvent.input(input);
    await fixture.whenStable();
    const japan = document.getElementById("c-option-2")!;
    expect(fireEvent.mouseDown(japan)).toBe(false);
    fireEvent.click(japan);
    await fixture.whenStable();
    expect(input).toHaveValue("Japan");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("c-option-2")).toHaveAttribute(
      "data-state",
      "checked",
    );
    fireEvent.click(input);
    await fixture.whenStable();
    expect(input).toHaveAttribute("aria-expanded", "true");
    fireEvent.blur(input);
    await fixture.whenStable();
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("generates an id and links the error over the hint", async () => {
    await mount(ComboboxHost);
    const plain = screen.getByRole("combobox", { name: "Plain" });
    expect(plain.id).toMatch(/^markas-combobox-/);
    expect(plain).toHaveAttribute("aria-describedby", `${plain.id}-error`);
    expect(plain).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText("Pick one")).toBeNull();
    expect(plain.closest("markas-combobox")).not.toHaveAttribute("aria-label");
  });
});

@Component({
  imports: [Input],
  template: `
    <markas-input
      [(value)]="email"
      label="Email"
      name="email"
      hint="Work address"
      error="Invalid"
      inputmode="email"
      class="pl-9!"
      readonly
    />
    <markas-input id="name" aria-label="Name" hint="As on your ID" />
    <output>{{ email() }}</output>
  `,
})
class InputHost {
  readonly email = signal("ana");
}

@Component({
  imports: [Textarea],
  template: `
    <markas-textarea
      [(value)]="message"
      label="Message"
      name="message"
      hint="Be kind."
      class="h-40"
    />
    <markas-textarea
      id="notes"
      aria-label="Notes"
      rows="2"
      maxlength="20"
      error="Too short"
      disabled
    />
    <output>{{ message() }}</output>
  `,
})
class TextareaHost {
  readonly message = signal("Hi");
}

@Component({
  imports: [Checkbox],
  template: `
    <markas-checkbox
      [(checked)]="remember"
      label="Remember me"
      description="For 30 days."
      name="remember"
      class="ml-1"
    />
    <markas-checkbox
      id="agree"
      value="yes"
      aria-label="Agree"
      checked
      disabled
    />
    <output>{{ remember() ? "on" : "off" }}</output>
  `,
})
class CheckboxHost {
  readonly remember = signal(false);
}

@Component({
  imports: [Label],
  template: `
    <label markas-label required for="email" class="mb-1">Email</label>
    <label markas-label optional optionalLabel="Opsional">Company</label>
    <label markas-label required requiredLabel="wajib">Name</label>
    <label markas-label>Plain</label>
  `,
})
class LabelHost {}

describe("Angular Input", () => {
  it("links the error, moves attributes to the input, and binds the value", async () => {
    const fixture = await mount(InputHost);
    const field = screen.getByRole("textbox", { name: "Email" });
    expect(field).toHaveAttribute("name", "email");
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAttribute("aria-describedby", `${field.id}-error`);
    expect(field).toHaveAttribute("inputmode", "email");
    expect(field).toHaveProperty("readOnly", true);
    expect(field.classList).toContain("pl-9!");
    expect(field.id).toMatch(/^markas-input-/);
    expect(field.closest("markas-input")).not.toHaveAttribute("name");

    (field as HTMLInputElement).readOnly = false;
    await userEvent.type(field, "@x.id");
    await fixture.whenStable();
    expect(fixture.componentInstance.email()).toBe("ana@x.id");
  });

  it("keeps an explicit id on the input only and points to the hint", async () => {
    await mount(InputHost);
    const field = screen.getByRole("textbox", { name: "Name" });
    expect(field).toHaveAttribute("id", "name");
    expect(field).toHaveAttribute("aria-describedby", "name-hint");
    expect(field).not.toHaveAttribute("aria-invalid");
    const host = field.closest("markas-input")!;
    expect(host).not.toHaveAttribute("id");
    expect(host).not.toHaveAttribute("aria-label");
  });
});

describe("Angular Textarea", () => {
  it("binds the value, defaults to four rows, and links the hint", async () => {
    const fixture = await mount(TextareaHost);
    const field = screen.getByRole("textbox", { name: "Message" });
    expect(field).toHaveValue("Hi");
    expect(field).toHaveAttribute("rows", "4");
    expect(field).toHaveAttribute("aria-describedby", `${field.id}-hint`);
    expect(field.id).toMatch(/^markas-textarea-/);
    expect(field.classList).toContain("h-40");
    await userEvent.type(field, " there");
    await fixture.whenStable();
    expect(fixture.componentInstance.message()).toBe("Hi there");
  });

  it("forwards rows, maxlength, disabled, and the error", async () => {
    await mount(TextareaHost);
    const field = screen.getByRole("textbox", { name: "Notes" });
    expect(field).toHaveAttribute("id", "notes");
    expect(field).toHaveAttribute("rows", "2");
    expect(field).toHaveAttribute("maxlength", "20");
    expect(field).toBeDisabled();
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAttribute("aria-describedby", "notes-error");
    expect(field.closest("markas-textarea")).not.toHaveAttribute("id");
  });
});

describe("Angular Checkbox", () => {
  it("toggles with two-way binding and links label and description", async () => {
    const fixture = await mount(CheckboxHost);
    const box = screen.getByRole("checkbox", { name: "Remember me" });
    expect(box).toHaveAttribute("name", "remember");
    expect(box).toHaveAccessibleDescription("For 30 days.");
    expect(box.id).toMatch(/^markas-checkbox-/);
    expect(box.classList).toContain("ml-1");
    expect(box.classList).toContain("peer");
    expect(box.closest("markas-checkbox")).not.toHaveAttribute("name");

    await userEvent.click(screen.getByText("Remember me"));
    await fixture.whenStable();
    expect(box).toBeChecked();
    expect(fixture.componentInstance.remember()).toBe(true);
    expect(screen.getByText("on")).toBeInTheDocument();
  });

  it("static checked, disabled, value, id, and aria-label land on the input only", async () => {
    await mount(CheckboxHost);
    const box = screen.getByRole("checkbox", { name: "Agree" });
    expect(box).toHaveAttribute("id", "agree");
    expect(box).toHaveAttribute("value", "yes");
    expect(box).toBeChecked();
    expect(box).toBeDisabled();
    expect(box).not.toHaveAttribute("aria-describedby");
    const host = box.closest("markas-checkbox")!;
    expect(host).not.toHaveAttribute("id");
    expect(host).not.toHaveAttribute("value");
    expect(host.querySelector("label")).toBeNull();
  });
});

describe("Angular Label", () => {
  it("keeps native attributes on the label and translates the default texts", async () => {
    await mount(LabelHost);
    const [email, company, name, plain] = [
      ...document.querySelectorAll("label"),
    ] as [
      HTMLLabelElement,
      HTMLLabelElement,
      HTMLLabelElement,
      HTMLLabelElement,
    ];
    expect(email).toHaveAttribute("for", "email");
    expect(email.classList).toContain("mb-1");
    expect(email.classList).toContain("text-ink");
    expect(email.querySelector('[aria-hidden="true"]')).toHaveTextContent("*");
    expect(email.textContent).toBe("Email* required");
    expect(company.textContent).toBe("Company Opsional");
    expect(name.textContent).toBe("Name* wajib");
    expect(plain.textContent).toBe("Plain");
  });
});

@Component({
  imports: [Toggle],
  template: `
    <button markas-toggle [(pressed)]="bold" aria-label="Bold" class="ml-1">
      B
    </button>
    <button markas-toggle variant="outline" size="lg" pressed disabled>
      Pin
    </button>
  `,
})
class ToggleHost {
  readonly bold = signal(false);
}

@Component({
  imports: [ToggleGroup, ToggleGroupItemTemplate],
  template: `
    <markas-toggle-group
      [(value)]="view"
      label="View"
      class="w-full"
      [items]="items"
    >
      <ng-template markasToggleGroupItem="c"
        ><svg aria-hidden="true"></svg
      ></ng-template>
    </markas-toggle-group>
    <markas-toggle-group
      type="multiple"
      label="Style"
      [(value)]="styles"
      [items]="items"
    />
  `,
})
class ToggleGroupHost {
  readonly view = signal<string | string[] | undefined>("b");
  readonly styles = signal<string | string[] | undefined>(["c"]);
  readonly items = [
    { value: "a", label: "Alpha" },
    { value: "b", label: "Beta" },
    { value: "c", label: "Gamma", ariaLabel: "Gamma" },
  ];
}

@Component({
  imports: [RadioGroup],
  template: `
    <markas-radio-group
      [(value)]="plan"
      name="plan"
      label="Plan"
      class="mt-2"
      [options]="options"
    />
    <markas-radio-group
      id="billing"
      name="billing"
      orientation="horizontal"
      disabled
      [options]="billing"
    />
  `,
})
class RadioGroupHost {
  readonly plan = signal<string | undefined>("pro");
  readonly options = [
    { value: "free", label: "Free", description: "For personal projects." },
    { value: "pro", label: "Pro" },
  ];
  readonly billing = [{ value: "monthly", label: "Monthly" }];
}

@Component({
  imports: [Slider],
  template: `
    <markas-slider
      [(value)]="volume"
      name="volume"
      label="Volume"
      max="200"
      class="mt-1"
    />
    <markas-slider
      id="zoom"
      min="10"
      aria-label="Zoom"
      [showValue]="false"
      disabled
    />
  `,
})
class SliderHost {
  readonly volume = signal(30);
}

describe("Angular Toggle", () => {
  it("flips aria-pressed with two-way binding and keeps attributes on the button", async () => {
    const fixture = await mount(ToggleHost);
    const bold = screen.getByRole("button", { name: "Bold" });
    expect(bold).toHaveAttribute("type", "button");
    expect(bold).toHaveAttribute("aria-pressed", "false");
    expect(bold.classList).toContain("ml-1");
    expect(bold.classList).toContain("h-9");

    await userEvent.click(bold);
    await fixture.whenStable();
    expect(bold).toHaveAttribute("aria-pressed", "true");
    expect(bold).toHaveAttribute("data-state", "on");
    expect(fixture.componentInstance.bold()).toBe(true);

    const pin = screen.getByRole("button", { name: "Pin" });
    expect(pin).toHaveAttribute("aria-pressed", "true");
    expect(pin).toBeDisabled();
    expect(pin.classList).toContain("border-line");
    expect(pin.classList).toContain("h-10");
  });
});

describe("Angular ToggleGroup", () => {
  it("single: roving tabindex, arrows, custom template, and two-way value", async () => {
    const fixture = await mount(ToggleGroupHost);
    const group = screen.getByRole("group", { name: "View" });
    expect(group.classList).toContain("w-full");
    expect(group.closest("markas-toggle-group")).not.toHaveAttribute("label");
    const [alpha, beta, gamma] = Array.from(
      group.querySelectorAll("button"),
    ) as [HTMLButtonElement, HTMLButtonElement, HTMLButtonElement];
    expect(beta).toHaveAttribute("aria-pressed", "true");
    expect(beta.tabIndex).toBe(0);
    expect(gamma.tabIndex).toBe(-1);
    expect(gamma.querySelector("svg")).not.toBeNull();
    expect(gamma.textContent?.trim()).toBe("");

    beta.focus();
    await userEvent.keyboard("{ArrowRight}");
    await fixture.whenStable();
    expect(gamma).toHaveFocus();
    expect(gamma.tabIndex).toBe(0);
    await userEvent.keyboard("{ArrowRight}");
    expect(alpha).toHaveFocus();

    await userEvent.click(gamma);
    await fixture.whenStable();
    expect(gamma).toHaveAttribute("aria-pressed", "true");
    expect(beta).toHaveAttribute("aria-pressed", "false");
    expect(fixture.componentInstance.view()).toBe("c");
    await userEvent.click(gamma);
    await fixture.whenStable();
    expect(fixture.componentInstance.view()).toBe("");
  });

  it("multiple: keeps several items pressed in item order", async () => {
    const fixture = await mount(ToggleGroupHost);
    const group = screen.getByRole("group", { name: "Style" });
    await userEvent.click(group.querySelector("button")!);
    await fixture.whenStable();
    expect(fixture.componentInstance.styles()).toEqual(["a", "c"]);
    expect(group.querySelectorAll('button[aria-pressed="true"]')).toHaveLength(
      2,
    );
  });
});

describe("Angular RadioGroup", () => {
  it("renders a legend, linked labels and descriptions, and two-way value", async () => {
    const fixture = await mount(RadioGroupHost);
    const group = screen.getByRole("group", { name: "Plan" });
    expect(group.tagName).toBe("FIELDSET");
    expect(group.classList).toContain("mt-2");
    expect(group.id).toMatch(/^markas-radio-group-/);
    const free = screen.getByRole("radio", { name: "Free" });
    expect(free).toHaveAttribute("name", "plan");
    expect(free).toHaveAccessibleDescription("For personal projects.");
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();

    await userEvent.click(screen.getByText("Free"));
    await fixture.whenStable();
    expect(free).toBeChecked();
    expect(fixture.componentInstance.plan()).toBe("free");
  });

  it("moves id and disabled to the fieldset", async () => {
    await mount(RadioGroupHost);
    const radio = screen.getByRole("radio", { name: "Monthly" });
    expect(radio.id).toBe("billing-monthly");
    expect(radio).toBeDisabled();
    expect(radio.closest("div.flex-wrap")).not.toBeNull();
    const host = radio.closest("markas-radio-group")!;
    expect(host).not.toHaveAttribute("id");
    expect(host).not.toHaveAttribute("disabled");
  });
});

describe("Angular Slider", () => {
  it("updates the fill, the visible number, and the two-way value", async () => {
    const fixture = await mount(SliderHost);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("name", "volume");
    expect(slider).toHaveAttribute("max", "200");
    expect(slider.classList).toContain("mt-1");
    expect(slider.style.getPropertyValue("--value")).toBe("15%");

    fireEvent.input(slider, { target: { value: "100" } });
    await fixture.whenStable();
    expect(slider.style.getPropertyValue("--value")).toBe("50%");
    expect(fixture.componentInstance.volume()).toBe(100);
    expect(screen.getByText("100")).toHaveAttribute("aria-hidden", "true");
  });

  it("defaults to min, hides the number, and keeps aria-label on the input", async () => {
    await mount(SliderHost);
    const zoom = screen.getByRole("slider", { name: "Zoom" });
    expect(zoom).toHaveAttribute("id", "zoom");
    expect(zoom).toHaveValue("10");
    expect(zoom).toBeDisabled();
    expect(zoom.style.getPropertyValue("--value")).toBe("0%");
    const host = zoom.closest("markas-slider")!;
    expect(host).not.toHaveAttribute("aria-label");
    expect(host).not.toHaveAttribute("id");
    expect(host.querySelector("[aria-hidden=true]")).toBeNull();
  });
});

@Component({
  imports: [Select],
  template: `
    <markas-select
      [(value)]="city"
      name="city"
      label="City"
      hint="Pick one"
      class="ml-1"
    >
      <option value="jakarta">Jakarta</option>
      <option value="bandung">Bandung</option>
    </markas-select>
    <markas-select id="role" aria-label="Role" error="Required" disabled>
      <option value="a">A</option>
      <option value="b" selected>B</option>
    </markas-select>
    <output>{{ city() }}</output>
  `,
})
class SelectHost {
  readonly city = signal("bandung");
}

@Component({
  imports: [InputOTP],
  template: `
    <markas-input-otp
      [(value)]="code"
      name="code"
      label="Code"
      length="4"
      class="ml-1"
      (complete)="completed = $event"
    />
    <markas-input-otp
      id="pin"
      value="12"
      length="3"
      digitLabel="Digit {index} dari {length}"
      disabled
    />
    <output>{{ code() || "empty" }}</output>
  `,
})
class InputOTPHost {
  readonly code = signal("");
  completed = "";
}

describe("Angular Select", () => {
  it("applies the bound value, links label and hint, and writes back on change", async () => {
    const fixture = await mount(SelectHost);
    const select = screen.getByRole("combobox", { name: "City" });
    expect(select).toHaveValue("bandung");
    expect(select).toHaveAttribute("name", "city");
    expect(select.id).toMatch(/^markas-select-/);
    expect(select).toHaveAttribute("aria-describedby", `${select.id}-hint`);
    expect(select.classList).toContain("ml-1");
    expect(select.closest("markas-select")).not.toHaveAttribute("name");

    await userEvent.selectOptions(select, "jakarta");
    await fixture.whenStable();
    expect(fixture.componentInstance.city()).toBe("jakarta");
    expect(screen.getByText("jakarta")).toBeInTheDocument();
  });

  it("keeps the selected option without a value and moves id and aria-label", async () => {
    await mount(SelectHost);
    const role = screen.getByRole("combobox", { name: "Role" });
    expect(role).toHaveValue("b");
    expect(role).toHaveAttribute("id", "role");
    expect(role).toHaveAttribute("aria-invalid", "true");
    expect(role).toHaveAttribute("aria-describedby", "role-error");
    expect(role).toBeDisabled();
    const host = role.closest("markas-select")!;
    expect(host).not.toHaveAttribute("id");
    expect(host).not.toHaveAttribute("aria-label");
  });
});

describe("Angular InputOTP", () => {
  it("advances on typing, binds the code, and emits complete", async () => {
    const fixture = await mount(InputOTPHost);
    const group = screen.getByRole("group", { name: "Code" });
    expect(group.classList).toContain("ml-1");
    const boxes = [...group.querySelectorAll<HTMLInputElement>("[type=text]")];
    expect(boxes).toHaveLength(4);
    expect(boxes[0]).toHaveAttribute("aria-label", "Digit 1 of 4");
    expect(boxes[0]).toHaveAttribute("autocomplete", "one-time-code");

    await userEvent.click(boxes[0]!);
    await userEvent.keyboard("1a2");
    await fixture.whenStable();
    expect(boxes[0]).toHaveValue("1");
    expect(boxes[1]).toHaveValue("2");
    expect(boxes[2]).toHaveFocus();
    expect(fixture.componentInstance.code()).toBe("12");

    await userEvent.keyboard("{Backspace}");
    await fixture.whenStable();
    expect(boxes[1]).toHaveValue("");
    expect(boxes[1]).toHaveFocus();

    fireEvent.paste(boxes[0]!, { clipboardData: { getData: () => "98-76" } });
    await fixture.whenStable();
    expect(fixture.componentInstance.code()).toBe("9876");
    expect(fixture.componentInstance.completed).toBe("9876");
    expect(group.querySelector<HTMLInputElement>("[name=code]")!.value).toBe(
      "9876",
    );
  });

  it("fills from value, translates labels, and disables the fieldset", async () => {
    await mount(InputOTPHost);
    const pin = document.getElementById("pin") as HTMLFieldSetElement;
    expect(pin.tagName).toBe("FIELDSET");
    expect(pin).toBeDisabled();
    expect(pin.closest("markas-input-otp")).not.toHaveAttribute("id");
    const boxes = [...pin.querySelectorAll<HTMLInputElement>("[type=text]")];
    expect(boxes.map((box) => box.value)).toEqual(["1", "2", ""]);
    expect(boxes[2]).toHaveAttribute("aria-label", "Digit 3 dari 3");
    expect(pin.querySelector("[type=hidden]")).toBeNull();
  });
});
