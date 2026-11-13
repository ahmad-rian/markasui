import { NgTemplateOutlet } from "@angular/common";
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  type TemplateRef,
} from "@angular/core";

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

export type TableColumn = {
  key: string;
  label: string;
  align?: keyof typeof aligns;
};

export type TableRow = Record<string, string | number | null | undefined>;

export type TableCellContext = { $implicit: TableRow };

const join = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/**
 * Attribute selector on the native wrapper div: the user's class and attributes stay on the
 * scrollable region. Custom cells: `[cells]="{ status: statusCell }"` with
 * `<ng-template #statusCell let-row>`.
 */
@Component({
  selector: "div[markas-table]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    tabindex: "0",
    role: "region",
    "[attr.aria-label]": "label() ?? caption() ?? 'Table'",
    "[class]": "wrapperClass()",
  },
  template: `
    <table [class]="tableClass">
      @if (caption()) {
        <caption [class]="captionClass()">
          {{
            caption()
          }}
        </caption>
      }
      <thead>
        <tr [class]="headRowClass()">
          @for (column of columns(); track column.key) {
            <th scope="col" [class]="cellClass(headCell, column)">
              {{ column.label }}
            </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of rows(); track trackRow($index, row)) {
          <tr [class]="bodyRowClass()">
            @for (column of columns(); track column.key) {
              <td [class]="cellClass(cell, column)">
                @if (cells()[column.key]; as custom) {
                  <ng-container
                    [ngTemplateOutlet]="custom"
                    [ngTemplateOutletContext]="{ $implicit: row }"
                  />
                } @else {
                  {{ row[column.key] ?? "" }}
                }
              </td>
            }
          </tr>
        }
      </tbody>
      @if (footer(); as foot) {
        <tfoot>
          <tr [class]="footRow">
            @for (column of columns(); track column.key) {
              <td [class]="cellClass(cell, column)">
                {{ foot[column.key] ?? "" }}
              </td>
            }
          </tr>
        </tfoot>
      }
    </table>
  `,
})
export class Table {
  readonly columns = input.required<TableColumn[]>();
  readonly rows = input.required<TableRow[]>();
  readonly caption = input<string>();
  readonly showCaption = input(false, { transform: booleanAttribute });
  readonly label = input<string>();
  /** Field holding a unique id per row, used to track rows. Without it the index is used. */
  readonly rowKey = input<string>();
  /** Custom cell templates per column key. Other columns show the plain value. */
  readonly cells = input<Record<string, TemplateRef<TableCellContext>>>({});
  /** Lines around every cell, like a grid. */
  readonly bordered = input(false, { transform: booleanAttribute });
  /** Square corners (no radius), like a classic table. */
  readonly square = input(false, { transform: booleanAttribute });
  /** Alternating background on even rows. */
  readonly striped = input(false, { transform: booleanAttribute });
  readonly size = input<keyof typeof sizes>("md");
  /** One optional tfoot row, values per column key (for example a total). */
  readonly footer = input<TableRow>();

  protected readonly tableClass = tableClass;
  protected readonly headCell = headCell;
  protected readonly cell = cell;
  protected readonly footRow = footRow;
  protected readonly wrapperClass = computed(() =>
    join(wrapper, !this.square() && rounded),
  );
  protected readonly captionClass = computed(
    () => captionClasses[this.showCaption() ? "visible" : "hidden"],
  );
  protected readonly headRowClass = computed(() =>
    join(headRow, this.bordered() && borderedHeadRow),
  );
  protected readonly bodyRowClass = computed(() =>
    join(rowClass, this.striped() && stripedRow),
  );

  protected cellClass(base: string, column: TableColumn) {
    return join(
      base,
      sizes[this.size()] ?? sizes.md,
      this.bordered() && borderedCell,
      aligns[column.align ?? "left"],
    );
  }

  protected trackRow(index: number, row: TableRow) {
    const key = this.rowKey();
    return key === undefined ? index : String(row[key]);
  }
}
