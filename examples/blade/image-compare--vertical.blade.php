@php
    $panel = 'flex h-64 items-center gap-5 bg-surface p-6';
    $sketchImage = 'aspect-square w-28 shrink-0 rounded-lg border-2 border-dashed border-line';
    $sketchBody = 'grid flex-1 gap-2.5';
    $sketchLine = 'h-3 rounded-sm border-2 border-dashed border-line';
    $sketchButton = 'mt-2 h-9 w-28 rounded-lg border-2 border-dashed border-line';
    $image = 'grid aspect-square w-28 shrink-0 place-items-center rounded-lg bg-linear-to-br from-warning/40 to-danger/25 text-ink';
    $icon = 'size-10';
    $body = 'grid flex-1 gap-1';
    $title = 'text-base font-semibold text-ink';
    $text = 'text-sm text-muted';
    $price = 'mt-1 text-sm font-semibold text-ink';
    $button = 'mt-2 inline-flex h-9 w-28 items-center justify-center rounded-lg bg-primary text-sm font-medium text-on-primary';
@endphp

<x-markas.image-compare orientation="vertical" :position="45" aria-label="Product card, wireframe and final design" before-label="Wireframe" after-label="Final">
    <x-slot:before>
        <div class="{{ $panel }}">
            <div class="{{ $sketchImage }}"></div>
            <div class="{{ $sketchBody }}">
                <div class="{{ $sketchLine }} w-3/4"></div>
                <div class="{{ $sketchLine }} w-full"></div>
                <div class="{{ $sketchLine }} w-1/3"></div>
                <div class="{{ $sketchButton }}"></div>
            </div>
        </div>
    </x-slot:before>
    <x-slot:after>
        <div class="{{ $panel }}">
            <div class="{{ $image }}">
                <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 2v3M11 2v3" /></svg>
            </div>
            <div class="{{ $body }}">
                <p class="{{ $title }}">Ceramic pour-over</p>
                <p class="{{ $text }}">Hand glazed, holds 600 ml.</p>
                <p class="{{ $price }}">$34</p>
                <span class="{{ $button }}">Add to cart</span>
            </div>
        </div>
    </x-slot:after>
</x-markas.image-compare>
