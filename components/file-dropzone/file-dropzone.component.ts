import { NgTemplateOutlet } from "@angular/common";
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  linkedSignal,
  numberAttribute,
  output,
  signal,
  viewChild,
} from "@angular/core";

const root = "grid gap-3";
const zone =
  "group/zone grid cursor-pointer justify-items-center gap-2 rounded-xl border-2 border-dashed border-line bg-surface px-6 py-8 text-center transition duration-200 ease-out hover:border-primary-line hover:bg-subtle has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary has-[:disabled]:opacity-50 data-[state=over]:border-primary data-[state=over]:bg-primary-soft data-[state=over]:ring-4 data-[state=over]:ring-primary/10 motion-reduce:transition-none";
const badge =
  "size-11 rounded-full bg-subtle p-3 text-ink transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[state=over]/zone:-translate-y-1.5 group-data-[state=over]/zone:scale-110 group-data-[state=over]/zone:bg-surface motion-reduce:transition-none";
const titleClass = "text-sm text-ink";
const browseClass = "font-medium underline underline-offset-4";
const hintClass = "text-xs text-muted";
const srOnly = "sr-only";
const list = "grid gap-2";
const item =
  "group/item flex items-center gap-3 rounded-lg border border-line bg-surface p-3 data-[state=error]:border-danger/40 data-[state=error]:bg-danger/5";
const fileIcon =
  "size-9 shrink-0 rounded-md bg-subtle p-2 text-ink group-data-[state=error]/item:bg-danger/10 group-data-[state=error]/item:text-danger";
const body = "grid min-w-0 flex-1 gap-1.5";
const row = "flex items-baseline justify-between gap-3 text-sm";
const nameClass = "truncate font-medium text-ink";
const sizeClass = "shrink-0 text-xs text-muted tabular-nums";
const errorClass = "text-xs text-danger";
const track = "h-1.5 overflow-hidden rounded-full bg-subtle";
const bar =
  "h-full rounded-full transition-[width] duration-300 ease-out motion-reduce:transition-none";
const bars = { busy: "bg-primary", done: "bg-success" };
const remove =
  "size-8 shrink-0 rounded-md p-2 text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const smallIcon = "size-4";

/** 24px stroked icons: the drop prompt, remove, and one per file kind. */
const UPLOAD = "M12 16V4M7 9l5-5 5 5M4 16v4h16v-4";
const REMOVE = "M6 6l12 12M18 6 6 18";
const FILE = "M14 3H5v18h14V8zM14 3v5h5M9 13h6M9 17h4";
const KINDS: Record<string, string> = {
  image: "M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4M15 8h.01",
  video: "M3 6h13v12H3zM16 10l5-3v10l-5-3",
  audio:
    "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
};

export type DropzoneFile = {
  name: string;
  /** Size in bytes. */
  size: number;
  type?: string;
  /** Upload progress 0 to 100. Leave out to hide the bar. */
  progress?: number;
  error?: string;
};
type Item = DropzoneFile & { key: number; file?: File };

const fill = (template: string, value: string | number) =>
  template.replace(/\{\w+\}/, () => String(value));

/** 1536 -> "2 KB", 2400000 -> "2.3 MB". */
export function formatSize(bytes: number) {
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < 3) {
    value /= 1024;
    unit++;
  }
  return `${unit < 2 ? Math.round(value) : Number(value.toFixed(1))} ${["B", "KB", "MB", "GB"][unit]}`;
}

/** Same rules as the accept attribute: .ext, type/*, or an exact MIME type. */
export function accepts(file: { name: string; type?: string }, accept = "") {
  const type = (file.type ?? "").toLowerCase();
  return (
    !accept ||
    accept.split(",").some((raw) => {
      const rule = raw.trim().toLowerCase();
      if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule);
      if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
      return type === rule;
    })
  );
}

const iconOf = ({ type = "" }: DropzoneFile) =>
  KINDS[type.split("/")[0]!] ?? FILE;

let nextId = 0;

/** Host stays out of layout; id moves to the file input and class to the root. */
@Component({
  selector: "markas-file-dropzone",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents", "[attr.id]": "null", "[attr.name]": "null" },
  template: `
    <ng-template #icon let-d let-iconClass="iconClass">
      <svg
        [class]="iconClass"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path [attr.d]="d" />
      </svg>
    </ng-template>
    <div [class]="rootClasses()">
      <label
        [attr.data-state]="over() ? 'over' : 'idle'"
        [class]="zone"
        (dragenter)="drag($event, true)"
        (dragover)="drag($event, true)"
        (dragleave)="drag($event, false)"
        (drop)="drop($event)"
      >
        <input
          #inputEl
          [id]="inputId()"
          type="file"
          [attr.name]="name() ?? null"
          [attr.accept]="accept() ?? null"
          [multiple]="multiple()"
          [disabled]="disabled()"
          [required]="required()"
          [class]="srOnly"
          (change)="pick($event)"
        />
        <ng-container
          [ngTemplateOutlet]="icon"
          [ngTemplateOutletContext]="{ $implicit: UPLOAD, iconClass: badge }"
        />
        <span [class]="titleClass"
          >{{ dropLabel() }}
          <span [class]="browseClass">{{ browseLabel() }}</span></span
        >
        @if (hint()) {
          <span [class]="hintClass">{{ hint() }}</span>
        }
      </label>
      @if (items().length > 0) {
        <ul [class]="list">
          @for (file of items(); track file.key) {
            <li [attr.data-state]="file.error ? 'error' : 'ok'" [class]="item">
              <ng-container
                [ngTemplateOutlet]="icon"
                [ngTemplateOutletContext]="{
                  $implicit: iconOf(file),
                  iconClass: fileIcon,
                }"
              />
              <div [class]="body">
                <div [class]="row">
                  <span [class]="nameClass">{{ file.name }}</span>
                  <span [class]="sizeClass">{{ formatSize(file.size) }}</span>
                </div>
                @if (file.error) {
                  <p role="alert" [class]="errorClass">{{ file.error }}</p>
                } @else if (percentOf(file) !== undefined) {
                  <div
                    role="progressbar"
                    [attr.aria-valuenow]="percentOf(file)"
                    [attr.aria-label]="file.name"
                    [class]="track"
                  >
                    <div
                      [class]="barClass(percentOf(file))"
                      [style.width.%]="percentOf(file)"
                    ></div>
                  </div>
                }
              </div>
              <button
                type="button"
                [attr.aria-label]="fill(removeLabel(), file.name)"
                [class]="remove"
                (click)="removeItem(file)"
              >
                <ng-container
                  [ngTemplateOutlet]="icon"
                  [ngTemplateOutletContext]="{
                    $implicit: REMOVE,
                    iconClass: smallIcon,
                  }"
                />
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
})
export class FileDropzone {
  readonly name = input<string>();
  readonly accept = input<string>();
  readonly multiple = input(false, { transform: booleanAttribute });
  /** Largest file in bytes. */
  readonly maxSize = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : numberAttribute(value),
  });
  /** Most files kept when multiple is on. */
  readonly maxFiles = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : numberAttribute(value),
  });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  /** Files already in the list, such as earlier uploads. They are shown, not submitted. */
  readonly files = input<DropzoneFile[]>([]);
  /** Live upload progress by file name, 0 to 100. */
  readonly progress = input<Record<string, number>>({});
  readonly hint = input<string>();
  readonly dropLabel = input("Drop files here or");
  readonly browseLabel = input("browse");
  readonly removeLabel = input("Remove {name}");
  readonly tooLargeLabel = input("Larger than {size}");
  readonly typeLabel = input("File type not allowed");
  readonly tooManyLabel = input("Only {max} files allowed");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });
  /** The valid picked files, every time the list changes. */
  readonly filesChange = output<File[]>();

  protected readonly UPLOAD = UPLOAD;
  protected readonly REMOVE = REMOVE;
  protected readonly zone = zone;
  protected readonly badge = badge;
  protected readonly titleClass = titleClass;
  protected readonly browseClass = browseClass;
  protected readonly hintClass = hintClass;
  protected readonly srOnly = srOnly;
  protected readonly list = list;
  protected readonly item = item;
  protected readonly fileIcon = fileIcon;
  protected readonly body = body;
  protected readonly row = row;
  protected readonly nameClass = nameClass;
  protected readonly sizeClass = sizeClass;
  protected readonly errorClass = errorClass;
  protected readonly track = track;
  protected readonly remove = remove;
  protected readonly smallIcon = smallIcon;
  protected readonly fill = fill;
  protected readonly formatSize = formatSize;
  protected readonly iconOf = iconOf;
  private readonly generatedId = `markas-file-dropzone-${nextId++}`;
  protected readonly inputId = computed(() => this.id() ?? this.generatedId);
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly over = signal(false);
  private seq = 0;
  /** Starts from the files passed in; picks and removals are kept here. */
  protected readonly items = linkedSignal<Item[]>(() => {
    const files = this.files();
    this.seq = files.length;
    return files.map((file, key) => ({ ...file, key }));
  });
  private readonly inputEl =
    viewChild.required<ElementRef<HTMLInputElement>>("inputEl");

  protected percentOf(file: Item) {
    return this.progress()[file.name] ?? file.progress;
  }

  protected barClass(percent: number | undefined) {
    return `${bar} ${bars[(percent ?? 0) < 100 ? "busy" : "done"]}`;
  }

  /** Keep the native input's files equal to the valid picked files, so a form posts them. */
  private update(next: Item[]) {
    this.items.set(next);
    const picked = next.flatMap((i) => (i.file && !i.error ? [i.file] : []));
    const transfer = new DataTransfer();
    picked.forEach((file) => transfer.items.add(file));
    this.inputEl().nativeElement.files = transfer.files;
    this.filesChange.emit(picked);
  }

  private add(incoming: File[]) {
    const multiple = this.multiple();
    const limit = multiple ? (this.maxFiles() ?? Infinity) : 1;
    const maxSize = this.maxSize();
    const kept = multiple ? this.items() : [];
    let count = kept.filter((i) => !i.error).length;
    const added = incoming.map((file) => {
      const error = !accepts(file, this.accept())
        ? this.typeLabel()
        : maxSize !== undefined && file.size > maxSize
          ? fill(this.tooLargeLabel(), formatSize(maxSize))
          : count >= limit
            ? fill(this.tooManyLabel(), limit)
            : undefined;
      if (!error) count++;
      const { name, size, type } = file;
      return { key: this.seq++, name, size, type, file, error };
    });
    this.update([...kept, ...added]);
  }

  protected pick(event: Event) {
    this.add([...((event.target as HTMLInputElement).files ?? [])]);
  }

  protected removeItem(file: Item) {
    this.update(this.items().filter((i) => i !== file));
  }

  protected drag(event: DragEvent, entering: boolean) {
    event.preventDefault();
    if (entering) {
      this.over.set(!this.disabled());
      return;
    }
    const zone = event.currentTarget as HTMLElement;
    if (!zone.contains(event.relatedTarget as Node | null))
      this.over.set(false);
  }

  protected drop(event: DragEvent) {
    event.preventDefault();
    this.over.set(false);
    if (!this.disabled()) this.add([...(event.dataTransfer?.files ?? [])]);
  }
}
