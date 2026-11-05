import type { ComponentProps, ReactNode } from "react";

const wrapper =
  "overflow-x-auto border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const tableClass = "w-full border-collapse text-sm";
const captionClasses = {
  hidden: "sr-only",
  visible: "px-4 py-3 text-left font-medium text-ink",
};
const headRow = "bg-subtle text-left text-sm font-medium text-muted";
const rounded = "rounded-xl";
const borderedHeadRow = "border-b-2 border-line";
const headCell = "font-medium whitespace-nowrap";
const rowClass =
  "border-t border-line transition-colors duration-150 ease-out hover:bg-subtle/50 motion-reduce:transition-none";
const stripedRow = "even:bg-subtle/40";
const footRow = "border-t-2 border-line bg-subtle font-medium";
const cell = "whitespace-nowrap text-ink";
const borderedCell = "border-l border-line first:border-l-0";
const sizes = {
  sm: "px-3 py-2 text-[13px]",
  md: "px-4 py-3",
};
const aligns = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type TableColumn = {
  key: string;
  label: ReactNode;
  align?: keyof typeof aligns;
};

export type TableRow = Record<string, string | number | null | undefined>;

export type TableProps = ComponentProps<"div"> & {
  columns: TableColumn[];
  rows: TableRow[];
  caption?: string;
  showCaption?: boolean;
  label?: string;
  /** Nama field berisi id unik per baris, dipakai sebagai key. Tanpa ini key memakai indeks. */
  rowKey?: string;
  /** Isi sel kustom. Kembalikan undefined untuk memakai nilai teks bawaan. */
  renderCell?: (row: TableRow, key: string) => ReactNode;
  /** Garis di setiap sel, seperti grid kotak. */
  bordered?: boolean;
  /** Sudut siku (tanpa radius), seperti tabel klasik. */
  square?: boolean;
  /** Latar selang-seling di baris genap. */
  striped?: boolean;
  size?: keyof typeof sizes;
  /** Satu baris tfoot opsional, nilai per key kolom (misalnya total). */
  footer?: TableRow;
};

export function Table({
  columns,
  rows,
  caption,
  showCaption = false,
  label,
  rowKey,
  renderCell,
  bordered = false,
  square = false,
  striped = false,
  size = "md",
  footer,
  className,
  ...props
}: TableProps) {
  const cellClass = (base: string, column: TableColumn) =>
    cx(
      base,
      sizes[size] ?? sizes.md,
      bordered && borderedCell,
      aligns[column.align ?? "left"],
    );

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={label ?? caption ?? "Table"}
      className={cx(wrapper, !square && rounded, className)}
      {...props}
    >
      <table className={tableClass}>
        {caption && (
          <caption
            className={captionClasses[showCaption ? "visible" : "hidden"]}
          >
            {caption}
          </caption>
        )}
        <thead>
          <tr className={cx(headRow, bordered && borderedHeadRow)}>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cellClass(headCell, column)}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={rowKey === undefined ? index : String(row[rowKey])}
              className={cx(rowClass, striped && stripedRow)}
            >
              {columns.map((column) => (
                <td key={column.key} className={cellClass(cell, column)}>
                  {renderCell?.(row, column.key) ?? row[column.key] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr className={footRow}>
              {columns.map((column) => (
                <td key={column.key} className={cellClass(cell, column)}>
                  {footer[column.key] ?? ""}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
