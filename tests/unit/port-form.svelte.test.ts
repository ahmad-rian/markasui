import { fireEvent, render, screen } from "@testing-library/svelte";
import { createRawSnippet, tick } from "svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Combobox from "../../components/combobox/Combobox.svelte";
import ComboboxHarness from "./fixtures/ComboboxHarness.svelte";
import userEvent from "@testing-library/user-event";
import Checkbox from "../../components/checkbox/Checkbox.svelte";
import Input from "../../components/input/Input.svelte";
import Textarea from "../../components/textarea/Textarea.svelte";
import CheckboxHarness from "./fixtures/CheckboxHarness.svelte";
import LabelHarness from "./fixtures/LabelHarness.svelte";
import TextareaHarness from "./fixtures/TextareaHarness.svelte";
import RadioGroup from "../../components/radio-group/RadioGroup.svelte";
import Slider from "../../components/slider/Slider.svelte";
import Toggle from "../../components/toggle/Toggle.svelte";
import RadioGroupHarness from "./fixtures/RadioGroupHarness.svelte";
import SliderHarness from "./fixtures/SliderHarness.svelte";
import ToggleGroupHarness from "./fixtures/ToggleGroupHarness.svelte";
import ToggleHarness from "./fixtures/ToggleHarness.svelte";
import InputOTP from "../../components/input-otp/InputOTP.svelte";
import Select from "../../components/select/Select.svelte";
import InputOTPHarness from "./fixtures/InputOTPHarness.svelte";
import SelectHarness from "./fixtures/SelectHarness.svelte";

// jsdom belum punya Popover API: tampilkan elemen dan kirim beforetoggle dan toggle seperti browser.
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
  const native: Partial<HTMLElement> = HTMLElement.prototype;
  if (typeof native.showPopover === "function") return;
  HTMLElement.prototype.showPopover = function showPopover() {
    setPopover(this, true);
  };
  HTMLElement.prototype.hidePopover = function hidePopover() {
    setPopover(this, false);
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

const options = [
  { value: "au", label: "Australia" },
  { value: "id", label: "Indonesia" },
  { value: "jp", label: "Japan" },
];
const input = () => screen.getByRole("combobox");
const optionNames = () =>
  screen
    .queryAllByRole("option", { hidden: true })
    .map((el) => el.textContent?.trim());
const press = async (key: string) => {
  await fireEvent.keyDown(input(), { key });
  await tick();
};

describe("Svelte Combobox", () => {
  it("wires ARIA, label, hidden value, user class, and two-way binding", async () => {
    const onvaluechange = vi.fn();
    render(ComboboxHarness, { onvaluechange });
    expect(input()).toHaveAccessibleName("Country");
    expect(input()).toHaveAttribute("id", "c");
    expect(input()).toHaveAttribute("aria-controls", "c-listbox");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).not.toHaveAttribute("name");
    expect(input().className.endsWith("max-w-xs")).toBe(true);
    expect(input()).toHaveValue("Australia");
    const hidden = document.querySelector<HTMLInputElement>(
      'input[type="hidden"]',
    )!;
    expect(hidden).toHaveAttribute("name", "country");
    expect(hidden).toHaveValue("au");

    await press("ArrowDown");
    expect(input()).toHaveAttribute("aria-expanded", "true");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-0");
    await press("ArrowUp");
    expect(input()).toHaveAttribute("aria-activedescendant", "c-option-3");
    await press("Enter");
    expect(input()).toHaveValue("Malaysia");
    expect(onvaluechange).toHaveBeenCalledWith("my");
    expect(screen.getByText("my", { selector: "output" })).toBeInTheDocument();
    expect(input()).not.toHaveAttribute("aria-activedescendant");

    await fireEvent.click(screen.getByRole("button", { name: "Pick" }));
    await fireEvent.click(screen.getByRole("button", { name: "Pick" }));
    await tick();
    expect(input()).toHaveValue("Malaysia");
  });

  it("an outside value change syncs the text", async () => {
    render(ComboboxHarness);
    await fireEvent.input(input(), { target: { value: "x" } });
    await fireEvent.click(screen.getByRole("button", { name: "Pick" }));
    await tick();
    expect(input()).toHaveValue("Malaysia");
  });

  it("typing filters, clears the value, and shows the translated empty label", async () => {
    render(ComboboxHarness);
    await fireEvent.input(input(), { target: { value: "ia" } });
    await tick();
    expect(screen.getByText("", { selector: "output" })).toBeInTheDocument();
    expect(optionNames()).toEqual(["Australia", "Indonesia", "Malaysia"]);
    await fireEvent.input(input(), { target: { value: "zz" } });
    await tick();
    expect(optionNames()).toEqual([]);
    expect(screen.getByText("Tidak ada hasil")).toBeInTheDocument();
  });

  it("Escape closes first, then clears; click selects; generated id; default empty label", async () => {
    const { container } = render(Combobox, { options, value: "jp" });
    expect(input().id).not.toBe("");
    expect(container.querySelector('input[type="hidden"]')).toBeNull();
    await press("ArrowDown");
    await press("Escape");
    expect(input()).toHaveAttribute("aria-expanded", "false");
    expect(input()).toHaveValue("Japan");
    await press("Escape");
    expect(input()).toHaveValue("");

    await fireEvent.click(input());
    await tick();
    expect(input()).toHaveAttribute("aria-expanded", "true");
    const option = screen.getByRole("option", {
      name: "Indonesia",
      hidden: true,
    });
    expect(await fireEvent.mouseDown(option)).toBe(false);
    await fireEvent.click(option);
    await tick();
    expect(input()).toHaveValue("Indonesia");
    expect(
      screen.getByRole("option", { name: "Indonesia", hidden: true }),
    ).toHaveAttribute("data-state", "checked");
    await fireEvent.blur(input());
    await tick();
    expect(input()).toHaveAttribute("aria-expanded", "false");

    await fireEvent.input(input(), { target: { value: "qq" } });
    await tick();
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("hint and error link through aria-describedby", () => {
    render(Combobox, { options, id: "e", hint: "Pick one", error: "Required" });
    expect(input()).toHaveAttribute("aria-describedby", "e-error");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText("Pick one")).toBeNull();
  });
});

describe("Svelte Input", () => {
  it("links label, hint, and error through ARIA and appends the user class", () => {
    render(Input, {
      label: "Email",
      hint: "Work address",
      error: "Invalid",
      class: "pl-9!",
      readonly: true,
      inputmode: "email",
    });
    const field = screen.getByRole("textbox", { name: "Email" });
    expect(field).toHaveAttribute("type", "text");
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAttribute("aria-describedby", `${field.id}-error`);
    expect(field).toHaveAttribute("readonly");
    expect(field).toHaveAttribute("inputmode", "email");
    expect(field.className.endsWith("pl-9!")).toBe(true);
    expect(screen.queryByText("Work address")).toBeNull();
  });

  it("keeps an explicit id and points to the hint without an error", () => {
    render(Input, { id: "name", hint: "As on your ID", "aria-label": "Name" });
    const field = screen.getByRole("textbox", { name: "Name" });
    expect(field).toHaveAttribute("id", "name");
    expect(field).toHaveAttribute("aria-describedby", "name-hint");
    expect(field).not.toHaveAttribute("aria-invalid");
  });
});

describe("Svelte Textarea", () => {
  it("binds the value, defaults to four rows, and links the hint", async () => {
    render(TextareaHarness);
    const field = screen.getByRole("textbox", { name: "Message" });
    expect(field).toHaveValue("Hi");
    expect(field).toHaveAttribute("rows", "4");
    expect(field).toHaveAttribute("aria-describedby", `${field.id}-hint`);
    expect(field.className.endsWith("h-40")).toBe(true);
    await userEvent.type(field, " there");
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });

  it("marks an error and forwards rows and native attributes", () => {
    render(Textarea, {
      id: "notes",
      rows: 2,
      error: "Too short",
      maxlength: 20,
      "aria-label": "Notes",
    });
    const field = screen.getByRole("textbox", { name: "Notes" });
    expect(field).toHaveAttribute("rows", "2");
    expect(field).toHaveAttribute("maxlength", "20");
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAttribute("aria-describedby", "notes-error");
  });
});

describe("Svelte Checkbox", () => {
  it("binds checked, links label and description, and appends the class", async () => {
    render(CheckboxHarness);
    const box = screen.getByRole("checkbox", { name: "Remember me" });
    expect(box).toHaveAttribute("type", "checkbox");
    expect(box).toHaveAccessibleDescription("For 30 days.");
    expect(box.className.endsWith("ml-1")).toBe(true);
    expect(screen.getByText("off")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Remember me"));
    expect(box).toBeChecked();
    expect(screen.getByText("on")).toBeInTheDocument();
  });

  it("keeps an explicit id and renders no text block without label", () => {
    render(Checkbox, {
      id: "agree",
      name: "agree",
      value: "yes",
      checked: true,
      disabled: true,
      "aria-label": "Agree",
    });
    const box = screen.getByRole("checkbox", { name: "Agree" });
    expect(box).toHaveAttribute("id", "agree");
    expect(box).toHaveAttribute("value", "yes");
    expect(box).toBeChecked();
    expect(box).toBeDisabled();
    expect(box).not.toHaveAttribute("aria-describedby");
    expect(document.querySelector("label")).toBeNull();
  });
});

describe("Svelte Label", () => {
  it("hides the marker from screen readers and translates the default texts", () => {
    render(LabelHarness);
    const [email, company, name] = [...document.querySelectorAll("label")] as [
      HTMLLabelElement,
      HTMLLabelElement,
      HTMLLabelElement,
      HTMLLabelElement,
    ];
    expect(email).toHaveAttribute("for", "email");
    expect(email.className.endsWith("mb-1")).toBe(true);
    expect(email.querySelector('[aria-hidden="true"]')).toHaveTextContent("*");
    expect(email.textContent).toBe("Email* required");
    expect(company.textContent).toBe("Company Opsional");
    expect(name.textContent).toBe("Name* wajib");
  });
});

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe("Svelte Toggle", () => {
  it("flips aria-pressed and data-state and binds pressed", async () => {
    render(ToggleHarness);
    const bold = screen.getByRole("button", { name: "Bold" });
    expect(bold).toHaveAttribute("type", "button");
    expect(bold).toHaveAttribute("aria-pressed", "false");
    expect(bold).toHaveAttribute("data-state", "off");
    expect(bold.className).toContain("h-9");
    expect(bold.className.endsWith("ml-1")).toBe(true);

    await userEvent.click(bold);
    expect(bold).toHaveAttribute("aria-pressed", "true");
    expect(bold).toHaveAttribute("data-state", "on");
    expect(screen.getByText("on")).toBeInTheDocument();
  });

  it("applies variant and size, and a prevented click keeps the state", async () => {
    const onclick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(Toggle, {
      children: text("Pin"),
      variant: "outline",
      size: "lg",
      pressed: true,
      onclick,
    });
    const pin = screen.getByRole("button", { name: "Pin" });
    expect(pin.className).toContain("border-line");
    expect(pin.className).toContain("h-10");
    await userEvent.click(pin);
    expect(onclick).toHaveBeenCalledOnce();
    expect(pin).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Svelte ToggleGroup", () => {
  it("single: one pressed item, roving tabindex, arrows move focus", async () => {
    render(ToggleGroupHarness);
    const group = screen.getByRole("group", { name: "View" });
    expect(group.className.endsWith("w-full")).toBe(true);
    const beta = screen.getByRole("button", { name: "Beta" });
    const gamma = screen.getByRole("button", { name: "Gamma" });
    expect(beta).toHaveAttribute("aria-pressed", "true");
    expect(beta.tabIndex).toBe(0);
    expect(gamma.tabIndex).toBe(-1);
    expect(gamma.querySelector("svg")).not.toBeNull();

    beta.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(gamma).toHaveFocus();
    expect(gamma.tabIndex).toBe(0);
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Alpha" })).toHaveFocus();

    await userEvent.click(gamma);
    expect(gamma).toHaveAttribute("aria-pressed", "true");
    expect(beta).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText('"c"')).toBeInTheDocument();
    await userEvent.click(gamma);
    expect(screen.getByText('""')).toBeInTheDocument();
  });

  it("multiple: keeps several items pressed in item order", async () => {
    render(ToggleGroupHarness, { type: "multiple", value: ["c"] });
    await userEvent.click(screen.getByRole("button", { name: "Alpha" }));
    expect(screen.getByText('["a","c"]')).toBeInTheDocument();
  });
});

describe("Svelte RadioGroup", () => {
  it("renders a legend, linked labels and descriptions, and binds value", async () => {
    render(RadioGroupHarness);
    const group = screen.getByRole("group", { name: "Plan" });
    expect(group.tagName).toBe("FIELDSET");
    expect(group.className.endsWith("mt-2")).toBe(true);
    const free = screen.getByRole("radio", { name: "Free" });
    expect(free).toHaveAttribute("name", "plan");
    expect(free).toHaveAccessibleDescription("For personal projects.");
    expect(free.id.startsWith(group.id)).toBe(true);
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();

    await userEvent.click(screen.getByText("Free"));
    expect(free).toBeChecked();
    expect(screen.getByText("free")).toBeInTheDocument();
  });

  it("keeps an explicit id, lays out horizontally, and disables every radio", () => {
    render(RadioGroup, {
      id: "billing",
      name: "billing",
      orientation: "horizontal",
      disabled: true,
      options: [{ value: "monthly", label: "Monthly" }],
    });
    const radio = screen.getByRole("radio", { name: "Monthly" });
    expect(radio.id).toBe("billing-monthly");
    expect(radio).toBeDisabled();
    expect(radio.closest("div.flex-wrap")).not.toBeNull();
    expect(document.querySelector("legend")).toBeNull();
  });
});

describe("Svelte Slider", () => {
  it("updates the fill, the visible number, and the bound value on input", async () => {
    render(SliderHarness);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("max", "200");
    expect(slider.className.endsWith("mt-1")).toBe(true);
    expect(slider.style.getPropertyValue("--value")).toBe("15%");

    await fireEvent.input(slider, { target: { value: "100" } });
    expect(slider.style.getPropertyValue("--value")).toBe("50%");
    expect(screen.getAllByText("100")).toHaveLength(2);
  });

  it("defaults to min, hides the number, and forwards aria-label", () => {
    render(Slider, {
      id: "zoom",
      min: 10,
      showValue: false,
      "aria-label": "Zoom",
    });
    const slider = screen.getByRole("slider", { name: "Zoom" });
    expect(slider).toHaveAttribute("id", "zoom");
    expect(slider).toHaveValue("10");
    expect(slider.style.getPropertyValue("--value")).toBe("0%");
    expect(document.querySelector("label")).toBeNull();
    expect(document.querySelector("[aria-hidden=true]")).toBeNull();
  });
});

describe("Svelte Select", () => {
  it("links the label and hint, keeps the selected option, and binds value", async () => {
    render(SelectHarness);
    const select = screen.getByRole("combobox", { name: "City" });
    expect(select).toHaveAttribute("name", "city");
    expect(select.id).not.toBe("");
    expect(select).toHaveAttribute("aria-describedby", `${select.id}-hint`);
    expect(select.className.endsWith("ml-1")).toBe(true);
    expect(select).toHaveValue("bandung");
    await tick();
    expect(screen.getByText("bandung")).toBeInTheDocument();
    await userEvent.selectOptions(select, "jakarta");
    expect(screen.getByText("jakarta")).toBeInTheDocument();
  });

  it("shows the error instead of the hint and keeps an explicit id", () => {
    render(Select, {
      id: "role",
      label: "Role",
      hint: "Hidden",
      error: "Role is required.",
      disabled: true,
    });
    const select = screen.getByRole("combobox", { name: "Role" });
    expect(select).toHaveAttribute("id", "role");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAttribute("aria-describedby", "role-error");
    expect(select).toBeDisabled();
    expect(screen.queryByText("Hidden")).toBeNull();
  });
});

describe("Svelte InputOTP", () => {
  it("advances on typing, binds the joined code, and calls oncomplete", async () => {
    const oncomplete = vi.fn();
    render(InputOTPHarness, { oncomplete });
    const group = screen.getByRole("group", { name: "Code" });
    expect(group.className.endsWith("ml-1")).toBe(true);
    const boxes = screen.getAllByRole("textbox");
    expect(boxes).toHaveLength(4);
    expect(boxes[0]).toHaveAttribute("aria-label", "Digit 1 of 4");
    expect(boxes[0]).toHaveAttribute("autocomplete", "one-time-code");
    expect(boxes[1]).toHaveAttribute("autocomplete", "off");

    await userEvent.click(boxes[0]!);
    await userEvent.keyboard("1a2");
    expect(boxes[2]).toHaveFocus();
    expect(boxes[1]).toHaveValue("2");
    expect(screen.getByText("12")).toBeInTheDocument();

    await userEvent.keyboard("{Backspace}");
    await tick();
    expect(boxes[1]).toHaveValue("");
    await userEvent.keyboard("{Home}");
    expect(boxes[0]).toHaveFocus();

    await fireEvent.paste(boxes[0]!, {
      clipboardData: { getData: () => "98-76" },
    });
    expect(screen.getByText("9876")).toBeInTheDocument();
    expect(document.querySelector<HTMLInputElement>("[name=code]")!.value).toBe(
      "9876",
    );
    expect(oncomplete).toHaveBeenCalledWith("9876");
  });

  it("translates the digit label and fills from value", () => {
    render(InputOTP, {
      value: "12",
      length: 3,
      digitLabel: "Digit {index} dari {length}",
      disabled: true,
    });
    const boxes = screen.getAllByRole("textbox");
    expect(boxes[0]).toHaveAccessibleName("Digit 1 dari 3");
    expect(boxes.map((box) => (box as HTMLInputElement).value)).toEqual([
      "1",
      "2",
      "",
    ]);
    expect(boxes[0]).toBeDisabled();
    expect(document.querySelector("[type=hidden]")).toBeNull();
  });
});
