import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { RadioGroup } from "../../components/radio-group/RadioGroup";
import { Select } from "../../components/select/Select";
import { Switch } from "../../components/switch/Switch";
import { Textarea } from "../../components/textarea/Textarea";

const options = [
  { value: "free", label: "Free", description: "For personal projects." },
  { value: "pro", label: "Pro" },
];

describe("React Textarea", () => {
  it("defaults to 4 rows and links the label and hint", () => {
    render(<Textarea id="bio" label="Bio" hint="Up to 200 characters." />);
    const textarea = screen.getByLabelText("Bio");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "4");
    expect(textarea).toHaveAccessibleDescription("Up to 200 characters.");
    expect(textarea).not.toHaveAttribute("aria-invalid");
  });

  it("error replaces the hint, rows is configurable, user class comes last", () => {
    render(
      <Textarea
        label="Address"
        hint="Hint"
        error="Required"
        rows={2}
        className="font-mono"
      />,
    );
    const textarea = screen.getByLabelText("Address");
    expect(textarea).toHaveAttribute("rows", "2");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Required");
    expect(screen.queryByText("Hint")).toBeNull();
    expect(textarea.className.endsWith("font-mono")).toBe(true);
    expect(textarea.id).not.toBe("");
  });
});

describe("React Select", () => {
  it("renders options from children with an initial value", () => {
    render(
      <Select label="City" hint="Choose a city." defaultValue="bandung">
        <option value="jakarta">Jakarta</option>
        <option value="bandung">Bandung</option>
      </Select>,
    );
    const select = screen.getByLabelText("City");
    expect(select).toHaveValue("bandung");
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(select).toHaveAccessibleDescription("Choose a city.");
    expect(select.nextElementSibling).toHaveAttribute("aria-hidden", "true");
  });

  it("error sets aria-invalid and user class comes last", async () => {
    const onChange = vi.fn();
    render(
      <Select
        id="role"
        label="Role"
        error="Required"
        className="w-40"
        onChange={onChange}
      >
        <option value="">Choose</option>
        <option value="admin">Admin</option>
      </Select>,
    );
    const select = screen.getByLabelText("Role");
    expect(select).toHaveAttribute("id", "role");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAccessibleDescription("Required");
    expect(select.className.endsWith("w-40")).toBe(true);
    await userEvent.selectOptions(select, "admin");
    expect(onChange).toHaveBeenCalled();
    expect(select).toHaveValue("admin");
  });
});

describe("React Checkbox", () => {
  it("links label and description, clicking the label checks it", async () => {
    render(
      <Checkbox
        label="Send updates"
        description="One email per month."
        className="mt-1"
      />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Send updates" });
    expect(checkbox).toHaveAccessibleDescription("One email per month.");
    expect(checkbox).not.toBeChecked();
    await userEvent.click(screen.getByText("Send updates"));
    expect(checkbox).toBeChecked();
    expect(checkbox.className.endsWith("mt-1")).toBe(true);
  });

  it("type is always checkbox and disabled cannot be toggled", async () => {
    render(<Checkbox id="archive" label="Archive" disabled defaultChecked />);
    const checkbox = screen.getByRole("checkbox", { name: "Archive" });
    expect(checkbox).toHaveAttribute("id", "archive");
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).not.toHaveAttribute("aria-describedby");
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

describe("React Switch", () => {
  it("has role switch and calls onCheckedChange and onChange", async () => {
    const onCheckedChange = vi.fn();
    const onChange = vi.fn();
    render(
      <Switch
        label="Notifications"
        onCheckedChange={onCheckedChange}
        onChange={onChange}
        className="ml-2"
      />,
    );
    const toggle = screen.getByRole("switch", { name: "Notifications" });
    expect(toggle).toHaveAttribute("type", "checkbox");
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(toggle.className.endsWith("ml-2")).toBe(true);
  });

  it("supports controlled checked and a user id", () => {
    render(<Switch id="beta" label="Beta" checked onCheckedChange={vi.fn()} />);
    const toggle = screen.getByRole("switch", { name: "Beta" });
    expect(toggle).toHaveAttribute("id", "beta");
    expect(toggle).toBeChecked();
  });
});

describe("React RadioGroup", () => {
  it("renders a fieldset with legend, defaultValue, and option descriptions", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup
        name="plan"
        label="Plan"
        options={options}
        defaultValue="pro"
        onValueChange={onValueChange}
        className="mt-4"
      />,
    );
    const group = screen.getByRole("group", { name: "Plan" });
    expect(group.tagName).toBe("FIELDSET");
    expect(group.className.endsWith("mt-4")).toBe(true);
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    const free = screen.getByRole("radio", { name: "Free" });
    expect(free).toHaveAttribute("name", "plan");
    expect(free).toHaveAccessibleDescription("For personal projects.");
    await userEvent.click(free);
    expect(free).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("free");
  });

  it("supports a controlled value and horizontal orientation", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup
        id="g"
        name="billing"
        options={options}
        value="free"
        orientation="horizontal"
        onValueChange={onValueChange}
      />,
    );
    const pro = screen.getByRole("radio", { name: "Pro" });
    expect(pro).toHaveAttribute("id", "g-pro");
    expect(pro).not.toHaveAttribute("aria-describedby");
    expect(screen.getByRole("radio", { name: "Free" })).toBeChecked();
    expect(pro.closest("fieldset")?.firstElementChild).toHaveClass("flex");
    await userEvent.click(pro);
    expect(onValueChange).toHaveBeenCalledWith("pro");
    expect(screen.getByRole("radio", { name: "Free" })).toBeChecked();
  });
});
