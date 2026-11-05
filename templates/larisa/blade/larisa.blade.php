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
        'send' => 'm4 12 16-8-6 16-2.5-6.5L4 12Z',
    ];
    $navGroups = [
        ['label' => 'Main menu', 'items' => [['overview', 'Business overview'], ['analytics', 'Analytics'], ['customers', 'Customers'], ['integrations', 'Integrations']]],
        ['label' => 'Settings', 'items' => [['messages', 'Messages'], ['reviews', 'Reviews']]],
    ];
    $pageTitles = ['overview' => 'Business overview', 'analytics' => 'Analytics', 'customers' => 'Customers', 'integrations' => 'Integrations', 'messages' => 'Messages', 'reviews' => 'Reviews', 'help' => 'Help center'];
    $pageSubtitles = [
        'overview' => '',
        'analytics' => 'Traffic, conversion and revenue trends for your store.',
        'customers' => 'Everyone who bought from your store, grouped by segment.',
        'integrations' => 'Connect payment, shipping and marketing tools.',
        'messages' => 'Answer buyers quickly to keep your response rate high.',
        'reviews' => 'See what buyers say about your products and reply.',
        'help' => 'Answers to common questions about selling on Larisa.',
    ];
    $periodItems = [['label' => 'Weekly', 'value' => 'weekly'], ['label' => 'Monthly', 'value' => 'monthly'], ['label' => 'Yearly', 'value' => 'yearly']];
    $statCards = [['Total profit', 'wallet'], ['Total orders', 'bag'], ['Organic sales', 'trend'], ['Gross margin', 'percent']];
    $data = [
        'weekly' => [
            'label' => 'Weekly', 'unit' => 'week',
            'stats' => [['Rp 62.4M', '+8.1%', 'Rp 57.7M'], ['1,284', '+5.1%', '1,222'], ['Rp 18.9M', '-2.6%', 'Rp 19.4M'], ['41.2%', '+1.3%', '39.9%']],
            'spark' => 'M0 32L20 23.4L40 26.6L60 14.8L80 8.3L100 11.5L120 4',
            'sparkSummary' => 'Gross margin trend this week, from 38.6% to 41.2%',
            'chart' => 'Daily profit this week',
            'chartSummary' => 'Daily profit this week, lowest Rp 7.4M on Wed and highest Rp 13.1M on Fri',
            'bars' => [['Mon', '8.2M', 63], ['Tue', '9.6M', 73], ['Wed', '7.4M', 56], ['Thu', '11.8M', 90], ['Fri', '13.1M', 100], ['Sat', '12.3M', 94]],
            'segments' => [['318', 25], ['74', 6], ['892', 69]],
            'regions' => [31, 24, 18, 12, 9],
        ],
        'monthly' => [
            'label' => 'Monthly', 'unit' => 'month',
            'stats' => [['Rp 248.6M', '+12.4%', 'Rp 221.2M'], ['5,312', '+9.8%', '4,838'], ['Rp 76.3M', '+4.7%', 'Rp 72.9M'], ['42.8%', '-0.9%', '43.7%']],
            'spark' => 'M0 4L20 7.7L40 20.8L60 11.5L80 24.5L100 32L120 28.3',
            'sparkSummary' => 'Gross margin trend this month, from 44.1% to 42.8%',
            'chart' => 'Monthly profit over the last 6 months',
            'chartSummary' => 'Monthly profit over the last 6 months, rising from Rp 142.8M in Jun to Rp 248.6M in Nov',
            'bars' => [['Jun', '142.8M', 57], ['Jul', '176.5M', 71], ['Aug', '158.2M', 64], ['Sep', '194.7M', 78], ['Oct', '221.2M', 89], ['Nov', '248.6M', 100]],
            'segments' => [['1,186', 22], ['302', 6], ['3,824', 72]],
            'regions' => [32, 23, 19, 11, 9],
        ],
        'yearly' => [
            'label' => 'Yearly', 'unit' => 'year',
            'stats' => [['Rp 2.86B', '+18.7%', 'Rp 2.41B'], ['61,940', '+14.2%', '54,238'], ['Rp 884.1M', '+21.3%', 'Rp 728.9M'], ['41.9%', '+2.1%', '39.8%']],
            'spark' => 'M0 32L20 27.6L40 21.2L60 23.6L80 14.3L100 10.4L120 4',
            'sparkSummary' => 'Gross margin trend this year, from 36.2% to 41.9%',
            'chart' => 'Yearly profit since 2021',
            'chartSummary' => 'Yearly profit since 2021, rising from Rp 1.38B in 2021 to Rp 2.86B in 2026',
            'bars' => [['2021', '1.38B', 48], ['2022', '1.62B', 57], ['2023', '1.94B', 68], ['2024', '2.18B', 76], ['2025', '2.41B', 84], ['2026', '2.86B', 100]],
            'segments' => [['12,388', 20], ['3,097', 5], ['46,455', 75]],
            'regions' => [30, 25, 18, 12, 10],
        ],
    ];
    $segmentLabels = ['On process', 'Canceled', 'Delivered'];
    $provinces = ['DKI Jakarta', 'Jawa Barat', 'Jawa Timur', 'Bali', 'Sumatera Utara'];
    $sellers = array_map(fn ($s) => ['name' => $s[0], 'product' => $s[1], 'category' => $s[2], 'change' => $s[3], 'total' => $s[4]], [
        ['Dewi Lestari', 'Wireless Earbuds Pro', 'electronics', 12.4, 48.2],
        ['Budi Santoso', 'Batik Shirt Premium', 'fashion', 8.1, 36.7],
        ['Siti Rahmawati', 'Ceramic Dinner Set', 'home', -3.2, 29.4],
        ['Agus Wijaya', 'Smartwatch Series 5', 'electronics', 15.6, 27.9],
        ['Putri Anggraini', 'Vitamin C Serum', 'beauty', 6.3, 21.5],
        ['Rizky Hidayat', 'Linen Throw Pillow', 'home', -1.8, 14.6],
    ]);
    $columns = [['name', 'Seller', false], ['product', 'Product', false], ['change', 'Change', true], ['total', 'Total', true]];
    $ranges = [['value' => 'last-7', 'label' => 'Last 7 days'], ['value' => 'last-30', 'label' => 'Last 30 days'], ['value' => 'last-90', 'label' => 'Last 90 days'], ['value' => 'ytd', 'label' => 'Year to date']];
    $categories = [['value' => 'all', 'label' => 'All categories'], ['value' => 'electronics', 'label' => 'Electronics'], ['value' => 'fashion', 'label' => 'Fashion'], ['value' => 'home', 'label' => 'Home and living'], ['value' => 'beauty', 'label' => 'Beauty']];

    $trafficRanges = [['value' => '7d', 'label' => '7 days'], ['value' => '30d', 'label' => '30 days'], ['value' => '12m', 'label' => '12 months']];
    $kpiLabels = ['Visitors', 'Conversion rate', 'Avg. order value', 'Returning buyers'];
    $funnelSteps = ['Store visits', 'Product views', 'Added to cart', 'Purchased'];
    $channelNames = ['Organic search', 'Social media', 'Direct', 'Email'];
    $channelClasses = ['bg-primary', 'bg-primary/60', 'bg-primary/30', 'bg-faint'];
    $traffic = [
        '7d' => [
            'caption' => 'Revenue in the last 7 days', 'total' => 'Rp 151.5M',
            'summary' => 'Revenue in the last 7 days, climbing steadily to its peak today',
            'kpis' => ['37,760', '3.4%', 'Rp 118K', '28%'], 'changes' => ['+6.2%', '+0.3%', '-1.8%', '+2.1%'],
            'points' => [30, 38, 34, 46, 52, 48, 60, 66, 58, 72, 80, 76], 'axis' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            'funnel' => [37760, 15480, 3890, 1284], 'channels' => [42, 27, 19, 12],
        ],
        '30d' => [
            'caption' => 'Revenue in the last 30 days', 'total' => 'Rp 580.8M',
            'summary' => 'Revenue in the last 30 days, with a dip mid month and a high now',
            'kpis' => ['152,400', '3.5%', 'Rp 109K', '31%'], 'changes' => ['+9.4%', '+0.2%', '-0.6%', '+1.4%'],
            'points' => [40, 44, 38, 50, 47, 55, 62, 58, 66, 70, 64, 78], 'axis' => ['Oct 7', 'Oct 14', 'Oct 21', 'Oct 28', 'Nov 4'],
            'funnel' => [152400, 61900, 15720, 5312], 'channels' => [44, 25, 18, 13],
        ],
        '12m' => [
            'caption' => 'Revenue in the last 12 months', 'total' => 'Rp 6.83B',
            'summary' => 'Revenue in the last 12 months, almost four times higher by Nov',
            'kpis' => ['1.68M', '3.7%', 'Rp 110K', '34%'], 'changes' => ['+22.8%', '+0.4%', '+3.9%', '+5.2%'],
            'points' => [22, 28, 35, 31, 42, 48, 45, 56, 63, 60, 72, 84], 'axis' => ['Dec', 'Feb', 'Apr', 'Jun', 'Aug', 'Oct'],
            'funnel' => [1684000, 702300, 181500, 61940], 'channels' => [47, 22, 19, 12],
        ],
    ];

    $segments = [['value' => 'all', 'label' => 'All'], ['value' => 'vip', 'label' => 'VIP'], ['value' => 'regular', 'label' => 'Regular'], ['value' => 'new', 'label' => 'New'], ['value' => 'risk', 'label' => 'At risk']];
    $segmentBadges = ['vip' => 'primary', 'regular' => 'neutral', 'new' => 'success', 'risk' => 'warning'];
    $customers = array_map(fn ($c) => [
        'name' => $c[0], 'city' => $c[1], 'segment' => $c[2], 'orders' => $c[3], 'spent' => $c[4], 'since' => $c[5], 'last' => $c[6],
        'email' => strtolower(preg_replace('/ /', '.', $c[0], 1)).'@mail.id',
    ], [
        ['Dewi Lestari', 'Bandung', 'vip', 42, 'Rp 18.4M', 'Mar 2022', '3 Nov'],
        ['Hendra Gunawan', 'Surabaya', 'regular', 17, 'Rp 6.2M', 'Jan 2023', '28 Oct'],
        ['Ayu Kartika', 'Denpasar', 'new', 2, 'Rp 840K', 'Oct 2026', '1 Nov'],
        ['Fajar Nugroho', 'Yogyakarta', 'risk', 9, 'Rp 3.1M', 'Jun 2023', '14 Jul'],
        ['Maya Sari', 'Jakarta', 'vip', 36, 'Rp 15.7M', 'Aug 2021', '4 Nov'],
        ['Yoga Pratama', 'Semarang', 'risk', 6, 'Rp 2.4M', 'Sep 2023', '30 Jun'],
    ]);

    $integrationCategories = [['value' => 'all', 'label' => 'All'], ['value' => 'payments', 'label' => 'Payments'], ['value' => 'shipping', 'label' => 'Shipping'], ['value' => 'marketing', 'label' => 'Marketing'], ['value' => 'analytics', 'label' => 'Analytics']];
    $integrations = [
        ['Bayarin', 'payments', 'Accept cards, e-wallets and virtual accounts.'],
        ['QRIS Kasir', 'payments', 'Take QRIS payments online and in store.'],
        ['Kirimaja', 'shipping', 'Compare courier rates and print labels.'],
        ['Gudangku', 'shipping', 'Sync stock with your warehouse every hour.'],
        ['Sebar Mail', 'marketing', 'Send abandoned cart and win back emails.'],
        ['Chatku', 'marketing', 'Answer WhatsApp orders from your inbox.'],
        ['Metrik', 'analytics', 'Track visits, funnels and campaign revenue.'],
        ['Bukukas', 'analytics', 'Send daily sales to your accounting ledger.'],
    ];

    $conversations = [
        ['id' => 'dewi', 'name' => 'Dewi Lestari', 'topic' => 'Order #LR-2841', 'unread' => 2],
        ['id' => 'hendra', 'name' => 'Hendra Gunawan', 'topic' => 'Return request', 'unread' => 1],
        ['id' => 'ayu', 'name' => 'Ayu Kartika', 'topic' => 'Product question', 'unread' => 0],
        ['id' => 'maya', 'name' => 'Maya Sari', 'topic' => 'Bulk order', 'unread' => 0],
        ['id' => 'rudi', 'name' => 'Rudi Hartono', 'topic' => 'Payment', 'unread' => 0],
    ];
    $message = fn ($from, $text, $time) => ['from' => $from, 'text' => $text, 'time' => $time];
    $threads = [
        'dewi' => [$message('them', 'Hi, has my order shipped yet?', '09.30'), $message('me', 'Hi Dewi, it left our warehouse today.', '09.36'), $message('them', 'Great, can I get the tracking number?', '09.42')],
        'hendra' => [$message('them', 'The batik shirt is too small. Can I swap it for L?', '08.15')],
        'ayu' => [$message('them', 'Is the ceramic set microwave safe?', 'Yesterday'), $message('me', 'Yes, every piece is microwave and dishwasher safe.', 'Yesterday')],
        'maya' => [$message('them', 'I need 40 serums for my salon. Any discount?', 'Mon'), $message('me', 'We can offer 12% off orders above 30 units.', 'Mon')],
        'rudi' => [$message('them', 'I paid by transfer but the order still says unpaid.', 'Sun')],
    ];

    $starFilters = [['value' => 'all', 'label' => 'All'], ['value' => '5', 'label' => '5 stars'], ['value' => '4', 'label' => '4 stars'], ['value' => 'low', 'label' => '3 or less']];
    $ratingBreakdown = [['5 stars', '842', 67], ['4 stars', '268', 22], ['3 stars', '84', 7], ['2 stars', '31', 2], ['1 star', '23', 2]];
    $reviews = array_map(fn ($r) => ['name' => $r[0], 'product' => $r[1], 'rating' => $r[2], 'date' => $r[3], 'text' => $r[4]], [
        ['Maya Sari', 'Vitamin C Serum', 5, '2 days ago', 'My skin looks brighter after two weeks. Fast delivery to Jakarta too.'],
        ['Hendra Gunawan', 'Batik Shirt Premium', 4, '4 days ago', 'The fabric feels premium and the colors are rich. Runs a little small.'],
        ['Ayu Kartika', 'Ceramic Dinner Set', 5, '1 week ago', 'Arrived well packed without a single chip. Looks lovely on our table.'],
        ['Fajar Nugroho', 'Smartwatch Series 5', 3, '1 week ago', 'Battery life is good, but the strap broke after a month.'],
        ['Yoga Pratama', 'Wireless Earbuds Pro', 2, '3 weeks ago', 'The left earbud keeps disconnecting. Support was helpful though.'],
    ]);
    $faqs = [
        ['payout', 'When do I receive my payouts?', 'Sales are paid out every Monday and Thursday. Transfers usually reach your bank within one business day.'],
        ['couriers', 'How do I change my shipping couriers?', 'Open Integrations, turn on Kirimaja, then choose the couriers you want to offer at checkout.'],
        ['refunds', 'How do refunds work?', 'Approve the return from the order page. The buyer gets their money back within three business days.'],
        ['fees', 'What fees does Larisa charge?', 'We charge 2.5% per completed order. There are no monthly fees or setup costs.'],
        ['stock', 'Can I sync stock across channels?', 'Yes. Turn on Gudangku to keep stock levels in sync every hour across all your channels.'],
        ['team', 'How do I invite my team?', 'Send an invite by email from your account settings and choose what each member can access.'],
    ];

    $segmentClasses = ['stroke-primary/40', 'stroke-danger', 'stroke-primary'];
    $dotClasses = ['bg-primary/40', 'bg-danger', 'bg-primary'];
    $gaugeArc = 'M20 100A80 80 0 0 1 180 100';

    $navItem = 'flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $navActive = 'bg-primary-soft text-ink';
    $navIdle = 'text-muted hover:bg-subtle hover:text-ink';
    $iconButton = 'relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
    $sectionTitle = 'text-base font-semibold text-ink';
    $sectionCaption = 'text-sm text-muted';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $panel = 'rounded-xl border border-line bg-surface';
    $tableWrap = 'relative overflow-x-auto rounded-lg border border-line';
    $headRow = 'bg-subtle text-left text-muted';
    $headCell = 'px-4 py-2.5 font-medium whitespace-nowrap';
    $row = 'border-t border-line transition-colors duration-150 ease-out hover:bg-subtle/50 motion-reduce:transition-none';
    $searchIcon = 'pointer-events-none absolute bottom-3 left-3 size-4 text-muted';
    $chatItem = 'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';

    $html = fn (string $markup) => new \Illuminate\Support\HtmlString($markup);
    // Ikon garis 24px. $bind diisi ekspresi Alpine kalau path-nya dinamis.
    $icon = fn (string $d, string $class = 'size-4', ?string $bind = null) => $html('<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path '.($bind ? ':d="'.$bind.'"' : 'd="'.$d.'"').' /></svg>');
    $stars = fn (float $rating) => $html('<span role="img" aria-label="Rated '.$rating.' out of 5" class="flex shrink-0 gap-0.5"><template x-for="star in 5"><svg class="size-4" :class="star <= '.$rating.' ? \'fill-warning text-warning\' : \'text-faint\'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons['reviews'].'" /></svg></template></span>');
    $labelOf = fn (array $list, string $value) => collect($list)->firstWhere('value', $value)['label'] ?? '';
    $crumbs = [['label' => 'Dashboard', 'href' => '#overview'], ['label' => $html('<span x-text="title()"></span>')]];
    $navButton = fn (string $type, string $value, string $inner) => '<button type="'.$type.'" class="'.$navItem.'" :class="page === '.$value.' ? \''.$navActive.'\' : \''.$navIdle.'\'" :aria-current="page === '.$value.' ? \'page\' : null" @click="go('.$value.')">'.$inner.'</button>';
    $navLists = fn (string $type) => $html('<template x-for="group in navGroups" :key="group.label"><div class="grid gap-2"><p class="px-3 text-xs font-medium text-faint" x-text="group.label"></p><ul class="grid gap-1"><template x-for="[value, label] in group.items" :key="value"><li>'.$navButton($type, 'value', $icon('', 'size-4', 'icons[value]').'<span x-text="label"></span>').'</li></template></ul></div></template>');
    $supportNav = fn (string $type) => $html('<div class="grid gap-1 border-t border-line pt-4">'.$navButton($type, "'help'", $icon($icons['help']).'Help center').'<button type="button" class="'.$navItem.' '.$navIdle.'" @click="openDialog(\'logout-dialog\')">'.$icon($icons['logout']).'Log out</button></div>');
    $heading = fn (string $id, string $title, string $caption, bool $live = false) => $html('<div class="grid gap-1"><h2 id="'.$id.'" class="'.$sectionTitle.'">'.$title.'</h2><p class="'.$sectionCaption.'"'.($live ? ' aria-live="polite"' : '').' x-text="'.e($caption).'"></p></div>');
    // Pilihan ToggleGroup disalin ke state induk; klik pada pilihan aktif tidak mengosongkannya.
    $choose = fn (string $key) => "if (! selected.length) selected = [{$key}]; {$key} = selected[0]";
    $restore = fn (string $key) => "selected = [{$key}]; focused = {$key}";
    $payload = [
        'titles' => $pageTitles, 'subtitles' => $pageSubtitles, 'data' => $data, 'segmentLabels' => $segmentLabels, 'provinces' => $provinces,
        'sellers' => $sellers, 'ranges' => $ranges, 'categories' => $categories, 'sortIcons' => ['sort' => $icons['sort'], 'asc' => $icons['asc'], 'desc' => $icons['desc']],
        'traffic' => $traffic, 'customers' => $customers, 'segments' => $segments, 'integrations' => $integrations, 'integrationCategories' => $integrationCategories,
        'conversations' => $conversations, 'threads' => $threads, 'reviews' => $reviews, 'faqs' => $faqs,
        'navGroups' => $navGroups, 'icons' => array_intersect_key($icons, array_flip(['overview', 'analytics', 'customers', 'integrations', 'messages', 'reviews', 'wallet', 'bag', 'trend', 'percent'])), 'statCards' => $statCards, 'dotClasses' => $dotClasses, 'kpiLabels' => $kpiLabels,
        'funnelSteps' => $funnelSteps, 'channelNames' => $channelNames, 'channelClasses' => $channelClasses, 'ratingBreakdown' => $ratingBreakdown,
    ];
@endphp

<div
  class="min-h-dvh bg-canvas text-ink lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]"
  x-data="{
    ...JSON.parse(document.getElementById('larisa-data').textContent),
    page: 'overview',
    period: 'monthly',
    selectedBar: 5,
    query: '',
    sortKey: 'total',
    sortDir: 'desc',
    draftRange: 'last-30',
    draftCategory: 'all',
    appliedRange: 'last-30',
    appliedCategory: 'all',
    range: '30d',
    segment: 'all',
    customerQuery: '',
    customerName: '',
    integrationCategory: 'all',
    connected: ['Bayarin', 'Kirimaja', 'Chatku', 'Metrik'],
    chat: 'dewi',
    read: ['dewi'],
    reply: '',
    stars: 'all',
    replies: { 'Yoga Pratama': 'Sorry about that! A replacement pair is on its way.' },
    reviewName: '',
    draftReply: '',
    faqQuery: '',
    init() {
      this.page = this.fromHash();
      this.$watch('page', () => this.$nextTick(() => this.$refs.heading.focus()));
    },
    fromHash() {
      const value = location.hash.slice(1);
      return value in this.titles ? value : 'overview';
    },
    go(value) {
      if (!(value in this.titles)) return;
      if (value === this.page) this.$refs.heading.focus();
      else location.hash = value;
    },
    title() { return this.titles[this.page]; },
    subtitle() { return this.page === 'overview' ? this.current().subtitle : this.subtitles[this.page]; },
    has(needle, ...fields) { return fields.some((field) => field.toLowerCase().includes(needle)); },
    openDialog(id) {
      const dialog = document.getElementById(id);
      if (!(dialog instanceof HTMLDialogElement)) return;
      dialog.returnValue = '';
      dialog.showModal();
    },
    notify(detail) { this.$dispatch('markas-toast', detail); },
    {{-- Bentuk lengkap data periode untuk tampilan, dari data ringkas di atas. --}}
    current() {
      const d = this.data[this.period];
      const total = d.stats[1][0];
      const [onProcess, canceled, delivered] = d.segments.map(([count]) => count);
      return {
        label: d.label,
        subtitle: `Here is how your store performed this ${d.unit}.`,
        compare: `last ${d.unit}`,
        stats: d.stats.map(([value, change, previous]) => ({ value, change, previous, up: !change.startsWith('-') })),
        spark: { line: d.spark, area: `${d.spark}L120 40L0 40Z`, summary: d.sparkSummary },
        chart: { caption: d.chart, summary: d.chartSummary, bars: d.bars.map(([label, short, height]) => ({ label, short, height, value: `Rp ${short}` })) },
        activity: {
          caption: `Order status this ${d.unit}`,
          total,
          summary: `${total} orders this ${d.unit}: ${onProcess} on process, ${canceled} canceled, ${delivered} delivered`,
          segments: d.segments.map(([count, share], i) => ({ label: this.segmentLabels[i], count, share })),
        },
        regions: { caption: `Top provinces this ${d.unit}`, total, items: d.regions.map((share, i) => ({ name: this.provinces[i], share })) },
      };
    },
    pickedBar() {
      const bars = this.current().chart.bars;
      return bars[this.selectedBar] ?? bars[bars.length - 1];
    },
    labelOf(list, value) { return list.find((entry) => entry.value === value)?.label ?? ''; },
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
      const inCategory = this.appliedCategory === 'all' || seller.category === this.appliedCategory;
      return inCategory && this.has(this.query.trim().toLowerCase(), seller.name, seller.product);
    },
    visibleCount() { return this.sellers.filter((_, index) => this.matches(index)).length; },
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
      if (!body) return;
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
    exportReport() { this.notify({ title: 'Report exported', description: `${this.current().label} sales report saved as CSV.`, variant: 'success' }); },
    showNotifications() { this.notify({ title: '3 new notifications', description: 'Dewi Lestari reached Rp 48.2M in sales.' }); },
    signOut() { this.notify({ title: 'Signed out', description: 'This is a demo, your session is still active.' }); },
    stats() { return this.traffic[this.range] ?? this.traffic['30d']; },
    {{-- Garis grafik dari titik 0-100 ke viewBox 600 x 200. --}}
    trend() {
      const points = this.stats().points;
      return points.map((p, i) => `${i ? 'L' : 'M'}${(i * 600) / (points.length - 1)} ${200 - p * 2}`).join('');
    },
    shareOf(index) {
      const funnel = this.stats().funnel;
      return Math.round((funnel[index] / funnel[0]) * 1000) / 10;
    },
    visits(index) { return Math.round((this.stats().funnel[0] * this.stats().channels[index]) / 100).toLocaleString('en-US'); },
    customerMatches(index) {
      const c = this.customers[index];
      return (this.segment === 'all' || c.segment === this.segment) && this.has(this.customerQuery.trim().toLowerCase(), c.name, c.email, c.city);
    },
    customerCount() { return this.customers.filter((_, index) => this.customerMatches(index)).length; },
    customer() {
      const c = this.customers.find((entry) => entry.name === this.customerName);
      if (!c) return null;
      return { ...c, items: [['Segment', this.labelOf(this.segments, c.segment)], ['City', c.city], ['Orders', String(c.orders)], ['Total spent', c.spent], ['Customer since', c.since], ['Last order', c.last]] };
    },
    exportCustomers() { this.notify({ title: 'Customers exported', description: `${this.customerCount()} customers saved as CSV.`, variant: 'success' }); },
    viewCustomer(name) {
      this.customerName = name;
      this.openDialog('customer-drawer');
    },
    toggleIntegration(name, on) {
      this.connected = on ? [...this.connected, name] : this.connected.filter((entry) => entry !== name);
      this.notify({ title: on ? `${name} connected` : `${name} disconnected`, variant: on ? 'success' : 'default' });
    },
    conversation() { return this.conversations.find((entry) => entry.id === this.chat) ?? this.conversations[0]; },
    lastOf(id) { return this.threads[id]?.slice(-1)[0]; },
    unreadOf(id, unread) { return this.read.includes(id) ? 0 : unread; },
    openChat(id) {
      this.chat = id;
      if (!this.read.includes(id)) this.read = [...this.read, id];
      this.reply = '';
    },
    markAllRead() {
      this.read = this.conversations.map((entry) => entry.id);
      this.notify({ title: 'All messages marked as read' });
    },
    sendReply() {
      const text = this.reply.trim();
      if (text === '') return this.notify({ title: 'Write a message first', variant: 'danger' });
      this.threads = { ...this.threads, [this.chat]: [...(this.threads[this.chat] ?? []), { from: 'me', text, time: 'Now' }] };
      this.reply = '';
      this.notify({ title: 'Reply sent', description: `To ${this.conversation().name}`, variant: 'success' });
    },
    review() { return this.reviews.find((entry) => entry.name === this.reviewName); },
    openReply(name) {
      this.reviewName = name;
      this.draftReply = '';
      this.openDialog('reply-modal');
    },
    postReply() {
      const text = this.draftReply.trim();
      if (text === '') return this.notify({ title: 'Reply is empty', variant: 'danger' });
      this.replies = { ...this.replies, [this.reviewName]: text };
      this.notify({ title: 'Reply posted', description: `${this.reviewName} will be notified.`, variant: 'success' });
    },
    faqMatches() {
      const needle = this.faqQuery.trim().toLowerCase();
      return this.faqs.map(([, title, content]) => this.has(needle, title, content));
    },
    {{-- Accordion dirender server: item yang tidak cocok dilepas dari DOM, sama seperti versi React dan Vue. --}}
    filterFaqs(root) {
      root._items ??= [...root.children];
      const matches = this.faqMatches();
      root.replaceChildren(...root._items.filter((_, index) => matches[index]));
    },
    startChat() { this.notify({ title: 'Chat started', description: 'A support agent will join in a moment.' }); },
  }"
  x-on:hashchange.window="page = fromHash()"
>
  <script type="application/json" id="larisa-data">{!! json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) !!}</script>
  <aside class="sticky top-0 hidden h-dvh flex-col gap-8 border-r border-line bg-surface px-4 py-6 lg:flex">
    <div class="flex items-center gap-2.5 px-3">
      <span class="grid size-8 place-items-center rounded-lg bg-primary text-sm font-semibold text-on-primary" aria-hidden="true">L</span>
      <span class="text-lg font-semibold tracking-tight">Larisa</span>
    </div>
    <nav aria-label="Main navigation" class="grid flex-1 content-start gap-6">{{ $navLists('button') }}</nav>
    {{ $supportNav('button') }}
  </aside>

  <div class="flex min-w-0 flex-col">
    <header class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 sm:px-6 lg:px-8">
      <x-markas.drawer title="Menu" side="left">
        <x-slot:trigger>
          <button type="button" class="{{ $iconButton }} lg:hidden" aria-label="Open menu">{{ $icon($icons['menu']) }}</button>
        </x-slot:trigger>
        <form method="dialog" class="grid gap-6">
          <nav aria-label="Mobile navigation" class="grid gap-6">{{ $navLists('submit') }}</nav>
          {{ $supportNav('submit') }}
        </form>
      </x-markas.drawer>
      <div class="relative min-w-0 flex-1 sm:max-w-sm">
        <x-markas.input type="search" aria-label="Search sellers" placeholder="Search sellers or products" class="pl-9!" x-model="query" />
        {{ $icon($icons['search'], $searchIcon) }}
      </div>
      <div class="ml-auto flex items-center gap-3">
        <button type="button" class="{{ $iconButton }}" aria-label="Notifications, 3 unread" @click="showNotifications()">
          {{ $icon($icons['bell']) }}
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

    <main class="grid min-w-0 content-start gap-6 p-4 sm:p-6 lg:p-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="grid gap-1">
          <x-markas.breadcrumb class="mb-1" :items="$crumbs" />
          <h1 x-ref="heading" tabindex="-1" class="text-2xl font-semibold tracking-tight text-ink focus:outline-none" x-text="title()"></h1>
          <p class="text-sm text-muted" x-text="subtitle()"></p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <template x-if="page === 'overview'">
            <div class="contents">
              <x-markas.dropdown-menu :items="$periodItems" x-on:markas-select="changePeriod($event.detail)">
                <x-slot:trigger>
                  {{ $icon($icons['calendar']) }}
                  <span class="sr-only">Period: </span>
                  <span x-text="current().label"></span>
                </x-slot:trigger>
              </x-markas.dropdown-menu>
              <x-markas.drawer title="Filter report">
                <x-slot:trigger>
                  <x-markas.button variant="secondary" x-on:click="openFilters()">{{ $icon($icons['filter']) }} Filter</x-markas.button>
                </x-slot:trigger>
                <div class="grid gap-5">
                  <p>Narrow down the best sellers table by date range and product category.</p>
                  <x-markas.select label="Date range" x-model="draftRange">
                    @foreach ($ranges as $entry)
                      <option value="{{ $entry['value'] }}">{{ $entry['label'] }}</option>
                    @endforeach
                  </x-markas.select>
                  <x-markas.select label="Category" x-model="draftCategory">
                    @foreach ($categories as $entry)
                      <option value="{{ $entry['value'] }}">{{ $entry['label'] }}</option>
                    @endforeach
                  </x-markas.select>
                </div>
                <x-slot:footer>
                  <x-markas.button variant="secondary" type="submit" value="reset" x-on:click="resetFilters()">Reset</x-markas.button>
                  <x-markas.button type="submit" value="apply" x-on:click="applyFilters()">Apply filters</x-markas.button>
                </x-slot:footer>
              </x-markas.drawer>
              <x-markas.button x-on:click="exportReport()">{{ $icon($icons['download']) }} Export</x-markas.button>
            </div>
          </template>
          <template x-if="page === 'analytics'">
            <x-markas.toggle-group label="Period" :items="$trafficRanges" value="30d" x-init="{{ $restore('range') }}" x-on:click="{{ $choose('range') }}" />
          </template>
          <template x-if="page === 'customers'">
            <x-markas.button variant="secondary" x-on:click="exportCustomers()">{{ $icon($icons['download']) }} Export</x-markas.button>
          </template>
          <template x-if="page === 'messages'">
            <x-markas.button variant="secondary" x-on:click="markAllRead()">Mark all as read</x-markas.button>
          </template>
        </div>
      </div>

      <template x-if="page === 'overview'">
        <div class="grid min-w-0 gap-6">
          <section aria-labelledby="metrics-title">
            <h2 id="metrics-title" class="sr-only">Key metrics</h2>
            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <template x-for="(stat, index) in current().stats" :key="index">
                <article class="grid gap-4 rounded-xl border p-5" :class="index === 0 ? 'border-primary bg-primary text-on-primary' : 'border-line bg-surface text-ink'">
                  <div class="flex items-center justify-between gap-3">
                    <h3 class="text-sm font-medium" :class="index === 0 ? 'text-on-primary/85' : 'text-muted'" x-text="statCards[index][0]"></h3>
                    <span class="grid size-9 place-items-center rounded-lg" :class="index === 0 ? 'bg-on-primary/10' : 'bg-subtle'">{{ $icon('', 'size-4', 'icons[statCards[index][1]]') }}</span>
                  </div>
                  <div class="flex items-end justify-between gap-3">
                    <p class="text-2xl font-semibold tracking-tight tabular-nums" x-text="stat.value"></p>
                    <template x-if="index === 3">
                      <svg class="h-10 w-24 shrink-0 text-primary" viewBox="0 0 120 40" preserveAspectRatio="none" role="img" :aria-label="current().spark.summary">
                        <path :d="current().spark.area" class="fill-primary/10" />
                        <path :d="current().spark.line" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                      </svg>
                    </template>
                  </div>
                  <div class="flex flex-wrap items-center gap-2 text-xs">
                    <span class="inline-flex rounded-full bg-surface"><x-markas.badge variant="success" :dot="false" x-show="stat.up"><span x-text="stat.change"></span></x-markas.badge><x-markas.badge variant="danger" :dot="false" x-show="! stat.up"><span x-text="stat.change"></span></x-markas.badge></span>
                    <span :class="index === 0 ? 'text-on-primary/85' : 'text-muted'" x-text="`vs ${stat.previous} ${current().compare}`"></span>
                  </div>
                </article>
              </template>
            </div>
          </section>

          <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <x-markas.card aria-labelledby="report-title">
              <div class="grid gap-6">
                <div class="flex flex-wrap items-start justify-between gap-4">
                  {{ $heading('report-title', 'Sales report', 'current().chart.caption') }}
                  <div class="grid justify-items-end gap-0.5 text-right" aria-live="polite">
                    <p class="text-xs text-muted" x-text="pickedBar().label"></p>
                    <p class="text-lg font-semibold tabular-nums" x-text="pickedBar().value"></p>
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
                    <template x-for="(entry, index) in current().chart.bars" :key="entry.label">
                      <button type="button" class="group flex h-64 min-w-0 flex-col items-center justify-end gap-2 rounded-md {{ $focusRing }}" :aria-pressed="selectedBar === index ? 'true' : 'false'" @click="selectedBar = index">
                        <span class="text-xs tabular-nums" :class="selectedBar === index ? 'font-semibold text-ink' : 'hidden text-muted sm:block'" x-text="entry.short"></span>
                        <span class="w-full max-w-14 rounded-t-md transition-colors duration-150 ease-out motion-reduce:transition-none" :class="selectedBar === index ? 'bg-primary' : 'bg-primary/15 group-hover:bg-primary/25'" :style="`height: ${(entry.height * 184) / 100}px`"></span>
                        <span class="text-xs" :class="selectedBar === index ? 'font-medium text-ink' : 'text-muted'" x-text="entry.label"></span>
                      </button>
                    </template>
                  </div>
                </div>
              </div>
            </x-markas.card>

            <x-markas.card aria-labelledby="activity-title">
              <div class="grid gap-6">
                {{ $heading('activity-title', 'Sales activity', 'current().activity.caption') }}
                <div class="relative mx-auto w-full max-w-72">
                  <svg viewBox="0 0 200 110" class="w-full" role="img" :aria-label="current().activity.summary">
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
                  <template x-for="(entry, index) in current().activity.segments" :key="entry.label">
                    <li class="flex items-center justify-between gap-3">
                      <span class="flex items-center gap-2">
                        <span class="size-2.5 rounded-full" :class="dotClasses[index]" aria-hidden="true"></span>
                        <span x-text="entry.label"></span>
                      </span>
                      <span class="flex items-center gap-2 tabular-nums">
                        <span class="font-medium text-ink" x-text="entry.count"></span>
                        <span class="w-10 text-right text-muted" x-text="`${entry.share}%`"></span>
                      </span>
                    </li>
                  </template>
                </ul>
              </div>
            </x-markas.card>
          </div>

          <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <x-markas.card aria-labelledby="sellers-title" class="min-w-0">
              <div class="grid gap-5">
                {{ $heading('sellers-title', 'Best sellers', '`${labelOf(ranges, appliedRange)}, ${labelOf(categories, appliedCategory)}`') }}
                <div role="region" aria-label="Best sellers" tabindex="0" class="{{ $tableWrap }} {{ $focusRing }}">
                  <table class="w-full border-collapse text-sm">
                    <thead>
                      <tr class="{{ $headRow }}">
                        @foreach ($columns as [$key, $label, $numeric])
                          <th scope="col" class="{{ $headCell }} {{ $numeric ? 'text-right' : 'text-left' }}" :aria-sort="ariaSort('{{ $key }}')">
                            <button type="button" class="inline-flex items-center gap-1 rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none {{ $focusRing }}" :class="sortKey === '{{ $key }}' && 'text-ink'" @click="sortBy('{{ $key }}', {{ $numeric ? 'true' : 'false' }})">{{ $label }}{{ $icon('', 'size-3.5', "sortIcon('{$key}')") }}</button>
                          </th>
                        @endforeach
                      </tr>
                    </thead>
                    <tbody x-ref="sellers" x-init="$nextTick(() => reorder())">
                      @foreach ($sellers as $index => $seller)
                        <tr data-seller="{{ $index }}" x-show="matches({{ $index }})" class="{{ $row }}">
                          <td class="px-4 py-3"><div class="flex items-center gap-3"><x-markas.avatar :name="$seller['name']" size="sm" /><span class="font-medium whitespace-nowrap text-ink">{{ $seller['name'] }}</span></div></td>
                          <td class="px-4 py-3"><div class="grid"><span class="whitespace-nowrap text-ink">{{ $seller['product'] }}</span><span class="text-xs text-muted">{{ $labelOf($categories, $seller['category']) }}</span></div></td>
                          <td class="px-4 py-3 text-right"><x-markas.badge :variant="$seller['change'] >= 0 ? 'success' : 'danger'" :dot="false"><span>{{ ($seller['change'] > 0 ? '+' : '').number_format($seller['change'], 1) }}%</span></x-markas.badge></td>
                          <td class="px-4 py-3 text-right font-medium whitespace-nowrap text-ink tabular-nums">Rp {{ number_format($seller['total'], 1) }}M</td>
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
                {{ $heading('regions-title', 'Orders by region', 'current().regions.caption') }}
                <div class="flex items-baseline gap-2">
                  <p class="text-3xl font-semibold tracking-tight tabular-nums" x-text="current().regions.total"></p>
                  <p class="text-sm text-muted">orders from 34 provinces</p>
                </div>
                <ul class="grid gap-4">
                  <template x-for="(region, index) in current().regions.items" :key="region.name">
                    <li class="grid gap-2">
                      <div class="flex items-center justify-between gap-3">
                        <span class="font-medium text-ink" x-text="region.name"></span>
                        <span class="text-muted tabular-nums" x-text="`${region.share}%`"></span>
                      </div>
                      <x-markas.progress :value="0" x-bind:id="`region-${index}`" x-bind:value="region.share" x-bind:aria-label="`${region.name} share of orders`" class="h-1.5!" />
                    </li>
                  </template>
                </ul>
              </div>
            </x-markas.card>
          </div>
        </div>
      </template>

      <template x-if="page === 'analytics'">
        <div class="grid min-w-0 gap-6">
          <section aria-labelledby="traffic-title">
            <h2 id="traffic-title" class="sr-only">Traffic metrics</h2>
            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <template x-for="(label, index) in kpiLabels" :key="label">
                <article class="{{ $panel }} grid gap-3 p-5">
                  <h3 class="text-sm font-medium text-muted" x-text="label"></h3>
                  <div class="flex items-center justify-between gap-3">
                    <p class="text-2xl font-semibold tracking-tight tabular-nums" x-text="stats().kpis[index]"></p>
                    <x-markas.badge variant="success" :dot="false" x-show="! stats().changes[index].startsWith('-')"><span x-text="stats().changes[index]"></span></x-markas.badge>
                    <x-markas.badge variant="danger" :dot="false" x-show="stats().changes[index].startsWith('-')"><span x-text="stats().changes[index]"></span></x-markas.badge>
                  </div>
                </article>
              </template>
            </div>
          </section>
          <div class="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <x-markas.card aria-labelledby="trend-title">
              <div class="grid gap-6">
                <div class="flex flex-wrap items-start justify-between gap-4">
                  {{ $heading('trend-title', 'Sales trend', 'stats().caption') }}
                  <p class="text-lg font-semibold tabular-nums" x-text="stats().total"></p>
                </div>
                <div class="grid gap-3">
                  <svg viewBox="0 0 600 200" preserveAspectRatio="none" class="h-56 w-full text-primary" role="img" :aria-label="stats().summary">
                    <path d="M0 50H600M0 100H600M0 150H600" class="stroke-line" stroke-dasharray="4 4" vector-effect="non-scaling-stroke" />
                    <path :d="`${trend()}L600 200L0 200Z`" class="fill-primary/10" />
                    <path :d="trend()" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                  </svg>
                  <div class="flex justify-between text-xs text-muted" aria-hidden="true">
                    <template x-for="label in stats().axis" :key="label"><span x-text="label"></span></template>
                  </div>
                </div>
              </div>
            </x-markas.card>
            <x-markas.card aria-labelledby="funnel-title">
              <div class="grid gap-5">
                <div class="grid gap-1">
                  <h2 id="funnel-title" class="{{ $sectionTitle }}">Conversion funnel</h2>
                  <p class="{{ $sectionCaption }}">From store visit to completed order</p>
                </div>
                <ol class="grid gap-5">
                  <template x-for="(step, index) in funnelSteps" :key="step">
                    <li class="grid gap-2">
                      <div class="flex items-center justify-between gap-3">
                        <span class="font-medium text-ink" x-text="step"></span>
                        <span class="text-muted tabular-nums" x-text="`${stats().funnel[index].toLocaleString('en-US')} (${shareOf(index)}%)`"></span>
                      </div>
                      <x-markas.progress :value="0" x-bind:id="`funnel-${index}`" x-bind:value="shareOf(index)" x-bind:aria-label="`${step}, ${shareOf(index)}% of visits`" class="h-1.5!" />
                    </li>
                  </template>
                </ol>
              </div>
            </x-markas.card>
          </div>
          <x-markas.card aria-labelledby="channels-title">
            <div class="grid gap-5">
              {{ $heading('channels-title', 'Traffic channels', '`Where your ${stats().kpis[0]} visitors came from`') }}
              <div class="flex h-3 gap-1 overflow-hidden rounded-full" aria-hidden="true">
                <template x-for="(share, index) in stats().channels" :key="index"><span class="h-full" :class="channelClasses[index]" :style="`width: ${share}%`"></span></template>
              </div>
              <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <template x-for="(share, index) in stats().channels" :key="index">
                  <li class="grid gap-1">
                    <span class="flex items-center gap-2 text-muted"><span class="size-2.5 rounded-full" :class="channelClasses[index]" aria-hidden="true"></span><span x-text="channelNames[index]"></span></span>
                    <span class="text-xl font-semibold tracking-tight tabular-nums" x-text="`${share}%`"></span>
                    <span class="text-xs text-muted tabular-nums" x-text="`${visits(index)} visits`"></span>
                  </li>
                </template>
              </ul>
            </div>
          </x-markas.card>
        </div>
      </template>

      <template x-if="page === 'customers'">
        <div class="grid min-w-0 gap-6">
          <x-markas.card aria-labelledby="customers-title" class="min-w-0">
            <div class="grid gap-5">
              <div class="flex flex-wrap items-end justify-between gap-4">
                <div class="grid gap-1">
                  <h2 id="customers-title" class="{{ $sectionTitle }}">Customer list</h2>
                  <p class="{{ $sectionCaption }}" aria-live="polite" x-text="`Showing ${customerCount()} of ${customers.length} customers`"></p>
                </div>
                <x-markas.toggle-group label="Segment" :items="$segments" value="all" class="flex-wrap" x-init="{{ $restore('segment') }}" x-on:click="{{ $choose('segment') }}" />
              </div>
              <div class="relative sm:max-w-xs">
                <x-markas.input type="search" aria-label="Search customers" placeholder="Search name, email or city" class="pl-9!" x-model="customerQuery" />
                {{ $icon($icons['search'], $searchIcon) }}
              </div>
              <div role="region" aria-label="Customers" tabindex="0" class="{{ $tableWrap }} {{ $focusRing }}">
                <table class="w-full border-collapse text-sm">
                  <thead>
                    <tr class="{{ $headRow }}">
                      <th scope="col" class="{{ $headCell }}">Customer</th>
                      <th scope="col" class="{{ $headCell }}">City</th>
                      <th scope="col" class="{{ $headCell }}">Segment</th>
                      <th scope="col" class="{{ $headCell }} text-right">Orders</th>
                      <th scope="col" class="{{ $headCell }} text-right">Total spent</th>
                      <th scope="col" class="{{ $headCell }}"><span class="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    @foreach ($customers as $index => $customer)
                      <tr x-show="customerMatches({{ $index }})" class="{{ $row }}">
                        <td class="px-4 py-3"><div class="flex items-center gap-3"><x-markas.avatar :name="$customer['name']" size="sm" /><div class="grid"><span class="font-medium whitespace-nowrap text-ink">{{ $customer['name'] }}</span><span class="text-xs text-muted">{{ $customer['email'] }}</span></div></div></td>
                        <td class="px-4 py-3 whitespace-nowrap">{{ $customer['city'] }}</td>
                        <td class="px-4 py-3"><x-markas.badge :variant="$segmentBadges[$customer['segment']]">{{ $labelOf($segments, $customer['segment']) }}</x-markas.badge></td>
                        <td class="px-4 py-3 text-right tabular-nums">{{ $customer['orders'] }}</td>
                        <td class="px-4 py-3 text-right font-medium whitespace-nowrap text-ink tabular-nums">{{ $customer['spent'] }}</td>
                        <td class="px-4 py-3 text-right"><x-markas.button variant="ghost" size="sm" aria-label="View {{ $customer['name'] }}" x-on:click="viewCustomer(customers[{{ $index }}].name)">View</x-markas.button></td>
                      </tr>
                    @endforeach
                    <tr x-show="customerCount() === 0" style="display: none" class="border-t border-line">
                      <td colspan="6" class="px-4 py-8 text-center text-muted">No customers match your search.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </x-markas.card>
          <x-markas.drawer id="customer-drawer" title="Customer details">
            <template x-if="customer()">
              <div class="grid gap-6">
                <div class="grid gap-0.5">
                  <p class="text-base font-semibold text-ink" x-text="customer().name"></p>
                  <p x-text="customer().email"></p>
                </div>
                <dl class="grid grid-cols-2 gap-4">
                  <template x-for="[term, value] in customer().items" :key="term">
                    <div class="grid gap-1">
                      <dt class="text-xs" x-text="term"></dt>
                      <dd class="font-medium text-ink" x-text="value"></dd>
                    </div>
                  </template>
                </dl>
              </div>
            </template>
            <x-slot:footer>
              <x-markas.button type="submit" x-on:click="go('messages')">{{ $icon($icons['messages']) }} Send message</x-markas.button>
            </x-slot:footer>
          </x-markas.drawer>
        </div>
      </template>

      <template x-if="page === 'integrations'">
        <div class="grid min-w-0 gap-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <x-markas.toggle-group label="Category" :items="$integrationCategories" value="all" class="flex-wrap" x-init="{{ $restore('integrationCategory') }}" x-on:click="{{ $choose('integrationCategory') }}" />
            <p class="text-sm text-muted" aria-live="polite" x-text="`${connected.length} of ${integrations.length} active`"></p>
          </div>
          <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <template x-for="([name, category, description], index) in integrations" :key="name">
              <li x-show="integrationCategory === 'all' || integrationCategory === category" class="{{ $panel }} grid content-start gap-4 p-5">
                <div class="flex items-center justify-between gap-3">
                  <span class="grid size-10 place-items-center rounded-lg bg-subtle text-sm font-semibold text-ink" aria-hidden="true" x-text="name.slice(0, 2).toUpperCase()"></span>
                  <x-markas.switch x-bind:id="`integration-${index}`" x-bind:aria-label="`Enable ${name}`" x-bind:checked="connected.includes(name)" x-on:change="toggleIntegration(name, $event.target.checked)" />
                </div>
                <div class="grid gap-1">
                  <h2 class="{{ $sectionTitle }}" x-text="name"></h2>
                  <p class="{{ $sectionCaption }}" x-text="description"></p>
                </div>
                <div class="flex items-center justify-between gap-3 text-xs">
                  <span class="text-muted" x-text="labelOf(integrationCategories, category)"></span>
                  <x-markas.badge variant="success" x-show="connected.includes(name)">Active</x-markas.badge>
                  <x-markas.badge variant="neutral" x-show="! connected.includes(name)">Inactive</x-markas.badge>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </template>

      <template x-if="page === 'messages'">
        <div class="grid min-w-0 gap-6">
          <section aria-label="Inbox" class="{{ $panel }} grid overflow-hidden lg:grid-cols-[20rem_minmax(0,1fr)]">
            <div class="grid grid-cols-1 content-start gap-1 border-b border-line p-3 lg:border-r lg:border-b-0">
              <h2 class="px-3 py-2 text-sm font-semibold text-ink">Conversations</h2>
              <ul class="grid grid-cols-1 gap-1">
                @foreach ($conversations as $entry)
                  @php($id = "'{$entry['id']}'")
                  <li>
                    <button type="button" class="{{ $chatItem }}" :class="chat === {{ $id }} ? 'bg-subtle' : 'hover:bg-subtle/60'" :aria-current="chat === {{ $id }} ? 'true' : null" @click="openChat({{ $id }})"><x-markas.avatar :name="$entry['name']" size="sm" /><span class="grid min-w-0 flex-1 grid-cols-1 gap-0.5"><span class="flex items-center justify-between gap-2"><span class="truncate text-sm font-medium text-ink">{{ $entry['name'] }}</span><span class="shrink-0 text-xs text-muted" x-text="lastOf({{ $id }})?.time"></span></span><span class="flex items-center justify-between gap-2"><span class="truncate text-xs text-muted" x-text="lastOf({{ $id }})?.text"></span><span x-show="unreadOf({{ $id }}, {{ $entry['unread'] }}) > 0" class="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-semibold text-on-primary"><span x-text="unreadOf({{ $id }}, {{ $entry['unread'] }})"></span><span class="sr-only"> unread</span></span></span></span></button>
                  </li>
                @endforeach
              </ul>
            </div>
            <div class="grid min-h-[32rem] grid-rows-[auto_minmax(0,1fr)_auto]">
              <div class="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                <div class="grid gap-0.5">
                  <h2 class="{{ $sectionTitle }}" x-text="conversation().name"></h2>
                  <p class="text-xs text-muted" x-text="conversation().topic"></p>
                </div>
                <x-markas.badge variant="success">Online</x-markas.badge>
              </div>
              <div role="log" :aria-label="`Conversation with ${conversation().name}`" class="grid content-start gap-4 p-5">
                <template x-for="(message, index) in threads[chat]" :key="index">
                  <div class="grid max-w-[80%] gap-1" :class="message.from === 'me' ? 'justify-items-end justify-self-end' : 'justify-items-start justify-self-start'">
                    <p class="rounded-2xl px-4 py-2.5 text-sm" :class="message.from === 'me' ? 'bg-primary text-on-primary' : 'bg-subtle text-ink'" x-text="message.text"></p>
                    <span class="text-xs text-muted" x-text="message.time"></span>
                  </div>
                </template>
              </div>
              <form class="flex items-end gap-2 border-t border-line p-4" @submit.prevent="sendReply()">
                <div class="min-w-0 flex-1">
                  <x-markas.input placeholder="Write a reply" x-bind:aria-label="`Reply to ${conversation().name}`" x-model="reply" />
                </div>
                <x-markas.button type="submit">{{ $icon($icons['send']) }} Send</x-markas.button>
              </form>
            </div>
          </section>
        </div>
      </template>

      <template x-if="page === 'reviews'">
        <div class="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <x-markas.card aria-labelledby="rating-title" class="self-start">
            <div class="grid gap-5">
              <h2 id="rating-title" class="{{ $sectionTitle }}">Rating summary</h2>
              <div class="flex items-center gap-4">
                <p class="text-5xl font-semibold tracking-tight tabular-nums">4.5</p>
                <div class="grid gap-1">
                  {{ $stars('4.5') }}
                  <p class="text-sm text-muted">From 1,248 reviews</p>
                </div>
              </div>
              <ul class="grid gap-3">
                <template x-for="([label, count, share], index) in ratingBreakdown" :key="label">
                  <li class="grid grid-cols-[3.5rem_minmax(0,1fr)_2.5rem] items-center gap-3">
                    <span class="text-muted" x-text="label"></span>
                    <x-markas.progress :value="0" x-bind:id="`rating-${index}`" x-bind:value="share" x-bind:aria-label="`${label}, ${share}% of reviews`" class="h-1.5!" />
                    <span class="text-right text-muted tabular-nums" x-text="count"></span>
                  </li>
                </template>
              </ul>
            </div>
          </x-markas.card>
          <x-markas.card aria-labelledby="reviews-title" class="min-w-0">
            <div class="grid gap-5">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <h2 id="reviews-title" class="{{ $sectionTitle }}">Latest reviews</h2>
                <x-markas.toggle-group label="Filter by rating" :items="$starFilters" value="all" class="flex-wrap" x-init="{{ $restore('stars') }}" x-on:click="{{ $choose('stars') }}" />
              </div>
              <ul class="grid gap-5">
                @foreach ($reviews as $index => $review)
                  @php($name = "reviews[{$index}].name")
                  <li x-show="stars === 'all' || stars === '{{ $review['rating'] <= 3 ? 'low' : $review['rating'] }}'" class="grid gap-3 border-t border-line pt-5 first:border-t-0 first:pt-0">
                    <div class="flex flex-wrap items-start justify-between gap-3"><div class="flex items-center gap-3"><x-markas.avatar :name="$review['name']" size="sm" /><div class="grid"><span class="font-medium text-ink">{{ $review['name'] }}</span><span class="text-xs text-muted">{{ $review['product'] }}, {{ $review['date'] }}</span></div></div>{{ $stars($review['rating']) }}</div>
                    <p class="text-ink">{{ $review['text'] }}</p>
                    <div x-show="replies[{{ $name }}]" class="grid gap-1 rounded-lg bg-subtle p-3"><span class="text-xs font-medium text-muted">Your reply</span><p class="text-ink" x-text="replies[{{ $name }}]"></p></div>
                    <div x-show="! replies[{{ $name }}]"><x-markas.button variant="secondary" size="sm" aria-label="Reply to {{ $review['name'] }}" x-on:click="openReply({{ $name }})">Reply</x-markas.button></div>
                  </li>
                @endforeach
              </ul>
            </div>
          </x-markas.card>
          <x-markas.modal id="reply-modal" title="Reply to review">
            <div class="grid gap-4">
              <blockquote class="grid gap-1 rounded-lg bg-subtle p-3">
                <span class="font-medium text-ink" x-text="review()?.name"></span>
                <span x-text="review()?.text"></span>
              </blockquote>
              <x-markas.textarea label="Your reply" :rows="4" x-model="draftReply" />
            </div>
            <x-slot:footer>
              <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
              <x-markas.button type="submit" value="post" x-on:click="postReply()">Post reply</x-markas.button>
            </x-slot:footer>
          </x-markas.modal>
        </div>
      </template>

      <template x-if="page === 'help'">
        <div class="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <x-markas.card aria-labelledby="faq-title" class="min-w-0">
            <div class="grid gap-5">
              {{ $heading('faq-title', 'Frequently asked questions', '`Showing ${faqMatches().filter(Boolean).length} of ${faqs.length} articles`', true) }}
              <div class="relative">
                <x-markas.input type="search" aria-label="Search help articles" placeholder="Search payouts, shipping, refunds" class="pl-9!" x-model="faqQuery" />
                {{ $icon($icons['search'], $searchIcon) }}
              </div>
              <x-markas.accordion :items="array_column($faqs, 1, 0)" default-value="payout" x-show="faqMatches().some(Boolean)" x-effect="filterFaqs($el)">
                @foreach ($faqs as [$key, , $content])
                  <x-slot :name="$key">{{ $content }}</x-slot>
                @endforeach
              </x-markas.accordion>
              <p x-show="! faqMatches().some(Boolean)" style="display: none" class="py-8 text-center text-muted">No articles match your search.</p>
            </div>
          </x-markas.card>
          <x-markas.card aria-labelledby="contact-title" class="self-start">
            <div class="grid gap-4">
              <div class="grid gap-1">
                <h2 id="contact-title" class="{{ $sectionTitle }}">Still need help?</h2>
                <p class="{{ $sectionCaption }}">Our team replies within 2 hours, every day from 08.00 to 20.00 WIB.</p>
              </div>
              <x-markas.button x-on:click="startChat()">{{ $icon($icons['messages']) }} Start a chat</x-markas.button>
              <p class="{{ $sectionCaption }}">Or email <a href="mailto:support@larisa.id" class="rounded-sm font-medium text-primary underline underline-offset-2 {{ $focusRing }}">support@larisa.id</a></p>
            </div>
          </x-markas.card>
        </div>
      </template>
    </main>
  </div>
  <x-markas.alert-dialog id="logout-dialog" title="Log out of Larisa?" variant="danger" action-label="Log out" x-on:markas-action="signOut()">You will need to sign in again to manage your store.</x-markas.alert-dialog>
  <x-markas.toast />
</div>
