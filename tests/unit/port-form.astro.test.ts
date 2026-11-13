// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Combobox from "../../components/combobox/Combobox.astro";
import Checkbox from "../../components/checkbox/Checkbox.astro";
import Input from "../../components/input/Input.astro";
import Label from "../../components/label/Label.astro";
import Textarea from "../../components/textarea/Textarea.astro";
import RadioGroup from "../../components/radio-group/RadioGroup.astro";
import Slider from "../../components/slider/Slider.astro";
import Toggle from "../../components/toggle/Toggle.astro";
import ToggleGroup from "../../components/toggle-group/ToggleGroup.astro";
import InputOTP from "../../components/input-otp/InputOTP.astro";
import Select from "../../components/select/Select.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const options = [
  { value: "au", label: "Australia" },
  { value: "id", label: "Indonesia" },
  { value: "jp", label: "Japan" },
];

describe("Astro Combobox", () => {
  it("renders ARIA, the selected option, the hidden value, and the user class", async () => {
    const html = await container.renderToString(Combobox, {
      props: {
        options,
        id: "c",
        name: "country",
        label: "Country",
        value: "jp",
        placeholder: "Search",
        class: "max-w-xs",
      },
    });
    const input = html.match(/<input[^>]*role="combobox"[^>]*>/)![0];
    expect(input).toContain('id="c"');
    expect(input).toContain('aria-controls="c-listbox"');
    expect(input).toContain('aria-expanded="false"');
    expect(input).toContain('aria-autocomplete="list"');
    expect(input).toContain('autocomplete="off"');
    expect(input).toContain('placeholder="Search"');
    expect(input).toContain('value="Japan"');
    expect(input).not.toContain("name=");
    expect(input).toMatch(/class="[^"]*max-w-xs"/);
    expect(html).toMatch(/<input type="hidden" name="country" value="jp"/);
    expect(html).toContain('<label id="c-label" for="c"');
    expect(html).toContain('aria-labelledby="c-label"');
    expect(html).toContain('popover="manual"');
    expect(html).toMatch(/id="c-option-2"[^>]*data-state="checked"/);
    expect(html).toMatch(/id="c-option-0"[^>]*data-state="unchecked"/);
    expect(html.match(/<svg[^>]*display: none/g)).toHaveLength(2);
    expect(html).toContain("<markas-combobox");
  });

  it("generates an id, translates the empty label, and links the error", async () => {
    const html = await container.renderToString(Combobox, {
      props: {
        options,
        emptyLabel: "Tidak ada hasil",
        hint: "Pick one",
        error: "Required",
      },
    });
    const id = html.match(/id="(markas-combobox-[\w-]+?)"/)![1];
    expect(html).toContain(`aria-describedby="${id}-error"`);
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain("Tidak ada hasil");
    expect(html).not.toContain("Pick one");
    expect(html).not.toContain('type="hidden"');
    expect(html).not.toContain("<label");
  });
});

const tag = (html: string, name: string) =>
  Object.fromEntries(
    [
      ...html
        .match(new RegExp(`<${name}[^>]*>`))![0]
        .matchAll(/([\w-:]+)(?:="([^"]*)")?/g),
    ]
      .slice(1)
      .map((match) => [match[1], match[2] ?? ""]),
  );

describe("Astro Input", () => {
  it("links the label and error with a generated id and appends the class", async () => {
    const html = await container.renderToString(Input, {
      props: {
        label: "Email",
        hint: "Work address",
        error: "Invalid",
        name: "email",
        readonly: true,
        class: "pl-9!",
      },
    });
    const input = tag(html, "input");
    expect(input.id).toMatch(/^markas-input-/);
    expect(input.type).toBe("text");
    expect(input["aria-invalid"]).toBe("true");
    expect(input["aria-describedby"]).toBe(`${input.id}-error`);
    expect(input).toHaveProperty("readonly");
    expect(input.class.endsWith("pl-9!")).toBe(true);
    expect(html).toContain(`<label for="${input.id}"`);
    expect(html).not.toContain("Work address");
  });

  it("keeps an explicit id and points to the hint", async () => {
    const html = await container.renderToString(Input, {
      props: { id: "name", hint: "As on your ID", type: "email" },
    });
    const input = tag(html, "input");
    expect(input.id).toBe("name");
    expect(input.type).toBe("email");
    expect(input["aria-describedby"]).toBe("name-hint");
    expect(input).not.toHaveProperty("aria-invalid");
    expect(html).not.toContain("<label");
  });
});

describe("Astro Textarea", () => {
  it("renders the value as content, four rows by default, and the hint", async () => {
    const html = await container.renderToString(Textarea, {
      props: { label: "Message", hint: "Be kind.", value: "Hi", class: "h-40" },
    });
    const field = tag(html, "textarea");
    expect(field.rows).toBe("4");
    expect(field.id).toMatch(/^markas-textarea-/);
    expect(field["aria-describedby"]).toBe(`${field.id}-hint`);
    expect(field.class.endsWith("h-40")).toBe(true);
    expect(html).toMatch(/>Hi<\/textarea>/);
    expect(html).toContain(`<label for="${field.id}"`);
  });

  it("marks an error and forwards rows and native attributes", async () => {
    const html = await container.renderToString(Textarea, {
      props: { id: "notes", rows: 2, maxlength: 20, error: "Too short" },
    });
    const field = tag(html, "textarea");
    expect(field.rows).toBe("2");
    expect(field.maxlength).toBe("20");
    expect(field["aria-invalid"]).toBe("true");
    expect(field["aria-describedby"]).toBe("notes-error");
  });
});

describe("Astro Checkbox", () => {
  it("links label and description with a generated id", async () => {
    const html = await container.renderToString(Checkbox, {
      props: {
        label: "Remember me",
        description: "For 30 days.",
        name: "remember",
        checked: true,
        class: "ml-1",
      },
    });
    const input = tag(html, "input");
    expect(input.type).toBe("checkbox");
    expect(input.name).toBe("remember");
    expect(input).toHaveProperty("checked");
    expect(input.id).toMatch(/^markas-checkbox-/);
    expect(input["aria-describedby"]).toBe(`${input.id}-description`);
    expect(input.class.endsWith("ml-1")).toBe(true);
    expect(html).toContain(`<label for="${input.id}"`);
    expect(html).toContain(`<p id="${input.id}-description"`);
  });

  it("keeps an explicit id and renders no text block without label", async () => {
    const html = await container.renderToString(Checkbox, {
      props: { id: "agree", "aria-label": "Agree", disabled: true },
    });
    const input = tag(html, "input");
    expect(input.id).toBe("agree");
    expect(input["aria-label"]).toBe("Agree");
    expect(input).toHaveProperty("disabled");
    expect(input).not.toHaveProperty("aria-describedby");
    expect(html).not.toContain("<label");
    expect(html).not.toContain("grid gap-0.5");
  });
});

describe("Astro Label", () => {
  it("hides the marker, keeps native attributes, and translates the texts", async () => {
    const required = await container.renderToString(Label, {
      props: { required: true, for: "email", class: "mb-1" },
      slots: { default: "Email" },
    });
    expect(required).toContain('for="email"');
    expect(required).toMatch(/class="text-sm font-medium text-ink mb-1"/);
    expect(required).toContain(
      'Email<span aria-hidden="true" class="ms-0.5 text-danger">*</span> <span class="sr-only">required</span></label>',
    );

    const optional = await container.renderToString(Label, {
      props: { optional: true, optionalLabel: "Opsional" },
      slots: { default: "Company" },
    });
    expect(optional).toContain(
      'Company <span class="font-normal text-muted">Opsional</span></label>',
    );

    const translated = await container.renderToString(Label, {
      props: { required: true, requiredLabel: "wajib" },
      slots: { default: "Name" },
    });
    expect(translated).toContain('<span class="sr-only">wajib</span>');
  });
});

const buttons = (html: string) => html.match(/<button[^>]*>/g) ?? [];

describe("Astro Toggle", () => {
  it("renders the pressed state, variant, size, and the user class last", async () => {
    const html = await container.renderToString(Toggle, {
      props: {
        pressed: true,
        variant: "outline",
        size: "lg",
        class: "ml-1",
        "aria-label": "Bold",
      },
      slots: { default: "B" },
    });
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('data-state="on"');
    expect(html).toContain('aria-label="Bold"');
    expect(html).toContain("data-markas-toggle");
    expect(html).toMatch(/class="[^"]*border-line[^"]*h-10[^"]*ml-1"/);

    const off = await container.renderToString(Toggle, {
      slots: { default: "Pin" },
    });
    expect(off).toContain('aria-pressed="false"');
    expect(off).toContain('data-state="off"');
    expect(off).toContain("h-9");
  });
});

describe("Astro ToggleGroup", () => {
  const items = [
    { value: "a", label: "Alpha" },
    { value: "b", label: "Beta" },
    { value: "c", label: "Gamma", ariaLabel: "Gamma" },
  ];

  it("presses the value, sets the tab stop, and replaces a label through a slot", async () => {
    const html = await container.renderToString(ToggleGroup, {
      props: { items, value: "b", label: "View", class: "w-full" },
      slots: { c: '<svg aria-hidden="true"></svg>' },
    });
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="View"');
    expect(html).toContain('data-markas-toggle-group="single"');
    expect(html).toMatch(/<div[^>]*class="[^"]*p-1 w-full"/);
    const [alpha, beta, gamma] = buttons(html);
    expect(alpha).toContain('aria-pressed="false"');
    expect(alpha).toContain('tabindex="-1"');
    expect(beta).toContain('aria-pressed="true"');
    expect(beta).toContain('tabindex="0"');
    expect(gamma).toContain('aria-label="Gamma"');
    expect(html).toContain('<svg aria-hidden="true"></svg></button>');
    expect(html).not.toContain(">Gamma<");
  });

  it("multiple keeps every pressed value, single only the first; no value puts the first item in the tab order", async () => {
    const multiple = await container.renderToString(ToggleGroup, {
      props: { items, type: "multiple", value: ["a", "c"] },
    });
    expect(multiple.match(/aria-pressed="true"/g)).toHaveLength(2);
    const single = await container.renderToString(ToggleGroup, {
      props: { items, value: ["c", "a"] },
    });
    expect(single.match(/aria-pressed="true"/g)).toHaveLength(1);
    expect(buttons(single)[0]).toContain('aria-pressed="true"');
    const empty = await container.renderToString(ToggleGroup, {
      props: { items },
    });
    expect(empty).not.toContain('aria-pressed="true"');
    expect(buttons(empty)[0]).toContain('tabindex="0"');
  });
});

describe("Astro RadioGroup", () => {
  it("renders a legend, checked option, linked labels, and descriptions", async () => {
    const html = await container.renderToString(RadioGroup, {
      props: {
        name: "plan",
        label: "Plan",
        value: "pro",
        id: "plan",
        class: "mt-2",
        options: [
          { value: "free", label: "Free", description: "Personal." },
          { value: "pro", label: "Pro" },
        ],
      },
    });
    expect(html).toMatch(/<fieldset id="plan" class="min-w-0 mt-2"/);
    expect(html).toContain("<legend");
    expect(html).toContain('aria-describedby="plan-free-description"');
    expect(html).toContain('<p id="plan-free-description"');
    expect(html).toContain('<label for="plan-pro"');
    expect(html).toMatch(/<input[^>]*value="pro"[^>]*checked/);
    expect(html.match(/\schecked[\s>/]/g)).toHaveLength(1);
    expect(html).toContain("grid gap-3");
  });

  it("generates an id, forwards disabled, and lays out horizontally", async () => {
    const html = await container.renderToString(RadioGroup, {
      props: {
        name: "billing",
        orientation: "horizontal",
        disabled: true,
        options: [{ value: "monthly", label: "Monthly" }],
      },
    });
    expect(html).toMatch(/id="markas-radio-group-[\w-]+-monthly"/);
    expect(html).toMatch(/<fieldset[^>]*disabled/);
    expect(html).toContain("flex flex-wrap gap-x-6 gap-y-3");
    expect(html).not.toContain("<legend");
  });
});

describe("Astro Slider", () => {
  it("renders the value, fill, label, and visible number", async () => {
    const html = await container.renderToString(Slider, {
      props: {
        name: "volume",
        label: "Volume",
        max: 200,
        value: 50,
        class: "mt-1",
      },
    });
    const input = html.match(/<input[^>]*>/)![0];
    expect(input).toContain('type="range"');
    expect(input).toContain('value="50"');
    expect(input).toContain('max="200"');
    expect(input).toContain('style="--value: 25%"');
    expect(input).toMatch(/id="markas-slider-[\w-]+"/);
    expect(input).toMatch(/class="[^"]*mt-1"/);
    expect(html).toMatch(/<label for="markas-slider-/);
    expect(html).toMatch(/data-markas-slider-value>50<\/span>/);
  });

  it("defaults to min and hides the header without label and number", async () => {
    const html = await container.renderToString(Slider, {
      props: { id: "zoom", min: 10, showValue: false, "aria-label": "Zoom" },
    });
    expect(html).toContain('id="zoom"');
    expect(html).toContain('value="10"');
    expect(html).toContain('aria-label="Zoom"');
    expect(html).toContain("--value: 0%");
    expect(html).not.toContain("<label");
    expect(html).not.toContain("data-markas-slider-value");
  });
});

describe("Astro Select", () => {
  it("renders the options slot, a linked label, the hint, and a generated id", async () => {
    const html = await container.renderToString(Select, {
      props: { name: "city", label: "City", hint: "Pick one", class: "ml-1" },
      slots: { default: '<option value="a">A</option>' },
    });
    const id = html.match(/<select[^>]*id="(markas-select-[\w-]+)"/)![1];
    expect(html).toContain(`<label for="${id}"`);
    expect(html).toContain(`aria-describedby="${id}-hint"`);
    expect(html).toContain('name="city"');
    expect(html).toMatch(/<select[^>]*class="[^"]*ml-1"/);
    expect(html).toContain('<option value="a">A</option>');
    expect(html).not.toContain('aria-invalid="');
  });

  it("shows the error instead of the hint and keeps an explicit id", async () => {
    const html = await container.renderToString(Select, {
      props: { id: "role", hint: "Hidden", error: "Required", disabled: true },
    });
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('aria-describedby="role-error"');
    expect(html).toContain('<p id="role-error"');
    expect(html).not.toContain("Hidden");
    expect(html).not.toContain("<label");
  });
});

describe("Astro InputOTP", () => {
  it("renders one labelled box per digit, the legend, and the hidden field", async () => {
    const html = await container.renderToString(InputOTP, {
      props: { name: "code", label: "Code", value: "12", class: "ml-1" },
    });
    expect(html).toMatch(/<fieldset[^>]*data-markas-otp/);
    expect(html).toMatch(/<fieldset[^>]*class="[^"]*ml-1"/);
    expect(html).toContain("<legend");
    expect(html.match(/type="text"/g)).toHaveLength(6);
    expect(html).toContain('aria-label="Digit 1 of 6"');
    expect(html).toContain('autocomplete="one-time-code"');
    expect(html).toContain('inputmode="numeric"');
    expect(html).toMatch(/type="hidden" name="code" value="12"/);
  });

  it("supports length, a translated digit label, and no name", async () => {
    const html = await container.renderToString(InputOTP, {
      props: { length: 4, digitLabel: "Digit {index} dari {length}" },
    });
    expect(html.match(/type="text"/g)).toHaveLength(4);
    expect(html).toContain('aria-label="Digit 4 dari 4"');
    expect(html).not.toContain('type="hidden"');
    expect(html).not.toContain("<legend");
  });
});
