@props([
    'links' => [],
])

@php
    $root = '@container w-full border-b border-line bg-surface';
    $bar = 'flex h-14 items-center gap-4 px-4';
    $brandClass = 'flex shrink-0 items-center gap-2 text-sm font-semibold text-ink';
    $desktopNav = 'hidden items-center gap-1 @3xl:flex';
    $link = 'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:text-ink motion-reduce:transition-none';
    $actionsClass = 'ml-auto flex items-center gap-2';
    $toggle = 'group inline-flex size-9 shrink-0 items-center justify-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none @3xl:hidden';
    $openIcon = 'size-5 group-data-[state=open]:hidden';
    $closeIcon = 'hidden size-5 group-data-[state=open]:block';
    $panel = 'border-t border-line px-4 py-2 @3xl:hidden';
    $panelList = 'grid gap-1';

    $id = $attributes->get('id') ?? 'markas-navbar-'.\Illuminate\Support\Str::random(8);
    $menuId = $id.'-menu';

    // Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#".
    $safeHref = function (string $href): string {
        $value = ltrim(str_replace(["\t", "\n", "\r"], '', $href), "\x00..\x20");
        $hasScheme = preg_match('/^[a-z][a-z0-9+.\-]*:/i', $value) === 1;

        return $hasScheme && preg_match('/^(https?|mailto|tel):/i', $value) !== 1 ? '#' : $href;
    };
@endphp

<header
    x-data="{ open: false }"
    @keydown.escape="if (open) { open = false; $refs.toggle.focus() }"
    {{ $attributes->merge(['id' => $id])->class([$root]) }}
>
    <div class="{{ $bar }}">
        @isset($brand)
            <div class="{{ $brandClass }}">{{ $brand }}</div>
        @endisset
        <nav aria-label="Navigasi utama" class="{{ $desktopNav }}">
            @foreach ($links as $item)
                @php $active = ! empty($item['active']); @endphp
                <a
                    href="{{ $safeHref((string) $item['href']) }}"
                    @if ($active) aria-current="page" @endif
                    data-state="{{ $active ? 'active' : 'inactive' }}"
                    class="{{ $link }}"
                >{{ $item['label'] }}</a>
            @endforeach
        </nav>
        <div class="{{ $actionsClass }}">
            {{ $actions ?? '' }}
            <button
                type="button"
                x-ref="toggle"
                aria-label="Menu"
                aria-expanded="false"
                aria-controls="{{ $menuId }}"
                data-state="closed"
                :aria-expanded="open ? 'true' : 'false'"
                :data-state="open ? 'open' : 'closed'"
                @click="open = ! open"
                class="{{ $toggle }}"
            >
                <svg class="{{ $openIcon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                <svg class="{{ $closeIcon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
        </div>
    </div>
    <div
        id="{{ $menuId }}"
        data-state="closed"
        hidden
        :data-state="open ? 'open' : 'closed'"
        :hidden="! open"
        class="{{ $panel }}"
    >
        <nav aria-label="Navigasi utama seluler" class="{{ $panelList }}">
            @foreach ($links as $item)
                @php $active = ! empty($item['active']); @endphp
                <a
                    href="{{ $safeHref((string) $item['href']) }}"
                    @if ($active) aria-current="page" @endif
                    data-state="{{ $active ? 'active' : 'inactive' }}"
                    class="{{ $link }}"
                >{{ $item['label'] }}</a>
            @endforeach
        </nav>
    </div>
</header>
