@props([
    'name' => null,
    'accept' => null,
    'multiple' => false,
    'maxSize' => null,
    'maxFiles' => null,
    'disabled' => false,
    'required' => false,
    'files' => [],
    'hint' => null,
    'dropLabel' => 'Drop files here or',
    'browseLabel' => 'browse',
    'removeLabel' => 'Remove {name}',
    'tooLargeLabel' => 'Larger than {size}',
    'typeLabel' => 'File type not allowed',
    'tooManyLabel' => 'Only {max} files allowed',
])

@php
    $root = 'grid gap-3';
    $zone = 'group/zone grid cursor-pointer justify-items-center gap-2 rounded-xl border-2 border-dashed border-line bg-surface px-6 py-8 text-center transition duration-200 ease-out hover:border-primary-line hover:bg-subtle has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary has-[:disabled]:opacity-50 data-[state=over]:border-primary data-[state=over]:bg-primary-soft data-[state=over]:ring-4 data-[state=over]:ring-primary/10 motion-reduce:transition-none';
    $badge = 'size-11 rounded-full bg-subtle p-3 text-ink transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[state=over]/zone:-translate-y-1.5 group-data-[state=over]/zone:scale-110 group-data-[state=over]/zone:bg-surface motion-reduce:transition-none';
    $titleClass = 'text-sm text-ink';
    $browseClass = 'font-medium underline underline-offset-4';
    $hintClass = 'text-xs text-muted';
    $srOnly = 'sr-only';
    $list = 'grid gap-2';
    $item = 'group/item flex items-center gap-3 rounded-lg border border-line bg-surface p-3 data-[state=error]:border-danger/40 data-[state=error]:bg-danger/5';
    $fileIcon = 'size-9 shrink-0 rounded-md bg-subtle p-2 text-ink group-data-[state=error]/item:bg-danger/10 group-data-[state=error]/item:text-danger';
    $body = 'grid min-w-0 flex-1 gap-1.5';
    $row = 'flex items-baseline justify-between gap-3 text-sm';
    $nameClass = 'truncate font-medium text-ink';
    $sizeClass = 'shrink-0 text-xs text-muted tabular-nums';
    $errorClass = 'text-xs text-danger';
    $track = 'h-1.5 overflow-hidden rounded-full bg-subtle';
    $bar = 'h-full rounded-full transition-[width] duration-300 ease-out motion-reduce:transition-none';
    $bars = ['busy' => 'bg-primary', 'done' => 'bg-success'];
    $remove = 'size-8 shrink-0 rounded-md p-2 text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $smallIcon = 'size-4';

    // 24px stroked icons per file kind.
    $icons = [
        'upload' => 'M12 16V4M7 9l5-5 5 5M4 16v4h16v-4',
        'image' => 'M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4M15 8h.01',
        'video' => 'M3 6h13v12H3zM16 10l5-3v10l-5-3',
        'audio' => 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
        'file' => 'M14 3H5v18h14V8zM14 3v5h5M9 13h6M9 17h4',
        'remove' => 'M6 6l12 12M18 6 6 18',
    ];

    $id = $attributes->get('id') ?? 'markas-file-dropzone-'.\Illuminate\Support\Str::random(8);
    $initial = array_map(fn (array $file, int $key) => [
        'key' => $key,
        'name' => (string) $file['name'],
        'size' => (int) $file['size'],
        'type' => (string) ($file['type'] ?? ''),
        'progress' => isset($file['progress']) ? (float) $file['progress'] : null,
        'error' => $file['error'] ?? null,
    ], array_values($files), array_keys(array_values($files)));
    $config = [
        'accept' => (string) $accept,
        'multiple' => (bool) $multiple,
        'maxSize' => $maxSize === null ? null : (int) $maxSize,
        'maxFiles' => $maxFiles === null ? null : (int) $maxFiles,
        'disabled' => (bool) $disabled,
        'labels' => ['remove' => $removeLabel, 'tooLarge' => $tooLargeLabel, 'type' => $typeLabel, 'tooMany' => $tooManyLabel],
        'icons' => $icons,
        'bars' => $bars,
    ];
@endphp

{{-- Picked and dropped files are checked against accept, maxSize, and maxFiles; the valid ones stay in the native input so the form posts them. Dispatch file-progress with { name, progress } on the component to move a bar. --}}
<div
    x-data="{
        ...@js($config),
        items: @js($initial),
        seq: {{ count($initial) }},
        over: false,
        fill(template, value) {
            return template.replace(/\{\w+\}/, () => String(value));
        },
        size(bytes) {
            let value = bytes;
            let unit = 0;
            while (value >= 1024 && unit < 3) {
                value /= 1024;
                unit++;
            }
            return `${unit < 2 ? Math.round(value) : Number(value.toFixed(1))} ${['B', 'KB', 'MB', 'GB'][unit]}`;
        },
        accepts(file) {
            const type = (file.type || '').toLowerCase();
            return ! this.accept || this.accept.split(',').some((raw) => {
                const rule = raw.trim().toLowerCase();
                if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule);
                if (rule.endsWith('/*')) return type.startsWith(rule.slice(0, -1));
                return type === rule;
            });
        },
        kind(file) {
            const group = (file.type || '').split('/')[0];
            return ['image', 'video', 'audio'].includes(group) ? group : 'file';
        },
        update(next) {
            this.items = next;
            const picked = next.filter((i) => i.file && ! i.error).map((i) => i.file);
            const transfer = new DataTransfer();
            picked.forEach((file) => transfer.items.add(file));
            this.$refs.input.files = transfer.files;
            this.$dispatch('files-change', picked);
        },
        add(incoming) {
            const limit = this.multiple ? (this.maxFiles ?? Infinity) : 1;
            const kept = this.multiple ? this.items : [];
            let count = kept.filter((i) => ! i.error).length;
            const added = incoming.map((file) => {
                const error = ! this.accepts(file) ? this.labels.type
                    : this.maxSize !== null && file.size > this.maxSize ? this.fill(this.labels.tooLarge, this.size(this.maxSize))
                    : count >= limit ? this.fill(this.labels.tooMany, limit)
                    : null;
                if (! error) count++;
                return { key: this.seq++, name: file.name, size: file.size, type: file.type, progress: null, error, file };
            });
            this.update([...kept, ...added]);
        },
        drag(event, entering) {
            event.preventDefault();
            if (entering) return (this.over = ! this.disabled);
            if (! event.currentTarget.contains(event.relatedTarget)) this.over = false;
        },
        drop(event) {
            event.preventDefault();
            this.over = false;
            if (! this.disabled) this.add([...event.dataTransfer.files]);
        },
        progressed({ name, progress }) {
            this.items = this.items.map((i) => (i.name === name ? { ...i, progress } : i));
        },
    }"
    x-on:file-progress="progressed($event.detail)"
    {{ $attributes->except('id')->class([$root]) }}
>
    <label
        data-state="idle"
        x-bind:data-state="over ? 'over' : 'idle'"
        x-on:dragenter="drag($event, true)"
        x-on:dragover="drag($event, true)"
        x-on:dragleave="drag($event, false)"
        x-on:drop="drop($event)"
        class="{{ $zone }}"
    >
        <input
            x-ref="input"
            id="{{ $id }}"
            type="file"
            @if ($name) name="{{ $name }}" @endif
            @if ($accept) accept="{{ $accept }}" @endif
            @if ($multiple) multiple @endif
            @if ($disabled) disabled @endif
            @if ($required) required @endif
            x-on:change="add([...$event.target.files])"
            class="{{ $srOnly }}"
        />
        <svg class="{{ $badge }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['upload'] }}" /></svg>
        <span class="{{ $titleClass }}">{{ $dropLabel }} <span class="{{ $browseClass }}">{{ $browseLabel }}</span></span>
        @if ($hint)
            <span class="{{ $hintClass }}">{{ $hint }}</span>
        @endif
    </label>
    <ul x-show="items.length > 0" @if (count($initial) === 0) style="display: none" @endif class="{{ $list }}">
        <template x-for="file in items" x-bind:key="file.key">
            <li x-bind:data-state="file.error ? 'error' : 'ok'" class="{{ $item }}">
                <svg class="{{ $fileIcon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path x-bind:d="icons[kind(file)]" /></svg>
                <div class="{{ $body }}">
                    <div class="{{ $row }}">
                        <span class="{{ $nameClass }}" x-text="file.name"></span>
                        <span class="{{ $sizeClass }}" x-text="size(file.size)"></span>
                    </div>
                    <template x-if="file.error">
                        <p role="alert" class="{{ $errorClass }}" x-text="file.error"></p>
                    </template>
                    <template x-if="! file.error && file.progress !== null">
                        <div role="progressbar" x-bind:aria-valuenow="file.progress" x-bind:aria-label="file.name" class="{{ $track }}"><div x-bind:class="@js($bar) + ' ' + bars[file.progress < 100 ? 'busy' : 'done']" x-bind:style="{ width: file.progress + '%' }"></div></div>
                    </template>
                </div>
                <button
                    type="button"
                    x-bind:aria-label="fill(labels.remove, file.name)"
                    x-on:click="update(items.filter((i) => i.key !== file.key))"
                    class="{{ $remove }}"
                >
                    <svg class="{{ $smallIcon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['remove'] }}" /></svg>
                </button>
            </li>
        </template>
    </ul>
</div>
