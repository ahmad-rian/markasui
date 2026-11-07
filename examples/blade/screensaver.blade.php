@php
    $card = 'rounded-xl border border-line bg-surface p-5 text-center';
    $area = 'h-44 rounded-lg bg-subtle';
    $logo = 'flex items-center gap-2 text-3xl font-bold tabular-nums';
    $icon = 'size-8';
    $title = 'mt-5 text-base font-semibold text-ink';
    $text = 'mt-1 text-sm text-muted';
    $action = 'mt-4';
@endphp

    <div class="{{ $card }}">
      <x-markas.screensaver :class="$area" aria-hidden="true">
        <span class="{{ $logo }}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="{{ $icon }}"><path d="M4 6h16v12H4z"></path><path d="m4 6 8 6 8-6"></path></svg>404</span>
      </x-markas.screensaver>
      <p class="{{ $title }}">Page not found</p>
      <p class="{{ $text }}">The link may be old, or the page moved somewhere else.</p>
      <x-markas.button :class="$action">Back to home</x-markas.button>
    </div>
