import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { defineComponent, ref, type Component } from "vue";
import Slider from "../../components/slider/Slider.vue";
import Toggle from "../../components/toggle/Toggle.vue";
import ToggleGroup from "../../components/toggle-group/ToggleGroup.vue";

const views = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

/** Host component with v-model and an <output> to read the value. */
const withModel = (component: Component, initial: unknown, markup: string) =>
  defineComponent({
    components: { Subject: component },
    setup: () => ({ value: ref(initial), views }),
    template: `${markup}<output>{{ JSON.stringify(value) }}</output>`,
  });

describe("Vue Slider", () => {
  it("renders a native range with label, value, fill, and user class last", () => {
    render(Slider, {
      props: { label: "Volume", defaultValue: 60 },
      attrs: { class: "mt-2", name: "volume" },
    });
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("type", "range");
    expect(slider).toHaveAttribute("name", "volume");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(slider).toHaveValue("60");
    expect(slider.style.getPropertyValue("--value")).toBe("60%");
    expect(screen.getByText("60")).toHaveAttribute("aria-hidden", "true");
    expect(slider.className.endsWith("mt-2")).toBe(true);
  });

  it("supports v-model, step, and the fill update", async () => {
    const Host = withModel(
      Slider,
      100,
      `<Subject v-model="value" label="Budget" :max="500" :step="25" />`,
    );
    render(Host);
    const slider = screen.getByRole("slider", { name: "Budget" });
    expect(slider).toHaveAttribute("step", "25");
    expect(slider.style.getPropertyValue("--value")).toBe("20%");
    await fireEvent.update(slider, "250");
    expect(screen.getByRole("status")).toHaveTextContent("250");
    expect(slider.style.getPropertyValue("--value")).toBe("50%");
  });

  it("hides the value and passes disabled and aria-label", () => {
    render(Slider, {
      props: { defaultValue: 30, showValue: false },
      attrs: { "aria-label": "Opacity", disabled: true },
    });
    const slider = screen.getByRole("slider", { name: "Opacity" });
    expect(slider).toBeDisabled();
    expect(screen.queryByText("30")).toBeNull();
  });
});

describe("Vue Toggle", () => {
  it("toggles locally with aria-pressed and data-state", async () => {
    render(Toggle, { slots: { default: "Bookmark" } });
    const toggle = screen.getByRole("button", { name: "Bookmark" });
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-state", "on");
  });

  it("supports v-model, defaultPressed, variant, size, aria-label, and user class last", async () => {
    const Host = withModel(
      Toggle,
      true,
      `<Subject v-model="value" variant="outline" size="sm" aria-label="Bold" class="w-full"><svg aria-hidden="true" /></Subject>`,
    );
    render(Host);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle.className).toContain("border-line");
    expect(toggle.className).toContain("h-8");
    expect(toggle.className.endsWith("w-full")).toBe(true);
    await fireEvent.click(toggle);
    expect(screen.getByRole("status")).toHaveTextContent("false");

    render(Toggle, {
      props: { defaultPressed: true },
      slots: { default: "Pin" },
    });
    expect(screen.getByRole("button", { name: "Pin" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});

describe("Vue ToggleGroup", () => {
  it("renders a named group with single v-model that can be cleared", async () => {
    const Host = withModel(
      ToggleGroup,
      "week",
      `<Subject v-model="value" label="Calendar view" :items="views" class="mt-4" />`,
    );
    render(Host);
    const group = screen.getByRole("group", { name: "Calendar view" });
    expect(group.className.endsWith("mt-4")).toBe(true);
    const day = screen.getByRole("button", { name: "Day" });
    expect(screen.getByRole("button", { name: "Week" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await fireEvent.click(day);
    expect(screen.getByRole("status")).toHaveTextContent('"day"');
    expect(day).toHaveAttribute("data-state", "on");
    await fireEvent.click(day);
    expect(screen.getByRole("status")).toHaveTextContent('""');
  });

  it("multiple keeps item order, ariaLabel names icon items, slots replace labels", async () => {
    const Host = withModel(
      ToggleGroup,
      ["underline"],
      `<Subject v-model="value" type="multiple" label="Text style" :items="[{ value: 'bold', label: 'Bold', ariaLabel: 'Bold' }, { value: 'underline', label: 'Underline', ariaLabel: 'Underline' }]"><template #bold><svg aria-hidden="true" /></template></Subject>`,
    );
    render(Host);
    const bold = screen.getByRole("button", { name: "Bold" });
    expect(bold).not.toHaveTextContent("Bold");
    await fireEvent.click(bold);
    expect(screen.getByRole("status")).toHaveTextContent(
      '["bold","underline"]',
    );
  });

  it("arrow keys move focus with roving tabindex without pressing", async () => {
    render(ToggleGroup, {
      props: { label: "View", items: views, defaultValue: "month" },
    });
    const [day, week, month] = screen.getAllByRole("button") as [
      HTMLElement,
      HTMLElement,
      HTMLElement,
    ];
    expect(month).toHaveAttribute("tabindex", "0");
    expect(day).toHaveAttribute("tabindex", "-1");
    month.focus();
    await fireEvent.keyDown(month, { key: "ArrowRight" });
    expect(day).toHaveFocus();
    expect(day).toHaveAttribute("tabindex", "0");
    await fireEvent.keyDown(day, { key: "ArrowRight" });
    expect(week).toHaveFocus();
    expect(week).toHaveAttribute("aria-pressed", "false");
  });
});
