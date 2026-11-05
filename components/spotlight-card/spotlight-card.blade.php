@props([
    'color' => 'primary',
])

@php
    $root = 'group/spotlight relative isolate rounded-xl bg-line p-px [--spot-x:50%] [--spot-y:50%]';
    $glow = 'pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(240px_circle_at_var(--spot-x)_var(--spot-y),var(--spot-color),transparent_100%)] opacity-0 transition-opacity duration-300 ease-out group-focus-within/spotlight:opacity-100 group-hover/spotlight:opacity-100 motion-reduce:transition-none';
    $inner = 'relative h-full overflow-hidden rounded-[11px] bg-surface';
    $light = 'pointer-events-none absolute inset-0 bg-[radial-gradient(320px_circle_at_var(--spot-x)_var(--spot-y),color-mix(in_oklab,var(--spot-color)_12%,transparent),transparent_100%)] opacity-0 transition-opacity duration-300 ease-out group-focus-within/spotlight:opacity-100 group-hover/spotlight:opacity-100 motion-reduce:transition-none';
    $content = 'relative';
    $colors = [
        'primary' => '[--spot-color:var(--color-primary)]',
        'success' => '[--spot-color:var(--color-success)]',
        'warning' => '[--spot-color:var(--color-warning)]',
        'danger' => '[--spot-color:var(--color-danger)]',
    ];
@endphp

{{-- Simpan posisi kursor relatif terhadap kartu sebagai CSS custom property. --}}
<div
    x-data
    @pointermove="
        const rect = $el.getBoundingClientRect();
        $el.style.setProperty('--spot-x', ($event.clientX - rect.left) + 'px');
        $el.style.setProperty('--spot-y', ($event.clientY - rect.top) + 'px');
    "
    {{ $attributes->class([$root, $colors[$color]]) }}
>
    <div aria-hidden="true" class="{{ $glow }}"></div>
    <div class="{{ $inner }}">
        <div aria-hidden="true" class="{{ $light }}"></div>
        <div class="{{ $content }}">{{ $slot }}</div>
    </div>
</div>
