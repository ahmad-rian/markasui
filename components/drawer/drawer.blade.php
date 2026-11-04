@props([
    'title',
    'side' => 'right',
])

@php
    $dialog = 'fixed inset-y-0 m-0 h-dvh max-h-dvh w-full max-w-sm border-line bg-surface p-0 text-ink shadow-xl transition-transform duration-200 ease-out backdrop:bg-ink/40 motion-reduce:transition-none';
    $sides = [
        'right' => 'right-0 left-auto border-l starting:open:translate-x-full',
        'left' => 'right-auto left-0 border-r starting:open:-translate-x-full',
    ];
    $panel = 'flex h-full flex-col gap-4 p-6';
    $header = 'flex items-start justify-between gap-4';
    $titleClass = 'text-lg font-semibold text-ink';
    $body = 'flex-1 overflow-y-auto text-sm text-muted';
    $footerClass = 'flex flex-wrap justify-end gap-2';
    $close = 'inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';

    $id = $attributes->get('id') ?? 'markas-drawer-'.\Illuminate\Support\Str::random(8);
@endphp

<div class="contents" x-data="{ open: false }">
    @isset($trigger)
        <div class="contents" @click="$refs.dialog.showModal(); open = true">{{ $trigger }}</div>
    @endisset
    <dialog
        x-ref="dialog"
        :data-state="open ? 'open' : 'closed'"
        @close="open = false"
        @click.self="$refs.dialog.close()"
        {{ $attributes->merge(['id' => $id, 'aria-labelledby' => $id.'-title', 'data-state' => 'closed'])->class([$dialog, $sides[$side]]) }}
    >
        <div class="{{ $panel }}">
            <div class="{{ $header }}">
                <h2 id="{{ $id }}-title" class="{{ $titleClass }}">{{ $title }}</h2>
                <form method="dialog">
                    <button type="submit" class="{{ $close }}" aria-label="Tutup">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                </form>
            </div>
            <div class="{{ $body }}">{{ $slot }}</div>
            @isset($footer)
                <form method="dialog" class="{{ $footerClass }}">{{ $footer }}</form>
            @endisset
        </div>
    </dialog>
</div>
