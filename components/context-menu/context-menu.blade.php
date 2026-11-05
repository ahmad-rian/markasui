@props([
    'items' => [],
    'menuLabel' => 'Context menu',
    'hintLabel' => 'Press Shift+F10 to open the context menu',
])

@php
    $area = 'block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $hint = 'sr-only';
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

    $id = $attributes->get('id') ?? 'markas-context-menu-'.\Illuminate\Support\Str::random(8);
@endphp

<div
    class="contents"
    x-data="{
        open: false,
        offset: { x: 0, y: 0 },
        menuItems() {
            return Array.from(this.$refs.menu.querySelectorAll('[role=menuitem]:not(:disabled)'));
        },
        focusItem(index) {
            const list = this.menuItems();
            if (list.length === 0) return;
            list[(index + list.length) % list.length].focus();
        },
        {{-- Letakkan menu di titik (relatif ke area), geser atau balik ke atas kalau tidak muat di layar. --}}
        place() {
            const gap = 4;
            const anchor = this.$refs.area.getBoundingClientRect();
            const { width, height } = this.$refs.menu.getBoundingClientRect();
            const x = anchor.left + this.offset.x;
            const y = anchor.top + this.offset.y;
            const fitsBelow = y + height <= window.innerHeight - gap;
            this.$refs.menu.style.top = (fitsBelow ? y : Math.max(gap, y - height)) + 'px';
            this.$refs.menu.style.left = Math.max(gap, Math.min(x, window.innerWidth - width - gap)) + 'px';
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
        openAt(offset) {
            this.offset = offset;
            // Tempatkan sinkron setelah showPopover; event toggle baru datang belakangan.
            if (!this.open) this.$refs.menu.showPopover();
            this.place();
            this.focusItem(0);
        },
        close() {
            this.$refs.menu.hidePopover();
            this.$refs.area.focus();
        },
        select(value) {
            this.$dispatch('markas-select', value);
            this.close();
        },
        onContextMenu(event) {
            event.preventDefault();
            const anchor = this.$refs.area.getBoundingClientRect();
            this.openAt({ x: event.clientX - anchor.left, y: event.clientY - anchor.top });
        },
        {{-- Shift+F10 dan tombol ContextMenu membuka menu dari keyboard. --}}
        onAreaKeydown(event) {
            if (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10')) return;
            event.preventDefault();
            this.openAt({ x: 0, y: 0 });
        },
        {{-- beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya. --}}
        onBeforeToggle(event) {
            this.open = event.newState === 'open';
        },
        onToggle(event) {
            if (event.newState !== 'open') return this.unfollow?.();
            this.place();
            this.follow();
            this.focusItem(0);
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
>
    <div
        x-ref="area"
        role="group"
        tabindex="0"
        aria-describedby="{{ $id }}-hint"
        data-state="closed"
        :data-state="open ? 'open' : 'closed'"
        @contextmenu="onContextMenu($event)"
        @keydown="onAreaKeydown($event)"
        {{ $attributes->except('id')->class([$area]) }}
    >{{ $slot }}</div>
    <span id="{{ $id }}-hint" class="{{ $hint }}">{{ $hintLabel }}</span>
    <div
        x-ref="menu"
        id="{{ $id }}"
        popover="auto"
        role="menu"
        aria-label="{{ $menuLabel }}"
        data-state="closed"
        :data-state="open ? 'open' : 'closed'"
        @beforetoggle="onBeforeToggle($event)"
        @toggle="onToggle($event)"
        @keydown="onMenuKeydown($event)"
        @contextmenu.prevent
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
