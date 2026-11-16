@props([
    'title',
    'variant' => 'default',
    'cancelLabel' => 'Cancel',
    'actionLabel' => 'Continue',
])

@php
    $dialog = 'm-auto w-full max-w-md rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40';
    $panel = 'grid gap-4 p-6';
    $titleClass = 'text-lg font-semibold text-ink';
    $body = 'text-sm text-muted';
    $footerClass = 'flex flex-wrap justify-end gap-2';
    $button = 'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $cancelClass = 'border border-line bg-surface text-ink hover:bg-subtle';
    $actionTones = [
        'default' => 'bg-primary text-on-primary hover:bg-primary-strong',
        'danger' => 'bg-danger text-on-primary hover:bg-danger/90',
    ];

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-alert-dialog|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-alert-dialog-'.hash('xxh32', $idKey.$idIndex);
@endphp

{{-- wire:model and x-model bind the open state (x-modelable), so a boolean property can open and close the dialog. --}}
<div
    class="contents"
    x-data="{
        open: false,
        init() {
            this.$watch('open', (value) => {
                if (value && ! this.$refs.dialog.open) this.show();
                if (! value && this.$refs.dialog.open) this.$refs.dialog.close();
            });
        },
        show() {
            this.$refs.dialog.returnValue = '';
            this.$refs.dialog.showModal();
            this.open = true;
            this.$refs.cancel.focus();
        },
        {{-- Selain tombol aksi (tombol batal, Escape, close() dari kode) dihitung batal. --}}
        onClose() {
            this.open = false;
            const isAction = this.$refs.dialog.returnValue === 'action';
            if (! isAction) this.$refs.dialog.returnValue = 'cancel';
            this.$dispatch(isAction ? 'markas-action' : 'markas-cancel');
        },
    }"
    x-modelable="open"
    {{ $attributes->whereStartsWith(['wire:model', 'x-model']) }}
>
    @isset($trigger)
        <div class="contents" @click="show()">{{ $trigger }}</div>
    @endisset
    <dialog
        wire:ignore.self
        x-ref="dialog"
        role="alertdialog"
        :data-state="open ? 'open' : 'closed'"
        @close="onClose()"
        {{ $attributes->whereDoesntStartWith(['wire:model', 'x-model'])->merge(['id' => $id, 'aria-labelledby' => $id.'-title', 'aria-describedby' => $id.'-description', 'data-state' => 'closed'])->class([$dialog]) }}
    >
        <div class="{{ $panel }}">
            <h2 id="{{ $id }}-title" class="{{ $titleClass }}">{{ $title }}</h2>
            <div id="{{ $id }}-description" class="{{ $body }}">{{ $slot }}</div>
            <form method="dialog" class="{{ $footerClass }}">
                <button x-ref="cancel" type="submit" value="cancel" class="{{ $button }} {{ $cancelClass }}">{{ $cancelLabel }}</button>
                <button type="submit" value="action" class="{{ $button }} {{ $actionTones[$variant] ?? $actionTones['default'] }}">{{ $actionLabel }}</button>
            </form>
        </div>
    </dialog>
</div>
