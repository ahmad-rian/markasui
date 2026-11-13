import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

const root = "group/avatars isolate flex items-center";
const item =
  "group/avatar relative shrink-0 transition-[margin] duration-200 ease-out hover:z-10 motion-reduce:transition-none";
const face =
  "flex items-center justify-center overflow-hidden rounded-full font-medium ring-2 ring-[var(--avatar-ring,var(--color-canvas))] transition-[translate,scale] duration-200 ease-out select-none group-hover/avatar:-translate-y-1 group-hover/avatar:scale-110 motion-reduce:transition-none";
const image = "object-cover";
const fallback = "bg-primary-soft text-primary";
const more = "bg-subtle text-ink";
const tooltip =
  "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-canvas opacity-0 shadow-overlay transition duration-150 ease-out group-hover/avatar:translate-y-0 group-hover/avatar:opacity-100 motion-reduce:transition-none";
const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};
const overlaps = {
  sm: "not-first:-ml-1.5 group-hover/avatars:not-first:ml-0.5",
  md: "not-first:-ml-2 group-hover/avatars:not-first:ml-1",
  lg: "not-first:-ml-2.5 group-hover/avatars:not-first:ml-1.5",
};

/** First letter of the first and last word, same as the Blade, React, and Vue versions. */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return picked
    .map((word) => Array.from(word ?? "")[0] ?? "")
    .join("")
    .toUpperCase();
}

export type AvatarGroupItem = { name: string; src?: string | null };
export type AvatarGroupSize = keyof typeof sizes;

/** Attribute selector on the group div: aria-label, class, and other attributes stay on it. */
@Component({
  selector: "div[markas-avatar-group]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "group",
    "[attr.aria-label]": "groupLabel()",
    "[class]": "root",
  },
  template: `
    @for (person of shown(); track $index) {
      <span [class]="itemClasses()">
        @if (person.src) {
          <img
            [src]="person.src"
            [alt]="person.name"
            [class]="imageClasses()"
          />
        } @else {
          <span
            role="img"
            [attr.aria-label]="person.name"
            [class]="fallbackClasses()"
            >{{ initials(person.name) }}</span
          >
        }
        <span aria-hidden="true" [class]="tooltip">{{
          person.name
        }}</span></span
      >
    }
    @if (hidden().length > 0) {
      <span [class]="itemClasses()"
        ><span [class]="moreClasses()"
          ><span aria-hidden="true">+{{ hidden().length }}</span
          ><span class="sr-only">{{ moreText() }}</span></span
        ><span aria-hidden="true" [class]="tooltip">{{
          hiddenNames()
        }}</span></span
      >
    }
  `,
})
export class AvatarGroup {
  readonly items = input.required<AvatarGroupItem[]>();
  readonly max = input(4);
  readonly size = input<AvatarGroupSize>("md");
  /** Accessible name of the group. */
  readonly groupLabel = input("Members");
  /** Hidden text on the +N chip. {count} is replaced with the number of hidden people. */
  readonly moreLabel = input("{count} more");

  protected readonly root = root;
  protected readonly tooltip = tooltip;
  protected readonly initials = getInitials;
  protected readonly shown = computed(() => this.items().slice(0, this.max()));
  protected readonly hidden = computed(() => this.items().slice(this.max()));
  protected readonly hiddenNames = computed(() =>
    this.hidden()
      .map((person) => person.name)
      .join(", "),
  );
  protected readonly moreText = computed(() =>
    this.moreLabel().replace("{count}", String(this.hidden().length)),
  );
  protected readonly itemClasses = computed(
    () => `${item} ${overlaps[this.size()]}`,
  );
  protected readonly imageClasses = computed(
    () => `${face} ${image} ${sizes[this.size()]}`,
  );
  protected readonly fallbackClasses = computed(
    () => `${face} ${fallback} ${sizes[this.size()]}`,
  );
  protected readonly moreClasses = computed(
    () => `${face} ${more} ${sizes[this.size()]}`,
  );
}
