import { Component } from "@angular/core";
import { LetterSwap } from "../../components/letter-swap/letter-swap.component";

@Component({
  selector: "markas-example",
  imports: [LetterSwap],
  template: `
    <div class="rounded-xl bg-primary p-8 text-on-primary">
      <p class="text-sm opacity-80">Have a project in mind?</p>
      <a
        href="#"
        class="mt-2 inline-block rounded-sm text-3xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-primary"
      >
        <span
          markas-letter-swap
          text="hello@markasui.dev"
          mode="pingpong"
          direction="down"
          stagger="20"
        ></span>
      </a>
    </div>
  `,
})
export default class LetterSwapContactExample {}
