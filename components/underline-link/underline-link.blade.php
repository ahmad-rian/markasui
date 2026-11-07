@props([
    'href' => '#',
    'variant' => 'grow-center',
    'active' => false,
])

@php
    $base = 'group relative inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary';
    $lines = [
        'grow-center' => [
            'pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-aria-[current=page]:scale-x-100',
        ],
        'slide' => [
            'pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-aria-[current=page]:scale-x-100',
        ],
        'comes-in-goes-out' => [
            'pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 group-aria-[current=page]:origin-left group-aria-[current=page]:scale-x-100',
        ],
        'goes-out-comes-in' => [
            'pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none origin-right delay-300 group-hover:scale-x-0 group-hover:delay-0 group-focus-visible:scale-x-0 group-focus-visible:delay-0 motion-reduce:delay-0',
            'pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none origin-left scale-x-0 group-hover:scale-x-100 group-hover:delay-300 group-focus-visible:scale-x-100 group-focus-visible:delay-300 motion-reduce:delay-0',
        ],
        'scribble' => [],
    ];
    $scribble = 'pointer-events-none absolute inset-x-0 -bottom-2 h-2.5 w-full overflow-visible';
    $scribblePath = '[stroke-dasharray:1_2] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] group-aria-[current=page]:[stroke-dashoffset:0] motion-reduce:transition-none';

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#".
    $safeHref = function (string $href): string {
        $value = ltrim(str_replace(["\t", "\n", "\r"], '', $href), "\x00..\x20");
        $hasScheme = preg_match('/^[a-z][a-z0-9+.\-]*:/i', $value) === 1;

        return $hasScheme && preg_match('/^(https?|mailto|tel):/i', $value) !== 1 ? '#' : $href;
    };
@endphp

<a {{ $attributes->merge(['href' => $safeHref((string) $href), 'aria-current' => $active ? 'page' : null])->class([$base]) }}>{{ $slot }}@foreach ($lines[$variant] as $line)<span aria-hidden="true" class="{{ $line }}"></span>@endforeach @if ($variant === 'scribble')<svg aria-hidden="true" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none" class="{{ $scribble }}"><path d="M1 6.5C14 3.5 26 8.5 40 5.5S66 2.5 78 5.5 93 7 99 4" pathLength="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke" class="{{ $scribblePath }}" /></svg>@endif</a>
