@props([
    'value' => '',
    'loading' => false,
    'maxLength' => null,
    'maxHeight' => 200,
    'attachments' => true,
    'accept' => null,
    'models' => [],
    'model' => null,
    'placeholderLabel' => 'Ask anything',
    'inputLabel' => 'Message',
    'sendLabel' => 'Send',
    'stopLabel' => 'Stop',
    'attachLabel' => 'Attach files',
    'removeLabel' => 'Remove {name}',
    'modelLabel' => 'Model',
])

@php
    $root = 'grid gap-1 rounded-2xl border border-line bg-surface p-2 transition-colors duration-150 ease-out has-[textarea:focus-visible]:border-primary-line has-[textarea:focus-visible]:outline-2 has-[textarea:focus-visible]:outline-offset-2 has-[textarea:focus-visible]:outline-primary motion-reduce:transition-none';
    $chips = 'flex flex-wrap gap-1.5 px-1 pt-1';
    $chip = 'inline-flex h-7 max-w-full items-center gap-1.5 rounded-md border border-line bg-subtle pr-1 pl-2 text-xs font-medium text-ink';
    $chipName = 'max-w-40 truncate';
    $chipRemove = 'grid size-5 shrink-0 place-items-center rounded text-muted transition-colors duration-150 ease-out hover:bg-line hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary motion-reduce:transition-none';
    $field = 'block min-h-10 w-full resize-none overflow-y-auto bg-transparent px-2 py-2 text-sm leading-6 text-ink outline-none field-sizing-content placeholder:text-faint';
    $bar = 'flex items-center gap-1';
    $iconButton = 'inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $select = 'h-8 max-w-40 cursor-pointer truncate rounded-full bg-transparent px-2.5 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $counter = 'ml-auto px-1.5 text-xs text-muted tabular-nums data-[state=limit]:text-danger';
    $send = 'group grid size-8 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-[background-color,opacity,scale] duration-150 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-90 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none';
    $sendIcon = 'col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=stop]:scale-50 group-data-[state=stop]:opacity-0 motion-reduce:transition-none';
    $stopIcon = 'col-start-1 row-start-1 size-3 scale-50 rounded-xs bg-current opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=stop]:scale-100 group-data-[state=stop]:opacity-100 motion-reduce:transition-none';
    $icon = 'size-4';
    $smallIcon = 'size-3';

    $options = array_map(fn ($option) => is_array($option) ? $option : ['value' => $option, 'label' => $option], $models);
    $canSend = trim((string) $value) !== '' && ! $loading;
    $atLimit = $maxLength !== null && mb_strlen((string) $value) >= $maxLength;
@endphp

{{-- Enter or the send button dispatches send with { text, files }. While loading the button dispatches stop instead; it turns into submit during that click, so the click is prevented. --}}
<form
    x-data="{
        text: @js((string) $value),
        files: [],
        loading: @js((bool) $loading),
        max: @js($maxLength),
        get canSend() {
            return this.text.trim() !== '' && ! this.loading;
        },
        {{-- Browsers without field-sizing grow the textarea by hand. --}}
        grow() {
            const el = this.$refs.field;
            if (window.CSS?.supports?.('field-sizing', 'content')) return;
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        },
        submit() {
            if (! this.canSend) return;
            this.$dispatch('send', { text: this.text, files: this.files });
            this.text = '';
            this.files = [];
        },
        enter(event) {
            if (event.shiftKey || event.isComposing) return;
            event.preventDefault();
            this.$root.requestSubmit();
        },
        pick(event) {
            this.files = [...this.files, ...event.target.files];
            event.target.value = '';
        },
        remove(index) {
            this.files = this.files.filter((_, i) => i !== index);
            this.$refs.field.focus();
        },
    }"
    x-effect="text; $nextTick(() => grow())"
    x-on:submit.prevent="submit()"
    {{ $attributes->class([$root]) }}
>
    <template x-if="files.length > 0">
        <ul class="{{ $chips }}">
            <template x-for="(file, index) in files" x-bind:key="`${file.name}-${index}`">
                <li class="{{ $chip }}">
                    <span class="{{ $chipName }}" x-text="file.name"></span>
                    <button type="button" x-bind:aria-label="@js($removeLabel).replace('{name}', file.name)" x-on:click="remove(index)" class="{{ $chipRemove }}">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $smallIcon }}"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                </li>
            </template>
        </ul>
    </template>
    <textarea
        x-ref="field"
        x-model="text"
        rows="1"
        @if ($maxLength !== null) maxlength="{{ $maxLength }}" @endif
        aria-label="{{ $inputLabel }}"
        placeholder="{{ $placeholderLabel }}"
        style="max-height: {{ (int) $maxHeight }}px"
        x-on:keydown.enter="enter($event)"
        class="{{ $field }}"
    >{{ $value }}</textarea>
    <div class="{{ $bar }}">
        @if ($attachments)
            <button type="button" aria-label="{{ $attachLabel }}" x-on:click="$refs.files.click()" class="{{ $iconButton }}">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="m21 11-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6L15 7.6" /></svg>
            </button>
            <input x-ref="files" type="file" multiple hidden tabindex="-1" @if ($accept) accept="{{ $accept }}" @endif x-on:change="pick($event)" />
        @endif
        @if (count($options) > 0)
            <select aria-label="{{ $modelLabel }}" class="{{ $select }}">
                @foreach ($options as $option)
                    <option value="{{ $option['value'] }}" @selected($option['value'] === $model)>{{ $option['label'] }}</option>
                @endforeach
            </select>
        @endif
        {{ $__laravel_slots['actions'] ?? '' }}
        <span
            data-state="{{ $atLimit ? 'limit' : 'ok' }}"
            x-bind:data-state="max !== null && text.length >= max ? 'limit' : 'ok'"
            @if ($maxLength !== null) x-text="`${text.length}/${max}`" @endif
            class="{{ $counter }}"
        >{{ $maxLength !== null ? mb_strlen((string) $value).'/'.$maxLength : '' }}</span>
        <button
            type="{{ $loading ? 'button' : 'submit' }}"
            aria-label="{{ $loading ? $stopLabel : $sendLabel }}"
            data-state="{{ $loading ? 'stop' : 'send' }}"
            @disabled(! $canSend && ! $loading)
            x-bind:type="loading ? 'button' : 'submit'"
            x-bind:aria-label="loading ? @js($stopLabel) : @js($sendLabel)"
            x-bind:data-state="loading ? 'stop' : 'send'"
            x-bind:disabled="! loading && ! canSend"
            x-on:click="if (loading) { $event.preventDefault(); $dispatch('stop'); }"
            class="{{ $send }}"
        >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $sendIcon }}"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
            <span aria-hidden="true" class="{{ $stopIcon }}"></span>
        </button>
    </div>
</form>
