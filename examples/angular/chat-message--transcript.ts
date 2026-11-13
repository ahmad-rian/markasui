import { Component } from "@angular/core";
import { ChatMessage } from "../../components/chat-message/chat-message.component";

@Component({
  selector: "markas-example",
  imports: [ChatMessage],
  template: `
    <div role="log" aria-label="Chat transcript" [class]="log">
      <markas-chat-message
        from="user"
        [actions]="false"
        text="Please resend invoice INV-2041."
        time="Mon 08:40"
      />
      <markas-chat-message
        [actions]="false"
        variant="bubble"
        text="Done. A fresh copy went to finance&#64;sinarjaya.co.id."
        time="Mon 08:40"
        assistantLabel="Markas AI"
      />
      <markas-chat-message
        from="user"
        [actions]="false"
        text="Thanks, received it."
        time="Mon 08:43"
      />
    </div>
  `,
})
export default class ChatMessageTranscriptExample {
  protected readonly log = "grid gap-3";
}
