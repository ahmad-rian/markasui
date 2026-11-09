@php
    use Illuminate\Support\HtmlString;

    /* Palet lokal, kelas, dan data: identik dengan versi React dan Vue. */
    $palette = '[--tpl-red:#d6001c] [--tpl-red-strong:#b30017] [--tpl-orange:#ff8a3d] [--tpl-orange-deep:#e8541f] [--tpl-cream:#fff4e3] [--tpl-brown:#8b4a2b] [--tpl-pink:#ffb3c2] [--tpl-violet:#7b4dff] [--tpl-sun:#ffd54a] [--tpl-green:#2fd27a] [--tpl-line:#141414] [--tpl-doodle:#141414] [--tpl-paper:#ffffff] [--tpl-night:#0f0f0f] [--tpl-on-night:#ffffff] [--tpl-on-bright:#141414] [--tpl-white:#ffffff] dark:[--tpl-orange:#f27f34] dark:[--tpl-orange-deep:#d24a18] dark:[--tpl-cream:#f6e9d5] dark:[--tpl-violet:#a68cff] dark:[--tpl-line:#0b0b0b] dark:[--tpl-doodle:#efefef] dark:[--tpl-paper:#f4f4f4] dark:[--tpl-night:#1d1d1d]';
    $motionCss = '@keyframes konek-float{50%{translate:0 -10px}}@keyframes konek-wag{0%,100%{rotate:-10deg}50%{rotate:12deg}}@keyframes konek-pulse{50%{opacity:.3}}@keyframes konek-fly{50%{translate:12px -14px;rotate:6deg}}@media (prefers-reduced-motion:no-preference){.konek-float{animation:konek-float 5s ease-in-out infinite}.konek-float-late{animation:konek-float 5s ease-in-out -2.5s infinite}.konek-wag{animation:konek-wag 1.4s ease-in-out infinite}.konek-pulse{animation:konek-pulse 2s ease-in-out infinite}.konek-fly{animation:konek-fly 3.5s ease-in-out infinite}[data-motion=on] [data-reveal]{transition:opacity .7s cubic-bezier(.2,.7,.2,1),translate .7s cubic-bezier(.2,.7,.2,1)}[data-motion=on] [data-reveal]:not([data-shown]){opacity:0;translate:0 24px}}';
    $root = 'min-h-dvh overflow-x-clip bg-surface text-ink [scroll-behavior:smooth] motion-reduce:[scroll-behavior:auto]';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $header = 'sticky top-0 z-40 border-b border-line/60 bg-surface/90 backdrop-blur';
    $headerInner = 'relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6';
    $brand = 'inline-flex items-center gap-2 rounded-md text-2xl font-extrabold tracking-tight text-(--tpl-red) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $brandMark = 'inline-flex size-8 items-center justify-center rounded-full bg-(--tpl-red) text-(--tpl-white)';
    $navList = 'hidden items-center gap-1 lg:flex';
    $navLink = 'inline-flex h-9 items-center rounded-full px-3 text-sm font-medium transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $navIdle = 'text-muted hover:text-ink';
    $navOn = 'text-ink underline decoration-primary decoration-2 underline-offset-8';
    $headerActions = 'flex items-center gap-2';
    $appButton = 'hidden h-10 items-center rounded-full bg-(--tpl-night) px-5 text-sm font-semibold text-(--tpl-on-night) transition-transform duration-150 ease-out hover:-translate-y-0.5 motion-reduce:transition-none sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuButton = 'inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-subtle lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuPanel = 'absolute inset-x-4 top-full mt-2 grid gap-1 rounded-3xl border border-line bg-surface p-2 shadow-overlay lg:hidden';
    $menuLink = 'flex h-11 items-center rounded-2xl px-4 text-sm font-medium text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $hero = 'relative mx-auto grid max-w-7xl scroll-mt-20 justify-items-center px-4 pt-14 pb-12 text-center md:px-6 md:pt-20 lg:pb-16';
    $heroTitle = 'text-[clamp(3.75rem,12vw,9rem)] leading-[0.86] font-extrabold tracking-[-0.055em] text-ink';
    $heroLine = 'block';
    $heroLead = 'mt-8 max-w-md text-base text-pretty text-muted md:text-lg';
    $heroActions = 'mt-8 flex flex-wrap justify-center gap-3';
    $pillLink = 'inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-transform duration-150 ease-out hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $outlineLink = 'border-2 border-ink text-ink';
    $redButton = 'bg-(--tpl-red) text-(--tpl-white) hover:bg-(--tpl-red-strong)';
    $artRow = 'mt-10 grid w-full max-w-md grid-cols-2 gap-4 lg:contents';
    $artBase = 'h-auto w-full lg:absolute lg:bottom-4 lg:w-[25%] lg:max-w-96';
    $wrap = 'mx-auto max-w-7xl px-4 md:px-6';
    $section = 'scroll-mt-20 py-16 md:py-24';
    $h2 = 'text-4xl font-extrabold tracking-[-0.04em] text-balance md:text-6xl';
    $sectionLead = 'mt-4 max-w-xl text-base text-pretty text-muted md:text-lg';
    $cardGrid = 'grid gap-5 md:grid-cols-2';
    $bigCard = 'relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[2rem] p-8 md:p-10';
    $cardIcon = 'inline-flex size-14 items-center justify-center rounded-full text-(--tpl-on-bright)';
    $cardTitle = 'mt-8 max-w-sm text-4xl leading-[1.02] font-extrabold tracking-[-0.04em] md:text-5xl';
    $cardText = 'mt-4 max-w-sm text-base';
    $cardButton = 'relative mt-10 inline-flex h-12 items-center gap-2 self-start rounded-full px-6 text-sm font-semibold transition-transform duration-150 ease-out hover:translate-x-1 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $cardArcs = 'pointer-events-none absolute -right-10 -bottom-10 size-64';
    $statGrid = 'grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line py-12 md:grid-cols-4';
    $statValue = 'text-4xl font-extrabold tracking-[-0.04em] md:text-5xl';
    $statLabel = 'mt-2 text-sm text-muted';
    $pricingHead = 'flex flex-wrap items-end justify-between gap-6';
    $tabGroup = 'inline-flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1';
    $tabBase = 'h-10 rounded-full px-4 text-sm font-semibold transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $tabIdle = 'text-muted hover:text-ink';
    $tabOn = 'bg-primary text-on-primary';
    $boostRow = 'mt-8 flex items-center gap-3';
    $boostLabelClass = 'text-sm font-medium text-ink';
    $planGrid = 'mt-8 grid gap-5 md:grid-cols-3';
    $planCard = 'relative grid content-start gap-5 rounded-[2rem] border-2 bg-surface p-7';
    $planIdle = 'border-line';
    $planFeatured = 'border-primary';
    $planBadge = 'absolute -top-3.5 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary';
    $planName = 'text-sm font-semibold text-muted';
    $planAmount = 'text-5xl font-extrabold tracking-[-0.04em]';
    $planPrice = 'text-lg font-semibold';
    $planPeriod = 'text-sm font-normal text-muted';
    $perkList = 'grid gap-2 text-sm text-muted';
    $perk = 'flex items-center gap-2';
    $perkIcon = 'size-4 shrink-0 text-success';
    $coverageGrid = 'grid items-start gap-10 lg:grid-cols-2';
    $coverageForm = 'mt-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end';
    $chipRow = 'mt-4 flex flex-wrap items-center gap-2 text-sm text-muted';
    $chip = 'inline-flex h-8 items-center rounded-full border border-line px-3 text-sm font-medium text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $errorText = 'text-sm text-danger sm:col-span-2';
    $resultCard = 'grid gap-6 rounded-[2rem] bg-subtle p-8';
    $resultTitle = 'text-2xl font-extrabold tracking-tight';
    $resultRows = 'grid gap-3 sm:grid-cols-3';
    $resultCell = 'grid gap-1 rounded-2xl bg-surface p-4';
    $resultLabel = 'text-xs text-muted';
    $resultValue = 'text-base font-semibold';
    $bars = 'flex h-10 items-end gap-1.5';
    $barBase = 'w-3 rounded-sm';
    $faqWrap = 'scroll-mt-20 py-16 md:py-24';
    $careers = 'grid gap-6 rounded-[2rem] bg-(--tpl-red) p-8 text-(--tpl-white) md:grid-cols-[1fr_auto] md:items-end md:p-12';
    $careersTitle = 'text-4xl font-extrabold tracking-[-0.04em] text-balance md:text-6xl';
    $careersLink = 'inline-flex h-12 items-center justify-center rounded-full bg-(--tpl-white) px-6 text-sm font-semibold text-(--tpl-on-bright) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $footer = 'mt-16 border-t border-line';
    $footerInner = 'mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6';
    $footerTitle = 'text-sm font-semibold text-ink';
    $footerList = 'mt-3 grid gap-2 text-sm text-muted';
    $quietLink = 'rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $footerBottom = 'mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 pb-10 text-sm text-muted md:px-6';
    $small = 'text-sm text-muted';
    $srOnly = 'sr-only';
    $icons = ['menu' => 'M4 7h16M4 12h16M4 17h16', 'close' => 'M18 6 6 18M6 6l12 12', 'arrow' => 'M5 12h14M13 6l6 6-6 6', 'check' => 'M5 12l5 5 9-10', 'people' => 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3 21v-1a6 6 0 0 1 12 0v1M16 3.5a4 4 0 0 1 0 7M21 21v-1a6 6 0 0 0-4-5.6', 'leaf' => 'M5 21c0-9 5-15 15-16-1 10-7 15-15 16ZM5 21l8-8', 'signal' => 'M5 18v-2M10 18v-5M15 18V9M20 18V5'];
    $nav = [['id' => 'home', 'label' => 'Home'], ['id' => 'pricing', 'label' => 'Pricing'], ['id' => 'about', 'label' => 'About'], ['id' => 'investors', 'label' => 'Investors'], ['id' => 'coverage', 'label' => 'Business'], ['id' => 'careers', 'label' => 'Careers']];
    $sectionIds = ['home', 'pricing', 'about', 'investors', 'coverage', 'careers'];
    $outline = 'stroke-(--tpl-line) [stroke-width:5]';
    $line = 'fill-none stroke-(--tpl-line) [stroke-width:3.5]';
    $doodle = 'fill-none stroke-(--tpl-doodle) [stroke-width:3.5]';
    $cream = 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]';
    $cloud = 'fill-(--tpl-orange) stroke-(--tpl-line) [stroke-width:5]';
    $hatch = 'fill-none stroke-(--tpl-orange-deep) [stroke-width:4]';
    $ink = 'fill-(--tpl-line)';
    $blush = 'fill-(--tpl-pink)';
    $pivot = '[transform-box:view-box]';
    $catArt = ['label' => 'Cartoon cat sitting on an orange cloud, holding a phone', 'float' => 'konek-float', 'layers' => [['c' => 'konek-pulse', 's' => [['d' => 'M66 96a6 6 0 1 0 12 0a6 6 0 1 0 -12 0Z', 'c' => 'fill-(--tpl-violet)'], ['d' => 'M58 82A20 20 0 0 1 86 82M48 72A34 34 0 0 1 96 72M38 62A48 48 0 0 1 106 62', 'c' => 'fill-none stroke-(--tpl-violet) [stroke-width:7]']]], ['c' => '', 's' => [['d' => 'M252 64c10-14 28-4 18 9-8 11-25 0-12-10', 'c' => 'fill-none stroke-(--tpl-doodle) [stroke-width:3.5]'], ['d' => 'M268 116l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z', 'c' => 'fill-(--tpl-sun) stroke-(--tpl-line) [stroke-width:3]'], ['d' => 'M26 150l12 4M30 164h12M276 196l12-4', 'c' => 'fill-none stroke-(--tpl-doodle) [stroke-width:3.5]']]], ['c' => '', 's' => [['d' => 'M48 292C18 292 14 252 44 246c-6-32 34-46 54-26 10-32 62-36 74-6 16-22 64-16 64 14 34-6 56 24 36 44 24 14 8 34-18 30H70c-20 2-30-6-22-10Z', 'c' => 'fill-(--tpl-orange) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M60 270c30 12 140 16 202-2M76 284l18-12M108 290l20-14M206 290l22-15M240 284l16-11', 'c' => 'fill-none stroke-(--tpl-orange-deep) [stroke-width:4]']]], ['c' => 'konek-wag [transform-box:view-box] [transform-origin:196px_206px]', 's' => [['d' => 'M196 206c40-2 52-38 30-56-12-10-24 0-16 10', 'c' => 'fill-none stroke-(--tpl-line) [stroke-width:17]'], ['d' => 'M196 206c40-2 52-38 30-56-12-10-24 0-16 10', 'c' => 'fill-none stroke-(--tpl-cream) [stroke-width:8]']]], ['c' => '', 's' => [['d' => 'M118 216c-6-48 12-76 42-76s48 28 42 76Z', 'c' => 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M120 96l-2-46 32 24ZM200 96l2-46-32 24Z', 'c' => 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M126 84l-1-22 15 12ZM194 84l1-22-15 12Z', 'c' => 'fill-(--tpl-pink)'], ['d' => 'M114 108a46 40 0 1 0 92 0a46 40 0 1 0 -92 0Z', 'c' => 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M150 72l4 12M160 70v13M170 72l-4 12', 'c' => 'fill-none stroke-(--tpl-line) [stroke-width:3.5]'], ['d' => 'M138 106a5 6 0 1 0 10 0a5 6 0 1 0 -10 0Z', 'c' => 'fill-(--tpl-line)'], ['d' => 'M172 106a5 6 0 1 0 10 0a5 6 0 1 0 -10 0Z', 'c' => 'fill-(--tpl-line)'], ['d' => 'M124 120a8 5 0 1 0 16 0a8 5 0 1 0 -16 0ZM180 120a8 5 0 1 0 16 0a8 5 0 1 0 -16 0Z', 'c' => 'fill-(--tpl-pink)'], ['d' => 'M155 115h10l-5 6Z', 'c' => 'fill-(--tpl-pink) stroke-(--tpl-line) [stroke-width:2.5]'], ['d' => 'M151 125q4.5 5 9 0 4.5 5 9 0', 'c' => 'fill-none stroke-(--tpl-line) [stroke-width:3.5]'], ['d' => 'M112 112l-16-4M112 120l-16 2M208 112l16-4M208 120l16 2', 'c' => 'fill-none stroke-(--tpl-line) [stroke-width:3.5]'], ['d' => 'M142 156h36a6 6 0 0 1 6 6v44a6 6 0 0 1-6 6h-36a6 6 0 0 1-6-6v-44a6 6 0 0 1 6-6Z', 'c' => 'fill-(--tpl-night) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M143 165h34v36h-34Z', 'c' => 'fill-(--tpl-violet)'], ['d' => 'M150 172h20v10h-14l-6 5Z', 'c' => 'fill-(--tpl-paper)'], ['d' => 'M126 186a10 9 0 1 0 20 0a10 9 0 1 0 -20 0ZM174 186a10 9 0 1 0 20 0a10 9 0 1 0 -20 0Z', 'c' => 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M123 216a15 9 0 1 0 30 0a15 9 0 1 0 -30 0ZM167 216a15 9 0 1 0 30 0a15 9 0 1 0 -30 0Z', 'c' => 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]']]]]];
    $dogArt = ['label' => 'Cartoon puppy sitting on an orange cloud, reading a letter', 'float' => 'konek-float-late', 'layers' => [['c' => 'konek-fly [transform-box:fill-box] origin-center', 's' => [['d' => 'M18 132h62v40H18Z', 'c' => 'fill-(--tpl-paper) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M18 132l31 22 31-22', 'c' => 'fill-none stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M24 116l-8-10M40 112l-2-12M58 114l4-11', 'c' => 'fill-none stroke-(--tpl-doodle) [stroke-width:3.5]']]], ['c' => 'rotate-6 [transform-box:fill-box] origin-center', 's' => [['d' => 'M222 50h64v64h-64Z', 'c' => 'fill-(--tpl-sun) stroke-(--tpl-line) [stroke-width:4]'], ['d' => 'M240 66v32M240 84q8-9 15 0v14M268 82v16M281 66v20', 'c' => 'fill-none stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M265 73a3 3 0 1 0 6 0a3 3 0 1 0 -6 0ZM278 96a3 3 0 1 0 6 0a3 3 0 1 0 -6 0Z', 'c' => 'fill-(--tpl-line)']]], ['c' => '', 's' => [['d' => 'M100 46c-6-8-18-2-12 8l12 10 12-10c6-10-6-16-12-8Z', 'c' => 'fill-(--tpl-red) stroke-(--tpl-line) [stroke-width:3]'], ['d' => 'M262 168c12-6 20 8 10 14-10 6-18-8-6-14', 'c' => 'fill-none stroke-(--tpl-doodle) [stroke-width:3.5]'], ['d' => 'M286 214l12 4M22 196l12-4', 'c' => 'fill-none stroke-(--tpl-doodle) [stroke-width:3.5]']]], ['c' => '', 's' => [['d' => 'M40 290c-26-4-22-40 6-40 0-30 40-40 56-18 14-36 70-36 78-6 18-20 64-12 60 18 32-2 50 26 28 42 12 18-16 22-32 16H64c-20 0-34-6-24-12Z', 'c' => 'fill-(--tpl-orange) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M54 272c34 12 150 14 210-4M70 286l18-12M104 290l20-14M200 290l22-15M236 286l16-11', 'c' => 'fill-none stroke-(--tpl-orange-deep) [stroke-width:4]']]], ['c' => 'konek-wag [transform-box:view-box] [transform-origin:186px_214px]', 's' => [['d' => 'M186 214c24-8 30-28 20-42', 'c' => 'fill-none stroke-(--tpl-line) [stroke-width:17]'], ['d' => 'M186 214c24-8 30-28 20-42', 'c' => 'fill-none stroke-(--tpl-cream) [stroke-width:8]']]], ['c' => '', 's' => [['d' => 'M110 220c-6-48 12-74 40-74s46 26 40 74Z', 'c' => 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M106 112a44 38 0 1 0 88 0a44 38 0 1 0 -88 0Z', 'c' => 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M155 106a13 12 0 1 0 26 0a13 12 0 1 0 -26 0Z', 'c' => 'fill-(--tpl-brown)'], ['d' => 'M112 92c-20 4-24 40-12 50 12 4 18-22 20-38ZM188 92c20 4 24 40 12 50-12 4-18-22-20-38Z', 'c' => 'fill-(--tpl-brown) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M131 110a5 6 0 1 0 10 0a5 6 0 1 0 -10 0ZM161 110a5 6 0 1 0 10 0a5 6 0 1 0 -10 0Z', 'c' => 'fill-(--tpl-line)'], ['d' => 'M142 124a8 6 0 1 0 16 0a8 6 0 1 0 -16 0Z', 'c' => 'fill-(--tpl-line)'], ['d' => 'M147 134q3 10 6 0Z', 'c' => 'fill-(--tpl-pink)'], ['d' => 'M142 132q8 8 16 0', 'c' => 'fill-none stroke-(--tpl-line) [stroke-width:3.5]'], ['d' => 'M120 160l60-8 6 54-60 8Z', 'c' => 'fill-(--tpl-paper) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M132 170l40-5M134 182l40-5M136 194l24-3', 'c' => 'fill-none stroke-(--tpl-line) [stroke-width:3.5]'], ['d' => 'M114 192a10 9 0 1 0 20 0a10 9 0 1 0 -20 0ZM172 186a10 9 0 1 0 20 0a10 9 0 1 0 -20 0Z', 'c' => 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]'], ['d' => 'M113 220a15 9 0 1 0 30 0a15 9 0 1 0 -30 0ZM157 220a15 9 0 1 0 30 0a15 9 0 1 0 -30 0Z', 'c' => 'fill-(--tpl-cream) stroke-(--tpl-line) [stroke-width:5]']]]]];
    $arcs = 'M40 200a120 120 0 0 1 240 0M80 200a80 80 0 0 1 160 0M120 200a40 40 0 0 1 80 0';
    $cards = [['id' => 'people', 'title' => 'Empowering people', 'text' => 'Affordable data, free calls to family, and digital skills classes in 120 cities. Connection should never be a luxury.', 'icon' => 'people', 'card' => 'bg-(--tpl-red) text-(--tpl-white)', 'iconTone' => 'bg-(--tpl-green)', 'button' => 'bg-(--tpl-white) text-(--tpl-on-bright)', 'arcs' => 'stroke-(--tpl-white)/25', 'href' => '#pricing'], ['id' => 'future', 'title' => 'We connect for a better future', 'text' => 'Solar powered towers, recycled SIM trays, and a network that reaches villages from Aceh to Papua.', 'icon' => 'leaf', 'card' => 'bg-(--tpl-night) text-(--tpl-on-night)', 'iconTone' => 'bg-(--tpl-white)', 'button' => 'border-2 border-(--tpl-white) text-(--tpl-white)', 'arcs' => 'stroke-(--tpl-white)/15', 'href' => '#coverage']];
    $stats = [['60 M+', 'customers across Indonesia'], ['34', 'provinces on our network'], ['98%', 'of people within 4G reach'], ['Rp41,2 T', 'revenue in 2025']];
    $tabs = [['id' => 'prepaid', 'label' => 'Prepaid', 'boost' => 'Double the quota', 'period' => '/30 days'], ['id' => 'postpaid', 'label' => 'Postpaid', 'boost' => 'Double the quota', 'period' => '/month'], ['id' => 'home', 'label' => 'Home internet', 'boost' => 'Double the speed', 'period' => '/month']];
    $plans = ['prepaid' => [['name' => 'Lite', 'amount' => '6 GB', 'boosted' => '12 GB', 'price' => 'Rp35.000', 'boostedPrice' => 'Rp50.000', 'perks' => ['Unlimited WhatsApp', '100 minutes to all operators']], ['name' => 'Daily', 'amount' => '25 GB', 'boosted' => '50 GB', 'price' => 'Rp75.000', 'boostedPrice' => 'Rp99.000', 'perks' => ['Unlimited social apps', 'Free calls to Konek numbers']], ['name' => 'Max', 'amount' => '60 GB', 'boosted' => '120 GB', 'price' => 'Rp130.000', 'boostedPrice' => 'Rp165.000', 'perks' => ['5G where available', 'Hotspot with no limits']]], 'postpaid' => [['name' => 'Halo', 'amount' => '30 GB', 'boosted' => '60 GB', 'price' => 'Rp100.000', 'boostedPrice' => 'Rp135.000', 'perks' => ['Rollover unused quota', 'Unlimited calls']], ['name' => 'Halo Plus', 'amount' => '75 GB', 'boosted' => '150 GB', 'price' => 'Rp175.000', 'boostedPrice' => 'Rp220.000', 'perks' => ['Video streaming pass', 'Roaming in ASEAN']], ['name' => 'Halo Family', 'amount' => '200 GB', 'boosted' => '400 GB', 'price' => 'Rp350.000', 'boostedPrice' => 'Rp425.000', 'perks' => ['Share with 4 lines', 'Priority support']]], 'home' => [['name' => 'Basic', 'amount' => '30 Mbps', 'boosted' => '60 Mbps', 'price' => 'Rp250.000', 'boostedPrice' => 'Rp310.000', 'perks' => ['Free Wi-Fi 6 router', 'Installed in 2 days']], ['name' => 'Stream', 'amount' => '100 Mbps', 'boosted' => '200 Mbps', 'price' => 'Rp385.000', 'boostedPrice' => 'Rp455.000', 'perks' => ['90 TV channels', 'Mesh extender included']], ['name' => 'Ultra', 'amount' => '300 Mbps', 'boosted' => '600 Mbps', 'price' => 'Rp575.000', 'boostedPrice' => 'Rp690.000', 'perks' => ['Symmetric upload', 'Static IP on request']]]];
    $FEATURED = 1;
    $coverageByCity = ['jakarta' => ['network' => '5G', 'speed' => 'Up to 420 Mbps', 'home' => 'Fiber ready', 'bars' => 4], 'surabaya' => ['network' => '5G', 'speed' => 'Up to 380 Mbps', 'home' => 'Fiber ready', 'bars' => 4], 'bandung' => ['network' => '5G', 'speed' => 'Up to 350 Mbps', 'home' => 'Fiber ready', 'bars' => 4], 'denpasar' => ['network' => '5G', 'speed' => 'Up to 300 Mbps', 'home' => 'Fiber ready', 'bars' => 4], 'medan' => ['network' => '4G+', 'speed' => 'Up to 150 Mbps', 'home' => 'Fiber ready', 'bars' => 3], 'makassar' => ['network' => '4G+', 'speed' => 'Up to 140 Mbps', 'home' => 'Fiber in 2026', 'bars' => 3], 'jayapura' => ['network' => '4G', 'speed' => 'Up to 80 Mbps', 'home' => 'Fixed wireless', 'bars' => 2]];
    $fallbackCoverage = ['network' => '4G', 'speed' => 'Up to 60 Mbps', 'home' => 'Fiber coming in 2027', 'bars' => 2];
    $quickCities = ['Jakarta', 'Medan', 'Makassar', 'Jayapura'];
    $barHeights = ['h-3', 'h-5', 'h-7', 'h-10'];
    $faqs = [['question' => 'Can I keep my current number?', 'answer' => 'Yes. Port your number from any Indonesian operator in the app. It takes about 24 hours and your old SIM keeps working until the switch.'], ['question' => 'How fast is SIM card delivery?', 'answer' => 'Same day in Jakarta, Surabaya, and Bandung, and one to two days everywhere else. Delivery is free.'], ['question' => 'What happens when I run out of quota?', 'answer' => 'You keep a slow 256 Kbps connection for messaging, and you can add a top up from Rp10.000 in the app at any time.'], ['question' => 'Is home internet available in apartments?', 'answer' => 'In most buildings, yes. Check coverage with your city and our team confirms the building within one working day.'], ['question' => 'Can I change plans later?', 'answer' => 'Anytime. Upgrades apply right away, and downgrades start on your next billing date with no fee.']];
    $footerColumns = [['title' => 'Products', 'links' => ['Prepaid', 'Postpaid', 'Home internet', 'eSIM']], ['title' => 'Company', 'links' => ['About', 'Investors', 'Careers', 'Newsroom']], ['title' => 'Support', 'links' => ['Help center', 'Store locator', 'Network status', 'Contact']]];

    $cx = fn (...$c) => implode(' ', array_filter($c));
    $icon = fn (string $name, string $class) => new HtmlString('<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>');
    $illustration = function (array $art, string $class) use ($cx) {
        $layers = '';
        foreach ($art['layers'] as $layer) {
            $paths = '';
            foreach ($layer['s'] as $shape) {
                $paths .= '<path d="'.e($shape['d']).'" class="'.e($shape['c']).'" />';
            }
            $layers .= '<g class="'.e($layer['c']).'">'.$paths.'</g>';
        }

        return new HtmlString('<svg class="'.e($cx($class, $art['float'])).'" viewBox="0 0 320 320" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="'.e($art['label']).'">'.$layers.'</svg>');
    };
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  class="{{ $cx($root, $palette) }}"
  x-data="{
    active: 'home',
    menuOpen: false,
    tab: @js($tabs[0]['id']),
    boost: false,
    city: '',
    result: null,
    cityError: '',
    ids: @js($sectionIds),
    tabs: @js($tabs),
    plans: @js($plans),
    coverageByCity: @js($coverageByCity),
    fallback: @js($fallbackCoverage),
    get currentTab() { return this.tabs.find((item) => item.id === this.tab); },
    readHash() { const id = window.location.hash.slice(1); return this.ids.includes(id) ? id : 'home'; },
    {{-- Elemen data-reveal muncul saat masuk layar; dilewati saat reduced motion. --}}
    startReveal(element) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
      element.dataset.motion = 'on';
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-shown', '');
          observer.unobserve(entry.target);
        }
      }, { rootMargin: '0px 0px -10% 0px' });
      element.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item));
    },
    toast(detail) { this.$dispatch('markas-toast', detail); },
    getApp() { this.toast({ title: 'Get the Konek app', description: 'Search for Konek in the App Store or Google Play.' }); },
    orderSim() { this.toast({ title: 'SIM card on its way', description: 'Free delivery in 1 to 2 days anywhere in Indonesia.', variant: 'success' }); },
    choosePlan(plan) {
      this.toast({ title: plan.name + ' plan selected', description: (this.boost ? plan.boosted : plan.amount) + ' for ' + (this.boost ? plan.boostedPrice : plan.price) + this.currentTab.period + '.', variant: 'success' });
    },
    check(name) {
      const trimmed = name.trim();
      if (!trimmed) {
        this.cityError = 'Enter a city name, like Jakarta.';
        this.result = null;
        return;
      }
      const coverage = this.coverageByCity[trimmed.toLowerCase()] ?? this.fallback;
      this.cityError = '';
      this.city = trimmed;
      this.result = { city: trimmed, coverage };
      this.toast({ title: 'Coverage checked', description: coverage.network + ' in ' + trimmed + ', ' + coverage.speed.toLowerCase() + '.' });
    },
  }"
  x-init="active = readHash(); startReveal($el)"
  x-on:hashchange.window="active = readHash()"
>
  <style>{!! $motionCss !!}</style>
  <header class="{{ $header }}">
    <div class="{{ $headerInner }}">
      <a href="#home" class="{{ $brand }}" aria-label="Konek, home"><span class="{{ $brandMark }}" aria-hidden="true">{{ $icon('signal', 'size-4') }}</span>konek</a>
      <nav aria-label="Main" class="{{ $navList }}">
        @foreach ($nav as $item)
          <a href="#{{ $item['id'] }}" class="{{ $navLink }}" :class="active === @js($item['id']) ? @js($navOn) : @js($navIdle)" :aria-current="active === @js($item['id']) ? 'location' : null">{{ $item['label'] }}</a>
        @endforeach
      </nav>
      <div class="{{ $headerActions }}">
        <button type="button" class="{{ $appButton }}" x-on:click="getApp()">Get the app</button>
        <button type="button" class="{{ $menuButton }}" aria-controls="konek-menu" :aria-expanded="menuOpen ? 'true' : 'false'" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" x-on:click="menuOpen = !menuOpen"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="menuOpen ? @js($icons['close']) : @js($icons['menu'])" d="{{ $icons['menu'] }}" /></svg></button>
      </div>
      <template x-if="menuOpen">
        <nav id="konek-menu" aria-label="Mobile" class="{{ $menuPanel }}" x-on:keydown.escape="menuOpen = false">
          @foreach ($nav as $item)
            <a href="#{{ $item['id'] }}" class="{{ $menuLink }}" :aria-current="active === @js($item['id']) ? 'location' : null" x-on:click="menuOpen = false">{{ $item['label'] }}</a>
          @endforeach
        </nav>
      </template>
    </div>
  </header>

  <main>
    <section id="home" aria-labelledby="konek-title" class="{{ $hero }}">
      <h1 id="konek-title" class="{{ $heroTitle }}"><span class="{{ $heroLine }}">Stay</span><span class="{{ $heroLine }}">Connected</span></h1>
      <p class="{{ $heroLead }}">We provide mobile and home internet to over 60 million customers across 34 provinces.</p>
      <div class="{{ $heroActions }}">
        <a href="#pricing" class="{{ $cx($pillLink, $outlineLink) }}">View plans</a>
        <button type="button" class="{{ $cx($pillLink, $redButton) }}" x-on:click="orderSim()">Order a SIM card</button>
      </div>
      <div class="{{ $artRow }}">{{ $illustration($catArt, $cx($artBase, 'lg:left-4')) }}{{ $illustration($dogArt, $cx($artBase, 'lg:right-4')) }}</div>
    </section>

    <section id="about" aria-labelledby="konek-about-title" class="{{ $cx($wrap, $section) }}">
      <h2 id="konek-about-title" class="{{ $srOnly }}">About Konek</h2>
      <ul class="{{ $cardGrid }}" data-reveal="">
        @foreach ($cards as $item)
          <li class="{{ $cx($bigCard, $item['card']) }}">
            <svg class="{{ $cardArcs }}" viewBox="0 0 320 320" fill="none" aria-hidden="true"><path d="{{ $arcs }}" class="{{ $cx('[stroke-width:18]', $item['arcs']) }}" stroke-linecap="round" /></svg>
            <div class="relative">
              <span class="{{ $cx($cardIcon, $item['iconTone']) }}" aria-hidden="true">{{ $icon($item['icon'], 'size-6') }}</span>
              <h3 class="{{ $cardTitle }}">{{ $item['title'] }}</h3>
              <p class="{{ $cardText }}">{{ $item['text'] }}</p>
            </div>
            <a href="{{ $item['href'] }}" class="{{ $cx($cardButton, $item['button']) }}">Start building<span class="{{ $srOnly }}">: {{ $item['title'] }}</span>{{ $icon('arrow', 'size-4') }}</a>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="investors" aria-labelledby="konek-investors-title" class="{{ $cx($wrap, 'scroll-mt-20') }}">
      <h2 id="konek-investors-title" class="{{ $srOnly }}">Konek in numbers</h2>
      <dl class="{{ $statGrid }}" data-reveal="">
        @foreach ($stats as [$value, $label])
          <div><dt class="{{ $statValue }}">{{ $value }}</dt><dd class="{{ $statLabel }}">{{ $label }}</dd></div>
        @endforeach
      </dl>
    </section>

    <section id="pricing" aria-labelledby="konek-pricing-title" class="{{ $cx($wrap, $section) }}">
      <div class="{{ $pricingHead }}" data-reveal="">
        <div>
          <h2 id="konek-pricing-title" class="{{ $h2 }}">Plans for every day</h2>
          <p class="{{ $sectionLead }}">No contracts, no surprise fees. Switch plans whenever life changes.</p>
        </div>
        <div class="{{ $tabGroup }}" role="group" aria-label="Plan type">
          @foreach ($tabs as $item)
            <button type="button" class="{{ $tabBase }}" :class="tab === @js($item['id']) ? @js($tabOn) : @js($tabIdle)" :aria-pressed="tab === @js($item['id']) ? 'true' : 'false'" x-on:click="tab = @js($item['id'])">{{ $item['label'] }}</button>
          @endforeach
        </div>
      </div>
      <div class="{{ $boostRow }}">
        <x-markas.switch id="konek-boost" x-model="boost" />
        <label for="konek-boost" class="{{ $boostLabelClass }}" x-text="currentTab.boost">{{ $tabs[0]['boost'] }}</label>
      </div>
      <ul class="{{ $planGrid }}" data-reveal="">
        @foreach ($tabs as $tabItem)
          @foreach ($plans[$tabItem['id']] as $index => $plan)
            <template x-if="tab === @js($tabItem['id'])">
                <li data-plan="{{ $plan['name'] }}" class="{{ $cx($planCard, $index === $FEATURED ? $planFeatured : $planIdle) }}">
                  @if ($index === $FEATURED)
                    <span class="{{ $planBadge }}">Most popular</span>
                  @endif
                  <div><h3 class="{{ $planName }}">{{ $plan['name'] }}</h3><p class="{{ $planAmount }}" x-text="boost ? @js($plan['boosted']) : @js($plan['amount'])">{{ $plan['amount'] }}</p></div>
                  <p class="{{ $planPrice }}"><span x-text="boost ? @js($plan['boostedPrice']) : @js($plan['price'])">{{ $plan['price'] }}</span><span class="{{ $planPeriod }}">{{ $tabItem['period'] }}</span></p>
                  <ul class="{{ $perkList }}">
                    @foreach ($plan['perks'] as $text)
                      <li class="{{ $perk }}">{{ $icon('check', $perkIcon) }}{{ $text }}</li>
                    @endforeach
                  </ul>
                  <x-markas.button :variant="$index === $FEATURED ? 'primary' : 'secondary'" x-on:click="choosePlan(plans[tab][{{ $index }}])">Choose {{ $plan['name'] }}</x-markas.button>
                </li>
            </template>
          @endforeach
        @endforeach
      </ul>
    </section>

    <section id="coverage" aria-labelledby="konek-coverage-title" class="{{ $cx($wrap, $section) }}">
      <div class="{{ $coverageGrid }}">
        <div data-reveal="">
          <h2 id="konek-coverage-title" class="{{ $h2 }}">Check coverage for your home or business</h2>
          <p class="{{ $sectionLead }}">See signal, speed, and home internet options in your city before you switch.</p>
          <form class="{{ $coverageForm }}" novalidate aria-label="Coverage check" x-on:submit.prevent="check(city)">
            <x-markas.input id="konek-city" label="City" name="city" placeholder="Jakarta" x-model="city" x-bind:aria-invalid="cityError ? 'true' : null" x-bind:aria-describedby="cityError ? 'konek-city-error' : null" />
            <x-markas.button type="submit">Check coverage</x-markas.button>
            <template x-if="cityError"><p id="konek-city-error" class="{{ $errorText }}" x-text="cityError"></p></template>
          </form>
          <div class="{{ $chipRow }}">Try
            @foreach ($quickCities as $name)
              <button type="button" class="{{ $chip }}" x-on:click="check(@js($name))">{{ $name }}</button>
            @endforeach
          </div>
        </div>
        <div class="{{ $resultCard }}" aria-live="polite" data-reveal="">
          <template x-if="result">
            <div class="contents">
              <div class="flex items-start justify-between gap-4">
                <div><p class="{{ $small }}">Coverage in</p><p class="{{ $resultTitle }}" data-result="" x-text="result.city"></p></div>
                <div class="{{ $bars }}" aria-hidden="true">
                  @foreach ($barHeights as $index => $height)
                    <span class="{{ $cx($barBase, $height) }}" :class="{{ $index }} < result.coverage.bars ? 'bg-primary' : 'bg-line'"></span>
                  @endforeach
                </div>
              </div>
              <dl class="{{ $resultRows }}">
                <div class="{{ $resultCell }}"><dt class="{{ $resultLabel }}">Network</dt><dd class="{{ $resultValue }}" x-text="result.coverage.network"></dd></div>
                <div class="{{ $resultCell }}"><dt class="{{ $resultLabel }}">Speed</dt><dd class="{{ $resultValue }}" x-text="result.coverage.speed"></dd></div>
                <div class="{{ $resultCell }}"><dt class="{{ $resultLabel }}">Home internet</dt><dd class="{{ $resultValue }}" x-text="result.coverage.home"></dd></div>
              </dl>
            </div>
          </template>
          <template x-if="!result">
            <div class="contents">
              <div class="{{ $bars }}" aria-hidden="true">
                @foreach ($barHeights as $height)
                  <span class="{{ $cx($barBase, $height, 'bg-line') }}"></span>
                @endforeach
              </div>
              <p class="{{ $resultTitle }}">Your signal, at a glance</p>
              <p class="{{ $small }}">Pick a city to see network, speed, and home internet. We cover 514 cities and regencies today.</p>
            </div>
          </template>
        </div>
      </div>
    </section>

    <div class="{{ $cx($wrap, $faqWrap) }}" data-reveal="">
      <x-markas.faq id="faq" variant="split" title="Questions, answered" description="Everything people ask before they switch to Konek." :items="$faqs" exclusive />
    </div>

    <section id="careers" aria-labelledby="konek-careers-title" class="{{ $cx($wrap, 'scroll-mt-20') }}">
      <div class="{{ $careers }}" data-reveal="">
        <div>
          <h2 id="konek-careers-title" class="{{ $careersTitle }}">Build the network with us</h2>
          <p class="mt-4 max-w-md text-base">320 open roles across 18 cities, from tower engineers to product designers.</p>
        </div>
        <a href="mailto:careers@konek.id" class="{{ $careersLink }}">See open roles</a>
      </div>
    </section>
  </main>

  <footer class="{{ $footer }}">
    <div class="{{ $footerInner }}">
      <div>
        <p class="{{ $cx($brand, 'text-xl') }}">konek</p>
        <p class="{{ $cx($small, 'mt-3 max-w-xs') }}">Mobile and home internet for every corner of Indonesia.</p>
      </div>
      @foreach ($footerColumns as $column)
        <nav aria-label="{{ $column['title'] }}">
          <p class="{{ $footerTitle }}">{{ $column['title'] }}</p>
          <ul class="{{ $footerList }}">
            @foreach ($column['links'] as $label)
              <li><a href="#home" class="{{ $quietLink }}">{{ $label }}</a></li>
            @endforeach
          </ul>
        </nav>
      @endforeach
    </div>
    <div class="{{ $footerBottom }}">
      <p>&copy; 2026 Konek. Built with MarkasUI.</p>
      <a href="#home" class="{{ $quietLink }}">Back to top</a>
    </div>
  </footer>
  <x-markas.toast />
</div>
@php echo preg_replace('/>\s+</', '><', ob_get_clean()); @endphp
