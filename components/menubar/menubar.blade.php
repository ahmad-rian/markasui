@props([
    'menus' => [],
    'label' => 'Menu',
])

@php
    $bar = 'inline-flex items-center gap-1 rounded-lg border border-line bg-surface p-1';
    $wrapper = 'contents';
    $triggerClass = 'inline-flex h-8 items-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none';
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

    $id = $attributes->get('id') ?? 'markas-menubar-'.\Illuminate\Support\Str::random(8);
@endphp

<div
    x-data="{
        openIndex: null,
        activeIndex: 0,
        focusTarget: 'first',
        wrap(index, length) {
            return (index + length) % length;
        },
        triggers() {
            return Array.from(this.$root.querySelectorAll(':scope > [role=none] > [role=menuitem]'));
        },
        panels() {
            return Array.from(this.$root.querySelectorAll(':scope > [role=none] > [role=menu]'));
        },
        menuItems(index) {
            return Array.from(this.panels()[index]?.querySelectorAll('[role=menuitem]:not(:disabled)') ?? []);
        },
        focusItem(menuIndex, index) {
            const list = this.menuItems(menuIndex);
            if (list.length === 0) return;
            list[this.wrap(index, list.length)].focus();
        },
        focusEdge(menuIndex, target) {
            this.focusItem(menuIndex, target === 'first' ? 0 : -1);
        },
        focusTrigger(index) {
            const next = this.wrap(index, this.triggers().length);
            this.activeIndex = next;
            this.triggers()[next].focus();
            return next;
        },
        openMenu(index, target) {
            this.focusTarget = target;
            this.panels()[index].showPopover();
        },
        close(index) {
            this.panels()[index].hidePopover();
            this.triggers()[index].focus();
        },
        {{-- Tutup menu sekarang, pindah ke menu di sebelahnya, lalu buka. --}}
        switchMenu(from, to) {
            this.panels()[from].hidePopover();
            this.openMenu(this.focusTrigger(to), 'first');
        },
        select(index, value) {
            this.$dispatch('markas-select', value);
            this.close(index);
        },
        {{-- Letakkan menu di bawah pemicu rata kiri, pindah ke atas kalau tidak muat. --}}
        place(index) {
            const gap = 4;
            const trigger = this.triggers()[index];
            const panel = this.panels()[index];
            if (!trigger || !panel) return;
            const anchor = trigger.getBoundingClientRect();
            const { width, height } = panel.getBoundingClientRect();
            const below = anchor.bottom + gap;
            const above = anchor.top - gap - height;
            const fitsBelow = below + height <= window.innerHeight;
            panel.style.top = (fitsBelow || above < 0 ? below : above) + 'px';
            panel.style.left = Math.max(gap, Math.min(anchor.left, window.innerWidth - width - gap)) + 'px';
        },
        unfollow: null,
        {{-- Jalankan ulang penempatan saat halaman digulir atau jendela berubah ukuran. --}}
        follow(index) {
            this.unfollow?.();
            const update = () => this.place(index);
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
        {{-- beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya. --}}
        onBeforeToggle(index, event) {
            if (event.newState === 'open') {
                this.openIndex = index;
                this.activeIndex = index;
                return;
            }
            if (this.openIndex === index) this.openIndex = null;
        },
        onToggle(index, event) {
            if (event.newState !== 'open') {
                if (this.openIndex === null) this.unfollow?.();
                return;
            }
            this.place(index);
            this.follow(index);
            this.focusEdge(index, this.focusTarget);
            this.focusTarget = 'first';
        },
        onTriggerKeydown(index, event) {
            const move = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: -1 }[event.key];
            if (move !== undefined) {
                event.preventDefault();
                this.focusTrigger(move);
                return;
            }
            const target = { ArrowDown: 'first', ArrowUp: 'last' }[event.key];
            if (target === undefined) return;
            event.preventDefault();
            if (this.openIndex === index) return this.focusEdge(index, target);
            this.openMenu(index, target);
        },
        onMenuKeydown(index, event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                return this.close(index);
            }
            if (event.key === 'Tab') return this.panels()[index].hidePopover();
            const side = { ArrowRight: index + 1, ArrowLeft: index - 1 }[event.key];
            if (side !== undefined) {
                event.preventDefault();
                return this.switchMenu(index, side);
            }
            const current = this.menuItems(index).indexOf(document.activeElement);
            const target = { ArrowDown: current + 1, ArrowUp: current - 1, Home: 0, End: -1 }[event.key];
            if (target === undefined) return;
            event.preventDefault();
            this.focusItem(index, target);
        },
    }"
    id="{{ $id }}"
    role="menubar"
    aria-label="{{ $label }}"
    {{ $attributes->except('id')->class([$bar]) }}
>
    @foreach ($menus as $menuIndex => $entry)
        @php
            $menuId = $id.'-menu-'.$menuIndex;
            $triggerId = $id.'-trigger-'.$menuIndex;
        @endphp
        <div role="none" class="{{ $wrapper }}">
            <button
                id="{{ $triggerId }}"
                type="button"
                role="menuitem"
                tabindex="{{ $loop->first ? 0 : -1 }}"
                popovertarget="{{ $menuId }}"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls="{{ $menuId }}"
                data-state="closed"
                :tabindex="activeIndex === {{ $menuIndex }} ? 0 : -1"
                :aria-expanded="openIndex === {{ $menuIndex }} ? 'true' : 'false'"
                :data-state="openIndex === {{ $menuIndex }} ? 'open' : 'closed'"
                @focus="activeIndex = {{ $menuIndex }}"
                @keydown="onTriggerKeydown({{ $menuIndex }}, $event)"
                class="{{ $triggerClass }}"
            >{{ $entry['label'] }}</button>
            <div
                id="{{ $menuId }}"
                popover="auto"
                role="menu"
                aria-labelledby="{{ $triggerId }}"
                data-state="closed"
                :data-state="openIndex === {{ $menuIndex }} ? 'open' : 'closed'"
                @beforetoggle="onBeforeToggle({{ $menuIndex }}, $event)"
                @toggle="onToggle({{ $menuIndex }}, $event)"
                @keydown="onMenuKeydown({{ $menuIndex }}, $event)"
                class="{{ $menu }}"
            >
                @foreach ($entry['items'] ?? [] as $option)
                    @if ($option['separator'] ?? false)
                        <div role="separator" class="{{ $separator }}"></div>
                    @else
                        @php
                            $itemClass = $item.' '.$tones[($option['danger'] ?? false) ? 'danger' : 'default'];
                            $value = (string) ($option['value'] ?? $option['label']);
                            $disabled = (bool) ($option['disabled'] ?? false);
                        @endphp
                        @if (isset($option['href']) && ! $disabled)
                            <a href="{{ $safeHref((string) $option['href']) }}" role="menuitem" tabindex="-1" class="{{ $itemClass }}" @click="select({{ $menuIndex }}, @js($value))">{{ $option['label'] }}</a>
                        @else
                            <button type="button" role="menuitem" tabindex="-1" @disabled($disabled) class="{{ $itemClass }}" @click="select({{ $menuIndex }}, @js($value))">{{ $option['label'] }}</button>
                        @endif
                    @endif
                @endforeach
            </div>
        </div>
    @endforeach
</div>
