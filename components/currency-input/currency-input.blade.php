@props([
    'label' => null,
    'hint' => null,
    'error' => null,
    'currency' => 'IDR',
    'min' => null,
    'max' => null,
    'value' => null,
    'presets' => [],
    'presetsLabel' => 'Quick amounts',
    'name' => null,
])

@php
    $wrapper = 'grid gap-1.5';
    $labelClass = 'text-sm font-medium text-ink';
    $control = 'flex h-11 w-full items-center gap-2 rounded-md border border-line bg-surface px-3 text-base transition-colors duration-150 ease-out has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-subtle has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary has-[[aria-invalid=true]]:border-danger motion-reduce:transition-none';
    $prefix = 'shrink-0 font-medium text-muted select-none';
    $field = 'h-full min-w-0 flex-1 bg-transparent font-medium text-ink tabular-nums outline-none placeholder:text-faint disabled:cursor-not-allowed disabled:text-muted';
    $chips = 'flex flex-wrap gap-2 pt-1';
    $chip = 'inline-flex h-8 items-center rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink tabular-nums transition-[background-color,border-color,scale] duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50 aria-pressed:border-primary aria-pressed:bg-primary-soft motion-reduce:transition-none';
    $hintClass = 'text-sm text-muted';
    $errorClass = 'text-sm text-danger';

    // Separators and short units per currency. IDR follows id-ID, USD follows en-US.
    $currencies = [
        'IDR' => ['symbol' => 'Rp', 'group' => '.', 'decimal' => ',', 'fraction' => 0, 'short' => '', 'units' => [[1000000, 'jt'], [1000, 'rb']]],
        'USD' => ['symbol' => '$', 'group' => ',', 'decimal' => '.', 'fraction' => 2, 'short' => '$', 'units' => [[1000000, 'M'], [1000, 'K']]],
    ];
    $c = $currencies[$currency] ?? $currencies['IDR'];

    // 12500000 -> "12.500.000". Decimals show only when they are not zero.
    $formatAmount = function (float $amount) use ($c): string {
        [$int, $frac] = array_pad(explode('.', number_format(abs($amount), $c['fraction'], '.', '')), 2, '');

        return preg_replace('/\B(?=(\d{3})+(?!\d))/', $c['group'], $int).(preg_match('/[1-9]/', $frac) ? $c['decimal'].$frac : '');
    };
    // 50000 -> "50rb", 1500000 -> "1,5jt", 1000 USD -> "$1K".
    $shortAmount = function (float $amount) use ($c, $formatAmount): string {
        foreach ($c['units'] as [$size, $suffix]) {
            if ($amount >= $size) {
                $scaled = rtrim(rtrim(number_format($amount / $size, 1, '.', ''), '0'), '.');

                return $c['short'].str_replace('.', $c['decimal'], $scaled).$suffix;
            }
        }

        return $c['short'].$formatAmount($amount);
    };

    $value = $value === null || $value === '' ? null : (float) $value;
    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-currency-input|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $name).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-currency-input-'.hash('xxh32', $idKey.$idIndex);
    $currencyId = $id.'-currency';
    $messageId = $error ? $id.'-error' : ($hint ? $id.'-hint' : null);
    $disabled = (bool) $attributes->get('disabled');
@endphp

{{-- Formats as you type, keeps the caret in place, and posts the plain number through a hidden input named `name`. wire:model and x-model bind that number on the root (x-modelable). --}}
<div
    class="{{ $wrapper }}"
    x-data="{
        c: @js($c),
        min: @js($min === null ? null : (float) $min),
        max: @js($max === null ? null : (float) $max),
        value: @js($value),
        {{-- Amount the field shows or is animating to. When value changes from outside (wire:model, x-model), the field follows. --}}
        shown: @js($value),
        frame: 0,
        init() {
            this.$watch('value', (next) => {
                const amount = next === null || next === '' ? null : Number(next);
                if (amount === this.shown) return;
                cancelAnimationFrame(this.frame);
                this.shown = amount;
                this.$refs.field.value = amount === null || Number.isNaN(amount) ? '' : this.format(amount);
            });
        },
        group(digits) {
            return digits.replace(/\B(?=(\d{3})+(?!\d))/g, this.c.group);
        },
        format(amount) {
            const [int = '0', frac = ''] = Math.abs(amount).toFixed(this.c.fraction).split('.');
            return this.group(int) + (/[1-9]/.test(frac) ? this.c.decimal + frac : '');
        },
        parse(raw) {
            const [head = '', ...tail] = this.c.fraction ? raw.split(this.c.decimal) : [raw];
            const int = head.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
            const frac = tail.join('').replace(/\D/g, '').slice(0, this.c.fraction);
            if (! int && ! tail.length) return { text: '', value: null };
            const whole = int || '0';
            return { text: this.group(whole) + (tail.length ? this.c.decimal + frac : ''), value: Number(`${whole}.${frac || '0'}`) };
        },
        significant(text) {
            return [...text].filter((ch) => /\d/.test(ch) || (this.c.fraction > 0 && ch === this.c.decimal)).length;
        },
        clamp(n) {
            return Math.min(Math.max(n, this.min ?? -Infinity), this.max ?? Infinity);
        },
        input(event) {
            cancelAnimationFrame(this.frame);
            const field = event.target;
            const count = this.significant(field.value.slice(0, field.selectionStart ?? field.value.length));
            const parsed = this.parse(field.value);
            field.value = parsed.text;
            let position = 0;
            for (let seen = 0; position < parsed.text.length && seen < count; position++) if (this.significant(parsed.text[position])) seen++;
            field.setSelectionRange(position, position);
            this.shown = parsed.value;
            this.value = parsed.value;
        },
        skipSeparator(event) {
            const field = event.target;
            const at = field.selectionStart;
            if (at === null || at !== field.selectionEnd) return;
            if (event.key === 'Backspace' && field.value[at - 1] === this.c.group) field.setSelectionRange(at - 1, at - 1);
            if (event.key === 'Delete' && field.value[at] === this.c.group) field.setSelectionRange(at + 1, at + 1);
        },
        blur() {
            if (this.value === null || this.value === '') return;
            this.shown = this.clamp(Number(this.value));
            this.value = this.shown;
            this.$refs.field.value = this.format(this.value);
        },
        pick(preset) {
            const target = this.clamp(preset);
            const from = Number(this.value ?? 0);
            const field = this.$refs.field;
            this.shown = target;
            this.value = target;
            cancelAnimationFrame(this.frame);
            if (matchMedia('(prefers-reduced-motion: reduce)').matches) return (field.value = this.format(target));
            let start;
            const step = 10 ** this.c.fraction;
            const tick = (now) => {
                start ??= now;
                const t = Math.min((now - start) / 400, 1);
                field.value = this.format(Math.round((from + (target - from) * (1 - (1 - t) ** 3)) * step) / step);
                if (t < 1) this.frame = requestAnimationFrame(tick);
            };
            this.frame = requestAnimationFrame(tick);
        },
        destroy() {
            cancelAnimationFrame(this.frame);
        },
    }"
    x-modelable="value"
    {{ $attributes->whereStartsWith(['wire:model', 'x-model']) }}
>
    @if ($label)
        <label for="{{ $id }}" class="{{ $labelClass }}">{{ $label }}</label>
    @endif
    <div class="{{ $control }}">
        <span id="{{ $currencyId }}" class="{{ $prefix }}">{{ $c['symbol'] }}</span>
        <input
            x-ref="field"
            x-on:input="input($event)"
            x-on:keydown="skipSeparator($event)"
            x-on:blur="blur()"
            {{ $attributes->whereDoesntStartWith(['wire:model', 'x-model'])->merge([
                'id' => $id,
                'type' => 'text',
                'inputmode' => $c['fraction'] ? 'decimal' : 'numeric',
                'autocomplete' => 'off',
                'value' => $value === null ? '' : $formatAmount($value),
                'aria-invalid' => $error ? 'true' : null,
                'aria-describedby' => trim($currencyId.' '.$messageId),
            ])->class([$field]) }}
        />
    </div>
    @if ($name)
        <input type="hidden" name="{{ $name }}" value="{{ $value ?? '' }}" x-bind:value="value ?? ''" />
    @endif
    @if ($error)
        <p id="{{ $id }}-error" class="{{ $errorClass }}">{{ $error }}</p>
    @elseif ($hint)
        <p id="{{ $id }}-hint" class="{{ $hintClass }}">{{ $hint }}</p>
    @endif
    @if (count($presets) > 0)
        <div role="group" aria-label="{{ $presetsLabel }}" class="{{ $chips }}">
            @foreach ($presets as $preset)
                <button
                    type="button"
                    aria-pressed="{{ $value !== null && (float) $preset === $value ? 'true' : 'false' }}"
                    x-bind:aria-pressed="String(value !== null && value !== '' && Number(value) === {{ (float) $preset }})"
                    @if ($disabled) disabled @endif
                    x-on:click="pick({{ (float) $preset }})"
                    class="{{ $chip }}"
                >{{ $shortAmount((float) $preset) }}</button>
            @endforeach
        </div>
    @endif
</div>
