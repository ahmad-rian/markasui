import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { RadioGroup } from "../../components/radio-group/RadioGroup";
import { Select } from "../../components/select/Select";
import { Switch } from "../../components/switch/Switch";
import { Textarea } from "../../components/textarea/Textarea";

const options = [
  { value: "gratis", label: "Gratis", description: "Untuk proyek pribadi." },
  { value: "pro", label: "Pro" },
];

describe("React Textarea", () => {
  it("default 4 baris dan menghubungkan label serta petunjuk", () => {
    render(<Textarea id="bio" label="Bio" hint="Maksimal 200 karakter." />);
    const textarea = screen.getByLabelText("Bio");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "4");
    expect(textarea).toHaveAccessibleDescription("Maksimal 200 karakter.");
    expect(textarea).not.toHaveAttribute("aria-invalid");
  });

  it("error menggantikan petunjuk, rows bisa diubah, class user di akhir", () => {
    render(
      <Textarea
        label="Alamat"
        hint="Petunjuk"
        error="Wajib diisi"
        rows={2}
        className="font-mono"
      />,
    );
    const textarea = screen.getByLabelText("Alamat");
    expect(textarea).toHaveAttribute("rows", "2");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Wajib diisi");
    expect(screen.queryByText("Petunjuk")).toBeNull();
    expect(textarea.className.endsWith("font-mono")).toBe(true);
    expect(textarea.id).not.toBe("");
  });
});

describe("React Select", () => {
  it("merender option dari children dan nilai awal", () => {
    render(
      <Select label="Kota" hint="Pilih kota." defaultValue="bandung">
        <option value="jakarta">Jakarta</option>
        <option value="bandung">Bandung</option>
      </Select>,
    );
    const select = screen.getByLabelText("Kota");
    expect(select).toHaveValue("bandung");
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(select).toHaveAccessibleDescription("Pilih kota.");
    expect(select.nextElementSibling).toHaveAttribute("aria-hidden", "true");
  });

  it("error mengaktifkan aria-invalid dan class user di akhir", async () => {
    const onChange = vi.fn();
    render(
      <Select
        id="peran"
        label="Peran"
        error="Wajib dipilih"
        className="w-40"
        onChange={onChange}
      >
        <option value="">Pilih</option>
        <option value="admin">Admin</option>
      </Select>,
    );
    const select = screen.getByLabelText("Peran");
    expect(select).toHaveAttribute("id", "peran");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAccessibleDescription("Wajib dipilih");
    expect(select.className.endsWith("w-40")).toBe(true);
    await userEvent.selectOptions(select, "admin");
    expect(onChange).toHaveBeenCalled();
    expect(select).toHaveValue("admin");
  });
});

describe("React Checkbox", () => {
  it("label dan deskripsi terhubung, klik label mencentang", async () => {
    render(
      <Checkbox
        label="Kirimi kabar"
        description="Satu email per bulan."
        className="mt-1"
      />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Kirimi kabar" });
    expect(checkbox).toHaveAccessibleDescription("Satu email per bulan.");
    expect(checkbox).not.toBeChecked();
    await userEvent.click(screen.getByText("Kirimi kabar"));
    expect(checkbox).toBeChecked();
    expect(checkbox.className.endsWith("mt-1")).toBe(true);
  });

  it("type selalu checkbox dan disabled tidak bisa dicentang", async () => {
    render(<Checkbox id="arsip" label="Arsip" disabled defaultChecked />);
    const checkbox = screen.getByRole("checkbox", { name: "Arsip" });
    expect(checkbox).toHaveAttribute("id", "arsip");
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).not.toHaveAttribute("aria-describedby");
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

describe("React Switch", () => {
  it("role switch, onCheckedChange dan onChange dipanggil", async () => {
    const onCheckedChange = vi.fn();
    const onChange = vi.fn();
    render(
      <Switch
        label="Notifikasi"
        onCheckedChange={onCheckedChange}
        onChange={onChange}
        className="ml-2"
      />,
    );
    const toggle = screen.getByRole("switch", { name: "Notifikasi" });
    expect(toggle).toHaveAttribute("type", "checkbox");
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(toggle.className.endsWith("ml-2")).toBe(true);
  });

  it("checked terkontrol dan id dari user", () => {
    render(<Switch id="beta" label="Beta" checked onCheckedChange={vi.fn()} />);
    const toggle = screen.getByRole("switch", { name: "Beta" });
    expect(toggle).toHaveAttribute("id", "beta");
    expect(toggle).toBeChecked();
  });
});

describe("React RadioGroup", () => {
  it("fieldset dengan legend, defaultValue, dan deskripsi opsi", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup
        name="paket"
        label="Paket"
        options={options}
        defaultValue="pro"
        onValueChange={onValueChange}
        className="mt-4"
      />,
    );
    const group = screen.getByRole("group", { name: "Paket" });
    expect(group.tagName).toBe("FIELDSET");
    expect(group.className.endsWith("mt-4")).toBe(true);
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    const gratis = screen.getByRole("radio", { name: "Gratis" });
    expect(gratis).toHaveAttribute("name", "paket");
    expect(gratis).toHaveAccessibleDescription("Untuk proyek pribadi.");
    await userEvent.click(gratis);
    expect(gratis).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("gratis");
  });

  it("value terkontrol dan orientasi horizontal", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup
        id="g"
        name="tagihan"
        options={options}
        value="gratis"
        orientation="horizontal"
        onValueChange={onValueChange}
      />,
    );
    const pro = screen.getByRole("radio", { name: "Pro" });
    expect(pro).toHaveAttribute("id", "g-pro");
    expect(pro).not.toHaveAttribute("aria-describedby");
    expect(screen.getByRole("radio", { name: "Gratis" })).toBeChecked();
    expect(pro.closest("fieldset")?.firstElementChild).toHaveClass("flex");
    await userEvent.click(pro);
    expect(onValueChange).toHaveBeenCalledWith("pro");
    expect(screen.getByRole("radio", { name: "Gratis" })).toBeChecked();
  });
});
