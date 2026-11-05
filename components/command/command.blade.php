@props([
    'items' => [],
    'hotkey' => false,
    'placeholderLabel' => 'Type a command or search...',
    'emptyLabel' => 'No results found.',
    'searchLabel' => 'Search commands',
    'dialogLabel' => 'Command palette',
])

@php
    $dialog = 'mx-auto mt-24 mb-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40';
    $search = 'flex items-center gap-2 border-b border-line px-4';
    $searchIcon = 'size-4 shrink-0 text-muted';
    $input = 'h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted';
    $list = 'max-h-72 overflow-y-auto p-1';
    $groupClass = 'py-1';
    $heading = 'px-3 pt-1 pb-1.5 text-xs font-medium text-muted';
    $option = 'flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-sm text-ink transition-colors duration-150 ease-out aria-selected:bg-subtle motion-reduce:transition-none';
    $shortcutClass = 'font-sans text-xs text-muted';
    $empty = 'px-4 py-6 text-center text-sm text-muted';

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#".
    $safeHref = function (string $href): string {
        $value = ltrim(str_replace(["\t", "\n", "\r"], '', $href), "\x00..\x20");
        $hasScheme = preg_match('/^[a-z][a-z0-9+.\-]*:/i', $value) === 1;

        return $hasScheme && preg_match('/^(https?|mailto|tel):/i', $value) !== 1 ? '#' : $href;
    };

    // Kelompokkan item per grup sesuai urutan kemunculan pertama, indeks asli dipakai untuk id opsi.
    $groups = [];
    foreach (array_values($items) as $index => $entry) {
        $groups[(string) ($entry['group'] ?? '')][$index] = $entry;
    }

    $id = $attributes->get('id') ?? 'markas-command-'.\Illuminate\Support\Str::random(8);
@endphp

<div
    class="contents"
    x-data="{
        open: false,
        query: '',
        active: 0,
        matches(label) {
            return label.toLowerCase().includes(this.query.trim().toLowerCase());
        },
        visible() {
            return Array.from(this.$refs.list.querySelectorAll('[role=option]')).filter((el) => this.matches(el.dataset.label));
        },
        get activeId() {
            const list = this.visible();
            return list[Math.min(this.active, list.length - 1)]?.id ?? null;
        },
        show() {
            this.$refs.dialog.showModal();
            this.open = true;
        },
        {{-- Ctrl+K atau Cmd+K membuka dan menutup palet. --}}
        onHotkey(event) {
            if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
            event.preventDefault();
            if (this.$refs.dialog.open) return this.$refs.dialog.close();
            this.show();
        },
        select(value) {
            this.$dispatch('markas-select', value);
            this.$refs.dialog.close();
        },
        onClose() {
            this.open = false;
            this.query = '';
            this.active = 0;
        },
        reveal() {
            this.$nextTick(() => document.getElementById(this.activeId)?.scrollIntoView({ block: 'nearest' }));
        },
        onKeydown(event) {
            const count = this.visible().length;
            const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
            if (step !== undefined) {
                event.preventDefault();
                if (count > 0) this.active = (this.active + step + count) % count;
                return this.reveal();
            }
            if (event.key !== 'Enter' || !this.activeId) return;
            event.preventDefault();
            document.getElementById(this.activeId)?.click();
        },
    }"
    @if ($hotkey) @keydown.window="onHotkey($event)" @endif
>
    @isset($trigger)
        <div class="contents" @click="show()">{{ $trigger }}</div>
    @endisset
    <dialog
        x-ref="dialog"
        aria-label="{{ $dialogLabel }}"
        :data-state="open ? 'open' : 'closed'"
        @close="onClose()"
        @click.self="$refs.dialog.close()"
        {{ $attributes->merge(['id' => $id, 'data-state' => 'closed'])->class([$dialog]) }}
    >
        <div class="{{ $search }}">
            <svg class="{{ $searchIcon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input
                type="text"
                role="combobox"
                aria-label="{{ $searchLabel }}"
                aria-expanded="true"
                aria-controls="{{ $id }}-list"
                aria-autocomplete="list"
                autocomplete="off"
                spellcheck="false"
                placeholder="{{ $placeholderLabel }}"
                x-model="query"
                :aria-expanded="visible().length > 0 ? 'true' : 'false'"
                :aria-activedescendant="activeId"
                @input="active = 0"
                @keydown="onKeydown($event)"
                class="{{ $input }}"
            />
        </div>
        <div
            x-ref="list"
            id="{{ $id }}-list"
            role="listbox"
            aria-label="{{ $dialogLabel }}"
            :hidden="visible().length === 0"
            class="{{ $list }}"
        >
            @foreach ($groups as $name => $entries)
                @php
                    $groupId = $id.'-group-'.$loop->index;
                    $labels = array_map(fn ($entry) => (string) $entry['label'], array_values($entries));
                @endphp
                <div role="group" aria-labelledby="{{ $groupId }}-heading" x-show="@js($labels).some((label) => matches(label))" class="{{ $groupClass }}">
                    <div id="{{ $groupId }}-heading" class="{{ $heading }}">{{ $name }}</div>
                    @foreach ($entries as $index => $entry)
                        @php
                            $optionId = $id.'-option-'.$index;
                            $label = (string) $entry['label'];
                            $value = (string) ($entry['value'] ?? $label);
                            $tag = isset($entry['href']) ? 'a' : 'div';
                        @endphp
                        <{{ $tag }}
                            @if ($tag === 'a') href="{{ $safeHref((string) $entry['href']) }}" @endif
                            id="{{ $optionId }}"
                            role="option"
                            aria-selected="false"
                            tabindex="-1"
                            data-label="{{ $label }}"
                            x-show="matches($el.dataset.label)"
                            :aria-selected="activeId === @js($optionId) ? 'true' : 'false'"
                            @mousemove="active = visible().indexOf($el)"
                            @click="select(@js($value))"
                            class="{{ $option }}"
                        ><span>{{ $label }}</span>@isset($entry['shortcut'])<kbd class="{{ $shortcutClass }}">{{ $entry['shortcut'] }}</kbd>@endisset</{{ $tag }}>
                    @endforeach
                </div>
            @endforeach
        </div>
        <p x-show="visible().length === 0" style="display: none" class="{{ $empty }}">{{ $emptyLabel }}</p>
    </dialog>
</div>
