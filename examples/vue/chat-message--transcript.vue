<script setup lang="ts">
import ChatMessage from "../../components/chat-message/ChatMessage.vue";

const log = "grid gap-3";
</script>

<template>
  <div role="log" aria-label="Chat transcript" :class="log">
    <ChatMessage
      from="user"
      :actions="false"
      text="Please resend invoice INV-2041."
      time="Mon 08:40"
    />
    <ChatMessage
      :actions="false"
      variant="bubble"
      text="Done. A fresh copy went to finance@sinarjaya.co.id."
      time="Mon 08:40"
      assistant-label="Markas AI"
    />
    <ChatMessage
      from="user"
      :actions="false"
      text="Thanks, received it."
      time="Mon 08:43"
    />
  </div>
</template>
