@props([
    'sections' => [],
    'variant' => 'default',
    'breakpoint' => 'md',
    'collapsed' => false,
    'navLabel' => 'Sidebar',
    'collapseLabel' => 'Collapse sidebar',
    'expandLabel' => 'Expand sidebar',
    'openLabel' => 'Open sidebar',
    'closeLabel' => 'Close sidebar',
])

@php
    $root = '@container flex overflow-hidden bg-canvas';
    $aside = 'relative hidden w-56 shrink-0 flex-col bg-surface text-sm transition-[width] duration-200 ease-out data-[state=collapsed]:w-16 motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none';
    $variants = [
        'default' => 'border-r border-line',
        'floating' => 'm-2 rounded-xl border border-line',
    ];
    $showAside = ['sm' => '@sm:flex', 'md' => '@2xl:flex', 'lg' => '@4xl:flex'];
    $hideBar = ['sm' => '@sm:hidden', 'md' => '@2xl:hidden', 'lg' => '@4xl:hidden'];
    $headerClass = 'flex h-14 shrink-0 items-center border-b border-line px-4';
    // Isi header dan footer dipotong di tepi konten agar rail hanya menampilkan 32px pertama.
    $slotClass = 'flex min-w-0 flex-1 items-center gap-2 overflow-hidden whitespace-nowrap';
    $footerClass = 'shrink-0 border-t border-line px-4 py-3';
    $collapseButton = 'absolute top-4 -right-3 z-10 grid size-6 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:text-ink';
    $collapseIcon = 'size-3.5 transition-transform duration-200 ease-out in-data-[state=collapsed]:rotate-180';
    $navClass = 'min-h-0 flex-1 overflow-y-auto p-3 in-data-[state=collapsed]:overflow-visible';
    $listWrap = 'relative grid gap-3 [anchor-scope:--active,--hover]';
    $indicator = 'absolute inset-[anchor(--hover_top,anchor(--active_top))_anchor(--hover_right,anchor(--active_right))_anchor(--hover_bottom,anchor(--active_bottom))_anchor(--hover_left,anchor(--active_left))] rounded-md bg-subtle transition-[inset] duration-200 ease-out';
    $sectionClass = 'grid gap-0.5 border-t border-line pt-3 first-of-type:border-t-0 first-of-type:pt-0';
    $titleClass = 'px-2.5 pb-1 text-xs font-medium text-faint in-data-[state=collapsed]:sr-only';
    $listClass = 'grid gap-0.5';
    $item = 'group/item relative flex h-9 w-full items-center gap-3 rounded-md px-2.5 text-left text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] [&:has(+div_[aria-current=page])]:[anchor-name:--active]';
    $iconClass = 'size-5 shrink-0';
    $labelClass = 'min-w-0 flex-1 truncate in-data-[state=collapsed]:sr-only';
    $badgeClass = 'rounded-full bg-primary-soft px-1.5 py-0.5 text-xs leading-none font-medium text-primary in-data-[state=collapsed]:sr-only';
    $dot = 'absolute top-1.5 right-1.5 hidden size-2 rounded-full bg-primary in-data-[state=collapsed]:block';
    $chevron = 'size-4 shrink-0 text-faint transition-transform duration-200 ease-out group-aria-expanded/item:rotate-90 in-data-[state=collapsed]:hidden';
    $tip = 'absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 rounded-md bg-ink px-2 py-1 text-xs whitespace-nowrap text-canvas shadow-overlay in-data-[state=collapsed]:group-hover/item:block in-data-[state=collapsed]:group-focus-visible/item:block';
    $region = 'invisible grid grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-200 ease-out data-[state=open]:visible data-[state=open]:grid-rows-[1fr] in-data-[state=collapsed]:hidden';
    $regionInner = 'min-h-0 overflow-hidden';
    $subList = 'ml-5 grid gap-0.5 border-l border-line py-1 pr-1 pl-2';
    $subItem = 'relative flex h-8 w-full items-center rounded-md px-2.5 text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] in-data-[state=closed]:[anchor-name:none]!';
    $content = 'flex min-w-0 flex-1 flex-col';
    $mobileBar = 'flex h-14 shrink-0 items-center border-b border-line px-3';
    $iconButton = 'grid size-9 shrink-0 place-items-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $dialogClass = 'right-auto left-0 m-0 h-dvh max-h-dvh w-72 flex-col border-r border-line bg-surface p-0 text-sm text-ink shadow-overlay transition-transform duration-200 ease-out backdrop:bg-ink/40 open:flex starting:open:-translate-x-full motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none';

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser.
    $safeHref = fn (string $href): string => preg_match('/^(?!https?:|mailto:|tel:)[a-z][\w+.\-]*:/i', preg_replace('/[\x00-\x20]/', '', $href)) === 1 ? '#' : $href;
    $svg = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    $hasBadge = fn (array $entry): bool => isset($entry['badge']) && $entry['badge'] !== '';

    $id = $attributes->get('id') ?? 'markas-sidebar-'.\Illuminate\Support\Str::random(8);
    $asideId = $id.'-aside';
    $dialogId = $id.'-dialog';

    // Grup sub-item terbuka di awal bila open diisi atau ada sub-item aktif.
    $groups = [];
    foreach ($sections as $s => $section) {
        foreach ($section['items'] ?? [] as $i => $entry) {
            $childActive = collect($entry['children'] ?? [])->contains(fn ($child) => ! empty($child['active']));
            $groups[$s.'-'.$i] = (bool) ($entry['open'] ?? $childActive);
        }
    }
@endphp

<div
    x-data="{
        collapsed: @js((bool) $collapsed),
        groups: @js((object) $groups),
        setCollapsed(value) {
            this.collapsed = value;
            this.$dispatch('markas-collapsed-change', value);
        },
        {{-- Di rail, tombol induk membentangkan sidebar dan membuka grupnya. --}}
        toggleGroup(key, rail) {
            if (rail) this.setCollapsed(false);
            this.groups[key] = rail || ! this.groups[key];
        },
    }"
    {{ $attributes->merge(['id' => $id])->class([$root]) }}
>
    @foreach (['d', 'm'] as $copy)
        @php
            $prefix = $id.'-'.$copy;
            $rail = $copy === 'd' ? 'collapsed' : 'false';
        @endphp
        @if ($copy === 'd')
            <aside
                id="{{ $asideId }}"
                data-state="{{ $collapsed ? 'collapsed' : 'expanded' }}"
                :data-state="collapsed ? 'collapsed' : 'expanded'"
                class="{{ $aside }} {{ $variants[$variant] }} {{ $showAside[$breakpoint] }}"
            >
                @isset($header)
                    <div class="{{ $headerClass }}"><div class="{{ $slotClass }}">{{ $header }}</div></div>
                @endisset
        @else
            <dialog
                x-ref="dialog"
                id="{{ $dialogId }}"
                aria-label="{{ $navLabel }}"
                @click="if ($event.target === $el || $event.target.closest('a[href]')) $el.close()"
                class="{{ $dialogClass }}"
            >
                <div class="{{ $headerClass }}">
                    <div class="{{ $slotClass }}">{{ $header ?? '' }}</div>
                    <form method="dialog">
                        <button type="submit" aria-label="{{ $closeLabel }}" class="{{ $iconButton }}">
                            <svg class="{{ $iconClass }}" {!! $svg !!}><path d="M18 6 6 18M6 6l12 12" /></svg>
                        </button>
                    </form>
                </div>
        @endif
                <nav aria-label="{{ $navLabel }}" class="{{ $navClass }}">
                    <div class="{{ $listWrap }}">
                        <span aria-hidden="true" class="{{ $indicator }}"></span>
                        @foreach ($sections as $s => $section)
                            <div class="{{ $sectionClass }}">
                                @if (! empty($section['title']))
                                    <p aria-hidden="true" class="{{ $titleClass }}">{{ $section['title'] }}</p>
                                @endif
                                <ul @if (! empty($section['title'])) aria-label="{{ $section['title'] }}" @endif class="{{ $listClass }}">
                                    @foreach ($section['items'] ?? [] as $i => $entry)
                                        @php
                                            $key = $s.'-'.$i;
                                            $open = $groups[$key];
                                            $regionId = $prefix.'-g'.$key;
                                        @endphp
                                        <li>
                                            @if (! empty($entry['children']))
                                                <button
                                                    type="button"
                                                    aria-expanded="{{ $open ? 'true' : 'false' }}"
                                                    aria-controls="{{ $regionId }}"
                                                    :aria-expanded="groups['{{ $key }}'] ? 'true' : 'false'"
                                                    @click="toggleGroup('{{ $key }}', {{ $rail }})"
                                                    class="{{ $item }}"
                                                >
                                                    @if (! empty($entry['icon']))
                                                        <svg class="{{ $iconClass }}" {!! $svg !!}><path d="{{ $entry['icon'] }}" /></svg>
                                                    @endif
                                                    <span class="{{ $labelClass }}">{{ $entry['label'] }}</span>
                                                    @if ($hasBadge($entry))
                                                        <span class="{{ $badgeClass }}">{{ $entry['badge'] }}</span>
                                                        <span aria-hidden="true" class="{{ $dot }}"></span>
                                                    @endif
                                                    <svg class="{{ $chevron }}" {!! $svg !!}><path d="m9 6 6 6-6 6" /></svg>
                                                    <span aria-hidden="true" class="{{ $tip }}">{{ $entry['label'] }}</span>
                                                </button>
                                                <div
                                                    id="{{ $regionId }}"
                                                    data-state="{{ $open ? 'open' : 'closed' }}"
                                                    :data-state="groups['{{ $key }}'] ? 'open' : 'closed'"
                                                    class="{{ $region }}"
                                                >
                                                    <div class="{{ $regionInner }}">
                                                        <ul class="{{ $subList }}">
                                                            @foreach ($entry['children'] as $child)
                                                                <li>
                                                                    @if (! empty($child['disabled']))
                                                                        <a role="link" aria-disabled="true" class="{{ $subItem }}">{{ $child['label'] }}</a>
                                                                    @else
                                                                        <a
                                                                            href="{{ $safeHref((string) ($child['href'] ?? '#')) }}"
                                                                            @if (! empty($child['active'])) aria-current="page" @endif
                                                                            class="{{ $subItem }}"
                                                                        >{{ $child['label'] }}</a>
                                                                    @endif
                                                                </li>
                                                            @endforeach
                                                        </ul>
                                                    </div>
                                                </div>
                                            @else
                                                <a
                                                    @if (! empty($entry['disabled']))
                                                        role="link" aria-disabled="true"
                                                    @else
                                                        href="{{ $safeHref((string) ($entry['href'] ?? '#')) }}"
                                                        @if (! empty($entry['active'])) aria-current="page" @endif
                                                    @endif
                                                    class="{{ $item }}"
                                                >
                                                    @if (! empty($entry['icon']))
                                                        <svg class="{{ $iconClass }}" {!! $svg !!}><path d="{{ $entry['icon'] }}" /></svg>
                                                    @endif
                                                    <span class="{{ $labelClass }}">{{ $entry['label'] }}</span>
                                                    @if ($hasBadge($entry))
                                                        <span class="{{ $badgeClass }}">{{ $entry['badge'] }}</span>
                                                        <span aria-hidden="true" class="{{ $dot }}"></span>
                                                    @endif
                                                    <span aria-hidden="true" class="{{ $tip }}">{{ $entry['label'] }}</span>
                                                </a>
                                            @endif
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        @endforeach
                    </div>
                </nav>
                @isset($footer)
                    <div class="{{ $footerClass }}"><div class="{{ $slotClass }}">{{ $footer }}</div></div>
                @endisset
        @if ($copy === 'd')
                <button
                    type="button"
                    aria-label="{{ $collapsed ? $expandLabel : $collapseLabel }}"
                    aria-expanded="{{ $collapsed ? 'false' : 'true' }}"
                    aria-controls="{{ $asideId }}"
                    :aria-label="collapsed ? @js($expandLabel) : @js($collapseLabel)"
                    :aria-expanded="collapsed ? 'false' : 'true'"
                    @click="setCollapsed(! collapsed)"
                    class="{{ $collapseButton }}"
                >
                    <svg class="{{ $collapseIcon }}" {!! $svg !!}><path d="m15 6-6 6 6 6" /></svg>
                </button>
            </aside>
        @else
            </dialog>
        @endif
    @endforeach
    <div class="{{ $content }}">
        <div class="{{ $mobileBar }} {{ $hideBar[$breakpoint] }}">
            <button
                type="button"
                aria-label="{{ $openLabel }}"
                aria-haspopup="dialog"
                aria-controls="{{ $dialogId }}"
                @click="$refs.dialog.showModal()"
                class="{{ $iconButton }}"
            >
                <svg class="{{ $iconClass }}" {!! $svg !!}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>
        {{ $slot }}
    </div>
</div>
