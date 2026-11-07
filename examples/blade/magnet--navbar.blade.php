@php
    $nav = 'flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3';
    $brand = 'text-base font-semibold text-ink';
    $links = 'flex items-center gap-1';
    $link = 'block rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
@endphp

    <nav aria-label="Main" class="{{ $nav }}">
      <a href="#" class="{{ $brand }}">Warung</a>
      <div class="{{ $links }}">
        <x-markas.magnet :strength="0.25" :radius="20"><a href="#" class="{{ $link }}">Menu</a></x-markas.magnet>
        <x-markas.magnet :strength="0.25" :radius="20"><a href="#" class="{{ $link }}">Outlets</a></x-markas.magnet>
        <x-markas.magnet :strength="0.25" :radius="20"><a href="#" class="{{ $link }}">About</a></x-markas.magnet>
        <x-markas.magnet :strength="0.4" :radius="40"><x-markas.button size="sm">Order</x-markas.button></x-markas.magnet>
      </div>
    </nav>
