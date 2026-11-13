import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

const base = "animate-pulse bg-subtle motion-reduce:animate-none";
const shapes = {
  rect: "rounded-md",
  circle: "rounded-full",
};

export type SkeletonShape = keyof typeof shapes;

/**
 * Attribute selector on a native div: the user class (size, width) stays on the placeholder
 * itself. The placeholder is hidden from assistive technology.
 */
@Component({
  selector: "div[markas-skeleton]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "aria-hidden": "true", "[class]": "classes()" },
  template: ``,
})
export class Skeleton {
  readonly shape = input<SkeletonShape>("rect");

  protected readonly classes = computed(
    () => `${base} ${shapes[this.shape()]}`,
  );
}
