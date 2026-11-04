import type { ComponentProps, ReactNode } from "react";

const wrapper =
  "overflow-x-auto rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const tableClass = "w-full border-collapse text-sm";
const captionClasses = {
  hidden: "sr-only",
  visible: "px-4 py-3 text-left font-medium text-ink",
};
const headRow = "bg-subtle text-left text-sm font-medium text-muted";
const headCell = "px-4 py-3 font-medium whitespace-nowrap";
const rowClass =
  "border-t border-line transition-colors duration-150 ease-out hover:bg-subtle/50 motion-reduce:transition-none";
const cell = "px-4 py-3 whitespace-nowrap text-ink";
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
};

export function Table({
  columns,
  rows,
  caption,
  showCaption = false,
  label,
  rowKey,
  renderCell,
  className,
  ...props
}: TableProps) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={label ?? caption ?? "Table"}
      className={cx(wrapper, className)}
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
          <tr className={headRow}>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cx(headCell, aligns[column.align ?? "left"])}
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
              className={rowClass}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cx(cell, aligns[column.align ?? "left"])}
                >
                  {renderCell?.(row, column.key) ?? row[column.key] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
