<script setup lang="ts">
export type TableColumn = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
};
export type TableRow = Record<string, string | number | null | undefined>;

const props = withDefaults(
  defineProps<{
    columns: TableColumn[];
    rows: TableRow[];
    caption?: string;
    showCaption?: boolean;
    label?: string;
    /** Nama field berisi id unik per baris, dipakai sebagai key. Tanpa ini key memakai indeks. */
    rowKey?: string;
    /** Garis di setiap sel, seperti grid kotak. */
    bordered?: boolean;
    /** Sudut siku (tanpa radius), seperti tabel klasik. */
    square?: boolean;
    /** Latar selang-seling di baris genap. */
    striped?: boolean;
    size?: "sm" | "md";
    /** Satu baris tfoot opsional, nilai per key kolom (misalnya total). */
    footer?: TableRow;
  }>(),
  {
    bordered: false,
    square: false,
    striped: false,
    size: "md",
    footer: undefined,
    caption: undefined,
    showCaption: false,
    label: undefined,
    rowKey: undefined,
  },
);

defineSlots<Record<`cell-${string}`, (props: { row: TableRow }) => unknown>>();

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

const cellClass = (base: string, column: TableColumn) => [
  base,
  sizes[props.size] ?? sizes.md,
  props.bordered && borderedCell,
  aligns[column.align ?? "left"],
];
</script>

<template>
  <div
    tabindex="0"
    role="region"
    :aria-label="props.label ?? props.caption ?? 'Table'"
    :class="[wrapper, !props.square && rounded]"
  >
    <table :class="tableClass">
      <caption
        v-if="props.caption"
        :class="captionClasses[props.showCaption ? 'visible' : 'hidden']"
      >
        {{
          props.caption
        }}
      </caption>
      <thead>
        <tr :class="[headRow, props.bordered && borderedHeadRow]">
          <th
            v-for="column in props.columns"
            :key="column.key"
            scope="col"
            :class="cellClass(headCell, column)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in props.rows"
          :key="props.rowKey === undefined ? index : String(row[props.rowKey])"
          :class="[rowClass, props.striped && stripedRow]"
        >
          <td
            v-for="column in props.columns"
            :key="column.key"
            :class="cellClass(cell, column)"
          >
            <slot :name="`cell-${column.key}`" :row="row">{{
              row[column.key] ?? ""
            }}</slot>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="props.footer">
        <tr :class="footRow">
          <td
            v-for="column in props.columns"
            :key="column.key"
            :class="cellClass(cell, column)"
          >
            {{ props.footer[column.key] ?? "" }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
