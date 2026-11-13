## Blade

```blade
<div role="log" aria-label="Percakapan" class="grid gap-5">
    <x-markas.chat-message from="user" text="Bagaimana menagih klien dalam Rupiah?" time="10.24" user-label="Anda" />
    <x-markas.chat-message
        text="Atur mata uang ke IDR dan tulis setiap item beserta nominalnya."
        time="10.24"
        assistant-label="Markas AI"
        actions-label="Aksi pesan"
        copy-label="Salin"
        copied-label="Tersalin"
        like-label="Jawaban bagus"
        dislike-label="Jawaban buruk"
        regenerate-label="Buat ulang"
    />
    <x-markas.chat-message typing assistant-label="Markas AI" typing-label="Sedang mengetik" />
</div>
```

## React

```tsx
import { ChatMessage } from "@/components/markas/ChatMessage";

<ChatMessage
  text={jawaban}
  assistantLabel="Markas AI"
  copyLabel="Salin"
  copiedLabel="Tersalin"
  likeLabel="Jawaban bagus"
  dislikeLabel="Jawaban buruk"
  regenerateLabel="Buat ulang"
  onFeedback={nilai}
/>;
```

## Vue

```vue
<script setup lang="ts">
import ChatMessage from "@/components/markas/ChatMessage.vue";
</script>

<template>
  <ChatMessage
    from="user"
    text="Bagaimana menagih klien dalam Rupiah?"
    user-label="Anda"
    copy-label="Salin"
    copied-label="Tersalin"
  />
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

Custom element kecil menjalankan streaming, menyalin teks, dan mengganti rating. Ia mengirim `markas-feedback` (nilai baru sebagai detail) dan `markas-regenerate`, keduanya menggelembung.

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

## Catatan

- Baris aksi muncul saat kursor di atas pesan atau fokus ada di dalamnya, jadi percakapan tetap rapi.
- Copy menampilkan centang selama dua detik. Like dan dislike saling eksklusif dan memicu feedback dengan nilai barunya.
- stream memunculkan teks kata demi kata dengan kursor. Bila text bertambah saat streaming, kemunculan berlanjut sampai akhir yang baru.
- Reduced motion mematikan streaming, denyut titik, dan efek pudar.
