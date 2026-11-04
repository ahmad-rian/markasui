import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { defineComponent, ref, type Component } from "vue";
import Checkbox from "../../components/checkbox/Checkbox.vue";
import RadioGroup from "../../components/radio-group/RadioGroup.vue";
import Select from "../../components/select/Select.vue";
import Switch from "../../components/switch/Switch.vue";
import Textarea from "../../components/textarea/Textarea.vue";

const options = [
  { value: "gratis", label: "Gratis", description: "Untuk proyek pribadi." },
  { value: "pro", label: "Pro" },
];

/** Komponen pembungkus dengan v-model dan <output> untuk membaca nilainya. */
const withModel = (component: Component, initial: unknown, markup: string) =>
  defineComponent({
    components: { Subject: component },
    setup: () => ({ value: ref(initial), options }),
    template: `${markup}<output>{{ String(value) }}</output>`,
  });

describe("Vue Textarea", () => {
  it("default 4 baris, petunjuk, dan class user ke textarea", () => {
    render(Textarea, {
      props: { id: "bio", label: "Bio", hint: "Maksimal 200 karakter." },
      attrs: { class: "font-mono", name: "bio" },
    });
    const textarea = screen.getByLabelText("Bio");
    expect(textarea).toHaveAttribute("rows", "4");
    expect(textarea).toHaveAttribute("name", "bio");
    expect(textarea).toHaveAccessibleDescription("Maksimal 200 karakter.");
    expect(textarea.className.endsWith("font-mono")).toBe(true);
  });

  it("error, rows, dan v-model dua arah", async () => {
    const Host = withModel(
      Textarea,
      "awal",
      `<Subject v-model="value" label="Alamat" hint="Petunjuk" error="Wajib diisi" :rows="2" />`,
    );
    render(Host);
    const textarea = screen.getByLabelText("Alamat");
    expect(textarea).toHaveValue("awal");
    expect(textarea).toHaveAttribute("rows", "2");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Wajib diisi");
    expect(screen.queryByText("Petunjuk")).toBeNull();
    await fireEvent.update(textarea, "baru");
    expect(screen.getByRole("status")).toHaveTextContent("baru");
  });
});

describe("Vue Select", () => {
  it("option dari slot, v-model dua arah, ikon tersembunyi", async () => {
    const Host = withModel(
      Select,
      "bandung",
      `<Subject v-model="value" label="Kota" hint="Pilih kota." class="w-40"><option value="jakarta">Jakarta</option><option value="bandung">Bandung</option></Subject>`,
    );
    render(Host);
    const select = screen.getByLabelText("Kota");
    expect(select).toHaveValue("bandung");
    expect(select).toHaveAccessibleDescription("Pilih kota.");
    expect(select.className.endsWith("w-40")).toBe(true);
    expect(select.nextElementSibling).toHaveAttribute("aria-hidden", "true");
    await fireEvent.update(select, "jakarta");
    expect(screen.getByRole("status")).toHaveTextContent("jakarta");
  });

  it("tanpa v-model mengikuti opsi selected atau opsi pertama seperti native", async () => {
    const { emitted } = render(Select, {
      props: { label: "Kota" },
      slots: {
        default:
          '<option value="a">A</option><option value="b" selected>B</option>',
      },
    });
    await Promise.resolve();
    expect(screen.getByLabelText("Kota")).toHaveValue("b");
    expect(emitted()["update:modelValue"]).toEqual([["b"]]);
  });

  it("tanpa v-model dan tanpa selected memakai opsi pertama", async () => {
    render(Select, {
      props: { label: "Negara" },
      slots: {
        default:
          '<option value="id">Indonesia</option><option value="my">Malaysia</option>',
      },
    });
    await Promise.resolve();
    expect(screen.getByLabelText("Negara")).toHaveValue("id");
  });

  it("error mengaktifkan aria-invalid", () => {
    render(Select, {
      props: { id: "peran", label: "Peran", error: "Wajib dipilih" },
      slots: { default: '<option value="">Pilih</option>' },
    });
    const select = screen.getByLabelText("Peran");
    expect(select).toHaveAttribute("id", "peran");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAccessibleDescription("Wajib dipilih");
  });
});

describe("Vue Checkbox", () => {
  it("v-model boolean, deskripsi, dan class user", async () => {
    const Host = withModel(
      Checkbox,
      false,
      `<Subject v-model="value" label="Kirimi kabar" description="Satu email per bulan." class="mt-1" />`,
    );
    render(Host);
    const checkbox = screen.getByRole("checkbox", { name: "Kirimi kabar" });
    expect(checkbox).toHaveAccessibleDescription("Satu email per bulan.");
    expect(checkbox.className.endsWith("mt-1")).toBe(true);
    await fireEvent.click(screen.getByText("Kirimi kabar"));
    expect(checkbox).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("true");
  });

  it("type tetap checkbox dan atribut disabled diteruskan", () => {
    render(Checkbox, {
      props: { id: "arsip", label: "Arsip" },
      attrs: { disabled: true, type: "text" },
    });
    const checkbox = screen.getByRole("checkbox", { name: "Arsip" });
    expect(checkbox).toHaveAttribute("id", "arsip");
    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toHaveAttribute("aria-describedby");
  });
});

describe("Vue Switch", () => {
  it("role switch dan v-model boolean", async () => {
    const Host = withModel(
      Switch,
      true,
      `<Subject v-model="value" label="Notifikasi" class="ml-2" />`,
    );
    render(Host);
    const toggle = screen.getByRole("switch", { name: "Notifikasi" });
    expect(toggle).toHaveAttribute("type", "checkbox");
    expect(toggle).toBeChecked();
    expect(toggle.className.endsWith("ml-2")).toBe(true);
    await fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("false");
  });

  it("tanpa v-model tetap bisa diubah dan id dari user dipakai", async () => {
    render(Switch, { props: { id: "beta", label: "Beta" } });
    const toggle = screen.getByRole("switch", { name: "Beta" });
    expect(toggle).toHaveAttribute("id", "beta");
    await fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});

describe("Vue RadioGroup", () => {
  it("fieldset dengan legend, v-model, dan deskripsi opsi", async () => {
    const Host = withModel(
      RadioGroup,
      "pro",
      `<Subject v-model="value" name="paket" label="Paket" :options="options" class="mt-4" />`,
    );
    render(Host);
    const group = screen.getByRole("group", { name: "Paket" });
    expect(group.tagName).toBe("FIELDSET");
    expect(group.className.endsWith("mt-4")).toBe(true);
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    const gratis = screen.getByRole("radio", { name: "Gratis" });
    expect(gratis).toHaveAttribute("name", "paket");
    expect(gratis).toHaveAccessibleDescription("Untuk proyek pribadi.");
    await fireEvent.click(gratis);
    expect(gratis).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("gratis");
  });

  it("orientasi horizontal dan id dari user", () => {
    render(RadioGroup, {
      props: { id: "g", name: "tagihan", options, orientation: "horizontal" },
    });
    const pro = screen.getByRole("radio", { name: "Pro" });
    expect(pro).toHaveAttribute("id", "g-pro");
    expect(pro).not.toHaveAttribute("aria-describedby");
    expect(pro.closest("fieldset")?.firstElementChild).toHaveClass("flex");
  });
});
