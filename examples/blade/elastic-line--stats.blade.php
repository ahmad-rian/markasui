@php
    $row = 'flex rounded-xl border border-line bg-surface py-5';
    $stat = 'flex-1 text-center';
    $value = 'text-2xl font-semibold text-ink tabular-nums';
    $label = 'mt-1 text-sm text-muted';
@endphp

<div class="{{ $row }}">
    <div class="{{ $stat }}">
        <p class="{{ $value }}">61</p>
        <p class="{{ $label }}">Components</p>
    </div>
    <x-markas.elastic-line variant="push" orientation="vertical" :reach="12" />
    <div class="{{ $stat }}">
        <p class="{{ $value }}">3</p>
        <p class="{{ $label }}">Frameworks</p>
    </div>
    <x-markas.elastic-line variant="push" orientation="vertical" :reach="12" />
    <div class="{{ $stat }}">
        <p class="{{ $value }}">12k</p>
        <p class="{{ $label }}">Weekly installs</p>
    </div>
</div>
