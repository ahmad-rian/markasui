import { Component } from "@angular/core";
import { CardStack } from "../../components/card-stack/card-stack.component";

@Component({
  selector: "markas-example",
  imports: [CardStack],
  template: `
    <markas-card-stack
      label="Suggested teammates"
      prevLabel="Previous person"
      nextLabel="Next person"
      class="mx-auto max-w-xs"
      [items]="people"
    >
      <ng-template let-person>
        <div [class]="card">
          <span aria-hidden="true" [class]="avatar">{{ person.initials }}</span>
          <div>
            <p [class]="name">{{ person.name }}</p>
            <p [class]="role">{{ person.role }}</p>
          </div>
          <ul [class]="tags">
            @for (skill of person.skills; track skill) {
              <li [class]="tag">{{ skill }}</li>
            }
          </ul>
        </div>
      </ng-template>
    </markas-card-stack>
  `,
})
export default class CardStackProfilesExample {
  protected readonly card =
    "grid h-full justify-items-center gap-3 p-6 text-center";
  protected readonly avatar =
    "inline-flex size-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-on-primary";
  protected readonly name = "text-base font-semibold text-ink";
  protected readonly role = "text-sm text-muted";
  protected readonly tags = "flex flex-wrap justify-center gap-1.5";
  protected readonly tag =
    "rounded-full bg-subtle px-2.5 py-0.5 text-xs text-ink";
  protected readonly people = [
    {
      name: "Rina Kusuma",
      initials: "RK",
      role: "Product designer in Jakarta",
      skills: ["Figma", "Design systems", "Research"],
    },
    {
      name: "Liam Carter",
      initials: "LC",
      role: "Frontend engineer in Toronto",
      skills: ["React", "Accessibility", "Testing"],
    },
    {
      name: "Ayu Lestari",
      initials: "AL",
      role: "Data analyst in Bandung",
      skills: ["SQL", "Python", "Dashboards"],
    },
  ];
}
