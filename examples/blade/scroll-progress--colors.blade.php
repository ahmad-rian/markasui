@php
    $panels = [
        ['color' => 'primary', 'title' => 'Draft'],
        ['color' => 'warning', 'title' => 'In review'],
        ['color' => 'danger', 'title' => 'Blocked'],
    ];
@endphp

<div class="grid grid-cols-3 gap-3">
    @foreach ($panels as $panel)
        <div role="region" aria-label="{{ $panel['title'] }}" tabindex="0" class="relative h-32 overflow-y-auto rounded-lg border border-line bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <x-markas.scroll-progress target="parent" :color="$panel['color']" size="md" />
            <div class="p-3 text-xs text-muted">
                <p class="text-sm font-medium text-ink">{{ $panel['title'] }}</p>
                <p class="mt-2">Scroll this panel to fill the bar above it.</p>
                <p class="mt-2">The bar color follows the status of the list.</p>
                <p class="mt-2">Set size for a thicker bar.</p>
            </div>
        </div>
    @endforeach
</div>
