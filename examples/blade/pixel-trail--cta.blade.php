@php
    $card = 'grid gap-4 rounded-xl border border-line bg-subtle p-6';
    $title = 'text-xl font-semibold text-ink';
    $text = 'mt-1 text-sm text-muted';
    $actions = 'flex flex-wrap gap-3';
@endphp

<x-markas.pixel-trail variant="dot" color="success" :cell-size="16" :fade="900" :class="$card">
    <div>
        <h3 class="{{ $title }}">Join 4,000 teams across Indonesia</h3>
        <p class="{{ $text }}">Free for 14 days, then from Rp 49.000 a month.</p>
    </div>
    <div class="{{ $actions }}">
        <x-markas.button>Start free trial</x-markas.button>
        <x-markas.button variant="secondary">Talk to sales</x-markas.button>
    </div>
</x-markas.pixel-trail>
