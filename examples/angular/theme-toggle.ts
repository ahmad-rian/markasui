import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { ThemeToggle } from "../../components/theme-toggle/theme-toggle.component";

@Component({
  selector: "markas-example",
  imports: [Button, ThemeToggle],
  template: `
    <div class="flex flex-col items-center gap-5">
      <div class="grid w-full grid-cols-6 gap-2">
        <div class="flex flex-col items-center gap-2">
          <button
            markas-theme-toggle
            animation="rotate"
            variant="outline"
            size="lg"
          ></button>
          <span class="text-xs text-muted">Rotate</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            markas-theme-toggle
            animation="morph"
            variant="outline"
            size="lg"
          ></button>
          <span class="text-xs text-muted">Morph</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            markas-theme-toggle
            animation="flip"
            variant="outline"
            size="lg"
          ></button>
          <span class="text-xs text-muted">Flip</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            markas-theme-toggle
            animation="slide"
            variant="outline"
            size="lg"
          ></button>
          <span class="text-xs text-muted">Slide</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            markas-theme-toggle
            animation="eclipse"
            variant="outline"
            size="lg"
          ></button>
          <span class="text-xs text-muted">Eclipse</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <button
            markas-theme-toggle
            animation="spring"
            variant="outline"
            size="lg"
          ></button>
          <span class="text-xs text-muted">Spring</span>
        </div>
      </div>
      <button markas-button variant="secondary" size="sm" (click)="playAll()">
        Play all
      </button>
    </div>
  `,
})
export default class ThemeToggleExample {
  /** Plays every toggle there and back without changing the page theme. */
  protected playAll() {
    document.dispatchEvent(new Event("markas-theme-demo"));
  }
}
