@props([
    'links' => [],
    'variant' => 'default',
    'sticky' => false,
    'menuLabel' => 'Menu',
    'navLabel' => 'Main',
    'mobileNavLabel' => 'Main mobile',
])

@php
    $root = '@container w-full **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none';
    $variants = [
        'default' => 'top-0 border-b border-line bg-surface',
        'floating' => 'top-3 rounded-2xl border border-line bg-surface shadow-overlay',
        'blur' => 'top-0 border-b border-line/60 bg-surface/70 backdrop-blur-md',
    ];
    $stickyClass = 'sticky z-40';
    $bar = 'flex h-14 items-center gap-4 px-4';
    $brandClass = 'flex shrink-0 items-center gap-2 text-sm font-semibold text-ink';
    $desktopNav = 'relative hidden items-center @2xl:flex';
    $indicator = 'absolute inset-y-0 left-0 rounded-md bg-subtle transition-[translate,width] duration-200 ease-out';
    $list = 'relative flex items-center';
    $item = 'flex h-9 cursor-pointer items-center justify-between gap-1 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink aria-expanded:text-ink aria-[current]:bg-subtle aria-[current]:text-ink @max-2xl:hover:bg-subtle [&::-webkit-details-marker]:hidden';
    $chevron = 'size-3.5 text-faint transition-transform duration-200 ease-out in-aria-expanded:rotate-180 in-open:rotate-180';
    $panel = 'inset-auto m-0 rounded-xl border border-line bg-surface p-2 text-ink shadow-overlay transition-[opacity,translate] duration-200 ease-out starting:open:translate-y-1.5 starting:open:opacity-0';
    $panelList = 'grid grid-flow-col grid-rows-3 gap-1';
    $panelLink = 'flex w-64 items-start gap-3 rounded-lg p-3 text-sm transition-colors duration-150 ease-out hover:bg-subtle focus-visible:bg-subtle';
    $iconClass = 'size-9 shrink-0 rounded-md border border-line bg-canvas p-[7px]';
    $linkBody = 'grid gap-0.5';
    $linkTitle = 'font-medium';
    $linkDescription = 'text-muted';
    $actionsClass = 'ml-auto flex items-center gap-2';
    $toggle = 'inline-flex size-9 shrink-0 items-center justify-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle @2xl:hidden';
    $openIcon = 'size-5 in-aria-expanded:hidden';
    $closeIcon = 'hidden size-5 in-aria-expanded:block';
    $mobilePanel = 'border-t border-line px-4 py-2 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0 @2xl:hidden';
    $mobileList = 'grid gap-1';
    $groupList = 'my-1 ml-3 grid gap-1 border-l border-line pl-2 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0';

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser.
    $safeHref = fn (?string $href): string => preg_match('/^(?!https?:|mailto:|tel:)[a-z][\w+.\-]*:/i', preg_replace('/[\x00-\x20]/', '', (string) $href)) === 1 ? '#' : (string) ($href ?? '#');
    $svg = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    $links = array_values($links);

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-navbar|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-navbar-'.hash('xxh32', $idKey.$idIndex);
    $menuId = $id.'-menu';
@endphp

<header
    x-data="{
        open: false,
        timer: null,
        {{-- Jeda sebelum panel terbuka saat kursor singgah, dan sebelum tertutup saat kursor pergi. Jarak panel dari pemicu dan tepi layar. --}}
        openDelay: 120,
        closeDelay: 180,
        gap: 8,
        {{-- Geser indikator ke item yang di-hover, panel terbuka, atau item aktif, lalu letakkan panel terbuka di bawah pemicunya. --}}
        sync() {
            const nav = this.$refs.nav;
            const find = (selector) => nav.querySelector(selector);
            const open = find('[aria-expanded=true]');
            const target = find(':scope>ul>li:hover>:first-child') ?? open ?? find('[aria-current]');
            const pill = nav.firstElementChild;
            pill.hidden = !target;
            if (target) {
                pill.style.width = target.offsetWidth + 'px';
                pill.style.translate = target.offsetLeft + 'px 0';
            }
            const popover = open?.nextElementSibling;
            if (!popover) return;
            const box = open.getBoundingClientRect();
            const maxLeft = innerWidth - popover.offsetWidth - this.gap;
            popover.style.top = (box.bottom + this.gap) + 'px';
            popover.style.left = Math.max(this.gap, Math.min(box.left, maxLeft)) + 'px';
        },
        destroy() {
            clearTimeout(this.timer);
        },
        onEscape() {
            if (!this.open) return;
            this.open = false;
            this.$refs.toggle.focus();
        },
        {{-- Hover mouse: masuk ke item dropdown membukanya setelah jeda, keluar menutupnya setelah jeda. Item tanpa dropdown tidak membatalkan jeda tutup. --}}
        onHover(event) {
            const panel = event.currentTarget.querySelector('[popover]');
            this.sync();
            if (event.pointerType !== 'mouse' || !panel) return;
            const enter = event.type === 'pointerenter';
            clearTimeout(this.timer);
            this.timer = setTimeout(() => panel.togglePopover(enter), enter ? this.openDelay : this.closeDelay);
        },
        {{-- Klik mouse pada pemicu yang sudah terbuka (biasanya oleh hover) tidak menutupnya. --}}
        onClick(event) {
            if (event.detail && event.currentTarget.matches('[aria-expanded=true]')) event.preventDefault();
        },
        {{-- ArrowDown di pemicu membuka panel dan memfokuskan link pertama. --}}
        onTriggerKeydown(event) {
            const panel = event.currentTarget.nextElementSibling;
            if (event.key !== 'ArrowDown') return;
            event.preventDefault();
            panel.showPopover();
            panel.querySelector('a')?.focus();
        },
        {{-- beforetoggle berjalan sinkron sehingga aria-expanded selalu terbaru; toggle meletakkan panel setelah tampil. --}}
        onToggle(event) {
            event.target.previousElementSibling.setAttribute('aria-expanded', String(event.newState === 'open'));
            this.sync();
        },
    }"
    @keydown.escape="onEscape()"
    {{ $attributes->merge(['id' => $id])->class([$root, $variants[$variant] ?? $variants['default'], $stickyClass => $sticky]) }}
>
    <div class="{{ $bar }}">
        @isset($brand)
            <div class="{{ $brandClass }}">{{ $brand }}</div>
        @endisset
        <nav x-ref="nav" aria-label="{{ $navLabel }}" class="{{ $desktopNav }}">
            <span aria-hidden="true" hidden class="{{ $indicator }}"></span>
            <ul class="{{ $list }}">
                @foreach ($links as $index => $entry)
                    @php
                        $children = $entry['children'] ?? [];
                        $panelId = $id.'-panel-'.$index;
                    @endphp
                    <li @pointerenter="onHover($event)" @pointerleave="onHover($event)">
                        @if (count($children) > 0)
                            <button
                                type="button"
                                popovertarget="{{ $panelId }}"
                                aria-expanded="false"
                                aria-controls="{{ $panelId }}"
                                class="{{ $item }}"
                                @click="onClick($event)"
                                @keydown="onTriggerKeydown($event)"
                            >{{ $entry['label'] }}<svg class="{{ $chevron }}" {!! $svg !!}><path d="m6 9 6 6 6-6" /></svg></button>
                            <div
                                id="{{ $panelId }}"
                                popover="auto"
                                wire:ignore.self
                                class="{{ $panel }}"
                                @beforetoggle="onToggle($event)"
                                @toggle="onToggle($event)"
                            >
                                <ul class="{{ $panelList }}">
                                    @foreach ($children as $child)
                                        <li>
                                            <a href="{{ $safeHref($child['href'] ?? null) }}" class="{{ $panelLink }}">
                                                @if (! empty($child['icon']))
                                                    <svg class="{{ $iconClass }}" {!! $svg !!}><path d="{{ $child['icon'] }}" /></svg>
                                                @endif
                                                <span class="{{ $linkBody }}">
                                                    <span class="{{ $linkTitle }}">{{ $child['label'] }}</span>
                                                    @if (! empty($child['description']))
                                                        <span class="{{ $linkDescription }}">{{ $child['description'] }}</span>
                                                    @endif
                                                </span>
                                            </a>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        @else
                            <a href="{{ $safeHref($entry['href'] ?? null) }}" @if (! empty($entry['active'])) aria-current="page" @endif class="{{ $item }}">{{ $entry['label'] }}</a>
                        @endif
                    </li>
                @endforeach
            </ul>
        </nav>
        <div class="{{ $actionsClass }}">
            {{ $actions ?? '' }}
            <button
                type="button"
                x-ref="toggle"
                aria-label="{{ $menuLabel }}"
                aria-expanded="false"
                aria-controls="{{ $menuId }}"
                :aria-expanded="open ? 'true' : 'false'"
                @click="open = ! open"
                class="{{ $toggle }}"
            >
                <svg class="{{ $openIcon }}" {!! $svg !!}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                <svg class="{{ $closeIcon }}" {!! $svg !!}><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
        </div>
    </div>
    <div
        id="{{ $menuId }}"
        data-state="closed"
        hidden
        :data-state="open ? 'open' : 'closed'"
        :hidden="! open"
        class="{{ $mobilePanel }}"
    >
        <nav aria-label="{{ $mobileNavLabel }}" class="{{ $mobileList }}">
            @foreach ($links as $entry)
                @if (count($entry['children'] ?? []) > 0)
                    <details wire:ignore.self>
                        <summary class="{{ $item }}">{{ $entry['label'] }}<svg class="{{ $chevron }}" {!! $svg !!}><path d="m6 9 6 6 6-6" /></svg></summary>
                        <div class="{{ $groupList }}">
                            @foreach ($entry['children'] as $child)
                                <a href="{{ $safeHref($child['href'] ?? null) }}" class="{{ $item }}">{{ $child['label'] }}</a>
                            @endforeach
                        </div>
                    </details>
                @else
                    <a href="{{ $safeHref($entry['href'] ?? null) }}" @if (! empty($entry['active'])) aria-current="page" @endif class="{{ $item }}">{{ $entry['label'] }}</a>
                @endif
            @endforeach
        </nav>
    </div>
</header>
