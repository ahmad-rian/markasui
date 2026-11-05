@php
    $icons = [
        'home' => 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
        'users' => 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
        'calendar' => 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2',
        'chart' => 'M3 3v18h18M8 17v-5M13 17V8M18 17v-3',
        'folder' => 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z',
        'sliders' => 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
        'message' => 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
        'bell' => 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
        'mail' => 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6',
        'phone' => 'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92',
        'chat' => 'M7.9 20A9 9 0 1 0 4 16.1L2 22z',
        'clock' => 'M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20',
        'back' => 'M19 12H5M12 19l-7-7 7-7',
        'prev' => 'm15 18-6-6 6-6',
        'next' => 'm9 18 6-6-6-6',
        'dots' => 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2',
        'pencil' => 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z',
        'menu' => 'M4 6h16M4 12h16M4 18h16',
        'plus' => 'M12 5v14M5 12h14',
    ];
    $icon = fn (string $name, string $class = 'size-5') => new \Illuminate\Support\HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );

    $topNav = [
        ['id' => 'deals', 'label' => 'Deals'],
        ['id' => 'customers', 'label' => 'Customers'],
        ['id' => 'finance', 'label' => 'Finance'],
        ['id' => 'growth', 'label' => 'Growth'],
        ['id' => 'projects', 'label' => 'Projects'],
    ];
    $railNav = [
        ['id' => 'overview', 'label' => 'Overview', 'icon' => 'home'],
        ['id' => 'contacts', 'label' => 'Contacts', 'icon' => 'users'],
        ['id' => 'calendar', 'label' => 'Calendar', 'icon' => 'calendar'],
        ['id' => 'reports', 'label' => 'Reports', 'icon' => 'chart'],
        ['id' => 'documents', 'label' => 'Documents', 'icon' => 'folder'],
        ['id' => 'settings', 'label' => 'Settings', 'icon' => 'sliders'],
    ];
    $stats = [
        ['label' => 'Deals value this month', 'value' => 'Rp 482.500.000', 'badge' => '+12.4%', 'variant' => 'success'],
        ['label' => 'New customers this week', 'value' => '38', 'badge' => '+6', 'variant' => 'success'],
        ['label' => 'New tasks', 'value' => '14', 'badge' => '5 due today', 'variant' => 'warning'],
    ];
    $deals = [
        ['id' => 'd1', 'date' => '2026-10-28', 'title' => 'Cloud migration package', 'value' => 185000000, 'stage' => 'Negotiation', 'team' => ['Budi Santoso', 'Sari Wulandari', 'Agus Pratama'], 'highlight' => true],
        ['id' => 'd2', 'date' => '2026-10-21', 'title' => 'Annual support renewal', 'value' => 96400000, 'stage' => 'Won', 'team' => ['Dewi Lestari', 'Budi Santoso'], 'highlight' => false],
        ['id' => 'd3', 'date' => '2026-10-14', 'title' => 'Data warehouse audit', 'value' => 42750000, 'stage' => 'Proposal', 'team' => ['Agus Pratama', 'Fajar Nugroho', 'Sari Wulandari'], 'highlight' => false],
        ['id' => 'd4', 'date' => '2026-10-02', 'title' => 'POS terminal rollout', 'value' => 128900000, 'stage' => 'Won', 'team' => ['Fajar Nugroho', 'Dewi Lestari'], 'highlight' => false],
        ['id' => 'd5', 'date' => '2026-09-23', 'title' => 'Security awareness training', 'value' => 18500000, 'stage' => 'Lost', 'team' => ['Sari Wulandari'], 'highlight' => false],
        ['id' => 'd6', 'date' => '2026-09-11', 'title' => 'Fleet tracking pilot', 'value' => 64200000, 'stage' => 'Won', 'team' => ['Budi Santoso', 'Agus Pratama', 'Dewi Lestari'], 'highlight' => false],
    ];
    $sortOptions = [
        ['label' => 'Newest first', 'value' => 'newest'],
        ['label' => 'Oldest first', 'value' => 'oldest'],
        ['label' => 'Highest value', 'value' => 'high'],
        ['label' => 'Lowest value', 'value' => 'low'],
    ];
    $dealMenu = [
        ['label' => 'View details', 'value' => 'view'],
        ['label' => 'Duplicate deal', 'value' => 'duplicate'],
        ['separator' => true],
        ['label' => 'Archive', 'value' => 'archive', 'danger' => true],
    ];
    $dealMenuToasts = ['view' => 'Opening deal details', 'duplicate' => 'Deal duplicated', 'archive' => 'Deal archived'];
    $profileActions = [
        ['id' => 'email', 'label' => 'Send email', 'icon' => 'mail'],
        ['id' => 'call', 'label' => 'Call customer', 'icon' => 'phone'],
        ['id' => 'chat', 'label' => 'Start chat', 'icon' => 'chat'],
        ['id' => 'schedule', 'label' => 'Schedule meeting', 'icon' => 'clock'],
    ];
    $info = [
        'firstName' => 'Rina',
        'lastName' => 'Kusuma',
        'email' => 'rina.kusuma@nusalog.co.id',
        'phone' => '+62 812 3456 7890',
        'source' => 'Referral',
        'lastContacted' => 'Nov 3, 2026',
    ];
    $infoRows = [
        ['key' => 'firstName', 'label' => 'First name'],
        ['key' => 'lastName', 'label' => 'Last name'],
        ['key' => 'email', 'label' => 'Email'],
        ['key' => 'phone', 'label' => 'Phone'],
        ['key' => 'source', 'label' => 'Source'],
        ['key' => 'lastContacted', 'label' => 'Last contacted'],
    ];
    $formFields = [
        ['key' => 'firstName', 'label' => 'First name', 'type' => 'text'],
        ['key' => 'lastName', 'label' => 'Last name', 'type' => 'text'],
        ['key' => 'email', 'label' => 'Email', 'type' => 'email'],
        ['key' => 'phone', 'label' => 'Phone', 'type' => 'tel'],
        ['key' => 'source', 'label' => 'Source', 'type' => 'text'],
    ];
    $tasks = [
        '2026-10-28' => [['time' => '10:00', 'title' => 'Kickoff meeting', 'kind' => 'Meeting']],
        '2026-11-03' => [['time' => '09:30', 'title' => 'Discovery call recap', 'kind' => 'Call']],
        '2026-11-05' => [
            ['time' => '10:00', 'title' => 'Send revised proposal', 'kind' => 'Email'],
            ['time' => '14:30', 'title' => 'Pricing review with finance', 'kind' => 'Meeting'],
        ],
        '2026-11-09' => [['time' => '11:00', 'title' => 'Contract draft review', 'kind' => 'Meeting']],
        '2026-11-12' => [['time' => '15:00', 'title' => 'Quarterly business review', 'kind' => 'Meeting']],
        '2026-11-18' => [['time' => '09:00', 'title' => 'Onsite demo in Surabaya', 'kind' => 'Visit']],
        '2026-11-26' => [['time' => '13:00', 'title' => 'Renewal sign-off', 'kind' => 'Call']],
        '2026-12-02' => [['time' => '10:00', 'title' => 'Implementation planning', 'kind' => 'Meeting']],
    ];
    $today = '2026-11-05';
    $monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    $weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $funnel = [
        'weighted' => [
            'label' => 'Weighted',
            'total' => 'Rp 592.900.000',
            'caption' => 'Weighted pipeline value',
            'steps' => [
                ['label' => 'Qualification', 'value' => 'Rp 312.400.000', 'deals' => 12, 'width' => 100],
                ['label' => 'Proposal sent', 'value' => 'Rp 186.000.000', 'deals' => 7, 'width' => 60],
                ['label' => 'Negotiation', 'value' => 'Rp 94.500.000', 'deals' => 4, 'width' => 30],
            ],
        ],
        'total' => [
            'label' => 'Total',
            'total' => 'Rp 1.069.800.000',
            'caption' => 'Total pipeline value',
            'steps' => [
                ['label' => 'Qualification', 'value' => 'Rp 624.800.000', 'deals' => 12, 'width' => 100],
                ['label' => 'Proposal sent', 'value' => 'Rp 310.000.000', 'deals' => 7, 'width' => 50],
                ['label' => 'Negotiation', 'value' => 'Rp 135.000.000', 'deals' => 4, 'width' => 22],
            ],
        ],
    ];
    $funnelTabs = array_map(fn ($mode) => $mode['label'], $funnel);
    $barTones = ['bg-primary', 'bg-primary/70', 'bg-primary/40'];

    $iconButton = 'relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $pillBase = 'inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $railBase = 'inline-flex size-10 items-center justify-center rounded-xl transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuItemBase = 'flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $dealBase = 'relative flex min-h-48 flex-col gap-3 rounded-2xl border p-4 transition-shadow duration-150';
    $dealHighlight = 'border-ink bg-ink text-canvas';
    $dealNormal = 'border-line bg-surface text-ink hover:border-primary-line';
    $dealMenuClass = 'relative z-10 -mt-1 -mr-1 [&>button]:size-8 [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-0 [&>button]:text-current [&>button]:hover:bg-current/10 [&>button>svg:last-child]:hidden';
    $dayBase = 'relative inline-flex size-10 items-center justify-center rounded-full text-sm tabular-nums transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $classes = [
        'pillActive' => 'bg-primary text-on-primary',
        'pillIdle' => 'text-muted hover:bg-surface hover:text-ink',
        'railActive' => 'bg-primary text-on-primary',
        'railIdle' => 'text-muted hover:bg-subtle hover:text-ink',
        'menuItemActive' => 'bg-primary text-on-primary',
        'menuItemIdle' => 'text-ink hover:bg-subtle',
        'dealSelected' => 'ring-2 ring-primary ring-offset-2 ring-offset-surface',
        'daySelected' => 'bg-primary font-semibold text-on-primary',
        'dayToday' => 'font-semibold text-ink ring-1 ring-primary-line hover:bg-subtle',
        'dayIdle' => 'text-ink hover:bg-subtle',
    ];

    $rupiah = fn (int $value) => 'Rp '.number_format($value, 0, ',', '.');
    $formatDate = function (string $iso) use ($monthNames) {
        [$year, $month, $day] = array_map('intval', explode('-', $iso));

        return substr($monthNames[$month - 1], 0, 3)." {$day}, {$year}";
    };
@endphp

<div
    class="min-h-dvh bg-canvas text-ink"
    x-data="{
        activeTop: 'customers',
        activeRail: 'contacts',
        sort: 'newest',
        selectedDeal: 'd1',
        info: @js($info),
        draft: @js($info),
        view: { year: 2026, month: 10 },
        selectedDate: @js($today),
        today: @js($today),
        deals: @js($deals),
        sortOptions: @js($sortOptions),
        dealMenuToasts: @js($dealMenuToasts),
        tasks: @js($tasks),
        monthNames: @js($monthNames),
        weekdayNames: @js($weekdayNames),
        cls: @js($classes),
        get sortLabel() {
            return this.sortOptions.find((option) => option.value === this.sort)?.label;
        },
        get customerName() {
            return this.info.firstName + ' ' + this.info.lastName;
        },
        {{-- Sel kalender bulan, minggu dimulai Senin. null untuk sel kosong sebelum tanggal 1. --}}
        get cells() {
            const offset = (new Date(this.view.year, this.view.month, 1).getDay() + 6) % 7;
            const days = new Date(this.view.year, this.view.month + 1, 0).getDate();
            return [...Array(offset).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)];
        },
        get selectedTasks() {
            return this.tasks[this.selectedDate] ?? [];
        },
        notify(title, description, variant = 'default') {
            this.$dispatch('markas-toast', { title, description, variant });
        },
        {{-- Urutkan kartu dengan memindahkan elemen DOM, supaya urutan fokus mengikuti urutan tampilan. --}}
        applySort(value) {
            const sorters = {
                newest: (a, b) => b.date.localeCompare(a.date),
                oldest: (a, b) => a.date.localeCompare(b.date),
                high: (a, b) => b.value - a.value,
                low: (a, b) => a.value - b.value,
            };
            this.sort = value;
            const list = this.$refs.deals;
            [...this.deals].sort(sorters[value]).forEach((deal) => list.append(list.querySelector(`[data-deal='${deal.id}']`)));
        },
        dealAction(value, title) {
            this.notify(this.dealMenuToasts[value] ?? value, title);
        },
        shiftMonth(step) {
            const next = new Date(this.view.year, this.view.month + step, 1);
            this.view = { year: next.getFullYear(), month: next.getMonth() };
        },
        dayIso(day) {
            const pad = (value) => String(value).padStart(2, '0');
            return `${this.view.year}-${pad(this.view.month + 1)}-${pad(day)}`;
        },
        dayLabel(day) {
            const count = this.tasks[this.dayIso(day)]?.length ?? 0;
            return `${this.monthNames[this.view.month]} ${day}, ${count} ${count === 1 ? 'task' : 'tasks'}`;
        },
        dayClass(day) {
            const iso = this.dayIso(day);
            if (iso === this.selectedDate) return this.cls.daySelected;
            return iso === this.today ? this.cls.dayToday : this.cls.dayIdle;
        },
        longDate(iso) {
            const [year, month, day] = iso.split('-').map(Number);
            const weekday = this.weekdayNames[new Date(year, month - 1, day).getDay()];
            return `${weekday}, ${this.monthNames[month - 1]} ${day}`;
        },
        onDrawerClose(dialog) {
            if (dialog.returnValue === 'save') {
                this.info = { ...this.draft };
                this.notify('Customer details saved', this.draft.firstName + ' ' + this.draft.lastName, 'success');
            }
            dialog.returnValue = '';
        },
    }"
>
    <header class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 lg:px-6">
        <x-markas.drawer title="Menu" side="left">
            <x-slot:trigger>
                <button type="button" aria-label="Open menu" class="{{ $iconButton }} lg:hidden">{{ $icon('menu') }}</button>
            </x-slot:trigger>
            <form method="dialog" class="grid gap-6">
                <div class="grid gap-1">
                    <p class="px-3 text-xs font-medium text-muted">Pages</p>
                    @foreach ($topNav as $item)
                        <button
                            type="submit"
                            class="{{ $menuItemBase }}"
                            :class="activeTop === @js($item['id']) ? cls.menuItemActive : cls.menuItemIdle"
                            :aria-current="activeTop === @js($item['id']) ? 'page' : null"
                            @click="activeTop = @js($item['id'])"
                        >{{ $item['label'] }}</button>
                    @endforeach
                </div>
                <div class="grid gap-1">
                    <p class="px-3 text-xs font-medium text-muted">Workspace</p>
                    @foreach ($railNav as $item)
                        <button
                            type="submit"
                            class="{{ $menuItemBase }}"
                            :class="activeRail === @js($item['id']) ? cls.menuItemActive : cls.menuItemIdle"
                            :aria-current="activeRail === @js($item['id']) ? 'page' : null"
                            @click="activeRail = @js($item['id'])"
                        >{{ $icon($item['icon']) }}{{ $item['label'] }}</button>
                    @endforeach
                </div>
            </form>
        </x-markas.drawer>
        <div class="flex min-w-0 items-center gap-3">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-on-primary" aria-hidden="true">L</span>
            <div class="min-w-0 leading-tight">
                <p class="flex items-center gap-1.5 text-base font-semibold tracking-tight">Lumen<span class="size-1.5 rounded-full bg-success" aria-hidden="true"></span></p>
                <p class="truncate text-xs text-muted">Sales workspace</p>
            </div>
        </div>
        <nav aria-label="Main" class="mx-auto hidden items-center gap-1 rounded-full border border-line bg-canvas p-1 lg:flex">
            @foreach ($topNav as $item)
                <button
                    type="button"
                    class="{{ $pillBase }}"
                    :class="activeTop === @js($item['id']) ? cls.pillActive : cls.pillIdle"
                    :aria-current="activeTop === @js($item['id']) ? 'page' : null"
                    @click="activeTop = @js($item['id'])"
                >{{ $item['label'] }}</button>
            @endforeach
        </nav>
        <div class="ml-auto flex items-center gap-2 lg:ml-0">
            <x-markas.tooltip content="Messages" side="bottom">
                <button type="button" aria-label="Messages" class="{{ $iconButton }}" @click="notify('No new messages', 'Inbox is up to date')">{{ $icon('message') }}</button>
            </x-markas.tooltip>
            <x-markas.tooltip content="Notifications" side="bottom">
                <button type="button" aria-label="Notifications, 3 unread" class="{{ $iconButton }}" @click="notify('3 unread notifications', 'Rina Kusuma replied to your proposal')">{{ $icon('bell') }}<span class="absolute top-2 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface" aria-hidden="true"></span></button>
            </x-markas.tooltip>
            <x-markas.avatar name="Andi Wijaya" size="md" class="ml-1" />
        </div>
    </header>

    <div class="flex">
        <div class="hidden w-18 shrink-0 border-r border-line bg-surface lg:block">
            <nav aria-label="Workspace" class="sticky top-16 flex h-[calc(100dvh-4rem)] flex-col items-center gap-2 py-4">
                @foreach ($railNav as $item)
                    <x-markas.tooltip :content="$item['label']" class="{{ $item['id'] === 'settings' ? 'mt-auto' : '' }}">
                        <button
                            type="button"
                            aria-label="{{ $item['label'] }}"
                            class="{{ $railBase }}"
                            :class="activeRail === @js($item['id']) ? cls.railActive : cls.railIdle"
                            :aria-current="activeRail === @js($item['id']) ? 'page' : null"
                            @click="activeRail = @js($item['id'])"
                        >{{ $icon($item['icon']) }}</button>
                    </x-markas.tooltip>
                @endforeach
            </nav>
        </div>

        <main class="min-w-0 flex-1 p-4 lg:p-6">
            <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div class="flex items-center gap-3">
                    <x-markas.tooltip content="Back to customers">
                        <button type="button" aria-label="Back to customers" class="{{ $iconButton }}" @click="notify('Back to customer list')">{{ $icon('back') }}</button>
                    </x-markas.tooltip>
                    <div class="min-w-0">
                        <h1 class="text-2xl font-semibold tracking-tight">Customer information</h1>
                        <p class="text-sm text-muted">Customers / <span x-text="customerName">Rina Kusuma</span></p>
                    </div>
                </div>
                <dl class="grid gap-3 sm:grid-cols-3">
                    @foreach ($stats as $stat)
                        <div class="rounded-xl border border-line bg-surface px-4 py-3">
                            <dt class="text-xs text-muted">{{ $stat['label'] }}</dt>
                            <dd class="mt-1 flex flex-wrap items-center gap-2">
                                <span class="text-lg font-semibold tabular-nums tracking-tight">{{ $stat['value'] }}</span>
                                <x-markas.badge :variant="$stat['variant']">{{ $stat['badge'] }}</x-markas.badge>
                            </dd>
                        </div>
                    @endforeach
                </dl>
            </div>

            <div class="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                <div class="flex min-w-0 flex-col gap-6">
                    <x-markas.card aria-labelledby="crm-history-title">
                        <div class="grid gap-4">
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 id="crm-history-title" class="text-base font-semibold">Interaction history</h2>
                                    <p class="text-sm text-muted">6 deals with <span x-text="info.firstName">Rina</span> this quarter</p>
                                </div>
                                <x-markas.dropdown-menu :items="$sortOptions" x-on:markas-select="applySort($event.detail)">
                                    <x-slot:trigger><span class="text-muted">Sort:</span><span x-text="sortLabel">Newest first</span></x-slot:trigger>
                                </x-markas.dropdown-menu>
                            </div>
                            <ul role="list" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" x-ref="deals">
                                @foreach ($deals as $deal)
                                    @php $muted = $deal['highlight'] ? 'text-canvas/75' : 'text-muted'; @endphp
                                    <li
                                        data-deal="{{ $deal['id'] }}"
                                        class="{{ $dealBase }} {{ $deal['highlight'] ? $dealHighlight : $dealNormal }}"
                                        :class="selectedDeal === @js($deal['id']) && cls.dealSelected"
                                    >
                                        <div class="flex items-start justify-between gap-2">
                                            <time datetime="{{ $deal['date'] }}" class="text-xs font-medium {{ $muted }}">{{ $formatDate($deal['date']) }}</time>
                                            <x-markas.dropdown-menu
                                                class="{{ $dealMenuClass }}"
                                                :items="$dealMenu"
                                                x-on:markas-select="dealAction($event.detail, {{ \Illuminate\Support\Js::from($deal['title']) }})"
                                            >
                                                <x-slot:trigger>{{ $icon('dots') }}<span class="sr-only">Actions for {{ $deal['title'] }}</span></x-slot:trigger>
                                            </x-markas.dropdown-menu>
                                        </div>
                                        <h3 class="text-sm leading-snug font-semibold">
                                            <button
                                                type="button"
                                                aria-pressed="{{ $deal['id'] === 'd1' ? 'true' : 'false' }}"
                                                :aria-pressed="selectedDeal === @js($deal['id']) ? 'true' : 'false'"
                                                class="text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
                                                @click="selectedDeal = @js($deal['id'])"
                                            >{{ $deal['title'] }}</button>
                                        </h3>
                                        <p class="mt-auto text-xl font-semibold tabular-nums tracking-tight">{{ $rupiah($deal['value']) }}</p>
                                        <div class="flex items-center justify-between gap-2">
                                            <div class="flex -space-x-1">
                                                @foreach ($deal['team'] as $member)
                                                    <x-markas.avatar :name="$member" size="sm" class="ring-2 {{ $deal['highlight'] ? 'ring-ink' : 'ring-surface' }}" />
                                                @endforeach
                                            </div>
                                            <span class="text-xs font-medium {{ $muted }}">{{ $deal['stage'] }}</span>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </x-markas.card>

                    <x-markas.card aria-labelledby="crm-tasks-title" class="flex-1 content-start">
                        <div class="grid gap-4">
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 id="crm-tasks-title" class="text-base font-semibold">Tasks schedule</h2>
                                    <p class="text-sm text-muted">Follow-ups planned with <span x-text="info.firstName">Rina</span></p>
                                </div>
                                <x-markas.button variant="secondary" size="sm" x-on:click="notify('Task added', longDate(selectedDate), 'success')">
                                    {{ $icon('plus', 'size-4') }}
                                    New task
                                </x-markas.button>
                            </div>
                            <div class="grid gap-6 md:grid-cols-[minmax(0,1fr)_280px]">
                                <div class="grid content-start gap-3">
                                    <div class="flex items-center justify-between gap-2">
                                        <h3 class="text-sm font-semibold" aria-live="polite" x-text="monthNames[view.month] + ' ' + view.year">November 2026</h3>
                                        <div class="flex gap-1">
                                            <button type="button" aria-label="Previous month" class="{{ $iconButton }} size-8" @click="shiftMonth(-1)">{{ $icon('prev', 'size-4') }}</button>
                                            <button type="button" aria-label="Next month" class="{{ $iconButton }} size-8" @click="shiftMonth(1)">{{ $icon('next', 'size-4') }}</button>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-7 gap-y-1 text-center">
                                        @foreach ($weekdays as $weekday)
                                            <span aria-hidden="true" class="py-1 text-xs font-medium text-muted">{{ $weekday }}</span>
                                        @endforeach
                                        <template x-for="(day, index) in cells" :key="view.year + '-' + view.month + '-' + index">
                                            <span :class="day !== null && 'flex justify-center'">
                                                <template x-if="day !== null">
                                                    <button
                                                        type="button"
                                                        class="{{ $dayBase }}"
                                                        :class="dayClass(day)"
                                                        :aria-pressed="dayIso(day) === selectedDate ? 'true' : 'false'"
                                                        :aria-label="dayLabel(day)"
                                                        @click="selectedDate = dayIso(day)"
                                                    >
                                                        <span x-text="day"></span>
                                                        <template x-if="tasks[dayIso(day)]">
                                                            <span
                                                                aria-hidden="true"
                                                                class="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full"
                                                                :class="dayIso(day) === selectedDate ? 'bg-on-primary' : 'bg-success'"
                                                            ></span>
                                                        </template>
                                                    </button>
                                                </template>
                                            </span>
                                        </template>
                                    </div>
                                </div>
                                <div class="grid content-start gap-3 border-line md:border-l md:pl-6">
                                    <h3 class="text-sm font-semibold" x-text="longDate(selectedDate)">Thursday, November 5</h3>
                                    <ul role="list" class="grid gap-2" x-show="selectedTasks.length > 0">
                                        <template x-for="task in selectedTasks" :key="task.time + task.title">
                                            <li class="flex gap-3 rounded-xl border border-line p-3">
                                                <span class="w-12 shrink-0 text-xs font-medium tabular-nums text-muted" x-text="task.time"></span>
                                                <span class="grid gap-0.5">
                                                    <span class="text-sm font-medium" x-text="task.title"></span>
                                                    <span class="text-xs text-muted" x-text="task.kind"></span>
                                                </span>
                                            </li>
                                        </template>
                                    </ul>
                                    <p class="rounded-xl border border-dashed border-line p-4 text-sm text-muted" style="display: none" x-show="selectedTasks.length === 0">No tasks on this day.</p>
                                </div>
                            </div>
                        </div>
                    </x-markas.card>
                </div>

                <div class="flex min-w-0 flex-col gap-6">
                    <x-markas.card aria-labelledby="crm-profile-name">
                        <div class="grid justify-items-center gap-4 text-center">
                            <x-markas.avatar name="Rina Kusuma" size="lg" class="size-16! text-xl!" />
                            <div class="grid gap-1">
                                <h2 id="crm-profile-name" class="text-lg font-semibold" x-text="customerName">Rina Kusuma</h2>
                                <p class="text-sm text-muted">Head of Procurement</p>
                                <p class="flex items-center justify-center gap-2 text-sm font-medium">PT Nusantara Logistik<x-markas.badge variant="success">Key account</x-markas.badge></p>
                            </div>
                            <div class="flex justify-center gap-3">
                                @foreach ($profileActions as $action)
                                    <x-markas.tooltip :content="$action['label']">
                                        <button
                                            type="button"
                                            aria-label="{{ $action['label'] }}"
                                            class="{{ $iconButton }}"
                                            @click="notify(@js($action['label']), customerName + ', PT Nusantara Logistik')"
                                        >{{ $icon($action['icon']) }}</button>
                                    </x-markas.tooltip>
                                @endforeach
                            </div>
                        </div>
                    </x-markas.card>

                    <x-markas.card aria-labelledby="crm-details-title">
                        <div class="grid gap-2">
                            <div class="flex items-center justify-between gap-3">
                                <h2 id="crm-details-title" class="text-base font-semibold">Detailed information</h2>
                                <x-markas.drawer title="Edit customer details" x-on:close="onDrawerClose($event.currentTarget)">
                                    <x-slot:trigger>
                                        <x-markas.button variant="secondary" size="sm" x-on:click="draft = { ...info }">
                                            {{ $icon('pencil', 'size-4') }}
                                            Edit
                                        </x-markas.button>
                                    </x-slot:trigger>
                                    <div class="grid gap-4">
                                        @foreach ($formFields as $field)
                                            <x-markas.input
                                                :label="$field['label']"
                                                :type="$field['type']"
                                                :name="$field['key']"
                                                :value="$info[$field['key']]"
                                                x-model="draft.{{ $field['key'] }}"
                                            />
                                        @endforeach
                                    </div>
                                    <x-slot:footer>
                                        <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
                                        <x-markas.button type="submit" value="save">Save changes</x-markas.button>
                                    </x-slot:footer>
                                </x-markas.drawer>
                            </div>
                            <dl class="divide-y divide-line">
                                @foreach ($infoRows as $row)
                                    <div class="flex items-center justify-between gap-4 py-3">
                                        <dt class="shrink-0 text-muted">{{ $row['label'] }}</dt>
                                        <dd data-field="{{ $row['key'] }}" class="min-w-0 truncate text-right font-medium" x-text="info.{{ $row['key'] }}">{{ $info[$row['key']] }}</dd>
                                    </div>
                                @endforeach
                            </dl>
                        </div>
                    </x-markas.card>

                    <x-markas.card aria-labelledby="crm-funnel-title">
                        <div class="grid gap-4">
                            <div>
                                <h2 id="crm-funnel-title" class="text-base font-semibold">Stage funnel</h2>
                                <p class="text-sm text-muted">Open pipeline by stage</p>
                            </div>
                            <x-markas.tabs :items="$funnelTabs" default-value="weighted">
                                @foreach ($funnel as $mode => $data)
                                    <x-slot :name="$mode">
                                        <div class="grid gap-4">
                                            <div>
                                                <p class="text-2xl font-semibold tabular-nums tracking-tight">{{ $data['total'] }}</p>
                                                <p class="text-xs text-muted">{{ $data['caption'] }}</p>
                                            </div>
                                            <ol class="grid gap-3" aria-label="{{ $data['caption'] }} by stage">
                                                @foreach ($data['steps'] as $index => $step)
                                                    <li class="grid gap-1.5">
                                                        <div class="flex items-baseline justify-between gap-3">
                                                            <span class="font-medium">{{ $step['label'] }}<span class="ml-2 text-xs font-normal text-muted">{{ $step['deals'] }} deals</span></span>
                                                            <span class="font-semibold tabular-nums">{{ $step['value'] }}</span>
                                                        </div>
                                                        <div class="h-6 rounded-md bg-subtle">
                                                            <div class="mx-auto h-6 rounded-md {{ $barTones[$index] }}" style="width: {{ $step['width'] }}%"></div>
                                                        </div>
                                                    </li>
                                                @endforeach
                                            </ol>
                                        </div>
                                    </x-slot>
                                @endforeach
                            </x-markas.tabs>
                        </div>
                    </x-markas.card>
                </div>
            </div>
        </main>
    </div>
    <x-markas.toast />
</div>
