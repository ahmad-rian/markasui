@props([
    'variant' => 'primary',
    'size' => 'md',
    'duration' => 1500,
    'holdLabel' => 'Press and hold to confirm',
])

@php
    $wrapper = 'contents';
    $base = 'group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap select-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none';
    $variants = [
        'primary' => 'bg-primary text-on-primary hover:bg-primary-strong',
        'secondary' => 'border border-line bg-surface text-ink hover:bg-subtle',
        'ghost' => 'text-ink hover:bg-subtle',
        'danger' => 'bg-danger text-on-primary hover:bg-danger/90',
    ];
    $sizes = [
        'sm' => 'h-8 rounded-md px-3 text-sm',
        'md' => 'h-10 rounded-lg px-4 text-sm',
        'lg' => 'h-12 rounded-lg px-6 text-base',
    ];
    $fill = 'pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-200 ease-out group-data-[state=complete]:scale-x-100 group-data-[state=holding]:scale-x-100 group-data-[state=holding]:duration-(--hold-duration) group-data-[state=holding]:ease-linear';
    $fillVariants = [
        'primary' => 'bg-on-primary/25',
        'secondary' => 'bg-primary/10',
        'ghost' => 'bg-primary/10',
        'danger' => 'bg-on-primary/25',
    ];
    $srOnly = 'sr-only';

    $duration = (int) $duration;
    $hintId = 'markas-hold-button-'.\Illuminate\Support\Str::random(8);
@endphp

{{-- Holding Space, Enter, or the pointer for the full duration dispatches a "complete" event. Releasing early cancels. --}}
<span class="{{ $wrapper }}">
    <button
        x-data="{
            state: 'idle',
            timer: null,
            start() {
                if (this.state !== 'idle') return;
                this.state = 'holding';
                this.timer = setTimeout(() => {
                    this.state = 'complete';
                    this.$dispatch('complete');
                }, {{ $duration }});
            },
            cancel() {
                clearTimeout(this.timer);
                this.state = 'idle';
            },
            destroy() {
                clearTimeout(this.timer);
            },
        }"
        data-state="idle"
        x-bind:data-state="state"
        aria-describedby="{{ $hintId }}"
        x-on:pointerdown="$event.button === 0 && start()"
        x-on:pointerup="cancel()"
        x-on:pointerleave="cancel()"
        x-on:pointercancel="cancel()"
        x-on:keydown.space.prevent="$event.repeat || start()"
        x-on:keydown.enter.prevent="$event.repeat || start()"
        x-on:keyup.space="cancel()"
        x-on:keyup.enter="cancel()"
        x-on:blur="cancel()"
        x-on:contextmenu.prevent
        {{ $attributes->merge(['type' => 'button', 'style' => "--hold-duration: {$duration}ms"])->class([$base, $variants[$variant], $sizes[$size]]) }}
    >
        <span class="{{ $fill }} {{ $fillVariants[$variant] }}" aria-hidden="true"></span>
        {{ $slot }}
    </button>
    <span id="{{ $hintId }}" class="{{ $srOnly }}">{{ $holdLabel }}</span>
</span>
