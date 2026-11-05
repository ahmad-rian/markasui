<x-markas.scroll-area label="Releases" class="max-h-56 border border-line bg-surface">
    <div class="p-4">
        <p class="mb-2 text-sm font-medium text-ink">Releases</p>
        @foreach (range(12, 1) as $minor)
            <p class="border-t border-line py-2 text-sm text-muted">v2.{{ $minor }}.0</p>
        @endforeach
    </div>
</x-markas.scroll-area>
