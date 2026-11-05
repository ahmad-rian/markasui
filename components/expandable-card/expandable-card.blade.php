@props([
    'title',
    'description' => null,
    'closeLabel' => 'Close',
])

@php
    $wrapper = 'contents';
    $trigger = 'group relative grid w-full content-start gap-3 rounded-xl border border-line bg-surface p-3 text-left text-ink transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:opacity-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0';
    $cardMedia = 'block h-28 overflow-hidden rounded-lg bg-subtle';
    $cardText = 'grid gap-1 px-1 pb-1';
    $cardTitle = 'text-sm font-medium text-ink';
    $cardDescription = 'line-clamp-2 text-sm text-muted';
    $expandIcon = 'absolute top-5 right-5 inline-flex size-7 items-center justify-center rounded-full border border-line bg-surface text-ink transition-transform duration-200 ease-out group-hover:rotate-90 motion-reduce:transition-none';
    $dialogClass = 'm-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40';
    $panel = 'relative';
    $dialogMedia = 'h-48 overflow-hidden bg-subtle';
    $dialogBody = 'grid gap-3 p-5';
    $dialogTitle = 'pr-10 text-lg font-semibold text-ink';
    $dialogDescription = 'text-sm text-muted';
    $details = 'grid gap-3 text-sm text-ink';
    $footerClass = 'flex flex-wrap justify-end gap-2 pt-2';
    $close = 'absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $icon = 'size-4';

    $id = $attributes->get('id') ?? 'markas-expandable-card-'.\Illuminate\Support\Str::random(8);
    $hasDetails = $slot->isNotEmpty();
@endphp

{{-- The card grows into a native modal dialog (FLIP) and shrinks back on close. Escape, the backdrop, and the close button all animate. --}}
<div
    class="{{ $wrapper }}"
    x-data="{
        open: false,
        closing: false,
        canAnimate(el) {
            return !! el.animate && ! matchMedia('(prefers-reduced-motion: reduce)').matches;
        },
        overCard(card, dialog) {
            const box = dialog.getBoundingClientRect();
            return `translate(${card.left - box.left}px, ${card.top - box.top}px) scale(${card.width / box.width}, ${card.height / box.height})`;
        },
        morph(card, opening) {
            const { dialog, panel } = this.$refs;
            dialog.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
            const options = { duration: opening ? 420 : 320, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', direction: opening ? 'normal' : 'reverse', fill: opening ? 'none' : 'forwards' };
            panel.animate([{ opacity: 0 }, { opacity: 0, offset: 0.35 }, { opacity: 1 }], options);
            dialog.animate([{ opacity: 0 }, { opacity: 1 }], { ...options, pseudoElement: '::backdrop' });
            return dialog.animate([
                { transform: this.overCard(card, dialog), transformOrigin: 'top left' },
                { transform: 'none', transformOrigin: 'top left' },
            ], options);
        },
        show(event) {
            const { dialog, trigger } = this.$refs;
            if (event.defaultPrevented || dialog.open) return;
            const from = trigger.getBoundingClientRect();
            dialog.showModal();
            this.open = true;
            if (this.canAnimate(dialog)) this.morph(from, true);
        },
        hide() {
            const { dialog, trigger } = this.$refs;
            if (! dialog.open || this.closing) return;
            if (! this.canAnimate(dialog)) return dialog.close();
            this.closing = true;
            this.morph(trigger.getBoundingClientRect(), false).onfinish = () => dialog.close();
        },
        closed() {
            this.$refs.dialog.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
            this.closing = false;
            this.open = false;
            this.$refs.trigger.focus();
        },
    }"
>
    <button
        x-ref="trigger"
        data-state="closed"
        x-bind:data-state="open ? 'open' : 'closed'"
        x-on:click="show($event)"
        {{ $attributes->merge(['id' => $id, 'type' => 'button', 'aria-haspopup' => 'dialog', 'aria-controls' => $id.'-dialog'])->class([$trigger]) }}
    >
        @isset($media)
            <span class="{{ $cardMedia }}">{{ $media }}</span>
        @endisset
        <span class="{{ $cardText }}">
            <span class="{{ $cardTitle }}">{{ $title }}</span>
            @if ($description)
                <span class="{{ $cardDescription }}">{{ $description }}</span>
            @endif
        </span>
        <span aria-hidden="true" class="{{ $expandIcon }}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="M12 5v14M5 12h14" /></svg>
        </span>
    </button>
    <dialog
        x-ref="dialog"
        id="{{ $id }}-dialog"
        aria-labelledby="{{ $id }}-title"
        data-state="closed"
        x-bind:data-state="open ? 'open' : 'closed'"
        x-on:close="closed()"
        x-on:cancel.prevent="hide()"
        x-on:keydown.escape.prevent="hide()"
        x-on:click.self="hide()"
        class="{{ $dialogClass }}"
    >
        <div x-ref="panel" class="{{ $panel }}">
            <button type="button" aria-label="{{ $closeLabel }}" x-on:click="hide()" class="{{ $close }}">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            @isset($media)
                <div class="{{ $dialogMedia }}">{{ $media }}</div>
            @endisset
            <div class="{{ $dialogBody }}">
                <h2 id="{{ $id }}-title" class="{{ $dialogTitle }}">{{ $title }}</h2>
                @if ($description)
                    <p class="{{ $dialogDescription }}">{{ $description }}</p>
                @endif
                @if ($hasDetails)
                    <div class="{{ $details }}">{{ $slot }}</div>
                @endif
                @isset($footer)
                    <div class="{{ $footerClass }}">{{ $footer }}</div>
                @endisset
            </div>
        </div>
    </dialog>
</div>
