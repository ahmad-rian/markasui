import { Component } from "@angular/core";
import { ChatMessage } from "../../components/chat-message/chat-message.component";

@Component({
  selector: "markas-example",
  imports: [ChatMessage],
  template: `
    <div role="log" aria-label="Support chat" [class]="log">
      <markas-chat-message
        from="user"
        text="My invoice shows Rp 0 for shipping. Is that right?"
        time="14:02"
      />
      <markas-chat-message
        variant="bubble"
        text="Yes. Orders above Rp 500.000 ship for free, so the shipping line stays at Rp 0."
        time="14:02"
        assistantLabel="Support bot"
      />
    </div>
  `,
})
export default class ChatMessageBubbleExample {
  protected readonly log =
    "grid gap-4 rounded-xl border border-line bg-surface p-4";
}
