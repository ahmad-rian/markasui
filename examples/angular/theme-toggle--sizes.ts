import { Component } from "@angular/core";
import { ThemeToggle } from "../../components/theme-toggle/theme-toggle.component";

@Component({
  selector: "markas-example",
  imports: [ThemeToggle],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <button markas-theme-toggle size="sm" variant="ghost"></button>
        <button markas-theme-toggle size="md" variant="ghost"></button>
        <button markas-theme-toggle size="lg" variant="ghost"></button>
      </div>
      <div class="flex items-center gap-3">
        <button
          markas-theme-toggle
          size="sm"
          variant="outline"
          animation="morph"
        ></button>
        <button
          markas-theme-toggle
          size="md"
          variant="outline"
          animation="morph"
        ></button>
        <button
          markas-theme-toggle
          size="lg"
          variant="outline"
          animation="morph"
        ></button>
      </div>
      <div class="flex items-center gap-3">
        <button
          markas-theme-toggle
          size="sm"
          variant="solid"
          animation="flip"
        ></button>
        <button
          markas-theme-toggle
          size="md"
          variant="solid"
          animation="flip"
        ></button>
        <button
          markas-theme-toggle
          size="lg"
          variant="solid"
          animation="flip"
        ></button>
      </div>
    </div>
  `,
})
export default class ThemeToggleSizesExample {}
