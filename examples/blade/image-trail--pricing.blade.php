@php
    $area = 'grid h-64 content-center justify-items-center rounded-xl bg-ink p-6 text-center text-canvas';
    $chip = 'block rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium whitespace-nowrap text-ink';
    $perks = ['Rp 49.000', 'Free for 14 days', 'Rp 149.000', 'Cancel anytime'];
    $title = 'text-2xl font-semibold';
    $hint = 'mt-1 mb-4 text-sm text-canvas/70';
@endphp

<x-markas.image-trail variant="rotate" :threshold="48" :duration="1000" autoplay :class="$area">
    <x-slot:items>
        @foreach ($perks as $perk)
            <span class="{{ $chip }}">{{ $perk }}</span>
        @endforeach
    </x-slot:items>
    <h3 class="{{ $title }}">Plans from Rp 49.000 a month</h3>
    <p class="{{ $hint }}">Every plan includes all three frameworks</p>
    <x-markas.button>Start free trial</x-markas.button>
</x-markas.image-trail>
