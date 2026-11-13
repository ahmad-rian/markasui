import { Component } from "@angular/core";
import { ChatMessage } from "../../components/chat-message/chat-message.component";

@Component({
  selector: "markas-example",
  imports: [ChatMessage],
  template: `
    <div role="log" aria-label="Conversation" [class]="log">
      <markas-chat-message
        from="user"
        text="Can you draft an invoice in Rupiah for a website project?"
        time="10:24"
      />
      <markas-chat-message
        [text]="answer"
        time="10:24"
        assistantLabel="Markas AI"
      />
      <markas-chat-message
        from="user"
        text="Add a 14 day payment term, please."
        time="10:25"
      />
      <markas-chat-message typing assistantLabel="Markas AI" />
    </div>
  `,
})
export default class ChatMessageExample {
  protected readonly log = "grid gap-4";
  protected readonly answer =
    "Sure. Here is a simple layout for it:\nDesign and build, Rp 12.500.000\nVAT 11%, Rp 1.375.000\nTotal due, Rp 13.875.000";
}
