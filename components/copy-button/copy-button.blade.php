@props([
    'text' => '',
    'variant' => 'primary',
    'size' => 'md',
    'copyLabel' => 'Copy',
    'copiedLabel' => 'Copied',
])

@php
    $wrapper = 'contents';
    $base = 'group inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none';
    $variants = [
        'primary' => 'bg-primary text-on-primary hover:bg-primary-strong',
        'secondary' => 'border border-line bg-surface text-ink hover:bg-subtle',
        'ghost' => 'text-ink hover:bg-subtle',
        'danger' => 'bg-danger text-on-primary hover:bg-danger/90',
    ];
    $sizes = [
        'sm' => 'h-8 rounded-md px-3 text-sm',
        'md' => 'h-10 rounded-lg px-4 text-sm',
        'lg' => 'h-12 rounded-lg px-6 text-base',
    ];
    $iconSizes = [
        'sm' => 'size-8 rounded-md text-sm',
        'md' => 'size-10 rounded-lg text-sm',
        'lg' => 'size-12 rounded-lg text-base',
    ];
    $iconStack = 'grid size-4 shrink-0 place-items-center';
    $copyIcon = 'col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]:scale-50 group-data-[state=copied]:opacity-0 motion-reduce:transition-none';
    $checkIcon = 'col-start-1 row-start-1 size-4 scale-50 opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]:scale-100 group-data-[state=copied]:opacity-100 motion-reduce:transition-none';
    $checkPath = '[stroke-dasharray:24] [stroke-dashoffset:24] transition-[stroke-dashoffset] delay-100 duration-300 ease-out group-data-[state=copied]:[stroke-dashoffset:0] motion-reduce:transition-none';
    $srOnly = 'sr-only';

    $hasLabel = $slot->isNotEmpty();
@endphp

{{-- Clipboard blocked or unavailable: the button stays idle so the check mark never lies. --}}
<span
    class="{{ $wrapper }}"
    x-data="{
        copied: false,
        timer: null,
        async copy() {
            try {
                await navigator.clipboard.writeText(@js((string) $text));
            } catch {
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
>
    <button
        data-state="idle"
        x-bind:data-state="copied ? 'copied' : 'idle'"
        x-on:click="copy()"
        {{ $attributes->merge(['type' => 'button'])->class([$base, $variants[$variant], $hasLabel ? $sizes[$size] : $iconSizes[$size]]) }}
    >
        <span class="{{ $iconStack }}" aria-hidden="true">
            <svg class="{{ $copyIcon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></svg>
            <svg class="{{ $checkIcon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path class="{{ $checkPath }}" d="m4 12 5 5L20 6" /></svg>
        </span>
        @if ($hasLabel)
            {{ $slot }}
        @else
            <span class="{{ $srOnly }}">{{ $copyLabel }}</span>
        @endif
    </button>
    <span role="status" class="{{ $srOnly }}" x-text="copied ? @js($copiedLabel) : ''"></span>
</span>
