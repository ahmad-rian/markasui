import { fireEvent, render, screen, within } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Avatar, { getInitials } from "../../components/avatar/Avatar.vue";
import Card from "../../components/card/Card.vue";
import Table from "../../components/table/Table.vue";

describe("Vue Card", () => {
  it("merender judul, deskripsi, isi, dan footer", () => {
    render(Card, {
      props: { title: "Paket Pro", description: "Untuk tim kecil." },
      slots: {
        default: "Isi kartu",
        footer: '<button type="button">Pilih</button>',
      },
    });
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
    render(Card, {
      attrs: { class: "max-w-sm" },
      slots: { default: "Hanya isi" },
    });
    const card = screen.getByRole("article");
    expect(card.querySelector("header")).toBeNull();
    expect(card.children).toHaveLength(1);
    expect(card).toHaveClass("rounded-xl", "border-line", "p-6", "gap-4");
    expect(card.className.endsWith("max-w-sm")).toBe(true);
  });
});

describe("Vue Avatar", () => {
  it.each([
    ["Budi Santoso", "BS"],
    ["ani", "A"],
    ["  siti   nur   aisyah  ", "SA"],
    ["", ""],
  ])("getInitials(%j) menjadi %j", (name, expected) => {
    expect(getInitials(name)).toBe(expected);
  });

  it("menampilkan inisial dengan role img saat src kosong", () => {
    render(Avatar, {
      props: { name: "Budi Santoso", size: "sm" },
      attrs: { class: "ring-2" },
    });
    const avatar = screen.getByRole("img", { name: "Budi Santoso" });
    expect(avatar.tagName).toBe("SPAN");
    expect(avatar).toHaveTextContent("BS");
    expect(avatar).toHaveClass("bg-primary-soft", "text-primary", "size-8");
    expect(avatar.className.endsWith("ring-2")).toBe(true);
  });

  it("merender gambar dengan alt bawaan name, ukuran, dan atribut user", () => {
    render(Avatar, {
      props: { name: "Siti Aminah", src: "/siti.png", size: "lg" },
      attrs: { class: "ring-2", loading: "lazy" },
    });
    const image = screen.getByRole("img", { name: "Siti Aminah" });
    expect(image.tagName).toBe("IMG");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveClass("object-cover", "size-12");
    expect(image.className.endsWith("ring-2")).toBe(true);
  });

  it("beralih ke inisial saat gambar gagal dimuat", async () => {
    render(Avatar, {
      props: { name: "Dewi Lestari", src: "/rusak.png", alt: "Foto Dewi" },
    });
    await fireEvent.error(screen.getByRole("img", { name: "Foto Dewi" }));
    const fallback = screen.getByRole("img", { name: "Foto Dewi" });
    expect(fallback.tagName).toBe("SPAN");
    expect(fallback).toHaveTextContent("DL");
  });

  it("alt kosong menyembunyikan fallback dari screen reader", () => {
    const { container } = render(Avatar, { props: { name: "Rina", alt: "" } });
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Vue Table", () => {
  const columns = [
    { key: "kode", label: "Pesanan" },
    { key: "total", label: "Total", align: "right" as const },
  ];
  const rows = [
    { kode: "INV-1", total: "Rp10.000" },
    { kode: "INV-2", total: null },
  ];

  it("merender region yang bisa difokus, header, dan baris", () => {
    render(Table, {
      props: { caption: "Pesanan", columns, rows },
      attrs: { class: "max-h-80" },
    });
    const region = screen.getByRole("region", { name: "Pesanan" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveClass("overflow-x-auto", "rounded-xl");
    expect(region.className.endsWith("max-h-80")).toBe(true);

    const table = within(region).getByRole("table", { name: "Pesanan" });
    const headers = within(table).getAllByRole("columnheader");
    expect(headers.map((th) => th.textContent?.trim())).toEqual([
      "Pesanan",
      "Total",
    ]);
    expect(headers[0]).toHaveAttribute("scope", "col");
    expect(headers[1]).toHaveClass("text-right");
    expect(within(table).getAllByRole("row")).toHaveLength(3);
    expect(within(table).getByText("Rp10.000")).toHaveClass("text-right");
    expect(table.querySelector("caption")).toHaveClass("sr-only");
  });

  it("caption bisa ditampilkan dan label mengganti nama region", () => {
    render(Table, {
      props: {
        caption: "Pesanan",
        showCaption: true,
        label: "Tabel pesanan",
        columns,
        rows: [],
      },
    });
    expect(
      screen.getByRole("region", { name: "Tabel pesanan" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pesanan", { selector: "caption" }),
    ).not.toHaveClass("sr-only");
  });

  it("tanpa caption dan label, region bernama Tabel", () => {
    render(Table, { props: { columns, rows } });
    expect(screen.getByRole("region", { name: "Tabel" })).toBeInTheDocument();
  });

  const keyedRows = [
    { id: 1, kode: "INV-1" },
    { id: 2, kode: "INV-2" },
  ];
  const keyedColumns = [{ key: "kode", label: "Pesanan" }];
  const rowOf = (text: string) => screen.getByText(text).closest("tr");

  it("rowKey menjaga elemen baris saat data diurutkan ulang", async () => {
    const { rerender } = render(Table, {
      props: { columns: keyedColumns, rows: keyedRows, rowKey: "id" },
    });
    const second = rowOf("INV-2");
    await rerender({ rows: [...keyedRows].reverse() });
    expect(rowOf("INV-2")).toBe(second);
  });

  it("tanpa rowKey baris memakai indeks sebagai key", async () => {
    const { rerender } = render(Table, {
      props: { columns: keyedColumns, rows: keyedRows },
    });
    const second = rowOf("INV-2");
    await rerender({ rows: [...keyedRows].reverse() });
    expect(rowOf("INV-2")).not.toBe(second);
  });

  it("slot cell-<key> menerima row", () => {
    render(Table, {
      props: { columns, rows },
      slots: {
        "cell-kode":
          '<template #cell-kode="{ row }"><strong>{{ row.kode }}</strong></template>',
      },
    });
    expect(screen.getByText("INV-1").tagName).toBe("STRONG");
    expect(screen.getByText("Rp10.000").tagName).toBe("TD");
  });
});
