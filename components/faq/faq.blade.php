@props([
    'items' => [],
    'title' => '',
    'description' => '',
    'variant' => 'simple',
    'exclusive' => false,
    'schema' => false,
    'contact' => null,
    'searchLabel' => 'Search questions',
    'emptyLabel' => 'No questions match your search',
    'categoriesLabel' => 'Question categories',
])

@php
    $root = '@container w-full [interpolate-size:allow-keywords]';
    $layouts = [
        'simple' => ['root' => 'mx-auto grid max-w-3xl gap-8', 'header' => 'grid gap-2', 'list' => 'border-t border-line', 'item' => 'border-b border-line'],
        'split' => ['root' => 'grid gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12', 'header' => 'grid content-start gap-2', 'list' => 'border-t border-line', 'item' => 'border-b border-line'],
        'cards' => ['root' => 'grid gap-8', 'header' => 'grid gap-2', 'list' => 'grid items-start gap-3 @xl:grid-cols-2', 'item' => 'rounded-xl border border-line bg-surface px-5'],
        'centered' => ['root' => 'mx-auto grid max-w-2xl gap-8 text-center', 'header' => 'grid justify-items-center gap-2', 'list' => 'grid gap-2 text-left', 'item' => 'rounded-lg bg-subtle px-4'],
        'searchable' => ['root' => 'mx-auto grid max-w-3xl gap-6', 'header' => 'grid gap-2', 'list' => 'border-t border-line', 'item' => 'border-b border-line'],
        'categories' => ['root' => 'mx-auto grid max-w-3xl gap-6', 'header' => 'grid gap-2', 'list' => 'border-t border-line', 'item' => 'border-b border-line'],
    ];
    $titleClass = 'text-2xl font-semibold tracking-tight text-balance text-ink';
    $descriptionClass = 'max-w-prose text-sm text-pretty text-muted';
    $contactClass = 'text-sm text-muted [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4';
    $body = 'grid content-start gap-4';
    $details = 'group details-content:h-0 details-content:overflow-hidden details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 details-content:ease-out open:details-content:h-auto motion-reduce:details-content:transition-none';
    $summary = 'flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden';
    $icon = 'size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none';
    $answer = 'pb-4 text-sm leading-relaxed text-pretty text-muted';
    $search = 'relative';
    $searchIcon = 'pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted';
    $searchInput = 'h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-sm text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $status = 'contents';
    $empty = 'py-6 text-center text-sm text-muted';
    $tablist = 'flex flex-wrap gap-2';
    $tab = 'inline-flex h-8 items-center rounded-full border border-line px-3 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-on-primary motion-reduce:transition-none';

    $layout = $layouts[$variant] ?? $layouts['simple'];
    $id = $attributes->get('id') ?? 'markas-faq-'.\Illuminate\Support\Str::random(8);
    $searchable = $variant === 'searchable';
    $interactive = $searchable || $variant === 'categories';
    $hasContact = filled(trim((string) $contact));

    // Kelompokkan pertanyaan per kategori (varian categories) atau satu kelompok berisi semua pertanyaan.
    $groups = [];
    foreach (array_values($items) as $index => $item) {
        $groups[$variant === 'categories' ? (string) ($item['category'] ?? '') : ''][$index] = $item;
    }
    $categories = $variant === 'categories' ? array_keys($groups) : [];

    $schemaJson = json_encode([
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => array_map(fn ($item) => [
            '@type' => 'Question',
            'name' => $item['question'],
            'acceptedAnswer' => ['@type' => 'Answer', 'text' => $item['answer']],
        ], array_values($items)),
    ], JSON_HEX_TAG | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
@endphp

<section
    @if ($interactive)
        x-data="{
            query: '',
            active: 0,
            texts: @js(array_map(fn ($item) => $item['question'].' '.$item['answer'], array_values($items))).map((text) => text.toLowerCase()),
            {{-- Pertanyaan cocok kalau teks pertanyaan atau jawabannya memuat kata kunci. --}}
            shows(index) {
                return this.texts[index].includes(this.query.trim().toLowerCase());
            },
            get none() {
                return ! this.texts.some((text, index) => this.shows(index));
            },
            {{-- Panah, Home, dan End memindahkan tab aktif (pola Tabs WAI-ARIA). --}}
            onTabKeydown(event) {
                const count = @js(count($categories));
                const target = { ArrowRight: (this.active + 1) % count, ArrowLeft: (this.active - 1 + count) % count, Home: 0, End: count - 1 }[event.key];
                if (target === undefined) return;
                event.preventDefault();
                this.active = target;
                this.$nextTick(() => document.getElementById(@js($id) + '-tab-' + target).focus());
            },
        }"
    @endif
    @if (filled($title)) aria-labelledby="{{ $id }}-title" @endif
    {{ $attributes->merge(['id' => $id])->class([$root]) }}
>
    <div class="{{ $layout['root'] }}">
        <div class="{{ $layout['header'] }}">
            @if (filled($title))
                <h2 id="{{ $id }}-title" class="{{ $titleClass }}">{{ $title }}</h2>
            @endif
            @if (filled($description))
                <p class="{{ $descriptionClass }}">{{ $description }}</p>
            @endif
            @if ($variant === 'split' && $hasContact)
                <div class="{{ $contactClass }}">{{ $contact }}</div>
            @endif
        </div>
        <div class="{{ $body }}">
            @if ($searchable)
                <div class="{{ $search }}">
                    <svg class="{{ $searchIcon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                    <input type="search" autocomplete="off" aria-label="{{ $searchLabel }}" placeholder="{{ $searchLabel }}" x-model="query" class="{{ $searchInput }}" />
                </div>
            @endif
            @if ($categories)
                <div role="tablist" aria-label="{{ $categoriesLabel }}" class="{{ $tablist }}" @keydown="onTabKeydown($event)">
                    @foreach ($categories as $index => $category)
                        <button
                            type="button"
                            role="tab"
                            id="{{ $id }}-tab-{{ $index }}"
                            aria-controls="{{ $id }}-panel-{{ $index }}"
                            aria-selected="{{ $index === 0 ? 'true' : 'false' }}"
                            tabindex="{{ $index === 0 ? '0' : '-1' }}"
                            data-state="{{ $index === 0 ? 'active' : 'inactive' }}"
                            :aria-selected="active === {{ $index }} ? 'true' : 'false'"
                            :tabindex="active === {{ $index }} ? 0 : -1"
                            :data-state="active === {{ $index }} ? 'active' : 'inactive'"
                            @click="active = {{ $index }}"
                            class="{{ $tab }}"
                        >{{ $category }}</button>
                    @endforeach
                </div>
            @endif
            @foreach (array_values($groups) as $groupIndex => $group)
                <div
                    @if ($categories)
                        role="tabpanel"
                        id="{{ $id }}-panel-{{ $groupIndex }}"
                        aria-labelledby="{{ $id }}-tab-{{ $groupIndex }}"
                        @if ($groupIndex !== 0) hidden @endif
                        :hidden="active !== {{ $groupIndex }}"
                    @endif
                    class="{{ $layout['list'] }}"
                >
                    @foreach ($group as $index => $item)
                        <details
                            class="{{ $details }} {{ $layout['item'] }}"
                            @if ($exclusive) name="{{ $id }}-item" @endif
                            @if ($searchable) :hidden="! shows({{ $index }})" @endif
                        >
                            <summary class="{{ $summary }}">
                                <span>{{ $item['question'] }}</span>
                                <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                            </summary>
                            <p class="{{ $answer }}">{{ $item['answer'] }}</p>
                        </details>
                    @endforeach
                </div>
            @endforeach
            @if ($searchable)
                <div role="status" class="{{ $status }}">
                    <template x-if="none"><p class="{{ $empty }}">{{ $emptyLabel }}</p></template>
                </div>
            @endif
        </div>
        @if ($variant !== 'split' && $hasContact)
            <div class="{{ $contactClass }}">{{ $contact }}</div>
        @endif
    </div>
    @if ($schema)
        <script type="application/ld+json">{!! $schemaJson !!}</script>
    @endif
</section>
