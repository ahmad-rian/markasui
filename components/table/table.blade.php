@props([
    'columns' => [],
    'rows' => [],
    'caption' => null,
    'showCaption' => false,
    'label' => null,
    'bordered' => false,
    'striped' => false,
    'size' => 'md',
    'footer' => null,
])

@php
    $wrapper = 'overflow-x-auto rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $tableClass = 'w-full border-collapse text-sm';
    $captionClasses = [
        'hidden' => 'sr-only',
        'visible' => 'px-4 py-3 text-left font-medium text-ink',
    ];
    $headRow = 'bg-subtle text-left text-sm font-medium text-muted';
    $borderedHeadRow = 'border-b-2 border-line';
    $headCell = 'font-medium whitespace-nowrap';
    $row = 'border-t border-line transition-colors duration-150 ease-out hover:bg-subtle/50 motion-reduce:transition-none';
    $stripedRow = 'even:bg-subtle/40';
    $footRow = 'border-t-2 border-line bg-subtle font-medium';
    $cell = 'whitespace-nowrap text-ink';
    $borderedCell = 'border-l border-line first:border-l-0';
    $sizes = [
        'sm' => 'px-3 py-2 text-[13px]',
        'md' => 'px-4 py-3',
    ];
    $aligns = [
        'left' => 'text-left',
        'center' => 'text-center',
        'right' => 'text-right',
    ];

    $regionLabel = $label ?? $caption ?? 'Table';
    $cellClass = fn ($base, $column) => implode(' ', array_filter([
        $base,
        $sizes[$size] ?? $sizes['md'],
        $bordered ? $borderedCell : null,
        $aligns[$column['align'] ?? 'left'],
    ]));
@endphp

<div {{ $attributes->merge(['tabindex' => '0', 'role' => 'region', 'aria-label' => $regionLabel])->class([$wrapper]) }}>
    <table class="{{ $tableClass }}">
        @if ($caption)
            <caption class="{{ $captionClasses[$showCaption ? 'visible' : 'hidden'] }}">{{ $caption }}</caption>
        @endif
        <thead>
            <tr class="{{ $headRow }}{{ $bordered ? ' '.$borderedHeadRow : '' }}">
                @foreach ($columns as $column)
                    <th scope="col" class="{{ $cellClass($headCell, $column) }}">{{ $column['label'] }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach ($rows as $item)
                <tr class="{{ $row }}{{ $striped ? ' '.$stripedRow : '' }}">
                    @foreach ($columns as $column)
                        <td class="{{ $cellClass($cell, $column) }}">{{ $item[$column['key']] ?? '' }}</td>
                    @endforeach
                </tr>
            @endforeach
        </tbody>
        @if ($footer)
            <tfoot>
                <tr class="{{ $footRow }}">
                    @foreach ($columns as $column)
                        <td class="{{ $cellClass($cell, $column) }}">{{ $footer[$column['key']] ?? '' }}</td>
                    @endforeach
                </tr>
            </tfoot>
        @endif
    </table>
</div>
