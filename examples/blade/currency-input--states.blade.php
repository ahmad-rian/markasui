@php
    $stack = 'grid gap-5';
@endphp

<div class="{{ $stack }}">
    <x-markas.currency-input label="Transfer amount" error="Amount exceeds your daily limit of Rp5.000.000" :value="7500000" />
    <x-markas.currency-input label="Admin fee" :value="2500" disabled />
    <x-markas.currency-input label="Opening balance" placeholder="0" />
</div>
