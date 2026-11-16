@props([
    'title',
    'closeLabel' => 'Close',
])

@php
    $dialog = 'm-auto w-full max-w-lg rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40';
    $panel = 'grid gap-4 p-6';
    $header = 'flex items-start justify-between gap-4';
    $titleClass = 'text-lg font-semibold text-ink';
    $body = 'text-sm text-muted';
    $footerClass = 'flex flex-wrap justify-end gap-2';
    $close = 'inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-modal|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-modal-'.hash('xxh32', $idKey.$idIndex);
@endphp

{{-- wire:model and x-model bind the open state (x-modelable), so a boolean property can open and close the dialog. --}}
<div
    class="contents"
    x-data="{
        open: false,
        init() {
            this.$watch('open', (value) => {
                const dialog = this.$refs.dialog;
                if (value && ! dialog.open) dialog.showModal();
                if (! value && dialog.open) dialog.close();
            });
        },
    }"
    x-modelable="open"
    {{ $attributes->whereStartsWith(['wire:model', 'x-model']) }}
>
    @isset($trigger)
        <div class="contents" @click="$refs.dialog.showModal(); open = true">{{ $trigger }}</div>
    @endisset
    <dialog
        wire:ignore.self
        x-ref="dialog"
        :data-state="open ? 'open' : 'closed'"
        @close="open = false"
        @click.self="$refs.dialog.close()"
        {{ $attributes->whereDoesntStartWith(['wire:model', 'x-model'])->merge(['id' => $id, 'aria-labelledby' => $id.'-title', 'data-state' => 'closed'])->class([$dialog]) }}
    >
        <div class="{{ $panel }}">
            <div class="{{ $header }}">
                <h2 id="{{ $id }}-title" class="{{ $titleClass }}">{{ $title }}</h2>
                <form method="dialog">
                    <button type="submit" class="{{ $close }}" aria-label="{{ $closeLabel }}">
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
