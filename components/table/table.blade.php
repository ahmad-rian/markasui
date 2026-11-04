@props([
    'columns' => [],
    'rows' => [],
    'caption' => null,
    'showCaption' => false,
    'label' => null,
])

@php
    $wrapper = 'overflow-x-auto rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $tableClass = 'w-full border-collapse text-sm';
    $captionClasses = [
        'hidden' => 'sr-only',
        'visible' => 'px-4 py-3 text-left font-medium text-ink',
    ];
    $headRow = 'bg-subtle text-left text-sm font-medium text-muted';
    $headCell = 'px-4 py-3 font-medium whitespace-nowrap';
    $row = 'border-t border-line transition-colors duration-150 ease-out hover:bg-subtle/50 motion-reduce:transition-none';
    $cell = 'px-4 py-3 whitespace-nowrap text-ink';
    $aligns = [
        'left' => 'text-left',
        'center' => 'text-center',
        'right' => 'text-right',
    ];

    $regionLabel = $label ?? $caption ?? 'Tabel';
@endphp

<div {{ $attributes->merge(['tabindex' => '0', 'role' => 'region', 'aria-label' => $regionLabel])->class([$wrapper]) }}>
    <table class="{{ $tableClass }}">
        @if ($caption)
            <caption class="{{ $captionClasses[$showCaption ? 'visible' : 'hidden'] }}">{{ $caption }}</caption>
        @endif
        <thead>
            <tr class="{{ $headRow }}">
                @foreach ($columns as $column)
                    <th scope="col" class="{{ $headCell }} {{ $aligns[$column['align'] ?? 'left'] }}">{{ $column['label'] }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach ($rows as $item)
                <tr class="{{ $row }}">
                    @foreach ($columns as $column)
                        <td class="{{ $cell }} {{ $aligns[$column['align'] ?? 'left'] }}">{{ $item[$column['key']] ?? '' }}</td>
                    @endforeach
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
