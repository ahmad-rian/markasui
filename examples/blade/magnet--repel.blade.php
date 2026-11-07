@php
    $card = 'grid h-56 place-items-center rounded-xl border border-dashed border-line bg-subtle text-center';
    $hint = 'text-sm text-muted';
    $voucher = 'mx-auto mt-3 rounded-lg border-2 border-dashed border-success bg-surface px-4 py-2 text-lg font-semibold text-ink tabular-nums';
@endphp

    <div class="{{ $card }}">
      <div>
        <p class="{{ $hint }}">Catch the voucher if you can</p>
        <x-markas.magnet mode="repel" :strength="0.6" :radius="70" :class="$voucher">Rp 50.000 off</x-markas.magnet>
      </div>
    </div>
