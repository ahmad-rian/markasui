import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { defineComponent, ref } from "vue";
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
import Modal from "../../components/modal/Modal.vue";
import Tabs from "../../components/tabs/Tabs.vue";

describe("Vue Button", () => {
  it("default type button, varian primary, ukuran md", () => {
    render(Button, { slots: { default: "Simpan" } });
    const button = screen.getByRole("button", { name: "Simpan" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("bg-primary", "h-10");
  });

  it("menerapkan varian, ukuran, type, dan class user di akhir", () => {
    render(Button, {
      props: { variant: "ghost", size: "lg" },
      attrs: { class: "w-full", type: "submit" },
      slots: { default: "Kirim" },
    });
    const button = screen.getByRole("button", { name: "Kirim" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("hover:bg-subtle", "h-12");
    expect(button.className.endsWith("w-full")).toBe(true);
  });
});

describe("Vue Input", () => {
  it("menghubungkan label, petunjuk, dan class user ke input", () => {
    render(Input, {
      props: { id: "nama", label: "Nama", hint: "Sesuai KTP." },
      attrs: { class: "font-mono" },
    });
    const input = screen.getByLabelText("Nama");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAccessibleDescription("Sesuai KTP.");
    expect(input.className.endsWith("font-mono")).toBe(true);
  });

  it("error mengaktifkan aria-invalid dan menggantikan petunjuk", () => {
    render(Input, {
      props: { label: "Email", hint: "Petunjuk", error: "Wajib diisi" },
    });
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Wajib diisi");
    expect(screen.queryByText("Petunjuk")).toBeNull();
  });

  it("v-model dua arah", async () => {
    const Host = defineComponent({
      components: { MarkasInput: Input },
      setup: () => ({ value: ref("awal") }),
      template: `<MarkasInput v-model="value" label="Kota" /><output>{{ value }}</output>`,
    });
    render(Host);
    const input = screen.getByLabelText("Kota");
    expect(input).toHaveValue("awal");
    await fireEvent.update(input, "Purwokerto");
    expect(screen.getByRole("status")).toHaveTextContent("Purwokerto");
  });
});

describe("Vue Modal", () => {
  const renderModal = () =>
    render(Modal, {
      props: { title: "Hapus?" },
      slots: {
        trigger: "<button>Buka</button>",
        default: "<p>Isi modal</p>",
        footer: '<button type="submit">OK</button>',
      },
    });

  it("tertutup di awal dan diberi label dari judul", () => {
    renderModal();
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(
      document.getElementById(dialog.getAttribute("aria-labelledby")!),
    ).toHaveTextContent("Hapus?");
    expect(dialog.querySelectorAll('form[method="dialog"]')).toHaveLength(2);
  });

  it("pemicu membuka, close menutup, klik backdrop menutup", async () => {
    renderModal();
    await fireEvent.click(screen.getByRole("button", { name: "Buka" }));
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");

    await fireEvent.click(screen.getByText("Isi modal"));
    expect(dialog).toHaveAttribute("open");

    await fireEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "closed");
  });
});

describe("Vue Tabs", () => {
  const items = [
    { value: "a", label: "Satu" },
    { value: "b", label: "Dua" },
    { value: "c", label: "Tiga" },
  ];
  const slots = { a: "Panel satu", b: "Panel dua", c: "Panel tiga" };

  it("defaultValue menentukan tab aktif dan panel yang tampil", () => {
    render(Tabs, { props: { items, defaultValue: "b" }, slots });
    expect(screen.getByRole("tab", { name: "Dua" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel dua");
  });

  it("klik memilih tab dan memancarkan update:modelValue", async () => {
    const { emitted } = render(Tabs, { props: { items }, slots });
    await fireEvent.click(screen.getByRole("tab", { name: "Tiga" }));
    expect(emitted()["update:modelValue"]).toEqual([["c"]]);
    expect(screen.getByRole("tab", { name: "Tiga" })).toHaveAttribute(
      "tabindex",
      "0",
    );
  });

  it("panah, Home, dan End memindahkan fokus dan pilihan", async () => {
    render(Tabs, { props: { items }, slots });
    const list = screen.getByRole("tablist");
    const tab = (name: string) => screen.getByRole("tab", { name });

    await fireEvent.keyDown(list, { key: "ArrowLeft" });
    expect(tab("Tiga")).toHaveFocus();
    await fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(tab("Satu")).toHaveFocus();
    await fireEvent.keyDown(list, { key: "End" });
    expect(tab("Tiga")).toHaveAttribute("aria-selected", "true");
    await fireEvent.keyDown(list, { key: "Home" });
    expect(tab("Satu")).toHaveAttribute("aria-selected", "true");
    await fireEvent.keyDown(list, { key: "x" });
    expect(tab("Satu")).toHaveFocus();
  });
});
