@props([
    'label' => 'Open',
    'side' => 'bottom',
    'align' => 'start',
])

@php
    $root = 'inline-block';
    $triggerClass = 'inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none';
    $panel = 'inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay';

    $id = $attributes->get('id') ?? 'markas-popover-'.\Illuminate\Support\Str::random(8);
@endphp

<div
    x-data="{
        open: false,
        {{-- Letakkan panel di sisi pilihan dengan perataan pilihan, pindah sisi kalau tidak muat. --}}
        place() {
            const gap = 4;
            const anchor = this.$refs.trigger.getBoundingClientRect();
            const { width, height } = this.$refs.panel.getBoundingClientRect();
            const above = anchor.top - gap - height;
            const below = anchor.bottom + gap;
            const fitsAbove = above >= 0;
            const fitsBelow = below + height <= window.innerHeight;
            const onTop = @js($side) === 'top' ? fitsAbove || ! fitsBelow : ! fitsBelow && fitsAbove;
            const starts = { start: anchor.left, center: anchor.left + anchor.width / 2 - width / 2, end: anchor.right - width };
            const start = starts[@js($align)] ?? starts.start;
            this.$refs.panel.style.top = (onTop ? above : below) + 'px';
            this.$refs.panel.style.left = Math.max(gap, Math.min(start, window.innerWidth - width - gap)) + 'px';
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
        {{-- beforetoggle berjalan sinkron, jadi status selalu terbaru untuk klik berikutnya. --}}
        onBeforeToggle(event) {
            this.open = event.newState === 'open';
        },
        onToggle(event) {
            if (event.newState === 'open') {
                this.place();
                this.follow();
                this.$refs.panel.querySelector('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex=\'-1\'])')?.focus();
                return;
            }
            this.unfollow?.();
            {{-- Fokus kembali ke pemicu, kecuali user sudah memindahkannya ke elemen lain di luar panel. --}}
            const active = document.activeElement;
            if (active === document.body || this.$refs.panel.contains(active)) this.$refs.trigger.focus();
        },
        onKeydown(event) {
            if (event.key !== 'Escape') return;
            event.preventDefault();
            this.$refs.panel.hidePopover();
            this.$refs.trigger.focus();
        },
    }"
    {{ $attributes->except('id')->class([$root]) }}
>
    <button
        x-ref="trigger"
        type="button"
        id="{{ $id }}-trigger"
        popovertarget="{{ $id }}"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="{{ $id }}"
        data-state="closed"
        :aria-expanded="open ? 'true' : 'false'"
        :data-state="open ? 'open' : 'closed'"
        class="{{ $triggerClass }}"
    >{{ $trigger ?? $label }}</button>
    <div
        x-ref="panel"
        id="{{ $id }}"
        popover="auto"
        role="dialog"
        aria-labelledby="{{ $id }}-trigger"
        data-state="closed"
        :data-state="open ? 'open' : 'closed'"
        @beforetoggle="onBeforeToggle($event)"
        @toggle="onToggle($event)"
        @keydown="onKeydown($event)"
        class="{{ $panel }}"
    >{{ $slot }}</div>
</div>
