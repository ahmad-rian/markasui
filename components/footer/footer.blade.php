@props([
    'variant' => 'columns',
    'description' => null,
    'columns' => [],
    'socials' => [],
    'legal' => [],
    'copyright' => null,
    'heading' => null,
    'newsletterDescription' => null,
    'wordmark' => '',
    'backToTop' => false,
    'navLabel' => 'Footer',
    'legalLabel' => 'Legal',
    'socialLabel' => 'Social media',
    'newsletterLabel' => 'Subscribe to our newsletter',
    'emailLabel' => 'Email address',
    'subscribeLabel' => 'Subscribe',
    'successLabel' => 'Thanks for subscribing',
    'backToTopLabel' => 'Back to top',
])

@php
    $root = '@container w-full border-t border-line bg-canvas text-sm text-muted **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none';
    $wrap = 'grid gap-10 px-4 py-12 @2xl:px-8';
    $main = 'grid gap-10 @3xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]';
    $brandArea = 'grid max-w-sm content-start gap-4';
    $bottom = 'flex flex-col gap-4 border-t border-line pt-6 @2xl:flex-row @2xl:items-center';
    $row = 'flex flex-wrap items-center justify-between gap-6';
    $stack = 'grid justify-items-center gap-4';
    $contents = 'contents';
    // Tata letak tiap varian: [footer, baris utama, area brand, baris bawah].
    $layouts = [
        'columns' => [$wrap, $main, $brandArea, $bottom],
        'newsletter' => [$wrap, $main, $brandArea, $bottom],
        'big-brand' => ['grid gap-10 overflow-hidden px-4 pt-12 @2xl:px-8', $main, $brandArea, $bottom],
        'centered' => ['grid justify-items-center gap-8 px-4 py-12 text-center', 'grid justify-items-center gap-6', 'grid max-w-md justify-items-center gap-3', $stack],
        'cta' => [$wrap, $row, $contents, $bottom],
        'compact' => ['flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4', $contents, $contents, $contents],
    ];
    $brandClass = 'flex items-center gap-2 text-base font-semibold text-ink';
    $descriptionClass = 'leading-relaxed';
    $actionsClass = 'flex flex-wrap items-center gap-2';
    $columnsNav = 'grid grid-cols-2 gap-x-6 gap-y-8 @xl:grid-cols-[repeat(auto-fit,minmax(7rem,1fr))]';
    $columnTitle = 'font-medium text-ink';
    $columnList = 'mt-4 grid gap-3';
    $flatList = 'flex flex-wrap justify-center gap-x-6 gap-y-2';
    $link = 'rounded-sm transition-colors duration-150 ease-out hover:text-ink';
    $copyrightClass = '@2xl:mr-auto';
    $legalList = 'flex flex-wrap gap-x-4 gap-y-2';
    $socialList = 'flex items-center gap-1';
    $socialLink = 'inline-flex size-9 items-center justify-center rounded-md transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink';
    $icon = 'size-5';
    $topLink = 'inline-flex items-center gap-1.5 rounded-md font-medium text-ink transition-colors duration-150 ease-out hover:text-primary';
    $topIcon = 'size-4';
    $card = 'grid gap-6 rounded-2xl border border-line bg-surface p-6 @3xl:grid-cols-2 @3xl:items-center @3xl:p-8';
    $cardTitle = 'text-lg font-semibold text-balance text-ink';
    $cardText = 'mt-1.5 leading-relaxed';
    $form = 'flex flex-wrap gap-2';
    $input = 'h-10 min-w-0 flex-1 basis-48 rounded-lg border border-line bg-canvas px-3 text-ink placeholder:text-faint';
    $button = 'h-10 cursor-pointer rounded-lg bg-primary px-4 font-medium text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong';
    $status = 'basis-full font-medium text-ink empty:sr-only';
    $cta = 'grid justify-items-start gap-6 rounded-2xl border border-primary-line bg-primary-soft p-6 @2xl:p-10';
    $ctaTitle = 'max-w-xl text-2xl font-semibold tracking-tight text-balance text-ink @2xl:text-4xl';
    $ctaText = 'mt-3 max-w-lg text-base leading-relaxed';
    $wordmarkBox = '-mx-4 h-[0.6em] overflow-hidden text-[calc(200cqw/var(--chars))] leading-none select-none @2xl:-mx-8';
    $wordmarkText = '-mt-[0.08em] bg-linear-to-b from-ink/80 to-ink/5 bg-clip-text text-center font-semibold tracking-tighter whitespace-nowrap text-transparent';
    $svg = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

    [$footerClass, $mainClass, $brandAreaClass, $bottomClass] = $layouts[$variant] ?? $layouts['columns'];
    $hasColumns = $mainClass === $main;
    $isCta = $variant === 'cta';
    $isCentered = $variant === 'centered';
    $links = array_merge(...array_map(fn ($column) => $column['links'] ?? [], array_values($columns ?: [[]])));

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#".
    $safeHref = function (?string $href): string {
        $href ??= '#';
        $value = preg_replace('/[\x00-\x20]/', '', $href);

        return preg_match('/^(?!https?:|mailto:|tel:)[a-z][\w+.\-]*:/i', $value) === 1 ? '#' : $href;
    };
@endphp

@php
    ob_start();
@endphp
@if (count($socials) > 0)
    <ul aria-label="{{ $socialLabel }}" class="{{ $socialList }}">
        @foreach ($socials as $social)
            <li>
                <a href="{{ $safeHref($social['href'] ?? null) }}" aria-label="{{ $social['label'] }}" class="{{ $socialLink }}">
                    <svg class="{{ $icon }}" {!! $svg !!}><path d="{{ $social['icon'] }}" /></svg>
                </a>
            </li>
        @endforeach
    </ul>
@endif
@php
    $socialsList = ob_get_clean();
@endphp

<footer {{ $attributes->class([$root, $footerClass]) }}>
    @if ($variant === 'newsletter')
        <div class="{{ $card }}">
            <div>
                <h2 class="{{ $cardTitle }}">{{ $newsletterLabel }}</h2>
                @if ($newsletterDescription)
                    <p class="{{ $cardText }}">{{ $newsletterDescription }}</p>
                @endif
            </div>
            @isset($newsletter)
                {{ $newsletter }}
            @else
                <form class="{{ $form }}" x-data="{ subscribed: false }" x-on:submit.prevent="$el.reset(); subscribed = true">
                    <input type="email" name="email" required autocomplete="email" aria-label="{{ $emailLabel }}" placeholder="{{ $emailLabel }}" class="{{ $input }}" />
                    <button type="submit" class="{{ $button }}">{{ $subscribeLabel }}</button>
                    <p role="status" class="{{ $status }}" data-message="{{ $successLabel }}" x-text="subscribed ? $el.dataset.message : ''"></p>
                </form>
            @endisset
        </div>
    @endif
    @if ($isCta)
        <div class="{{ $cta }}">
            <div>
                @if ($heading)
                    <h2 class="{{ $ctaTitle }}">{{ $heading }}</h2>
                @endif
                @if ($description)
                    <p class="{{ $ctaText }}">{{ $description }}</p>
                @endif
            </div>
            @isset($actions)
                <div class="{{ $actionsClass }}">{{ $actions }}</div>
            @endisset
        </div>
    @endif
    <div class="{{ $mainClass }}">
        <div class="{{ $brandAreaClass }}">
            @isset($brand)
                <div class="{{ $brandClass }}">{{ $brand }}</div>
            @endisset
            @if ($description && ! $isCta && $variant !== 'compact')
                <p class="{{ $descriptionClass }}">{{ $description }}</p>
            @endif
            @if (isset($actions) && ! $isCta)
                <div class="{{ $actionsClass }}">{{ $actions }}</div>
            @endif
        </div>
        @if (count($links) > 0)
            <nav aria-label="{{ $navLabel }}" @if ($hasColumns) class="{{ $columnsNav }}" @endif>
                @if ($hasColumns)
                    @foreach ($columns as $column)
                        <div>
                            @if (! empty($column['title']))
                                <h2 class="{{ $columnTitle }}">{{ $column['title'] }}</h2>
                            @endif
                            <ul class="{{ $columnList }}">
                                @foreach ($column['links'] as $item)
                                    <li><a href="{{ $safeHref($item['href'] ?? null) }}" class="{{ $link }}">{{ $item['label'] }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    @endforeach
                @else
                    <ul class="{{ $flatList }}">
                        @foreach ($links as $item)
                            <li><a href="{{ $safeHref($item['href'] ?? null) }}" class="{{ $link }}">{{ $item['label'] }}</a></li>
                        @endforeach
                    </ul>
                @endif
            </nav>
        @endif
    </div>
    <div class="{{ $bottomClass }}">
        @if ($isCentered)
            {!! $socialsList !!}
        @endif
        @if ($copyright)
            <p class="{{ $copyrightClass }}">{{ $copyright }}</p>
        @endif
        @if (count($legal) > 0)
            <nav aria-label="{{ $legalLabel }}">
                <ul class="{{ $legalList }}">
                    @foreach ($legal as $item)
                        <li><a href="{{ $safeHref($item['href'] ?? null) }}" class="{{ $link }}">{{ $item['label'] }}</a></li>
                    @endforeach
                </ul>
            </nav>
        @endif
        @unless ($isCentered)
            {!! $socialsList !!}
        @endunless
        @if ($backToTop)
            <a href="#top" class="{{ $topLink }}">{{ $backToTopLabel }}<svg class="{{ $topIcon }}" {!! $svg !!}><path d="M12 19V5M5 12l7-7 7 7" /></svg></a>
        @endif
    </div>
    @if ($variant === 'big-brand' && $wordmark !== '')
        <div aria-hidden="true" class="{{ $wordmarkBox }}" style="--chars: {{ mb_strlen($wordmark) }}">
            <p class="{{ $wordmarkText }}">{{ $wordmark }}</p>
        </div>
    @endif
</footer>
