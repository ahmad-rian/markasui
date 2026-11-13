import { Component } from "@angular/core";
import { GradientBorder } from "../../components/gradient-border/gradient-border.component";

@Component({
  selector: "markas-example",
  imports: [GradientBorder],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-4 p-6">
      <div
        markas-gradient-border
        variant="shine"
        radius="full"
        class="inline-block"
      >
        <button
          type="button"
          class="inline-flex h-10 items-center rounded-full px-5 text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Get early access
        </button>
      </div>
      <div
        markas-gradient-border
        variant="shine"
        radius="lg"
        color="success"
        speed="slow"
        class="inline-block"
      >
        <button
          type="button"
          class="inline-flex h-10 items-center rounded-[7px] px-5 text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Deploy preview
        </button>
      </div>
    </div>
  `,
})
export default class GradientBorderButtonsExample {}
