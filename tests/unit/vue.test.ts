import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { defineComponent, ref } from "vue";
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
import Modal from "../../components/modal/Modal.vue";
import Tabs from "../../components/tabs/Tabs.vue";

describe("Vue Button", () => {
  it("default type button, varian primary, ukuran md", () => {
    render(Button, { slots: { default: "Save" } });
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("bg-primary", "h-10");
  });

  it("menerapkan varian, ukuran, type, dan class user di akhir", () => {
    render(Button, {
      props: { variant: "ghost", size: "lg" },
      attrs: { class: "w-full", type: "submit" },
      slots: { default: "Send" },
    });
    const button = screen.getByRole("button", { name: "Send" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("hover:bg-subtle", "h-12");
    expect(button.className.endsWith("w-full")).toBe(true);
  });
});

describe("Vue Input", () => {
  it("menghubungkan label, petunjuk, dan class user ke input", () => {
    render(Input, {
      props: { id: "name", label: "Name", hint: "As shown on your ID" },
      attrs: { class: "font-mono" },
    });
    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAccessibleDescription("As shown on your ID");
    expect(input.className.endsWith("font-mono")).toBe(true);
  });

  it("error mengaktifkan aria-invalid dan menggantikan petunjuk", () => {
    render(Input, {
      props: { label: "Email", hint: "Hint", error: "Required" },
    });
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Required");
    expect(screen.queryByText("Hint")).toBeNull();
  });

  it("v-model dua arah", async () => {
    const Host = defineComponent({
      components: { MarkasInput: Input },
      setup: () => ({ value: ref("initial") }),
      template: `<MarkasInput v-model="value" label="City" /><output>{{ value }}</output>`,
    });
    render(Host);
    const input = screen.getByLabelText("City");
    expect(input).toHaveValue("initial");
    await fireEvent.update(input, "Portland");
    expect(screen.getByRole("status")).toHaveTextContent("Portland");
  });
});

describe("Vue Modal", () => {
  const renderModal = () =>
    render(Modal, {
      props: { title: "Delete?" },
      slots: {
        trigger: "<button>Open</button>",
        default: "<p>Modal body</p>",
        footer: '<button type="submit">OK</button>',
      },
    });

  it("tertutup di awal dan diberi label dari judul", () => {
    renderModal();
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(
      document.getElementById(dialog.getAttribute("aria-labelledby")!),
    ).toHaveTextContent("Delete?");
    expect(dialog.querySelectorAll('form[method="dialog"]')).toHaveLength(2);
  });

  it("pemicu membuka, close menutup, klik backdrop menutup", async () => {
    renderModal();
    await fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");

    await fireEvent.click(screen.getByText("Modal body"));
    expect(dialog).toHaveAttribute("open");

    await fireEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "closed");
  });

  it("tombol tutup berlabel Close secara default", () => {
    renderModal();
    expect(
      screen.getByRole("button", { name: "Close", hidden: true }),
    ).toBeInTheDocument();
  });

  it("closeLabel menimpa label tombol tutup", () => {
    render(Modal, {
      props: { title: "Hapus?", closeLabel: "Tutup" },
      slots: { default: "Isi" },
    });
    expect(
      screen.getByRole("button", { name: "Tutup", hidden: true }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Close", hidden: true }),
    ).toBeNull();
  });
});

describe("Vue Tabs", () => {
  const items = [
    { value: "a", label: "One" },
    { value: "b", label: "Two" },
    { value: "c", label: "Three" },
  ];
  const slots = { a: "Panel one", b: "Panel two", c: "Panel three" };

  it("defaultValue menentukan tab aktif dan panel yang tampil", () => {
    render(Tabs, { props: { items, defaultValue: "b" }, slots });
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");
  });

  it("klik memilih tab dan memancarkan update:modelValue", async () => {
    const { emitted } = render(Tabs, { props: { items }, slots });
    await fireEvent.click(screen.getByRole("tab", { name: "Three" }));
    expect(emitted()["update:modelValue"]).toEqual([["c"]]);
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "tabindex",
      "0",
    );
  });

  it("panah, Home, dan End memindahkan fokus dan pilihan", async () => {
    render(Tabs, { props: { items }, slots });
    const list = screen.getByRole("tablist");
    const tab = (name: string) => screen.getByRole("tab", { name });

    await fireEvent.keyDown(list, { key: "ArrowLeft" });
    expect(tab("Three")).toHaveFocus();
    await fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(tab("One")).toHaveFocus();
    await fireEvent.keyDown(list, { key: "End" });
    expect(tab("Three")).toHaveAttribute("aria-selected", "true");
    await fireEvent.keyDown(list, { key: "Home" });
    expect(tab("One")).toHaveAttribute("aria-selected", "true");
    await fireEvent.keyDown(list, { key: "x" });
    expect(tab("One")).toHaveFocus();
  });
});
