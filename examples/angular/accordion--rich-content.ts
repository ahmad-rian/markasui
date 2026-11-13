import { Component } from "@angular/core";
import { Accordion } from "../../components/accordion/accordion.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [Accordion, Button],
  template: `
    <ng-template #pro>
      <div class="grid gap-3">
        <ul class="grid list-disc gap-1 pl-5">
          <li>Up to 10 team members</li>
          <li>50 GB of storage</li>
          <li>Priority email support</li>
        </ul>
        <div>
          <button markas-button variant="secondary" size="sm">
            Compare plans
          </button>
        </div>
      </div>
    </ng-template>
    <markas-accordion
      [items]="[
        {
          value: 'pro',
          title: 'What is included in the Pro plan?',
          content: pro,
        },
        {
          value: 'upgrade',
          title: 'How do I upgrade?',
          content: 'Open the billing page and choose a new plan.',
        },
      ]"
      defaultValue="pro"
    />
  `,
})
export default class AccordionRichContentExample {}
