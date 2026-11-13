import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
} from "@angular/core";

const base =
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle";
const image = "object-cover";
const fallback = "bg-primary-soft font-medium text-primary select-none";
const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

export type AvatarSize = keyof typeof sizes;

/** First letter of the first and last word, same as the Blade, React, and Vue versions. */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return picked
    .map((word) => Array.from(word ?? "")[0] ?? "")
    .join("")
    .toUpperCase();
}

/**
 * Host stays out of layout (display: contents). class moves to the image or the initials,
 * so the host title and class are cleared.
 */
@Component({
  selector: "markas-avatar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.title]": "null" },
  template: `
    @if (src() && !failed()) {
      <img
        [src]="src()"
        [alt]="label()"
        [class]="imageClass()"
        (error)="failed.set(true)"
      />
    } @else {
      <span
        [attr.role]="label() ? 'img' : null"
        [attr.aria-label]="label() || null"
        [attr.aria-hidden]="label() ? null : 'true'"
        [class]="fallbackClass()"
        >{{ initials() }}</span
      >
    }
  `,
})
export class Avatar {
  readonly name = input.required<string>();
  readonly src = input<string | null>();
  readonly alt = input<string>();
  readonly size = input<AvatarSize>("md");
  readonly userClass = input("", { alias: "class" });

  /** Resets whenever src changes, so a new image gets a fresh try. */
  protected readonly failed = linkedSignal({
    source: this.src,
    computation: () => false,
  });
  protected readonly label = computed(() => this.alt() ?? this.name());
  protected readonly initials = computed(() => getInitials(this.name()));
  protected readonly imageClass = computed(() =>
    [base, image, sizes[this.size()], this.userClass()]
      .filter(Boolean)
      .join(" "),
  );
  protected readonly fallbackClass = computed(() =>
    [base, fallback, sizes[this.size()], this.userClass()]
      .filter(Boolean)
      .join(" "),
  );
}
