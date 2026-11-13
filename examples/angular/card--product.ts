import { Component } from "@angular/core";
import { Badge } from "../../components/badge/badge.component";
import { Button } from "../../components/button/button.component";
import { Card } from "../../components/card/card.component";

@Component({
  selector: "markas-example",
  imports: [Badge, Button, Card],
  template: `
    <article markas-card class="mx-auto max-w-xs">
      <div
        class="flex aspect-[4/3] items-center justify-center rounded-lg bg-subtle text-faint"
      >
        <svg
          class="size-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 7h12l1 13H5L6 7zm3 0V6a3 3 0 0 1 6 0v1" />
        </svg>
      </div>
      <div class="mt-4 flex items-start justify-between gap-3">
        <div class="grid gap-1">
          <h3 class="text-base font-semibold text-ink">Linen tote bag</h3>
          <p class="text-muted">Natural, 38 x 42 cm</p>
        </div>
        <p class="text-base font-semibold text-ink">$32.00</p>
      </div>
      <div class="mt-3">
        <span markas-badge variant="success">In stock</span>
      </div>
      <button markas-button footer class="w-full">Add to cart</button>
    </article>
  `,
})
export default class CardProductExample {}
