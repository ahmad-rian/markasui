@props([
    'length' => 6,
    'label' => null,
    'name' => null,
    'value' => '',
    'digitLabel' => 'Digit {index} of {length}',
])

@php
    $root = 'm-0 min-w-0 border-0 p-0';
    $legend = 'mb-1.5 p-0 text-sm font-medium text-ink';
    $group = 'flex gap-2';
    $box = 'h-12 w-10 rounded-md border border-line bg-surface text-center text-lg font-medium text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none';

    $length = max(1, (int) $length);
    // Pecah nilai menjadi tepat $length karakter; posisi kosong berisi ''.
    $chars = array_map(fn (int $index) => mb_substr((string) $value, $index, 1), range(0, $length - 1));
@endphp

<fieldset
    x-data="{
        chars: @js($chars),
        get joined() {
            return this.chars.join('');
        },
        focusBox(index) {
            const target = this.$refs.group.children[index];
            if (target) target.focus();
        },
        update(next) {
            const previous = this.joined;
            this.chars = next;
            const value = next.join('');
            if (value === previous) return;
            this.$dispatch('markas-change', value);
            if (next.every(Boolean)) this.$dispatch('markas-complete', value);
        },
        {{-- Isi kotak mulai dari start dengan digit berurutan, lalu fokus ke kotak sesudahnya. --}}
        fill(start, digits) {
            this.update(this.chars.map((char, index) =>
                index >= start && index < start + digits.length ? (digits[index - start] ?? char) : char));
            this.focusBox(Math.min(start + digits.length, this.chars.length - 1));
        },
        setChar(index, char) {
            this.update(this.chars.map((current, i) => (i === index ? char : current)));
        },
        onInput(index, event) {
            const digits = event.target.value.replace(/\D/g, '');
            if (digits === '') this.setChar(index, '');
            else this.fill(index, digits);
            {{-- Alpine tidak menimpa DOM kalau nilai reaktifnya tidak berubah, jadi samakan manual. --}}
            event.target.value = this.chars[index] ?? '';
        },
        onKeydown(index, event) {
            const last = this.chars.length - 1;
            const move = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: last }[event.key];
            if (move !== undefined) {
                event.preventDefault();
                return this.focusBox(move);
            }
            if (event.key === 'Delete') {
                event.preventDefault();
                return this.setChar(index, '');
            }
            if (event.key !== 'Backspace') return;
            event.preventDefault();
            if (this.chars[index] || index === 0) return this.setChar(index, '');
            this.setChar(index - 1, '');
            this.focusBox(index - 1);
        },
        onPaste(index, event) {
            event.preventDefault();
            const digits = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, this.chars.length);
            if (digits === '') return;
            this.fill(digits.length >= this.chars.length ? 0 : index, digits);
        },
    }"
    {{ $attributes->class([$root]) }}
>
    @if ($label)
        <legend class="{{ $legend }}">{{ $label }}</legend>
    @endif
    <div x-ref="group" class="{{ $group }}">
        @foreach ($chars as $index => $char)
            <input
                type="text"
                inputmode="numeric"
                autocomplete="{{ $index === 0 ? 'one-time-code' : 'off' }}"
                aria-label="{{ str_replace(['{index}', '{length}'], [$index + 1, $length], $digitLabel) }}"
                value="{{ $char }}"
                :value="chars[{{ $index }}]"
                @input="onInput({{ $index }}, $event)"
                @keydown="onKeydown({{ $index }}, $event)"
                @paste="onPaste({{ $index }}, $event)"
                @focus="$event.target.select()"
                class="{{ $box }}"
            />
        @endforeach
    </div>
    @if ($name)
        <input type="hidden" name="{{ $name }}" value="{{ implode('', $chars) }}" :value="joined" />
    @endif
</fieldset>
