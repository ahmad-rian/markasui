@php
    $log = 'grid gap-4';
    $answer = "Sure. Here is a simple layout for it:\nDesign and build, Rp 12.500.000\nVAT 11%, Rp 1.375.000\nTotal due, Rp 13.875.000";
@endphp

<div role="log" aria-label="Conversation" class="{{ $log }}">
    <x-markas.chat-message from="user" text="Can you draft an invoice in Rupiah for a website project?" time="10:24" />
    <x-markas.chat-message :text="$answer" time="10:24" assistant-label="Markas AI" />
    <x-markas.chat-message from="user" text="Add a 14 day payment term, please." time="10:25" />
    <x-markas.chat-message typing assistant-label="Markas AI" />
</div>
