@php
    $stage = 'grid place-items-center py-8';
    $card = 'grid aspect-[1.586/1] w-80 content-between bg-linear-to-br from-primary to-primary-strong p-6 text-on-primary';
    $row = 'flex items-center justify-between';
    $brand = 'text-base font-semibold';
    $tier = 'rounded-full bg-on-primary/15 px-2.5 py-0.5 text-xs font-medium';
    $chip = 'h-8 w-11 rounded-md bg-linear-to-br from-warning to-warning/50';
    $number = 'text-lg font-medium tracking-widest tabular-nums';
    $footer = 'flex items-end justify-between text-sm font-medium';
    $caption = 'block text-xs font-normal text-on-primary/70';
@endphp

<div class="{{ $stage }}">
    <x-markas.tilt-card :class="$card">
        <div class="{{ $row }}">
            <span class="{{ $brand }}">Markas</span>
            <span class="{{ $tier }}">Gold member</span>
        </div>
        <div data-depth="14" class="{{ $chip }}"></div>
        <p data-depth="8" class="{{ $number }}">0042 1987 5531</p>
        <div class="{{ $footer }}">
            <p><span class="{{ $caption }}">Member</span>Rania Putri</p>
            <p><span class="{{ $caption }}">Since</span>2021</p>
        </div>
    </x-markas.tilt-card>
</div>
