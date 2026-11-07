@php
    $board = 'h-72 rounded-xl border border-line bg-subtle';
    $card = 'w-36 rounded-xl border border-line bg-surface p-4';
    $featured = 'w-36 rounded-xl bg-primary p-4 text-on-primary';
    $plan = 'text-sm font-medium';
    $price = 'mt-2 text-lg font-semibold tabular-nums';
    $period = 'text-xs opacity-80';
@endphp

    <x-markas.drag-elements :rotate="5" :seed="3" :class="$board" role="group" aria-label="Plans to compare">
      <div data-x="6" data-y="12" class="{{ $card }}">
        <p class="{{ $plan }}">Basic</p>
        <p class="{{ $price }}">Rp 49.000</p>
        <p class="{{ $period }}">per month</p>
      </div>
      <div data-x="50" data-y="92" class="{{ $featured }}">
        <p class="{{ $plan }}">Pro</p>
        <p class="{{ $price }}">Rp 99.000</p>
        <p class="{{ $period }}">per month</p>
      </div>
      <div data-x="94" data-y="18" class="{{ $card }}">
        <p class="{{ $plan }}">Team</p>
        <p class="{{ $price }}">Rp 199.000</p>
        <p class="{{ $period }}">per month</p>
      </div>
    </x-markas.drag-elements>
