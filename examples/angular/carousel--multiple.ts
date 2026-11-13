import { Component } from "@angular/core";
import { Carousel } from "../../components/carousel/carousel.component";

@Component({
  selector: "markas-example",
  imports: [Carousel],
  template: `
    <markas-carousel label="Popular products" [perView]="2" [items]="products">
      <ng-template let-product>
        <div class="rounded-xl border border-line bg-surface p-4">
          <div class="h-24 rounded-lg bg-subtle"></div>
          <p class="mt-3 text-sm font-medium text-ink">{{ product.name }}</p>
          <p class="text-sm text-muted">{{ product.price }}</p>
        </div>
      </ng-template>
    </markas-carousel>
  `,
})
export default class CarouselMultipleExample {
  protected readonly products = [
    { name: "Desk lamp", price: "$48" },
    { name: "Notebook set", price: "$18" },
    { name: "Wool throw", price: "$64" },
    { name: "Ceramic mug", price: "$14" },
  ];
}
