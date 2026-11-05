@php
    $panel = 'grid gap-4';
    $heading = 'grid gap-1';
    $title = 'text-base font-semibold text-ink';
    $text = 'text-sm text-muted';
@endphp

<div class="{{ $panel }}">
    <div class="{{ $heading }}">
        <p class="{{ $title }}">Support the village library</p>
        <p class="{{ $text }}">Every rupiah goes to new books for 300 students.</p>
    </div>
    <x-markas.currency-input
        label="Donation amount"
        name="donation"
        placeholder="0"
        :min="5000"
        hint="Minimum Rp5.000"
        :presets="[25000, 50000, 100000, 1500000]"
        presets-label="Suggested donations"
    />
    <x-markas.button variant="secondary">Continue to payment</x-markas.button>
</div>
