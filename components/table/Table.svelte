<script lang="ts" module>
  export type TableColumn = {
    key: string;
    label: string;
    align?: "left" | "center" | "right";
  };

  export type TableRow = Record<string, string | number | null | undefined>;
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

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

  type Props = HTMLAttributes<HTMLDivElement> & {
    columns: TableColumn[];
    rows: TableRow[];
    caption?: string;
    showCaption?: boolean;
    label?: string;
    /** Field holding a unique id per row, used as the key. Without it the index is used. */
    rowKey?: string;
    /** Custom cell content per column key. Other columns show the plain value. */
    cells?: Record<string, Snippet<[TableRow]>>;
    /** Lines around every cell, like a grid. */
    bordered?: boolean;
    /** Square corners (no radius), like a classic table. */
    square?: boolean;
    /** Alternating background on even rows. */
    striped?: boolean;
    size?: keyof typeof sizes;
    /** One optional tfoot row, values per column key (for example a total). */
    footer?: TableRow;
  };

  let {
    columns,
    rows,
    caption,
    showCaption = false,
    label,
    rowKey,
    cells = {},
    bordered = false,
    square = false,
    striped = false,
    size = "md",
    footer,
    class: className,
    ...rest
  }: Props = $props();

  const cellClass = (base: string, column: TableColumn) => [
    base,
    sizes[size] ?? sizes.md,
    bordered && borderedCell,
    aligns[column.align ?? "left"],
  ];
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  tabindex="0"
  role="region"
  aria-label={label ?? caption ?? "Table"}
  class={[wrapper, !square && rounded, className]}
  {...rest}
>
  <table class={tableClass}>
    {#if caption}
      <caption class={captionClasses[showCaption ? "visible" : "hidden"]}
        >{caption}</caption
      >
    {/if}
    <thead>
      <tr class={[headRow, bordered && borderedHeadRow]}>
        {#each columns as column (column.key)}
          <th scope="col" class={cellClass(headCell, column)}>{column.label}</th
          >
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, index (rowKey === undefined ? index : String(row[rowKey]))}
        <tr class={[rowClass, striped && stripedRow]}>
          {#each columns as column (column.key)}
            {@const custom = cells[column.key]}
            <td class={cellClass(cell, column)}
              >{#if custom}{@render custom(row)}{:else}{row[column.key] ??
                  ""}{/if}</td
            >
          {/each}
        </tr>
      {/each}
    </tbody>
    {#if footer}
      <tfoot>
        <tr class={footRow}>
          {#each columns as column (column.key)}
            <td class={cellClass(cell, column)}>{footer[column.key] ?? ""}</td>
          {/each}
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
