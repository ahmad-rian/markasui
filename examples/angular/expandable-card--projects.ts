import { Component } from "@angular/core";
import { Badge } from "../../components/badge/badge.component";
import { Button } from "../../components/button/button.component";
import {
  ExpandableCard,
  ExpandableCardMedia,
} from "../../components/expandable-card/expandable-card.component";

@Component({
  selector: "markas-example",
  imports: [Badge, Button, ExpandableCard, ExpandableCardMedia],
  template: `
    <div [class]="grid">
      @for (project of projects; track project.name) {
        <markas-expandable-card
          [title]="project.name"
          [description]="project.summary"
          closeLabel="Close project"
        >
          <ng-template markasCardMedia>
            <span [class]="chart">
              @for (height of project.bars; track $index) {
                <span [class]="bar + ' ' + height"></span>
              }
            </span>
          </ng-template>
          <ng-container footer>
            <button markas-button variant="secondary">Share</button>
            <button markas-button>Open board</button>
          </ng-container>
          <div>
            <span markas-badge [variant]="project.variant">{{
              project.status
            }}</span>
          </div>
          <div [class]="stats">
            <p>
              <span [class]="stat">{{ project.tasks }}</span
              >tasks done
            </p>
            <p>
              <span [class]="stat">{{ project.due }}</span
              >due date
            </p>
          </div>
        </markas-expandable-card>
      }
    </div>
  `,
})
export default class ExpandableCardProjectsExample {
  protected readonly grid = "grid grid-cols-2 gap-3";
  protected readonly chart =
    "flex h-full items-end justify-center gap-2 bg-subtle px-4 pt-10 pb-4";
  protected readonly bar = "w-4 rounded-sm bg-primary/70";
  protected readonly stats = "grid grid-cols-2 gap-2 text-muted";
  protected readonly stat = "block text-base font-semibold text-ink";
  protected readonly projects = [
    {
      name: "Mobile app redesign",
      summary: "New navigation and onboarding for iOS and Android.",
      status: "On track",
      variant: "success" as const,
      bars: ["h-1/3", "h-1/2", "h-2/3", "h-3/4", "h-5/6"],
      tasks: "42 of 58",
      due: "Dec 12",
    },
    {
      name: "Billing migration",
      summary: "Move every workspace to the new invoicing provider.",
      status: "At risk",
      variant: "warning" as const,
      bars: ["h-1/2", "h-1/3", "h-1/2", "h-1/4", "h-1/3"],
      tasks: "17 of 40",
      due: "Nov 28",
    },
  ];
}
