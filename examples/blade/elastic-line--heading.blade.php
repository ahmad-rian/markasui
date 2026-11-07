@php
    $wrap = 'grid justify-items-start py-4';
    $eyebrow = 'text-sm font-medium text-primary';
    $title = 'mt-1 text-3xl font-semibold text-ink';
    $line = 'w-48';
    $text = 'max-w-80 text-sm text-muted';
@endphp

<div class="{{ $wrap }}">
    <p class="{{ $eyebrow }}">New in Markas</p>
    <h3 class="{{ $title }}">Build faster, ship calmer</h3>
    <x-markas.elastic-line variant="pluck" color="primary" :stroke-width="3" :reach="16" play-on-view decorative :class="$line" />
    <p class="{{ $text }}">Touch the underline and pull: it slips free and vibrates like a string.</p>
</div>
