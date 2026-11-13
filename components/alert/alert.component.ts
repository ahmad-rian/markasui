import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

const base = "flex gap-3 rounded-lg border p-4 text-sm text-ink";
const variants = {
  info: "border-primary-line bg-primary-soft",
  success: "border-success/30 bg-success/10",
  warning: "border-warning/30 bg-warning/10",
  danger: "border-danger/30 bg-danger/10",
};
const iconBase = "mt-0.5 size-4 shrink-0";
const iconVariants = {
  info: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const icons = {
  info: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 16v-4M12 8h.01",
  success: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM8.5 12l2.5 2.5 4.5-5",
  warning: "M12 3.5 2.5 20h19L12 3.5ZM12 10v4M12 17h.01",
  danger: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM15 9l-6 6M9 9l6 6",
};
const content = "grid gap-1";
const titleClass = "font-semibold";
const body = "text-ink";

export type AlertVariant = keyof typeof variants;

/**
 * Host stays out of layout (display: contents). role, title, and class move to the alert box,
 * so the host attributes are cleared (a title on the host would become a tooltip).
 */
@Component({
  selector: "markas-alert",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.role]": "null", "[attr.title]": "null" },
  template: `
    <div [attr.role]="role()" [class]="classes()">
      <svg
        [class]="iconClasses()"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path [attr.d]="icon()" />
      </svg>
      <div [class]="content">
        @if (title()) {
          <p [class]="titleClass">{{ title() }}</p>
        }
        <div [class]="body"><ng-content /></div>
      </div>
    </div>
  `,
})
export class Alert {
  readonly variant = input<AlertVariant>("info");
  readonly title = input<string>();
  readonly role = input("alert");
  readonly userClass = input("", { alias: "class" });

  protected readonly content = content;
  protected readonly titleClass = titleClass;
  protected readonly body = body;
  protected readonly classes = computed(() =>
    [base, variants[this.variant()], this.userClass()]
      .filter(Boolean)
      .join(" "),
  );
  protected readonly iconClasses = computed(
    () => `${iconBase} ${iconVariants[this.variant()]}`,
  );
  protected readonly icon = computed(() => icons[this.variant()]);
}
