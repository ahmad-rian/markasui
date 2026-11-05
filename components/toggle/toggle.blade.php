@props([
    'variant' => 'default',
    'size' => 'md',
    'pressed' => false,
])

@php
    $base = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-subtle data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0';
    $variants = [
        'default' => 'bg-transparent',
        'outline' => 'border border-line bg-surface',
    ];
    $sizes = [
        'sm' => 'h-8 min-w-8 px-2',
        'md' => 'h-9 min-w-9 px-2.5',
        'lg' => 'h-10 min-w-10 px-3',
    ];
@endphp

<button
    x-data="{ pressed: @js((bool) $pressed) }"
    x-on:click="pressed = !pressed"
    x-bind:aria-pressed="pressed ? 'true' : 'false'"
    x-bind:data-state="pressed ? 'on' : 'off'"
    aria-pressed="{{ $pressed ? 'true' : 'false' }}"
    data-state="{{ $pressed ? 'on' : 'off' }}"
    {{ $attributes->merge(['type' => 'button'])->class([$base, $variants[$variant], $sizes[$size]]) }}
>
    {{ $slot }}
</button>
