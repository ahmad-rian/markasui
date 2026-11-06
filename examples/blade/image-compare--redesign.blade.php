@php
    $oldPanel = 'grid h-60 content-start gap-3 bg-subtle px-5 pt-14';
    $oldText = 'text-sm text-muted';
    $oldCards = 'grid grid-cols-3 gap-2';
    $oldCard = 'h-12 border border-line bg-surface';
    $oldChart = 'flex h-16 items-end gap-1';
    $oldBar = 'w-6 bg-faint/40';
    $newPanel = 'grid h-60 content-start gap-5 bg-surface px-5 pt-14';
    $newHeader = 'flex items-baseline justify-between gap-4';
    $newLabel = 'text-sm text-muted';
    $newValue = 'flex items-baseline gap-2 text-2xl font-semibold text-ink';
    $newBadge = 'text-sm font-medium text-success';
    $newChart = 'flex h-20 items-end gap-2';
    $newBar = 'flex-1 rounded-t-md bg-primary/80';
    $newLast = 'flex-1 rounded-t-md bg-success';

    $bars = ['h-[40%]', 'h-[65%]', 'h-[50%]', 'h-[80%]', 'h-[60%]', 'h-[90%]'];
@endphp

<x-markas.image-compare aria-label="Revenue widget redesign" before-label="Old" after-label="New">
    <x-slot:before>
        <div class="{{ $oldPanel }}">
            <p class="{{ $oldText }}">Revenue: 48210 USD</p>
            <div class="{{ $oldCards }}">
                <div class="{{ $oldCard }}"></div>
                <div class="{{ $oldCard }}"></div>
                <div class="{{ $oldCard }}"></div>
            </div>
            <div class="{{ $oldChart }}">
                @foreach ($bars as $height)
                    <div class="{{ $oldBar }} {{ $height }}"></div>
                @endforeach
            </div>
        </div>
    </x-slot:before>
    <x-slot:after>
        <div class="{{ $newPanel }}">
            <div class="{{ $newHeader }}">
                <p class="{{ $newLabel }}">Revenue this month</p>
                <p class="{{ $newValue }}">$48,210 <span class="{{ $newBadge }}">+12%</span></p>
            </div>
            <div class="{{ $newChart }}">
                @foreach ($bars as $index => $height)
                    <div class="{{ $index === count($bars) - 1 ? $newLast : $newBar }} {{ $height }}"></div>
                @endforeach
            </div>
        </div>
    </x-slot:after>
</x-markas.image-compare>
