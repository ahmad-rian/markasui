@php
    use Illuminate\Support\HtmlString;
    use Illuminate\Support\Js;

    /* Palet lokal, kelas, dan data: identik dengan versi React dan Vue. */
    $palette = '[--tpl-sky-1:#5d9fe6] [--tpl-sky-2:#a3cbf3] [--tpl-sky-3:#dcebfa] [--tpl-sky-ink:#0c2849] [--tpl-cloud:#ffffff] [--tpl-paper:#ffffff] [--tpl-coal:#1c1c21] [--tpl-coal-ink:#f4f1ea] [--tpl-butter:#fbe38a] [--tpl-butter-line:#e2bf45] [--tpl-lilac:#d8cdf6] [--tpl-peach:#fde1d1] [--tpl-mint:#d4efe1] [--tpl-cream:#fcf0c4] [--tpl-ice:#d9e9fb] [--tpl-rose:#fad8e3] [--tpl-coral:#ef8d70] [--tpl-teal:#5fb3a2] [--tpl-violet:#9c8ae8] [--tpl-sun:#f4c64a] [--tpl-blue:#5b93e0] dark:[--tpl-sky-1:#0b1830] dark:[--tpl-sky-2:#15284a] dark:[--tpl-sky-3:#1b2c48] dark:[--tpl-sky-ink:#e7f0fb] dark:[--tpl-cloud:#3a4f74] dark:[--tpl-paper:#3a3b42] dark:[--tpl-coal:#050506] dark:[--tpl-coal-ink:#f4f1ea] dark:[--tpl-butter:#5b4b17] dark:[--tpl-butter-line:#7d6725] dark:[--tpl-lilac:#3c3463] dark:[--tpl-peach:#4a2e24] dark:[--tpl-mint:#1f3c30] dark:[--tpl-cream:#3f3618] dark:[--tpl-ice:#1c3150] dark:[--tpl-rose:#472534] dark:[--tpl-coral:#a9563f] dark:[--tpl-teal:#2f7a6b] dark:[--tpl-violet:#6655b8] dark:[--tpl-sun:#a9831f] dark:[--tpl-blue:#36649f]';
    $css = '@keyframes catatan-drift{from{transform:translateX(-14px)}to{transform:translateX(14px)}}.catatan-torn-a{clip-path:polygon(0% 0%,100% 0%,100% 8.3%,95.4% 16.7%,98.6% 25%,98.9% 33.3%,96.4% 41.7%,97.3% 50%,98.4% 58.3%,96.2% 66.7%,96.2% 75%,97.3% 83.3%,96.6% 91.7%,100% 100%,91.7% 96.8%,83.3% 95.9%,75% 98.8%,66.7% 98.1%,58.3% 96.5%,50% 96.5%,41.7% 99.7%,33.3% 96.6%,25% 97.7%,16.7% 95.4%,8.3% 96%,0% 100%)}.catatan-torn-b{clip-path:polygon(0% 0%,6.3% 1.1%,12.5% 4.6%,18.8% 8.3%,25% 6.2%,31.3% 5.8%,37.5% 5.2%,43.8% 8.2%,50% 8.2%,56.3% 3.4%,62.5% 3%,68.8% 7.5%,75% 3%,81.3% 1.4%,87.5% 2.7%,93.8% 3.9%,100% 0%,100% 100%,0% 100%)}.catatan-torn-c{clip-path:polygon(0% 0%,100% 0%,100% 100%,0% 100%,2.1% 92.9%,6.6% 85.7%,3.9% 78.6%,5.1% 71.4%,6.1% 64.3%,0.4% 57.1%,1.9% 50%,3.9% 42.9%,3.6% 35.7%,3% 28.6%,1.4% 21.4%,6.4% 14.3%,0.4% 7.1%)}.catatan-torn-d{clip-path:polygon(0% 0%,8.3% 2.2%,16.7% 2.1%,25% 4%,33.3% 5.5%,41.7% 3.1%,50% 1%,58.3% 2.4%,66.7% 1.7%,75% 2.2%,83.3% 2.5%,91.7% 2%,100% 0%,100% 100%,0% 100%,3.2% 91.7%,3.7% 83.3%,1.4% 75%,5.4% 66.7%,2.7% 58.3%,5.2% 50%,3.8% 41.7%,3.8% 33.3%,3.1% 25%,3% 16.7%,4.1% 8.3%)}@media (prefers-reduced-motion:no-preference){[data-reveal]{transition:opacity .7s ease-out,transform .7s ease-out}[data-reveal=hidden]{opacity:0;transform:translateY(24px)}}';
    $icons = ['docs' => 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4', 'tasks' => 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9', 'calendar' => 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'boards' => 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM12 17v4M8 21h8M7 12l3-3 2 2 4-4', 'daily' => 'M12 3v2M12 19v2M5.6 5.6 7 7M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z', 'home' => 'M3 11l9-8 9 8M5 10v10h14V10', 'folder' => 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'search' => 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3', 'menu' => 'M4 7h16M4 12h16M4 17h16', 'close' => 'M18 6 6 18M6 6l12 12', 'left' => 'M15 18l-6-6 6-6', 'right' => 'M9 18l6-6-6-6', 'check' => 'M5 12l5 5 9-10', 'plus' => 'M12 5v14M5 12h14', 'download' => 'M12 3v12M7 10l5 5 5-5M5 21h14', 'link' => 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1', 'sparkle' => 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'];
    $root = 'relative overflow-x-clip bg-canvas font-sans text-ink [scroll-behavior:smooth] motion-reduce:[scroll-behavior:auto]';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $headerWrap = 'fixed inset-x-0 top-3 z-30 px-4 sm:top-4';
    $navBar = 'mx-auto flex h-14 max-w-5xl items-center gap-2 rounded-full bg-surface/95 py-2 pr-2 pl-5 shadow-overlay ring-1 ring-ink/5 backdrop-blur';
    $wordmark = 'rounded-md text-xl font-black tracking-tighter';
    $navLinks = 'mx-auto hidden items-center gap-1 md:flex';
    $navLink = 'rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink motion-reduce:transition-none';
    $loginLink = 'ml-auto hidden rounded-full px-3 py-2 text-sm font-medium text-ink hover:bg-subtle md:ml-0 md:inline-flex';
    $pillDark = 'inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold whitespace-nowrap text-canvas transition-transform duration-150 hover:-translate-y-px motion-reduce:transition-none';
    $menuButton = 'inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-subtle md:hidden';
    $menuPanel = 'mx-auto mt-2 grid max-w-5xl gap-1 rounded-3xl bg-surface p-3 shadow-overlay ring-1 ring-ink/5 md:hidden';
    $menuLink = 'rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-subtle';
    $hero = 'relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--tpl-sky-1),var(--tpl-sky-2)_38%,var(--tpl-sky-3)_72%,var(--color-canvas))] px-4 pt-32 pb-28 sm:pt-40 sm:pb-32';
    $cloud = 'pointer-events-none absolute -z-10 h-28 w-80 blur-lg animate-[catatan-drift_14s_ease-in-out_infinite_alternate] motion-reduce:animate-none';
    $puffBase = 'absolute bottom-0 left-0 h-[45%] w-full rounded-full bg-(--tpl-cloud)';
    $puffSmall = 'absolute bottom-[20%] left-[14%] h-[60%] w-[30%] rounded-full bg-(--tpl-cloud)';
    $puffLarge = 'absolute bottom-[12%] left-[38%] h-full w-[40%] rounded-full bg-(--tpl-cloud)';
    $heroInner = 'mx-auto grid max-w-5xl justify-items-center text-center';
    $heroTitle = 'max-w-4xl font-serif text-5xl leading-[1.02] font-normal tracking-tight text-balance text-(--tpl-sky-ink) sm:text-7xl';
    $heroLead = 'mt-6 max-w-xl text-lg text-pretty text-(--tpl-sky-ink)/80 sm:text-xl';
    $heroActions = 'mt-9 flex flex-wrap items-center justify-center gap-3';
    $pillLight = 'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-surface px-6 text-base font-semibold whitespace-nowrap text-ink shadow-overlay transition-transform duration-150 hover:-translate-y-px motion-reduce:transition-none';
    $pillGhost = 'inline-flex h-12 items-center justify-center rounded-full px-5 text-base font-semibold text-(--tpl-sky-ink) underline decoration-(--tpl-sky-ink)/30 underline-offset-4 hover:decoration-(--tpl-sky-ink)';
    $heroNote = 'mt-4 text-sm text-(--tpl-sky-ink)/75';
    $collage = 'relative mx-auto mt-16 w-full max-w-5xl sm:mt-20';
    $paperShadow = 'absolute drop-shadow-[0_10px_18px_rgb(12_40_73/0.18)] dark:drop-shadow-[0_10px_18px_rgb(0_0_0/0.45)]';
    $paperWhite = 'catatan-torn-a size-full bg-(--tpl-paper)';
    $paperCoal = 'catatan-torn-b size-full bg-(--tpl-coal)';
    $paperLined = 'catatan-torn-c size-full bg-(--tpl-butter) bg-[repeating-linear-gradient(180deg,transparent_0_21px,var(--tpl-butter-line)_21px_22px)]';
    $paperList = 'absolute top-[66px] right-5 grid text-right font-serif text-base leading-[22px] text-ink/80 italic';
    $flip = 'absolute inset-0 -scale-x-100';
    $paperLilac = 'catatan-torn-d size-full bg-(--tpl-lilac)';
    $scribble = 'absolute font-serif text-lg italic text-(--tpl-coal-ink) [writing-mode:horizontal-tb]';
    $windowFrame = 'relative overflow-hidden rounded-2xl bg-surface text-left shadow-[0_30px_60px_-20px_rgb(12_40_73/0.35)] ring-1 ring-ink/10';
    $windowBar = 'flex h-10 items-center gap-2 border-b border-line bg-subtle/60 px-4';
    $windowDot = 'size-3 rounded-full bg-line';
    $windowTitle = 'mx-auto text-xs font-medium text-muted';
    $appGrid = 'grid min-h-96 md:grid-cols-[13rem_1fr]';
    $sidebar = 'hidden flex-col gap-0.5 border-r border-line bg-subtle/40 p-3 text-sm md:flex';
    $sideSearch = 'mb-2 flex h-8 items-center gap-2 rounded-lg bg-surface px-2.5 text-xs text-faint ring-1 ring-line';
    $sideItem = 'flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-muted';
    $sideActive = 'flex h-8 items-center gap-2.5 rounded-lg bg-surface px-2.5 font-medium text-ink shadow-sm ring-1 ring-line';
    $sideLabel = 'mt-4 mb-1 px-2.5 text-xs font-medium text-faint';
    $sideDot = 'size-2.5 rounded-sm';
    $docArea = 'grid content-start gap-5 p-5 sm:p-7';
    $docTitle = 'font-serif text-3xl tracking-tight';
    $docMeta = 'mt-1 text-sm text-muted';
    $cardGrid = 'grid grid-cols-2 gap-3 lg:grid-cols-3';
    $pastelCard = 'grid min-h-28 content-between gap-3 rounded-xl p-3.5';
    $pastelIcon = 'flex size-7 items-center justify-center rounded-lg bg-surface/70 text-ink';
    $pastelTitle = 'text-sm font-semibold';
    $pastelMeta = 'text-xs text-ink/70';
    $iconClass = 'size-4 shrink-0';
    $section = 'scroll-mt-24 px-4 py-20 sm:py-28';
    $sectionInner = 'mx-auto max-w-6xl';
    $serifTitle = 'mx-auto max-w-3xl text-center font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-6xl';
    $sectionLead = 'mx-auto mt-5 max-w-xl text-center text-lg text-pretty text-muted';
    $tabList = 'mx-auto mt-12 grid max-w-3xl grid-cols-5 gap-1 sm:flex sm:justify-center sm:gap-6';
    $tabBase = 'group grid min-w-0 justify-items-center gap-2 rounded-2xl px-0.5 py-3 text-[11px] font-medium transition-colors duration-150 motion-reduce:transition-none sm:min-w-24 sm:px-2 sm:text-sm';
    $tabIdle = 'text-muted hover:text-ink';
    $tabActive = 'text-primary';
    $tabIconWrap = 'flex size-12 items-center justify-center rounded-2xl ring-1 transition-colors duration-150 motion-reduce:transition-none sm:size-16';
    $tabIconIdle = 'bg-surface ring-line group-hover:ring-ink/30';
    $tabIconActive = 'bg-primary-soft ring-primary';
    $tabIcon = 'size-7 [stroke-width:1.4] [stroke-linecap:round] [stroke-linejoin:round]';
    $panelWrap = 'relative isolate mx-auto mt-10 max-w-5xl';
    $panelGlow = 'absolute -inset-x-6 -inset-y-6 -z-10 rounded-[2.5rem] bg-[linear-gradient(135deg,var(--tpl-ice),var(--tpl-lilac)_50%,var(--tpl-peach))] opacity-70 sm:-inset-x-10';
    $panelBody = 'min-h-[25rem] p-5 sm:p-8';
    $kicker = 'text-xs font-semibold tracking-wide text-muted uppercase';
    $paragraph = 'text-sm leading-relaxed text-muted';
    $quote = 'rounded-xl bg-(--tpl-cream) p-4 font-serif text-lg leading-snug italic';
    $linkCard = 'flex items-center gap-3 rounded-xl p-3 text-sm font-medium ring-1 ring-line';
    $taskRow = 'flex items-center gap-3 border-b border-line py-3 text-sm last:border-0';
    $checkDone = 'flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary';
    $checkOpen = 'size-5 shrink-0 rounded-full ring-1 ring-faint ring-inset';
    $tag = 'ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium';
    $taskDate = 'w-14 text-right text-xs text-muted tabular-nums';
    $progressTrack = 'h-1.5 w-32 overflow-hidden rounded-full bg-subtle';
    $progressFill = 'h-full w-[62.5%] rounded-full bg-primary';
    $weekGrid = 'grid grid-cols-7 gap-1.5 sm:gap-2';
    $dayHead = 'grid justify-items-center gap-0.5 pb-2 text-xs text-muted';
    $dayNum = 'flex size-7 items-center justify-center rounded-full text-sm';
    $dayToday = 'bg-primary font-semibold text-on-primary';
    $dayCol = 'grid min-h-64 content-start gap-1.5 rounded-xl bg-subtle/50 p-1';
    $eventChip = 'grid min-w-0 gap-0.5 rounded-lg p-1 text-[10px] leading-tight font-medium [overflow-wrap:anywhere] sm:p-2 sm:text-xs';
    $eventTime = 'font-normal text-ink/70';
    $boardCanvas = 'relative h-[22rem] overflow-hidden rounded-xl bg-subtle/50 bg-[radial-gradient(var(--color-line)_1.2px,transparent_1.2px)] bg-size-[18px_18px]';
    $boardLines = 'absolute inset-0 size-full fill-none stroke-faint [stroke-dasharray:5_5] [stroke-width:1.5]';
    $sticky = 'absolute grid w-[28%] gap-1 rounded-md p-2 text-[11px] leading-snug shadow-sm sm:w-52 sm:p-3 sm:text-sm';
    $stickyTitle = 'font-semibold';
    $dailyGrid = 'grid gap-6 md:grid-cols-[1fr_14rem]';
    $dailyDate = 'font-serif text-3xl tracking-tight';
    $dailyRow = 'flex gap-4 border-b border-line py-3 text-sm last:border-0';
    $dailyTime = 'w-12 shrink-0 text-muted tabular-nums';
    $moodRow = 'mt-4 flex flex-wrap gap-2';
    $moodChip = 'rounded-full px-3 py-1 text-xs font-medium';
    $asideCard = 'grid content-start gap-3 rounded-xl bg-subtle/60 p-4';
    $asideItem = 'flex items-center justify-between text-sm';
    $storiesHead = 'mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6';
    $storiesTitle = 'font-serif text-4xl leading-tight tracking-tight sm:text-5xl';
    $carouselButtons = 'flex gap-2';
    $roundButton = 'inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-line transition-colors duration-150 hover:bg-subtle disabled:opacity-40 disabled:hover:bg-surface motion-reduce:transition-none';
    $viewport = 'mx-auto mt-10 max-w-6xl snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-3xl pb-2 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden';
    $storyList = 'flex gap-5';
    $storyItem = 'w-64 shrink-0 snap-start sm:w-72';
    $portrait = 'relative aspect-[4/5] overflow-hidden rounded-3xl bg-(--story-bg)';
    $shapeCircle = 'absolute -top-8 -right-10 size-40 rounded-full bg-(--story-a)';
    $shapeStrip = 'absolute -bottom-6 -left-8 h-24 w-56 -rotate-12 rounded-2xl bg-(--story-b)';
    $shapeHalf = 'absolute top-10 left-6 size-16 rounded-t-full bg-(--story-c) opacity-80';
    $personBody = 'absolute bottom-0 left-1/2 h-[34%] w-[64%] -translate-x-1/2 rounded-t-[999px] bg-(--story-shirt)';
    $personHead = 'absolute bottom-[30%] left-1/2 flex aspect-square w-[38%] -translate-x-1/2 items-center justify-center rounded-full bg-(--tpl-paper) font-serif text-3xl text-ink ring-4 ring-(--story-bg)';
    $storyName = 'mt-4 text-base font-semibold';
    $storyRole = 'mt-0.5 text-xs font-semibold tracking-[0.12em] text-muted uppercase';
    $storyNote = 'mt-3 font-serif text-lg leading-snug text-pretty italic';
    $featureGrid = 'mt-14 grid gap-5 md:grid-cols-3';
    $featureCard = 'grid content-start gap-5 rounded-3xl p-5 sm:p-6';
    $featureMock = 'grid min-h-44 content-center gap-2.5 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-ink/5';
    $featureStep = 'text-sm font-semibold text-ink/70';
    $featureTitle = 'font-serif text-2xl tracking-tight';
    $featureText = 'text-sm leading-relaxed text-ink/80';
    $captureBox = 'flex items-center gap-2 rounded-xl bg-subtle px-3 py-2.5 text-sm';
    $caret = 'h-4 w-px bg-primary';
    $chip = 'inline-flex w-fit items-center gap-1 rounded-full bg-subtle px-2.5 py-1 text-xs font-medium text-muted';
    $miniCheck = 'flex items-center gap-2 text-sm';
    $shareField = 'flex items-center gap-2 rounded-xl bg-subtle px-3 py-2 text-xs text-muted';
    $avatarRow = 'flex -space-x-1.5';
    $avatar = 'flex size-8 items-center justify-center rounded-full text-[11px] font-semibold text-ink ring-2 ring-surface';
    $published = 'ml-auto rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-ink';
    $billing = 'mx-auto mt-10 flex w-fit items-center gap-1 rounded-full bg-subtle p-1 ring-1 ring-line';
    $billingButton = 'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none';
    $billingIdle = 'text-muted hover:text-ink';
    $billingActive = 'bg-surface text-ink shadow-sm ring-1 ring-line';
    $saveBadge = 'rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary';
    $planGrid = 'mt-12 grid items-start gap-5 lg:grid-cols-3';
    $planBase = 'grid gap-6 rounded-3xl bg-surface p-6 sm:p-7';
    $planIdle = 'ring-1 ring-line';
    $planFeatured = 'ring-2 ring-primary shadow-overlay';
    $planName = 'flex items-center justify-between text-lg font-semibold';
    $planBadge = 'rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-on-primary';
    $planBlurb = 'mt-1 text-sm text-muted';
    $planPrice = 'text-5xl font-semibold tracking-tighter tabular-nums';
    $planPer = 'ml-1 text-sm text-muted';
    $planNote = 'mt-1 h-5 text-sm text-muted';
    $planList = 'grid gap-2.5 text-sm';
    $planItem = 'flex items-start gap-2.5';
    $planCheck = 'mt-0.5 size-4 shrink-0 text-primary';
    $faqWrap = 'scroll-mt-24 px-4 py-20 sm:py-28 [&_h2]:font-serif [&_h2]:text-4xl [&_h2]:font-normal [&_h2]:tracking-tight sm:[&_h2]:text-5xl';
    $faqInner = 'mx-auto max-w-6xl';
    $ctaWrap = 'scroll-mt-24 px-4 pb-20';
    $ctaCard = 'relative isolate mx-auto grid max-w-6xl justify-items-center overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,var(--tpl-sky-1),var(--tpl-sky-2)_55%,var(--tpl-sky-3))] px-5 py-16 text-center sm:py-24';
    $ctaTitle = 'max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-balance text-(--tpl-sky-ink) sm:text-6xl';
    $ctaLead = 'mt-4 max-w-md text-base text-(--tpl-sky-ink)/80 sm:text-lg';
    $ctaForm = 'mt-8 grid w-full max-w-md gap-3 rounded-3xl bg-surface p-4 text-left shadow-overlay sm:grid-cols-[1fr_auto] sm:items-start';
    $emailField = 'grid gap-1.5';
    $errorText = 'text-sm text-danger';
    $platformRow = 'mt-6 flex flex-wrap justify-center gap-2';
    $platform = 'inline-flex h-9 items-center gap-1.5 rounded-full bg-surface/80 px-4 text-sm font-medium text-ink ring-1 ring-ink/5';
    $footer = 'border-t border-line px-4 pt-14 pb-10';
    $footerInner = 'mx-auto grid max-w-6xl grid-cols-3 gap-x-4 gap-y-10 md:grid-cols-[1.4fr_repeat(3,1fr)]';
    $footerBrand = 'col-span-3 grid content-start gap-3 md:col-span-1';
    $footerTag = 'max-w-xs text-sm text-muted';
    $footerHead = 'text-sm font-semibold';
    $footerList = 'mt-3 grid gap-2 text-sm';
    $footerLink = 'rounded-sm text-muted hover:text-ink';
    $footerBottom = 'mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted';
    $builtWith = 'rounded-sm font-medium text-ink hover:underline';
    $NAV = [['Product', '#product'], ['Community', '#stories'], ['Pricing', '#pricing'], ['Download', '#download']];
    $tones = ['peach' => 'bg-(--tpl-peach)', 'mint' => 'bg-(--tpl-mint)', 'lilac' => 'bg-(--tpl-lilac)', 'cream' => 'bg-(--tpl-cream)', 'ice' => 'bg-(--tpl-ice)', 'rose' => 'bg-(--tpl-rose)'];
    $SIDE_ITEMS = [['home', 'Home'], ['daily', 'Daily Notes'], ['tasks', 'Tasks'], ['calendar', 'Calendar']];
    $SPACES = [['Bali offsite', 'peach'], ['Reading list', 'mint'], ['Studio Lembar', 'lilac']];
    $HERO_CARDS = [['calendar', 'Flights', 'Jakarta to Denpasar, 14 Mar', 'peach'], ['home', 'Villa shortlist', '3 options in Ubud', 'mint'], ['docs', 'Agenda', 'Day 1 to Day 4', 'lilac'], ['sparkle', 'Budget', 'Rp42.500.000', 'cream'], ['tasks', 'Packing list', '18 of 24 packed', 'ice'], ['boards', 'Moodboard', '12 pins', 'rose']];
    $TABS = [['id' => 'docs', 'label' => 'Docs', 'icon' => 'docs'], ['id' => 'tasks', 'label' => 'Tasks', 'icon' => 'tasks'], ['id' => 'calendar', 'label' => 'Calendar', 'icon' => 'calendar'], ['id' => 'boards', 'label' => 'Whiteboards', 'icon' => 'boards'], ['id' => 'daily', 'label' => 'Daily Notes', 'icon' => 'daily']];
    $TASKS = [['Send the venue deposit', true, 'Offsite', 'peach', 'Mon'], ['Draft the November newsletter', true, 'Writing', 'lilac', 'Mon'], ['Review Sekar\'s chapter notes', true, 'Reading', 'mint', 'Tue'], ['Book the Ubud villa', true, 'Offsite', 'peach', 'Tue'], ['Plan Q1 roadmap session', true, 'Team', 'ice', 'Wed'], ['Pick up film from the lab', false, 'Personal', 'cream', 'Thu'], ['Call Pak Hendra about catering', false, 'Offsite', 'peach', 'Fri'], ['Finish the pitch deck outline', false, 'Team', 'ice', 'Fri']];
    $WEEK = [['Mon', 9, [['Standup', '09:00', 'ice'], ['Write', '10:30', 'lilac'], ['Lunch with Rani', '12:30', 'peach']]], ['Tue', 10, [['Design review', '11:00', 'mint'], ['Gym', '18:00', 'cream']]], ['Wed', 11, [['Roadmap', '13:00', 'ice']]], ['Thu', 12, [['Studio visit', '10:00', 'rose'], ['1:1 Bima', '15:00', 'mint']]], ['Fri', 13, [['Catering call', '09:30', 'peach'], ['Demo day', '14:00', 'lilac']]], ['Sat', 14, [['Flight DPS', '07:15', 'peach']]], ['Sun', 15, []]];
    $STICKIES = [['Problem', 'People lose ideas between apps', 'cream', 'top-[10%] left-[3%] -rotate-3'], ['Insight', 'Notes, tasks and dates live together', 'mint', 'top-[6%] left-[37%] rotate-2'], ['Idea', 'One page that grows into a plan', 'lilac', 'top-[58%] left-[8%] rotate-1'], ['Next', 'Prototype the weekly view', 'rose', 'top-[60%] left-[42%] -rotate-2'], ['Ship', 'Launch to the first 100 users', 'ice', 'top-[32%] left-[70%] rotate-3']];
    $BOARD_LINES = ['M22 22 C 28 14, 32 14, 37 17', 'M14 38 C 11 46, 12 52, 16 58', 'M28 72 C 34 76, 37 76, 42 72', 'M56 20 C 63 22, 67 28, 71 34', 'M61 70 C 68 68, 72 62, 76 56'];
    $DAILY = [['07:30', 'Morning pages. Slept well, head feels clear.'], ['09:10', 'Idea for the newsletter: small rituals that stick.'], ['13:00', 'Lunch with Rani, she recommended Laut Bercerita.'], ['16:45', 'Shipped the onboarding copy, two typos fixed.']];
    $MOODS = [['Calm', 'mint'], ['Focused', 'ice'], ['Grateful', 'peach']];
    $RECENT = [['Sunday, 8 Nov', '4 notes'], ['Saturday, 7 Nov', '2 notes'], ['Friday, 6 Nov', '6 notes']];
    $STORIES = [['name' => 'Nadia Putri', 'role' => 'Architect', 'note' => 'Site notes, sketches and client calls in one place, finally.', 'colors' => '[--story-bg:var(--tpl-ice)] [--story-a:var(--tpl-sun)] [--story-b:var(--tpl-blue)] [--story-c:var(--tpl-coral)] [--story-shirt:var(--tpl-coal)]'], ['name' => 'Bima Santoso', 'role' => 'Founder', 'note' => 'Our whole company handbook started as a single messy page.', 'colors' => '[--story-bg:var(--tpl-peach)] [--story-a:var(--tpl-coral)] [--story-b:var(--tpl-teal)] [--story-c:var(--tpl-violet)] [--story-shirt:var(--tpl-blue)]'], ['name' => 'Sekar Ayu', 'role' => 'PhD student', 'note' => 'Three years of reading notes, and I can still find every quote.', 'colors' => '[--story-bg:var(--tpl-mint)] [--story-a:var(--tpl-teal)] [--story-b:var(--tpl-sun)] [--story-c:var(--tpl-blue)] [--story-shirt:var(--tpl-violet)]'], ['name' => 'Reza Pratama', 'role' => 'Product manager', 'note' => 'Specs, tasks and the launch calendar finally talk to each other.', 'colors' => '[--story-bg:var(--tpl-lilac)] [--story-a:var(--tpl-violet)] [--story-b:var(--tpl-coral)] [--story-c:var(--tpl-sun)] [--story-shirt:var(--tpl-teal)]'], ['name' => 'Intan Maharani', 'role' => 'Novelist', 'note' => 'My second novel lives here, chapter by chapter, draft by draft.', 'colors' => '[--story-bg:var(--tpl-rose)] [--story-a:var(--tpl-coral)] [--story-b:var(--tpl-violet)] [--story-c:var(--tpl-teal)] [--story-shirt:var(--tpl-sun)]'], ['name' => 'Dimas Wicaksono', 'role' => 'Teacher', 'note' => 'Lesson plans for forty students, shared with one link.', 'colors' => '[--story-bg:var(--tpl-cream)] [--story-a:var(--tpl-sun)] [--story-b:var(--tpl-blue)] [--story-c:var(--tpl-teal)] [--story-shirt:var(--tpl-coral)]'], ['name' => 'Laras Wulandari', 'role' => 'Chef', 'note' => 'Every recipe test, every tweak, with photos of the plating.', 'colors' => '[--story-bg:var(--tpl-ice)] [--story-a:var(--tpl-teal)] [--story-b:var(--tpl-rose)] [--story-c:var(--tpl-violet)] [--story-shirt:var(--tpl-coal)]']];
    $PLANS = [['id' => 'free', 'name' => 'Free', 'blurb' => 'For your own notes and ideas.', 'monthly' => 'Rp0', 'yearly' => 'Rp0', 'note' => 'Free forever', 'noteYearly' => 'Free forever', 'cta' => 'Download free', 'featured' => false, 'features' => ['Unlimited notes on 2 devices', 'Docs, tasks and daily notes', '1 GB of uploads']], ['id' => 'plus', 'name' => 'Plus', 'blurb' => 'For people who live in their notes.', 'monthly' => 'Rp49.000', 'yearly' => 'Rp39.000', 'note' => 'Billed monthly', 'noteYearly' => 'Rp468.000 billed yearly', 'cta' => 'Start 14 day trial', 'featured' => true, 'features' => ['Everything in Free, on every device', 'Calendar and whiteboards', 'Publish pages as a website', '50 GB of uploads']], ['id' => 'team', 'name' => 'Team', 'blurb' => 'For small teams sharing one space.', 'monthly' => 'Rp89.000', 'yearly' => 'Rp71.000', 'note' => 'Per member, billed monthly', 'noteYearly' => 'Rp852.000 per member yearly', 'cta' => 'Talk to us', 'featured' => false, 'features' => ['Everything in Plus', 'Shared spaces and permissions', 'Admin console and SSO', 'Priority support in Bahasa and English']]];
    $FAQS = [['question' => 'Does Lembar work offline?', 'answer' => 'Yes. Everything is stored on your device first and syncs when you are back online, so a flight or a bad signal never stops you.'], ['question' => 'Can I import from other apps?', 'answer' => 'Bring your notes from Markdown files, Notion, Evernote, or Apple Notes. Folders, images, and links come along.'], ['question' => 'Who can see my notes?', 'answer' => 'Only you, until you share a page. Shared pages can be view only, editable, or published as a public site.'], ['question' => 'Is there a discount for students?', 'answer' => 'Students and teachers get Plus for free with a school email address. Renew it once a year.'], ['question' => 'Can I cancel at any time?', 'answer' => 'Yes. Your plan stays active until the end of the period, and your notes stay yours on the Free plan.']];
    $FOOTER = [['Product', ['Docs', 'Tasks', 'Calendar', 'Whiteboards']], ['Company', ['About', 'Careers', 'Blog', 'Press']], ['Resources', ['Help center', 'Templates', 'Community', 'Status']]];
    $HERO_CLOUDS = ['top-20 -left-16 scale-125 opacity-95', 'top-44 left-[22%] scale-75 opacity-70 [animation-delay:-5s]', 'top-16 -right-10 scale-150 opacity-95 [animation-delay:-9s]', 'top-[25rem] right-[8%] opacity-70 [animation-delay:-3s]', 'top-[29rem] left-[2%] scale-110 opacity-70 [animation-delay:-7s]'];
    $CTA_CLOUDS = ['-top-6 -left-10 opacity-80', 'right-0 bottom-4 scale-125 opacity-70 [animation-delay:-6s]'];
    $PLATFORMS = ['macOS', 'Windows', 'iPhone', 'Android'];
    $PLAN_MESSAGES = ['free' => ['Download started', 'Lembar Free is on its way to your Downloads folder.'], 'plus' => ['Your trial has started', '14 days of Plus, no card needed.'], 'team' => ['Thanks for reaching out', 'Our team will email you within one working day.']];

    $cx = fn (...$classes) => implode(' ', array_filter($classes));
    $initials = fn (string $name) => implode('', array_map(fn ($part) => $part[0], explode(' ', $name)));
    $slug = fn (string $label) => '/'.preg_replace('/\s+/', '-', strtolower($label));
    $svgOpen = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    $icon = fn (string $name, string $class = '') => new HtmlString($svgOpen.' class="'.($class ?: $iconClass).'"><path d="'.$icons[$name].'" /></svg>');
    $tabLabels = array_column($TABS, 'label', 'id');
@endphp

<div
  class="{{ $cx($root, $palette) }}"
  x-data="{
    menuOpen: false,
    tab: 'docs',
    yearly: false,
    edges: { start: true, end: false },
    email: '',
    emailError: '',
    labels: {{ Js::from($tabLabels) }},
    messages: {{ Js::from($PLAN_MESSAGES) }},
    stopReveal: () => {},
    init() {
      {{-- Animasi masuk saat scroll, mati saat reduced motion supaya isi selalu tampil. --}}
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-reveal', 'shown');
        observer.unobserve(entry.target);
      }), { rootMargin: '0px 0px -10% 0px' });
      this.$el.querySelectorAll('[data-reveal]').forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight) return;
        el.setAttribute('data-reveal', 'hidden');
        observer.observe(el);
      });
      this.stopReveal = () => observer.disconnect();
    },
    destroy() {
      this.stopReveal();
    },
    notify(title, description, variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    onTabKey(event) {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (!step) return;
      event.preventDefault();
      const ids = Object.keys(this.labels);
      const next = ids[(ids.indexOf(this.tab) + step + ids.length) % ids.length];
      this.tab = next;
      document.getElementById('catatan-tab-' + next)?.focus();
    },
    onScroll() {
      const el = this.$refs.viewport;
      this.edges = { start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 };
    },
    slide(direction) {
      const el = this.$refs.viewport;
      const card = el.querySelector('li');
      if (card) el.scrollBy({ left: direction * (card.offsetWidth + 20) });
    },
    choosePlan(id) {
      const [title, description] = this.messages[id];
      this.notify(title, description, 'success');
    },
    submit() {
      const value = this.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        this.emailError = 'Enter a valid email address, like you@mail.com.';
        return;
      }
      this.emailError = '';
      this.email = '';
      this.notify('Link sent', 'Check ' + value + ' on your phone.', 'success');
    },
  }"
>
  <style>{!! $css !!}</style>
  <header class="{{ $headerWrap }}">
    <nav aria-label="Main" class="{{ $navBar }}">
      <a href="#top" class="{{ $cx($wordmark, $focusRing) }}">lembar</a>
      <div class="{{ $navLinks }}">
        @foreach ($NAV as [$label, $href])
          <a href="{{ $href }}" class="{{ $cx($navLink, $focusRing) }}">{{ $label }}</a>
        @endforeach
      </div>
      <a href="/login" class="{{ $cx($loginLink, $focusRing) }}">Log in</a>
      <a href="#pricing" class="{{ $cx($pillDark, $focusRing, 'ml-auto md:ml-0') }}">Try free</a>
      <button type="button" class="{{ $cx($menuButton, $focusRing) }}" aria-expanded="false" :aria-expanded="menuOpen ? 'true' : 'false'" aria-controls="catatan-menu" aria-label="Open menu" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" x-on:click="menuOpen = !menuOpen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-5"><path d="{{ $icons['menu'] }}" :d="menuOpen ? @js($icons['close']) : @js($icons['menu'])" /></svg>
      </button>
    </nav>
    <template x-if="menuOpen">
      <div id="catatan-menu" class="{{ $menuPanel }}">
        @foreach ($NAV as [$label, $href])
          <a href="{{ $href }}" class="{{ $cx($menuLink, $focusRing) }}" x-on:click="menuOpen = false">{{ $label }}</a>
        @endforeach
        <a href="/login" class="{{ $cx($menuLink, $focusRing) }}">Log in</a>
      </div>
    </template>
  </header>

  <main>
    <section id="top" aria-labelledby="catatan-title" class="{{ $hero }}">
      @foreach ($HERO_CLOUDS as $place)
        <span class="{{ $cx($cloud, $place) }}" aria-hidden="true"><span class="{{ $puffBase }}"></span><span class="{{ $puffSmall }}"></span><span class="{{ $puffLarge }}"></span></span>
      @endforeach
      <div class="{{ $heroInner }}">
        <h1 id="catatan-title" class="{{ $heroTitle }}">Your space for notes, tasks, and big ideas</h1>
        <p class="{{ $heroLead }}">Lembar keeps everything you think, plan, and make on one calm page, from the first scribble to the finished thing.</p>
        <div class="{{ $heroActions }}">
          <a href="#download" class="{{ $cx($pillLight, $focusRing) }}">{{ $icon('download') }} Download for free</a>
          <a href="#product" class="{{ $cx($pillGhost, $focusRing) }}">See what it does</a>
        </div>
        <p class="{{ $heroNote }}">Free on Mac, Windows, iPhone, and Android.</p>
      </div>
      <div class="{{ $collage }}">
        <div class="{{ $cx($paperShadow, '-top-10 -left-6 h-56 w-72 -rotate-6 sm:-left-14') }}" aria-hidden="true">
          <div class="{{ $paperWhite }}"></div>
        </div>
        <div class="{{ $cx($paperShadow, '-top-8 -right-6 h-72 w-60 rotate-6 sm:-right-12') }}" aria-hidden="true">
          <div class="{{ $paperLined }}"></div>
          <span class="{{ $paperList }}"><span>buy film</span><span>call Ibu</span><span>ideas!</span></span>
        </div>
        <div class="{{ $cx($paperShadow, '-bottom-20 -left-8 h-48 w-80 rotate-3 sm:-left-16') }}" aria-hidden="true">
          <div class="{{ $paperCoal }}"></div>
          <span class="{{ $cx($scribble, 'bottom-6 left-8 -rotate-3') }}">think out loud</span>
        </div>
        <div class="{{ $cx($paperShadow, '-right-8 -bottom-14 h-44 w-72 -rotate-3 sm:-right-16') }}" aria-hidden="true">
          <div class="{{ $paperLilac }}"></div>
        </div>
        <div class="relative z-10 mx-auto max-w-4xl" role="img" aria-label="The Lembar app with a sidebar of spaces and a planning board of pastel cards">
          <div class="{{ $windowFrame }}">
            <div class="{{ $windowBar }}"><span class="{{ $windowDot }}"></span><span class="{{ $windowDot }}"></span><span class="{{ $windowDot }}"></span><span class="{{ $windowTitle }}">Bali offsite</span></div>
            <div class="{{ $appGrid }}">
              <div class="{{ $sidebar }}">
                <div class="{{ $sideSearch }}">{{ $icon('search', 'size-3.5') }} Search</div>
                @foreach ($SIDE_ITEMS as [$name, $label])
                  <span class="{{ $sideItem }}">{{ $icon($name) }} {{ $label }}</span>
                @endforeach
                <span class="{{ $sideLabel }}">Spaces</span>
                @foreach ($SPACES as $i => [$label, $tone])
                  <span class="{{ $i === 0 ? $sideActive : $sideItem }}"><span class="{{ $cx($sideDot, $tones[$tone]) }}"></span> {{ $label }}</span>
                @endforeach
              </div>
              <div class="{{ $docArea }}">
                <div>
                  <p class="{{ $docTitle }}">Bali offsite</p>
                  <p class="{{ $docMeta }}">Planning board · edited 2 minutes ago</p>
                </div>
                <div class="{{ $cardGrid }}">
                  @foreach ($HERO_CARDS as [$name, $label, $meta, $tone])
                    <div class="{{ $cx($pastelCard, $tones[$tone]) }}">
                      <span class="{{ $pastelIcon }}">{{ $icon($name) }}</span>
                      <span><span class="block"><span class="{{ $pastelTitle }}">{{ $label }}</span></span><span class="{{ $pastelMeta }}">{{ $meta }}</span></span>
                    </div>
                  @endforeach
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="product" aria-labelledby="catatan-things" class="{{ $section }}">
      <div class="{{ $sectionInner }}" data-reveal="">
        <h2 id="catatan-things" class="{{ $serifTitle }}">Lembar isn&rsquo;t just for one thing, it&rsquo;s for <em>your</em> things.</h2>
        <p class="{{ $sectionLead }}">Write a doc, tick off a list, plan the week, or think on a canvas. Same app, same page, no switching.</p>
        <div role="tablist" aria-label="What you can make" class="{{ $tabList }}" x-on:keydown="onTabKey($event)">
          @foreach ($TABS as $item)
            @php $on = $item['id'] === 'docs'; @endphp
            <button
              id="catatan-tab-{{ $item['id'] }}"
              type="button"
              role="tab"
              aria-selected="{{ $on ? 'true' : 'false' }}"
              :aria-selected="tab === @js($item['id']) ? 'true' : 'false'"
              aria-controls="catatan-panel"
              tabindex="{{ $on ? 0 : -1 }}"
              :tabindex="tab === @js($item['id']) ? 0 : -1"
              class="{{ $cx($tabBase, $focusRing, $on ? $tabActive : $tabIdle) }}"
              :class="tab === @js($item['id']) ? @js($cx($tabBase, $focusRing, $tabActive)) : @js($cx($tabBase, $focusRing, $tabIdle))"
              x-on:click="tab = @js($item['id'])"
            >
              <span class="{{ $cx($tabIconWrap, $on ? $tabIconActive : $tabIconIdle) }}" :class="tab === @js($item['id']) ? @js($cx($tabIconWrap, $tabIconActive)) : @js($cx($tabIconWrap, $tabIconIdle))">{{ $icon($item['icon'], $tabIcon) }}</span>
              {{ $item['label'] }}
            </button>
          @endforeach
        </div>
        <div class="{{ $panelWrap }}">
          <span class="{{ $panelGlow }}" aria-hidden="true"></span>
          <div id="catatan-panel" role="tabpanel" aria-labelledby="catatan-tab-docs" :aria-labelledby="'catatan-tab-' + tab">
            <div class="{{ $windowFrame }}">
              <div class="{{ $windowBar }}"><span class="{{ $windowDot }}"></span><span class="{{ $windowDot }}"></span><span class="{{ $windowDot }}"></span><span class="{{ $windowTitle }}" x-text="labels[tab]">Docs</span></div>
              <div class="{{ $panelBody }}">
                <template x-if="tab === 'docs'">
                  <div class="grid gap-6 md:grid-cols-[1fr_15rem]">
                    <div class="grid content-start gap-4">
                      <p class="{{ $kicker }}">Studio Lembar / Letters</p>
                      <p class="{{ $docTitle }}">A quarterly letter to the team</p>
                      <p class="{{ $paragraph }}">This quarter we shipped offline sync, rebuilt search, and welcomed four new people. Here is what we learned, and what we want to try next.</p>
                      <p class="{{ $quote }}">&ldquo;Write it down first. Decide later.&rdquo;</p>
                      <p class="{{ $paragraph }}">Next up: shared spaces for small teams, and a calmer way to plan the week without leaving your notes.</p>
                    </div>
                    <div class="grid content-start gap-2">
                      <p class="{{ $kicker }}">Linked pages</p>
                      @foreach (array_slice($HERO_CARDS, 0, 3) as [$name, $label, , $tone])
                        <span class="{{ $linkCard }}"><span class="{{ $cx($pastelIcon, $tones[$tone]) }}">{{ $icon($name) }}</span> {{ $label }}</span>
                      @endforeach
                    </div>
                  </div>
                </template>
                <template x-if="tab === 'tasks'">
                  <div class="grid gap-4">
                    <div class="flex flex-wrap items-center justify-between gap-3">
                      <p class="{{ $docTitle }}">This week</p>
                      <span class="flex items-center gap-3 text-sm text-muted">5 of 8 done <span class="{{ $progressTrack }}"><span class="{{ $cx('block', $progressFill) }}"></span></span></span>
                    </div>
                    <ul>
                      @foreach ($TASKS as [$label, $done, $group, $tone, $day])
                        <li class="{{ $taskRow }}">
                          @if ($done)
                            <span class="{{ $checkDone }}">{{ $icon('check', 'size-3') }}</span>
                          @else
                            <span class="{{ $checkOpen }}"></span>
                          @endif
                          <span class="{{ $done ? 'text-muted line-through' : '' }}">{{ $label }}</span>
                          <span class="{{ $cx($tag, $tones[$tone]) }}">{{ $group }}</span>
                          <span class="{{ $taskDate }}">{{ $day }}</span>
                        </li>
                      @endforeach
                    </ul>
                  </div>
                </template>
                <template x-if="tab === 'calendar'">
                  <div class="grid gap-4">
                    <p class="{{ $docTitle }}">November 2026</p>
                    <div class="{{ $weekGrid }}">
                      @foreach ($WEEK as [$day, $num, $events])
                        <div class="min-w-0">
                          <div class="{{ $dayHead }}">{{ $day }} <span class="{{ $cx($dayNum, $num === 9 ? $dayToday : '') }}">{{ $num }}</span></div>
                          <div class="{{ $dayCol }}">
                            @foreach ($events as [$label, $time, $tone])
                              <span class="{{ $cx($eventChip, $tones[$tone]) }}">{{ $label }} <span class="{{ $eventTime }}">{{ $time }}</span></span>
                            @endforeach
                          </div>
                        </div>
                      @endforeach
                    </div>
                  </div>
                </template>
                <template x-if="tab === 'boards'">
                  <div class="{{ $boardCanvas }}">
                    <svg class="{{ $boardLines }}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      @foreach ($BOARD_LINES as $d)
                        <path d="{{ $d }}" vector-effect="non-scaling-stroke" />
                      @endforeach
                    </svg>
                    @foreach ($STICKIES as [$label, $text, $tone, $place])
                      <span class="{{ $cx($sticky, $tones[$tone], $place) }}"><span class="{{ $stickyTitle }}">{{ $label }}</span> {{ $text }}</span>
                    @endforeach
                  </div>
                </template>
                <template x-if="tab === 'daily'">
                  <div class="{{ $dailyGrid }}">
                    <div>
                      <p class="{{ $kicker }}">Daily note</p>
                      <p class="{{ $dailyDate }}">Monday, 9 November</p>
                      <ul class="mt-3">
                        @foreach ($DAILY as [$time, $text])
                          <li class="{{ $dailyRow }}"><span class="{{ $dailyTime }}">{{ $time }}</span> {{ $text }}</li>
                        @endforeach
                      </ul>
                      <div class="{{ $moodRow }}">
                        @foreach ($MOODS as [$label, $tone])
                          <span class="{{ $cx($moodChip, $tones[$tone]) }}">{{ $label }}</span>
                        @endforeach
                      </div>
                    </div>
                    <div class="{{ $asideCard }}">
                      <p class="{{ $kicker }}">Earlier</p>
                      @foreach ($RECENT as [$day, $count])
                        <span class="{{ $asideItem }}">{{ $day }} <span class="text-muted">{{ $count }}</span></span>
                      @endforeach
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="stories" aria-labelledby="catatan-stories" class="{{ $section }}">
      <div class="{{ $storiesHead }}" data-reveal="">
        <h2 id="catatan-stories" class="{{ $storiesTitle }}">How people use Lembar</h2>
        <div class="{{ $carouselButtons }}">
          <button type="button" class="{{ $cx($roundButton, $focusRing) }}" aria-label="Previous stories" disabled :disabled="edges.start" x-on:click="slide(-1)">{{ $icon('left', 'size-5') }}</button>
          <button type="button" class="{{ $cx($roundButton, $focusRing) }}" aria-label="Next stories" :disabled="edges.end" x-on:click="slide(1)">{{ $icon('right', 'size-5') }}</button>
        </div>
      </div>
      <div x-ref="viewport" role="region" aria-label="Stories" tabindex="0" class="{{ $cx($viewport, $focusRing) }}" x-on:scroll="onScroll()">
        <ul class="{{ $storyList }}">
          @foreach ($STORIES as $i => $story)
            <li class="{{ $storyItem }}">
              <div class="{{ $cx($portrait, $story['colors']) }}" aria-hidden="true">
                <span class="{{ $i % 2 ? $flip : 'absolute inset-0' }}"><span class="{{ $shapeCircle }}"></span><span class="{{ $shapeStrip }}"></span><span class="{{ $shapeHalf }}"></span></span>
                <span class="{{ $personBody }}"></span>
                <span class="{{ $personHead }}">{{ $initials($story['name']) }}</span>
              </div>
              <p class="{{ $storyName }}">{{ $story['name'] }}</p>
              <p class="{{ $storyRole }}">{{ $story['role'] }}</p>
              <p class="{{ $storyNote }}">&ldquo;{{ $story['note'] }}&rdquo;</p>
            </li>
          @endforeach
        </ul>
      </div>
    </section>

    <section id="features" aria-labelledby="catatan-features" class="{{ $section }}">
      <div class="{{ $sectionInner }}" data-reveal="">
        <h2 id="catatan-features" class="{{ $serifTitle }}">From first thought to finished</h2>
        <p class="{{ $sectionLead }}">Catch the idea, give it shape, then hand it to the people who need it.</p>
        <div class="{{ $featureGrid }}">
          <div class="{{ $cx($featureCard, $tones['cream']) }}">
            <div class="{{ $featureMock }}" aria-hidden="true">
              <span class="{{ $captureBox }}">{{ $icon('plus', 'size-4 text-muted') }} Call Pak Hendra about the venue <span class="{{ $caret }}"></span></span>
              <span class="{{ $chip }}">{{ $icon('folder', 'size-3.5') }} Inbox</span>
            </div>
            <p class="{{ $featureStep }}">01 Capture</p>
            <h3 class="{{ $featureTitle }}">Jot it before it slips</h3>
            <p class="{{ $featureText }}">A quick note from the menu bar, your phone, or your watch. It lands in Inbox, ready when you are.</p>
          </div>
          <div class="{{ $cx($featureCard, $tones['mint']) }}">
            <div class="{{ $featureMock }}" aria-hidden="true">
              @foreach (array_slice($TASKS, 4, 3) as [$label, $done])
                <span class="{{ $miniCheck }}">
                  @if ($done)
                    <span class="{{ $checkDone }}">{{ $icon('check', 'size-3') }}</span>
                  @else
                    <span class="{{ $checkOpen }}"></span>
                  @endif
                  {{ $label }}
                </span>
              @endforeach
            </div>
            <p class="{{ $featureStep }}">02 Shape</p>
            <h3 class="{{ $featureTitle }}">Turn notes into plans</h3>
            <p class="{{ $featureText }}">Any line becomes a task, any date becomes an event, any page becomes a board. Nothing gets copied twice.</p>
          </div>
          <div class="{{ $cx($featureCard, $tones['lilac']) }}">
            <div class="{{ $featureMock }}" aria-hidden="true">
              <span class="{{ $shareField }}">{{ $icon('link', 'size-3.5') }} lembar.page/bali-offsite</span>
              <span class="flex items-center">
                <span class="{{ $avatarRow }}">
                  @foreach (array_slice($STORIES, 0, 3) as $i => $story)
                    <span class="{{ $cx($avatar, [$tones['peach'], $tones['ice'], $tones['rose']][$i]) }}">{{ $initials($story['name']) }}</span>
                  @endforeach
                </span>
                <span class="{{ $published }}">Published</span>
              </span>
            </div>
            <p class="{{ $featureStep }}">03 Share</p>
            <h3 class="{{ $featureTitle }}">Send it out into the world</h3>
            <p class="{{ $featureText }}">Invite people to edit, share a read only link, or publish a page as a site with its own address.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="pricing" aria-labelledby="catatan-pricing" class="{{ $section }}">
      <div class="{{ $sectionInner }}" data-reveal="">
        <h2 id="catatan-pricing" class="{{ $serifTitle }}">Simple plans, honest prices</h2>
        <p class="{{ $sectionLead }}">Start free. Upgrade when your notes outgrow two devices.</p>
        <div class="{{ $billing }}" role="group" aria-label="Billing period">
          <button type="button" aria-pressed="true" :aria-pressed="!yearly ? 'true' : 'false'" class="{{ $cx($billingButton, $focusRing, $billingActive) }}" :class="yearly ? @js($cx($billingButton, $focusRing, $billingIdle)) : @js($cx($billingButton, $focusRing, $billingActive))" x-on:click="yearly = false">Monthly</button>
          <button type="button" aria-pressed="false" :aria-pressed="yearly ? 'true' : 'false'" class="{{ $cx($billingButton, $focusRing, $billingIdle) }}" :class="yearly ? @js($cx($billingButton, $focusRing, $billingActive)) : @js($cx($billingButton, $focusRing, $billingIdle))" x-on:click="yearly = true">Yearly <span class="{{ $saveBadge }}">Save 20%</span></button>
        </div>
        <div class="{{ $planGrid }}">
          @foreach ($PLANS as $plan)
            <div data-plan="{{ $plan['id'] }}" class="{{ $cx($planBase, $plan['featured'] ? $planFeatured : $planIdle) }}">
              <div>
                <h3 class="{{ $planName }}">{{ $plan['name'] }}@if ($plan['featured'])<span class="{{ $planBadge }}">Popular</span>@endif</h3>
                <p class="{{ $planBlurb }}">{{ $plan['blurb'] }}</p>
              </div>
              <div>
                <p><span class="{{ $planPrice }}" x-text="yearly ? @js($plan['yearly']) : @js($plan['monthly'])">{{ $plan['monthly'] }}</span><span class="{{ $planPer }}">/ month</span></p>
                <p class="{{ $planNote }}" x-text="yearly ? @js($plan['noteYearly']) : @js($plan['note'])">{{ $plan['note'] }}</p>
              </div>
              <x-markas.button :variant="$plan['featured'] ? 'primary' : 'secondary'" class="w-full" x-on:click="choosePlan({{ Js::from($plan['id']) }})">{{ $plan['cta'] }}</x-markas.button>
              <ul class="{{ $planList }}">
                @foreach ($plan['features'] as $feature)
                  <li class="{{ $planItem }}">{{ $icon('check', $planCheck) }} {{ $feature }}</li>
                @endforeach
              </ul>
            </div>
          @endforeach
        </div>
      </div>
    </section>

    <div class="{{ $faqWrap }}">
      <div class="{{ $faqInner }}" data-reveal="">
        <x-markas.faq id="faq" variant="split" title="Questions, answered" description="Everything people ask before they move their notes in." :items="$FAQS" exclusive />
      </div>
    </div>

    <section id="download" aria-labelledby="catatan-download" class="{{ $ctaWrap }}">
      <div class="{{ $ctaCard }}" data-reveal="">
        @foreach ($CTA_CLOUDS as $place)
          <span class="{{ $cx($cloud, $place) }}" aria-hidden="true"><span class="{{ $puffBase }}"></span><span class="{{ $puffSmall }}"></span><span class="{{ $puffLarge }}"></span></span>
        @endforeach
        <h2 id="catatan-download" class="{{ $ctaTitle }}">Start with a blank page</h2>
        <p class="{{ $ctaLead }}">Get Lembar on every device. We will send the download link straight to your phone.</p>
        <div class="{{ $platformRow }}">
          @foreach ($PLATFORMS as $name)
            <button type="button" class="{{ $cx($platform, $focusRing) }}" x-on:click="notify({{ Js::from('Lembar for '.$name) }}, 'Your download will start in a moment.')">{{ $icon('download') }} {{ $name }}</button>
          @endforeach
        </div>
        <form class="{{ $ctaForm }}" novalidate x-on:submit.prevent="submit()">
          <div class="{{ $emailField }}">
            <x-markas.input id="catatan-email" label="Email" type="email" name="email" placeholder="you@mail.com" x-model="email" x-bind:aria-invalid="emailError ? 'true' : null" x-bind:aria-describedby="emailError ? 'catatan-email-error' : null" />
            <template x-if="emailError"><p id="catatan-email-error" class="{{ $errorText }}" x-text="emailError"></p></template>
          </div>
          <x-markas.button type="submit" class="sm:mt-7">Send link</x-markas.button>
        </form>
      </div>
    </section>
  </main>

  <footer class="{{ $footer }}">
    <div class="{{ $footerInner }}">
      <div class="{{ $footerBrand }}">
        <a href="#top" class="{{ $cx($wordmark, $focusRing, 'w-fit') }}">lembar</a>
        <p class="{{ $footerTag }}">A calm home for notes, tasks, and big ideas. Made in Yogyakarta.</p>
      </div>
      @foreach ($FOOTER as [$heading, $links])
        <nav aria-label="{{ $heading }}">
          <h2 class="{{ $footerHead }}">{{ $heading }}</h2>
          <ul class="{{ $footerList }}">
            @foreach ($links as $label)
              <li><a href="{{ $slug($label) }}" class="{{ $cx($footerLink, $focusRing) }}">{{ $label }}</a></li>
            @endforeach
          </ul>
        </nav>
      @endforeach
    </div>
    <div class="{{ $footerBottom }}">
      <p>&copy; 2026 Lembar Labs. All rights reserved.</p>
      <p>Built with <a href="https://markasui.pages.dev" class="{{ $cx($builtWith, $focusRing) }}">MarkasUI</a></p>
    </div>
  </footer>
  <x-markas.toast />
</div>
