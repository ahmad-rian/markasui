@php
    use Illuminate\Support\HtmlString;

    /* Palet lokal, kelas, dan data: identik dengan versi React dan Vue. Hero dan CTA hijau tua di terang dan gelap. */
    $palette = '[--tpl-lime:#d4f25a] [--tpl-lime-ink:#172003] [--tpl-forest:#0f2a1f] [--tpl-forest-2:#173a2b] [--tpl-snow:#ffffff] dark:[--tpl-forest:#0b1f17] dark:[--tpl-forest-2:#123124] [--tpl-sand:#e8dccb] [--tpl-sand-3:#5e4a2e] [--tpl-sage:#c7d4c1] [--tpl-sage-3:#3b5237] [--tpl-sky:#c9dbe8] [--tpl-sky-3:#284459] [--tpl-clay:#e6c3ae] [--tpl-clay-3:#713a24] [--tpl-mauve:#d8c6e0] [--tpl-mauve-3:#4b3559] dark:[--tpl-sand:#3a3328] dark:[--tpl-sand-3:#e0c9a6] dark:[--tpl-sage:#2f3a2e] dark:[--tpl-sage-3:#bcd4b5] dark:[--tpl-sky:#233441] dark:[--tpl-sky-3:#b5d0e4] dark:[--tpl-clay:#4a3227] dark:[--tpl-clay-3:#ecc2aa] dark:[--tpl-mauve:#3a2f42] dark:[--tpl-mauve-3:#dcc6e8]';
    $root = 'min-h-dvh bg-canvas p-2 text-ink scroll-smooth sm:p-3 motion-reduce:scroll-auto';
    $reveal = 'transition duration-700 ease-out motion-safe:[&:not([data-in])]:translate-y-6 motion-safe:[&:not([data-in])]:opacity-0 motion-reduce:transition-none';
    $hero = 'relative isolate overflow-hidden rounded-[28px] bg-(--tpl-forest) text-(--tpl-snow)';
    $heroLines = 'pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--tpl-snow)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--tpl-snow)_7%,transparent)_1px,transparent_1px)] bg-size-[96px_96px] [mask-image:radial-gradient(ellipse_70%_80%_at_75%_35%,black,transparent)]';
    $heroGlow = 'pointer-events-none absolute -top-48 -right-40 -z-10 size-[720px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--tpl-lime)_16%,transparent),transparent)]';
    $headerWrap = 'relative z-20 mx-auto w-full max-w-[1240px] px-5 pt-5 sm:px-8 lg:px-10';
    $navbar = 'flex items-center justify-between gap-4 border-b border-(--tpl-snow)/15 pb-5';
    $brand = 'flex w-fit items-center gap-2.5 rounded-lg text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)';
    $brandMark = 'flex size-9 items-center justify-center rounded-xl bg-(--tpl-lime) text-(--tpl-lime-ink)';
    $navLinks = 'hidden items-center gap-8 lg:flex';
    $navLink = 'rounded-sm text-sm font-medium text-(--tpl-snow)/75 transition-colors duration-150 hover:text-(--tpl-snow) motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)';
    $navTools = 'flex items-center gap-2';
    $iconButton = 'flex size-10 items-center justify-center rounded-full border border-(--tpl-snow)/20 text-(--tpl-snow) transition-colors duration-150 hover:bg-(--tpl-snow)/10 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)';
    $contactNav = 'items-center justify-center gap-2 rounded-full bg-(--tpl-lime) text-sm font-semibold whitespace-nowrap text-(--tpl-lime-ink) transition-[filter] duration-150 hover:brightness-95 motion-reduce:transition-none hidden h-10 px-5 sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)';
    $menuButton = 'flex size-10 items-center justify-center rounded-full border border-(--tpl-snow)/20 text-(--tpl-snow) transition-colors duration-150 hover:bg-(--tpl-snow)/10 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime) lg:hidden';
    $panel = 'absolute inset-x-5 top-full z-30 -mt-2 grid gap-3 rounded-2xl bg-surface p-3 text-ink shadow-overlay sm:inset-x-8 lg:inset-x-10';
    $menuList = 'grid gap-1';
    $menuLink = 'block rounded-xl px-3 py-2.5 text-base font-medium hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $resultList = 'grid gap-1';
    $resultLink = 'flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $resultTag = 'shrink-0 rounded-full bg-subtle px-2.5 py-0.5 text-xs text-muted';
    $muted = 'text-sm text-muted';
    $heroBody = 'relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 pt-14 pb-10 sm:px-8 sm:pt-20 sm:pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-10 lg:pt-24 lg:pb-24';
    $heroIntro = 'grid min-w-0 justify-items-start gap-7';
    $eyebrow = 'inline-flex items-center gap-2 rounded-full border border-(--tpl-snow)/15 bg-(--tpl-snow)/5 px-3 py-1 text-sm text-(--tpl-snow)/85';
    $eyebrowDot = 'size-1.5 rounded-full bg-(--tpl-lime)';
    $heroTitle = 'max-w-[12ch] text-[44px] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[64px] xl:text-[84px]';
    $heroAccent = 'font-serif font-normal tracking-normal text-(--tpl-lime) italic';
    $heroLead = 'max-w-lg text-base leading-relaxed text-pretty text-(--tpl-snow)/75 sm:text-lg';
    $heroActions = 'flex flex-wrap items-center gap-3';
    $ctaBig = 'inline-flex items-center justify-center gap-2 rounded-full bg-(--tpl-lime) text-sm font-semibold whitespace-nowrap text-(--tpl-lime-ink) transition-[filter] duration-150 hover:brightness-95 motion-reduce:transition-none h-12 pr-1.5 pl-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)';
    $ctaArrow = 'flex size-9 items-center justify-center rounded-full bg-(--tpl-lime-ink) text-(--tpl-lime)';
    $ghostLink = 'inline-flex h-12 items-center gap-2 rounded-full border border-(--tpl-snow)/25 px-6 text-sm font-medium transition-colors duration-150 hover:bg-(--tpl-snow)/10 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-lime)';
    $trust = 'flex w-full max-w-lg flex-wrap items-center gap-x-4 gap-y-2 border-t border-(--tpl-snow)/15 pt-6 text-sm text-(--tpl-snow)/75';
    $trustAvatars = 'flex';
    $trustAvatar = '-ml-1.5 flex size-9 items-center justify-center rounded-full border-2 border-(--tpl-forest) bg-(--art-1) text-[11px] font-semibold text-(--art-3) first:ml-0';
    $trustStars = 'flex gap-0.5 text-(--tpl-lime)';
    $visual = 'relative min-w-0';
    $dataCard = 'grid gap-6 rounded-[28px] border border-(--tpl-snow)/10 bg-(--tpl-forest-2) p-5 shadow-overlay sm:p-7';
    $cardHead = 'flex flex-wrap items-start justify-between gap-4';
    $cardLabel = 'text-sm text-(--tpl-snow)/70';
    $cardValue = 'mt-1 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl';
    $growthBadge = 'inline-flex items-center gap-1 rounded-full bg-(--tpl-lime) px-2.5 py-1 text-xs font-semibold text-(--tpl-lime-ink)';
    $chartGridLine = 'stroke-(--tpl-snow)/10';
    $chartArea = 'transition-opacity delay-500 duration-1000 motion-safe:[[data-reveal]:not([data-in])_&]:opacity-0 motion-reduce:transition-none';
    $chartLine = 'fill-none stroke-(--tpl-lime) [stroke-dasharray:1] transition-[stroke-dashoffset] duration-[1800ms] ease-out motion-safe:[[data-reveal]:not([data-in])_&]:[stroke-dashoffset:1] motion-reduce:transition-none';
    $chartHalo = 'fill-(--tpl-lime)/20';
    $chartDot = 'fill-(--tpl-lime)';
    $chartAxis = 'mt-3 flex justify-between text-xs text-(--tpl-snow)/60 tabular-nums';
    $metricGrid = 'grid grid-cols-2 gap-3';
    $metricTile = 'rounded-2xl border border-(--tpl-snow)/10 bg-(--tpl-snow)/5 p-4';
    $metricTileLime = 'rounded-2xl bg-(--tpl-lime) p-4 text-(--tpl-lime-ink)';
    $metricValue = 'text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl';
    $metricLabel = 'mt-1 text-sm text-(--tpl-snow)/70';
    $metricLabelLime = 'mt-1 text-sm text-(--tpl-lime-ink)/80';
    $section = 'mx-auto w-full max-w-[1240px] px-3 py-16 sm:px-6 lg:py-24';
    $sectionHead = 'mb-12 grid gap-5 lg:mb-14 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16';
    $kicker = 'mb-4 flex items-center gap-2 text-sm font-medium text-muted';
    $kickerDot = 'size-1.5 rounded-full bg-primary';
    $h2 = 'text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[56px]';
    $lead = 'max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg';
    $arrowLink = 'inline-flex w-fit items-center gap-2 rounded-full text-sm font-semibold underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $tabList = 'grid grid-cols-3 border-b border-line';
    $tab = '-mb-px flex flex-col items-start gap-1 border-b-2 pt-2 pr-3 pb-4 text-left text-base font-semibold tracking-tight transition-colors duration-150 motion-reduce:transition-none sm:flex-row sm:items-center sm:gap-3 sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $tabIdle = 'border-transparent text-muted hover:text-ink';
    $tabActive = 'border-primary text-ink';
    $tabNumber = 'text-sm font-medium text-muted tabular-nums';
    $tabPanel = 'mt-8 grid gap-10 rounded-[28px] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:p-12';
    $panelTitle = 'text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl';
    $panelText = 'mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted';
    $pointList = 'mt-8 mb-8 grid gap-3';
    $pointItem = 'flex items-center gap-3 text-sm font-medium sm:text-base';
    $pointIcon = 'flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary';
    $panelStats = 'grid content-start gap-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16';
    $statPair = 'flex flex-col-reverse';
    $panelStatValue = 'text-5xl font-semibold tracking-[-0.03em] tabular-nums sm:text-6xl';
    $panelStatLabel = 'mt-2 max-w-64 text-sm text-muted';
    $cardGrid = 'grid gap-4 lg:grid-cols-3';
    $greyCard = 'flex min-h-[520px] flex-col gap-5 rounded-[28px] bg-subtle p-6 sm:p-7';
    $limeCard = 'flex min-h-[520px] flex-col gap-5 rounded-[28px] bg-(--tpl-lime) p-3 text-(--tpl-lime-ink)';
    $chip = 'inline-flex w-fit items-center rounded-full bg-surface px-3 py-1 text-xs font-medium';
    $chipDark = 'inline-flex w-fit items-center rounded-full bg-(--tpl-lime-ink) px-3 py-1 text-xs font-medium text-(--tpl-lime)';
    $h3 = 'text-2xl leading-tight font-semibold tracking-tight text-balance';
    $barChart = 'mt-auto grid gap-3';
    $barRow = 'flex h-36 items-end gap-2';
    $bar = 'flex-1 rounded-t-lg bg-ink/15';
    $barActive = 'flex-1 rounded-t-lg bg-primary';
    $barYears = 'flex justify-between gap-2 text-xs text-muted tabular-nums';
    $limeArt = 'relative min-h-[250px] flex-1 overflow-hidden rounded-[22px] bg-(--tpl-forest)';
    $artSvg = 'absolute inset-0 size-full';
    $artBlob = 'fill-(--tpl-lime)';
    $artSoft = 'fill-(--tpl-lime)/25';
    $artRing = 'fill-none stroke-(--tpl-lime)/45';
    $notch = 'absolute -right-px -bottom-px flex size-[76px] items-end justify-end rounded-tl-[30px] bg-(--tpl-lime) p-2.5';
    $notchLink = 'flex size-14 items-center justify-center rounded-full bg-(--tpl-lime-ink) text-(--tpl-lime) transition-transform duration-200 hover:rotate-45 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $limeBody = 'grid gap-3 px-3 pt-1 pb-4';
    $limeStat = 'text-6xl font-semibold tracking-[-0.03em]';
    $limeMeta = 'text-sm text-(--tpl-lime-ink)/80';
    $avatarRow = 'flex items-center';
    $avatar = '-ml-2 flex size-11 items-center justify-center rounded-full border-2 border-subtle bg-(--art-1) text-sm font-semibold text-(--art-3) first:ml-0';
    $avatarMore = '-ml-2 flex size-11 items-center justify-center rounded-full border-2 border-subtle bg-ink text-xs font-semibold text-canvas';
    $cityList = 'mt-auto grid grid-cols-2 gap-2';
    $cityItem = 'flex flex-col-reverse rounded-2xl bg-surface p-4';
    $cityValue = 'text-3xl font-semibold tracking-tight';
    $filterRow = 'flex flex-wrap gap-2';
    $filter = 'h-9 rounded-full border px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $filterIdle = 'border-line bg-surface text-muted hover:text-ink';
    $filterActive = 'border-primary bg-primary text-on-primary';
    $practiceGrid = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3';
    $practiceCard = 'group flex flex-col gap-6 rounded-[24px] border border-line bg-surface p-6 transition-colors duration-200 hover:border-ink/25 motion-reduce:transition-none sm:p-7';
    $practiceTop = 'flex items-start justify-between';
    $practiceIcon = 'flex size-12 items-center justify-center rounded-2xl border border-line bg-canvas text-ink';
    $practiceArrow = 'text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none';
    $practiceTitle = 'text-xl font-semibold tracking-tight';
    $practiceText = 'mt-2 text-sm leading-relaxed text-pretty text-muted';
    $practiceFoot = 'mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5';
    $leadRow = 'flex items-center gap-2.5 text-sm';
    $leadAvatar = 'flex size-8 items-center justify-center rounded-full bg-(--art-1) text-xs font-semibold text-(--art-3)';
    $tagRow = 'flex flex-wrap gap-1.5';
    $tag = 'rounded-full bg-subtle px-2.5 py-0.5 text-xs text-muted';
    $caseGrid = 'grid gap-4 lg:grid-cols-3';
    $caseCard = 'flex flex-col gap-8 rounded-[28px] border border-line bg-surface p-6 sm:p-8';
    $caseHead = 'flex items-center justify-between gap-3 text-sm';
    $caseValue = 'text-6xl font-semibold tracking-[-0.04em] tabular-nums sm:text-7xl';
    $caseMetric = 'mt-3 flex items-center gap-2.5 text-sm font-medium';
    $caseMark = 'h-0.5 w-6 rounded-full bg-primary';
    $caseFoot = 'mt-auto flex items-center justify-between gap-3 border-t border-line pt-5 text-sm text-muted';
    $quoteGrid = 'grid gap-4 lg:grid-cols-[1fr_2fr]';
    $ratingCard = 'flex flex-col justify-between gap-8 rounded-[28px] bg-(--tpl-lime) p-6 text-(--tpl-lime-ink) sm:p-8';
    $ratingValue = 'text-7xl font-semibold tracking-[-0.04em]';
    $stars = 'flex gap-1';
    $quoteCard = 'flex flex-col justify-between gap-10 rounded-[28px] bg-subtle p-6 sm:p-10';
    $quoteText = 'text-xl leading-snug font-medium tracking-tight text-pretty sm:text-2xl lg:text-[32px]';
    $quoteFoot = 'flex flex-wrap items-center justify-between gap-4';
    $quotePerson = 'flex items-center gap-3';
    $quoteAvatar = 'flex size-12 items-center justify-center rounded-full bg-(--art-1) text-sm font-semibold text-(--art-3)';
    $controls = 'flex items-center gap-3';
    $roundButton = 'flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-canvas motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $counter = 'min-w-10 text-center text-sm text-muted tabular-nums';
    $dots = 'flex gap-1.5';
    $dotBase = 'h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none';
    $dotIdle = 'w-1.5 bg-ink/25';
    $dotActive = 'w-6 bg-primary';
    $logoWrap = 'mt-16 grid gap-6 lg:grid-cols-[200px_1fr] lg:items-center lg:gap-10';
    $logoGrid = 'grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-6';
    $logoCell = 'flex h-20 items-center justify-center gap-2 border-r border-b border-line px-3 text-sm font-semibold tracking-tight text-muted';
    $ctaBand = 'relative isolate grid gap-12 overflow-hidden rounded-[28px] bg-(--tpl-forest) p-6 text-(--tpl-snow) sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-14';
    $ctaLines = 'pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--tpl-snow)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--tpl-snow)_7%,transparent)_1px,transparent_1px)] bg-size-[96px_96px] [mask-image:radial-gradient(ellipse_60%_80%_at_0%_0%,black,transparent)]';
    $ctaKicker = 'mb-4 flex items-center gap-2 text-sm font-medium text-(--tpl-snow)/75';
    $ctaTitle = 'text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-5xl';
    $ctaLead = 'mt-5 max-w-md text-base leading-relaxed text-pretty text-(--tpl-snow)/75';
    $contactList = 'mt-10 grid gap-5';
    $contactItem = 'flex items-start gap-3';
    $contactIcon = 'flex size-10 shrink-0 items-center justify-center rounded-full bg-(--tpl-lime) text-(--tpl-lime-ink)';
    $contactLabel = 'block text-sm text-(--tpl-snow)/70';
    $formCard = 'grid gap-4 rounded-[24px] bg-surface p-5 text-ink sm:grid-cols-2 sm:p-8';
    $full = 'sm:col-span-2';
    $errorText = 'text-sm text-danger sm:col-span-2';
    $formFoot = 'flex flex-wrap items-center justify-between gap-3 sm:col-span-2';
    $footer = 'mx-auto w-full max-w-[1240px] px-3 pt-8 pb-8 sm:px-6';
    $footerTop = 'grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]';
    $footerBrand = 'flex w-fit items-center gap-2.5 rounded-lg text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $footerText = 'mt-4 max-w-xs text-sm leading-relaxed text-muted';
    $footerHeading = 'text-sm font-semibold';
    $footerList = 'mt-4 grid gap-2.5';
    $footerLink = 'rounded-sm text-sm text-muted transition-colors duration-150 hover:text-ink motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $footerBottom = 'flex flex-wrap items-center justify-between gap-4 pt-6 text-sm text-muted';
    $builtLink = 'rounded-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $icons = ['arrow' => 'M5 12h14M13 6l6 6-6 6', 'upRight' => 'M7 17 17 7M8 7h9v9', 'search' => 'm20 20-4.2-4.2M10.5 17.5a7 7 0 1 1 0-14 7 7 0 0 1 0 14z', 'menu' => 'M4 7h16M4 12h16M4 17h16', 'close' => 'M6 6l12 12M18 6 6 18', 'left' => 'm15 18-6-6 6-6', 'right' => 'm9 18 6-6-6-6', 'check' => 'm5 12.5 4.5 4.5L19 7.5', 'trend' => 'M4 16l5-5 4 4 7-7M15 8h5v5', 'chart' => 'M4 19V5M4 19h16M8 15l4-4 3 3 5-6', 'shield' => 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z', 'bolt' => 'M13 3 5 14h6l-1 7 8-11h-6z', 'chip' => 'M8 8h8v8H8zM10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3', 'bag' => 'M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2', 'merge' => 'M6 4v5a6 6 0 0 0 6 6h6M18 15l-3-3M18 15l-3 3M6 20v-3', 'mail' => 'M4 6h16v12H4zM4 7l8 6 8-6', 'phone' => 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z', 'pin' => 'M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'star' => 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z', 'mark' => 'M7 20V4h6a5 5 0 0 1 0 10H7M15 20h2', 'circle' => 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'triangle' => 'M12 4.5 20 19H4z', 'square' => 'M5 5h14v14H5z', 'diamond' => 'M12 3l9 9-9 9-9-9z', 'wave' => 'M3 9c3-3 6-3 9 0s6 3 9 0M3 15c3-3 6-3 9 0s6 3 9 0', 'hexagon' => 'M12 3l8 4.5v9L12 21l-8-4.5v-9z'];
    $tones = ['sand' => '[--art-1:var(--tpl-sand)] [--art-3:var(--tpl-sand-3)]', 'sage' => '[--art-1:var(--tpl-sage)] [--art-3:var(--tpl-sage-3)]', 'sky' => '[--art-1:var(--tpl-sky)] [--art-3:var(--tpl-sky-3)]', 'clay' => '[--art-1:var(--tpl-clay)] [--art-3:var(--tpl-clay-3)]', 'mauve' => '[--art-1:var(--tpl-mauve)] [--art-3:var(--tpl-mauve-3)]'];
    $chart = ['line' => 'M20 156C49 156 79 140 108 140C137 140 167 128 196 128C225 128 255 100 284 100C313 100 343 72 372 72C401 72 431 36 460 36', 'area' => 'M20 156C49 156 79 140 108 140C137 140 167 128 196 128C225 128 255 100 284 100C313 100 343 72 372 72C401 72 431 36 460 36L460 200L20 200Z', 'x' => 460, 'y' => 36, 'grid' => [20, 73, 127, 180]];
    $heroYears = ['2021', '2022', '2023', '2024', '2025', '2026'];
    $heroAvatars = [['initials' => 'WS', 'tone' => 'sage'], ['initials' => 'HG', 'tone' => 'sky'], ['initials' => 'CM', 'tone' => 'clay']];
    $navItems = [['label' => 'Services', 'href' => '#services'], ['label' => 'About', 'href' => '#about'], ['label' => 'Industries', 'href' => '#industries'], ['label' => 'Cases', 'href' => '#cases'], ['label' => 'Insight', 'href' => '#insight']];
    $insights = [['title' => 'Five pricing moves for 2027 budgets', 'tag' => 'Finance'], ['title' => 'What the new OJK rules mean for lenders', 'tag' => 'Regulation'], ['title' => 'Funding the energy transition in Java', 'tag' => 'Energy'], ['title' => 'Running an AI pilot without the hype', 'tag' => 'Technology']];
    $serviceTabs = [['id' => 'strategy', 'label' => 'Strategy', 'title' => 'Growth plans built on real market data', 'text' => 'We size the market, test pricing with real customers, and turn the findings into a three year plan your managers can own.', 'points' => ['Market entry and sizing', 'Pricing and portfolio strategy', 'Board and investor roadmaps'], 'stats' => [['value' => '3.1x', 'label' => 'Average revenue growth over three years'], ['value' => '86', 'label' => 'Growth plans delivered since 2019']]], ['id' => 'finance', 'label' => 'Finance', 'title' => 'Sharper decisions for banks and lenders', 'text' => 'We help banks, multifinance firms, and fintechs price risk, meet OJK rules, and grow a healthier loan book.', 'points' => ['Credit risk models', 'Capital raising and debt advisory', 'OJK and Basel compliance'], 'stats' => [['value' => 'Rp 1,8 T', 'label' => 'Loan portfolios restructured'], ['value' => '-34%', 'label' => 'Average drop in non-performing loans']]], ['id' => 'transformation', 'label' => 'Transformation', 'title' => 'Change that sticks after we leave', 'text' => 'From operating model to digital roadmap, we name owners, budgets, and dates, then stay until the numbers move.', 'points' => ['Operating model redesign', 'Digital and AI roadmaps', 'Post merger integration'], 'stats' => [['value' => '120+', 'label' => 'Transformation programs led'], ['value' => '18 mo', 'label' => 'Median time to payback']]]];
    $growthBars = [['year' => '2021', 'value' => 38], ['year' => '2022', 'value' => 45], ['year' => '2023', 'value' => 54], ['year' => '2024', 'value' => 63], ['year' => '2025', 'value' => 74], ['year' => '2026', 'value' => 88]];
    $partners = [['initials' => 'SA', 'tone' => 'sage'], ['initials' => 'BP', 'tone' => 'sky'], ['initials' => 'LW', 'tone' => 'clay'], ['initials' => 'RP', 'tone' => 'mauve']];
    $cities = [['value' => '14', 'label' => 'Cities across Asia'], ['value' => '120+', 'label' => 'Senior partners']];
    $industries = ['All', 'Finance', 'Energy', 'Technology', 'Consumer'];
    $practices = [['title' => 'Corporate finance', 'text' => 'Valuations, capital structure, and funding plans that hold up in front of investors.', 'lead' => 'Sekar Ayuningtyas', 'initials' => 'SA', 'tone' => 'sage', 'icon' => 'chart', 'tags' => ['Finance']], ['title' => 'Risk and compliance', 'text' => 'Credit, market, and climate risk frameworks that satisfy OJK and your board.', 'lead' => 'Bima Prasetyo', 'initials' => 'BP', 'tone' => 'sky', 'icon' => 'shield', 'tags' => ['Finance', 'Energy']], ['title' => 'Energy transition', 'text' => 'Investment cases for renewables, grid upgrades, and decarbonization programs.', 'lead' => 'Laras Wulandari', 'initials' => 'LW', 'tone' => 'sand', 'icon' => 'bolt', 'tags' => ['Energy']], ['title' => 'Digital transformation', 'text' => 'Roadmaps, platforms, and teams that turn technology spend into revenue.', 'lead' => 'Raka Pratama', 'initials' => 'RP', 'tone' => 'mauve', 'icon' => 'chip', 'tags' => ['Technology']], ['title' => 'Consumer growth', 'text' => 'Pricing, channels, and brand portfolios for fast moving consumer companies.', 'lead' => 'Ayu Lestari', 'initials' => 'AL', 'tone' => 'clay', 'icon' => 'bag', 'tags' => ['Consumer']], ['title' => 'Mergers and acquisitions', 'text' => 'Due diligence, deal strategy, and integration from term sheet to day 100.', 'lead' => 'Dimas Hartono', 'initials' => 'DH', 'tone' => 'sage', 'icon' => 'merge', 'tags' => ['Finance', 'Technology', 'Consumer']]];
    $cases = [['client' => 'Bank Kertajaya', 'industry' => 'Finance', 'value' => '-34%', 'metric' => 'Non-performing loans in 12 months', 'text' => 'Rebuilt the credit scoring model and collections playbook for a regional bank with 1.2 million borrowers.', 'scope' => 'Credit risk', 'time' => '6 weeks'], ['client' => 'Nusa Energi', 'industry' => 'Energy', 'value' => 'Rp 640 M', 'metric' => 'Green financing secured', 'text' => 'Structured the investment case and lender pitch for 210 MW of new solar capacity in East Java.', 'scope' => 'Capital raising', 'time' => '4 months'], ['client' => 'Toko Raya', 'industry' => 'Consumer', 'value' => '2.1x', 'metric' => 'App revenue in one year', 'text' => 'Redesigned the loyalty program and pricing tiers across 380 stores and the mobile app.', 'scope' => 'Consumer growth', 'time' => '9 months']];
    $quotes = [['text' => 'Pranata rebuilt our credit model in six weeks. Our non-performing loans fell by a third within the year.', 'name' => 'Wulan Sari', 'role' => 'CFO, Bank Kertajaya', 'initials' => 'WS', 'tone' => 'sage'], ['text' => 'They challenged every assumption in our plan, then stayed to help us deliver it. That is rare.', 'name' => 'Hendra Gunawan', 'role' => 'CEO, Nusa Energi', 'initials' => 'HG', 'tone' => 'sky'], ['text' => 'The due diligence report was clear enough for our board and deep enough for our analysts.', 'name' => 'Citra Maharani', 'role' => 'Partner, Lintas Capital', 'initials' => 'CM', 'tone' => 'clay'], ['text' => 'Our digital roadmap finally has owners, budgets, and dates. Revenue from the app doubled.', 'name' => 'Fajar Nugroho', 'role' => 'COO, Toko Raya', 'initials' => 'FN', 'tone' => 'mauve']];
    $logos = [['name' => 'Kertajaya', 'glyph' => 'circle'], ['name' => 'Nusa Energi', 'glyph' => 'triangle'], ['name' => 'Lintas Capital', 'glyph' => 'square'], ['name' => 'Toko Raya', 'glyph' => 'diamond'], ['name' => 'Samudra', 'glyph' => 'wave'], ['name' => 'Bumi Agro', 'glyph' => 'hexagon']];
    $contacts = [['icon' => 'mail', 'label' => 'Email', 'value' => 'hello@pranata.id'], ['icon' => 'phone', 'label' => 'Phone', 'value' => '+62 21 5080 1188'], ['icon' => 'pin', 'label' => 'Office', 'value' => 'Menara Astra, Jl. Jend. Sudirman Kav. 5, Jakarta']];
    $footerColumns = [['title' => 'Services', 'links' => ['Strategy', 'Finance', 'Transformation', 'Energy transition']], ['title' => 'Company', 'links' => ['About us', 'Careers', 'Partners', 'Press']], ['title' => 'Insights', 'links' => ['Reports', 'Events', 'Newsletter', 'Podcast']]];
    $EMAIL_PATTERN = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';
    $FORM_ERROR_ID = 'konsultan-form-error';
    $PANEL_ID = 'konsultan-panel';
    $emptyForm = ['name' => '', 'email' => '', 'company' => '', 'service' => '', 'message' => ''];
    $menuItems = array_merge($navItems, [['label' => 'Contact us', 'href' => '#contact']]);
    $maxBar = max(array_column($growthBars, 'value'));
    $firstTab = $serviceTabs[0];
    $cx = fn (...$classes) => implode(' ', array_filter($classes));
    $svgOpen = fn (string $class = 'size-4') => '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    $icon = fn (string $name, string $class = 'size-4') => new HtmlString($svgOpen($class).'<path d="'.$icons[$name].'" /></svg>');
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  class="{{ $cx($root, $palette) }}"
  x-data="{
    menuOpen: false,
    searchOpen: false,
    query: '',
    tabIndex: 0,
    tabs: @js($serviceTabs),
    industry: 'All',
    quoteIndex: 0,
    quotes: @js($quotes),
    tones: @js($tones),
    form: @js($emptyForm),
    error: { field: '', message: '' },
    get tab() { return this.tabs[this.tabIndex]; },
    get quote() { return this.quotes[this.quoteIndex]; },
    matches(text) { return text.toLowerCase().includes(this.query.trim().toLowerCase()); },
    get resultCount() { return @js(array_map(fn ($i) => $i['title'].' '.$i['tag'], $insights)).filter((t) => this.matches(t)).length; },
    get shownCount() { return @js(array_column($practices, 'tags')).filter((tags) => this.industry === 'All' || tags.includes(this.industry)).length; },
    toggleMenu() { this.menuOpen = !this.menuOpen; this.searchOpen = false; },
    toggleSearch() { this.searchOpen = !this.searchOpen; this.menuOpen = false; this.$nextTick(() => document.querySelector(@js('#'.$PANEL_ID.' input'))?.focus()); },
    closePanels() { this.menuOpen = false; this.searchOpen = false; },
    onTabKey(event) {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (!step) return;
      event.preventDefault();
      this.tabIndex = (this.tabIndex + step + this.tabs.length) % this.tabs.length;
      document.getElementById('konsultan-tab-' + this.tab.id)?.focus();
    },
    moveQuote(step) { this.quoteIndex = (this.quoteIndex + step + this.quotes.length) % this.quotes.length; },
    submit() {
      const name = this.form.name.trim();
      const email = this.form.email.trim();
      if (!name) { this.error = { field: 'name', message: 'Tell us your name.' }; return; }
      if (!new RegExp(@js($EMAIL_PATTERN)).test(email)) { this.error = { field: 'email', message: 'Enter a valid email address, like you@company.com.' }; return; }
      this.error = { field: '', message: '' };
      this.form = @js($emptyForm);
      this.$dispatch('markas-toast', { title: 'Request received', description: 'Thanks, ' + name.split(' ')[0] + '. A partner will reply within one business day.', variant: 'success' });
    },
  }"
  x-init="
    {{-- Animasi masuk saat elemen terlihat; tanpa animasi saat reduced motion (lihat kelas reveal). --}}
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-in', '');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    $el.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
  "
>
  <section id="top" class="{{ $hero }}" aria-label="Introduction">
    <div class="{{ $heroLines }}" aria-hidden="true"></div>
    <div class="{{ $heroGlow }}" aria-hidden="true"></div>
    <header class="{{ $headerWrap }}">
      <nav aria-label="Main" class="{{ $navbar }}">
        <a href="#top" class="{{ $brand }}">
          <span class="{{ $brandMark }}" aria-hidden="true">{{ $icon('mark', 'size-5') }}</span>
          Pranata
        </a>
        <div class="{{ $navLinks }}">
          @foreach ($navItems as $item)
            <a href="{{ $item['href'] }}" class="{{ $navLink }}">{{ $item['label'] }}</a>
          @endforeach
        </div>
        <div class="{{ $navTools }}">
          <button type="button" class="{{ $iconButton }}" aria-label="Search" aria-expanded="false" x-bind:aria-expanded="searchOpen" aria-controls="{{ $PANEL_ID }}" x-on:click="toggleSearch()">
            {!! $svgOpen() !!}<path d="{{ $icons['search'] }}" x-bind:d="searchOpen ? @js($icons['close']) : @js($icons['search'])" /></svg>
          </button>
          <a href="#contact" class="{{ $contactNav }}">Contact us</a>
          <button type="button" class="{{ $menuButton }}" aria-label="Menu" aria-expanded="false" x-bind:aria-expanded="menuOpen" aria-controls="{{ $PANEL_ID }}" x-on:click="toggleMenu()">
            {!! $svgOpen() !!}<path d="{{ $icons['menu'] }}" x-bind:d="menuOpen ? @js($icons['close']) : @js($icons['menu'])" /></svg>
          </button>
        </div>
      </nav>
      <template x-if="menuOpen || searchOpen">
        <div id="{{ $PANEL_ID }}" class="{{ $panel }}" x-on:keydown.escape="closePanels()">
          <template x-if="menuOpen">
            <ul class="{{ $menuList }}">
              @foreach ($menuItems as $item)
                <li><a href="{{ $item['href'] }}" class="{{ $menuLink }}" x-on:click="closePanels()">{{ $item['label'] }}</a></li>
              @endforeach
            </ul>
          </template>
          <template x-if="!menuOpen">
            <div class="contents">
              <x-markas.input type="search" label="Search insights" placeholder="Try energy or pricing" x-model="query" />
              <p class="{{ $muted }}" aria-live="polite" x-text="resultCount ? resultCount + ' ' + (resultCount === 1 ? 'article' : 'articles') : 'No articles match your search.'"></p>
              <ul class="{{ $resultList }}">
                @foreach ($insights as $item)
                  <li x-show="matches(@js($item['title'].' '.$item['tag']))">
                    <a href="#insight" class="{{ $resultLink }}" x-on:click="closePanels()">
                      {{ $item['title'] }}
                      <span class="{{ $resultTag }}">{{ $item['tag'] }}</span>
                    </a>
                  </li>
                @endforeach
              </ul>
            </div>
          </template>
        </div>
      </template>
    </header>
    <div class="{{ $heroBody }}">
      <div class="{{ $heroIntro }}">
        <p class="{{ $eyebrow }}">
          <span class="{{ $eyebrowDot }}" aria-hidden="true"></span>
          Independent advisory since 2009
        </p>
        <h1 class="{{ $heroTitle }}">Clear advice for <em class="{{ $heroAccent }}">bold</em> decisions</h1>
        <p class="{{ $heroLead }}">Pranata helps Indonesian boards and founders grow, finance, and transform their companies, with senior partners at the table from day one.</p>
        <div class="{{ $heroActions }}">
          <a href="#contact" class="{{ $ctaBig }}">
            Book a consultation
            <span class="{{ $ctaArrow }}" aria-hidden="true">{{ $icon('upRight') }}</span>
          </a>
          <a href="#services" class="{{ $ghostLink }}">Explore services</a>
        </div>
        <div class="{{ $trust }}">
          <div class="{{ $trustAvatars }}" aria-hidden="true">
            @foreach ($heroAvatars as $item)
              <span class="{{ $cx($trustAvatar, $tones[$item['tone']]) }}">{{ $item['initials'] }}</span>
            @endforeach
          </div>
          <div class="{{ $trustStars }}" role="img" aria-label="Rated 4.9 out of 5">
            @for ($n = 0; $n < 5; $n++)
              {{ $icon('star', 'size-4 fill-current') }}
            @endfor
          </div>
          <p>4.9 from 210 executives</p>
        </div>
      </div>
      <div class="{{ $visual }}">
        <div class="{{ $dataCard }}">
          <div class="{{ $cardHead }}">
            <div>
              <p class="{{ $cardLabel }}">Assets under advisory</p>
              <p class="{{ $cardValue }}">Rp 2,4 T</p>
            </div>
            <p class="{{ $growthBadge }}">
              {{ $icon('trend', 'size-3.5') }}
              +23% this year
            </p>
          </div>
          <div data-reveal>
            <svg viewBox="0 0 480 200" class="h-auto w-full overflow-visible" role="img" aria-label="Line chart: assets under advisory grew from Rp 0,9 T in 2021 to Rp 2,4 T in 2026">
              <defs>
                <linearGradient id="konsultan-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="var(--tpl-lime)" stop-opacity="0.32" />
                  <stop offset="1" stop-color="var(--tpl-lime)" stop-opacity="0" />
                </linearGradient>
              </defs>
              @foreach ($chart['grid'] as $y)
                <line x1="0" x2="480" y1="{{ $y }}" y2="{{ $y }}" class="{{ $chartGridLine }}" stroke-dasharray="4 6" />
              @endforeach
              <path d="{{ $chart['area'] }}" fill="url(#konsultan-area)" class="{{ $chartArea }}" />
              <path d="{{ $chart['line'] }}" pathLength="1" stroke-width="3" stroke-linecap="round" class="{{ $chartLine }}" />
              <circle cx="{{ $chart['x'] }}" cy="{{ $chart['y'] }}" r="14" class="{{ $chartHalo }}" />
              <circle cx="{{ $chart['x'] }}" cy="{{ $chart['y'] }}" r="6" class="{{ $chartDot }}" />
            </svg>
            <div class="{{ $chartAxis }}" aria-hidden="true">
              @foreach ($heroYears as $year)
                <span>{{ $year }}</span>
              @endforeach
            </div>
          </div>
          <dl class="{{ $metricGrid }}">
            <div class="{{ $cx($metricTile, $statPair) }}">
              <dt class="{{ $metricLabel }}">Clients advised</dt>
              <dd class="{{ $metricValue }}">320+</dd>
            </div>
            <div class="{{ $cx($metricTileLime, $statPair) }}">
              <dt class="{{ $metricLabelLime }}">Client retention</dt>
              <dd class="{{ $metricValue }}">98%</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <main>
    <section id="services" class="{{ $section }}" aria-labelledby="konsultan-services">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal>
        <div>
          <p class="{{ $kicker }}"><span class="{{ $kickerDot }}" aria-hidden="true"></span>What we do</p>
          <h2 id="konsultan-services" class="{{ $h2 }}">Three practices, one senior team</h2>
        </div>
        <p class="{{ $lead }}">Every engagement is led by a partner who has run a business, and measured the way your board measures it.</p>
      </div>
      <div class="{{ $reveal }}" data-reveal>
        <div role="tablist" aria-label="Services" class="{{ $tabList }}" x-on:keydown="onTabKey($event)">
          @foreach ($serviceTabs as $index => $item)
            <button id="konsultan-tab-{{ $item['id'] }}" type="button" role="tab" aria-controls="konsultan-tabpanel" class="{{ $tab }}" x-bind:aria-selected="tabIndex === {{ $index }} ? 'true' : 'false'" x-bind:tabindex="tabIndex === {{ $index }} ? 0 : -1" x-bind:class="tabIndex === {{ $index }} ? @js($tabActive) : @js($tabIdle)" x-on:click="tabIndex = {{ $index }}">
              <span class="{{ $tabNumber }}">0{{ $index + 1 }}</span>
              {{ $item['label'] }}
            </button>
          @endforeach
        </div>
        <div id="konsultan-tabpanel" role="tabpanel" aria-labelledby="konsultan-tab-{{ $firstTab['id'] }}" x-bind:aria-labelledby="'konsultan-tab-' + tab.id" class="{{ $tabPanel }}">
          <div>
            <h3 class="{{ $panelTitle }}" x-text="tab.title">{{ $firstTab['title'] }}</h3>
            <p class="{{ $panelText }}" x-text="tab.text">{{ $firstTab['text'] }}</p>
            <ul class="{{ $pointList }}">
              <template x-for="point in tab.points" :key="point">
                <li class="{{ $pointItem }}">
                  <span class="{{ $pointIcon }}" aria-hidden="true">{{ $icon('check', 'size-3.5') }}</span>
                  <span x-text="point"></span>
                </li>
              </template>
            </ul>
            <a href="#contact" class="{{ $arrowLink }}">
              Talk to a partner
              {{ $icon('arrow') }}
            </a>
          </div>
          <dl class="{{ $panelStats }}">
            <template x-for="stat in tab.stats" :key="stat.label">
              <div class="{{ $statPair }}">
                <dt class="{{ $panelStatLabel }}" x-text="stat.label"></dt>
                <dd class="{{ $panelStatValue }}" x-text="stat.value"></dd>
              </div>
            </template>
          </dl>
        </div>
      </div>
    </section>

    <section id="about" class="{{ $section }}" aria-labelledby="konsultan-about">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal>
        <div>
          <p class="{{ $kicker }}"><span class="{{ $kickerDot }}" aria-hidden="true"></span>About Pranata</p>
          <h2 id="konsultan-about" class="{{ $h2 }}">A firm built around partners, not pyramids</h2>
        </div>
        <p class="{{ $lead }}">We stay small on purpose. The people who win your trust are the people who do the work.</p>
      </div>
      <div class="{{ $cx($cardGrid, $reveal) }}" data-reveal>
        <article class="{{ $greyCard }}">
          <span class="{{ $chip }}">Since 2009</span>
          <h3 class="{{ $h3 }}">Seventeen years inside Indonesian boardrooms</h3>
          <p class="{{ $muted }}">From a two person office in Jakarta to listed companies, family groups, and state owned enterprises across Asia.</p>
          <div class="{{ $barChart }}">
            <div class="{{ $barRow }}" role="img" aria-label="Bar chart: companies advised each year, rising from 38 in 2021 to 88 in 2026">
              @foreach ($growthBars as $item)
                <div class="{{ $loop->last ? $barActive : $bar }}" style="height: {{ $item['value'] / $maxBar * 100 }}%"></div>
              @endforeach
            </div>
            <div class="{{ $barYears }}" aria-hidden="true">
              @foreach ($growthBars as $item)
                <span>{{ $item['year'] }}</span>
              @endforeach
            </div>
          </div>
        </article>
        <article class="{{ $limeCard }}">
          <div class="{{ $limeArt }}">
            <svg class="{{ $artSvg }}" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <circle cx="300" cy="80" r="150" class="{{ $artRing }}" />
              <circle cx="300" cy="80" r="105" class="{{ $artRing }}" />
              <circle cx="300" cy="80" r="60" class="{{ $artRing }}" />
              <path d="M-20 210c40-70 120-90 170-60s70 90 150 80 110 40 120 90H-20z" class="{{ $artSoft }}" />
              <path d="M86 64c38-30 104-24 122 22s-12 94-64 104-104-14-104-62 14-44 46-64z" class="{{ $artBlob }}" />
              <circle cx="330" cy="200" r="12" class="{{ $artBlob }}" />
            </svg>
            <div class="{{ $notch }}">
              <a href="#cases" class="{{ $notchLink }}" aria-label="See the work behind our recognition">{{ $icon('upRight', 'size-5') }}</a>
            </div>
          </div>
          <div class="{{ $limeBody }}">
            <span class="{{ $chipDark }}">Recognition</span>
            <h3 class="{{ $h3 }}">Named a top advisory firm in Southeast Asia</h3>
            <p class="{{ $limeStat }}">No. 4</p>
            <p class="{{ $limeMeta }}">Asia Business Review ranking, 2026</p>
          </div>
        </article>
        <article class="{{ $greyCard }}">
          <span class="{{ $chip }}">Our people</span>
          <div class="{{ $avatarRow }}" aria-hidden="true">
            @foreach ($partners as $item)
              <span class="{{ $cx($avatar, $tones[$item['tone']]) }}">{{ $item['initials'] }}</span>
            @endforeach
            <span class="{{ $avatarMore }}">+116</span>
          </div>
          <h3 class="{{ $h3 }}">Senior partners who have run companies</h3>
          <p class="{{ $muted }}">Former CFOs, bankers, and engineers who sit at your table, not behind a junior team.</p>
          <dl class="{{ $cityList }}">
            @foreach ($cities as $item)
              <div class="{{ $cityItem }}">
                <dt class="{{ $muted }}">{{ $item['label'] }}</dt>
                <dd class="{{ $cityValue }}">{{ $item['value'] }}</dd>
              </div>
            @endforeach
          </dl>
        </article>
      </div>
    </section>

    <section id="industries" class="{{ $section }}" aria-labelledby="konsultan-industries">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal>
        <div>
          <p class="{{ $kicker }}"><span class="{{ $kickerDot }}" aria-hidden="true"></span>Practices</p>
          <h2 id="konsultan-industries" class="{{ $h2 }}">We champion the bold to achieve the extraordinary</h2>
        </div>
        <div class="grid gap-5">
          <p class="{{ $lead }}">Each practice is led by a partner with at least fifteen years in the field. Filter by industry to find the right team.</p>
          <div class="{{ $filterRow }}" role="group" aria-label="Filter by industry">
            @foreach ($industries as $item)
              <button type="button" class="{{ $filter }}" aria-pressed="{{ $loop->first ? 'true' : 'false' }}" x-bind:aria-pressed="industry === @js($item) ? 'true' : 'false'" x-bind:class="industry === @js($item) ? @js($filterActive) : @js($filterIdle)" x-on:click="industry = @js($item)">{{ $item }}</button>
            @endforeach
          </div>
        </div>
      </div>
      <p class="sr-only" aria-live="polite" x-text="'Showing ' + shownCount + ' ' + (shownCount === 1 ? 'practice' : 'practices')">Showing {{ count($practices) }} practices</p>
      <ul class="{{ $cx($practiceGrid, $reveal) }}" data-reveal>
        @foreach ($practices as $item)
          <li class="{{ $practiceCard }}" x-show="industry === 'All' || @js($item['tags']).includes(industry)">
            <div class="{{ $practiceTop }}">
              <span class="{{ $practiceIcon }}" aria-hidden="true">{{ $icon($item['icon'], 'size-5') }}</span>
              {{ $icon('upRight', $cx('size-4', $practiceArrow)) }}
            </div>
            <div>
              <h3 class="{{ $practiceTitle }}">{{ $item['title'] }}</h3>
              <p class="{{ $practiceText }}">{{ $item['text'] }}</p>
            </div>
            <div class="{{ $practiceFoot }}">
              <p class="{{ $leadRow }}">
                <span class="{{ $cx($leadAvatar, $tones[$item['tone']]) }}" aria-hidden="true">{{ $item['initials'] }}</span>
                Led by {{ $item['lead'] }}
              </p>
              <div class="{{ $tagRow }}">
                @foreach ($item['tags'] as $name)
                  <span class="{{ $tag }}">{{ $name }}</span>
                @endforeach
              </div>
            </div>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="cases" class="{{ $section }}" aria-labelledby="konsultan-cases">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal>
        <div>
          <p class="{{ $kicker }}"><span class="{{ $kickerDot }}" aria-hidden="true"></span>Case studies</p>
          <h2 id="konsultan-cases" class="{{ $h2 }}">Results our clients can take to the bank</h2>
        </div>
        <p class="{{ $lead }}">We agree on the number before we start, then report against it every month until it moves.</p>
      </div>
      <div class="{{ $cx($caseGrid, $reveal) }}" data-reveal>
        @foreach ($cases as $item)
          <article class="{{ $caseCard }}">
            <div class="{{ $caseHead }}">
              <h3 class="font-semibold">{{ $item['client'] }}</h3>
              <span class="{{ $tag }}">{{ $item['industry'] }}</span>
            </div>
            <div>
              <p class="{{ $caseValue }}">{{ $item['value'] }}</p>
              <p class="{{ $caseMetric }}">
                <span class="{{ $caseMark }}" aria-hidden="true"></span>
                {{ $item['metric'] }}
              </p>
            </div>
            <p class="{{ $muted }}">{{ $item['text'] }}</p>
            <p class="{{ $caseFoot }}">
              <span>{{ $item['scope'] }}</span>
              <span>{{ $item['time'] }}</span>
            </p>
          </article>
        @endforeach
      </div>
    </section>

    <section id="insight" class="{{ $section }}" aria-labelledby="konsultan-insight">
      <div class="{{ $cx($sectionHead, $reveal) }}" data-reveal>
        <div>
          <p class="{{ $kicker }}"><span class="{{ $kickerDot }}" aria-hidden="true"></span>Client voices</p>
          <h2 id="konsultan-insight" class="{{ $h2 }}">What leaders say after working with us</h2>
        </div>
        <p class="{{ $lead }}">Independent reviews from the executives we advised in the last two years.</p>
      </div>
      <div class="{{ $cx($quoteGrid, $reveal) }}" data-reveal>
        <div class="{{ $ratingCard }}">
          <div class="{{ $stars }}" role="img" aria-label="Rated 4.9 out of 5">
            @for ($n = 0; $n < 5; $n++)
              {{ $icon('star', 'size-5 fill-current') }}
            @endfor
          </div>
          <div>
            <p class="{{ $ratingValue }}">4.9</p>
            <p class="{{ $limeMeta }}">Average rating from 210 client reviews</p>
          </div>
        </div>
        <div class="{{ $quoteCard }}" role="region" aria-roledescription="carousel" aria-label="Client testimonials">
          <figure class="grid gap-8" aria-live="polite" aria-roledescription="slide" aria-label="1 of {{ count($quotes) }}" x-bind:aria-label="(quoteIndex + 1) + ' of ' + quotes.length">
            <blockquote class="{{ $quoteText }}" x-text="'“' + quote.text + '”'">“{{ $quotes[0]['text'] }}”</blockquote>
            <figcaption class="{{ $quotePerson }}">
              <span class="{{ $quoteAvatar }}" x-bind:class="tones[quote.tone]" aria-hidden="true" x-text="quote.initials">{{ $quotes[0]['initials'] }}</span>
              <span>
                <span class="block font-semibold" x-text="quote.name">{{ $quotes[0]['name'] }}</span>
                <span class="{{ $muted }}" x-text="quote.role">{{ $quotes[0]['role'] }}</span>
              </span>
            </figcaption>
          </figure>
          <div class="{{ $quoteFoot }}">
            <div class="{{ $dots }}" aria-hidden="true">
              @foreach ($quotes as $index => $item)
                <span class="{{ $dotBase }}" x-bind:class="quoteIndex === {{ $index }} ? @js($dotActive) : @js($dotIdle)"></span>
              @endforeach
            </div>
            <div class="{{ $controls }}">
              <button type="button" class="{{ $roundButton }}" aria-label="Previous testimonial" x-on:click="moveQuote(-1)">{{ $icon('left') }}</button>
              <span class="{{ $counter }}" x-text="(quoteIndex + 1) + ' / ' + quotes.length">1 / {{ count($quotes) }}</span>
              <button type="button" class="{{ $roundButton }}" aria-label="Next testimonial" x-on:click="moveQuote(1)">{{ $icon('right') }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="{{ $cx($logoWrap, $reveal) }}" data-reveal>
        <p class="{{ $muted }}">Trusted by 320+ companies across Asia</p>
        <ul class="{{ $logoGrid }}" aria-label="Selected clients">
          @foreach ($logos as $item)
            <li class="{{ $logoCell }}">
              {{ $icon($item['glyph'], 'size-5') }}
              {{ $item['name'] }}
            </li>
          @endforeach
        </ul>
      </div>
    </section>

    <section id="contact" class="{{ $section }}" aria-labelledby="konsultan-contact">
      <div class="{{ $cx($ctaBand, $reveal) }}" data-reveal>
        <div class="{{ $ctaLines }}" aria-hidden="true"></div>
        <div>
          <p class="{{ $ctaKicker }}"><span class="{{ $eyebrowDot }}" aria-hidden="true"></span>Free consultation</p>
          <h2 id="konsultan-contact" class="{{ $ctaTitle }}">Start with a <em class="{{ $heroAccent }}">30 minute</em> call</h2>
          <p class="{{ $ctaLead }}">Tell us where you want to be in three years. A partner will call you back within one business day.</p>
          <ul class="{{ $contactList }}">
            @foreach ($contacts as $item)
              <li class="{{ $contactItem }}">
                <span class="{{ $contactIcon }}" aria-hidden="true">{{ $icon($item['icon']) }}</span>
                <span>
                  <span class="{{ $contactLabel }}">{{ $item['label'] }}</span>
                  <span class="font-medium">{{ $item['value'] }}</span>
                </span>
              </li>
            @endforeach
          </ul>
        </div>
        <form class="{{ $formCard }}" novalidate aria-label="Consultation request" x-on:submit.prevent="submit()">
          <x-markas.input label="Full name" name="name" autocomplete="name" x-model="form.name" x-bind:aria-invalid="error.field === 'name' ? 'true' : null" x-bind:aria-describedby="error.field === 'name' ? 'konsultan-form-error' : null" />
          <x-markas.input label="Work email" type="email" name="email" autocomplete="email" placeholder="you@company.com" x-model="form.email" x-bind:aria-invalid="error.field === 'email' ? 'true' : null" x-bind:aria-describedby="error.field === 'email' ? 'konsultan-form-error' : null" />
          <x-markas.input label="Company" name="company" autocomplete="organization" x-model="form.company" />
          <x-markas.select label="Service" name="service" x-model="form.service">
            <option value="">Not sure yet</option>
            @foreach ($practices as $item)
              <option value="{{ $item['title'] }}">{{ $item['title'] }}</option>
            @endforeach
          </x-markas.select>
          <div class="{{ $full }}">
            <x-markas.textarea label="What would you like to discuss?" name="message" :rows="4" x-model="form.message" />
          </div>
          <template x-if="error.message">
            <p id="{{ $FORM_ERROR_ID }}" class="{{ $errorText }}" x-text="error.message"></p>
          </template>
          <div class="{{ $formFoot }}">
            <p class="{{ $muted }}">We reply within one business day.</p>
            <x-markas.button type="submit">Send request</x-markas.button>
          </div>
        </form>
      </div>
    </section>
  </main>

  <footer class="{{ $footer }}">
    <div class="{{ $footerTop }}">
      <div>
        <a href="#top" class="{{ $footerBrand }}">
          <span class="{{ $brandMark }}" aria-hidden="true">{{ $icon('mark', 'size-5') }}</span>
          Pranata
        </a>
        <p class="{{ $footerText }}">Independent strategy, finance, and transformation advice from Jakarta since 2009.</p>
      </div>
      @foreach ($footerColumns as $column)
        <nav aria-label="{{ $column['title'] }}">
          <h2 class="{{ $footerHeading }}">{{ $column['title'] }}</h2>
          <ul class="{{ $footerList }}">
            @foreach ($column['links'] as $link)
              <li><a href="#top" class="{{ $footerLink }}">{{ $link }}</a></li>
            @endforeach
          </ul>
        </nav>
      @endforeach
    </div>
    <div class="{{ $footerBottom }}">
      <p>&copy; 2026 Pranata Advisory. Jakarta, Indonesia.</p>
      <p>Built with <a href="https://markasui.pages.dev" class="{{ $builtLink }}">MarkasUI</a></p>
    </div>
  </footer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
