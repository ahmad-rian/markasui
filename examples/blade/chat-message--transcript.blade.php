@php
    $log = 'grid gap-3';
@endphp

<div role="log" aria-label="Chat transcript" class="{{ $log }}">
    <x-markas.chat-message from="user" :actions="false" text="Please resend invoice INV-2041." time="Mon 08:40" />
    <x-markas.chat-message
        :actions="false"
        variant="bubble"
        text="Done. A fresh copy went to finance@sinarjaya.co.id."
        time="Mon 08:40"
        assistant-label="Markas AI"
    />
    <x-markas.chat-message from="user" :actions="false" text="Thanks, received it." time="Mon 08:43" />
</div>
