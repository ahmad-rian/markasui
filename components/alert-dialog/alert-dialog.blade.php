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

    $id = $attributes->get('id') ?? 'markas-alert-dialog-'.\Illuminate\Support\Str::random(8);
@endphp

<div
    class="contents"
    x-data="{
        open: false,
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
>
    @isset($trigger)
        <div class="contents" @click="show()">{{ $trigger }}</div>
    @endisset
    <dialog
        x-ref="dialog"
        role="alertdialog"
        :data-state="open ? 'open' : 'closed'"
        @close="onClose()"
        {{ $attributes->merge(['id' => $id, 'aria-labelledby' => $id.'-title', 'aria-describedby' => $id.'-description', 'data-state' => 'closed'])->class([$dialog]) }}
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
