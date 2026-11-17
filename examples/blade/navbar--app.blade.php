@php
    $logo = [
        ['fill' => 'fill-ink/15', 'points' => '354,578 1256,138 1171,430 268,868'],
        ['fill' => 'fill-ink/55', 'points' => '553,443 1455,3 1370,295 467,733'],
        ['fill' => 'fill-success/35', 'points' => '421,762 1325,318 1240,611 336,1050'],
        ['fill' => 'fill-ink/30', 'points' => '265,1073 1169,629 1084,922 180,1362'],
        ['fill' => 'fill-ink/80', 'points' => '93,965 997,521 912,814 8,1253'],
        ['fill' => 'fill-success', 'points' => '347,1135 1251,691 1166,984 262,1424'],
    ];
    $links = [
        ['label' => 'Overview', 'href' => '/overview', 'active' => true],
        ['label' => 'Deployments', 'href' => '/deployments'],
        ['label' => 'Analytics', 'href' => '/analytics'],
        ['label' => 'Settings', 'href' => '/settings'],
    ];
    $path = [
        ['label' => 'Markas', 'href' => '/team'],
        ['label' => 'docs'],
    ];
    $account = [
        ['label' => 'Profile', 'href' => '/profile'],
        ['label' => 'Settings', 'href' => '/settings'],
        ['label' => 'Billing', 'href' => '/billing'],
        ['separator' => true],
        ['label' => 'Sign out', 'value' => 'sign-out', 'danger' => true],
    ];
    $home = 'rounded-md';
    $logoClass = 'size-6';
    $slash = 'hidden size-5 text-line @md:block';
    $crumbs = 'font-normal @max-xs:hidden';
    $bell = 'relative size-9 px-0!';
    $icon = 'size-5';
    $count = 'absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-semibold text-on-primary ring-2 ring-surface';
    $profile = '[&>button]:h-9 [&>button]:gap-1 [&>button]:border-0 [&>button]:px-1';
@endphp

<x-markas.navbar :links="$links">
    <x-slot:brand>
        <a href="/" aria-label="MarkasUI home" class="{{ $home }}">
            <svg class="{{ $logoClass }}" viewBox="0 0 1464 1430" aria-hidden="true">
                @foreach ($logo as $shape)
                    <polygon class="{{ $shape['fill'] }}" points="{{ $shape['points'] }}" />
                @endforeach
            </svg>
        </a>
        <svg class="{{ $slash }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M16 3 8 21" /></svg>
        <x-markas.breadcrumb :items="$path" class="{{ $crumbs }}" />
    </x-slot:brand>
    <x-slot:actions>
        <x-markas.button variant="ghost" aria-label="Notifications, 3 unread" class="{{ $bell }}">
            <svg class="{{ $icon }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
            <span aria-hidden="true" class="{{ $count }}">3</span>
        </x-markas.button>
        <x-markas.dropdown-menu label="Account" :items="$account" class="{{ $profile }}">
            <x-slot:trigger><x-markas.avatar name="Siti Aminah" size="sm" /></x-slot:trigger>
        </x-markas.dropdown-menu>
    </x-slot:actions>
</x-markas.navbar>
