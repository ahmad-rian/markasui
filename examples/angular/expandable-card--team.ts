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
      @for (person of team; track person.name) {
        <markas-expandable-card
          [title]="person.name"
          [description]="person.role"
        >
          <ng-template markasCardMedia>
            <span [class]="portrait">
              <span aria-hidden="true" [class]="avatar">{{
                person.initials
              }}</span>
            </span>
          </ng-template>
          <button markas-button footer>Send message</button>
          <p>{{ person.bio }}</p>
          <p [class]="contact">{{ person.email }}</p>
        </markas-expandable-card>
      }
    </div>
  `,
})
export default class ExpandableCardTeamExample {
  protected readonly grid = "grid grid-cols-3 gap-3";
  protected readonly portrait =
    "flex h-full items-center justify-center bg-primary-soft";
  protected readonly avatar =
    "inline-flex size-14 items-center justify-center rounded-full bg-primary text-base font-semibold text-on-primary";
  protected readonly contact = "text-muted";
  protected readonly team = [
    {
      name: "Nadia Rahma",
      initials: "NR",
      role: "Engineering lead",
      bio: "Leads the platform team and loves a well-written postmortem.",
      email: "nadia@example.com",
    },
    {
      name: "Owen Park",
      initials: "OP",
      role: "Product designer",
      bio: "Sketches every flow on paper before opening a design tool.",
      email: "owen@example.com",
    },
    {
      name: "Putu Arya",
      initials: "PA",
      role: "Customer success",
      bio: "Turns tricky support tickets into product improvements.",
      email: "putu@example.com",
    },
  ];
}
