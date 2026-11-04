import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Avatar, getInitials } from "../../components/avatar/Avatar";
import { Card } from "../../components/card/Card";
import { Table } from "../../components/table/Table";

const INITIAL_CASES = [
  ["Budi Santoso", "BS"],
  ["ani", "A"],
  ["  siti   nur   aisyah  ", "SA"],
  ["", ""],
] as const;

describe("React Card", () => {
  it("merender judul, deskripsi, isi, dan footer", () => {
    render(
      <Card
        title="Paket Pro"
        description="Untuk tim kecil."
        footer={<button type="button">Pilih</button>}
      >
        Isi kartu
      </Card>,
    );
    const card = screen.getByRole("article");
    expect(
      within(card).getByRole("heading", { level: 3, name: "Paket Pro" }),
    ).toBeInTheDocument();
    expect(within(card).getByText("Untuk tim kecil.")).toHaveClass(
      "text-muted",
    );
    expect(within(card).getByText("Isi kartu")).toBeInTheDocument();
    expect(within(card).getByRole("button", { name: "Pilih" })).toBeVisible();
  });

  it("tidak merender bagian kosong dan menggabung class user di akhir", () => {
    render(
      <Card className="max-w-sm" data-testid="kartu">
        Hanya isi
      </Card>,
    );
    const card = screen.getByTestId("kartu");
    expect(card.querySelector("header")).toBeNull();
    expect(card.children).toHaveLength(1);
    expect(card).toHaveClass("rounded-xl", "border-line", "p-6", "gap-4");
    expect(card.className).not.toContain("shadow");
    expect(card.className.endsWith("max-w-sm")).toBe(true);
  });
});

describe("React Avatar", () => {
  it.each(INITIAL_CASES)("getInitials(%j) menjadi %j", (name, expected) => {
    expect(getInitials(name)).toBe(expected);
  });

  it("menampilkan inisial dengan role img saat src kosong", () => {
    render(<Avatar name="Budi Santoso" size="sm" className="ring-2" />);
    const avatar = screen.getByRole("img", { name: "Budi Santoso" });
    expect(avatar.tagName).toBe("SPAN");
    expect(avatar).toHaveTextContent("BS");
    expect(avatar).toHaveClass("bg-primary-soft", "text-primary", "size-8");
    expect(avatar.className.endsWith("ring-2")).toBe(true);
  });

  it("merender gambar dengan alt bawaan name dan ukuran", () => {
    render(<Avatar name="Siti Aminah" src="/siti.png" size="lg" />);
    const image = screen.getByRole("img", { name: "Siti Aminah" });
    expect(image.tagName).toBe("IMG");
    expect(image).toHaveAttribute("src", "/siti.png");
    expect(image).toHaveClass("rounded-full", "object-cover", "size-12");
  });

  it("beralih ke inisial saat gambar gagal dimuat dan meneruskan onError", () => {
    const onError = vi.fn();
    render(
      <Avatar
        name="Dewi Lestari"
        src="/rusak.png"
        alt="Foto Dewi"
        onError={onError}
      />,
    );
    fireEvent.error(screen.getByRole("img", { name: "Foto Dewi" }));
    const fallback = screen.getByRole("img", { name: "Foto Dewi" });
    expect(fallback.tagName).toBe("SPAN");
    expect(fallback).toHaveTextContent("DL");
    expect(onError).toHaveBeenCalledOnce();
  });

  it("alt kosong menyembunyikan fallback dari screen reader", () => {
    const { container } = render(<Avatar name="Rina" alt="" />);
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});

describe("React Table", () => {
  const columns = [
    { key: "kode", label: "Pesanan" },
    { key: "total", label: "Total", align: "right" as const },
  ];
  const rows = [
    { kode: "INV-1", total: "Rp10.000" },
    { kode: "INV-2", total: null },
  ];

  it("merender region yang bisa difokus, header, dan baris", () => {
    render(
      <Table
        caption="Pesanan"
        columns={columns}
        rows={rows}
        className="max-h-80"
      />,
    );
    const region = screen.getByRole("region", { name: "Pesanan" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveClass("overflow-x-auto", "rounded-xl");
    expect(region.className.endsWith("max-h-80")).toBe(true);

    const table = within(region).getByRole("table", { name: "Pesanan" });
    const headers = within(table).getAllByRole("columnheader");
    expect(headers.map((th) => th.textContent)).toEqual(["Pesanan", "Total"]);
    expect(headers[0]).toHaveAttribute("scope", "col");
    expect(headers[1]).toHaveClass("text-right");
    expect(within(table).getAllByRole("row")).toHaveLength(3);
    expect(within(table).getByText("Rp10.000")).toHaveClass("text-right");
    expect(table.querySelector("caption")).toHaveClass("sr-only");
  });

  it("caption bisa ditampilkan dan label mengganti nama region", () => {
    render(
      <Table
        caption="Pesanan"
        showCaption
        label="Tabel pesanan"
        columns={columns}
        rows={[]}
      />,
    );
    expect(
      screen.getByRole("region", { name: "Tabel pesanan" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pesanan", { selector: "caption" }),
    ).not.toHaveClass("sr-only");
  });

  it("tanpa caption dan label, region bernama Tabel", () => {
    render(<Table columns={columns} rows={rows} />);
    expect(screen.getByRole("region", { name: "Tabel" })).toBeInTheDocument();
  });

  const keyedRows = [
    { id: 1, kode: "INV-1" },
    { id: 2, kode: "INV-2" },
  ];
  const keyedColumns = [{ key: "kode", label: "Pesanan" }];
  const rowOf = (text: string) => screen.getByText(text).closest("tr");

  it("rowKey menjaga elemen baris saat data diurutkan ulang", () => {
    const { rerender } = render(
      <Table columns={keyedColumns} rows={keyedRows} rowKey="id" />,
    );
    const second = rowOf("INV-2");
    rerender(
      <Table
        columns={keyedColumns}
        rows={[...keyedRows].reverse()}
        rowKey="id"
      />,
    );
    expect(rowOf("INV-2")).toBe(second);
  });

  it("tanpa rowKey baris memakai indeks sebagai key", () => {
    const { rerender } = render(
      <Table columns={keyedColumns} rows={keyedRows} />,
    );
    const second = rowOf("INV-2");
    rerender(<Table columns={keyedColumns} rows={[...keyedRows].reverse()} />);
    expect(rowOf("INV-2")).not.toBe(second);
  });

  it("renderCell mengganti sel tertentu dan undefined memakai nilai bawaan", () => {
    render(
      <Table
        columns={columns}
        rows={rows}
        renderCell={(row, key) =>
          key === "kode" ? <strong>{row.kode}</strong> : undefined
        }
      />,
    );
    expect(screen.getByText("INV-1").tagName).toBe("STRONG");
    expect(screen.getByText("Rp10.000").tagName).toBe("TD");
  });
});

describe("Blade Avatar inisial", () => {
  const root = resolve(import.meta.dirname, "../..");
  const RENDER_TIMEOUT_MS = 20_000;

  it(
    "identik dengan getInitials di React dan Vue",
    () => {
      const dir = mkdtempSync(join(tmpdir(), "markas-avatar-"));
      const source = INITIAL_CASES.map(
        ([name]) => `<x-markas.avatar name="${name}" />`,
      ).join("\n");
      writeFileSync(join(dir, "page.blade.php"), source);
      execFileSync(
        "php",
        [join(root, "scripts/render-blade.php"), dir, join(dir, "out")],
        { stdio: "pipe" },
      );
      const html = readFileSync(join(dir, "out/page.html"), "utf8");
      const rendered = [...html.matchAll(/<span[^>]*>([^<]*)<\/span>/g)].map(
        (match) => match[1],
      );
      expect(rendered).toEqual(INITIAL_CASES.map(([, initials]) => initials));
    },
    RENDER_TIMEOUT_MS,
  );
});
