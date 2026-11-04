import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Modal } from "../../components/modal/Modal";
import { Tabs } from "../../components/tabs/Tabs";

describe("React Button", () => {
  it("default type button, varian primary, ukuran md", () => {
    render(<Button>Simpan</Button>);
    const button = screen.getByRole("button", { name: "Simpan" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("bg-primary", "h-10");
  });

  it("menerapkan varian, ukuran, dan class user di akhir", () => {
    render(
      <Button variant="danger" size="sm" className="w-full" type="submit">
        Hapus
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Hapus" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("bg-danger", "h-8");
    expect(button.className.endsWith("w-full")).toBe(true);
  });

  it("meneruskan props native seperti disabled dan onClick", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Nonaktif
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Nonaktif" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("React Input", () => {
  it("menghubungkan label dan petunjuk", () => {
    render(<Input id="nama" label="Nama" hint="Sesuai KTP." />);
    const input = screen.getByLabelText("Nama");
    expect(input).toHaveAttribute("id", "nama");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAccessibleDescription("Sesuai KTP.");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("error menggantikan petunjuk dan mengaktifkan aria-invalid", () => {
    render(
      <Input
        label="Email"
        hint="Petunjuk"
        error="Wajib diisi"
        className="font-mono"
      />,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Wajib diisi");
    expect(screen.queryByText("Petunjuk")).toBeNull();
    expect(input.className.endsWith("font-mono")).toBe(true);
  });

  it("membuat id otomatis kalau tidak diisi", () => {
    render(<Input label="Kota" />);
    expect(screen.getByLabelText("Kota").id).not.toBe("");
  });
});

describe("React Modal", () => {
  const renderModal = (onClose = vi.fn()) =>
    render(
      <Modal
        title="Hapus?"
        trigger={<Button>Buka</Button>}
        footer={
          <Button type="submit" value="ok">
            OK
          </Button>
        }
        onClose={onClose}
      >
        Isi modal
      </Modal>,
    );

  it("tertutup di awal dan diberi label dari judul", () => {
    renderModal();
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(dialog).not.toHaveAttribute("open");
    expect(
      document.getElementById(dialog.getAttribute("aria-labelledby")!),
    ).toHaveTextContent("Hapus?");
  });

  it("pemicu membuka modal, event close menutup dan memanggil onClose", async () => {
    const onClose = vi.fn();
    renderModal(onClose);
    await userEvent.click(screen.getByRole("button", { name: "Buka" }));
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAttribute("data-state", "open");

    dialog.close();
    fireEvent(dialog, new Event("close"));
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(onClose).toHaveBeenCalled();
  });

  it("klik backdrop (dialog itu sendiri) menutup, klik isi tidak", async () => {
    renderModal();
    await userEvent.click(screen.getByRole("button", { name: "Buka" }));
    const dialog = document.querySelector("dialog")!;

    fireEvent.click(screen.getByText("Isi modal"));
    expect(dialog).toHaveAttribute("open");

    fireEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
  });
});

describe("React Tabs", () => {
  const items = [
    { value: "a", label: "Satu", content: "Panel satu" },
    { value: "b", label: "Dua", content: "Panel dua" },
    { value: "c", label: "Tiga", content: "Panel tiga" },
  ];

  it("defaultValue menentukan tab aktif", () => {
    render(<Tabs items={items} defaultValue="b" />);
    expect(screen.getByRole("tab", { name: "Dua" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel dua");
  });

  it("klik memilih tab dan memanggil onValueChange", async () => {
    const onValueChange = vi.fn();
    render(<Tabs items={items} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Tiga" }));
    expect(onValueChange).toHaveBeenCalledWith("c");
    expect(screen.getByRole("tab", { name: "Tiga" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "Satu" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("panah, Home, dan End memindahkan fokus dan pilihan", () => {
    render(<Tabs items={items} />);
    const list = screen.getByRole("tablist");
    const tab = (name: string) => screen.getByRole("tab", { name });

    fireEvent.keyDown(list, { key: "ArrowLeft" });
    expect(tab("Tiga")).toHaveFocus();
    fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(tab("Satu")).toHaveFocus();
    fireEvent.keyDown(list, { key: "End" });
    expect(tab("Tiga")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(list, { key: "Home" });
    expect(tab("Satu")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(list, { key: "a" });
    expect(tab("Satu")).toHaveFocus();
  });
});
