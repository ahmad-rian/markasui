@php
    $panel = 'grid gap-4';
    $stage = 'h-[220px] rounded-[2rem] border border-line bg-surface pt-3';
    $island = '[--island-expanded-height:11rem]';
    $controls = 'flex justify-center gap-1.5';
    $demoButton = 'h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none';
    $art = 'size-6 rounded-md bg-linear-to-br from-success to-warning';
    $bigArt = 'size-12 shrink-0 rounded-lg bg-linear-to-br from-success to-warning';
    $bars = 'flex h-4 items-end gap-0.5';
    $bar = [
        'h-2 w-0.5 animate-pulse rounded-full bg-success motion-reduce:animate-none',
        'h-4 w-0.5 animate-pulse rounded-full bg-success [animation-delay:200ms] motion-reduce:animate-none',
        'h-3 w-0.5 animate-pulse rounded-full bg-success [animation-delay:400ms] motion-reduce:animate-none',
        'h-2.5 w-0.5 animate-pulse rounded-full bg-success [animation-delay:600ms] motion-reduce:animate-none',
    ];
    $card = 'grid h-full content-between';
    $head = 'flex items-center gap-3';
    $song = 'min-w-0 flex-1';
    $title = 'truncate text-sm font-semibold';
    $artist = 'truncate text-xs text-muted';
    $track = 'h-1 overflow-hidden rounded-full bg-line';
    $fill = 'h-full w-2/5 rounded-full bg-ink';
    $times = 'flex justify-between pt-1 text-[11px] text-muted tabular-nums';
    $buttons = 'flex items-center justify-center gap-6';
    $iconButton = 'grid size-9 place-items-center rounded-full transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $icon = 'size-5';

    $media = [
        ['label' => 'Previous', 'd' => 'M18 6v12l-9-6zM6 6v12'],
        ['label' => 'Pause', 'd' => 'M8 5v14M16 5v14'],
        ['label' => 'Next', 'd' => 'M6 6v12l9-6zM18 6v12'],
    ];
    $states = ['idle' => 'Idle', 'compact' => 'Compact', 'expanded' => 'Expanded'];
@endphp

<div x-data="{ island: 'expanded' }" class="{{ $panel }}">
    <div class="{{ $stage }}">
        <x-markas.dynamic-island state="expanded" x-model="island" class="{{ $island }}" island-label="Now playing">
            <x-slot:leading>
                <span aria-hidden="true" class="{{ $art }}"></span>
            </x-slot:leading>
            <x-slot:trailing>
                <span aria-hidden="true" class="{{ $bars }}">
                    @foreach ($bar as $barClass)
                        <span class="{{ $barClass }}"></span>
                    @endforeach
                </span>
            </x-slot:trailing>
            <x-slot:expanded>
                <div class="{{ $card }}">
                    <div class="{{ $head }}">
                        <span aria-hidden="true" class="{{ $bigArt }}"></span>
                        <div class="{{ $song }}">
                            <p class="{{ $title }}">Hujan di Kota</p>
                            <p class="{{ $artist }}">Nadia Sukma</p>
                        </div>
                    </div>
                    <div>
                        <div class="{{ $track }}"><div class="{{ $fill }}"></div></div>
                        <p class="{{ $times }}"><span>1:24</span><span>3:34</span></p>
                    </div>
                    <div class="{{ $buttons }}">
                        @foreach ($media as $item)
                            <button type="button" aria-label="{{ $item['label'] }}" class="{{ $iconButton }}">
                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="{{ $item['d'] }}" /></svg>
                            </button>
                        @endforeach
                    </div>
                </div>
            </x-slot:expanded>
        </x-markas.dynamic-island>
    </div>
    <div role="group" aria-label="Island state" class="{{ $controls }}">
        @foreach ($states as $value => $text)
            <button
                type="button"
                aria-pressed="{{ $value === 'expanded' ? 'true' : 'false' }}"
                x-bind:aria-pressed="island === '{{ $value }}'"
                x-on:click="island = '{{ $value }}'"
                class="{{ $demoButton }}"
            >{{ $text }}</button>
        @endforeach
    </div>
</div>
