import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import {
  ExpandableCard,
  ExpandableCardMedia,
} from "../../components/expandable-card/expandable-card.component";

@Component({
  selector: "markas-example",
  imports: [Button, ExpandableCard, ExpandableCardMedia],
  template: `
    <div [class]="grid">
      @for (product of products; track product.name) {
        <markas-expandable-card
          [title]="product.name"
          [description]="product.summary"
        >
          <ng-template markasCardMedia>
            <span [class]="art + ' ' + product.tone">
              <svg
                class="size-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path [attr.d]="product.icon" />
              </svg>
            </span>
          </ng-template>
          <button markas-button footer>Add to cart</button>
          <p [class]="price">{{ product.price }}</p>
          <ul [class]="specs">
            @for (spec of product.specs; track spec) {
              <li>{{ spec }}</li>
            }
          </ul>
        </markas-expandable-card>
      }
    </div>
  `,
})
export default class ExpandableCardExample {
  protected readonly grid = "grid grid-cols-2 gap-3";
  protected readonly art = "flex h-full items-center justify-center text-ink";
  protected readonly specs = "grid gap-1 text-muted";
  protected readonly price = "text-base font-semibold text-ink";
  protected readonly products = [
    {
      name: "Desk lamp",
      price: "$48",
      summary: "Warm dimmable light with a weighted brass base.",
      specs: ["Three brightness levels", "USB-C powered", "Ships in 2 days"],
      tone: "bg-primary-soft",
      icon: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11.2V16h6v-1.8A6 6 0 0 0 12 3Z",
    },
    {
      name: "Linen notebook",
      price: "$18",
      summary: "Lay-flat binding and 160 pages of dotted paper.",
      specs: ["A5, 160 pages", "Recycled cover", "Ships tomorrow"],
      tone: "bg-success/15",
      icon: "M6 4h11a1 1 0 0 1 1 1v15H7a1 1 0 0 1-1-1V4Zm0 13h12M10 8h5",
    },
    {
      name: "Ceramic mug",
      price: "$14",
      summary: "Hand-glazed stoneware that keeps coffee warm longer.",
      specs: ["350 ml", "Dishwasher safe", "Ships in 3 days"],
      tone: "bg-warning/15",
      icon: "M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Zm11 2h1.5a2.5 2.5 0 0 1 0 5H16",
    },
    {
      name: "Wool throw",
      price: "$64",
      summary: "Soft merino blanket woven in a classic herringbone.",
      specs: ["130 x 170 cm", "Machine washable", "Ships in 5 days"],
      tone: "bg-subtle",
      icon: "M4 6h16v12H4zM4 10h16M4 14h16",
    },
  ];
}
