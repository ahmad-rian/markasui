@php
    $pad = 'grid h-64 content-end rounded-xl border border-dashed border-line bg-canvas p-4';
    $title = 'text-sm font-semibold text-ink';
    $text = 'text-sm text-muted';
@endphp

<x-markas.pixel-trail variant="brush" color="warning" :cell-size="12" :fade="1500" autoplay :class="$pad">
    <p class="{{ $title }}">Sketch pad</p>
    <p class="{{ $text }}">Draw with your cursor. It doodles on its own too.</p>
</x-markas.pixel-trail>
