import { render, screen, within } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Table from "../../components/table/Table.vue";

const columns = [
  { key: "item", label: "Item" },
  { key: "value", label: "Value", align: "right" as const },
];
const rows = [
  { item: "Stapler", value: "$688.00" },
  { item: "Sticky notes", value: "$960.00" },
];

const renderTable = (props: Record<string, unknown> = {}) =>
  render(Table, { props: { caption: "Stock", columns, rows, ...props } });

const headerRow = () => screen.getAllByRole("row")[0]!;
const bodyRows = () => screen.getAllByRole("row").slice(1);

describe("Vue Table (bordered, striped, size, footer)", () => {
  it("default tanpa garis vertikal, tanpa striped, ukuran md, tanpa tfoot", () => {
    const { container } = renderTable();
    const cell = screen.getByText("Stapler");
    expect(cell).toHaveClass("px-4", "py-3");
    expect(cell).not.toHaveClass("border-l", "text-[13px]");
    expect(headerRow()).not.toHaveClass("border-b-2");
    expect(bodyRows()[0]).not.toHaveClass("even:bg-subtle/40");
    expect(container.querySelector("tfoot")).toBeNull();
  });

  it("bordered memberi garis di setiap sel dan garis bawah header", () => {
    renderTable({ bordered: true });
    expect(headerRow()).toHaveClass("border-b-2", "border-line");
    for (const header of screen.getAllByRole("columnheader"))
      expect(header).toHaveClass("border-l", "border-line", "first:border-l-0");
    for (const cell of screen.getAllByRole("cell"))
      expect(cell).toHaveClass("border-l", "first:border-l-0");
  });

  it("striped memberi latar baris genap", () => {
    renderTable({ striped: true });
    for (const row of bodyRows()) expect(row).toHaveClass("even:bg-subtle/40");
  });

  it("size sm merapatkan padding dan teks", () => {
    renderTable({ size: "sm" });
    for (const cell of [
      ...screen.getAllByRole("columnheader"),
      ...screen.getAllByRole("cell"),
    ]) {
      expect(cell).toHaveClass("px-3", "py-2", "text-[13px]");
      expect(cell).not.toHaveClass("px-4");
    }
  });

  it("footer merender satu baris tfoot dengan perataan kolom", () => {
    const { container } = renderTable({
      bordered: true,
      footer: { item: "Total" },
    });
    const tfoot = container.querySelector("tfoot")!;
    const cells = within(tfoot as HTMLElement).getAllByRole("cell");
    expect(cells.map((cell) => cell.textContent?.trim())).toEqual([
      "Total",
      "",
    ]);
    expect(cells[1]).toHaveClass("text-right", "border-l");
    expect(within(tfoot as HTMLElement).getByRole("row")).toHaveClass(
      "border-t-2",
    );
  });
});
