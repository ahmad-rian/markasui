@php
    $panel = 'grid gap-4';
    $stage = '@container h-[150px] rounded-[2rem] border border-line bg-surface px-3 pt-3';
    $island = '[--island-expanded-height:4.75rem]';
    $controls = 'flex justify-center gap-1.5';
    $demoButton = 'h-8 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary motion-reduce:transition-none';
    $caller = 'text-success';
    $callIcon = 'size-4 text-success';
    $timer = 'text-success tabular-nums';
    $row = 'flex h-full items-center gap-3';
    $avatar = 'grid size-11 shrink-0 place-items-center rounded-full bg-subtle text-sm font-semibold';
    $who = 'min-w-0 flex-1';
    $label = 'text-xs text-muted';
    $name = 'truncate text-base font-semibold';
    $round = 'grid size-11 shrink-0 place-items-center rounded-full text-canvas transition-[scale] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-90 motion-reduce:transition-none';
    $decline = $round.' bg-danger';
    $accept = $round.' bg-success';
    $icon = 'size-5';

    $phone = 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2';
    $hangUp = 'M3 15.5c5-4.5 13-4.5 18 0l-1.5 2.5-4-1v-2.5a10 10 0 0 0-7 0V17l-4 1z';
    $states = ['idle' => 'Idle', 'compact' => 'On call', 'expanded' => 'Ringing'];
@endphp

<div x-data="{ call: 'expanded' }" class="{{ $panel }}">
    <div class="{{ $stage }}">
        <x-markas.dynamic-island
            state="expanded"
            x-model="call"
            class="{{ $island }}"
            :announcements="['expanded' => 'Incoming call from Rina Santoso', 'compact' => 'Call connected']"
        >
            <x-slot:leading>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $callIcon }}"><path d="{{ $phone }}" /></svg>
                <span class="{{ $caller }}">Rina</span>
            </x-slot:leading>
            <x-slot:trailing>
                <span class="{{ $timer }}">0:42</span>
            </x-slot:trailing>
            <x-slot:expanded>
                <div class="{{ $row }}">
                    <span aria-hidden="true" class="{{ $avatar }}">RS</span>
                    <div class="{{ $who }}">
                        <p class="{{ $label }}">Mobile</p>
                        <p class="{{ $name }}">Rina Santoso</p>
                    </div>
                    <button type="button" aria-label="Decline" x-on:click="call = 'idle'" class="{{ $decline }}">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="{{ $hangUp }}" /></svg>
                    </button>
                    <button type="button" aria-label="Accept" x-on:click="call = 'compact'" class="{{ $accept }}">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="{{ $phone }}" /></svg>
                    </button>
                </div>
            </x-slot:expanded>
        </x-markas.dynamic-island>
    </div>
    <div role="group" aria-label="Call state" class="{{ $controls }}">
        @foreach ($states as $value => $text)
            <button
                type="button"
                aria-pressed="{{ $value === 'expanded' ? 'true' : 'false' }}"
                x-bind:aria-pressed="call === '{{ $value }}'"
                x-on:click="call = '{{ $value }}'"
                class="{{ $demoButton }}"
            >{{ $text }}</button>
        @endforeach
    </div>
</div>
