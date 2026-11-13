import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { HeroHighlight } from "../../components/hero-highlight/hero-highlight.component";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Button, HeroHighlight, Input],
  template: `
    <div
      markas-hero-highlight
      color="warning"
      [spacing]="20"
      [radius]="200"
      class="dark rounded-xl bg-canvas px-6 py-10 text-ink"
    >
      <form class="mx-auto grid max-w-80 gap-4">
        <h3 class="text-2xl leading-snug font-semibold text-ink">
          Join <mark>4,000 makers</mark> shipping every week
        </h3>
        <markas-input
          label="Work email"
          type="email"
          placeholder="you&#64;studio.com"
        />
        <button markas-button type="submit">Create account</button>
      </form>
    </div>
  `,
})
export default class HeroHighlightSignUpExample {}
