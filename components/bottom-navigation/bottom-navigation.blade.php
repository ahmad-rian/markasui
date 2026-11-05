@props([
    'items' => [],
    'defaultValue' => null,
    'shrinkOnScroll' => false,
    'navLabel' => 'Main',
    'actionLabel' => 'Create',
    'badgeLabel' => '{count} new',
])

@php
    $root = 'flex items-center gap-2 transition-transform duration-300 ease-out data-[state=collapsed]:translate-y-1 motion-reduce:transition-none';
    $nav = 'relative min-w-0 flex-1 rounded-full border border-line bg-surface/85 p-1.5 shadow-overlay backdrop-blur-md';
    $pill = 'absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/var(--bn-count))] translate-x-[calc(var(--bn-index)*100%)] rounded-full bg-primary-soft transition-transform duration-500 ease-[cubic-bezier(0.34,1.36,0.5,1)] motion-reduce:transition-none';
    $list = 'relative grid auto-cols-fr grid-flow-col';
    $itemClass = 'group/item relative flex h-14 w-full items-center justify-center rounded-full text-muted transition-[color,height] duration-300 ease-out select-none hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[current=page]:text-ink motion-reduce:transition-none [[data-bottom-nav=collapsed]_&]:h-11';
    $iconWrap = 'relative transition-transform duration-300 ease-out group-active/item:scale-90 motion-reduce:transition-none [[data-bottom-nav=expanded]_[aria-current=page]_&]:-translate-y-2.5';
    $iconClass = 'size-6';
    $badgeClass = 'absolute -top-1 -right-2 h-4 min-w-4 rounded-full bg-danger px-1 text-center text-[10px] leading-4 font-semibold text-on-primary';
    $labelClass = 'pointer-events-none absolute inset-x-1 bottom-1.5 translate-y-1 truncate text-center text-xs leading-4 font-medium opacity-0 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none [[data-bottom-nav=expanded]_[aria-current=page]_&]:translate-y-0 [[data-bottom-nav=expanded]_[aria-current=page]_&]:opacity-100';
    $srOnly = 'sr-only';
    $actionClass = 'grid size-14 shrink-0 place-items-center rounded-full bg-primary text-on-primary shadow-overlay transition-[background-color,width,height,scale] duration-300 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 motion-reduce:transition-none [[data-bottom-nav=collapsed]_&]:size-11';

    // Href with a scheme other than http, https, mailto, or tel (such as javascript:) becomes "#".
    $safeHref = fn (string $href): string => preg_match('/^(?!https?:|mailto:|tel:)[a-z][\w+.\-]*:/i', preg_replace('/[\x00-\x20]/', '', $href)) === 1 ? '#' : $href;
    $items = array_values($items);
    $values = array_map(fn ($item) => (string) $item['value'], $items);
    $active = $defaultValue ?? ($values[0] ?? null);
    $index = max(0, (int) array_search($active, $values, true));
    $action = $__laravel_slots['action'] ?? null;
@endphp

{{-- Scrolling down inside the parent element (or the page) collapses the bar to icons when shrink-on-scroll is set. --}}
<div
    x-data="{
        active: @js($active),
        values: @js($values),
        collapsed: false,
        last: null,
        lastTop: 0,
        {{-- Scroll distance before the bar reacts, and how far down the content must be before it collapses. --}}
        delta: 4,
        collapseAfter: 32,
        get state() {
            return this.collapsed ? 'collapsed' : 'expanded';
        },
        select(value) {
            this.active = value;
            this.collapsed = false;
            this.$dispatch('change', value);
        },
        onScroll(event) {
            const target = event.target;
            if (target !== document && !this.$root.parentElement?.contains(target)) return;
            const top = target === document ? scrollY : target.scrollTop;
            if (target !== this.last) [this.last, this.lastTop] = [target, 0];
            if (Math.abs(top - this.lastTop) < this.delta) return;
            this.collapsed = top > this.lastTop && top > this.collapseAfter;
            this.lastTop = top;
        },
        init() {
            this.handler = (event) => this.onScroll(event);
            if (@js((bool) $shrinkOnScroll)) document.addEventListener('scroll', this.handler, { capture: true, passive: true });
        },
        destroy() {
            document.removeEventListener('scroll', this.handler, { capture: true });
        },
    }"
    data-state="expanded"
    data-bottom-nav="expanded"
    x-bind:data-state="state"
    x-bind:data-bottom-nav="state"
    {{ $attributes->class([$root]) }}
>
    <nav
        aria-label="{{ $navLabel }}"
        class="{{ $nav }}"
        style="--bn-count: {{ count($items) }}; --bn-index: {{ $index }}"
        x-bind:style="{ '--bn-index': Math.max(values.indexOf(active), 0) }"
    >
        <span aria-hidden="true" class="{{ $pill }}"></span>
        <ul class="{{ $list }}">
            @foreach ($items as $item)
                @php
                    $value = (string) $item['value'];
                    $tag = isset($item['href']) ? 'a' : 'button';
                    $hasBadge = isset($item['badge']);
                @endphp
                <li>
                    <{{ $tag }}
                        @if ($tag === 'a') href="{{ $safeHref($item['href']) }}" @else type="button" @endif
                        @if ($value === $active) aria-current="page" @endif
                        x-bind:aria-current="active === @js($value) ? 'page' : null"
                        x-on:click="select(@js($value))"
                        class="{{ $itemClass }}"
                    >
                        <span class="{{ $iconWrap }}">
                            <svg class="{{ $iconClass }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $item['icon'] }}" /></svg>
                            @if ($hasBadge)
                                <span aria-hidden="true" class="{{ $badgeClass }}">{{ $item['badge'] }}</span>
                            @endif
                        </span>
                        <span class="{{ $labelClass }}">{{ $item['label'] }}</span>
                        @if ($hasBadge)
                            <span class="{{ $srOnly }}">{{ str_replace('{count}', (string) $item['badge'], $badgeLabel) }}</span>
                        @endif
                    </{{ $tag }}>
                </li>
            @endforeach
        </ul>
    </nav>
    @if ($action)
        <button type="button" aria-label="{{ $actionLabel }}" class="{{ $actionClass }}" x-on:click="$dispatch('action')">{{ $action }}</button>
    @endif
</div>
