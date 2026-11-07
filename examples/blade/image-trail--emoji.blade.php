@php
    $area = 'grid h-72 content-center justify-items-start gap-3 rounded-xl bg-primary-soft p-8';
    $emoji = 'block text-4xl';
    $foods = ['🍜', '🍢', '🌶️', '🥥', '🍌'];
    $eyebrow = 'text-sm font-medium text-primary';
    $title = 'max-w-64 text-2xl font-semibold text-ink';
    $hint = 'text-sm text-muted';
@endphp

<x-markas.image-trail variant="scale" :threshold="32" :class="$area">
    <x-slot:items>
        @foreach ($foods as $food)
            <span class="{{ $emoji }}">{{ $food }}</span>
        @endforeach
    </x-slot:items>
    <p class="{{ $eyebrow }}">Jl. Braga, Bandung</p>
    <h3 class="{{ $title }}">Weekend street food market</h3>
    <p class="{{ $hint }}">40 stalls, Saturday and Sunday from 4 pm</p>
    <x-markas.button>See the stalls</x-markas.button>
</x-markas.image-trail>
