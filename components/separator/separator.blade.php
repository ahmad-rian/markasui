@props([
    'orientation' => 'horizontal',
    'decorative' => true,
    'label' => null,
])

@php
    $roots = [
        'horizontal' => 'h-px w-full shrink-0 bg-line',
        'vertical' => 'w-px shrink-0 self-stretch bg-line',
    ];
    $labeledRoots = [
        'horizontal' => 'flex w-full items-center gap-3 text-xs text-muted',
        'vertical' => 'flex shrink-0 flex-col items-center gap-2 self-stretch text-xs text-muted',
    ];
    $lines = [
        'horizontal' => 'h-px flex-1 bg-line',
        'vertical' => 'w-px flex-1 bg-line',
    ];
    $hasLabel = filled($label);
    $semantics = $decorative
        ? ['role' => 'none']
        : array_filter([
            'role' => 'separator',
            'aria-orientation' => $orientation,
            'aria-label' => $hasLabel ? $label : null,
        ]);
@endphp

@if ($hasLabel)
    <div {{ $attributes->merge($semantics)->class([$labeledRoots[$orientation]]) }}><span class="{{ $lines[$orientation] }}"></span><span>{{ $label }}</span><span class="{{ $lines[$orientation] }}"></span></div>
@else
    <div {{ $attributes->merge($semantics)->class([$roots[$orientation]]) }}></div>
@endif
