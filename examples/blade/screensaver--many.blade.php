@php
    $card = 'rounded-xl border border-line bg-surface p-4';
    $head = 'flex items-center justify-between text-sm';
    $title = 'font-semibold text-ink';
    $count = 'text-muted tabular-nums';
    $area = 'mt-3 h-52 rounded-lg bg-canvas';
    $chip = 'flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-1.5 text-sm font-medium';
    $dot = 'size-2.5 rounded-full bg-current';
    $name = 'text-ink';
@endphp

    <div class="{{ $card }}">
      <div class="{{ $head }}">
        <p class="{{ $title }}">Online now</p>
        <p class="{{ $count }}">4 people</p>
      </div>
      <x-markas.screensaver :speed="60" :seed="3" :class="$area">
        <span class="{{ $chip }}"><span class="{{ $dot }}"></span><span class="{{ $name }}">Rania Putri</span></span>
        <span class="{{ $chip }}"><span class="{{ $dot }}"></span><span class="{{ $name }}">Bima Saputra</span></span>
        <span class="{{ $chip }}"><span class="{{ $dot }}"></span><span class="{{ $name }}">Sekar Ayu</span></span>
        <span class="{{ $chip }}"><span class="{{ $dot }}"></span><span class="{{ $name }}">Dimas Pratama</span></span>
      </x-markas.screensaver>
    </div>
