import { Component } from "@angular/core";
import { ThemeToggle } from "../../components/theme-toggle/theme-toggle.component";

@Component({
  selector: "markas-example",
  imports: [ThemeToggle],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button
        markas-theme-toggle
        showText
        darkLabel="Dark mode"
        lightLabel="Light mode"
        variant="outline"
      ></button>
      <button
        markas-theme-toggle
        showText
        darkLabel="Dark mode"
        lightLabel="Light mode"
        variant="solid"
        animation="morph"
        size="sm"
      ></button>
      <button
        markas-theme-toggle
        showText
        darkLabel="Dark mode"
        lightLabel="Light mode"
        variant="ghost"
        animation="slide"
        size="lg"
      ></button>
    </div>
  `,
})
export default class ThemeToggleWithLabelExample {}
