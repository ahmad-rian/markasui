import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Modal } from "../../components/modal/Modal";
import { Tabs } from "../../components/tabs/Tabs";

describe("React Button", () => {
  it("default type button, varian primary, ukuran md", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("bg-primary", "h-10");
  });

  it("menerapkan varian, ukuran, dan class user di akhir", () => {
    render(
      <Button variant="danger" size="sm" className="w-full" type="submit">
        Delete
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("bg-danger", "h-8");
    expect(button.className.endsWith("w-full")).toBe(true);
  });

  it("meneruskan props native seperti disabled dan onClick", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Disabled" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("React Input", () => {
  it("menghubungkan label dan petunjuk", () => {
    render(<Input id="name" label="Name" hint="As shown on your ID" />);
    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("id", "name");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAccessibleDescription("As shown on your ID");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("error menggantikan petunjuk dan mengaktifkan aria-invalid", () => {
    render(
      <Input
        label="Email"
        hint="Hint"
        error="Required"
        className="font-mono"
      />,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Required");
    expect(screen.queryByText("Hint")).toBeNull();
    expect(input.className.endsWith("font-mono")).toBe(true);
  });

  it("membuat id otomatis kalau tidak diisi", () => {
    render(<Input label="City" />);
    expect(screen.getByLabelText("City").id).not.toBe("");
  });
});

describe("React Modal", () => {
  const renderModal = (onClose = vi.fn()) =>
    render(
      <Modal
        title="Delete?"
        trigger={<Button>Open</Button>}
        footer={
          <Button type="submit" value="ok">
            OK
          </Button>
        }
        onClose={onClose}
      >
        Modal body
      </Modal>,
    );

  it("tertutup di awal dan diberi label dari judul", () => {
    renderModal();
    const dialog = document.querySelector("dialog")!;
    expect(dialog).toHaveAttribute("data-state", "closed");
    expect(dialog).not.toHaveAttribute("open");
    expect(
      document.getElementById(dialog.getAttribute("aria-labelledby")!),
    ).toHaveTextContent("Delete?");
  });

  it("pemicu membuka modal, event close menutup dan memanggil onClose", async () => {
    const onClose = vi.fn();
    renderModal(onClose);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
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
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = document.querySelector("dialog")!;

    fireEvent.click(screen.getByText("Modal body"));
    expect(dialog).toHaveAttribute("open");

    fireEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
  });

  it("tombol tutup berlabel Close secara default", () => {
    renderModal();
    expect(
      screen.getByRole("button", { name: "Close", hidden: true }),
    ).toBeInTheDocument();
  });

  it("closeLabel menimpa label tombol tutup", () => {
    render(
      <Modal title="Hapus?" closeLabel="Tutup">
        Isi
      </Modal>,
    );
    expect(
      screen.getByRole("button", { name: "Tutup", hidden: true }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Close", hidden: true }),
    ).toBeNull();
  });
});

describe("React Tabs", () => {
  const items = [
    { value: "a", label: "One", content: "Panel one" },
    { value: "b", label: "Two", content: "Panel two" },
    { value: "c", label: "Three", content: "Panel three" },
  ];

  it("defaultValue menentukan tab aktif", () => {
    render(<Tabs items={items} defaultValue="b" />);
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");
  });

  it("klik memilih tab dan memanggil onValueChange", async () => {
    const onValueChange = vi.fn();
    render(<Tabs items={items} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Three" }));
    expect(onValueChange).toHaveBeenCalledWith("c");
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("panah, Home, dan End memindahkan fokus dan pilihan", () => {
    render(<Tabs items={items} />);
    const list = screen.getByRole("tablist");
    const tab = (name: string) => screen.getByRole("tab", { name });

    fireEvent.keyDown(list, { key: "ArrowLeft" });
    expect(tab("Three")).toHaveFocus();
    fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(tab("One")).toHaveFocus();
    fireEvent.keyDown(list, { key: "End" });
    expect(tab("Three")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(list, { key: "Home" });
    expect(tab("One")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(list, { key: "a" });
    expect(tab("One")).toHaveFocus();
  });
});
