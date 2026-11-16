@props([
    'items' => [],
    'navLabel' => 'Main',
])

@php
    $root = 'relative block max-w-full overflow-x-auto p-1 text-sm **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none';
    $list = 'flex items-center gap-1';
    $topItem = 'group inline-flex h-9 items-center gap-1.5 rounded-md px-3 font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink aria-[current]:text-ink aria-expanded:bg-subtle aria-expanded:text-ink';
    $chevron = 'size-3.5 text-faint transition-transform duration-200 ease-out group-aria-expanded:rotate-180';
    $indicatorClass = 'absolute bottom-0 left-0 h-0.5 rounded-full bg-primary opacity-0 transition-[translate,width,opacity] duration-200 ease-out data-[state=visible]:opacity-100';
    $panel = 'inset-auto m-0 w-[min(40rem,calc(100vw-1rem))] gap-2 rounded-xl border border-line bg-surface p-2 text-ink shadow-overlay open:grid transition-[opacity,translate] duration-200 ease-out starting:open:translate-y-1.5 starting:open:opacity-0';
    $featuredLayout = 'sm:grid-cols-[13rem_1fr]';
    $featuredClass = 'group relative flex min-h-36 flex-col justify-between gap-6 overflow-hidden rounded-lg bg-primary p-4 text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong';
    $featuredArrow = 'relative size-5 self-end transition-transform duration-150 ease-out group-hover:translate-x-0.5';
    $featuredPattern = 'absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[12px_12px] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]';
    $featuredBody = 'relative grid gap-1';
    $featuredTitle = 'font-semibold';
    $featuredText = 'text-on-primary/75';
    $linkGrid = 'grid content-start gap-1 sm:grid-cols-2';
    $panelLink = 'flex items-start gap-3 rounded-lg p-3 transition-colors duration-150 ease-out hover:bg-subtle focus-visible:bg-subtle';
    $iconClass = 'size-9 shrink-0 rounded-md border border-line bg-canvas p-[7px]';
    $linkBody = 'grid gap-0.5';
    $linkTitle = 'font-medium';
    $linkDescription = 'text-muted';

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser.
    $safeHref = fn (string $href): string => preg_match('/^(?!https?:|mailto:|tel:)[a-z][\w+.\-]*:/i', preg_replace('/[\x00-\x20]/', '', $href)) === 1 ? '#' : $href;
    $svg = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    $items = array_values($items);
    $activeIndex = -1;
    foreach ($items as $index => $item) {
        if ($item['active'] ?? false) {
            $activeIndex = $index;
            break;
        }
    }

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-navigation-menu|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-navigation-menu-'.hash('xxh32', $idKey.$idIndex);
@endphp

<nav
    x-data="{
        openIndex: null,
        timer: null,
        {{-- Jeda sebelum panel terbuka saat kursor singgah, dan sebelum tertutup saat kursor pergi. Jarak panel dari pemicu dan tepi layar. --}}
        openDelay: 120,
        closeDelay: 180,
        gap: 8,
        {{-- Pemicu dan link tingkat atas, berurutan. Panel sebuah pemicu adalah saudara berikutnya. --}}
        tops() {
            return Array.from(this.$root.querySelectorAll(':scope > ul > li > :first-child'));
        },
        {{-- Geser indikator ke panel terbuka atau item aktif, lalu letakkan panel terbuka di bawah pemicunya, rata kiri dengan nav. --}}
        sync() {
            const open = this.openIndex;
            const active = @js($activeIndex);
            const target = this.tops()[open ?? Math.max(active, 0)];
            if (!target) return;
            const bar = this.$refs.bar;
            bar.style.width = target.offsetWidth + 'px';
            bar.style.translate = target.offsetLeft + 'px 0';
            bar.dataset.state = open === null && active < 0 ? 'hidden' : 'visible';
            bar.hidden = false;
            const panel = open === null ? null : target.nextElementSibling;
            if (!panel) return;
            const maxLeft = innerWidth - panel.offsetWidth - this.gap;
            panel.style.top = (target.getBoundingClientRect().bottom + this.gap) + 'px';
            panel.style.left = Math.max(this.gap, Math.min(this.$root.getBoundingClientRect().left, maxLeft)) + 'px';
        },
        update: null,
        {{-- Indikator dan panel terbuka mengikuti perubahan, gulir, ukuran jendela, dan font yang selesai dimuat. --}}
        init() {
            this.update = () => this.sync();
            this.update();
            document.fonts?.ready.then(this.update);
            addEventListener('scroll', this.update, true);
            addEventListener('resize', this.update);
            this.$watch('openIndex', () => this.$nextTick(this.update));
        },
        destroy() {
            removeEventListener('scroll', this.update, true);
            removeEventListener('resize', this.update);
            clearTimeout(this.timer);
        },
        {{-- Hover mouse: masuk membuka setelah jeda (langsung bila panel lain terbuka), keluar menutup panel. --}}
        onHover(event) {
            if (event.pointerType !== 'mouse') return;
            clearTimeout(this.timer);
            const open = this.$root.querySelector('[aria-expanded=true] + *');
            const target = event.type === 'pointerenter' ? event.currentTarget.querySelector('[popover]') : null;
            if (target && target === open) return;
            this.timer = setTimeout(() => target ? target.showPopover() : open?.hidePopover(), target ? (open ? 0 : this.openDelay) : this.closeDelay);
        },
        {{-- Link di panel menutup panelnya. Klik mouse pada pemicu yang sudah terbuka (biasanya oleh hover) tidak menutupnya. --}}
        onClick(event) {
            const panel = event.target.closest('[popover]');
            if (panel) return event.target.closest('a') && panel.hidePopover();
            clearTimeout(this.timer);
            if (event.detail && event.target.closest('[aria-expanded=true]')) event.preventDefault();
        },
        {{-- Panah kiri/kanan, Home, dan End berpindah antar item tingkat atas; ArrowDown membuka panel dan memfokuskan link pertama; Escape di panel menutupnya. --}}
        onKeydown(event) {
            const element = event.target;
            const panel = element.closest('[popover]');
            if (panel) {
                if (event.key !== 'Escape') return;
                panel.hidePopover();
                return panel.previousElementSibling.focus();
            }
            const all = this.tops();
            const current = all.indexOf(element);
            const own = element.nextElementSibling;
            const target = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: -1 }[event.key];
            if (target === undefined && (event.key !== 'ArrowDown' || !own)) return;
            event.preventDefault();
            if (target !== undefined) return all.at(target % all.length)?.focus();
            own.showPopover();
            own.querySelector('a')?.focus();
        },
        {{-- Fokus keluar dari entri (pemicu dan panelnya) menutup panel. --}}
        onFocusout(event) {
            const panel = event.target.closest('[popover]') ?? event.target.nextElementSibling;
            const next = event.relatedTarget;
            if (next && panel && !panel.parentElement.contains(next)) panel.hidePopover();
        },
        {{-- beforetoggle berjalan sinkron; posisi panel diatur setelah status berubah. --}}
        onToggle(index, event) {
            if (event.newState === 'open') this.openIndex = index;
            else if (this.openIndex === index) this.openIndex = null;
        },
    }"
    id="{{ $id }}"
    aria-label="{{ $navLabel }}"
    {{ $attributes->except('id')->class([$root]) }}
>
    <ul class="{{ $list }}" @keydown="onKeydown($event)" @click="onClick($event)" @focusout="onFocusout($event)">
        @foreach ($items as $index => $item)
            @php
                $active = (bool) ($item['active'] ?? false);
                $featured = $item['featured'] ?? null;
                $links = $item['links'] ?? [];
                $panelId = $id.'-panel-'.$index;
            @endphp
            <li @pointerenter="onHover($event)" @pointerleave="onHover($event)">
                @if (count($links) > 0 || $featured)
                    <button
                        type="button"
                        popovertarget="{{ $panelId }}"
                        aria-expanded="false"
                        aria-controls="{{ $panelId }}"
                        @if ($active) aria-current="true" @endif
                        :aria-expanded="openIndex === {{ $index }} ? 'true' : 'false'"
                        class="{{ $topItem }}"
                    ><span>{{ $item['label'] }}</span><svg class="{{ $chevron }}" {!! $svg !!}><path d="m6 9 6 6 6-6" /></svg></button>
                    <div
                        id="{{ $panelId }}"
                        popover="auto"
                        wire:ignore.self
                        class="{{ $panel }}{{ $featured ? ' '.$featuredLayout : '' }}"
                        @beforetoggle="onToggle({{ $index }}, $event)"
                    >
                        @if ($featured)
                            <a href="{{ $safeHref((string) $featured['href']) }}" class="{{ $featuredClass }}">
                                <span aria-hidden="true" class="{{ $featuredPattern }}"></span>
                                <svg class="{{ $featuredArrow }}" {!! $svg !!}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                                <span class="{{ $featuredBody }}">
                                    <span class="{{ $featuredTitle }}">{{ $featured['title'] }}</span>
                                    @if (! empty($featured['description']))
                                        <span class="{{ $featuredText }}">{{ $featured['description'] }}</span>
                                    @endif
                                </span>
                            </a>
                        @endif
                        @if (count($links) > 0)
                            <ul class="{{ $linkGrid }}">
                                @foreach ($links as $link)
                                    <li>
                                        <a href="{{ $safeHref((string) $link['href']) }}" class="{{ $panelLink }}">
                                            @if (! empty($link['icon']))
                                                <svg class="{{ $iconClass }}" {!! $svg !!}><path d="{{ $link['icon'] }}" /></svg>
                                            @endif
                                            <span class="{{ $linkBody }}">
                                                <span class="{{ $linkTitle }}">{{ $link['label'] }}</span>
                                                @if (! empty($link['description']))
                                                    <span class="{{ $linkDescription }}">{{ $link['description'] }}</span>
                                                @endif
                                            </span>
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                @else
                    <a href="{{ $safeHref((string) ($item['href'] ?? '#')) }}" @if ($active) aria-current="page" @endif class="{{ $topItem }}">{{ $item['label'] }}</a>
                @endif
            </li>
        @endforeach
    </ul>
    <span x-ref="bar" wire:ignore aria-hidden="true" data-state="hidden" hidden class="{{ $indicatorClass }}"></span>
</nav>
