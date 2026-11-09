@php
    use Illuminate\Support\HtmlString;

    /* Palet lokal, kelas, dan data: identik dengan versi React dan Vue. */
    $palette = '[--tpl-paper:#f3f3f0] dark:[--tpl-paper:#111113] [--tpl-tag-a:#b23a1d] [--tpl-tag-b:#2b4bc4] [--tpl-on-tag:#ffffff] dark:[--tpl-tag-a:#b23a1d] dark:[--tpl-tag-b:#2b4bc4] [--art-coral:#f07652] [--art-sun:#f6c34c] [--art-sky:#6ea8ea] [--art-mint:#5fc49f] [--art-violet:#8f78e0] [--art-rose:#ea7fa4] [--art-night:#1d2140] [--art-cream:#fbf1dc] [--art-deep:#1f5a48] [--art-plum:#4a2f7a] dark:[--art-coral:#e06a48] dark:[--art-sun:#e8b443] dark:[--art-sky:#6299d8] dark:[--art-mint:#56b08f] dark:[--art-violet:#8370cf] dark:[--art-rose:#d97396] dark:[--art-night:#171a33] dark:[--art-cream:#efe3c8] dark:[--art-deep:#1b4f40] dark:[--art-plum:#41296b] [--tpl-coral-1:#fde4da] [--tpl-coral-3:#8a2c12] [--tpl-sun-1:#fdf0c9] [--tpl-sun-3:#7a5200] [--tpl-sky-1:#deebfb] [--tpl-sky-3:#1d4677] [--tpl-mint-1:#dcf3ea] [--tpl-mint-3:#135a44] [--tpl-violet-1:#ebe6fb] [--tpl-violet-3:#45358a] [--tpl-rose-1:#fbe3ec] [--tpl-rose-3:#8a2246] dark:[--tpl-coral-1:#2c1b15] dark:[--tpl-coral-3:#f3b199] dark:[--tpl-sun-1:#2a2412] dark:[--tpl-sun-3:#f2cb6f] dark:[--tpl-sky-1:#162330] dark:[--tpl-sky-3:#a8c8ea] dark:[--tpl-mint-1:#13251f] dark:[--tpl-mint-3:#9dd6cc] dark:[--tpl-violet-1:#1e1a2d] dark:[--tpl-violet-3:#c2b5f0] dark:[--tpl-rose-1:#2b181b] dark:[--tpl-rose-3:#f0b2ba]';
    $tones = ['coral' => 'bg-(--tpl-coral-1) text-(--tpl-coral-3)', 'sun' => 'bg-(--tpl-sun-1) text-(--tpl-sun-3)', 'sky' => 'bg-(--tpl-sky-1) text-(--tpl-sky-3)', 'mint' => 'bg-(--tpl-mint-1) text-(--tpl-mint-3)', 'violet' => 'bg-(--tpl-violet-1) text-(--tpl-violet-3)', 'rose' => 'bg-(--tpl-rose-1) text-(--tpl-rose-3)'];
    $paintings = ['bg-[radial-gradient(circle_at_50%_56%,var(--art-sun)_0_15%,transparent_16%),radial-gradient(130%_55%_at_50%_100%,var(--art-plum)_0_48%,transparent_49%),linear-gradient(180deg,var(--art-coral),var(--art-rose)_55%,var(--art-violet))]', 'bg-[repeating-radial-gradient(circle_at_0%_100%,var(--art-sky)_0_14px,var(--art-cream)_14px_28px)]', 'bg-[radial-gradient(circle,var(--art-sun)_0_5px,transparent_6px),conic-gradient(from_45deg,var(--art-plum)_0_25%,var(--art-coral)_0_50%,var(--art-plum)_0_75%,var(--art-coral)_0)] bg-size-[36px_36px]', 'bg-[radial-gradient(90%_50%_at_20%_100%,var(--art-deep)_0_60%,transparent_61%),radial-gradient(80%_45%_at_85%_100%,var(--art-mint)_0_70%,transparent_71%),radial-gradient(circle_at_70%_25%,var(--art-cream)_0_10%,transparent_11%),linear-gradient(180deg,var(--art-sky),var(--art-cream))]', 'bg-[repeating-linear-gradient(135deg,var(--art-sun)_0_18px,var(--art-rose)_18px_36px,var(--art-cream)_36px_54px)]', 'bg-[radial-gradient(circle,var(--art-sun)_0_17%,transparent_18%),repeating-conic-gradient(from_0deg,var(--art-violet)_0_15deg,var(--art-plum)_15deg_30deg)]', 'bg-[repeating-radial-gradient(ellipse_at_50%_140%,var(--art-mint)_0_16px,var(--art-deep)_16px_20px,var(--art-cream)_20px_36px)]', 'bg-[radial-gradient(circle_at_72%_26%,var(--art-cream)_0_9%,transparent_10%),radial-gradient(70%_30%_at_30%_100%,var(--art-coral)_0_50%,transparent_51%),linear-gradient(180deg,var(--art-night),var(--art-plum))]'];
    $keyframes = '@keyframes galeri-drift{to{transform:translate(28px,16px)}}@keyframes galeri-drift-b{to{transform:translate(-26px,-14px)}}';
    $root = 'min-h-dvh bg-(--tpl-paper) text-ink bg-[radial-gradient(60%_40%_at_50%_0%,var(--color-surface),transparent)] bg-no-repeat';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $header = 'sticky top-0 z-40 border-b border-line/60 bg-(--tpl-paper)/85 backdrop-blur';
    $headerInner = 'mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8';
    $brand = 'flex items-center gap-2 rounded-md text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $brandMark = 'flex size-7 items-center justify-center rounded-full bg-ink text-(--tpl-paper)';
    $navList = 'hidden items-center gap-1 lg:flex';
    $navLink = 'rounded-full px-3 py-1.5 text-sm text-muted transition-colors duration-150 hover:bg-surface hover:text-ink motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $iconRow = 'flex items-center gap-1';
    $iconButton = 'inline-flex size-9 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-surface motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuPanel = 'absolute inset-x-4 top-full mt-2 grid gap-1 rounded-2xl border border-line bg-surface p-2 shadow-overlay lg:right-8 lg:left-auto lg:w-64';
    $menuLink = 'rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $hero = 'overflow-x-clip pt-14 text-center sm:pt-20';
    $eyebrow = 'mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted';
    $eyebrowDot = 'size-1.5 rounded-full bg-success';
    $heroTitle = 'mx-auto mt-5 max-w-4xl px-4 text-5xl leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-7xl lg:text-8xl';
    $heroLead = 'mx-auto mt-5 max-w-xl px-4 text-base text-pretty text-muted sm:text-lg';
    $heroActions = 'mt-7 flex flex-wrap items-center justify-center gap-3 px-4';
    $pillBase = 'inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $pillPrimary = 'bg-primary text-on-primary hover:bg-primary-strong';
    $pillGhost = 'border border-line bg-surface text-ink hover:bg-subtle';
    $stage = 'relative mx-auto mt-4 h-[380px] max-w-[1440px] cursor-grab touch-pan-y overflow-hidden select-none [--fan-r:900px] [--fan-step:13deg] active:cursor-grabbing sm:h-[540px] sm:[--fan-r:1300px] sm:[--fan-step:10deg]';
    $fanList = 'absolute inset-0';
    $fanCard = 'absolute top-16 left-1/2 -ml-20 w-40 origin-[50%_var(--fan-r)] rounded-[1.75rem] bg-surface p-2 text-left shadow-overlay transition-[transform,opacity] duration-500 ease-out [transform:rotate(calc(var(--off)*var(--fan-step)))_translateY(var(--lift))] motion-reduce:transition-none sm:top-20 sm:-ml-26 sm:w-52';
    $fanHidden = 'pointer-events-none opacity-0';
    $fanArt = 'aspect-[4/5] rounded-[1.35rem]';
    $fanCaption = 'grid gap-1 px-1.5 pt-2.5 pb-1 sm:flex sm:items-end sm:justify-between sm:gap-2';
    $fanTitle = 'truncate text-sm font-medium';
    $fanArtist = 'truncate text-xs text-muted';
    $fanPrice = 'shrink-0 text-xs font-semibold';
    $cursorBase = 'pointer-events-none absolute z-30 flex items-start motion-reduce:animate-none';
    $cursorA = 'pointer-events-none absolute z-30 flex items-start motion-reduce:animate-none top-6 left-[6%] animate-[galeri-drift_9s_ease-in-out_infinite_alternate] sm:top-10 sm:left-[24%]';
    $cursorB = 'pointer-events-none absolute z-30 flex items-start motion-reduce:animate-none top-[58%] right-[6%] animate-[galeri-drift-b_11s_ease-in-out_infinite_alternate] sm:top-[34%] sm:right-[22%]';
    $cursorTag = 'mt-4 -ml-1 rounded-full px-3 py-1 text-sm font-medium text-(--tpl-on-tag)';
    $controls = 'relative z-10 mx-auto -mt-6 flex max-w-md items-center justify-between gap-4 px-4 sm:-mt-10';
    $roundButton = 'inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $nowShowing = 'min-w-0 text-center';
    $section = 'mx-auto max-w-6xl scroll-mt-20 px-4 py-20 lg:px-8 lg:py-28';
    $sectionHead = 'mx-auto max-w-2xl text-center';
    $sectionTitle = 'text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl';
    $sectionLead = 'mt-4 text-base text-pretty text-muted';
    $reveal = 'transition duration-700 ease-out motion-reduce:transition-none motion-safe:[&:not([data-in])]:translate-y-6 motion-safe:[&:not([data-in])]:opacity-0';
    $categoryGrid = 'mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6';
    $categoryTile = 'grid gap-3 rounded-3xl border border-line bg-surface p-2.5 pb-4';
    $categoryArt = 'aspect-square rounded-2xl';
    $categoryName = 'px-1.5 text-sm font-medium';
    $categoryCount = 'px-1.5 text-xs text-muted';
    $chips = 'mt-8 flex flex-wrap justify-center gap-2';
    $chip = 'inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $chipIdle = 'border-line bg-surface text-muted hover:text-ink';
    $chipActive = 'border-primary bg-primary text-on-primary';
    $artistGrid = 'mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3';
    $artistCard = 'grid gap-4 rounded-3xl border border-line bg-surface p-5';
    $artistHead = 'flex items-center gap-3';
    $avatar = 'flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold';
    $artistName = 'truncate text-base font-semibold tracking-tight';
    $artistMeta = 'truncate text-sm text-muted';
    $thumbs = 'grid grid-cols-3 gap-2';
    $thumb = 'aspect-square rounded-xl';
    $artistFoot = 'flex items-center justify-between gap-3';
    $statText = 'text-sm text-muted';
    $followIdle = 'border-line bg-surface text-ink hover:bg-subtle';
    $stepGrid = 'mt-12 grid gap-4 md:grid-cols-3';
    $stepCard = 'relative grid content-start gap-3 overflow-hidden rounded-3xl border border-line bg-surface p-6';
    $stepNumber = 'flex size-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-(--tpl-paper)';
    $stepTitle = 'mt-3 text-lg font-semibold tracking-tight';
    $stepText = 'text-sm text-pretty text-muted';
    $stepArt = 'mt-4 h-28 rounded-2xl';
    $billing = 'mx-auto mt-8 flex w-fit gap-1 rounded-full border border-line bg-surface p-1';
    $billingButton = 'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $billingIdle = 'text-muted hover:text-ink';
    $billingActive = 'bg-primary text-on-primary';
    $saveTag = 'rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary';
    $planGrid = 'mt-10 grid gap-4 lg:grid-cols-3';
    $planCard = 'grid content-start gap-5 rounded-3xl border border-line bg-surface p-6';
    $planFeatured = 'border-primary ring-1 ring-primary';
    $planTop = 'flex items-center justify-between gap-3';
    $planName = 'text-lg font-semibold tracking-tight';
    $popular = 'rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary';
    $priceRow = 'flex items-baseline gap-1';
    $priceValue = 'text-4xl font-semibold tracking-tight tabular-nums';
    $priceUnit = 'text-sm text-muted';
    $featureList = 'grid gap-2.5 text-sm';
    $featureItem = 'flex items-start gap-2';
    $check = 'mt-0.5 size-4 shrink-0 text-success';
    $faqWrap = 'mx-auto mt-10 max-w-3xl';
    $contactCard = 'grid gap-8 overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:items-center';
    $contactArt = 'relative h-48 overflow-hidden rounded-3xl sm:h-64 lg:order-last';
    $contactForm = 'flex flex-col gap-3 sm:flex-row sm:items-end';
    $grow = 'min-w-0 flex-1';
    $errorText = 'mt-2 text-sm text-danger';
    $footer = 'border-t border-line';
    $footerInner = 'mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8';
    $footerBrand = 'grid content-start gap-3 lg:col-span-2';
    $footerTitle = 'text-sm font-semibold';
    $footerLinks = 'mt-3 grid gap-2';
    $footerLink = 'rounded-sm text-sm text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $footerBottom = 'mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-6 text-sm text-muted lg:px-8';
    $BRAND = 'Sanggar';
    $MENU_ID = 'galeri-menu';
    $DRAG_THRESHOLD = 40;
    $START_INDEX = 3;
    $EMAIL_PATTERN = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';
    $navItems = [
        ['label' => 'Get Started', 'href' => '#how'],
        ['label' => 'Create strategy', 'href' => '#categories'],
        ['label' => 'Pricing', 'href' => '#pricing'],
        ['label' => 'Contact', 'href' => '#contact'],
        ['label' => 'Solution', 'href' => '#artists'],
        ['label' => 'E-Commerce', 'href' => '#faq'],
    ];
    $artworks = [
        ['title' => 'Sunset over Bromo', 'artist' => 'Dewi Lestari', 'price' => 'Rp4.200.000', 'art' => 0],
        ['title' => 'Tide Study', 'artist' => 'Bayu Pratama', 'price' => 'Rp2.750.000', 'art' => 1],
        ['title' => 'Kawung Bloom', 'artist' => 'Sekar Ayu', 'price' => 'Rp3.100.000', 'art' => 2],
        ['title' => 'Quiet Hills', 'artist' => 'Rizky Ramadhan', 'price' => 'Rp5.400.000', 'art' => 3],
        ['title' => 'Market at Noon', 'artist' => 'Putri Maharani', 'price' => 'Rp1.900.000', 'art' => 4],
        ['title' => 'Orbit No. 7', 'artist' => 'Galih Saputra', 'price' => 'Rp6.800.000', 'art' => 5],
        ['title' => 'Tegallalang', 'artist' => 'Made Wirawan', 'price' => 'Rp3.650.000', 'art' => 6],
        ['title' => 'Night Ferry', 'artist' => 'Nadia Kusuma', 'price' => 'Rp4.900.000', 'art' => 7],
    ];
    $categories = [
        ['name' => 'Painting', 'count' => '2,340 works', 'art' => 0],
        ['name' => 'Illustration', 'count' => '1,860 works', 'art' => 4],
        ['name' => 'Printmaking', 'count' => '920 works', 'art' => 2],
        ['name' => 'Batik and textile', 'count' => '640 works', 'art' => 6],
        ['name' => 'Photography', 'count' => '1,210 works', 'art' => 3],
        ['name' => 'Digital art', 'count' => '2,080 works', 'art' => 5],
    ];
    $filters = ['All', 'Painting', 'Illustration', 'Digital art'];
    $artists = [
        ['id' => 'dewi', 'name' => 'Dewi Lestari', 'initials' => 'DL', 'city' => 'Yogyakarta', 'medium' => 'Painting', 'tone' => 'coral', 'followers' => 1840, 'works' => 42, 'art' => [0, 3, 7]],
        ['id' => 'bayu', 'name' => 'Bayu Pratama', 'initials' => 'BP', 'city' => 'Bandung', 'medium' => 'Illustration', 'tone' => 'sky', 'followers' => 960, 'works' => 31, 'art' => [1, 4, 2]],
        ['id' => 'galih', 'name' => 'Galih Saputra', 'initials' => 'GS', 'city' => 'Jakarta', 'medium' => 'Digital art', 'tone' => 'violet', 'followers' => 2310, 'works' => 58, 'art' => [5, 2, 0]],
        ['id' => 'sekar', 'name' => 'Sekar Ayu', 'initials' => 'SA', 'city' => 'Solo', 'medium' => 'Painting', 'tone' => 'rose', 'followers' => 1275, 'works' => 27, 'art' => [2, 6, 4]],
        ['id' => 'putri', 'name' => 'Putri Maharani', 'initials' => 'PM', 'city' => 'Surabaya', 'medium' => 'Illustration', 'tone' => 'sun', 'followers' => 705, 'works' => 19, 'art' => [4, 1, 5]],
        ['id' => 'made', 'name' => 'Made Wirawan', 'initials' => 'MW', 'city' => 'Ubud', 'medium' => 'Digital art', 'tone' => 'mint', 'followers' => 1530, 'works' => 36, 'art' => [6, 3, 1]],
    ];
    $steps = [
        ['title' => 'Open your gallery', 'text' => 'Pick a handle, add a short bio, and choose the room color that frames your work.', 'art' => 3],
        ['title' => 'Upload and price', 'text' => 'Drop high resolution files, set editions and prices in Rupiah, and we prepare the listing.', 'art' => 4],
        ['title' => 'Sell and get paid', 'text' => 'Collectors check out with QRIS or bank transfer. Payouts land in your account every Friday.', 'art' => 7],
    ];
    $plans = [
        ['name' => 'Starter', 'monthly' => 0, 'yearly' => 0, 'featured' => false, 'blurb' => 'For trying the room out.', 'cta' => 'Start free', 'features' => ['Up to 12 artworks', 'Public gallery page', '10% sales fee']],
        ['name' => 'Artist', 'monthly' => 149, 'yearly' => 119, 'featured' => true, 'blurb' => 'For working artists who sell often.', 'cta' => 'Join Artist', 'features' => ['Unlimited artworks', 'Custom domain', '5% sales fee', 'Sales insights']],
        ['name' => 'Studio', 'monthly' => 399, 'yearly' => 319, 'featured' => false, 'blurb' => 'For collectives and small galleries.', 'cta' => 'Join Studio', 'features' => ['Up to 10 artists', 'Shared inventory', '3% sales fee', 'Priority curation']],
    ];
    $faqs = [
        ['value' => 'fee', 'title' => 'How much does Sanggar take from a sale?', 'content' => 'Starter pays a 10% fee, Artist 5%, and Studio 3%. Payment processing is included, so the price a collector pays is the price you set.'],
        ['value' => 'payout', 'title' => 'When do I receive my money?', 'content' => 'Every Friday we send the week\'s earnings to your Indonesian bank account or e-wallet, as long as the balance is above Rp50.000.'],
        ['value' => 'shipping', 'title' => 'Who handles shipping for physical works?', 'content' => 'You pack the work, we book the courier and insure it. Collectors see the shipping cost at checkout before they pay.'],
        ['value' => 'rights', 'title' => 'Do I keep the rights to my art?', 'content' => 'Always. You grant Sanggar a license to show your work on the marketplace only, and you can remove it at any time.'],
        ['value' => 'cancel', 'title' => 'Can I cancel or switch plans?', 'content' => 'Yes. Change plans from your settings at any time. Yearly plans are refunded pro rata for unused months.'],
    ];
    $footerGroups = [
        ['title' => 'Marketplace', 'links' => [['label' => 'Browse art', 'href' => '#categories'], ['label' => 'Featured artists', 'href' => '#artists'], ['label' => 'Pricing', 'href' => '#pricing']]],
        ['title' => 'Company', 'links' => [['label' => 'About', 'href' => '/about'], ['label' => 'Careers', 'href' => '/careers'], ['label' => 'Contact', 'href' => '#contact']]],
        ['title' => 'Support', 'links' => [['label' => 'Help center', 'href' => '/help'], ['label' => 'Shipping', 'href' => '/shipping'], ['label' => 'Returns', 'href' => '/returns']]],
    ];
    $icons = ['logo' => 'M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-1.3-1-1.5-1-2.6 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-4-4-7.2-9-7.2ZM7.5 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z', 'user' => 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0', 'menu' => 'M4 7h16M4 12h16M4 17h16', 'close' => 'M6 6l12 12M18 6 6 18', 'left' => 'M15 6l-6 6 6 6', 'right' => 'M9 6l6 6-6 6', 'check' => 'M5 12.5 10 17l9-10', 'arrow' => 'M5 12h14M13 6l6 6-6 6'];
    $cursorPath = 'M2 2l7 17 2.6-7.4L19 9z';

    $cx = fn (...$classes) => implode(' ', array_filter($classes));
    $icon = fn (string $name, string $class = 'size-5') => new HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $rupiah = fn (int $thousands) => $thousands ? 'Rp'.$thousands.'k' : 'Rp0';
    $cardStyle = fn (int $offset) => '--off: '.$offset.'; --lift: '.($offset === 0 ? '-24px' : '0px').'; z-index: '.(10 - abs($offset)).';';
    $faqItems = array_column($faqs, 'title', 'value');
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  class="{{ $cx($root, $palette) }}"
  x-data="{
    menuOpen: false,
    active: {{ $START_INDEX }},
    count: {{ count($artworks) }},
    artworks: @js($artworks),
    filter: 'All',
    following: [],
    yearly: false,
    email: '',
    emailError: '',
    dragStart: null,
    dragged: false,
    go(index) {
      this.active = Math.min(this.count - 1, Math.max(0, index));
    },
    cardStyle(offset) {
      return { '--off': offset, '--lift': offset === 0 ? '-24px' : '0px', zIndex: 10 - Math.abs(offset) };
    },
    onPointerUp(event) {
      if (this.dragStart === null) return;
      const delta = event.clientX - this.dragStart;
      this.dragStart = null;
      if (Math.abs(delta) < {{ $DRAG_THRESHOLD }}) return;
      this.dragged = true;
      this.go(this.active + (delta < 0 ? 1 : -1));
    },
    onStageKey(event) {
      if (event.key === 'ArrowRight') this.go(this.active + 1);
      else if (event.key === 'ArrowLeft') this.go(this.active - 1);
      else return;
      event.preventDefault();
    },
    toggleFollow(id, name) {
      const isFollowing = this.following.includes(id);
      this.following = isFollowing ? this.following.filter((item) => item !== id) : [...this.following, id];
      if (!isFollowing) this.notify('You follow ' + name, 'New works will show up in your weekly drop.');
    },
    choosePlan(name) {
      this.notify(name + ' plan selected', 'Billed ' + (this.yearly ? 'yearly' : 'monthly') + '. You can switch any time.');
    },
    subscribe() {
      const value = this.email.trim();
      if (!new RegExp(@js($EMAIL_PATTERN)).test(value)) {
        this.emailError = 'Enter a valid email address, like you@studio.id.';
        return;
      }
      this.emailError = '';
      this.email = '';
      this.notify('You are on the list', 'The weekly drop will reach ' + value + ' every Monday.');
    },
    notify(title, description) {
      this.$dispatch('markas-toast', { title, description, variant: 'success' });
    },
  }"
  x-init="
    {{-- Animasi masuk saat scroll: data-in dipasang sekali, CSS motion-safe yang menyembunyikan. --}}
    const items = $el.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.setAttribute('data-in', ''));
    } else {
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-in', '');
        observer.unobserve(entry.target);
      }), { rootMargin: '0px 0px -10% 0px' });
      items.forEach((item) => observer.observe(item));
    }
  "
>
  <style>{!! $keyframes !!}</style>
  <header class="{{ $header }}" x-on:keydown.escape="menuOpen = false">
    <div class="{{ $cx($headerInner, 'relative') }}">
      <a href="#top" class="{{ $brand }}">
        <span class="{{ $brandMark }}" aria-hidden="true">{{ $icon('logo', 'size-4') }}</span>
        {{ $BRAND }}
      </a>
      <nav aria-label="Main" class="{{ $navList }}">
        @foreach ($navItems as $item)
          <a href="{{ $item['href'] }}" class="{{ $navLink }}">{{ $item['label'] }}</a>
        @endforeach
      </nav>
      <div class="{{ $iconRow }}">
        <a href="/login" class="{{ $iconButton }}" aria-label="Sign in">{{ $icon('user') }}</a>
        <button type="button" class="{{ $iconButton }}" aria-label="Open menu" x-bind:aria-label="menuOpen ? 'Close menu' : 'Open menu'" aria-expanded="false" x-bind:aria-expanded="menuOpen ? 'true' : 'false'" aria-controls="{{ $MENU_ID }}" x-on:click="menuOpen = !menuOpen">
          <span x-show="!menuOpen">{{ $icon('menu') }}</span>
          <span x-show="menuOpen" x-cloak>{{ $icon('close') }}</span>
        </button>
      </div>
      <template x-if="menuOpen">
        <nav id="{{ $MENU_ID }}" aria-label="Menu" class="{{ $menuPanel }}">
          @foreach ($navItems as $item)
            <a href="{{ $item['href'] }}" class="{{ $menuLink }}" x-on:click="menuOpen = false">{{ $item['label'] }}</a>
          @endforeach
        </nav>
      </template>
    </div>
  </header>

  <main id="top">
    <section aria-labelledby="galeri-title" class="{{ $hero }}">
      <p class="{{ $eyebrow }}"><span class="{{ $eyebrowDot }}" aria-hidden="true"></span>1,240 new works from Indonesian artists this month</p>
      <h1 id="galeri-title" class="{{ $heroTitle }}">A place to display your masterpiece.</h1>
      <p class="{{ $heroLead }}">Sanggar is a marketplace where painters, illustrators, and printmakers show their work, find collectors, and get paid in Rupiah.</p>
      <div class="{{ $heroActions }}">
        <a href="#pricing" class="{{ $cx($pillBase, $pillPrimary) }}">Join for Rp149k/mo</a>
        <a href="#how" class="{{ $cx($pillBase, $pillGhost) }}">Read more</a>
      </div>

      <div class="{{ $cx($stage, $focusRing) }}" role="region" aria-roledescription="carousel" aria-label="Featured artworks" tabindex="0" x-on:keydown="onStageKey($event)" x-on:pointerdown="dragStart = $event.clientX; dragged = false" x-on:pointerup="onPointerUp($event)" x-on:pointercancel="dragStart = null">
        <ul class="{{ $fanList }}">
          @foreach ($artworks as $index => $work)
            @php $offset = $index - $START_INDEX; @endphp
            <li class="{{ $cx($fanCard, abs($offset) > 4 ? $fanHidden : null) }}" x-bind:class="Math.abs({{ $index }} - active) > 4 && @js($fanHidden)" style="{{ $cardStyle($offset) }}" x-bind:style="cardStyle({{ $index }} - active)" @if ($offset !== 0) aria-hidden="true" @endif x-bind:aria-hidden="active === {{ $index }} ? null : 'true'" aria-roledescription="slide" aria-label="{{ $index + 1 }} of {{ count($artworks) }}" x-bind:data-active="active === {{ $index }} ? '' : null" x-on:click="if (!dragged) go({{ $index }})">
              <div class="{{ $cx($fanArt, $paintings[$work['art']]) }}" aria-hidden="true"></div>
              <div class="{{ $fanCaption }}">
                <div class="min-w-0">
                  <p class="{{ $fanTitle }}">{{ $work['title'] }}</p>
                  <p class="{{ $fanArtist }}">{{ $work['artist'] }}</p>
                </div>
                <p class="{{ $fanPrice }}">{{ $work['price'] }}</p>
              </div>
            </li>
          @endforeach
        </ul>
        <div class="{{ $cursorA }}" aria-hidden="true">
          <svg class="size-5 fill-(--tpl-tag-a)" viewBox="0 0 20 20"><path d="{{ $cursorPath }}" /></svg>
          <span class="{{ $cx($cursorTag, 'bg-(--tpl-tag-a)') }}">@coplin</span>
        </div>
        <div class="{{ $cursorB }}" aria-hidden="true">
          <svg class="size-5 fill-(--tpl-tag-b)" viewBox="0 0 20 20"><path d="{{ $cursorPath }}" /></svg>
          <span class="{{ $cx($cursorTag, 'bg-(--tpl-tag-b)') }}">@ercobs</span>
        </div>
      </div>
      <div class="{{ $controls }}">
        <button type="button" class="{{ $roundButton }}" aria-label="Previous artwork" x-bind:disabled="active === 0" x-on:click="go(active - 1)">{{ $icon('left') }}</button>
        <p class="{{ $nowShowing }}" aria-live="polite" data-now="">
          <span class="block truncate text-sm font-medium" x-text="artworks[active].title">{{ $artworks[$START_INDEX]['title'] }}</span>
          <span class="block truncate text-xs text-muted" x-text="artworks[active].artist + ', ' + (active + 1) + ' of ' + count">{{ $artworks[$START_INDEX]['artist'] }}, {{ $START_INDEX + 1 }} of {{ count($artworks) }}</span>
        </p>
        <button type="button" class="{{ $roundButton }}" aria-label="Next artwork" x-bind:disabled="active === count - 1" x-on:click="go(active + 1)">{{ $icon('right') }}</button>
      </div>
    </section>

    <section id="categories" aria-labelledby="galeri-categories" class="{{ $section }}">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal="">
        <h2 id="galeri-categories" class="{{ $sectionTitle }}">Every medium has a room</h2>
        <p class="{{ $sectionLead }}">Collectors browse by the way a work was made. List yours where the right people already look.</p>
      </div>
      <ul class="{{ $cx($categoryGrid, $reveal) }}" data-reveal="">
        @foreach ($categories as $category)
          <li class="{{ $categoryTile }}">
            <div class="{{ $cx($categoryArt, $paintings[$category['art']]) }}" aria-hidden="true"></div>
            <div>
              <p class="{{ $categoryName }}">{{ $category['name'] }}</p>
              <p class="{{ $categoryCount }}">{{ $category['count'] }}</p>
            </div>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="artists" aria-labelledby="galeri-artists" class="{{ $cx($section, 'pt-0 lg:pt-0') }}">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal="">
        <h2 id="galeri-artists" class="{{ $sectionTitle }}">Featured artists this week</h2>
        <p class="{{ $sectionLead }}">Hand picked by our curators from studios across the archipelago.</p>
      </div>
      <div class="{{ $chips }}" role="group" aria-label="Filter by medium">
        @foreach ($filters as $item)
          <button type="button" class="{{ $chip }}" x-bind:class="filter === @js($item) ? @js($chipActive) : @js($chipIdle)" x-bind:aria-pressed="filter === @js($item) ? 'true' : 'false'" x-on:click="filter = @js($item)">{{ $item }}</button>
        @endforeach
      </div>
      <ul class="{{ $artistGrid }}">
        @foreach ($artists as $artist)
          <template x-if="filter === 'All' || filter === @js($artist['medium'])">
            <li class="{{ $artistCard }}" data-artist="">
              <div class="{{ $artistHead }}">
                <span class="{{ $cx($avatar, $tones[$artist['tone']]) }}" aria-hidden="true">{{ $artist['initials'] }}</span>
                <div class="min-w-0">
                  <h3 class="{{ $artistName }}">{{ $artist['name'] }}</h3>
                  <p class="{{ $artistMeta }}">{{ $artist['medium'] }}, {{ $artist['city'] }}</p>
                </div>
              </div>
              <div class="{{ $thumbs }}" aria-hidden="true">
                @foreach ($artist['art'] as $art)
                  <div class="{{ $cx($thumb, $paintings[$art]) }}"></div>
                @endforeach
              </div>
              <div class="{{ $artistFoot }}">
                <p class="{{ $statText }}"><span x-text="({{ $artist['followers'] }} + (following.includes(@js($artist['id'])) ? 1 : 0)).toLocaleString('en-US')">{{ number_format($artist['followers']) }}</span> followers, {{ $artist['works'] }} works</p>
                <button type="button" class="{{ $cx($chip, 'h-8 px-3') }}" x-bind:class="following.includes(@js($artist['id'])) ? @js($chipActive) : @js($followIdle)" x-bind:aria-pressed="following.includes(@js($artist['id'])) ? 'true' : 'false'" aria-label="Follow {{ $artist['name'] }}" x-on:click="toggleFollow(@js($artist['id']), @js($artist['name']))" x-text="following.includes(@js($artist['id'])) ? 'Following' : 'Follow'">Follow</button>
              </div>
            </li>
          </template>
        @endforeach
      </ul>
    </section>

    <section id="how" aria-labelledby="galeri-how" class="{{ $section }}">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal="">
        <h2 id="galeri-how" class="{{ $sectionTitle }}">From studio to collector in three steps</h2>
        <p class="{{ $sectionLead }}">No website to build and no gallery contract to sign.</p>
      </div>
      <ol class="{{ $stepGrid }}">
        @foreach ($steps as $index => $step)
          <li class="{{ $cx($stepCard, $reveal) }}" data-reveal="">
            <span class="{{ $stepNumber }}" aria-hidden="true">0{{ $index + 1 }}</span>
            <h3 class="{{ $stepTitle }}">{{ $step['title'] }}</h3>
            <p class="{{ $stepText }}">{{ $step['text'] }}</p>
            <div class="{{ $cx($stepArt, $paintings[$step['art']]) }}" aria-hidden="true"></div>
          </li>
        @endforeach
      </ol>
    </section>

    <section id="pricing" aria-labelledby="galeri-pricing" class="{{ $cx($section, 'pt-0 lg:pt-0') }}">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal="">
        <h2 id="galeri-pricing" class="{{ $sectionTitle }}">Simple pricing in Rupiah</h2>
        <p class="{{ $sectionLead }}">Start free, upgrade when your first collectors arrive.</p>
      </div>
      <div class="{{ $billing }}" role="group" aria-label="Billing period">
        <button type="button" class="{{ $billingButton }}" x-bind:class="yearly ? @js($billingIdle) : @js($billingActive)" x-bind:aria-pressed="yearly ? 'false' : 'true'" x-on:click="yearly = false">Monthly</button>
        <button type="button" class="{{ $billingButton }}" x-bind:class="yearly ? @js($billingActive) : @js($billingIdle)" x-bind:aria-pressed="yearly ? 'true' : 'false'" x-on:click="yearly = true">Yearly <span class="{{ $saveTag }}">-20%</span></button>
      </div>
      <ul class="{{ $planGrid }}">
        @foreach ($plans as $plan)
          <li class="{{ $cx($planCard, $plan['featured'] ? $planFeatured : null) }}">
            <div class="{{ $planTop }}">
              <h3 class="{{ $planName }}">{{ $plan['name'] }}</h3>
              @if ($plan['featured'])
                <span class="{{ $popular }}">Popular</span>
              @endif
            </div>
            <p class="{{ $statText }}">{{ $plan['blurb'] }}</p>
            <p class="{{ $priceRow }}">
              <span class="{{ $priceValue }}" data-price="" x-text="yearly ? @js($rupiah($plan['yearly'])) : @js($rupiah($plan['monthly']))">{{ $rupiah($plan['monthly']) }}</span>
              <span class="{{ $priceUnit }}" x-text="yearly ? '/mo, billed yearly' : '/mo'">/mo</span>
            </p>
            <x-markas.button :variant="$plan['featured'] ? 'primary' : 'secondary'" x-on:click="choosePlan('{{ $plan['name'] }}')">{{ $plan['cta'] }}</x-markas.button>
            <ul class="{{ $featureList }}">
              @foreach ($plan['features'] as $feature)
                <li class="{{ $featureItem }}">{{ $icon('check', $check) }}{{ $feature }}</li>
              @endforeach
            </ul>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="faq" aria-labelledby="galeri-faq" class="{{ $cx($section, 'pt-0 lg:pt-0') }}">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal="">
        <h2 id="galeri-faq" class="{{ $sectionTitle }}">Questions artists ask us</h2>
      </div>
      <div class="{{ $faqWrap }}">
        <x-markas.accordion :items="$faqItems" default-value="fee">
          @foreach ($faqs as $faq)
            <x-slot :name="$faq['value']">{{ $faq['content'] }}</x-slot>
          @endforeach
        </x-markas.accordion>
      </div>
    </section>

    <section id="contact" aria-labelledby="galeri-contact" class="{{ $cx($section, 'pt-0 lg:pt-0') }}">
      <div class="{{ $cx($contactCard, $reveal) }}" data-reveal="">
        <div class="{{ $cx($contactArt, $paintings[0]) }}" aria-hidden="true"></div>
        <div>
          <h2 id="galeri-contact" class="{{ $sectionTitle }}">Get the weekly drop</h2>
          <p class="{{ $cx($sectionLead, 'mb-6') }}">Twelve new works, one artist interview, and open calls for exhibitions. Every Monday, no spam.</p>
          <form novalidate x-on:submit.prevent="subscribe()">
            <div class="{{ $contactForm }}">
              <div class="{{ $grow }}">
                <x-markas.input label="Email address" type="email" name="email" placeholder="you@studio.id" x-model="email" x-bind:aria-invalid="emailError ? 'true' : null" x-bind:aria-describedby="emailError ? 'galeri-email-error' : null" />
              </div>
              <x-markas.button type="submit">Subscribe</x-markas.button>
            </div>
            <template x-if="emailError">
              <p id="galeri-email-error" class="{{ $errorText }}" x-text="emailError"></p>
            </template>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="{{ $footer }}">
    <div class="{{ $footerInner }}">
      <div class="{{ $footerBrand }}">
        <a href="#top" class="{{ $brand }}">
          <span class="{{ $brandMark }}" aria-hidden="true">{{ $icon('logo', 'size-4') }}</span>
          {{ $BRAND }}
        </a>
        <p class="{{ $cx($statText, 'max-w-xs') }}">A marketplace for Indonesian art, from Yogyakarta studios to your living room wall.</p>
      </div>
      @foreach ($footerGroups as $group)
        <nav aria-label="{{ $group['title'] }}">
          <p class="{{ $footerTitle }}">{{ $group['title'] }}</p>
          <ul class="{{ $footerLinks }}">
            @foreach ($group['links'] as $link)
              <li><a href="{{ $link['href'] }}" class="{{ $footerLink }}">{{ $link['label'] }}</a></li>
            @endforeach
          </ul>
        </nav>
      @endforeach
    </div>
    <div class="{{ $footerBottom }}">
      <p>&copy; 2026 Sanggar Studio. Prices include VAT.</p>
      <p>Built with MarkasUI</p>
    </div>
  </footer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
