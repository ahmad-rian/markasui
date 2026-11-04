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
  }>(),
  {
    caption: undefined,
    showCaption: false,
    label: undefined,
    rowKey: undefined,
  },
);

defineSlots<Record<`cell-${string}`, (props: { row: TableRow }) => unknown>>();

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
</script>

<template>
  <div
    tabindex="0"
    role="region"
    :aria-label="props.label ?? props.caption ?? 'Tabel'"
    :class="wrapper"
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
        <tr :class="headRow">
          <th
            v-for="column in props.columns"
            :key="column.key"
            scope="col"
            :class="[headCell, aligns[column.align ?? 'left']]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in props.rows"
          :key="props.rowKey === undefined ? index : String(row[props.rowKey])"
          :class="rowClass"
        >
          <td
            v-for="column in props.columns"
            :key="column.key"
            :class="[cell, aligns[column.align ?? 'left']]"
          >
            <slot :name="`cell-${column.key}`" :row="row">{{
              row[column.key] ?? ""
            }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
