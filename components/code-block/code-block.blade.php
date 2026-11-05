@props([
    'code' => '',
    'title' => null,
    'showLineNumbers' => false,
    'copyLabel' => 'Copy code',
    'copiedLabel' => 'Copied',
])

@php
    $root = 'overflow-hidden rounded-xl border border-line bg-subtle';
    $header = 'flex items-center gap-2 border-b border-line py-1.5 pr-1.5 pl-4';
    $titleClass = 'min-w-0 truncate text-xs font-medium text-muted';
    $copyButton = 'ml-auto inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $icon = 'size-4';
    $pre = 'overflow-x-auto p-4 font-mono text-sm leading-6 text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary';
    $lineClass = 'block min-h-6 whitespace-pre';
    $lineNumber = 'mr-4 inline-block min-w-6 text-right text-muted select-none';

    $lines = preg_split('/\r?\n/', preg_replace('/\r?\n$/', '', (string) $code));
@endphp

<div
    x-data="{
        copied: false,
        timer: null,
        async copy() {
            try {
                await navigator.clipboard.writeText(@js((string) $code));
            } catch {
                this.copied = false;
                return;
            }
            this.copied = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => (this.copied = false), 2000);
        },
        destroy() {
            clearTimeout(this.timer);
        },
    }"
    {{ $attributes->class([$root]) }}
>
    <div class="{{ $header }}">
        @if ($title)
            <span class="{{ $titleClass }}">{{ $title }}</span>
        @endif
        <button
            type="button"
            data-state="idle"
            :data-state="copied ? 'copied' : 'idle'"
            @click="copy()"
            class="{{ $copyButton }}"
        >
            <svg x-show="copied" x-cloak aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}" style="display: none"><path d="m5 12 5 5L20 7" /></svg>
            <svg x-show="! copied" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
            <span aria-live="polite" x-text="copied ? @js($copiedLabel) : @js($copyLabel)">{{ $copyLabel }}</span>
        </button>
    </div>
    <pre tabindex="0" class="{{ $pre }}"><code>@foreach ($lines as $index => $line)<span class="{{ $lineClass }}">@if ($showLineNumbers)<span aria-hidden="true" class="{{ $lineNumber }}">{{ $index + 1 }}</span>@endif{{ $line }}</span>@endforeach</code></pre>
</div>
