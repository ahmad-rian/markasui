@php
    $log = 'grid gap-4 rounded-xl border border-line bg-surface p-4';
@endphp

<div role="log" aria-label="Support chat" class="{{ $log }}">
    <x-markas.chat-message from="user" text="My invoice shows Rp 0 for shipping. Is that right?" time="14:02" />
    <x-markas.chat-message
        variant="bubble"
        text="Yes. Orders above Rp 500.000 ship for free, so the shipping line stays at Rp 0."
        time="14:02"
        assistant-label="Support bot"
    />
</div>
