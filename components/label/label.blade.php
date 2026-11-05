@props([
    'required' => false,
    'optional' => false,
    'requiredLabel' => 'required',
    'optionalLabel' => 'Optional',
])

@php
    $base = 'text-sm font-medium text-ink';
    $marker = 'ms-0.5 text-danger';
    $srOnly = 'sr-only';
    $optionalClass = 'font-normal text-muted';
@endphp

<label {{ $attributes->class([$base]) }}>{{ $slot }}@if ($required)<span aria-hidden="true" class="{{ $marker }}">*</span>{{ ' ' }}<span class="{{ $srOnly }}">{{ $requiredLabel }}</span>@elseif ($optional){{ ' ' }}<span class="{{ $optionalClass }}">{{ $optionalLabel }}</span>@endif</label>
