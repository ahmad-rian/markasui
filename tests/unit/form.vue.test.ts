import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { defineComponent, ref, type Component } from "vue";
import Checkbox from "../../components/checkbox/Checkbox.vue";
import RadioGroup from "../../components/radio-group/RadioGroup.vue";
import Select from "../../components/select/Select.vue";
import Switch from "../../components/switch/Switch.vue";
import Textarea from "../../components/textarea/Textarea.vue";

const options = [
  { value: "free", label: "Free", description: "For personal projects." },
  { value: "pro", label: "Pro" },
];

/** Host component with v-model and an <output> to read the value. */
const withModel = (component: Component, initial: unknown, markup: string) =>
  defineComponent({
    components: { Subject: component },
    setup: () => ({ value: ref(initial), options }),
    template: `${markup}<output>{{ String(value) }}</output>`,
  });

describe("Vue Textarea", () => {
  it("defaults to 4 rows, links the hint, and puts user class on the textarea", () => {
    render(Textarea, {
      props: { id: "bio", label: "Bio", hint: "Up to 200 characters." },
      attrs: { class: "font-mono", name: "bio" },
    });
    const textarea = screen.getByLabelText("Bio");
    expect(textarea).toHaveAttribute("rows", "4");
    expect(textarea).toHaveAttribute("name", "bio");
    expect(textarea).toHaveAccessibleDescription("Up to 200 characters.");
    expect(textarea.className.endsWith("font-mono")).toBe(true);
  });

  it("supports error, rows, and two-way v-model", async () => {
    const Host = withModel(
      Textarea,
      "initial",
      `<Subject v-model="value" label="Address" hint="Hint" error="Required" :rows="2" />`,
    );
    render(Host);
    const textarea = screen.getByLabelText("Address");
    expect(textarea).toHaveValue("initial");
    expect(textarea).toHaveAttribute("rows", "2");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Required");
    expect(screen.queryByText("Hint")).toBeNull();
    await fireEvent.update(textarea, "new");
    expect(screen.getByRole("status")).toHaveTextContent("new");
  });
});

describe("Vue Select", () => {
  it("renders options from the slot with two-way v-model and a hidden icon", async () => {
    const Host = withModel(
      Select,
      "bandung",
      `<Subject v-model="value" label="City" hint="Choose a city." class="w-40"><option value="jakarta">Jakarta</option><option value="bandung">Bandung</option></Subject>`,
    );
    render(Host);
    const select = screen.getByLabelText("City");
    expect(select).toHaveValue("bandung");
    expect(select).toHaveAccessibleDescription("Choose a city.");
    expect(select.className.endsWith("w-40")).toBe(true);
    expect(select.nextElementSibling).toHaveAttribute("aria-hidden", "true");
    await fireEvent.update(select, "jakarta");
    expect(screen.getByRole("status")).toHaveTextContent("jakarta");
  });

  it("without v-model follows the selected option like native", async () => {
    const { emitted } = render(Select, {
      props: { label: "City" },
      slots: {
        default:
          '<option value="a">A</option><option value="b" selected>B</option>',
      },
    });
    await Promise.resolve();
    expect(screen.getByLabelText("City")).toHaveValue("b");
    expect(emitted()["update:modelValue"]).toEqual([["b"]]);
  });

  it("without v-model or selected uses the first option", async () => {
    render(Select, {
      props: { label: "Country" },
      slots: {
        default:
          '<option value="id">Indonesia</option><option value="my">Malaysia</option>',
      },
    });
    await Promise.resolve();
    expect(screen.getByLabelText("Country")).toHaveValue("id");
  });

  it("error sets aria-invalid", () => {
    render(Select, {
      props: { id: "role", label: "Role", error: "Required" },
      slots: { default: '<option value="">Choose</option>' },
    });
    const select = screen.getByLabelText("Role");
    expect(select).toHaveAttribute("id", "role");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAccessibleDescription("Required");
  });
});

describe("Vue Checkbox", () => {
  it("supports boolean v-model, description, and user class", async () => {
    const Host = withModel(
      Checkbox,
      false,
      `<Subject v-model="value" label="Send updates" description="One email per month." class="mt-1" />`,
    );
    render(Host);
    const checkbox = screen.getByRole("checkbox", { name: "Send updates" });
    expect(checkbox).toHaveAccessibleDescription("One email per month.");
    expect(checkbox.className.endsWith("mt-1")).toBe(true);
    await fireEvent.click(screen.getByText("Send updates"));
    expect(checkbox).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("true");
  });

  it("keeps type checkbox and forwards disabled", () => {
    render(Checkbox, {
      props: { id: "archive", label: "Archive" },
      attrs: { disabled: true, type: "text" },
    });
    const checkbox = screen.getByRole("checkbox", { name: "Archive" });
    expect(checkbox).toHaveAttribute("id", "archive");
    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toHaveAttribute("aria-describedby");
  });
});

describe("Vue Switch", () => {
  it("has role switch and boolean v-model", async () => {
    const Host = withModel(
      Switch,
      true,
      `<Subject v-model="value" label="Notifications" class="ml-2" />`,
    );
    render(Host);
    const toggle = screen.getByRole("switch", { name: "Notifications" });
    expect(toggle).toHaveAttribute("type", "checkbox");
    expect(toggle).toBeChecked();
    expect(toggle.className.endsWith("ml-2")).toBe(true);
    await fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("false");
  });

  it("toggles without v-model and uses the user id", async () => {
    render(Switch, { props: { id: "beta", label: "Beta" } });
    const toggle = screen.getByRole("switch", { name: "Beta" });
    expect(toggle).toHaveAttribute("id", "beta");
    await fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});

describe("Vue RadioGroup", () => {
  it("renders a fieldset with legend, v-model, and option descriptions", async () => {
    const Host = withModel(
      RadioGroup,
      "pro",
      `<Subject v-model="value" name="plan" label="Plan" :options="options" class="mt-4" />`,
    );
    render(Host);
    const group = screen.getByRole("group", { name: "Plan" });
    expect(group.tagName).toBe("FIELDSET");
    expect(group.className.endsWith("mt-4")).toBe(true);
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    const free = screen.getByRole("radio", { name: "Free" });
    expect(free).toHaveAttribute("name", "plan");
    expect(free).toHaveAccessibleDescription("For personal projects.");
    await fireEvent.click(free);
    expect(free).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("free");
  });

  it("supports horizontal orientation and a user id", () => {
    render(RadioGroup, {
      props: { id: "g", name: "billing", options, orientation: "horizontal" },
    });
    const pro = screen.getByRole("radio", { name: "Pro" });
    expect(pro).toHaveAttribute("id", "g-pro");
    expect(pro).not.toHaveAttribute("aria-describedby");
    expect(pro.closest("fieldset")?.firstElementChild).toHaveClass("flex");
  });
});
