@php
    $panel = 'grid gap-4';
    $stage = 'relative h-[220px] overflow-hidden rounded-[2rem] border border-line bg-surface';
    $top = '@container absolute inset-x-0 top-3 px-3';
    $clock = 'pt-24 text-center text-5xl font-semibold text-ink tabular-nums';
    $date = 'pt-1 text-center text-sm text-muted';
    $controls = 'flex justify-center gap-1.5';
    $demoButton = 'h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none';
    $timerIcon = 'size-4 text-warning';
    $timerText = 'text-warning tabular-nums';
    $card = 'flex h-full flex-col justify-between';
    $cardHead = 'flex items-center gap-3';
    $badge = 'grid size-11 place-items-center rounded-full bg-warning/15 text-warning';
    $badgeIcon = 'size-5';
    $label = 'text-xs text-muted';
    $big = 'text-2xl leading-tight font-semibold tabular-nums';
    $actions = 'grid grid-cols-2 gap-2';
    $soft = 'h-9 rounded-full bg-subtle text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $stop = 'h-9 rounded-full bg-danger/15 text-sm font-medium text-danger transition-colors duration-150 ease-out hover:bg-danger/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';

    $timer = 'M12 8v5l3 2M9 2h6M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16z';
    $states = ['idle' => 'Idle', 'compact' => 'Compact', 'expanded' => 'Expanded'];
@endphp

<div x-data="{ island: 'compact' }" class="{{ $panel }}">
    <div class="{{ $stage }}">
        <div class="{{ $top }}">
            <x-markas.dynamic-island
                state="compact"
                x-model="island"
                :announcements="['compact' => 'Focus timer running', 'expanded' => 'Focus timer, 12 minutes 48 seconds left']"
            >
                <x-slot:leading>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $timerIcon }}"><path d="{{ $timer }}" /></svg>
                </x-slot:leading>
                <x-slot:trailing>
                    <span class="{{ $timerText }}">12:48</span>
                </x-slot:trailing>
                <x-slot:expanded>
                    <div class="{{ $card }}">
                        <div class="{{ $cardHead }}">
                            <span class="{{ $badge }}">
                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $badgeIcon }}"><path d="{{ $timer }}" /></svg>
                            </span>
                            <div>
                                <p class="{{ $label }}">Focus timer</p>
                                <p class="{{ $big }}">12:48</p>
                            </div>
                        </div>
                        <div class="{{ $actions }}">
                            <button type="button" x-on:click="island = 'compact'" class="{{ $soft }}">Minimize</button>
                            <button type="button" x-on:click="island = 'idle'" class="{{ $stop }}">End</button>
                        </div>
                    </div>
                </x-slot:expanded>
            </x-markas.dynamic-island>
        </div>
        <p class="{{ $clock }}">9:41</p>
        <p class="{{ $date }}">Wednesday, 5 November</p>
    </div>
    <div role="group" aria-label="Island state" class="{{ $controls }}">
        @foreach ($states as $value => $text)
            <button
                type="button"
                aria-pressed="{{ $value === 'compact' ? 'true' : 'false' }}"
                x-bind:aria-pressed="island === '{{ $value }}'"
                x-on:click="island = '{{ $value }}'"
                class="{{ $demoButton }}"
            >{{ $text }}</button>
        @endforeach
    </div>
</div>
