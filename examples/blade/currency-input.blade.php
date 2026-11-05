@php
    $panel = 'grid gap-4 rounded-xl border border-line bg-surface p-5';
    $balance = 'flex items-baseline justify-between';
    $balanceLabel = 'text-sm text-muted';
    $balanceValue = 'text-lg font-semibold text-ink tabular-nums';
@endphp

<div class="{{ $panel }}">
    <div class="{{ $balance }}">
        <span class="{{ $balanceLabel }}">Current balance</span>
        <span class="{{ $balanceValue }}">Rp 245.000</span>
    </div>
    <x-markas.currency-input
        label="Top-up amount"
        name="amount"
        hint="Minimum Rp10.000, maximum Rp10.000.000"
        :min="10000"
        :max="10000000"
        :value="100000"
        :presets="[50000, 100000, 250000, 500000, 1000000]"
    />
    <x-markas.button>Top up balance</x-markas.button>
</div>
