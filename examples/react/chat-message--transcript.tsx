import { ChatMessage } from "../../components/chat-message/ChatMessage";

const log = "grid gap-3";

export default function ChatMessageTranscriptExample() {
  return (
    <div role="log" aria-label="Chat transcript" className={log}>
      <ChatMessage
        from="user"
        actions={false}
        text="Please resend invoice INV-2041."
        time="Mon 08:40"
      />
      <ChatMessage
        actions={false}
        variant="bubble"
        text="Done. A fresh copy went to finance@sinarjaya.co.id."
        time="Mon 08:40"
        assistantLabel="Markas AI"
      />
      <ChatMessage
        from="user"
        actions={false}
        text="Thanks, received it."
        time="Mon 08:43"
      />
    </div>
  );
}
