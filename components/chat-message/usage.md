## Blade

```blade
<div role="log" aria-label="Conversation" class="grid gap-5">
    <x-markas.chat-message from="user" text="How do I bill a client in Rupiah?" time="10:24" />
    <x-markas.chat-message
        text="Set the currency to IDR and list each item with its amount."
        time="10:24"
        assistant-label="Markas AI"
        x-on:feedback="rate($event.detail)"
        x-on:regenerate="retry()"
    />
    <x-markas.chat-message typing assistant-label="Markas AI" />
</div>
```

## React

```tsx
import { ChatMessage } from "@/components/markas/ChatMessage";

<div role="log" aria-label="Conversation" className="grid gap-5">
  <ChatMessage
    from="user"
    text="How do I bill a client in Rupiah?"
    time="10:24"
  />
  <ChatMessage
    text={answer}
    time="10:24"
    assistantLabel="Markas AI"
    stream
    onFeedback={rate}
    onRegenerate={retry}
  />
</div>;
```

## Vue

```vue
<script setup lang="ts">
import ChatMessage from "@/components/markas/ChatMessage.vue";
</script>

<template>
  <div role="log" aria-label="Conversation" class="grid gap-5">
    <ChatMessage
      from="user"
      text="How do I bill a client in Rupiah?"
      time="10:24"
    />
    <ChatMessage
      :text="answer"
      assistant-label="Markas AI"
      variant="bubble"
      @feedback="rate"
      @regenerate="retry"
    />
  </div>
</template>
```

## Svelte

```svelte
<script lang="ts">
  import ChatMessage from "$lib/components/markas/ChatMessage.svelte";
</script>

<div role="log" aria-label="Conversation" class="grid gap-5">
  <ChatMessage
    from="user"
    text="How do I bill a client in Rupiah?"
    time="10:24"
  />
  <ChatMessage
    text={answer}
    time="10:24"
    assistantLabel="Markas AI"
    stream
    onFeedback={rate}
    onRegenerate={retry}
  />
</div>
```

## Astro

```astro
---
import ChatMessage from "@/components/markas/ChatMessage.astro";
---

<div role="log" aria-label="Conversation" class="grid gap-5">
  <ChatMessage from="user" text="How do I bill a client in Rupiah?" time="10:24" />
  <ChatMessage text={answer} time="10:24" assistantLabel="Markas AI" stream />
</div>
```

A small custom element streams the text, copies it, and toggles the rating. It dispatches `markas-feedback` (the new value as detail) and `markas-regenerate`, both bubbling.

## Angular

```ts
import { Component } from "@angular/core";
import { ChatMessage } from "./markas/chat-message.component";

@Component({
  selector: "app-conversation",
  imports: [ChatMessage],
  template: `
    <div role="log" aria-label="Conversation" class="grid gap-5">
      <markas-chat-message
        from="user"
        text="How do I bill a client in Rupiah?"
      />
      <markas-chat-message
        [text]="answer"
        assistantLabel="Markas AI"
        stream
        (feedback)="rate($event)"
        (regenerate)="retry()"
      />
    </div>
  `,
})
export class Conversation {
  answer = "Add the amount in Rupiah and a payment term.";
  rate(value: "like" | "dislike" | null) {}
  retry() {}
}
```

## Notes

- The action row fades in when the pointer is over the message or focus is inside it, so it never clutters the conversation.
- Copy shows a check for two seconds. Like and dislike are exclusive toggles and fire feedback with the new value.
- stream reveals the text one word at a time with a caret. If text grows while streaming, the reveal carries on to the new end.
- Reduced motion turns off the streaming, the dots pulse, and the fades.
