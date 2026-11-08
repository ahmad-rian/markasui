@props([
    'variant' => 'minimal',
    'code' => '404',
    'title' => 'Page not found',
    'description' => 'The page you are looking for does not exist or has been moved.',
    'homeHref' => '/',
    'links' => [],
    'path' => '/page',
    'homeLabel' => 'Back to home',
    'backLabel' => 'Go back',
    'searchLabel' => 'Search pages',
    'emptyLabel' => 'No pages match your search',
])

@php
    $root = '@container grid w-full text-ink **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:animate-none motion-reduce:**:transition-none';
    $centered = 'mx-auto max-w-lg justify-items-center text-center';
    $layouts = [
        'minimal' => $centered,
        'split' => 'items-center gap-8 @xl:grid-cols-2',
        'search' => $centered,
        'glitch' => $centered,
        'illustrated' => $centered,
        'terminal' => 'mx-auto max-w-xl gap-6',
    ];
    $big = 'mb-2 text-8xl leading-none font-semibold tracking-tighter';
    $eyebrow = 'rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-muted';
    $codes = [
        'minimal' => $big,
        'glitch' => $big.' relative before:absolute before:inset-0 before:animate-[markas-glitch_2s_steps(1)_infinite] before:text-danger before:content-[attr(data-text)] after:absolute after:inset-0 after:animate-[markas-glitch_1.5s_steps(1)_infinite_reverse] after:text-success after:content-[attr(data-text)] motion-reduce:before:hidden motion-reduce:after:hidden',
        'illustrated' => $big.' relative grid *:col-start-1 *:row-start-1',
        'split' => $eyebrow,
        'search' => $eyebrow,
    ];
    $content = 'grid w-full gap-4 [justify-items:inherit]';
    $shadow = 'translate-2.5 text-primary/15';
    $outline = 'text-transparent [-webkit-text-stroke:2px_var(--color-ink)]';
    $compass = 'absolute -top-4 -right-10 size-12 rotate-12 rounded-full bg-canvas p-1 text-muted';
    $art = 'order-last mx-auto w-full max-w-xs';
    $artSoft = 'fill-primary-soft';
    $artStroke = 'fill-surface stroke-line';
    $artInk = 'fill-subtle stroke-ink';
    $titleClass = 'text-3xl font-semibold tracking-tight text-balance';
    $descriptionClass = 'max-w-prose text-pretty text-muted';
    $terminal = 'rounded-xl border border-line bg-surface p-4 text-left font-mono text-sm';
    $prompt = 'text-muted';
    $terminalTitle = 'text-danger';
    $cursor = 'inline-block h-4 w-2 animate-pulse bg-ink align-middle';
    $searchWrap = 'relative w-full text-sm';
    $searchIcon = 'absolute top-3 left-3 size-4 text-muted';
    $searchInput = 'h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 placeholder:text-faint';
    $list = 'mt-3 divide-y divide-line rounded-xl border border-line bg-surface text-left';
    $listLink = 'flex justify-between rounded-xl px-4 py-3 font-medium hover:bg-subtle';
    $arrow = 'size-4 text-muted';
    $empty = 'text-muted not-empty:mt-3';
    $actions = 'flex flex-wrap gap-3';
    $button = 'inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors duration-150 ease-out';
    $primary = 'bg-primary text-on-primary hover:bg-primary-strong';
    $secondary = 'border border-line bg-surface hover:bg-subtle';
    $backIcon = 'size-4';
    $keyframes = '@keyframes markas-glitch{0%{clip-path:inset(20% 0 55% 0);translate:-3px 1px}33%{clip-path:inset(60% 0 10% 0);translate:3px -1px}66%{clip-path:inset(35% 0 40% 0);translate:-2px 2px}}';
    $svg = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser.
    $safeHref = fn (?string $href): string => preg_match('/^(?!https?:|mailto:|tel:)[a-z][\w+.\-]*:/i', preg_replace('/[\x00-\x20]/', '', (string) $href)) === 1 ? '#' : (string) ($href ?? '#');
    $variant = array_key_exists($variant, $layouts) ? $variant : 'minimal';
    $links = array_values(array_map(fn ($link) => ['label' => (string) $link['label'], 'href' => $safeHref($link['href'] ?? '#')], $links));
    $titleId = ($attributes->get('id') ?? 'markas-not-found-'.\Illuminate\Support\Str::random(8)).'-title';
    $home = $safeHref($homeHref);
@endphp

<section
    x-data="{
        query: '',
        get needle() { return this.query.trim().toLowerCase() },
        matches(label) { return label.toLowerCase().includes(this.needle) },
        get count() { return @js($links).filter((link) => this.matches(link.label)).length },
        {{-- Kembali ke halaman sebelumnya; tanpa riwayat, link berjalan biasa ke homeHref. --}}
        back(event) {
            if (history.length < 2) return;
            event.preventDefault();
            history.back();
        },
    }"
    aria-labelledby="{{ $titleId }}"
    {{ $attributes->class([$root, $layouts[$variant]]) }}
>
    @if ($variant === 'split')
        <svg viewBox="0 0 240 200" class="{{ $art }}" aria-hidden="true"><circle cx="150" cy="92" r="64" class="{{ $artSoft }}" /><rect x="34" y="48" width="92" height="92" rx="14" stroke-width="2" class="{{ $artStroke }}" /><path d="M60 176 108 96l48 80z" stroke-width="2" class="{{ $artInk }}" /></svg>
    @endif
    @if ($variant === 'terminal')
        <div class="{{ $terminal }}">
            <p><span class="{{ $prompt }}">$ </span>cd {{ $path }}</p>
            <h1 id="{{ $titleId }}" class="{{ $terminalTitle }}">{{ $code }}: {{ $title }}</h1>
            <p aria-hidden="true"><span class="{{ $prompt }}">$ </span><span class="{{ $cursor }}"></span></p>
        </div>
    @endif
    <div class="{{ $content }}">
        @isset($codes[$variant])
            <p aria-hidden="true" data-text="{{ $code }}" class="{{ $codes[$variant] }}">@if ($variant === 'glitch')<style>{!! $keyframes !!}</style>@endif @if ($variant === 'illustrated')<span class="{{ $shadow }}">{{ $code }}</span><span class="{{ $outline }}">{{ $code }}</span><svg class="{{ $compass }}" {!! $svg !!}><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm4.2-14.2-2.1 6.3-6.3 2.1 2.1-6.3z" /></svg>@else{{ $code }}@endif</p>
        @endisset
        @if ($variant !== 'terminal')
            <h1 id="{{ $titleId }}" class="{{ $titleClass }}">{{ $title }}</h1>
        @endif
        <p class="{{ $descriptionClass }}">{{ $description }}</p>
        @if ($variant === 'search')
            <div class="{{ $searchWrap }}">
                <svg class="{{ $searchIcon }}" {!! $svg !!}><path d="m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" /></svg>
                <input type="search" x-model="query" aria-label="{{ $searchLabel }}" placeholder="{{ $searchLabel }}" class="{{ $searchInput }}" />
                @if (count($links))
                    <ul x-show="count" class="{{ $list }}">
                        @foreach ($links as $link)
                            <li x-show="matches(@js($link['label']))"><a href="{{ $link['href'] }}" class="{{ $listLink }}">{{ $link['label'] }}<svg class="{{ $arrow }}" {!! $svg !!}><path d="M5 12h14m-6-6 6 6-6 6" /></svg></a></li>
                        @endforeach
                    </ul>
                @endif
                <p role="status" class="{{ $empty }}" x-text="needle && !count ? @js($emptyLabel) : ''"></p>
            </div>
        @endif
        <div class="{{ $actions }}">
            <a href="{{ $home }}" class="{{ $button }} {{ $primary }}">{{ $homeLabel }}</a>
            <a href="{{ $home }}" @click="back($event)" class="{{ $button }} {{ $secondary }}"><svg class="{{ $backIcon }}" {!! $svg !!}><path d="M19 12H5m6 6-6-6 6-6" /></svg>{{ $backLabel }}</a>
        </div>
    </div>
</section>
