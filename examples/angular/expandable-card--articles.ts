import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { ExpandableCard } from "../../components/expandable-card/expandable-card.component";

@Component({
  selector: "markas-example",
  imports: [Button, ExpandableCard],
  template: `
    <div [class]="list">
      @for (article of articles; track article.title) {
        <markas-expandable-card
          [title]="article.title"
          [description]="article.summary"
        >
          <button markas-button footer variant="secondary">
            Read full article
          </button>
          <p>{{ article.body }}</p>
          <p [class]="meta">{{ article.meta }}</p>
        </markas-expandable-card>
      }
    </div>
  `,
})
export default class ExpandableCardArticlesExample {
  protected readonly list = "grid gap-3";
  protected readonly meta = "text-muted";
  protected readonly articles = [
    {
      title: "Designing calm notifications",
      summary:
        "Why fewer, smarter alerts keep people focused, and how we cut ours by half without losing anything important.",
      body: "We grouped alerts by urgency, moved low-priority updates into a daily digest, and let people snooze whole projects.",
      meta: "6 min read · Product",
    },
    {
      title: "A field guide to empty states",
      summary:
        "Empty screens are the first thing new users see. Here are five patterns that turn them into a helpful start.",
      body: "Show a preview of what the screen will look like, offer one clear action, and never blame the user for having no data yet.",
      meta: "4 min read · Design",
    },
    {
      title: "Shipping faster with smaller pull requests",
      summary:
        "Our median review time dropped from two days to four hours after we capped pull requests at 300 lines.",
      body: "Small changes are easier to review, easier to revert, and keep the main branch moving every day.",
      meta: "8 min read · Engineering",
    },
  ];
}
