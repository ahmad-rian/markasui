import { Component } from "@angular/core";
import { ImageTrail } from "../../components/image-trail/image-trail.component";

@Component({
  selector: "markas-example",
  imports: [ImageTrail],
  template: `
    <markas-image-trail
      variant="stack"
      [threshold]="56"
      [max]="6"
      [class]="area"
    >
      <ng-container items>
        @for (person of people; track person.initials) {
          <span [class]="person.avatar">{{ person.initials }}</span>
        }
      </ng-container>
      <h3 [class]="title">Meet the people behind Markas</h3>
      <p [class]="names">Rania, Dimas, Sekar, and Bayu</p>
    </markas-image-trail>
  `,
})
export default class ImageTrailTeamExample {
  protected readonly area =
    "grid h-72 content-center justify-items-center rounded-xl border border-line bg-surface p-6 text-center";
  protected readonly people = [
    {
      initials: "RP",
      avatar:
        "grid size-14 place-items-center rounded-full bg-primary text-base font-semibold text-on-primary",
    },
    {
      initials: "DS",
      avatar:
        "grid size-14 place-items-center rounded-full bg-primary-soft text-base font-semibold text-primary",
    },
    {
      initials: "SW",
      avatar:
        "grid size-14 place-items-center rounded-full border border-line bg-subtle text-base font-semibold text-ink",
    },
    {
      initials: "BA",
      avatar:
        "grid size-14 place-items-center rounded-full bg-ink text-base font-semibold text-canvas",
    },
  ];
  protected readonly title = "text-xl font-semibold text-ink";
  protected readonly names = "mt-2 text-sm text-muted";
}
