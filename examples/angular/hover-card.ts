import { Component } from "@angular/core";
import { HoverCard } from "../../components/hover-card/hover-card.component";

@Component({
  selector: "markas-example",
  imports: [HoverCard],
  template: `
    <div class="flex justify-center py-6">
      <markas-hover-card>
        <a href="https://github.com/markasui" [class]="link">&#64;markasui</a>
        <div content class="flex gap-3">
          <span [class]="badge">
            <svg class="size-6" viewBox="0 0 1464 1430" aria-hidden="true">
              @for (shape of mark; track shape.points) {
                <polygon
                  [attr.points]="shape.points"
                  [attr.class]="shape.class"
                />
              }
            </svg>
          </span>
          <div class="grid gap-1">
            <p class="font-medium text-ink">MarkasUI</p>
            <p class="text-muted">UI components for Blade, React, and Vue.</p>
            <p class="text-xs text-muted">Joined March 2026</p>
          </div>
        </div>
      </markas-hover-card>
    </div>
  `,
})
export default class HoverCardExample {
  protected readonly link =
    "rounded-sm text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  protected readonly badge =
    "grid size-10 shrink-0 place-items-center rounded-full border border-line bg-canvas";
  protected readonly mark = [
    { points: "354,578 1256,138 1171,430 268,868", class: "fill-ink/15" },
    { points: "553,443 1455,3 1370,295 467,733", class: "fill-ink/55" },
    { points: "421,762 1325,318 1240,611 336,1050", class: "fill-success/35" },
    { points: "265,1073 1169,629 1084,922 180,1362", class: "fill-ink/25" },
    { points: "93,965 997,521 912,814 8,1253", class: "fill-ink/75" },
    { points: "347,1135 1251,691 1166,984 262,1424", class: "fill-success" },
  ];
}
