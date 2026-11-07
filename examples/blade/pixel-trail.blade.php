@php
    $hero = 'grid h-72 content-center justify-items-center gap-3 rounded-xl border border-line bg-surface p-6 text-center';
    $title = 'max-w-72 text-2xl font-semibold text-ink';
    $text = 'text-sm text-muted';
@endphp

<x-markas.pixel-trail show-grid :class="$hero">
    <h3 class="{{ $title }}">Interfaces that answer the pointer</h3>
    <p class="{{ $text }}">Move across the grid and leave a trail.</p>
    <x-markas.button>Get started</x-markas.button>
</x-markas.pixel-trail>
