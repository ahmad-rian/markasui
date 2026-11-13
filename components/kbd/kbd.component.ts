import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

const keycap =
  "inline-flex items-center justify-center rounded-md bg-surface font-sans font-medium text-muted ring-1 ring-line";
const sizes = {
  sm: "h-5 min-w-5 px-1 text-[11px]",
  md: "h-6 min-w-6 px-1.5 text-xs",
};
const group = "inline-flex items-center gap-1 font-sans";
const joiner = "text-xs text-muted";

export type KbdSize = keyof typeof sizes;

/**
 * Attribute selector on the native kbd: aria-*, title, and the user's class stay on it.
 * With `keys` the host becomes the group and every key is a nested kbd.
 */
@Component({
  selector: "kbd[markas-kbd]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "classes()" },
  template: `@if (keys().length === 0) {
      <ng-content />
    } @else {
      @for (key of keys(); track $index) {
        @if ($index > 0) {
          <span [class]="joiner">{{ separator() }}</span>
        }
        <kbd [class]="keyClass()">{{ key }}</kbd>
      }
    }`,
})
export class Kbd {
  readonly size = input<KbdSize>("md");
  /** Key combination, rendered as separate keycaps. Replaces the content. */
  readonly keys = input<string[]>([]);
  /** Text between keys in a combination. */
  readonly separator = input("+");

  protected readonly joiner = joiner;
  protected readonly keyClass = computed(
    () => `${keycap} ${sizes[this.size()]}`,
  );
  protected readonly classes = computed(() =>
    this.keys().length === 0 ? this.keyClass() : group,
  );
}
