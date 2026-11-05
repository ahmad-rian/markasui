<x-markas.scroll-area label="Recently played" orientation="horizontal">
    <div class="flex gap-3 pb-3">
        @foreach (['Morning light', 'City nights', 'Slow mornings', 'Coastline', 'Weekend drive', 'Rain sounds'] as $album)
            <div class="w-32 shrink-0">
                <div class="h-32 rounded-lg bg-subtle"></div>
                <p class="mt-2 truncate text-sm font-medium text-ink">{{ $album }}</p>
            </div>
        @endforeach
    </div>
</x-markas.scroll-area>
