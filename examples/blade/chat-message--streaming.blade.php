@php
    $log = 'grid gap-4';
@endphp

<div role="log" aria-label="Conversation" class="{{ $log }}">
    <x-markas.chat-message from="user" text="When is VAT due for my October invoices?" time="09:12" />
    <x-markas.chat-message
        stream
        text="VAT for October is due by the end of November. Report it in your monthly return and pay before you file, so the payment code is already on record."
        time="09:12"
        assistant-label="Markas AI"
    />
</div>
