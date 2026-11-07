@php
    $wrap = 'grid rounded-xl border border-line bg-surface px-6 py-4';
    $section = 'py-2';
    $title = 'text-base font-semibold text-ink';
    $text = 'mt-1 text-sm text-muted';
@endphp

<div class="{{ $wrap }}">
    <section class="{{ $section }}">
        <h3 class="{{ $title }}">Release 2.4</h3>
        <p class="{{ $text }}">Stacking cards, pixel trails, and a faster CLI.</p>
    </section>
    <x-markas.elastic-line />
    <section class="{{ $section }}">
        <h3 class="{{ $title }}">Release 2.3</h3>
        <p class="{{ $text }}">Indonesian docs and Rupiah currency input.</p>
    </section>
</div>
