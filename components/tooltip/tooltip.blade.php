@props([
    'content',
    'side' => 'top',
])

@php
    $root = 'inline-flex';
    $tooltip = 'inset-auto m-0 max-w-64 rounded-md bg-ink px-2 py-1 text-xs font-medium text-canvas shadow-overlay';

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-tooltip|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-tooltip-'.hash('xxh32', $idKey.$idIndex);
@endphp

<span
    x-data="{
        open: false,
        timer: null,
        show() {
            clearTimeout(this.timer);
            {{-- Link again in case a re-render (Livewire morph) dropped aria-describedby from the trigger. --}}
            this.describe();
            this.$refs.tip.showPopover();
        },
        showLater() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.show(), 300);
        },
        hide() {
            clearTimeout(this.timer);
            this.$refs.tip.hidePopover();
        },
        describe() {
            const trigger = this.$root.firstElementChild;
            const described = trigger?.getAttribute('aria-describedby') ?? '';
            if (trigger && trigger !== this.$refs.tip && !described.split(' ').includes(@js($id))) {
                trigger.setAttribute('aria-describedby', [described, @js($id)].filter(Boolean).join(' '));
            }
        },
        {{-- Letakkan tooltip di tengah pemicu pada sisi yang dipilih, pindah sisi kalau tidak muat. --}}
        place() {
            const gap = 6;
            const anchor = this.$root.getBoundingClientRect();
            const { width, height } = this.$refs.tip.getBoundingClientRect();
            const above = anchor.top - gap - height;
            const below = anchor.bottom + gap;
            const fitsAbove = above >= 0;
            const fitsBelow = below + height <= window.innerHeight;
            const onTop = @js($side) === 'top' ? fitsAbove || ! fitsBelow : ! fitsBelow && fitsAbove;
            this.$refs.tip.style.top = (onTop ? above : below) + 'px';
            this.$refs.tip.style.left = Math.max(gap, Math.min(anchor.left + anchor.width / 2 - width / 2, window.innerWidth - width - gap)) + 'px';
        },
        unfollow: null,
        {{-- Jalankan ulang penempatan saat halaman digulir atau jendela berubah ukuran. --}}
        follow() {
            this.unfollow?.();
            const update = () => this.place();
            const scrollOptions = { capture: true, passive: true };
            window.addEventListener('scroll', update, scrollOptions);
            window.addEventListener('resize', update, { passive: true });
            this.unfollow = () => {
                window.removeEventListener('scroll', update, scrollOptions);
                window.removeEventListener('resize', update);
                this.unfollow = null;
            };
        },
        destroy() {
            this.unfollow?.();
        },
        onToggle(event) {
            this.open = event.newState === 'open';
            if (! this.open) return this.unfollow?.();
            this.place();
            this.follow();
        },
    }"
    x-init="describe()"
    @mouseenter="showLater()"
    @mouseleave="hide()"
    @focusin="show()"
    @focusout="hide()"
    @keydown.escape.window="hide()"
    {{ $attributes->except('id')->class([$root]) }}
>{{ $slot }}<span
        x-ref="tip"
        id="{{ $id }}"
        popover="manual"
        wire:ignore.self
        role="tooltip"
        data-state="closed"
        :data-state="open ? 'open' : 'closed'"
        @toggle="onToggle($event)"
        class="{{ $tooltip }}"
    >{{ $content }}</span></span>
