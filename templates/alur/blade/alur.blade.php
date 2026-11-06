@php
    use Illuminate\Support\HtmlString;

    $icons = [
        'home' => 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
        'flow' => 'M3 4h6v6H3zM15 14h6v6h-6zM6 10v4a3 3 0 0 0 3 3h6',
        'layout' => 'M4 3h16a1 1 0 0 1 1 1v5H3V4a1 1 0 0 1 1-1M3 13h8v8H4a1 1 0 0 1-1-1zM15 13h6v7a1 1 0 0 1-1 1h-5z',
        'tool' => 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z',
        'book' => 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
        'store' => 'M3 9l1.5-5h15L21 9M3 9h18M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v8h14v-8',
        'more' => 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2',
        'dots' => 'M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2',
        'bell' => 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
        'panel' => 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2M9 3v18',
        'search' => 'm21 21-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16',
        'plus' => 'M12 5v14M5 12h14',
        'star' => 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
        'trash' => 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6',
        'sliders' => 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
        'chevron' => 'm6 9 6 6 6-6',
        'menu' => 'M4 6h16M4 12h16M4 18h16',
        'play' => 'M7 4v16l13-8z',
        'mail' => 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6',
        'chat' => 'M7.9 20A9 9 0 1 0 4 16.1L2 22z',
        'sheets' => 'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1M3 9h18M3 15h18M9 3v18',
        'calendar' => 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2',
        'notes' => 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
    ];
    $svgOpen = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    $icon = fn (string $name, string $class = 'size-5') => new HtmlString($svgOpen.' class="'.$class.'"><path d="'.$icons[$name].'" /></svg>');
    // Ikon dengan path dari ekspresi Alpine dan class tambahan opsional dari ekspresi.
    $iconBind = fn (string $expr, string $class, string $classBind = '') => new HtmlString($svgOpen.' class="'.$class.'"'.($classBind ? ' :class="'.e($classBind).'"' : '').'><path :d="icons['.e($expr).']" /></svg>');

    // Palet lokal untuk kartu, sampul, avatar, dan ikon integrasi. Hex hanya boleh di sini.
    $palette = implode(' ', [
        '[--tpl-violet:#ece6fd] [--tpl-blue:#e0ebfb] [--tpl-peach:#fde6d6] [--tpl-sun:#e9a100]',
        '[--tpl-sky:#d6e4f0] [--tpl-sea:#7fa6c9] [--tpl-deep:#355f86] [--tpl-fog:#eef1f3] [--tpl-lilac:#d4c6f4] [--tpl-plum:#7b5fc9]',
        '[--tpl-dusk:#f3c0cf] [--tpl-stone:#9aa1a8] [--tpl-mint:#d3efdf] [--tpl-moss:#4d9873] [--tpl-amber:#f8d892] [--tpl-rust:#d8774b]',
        '[--tpl-a1:#cfdcf6] [--tpl-a2:#f7d3c0] [--tpl-a3:#d0eadb] [--tpl-a4:#e2d6f8] [--tpl-a5:#f4e3ad]',
        '[--tpl-red:#e5484d] [--tpl-indigo:#5b5bd6] [--tpl-green:#2f9e6a] [--tpl-orange:#ee7a2b] [--tpl-teal:#1a9a9a] [--tpl-glyph:#ffffff]',
        'dark:[--tpl-violet:#2a2440] dark:[--tpl-blue:#1d2a3c] dark:[--tpl-peach:#3a2a21] dark:[--tpl-sun:#f5c542]',
        'dark:[--tpl-sky:#2a4258] dark:[--tpl-sea:#2c5677] dark:[--tpl-deep:#132b42] dark:[--tpl-fog:#30363b] dark:[--tpl-lilac:#3f3468] dark:[--tpl-plum:#56409a]',
        'dark:[--tpl-dusk:#5b3448] dark:[--tpl-stone:#596066] dark:[--tpl-mint:#1f3d2f] dark:[--tpl-moss:#2f6e50] dark:[--tpl-amber:#5d4a1f] dark:[--tpl-rust:#8a4628]',
        'dark:[--tpl-a1:#2c3f5c] dark:[--tpl-a2:#5a3a2a] dark:[--tpl-a3:#284a37] dark:[--tpl-a4:#41345f] dark:[--tpl-a5:#53461f]',
        'dark:[--tpl-red:#d93f45] dark:[--tpl-indigo:#6e6ade] dark:[--tpl-green:#2a8f60] dark:[--tpl-orange:#e06e22] dark:[--tpl-teal:#178c8c] dark:[--tpl-glyph:#ffffff]',
    ]);
    // Sampul abstrak deterministik: gradien berlapis dari palet lokal.
    $covers = [
        'bg-[image:radial-gradient(80%_60%_at_15%_100%,var(--tpl-deep),transparent_70%),radial-gradient(60%_50%_at_85%_15%,var(--tpl-fog),transparent_70%),linear-gradient(180deg,var(--tpl-sky),var(--tpl-sea))]',
        'bg-[image:radial-gradient(70%_70%_at_80%_20%,var(--tpl-dusk),transparent_65%),radial-gradient(90%_60%_at_10%_100%,var(--tpl-plum),transparent_70%),linear-gradient(160deg,var(--tpl-lilac),var(--tpl-plum))]',
        'bg-[image:radial-gradient(60%_60%_at_30%_30%,var(--tpl-fog),transparent_70%),radial-gradient(80%_70%_at_90%_100%,var(--tpl-stone),transparent_70%),linear-gradient(135deg,var(--tpl-fog),var(--tpl-stone))]',
        'bg-[image:radial-gradient(120%_60%_at_20%_110%,var(--tpl-moss),transparent_60%),radial-gradient(100%_50%_at_90%_100%,var(--tpl-mint),transparent_70%),linear-gradient(180deg,var(--tpl-fog),var(--tpl-mint))]',
        'bg-[image:radial-gradient(40%_45%_at_70%_40%,var(--tpl-amber),transparent_70%),linear-gradient(180deg,var(--tpl-peach),var(--tpl-rust))]',
        'bg-[image:radial-gradient(70%_60%_at_20%_20%,var(--tpl-dusk),transparent_70%),linear-gradient(200deg,var(--tpl-lilac),var(--tpl-sea))]',
        'bg-[image:radial-gradient(90%_50%_at_50%_100%,var(--tpl-sea),transparent_70%),linear-gradient(180deg,var(--tpl-fog),var(--tpl-sky))]',
    ];
    $folderTones = [
        ['bg' => 'bg-(--tpl-violet)', 'ring' => 'ring-(--tpl-violet)'],
        ['bg' => 'bg-(--tpl-blue)', 'ring' => 'ring-(--tpl-blue)'],
        ['bg' => 'bg-(--tpl-peach)', 'ring' => 'ring-(--tpl-peach)'],
    ];
    $avatarTones = ['bg-(--tpl-a1)', 'bg-(--tpl-a2)', 'bg-(--tpl-a3)', 'bg-(--tpl-a4)', 'bg-(--tpl-a5)'];
    $apps = [
        'mail' => ['label' => 'Mail', 'tone' => 'bg-(--tpl-red)'],
        'chat' => ['label' => 'Chat', 'tone' => 'bg-(--tpl-indigo)'],
        'sheets' => ['label' => 'Sheets', 'tone' => 'bg-(--tpl-green)'],
        'calendar' => ['label' => 'Calendar', 'tone' => 'bg-(--tpl-orange)'],
        'notes' => ['label' => 'Notes', 'tone' => 'bg-(--tpl-teal)'],
    ];

    $pages = [
        'home' => ['label' => 'Home', 'title' => 'Good morning, Andi', 'icon' => 'home'],
        'workflows' => ['label' => 'My Workflows', 'title' => 'My Workflows', 'icon' => 'flow'],
        'templates' => ['label' => 'Templates', 'title' => 'Templates', 'icon' => 'layout'],
        'tools' => ['label' => 'Tools', 'title' => 'Tools', 'icon' => 'tool'],
        'knowledge' => ['label' => 'Knowledge Base', 'title' => 'Knowledge Base', 'icon' => 'book'],
        'marketplace' => ['label' => 'Marketplace', 'title' => 'Marketplace', 'icon' => 'store'],
        'notifications' => ['label' => 'Notifications', 'title' => 'Notifications', 'icon' => 'bell'],
        'trash' => ['label' => 'Trash', 'title' => 'Trash', 'icon' => 'trash'],
        'settings' => ['label' => 'Settings', 'title' => 'Settings', 'icon' => 'sliders'],
    ];
    $defaultPage = 'workflows';
    $mainNav = ['home', 'workflows', 'templates', 'tools', 'knowledge', 'marketplace'];
    $moreNav = ['trash', 'settings'];

    $workflows = [
        ['id' => 'w1', 'name' => 'Email Responder', 'status' => 'active', 'days' => 1, 'runs' => 12, 'cover' => 0, 'folder' => 'f1', 'tags' => ['Productivity', 'Clients'], 'apps' => ['mail', 'chat', 'notes'], 'team' => ['Andi Wijaya', 'Rina Kusuma', 'Budi Santoso']],
        ['id' => 'w2', 'name' => 'Mental Health Tracker', 'status' => 'active', 'days' => 2, 'runs' => 4, 'cover' => 1, 'folder' => 'f2', 'tags' => ['Personal'], 'apps' => ['notes', 'calendar'], 'team' => ['Sari Wulandari', 'Dewi Lestari']],
        ['id' => 'w3', 'name' => 'Budgeting', 'status' => 'paused', 'days' => 3, 'runs' => 8, 'cover' => 2, 'folder' => 'f3', 'tags' => ['Finance', 'Personal'], 'apps' => ['sheets', 'mail'], 'team' => ['Agus Pratama', 'Dewi Lestari', 'Fajar Nugroho']],
        ['id' => 'w4', 'name' => 'Habit Tracker', 'status' => 'draft', 'days' => 6, 'runs' => 2, 'cover' => 3, 'folder' => 'f2', 'tags' => ['Personal', 'Productivity'], 'apps' => ['calendar'], 'team' => ['Maya Putri']],
        ['id' => 'w5', 'name' => 'Idea Vault', 'status' => 'active', 'days' => 12, 'runs' => 6, 'cover' => 4, 'folder' => 'f2', 'tags' => ['Productivity'], 'apps' => ['notes', 'chat'], 'team' => ['Rina Kusuma', 'Hendra Gunawan']],
        ['id' => 'w6', 'name' => 'Package Tracker', 'status' => 'paused', 'days' => 20, 'runs' => 3, 'cover' => 5, 'folder' => 'f1', 'tags' => ['Personal'], 'apps' => ['mail', 'sheets'], 'team' => ['Budi Santoso']],
        ['id' => 'w7', 'name' => 'Client Onboarding', 'status' => 'active', 'days' => 45, 'runs' => 9, 'cover' => 6, 'folder' => 'f3', 'tags' => ['Clients', 'Finance'], 'apps' => ['mail', 'calendar', 'sheets', 'chat'], 'team' => ['Andi Wijaya', 'Maya Putri', 'Yusuf Hidayat']],
    ];
    $trash = [
        ['id' => 'w8', 'name' => 'Newsletter Digest', 'status' => 'paused', 'days' => 60, 'runs' => 0, 'cover' => 2, 'folder' => 'f2', 'tags' => ['Productivity'], 'apps' => ['mail'], 'team' => ['Andi Wijaya']],
    ];
    $folders = [
        ['id' => 'f1', 'name' => 'Task Automation', 'items' => 5, 'tone' => 0, 'team' => ['Andi Wijaya', 'Rina Kusuma', 'Budi Santoso']],
        ['id' => 'f2', 'name' => 'Notes & Highlights', 'items' => 17, 'tone' => 1, 'team' => ['Sari Wulandari', 'Maya Putri']],
        ['id' => 'f3', 'name' => 'Billing & Invoicing', 'items' => 9, 'tone' => 2, 'team' => ['Dewi Lestari', 'Agus Pratama', 'Fajar Nugroho']],
    ];
    $tags = ['Productivity', 'Finance', 'Personal', 'Clients'];
    $option = fn (string $label, ?string $value = null) => ['label' => $label, 'value' => $value ?? $label];
    $filterDefs = [
        ['key' => 'status', 'label' => 'Status', 'items' => [$option('All', 'all'), $option('Active', 'active'), $option('Paused', 'paused'), $option('Draft', 'draft')]],
        ['key' => 'app', 'label' => 'Integrations', 'items' => [$option('Any', 'any'), ...array_map(fn ($id) => $option($apps[$id]['label'], $id), array_keys($apps))]],
        ['key' => 'date', 'label' => 'Date', 'items' => [$option('Any', 'any'), $option('Last 3 days', '3'), $option('Last 7 days', '7'), $option('Last 30 days', '30')]],
        ['key' => 'tag', 'label' => 'Tags', 'items' => [$option('All', 'all'), ...array_map(fn ($tag) => $option($tag), $tags)]],
    ];
    $workflowMenu = [$option('Rename', 'rename'), $option('Duplicate', 'duplicate'), ['separator' => true], ['label' => 'Delete', 'value' => 'delete', 'danger' => true]];
    $folderMenu = [$option('Rename', 'rename'), ['separator' => true], ['label' => 'Delete', 'value' => 'delete', 'danger' => true]];

    $runs = [
        ['id' => 'r1', 'workflow' => 'Email Responder', 'time' => '09:12', 'duration' => '14 s', 'ok' => true],
        ['id' => 'r2', 'workflow' => 'Budgeting', 'time' => '08:40', 'duration' => '6 s', 'ok' => false],
        ['id' => 'r3', 'workflow' => 'Idea Vault', 'time' => '08:05', 'duration' => '9 s', 'ok' => true],
        ['id' => 'r4', 'workflow' => 'Client Onboarding', 'time' => 'Yesterday', 'duration' => '32 s', 'ok' => true],
        ['id' => 'r5', 'workflow' => 'Package Tracker', 'time' => 'Yesterday', 'duration' => '11 s', 'ok' => false],
        ['id' => 'r6', 'workflow' => 'Mental Health Tracker', 'time' => 'Nov 3', 'duration' => '5 s', 'ok' => true],
    ];
    $runFilters = [$option('All runs', 'all'), $option('Succeeded', 'ok'), $option('Failed', 'failed')];
    $templates = [
        ['id' => 't1', 'name' => 'Invoice Chaser', 'tag' => 'Finance', 'cover' => 4, 'apps' => ['mail', 'sheets'], 'text' => 'Reminds clients about unpaid invoices every Monday.'],
        ['id' => 't2', 'name' => 'Meeting Notes', 'tag' => 'Productivity', 'cover' => 6, 'apps' => ['calendar', 'notes'], 'text' => 'Turns every calendar meeting into a shared note.'],
        ['id' => 't3', 'name' => 'Weekly Review', 'tag' => 'Personal', 'cover' => 1, 'apps' => ['notes'], 'text' => 'Collects your highlights into one Friday summary.'],
        ['id' => 't4', 'name' => 'Lead Router', 'tag' => 'Clients', 'cover' => 0, 'apps' => ['mail', 'chat'], 'text' => 'Sends new leads to the right teammate in chat.'],
        ['id' => 't5', 'name' => 'Expense Splitter', 'tag' => 'Finance', 'cover' => 2, 'apps' => ['sheets', 'chat'], 'text' => 'Splits shared bills and posts who owes what.'],
        ['id' => 't6', 'name' => 'Reading List', 'tag' => 'Personal', 'cover' => 3, 'apps' => ['notes', 'mail'], 'text' => 'Saves links from your inbox to a reading list.'],
    ];
    $templateFilters = [$option('All', 'all'), ...array_map(fn ($tag) => $option($tag), $tags)];
    $tools = [
        ['id' => 'mail', 'text' => 'Send and read email from any inbox'],
        ['id' => 'chat', 'text' => 'Post messages to team channels'],
        ['id' => 'sheets', 'text' => 'Read and write spreadsheet rows'],
        ['id' => 'calendar', 'text' => 'Create events and reminders'],
        ['id' => 'notes', 'text' => 'Save highlights and meeting notes'],
    ];
    $articles = [
        ['title' => 'Build your first workflow', 'category' => 'Getting started', 'minutes' => 4],
        ['title' => 'Trigger a workflow from email', 'category' => 'Mail', 'minutes' => 6],
        ['title' => 'Use variables between steps', 'category' => 'Advanced', 'minutes' => 8],
        ['title' => 'Schedule runs with Calendar', 'category' => 'Calendar', 'minutes' => 5],
        ['title' => 'Share folders with your team', 'category' => 'Collaboration', 'minutes' => 3],
        ['title' => 'Understand credit usage', 'category' => 'Billing', 'minutes' => 4],
    ];
    $addons = [
        ['id' => 'm1', 'name' => 'Smart Summaries', 'maker' => 'Alur Labs', 'price' => 0, 'cover' => 1],
        ['id' => 'm2', 'name' => 'Invoice Parser', 'maker' => 'Kas Kecil', 'price' => 49000, 'cover' => 4],
        ['id' => 'm3', 'name' => 'Sentiment Check', 'maker' => 'Rasa Data', 'price' => 29000, 'cover' => 5],
        ['id' => 'm4', 'name' => 'Daily Digest', 'maker' => 'Alur Labs', 'price' => 0, 'cover' => 6],
        ['id' => 'm5', 'name' => 'Receipt Scanner', 'maker' => 'Struk Pintar', 'price' => 59000, 'cover' => 2],
        ['id' => 'm6', 'name' => 'Lead Enricher', 'maker' => 'Prospek', 'price' => 99000, 'cover' => 0],
    ];
    $notifications = [
        ['id' => 'n1', 'text' => 'Email Responder finished 12 runs this morning', 'time' => '09:12'],
        ['id' => 'n2', 'text' => 'Rina Kusuma commented on Client Onboarding', 'time' => '08:51'],
        ['id' => 'n3', 'text' => 'Budgeting paused after a Sheets error', 'time' => '08:40'],
        ['id' => 'n4', 'text' => 'Your credits renew on December 1', 'time' => 'Yesterday'],
        ['id' => 'n5', 'text' => 'Budi Santoso shared Notes & Highlights with you', 'time' => 'Nov 3'],
        ['id' => 'n6', 'text' => 'Idea Vault saved 6 new notes', 'time' => 'Nov 2'],
    ];
    $prefOptions = [
        ['key' => 'summary', 'label' => 'Email summaries', 'text' => 'A short report after every run'],
        ['key' => 'failures', 'label' => 'Run failure alerts', 'text' => 'Tell me when a workflow fails'],
        ['key' => 'digest', 'label' => 'Weekly digest', 'text' => 'Usage and credits every Monday'],
    ];

    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $navItem = 'flex h-9 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors duration-150 '.$focusRing;
    $iconButton = 'inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink '.$focusRing;
    $navBadge = 'ml-auto rounded-full bg-danger px-1.5 text-[11px] leading-5 font-semibold text-surface tabular-nums';
    $countBadge = 'rounded-full bg-subtle px-2 py-0.5 text-xs font-medium text-muted tabular-nums';
    $mono = 'font-mono text-[15px] font-semibold tracking-tight';
    $pill = 'shrink-0 [&>button]:h-8 [&>button]:gap-1 [&>button]:rounded-full [&>button]:px-3 [&>button]:text-[13px] [&>button>svg:last-child]:size-3.5';
    $kebab = 'relative z-10 [&>button]:size-8 [&>button]:rounded-full [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-0 [&>button]:text-muted [&>button]:hover:bg-ink/5 [&>button]:hover:text-ink [&>button>svg:last-child]:hidden';
    $selectable = 'text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary';
    $card = 'group relative flex flex-col rounded-2xl border border-line bg-surface p-1.5 transition-shadow duration-150 hover:shadow-overlay';
    $panel = 'rounded-2xl border border-line bg-surface p-5';
    $tile = 'rounded-2xl border border-line bg-surface px-4 py-3';
    $gridCols = 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3';
    $avatarBase = 'inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold tracking-tighter text-ink ring-2';
    $appBase = 'inline-flex size-6 items-center justify-center rounded-full text-(--tpl-glyph) ring-2 ring-surface';
    $empty = 'rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted';
    $classes = [
        'navActive' => 'bg-primary-soft text-ink',
        'navIdle' => 'text-muted hover:bg-subtle hover:text-ink',
        'starOn' => 'fill-(--tpl-sun) stroke-(--tpl-sun)',
        'avatarBase' => $avatarBase,
        'appBase' => $appBase,
        'readDot' => 'bg-line',
        'unreadDot' => 'bg-danger',
    ];

    // Data untuk Alpine sebagai literal objek JS dengan kutip tunggal, lebih ringkas daripada @js.
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

    // Avatar inisial dengan warna tetap per nama; nama dan ring dari ekspresi Alpine.
    $avatars = fn (string $team, string $ring) => new HtmlString(
        '<div class="flex -space-x-1"><template x-for="name in '.e($team).'" :key="name"><span role="img" :aria-label="name" :class="avatarClass(name, '.e($ring).')" x-text="initials(name)"></span></template></div>'
    );
    $appIcons = fn (string $list) => new HtmlString(
        '<div role="img" class="flex -space-x-1" :aria-label="\'Integrations: \' + appNames('.e($list).')"><template x-for="id in '.e($list).'" :key="id"><span :class="cls.appBase + \' \' + apps[id].tone">'.$iconBind('id', 'size-3.5').'</span></template></div>'
    );
    $sectionTitle = fn (string $id, string $title, string $count) => new HtmlString(
        '<h2 id="'.$id.'" class="flex items-center gap-2 text-base font-semibold">'.$title.'<span class="'.$countBadge.'" x-text="'.e($count).'"></span></h2>'
    );
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp

{{-- Isi sidebar dipakai di aside desktop dan Drawer menu mobile; form dialog menutup Drawer saat item dipilih. --}}
@php ob_start(); @endphp
<form method="dialog" class="grid gap-6">
  <nav aria-label="Main" class="grid gap-0.5">
    @foreach ($mainNav as $id)
      <button type="submit" class="{{ $navItem }}" :class="page === '{{ $id }}' ? cls.navActive : cls.navIdle" :aria-current="current('{{ $id }}')" @click="go('{{ $id }}')">{{ $icon($pages[$id]['icon'], 'size-4.5 shrink-0') }}<span class="truncate">{{ $pages[$id]['label'] }}</span></button>
    @endforeach
    <details class="group/more">
      <summary class="{{ $navItem }} {{ $classes['navIdle'] }} cursor-pointer list-none [&::-webkit-details-marker]:hidden">{{ $icon('more', 'size-4.5 shrink-0') }}More{{ $icon('chevron', 'ml-auto size-4 transition-transform duration-150 group-open/more:rotate-180') }}</summary>
      <div class="mt-0.5 grid gap-0.5 pl-4">
        @foreach ($moreNav as $id)
          <button type="submit" class="{{ $navItem }}" :class="page === '{{ $id }}' ? cls.navActive : cls.navIdle" :aria-current="current('{{ $id }}')" @click="go('{{ $id }}')">{{ $icon($pages[$id]['icon'], 'size-4.5 shrink-0') }}<span class="truncate">{{ $pages[$id]['label'] }}</span></button>
        @endforeach
      </div>
    </details>
    <hr class="my-2 border-line" />
    <button type="submit" class="{{ $navItem }}" :class="page === 'notifications' ? cls.navActive : cls.navIdle" :aria-current="current('notifications')" @click="go('notifications')">{{ $icon('bell', 'size-4.5 shrink-0') }}<span class="truncate">Notifications</span><template x-if="unread > 0"><span class="{{ $navBadge }}"><span x-text="unread"></span><span class="sr-only"> unread</span></span></template></button>
  </nav>
  <div class="grid gap-1">
    <h2 class="px-3 text-xs font-medium text-muted">Favourites</h2>
    <template x-if="favouriteList.length === 0"><p class="px-3 text-xs text-muted">Star a workflow to pin it.</p></template>
    <template x-for="item in favouriteList" :key="item.id">
      <button type="submit" class="{{ $navItem }} text-ink hover:bg-subtle" @click="openDetail(item.id)"><span aria-hidden="true" class="size-4.5 shrink-0 rounded-md" :class="covers[item.cover]"></span><span class="truncate" x-text="item.name"></span>{{ $icon('star', 'ml-auto size-3.5 '.$classes['starOn']) }}</button>
    </template>
  </div>
</form>
@php $sideNav = new HtmlString(ob_get_clean()); @endphp

<div
  class="{{ $palette }} flex min-h-dvh bg-surface text-ink"
  x-data="{
    page: {{ $js($defaultPage) }},
    pages: {{ $js($pages) }},
    icons: {{ $js($icons) }},
    covers: {{ $js($covers) }},
    folderTones: {{ $js($folderTones) }},
    avatarTones: {{ $js($avatarTones) }},
    apps: {{ $js($apps) }},
    cls: {{ $js($classes) }},
    statusLabels: { active: 'Active', paused: 'Paused', draft: 'Draft' },
    filterDefs: {{ $js($filterDefs) }},
    templates: {{ $js($templates) }},
    workflows: {{ $js($workflows) }},
    folders: {{ $js($folders) }},
    trash: {{ $js($trash) }},
    favourites: ['w1', 'w3', 'w2', 'w7'],
    read: ['n5', 'n6'],
    total: {{ count($notifications) }},
    credits: 2450,
    nextId: 9,
    sidebarOpen: true,
    query: '',
    filters: { status: 'all', app: 'any', date: 'any', tag: 'all' },
    selectedId: 'w1',
    target: { kind: 'workflow', id: 'w1' },
    draftName: '',
    draft: { name: '', folder: 'f1', tag: 'Productivity', status: 'draft' },
    runFilter: 'all',
    runs: {{ $js($runs) }},
    templateFilter: 'all',
    connected: ['mail', 'chat', 'sheets', 'notes'],
    articleQuery: '',
    articles: {{ $js($articles) }},
    installed: ['m1'],
    workspace: 'Alur Studio',
    prefs: ['summary', 'failures'],
    {{-- Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. --}}
    readHash() {
      const id = window.location.hash.slice(1);
      return id in this.pages ? id : {{ $js($defaultPage) }};
    },
    go(id) {
      if (id === this.page) return document.getElementById('alur-page-title').focus();
      window.location.assign('#' + id);
    },
    current(id) {
      return this.page === id ? 'page' : null;
    },
    notify(title, description = '', variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    onKey(event) {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'f') return;
      event.preventDefault();
      document.getElementById('alur-search').focus();
    },
    {{-- Buka dialog native setelah menu pemicu selesai menutup. --}}
    openDialog(id) {
      requestAnimationFrame(() => {
        const dialog = document.getElementById(id);
        if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;
        dialog.returnValue = '';
        dialog.showModal();
      });
    },
    {{-- Menu kartu dirender di dalam x-for, jadi id bawaan komponen diganti id unik per kartu. --}}
    menuIds(el, id) {
      const trigger = el.querySelector('[aria-haspopup]');
      const menu = el.querySelector('[role=menu]');
      menu.id = id;
      trigger.id = id + '-trigger';
      trigger.setAttribute('popovertarget', id);
      trigger.setAttribute('aria-controls', id);
      menu.setAttribute('aria-labelledby', trigger.id);
    },
    formatNumber(value) {
      return value.toLocaleString('id-ID');
    },
    plural(count, word) {
      return count + ' ' + word + (count === 1 ? '' : 's');
    },
    toggleIn(list, item) {
      return list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item];
    },
    ago(days) {
      return days === 0 ? 'Just now' : days === 1 ? '1 day ago' : days + ' days ago';
    },
    metaOf(item) {
      return this.ago(item.days) + ' · ' + this.statusLabels[item.status];
    },
    {{-- Huruf pertama kata pertama dan terakhir. --}}
    initials(name) {
      const words = name.trim().split(/\s+/).filter(Boolean);
      const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
      return picked.map((word) => Array.from(word)[0] ?? '').join('').toUpperCase();
    },
    {{-- Warna avatar tetap untuk nama yang sama. --}}
    avatarClass(name, ring) {
      const sum = Array.from(name).reduce((total, char) => total + char.charCodeAt(0), 0);
      return this.cls.avatarBase + ' ' + this.avatarTones[sum % this.avatarTones.length] + ' ' + ring;
    },
    appNames(list) {
      return list.map((id) => this.apps[id].label).join(', ');
    },
    get unread() {
      return this.total - this.read.length;
    },
    matches(name) {
      return name.toLowerCase().includes(this.query.trim().toLowerCase());
    },
    get visibleFolders() {
      return this.folders.filter((item) => this.matches(item.name));
    },
    get visible() {
      const f = this.filters;
      return this.workflows.filter((item) =>
        this.matches(item.name) &&
        (f.status === 'all' || item.status === f.status) &&
        (f.app === 'any' || item.apps.includes(f.app)) &&
        (f.date === 'any' || item.days <= Number(f.date)) &&
        (f.tag === 'all' || item.tags.includes(f.tag)));
    },
    get detail() {
      return this.workflows.find((item) => item.id === this.selectedId);
    },
    get detailRows() {
      const item = this.detail;
      if (!item) return [];
      return [
        ['Status', this.statusLabels[item.status]],
        ['Runs today', String(item.runs)],
        ['Folder', this.folders.find((f) => f.id === item.folder)?.name ?? 'None'],
        ['Tags', item.tags.join(', ') || 'None'],
        ['Integrations', this.appNames(item.apps) || 'None'],
        ['Owner', item.team[0] ?? 'Andi Wijaya'],
      ];
    },
    get deleting() {
      const list = this.target.kind === 'folder' ? this.folders : this.workflows;
      return list.find((item) => item.id === this.target.id)?.name;
    },
    get deleteText() {
      return this.target.kind === 'folder'
        ? (this.deleting ?? 'This folder') + ' will be removed. Its workflows stay in My Workflows.'
        : (this.deleting ?? 'This workflow') + ' moves to Trash. You can restore it later.';
    },
    get favouriteList() {
      return this.favourites.map((id) => this.workflows.find((item) => item.id === id)).filter((item) => item !== undefined);
    },
    filterLabel(key) {
      return this.filterDefs.find((def) => def.key === key).items.find((item) => item.value === this.filters[key])?.label;
    },
    openDetail(id) {
      this.selectedId = id;
      this.openDialog('alur-detail');
    },
    toggleFavourite(id) {
      this.favourites = this.toggleIn(this.favourites, id);
    },
    createWorkflow(fields) {
      const created = { name: 'Untitled workflow', status: 'draft', days: 0, runs: 0, cover: this.nextId % this.covers.length, folder: 'f1', tags: [], apps: ['mail'], team: ['Andi Wijaya'], ...fields, id: 'w' + this.nextId };
      this.nextId += 1;
      return created;
    },
    onMenu(kind, id, action) {
      const source = this.workflows.find((item) => item.id === id);
      this.target = { kind, id };
      if (action === 'rename') {
        const list = kind === 'folder' ? this.folders : this.workflows;
        this.draftName = list.find((item) => item.id === id)?.name ?? '';
        return this.openDialog('alur-rename');
      }
      if (action === 'delete') return this.openDialog('alur-delete');
      if (!source) return;
      const copy = this.createWorkflow({ ...source, name: source.name + ' copy', status: 'draft', days: 0, runs: 0 });
      const index = this.workflows.indexOf(source);
      this.workflows = [...this.workflows.slice(0, index + 1), copy, ...this.workflows.slice(index + 1)];
      this.notify('Workflow duplicated', copy.name);
    },
    onRenameClose(dialog) {
      const name = this.draftName.trim();
      if (dialog.returnValue === 'save' && name) {
        const rename = (list) => list.map((item) => (item.id === this.target.id ? { ...item, name } : item));
        if (this.target.kind === 'folder') this.folders = rename(this.folders);
        else this.workflows = rename(this.workflows);
        this.notify('Renamed', name, 'success');
      }
      dialog.returnValue = '';
    },
    onDelete() {
      const id = this.target.id;
      if (this.target.kind === 'folder') {
        const name = this.deleting;
        this.folders = this.folders.filter((item) => item.id !== id);
        return this.notify('Folder deleted', name);
      }
      const removed = this.workflows.find((item) => item.id === id);
      if (!removed) return;
      this.workflows = this.workflows.filter((item) => item.id !== id);
      this.favourites = this.favourites.filter((entry) => entry !== id);
      this.trash = [removed, ...this.trash];
      this.notify('Moved to Trash', removed.name);
    },
    onCreateClose(dialog) {
      if (dialog.returnValue === 'create') {
        const created = this.createWorkflow({ name: this.draft.name.trim() || 'Untitled workflow', status: this.draft.status, folder: this.draft.folder, tags: [this.draft.tag] });
        this.workflows = [created, ...this.workflows];
        this.notify('Workflow created', created.name, 'success');
      }
      dialog.returnValue = '';
    },
    applyTemplate(id) {
      const source = this.templates.find((item) => item.id === id);
      const created = this.createWorkflow({ name: source.name, cover: source.cover, tags: [source.tag], apps: [...source.apps] });
      this.workflows = [created, ...this.workflows];
      this.notify('Template added', source.name + ' is in My Workflows', 'success');
    },
    restore(id) {
      const item = this.trash.find((entry) => entry.id === id);
      this.trash = this.trash.filter((entry) => entry.id !== id);
      this.workflows = [...this.workflows, item];
      this.notify('Restored', item.name, 'success');
    },
    setActive(on) {
      const item = this.detail;
      if (!item) return;
      this.workflows = this.workflows.map((entry) => (entry.id === item.id ? { ...entry, status: on ? 'active' : 'paused' } : entry));
      this.notify(on ? 'Workflow activated' : 'Workflow paused', item.name);
    },
    runNow() {
      const item = this.detail;
      if (!item) return;
      this.workflows = this.workflows.map((entry) => (entry.id === item.id ? { ...entry, runs: entry.runs + 1 } : entry));
      this.credits -= 5;
      this.notify('Run started', item.name + ', 5 credits');
    },
    resetFilters() {
      this.filters = { status: 'all', app: 'any', date: 'any', tag: 'all' };
      this.query = '';
    },
    get recent() {
      return [...this.workflows].sort((a, b) => a.days - b.days).slice(0, 3);
    },
    get visibleRuns() {
      return this.runs.filter((run) => this.runFilter === 'all' || run.ok === (this.runFilter === 'ok'));
    },
    get homeTiles() {
      return [
        ['Active workflows', this.workflows.filter((item) => item.status === 'active').length],
        ['Runs today', this.workflows.reduce((sum, item) => sum + item.runs, 0)],
        ['Credits available', this.formatNumber(this.credits)],
        ['Unread notifications', this.unread],
      ];
    },
    get visibleTemplates() {
      return this.templates.filter((item) => this.templateFilter === 'all' || item.tag === this.templateFilter);
    },
    get visibleArticles() {
      const text = this.articleQuery.trim().toLowerCase();
      return this.articles.filter((item) => (item.title + ' ' + item.category).toLowerCase().includes(text));
    },
    toggleAddon(id, name) {
      const adding = !this.installed.includes(id);
      this.installed = this.toggleIn(this.installed, id);
      this.notify(adding ? 'Add-on installed' : 'Add-on removed', name, adding ? 'success' : 'default');
    },
  }"
  x-init="page = readHash()"
  x-on:hashchange.window="page = readHash(); document.getElementById('alur-page-title').focus()"
  x-on:keydown.window="onKey($event)"
>
  <aside class="hidden w-60 shrink-0 border-r border-line bg-surface" :class="sidebarOpen && 'lg:block'">
    <div class="sticky top-0 flex h-dvh flex-col gap-4 overflow-y-auto px-3 pb-6">
      <div class="flex h-16 items-center justify-between px-3">
        <p class="text-lg font-bold tracking-tight"><span class="mr-1 font-mono text-muted" aria-hidden="true">#</span>Alur</p>
        <button type="button" aria-label="Hide sidebar" class="{{ $iconButton }}" @click="sidebarOpen = false">{{ $icon('panel', 'size-4.5') }}</button>
      </div>
      {{ $sideNav }}
    </div>
  </aside>

  <div class="min-w-0 flex-1">
    <header class="sticky top-0 z-20 flex h-16 items-center gap-3 bg-surface px-4 lg:px-8">
      <x-markas.drawer title="Menu" side="left">
        <x-slot:trigger>
          <button type="button" aria-label="Open menu" class="{{ $iconButton }} size-10 lg:hidden">{{ $icon('menu') }}</button>
        </x-slot:trigger>
        {{ $sideNav }}
      </x-markas.drawer>
      <template x-if="!sidebarOpen">
        <button type="button" aria-label="Show sidebar" class="{{ $iconButton }} hidden lg:inline-flex" @click="sidebarOpen = true">{{ $icon('panel', 'size-4.5') }}</button>
      </template>
      <div role="search" class="relative min-w-0 flex-1 lg:max-w-xl">
        {{ $icon('search', 'pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted') }}
        <x-markas.input id="alur-search" type="search" aria-label="Search folders and workflows" placeholder="Search..." class="rounded-full! pr-16 pl-10" x-model="query" x-on:input="if (page !== 'workflows') go('workflows')" />
        <x-markas.kbd size="sm" class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">⌘ F</x-markas.kbd>
      </div>
      <p class="ml-auto hidden shrink-0 text-sm text-muted sm:block">Credits available <span class="font-semibold text-ink tabular-nums" x-text="formatNumber(credits)">2.450</span></p>
    </header>

    <main class="px-4 pt-4 pb-12 lg:px-8">
      <div class="mb-8 flex flex-wrap items-center gap-3">
        <h1 id="alur-page-title" tabindex="-1" class="mr-auto text-[28px] leading-tight font-bold tracking-tight focus:outline-none" x-text="pages[page].title">{{ $pages[$defaultPage]['title'] }}</h1>
        <template x-if="page === 'workflows'">
          <div class="contents">
            <div class="order-last -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 lg:order-none lg:mx-0 lg:w-auto lg:px-0">
              @foreach ($filterDefs as $def)
                <x-markas.dropdown-menu :items="$def['items']" class="{{ $pill }}" x-on:markas-select="filters = { ...filters, {{ $def['key'] }}: $event.detail }">
                  <x-slot:trigger><span class="text-muted">{{ $def['label'] }}:</span><span x-text="filterLabel('{{ $def['key'] }}')"></span></x-slot:trigger>
                </x-markas.dropdown-menu>
              @endforeach
            </div>
            <x-markas.modal title="New workflow" x-on:close="onCreateClose($event.currentTarget)">
              <x-slot:trigger>
                <x-markas.button size="sm" class="rounded-full" x-on:click="draft = { ...draft, name: '', status: 'draft' }">{{ $icon('plus', 'size-4') }}New workflow</x-markas.button>
              </x-slot:trigger>
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="sm:col-span-2"><x-markas.input label="Name" name="name" placeholder="Untitled workflow" x-model="draft.name" /></div>
                <x-markas.select label="Folder" name="folder" x-model="draft.folder">
                  <template x-for="folder in folders" :key="folder.id"><option :value="folder.id" x-text="folder.name"></option></template>
                </x-markas.select>
                <x-markas.select label="Tag" name="tag" x-model="draft.tag">
                  @foreach ($tags as $tag)
                    <option>{{ $tag }}</option>
                  @endforeach
                </x-markas.select>
                <x-markas.select label="Status" name="status" x-model="draft.status">
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                </x-markas.select>
              </div>
              <x-slot:footer>
                <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
                <x-markas.button type="submit" value="create">Create workflow</x-markas.button>
              </x-slot:footer>
            </x-markas.modal>
          </div>
        </template>
      </div>

      {{-- My Workflows --}}
      <template x-if="page === 'workflows'">
        <div class="grid gap-10">
          <section aria-labelledby="alur-folders-title" class="grid gap-4">
            {{ $sectionTitle('alur-folders-title', 'Folders', 'visibleFolders.length') }}
            <template x-if="visibleFolders.length > 0">
              <ul role="list" class="{{ $gridCols }}">
                <template x-for="folder in visibleFolders" :key="folder.id">
                  <li :data-folder="folder.id">
                    <div aria-hidden="true" class="h-4 w-32 rounded-t-xl [clip-path:polygon(0_0,82%_0,100%_100%,0_100%)]" :class="folderTones[folder.tone].bg"></div>
                    <div class="flex h-40 flex-col justify-between rounded-2xl rounded-tl-none p-4" :class="folderTones[folder.tone].bg">
                      <div class="flex items-start justify-between gap-2">
                        <h3 class="{{ $mono }} pt-1" x-text="folder.name"></h3>
                        <x-markas.dropdown-menu :items="$folderMenu" class="{{ $kebab }}" x-init="menuIds($el, 'alur-menu-' + folder.id)" x-on:markas-select="onMenu('folder', folder.id, $event.detail)">
                          <x-slot:trigger>{{ $icon('dots', 'size-4.5') }}<span class="sr-only" x-text="'Options for ' + folder.name"></span></x-slot:trigger>
                        </x-markas.dropdown-menu>
                      </div>
                      <div class="flex items-end justify-between gap-2">
                        {{ $avatars('folder.team', 'folderTones[folder.tone].ring') }}
                        <p class="text-sm text-muted" x-text="folder.items + ' Items'"></p>
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
            </template>
            <template x-if="visibleFolders.length === 0"><p class="{{ $empty }}">No folders match your search.</p></template>
          </section>
          <section aria-labelledby="alur-workflows-title" class="grid gap-4">
            {{ $sectionTitle('alur-workflows-title', 'Workflows', 'visible.length') }}
            <template x-if="visible.length > 0">
              <ul role="list" class="{{ $gridCols }}">
                <template x-for="item in visible" :key="item.id">
                  <li :data-workflow="item.id" class="{{ $card }}">
                    <div aria-hidden="true" class="h-40 rounded-xl" :class="covers[item.cover]"></div>
                    <span class="absolute top-3.5 right-3.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-surface px-1.5 text-xs font-semibold text-ink tabular-nums"><span x-text="item.runs"></span><span class="sr-only"> runs today</span></span>
                    <div class="grid gap-4 px-2.5 pt-3 pb-2">
                      <div class="flex items-start justify-between gap-2">
                        <div class="min-w-0">
                          <p class="text-xs text-muted" x-text="metaOf(item)"></p>
                          <h3 class="{{ $mono }} mt-1 truncate"><button type="button" class="{{ $selectable }}" @click="openDetail(item.id)" x-text="item.name"></button></h3>
                        </div>
                        <div class="relative z-10 -mt-1 -mr-1 flex items-center">
                          <button type="button" class="{{ $iconButton }} rounded-full" :aria-pressed="favourites.includes(item.id) ? 'true' : 'false'" :aria-label="'Favourite ' + item.name" @click="toggleFavourite(item.id)">{{ $iconBind("'star'", 'size-4', "favourites.includes(item.id) && cls.starOn") }}</button>
                          <x-markas.dropdown-menu :items="$workflowMenu" class="{{ $kebab }}" x-init="menuIds($el, 'alur-menu-' + item.id)" x-on:markas-select="onMenu('workflow', item.id, $event.detail)">
                            <x-slot:trigger>{{ $icon('dots', 'size-4.5') }}<span class="sr-only" x-text="'Options for ' + item.name"></span></x-slot:trigger>
                          </x-markas.dropdown-menu>
                        </div>
                      </div>
                      <div class="flex items-center justify-between gap-2">
                        {{ $avatars('item.team', "'ring-surface'") }}
                        {{ $appIcons('item.apps') }}
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
            </template>
            <template x-if="visible.length === 0">
              <div class="{{ $empty }} grid justify-items-center gap-3">
                <p>No workflows match your search or filters.</p>
                <x-markas.button size="sm" variant="secondary" x-on:click="resetFilters()">Clear filters</x-markas.button>
              </div>
            </template>
          </section>
        </div>
      </template>

      {{-- Home --}}
      <template x-if="page === 'home'">
        <div class="grid gap-8">
          <dl class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <template x-for="[label, value] in homeTiles" :key="label">
              <div class="{{ $tile }}"><dt class="text-xs text-muted" x-text="label"></dt><dd class="mt-1 text-xl font-semibold tracking-tight tabular-nums" x-text="value"></dd></div>
            </template>
          </dl>
          <div class="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
            <section aria-labelledby="alur-recent-title" class="grid gap-4">
              <h2 id="alur-recent-title" class="text-base font-semibold">Recently edited</h2>
              <ul role="list" class="grid gap-3 sm:grid-cols-3 xl:grid-cols-3">
                <template x-for="item in recent" :key="item.id">
                  <li class="{{ $card }}">
                    <div aria-hidden="true" class="h-24 rounded-xl" :class="covers[item.cover]"></div>
                    <div class="grid gap-0.5 px-2 pt-2.5 pb-1.5">
                      <h3 class="{{ $mono }} truncate"><button type="button" class="{{ $selectable }}" @click="openDetail(item.id)" x-text="item.name"></button></h3>
                      <p class="text-xs text-muted" x-text="metaOf(item)"></p>
                    </div>
                  </li>
                </template>
              </ul>
            </section>
            <section aria-labelledby="alur-runs-title" class="{{ $panel }}">
              <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 id="alur-runs-title" class="text-base font-semibold">Recent runs</h2>
                  <p class="text-sm text-muted" x-text="plural(visibleRuns.length, 'run')"></p>
                </div>
                <x-markas.toggle-group label="Filter runs" :items="$runFilters" value="all" x-effect="if (selected.length) runFilter = selected[0]; else selected = [runFilter]" />
              </div>
              <ul class="divide-y divide-line">
                <template x-for="run in visibleRuns" :key="run.id">
                  <li :data-run="run.id" class="flex items-center gap-3 py-3">
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-medium" x-text="run.workflow"></p>
                      <p class="text-xs text-muted" x-text="run.time + ', ' + run.duration"></p>
                    </div>
                    <template x-if="run.ok"><x-markas.badge variant="success">Succeeded</x-markas.badge></template>
                    <template x-if="!run.ok"><x-markas.badge variant="danger">Failed</x-markas.badge></template>
                  </li>
                </template>
              </ul>
            </section>
          </div>
        </div>
      </template>

      {{-- Templates --}}
      <template x-if="page === 'templates'">
        <div class="grid gap-6">
          <div class="flex min-w-0 flex-wrap items-center justify-between gap-3">
            <p class="text-sm text-muted" x-text="plural(visibleTemplates.length, 'template')"></p>
            <x-markas.toggle-group label="Filter templates" class="max-w-full overflow-x-auto" :items="$templateFilters" value="all" x-effect="if (selected.length) templateFilter = selected[0]; else selected = [templateFilter]" />
          </div>
          <ul role="list" class="{{ $gridCols }}">
            <template x-for="item in visibleTemplates" :key="item.id">
              <li :data-template="item.id" class="{{ $card }}">
                <div aria-hidden="true" class="h-28 rounded-xl" :class="covers[item.cover]"></div>
                <div class="grid flex-1 gap-3 px-2.5 pt-3 pb-2">
                  <div class="grid gap-1">
                    <p class="text-xs text-muted" x-text="item.tag"></p>
                    <h2 class="{{ $mono }}" x-text="item.name"></h2>
                    <p class="text-sm text-muted" x-text="item.text"></p>
                  </div>
                  <div class="mt-auto flex items-center justify-between gap-2">
                    {{ $appIcons('item.apps') }}
                    <x-markas.button size="sm" variant="secondary" x-on:click="applyTemplate(item.id)">Use template<span class="sr-only" x-text="item.name"></span></x-markas.button>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </template>

      {{-- Tools --}}
      <template x-if="page === 'tools'">
        <section aria-labelledby="alur-tools-title" class="{{ $panel }}">
          <h2 id="alur-tools-title" class="text-base font-semibold">Connected tools</h2>
          <p class="text-sm text-muted" x-text="connected.length + ' of {{ count($tools) }} connected'"></p>
          <ul class="mt-2 divide-y divide-line">
            @foreach ($tools as $tool)
              <li class="flex items-center gap-4 py-4">
                <span class="{{ $appBase }} size-10 ring-0 {{ $apps[$tool['id']]['tone'] }}">{{ $icon($tool['id']) }}</span>
                <div class="min-w-0 flex-1">
                  <p class="font-medium">{{ $apps[$tool['id']]['label'] }}</p>
                  <p class="text-sm text-muted">{{ $tool['text'] }}</p>
                </div>
                <x-markas.switch aria-label="{{ $apps[$tool['id']]['label'] }}" x-bind:checked="connected.includes('{{ $tool['id'] }}')" x-on:change="connected = toggleIn(connected, '{{ $tool['id'] }}')" />
              </li>
            @endforeach
          </ul>
        </section>
      </template>

      {{-- Knowledge Base --}}
      <template x-if="page === 'knowledge'">
        <div class="grid gap-6">
          <div class="flex flex-wrap items-center gap-3">
            <div class="w-full sm:w-80"><x-markas.input type="search" aria-label="Search articles" placeholder="Search articles" x-model="articleQuery" /></div>
            <p class="text-sm text-muted" x-text="visibleArticles.length + ' of {{ count($articles) }} articles'"></p>
          </div>
          <template x-if="visibleArticles.length > 0">
            <ul role="list" class="{{ $gridCols }}">
              <template x-for="item in visibleArticles" :key="item.title">
                <li class="{{ $panel }} grid gap-2">
                  <p class="text-xs text-muted" x-text="item.category"></p>
                  <h2 class="font-semibold" x-text="item.title"></h2>
                  <p class="text-sm text-muted" x-text="item.minutes + ' min read'"></p>
                </li>
              </template>
            </ul>
          </template>
          <template x-if="visibleArticles.length === 0"><p class="{{ $empty }}">No articles match your search.</p></template>
        </div>
      </template>

      {{-- Marketplace --}}
      <template x-if="page === 'marketplace'">
        <div class="grid gap-6">
          <p class="text-sm text-muted" x-text="installed.length + ' installed'"></p>
          <ul role="list" class="{{ $gridCols }}">
            @foreach ($addons as $item)
              <li class="{{ $card }} flex-row gap-3 p-3">
                <div aria-hidden="true" class="size-14 shrink-0 rounded-xl {{ $covers[$item['cover']] }}"></div>
                <div class="min-w-0 flex-1">
                  <h2 class="{{ $mono }} truncate">{{ $item['name'] }}</h2>
                  <p class="truncate text-xs text-muted">{{ $item['maker'] }}</p>
                  <p class="mt-1 text-sm font-medium tabular-nums">{{ $item['price'] ? 'Rp '.number_format($item['price'], 0, ',', '.').'/month' : 'Free' }}</p>
                </div>
                <template x-if="installed.includes('{{ $item['id'] }}')"><x-markas.button size="sm" variant="secondary" class="self-center" x-on:click="toggleAddon('{{ $item['id'] }}', '{{ $item['name'] }}')">Installed<span class="sr-only">{{ $item['name'] }}</span></x-markas.button></template>
                <template x-if="!installed.includes('{{ $item['id'] }}')"><x-markas.button size="sm" class="self-center" x-on:click="toggleAddon('{{ $item['id'] }}', '{{ $item['name'] }}')">Install<span class="sr-only">{{ $item['name'] }}</span></x-markas.button></template>
              </li>
            @endforeach
          </ul>
        </div>
      </template>

      {{-- Notifications --}}
      <template x-if="page === 'notifications'">
        <section aria-labelledby="alur-inbox-title" class="{{ $panel }}">
          <div class="flex min-w-0 flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="alur-inbox-title" class="text-base font-semibold">Inbox</h2>
              <p class="text-sm text-muted" x-text="unread + ' unread'"></p>
            </div>
            <x-markas.button size="sm" variant="secondary" x-bind:disabled="unread === 0" x-on:click="read = {{ $js(array_column($notifications, 'id')) }}">Mark all as read</x-markas.button>
          </div>
          <ul class="mt-2 divide-y divide-line">
            @foreach ($notifications as $item)
              <li :data-unread="String(!read.includes('{{ $item['id'] }}'))" class="flex items-center gap-3 py-3">
                <span aria-hidden="true" class="size-2 shrink-0 rounded-full" :class="read.includes('{{ $item['id'] }}') ? cls.readDot : cls.unreadDot"></span>
                <div class="min-w-0 flex-1">
                  <p class="text-sm" :class="!read.includes('{{ $item['id'] }}') && 'font-medium'">{{ $item['text'] }}</p>
                  <p class="text-xs text-muted">{{ $item['time'] }}</p>
                </div>
                <template x-if="!read.includes('{{ $item['id'] }}')"><x-markas.button size="sm" variant="ghost" x-on:click="read = [...read, '{{ $item['id'] }}']">Mark read<span class="sr-only">: {{ $item['text'] }}</span></x-markas.button></template>
              </li>
            @endforeach
          </ul>
        </section>
      </template>

      {{-- Trash --}}
      <template x-if="page === 'trash'">
        <section aria-labelledby="alur-trash-title" class="{{ $panel }}">
          <h2 id="alur-trash-title" class="text-base font-semibold">Deleted workflows</h2>
          <p class="text-sm text-muted" x-text="plural(trash.length, 'item')"></p>
          <template x-if="trash.length > 0">
            <ul class="mt-2 divide-y divide-line">
              <template x-for="item in trash" :key="item.id">
                <li :data-trash="item.id" class="flex items-center gap-3 py-3">
                  <span aria-hidden="true" class="size-9 shrink-0 rounded-lg" :class="covers[item.cover]"></span>
                  <p class="{{ $mono }} min-w-0 flex-1 truncate" x-text="item.name"></p>
                  <x-markas.button size="sm" variant="secondary" x-on:click="restore(item.id)">Restore<span class="sr-only" x-text="item.name"></span></x-markas.button>
                </li>
              </template>
            </ul>
          </template>
          <template x-if="trash.length === 0"><p class="{{ $empty }} mt-4">Trash is empty.</p></template>
        </section>
      </template>

      {{-- Settings --}}
      <template x-if="page === 'settings'">
        <form class="{{ $panel }} grid max-w-2xl gap-5" @submit.prevent="notify('Settings saved', workspace + ', ' + plural(prefs.length, 'alert') + ' on', 'success')">
          <x-markas.input label="Workspace name" name="workspace" x-model="workspace" />
          <ul class="divide-y divide-line">
            @foreach ($prefOptions as $item)
              <li class="flex items-center justify-between gap-4 py-3">
                <div>
                  <p class="text-sm font-medium">{{ $item['label'] }}</p>
                  <p class="text-xs text-muted">{{ $item['text'] }}</p>
                </div>
                <x-markas.switch aria-label="{{ $item['label'] }}" x-bind:checked="prefs.includes('{{ $item['key'] }}')" x-on:change="prefs = toggleIn(prefs, '{{ $item['key'] }}')" />
              </li>
            @endforeach
          </ul>
          <div class="flex justify-end"><x-markas.button type="submit">Save changes</x-markas.button></div>
        </form>
      </template>
    </main>
  </div>

  <x-markas.drawer id="alur-detail" title="Workflow details">
    <template x-if="detail">
      <div class="grid gap-5 text-ink">
        <div aria-hidden="true" class="h-32 rounded-xl" :class="covers[detail.cover]"></div>
        <div>
          <h3 class="{{ $mono }} text-lg" x-text="detail.name"></h3>
          <p class="text-sm text-muted" x-text="metaOf(detail)"></p>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-3">
          <x-markas.switch label="Active" x-bind:checked="detail.status === 'active'" x-on:change="setActive($event.target.checked)" />
          <div class="flex gap-2">
            <x-markas.button size="sm" variant="secondary" x-bind:aria-pressed="favourites.includes(detail.id) ? 'true' : 'false'" x-on:click="toggleFavourite(detail.id)">{{ $iconBind("'star'", 'size-4', 'favourites.includes(detail.id) && cls.starOn') }}Favourite</x-markas.button>
            <x-markas.button size="sm" x-on:click="runNow()">{{ $icon('play', 'size-4') }}Run now</x-markas.button>
          </div>
        </div>
        <dl class="divide-y divide-line text-sm">
          <template x-for="[label, value] in detailRows" :key="label">
            <div class="flex items-center justify-between gap-4 py-2.5"><dt class="shrink-0 text-muted" x-text="label"></dt><dd class="min-w-0 truncate text-right font-medium" x-text="value"></dd></div>
          </template>
        </dl>
      </div>
    </template>
    <x-slot:footer>
      <x-markas.button variant="secondary" type="submit">Close</x-markas.button>
    </x-slot:footer>
  </x-markas.drawer>

  <x-markas.modal id="alur-rename" title="Rename" x-on:close="onRenameClose($event.currentTarget)">
    <x-markas.input label="Name" name="rename" x-model="draftName" />
    <x-slot:footer>
      <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
      <x-markas.button type="submit" value="save">Save</x-markas.button>
    </x-slot:footer>
  </x-markas.modal>

  <x-markas.alert-dialog id="alur-delete" title="Delete this item?" variant="danger" action-label="Delete" x-on:markas-action="onDelete()"><span x-text="deleteText"></span></x-markas.alert-dialog>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
