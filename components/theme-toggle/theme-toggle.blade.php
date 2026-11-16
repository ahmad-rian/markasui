@props([
    'animation' => 'rotate',
    'variant' => 'ghost',
    'size' => 'md',
    'theme' => null,
    'storageKey' => 'markas-theme',
    'showText' => false,
    'lightLabel' => 'Switch to light theme',
    'darkLabel' => 'Switch to dark theme',
])

@php
    $base = 'group inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50';
    $variants = [
        'ghost' => 'text-ink hover:bg-subtle',
        'outline' => 'border border-line bg-surface text-ink hover:bg-subtle',
        'solid' => 'bg-primary text-on-primary hover:bg-primary-strong',
    ];
    // Per size: icon-only button, button with text, icon.
    $sizes = [
        'sm' => ['size-8 rounded-md', 'h-8 rounded-md px-3 text-sm', 'size-4'],
        'md' => ['size-10 rounded-lg', 'h-10 rounded-lg px-4 text-sm', 'size-5'],
        'lg' => ['size-12 rounded-lg', 'h-12 rounded-lg px-6 text-base', 'size-6'],
    ];
    // Parts scale and rotate around the icon center.
    $icon = '**:origin-[12px_12px]';
    // Moon and stars start hidden (the light look); the keyframes show them.
    $hidden = 'opacity-0';
    $moonPath = 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z';
    $starPaths = ['M18 2v4m-2-2h4', 'M21.5 9h0', 'M14.5 1.5h0'];
    $srOnly = 'sr-only';
    // Keyframes from light to dark (reverse for dark to light), the same as React and Vue:
    // "selector inside the button|property:value,value;property:...|stagger ms".
    $moves = [
        'rotate' => [
            'g|rotate:0deg,1turn;scale:1,1.15,0;opacity:1,1,0',
            'g>path|scale:1,1.6,1.6,0',
            'svg>:nth-child(3)|rotate:-1turn,-1turn,0deg;scale:0,0,1;opacity:0,0,1',
        ],
        'morph' => [
            'g>circle|scale:1,1.6',
            'mask>circle|translate:24px -12px,15.5px -3.5px',
            'g>path|scale:1,0;opacity:1,0|50',
        ],
        'flip' => [
            'svg|transform:perspective(60px) rotateY(0),perspective(60px) rotateY(90deg),perspective(60px) rotateY(-90deg),perspective(60px) rotateY(0);translate:0,0 -6px,0 -6px,0;offset:0,.5,.5,1',
            'g|opacity:1,1,0,0;offset:0,.5,.5,1',
            'svg>:nth-child(3)|opacity:0,0,1,1;offset:0,.5,.5,1',
        ],
        'slide' => [
            'g|translate:0,0 24px',
            'svg>:nth-child(3)|translate:0 -24px,0 -24px,0,0 4px,0;opacity:1,1',
        ],
        'eclipse' => [
            'mask>circle|translate:-6px 0,13.5px -1.5px',
            'g>path|scale:1,1.7,.75;opacity:1,.3,.4',
        ],
        'spring' => [
            'svg|scale:1,.6,1.15,.95,1',
            'g|opacity:1,1,0,0',
            'svg>:nth-child(3)|opacity:0,0,1,1',
            'svg>path~path|scale:0,1.5,.7,1;opacity:0,1,.3,1|120',
        ],
    ];

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-theme-toggle|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $maskId = 'mask'.hash('xxh32', $idKey.$idIndex);
@endphp

{{-- Same logic as React and Vue: saved choice, then the page dark class, then the system setting. --}}
<button
    x-data="{
        state: null,
        requested: null,
        key: @js($storageKey),
        moves: @js($moves[$animation]),
        page: () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light'),
        setDark: (theme) => document.documentElement.classList.toggle('dark', theme === 'dark'),
        {{-- mode 0 jumps to the look, 1 animates the switch, 2 plays there and back (demo). --}}
        play(toDark, mode) {
            const still = mode === 0 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
            for (const move of this.moves) {
                const [selector, frames, stagger = 0] = move.split('|');
                const keyframes = Object.fromEntries(frames.split(';').map((frame) => {
                    const [property, values] = frame.split(':');
                    return [property, values.split(',')];
                }));
                this.$root.querySelectorAll(selector).forEach((part, i) => part.animate(keyframes, {
                    duration: still ? 0 : +stagger ? 325 : 650,
                    delay: still ? 0 : i * +stagger,
                    fill: 'both',
                    iterations: mode === 2 ? 2 : 1,
                    direction: ['reverse', 'normal', 'alternate-reverse', 'alternate'][+toDark + (mode === 2 ? 2 : 0)],
                }));
            }
        },
        show(theme) {
            if (theme === this.state) return;
            this.state = theme;
            this.play(theme === 'dark', theme === this.requested ? 1 : 0);
            this.requested = null;
        },
        init() {
            let saved = null;
            try {
                saved = localStorage.getItem(this.key);
            } catch {}
            const target = @js($theme) ?? (saved === 'light' || saved === 'dark' ? saved : this.page() === 'dark' || window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            if (target !== this.page()) this.setDark(target);
            this.show(this.page());
            this.observer = new MutationObserver(() => this.show(this.page()));
            this.observer.observe(document.documentElement, { attributeFilter: ['class'] });
        },
        destroy() {
            this.observer?.disconnect();
        },
        toggle() {
            const theme = this.page() === 'dark' ? 'light' : 'dark';
            this.requested = theme;
            this.setDark(theme);
            try {
                localStorage.setItem(this.key, theme);
            } catch {}
            document.dispatchEvent(new CustomEvent('markas-theme-change', { detail: theme }));
        },
    }"
    x-on:click="toggle()"
    x-on:markas-theme-demo.document="play(page() !== 'dark', 2)"
    x-bind:data-state="state"
    {{ $attributes->merge(['type' => 'button'])->class([$base, $variants[$variant], $sizes[$size][$showText ? 1 : 0]]) }}
>
    <svg class="{{ $sizes[$size][2] }} {{ $icon }}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <mask id="{{ $maskId }}">
            <rect width="24" height="24" fill="white" />
            <circle cy="12" r="5" fill="black" />
        </mask>
        <g>
            <circle cx="12" cy="12" r="4.5" stroke="none" mask="url(#{{ $maskId }})" />
            @for ($ray = 0; $ray < 8; $ray++)
                <path style="rotate: {{ $ray * 45 }}deg" d="M12 2v2" />
            @endfor
        </g>
        <path class="{{ $hidden }}" d="{{ $moonPath }}" />
        @foreach ($starPaths as $starPath)
            <path class="{{ $hidden }}" d="{{ $starPath }}" />
        @endforeach
    </svg>
    <span class="{{ $showText ? '' : $srOnly }}" x-text="state === 'dark' ? @js($lightLabel) : @js($darkLabel)">{{ $darkLabel }}</span>
</button>
