import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "../../components/slider/Slider";
import { Toggle } from "../../components/toggle/Toggle";
import { ToggleGroup } from "../../components/toggle-group/ToggleGroup";

const views = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

describe("React Slider", () => {
  it("renders a native range with defaults, label, and visible value", () => {
    render(<Slider label="Volume" defaultValue={60} className="mt-2" />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("type", "range");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(slider).toHaveAttribute("step", "1");
    expect(slider).toHaveValue("60");
    expect(slider.style.getPropertyValue("--value")).toBe("60%");
    expect(screen.getByText("60")).toHaveAttribute("aria-hidden", "true");
    expect(slider.className.endsWith("mt-2")).toBe(true);
  });

  it("updates the value, the fill, and calls onValueChange", () => {
    const onValueChange = vi.fn();
    render(
      <Slider
        label="Budget"
        min={0}
        max={500}
        step={25}
        onValueChange={onValueChange}
      />,
    );
    const slider = screen.getByRole("slider", { name: "Budget" });
    expect(slider).toHaveValue("0");
    fireEvent.change(slider, { target: { value: "250" } });
    expect(onValueChange).toHaveBeenCalledWith(250);
    expect(slider).toHaveValue("250");
    expect(slider.style.getPropertyValue("--value")).toBe("50%");
    expect(screen.getByText("250")).toBeInTheDocument();
  });

  it("supports controlled value, hidden value, disabled, and aria-label", () => {
    render(
      <Slider
        aria-label="Opacity"
        value={30}
        showValue={false}
        disabled
        onValueChange={() => {}}
      />,
    );
    const slider = screen.getByRole("slider", { name: "Opacity" });
    expect(slider).toHaveValue("30");
    expect(slider).toBeDisabled();
    expect(screen.queryByText("30")).toBeNull();
  });
});

describe("React Toggle", () => {
  it("toggles aria-pressed and data-state and calls onPressedChange", async () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Bookmark</Toggle>);
    const toggle = screen.getByRole("button", { name: "Bookmark" });
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(toggle).toHaveAttribute("data-state", "off");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAttribute("data-state", "on");
    expect(onPressedChange).toHaveBeenLastCalledWith(true);
  });

  it("supports defaultPressed, variant, size, aria-label, and user class last", () => {
    render(
      <Toggle
        defaultPressed
        variant="outline"
        size="lg"
        aria-label="Bold"
        className="w-full"
      >
        <svg aria-hidden="true" />
      </Toggle>,
    );
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle.className).toContain("border-line");
    expect(toggle.className).toContain("h-10");
    expect(toggle.className.endsWith("w-full")).toBe(true);
  });

  it("stays as given when controlled and is disabled natively", async () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle pressed={false} onPressedChange={onPressedChange} disabled>
        Mute
      </Toggle>,
    );
    const toggle = screen.getByRole("button", { name: "Mute" });
    expect(toggle).toBeDisabled();
    await userEvent.click(toggle);
    expect(onPressedChange).not.toHaveBeenCalled();
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });
});

describe("React ToggleGroup", () => {
  it("renders a named group and single selection that can be cleared", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        label="Calendar view"
        items={views}
        defaultValue="week"
        onValueChange={onValueChange}
        className="mt-4"
      />,
    );
    const group = screen.getByRole("group", { name: "Calendar view" });
    expect(group.className.endsWith("mt-4")).toBe(true);
    const week = screen.getByRole("button", { name: "Week" });
    const day = screen.getByRole("button", { name: "Day" });
    expect(week).toHaveAttribute("aria-pressed", "true");
    expect(week).toHaveAttribute("tabindex", "0");
    expect(day).toHaveAttribute("tabindex", "-1");

    await userEvent.click(day);
    expect(onValueChange).toHaveBeenLastCalledWith("day");
    expect(day).toHaveAttribute("data-state", "on");
    expect(week).toHaveAttribute("data-state", "off");

    await userEvent.click(day);
    expect(onValueChange).toHaveBeenLastCalledWith("");
    expect(day).toHaveAttribute("aria-pressed", "false");
  });

  it("multiple keeps item order and uses ariaLabel for icon items", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        type="multiple"
        label="Text style"
        defaultValue={["underline"]}
        onValueChange={onValueChange}
        items={[
          {
            value: "bold",
            label: <svg aria-hidden="true" />,
            ariaLabel: "Bold",
          },
          {
            value: "underline",
            label: <svg aria-hidden="true" />,
            ariaLabel: "Underline",
          },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["bold", "underline"]);
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("arrow keys move focus with roving tabindex without pressing", async () => {
    render(<ToggleGroup label="View" items={views} />);
    const [day, week, month] = screen.getAllByRole("button") as [
      HTMLElement,
      HTMLElement,
      HTMLElement,
    ];
    expect(day).toHaveAttribute("tabindex", "0");
    await userEvent.tab();
    expect(day).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(week).toHaveFocus();
    expect(week).toHaveAttribute("tabindex", "0");
    expect(day).toHaveAttribute("tabindex", "-1");
    expect(week).toHaveAttribute("aria-pressed", "false");
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(month).toHaveFocus();
    await userEvent.keyboard(" ");
    expect(month).toHaveAttribute("aria-pressed", "true");
  });
});
