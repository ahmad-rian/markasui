import { Component } from "@angular/core";
import { ScrollProgress } from "../../components/scroll-progress/scroll-progress.component";

@Component({
  selector: "markas-example",
  imports: [ScrollProgress],
  template: `
    <div
      role="log"
      aria-label="Conversation"
      tabindex="0"
      class="relative h-52 overflow-y-auto rounded-xl border border-line bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div
        markas-scroll-progress
        target="parent"
        color="success"
        size="md"
      ></div>
      <ul class="space-y-2 p-4">
        @for (message of messages; track message; let even = $even) {
          <li [class]="even ? mine : theirs">{{ message }}</li>
        }
      </ul>
    </div>
  `,
})
export default class ScrollProgressChatExample {
  protected readonly messages = [
    "Hi, the invoice for October is ready.",
    "Thanks. Can you add the design hours too?",
    "Sure, I added 12 hours for the dashboard work.",
    "Perfect. Please send it to finance by Friday.",
    "Sent. They confirmed it this morning.",
    "Great, closing this thread then.",
  ];
  protected readonly mine =
    "mr-12 rounded-lg bg-subtle px-3 py-2 text-sm text-ink";
  protected readonly theirs =
    "ml-12 rounded-lg bg-primary px-3 py-2 text-sm text-on-primary";
}
