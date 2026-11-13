import { Component, signal } from "@angular/core";
import { PromptInput } from "../../components/prompt-input/prompt-input.component";

@Component({
  selector: "markas-example",
  imports: [PromptInput],
  template: `
    <markas-prompt-input
      placeholderLabel="Ask about your sales, invoices, or stock"
    >
      <ng-container actions>
        @for (item of tools; track item.label) {
          <button
            type="button"
            [attr.aria-pressed]="active().includes(item.label)"
            [class]="tool"
            (click)="toggle(item.label)"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              [class]="icon"
            >
              <path [attr.d]="item.icon" /></svg
            >{{ item.label }}
          </button>
        }
      </ng-container>
    </markas-prompt-input>
  `,
})
export default class PromptInputToolsExample {
  protected readonly tool =
    "inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-2.5 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary-line aria-pressed:bg-primary-soft aria-pressed:text-ink motion-reduce:transition-none";
  protected readonly icon = "size-3.5";
  protected readonly tools = [
    {
      label: "Search",
      icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
    },
    {
      label: "Reason",
      icon: "M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3zM9 21h6",
    },
  ];
  protected readonly active = signal<string[]>(["Search"]);

  protected toggle(label: string) {
    this.active.update((list) =>
      list.includes(label)
        ? list.filter((item) => item !== label)
        : [...list, label],
    );
  }
}
