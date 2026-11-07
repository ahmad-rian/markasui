@php
    $footer = 'flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-4';
    $text = 'text-sm text-muted';
    $strong = 'font-medium text-ink';
    $row = 'flex items-center gap-2';
    $dot = 'grid size-9 place-items-center rounded-full bg-subtle text-ink';
    $icon = 'size-5';
@endphp

    <footer class="{{ $footer }}">
      <p class="{{ $text }}"><span class="{{ $strong }}">Markas Studio</span> made in Bandung</p>
      <x-markas.float motion="breathe" :amplitude="12" :duration="4" aria-hidden="true" :class="$row">
        <span class="{{ $dot }}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="{{ $icon }}"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"></path></svg></span>
        <span class="{{ $dot }}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="{{ $icon }}"><path d="M5 8h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8Z"></path><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"></path><path d="M8 3v2"></path><path d="M12 3v2"></path></svg></span>
        <span class="{{ $dot }}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="{{ $icon }}"><path d="M12 21s6-5.3 6-11a6 6 0 0 0-12 0c0 5.7 6 11 6 11Z"></path><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path></svg></span>
      </x-markas.float>
    </footer>
