@php
    $area = 'grid h-72 content-center justify-items-center rounded-xl border border-line bg-subtle p-6 text-center';
    $cards = [
        'block h-20 w-16 rounded-lg bg-primary',
        'block h-20 w-16 rounded-lg bg-success',
        'block h-20 w-16 rounded-lg bg-warning',
        'block h-20 w-16 rounded-lg bg-danger',
        'block h-20 w-16 rounded-lg bg-primary-soft',
    ];
    $title = 'text-lg font-semibold text-ink';
    $hint = 'mt-1 text-sm text-muted';
@endphp

<x-markas.image-trail :class="$area">
    <x-slot:items>
        @foreach ($cards as $card)
            <span class="{{ $card }}"></span>
        @endforeach
    </x-slot:items>
    <p class="{{ $title }}">Move your cursor here</p>
    <p class="{{ $hint }}">Color cards follow the pointer and fade away</p>
</x-markas.image-trail>
