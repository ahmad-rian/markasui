import { Component } from "@angular/core";
import { TextScramble } from "../../components/text-scramble/text-scramble.component";

@Component({
  selector: "markas-example",
  imports: [TextScramble],
  template: `
    <div class="grid grid-cols-3 gap-3">
      @for (stat of stats; track stat.label) {
        <div class="rounded-xl border border-line bg-surface p-4">
          <p class="text-xs text-muted">{{ stat.label }}</p>
          <p class="mt-1 text-xl font-semibold text-ink">
            <span
              markas-text-scramble
              [text]="stat.value"
              trigger="view"
              charset="digits"
              [delay]="stat.delay"
            ></span>
          </p>
        </div>
      }
    </div>
  `,
})
export default class TextScrambleStatsExample {
  protected readonly stats = [
    { label: "Revenue", value: "Rp 12,4 M", delay: 0 },
    { label: "Uptime", value: "99.98%", delay: 150 },
    { label: "Active teams", value: "1,284", delay: 300 },
  ];
}
