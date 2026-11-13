import { Component } from "@angular/core";
import { ChatMessage } from "../../components/chat-message/chat-message.component";

@Component({
  selector: "markas-example",
  imports: [ChatMessage],
  template: `
    <div role="log" aria-label="Conversation" [class]="log">
      <markas-chat-message
        from="user"
        text="When is VAT due for my October invoices?"
        time="09:12"
      />
      <markas-chat-message
        stream
        text="VAT for October is due by the end of November. Report it in your monthly return and pay before you file, so the payment code is already on record."
        time="09:12"
        assistantLabel="Markas AI"
      />
    </div>
  `,
})
export default class ChatMessageStreamingExample {
  protected readonly log = "grid gap-4";
}
