@php
    use Illuminate\Support\HtmlString;
    use Illuminate\Support\Js;

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
        'prev' => 'm15 18-6-6 6-6',
        'next' => 'm9 18 6-6-6-6',
        'up' => 'm18 15-6-6-6 6',
        'sort' => 'm7 15 5 5 5-5M7 9l5-5 5 5',
        'pencil' => 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z',
        'menu' => 'M4 6h16M4 12h16M4 18h16',
        'plus' => 'M12 5v14M5 12h14',
        'grid' => 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
        'list' => 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
        'search' => 'm21 21-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16',
        'upload' => 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
        'download' => 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
        'send' => 'm22 2-7 20-4-9-9-4zM22 2 11 13',
    ];
    $icon = fn (string $name, string $class = 'size-5') => new HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );

    // Ikon navigasi dengan path dari data Alpine, dipakai di menu dan rail.
    $navIcon = new HtmlString('<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="item.icon" /></svg>');

    $pages = [
        'home' => ['label' => 'Home', 'title' => 'Good morning, Andi'],
        'customers' => ['label' => 'Customers', 'title' => 'Customer information'],
        'deals' => ['label' => 'Deals', 'title' => 'Deals pipeline'],
        'finance' => ['label' => 'Finance', 'title' => 'Finance overview'],
        'growth' => ['label' => 'Growth', 'title' => 'Growth and acquisition'],
        'projects' => ['label' => 'Projects', 'title' => 'Projects'],
        'calendar' => ['label' => 'Calendar', 'title' => 'Calendar'],
        'reports' => ['label' => 'Reports', 'title' => 'Sales reports'],
        'files' => ['label' => 'Files', 'title' => 'Files'],
        'settings' => ['label' => 'Settings', 'title' => 'Settings'],
    ];
    $defaultPage = 'customers';
    $topNav = ['deals', 'customers', 'finance', 'growth', 'projects'];
    $railNav = ['home' => 'home', 'customers' => 'users', 'calendar' => 'calendar', 'reports' => 'chart', 'files' => 'folder', 'settings' => 'sliders'];

    /* Home */
    $target = ['value' => 482500000, 'goal' => 650000000];
    $goals = [
        ['label' => 'New customers', 'value' => 38, 'max' => 50],
        ['label' => 'Meetings held', 'value' => 21, 'max' => 30],
        ['label' => 'Deals closed', 'value' => 9, 'max' => 12],
    ];
    $activity = [
        ['who' => 'Rina Kusuma', 'what' => 'accepted the revised proposal', 'when' => '12 min ago'],
        ['who' => 'Budi Santoso', 'what' => 'logged a call with PT Sinar Abadi', 'when' => '48 min ago'],
        ['who' => 'Dewi Lestari', 'what' => 'sent invoice INV-2041', 'when' => '2 hours ago'],
        ['who' => 'Agus Pratama', 'what' => 'moved Fleet tracking pilot to Negotiation', 'when' => '3 hours ago'],
        ['who' => 'Sari Wulandari', 'what' => 'added 4 leads from Expo Jakarta', 'when' => 'Yesterday'],
    ];
    $todayTasks = [
        ['id' => 't1', 'time' => '09:00', 'title' => 'Call Hendra about the renewal'],
        ['id' => 't2', 'time' => '10:00', 'title' => 'Send revised proposal to Rina'],
        ['id' => 't3', 'time' => '13:30', 'title' => 'Prepare the QBR deck'],
        ['id' => 't4', 'time' => '14:30', 'title' => 'Pricing review with finance'],
        ['id' => 't5', 'time' => '16:00', 'title' => 'Follow up Expo Jakarta leads'],
    ];
    $doneTasks = ['t1', 't2'];

    /* Customers */
    $stats = [
        ['label' => 'Deals value this month', 'value' => 'Rp 482.500.000', 'badge' => '+12.4%', 'variant' => 'success'],
        ['label' => 'New customers this week', 'value' => '38', 'badge' => '+6', 'variant' => 'success'],
        ['label' => 'New tasks', 'value' => '14', 'badge' => '5 due today', 'variant' => 'warning'],
    ];
    $customers = [
        ['id' => 'c1', 'firstName' => 'Rina', 'lastName' => 'Kusuma', 'role' => 'Head of Procurement', 'company' => 'PT Nusantara Logistik', 'email' => 'rina.kusuma@nusalog.co.id', 'phone' => '+62 812 3456 7890', 'source' => 'Referral', 'lastContacted' => 'Nov 3, 2026', 'tier' => 'Key account'],
        ['id' => 'c2', 'firstName' => 'Hendra', 'lastName' => 'Gunawan', 'role' => 'IT Director', 'company' => 'PT Sinar Abadi', 'email' => 'hendra@sinarabadi.co.id', 'phone' => '+62 811 2233 4455', 'source' => 'Website', 'lastContacted' => 'Oct 30, 2026', 'tier' => 'Active'],
        ['id' => 'c3', 'firstName' => 'Maya', 'lastName' => 'Putri', 'role' => 'Operations Manager', 'company' => 'CV Maju Bersama', 'email' => 'maya.putri@majubersama.id', 'phone' => '+62 813 9876 5432', 'source' => 'Event', 'lastContacted' => 'Oct 28, 2026', 'tier' => 'Active'],
        ['id' => 'c4', 'firstName' => 'Yusuf', 'lastName' => 'Hidayat', 'role' => 'Finance Lead', 'company' => 'Toko Sentosa Group', 'email' => 'yusuf@sentosagroup.id', 'phone' => '+62 857 1122 3344', 'source' => 'Cold outreach', 'lastContacted' => 'Oct 21, 2026', 'tier' => 'Lead'],
        ['id' => 'c5', 'firstName' => 'Lestari', 'lastName' => 'Wibowo', 'role' => 'Chief Executive', 'company' => 'PT Lintas Jawa', 'email' => 'lestari@lintasjawa.co.id', 'phone' => '+62 821 5566 7788', 'source' => 'Partner', 'lastContacted' => 'Oct 15, 2026', 'tier' => 'Key account'],
        ['id' => 'c6', 'firstName' => 'Rudi', 'lastName' => 'Hartono', 'role' => 'Procurement Officer', 'company' => 'PT Bumi Persada', 'email' => 'rudi.h@bumipersada.com', 'phone' => '+62 878 3344 5566', 'source' => 'Referral', 'lastContacted' => 'Oct 9, 2026', 'tier' => 'Lead'],
    ];
    $tierVariant = ['Key account' => 'success', 'Active' => 'primary', 'Lead' => 'neutral'];
    $infoRows = ['firstName' => 'First name', 'lastName' => 'Last name', 'email' => 'Email', 'phone' => 'Phone', 'source' => 'Source', 'lastContacted' => 'Last contacted'];
    $formFields = [
        ['key' => 'firstName', 'label' => 'First name', 'type' => 'text'],
        ['key' => 'lastName', 'label' => 'Last name', 'type' => 'text'],
        ['key' => 'email', 'label' => 'Email', 'type' => 'email'],
        ['key' => 'phone', 'label' => 'Phone', 'type' => 'tel'],
        ['key' => 'source', 'label' => 'Source', 'type' => 'text'],
    ];
    $history = [
        ['id' => 'd1', 'date' => '2026-10-28', 'title' => 'Cloud migration package', 'value' => 185000000, 'stage' => 'Negotiation', 'team' => ['Budi Santoso', 'Sari Wulandari', 'Agus Pratama']],
        ['id' => 'd2', 'date' => '2026-10-21', 'title' => 'Annual support renewal', 'value' => 96400000, 'stage' => 'Won', 'team' => ['Dewi Lestari', 'Budi Santoso']],
        ['id' => 'd3', 'date' => '2026-10-14', 'title' => 'Data warehouse audit', 'value' => 42750000, 'stage' => 'Proposal', 'team' => ['Agus Pratama', 'Fajar Nugroho']],
        ['id' => 'd4', 'date' => '2026-10-02', 'title' => 'POS terminal rollout', 'value' => 128900000, 'stage' => 'Won', 'team' => ['Fajar Nugroho', 'Dewi Lestari']],
    ];
    $sortOptions = [
        ['label' => 'Newest first', 'value' => 'newest'],
        ['label' => 'Oldest first', 'value' => 'oldest'],
        ['label' => 'Highest value', 'value' => 'high'],
        ['label' => 'Lowest value', 'value' => 'low'],
    ];
    $profileActions = ['Send email' => 'mail', 'Call customer' => 'phone', 'Start chat' => 'chat', 'Schedule meeting' => 'clock'];
    $funnel = [
        'weighted' => ['label' => 'Weighted', 'total' => 'Rp 592.900.000', 'caption' => 'Weighted pipeline value', 'steps' => [
            ['label' => 'Qualification', 'value' => 'Rp 312.400.000', 'deals' => 12, 'width' => 100],
            ['label' => 'Proposal sent', 'value' => 'Rp 186.000.000', 'deals' => 7, 'width' => 60],
            ['label' => 'Negotiation', 'value' => 'Rp 94.500.000', 'deals' => 4, 'width' => 30],
        ]],
        'total' => ['label' => 'Total', 'total' => 'Rp 1.069.800.000', 'caption' => 'Total pipeline value', 'steps' => [
            ['label' => 'Qualification', 'value' => 'Rp 624.800.000', 'deals' => 12, 'width' => 100],
            ['label' => 'Proposal sent', 'value' => 'Rp 310.000.000', 'deals' => 7, 'width' => 50],
            ['label' => 'Negotiation', 'value' => 'Rp 135.000.000', 'deals' => 4, 'width' => 22],
        ]],
    ];
    $barTones = ['bg-primary', 'bg-primary/70', 'bg-primary/40'];

    /* Deals */
    $stages = ['Qualified', 'Proposal', 'Negotiation', 'Won'];
    $stageItems = array_map(fn ($stage) => ['label' => $stage, 'value' => $stage], $stages);
    $pipeline = [
        ['id' => 'k1', 'title' => 'Cloud migration package', 'company' => 'PT Nusantara Logistik', 'value' => 185000000, 'owner' => 'Budi Santoso', 'stage' => 'Negotiation', 'due' => 'Nov 20'],
        ['id' => 'k2', 'title' => 'POS terminal rollout', 'company' => 'Toko Sentosa Group', 'value' => 128900000, 'owner' => 'Fajar Nugroho', 'stage' => 'Qualified', 'due' => 'Dec 2'],
        ['id' => 'k3', 'title' => 'Data warehouse audit', 'company' => 'CV Maju Bersama', 'value' => 42750000, 'owner' => 'Agus Pratama', 'stage' => 'Proposal', 'due' => 'Nov 14'],
        ['id' => 'k4', 'title' => 'Fleet tracking pilot', 'company' => 'PT Lintas Jawa', 'value' => 64200000, 'owner' => 'Sari Wulandari', 'stage' => 'Negotiation', 'due' => 'Nov 28'],
        ['id' => 'k5', 'title' => 'HR system integration', 'company' => 'PT Bumi Persada', 'value' => 73500000, 'owner' => 'Budi Santoso', 'stage' => 'Qualified', 'due' => 'Dec 9'],
        ['id' => 'k6', 'title' => 'Warehouse sensor network', 'company' => 'PT Samudra Pangan', 'value' => 51800000, 'owner' => 'Agus Pratama', 'stage' => 'Proposal', 'due' => 'Nov 30'],
        ['id' => 'k7', 'title' => 'Annual support renewal', 'company' => 'PT Sinar Abadi', 'value' => 96400000, 'owner' => 'Dewi Lestari', 'stage' => 'Won', 'due' => 'Oct 21'],
        ['id' => 'k8', 'title' => 'Security awareness training', 'company' => 'Bank Daerah Lestari', 'value' => 18500000, 'owner' => 'Dewi Lestari', 'stage' => 'Won', 'due' => 'Oct 30'],
    ];

    /* Finance */
    $financeStats = [
        ['label' => 'Revenue this month', 'value' => 'Rp 482.500.000', 'note' => '+12.4% vs October'],
        ['label' => 'Outstanding', 'value' => 'Rp 397.150.000', 'note' => '5 open invoices'],
        ['label' => 'Overdue', 'value' => 'Rp 61.250.000', 'note' => '2 invoices'],
        ['label' => 'Average days to pay', 'value' => '18 days', 'note' => '3 days faster'],
    ];
    $invoices = [
        ['id' => 'INV-2032', 'customer' => 'PT Lintas Jawa', 'due' => '2026-10-24', 'amount' => 42750000, 'status' => 'Overdue'],
        ['id' => 'INV-2035', 'customer' => 'PT Bumi Persada', 'due' => '2026-10-31', 'amount' => 18500000, 'status' => 'Overdue'],
        ['id' => 'INV-2036', 'customer' => 'PT Sinar Abadi', 'due' => '2026-11-02', 'amount' => 96400000, 'status' => 'Paid'],
        ['id' => 'INV-2038', 'customer' => 'CV Maju Bersama', 'due' => '2026-11-12', 'amount' => 64200000, 'status' => 'Pending'],
        ['id' => 'INV-2039', 'customer' => 'Toko Sentosa Group', 'due' => '2026-11-18', 'amount' => 86300000, 'status' => 'Pending'],
        ['id' => 'INV-2040', 'customer' => 'PT Samudra Pangan', 'due' => '2026-11-21', 'amount' => 51800000, 'status' => 'Paid'],
        ['id' => 'INV-2041', 'customer' => 'PT Nusantara Logistik', 'due' => '2026-11-27', 'amount' => 185000000, 'status' => 'Pending'],
    ];
    $invoiceColumns = [
        ['key' => 'customer', 'label' => 'Customer', 'align' => 'text-left'],
        ['key' => 'due', 'label' => 'Due date', 'align' => 'text-left'],
        ['key' => 'amount', 'label' => 'Amount', 'align' => 'text-right'],
    ];
    $statusVariant = ['Paid' => 'success', 'Pending' => 'warning', 'Overdue' => 'danger'];
    $revenue = [['Jun', 312], ['Jul', 356], ['Aug', 341], ['Sep', 398], ['Oct', 429], ['Nov', 482]];

    /* Growth */
    $growthPeriods = [
        '7d' => ['label' => '7 days', 'funnel' => [18420, 4860, 2140, 960, 312], 'sources' => [34, 27, 18, 13, 8], 'metrics' => [
            ['label' => 'Visitors', 'value' => '18.420', 'badge' => '+8.2%'], ['label' => 'New leads', 'value' => '312', 'badge' => '+5.1%'],
            ['label' => 'Lead conversion', 'value' => '3.4%', 'badge' => '+0.3 pt'], ['label' => 'Cost per lead', 'value' => 'Rp 84.000', 'badge' => '-4.0%'],
        ]],
        '30d' => ['label' => '30 days', 'funnel' => [76900, 19800, 8650, 3720, 1284], 'sources' => [31, 29, 21, 11, 8], 'metrics' => [
            ['label' => 'Visitors', 'value' => '76.900', 'badge' => '+11.6%'], ['label' => 'New leads', 'value' => '1.284', 'badge' => '+9.4%'],
            ['label' => 'Lead conversion', 'value' => '3.1%', 'badge' => '+0.2 pt'], ['label' => 'Cost per lead', 'value' => 'Rp 91.500', 'badge' => '-2.2%'],
        ]],
        '90d' => ['label' => '90 days', 'funnel' => [214300, 52400, 23900, 10100, 3702], 'sources' => [29, 30, 22, 12, 7], 'metrics' => [
            ['label' => 'Visitors', 'value' => '214.300', 'badge' => '+18.9%'], ['label' => 'New leads', 'value' => '3.702', 'badge' => '+14.3%'],
            ['label' => 'Lead conversion', 'value' => '2.9%', 'badge' => '+0.4 pt'], ['label' => 'Cost per lead', 'value' => 'Rp 96.200', 'badge' => '-1.5%'],
        ]],
    ];
    $growthTabs = array_map(fn ($period) => $period['label'], $growthPeriods);
    $funnelSteps = ['Visitors', 'Sign-ups', 'Leads', 'Qualified', 'Customers'];
    $leadSources = ['Referral', 'Organic search', 'Paid ads', 'Events', 'Partners'];
    $sourceTones = ['bg-primary', 'bg-primary/75', 'bg-primary/55', 'bg-primary/35', 'bg-primary/20'];

    /* Projects */
    $projects = [
        ['id' => 'p1', 'name' => 'Cloud migration', 'client' => 'PT Nusantara Logistik', 'status' => 'active', 'progress' => 68, 'due' => 'Dec 12, 2026', 'lead' => 'Budi Santoso', 'budget' => 185000000, 'tasks' => '17 of 25 tasks'],
        ['id' => 'p2', 'name' => 'POS terminal rollout', 'client' => 'Toko Sentosa Group', 'status' => 'risk', 'progress' => 42, 'due' => 'Nov 20, 2026', 'lead' => 'Fajar Nugroho', 'budget' => 128900000, 'tasks' => '11 of 26 tasks'],
        ['id' => 'p3', 'name' => 'Data warehouse audit', 'client' => 'CV Maju Bersama', 'status' => 'active', 'progress' => 55, 'due' => 'Dec 4, 2026', 'lead' => 'Agus Pratama', 'budget' => 42750000, 'tasks' => '12 of 22 tasks'],
        ['id' => 'p4', 'name' => 'Fleet tracking pilot', 'client' => 'PT Lintas Jawa', 'status' => 'done', 'progress' => 100, 'due' => 'Oct 30, 2026', 'lead' => 'Sari Wulandari', 'budget' => 64200000, 'tasks' => '18 of 18 tasks'],
        ['id' => 'p5', 'name' => 'HR system integration', 'client' => 'PT Bumi Persada', 'status' => 'risk', 'progress' => 23, 'due' => 'Nov 28, 2026', 'lead' => 'Dewi Lestari', 'budget' => 73500000, 'tasks' => '6 of 26 tasks'],
        ['id' => 'p6', 'name' => 'Annual support renewal', 'client' => 'PT Sinar Abadi', 'status' => 'done', 'progress' => 100, 'due' => 'Oct 21, 2026', 'lead' => 'Dewi Lestari', 'budget' => 96400000, 'tasks' => '9 of 9 tasks'],
    ];
    $projectStatus = [
        'active' => ['label' => 'Active', 'variant' => 'primary'],
        'risk' => ['label' => 'At risk', 'variant' => 'warning'],
        'done' => ['label' => 'Completed', 'variant' => 'success'],
    ];
    $projectStats = [
        ['label' => 'Active projects', 'value' => '2', 'badge' => 'On track', 'variant' => 'primary'],
        ['label' => 'At risk', 'value' => '2', 'badge' => 'Needs attention', 'variant' => 'warning'],
        ['label' => 'Completed this quarter', 'value' => '2', 'badge' => '+1 vs Q3', 'variant' => 'success'],
    ];
    $projectFilters = [
        ['value' => 'all', 'label' => 'All'],
        ['value' => 'active', 'label' => 'Active'],
        ['value' => 'risk', 'label' => 'At risk'],
        ['value' => 'done', 'label' => 'Completed'],
    ];

    /* Calendar */
    $events = [
        '2026-10-28' => [['time' => '10:00', 'title' => 'Kickoff meeting', 'kind' => 'Meeting']],
        '2026-11-03' => [['time' => '09:30', 'title' => 'Discovery call recap', 'kind' => 'Call']],
        '2026-11-05' => [['time' => '10:00', 'title' => 'Send revised proposal', 'kind' => 'Email'], ['time' => '14:30', 'title' => 'Pricing review with finance', 'kind' => 'Meeting']],
        '2026-11-09' => [['time' => '11:00', 'title' => 'Contract draft review', 'kind' => 'Meeting']],
        '2026-11-12' => [['time' => '15:00', 'title' => 'Quarterly business review', 'kind' => 'Meeting']],
        '2026-11-16' => [['time' => '10:30', 'title' => 'Expo Jakarta debrief', 'kind' => 'Meeting']],
        '2026-11-18' => [['time' => '09:00', 'title' => 'Onsite demo in Surabaya', 'kind' => 'Visit']],
        '2026-11-20' => [['time' => '13:00', 'title' => 'POS rollout checkpoint', 'kind' => 'Call']],
        '2026-11-26' => [['time' => '13:00', 'title' => 'Renewal sign-off', 'kind' => 'Call']],
        '2026-12-02' => [['time' => '10:00', 'title' => 'Implementation planning', 'kind' => 'Meeting']],
    ];
    $eventKinds = ['Meeting', 'Call', 'Email', 'Visit'];
    $kindTones = ['Meeting' => 'bg-primary-soft text-primary', 'Call' => 'bg-success/15 text-ink', 'Email' => 'bg-subtle text-ink', 'Visit' => 'bg-warning/20 text-ink'];
    $today = '2026-11-05';
    $monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    $weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    /* Reports */
    $reportPeriods = [
        ['value' => 'month', 'label' => 'This month', 'reps' => [168, 132, 104, 78], 'kpis' => [
            ['label' => 'Revenue', 'value' => 'Rp 482.500.000', 'badge' => '+12.4%'], ['label' => 'Deals won', 'value' => '9', 'badge' => '+2'],
            ['label' => 'Average deal size', 'value' => 'Rp 53.600.000', 'badge' => '+4.1%'],
        ], 'bars' => [['label' => 'Week 1', 'value' => 96], ['label' => 'Week 2', 'value' => 128], ['label' => 'Week 3', 'value' => 142], ['label' => 'Week 4', 'value' => 117]]],
        ['value' => 'quarter', 'label' => 'This quarter', 'reps' => [452, 371, 288, 198], 'kpis' => [
            ['label' => 'Revenue', 'value' => 'Rp 1.309.000.000', 'badge' => '+9.8%'], ['label' => 'Deals won', 'value' => '26', 'badge' => '+5'],
            ['label' => 'Average deal size', 'value' => 'Rp 50.300.000', 'badge' => '+1.9%'],
        ], 'bars' => [['label' => 'Sep', 'value' => 398], ['label' => 'Oct', 'value' => 429], ['label' => 'Nov', 'value' => 482]]],
        ['value' => 'year', 'label' => 'This year', 'reps' => [1380, 1105, 862, 621], 'kpis' => [
            ['label' => 'Revenue', 'value' => 'Rp 3.968.000.000', 'badge' => '+21.3%'], ['label' => 'Deals won', 'value' => '84', 'badge' => '+17'],
            ['label' => 'Average deal size', 'value' => 'Rp 47.200.000', 'badge' => '+3.6%'],
        ], 'bars' => array_map(fn ($month, $value) => ['label' => $month, 'value' => $value], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], [248, 263, 301, 287, 334, 312, 356, 341, 398, 429, 482])],
    ];
    $reps = ['Budi Santoso', 'Dewi Lestari', 'Agus Pratama', 'Fajar Nugroho'];

    /* Files */
    $files = [
        ['name' => 'Cloud migration proposal.pdf', 'kind' => 'PDF', 'size' => '2.4 MB', 'updated' => 'Nov 4', 'owner' => 'Budi Santoso'],
        ['name' => 'Q4 pipeline forecast.xlsx', 'kind' => 'XLSX', 'size' => '860 KB', 'updated' => 'Nov 3', 'owner' => 'Dewi Lestari'],
        ['name' => 'Master service agreement.docx', 'kind' => 'DOCX', 'size' => '1.1 MB', 'updated' => 'Nov 1', 'owner' => 'Agus Pratama'],
        ['name' => 'Expo Jakarta leads.csv', 'kind' => 'CSV', 'size' => '148 KB', 'updated' => 'Oct 30', 'owner' => 'Sari Wulandari'],
        ['name' => 'Brand guidelines.pdf', 'kind' => 'PDF', 'size' => '6.8 MB', 'updated' => 'Oct 27', 'owner' => 'Andi Wijaya'],
        ['name' => 'Onsite demo photos.zip', 'kind' => 'ZIP', 'size' => '24.5 MB', 'updated' => 'Oct 24', 'owner' => 'Fajar Nugroho'],
        ['name' => 'Pricing sheet 2027.xlsx', 'kind' => 'XLSX', 'size' => '312 KB', 'updated' => 'Oct 22', 'owner' => 'Dewi Lestari'],
        ['name' => 'QBR presentation.pptx', 'kind' => 'PPTX', 'size' => '9.2 MB', 'updated' => 'Oct 20', 'owner' => 'Budi Santoso'],
    ];
    $kindColors = ['PDF' => 'bg-danger/15', 'XLSX' => 'bg-success/15', 'CSV' => 'bg-success/15', 'DOCX' => 'bg-primary-soft', 'PPTX' => 'bg-warning/20', 'ZIP' => 'bg-subtle'];
    $viewOptions = [['value' => 'grid', 'label' => 'Grid', 'ariaLabel' => 'Grid view'], ['value' => 'list', 'label' => 'List', 'ariaLabel' => 'List view']];
    $fileViews = [
        'grid' => ['list' => 'grid gap-3 sm:grid-cols-2 xl:grid-cols-4', 'item' => 'grid gap-3 rounded-xl border border-line bg-surface p-4'],
        'list' => ['list' => 'grid gap-2', 'item' => 'flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3'],
    ];

    /* Settings */
    $profile = ['firstName' => 'Andi', 'lastName' => 'Wijaya', 'email' => 'andi.wijaya@lumen.co.id', 'phone' => '+62 812 7788 9900', 'role' => 'Sales manager'];
    $profileFields = [
        ['key' => 'firstName', 'label' => 'First name', 'type' => 'text'],
        ['key' => 'lastName', 'label' => 'Last name', 'type' => 'text'],
        ['key' => 'email', 'label' => 'Email', 'type' => 'email'],
        ['key' => 'phone', 'label' => 'Phone', 'type' => 'tel'],
    ];
    $roles = ['Account executive', 'Sales manager', 'Head of sales'];
    $notificationOptions = [
        ['key' => 'deals', 'label' => 'Deal stage changes', 'description' => 'When a deal moves to another stage'],
        ['key' => 'invoices', 'label' => 'Invoice reminders', 'description' => 'Overdue and upcoming invoices'],
        ['key' => 'mentions', 'label' => 'Mentions', 'description' => 'When a teammate mentions you'],
        ['key' => 'weekly', 'label' => 'Weekly report', 'description' => 'Summary every Monday at 08:00'],
    ];
    $defaultPrefs = ['deals', 'invoices', 'mentions'];

    $iconButton = 'relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $pillBase = 'inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $railBase = 'inline-flex size-10 items-center justify-center rounded-xl transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    // Label rail muncul saat hover atau fokus keyboard, cukup dengan CSS.
    $railTip = 'pointer-events-none absolute top-1/2 left-full z-30 ml-3 -translate-y-1/2 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-canvas opacity-0 shadow-overlay transition-opacity duration-150 group-hover:opacity-100 group-has-focus-visible:opacity-100';
    $menuItemBase = 'flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $headRow = 'flex flex-wrap items-center justify-between gap-3';
    $tile = 'rounded-xl border border-line bg-surface px-4 py-3';
    $selectable = 'text-left after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary';
    $listRow = 'relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150';
    $dealBase = 'relative flex min-h-44 flex-col gap-3 rounded-2xl border p-4 transition-colors duration-150';
    $kanbanCard = 'relative grid gap-3 rounded-xl border bg-surface p-3 transition-colors duration-150';
    $projectRow = 'grid w-full gap-3 rounded-xl px-3 py-4 text-left transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:grid-cols-[minmax(0,1fr)_120px_minmax(0,260px)_140px] md:items-center';
    $dayCell = 'flex min-h-14 flex-col items-start gap-1 p-1.5 text-left transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:min-h-24 sm:p-2';
    $dayNumber = 'inline-flex size-6 items-center justify-center rounded-full text-xs font-medium tabular-nums';
    $chip = 'truncate rounded-md px-1.5 py-0.5 text-xs font-medium';
    $tableWrap = 'relative overflow-x-auto rounded-xl contain-inline-size border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $th = 'px-4 py-3 font-medium whitespace-nowrap';
    $td = 'px-4 py-2 whitespace-nowrap';
    $thButton = 'inline-flex items-center gap-1 rounded-md font-medium hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $fileKind = 'inline-flex h-10 w-12 shrink-0 items-center justify-center rounded-lg text-xs font-semibold';
    $avatarBase = 'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle bg-primary-soft font-medium text-primary select-none';
    $classes = [
        'navActive' => 'bg-primary text-on-primary',
        'pillIdle' => 'text-muted hover:bg-surface hover:text-ink',
        'railIdle' => 'text-muted hover:bg-subtle hover:text-ink',
        'menuItemIdle' => 'text-ink hover:bg-subtle',
        'dealIdle' => 'border-line bg-surface hover:border-primary-line',
        'dealSelected' => 'border-primary bg-primary text-on-primary [&_[role=img]]:ring-primary',
        'kanbanSelected' => 'border-primary ring-1 ring-primary',
        'kanbanIdle' => 'border-line hover:border-primary-line',
    ];

    // Avatar dengan nama dari state Alpine, markup sama dengan komponen Avatar.
    $avatar = fn (string $name, string $size = 'size-8 text-xs', string $class = '') => new HtmlString(
        '<span role="img" :aria-label="'.e($name).'" class="'.trim($avatarBase.' '.$size.' '.$class).'" x-text="initials('.e($name).')"></span>'
    );
    // Data untuk Alpine sebagai literal objek JS dengan kutip tunggal, lebih ringkas daripada @js (JSON.parse dengan kutip ganda di-escape).
    $literal = function (mixed $value) use (&$literal): string {
        if (is_string($value)) {
            return "'".str_replace(['\\', "'", '"', '<', '&'], ['\\\\', "\\'", '\\x22', '\\x3C', '\\x26'], $value)."'";
        }
        if (! is_array($value)) {
            return json_encode($value);
        }
        $list = array_is_list($value);
        $items = array_map(
            fn ($key) => ($list ? '' : (preg_match('/^[a-z_]\\w*$/i', (string) $key) ? $key : $literal((string) $key)).': ').$literal($value[$key]),
            array_keys($value)
        );

        return ($list ? '[' : '{').implode(', ', $items).($list ? ']' : '}');
    };
    $js = fn (mixed $value) => new HtmlString($literal($value));
    $rupiah = fn (int $value) => 'Rp '.number_format($value, 0, ',', '.');
    $percentOf = fn (int|float $value, int|float $max) => (int) round($value / $max * 100);
    $shortDate = function (string $iso) use ($monthNames) {
        [$year, $month, $day] = array_map('intval', explode('-', $iso));

        return substr($monthNames[$month - 1], 0, 3)." {$day}, {$year}";
    };
    // Judul kartu dengan subjudul. Ekspresi Alpine opsional mengganti teks saat state berubah.
    $head = fn (string $id, string $title, string $sub, ?string $titleBind = null, ?string $subBind = null) => new HtmlString(
        '<div><h2 id="'.$id.'" class="text-base font-semibold"'.($titleBind ? ' x-text="'.e($titleBind).'"' : '').'>'.e($title).'</h2>'
        .'<p class="text-sm text-muted"'.($subBind ? ' x-text="'.e($subBind).'"' : '').'>'.e($sub).'</p></div>'
    );
    $targetPercent = $percentOf($target['value'], $target['goal']);
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp

<div
  class="min-h-dvh bg-canvas text-ink"
  x-data="{
    page: {{ $js($defaultPage) }},
    pages: {{ $js($pages) }},
    topNav: {{ $js(array_map(fn ($id) => ['id' => $id, 'label' => $pages[$id]['label']], $topNav)) }},
    railNav: {{ $js(array_map(fn ($id, $name) => ['id' => $id, 'label' => $pages[$id]['label'], 'icon' => $icons[$name]], array_keys($railNav), $railNav)) }},
    cls: {{ $js($classes) }},
    monthNames: {{ $js($monthNames) }},
    weekdayNames: {{ $js($weekdayNames) }},
    {{-- Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. --}}
    readHash() {
      const id = window.location.hash.slice(1);
      return id in this.pages ? id : {{ $js($defaultPage) }};
    },
    go(id) {
      window.location.assign('#' + id);
    },
    current(id) {
      return this.page === id ? 'page' : null;
    },
    notify(title, description = '', variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    rupiah(value) {
      return 'Rp ' + value.toLocaleString('id-ID');
    },
    plural(count, word) {
      return count + ' ' + word + (count === 1 ? '' : 's');
    },
    percentOf(value, max) {
      return Math.round((value / max) * 100);
    },
    {{-- Huruf pertama kata pertama dan terakhir, sama dengan Avatar. --}}
    initials(name) {
      const words = name.trim().split(/\s+/).filter(Boolean);
      const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
      return picked.map((word) => Array.from(word)[0] ?? '').join('').toUpperCase();
    },
    shortDate(iso) {
      const [year, month, day] = iso.split('-').map(Number);
      return this.monthNames[month - 1].slice(0, 3) + ' ' + day + ', ' + year;
    },
    longDate(iso) {
      const [year, month, day] = iso.split('-').map(Number);
      return this.weekdayNames[new Date(year, month - 1, day).getDay()] + ', ' + this.monthNames[month - 1] + ' ' + day;
    },
  }"
  x-init="page = readHash()"
  x-on:hashchange.window="page = readHash(); document.getElementById('crm-page-title').focus()"
>
  <header class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 lg:px-6">
    <x-markas.drawer title="Menu" side="left">
      <x-slot:trigger>
        <button type="button" aria-label="Open menu" class="{{ $iconButton }} lg:hidden">{{ $icon('menu') }}</button>
      </x-slot:trigger>
      <form method="dialog" class="grid gap-6">
        <div class="grid gap-1">
          <p class="px-3 text-xs font-medium text-muted">Pages</p>
          <template x-for="item in topNav" :key="item.id">
            <button type="submit" class="{{ $menuItemBase }}" :class="page === item.id ? cls.navActive : cls.menuItemIdle" :aria-current="current(item.id)" @click="go(item.id)" x-text="item.label"></button>
          </template>
        </div>
        <div class="grid gap-1">
          <p class="px-3 text-xs font-medium text-muted">Workspace</p>
          <template x-for="item in railNav" :key="item.id">
            <button type="submit" class="{{ $menuItemBase }}" :class="page === item.id ? cls.navActive : cls.menuItemIdle" :aria-current="current(item.id)" @click="go(item.id)">{{ $navIcon }}<span x-text="item.label"></span></button>
          </template>
        </div>
      </form>
    </x-markas.drawer>
    <div class="flex min-w-0 items-center gap-3">
      <span class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-on-primary" aria-hidden="true">L</span>
      <div class="min-w-0 leading-tight">
        <p class="flex items-center gap-1.5 text-base font-semibold tracking-tight">Lumen<span class="size-1.5 rounded-full bg-success" aria-hidden="true"></span></p>
        <p class="truncate text-xs text-muted max-[390px]:hidden">Sales workspace</p>
      </div>
    </div>
    <nav aria-label="Main" class="mx-auto hidden items-center gap-1 rounded-full border border-line bg-canvas p-1 lg:flex">
      <template x-for="item in topNav" :key="item.id">
        <button type="button" class="{{ $pillBase }}" :class="page === item.id ? cls.navActive : cls.pillIdle" :aria-current="current(item.id)" @click="go(item.id)" x-text="item.label"></button>
      </template>
    </nav>
    <div class="ml-auto flex items-center gap-2 lg:ml-0">
      <button type="button" aria-label="Messages" class="{{ $iconButton }}" @click="notify('No new messages', 'Inbox is up to date')">{{ $icon('message') }}</button>
      <button type="button" aria-label="Notifications, 3 unread" class="{{ $iconButton }}" @click="notify('3 unread notifications', 'Rina Kusuma replied to your proposal')">{{ $icon('bell') }}<span class="absolute top-2 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface" aria-hidden="true"></span></button>
      <x-markas.avatar name="Andi Wijaya" size="md" class="ml-1" />
    </div>
  </header>

  <div class="flex">
    <div class="hidden w-18 shrink-0 border-r border-line bg-surface lg:block">
      <nav aria-label="Workspace" class="sticky top-16 z-10 flex h-[calc(100dvh-4rem)] flex-col items-center gap-2 py-4">
        <template x-for="item in railNav" :key="item.id">
          <span class="group relative inline-flex" :class="item.id === 'settings' && 'mt-auto'">
            <button type="button" class="{{ $railBase }}" :class="page === item.id ? cls.navActive : cls.railIdle" :aria-label="item.label" :aria-current="current(item.id)" @click="go(item.id)">{{ $navIcon }}</button>
            <span aria-hidden="true" class="{{ $railTip }}" x-text="item.label"></span>
          </span>
        </template>
      </nav>
    </div>

    <main class="min-w-0 flex-1 p-4 lg:p-6">
      <div class="mb-6">
        <p class="text-sm text-muted">Lumen / <span x-text="pages[page].label">{{ $pages[$defaultPage]['label'] }}</span></p>
        <h1 id="crm-page-title" tabindex="-1" class="text-2xl font-semibold tracking-tight focus:outline-none" x-text="pages[page].title">{{ $pages[$defaultPage]['title'] }}</h1>
      </div>

      {{-- Home --}}
      <template x-if="page === 'home'">
        <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]" x-data="{ done: {{ $js($doneTasks) }}, total: {{ $js(count($todayTasks)) }}, activity: {{ $js($activity) }} }">
          <div class="grid content-start gap-6">
            <x-markas.card aria-labelledby="crm-target-title">
              <div class="grid gap-4">
                <div class="{{ $headRow }}">{{ $head('crm-target-title', 'Monthly target', 'November 2026') }}</div>
                <div class="grid items-center gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
                  <div role="img" aria-label="{{ $targetPercent }}% of the monthly revenue target reached" class="relative mx-auto size-40">
                    <svg viewBox="0 0 120 120" class="size-40 -rotate-90" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" stroke-width="12" class="stroke-subtle" /><circle cx="60" cy="60" r="52" fill="none" stroke-width="12" stroke-linecap="round" pathLength="100" stroke-dasharray="{{ $targetPercent }} 100" class="stroke-primary" /></svg>
                    <div class="absolute inset-0 grid place-content-center text-center"><span class="text-3xl font-semibold tracking-tight tabular-nums">{{ $targetPercent }}%</span><span class="text-xs text-muted">of target</span></div>
                  </div>
                  <div class="grid gap-4">
                    <div>
                      <p class="text-2xl font-semibold tracking-tight tabular-nums">{{ $rupiah($target['value']) }}</p>
                      <p class="text-sm text-muted">of {{ $rupiah($target['goal']) }}, {{ $rupiah($target['goal'] - $target['value']) }} to go</p>
                    </div>
                    @foreach ($goals as $goal)
                      <x-markas.progress :label="$goal['label']" :value="$goal['value']" :max="$goal['max']" />
                    @endforeach
                  </div>
                </div>
              </div>
            </x-markas.card>
            <x-markas.card aria-labelledby="crm-activity-title">
              <div class="grid gap-4">
                <div class="{{ $headRow }}">{{ $head('crm-activity-title', 'Recent activity', 'Latest updates from your team') }}</div>
                <ol class="grid gap-4">
                  <template x-for="item in activity" :key="item.when">
                    <li class="flex items-start gap-3">
                      {{ $avatar('item.who') }}
                      <div class="min-w-0 flex-1">
                        <p><span class="font-medium" x-text="item.who"></span> <span x-text="item.what"></span></p>
                        <p class="text-xs text-muted" x-text="item.when"></p>
                      </div>
                    </li>
                  </template>
                </ol>
              </div>
            </x-markas.card>
          </div>
          <x-markas.card aria-labelledby="crm-today-title" class="content-start">
            <div class="grid gap-4">
              <div class="{{ $headRow }}">{{ $head('crm-today-title', "Today's tasks", '2 of 5 done', null, "done.length + ' of ' + total + ' done'") }}</div>
              <x-markas.progress :value="count($doneTasks)" :max="count($todayTasks)" aria-label="Tasks completed" x-bind:value="done.length" />
              <ul class="grid gap-3">
                @foreach ($todayTasks as $task)
                  <li class="rounded-xl border border-line p-3">
                    <x-markas.checkbox :label="$task['title']" :description="$task['time']" value="{{ $task['id'] }}" x-model="done" />
                  </li>
                @endforeach
              </ul>
            </div>
          </x-markas.card>
        </div>
      </template>

      {{-- Customers --}}
      <template x-if="page === 'customers'">
        <div
          class="grid gap-6"
          x-data="{
            customers: {{ $js($customers) }},
            selectedId: 'c1',
            draft: {{ $js($customers[0]) }},
            sort: 'newest',
            selectedDeal: 'd1',
            history: {{ $js($history) }},
            sortOptions: {{ $js($sortOptions) }},
            get customer() {
              return this.customers.find((item) => item.id === this.selectedId);
            },
            get fullName() {
              return this.customer.firstName + ' ' + this.customer.lastName;
            },
            get sortLabel() {
              return this.sortOptions.find((option) => option.value === this.sort)?.label;
            },
            get sortedHistory() {
              const sorters = {
                newest: (a, b) => b.date.localeCompare(a.date),
                oldest: (a, b) => a.date.localeCompare(b.date),
                high: (a, b) => b.value - a.value,
                low: (a, b) => a.value - b.value,
              };
              return [...this.history].sort(sorters[this.sort]);
            },
            onDrawerClose(dialog) {
              if (dialog.returnValue === 'save') {
                const saved = { ...this.draft };
                this.customers = this.customers.map((item) => (item.id === saved.id ? saved : item));
                this.notify('Customer details saved', saved.firstName + ' ' + saved.lastName, 'success');
              }
              dialog.returnValue = '';
            },
          }"
        >
          <dl class="grid gap-3 sm:grid-cols-3">
            @foreach ($stats as $stat)
              <div class="{{ $tile }}">
                <dt class="text-xs text-muted">{{ $stat['label'] }}</dt>
                <dd class="mt-1 flex flex-wrap items-center gap-2"><span class="text-lg font-semibold tracking-tight tabular-nums">{{ $stat['value'] }}</span><x-markas.badge :variant="$stat['variant']">{{ $stat['badge'] }}</x-markas.badge></dd>
              </div>
            @endforeach
          </dl>
          <div class="grid items-start gap-6 xl:grid-cols-[260px_minmax(0,1fr)_360px]">
            <x-markas.card aria-labelledby="crm-list-title" class="content-start">
              <div class="grid gap-4">
                <div class="{{ $headRow }}">{{ $head('crm-list-title', 'Customers', count($customers).' accounts', null, "customers.length + ' accounts'") }}</div>
                <ul class="-mx-3 grid gap-1">
                  <template x-for="item in customers" :key="item.id">
                    <li class="{{ $listRow }}" :class="item.id === selectedId ? 'bg-primary-soft' : 'hover:bg-subtle'">
                      {{ $avatar("item.firstName + ' ' + item.lastName") }}
                      <div class="min-w-0 flex-1">
                        <button type="button" class="{{ $selectable }} block truncate text-sm font-medium" :aria-pressed="item.id === selectedId ? 'true' : 'false'" @click="selectedId = item.id" x-text="item.firstName + ' ' + item.lastName"></button>
                        <p class="truncate text-xs text-muted" x-text="item.company"></p>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
            </x-markas.card>

            <div class="grid gap-6">
              <x-markas.card aria-labelledby="crm-history-title" class="content-start">
                <div class="grid gap-4">
                  <div class="{{ $headRow }}">
                    {{ $head('crm-history-title', 'Interaction history', count($history).' deals with Rina this quarter', null, "history.length + ' deals with ' + customer.firstName + ' this quarter'") }}
                    <x-markas.dropdown-menu :items="$sortOptions" x-on:markas-select="sort = $event.detail">
                      <x-slot:trigger><span class="text-muted">Sort:</span><span x-text="sortLabel">Newest first</span></x-slot:trigger>
                    </x-markas.dropdown-menu>
                  </div>
                  <ul role="list" class="grid gap-4 sm:grid-cols-2">
                    <template x-for="deal in sortedHistory" :key="deal.id">
                      <li :data-deal="deal.id" class="{{ $dealBase }}" :class="selectedDeal === deal.id ? cls.dealSelected : cls.dealIdle">
                        <time :datetime="deal.date" class="text-xs font-medium" :class="selectedDeal === deal.id ? 'text-on-primary/80' : 'text-muted'" x-text="shortDate(deal.date)"></time>
                        <h3 class="text-sm leading-snug font-semibold"><button type="button" class="{{ $selectable }}" :aria-pressed="selectedDeal === deal.id ? 'true' : 'false'" @click="selectedDeal = deal.id" x-text="deal.title"></button></h3>
                        <p class="mt-auto text-xl font-semibold tracking-tight tabular-nums" x-text="rupiah(deal.value)"></p>
                        <div class="flex items-center justify-between gap-2">
                          <div class="flex -space-x-1"><template x-for="member in deal.team" :key="member">{{ $avatar('member', 'size-8 text-xs', 'ring-2 ring-surface') }}</template></div>
                          <span class="text-xs font-medium" :class="selectedDeal === deal.id ? 'text-on-primary/80' : 'text-muted'" x-text="deal.stage"></span>
                        </div>
                      </li>
                    </template>
                  </ul>
                </div>
              </x-markas.card>
              <x-markas.card aria-labelledby="crm-funnel-title">
                <div class="grid gap-4">
                  <div class="{{ $headRow }}">{{ $head('crm-funnel-title', 'Stage funnel', 'Open pipeline by stage') }}</div>
                  <x-markas.tabs :items="array_map(fn ($mode) => $mode['label'], $funnel)" default-value="weighted">
                    @foreach ($funnel as $mode => $data)
                      <x-slot :name="$mode">
                        <div class="grid gap-4">
                          <div>
                            <p class="text-2xl font-semibold tracking-tight tabular-nums">{{ $data['total'] }}</p>
                            <p class="text-xs text-muted">{{ $data['caption'] }}</p>
                          </div>
                          <ol class="grid gap-3" aria-label="{{ $data['caption'] }} by stage">
                            @foreach ($data['steps'] as $index => $step)
                              <li class="grid gap-1.5">
                                <div class="flex items-baseline justify-between gap-3">
                                  <span class="font-medium">{{ $step['label'] }}<span class="ml-2 text-xs font-normal text-muted">{{ $step['deals'] }} deals</span></span>
                                  <span class="font-semibold tabular-nums">{{ $step['value'] }}</span>
                                </div>
                                <div class="h-6 rounded-md bg-subtle"><div class="mx-auto h-6 rounded-md {{ $barTones[$index] }}" style="width: {{ $step['width'] }}%"></div></div>
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

            <div class="grid content-start gap-6">
              <x-markas.card aria-labelledby="crm-profile-name">
                <div class="grid justify-items-center gap-4 text-center">
                  <span role="img" :aria-label="fullName" class="{{ $avatarBase }} size-12 text-base size-16! text-xl!" x-text="initials(fullName)"></span>
                  <div class="grid gap-1">
                    <h2 id="crm-profile-name" class="text-lg font-semibold" x-text="fullName"></h2>
                    <p class="text-sm text-muted" x-text="customer.role"></p>
                    <p class="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
                      <span x-text="customer.company"></span>
                      @foreach ($tierVariant as $tier => $variant)
                        <x-markas.badge :variant="$variant" x-show="customer.tier === {{ Js::from($tier) }}">{{ $tier }}</x-markas.badge>
                      @endforeach
                    </p>
                  </div>
                  <div class="flex justify-center gap-3">
                    @foreach ($profileActions as $label => $name)
                      <button type="button" aria-label="{{ $label }}" class="{{ $iconButton }}" @click="notify({{ $js($label) }}, fullName + ', ' + customer.company)">{{ $icon($name) }}</button>
                    @endforeach
                  </div>
                </div>
              </x-markas.card>

              <x-markas.card aria-labelledby="crm-details-title">
                <div class="grid gap-4">
                  <div class="{{ $headRow }}">
                    {{ $head('crm-details-title', 'Detailed information', 'Updated Nov 3, 2026', null, "'Updated ' + customer.lastContacted") }}
                    <x-markas.drawer title="Edit customer details" x-on:close="onDrawerClose($event.currentTarget)">
                      <x-slot:trigger>
                        <x-markas.button variant="secondary" size="sm" x-on:click="draft = { ...customer }">
                          {{ $icon('pencil', 'size-4') }}
                          Edit
                        </x-markas.button>
                      </x-slot:trigger>
                      <div class="grid gap-4">
                        @foreach ($formFields as $field)
                          <x-markas.input :label="$field['label']" :type="$field['type']" :name="$field['key']" x-model="draft.{{ $field['key'] }}" />
                        @endforeach
                      </div>
                      <x-slot:footer>
                        <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
                        <x-markas.button type="submit" value="save">Save changes</x-markas.button>
                      </x-slot:footer>
                    </x-markas.drawer>
                  </div>
                  <dl class="divide-y divide-line">
                    @foreach ($infoRows as $key => $label)
                      <div class="flex items-center justify-between gap-4 py-3">
                        <dt class="shrink-0 text-muted">{{ $label }}</dt>
                        <dd class="min-w-0 truncate text-right font-medium" x-text="customer.{{ $key }}"></dd>
                      </div>
                    @endforeach
                  </dl>
                </div>
              </x-markas.card>
            </div>
          </div>
        </div>
      </template>

      {{-- Deals --}}
      <template x-if="page === 'deals'">
        <div
          class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"
          x-data="{
            deals: {{ $js($pipeline) }},
            selectedId: 'k1',
            get deal() {
              return this.deals.find((item) => item.id === this.selectedId);
            },
            column(stage) {
              return this.deals.filter((item) => item.stage === stage);
            },
            total(stage) {
              return this.column(stage).reduce((sum, item) => sum + item.value, 0);
            },
            moveTo(stage) {
              const title = this.deal.title;
              if (stage === this.deal.stage) return this.notify('Already in ' + stage, title);
              this.deals = this.deals.map((item) => (item.id === this.selectedId ? { ...item, stage } : item));
              this.notify('Moved to ' + stage, title, 'success');
            },
          }"
        >
          <div class="grid content-start gap-4 md:grid-cols-2 lg:grid-cols-4">
            @foreach ($stages as $stage)
              <section aria-labelledby="crm-stage-{{ $stage }}" data-stage="{{ $stage }}" class="grid content-start gap-3 rounded-2xl bg-subtle p-3">
                <div class="px-1">
                  <h2 id="crm-stage-{{ $stage }}" class="flex items-center justify-between gap-2 text-sm font-semibold">{{ $stage }}<span class="rounded-full bg-surface px-2 text-xs font-medium tabular-nums" x-text="column({{ $js($stage) }}).length"></span></h2>
                  <p data-total class="text-xs text-muted tabular-nums" x-text="rupiah(total({{ $js($stage) }}))"></p>
                </div>
                <template x-for="item in column({{ $js($stage) }})" :key="item.id">
                  <article class="{{ $kanbanCard }}" :class="item.id === selectedId ? cls.kanbanSelected : cls.kanbanIdle">
                    <h3 class="text-sm leading-snug font-semibold"><button type="button" class="{{ $selectable }}" :aria-pressed="item.id === selectedId ? 'true' : 'false'" @click="selectedId = item.id" x-text="item.title"></button></h3>
                    <p class="-mt-2 truncate text-xs text-muted" x-text="item.company"></p>
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-sm font-semibold tabular-nums" x-text="rupiah(item.value)"></span>
                      <span role="img" :aria-label="item.owner" class="{{ $avatarBase }} size-8 text-xs size-6! text-[10px]!" x-text="initials(item.owner)"></span>
                    </div>
                  </article>
                </template>
                <p class="rounded-xl border border-dashed border-line p-3 text-center text-xs text-muted" x-show="column({{ $js($stage) }}).length === 0">No deals</p>
              </section>
            @endforeach
          </div>
          <x-markas.card aria-labelledby="crm-deal-title" class="content-start">
            <div class="grid gap-4">
              <div class="{{ $headRow }}">{{ $head('crm-deal-title', 'Deal details', '', null, 'deal.company') }}</div>
              <div class="grid gap-1">
                <p class="font-semibold" x-text="deal.title"></p>
                <p class="text-2xl font-semibold tracking-tight tabular-nums" x-text="rupiah(deal.value)"></p>
              </div>
              <dl class="divide-y divide-line">
                @foreach (['stage' => 'Stage', 'owner' => 'Owner', 'due' => 'Expected close'] as $key => $label)
                  <div class="flex items-center justify-between gap-4 py-3">
                    <dt class="shrink-0 text-muted">{{ $label }}</dt>
                    <dd class="min-w-0 truncate text-right font-medium" x-text="deal.{{ $key }}"></dd>
                  </div>
                @endforeach
              </dl>
              <x-markas.dropdown-menu :items="$stageItems" label="Move to stage" class="[&>button]:w-full" x-on:markas-select="moveTo($event.detail)" />
            </div>
          </x-markas.card>
        </div>
      </template>

      {{-- Finance --}}
      <template x-if="page === 'finance'">
        <div
          class="grid gap-6"
          x-data="{
            sort: { key: 'due', dir: 1 },
            invoices: {{ $js($invoices) }},
            icons: {{ $js(['up' => $icons['up'], 'sort' => $icons['sort']]) }},
            get rows() {
              const { key, dir } = this.sort;
              return [...this.invoices].sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) * dir);
            },
            sortBy(key) {
              this.sort = { key, dir: this.sort.key === key ? -this.sort.dir : 1 };
            },
            ariaSort(key) {
              return this.sort.key === key ? (this.sort.dir === 1 ? 'ascending' : 'descending') : null;
            },
            remindOverdue() {
              const overdue = this.invoices.filter((invoice) => invoice.status === 'Overdue');
              const total = overdue.reduce((sum, item) => sum + item.amount, 0);
              this.notify('Reminders sent', overdue.length + ' overdue invoices, ' + this.rupiah(total), 'success');
            },
          }"
        >
          <dl class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            @foreach ($financeStats as $stat)
              <div class="{{ $tile }}">
                <dt class="text-xs text-muted">{{ $stat['label'] }}</dt>
                <dd class="mt-1 flex flex-wrap items-center gap-2"><span class="text-lg font-semibold tracking-tight tabular-nums">{{ $stat['value'] }}</span></dd>
                <dd class="text-xs text-muted">{{ $stat['note'] }}</dd>
              </div>
            @endforeach
          </dl>
          <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <x-markas.card aria-labelledby="crm-invoices-title">
              <div class="grid gap-4">
                <div class="{{ $headRow }}">
                  {{ $head('crm-invoices-title', 'Invoices', 'Sort by customer, due date, or amount') }}
                  <x-markas.button size="sm" x-on:click="remindOverdue()">
                    {{ $icon('send', 'size-4') }}
                    Send reminders
                  </x-markas.button>
                </div>
                <div tabindex="0" role="region" aria-label="Invoices" class="{{ $tableWrap }}">
                  <table class="w-full border-collapse text-sm">
                    <thead>
                      <tr class="bg-subtle text-left text-muted">
                        <th scope="col" class="{{ $th }}">Invoice</th>
                        @foreach ($invoiceColumns as $column)
                          <th scope="col" class="{{ $th }} {{ $column['align'] }}" :aria-sort="ariaSort({{ $js($column['key']) }})">
                            <button type="button" class="{{ $thButton }}" @click="sortBy({{ $js($column['key']) }})">{{ $column['label'] }}<svg class="size-3.5" :class="sort.key === {{ $js($column['key']) }} && sort.dir === -1 && 'rotate-180'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{{ $icons[$column['key'] === 'due' ? 'up' : 'sort'] }}" :d="sort.key === {{ $js($column['key']) }} ? icons.up : icons.sort" /></svg></button>
                          </th>
                        @endforeach
                        <th scope="col" class="{{ $th }}">Status</th>
                        <th scope="col" class="{{ $th }}"><span class="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <template x-for="invoice in rows" :key="invoice.id">
                        <tr :data-row="invoice.id" class="h-14 border-t border-line hover:bg-subtle/50">
                          <td class="{{ $td }} font-medium" x-text="invoice.id"></td>
                          <td class="{{ $td }}" x-text="invoice.customer"></td>
                          <td class="{{ $td }} text-muted" x-text="shortDate(invoice.due)"></td>
                          <td class="{{ $td }} text-right font-medium tabular-nums" x-text="rupiah(invoice.amount)"></td>
                          <td class="{{ $td }}">@foreach ($statusVariant as $status => $variant)<x-markas.badge :variant="$variant" x-show="invoice.status === {{ Js::from($status) }}">{{ $status }}</x-markas.badge>@endforeach</td>
                          <td class="{{ $td }} text-right"><x-markas.button variant="ghost" size="sm" x-show="invoice.status !== 'Paid'" x-bind:aria-label="'Remind ' + invoice.id" x-on:click="notify('Reminder sent', invoice.id + ' to ' + invoice.customer)">Remind</x-markas.button></td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </x-markas.card>
            <x-markas.card aria-labelledby="crm-revenue-title" class="content-start">
              <div class="grid gap-4">
                <div class="{{ $headRow }}">{{ $head('crm-revenue-title', 'Revenue', 'Last 6 months, in million Rupiah') }}</div>
                @php $peak = max(array_column($revenue, 1)); @endphp
                <div role="img" aria-label="Monthly revenue: {{ implode(', ', array_map(fn ($bar) => $bar[0].' Rp '.$bar[1].' million', $revenue)) }}" class="flex h-56 items-stretch gap-2 sm:gap-3">
                  @foreach ($revenue as [$label, $value])
                    <div data-bar class="flex min-w-0 flex-1 flex-col gap-2">
                      <div class="relative flex-1">
                        <span class="absolute inset-x-0 hidden text-center text-xs font-medium tabular-nums sm:block" style="bottom: calc({{ $percentOf($value, $peak) }}% + 4px)">{{ $value }}</span>
                        <div class="absolute inset-x-0 bottom-0 rounded-md {{ $loop->last ? 'bg-primary' : 'bg-primary/30' }}" style="height: {{ $percentOf($value, $peak) }}%"></div>
                      </div>
                      <span class="truncate text-center text-xs text-muted">{{ $label }}</span>
                    </div>
                  @endforeach
                </div>
                <p class="text-sm text-muted">November is <span class="font-semibold text-ink">12.4%</span> above October.</p>
              </div>
            </x-markas.card>
          </div>
        </div>
      </template>

      {{-- Growth --}}
      <template x-if="page === 'growth'">
        <div x-data="{ periods: {{ $js($growthPeriods) }}, steps: {{ $js($funnelSteps) }}, sources: {{ $js($leadSources) }}, tones: {{ $js($sourceTones) }} }">
          <x-markas.tabs :items="$growthTabs" default-value="30d">
            @foreach ($growthPeriods as $key => $period)
              <x-slot :name="$key">
                <div class="grid gap-6" x-data="{ period: periods[{{ $js($key) }}] }">
                  <dl class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <template x-for="metric in period.metrics" :key="metric.label">
                      <div class="{{ $tile }}">
                        <dt class="text-xs text-muted" x-text="metric.label"></dt>
                        <dd class="mt-1 flex flex-wrap items-center gap-2"><span class="text-lg font-semibold tracking-tight tabular-nums" x-text="metric.value"></span><x-markas.badge variant="success"><span x-text="metric.badge"></span></x-markas.badge></dd>
                      </div>
                    </template>
                  </dl>
                  <div class="grid gap-6 lg:grid-cols-2">
                    <x-markas.card aria-labelledby="crm-funnel-{{ $key }}">
                      <div class="grid gap-4">
                        <div class="{{ $headRow }}">{{ $head('crm-funnel-'.$key, 'Acquisition funnel', 'Last '.$period['label']) }}</div>
                        <ol class="grid gap-3">
                          <template x-for="(count, index) in period.funnel" :key="index">
                            <li class="grid gap-1.5">
                              <div class="flex items-baseline justify-between gap-3">
                                <span class="font-medium" x-text="steps[index]"></span>
                                <span class="tabular-nums"><span class="font-semibold" x-text="count.toLocaleString('id-ID')"></span><template x-if="index > 0"><span class="ml-2 text-xs text-muted" x-text="percentOf(count, period.funnel[index - 1]) + '%'"></span></template></span>
                              </div>
                              <div class="h-3 rounded-full bg-subtle"><div class="h-3 rounded-full bg-primary" :style="'width: ' + Math.round(Math.sqrt(count / period.funnel[0]) * 100) + '%'"></div></div>
                            </li>
                          </template>
                        </ol>
                      </div>
                    </x-markas.card>
                    <x-markas.card aria-labelledby="crm-sources-{{ $key }}">
                      <div class="grid gap-4">
                        <div class="{{ $headRow }}">{{ $head('crm-sources-'.$key, 'Lead sources', 'Share of new leads') }}</div>
                        <div role="img" :aria-label="'Lead sources: ' + period.sources.map((share, index) => sources[index] + ' ' + share + '%').join(', ')" class="flex h-3 gap-1 overflow-hidden rounded-full">
                          <template x-for="(share, index) in period.sources" :key="index"><div :class="tones[index]" :style="'width: ' + share + '%'"></div></template>
                        </div>
                        <ul class="grid gap-3">
                          <template x-for="(share, index) in period.sources" :key="index">
                            <li class="flex items-center gap-3"><span class="size-2.5 rounded-full" :class="tones[index]" aria-hidden="true"></span><span class="flex-1" x-text="sources[index]"></span><span class="font-semibold tabular-nums" x-text="share + '%'"></span></li>
                          </template>
                        </ul>
                      </div>
                    </x-markas.card>
                  </div>
                </div>
              </x-slot>
            @endforeach
          </x-markas.tabs>
        </div>
      </template>

      {{-- Projects --}}
      <template x-if="page === 'projects'">
        <div
          class="grid gap-6"
          x-data="{
            filter: 'all',
            selectedId: 'p1',
            projects: {{ $js($projects) }},
            status: {{ $js(array_map(fn ($status) => $status['label'], $projectStatus)) }},
            get project() {
              return this.projects.find((item) => item.id === this.selectedId);
            },
            get visible() {
              return this.projects.filter((item) => this.filter === 'all' || item.status === this.filter);
            },
          }"
        >
          <dl class="grid gap-3 sm:grid-cols-3">
            @foreach ($projectStats as $stat)
              <div class="{{ $tile }}">
                <dt class="text-xs text-muted">{{ $stat['label'] }}</dt>
                <dd class="mt-1 flex flex-wrap items-center gap-2"><span class="text-lg font-semibold tracking-tight tabular-nums">{{ $stat['value'] }}</span><x-markas.badge :variant="$stat['variant']">{{ $stat['badge'] }}</x-markas.badge></dd>
              </div>
            @endforeach
          </dl>
          <x-markas.card aria-labelledby="crm-projects-title">
            <div class="grid gap-4">
              <div class="{{ $headRow }}">
                {{ $head('crm-projects-title', 'All projects', count($projects).' projects', null, "plural(visible.length, 'project')") }}
                {{-- Toggle Group Blade menyimpan pilihan di state sendiri, jadi disalin ke filter halaman. --}}
                <x-markas.toggle-group label="Filter by status" :items="$projectFilters" value="all" x-effect="if (selected.length) filter = selected[0]; else selected = [filter]" />
              </div>
              <x-markas.drawer title="Project details">
                <x-slot:trigger>
                  <ul class="-mx-3 grid gap-1">
                    <template x-for="item in visible" :key="item.id">
                      <li :data-project="item.id">
                        <button type="button" class="{{ $projectRow }}" @click="selectedId = item.id">
                          <span class="min-w-0"><span class="block truncate font-medium" x-text="item.name"></span><span class="block truncate text-xs text-muted" x-text="item.client"></span></span>
                          <span>@foreach ($projectStatus as $status => $meta)<x-markas.badge :variant="$meta['variant']" x-show="item.status === {{ Js::from($status) }}">{{ $meta['label'] }}</x-markas.badge>@endforeach</span>
                          <span class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                            <x-markas.progress :value="0" x-bind:id="'crm-progress-' + item.id" x-bind:value="item.progress" x-bind:aria-label="item.name + ' progress'" />
                            <span class="w-10 shrink-0 text-right text-xs text-muted tabular-nums" x-text="item.progress + '%'"></span>
                          </span>
                          <span class="text-xs text-muted md:text-right" x-text="'Due ' + item.due"></span>
                        </button>
                      </li>
                    </template>
                  </ul>
                </x-slot:trigger>
                <div class="grid gap-5 text-ink">
                  <div>
                    <h3 class="text-base font-semibold" x-text="project.name"></h3>
                    <p class="text-sm text-muted" x-text="project.client"></p>
                  </div>
                  <div class="grid gap-1.5">
                    <div class="flex justify-between text-sm"><span class="font-medium">Progress</span><span class="text-muted tabular-nums" x-text="project.progress + '%'"></span></div>
                    <x-markas.progress :value="$projects[0]['progress']" aria-label="Project progress" x-bind:value="project.progress" />
                  </div>
                  <dl class="divide-y divide-line">
                    @foreach (['Status' => 'status[project.status]', 'Lead' => 'project.lead', 'Due date' => 'project.due', 'Budget' => 'rupiah(project.budget)', 'Tasks' => 'project.tasks'] as $label => $expression)
                      <div class="flex items-center justify-between gap-4 py-3">
                        <dt class="shrink-0 text-muted">{{ $label }}</dt>
                        <dd class="min-w-0 truncate text-right font-medium" x-text="{{ $expression }}"></dd>
                      </div>
                    @endforeach
                  </dl>
                </div>
                <x-slot:footer>
                  <x-markas.button variant="secondary" type="submit">Close</x-markas.button>
                </x-slot:footer>
              </x-markas.drawer>
            </div>
          </x-markas.card>
        </div>
      </template>

      {{-- Calendar --}}
      <template x-if="page === 'calendar'">
        <div
          class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"
          x-data="{
            events: {{ $js($events) }},
            view: { year: 2026, month: 10 },
            selected: {{ $js($today) }},
            today: {{ $js($today) }},
            draft: { title: '', date: {{ $js($today) }}, time: '09:00', kind: 'Meeting' },
            tones: {{ $js($kindTones) }},
            get agenda() {
              return this.events[this.selected] ?? [];
            },
            {{-- Sel kalender bulan, minggu dimulai Senin. null untuk sel kosong di awal dan akhir bulan. --}}
            get cells() {
              const offset = (new Date(this.view.year, this.view.month, 1).getDay() + 6) % 7;
              const days = new Date(this.view.year, this.view.month + 1, 0).getDate();
              const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)];
              return [...cells, ...Array((7 - (cells.length % 7)) % 7).fill(null)];
            },
            dayIso(day) {
              const pad = (value) => String(value).padStart(2, '0');
              return this.view.year + '-' + pad(this.view.month + 1) + '-' + pad(day);
            },
            eventsOn(day) {
              return this.events[this.dayIso(day)] ?? [];
            },
            shiftMonth(step) {
              const next = new Date(this.view.year, this.view.month + step, 1);
              this.view = { year: next.getFullYear(), month: next.getMonth() };
            },
            onModalClose(dialog) {
              if (dialog.returnValue === 'save') {
                const title = this.draft.title.trim() || 'New event';
                const date = this.draft.date || this.selected;
                const [year, month] = date.split('-').map(Number);
                const added = { time: this.draft.time, title, kind: this.draft.kind };
                this.events = { ...this.events, [date]: [...(this.events[date] ?? []), added].sort((a, b) => a.time.localeCompare(b.time)) };
                this.selected = date;
                this.view = { year, month: month - 1 };
                this.notify('Event added', title + ', ' + this.longDate(date), 'success');
              }
              dialog.returnValue = '';
            },
          }"
        >
          <x-markas.card aria-labelledby="crm-month-title">
            <div class="grid gap-4">
              <div class="{{ $headRow }}">
                {{ $head('crm-month-title', 'November 2026', 'Meetings, calls, and visits', "monthNames[view.month] + ' ' + view.year") }}
                <div class="flex items-center gap-2">
                  <button type="button" aria-label="Previous month" class="{{ $iconButton }} size-8" @click="shiftMonth(-1)">{{ $icon('prev', 'size-4') }}</button>
                  <button type="button" aria-label="Next month" class="{{ $iconButton }} size-8" @click="shiftMonth(1)">{{ $icon('next', 'size-4') }}</button>
                  <x-markas.modal title="New event" x-on:close="onModalClose($event.currentTarget)">
                    <x-slot:trigger>
                      <x-markas.button size="sm" x-on:click="draft = { ...draft, title: '', date: selected }">
                        {{ $icon('plus', 'size-4') }}
                        New event
                      </x-markas.button>
                    </x-slot:trigger>
                    <div class="grid gap-4 sm:grid-cols-2">
                      <div class="sm:col-span-2"><x-markas.input label="Title" name="title" x-model="draft.title" /></div>
                      <x-markas.input label="Date" type="date" name="date" x-model="draft.date" />
                      <x-markas.input label="Time" type="time" name="time" x-model="draft.time" />
                      <x-markas.select label="Type" name="kind" x-model="draft.kind">
                        @foreach ($eventKinds as $kind)
                          <option>{{ $kind }}</option>
                        @endforeach
                      </x-markas.select>
                    </div>
                    <x-slot:footer>
                      <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
                      <x-markas.button type="submit" value="save">Add event</x-markas.button>
                    </x-slot:footer>
                  </x-markas.modal>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-line bg-line">
                @foreach ($weekdays as $weekday)
                  <span aria-hidden="true" class="bg-subtle py-2 text-center text-xs font-medium text-muted">{{ $weekday }}</span>
                @endforeach
                <template x-for="(day, index) in cells" :key="view.month + '-' + index">
                  <span :class="day === null ? 'bg-canvas' : 'contents'">
                    <template x-if="day !== null">
                      <button
                        type="button"
                        class="{{ $dayCell }}"
                        :class="dayIso(day) === selected ? 'bg-primary-soft' : 'bg-surface'"
                        :aria-pressed="dayIso(day) === selected ? 'true' : 'false'"
                        @click="selected = dayIso(day)"
                      >
                        <span class="sr-only" x-text="monthNames[view.month] + ' ' + day + ', ' + plural(eventsOn(day).length, 'event')"></span>
                        <span aria-hidden="true" class="{{ $dayNumber }}" :class="dayIso(day) === today && 'bg-primary text-on-primary'" x-text="day"></span>
                        <span class="size-1.5 rounded-full bg-primary sm:hidden" aria-hidden="true" x-show="eventsOn(day).length > 0"></span>
                        <template x-for="item in eventsOn(day).slice(0, 2)" :key="item.time + item.title">
                          <span class="{{ $chip }} hidden w-full sm:block" :class="tones[item.kind]" x-text="item.title"></span>
                        </template>
                        <span class="hidden text-xs text-muted sm:block" x-show="eventsOn(day).length > 2" x-text="'+' + (eventsOn(day).length - 2) + ' more'"></span>
                      </button>
                    </template>
                  </span>
                </template>
              </div>
            </div>
          </x-markas.card>
          <x-markas.card aria-labelledby="crm-agenda-title" class="content-start">
            <div class="grid gap-4">
              <div class="{{ $headRow }}">{{ $head('crm-agenda-title', 'Thursday, November 5', '2 events', 'longDate(selected)', "plural(agenda.length, 'event')") }}</div>
              <ul role="list" class="grid gap-2" x-show="agenda.length > 0">
                <template x-for="item in agenda" :key="item.time + item.title">
                  <li class="flex gap-3 rounded-xl border border-line p-3">
                    <span class="w-12 shrink-0 text-xs font-medium text-muted tabular-nums" x-text="item.time"></span>
                    <span class="grid min-w-0 flex-1 gap-1"><span class="text-sm font-medium" x-text="item.title"></span><span class="{{ $chip }} w-fit" :class="tones[item.kind]" x-text="item.kind"></span></span>
                  </li>
                </template>
              </ul>
              <p class="rounded-xl border border-dashed border-line p-4 text-sm text-muted" x-show="agenda.length === 0">No events on this day.</p>
            </div>
          </x-markas.card>
        </div>
      </template>

      {{-- Reports --}}
      <template x-if="page === 'reports'">
        <div
          class="grid gap-6"
          x-data="{
            periodId: 'month',
            periods: {{ $js($reportPeriods) }},
            get period() {
              return this.periods.find((item) => item.value === this.periodId);
            },
            get peak() {
              return Math.max(...this.period.bars.map((bar) => bar.value));
            },
            get repPeak() {
              return Math.max(...this.period.reps);
            },
          }"
        >
          <div class="flex flex-wrap items-end justify-between gap-3">
            <div class="w-full sm:w-56">
              <x-markas.select label="Period" x-model="periodId">
                @foreach ($reportPeriods as $item)
                  <option value="{{ $item['value'] }}">{{ $item['label'] }}</option>
                @endforeach
              </x-markas.select>
            </div>
            <x-markas.button variant="secondary" x-on:click="notify('Report exported', period.label + ' sales report (PDF)', 'success')">
              {{ $icon('download', 'size-4') }}
              Export PDF
            </x-markas.button>
          </div>
          <dl class="grid gap-3 sm:grid-cols-3">
            <template x-for="kpi in period.kpis" :key="kpi.label">
              <div class="{{ $tile }}">
                <dt class="text-xs text-muted" x-text="kpi.label"></dt>
                <dd class="mt-1 flex flex-wrap items-center gap-2"><span class="text-lg font-semibold tracking-tight tabular-nums" x-text="kpi.value"></span><x-markas.badge variant="success"><span x-text="kpi.badge"></span></x-markas.badge></dd>
              </div>
            </template>
          </dl>
          <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <x-markas.card aria-labelledby="crm-report-chart">
              <div class="grid gap-4">
                <div class="{{ $headRow }}">{{ $head('crm-report-chart', 'Revenue', 'This month, in million Rupiah', null, "period.label + ', in million Rupiah'") }}</div>
                <div role="img" :aria-label="'Revenue ' + period.label + ': ' + period.bars.map((bar) => bar.label + ' Rp ' + bar.value + ' million').join(', ')" class="flex h-56 items-stretch gap-2 sm:gap-3">
                  <template x-for="(bar, index) in period.bars" :key="periodId + bar.label">
                    <div data-bar class="flex min-w-0 flex-1 flex-col gap-2">
                      <div class="relative flex-1">
                        <span class="absolute inset-x-0 hidden text-center text-xs font-medium tabular-nums sm:block" :style="'bottom: calc(' + percentOf(bar.value, peak) + '% + 4px)'" x-text="bar.value"></span>
                        <div class="absolute inset-x-0 bottom-0 rounded-md" :class="index === period.bars.length - 1 ? 'bg-primary' : 'bg-primary/30'" :style="'height: ' + percentOf(bar.value, peak) + '%'"></div>
                      </div>
                      <span class="truncate text-center text-xs text-muted" x-text="bar.label"></span>
                    </div>
                  </template>
                </div>
              </div>
            </x-markas.card>
            <x-markas.card aria-labelledby="crm-report-reps" class="content-start">
              <div class="grid gap-4">
                <div class="{{ $headRow }}">{{ $head('crm-report-reps', 'Top sales reps', 'Revenue in million Rupiah') }}</div>
                <ol class="grid gap-4">
                  @foreach ($reps as $index => $rep)
                    <li class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5">
                      <x-markas.avatar :name="$rep" size="sm" class="row-span-2" />
                      <span class="truncate font-medium">{{ $rep }}</span>
                      <span class="font-semibold tabular-nums" x-text="period.reps[{{ $index }}].toLocaleString('id-ID')"></span>
                      <div class="col-span-2 h-1.5 rounded-full bg-subtle"><div class="h-1.5 rounded-full bg-primary" :style="'width: ' + percentOf(period.reps[{{ $index }}], repPeak) + '%'"></div></div>
                    </li>
                  @endforeach
                </ol>
              </div>
            </x-markas.card>
          </div>
        </div>
      </template>

      {{-- Files --}}
      <template x-if="page === 'files'">
        <div
          x-data="{
            query: '',
            view: 'grid',
            files: {{ $js($files) }},
            views: {{ $js($fileViews) }},
            kinds: {{ $js($kindColors) }},
            get visible() {
              return this.files.filter((file) => file.name.toLowerCase().includes(this.query.trim().toLowerCase()));
            },
          }"
        >
        <x-markas.card aria-labelledby="crm-files-title">
          <div class="grid gap-4">
            <div class="{{ $headRow }}">
              {{ $head('crm-files-title', 'Shared files', '8 of 8 files', null, "visible.length + ' of ' + files.length + ' files'") }}
              <x-markas.button size="sm" x-on:click="notify('Upload started', 'Choose a file to add to Shared files')">
                {{ $icon('upload', 'size-4') }}
                Upload
              </x-markas.button>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <div class="relative min-w-0 flex-1 sm:max-w-sm">
                {{ $icon('search', 'pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted') }}
                <x-markas.input type="search" aria-label="Search files" placeholder="Search files" class="pl-9" x-model="query" />
              </div>
              {{-- Toggle Group Blade menyimpan pilihan di state sendiri, jadi disalin ke tampilan halaman. --}}
              <x-markas.toggle-group label="View" :items="$viewOptions" value="grid" x-effect="if (selected.length) view = selected[0]; else selected = [view]">
                <x-slot:grid>{{ $icon('grid') }}</x-slot:grid>
                <x-slot:list>{{ $icon('list') }}</x-slot:list>
              </x-markas.toggle-group>
            </div>
            <ul role="list" :data-view="view" :class="views[view].list" x-show="visible.length > 0">
              <template x-for="file in visible" :key="file.name">
                <li :class="views[view].item">
                  <span class="{{ $fileKind }}" :class="kinds[file.kind]" x-text="file.kind"></span>
                  <span class="min-w-0 flex-1"><span class="block truncate font-medium" x-text="file.name"></span><span class="block truncate text-xs text-muted" x-text="file.owner"></span></span>
                  <span class="text-xs text-muted tabular-nums" x-text="file.size + ', ' + file.updated"></span>
                </li>
              </template>
            </ul>
            <p class="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted" x-show="visible.length === 0">No files match your search.</p>
          </div>
        </x-markas.card>
        </div>
      </template>

      {{-- Settings --}}
      <template x-if="page === 'settings'">
        <form
          class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]"
          x-data="{
            profile: {{ $js($profile) }},
            prefs: {{ $js($defaultPrefs) }},
            options: {{ $js($notificationOptions) }},
            reset() {
              this.profile = {{ $js($profile) }};
              this.prefs = {{ $js($defaultPrefs) }};
            },
          }"
          @submit.prevent="notify('Settings saved', profile.firstName + ' ' + profile.lastName + ', ' + prefs.length + ' notifications on', 'success')"
        >
          <x-markas.card aria-labelledby="crm-profile-title" class="content-start">
            <div class="grid gap-4">
              <div class="{{ $headRow }}">{{ $head('crm-profile-title', 'Profile', 'How teammates and customers see you') }}</div>
              <div class="grid gap-4 sm:grid-cols-2">
                @foreach ($profileFields as $field)
                  <x-markas.input :label="$field['label']" :type="$field['type']" :name="$field['key']" x-model="profile.{{ $field['key'] }}" />
                @endforeach
                <x-markas.select label="Role" name="role" x-model="profile.role">
                  @foreach ($roles as $role)
                    <option>{{ $role }}</option>
                  @endforeach
                </x-markas.select>
              </div>
            </div>
          </x-markas.card>
          <x-markas.card aria-labelledby="crm-notify-title" class="content-start">
            <div class="grid gap-4">
              <div class="{{ $headRow }}">{{ $head('crm-notify-title', 'Notifications', 'Choose what reaches your inbox') }}</div>
              <ul class="divide-y divide-line">
                <template x-for="option in options" :key="option.key">
                  <li class="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p class="font-medium" x-text="option.label"></p>
                      <p class="text-xs text-muted" x-text="option.description"></p>
                    </div>
                    <x-markas.switch x-bind:id="'crm-pref-' + option.key" x-bind:aria-label="option.label" x-bind:name="option.key" x-bind:value="option.key" x-model="prefs" />
                  </li>
                </template>
              </ul>
              <div class="flex justify-end gap-2">
                <x-markas.button variant="secondary" type="button" x-on:click="reset()">Reset</x-markas.button>
                <x-markas.button type="submit">Save changes</x-markas.button>
              </div>
            </div>
          </x-markas.card>
        </form>
      </template>
    </main>
  </div>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
