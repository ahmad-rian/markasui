@php
    $days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
@endphp

<x-markas.scroll-area label="Weekly schedule" orientation="both" class="max-h-60 border border-line bg-surface">
    <div class="grid w-[640px] grid-cols-[4rem_repeat(7,1fr)] text-sm">
        <div class="border-b border-line p-2"></div>
        @foreach ($days as $day)
            <div class="border-b border-line p-2 font-medium text-ink">{{ $day }}</div>
        @endforeach
        @foreach (range(8, 17) as $hour)
            <div class="contents">
                <div class="p-2 text-muted">{{ str_pad((string) $hour, 2, '0', STR_PAD_LEFT) }}:00</div>
                @foreach ($days as $day)
                    <div class="m-1 h-8 rounded-md bg-subtle"></div>
                @endforeach
            </div>
        @endforeach
    </div>
</x-markas.scroll-area>
