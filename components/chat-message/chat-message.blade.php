@props([
    'from' => 'assistant',
    'text' => '',
    'variant' => 'plain',
    'time' => null,
    'avatar' => null,
    'typing' => false,
    'stream' => false,
    'streamSpeed' => 40,
    'actions' => true,
    'userLabel' => 'You',
    'assistantLabel' => 'Assistant',
    'typingLabel' => 'Typing',
    'actionsLabel' => 'Message actions',
    'copyLabel' => 'Copy',
    'copiedLabel' => 'Copied',
    'likeLabel' => 'Good response',
    'dislikeLabel' => 'Bad response',
    'regenerateLabel' => 'Regenerate',
])

@php
    $roots = [
        'user' => 'group/message flex flex-col items-end gap-1',
        'assistant' => 'group/message flex items-start gap-3',
    ];
    $avatarClass = 'grid size-8 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-surface text-ink';
    $avatarImage = 'size-full object-cover';
    $avatarIcon = 'size-4';
    $bodies = [
        'user' => 'flex w-full flex-col items-end gap-1',
        'assistant' => 'grid min-w-0 flex-1 justify-items-start gap-1',
    ];
    $header = 'flex items-baseline gap-2 text-sm font-medium text-ink';
    $contents = [
        'user' => 'max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-6 break-words whitespace-pre-line text-on-primary',
        'plain' => 'text-sm leading-6 break-words whitespace-pre-line text-ink',
        'bubble' => 'rounded-2xl rounded-tl-md bg-subtle px-4 py-2.5 text-sm leading-6 break-words whitespace-pre-line text-ink',
    ];
    $timeClass = 'text-xs font-normal text-muted';
    $footer = 'flex min-h-7 items-center gap-1';
    $actionsClass = 'flex items-center gap-0.5 opacity-0 transition-opacity duration-150 ease-out group-focus-within/message:opacity-100 group-hover/message:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100';
    $action = 'group/action grid size-7 place-items-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:text-ink motion-reduce:transition-none';
    $actionIcon = 'col-start-1 row-start-1 size-4';
    $pressIcon = 'size-4 group-aria-pressed/action:fill-current/20';
    $copyIcon = 'col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]/action:scale-50 group-data-[state=copied]/action:opacity-0 motion-reduce:transition-none';
    $checkIcon = 'col-start-1 row-start-1 size-4 scale-50 opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]/action:scale-100 group-data-[state=copied]/action:opacity-100 motion-reduce:transition-none';
    $dots = 'inline-flex h-6 items-center gap-1';
    $dot = [
        'size-1.5 animate-pulse rounded-full bg-muted motion-reduce:animate-none',
        'size-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms] motion-reduce:animate-none',
        'size-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms] motion-reduce:animate-none',
    ];
    $caret = 'ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse rounded-xs bg-current motion-reduce:animate-none';
    $srOnly = 'sr-only';

    $paths = [
        'spark' => 'M12 3c.4 4.6 2.4 6.6 7 7-4.6.4-6.6 2.4-7 7-.4-4.6-2.4-6.6-7-7 4.6-.4 6.6-2.4 7-7zM19 16c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5z',
        'copy' => 'M9 9h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
        'check' => 'm4 12 5 5L20 6',
        'like' => 'M7 10v11M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8a2 2 0 0 1-1.9 1.4H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z',
        'dislike' => 'M17 14V3M9 18.1 10 14H4.2a2 2 0 0 1-1.9-2.6l2.3-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.8a2 2 0 0 0-1.8 1.1L12 22a3.1 3.1 0 0 1-3-3.9z',
        'regenerate' => 'M3 12a9 9 0 0 1 15.7-6L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.7 6L3 16M8 16H3v5',
    ];
    $svg = fn (string $path, string $class) => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="'.$class.'"><path d="'.$paths[$path].'" /></svg>';

    $assistant = $from === 'assistant';
    $content = $assistant ? $contents[$variant] : $contents['user'];
@endphp

{{-- Streaming reveals the text one token at a time (off with reduced motion). Like, dislike, and regenerate dispatch feedback and regenerate events. --}}
<article
    x-data="{
        text: @js((string) $text),
        tokens: @js(preg_split('/(\s+)/', (string) $text, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY)),
        shown: Infinity,
        copied: false,
        feedback: null,
        timer: null,
        get streaming() {
            return @js((bool) $stream) && this.shown < this.tokens.length;
        },
        init() {
            if (! @js((bool) $stream) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            this.shown = 0;
            const tick = () => {
                if (! this.streaming) return;
                this.shown++;
                this.timer = setTimeout(tick, {{ (int) $streamSpeed }});
            };
            this.timer = setTimeout(tick, {{ (int) $streamSpeed }});
        },
        async copy() {
            try {
                await navigator.clipboard.writeText(this.text);
            } catch {
                return;
            }
            this.copied = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => (this.copied = false), 2000);
        },
        rate(value) {
            this.feedback = this.feedback === value ? null : value;
            this.$dispatch('feedback', this.feedback);
        },
        destroy() {
            clearTimeout(this.timer);
        },
    }"
    data-from="{{ $from }}"
    aria-label="{{ $assistant ? $assistantLabel : $userLabel }}"
    {{ $attributes->class([$roots[$from]]) }}
>
    @if ($assistant)
        <span aria-hidden="true" class="{{ $avatarClass }}">
            @if ($avatar)
                <img src="{{ $avatar }}" alt="" class="{{ $avatarImage }}" />
            @else
                {!! $svg('spark', $avatarIcon) !!}
            @endif
        </span>
    @endif
    <div class="{{ $bodies[$from] }}">
        @if ($assistant)
            <p class="{{ $header }}">{{ $assistantLabel }}@if ($time)<time class="{{ $timeClass }}">{{ $time }}</time>@endif</p>
        @endif
        <div class="{{ $content }}">@if ($typing)<span role="status" class="{{ $dots }}"><span class="{{ $srOnly }}">{{ $typingLabel }}</span>@foreach ($dot as $dotClass)<span aria-hidden="true" class="{{ $dotClass }}"></span>@endforeach</span>@elseif ($stream)<span class="{{ $srOnly }}">{{ $text }}</span><span aria-hidden="true" x-text="tokens.slice(0, shown).join('')">{{ $text }}</span><template x-if="streaming"><span aria-hidden="true" class="{{ $caret }}"></span></template>@else{{ $text }}@endif</div>
        <div class="{{ $footer }}">
            @if ($actions && ! $typing)
                <div x-show="! streaming" role="group" aria-label="{{ $actionsLabel }}" class="{{ $actionsClass }}">
                    <button type="button" aria-label="{{ $copyLabel }}" data-state="idle" x-bind:data-state="copied ? 'copied' : 'idle'" x-on:click="copy()" class="{{ $action }}">
                        {!! $svg('copy', $copyIcon) !!}
                        {!! $svg('check', $checkIcon) !!}
                    </button>
                    @if ($assistant)
                        @foreach (['like' => $likeLabel, 'dislike' => $dislikeLabel] as $value => $label)
                            <button type="button" aria-label="{{ $label }}" aria-pressed="false" x-bind:aria-pressed="feedback === '{{ $value }}'" x-on:click="rate('{{ $value }}')" class="{{ $action }}">
                                {!! $svg($value, $pressIcon) !!}
                            </button>
                        @endforeach
                        <button type="button" aria-label="{{ $regenerateLabel }}" x-on:click="$dispatch('regenerate')" class="{{ $action }}">
                            {!! $svg('regenerate', $actionIcon) !!}
                        </button>
                    @endif
                    <span role="status" class="{{ $srOnly }}" x-text="copied ? @js($copiedLabel) : ''"></span>
                </div>
            @endif
            @if (! $assistant && $time)
                <time class="{{ $timeClass }}">{{ $time }}</time>
            @endif
        </div>
    </div>
</article>
