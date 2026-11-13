import { Component } from "@angular/core";
import { Carousel } from "../../components/carousel/carousel.component";

@Component({
  selector: "markas-example",
  imports: [Carousel],
  template: `
    <markas-carousel
      label="Apartment photos"
      previousLabel="Previous photo"
      nextLabel="Next photo"
      [items]="photos"
    >
      <ng-template let-photo let-index="index">
        <div
          class="flex h-48 flex-col items-center justify-center gap-2 rounded-xl bg-subtle text-muted"
        >
          <svg
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="m21 16-5-5-9 9" />
          </svg>
          <p class="text-sm">
            {{ photo }}, photo {{ index + 1 }} of {{ photos.length }}
          </p>
        </div>
      </ng-template>
    </markas-carousel>
  `,
})
export default class CarouselGalleryExample {
  protected readonly photos = ["Living room", "Kitchen", "Bedroom", "Garden"];
}
