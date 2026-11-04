@props([
    'items' => [],
    'label' => 'Opsi',
])

@php
    $root = 'inline-block';
    $triggerClass = 'inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none';
    $chevron = 'size-4 text-muted';
    $menu = 'inset-auto m-0 min-w-48 rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay';
    $item = 'flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none';
    $tones = [
        'default' => 'text-ink hover:bg-subtle focus:bg-subtle',
        'danger' => 'text-danger hover:bg-danger/10 focus:bg-danger/10',
    ];
    $separator = 'my-1 h-px bg-line';

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#".
    $safeHref = function (string $href): string {
        $value = ltrim(str_replace(["\t", "\n", "\r"], '', $href), "\x00..\x20");
        $hasScheme = preg_match('/^[a-z][a-z0-9+.\-]*:/i', $value) === 1;

        return $hasScheme && preg_match('/^(https?|mailto|tel):/i', $value) !== 1 ? '#' : $href;
    };

    $id = $attributes->get('id') ?? 'markas-dropdown-menu-'.\Illuminate\Support\Str::random(8);
@endphp

<div
    x-data="{
        open: false,
        focusTarget: 'first',
        menuItems() {
            return Array.from(this.$refs.menu.querySelectorAll('[role=menuitem]:not(:disabled)'));
        },
        focusItem(index) {
            const list = this.menuItems();
            if (list.length === 0) return;
            list[(index + list.length) % list.length].focus();
        },
        focusEdge(target) {
            this.focusItem(target === 'first' ? 0 : -1);
        },
        {{-- Letakkan menu di bawah pemicu rata kiri, pindah ke atas kalau tidak muat. --}}
        place() {
            const gap = 4;
            const anchor = this.$refs.trigger.getBoundingClientRect();
            const { width, height } = this.$refs.menu.getBoundingClientRect();
            const below = anchor.bottom + gap;
            const above = anchor.top - gap - height;
            const fitsBelow = below + height <= window.innerHeight;
            this.$refs.menu.style.top = (fitsBelow || above < 0 ? below : above) + 'px';
            this.$refs.menu.style.left = Math.max(gap, Math.min(anchor.left, window.innerWidth - width - gap)) + 'px';
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
        close() {
            this.$refs.menu.hidePopover();
            this.$refs.trigger.focus();
        },
        select(value) {
            this.$dispatch('markas-select', value);
            this.close();
        },
        {{-- beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya. --}}
        onBeforeToggle(event) {
            this.open = event.newState === 'open';
        },
        onToggle(event) {
            if (event.newState !== 'open') return this.unfollow?.();
            this.place();
            this.follow();
            this.focusEdge(this.focusTarget);
            this.focusTarget = 'first';
        },
        onTriggerKeydown(event) {
            const target = { ArrowDown: 'first', ArrowUp: 'last' }[event.key];
            if (target === undefined) return;
            event.preventDefault();
            if (this.open) return this.focusEdge(target);
            this.focusTarget = target;
            this.$refs.menu.showPopover();
        },
        onMenuKeydown(event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                return this.close();
            }
            if (event.key === 'Tab') return this.$refs.menu.hidePopover();
            const index = this.menuItems().indexOf(document.activeElement);
            const target = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: -1 }[event.key];
            if (target === undefined) return;
            event.preventDefault();
            this.focusItem(target);
        },
    }"
    {{ $attributes->except('id')->class([$root]) }}
>
    <button
        x-ref="trigger"
        type="button"
        id="{{ $id }}-trigger"
        popovertarget="{{ $id }}"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls="{{ $id }}"
        data-state="closed"
        :aria-expanded="open ? 'true' : 'false'"
        :data-state="open ? 'open' : 'closed'"
        @keydown="onTriggerKeydown($event)"
        class="{{ $triggerClass }}"
    >{{ $trigger ?? $label }}<svg class="{{ $chevron }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button>
    <div
        x-ref="menu"
        id="{{ $id }}"
        popover="auto"
        role="menu"
        aria-labelledby="{{ $id }}-trigger"
        data-state="closed"
        :data-state="open ? 'open' : 'closed'"
        @beforetoggle="onBeforeToggle($event)"
        @toggle="onToggle($event)"
        @keydown="onMenuKeydown($event)"
        class="{{ $menu }}"
    >
        @foreach ($items as $entry)
            @if ($entry['separator'] ?? false)
                <div role="separator" class="{{ $separator }}"></div>
            @else
                @php
                    $itemClass = $item.' '.$tones[($entry['danger'] ?? false) ? 'danger' : 'default'];
                    $value = (string) ($entry['value'] ?? $entry['label']);
                    $disabled = (bool) ($entry['disabled'] ?? false);
                @endphp
                @if (isset($entry['href']) && ! $disabled)
                    <a href="{{ $safeHref((string) $entry['href']) }}" role="menuitem" tabindex="-1" class="{{ $itemClass }}" @click="select(@js($value))">{{ $entry['label'] }}</a>
                @else
                    <button type="button" role="menuitem" tabindex="-1" @disabled($disabled) class="{{ $itemClass }}" @click="select(@js($value))">{{ $entry['label'] }}</button>
                @endif
            @endif
        @endforeach
    </div>
</div>
