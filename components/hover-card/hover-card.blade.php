@props([])

@php
    $root = 'inline-block';
    $card = 'inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay';

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-hover-card|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-hover-card-'.hash('xxh32', $idKey.$idIndex);
@endphp

<span
    x-data="{
        open: false,
        timer: null,
        show() {
            clearTimeout(this.timer);
            {{-- Link again in case a re-render (Livewire morph) dropped aria-describedby from the trigger. --}}
            this.describe();
            this.$refs.card.showPopover();
        },
        showLater() {
            clearTimeout(this.timer);
            if (this.open) return;
            this.timer = setTimeout(() => this.show(), 400);
        },
        hide() {
            clearTimeout(this.timer);
            this.$refs.card.hidePopover();
        },
        {{-- Jeda singkat supaya pointer sempat pindah dari pemicu ke kartu. --}}
        hideLater() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.hide(), 100);
        },
        {{-- Fokus yang pindah ke dalam kartu (misalnya link di kartu) tidak menutup kartu. --}}
        onFocusOut(event) {
            if (! this.$root.contains(event.relatedTarget)) this.hide();
        },
        describe() {
            const trigger = this.$root.firstElementChild;
            const described = trigger?.getAttribute('aria-describedby') ?? '';
            if (trigger && trigger !== this.$refs.card && ! described.split(' ').includes(@js($id))) {
                trigger.setAttribute('aria-describedby', [described, @js($id)].filter(Boolean).join(' '));
            }
        },
        {{-- Letakkan kartu di bawah tengah pemicu, pindah ke atas kalau tidak muat. --}}
        place() {
            const gap = 8;
            const anchor = this.$root.getBoundingClientRect();
            const { width, height } = this.$refs.card.getBoundingClientRect();
            const above = anchor.top - gap - height;
            const below = anchor.bottom + gap;
            const onTop = below + height > window.innerHeight && above >= 0;
            this.$refs.card.style.top = (onTop ? above : below) + 'px';
            this.$refs.card.style.left = Math.max(gap, Math.min(anchor.left + anchor.width / 2 - width / 2, window.innerWidth - width - gap)) + 'px';
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
            clearTimeout(this.timer);
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
    @mouseleave="hideLater()"
    @focusin="show()"
    @focusout="onFocusOut($event)"
    @keydown.escape.window="hide()"
    {{ $attributes->except('id')->class([$root]) }}
>{{ $slot }}<span
        x-ref="card"
        id="{{ $id }}"
        popover="manual"
        wire:ignore.self
        data-state="closed"
        :data-state="open ? 'open' : 'closed'"
        @toggle="onToggle($event)"
        class="{{ $card }}"
    >{{ $content ?? '' }}</span></span>
