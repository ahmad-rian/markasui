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

    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-radio-group|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $name).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-radio-group-'.hash('xxh32', $idKey.$idIndex);
    // wire:model and x-model go on every radio, the rest on the fieldset.
    $model = $attributes->whereStartsWith(['wire:model', 'x-model']);
@endphp

<fieldset {{ $attributes->whereDoesntStartWith(['wire:model', 'x-model'])->merge(['id' => $id])->class([$root]) }}>
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
                        {{ $model }}
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
