import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";
import { StarsBackground } from "../../components/stars-background/stars-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, Input, StarsBackground],
  template: `
    <div
      markas-stars-background
      count="150"
      seed="3"
      color="muted"
      class="rounded-xl border border-line bg-canvas p-6"
    >
      <form class="grid gap-4">
        <div class="grid gap-1.5">
          <svg class="mb-2 size-8" viewBox="0 0 1464 1430" aria-hidden="true">
            @for (shape of mark; track shape.points) {
              <svg:polygon
                [attr.points]="shape.points"
                [attr.class]="shape.class"
              />
            }
          </svg>
          <h3 class="text-lg font-semibold text-ink">Join the waitlist</h3>
          <p class="text-sm text-muted">
            Be first to try MarkasUI Pro when invites open this spring.
          </p>
        </div>
        <div class="flex items-end gap-2">
          <markas-input
            label="Email"
            type="email"
            placeholder="you@company.com"
            class="flex-1"
          />
          <button markas-button type="submit">Request invite</button>
        </div>
      </form>
    </div>
  `,
})
export default class StarsBackgroundWaitlistExample {
  protected readonly mark = [
    { points: "354,578 1256,138 1171,430 268,868", class: "fill-ink/15" },
    { points: "553,443 1455,3 1370,295 467,733", class: "fill-ink/55" },
    { points: "421,762 1325,318 1240,611 336,1050", class: "fill-success/35" },
    { points: "265,1073 1169,629 1084,922 180,1362", class: "fill-ink/25" },
    { points: "93,965 997,521 912,814 8,1253", class: "fill-ink/75" },
    { points: "347,1135 1251,691 1166,984 262,1424", class: "fill-success" },
  ];
}
