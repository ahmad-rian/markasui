@props([
    'logos' => [],
    'title' => '',
    'variant' => 'row',
    'grayscale' => true,
    'stats' => [],
    'logosLabel' => 'Customer logos',
])

@php
    $root = '@container w-full';
    $layouts = [
        'row' => ['root' => 'grid gap-8', 'title' => 'text-center text-sm font-medium text-muted', 'list' => 'flex flex-wrap items-center justify-center gap-x-10 gap-y-6', 'item' => 'flex'],
        'grid' => ['root' => 'grid gap-8', 'title' => 'text-center text-sm font-medium text-muted', 'list' => 'grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line @lg:grid-cols-3 @3xl:grid-cols-4', 'item' => 'flex h-24 items-center justify-center bg-surface px-4'],
        'marquee' => ['root' => 'grid gap-8', 'title' => 'text-center text-sm font-medium text-muted', 'list' => 'flex shrink-0 items-center gap-12 pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0', 'item' => 'flex'],
        'cards' => ['root' => 'grid gap-8', 'title' => 'text-center text-sm font-medium text-muted', 'list' => 'grid gap-4 @xl:grid-cols-2 @3xl:grid-cols-3', 'item' => 'flex flex-col items-start gap-4 rounded-xl border border-line bg-surface p-5'],
        'stats' => ['root' => 'grid items-center gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12', 'title' => 'text-2xl font-semibold tracking-tight text-balance text-ink', 'list' => 'grid grid-cols-2 items-center gap-x-8 gap-y-6 @lg:grid-cols-3', 'item' => 'flex'],
    ];
    $viewport = 'group overflow-hidden mask-x-from-80% motion-reduce:mask-none';
    $track = 'flex w-max animate-[markas-logo-cloud_30s_linear_infinite] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none';
    $copy = 'motion-reduce:hidden';
    $keyframes = '@keyframes markas-logo-cloud{to{translate:-50% 0}}';
    $header = 'grid gap-6';
    $statList = 'grid grid-cols-2 gap-6';
    $stat = 'flex flex-col-reverse gap-1';
    $statValue = 'text-3xl font-semibold tracking-tight text-ink';
    $statLabel = 'text-sm text-muted';
    $logoBase = 'inline-flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $tones = ['gray' => 'text-muted grayscale transition-[color,filter] duration-200 ease-out hover:text-ink hover:grayscale-0 motion-reduce:transition-none', 'color' => 'text-ink'];
    $mark = 'h-7 w-auto shrink-0';
    $quote = 'text-sm text-pretty text-ink';
    $author = 'mt-auto text-xs text-muted';

    $layout = $layouts[$variant] ?? $layouts['row'];
    $tone = $grayscale ? $tones['gray'] : $tones['color'];
    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-logo-cloud|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-logo-cloud-'.hash('xxh32', $idKey.$idIndex);
    $copies = $variant === 'marquee' ? [0, 1] : [0];
    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser.
    $safeHref = fn (?string $href): string => preg_match('/^(?!https?:|mailto:|tel:)[a-z][\w+.\-]*:/i', preg_replace('/[\x00-\x20]/', '', (string) $href)) === 1 ? '#' : (string) ($href ?? '#');
@endphp

<section
    @if (filled($title)) aria-labelledby="{{ $id }}-title" @else aria-label="{{ $logosLabel }}" @endif
    {{ $attributes->merge(['id' => $id])->class([$root]) }}
>
    <div class="{{ $layout['root'] }}">
        @if ($variant === 'stats')
            <div class="{{ $header }}">
                @if (filled($title))
                    <h2 id="{{ $id }}-title" class="{{ $layout['title'] }}">{{ $title }}</h2>
                @endif
                @if ($stats)
                    <dl class="{{ $statList }}">
                        @foreach ($stats as $entry)
                            <div class="{{ $stat }}">
                                <dt class="{{ $statLabel }}">{{ $entry['label'] }}</dt>
                                <dd class="{{ $statValue }}">{{ $entry['value'] }}</dd>
                            </div>
                        @endforeach
                    </dl>
                @endif
            </div>
        @elseif (filled($title))
            <h2 id="{{ $id }}-title" class="{{ $layout['title'] }}">{{ $title }}</h2>
        @endif
        @if ($variant === 'marquee')
            <div class="{{ $viewport }}">
                <style>{!! $keyframes !!}</style>
                <div class="{{ $track }}">
        @endif
        @foreach ($copies as $copyIndex)
            <ul role="list" @if ($copyIndex > 0) aria-hidden="true" inert @endif class="{{ $layout['list'] }}{{ $copyIndex > 0 ? ' '.$copy : '' }}">
                @foreach ($logos as $key => $logo)
                    @php
                        $wordmark = ($logo['wordmark'] ?? true) !== false || empty($logo['path']);
                        $tag = filled($logo['href'] ?? null) ? 'a' : 'span';
                        $custom = is_string($key) ? ($__laravel_slots[$key] ?? null) : null;
                    @endphp
                    <li class="{{ $layout['item'] }}">
                        <{{ $tag }} @if ($tag === 'a') href="{{ $safeHref($logo['href']) }}" @endif class="{{ $logoBase }} {{ $tone }}">
                            @if ($custom)
                                {{ $custom }}
                            @else
                                @if (! empty($logo['path']))
                                    <svg class="{{ $mark }}" viewBox="{{ $logo['viewBox'] ?? '0 0 24 24' }}" fill="currentColor" @if ($wordmark) aria-hidden="true" @else role="img" aria-label="{{ $logo['name'] }}" @endif><path d="{{ $logo['path'] }}" /></svg>
                                @endif
                                @if ($wordmark)
                                    <span>{{ $logo['name'] }}</span>
                                @endif
                            @endif
                        </{{ $tag }}>
                        @if ($variant === 'cards' && filled($logo['quote'] ?? null))
                            <blockquote class="{{ $quote }}">{{ $logo['quote'] }}</blockquote>
                        @endif
                        @if ($variant === 'cards' && filled($logo['author'] ?? null))
                            <p class="{{ $author }}">{{ $logo['author'] }}</p>
                        @endif
                    </li>
                @endforeach
            </ul>
        @endforeach
        @if ($variant === 'marquee')
                </div>
            </div>
        @endif
    </div>
</section>
