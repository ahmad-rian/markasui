@props([
    'name',
    'label' => null,
    'options' => [],
    'value' => null,
    'orientation' => 'vertical',
])

@php
    $root = 'min-w-0';
    $legendClass = 'mb-3 text-sm font-medium text-ink';
    $orientations = [
        'vertical' => 'grid gap-3',
        'horizontal' => 'flex flex-wrap gap-x-6 gap-y-3',
    ];
    $item = 'flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50';
    $control = 'relative mt-0.5 flex size-4 shrink-0';
    $radio = 'peer size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-faint bg-surface transition-colors duration-150 ease-out checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed motion-reduce:transition-none';
    $dot = 'pointer-events-none absolute inset-1 rounded-full bg-on-primary opacity-0 peer-checked:opacity-100';
    $text = 'grid gap-0.5';
    $labelClass = 'text-sm font-medium text-ink';
    $descriptionClass = 'text-sm text-muted';

    $id = $attributes->get('id') ?? 'markas-radio-group-'.\Illuminate\Support\Str::random(8);
@endphp

<fieldset {{ $attributes->merge(['id' => $id])->class([$root]) }}>
    @if ($label)
        <legend class="{{ $legendClass }}">{{ $label }}</legend>
    @endif
    <div class="{{ $orientations[$orientation] }}">
        @foreach ($options as $option)
            @php
                $optionId = $id.'-'.$option['value'];
                $description = $option['description'] ?? null;
            @endphp
            <div class="{{ $item }}">
                <span class="{{ $control }}">
                    <input
                        type="radio"
                        id="{{ $optionId }}"
                        name="{{ $name }}"
                        value="{{ $option['value'] }}"
                        @checked((string) $option['value'] === (string) $value)
                        @if ($description) aria-describedby="{{ $optionId }}-description" @endif
                        class="{{ $radio }}"
                    />
                    <span class="{{ $dot }}" aria-hidden="true"></span>
                </span>
                <div class="{{ $text }}">
                    <label for="{{ $optionId }}" class="{{ $labelClass }}">{{ $option['label'] }}</label>
                    @if ($description)
                        <p id="{{ $optionId }}-description" class="{{ $descriptionClass }}">{{ $description }}</p>
                    @endif
                </div>
            </div>
        @endforeach
    </div>
</fieldset>
