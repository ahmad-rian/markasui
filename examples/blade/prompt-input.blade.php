@php
    $panel = 'grid gap-4';
    $title = 'text-center text-lg font-semibold text-ink';
@endphp

<div class="{{ $panel }}">
    <p class="{{ $title }}">What should we build today?</p>
    <x-markas.prompt-input
        :models="['Markas Pro', 'Markas Mini']"
        model="Markas Pro"
        :max-length="500"
        accept="image/*,.pdf"
    />
</div>
