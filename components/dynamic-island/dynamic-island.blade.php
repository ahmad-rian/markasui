@props([
    'state' => 'idle',
    'announcements' => [],
    'islandLabel' => 'Live activity',
])

@php
    // The island re-scopes the theme with the dark class, so it reads as a black pill in both modes.
    $root = 'dark relative mx-auto max-w-full overflow-hidden bg-canvas text-ink ring-1 ring-line transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.32,1.2,0.5,1)] motion-reduce:transition-none data-[state=compact]:h-9 data-[state=compact]:w-[var(--island-compact-width,15rem)] data-[state=compact]:rounded-[18px] data-[state=expanded]:h-[var(--island-expanded-height,9.5rem)] data-[state=expanded]:w-[var(--island-expanded-width,22rem)] data-[state=expanded]:rounded-[32px] data-[state=idle]:h-9 data-[state=idle]:w-[var(--island-idle-width,7.5rem)] data-[state=idle]:rounded-[18px]';
    $panel = 'absolute top-0 left-1/2 max-w-[100cqw] origin-top -translate-x-1/2 transition-[opacity,scale,filter] duration-300 ease-out motion-reduce:transition-none data-[state=active]:delay-150 data-[state=inactive]:pointer-events-none data-[state=inactive]:scale-90 data-[state=inactive]:opacity-0 data-[state=inactive]:blur-sm';
    $panels = [
        'idle' => 'grid h-9 w-[var(--island-idle-width,7.5rem)] place-items-center',
        'compact' => 'flex h-9 w-[var(--island-compact-width,15rem)] items-center justify-between gap-3 px-3 text-xs font-medium',
        'expanded' => 'h-[var(--island-expanded-height,9.5rem)] w-[var(--island-expanded-width,22rem)] p-4',
    ];
    $side = 'flex min-w-0 items-center gap-2';
    $srOnly = 'sr-only';

    $slots = $__laravel_slots ?? [];
@endphp

{{-- Controlled from outside: bind a parent value with x-model, it is the island's state. --}}
<div
    x-data="{ state: @js($state), announcements: @js((object) $announcements) }"
    x-modelable="state"
    role="region"
    aria-label="{{ $islandLabel }}"
    data-state="{{ $state }}"
    x-bind:data-state="state"
    {{ $attributes->class([$root]) }}
>
    @foreach (['idle', 'compact', 'expanded'] as $name)
        <div
            data-state="{{ $state === $name ? 'active' : 'inactive' }}"
            @if ($state !== $name) inert @endif
            x-bind:data-state="state === '{{ $name }}' ? 'active' : 'inactive'"
            x-bind:inert="state !== '{{ $name }}'"
            class="{{ $panel }} {{ $panels[$name] }}"
        >
            @if ($name === 'compact')
                <div class="{{ $side }}">{{ $slots['leading'] ?? '' }}</div>
                <div class="{{ $side }}">{{ $slots['trailing'] ?? '' }}</div>
            @else
                {{ $slots[$name] ?? '' }}
            @endif
        </div>
    @endforeach
    <p aria-live="polite" class="{{ $srOnly }}" x-text="announcements[state] ?? ''">{{ $announcements[$state] ?? '' }}</p>
</div>
