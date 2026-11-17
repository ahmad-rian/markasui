@props([
    'options' => [],
    'label' => null,
    'hint' => null,
    'error' => null,
    'name' => null,
    'value' => '',
    'emptyLabel' => 'No results',
])

@php
    $wrapper = 'grid gap-1.5';
    $labelClass = 'text-sm font-medium text-ink';
    $control = 'relative';
    $field = 'h-10 w-full rounded-md border border-line bg-surface ps-3 pe-9 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none';
    $chevron = 'pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted';
    $panel = 'inset-auto m-0 max-h-60 overflow-y-auto rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay';
    $optionClass = 'flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-ink hover:bg-subtle aria-selected:bg-subtle';
    $check = 'size-4 shrink-0 text-primary';
    $emptyClass = 'px-3 py-2 text-sm text-muted';
    $hintClass = 'text-sm text-muted';
    $errorClass = 'text-sm text-danger';

    $options = array_values(array_map(fn ($option) => ['value' => (string) $option['value'], 'label' => (string) $option['label']], $options));
    $value = (string) $value;
    $text = collect($options)->firstWhere('value', $value)['label'] ?? '';
    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-combobox|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $name).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-combobox-'.hash('xxh32', $idKey.$idIndex);
    $listId = $id.'-listbox';
    $describedBy = $error ? $id.'-error' : ($hint ? $id.'-hint' : null);
@endphp

<div
    x-data="{
        options: @js($options),
        value: @js($value),
        text: @js($text),
        filter: '',
        active: -1,
        open: false,
        unfollow: null,
        {{-- value is bound by wire:model and x-model (x-modelable): show the matching label when it changes from outside. --}}
        init() {
            this.$watch('value', (next) => {
                const option = this.options.find((entry) => entry.value === String(next ?? ''));
                if (option) this.text = option.label;
                else if (document.activeElement !== this.$refs.input) this.text = this.filter = '';
            });
        },
        {{-- Indeks opsi (di daftar asli) yang labelnya memuat teks filter. --}}
        get visible() {
            const query = this.filter.trim().toLowerCase();
            return this.options.flatMap((option, index) => (option.label.toLowerCase().includes(query) ? [index] : []));
        },
        optionId(index) {
            return @js($id) + '-option-' + index;
        },
        isChecked(index) {
            return this.value !== '' && this.options[index].value === String(this.value ?? '');
        },
        commit(next) {
            if (next === String(this.value ?? '')) return;
            this.value = next;
            {{-- Dispatch from the input: it carries the user's attributes (x-on:, wire:), the list is outside it. --}}
            this.$refs.input.dispatchEvent(new CustomEvent('markas-change', { detail: next, bubbles: true }));
        },
        show() {
            if (!this.open) this.$refs.panel.showPopover();
        },
        hide() {
            this.active = -1;
            if (this.open) this.$refs.panel.hidePopover();
        },
        select(index) {
            const option = this.options[index];
            if (!option) return;
            this.commit(option.value);
            this.text = option.label;
            this.filter = '';
            this.hide();
        },
        move(step) {
            const list = this.visible;
            if (list.length === 0) return;
            const position = list.indexOf(this.active);
            const next = position === -1 ? (step === 1 ? 0 : list.length - 1) : (position + step + list.length) % list.length;
            this.setActive(list[next] ?? -1);
        },
        setActive(index) {
            this.active = index;
            if (index < 0) return;
            this.$nextTick(() => document.getElementById(this.optionId(index))?.scrollIntoView({ block: 'nearest' }));
        },
        onInput(event) {
            this.text = event.target.value;
            this.filter = event.target.value;
            this.active = -1;
            this.commit('');
            this.show();
        },
        onKeydown(event) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                const step = event.key === 'ArrowDown' ? 1 : -1;
                if (this.open) return this.move(step);
                this.show();
                const list = this.visible;
                return this.setActive((step === 1 ? list[0] : list[list.length - 1]) ?? -1);
            }
            if (event.key === 'Enter' && this.open && this.active >= 0) {
                event.preventDefault();
                return this.select(this.active);
            }
            if (event.key !== 'Escape') return;
            event.preventDefault();
            if (this.open) return this.hide();
            this.text = '';
            this.filter = '';
            this.commit('');
        },
        {{-- Letakkan daftar di bawah input selebar input, pindah ke atas kalau tidak muat. --}}
        place() {
            const gap = 4;
            const anchor = this.$refs.input.getBoundingClientRect();
            this.$refs.panel.style.width = anchor.width + 'px';
            const { height } = this.$refs.panel.getBoundingClientRect();
            const below = anchor.bottom + gap;
            const above = anchor.top - gap - height;
            const fitsBelow = below + height <= window.innerHeight;
            this.$refs.panel.style.top = (fitsBelow || above < 0 ? below : above) + 'px';
            this.$refs.panel.style.left = anchor.left + 'px';
        },
        {{-- Jalankan ulang penempatan saat halaman digulir atau jendela berubah ukuran. --}}
        follow() {
            this.unfollow?.();
            const update = () => this.place();
            const scrollOptions = { capture: true, passive: true };
            window.addEventListener('scroll', update, scrollOptions);
            window.addEventListener('resize', update, { passive: true });
            this.unfollow = () => {
                window.removeEventListener('scroll', update, scrollOptions);
                window.removeEventListener('resize', update);
                this.unfollow = null;
            };
        },
        destroy() {
            this.unfollow?.();
        },
        {{-- beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya. --}}
        onBeforeToggle(event) {
            this.open = event.newState === 'open';
        },
        onToggle(event) {
            if (event.newState !== 'open') return this.unfollow?.();
            this.place();
            this.follow();
        },
    }"
    x-modelable="value"
    {{ $attributes->whereStartsWith(['wire:model', 'x-model']) }}
    class="{{ $wrapper }}"
>
    @if ($label)
        <label id="{{ $id }}-label" for="{{ $id }}" class="{{ $labelClass }}">{{ $label }}</label>
    @endif
    <div class="{{ $control }}">
        <input
            x-ref="input"
            {{ $attributes->whereDoesntStartWith(['wire:model', 'x-model'])->merge([
                'id' => $id,
                'type' => 'text',
                'role' => 'combobox',
                'autocomplete' => 'off',
                'aria-autocomplete' => 'list',
                'aria-expanded' => 'false',
                'aria-controls' => $listId,
                'aria-invalid' => $error ? 'true' : null,
                'aria-describedby' => $describedBy,
                'data-state' => 'closed',
                'value' => $text,
            ])->class([$field]) }}
            :value="text"
            :aria-expanded="open ? 'true' : 'false'"
            :aria-activedescendant="active >= 0 ? optionId(active) : null"
            :data-state="open ? 'open' : 'closed'"
            @input="onInput($event)"
            @keydown="onKeydown($event)"
            @blur="hide()"
            @click="show()"
        />
        <svg class="{{ $chevron }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </div>
    @if ($name)
        <input type="hidden" name="{{ $name }}" value="{{ $value }}" :value="value" />
    @endif
    <div
        x-ref="panel"
        id="{{ $id }}-popup"
        popover="manual"
        wire:ignore.self
        data-state="closed"
        :data-state="open ? 'open' : 'closed'"
        @beforetoggle="onBeforeToggle($event)"
        @toggle="onToggle($event)"
        @mousedown.prevent
        class="{{ $panel }}"
    >
        {{-- Alpine owns the options (and their state) after the first render, so Livewire skips the list when it re-renders. --}}
        <ul id="{{ $listId }}" role="listbox" wire:ignore @if ($label) aria-labelledby="{{ $id }}-label" @endif>
            @foreach ($options as $index => $option)
                <li
                    id="{{ $id }}-option-{{ $index }}"
                    role="option"
                    aria-selected="false"
                    data-state="{{ $value !== '' && $option['value'] === $value ? 'checked' : 'unchecked' }}"
                    x-show="visible.includes({{ $index }})"
                    :aria-selected="active === {{ $index }} ? 'true' : 'false'"
                    :data-state="isChecked({{ $index }}) ? 'checked' : 'unchecked'"
                    @click="select({{ $index }})"
                    class="{{ $optionClass }}"
                >{{ $option['label'] }}<svg x-show="isChecked({{ $index }})" @if (! ($value !== '' && $option['value'] === $value)) style="display: none" @endif class="{{ $check }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg></li>
            @endforeach
        </ul>
        <p x-show="visible.length === 0" wire:ignore @if (count($options) > 0) style="display: none" @endif class="{{ $emptyClass }}">{{ $emptyLabel }}</p>
    </div>
    @if ($error)
        <p id="{{ $id }}-error" class="{{ $errorClass }}">{{ $error }}</p>
    @elseif ($hint)
        <p id="{{ $id }}-hint" class="{{ $hintClass }}">{{ $hint }}</p>
    @endif
</div>
