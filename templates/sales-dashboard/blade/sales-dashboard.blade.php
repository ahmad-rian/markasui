@php
    $icons = [
        'overview' => 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
        'analytics' => 'M3 20h18M7 16v-5M12 16V7M17 16v-8',
        'customers' => 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21 19v-1a4 4 0 0 0-3-3.9M16 5.1a3 3 0 0 1 0 5.8',
        'integrations' => 'm12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5',
        'messages' => 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z',
        'reviews' => 'm12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z',
        'help' => 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01',
        'logout' => 'M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3M16 16l4-4-4-4M20 12H10',
        'search' => 'm21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z',
        'bell' => 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
        'menu' => 'M4 6h16M4 12h16M4 18h16',
        'download' => 'M12 4v12M7 11l5 5 5-5M5 20h14',
        'filter' => 'M4 6h16M7 12h10M10 18h4',
        'calendar' => 'M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
        'wallet' => 'M19 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v3h-3a2 2 0 0 0 0 4h3v3a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6',
        'bag' => 'M6 7h12l1 13H5L6 7ZM9 7V6a3 3 0 0 1 6 0v1',
        'trend' => 'm3 17 6-6 4 4 8-8M15 7h6v6',
        'percent' => 'M19 5 5 19M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
        'sort' => 'm8 9 4-4 4 4M16 15l-4 4-4-4',
        'asc' => 'm8 14 4-4 4 4',
        'desc' => 'm8 10 4 4 4-4',
    ];
    $navGroups = [
        [
            'label' => 'Main menu',
            'items' => [
                ['value' => 'overview', 'label' => 'Business overview', 'icon' => 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z'],
                ['value' => 'analytics', 'label' => 'Analytics', 'icon' => 'M3 20h18M7 16v-5M12 16V7M17 16v-8'],
                ['value' => 'customers', 'label' => 'Customers', 'icon' => 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21 19v-1a4 4 0 0 0-3-3.9M16 5.1a3 3 0 0 1 0 5.8'],
                ['value' => 'integrations', 'label' => 'Integrations', 'icon' => 'm12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5'],
            ],
        ],
        [
            'label' => 'Settings',
            'items' => [
                ['value' => 'messages', 'label' => 'Messages', 'icon' => 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z'],
                ['value' => 'reviews', 'label' => 'Reviews', 'icon' => 'm12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z'],
            ],
        ],
    ];
    $periodItems = [
        ['label' => 'Weekly', 'value' => 'weekly'],
        ['label' => 'Monthly', 'value' => 'monthly'],
        ['label' => 'Yearly', 'value' => 'yearly'],
    ];
    $statCards = [
        ['key' => 'profit', 'label' => 'Total profit', 'icon' => 'M19 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v3h-3a2 2 0 0 0 0 4h3v3a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6', 'highlight' => true],
        ['key' => 'orders', 'label' => 'Total orders', 'icon' => 'M6 7h12l1 13H5L6 7ZM9 7V6a3 3 0 0 1 6 0v1', 'highlight' => false],
        ['key' => 'organic', 'label' => 'Organic sales', 'icon' => 'm3 17 6-6 4 4 8-8M15 7h6v6', 'highlight' => false],
        ['key' => 'margin', 'label' => 'Gross margin', 'icon' => 'M19 5 5 19M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z', 'highlight' => false],
    ];
    $data = [
        'weekly' => [
            'label' => 'Weekly',
            'subtitle' => 'Here is how your store performed this week.',
            'compare' => 'last week',
            'stats' => [
                'profit' => ['value' => 'Rp 62.4M', 'change' => '+8.1%', 'up' => true, 'previous' => 'Rp 57.7M'],
                'orders' => ['value' => '1,284', 'change' => '+5.1%', 'up' => true, 'previous' => '1,222'],
                'organic' => ['value' => 'Rp 18.9M', 'change' => '-2.6%', 'up' => false, 'previous' => 'Rp 19.4M'],
                'margin' => ['value' => '41.2%', 'change' => '+1.3%', 'up' => true, 'previous' => '39.9%'],
            ],
            'spark' => ['line' => 'M0 32L20 23.4L40 26.6L60 14.8L80 8.3L100 11.5L120 4', 'area' => 'M0 32L20 23.4L40 26.6L60 14.8L80 8.3L100 11.5L120 4L120 40L0 40Z', 'summary' => 'Gross margin trend this week, from 38.6% to 41.2%'],
            'chart' => [
                'caption' => 'Daily profit this week',
                'summary' => 'Daily profit this week, lowest Rp 7.4M on Wed and highest Rp 13.1M on Fri',
                'bars' => [
                    ['label' => 'Mon', 'value' => 'Rp 8.2M', 'short' => '8.2M', 'height' => 63],
                    ['label' => 'Tue', 'value' => 'Rp 9.6M', 'short' => '9.6M', 'height' => 73],
                    ['label' => 'Wed', 'value' => 'Rp 7.4M', 'short' => '7.4M', 'height' => 56],
                    ['label' => 'Thu', 'value' => 'Rp 11.8M', 'short' => '11.8M', 'height' => 90],
                    ['label' => 'Fri', 'value' => 'Rp 13.1M', 'short' => '13.1M', 'height' => 100],
                    ['label' => 'Sat', 'value' => 'Rp 12.3M', 'short' => '12.3M', 'height' => 94],
                ],
            ],
            'activity' => [
                'caption' => 'Order status this week',
                'total' => '1,284',
                'summary' => '1,284 orders this week: 318 on process, 74 canceled, 892 delivered',
                'segments' => [
                    ['label' => 'On process', 'count' => '318', 'share' => 25],
                    ['label' => 'Canceled', 'count' => '74', 'share' => 6],
                    ['label' => 'Delivered', 'count' => '892', 'share' => 69],
                ],
            ],
            'regions' => [
                'caption' => 'Top provinces this week',
                'total' => '1,284',
                'items' => [
                    ['name' => 'DKI Jakarta', 'share' => 31],
                    ['name' => 'Jawa Barat', 'share' => 24],
                    ['name' => 'Jawa Timur', 'share' => 18],
                    ['name' => 'Bali', 'share' => 12],
                    ['name' => 'Sumatera Utara', 'share' => 9],
                ],
            ],
        ],
        'monthly' => [
            'label' => 'Monthly',
            'subtitle' => 'Here is how your store performed this month.',
            'compare' => 'last month',
            'stats' => [
                'profit' => ['value' => 'Rp 248.6M', 'change' => '+12.4%', 'up' => true, 'previous' => 'Rp 221.2M'],
                'orders' => ['value' => '5,312', 'change' => '+9.8%', 'up' => true, 'previous' => '4,838'],
                'organic' => ['value' => 'Rp 76.3M', 'change' => '+4.7%', 'up' => true, 'previous' => 'Rp 72.9M'],
                'margin' => ['value' => '42.8%', 'change' => '-0.9%', 'up' => false, 'previous' => '43.7%'],
            ],
            'spark' => ['line' => 'M0 4L20 7.7L40 20.8L60 11.5L80 24.5L100 32L120 28.3', 'area' => 'M0 4L20 7.7L40 20.8L60 11.5L80 24.5L100 32L120 28.3L120 40L0 40Z', 'summary' => 'Gross margin trend this month, from 44.1% to 42.8%'],
            'chart' => [
                'caption' => 'Monthly profit over the last 6 months',
                'summary' => 'Monthly profit over the last 6 months, rising from Rp 142.8M in Jun to Rp 248.6M in Nov',
                'bars' => [
                    ['label' => 'Jun', 'value' => 'Rp 142.8M', 'short' => '142.8M', 'height' => 57],
                    ['label' => 'Jul', 'value' => 'Rp 176.5M', 'short' => '176.5M', 'height' => 71],
                    ['label' => 'Aug', 'value' => 'Rp 158.2M', 'short' => '158.2M', 'height' => 64],
                    ['label' => 'Sep', 'value' => 'Rp 194.7M', 'short' => '194.7M', 'height' => 78],
                    ['label' => 'Oct', 'value' => 'Rp 221.2M', 'short' => '221.2M', 'height' => 89],
                    ['label' => 'Nov', 'value' => 'Rp 248.6M', 'short' => '248.6M', 'height' => 100],
                ],
            ],
            'activity' => [
                'caption' => 'Order status this month',
                'total' => '5,312',
                'summary' => '5,312 orders this month: 1,186 on process, 302 canceled, 3,824 delivered',
                'segments' => [
                    ['label' => 'On process', 'count' => '1,186', 'share' => 22],
                    ['label' => 'Canceled', 'count' => '302', 'share' => 6],
                    ['label' => 'Delivered', 'count' => '3,824', 'share' => 72],
                ],
            ],
            'regions' => [
                'caption' => 'Top provinces this month',
                'total' => '5,312',
                'items' => [
                    ['name' => 'DKI Jakarta', 'share' => 32],
                    ['name' => 'Jawa Barat', 'share' => 23],
                    ['name' => 'Jawa Timur', 'share' => 19],
                    ['name' => 'Bali', 'share' => 11],
                    ['name' => 'Sumatera Utara', 'share' => 9],
                ],
            ],
        ],
        'yearly' => [
            'label' => 'Yearly',
            'subtitle' => 'Here is how your store performed this year.',
            'compare' => 'last year',
            'stats' => [
                'profit' => ['value' => 'Rp 2.86B', 'change' => '+18.7%', 'up' => true, 'previous' => 'Rp 2.41B'],
                'orders' => ['value' => '61,940', 'change' => '+14.2%', 'up' => true, 'previous' => '54,238'],
                'organic' => ['value' => 'Rp 884.1M', 'change' => '+21.3%', 'up' => true, 'previous' => 'Rp 728.9M'],
                'margin' => ['value' => '41.9%', 'change' => '+2.1%', 'up' => true, 'previous' => '39.8%'],
            ],
            'spark' => ['line' => 'M0 32L20 27.6L40 21.2L60 23.6L80 14.3L100 10.4L120 4', 'area' => 'M0 32L20 27.6L40 21.2L60 23.6L80 14.3L100 10.4L120 4L120 40L0 40Z', 'summary' => 'Gross margin trend this year, from 36.2% to 41.9%'],
            'chart' => [
                'caption' => 'Yearly profit since 2021',
                'summary' => 'Yearly profit since 2021, rising from Rp 1.38B in 2021 to Rp 2.86B in 2026',
                'bars' => [
                    ['label' => '2021', 'value' => 'Rp 1.38B', 'short' => '1.38B', 'height' => 48],
                    ['label' => '2022', 'value' => 'Rp 1.62B', 'short' => '1.62B', 'height' => 57],
                    ['label' => '2023', 'value' => 'Rp 1.94B', 'short' => '1.94B', 'height' => 68],
                    ['label' => '2024', 'value' => 'Rp 2.18B', 'short' => '2.18B', 'height' => 76],
                    ['label' => '2025', 'value' => 'Rp 2.41B', 'short' => '2.41B', 'height' => 84],
                    ['label' => '2026', 'value' => 'Rp 2.86B', 'short' => '2.86B', 'height' => 100],
                ],
            ],
            'activity' => [
                'caption' => 'Order status this year',
                'total' => '61,940',
                'summary' => '61,940 orders this year: 12,388 on process, 3,097 canceled, 46,455 delivered',
                'segments' => [
                    ['label' => 'On process', 'count' => '12,388', 'share' => 20],
                    ['label' => 'Canceled', 'count' => '3,097', 'share' => 5],
                    ['label' => 'Delivered', 'count' => '46,455', 'share' => 75],
                ],
            ],
            'regions' => [
                'caption' => 'Top provinces this year',
                'total' => '61,940',
                'items' => [
                    ['name' => 'DKI Jakarta', 'share' => 30],
                    ['name' => 'Jawa Barat', 'share' => 25],
                    ['name' => 'Jawa Timur', 'share' => 18],
                    ['name' => 'Bali', 'share' => 12],
                    ['name' => 'Sumatera Utara', 'share' => 10],
                ],
            ],
        ],
    ];
    $sellers = [
        ['name' => 'Dewi Lestari', 'product' => 'Wireless Earbuds Pro', 'category' => 'electronics', 'change' => 12.4, 'changeLabel' => '+12.4%', 'total' => 48.2, 'totalLabel' => 'Rp 48.2M'],
        ['name' => 'Budi Santoso', 'product' => 'Batik Shirt Premium', 'category' => 'fashion', 'change' => 8.1, 'changeLabel' => '+8.1%', 'total' => 36.7, 'totalLabel' => 'Rp 36.7M'],
        ['name' => 'Siti Rahmawati', 'product' => 'Ceramic Dinner Set', 'category' => 'home', 'change' => -3.2, 'changeLabel' => '-3.2%', 'total' => 29.4, 'totalLabel' => 'Rp 29.4M'],
        ['name' => 'Agus Wijaya', 'product' => 'Smartwatch Series 5', 'category' => 'electronics', 'change' => 15.6, 'changeLabel' => '+15.6%', 'total' => 27.9, 'totalLabel' => 'Rp 27.9M'],
        ['name' => 'Putri Anggraini', 'product' => 'Vitamin C Serum', 'category' => 'beauty', 'change' => 6.3, 'changeLabel' => '+6.3%', 'total' => 21.5, 'totalLabel' => 'Rp 21.5M'],
        ['name' => 'Rizky Hidayat', 'product' => 'Linen Throw Pillow', 'category' => 'home', 'change' => -1.8, 'changeLabel' => '-1.8%', 'total' => 14.6, 'totalLabel' => 'Rp 14.6M'],
    ];
    $columns = [
        ['key' => 'name', 'label' => 'Seller', 'numeric' => false],
        ['key' => 'product', 'label' => 'Product', 'numeric' => false],
        ['key' => 'change', 'label' => 'Change', 'numeric' => true],
        ['key' => 'total', 'label' => 'Total', 'numeric' => true],
    ];
    $ranges = [
        ['value' => 'last-7', 'label' => 'Last 7 days'],
        ['value' => 'last-30', 'label' => 'Last 30 days'],
        ['value' => 'last-90', 'label' => 'Last 90 days'],
        ['value' => 'ytd', 'label' => 'Year to date'],
    ];
    $categories = [
        ['value' => 'all', 'label' => 'All categories'],
        ['value' => 'electronics', 'label' => 'Electronics'],
        ['value' => 'fashion', 'label' => 'Fashion'],
        ['value' => 'home', 'label' => 'Home and living'],
        ['value' => 'beauty', 'label' => 'Beauty'],
    ];

    $segmentClasses = ['stroke-primary/40', 'stroke-danger', 'stroke-primary'];
    $dotClasses = ['bg-primary/40', 'bg-danger', 'bg-primary'];
    $gaugeArc = 'M20 100A80 80 0 0 1 180 100';
    $barCount = 6;

    $navItem = 'flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $navActive = 'bg-primary-soft text-ink';
    $navIdle = 'text-muted hover:bg-subtle hover:text-ink';
    $iconButton = 'relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $sectionTitle = 'text-base font-semibold text-ink';
    $sectionCaption = 'text-sm text-muted';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $initial = $data['monthly'];
@endphp

<div
    class="min-h-dvh bg-canvas text-ink lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]"
    x-data="{
        data: @js($data),
        sellers: @js($sellers),
        ranges: @js($ranges),
        categories: @js($categories),
        sortIcons: @js(['sort' => $icons['sort'], 'asc' => $icons['asc'], 'desc' => $icons['desc']]),
        active: 'overview',
        period: 'monthly',
        selectedBar: 5,
        query: '',
        sortKey: 'total',
        sortDir: 'desc',
        draftRange: 'last-30',
        draftCategory: 'all',
        appliedRange: 'last-30',
        appliedCategory: 'all',
        current() {
            return this.data[this.period];
        },
        barAt(index) {
            return this.current().chart.bars[index];
        },
        selected() {
            const bars = this.current().chart.bars;
            return bars[this.selectedBar] ?? bars[bars.length - 1];
        },
        labelOf(list, value) {
            return list.find((entry) => entry.value === value)?.label ?? '';
        },
        {{-- Panjang dan posisi tiap segmen gauge pada busur dengan pathLength 100. --}}
        dash(index) {
            const segments = this.current().activity.segments;
            const start = segments.slice(0, index).reduce((sum, s) => sum + s.share, 0);
            const length = Math.max((segments[index]?.share ?? 0) - 1, 0);
            return { dasharray: `${length} 100`, dashoffset: `${-start}` };
        },
        changePeriod(value) {
            if (!(value in this.data)) return;
            this.period = value;
            this.selectedBar = 5;
        },
        matches(index) {
            const seller = this.sellers[index];
            const needle = this.query.trim().toLowerCase();
            const inCategory = this.appliedCategory === 'all' || seller.category === this.appliedCategory;
            return inCategory && (needle === '' || seller.name.toLowerCase().includes(needle) || seller.product.toLowerCase().includes(needle));
        },
        visibleCount() {
            return this.sellers.filter((_, index) => this.matches(index)).length;
        },
        sortBy(key, numeric) {
            if (key === this.sortKey) {
                this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortDir = numeric ? 'desc' : 'asc';
            }
            this.reorder();
        },
        {{-- Baris dirender server, jadi urutannya diubah dengan memindahkan elemen tr. --}}
        reorder() {
            const body = this.$refs.sellers;
            const dir = this.sortDir === 'asc' ? 1 : -1;
            const valueOf = (row) => this.sellers[row.dataset.seller][this.sortKey];
            const compare = (a, b) => {
                const x = valueOf(a);
                const y = valueOf(b);
                return (typeof x === 'number' ? x - y : String(x).localeCompare(String(y))) * dir;
            };
            [...body.querySelectorAll('tr[data-seller]')].sort(compare).forEach((row) => body.appendChild(row));
            body.appendChild(this.$refs.empty);
        },
        ariaSort(key) {
            if (key !== this.sortKey) return null;
            return this.sortDir === 'asc' ? 'ascending' : 'descending';
        },
        sortIcon(key) {
            if (key !== this.sortKey) return this.sortIcons.sort;
            return this.sortDir === 'asc' ? this.sortIcons.asc : this.sortIcons.desc;
        },
        notify(detail) {
            this.$dispatch('markas-toast', detail);
        },
        openFilters() {
            this.draftRange = this.appliedRange;
            this.draftCategory = this.appliedCategory;
        },
        applyFilters() {
            this.appliedRange = this.draftRange;
            this.appliedCategory = this.draftCategory;
            this.notify({ title: 'Filters applied', description: `${this.labelOf(this.ranges, this.draftRange)}, ${this.labelOf(this.categories, this.draftCategory)}` });
        },
        resetFilters() {
            this.draftRange = 'last-30';
            this.draftCategory = 'all';
            this.appliedRange = 'last-30';
            this.appliedCategory = 'all';
            this.notify({ title: 'Filters reset' });
        },
        exportReport() {
            this.notify({ title: 'Report exported', description: `${this.current().label} sales report saved as CSV.`, variant: 'success' });
        },
        showNotifications() {
            this.notify({ title: '3 new notifications', description: 'Dewi Lestari reached Rp 48.2M in sales.' });
        },
        showHelp() {
            this.notify({ title: 'Help center', description: 'Email support@larisa.id or chat with us from 08.00 to 20.00 WIB.' });
        },
        signOut() {
            this.notify({ title: 'Signed out', description: 'This is a demo, your session is still active.' });
        },
    }"
>
    <aside class="sticky top-0 hidden h-dvh flex-col gap-8 border-r border-line bg-surface px-4 py-6 lg:flex">
        <div class="flex items-center gap-2.5 px-3">
            <span class="grid size-8 place-items-center rounded-lg bg-primary text-sm font-semibold text-on-primary" aria-hidden="true">L</span>
            <span class="text-lg font-semibold tracking-tight">Larisa</span>
        </div>
        <nav aria-label="Main navigation" class="grid flex-1 content-start gap-6">
            @foreach ($navGroups as $group)
                <div class="grid gap-2">
                    <p class="px-3 text-xs font-medium text-faint">{{ $group['label'] }}</p>
                    <ul class="grid gap-1">
                        @foreach ($group['items'] as $item)
                            <li>
                                <button
                                    type="button"
                                    class="{{ $navItem }}"
                                    :class="active === '{{ $item['value'] }}' ? '{{ $navActive }}' : '{{ $navIdle }}'"
                                    :aria-current="active === '{{ $item['value'] }}' ? 'page' : null"
                                    @click="active = '{{ $item['value'] }}'"
                                ><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $item['icon'] }}" /></svg>{{ $item['label'] }}</button>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endforeach
        </nav>
        <div class="grid gap-1 border-t border-line pt-4">
            <button type="button" class="{{ $navItem }} {{ $navIdle }}" @click="showHelp()"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['help'] }}" /></svg>Help center</button>
            <button type="button" class="{{ $navItem }} {{ $navIdle }}" @click="signOut()"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['logout'] }}" /></svg>Log out</button>
        </div>
    </aside>

    <div class="flex min-w-0 flex-col">
        <header class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 sm:px-6 lg:px-8">
            <x-markas.drawer title="Menu" side="left">
                <x-slot:trigger>
                    <button type="button" class="{{ $iconButton }} lg:hidden" aria-label="Open menu"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['menu'] }}" /></svg></button>
                </x-slot:trigger>
                <form method="dialog" class="grid gap-6">
                    <nav aria-label="Mobile navigation" class="grid gap-6">
                        @foreach ($navGroups as $group)
                            <div class="grid gap-2">
                                <p class="px-3 text-xs font-medium text-faint">{{ $group['label'] }}</p>
                                <ul class="grid gap-1">
                                    @foreach ($group['items'] as $item)
                                        <li>
                                            <button
                                                type="submit"
                                                class="{{ $navItem }}"
                                                :class="active === '{{ $item['value'] }}' ? '{{ $navActive }}' : '{{ $navIdle }}'"
                                                :aria-current="active === '{{ $item['value'] }}' ? 'page' : null"
                                                @click="active = '{{ $item['value'] }}'"
                                            ><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $item['icon'] }}" /></svg>{{ $item['label'] }}</button>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        @endforeach
                    </nav>
                </form>
            </x-markas.drawer>
            <div class="relative min-w-0 flex-1 sm:max-w-sm">
                <x-markas.input type="search" aria-label="Search sellers" placeholder="Search sellers or products" class="pl-9!" x-model="query" />
                <svg class="pointer-events-none absolute bottom-3 left-3 size-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['search'] }}" /></svg>
            </div>
            <div class="ml-auto flex items-center gap-3">
                <button type="button" class="{{ $iconButton }}" aria-label="Notifications, 3 unread" @click="showNotifications()">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['bell'] }}" /></svg>
                    <span class="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full border-2 border-surface bg-danger text-[10px] font-semibold text-on-primary" aria-hidden="true">3</span>
                </button>
                <span class="hidden h-8 w-px bg-line sm:block" aria-hidden="true"></span>
                <div class="flex items-center gap-3">
                    <x-markas.avatar name="Rizky Pratama" />
                    <div class="hidden leading-tight md:grid">
                        <span class="text-sm font-medium text-ink">Rizky Pratama</span>
                        <span class="text-xs text-muted">rizky@larisa.id</span>
                    </div>
                </div>
            </div>
        </header>

        <main class="grid min-w-0 gap-6 p-4 sm:p-6 lg:p-8">
            <div class="flex flex-wrap items-end justify-between gap-4">
                <div class="grid gap-1">
                    <h1 class="text-2xl font-semibold tracking-tight text-ink">Dashboard</h1>
                    <p class="text-sm text-muted" x-text="current().subtitle">{{ $initial['subtitle'] }}</p>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <x-markas.dropdown-menu :items="$periodItems" x-on:markas-select="changePeriod($event.detail)">
                        <x-slot:trigger>
                            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['calendar'] }}" /></svg>
                            <span class="sr-only">Period: </span>
                            <span x-text="current().label">{{ $initial['label'] }}</span>
                        </x-slot:trigger>
                    </x-markas.dropdown-menu>
                    <x-markas.drawer title="Filter report">
                        <x-slot:trigger>
                            <x-markas.button variant="secondary" x-on:click="openFilters()">
                                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['filter'] }}" /></svg>
                                Filter
                            </x-markas.button>
                        </x-slot:trigger>
                        <div class="grid gap-5">
                            <p>Narrow down the best sellers table by date range and product category.</p>
                            <x-markas.select label="Date range" x-model="draftRange">
                                @foreach ($ranges as $range)
                                    <option value="{{ $range['value'] }}" @selected($range['value'] === 'last-30')>{{ $range['label'] }}</option>
                                @endforeach
                            </x-markas.select>
                            <x-markas.select label="Category" x-model="draftCategory">
                                @foreach ($categories as $category)
                                    <option value="{{ $category['value'] }}" @selected($category['value'] === 'all')>{{ $category['label'] }}</option>
                                @endforeach
                            </x-markas.select>
                        </div>
                        <x-slot:footer>
                            <x-markas.button variant="secondary" type="submit" value="reset" x-on:click="resetFilters()">Reset</x-markas.button>
                            <x-markas.button type="submit" value="apply" x-on:click="applyFilters()">Apply filters</x-markas.button>
                        </x-slot:footer>
                    </x-markas.drawer>
                    <x-markas.button x-on:click="exportReport()">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons['download'] }}" /></svg>
                        Export
                    </x-markas.button>
                </div>
            </div>

            <section aria-labelledby="metrics-title">
                <h2 id="metrics-title" class="sr-only">Key metrics</h2>
                <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    @foreach ($statCards as $card)
                        @php
                            $stat = "current().stats.{$card['key']}";
                            $highlight = $card['highlight'];
                        @endphp
                        <article class="grid gap-4 rounded-xl border p-5 {{ $highlight ? 'border-primary bg-primary text-on-primary' : 'border-line bg-surface text-ink' }}">
                            <div class="flex items-center justify-between gap-3">
                                <h3 class="text-sm font-medium {{ $highlight ? 'text-on-primary/75' : 'text-muted' }}">{{ $card['label'] }}</h3>
                                <span class="grid size-9 place-items-center rounded-lg {{ $highlight ? 'bg-on-primary/10' : 'bg-subtle' }}"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $card['icon'] }}" /></svg></span>
                            </div>
                            <div class="flex items-end justify-between gap-3">
                                <p class="text-2xl font-semibold tracking-tight tabular-nums" x-text="{{ $stat }}.value">{{ $initial['stats'][$card['key']]['value'] }}</p>
                                @if ($card['key'] === 'margin')
                                    <svg class="h-10 w-24 shrink-0 text-primary" viewBox="0 0 120 40" preserveAspectRatio="none" role="img" aria-label="{{ $initial['spark']['summary'] }}" :aria-label="current().spark.summary">
                                        <path d="{{ $initial['spark']['area'] }}" :d="current().spark.area" class="fill-primary/10" />
                                        <path d="{{ $initial['spark']['line'] }}" :d="current().spark.line" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                                    </svg>
                                @endif
                            </div>
                            <div class="flex flex-wrap items-center gap-2 text-xs">
                                <span class="inline-flex rounded-full bg-surface">
                                    <x-markas.badge variant="success" :dot="false" x-show="{{ $stat }}.up"><span x-text="{{ $stat }}.change"></span></x-markas.badge>
                                    <x-markas.badge variant="danger" :dot="false" x-show="! {{ $stat }}.up"><span x-text="{{ $stat }}.change"></span></x-markas.badge>
                                </span>
                                <span class="{{ $highlight ? 'text-on-primary/75' : 'text-muted' }}" x-text="`vs ${ {{ $stat }}.previous } ${current().compare}`"></span>
                            </div>
                        </article>
                    @endforeach
                </div>
            </section>

            <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
                <x-markas.card aria-labelledby="report-title">
                    <div class="grid gap-6">
                        <div class="flex flex-wrap items-start justify-between gap-4">
                            <div class="grid gap-1">
                                <h2 id="report-title" class="{{ $sectionTitle }}">Sales report</h2>
                                <p class="{{ $sectionCaption }}" x-text="current().chart.caption"></p>
                            </div>
                            <div class="grid justify-items-end gap-0.5 text-right" aria-live="polite">
                                <p class="text-xs text-muted" x-text="selected().label"></p>
                                <p class="text-lg font-semibold tabular-nums" x-text="selected().value"></p>
                            </div>
                        </div>
                        <div class="relative">
                            <div class="pointer-events-none absolute inset-x-0 top-12 bottom-6 flex flex-col justify-between" aria-hidden="true">
                                <span class="border-t border-dashed border-line"></span>
                                <span class="border-t border-dashed border-line"></span>
                                <span class="border-t border-dashed border-line"></span>
                                <span class="border-t border-line"></span>
                            </div>
                            <div role="group" :aria-label="current().chart.summary" class="relative grid grid-cols-6 gap-3 sm:gap-5">
                                @for ($i = 0; $i < $barCount; $i++)
                                    <button
                                        type="button"
                                        class="group flex h-64 min-w-0 flex-col items-center justify-end gap-2 rounded-md {{ $focusRing }}"
                                        :aria-pressed="selectedBar === {{ $i }} ? 'true' : 'false'"
                                        @click="selectedBar = {{ $i }}"
                                    >
                                        <span class="text-xs tabular-nums" :class="selectedBar === {{ $i }} ? 'font-semibold text-ink' : 'hidden text-muted sm:block'" x-text="barAt({{ $i }}).short"></span>
                                        <span
                                            class="w-full max-w-14 rounded-t-md transition-colors duration-150 ease-out motion-reduce:transition-none"
                                            :class="selectedBar === {{ $i }} ? 'bg-primary' : 'bg-primary/15 group-hover:bg-primary/25'"
                                            :style="`height: ${(barAt({{ $i }}).height * 184) / 100}px`"
                                        ></span>
                                        <span class="text-xs" :class="selectedBar === {{ $i }} ? 'font-medium text-ink' : 'text-muted'" x-text="barAt({{ $i }}).label"></span>
                                    </button>
                                @endfor
                            </div>
                        </div>
                    </div>
                </x-markas.card>

                <x-markas.card aria-labelledby="activity-title">
                    <div class="grid gap-6">
                        <div class="grid gap-1">
                            <h2 id="activity-title" class="{{ $sectionTitle }}">Sales activity</h2>
                            <p class="{{ $sectionCaption }}" x-text="current().activity.caption"></p>
                        </div>
                        <div class="relative mx-auto w-full max-w-72">
                            <svg viewBox="0 0 200 110" class="w-full" role="img" aria-label="{{ $initial['activity']['summary'] }}" :aria-label="current().activity.summary">
                                <path d="{{ $gaugeArc }}" pathLength="100" fill="none" stroke-width="20" class="stroke-subtle" />
                                @foreach ($segmentClasses as $index => $segmentClass)
                                    <path d="{{ $gaugeArc }}" pathLength="100" fill="none" stroke-width="20" :stroke-dasharray="dash({{ $index }}).dasharray" :stroke-dashoffset="dash({{ $index }}).dashoffset" class="{{ $segmentClass }}" />
                                @endforeach
                            </svg>
                            <div class="absolute inset-x-0 bottom-0 grid justify-items-center gap-0.5">
                                <p class="text-2xl font-semibold tracking-tight tabular-nums" x-text="current().activity.total"></p>
                                <p class="text-xs text-muted">Total orders</p>
                            </div>
                        </div>
                        <ul class="grid gap-3">
                            @foreach ($dotClasses as $index => $dotClass)
                                @php($segment = "current().activity.segments[{$index}]")
                                <li class="flex items-center justify-between gap-3">
                                    <span class="flex items-center gap-2">
                                        <span class="size-2.5 rounded-full {{ $dotClass }}" aria-hidden="true"></span>
                                        <span x-text="{{ $segment }}.label"></span>
                                    </span>
                                    <span class="flex items-center gap-2 tabular-nums">
                                        <span class="font-medium text-ink" x-text="{{ $segment }}.count"></span>
                                        <span class="w-10 text-right text-muted" x-text="`${ {{ $segment }}.share }%`"></span>
                                    </span>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </x-markas.card>
            </div>

            <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
                <x-markas.card aria-labelledby="sellers-title" class="min-w-0">
                    <div class="grid gap-5">
                        <div class="grid gap-1">
                            <h2 id="sellers-title" class="{{ $sectionTitle }}">Best sellers</h2>
                            <p class="{{ $sectionCaption }}" x-text="`${labelOf(ranges, appliedRange)}, ${labelOf(categories, appliedCategory)}`"></p>
                        </div>
                        <div role="region" aria-label="Best sellers" tabindex="0" class="overflow-x-auto rounded-lg border border-line {{ $focusRing }}">
                            <table class="w-full border-collapse text-sm">
                                <thead>
                                    <tr class="bg-subtle text-left text-muted">
                                        @foreach ($columns as $column)
                                            <th scope="col" class="px-4 py-2.5 font-medium whitespace-nowrap {{ $column['numeric'] ? 'text-right' : 'text-left' }}" :aria-sort="ariaSort('{{ $column['key'] }}')">
                                                <button
                                                    type="button"
                                                    class="inline-flex items-center gap-1 rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none {{ $focusRing }}"
                                                    :class="sortKey === '{{ $column['key'] }}' && 'text-ink'"
                                                    @click="sortBy('{{ $column['key'] }}', {{ $column['numeric'] ? 'true' : 'false' }})"
                                                >{{ $column['label'] }}<svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="sortIcon('{{ $column['key'] }}')" /></svg></button>
                                            </th>
                                        @endforeach
                                    </tr>
                                </thead>
                                <tbody x-ref="sellers">
                                    @foreach ($sellers as $index => $seller)
                                        <tr data-seller="{{ $index }}" x-show="matches({{ $index }})" class="border-t border-line transition-colors duration-150 ease-out hover:bg-subtle/50 motion-reduce:transition-none">
                                            <td class="px-4 py-3">
                                                <div class="flex items-center gap-3">
                                                    <x-markas.avatar :name="$seller['name']" size="sm" />
                                                    <span class="font-medium whitespace-nowrap text-ink">{{ $seller['name'] }}</span>
                                                </div>
                                            </td>
                                            <td class="px-4 py-3">
                                                <div class="grid">
                                                    <span class="whitespace-nowrap text-ink">{{ $seller['product'] }}</span>
                                                    <span class="text-xs text-muted">{{ collect($categories)->firstWhere('value', $seller['category'])['label'] }}</span>
                                                </div>
                                            </td>
                                            <td class="px-4 py-3 text-right">
                                                <x-markas.badge :variant="$seller['change'] >= 0 ? 'success' : 'danger'" :dot="false"><span>{{ $seller['changeLabel'] }}</span></x-markas.badge>
                                            </td>
                                            <td class="px-4 py-3 text-right font-medium whitespace-nowrap text-ink tabular-nums">{{ $seller['totalLabel'] }}</td>
                                        </tr>
                                    @endforeach
                                    <tr x-ref="empty" x-show="visibleCount() === 0" style="display: none" class="border-t border-line">
                                        <td colspan="4" class="px-4 py-8 text-center text-muted">No sellers match your filters.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </x-markas.card>

                <x-markas.card aria-labelledby="regions-title">
                    <div class="grid gap-5">
                        <div class="grid gap-1">
                            <h2 id="regions-title" class="{{ $sectionTitle }}">Orders by region</h2>
                            <p class="{{ $sectionCaption }}" x-text="current().regions.caption"></p>
                        </div>
                        <div class="flex items-baseline gap-2">
                            <p class="text-3xl font-semibold tracking-tight tabular-nums" x-text="current().regions.total"></p>
                            <p class="text-sm text-muted">orders from 34 provinces</p>
                        </div>
                        <ul class="grid gap-4">
                            @foreach ($initial['regions']['items'] as $index => $region)
                                @php($item = "current().regions.items[{$index}]")
                                <li class="grid gap-2">
                                    <div class="flex items-center justify-between gap-3">
                                        <span class="font-medium text-ink" x-text="{{ $item }}.name">{{ $region['name'] }}</span>
                                        <span class="text-muted tabular-nums" x-text="`${ {{ $item }}.share }%`"></span>
                                    </div>
                                    <x-markas.progress :value="$region['share']" aria-label="{{ $region['name'] }} share of orders" x-bind:value="{{ $item }}.share" x-bind:aria-label="`${ {{ $item }}.name } share of orders`" class="h-1.5!" />
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </x-markas.card>
            </div>
        </main>
    </div>
    <x-markas.toast />
</div>
