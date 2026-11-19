@php
    // Kelas Tailwind dan data contoh, identik dengan versi React (satu blok JSON hasil salinan konstanta React).
    $data = json_decode(<<<'JSON'
    {"focusRing":"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","root":"[--nalar-accent:var(--markas-primary-line)] dark:[--nalar-accent:var(--markas-primary)]","shell":"dark [--nalar-canvas:var(--markas-canvas)] [--nalar-surface:var(--markas-surface)] [--nalar-subtle:var(--markas-subtle)] [--nalar-line:var(--markas-line)]","palette":"relative min-h-dvh overflow-x-clip bg-canvas text-ink [--markas-canvas:color-mix(in_oklab,var(--nalar-accent)_6%,var(--nalar-canvas))] [--markas-surface:color-mix(in_oklab,var(--nalar-accent)_6%,var(--nalar-surface))] [--markas-subtle:color-mix(in_oklab,var(--nalar-accent)_9%,var(--nalar-subtle))] [--markas-line:color-mix(in_oklab,var(--nalar-accent)_14%,var(--nalar-line))] [--markas-primary:var(--nalar-accent)] [--markas-primary-strong:color-mix(in_oklab,var(--nalar-accent)_82%,var(--markas-ink))] [--markas-on-primary:var(--nalar-canvas)] [--markas-primary-soft:color-mix(in_oklab,var(--nalar-accent)_16%,var(--nalar-canvas))] [--markas-primary-line:color-mix(in_oklab,var(--nalar-accent)_40%,var(--nalar-canvas))]","container":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8","footerEdge":"px-[max(1rem,calc((100%-72rem)/2+2rem))]","navWrap":"absolute inset-x-4 top-4 z-30 sm:inset-x-8 sm:top-6","navbar":"mx-auto max-w-5xl","brandLink":"flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","brandMark":"flex size-7 items-center justify-center rounded-lg bg-primary text-on-primary","signIn":"hidden h-9 items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","startLink":"hidden h-9 items-center rounded-lg bg-ink px-4 text-sm font-medium whitespace-nowrap text-canvas transition-colors duration-150 hover:bg-ink/90 sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","hero":"relative isolate overflow-hidden pt-36 sm:pt-44","horizon":"pointer-events-none absolute top-24 left-1/2 -z-10 aspect-square w-[340%] -translate-x-1/2 rounded-full border-t border-primary/70 shadow-[0_-36px_140px_-48px_var(--color-primary),inset_0_48px_96px_-80px_var(--color-primary)] sm:top-28 sm:w-[220%] lg:w-[150%]","heroCopy":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center","chip":"inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1 pr-3 pl-1 text-sm text-muted backdrop-blur-md","chipTag":"rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary","h1":"mt-7 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl","h1Accent":"text-primary","heroText":"mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg","heroActions":"mt-9 flex flex-wrap items-center justify-center gap-3","heroCta":"inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","heroGhost":"inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-surface/60 px-5 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","heroNote":"mt-4 text-sm text-muted","dashWrap":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative mt-16 sm:mt-20","dashFrame":"overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface shadow-overlay [mask-image:linear-gradient(to_bottom,black_86%,transparent)]","dashGrid":"grid lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_17rem]","dashSide":"hidden flex-col gap-6 border-r border-line p-4 lg:flex","workspace":"flex items-center gap-2.5 px-2 py-1","workspaceMark":"flex size-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-on-primary","workspaceName":"text-sm font-medium","workspacePlan":"text-xs text-muted","sideNav":"grid gap-0.5","sideItem":"flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted","sideItemActive":"flex items-center gap-2.5 rounded-lg bg-primary/12 px-2 py-1.5 text-sm font-medium text-ink","sideIcon":"size-4 shrink-0","sideIconActive":"size-4 shrink-0 text-primary","sideCount":"ml-auto rounded-full bg-primary px-1.5 text-xs font-medium text-on-primary tabular-nums","dashMain":"grid min-w-0 content-start gap-4 p-4 sm:p-6","dashHead":"flex flex-wrap items-center justify-between gap-3","dashTitle":"text-base font-semibold tracking-tight","dashSub":"text-sm text-muted","kpiGrid":"grid gap-3 sm:grid-cols-3","kpiCard":"rounded-xl border border-line bg-canvas/60 p-4","kpiLabel":"text-xs text-muted","kpiRow":"mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1","kpiValue":"text-xl font-semibold tracking-tight whitespace-nowrap tabular-nums","chartCard":"rounded-xl border border-line bg-canvas/60 p-4","chartHead":"flex flex-wrap items-baseline justify-between gap-2","chartTitle":"text-sm font-medium","chartNote":"text-xs font-medium text-primary","chartBars":"mt-4 flex h-32 items-end gap-1.5 sm:h-36 sm:gap-2","bar":"flex-1 rounded-t-[3px] bg-primary/30","barPeak":"flex-1 rounded-t-[3px] bg-primary","dashTable":"bg-canvas/60","dashPanel":"hidden content-start gap-4 border-l border-line p-4 xl:grid","insightCard":"rounded-xl border border-primary/30 bg-primary/8 p-4","insightLabel":"flex items-center gap-2 text-xs font-medium text-primary","insightDot":"size-1.5 rounded-full bg-primary","insightTitle":"mt-3 text-sm leading-snug font-semibold","insightText":"mt-2 text-xs leading-relaxed text-muted","driverList":"mt-4 grid gap-3","driverRow":"grid gap-1.5","driverHead":"flex justify-between gap-2 text-xs","driverValue":"text-muted tabular-nums","driverTrack":"h-1.5 overflow-hidden rounded-full bg-ink/10","driverBar":"h-full rounded-full bg-primary","insightAction":"mt-4 w-full","feedTitle":"px-1 text-xs font-medium text-muted","feedList":"grid gap-2","feedItem":"rounded-lg border border-line p-3","feedText":"text-xs leading-snug","feedTime":"mt-1 text-xs text-muted","logoWrap":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20","section":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-6 py-16 sm:py-24","sectionHead":"grid max-w-2xl gap-4","h2":"text-3xl font-semibold tracking-tight text-balance sm:text-4xl","lead":"text-lg leading-relaxed text-pretty text-muted","featureGrid":"mt-12 grid gap-4 lg:grid-cols-3","featureCard":"flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5 sm:p-6","featureWide":"flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5 sm:p-6 lg:col-span-2","featureArt":"flex min-h-44 flex-1 flex-col justify-center gap-3 rounded-xl border border-line bg-canvas/70 p-4","featureIcon":"flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary","featureTitle":"mt-4 text-lg font-semibold tracking-tight","featureText":"mt-2 text-sm leading-relaxed text-pretty text-muted","askBubble":"max-w-xs self-end rounded-xl rounded-br-sm bg-subtle px-3 py-2 text-sm","answerBubble":"max-w-md rounded-xl rounded-bl-sm border border-primary/30 bg-primary/10 px-3 py-2 text-sm leading-relaxed","answerSource":"text-xs text-muted","alertRow":"flex items-start justify-between gap-3 rounded-lg border border-line bg-surface p-3","alertText":"mt-1.5 text-sm leading-snug","alertTime":"shrink-0 text-xs text-muted","flowList":"grid gap-0","flowStep":"flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm","flowStepLast":"flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2.5 text-sm","flowNumber":"flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary tabular-nums","flowLink":"ml-6 h-3 w-px bg-primary/40","sourceGrid":"grid grid-cols-2 gap-2 sm:grid-cols-4","sourceChip":"flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm whitespace-nowrap","sourceDot":"ml-auto size-1.5 shrink-0 rounded-full bg-success","sourceIcon":"size-4 shrink-0 text-primary","howTabs":"mt-10","howPanel":"grid gap-8 pt-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-12","howTitle":"text-xl font-semibold tracking-tight","howText":"mt-3 text-base leading-relaxed text-pretty text-muted","terminal":"min-w-0 overflow-hidden rounded-xl border border-line bg-surface","terminalHead":"flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 text-xs text-muted","terminalTitle":"flex items-center gap-2","terminalIcon":"size-3.5 text-primary","terminalBody":"overflow-x-auto p-4 font-mono text-[13px] leading-6","lineCmd":"whitespace-pre text-ink","linePrompt":"mr-2 text-primary select-none","lineOut":"whitespace-pre text-muted","lineOk":"whitespace-pre text-success","storyCard":"mt-12 grid gap-10 rounded-3xl border border-primary/25 bg-primary/8 p-6 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:p-12","storyQuote":"text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl","person":"mt-8 flex items-center gap-3","photoLg":"size-12 shrink-0 rounded-full bg-subtle object-cover","photoMd":"size-10 shrink-0 rounded-full bg-subtle object-cover","personName":"text-sm font-medium","personRole":"text-sm text-muted","metricList":"grid content-end gap-6","metric":"flex flex-col-reverse gap-1 border-t border-primary/25 pt-5","metricValue":"text-4xl font-semibold tracking-tight text-primary tabular-nums","metricLabel":"text-sm text-muted","quoteGrid":"mt-4 grid gap-4 md:grid-cols-2","quoteCard":"flex flex-col justify-between gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-8","quoteText":"text-base leading-relaxed text-pretty","pricingHead":"flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between","planGrid":"mt-10 grid gap-4 lg:grid-cols-3","planCard":"flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8","planFeatured":"flex flex-col rounded-2xl border border-primary/60 bg-primary/8 p-6 sm:p-8","planTop":"flex items-center justify-between gap-3","planName":"text-lg font-semibold tracking-tight","planPrice":"mt-6 text-4xl font-semibold tracking-tight tabular-nums","planUnit":"mt-1 text-sm text-muted","planDesc":"mt-4 text-sm leading-relaxed text-pretty text-muted","planList":"mt-6 grid gap-3 border-t border-line pt-6 text-sm","planItem":"flex gap-2","planIcon":"mt-0.5 size-4 shrink-0 text-primary","planCta":"mt-8 inline-flex h-11 items-center justify-center rounded-lg border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","planCtaFeatured":"mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","planSpacer":"flex-1","faqLayout":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-6 py-16 sm:py-24 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16","faqAside":"grid content-start justify-items-start gap-4","faqList":"[&>div]:max-w-none [&>div]:gap-0","ctaWrap":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-6 pb-20 sm:pb-28","ctaCard":"grid gap-10 rounded-3xl border border-primary/40 bg-primary/8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16 lg:p-14","ctaForm":"grid gap-3","fieldLabel":"text-sm font-medium","fieldRow":"flex flex-col gap-3 sm:flex-row sm:items-start","fieldWrap":"grid flex-1 gap-1.5","fieldError":"text-sm text-danger","ctaNote":"text-sm text-muted","footer":"px-[max(1rem,calc((100%-72rem)/2+2rem))] border-t border-line bg-canvas","icons":{"arc":"M3 18a9 9 0 0 1 18 0M7.5 18a4.5 4.5 0 0 1 9 0","arrow":"M5 12h14M13 6l6 6-6 6","play":"M8 5.5v13l11-6.5Z","check":"m5 12.5 4.5 4.5L19 7.5","grid":"M4 4h7v7H4ZM13 4h7v7h-7ZM4 13h7v7H4ZM13 13h7v7h-7Z","bulb":"M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z","bell":"M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15ZM10 20.5a2 2 0 0 0 4 0","flow":"M4 7h10m0 0-3-3m3 3-3 3M20 17H10m0 0 3-3m-3 3 3 3","database":"M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3","sliders":"M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4","terminal":"m4 7 5 5-5 5M12 18h8"},"FORM_ID":"nalar-access","EMAIL_ERROR":"Enter a work email, like nama@perusahaan.co.id.","nav":[{"label":"Features","href":"#features"},{"label":"Workflow","href":"#how"},{"label":"Pricing","href":"#pricing"},{"label":"FAQ","href":"#faq"}],"sideLinks":[{"label":"Overview","icon":"grid"},{"label":"Insights","icon":"bulb"},{"label":"Alerts","icon":"bell","count":"3"},{"label":"Workflows","icon":"flow"},{"label":"Sources","icon":"database"},{"label":"Settings","icon":"sliders"}],"ranges":[{"value":"7d","label":"7D","sub":"Last 7 days, all channels","note":"Saturday peak, Rp 214 mn","peak":5,"bars":[52,48,61,58,66,100,72],"kpis":[{"label":"Net revenue","value":"Rp 1.21 bn","delta":"+6.2%","tone":"success"},{"label":"Active customers","value":"18,240","delta":"+3.1%","tone":"success"},{"label":"Churn risk","value":"4.8%","delta":"+0.9 pt","tone":"danger"}]},{"value":"30d","label":"30D","sub":"Last 30 days, all channels","note":"11.11 Harbolnas, Rp 612 mn","peak":9,"bars":[38,42,40,47,45,52,50,58,55,100,63,57,60,66,62],"kpis":[{"label":"Net revenue","value":"Rp 4.86 bn","delta":"+12.4%","tone":"success"},{"label":"Active customers","value":"21,905","delta":"+8.7%","tone":"success"},{"label":"Churn risk","value":"4.1%","delta":"-0.6 pt","tone":"success"}]},{"value":"90d","label":"90D","sub":"Last 90 days, all channels","note":"Best week: 9 to 15 Nov","peak":10,"bars":[41,44,39,48,52,50,57,55,61,64,100,70,68],"kpis":[{"label":"Net revenue","value":"Rp 13.9 bn","delta":"+21.0%","tone":"success"},{"label":"Active customers","value":"26,410","delta":"+14.2%","tone":"success"},{"label":"Churn risk","value":"3.9%","delta":"-1.2 pt","tone":"success"}]}],"accountColumns":[{"key":"account","label":"Account"},{"key":"city","label":"City"},{"key":"mrr","label":"MRR","align":"right"},{"key":"signal","label":"Signal"}],"accounts":[{"account":"Kopi Senja Group","city":"Bandung","mrr":"Rp 48 mn","signal":"Churn risk","tone":"danger"},{"account":"Rumah Rasa","city":"Surabaya","mrr":"Rp 36 mn","signal":"Usage down","tone":"warning"},{"account":"Batik Lestari","city":"Yogyakarta","mrr":"Rp 29 mn","signal":"Expansion","tone":"success"},{"account":"Toko Pelita","city":"Medan","mrr":"Rp 22 mn","signal":"New insight","tone":"primary"}],"drivers":[{"label":"Delivery time","value":"+62%","width":"71%"},{"label":"Cart abandonment","value":"+9%","width":"18%"},{"label":"Promo usage","value":"-4%","width":"11%"}],"feed":[{"text":"Checkout errors 3.2x normal on Android","time":"2 min ago"},{"text":"Stock below 5 days at Gudang Cikarang","time":"18 min ago"}],"logos":[{"name":"Sagara Commerce","path":"M3 15a9 9 0 0 1 18 0Z"},{"name":"Rumah Rasa","path":"M4 11 12 4l8 7v9H4Z"},{"name":"Kirim Cepat","path":"M3 7h12v10H3ZM15 10h4l2 3v4h-6Z"},{"name":"Batik Lestari","path":"M12 2 22 12 12 22 2 12Z"},{"name":"Pelita Finance","path":"M12 3 21 20H3Z"}],"alerts":[{"badge":"Anomaly","tone":"danger","text":"Checkout errors 3.2x normal on Android","time":"2 min"},{"badge":"Threshold","tone":"warning","text":"Stock below 5 days at Gudang Cikarang","time":"18 min"}],"flowSteps":["When churn risk passes 8%","Score the accounts behind it","Post to #retention with the reasons"],"sources":["PostgreSQL","MySQL","BigQuery","Snowflake","Google Sheets","Kafka","REST API","CSV upload"],"steps":[{"value":"connect","label":"1. Connect","title":"Connect a source in one command","text":"Read-only credentials, encrypted at rest. Nalar maps tables, joins, and metric definitions on the first sync, then keeps them in step with your schema.","file":"sagara-prod","lines":[{"kind":"cmd","text":"nalar connect postgres --name sagara-prod"},{"kind":"out","text":"Checking read-only access ... ok"},{"kind":"out","text":"Found 48 tables, 6 with revenue columns"},{"kind":"ok","text":"Synced 2.4M rows in 3m 12s"}]},{"value":"ask","label":"2. Ask","title":"Ask the way you would ask an analyst","text":"Nalar compares periods, segments, and cohorts on its own, and tells you how much of the change each cause explains.","file":"sagara-prod","lines":[{"kind":"cmd","text":"nalar ask \"why did repeat orders drop in Medan?\""},{"kind":"out","text":"Compared 14 days before and after 3 Nov"},{"kind":"out","text":"Delivery time 2.1 to 3.4 days, explains 71%"},{"kind":"ok","text":"Insight posted to #ops-medan"}]},{"value":"automate","label":"3. Automate","title":"Turn the answer into an alert","text":"Save any insight as a rule. Nalar checks it every 15 minutes and posts to the channel or ticket queue that owns the metric.","file":"sagara-prod","lines":[{"kind":"cmd","text":"nalar alert create --metric repeat_orders --city Medan"},{"kind":"out","text":"Rule: drop of 10% or more over 7 days"},{"kind":"out","text":"Action: post to #ops-medan, open a ticket"},{"kind":"ok","text":"Alert active, checked every 15 minutes"}]}],"metrics":[{"value":"9 hrs","label":"saved per analyst every week"},{"value":"41%","label":"faster response to revenue drops"},{"value":"3 days","label":"from first connection to the first alert"}],"quotes":[{"name":"Dimas Pratama","role":"Data Lead, Rumah Rasa","photo":"/template-images/nalar/dimas.webp","text":"Our analysts finally work on the questions nobody had time for. The routine why-did-this-change requests now answer themselves."},{"name":"Nadia Rahmawati","role":"VP Operations, Kirim Cepat","photo":"/template-images/nalar/nadia.webp","text":"The courier delay alert paid for the year in its first week. We switched routes in Medan two days before customers started to complain."}],"billing":[{"value":"monthly","label":"Monthly"},{"value":"yearly","label":"Yearly, save 20%"}],"plans":[{"name":"Starter","monthly":"Rp 0","yearly":"Rp 0","free":true,"featured":"","desc":"For one analyst trying Nalar on real data.","cta":"Start free","features":["3 data sources","100 questions per month","Daily anomaly checks","Community support"]},{"name":"Growth","monthly":"Rp 1.490.000","yearly":"Rp 1.190.000","free":false,"featured":"Most teams start here","desc":"For teams that want insights and alerts in their own channels.","cta":"Start 14-day trial","features":["15 data sources","Unlimited questions","Alerts every 15 minutes","Workflows to chat and tickets","Email support within 4 working hours"]},{"name":"Scale","monthly":"Rp 4.900.000","yearly":"Rp 3.920.000","free":false,"featured":"","desc":"For companies with a warehouse and strict access rules.","cta":"Talk to sales","features":["Unlimited sources","Row-level access control","SSO and audit log","Data processed in the Jakarta region","Named success manager"]}],"faqs":[{"question":"Does Nalar copy our data?","answer":"No. Nalar queries your sources with read-only credentials and keeps only aggregated results and metadata. Raw rows stay in your database or warehouse."},{"question":"Which data sources are supported?","answer":"PostgreSQL, MySQL, BigQuery, Snowflake, Google Sheets, Kafka, CSV uploads, and any REST API that returns JSON. New connectors ship every month."},{"question":"How do we check that an explanation is right?","answer":"Every insight shows the query, the comparison window, and how much of the change each cause explains, so your analysts can check the work before anyone acts on it."},{"question":"Where is our data processed?","answer":"In data centres in the Jakarta region by default, with Singapore available on the Scale plan. We follow Indonesia's Personal Data Protection Law (UU PDP)."},{"question":"What happens after the early access beta?","answer":"Beta customers keep their price for 12 months after general availability, and every alert and workflow you build carries over."}],"footerColumns":[{"title":"Product","links":[{"label":"Features","href":"#features"},{"label":"Workflow","href":"#how"},{"label":"Pricing","href":"#pricing"}]},{"title":"Resources","links":[{"label":"Docs","href":"/docs"},{"label":"Changelog","href":"/changelog"},{"label":"Status","href":"/status"}]},{"title":"Company","links":[{"label":"Customers","href":"#customers"},{"label":"Careers","href":"/careers"},{"label":"Contact","href":"#start"}]}],"legal":[{"label":"Privacy","href":"/privacy"},{"label":"Terms","href":"/terms"}],"lineClass":{"cmd":"whitespace-pre text-ink","out":"whitespace-pre text-muted","ok":"whitespace-pre text-success"}}
    JSON, true);
    extract($data);

    $icon = fn (string $name, string $class) => new Illuminate\Support\HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $brand = new Illuminate\Support\HtmlString('<a href="#top" class="'.$brandLink.'"><span class="'.$brandMark.'">'.$icon('arc', 'size-4').'</span>Nalar</a>');
    $rangeItems = array_map(fn ($item) => ['value' => $item['value'], 'label' => $item['label']], $ranges);
    $rangeData = array_column(array_map(fn ($item) => ['value' => $item['value'], 'sub' => $item['sub'], 'note' => $item['note']], $ranges), null, 'value');
    $initial = $rangeData['30d'];
    $priceData = array_map(fn ($plan) => ['monthly' => $plan['monthly'], 'yearly' => $plan['yearly'], 'free' => $plan['free']], $plans);
    $unitOf = fn ($plan, $period) => $plan['free'] ? 'free, no card needed' : 'per month, billed '.($period === 'yearly' ? 'yearly' : 'monthly');
    $tabItems = array_column($steps, 'label', 'value');
@endphp

{{-- Isi sel sinyal dan panel tab dirender dulu sebagai HTML (Blade tidak punya render prop). --}}
@php $signalRows = []; @endphp
@foreach ($accounts as $account)
@php ob_start(); @endphp<x-markas.badge :variant="$account['tone']">{{ $account['signal'] }}</x-markas.badge>@php $signalRows[] = array_merge($account, ['signal' => new Illuminate\Support\HtmlString(trim(ob_get_clean()))]); @endphp
@endforeach
@php $panels = []; @endphp
@foreach ($steps as $step)
@php ob_start(); @endphp
<div class="{{ $howPanel }}">
  <div>
    <h3 class="{{ $howTitle }}">{{ $step['title'] }}</h3>
    <p class="{{ $howText }}">{{ $step['text'] }}</p>
  </div>
  <div class="{{ $terminal }}">
    <p class="{{ $terminalHead }}"><span class="{{ $terminalTitle }}">{{ $icon('terminal', $terminalIcon) }}Terminal</span><span>{{ $step['file'] }}</span></p>
    <div class="{{ $terminalBody }}">
      @foreach ($step['lines'] as $line)
        <p class="{{ $lineClass[$line['kind']] ?? '' }}">@if ($line['kind'] === 'cmd')<span aria-hidden="true" class="{{ $linePrompt }}">$</span>@endif{{ $line['text'] }}</p>
      @endforeach
    </div>
  </div>
</div>
@php $panels[$step['value']] = new Illuminate\Support\HtmlString(preg_replace('/^[ \t]+|\n/m', '', ob_get_clean())); @endphp
@endforeach

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  id="top"
  class="{{ $root }}"
  x-data="{
    rangeId: '30d',
    ranges: @js($rangeData),
    period: 'monthly',
    prices: @js($priceData),
    email: '',
    error: '',
    init() {
      {{-- ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan pilihan sebelumnya. --}}
      this.$watch('rangeId', (value, previous) => { if (!value) this.rangeId = previous; });
      this.$watch('period', (value, previous) => { if (!value) this.period = previous; });
    },
    get range() { return this.ranges[this.rangeId] ?? this.ranges['30d']; },
    price(index) { return this.period === 'yearly' ? this.prices[index].yearly : this.prices[index].monthly; },
    unit(index) { return this.prices[index].free ? 'free, no card needed' : 'per month, billed ' + (this.period === 'yearly' ? 'yearly' : 'monthly'); },
    notify(title, description, variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    submit() {
      const value = this.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { this.error = @js($EMAIL_ERROR); return; }
      this.error = '';
      this.notify('You are on the list', 'We sent setup steps to ' + value + '. Most teams connect their first source within a day.', 'success');
      this.email = '';
    },
  }"
>
  <div class="{{ $shell }}">
    <div class="{{ $palette }}">
      <div class="{{ $navWrap }}">
        <x-markas.navbar variant="floating" :links="$nav" class="{{ $navbar }}" x-on:click="if ($event.target.closest('[data-state=open] a')) open = false">
          <x-slot:brand>{{ $brand }}</x-slot:brand>
          <x-slot:actions>
            <a href="/login" class="{{ $signIn }}">Sign in</a>
            <a href="#start" class="{{ $startLink }}">Get started</a>
          </x-slot:actions>
        </x-markas.navbar>
      </div>

      <main>
        <section aria-labelledby="nalar-title" class="{{ $hero }}">
          <div aria-hidden="true" class="{{ $horizon }}"></div>
          <div class="{{ $heroCopy }}">
            <p class="{{ $chip }}"><span class="{{ $chipTag }}">Beta</span>Nalar Agents are in early access</p>
            <h1 id="nalar-title" class="{{ $h1 }}">Find the reason behind <span class="{{ $h1Accent }}">every metric</span></h1>
            <p class="{{ $heroText }}">Nalar watches your revenue, product, and operations data, explains what changed in plain language, and sends it to the team that can act before the weekly report.</p>
            <div class="{{ $heroActions }}">
              <a href="#start" class="{{ $heroCta }}">Get started{{ $icon('arrow', 'size-4') }}</a>
              <a href="#how" class="{{ $heroGhost }}">{{ $icon('play', 'size-4') }}Watch demo</a>
            </div>
            <p class="{{ $heroNote }}">Free for 3 data sources. No credit card needed.</p>
          </div>

          <div class="{{ $dashWrap }}">
            <div role="group" aria-label="Nalar dashboard preview" class="{{ $dashFrame }}">
              <div class="{{ $dashGrid }}">
                <div class="{{ $dashSide }}">
                  <div class="{{ $workspace }}">
                    <span aria-hidden="true" class="{{ $workspaceMark }}">SC</span>
                    <div>
                      <p class="{{ $workspaceName }}">Sagara Commerce</p>
                      <p class="{{ $workspacePlan }}">Growth plan</p>
                    </div>
                  </div>
                  <ul class="{{ $sideNav }}">
                    @foreach ($sideLinks as $item)
                      <li @if ($loop->first) aria-current="page" @endif class="{{ $loop->first ? $sideItemActive : $sideItem }}">{{ $icon($item['icon'], $loop->first ? $sideIconActive : $sideIcon) }}{{ $item['label'] }}@if (! empty($item['count']))<span class="{{ $sideCount }}">{{ $item['count'] }}</span>@endif</li>
                    @endforeach
                  </ul>
                </div>

                <div class="{{ $dashMain }}">
                  <div class="{{ $dashHead }}">
                    <div>
                      <p class="{{ $dashTitle }}">Revenue overview</p>
                      <p data-range-sub="" class="{{ $dashSub }}" x-text="range.sub">{{ $initial['sub'] }}</p>
                    </div>
                    <x-markas.toggle-group label="Date range" :items="$rangeItems" value="30d" x-model="rangeId" />
                  </div>
                  @foreach ($ranges as $item)
                    <dl class="{{ $kpiGrid }}" x-show="rangeId === @js($item['value'])" @if ($item['value'] !== '30d') style="display: none" @endif>
                      @foreach ($item['kpis'] as $kpi)
                        <div class="{{ $kpiCard }}">
                          <dt class="{{ $kpiLabel }}">{{ $kpi['label'] }}</dt>
                          <dd class="{{ $kpiRow }}"><span class="{{ $kpiValue }}">{{ $kpi['value'] }}</span><x-markas.badge :variant="$kpi['tone']">{{ $kpi['delta'] }}</x-markas.badge></dd>
                        </div>
                      @endforeach
                    </dl>
                  @endforeach
                  <div data-range="30d" x-bind:data-range="rangeId" class="{{ $chartCard }}">
                    <div class="{{ $chartHead }}">
                      <p class="{{ $chartTitle }}">Net revenue</p>
                      <p class="{{ $chartNote }}" x-text="range.note">{{ $initial['note'] }}</p>
                    </div>
                    @foreach ($ranges as $item)
                      <div aria-hidden="true" class="{{ $chartBars }}" x-show="rangeId === @js($item['value'])" @if ($item['value'] !== '30d') style="display: none" @endif>
                        @foreach ($item['bars'] as $value)
                          <div class="{{ $loop->index === $item['peak'] ? $barPeak : $bar }}" style="height: {{ $value }}%"></div>
                        @endforeach
                      </div>
                    @endforeach
                  </div>
                  <x-markas.table label="Accounts to watch" size="sm" :columns="$accountColumns" :rows="$signalRows" class="{{ $dashTable }}" />
                </div>

                <div class="{{ $dashPanel }}">
                  <div class="{{ $insightCard }}">
                    <p class="{{ $insightLabel }}"><span aria-hidden="true" class="{{ $insightDot }}"></span>Insight</p>
                    <p class="{{ $insightTitle }}">Repeat orders in Medan fell 18% this week</p>
                    <p class="{{ $insightText }}">Most of the drop comes from orders placed after the courier switch on 3 November.</p>
                    <ul class="{{ $driverList }}">
                      @foreach ($drivers as $driver)
                        <li class="{{ $driverRow }}">
                          <p class="{{ $driverHead }}"><span>{{ $driver['label'] }}</span><span class="{{ $driverValue }}">{{ $driver['value'] }}</span></p>
                          <div class="{{ $driverTrack }}"><div class="{{ $driverBar }}" style="width: {{ $driver['width'] }}"></div></div>
                        </li>
                      @endforeach
                    </ul>
                    <x-markas.button size="sm" class="{{ $insightAction }}" x-on:click="notify('Alert created', 'Nalar will post to #ops-medan when repeat orders in Medan drop again.', 'success')">Create alert</x-markas.button>
                  </div>
                  <p class="{{ $feedTitle }}">Recent alerts</p>
                  <ul class="{{ $feedList }}">
                    @foreach ($feed as $item)
                      <li class="{{ $feedItem }}"><p class="{{ $feedText }}">{{ $item['text'] }}</p><p class="{{ $feedTime }}">{{ $item['time'] }}</p></li>
                    @endforeach
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="{{ $logoWrap }}">
          <x-markas.logo-cloud title="Data teams at retailers, marketplaces, and logistics companies ask Nalar first" :logos="$logos" variant="row" />
        </div>

        <section id="features" aria-labelledby="nalar-features" class="{{ $section }}">
          <div class="{{ $sectionHead }}">
            <h2 id="nalar-features" class="{{ $h2 }}">Everything between a question and the fix</h2>
            <p class="{{ $lead }}">Nalar does the digging an analyst would do on a slow week, every hour, on every metric you care about.</p>
          </div>
          <ul class="{{ $featureGrid }}">
            <li class="{{ $featureWide }}">
              <div aria-hidden="true" class="{{ $featureArt }}">
                <p class="{{ $askBubble }}">Why did repeat orders drop in Medan?</p>
                <div class="{{ $answerBubble }}">
                  <p>Delivery time rose from 2.1 to 3.4 days after the courier switch on 3 Nov. It explains 71% of the drop.</p>
                  <p class="{{ $answerSource }}">From orders, shipments, and courier_events</p>
                </div>
              </div>
              <div>
                <span class="{{ $featureIcon }}">{{ $icon('bulb', 'size-5') }}</span>
                <h3 class="{{ $featureTitle }}">Answers in plain language</h3>
                <p class="{{ $featureText }}">Ask why a number moved. Nalar reads the tables behind it, tests the likely causes, and replies with the two or three that explain most of the change.</p>
              </div>
            </li>
            <li class="{{ $featureCard }}">
              <div aria-hidden="true" class="{{ $featureArt }}">
                @foreach ($alerts as $item)
                  <div class="{{ $alertRow }}">
                    <div>
                      <x-markas.badge :variant="$item['tone']">{{ $item['badge'] }}</x-markas.badge>
                      <p class="{{ $alertText }}">{{ $item['text'] }}</p>
                    </div>
                    <span class="{{ $alertTime }}">{{ $item['time'] }}</span>
                  </div>
                @endforeach
              </div>
              <div>
                <span class="{{ $featureIcon }}">{{ $icon('bell', 'size-5') }}</span>
                <h3 class="{{ $featureTitle }}">Alerts that explain themselves</h3>
                <p class="{{ $featureText }}">Thresholds and anomaly checks on any metric, with the likely cause attached, so the person on call knows where to look first.</p>
              </div>
            </li>
            <li class="{{ $featureCard }}">
              <div aria-hidden="true" class="{{ $featureArt }}">
                <ol class="{{ $flowList }}">
                  @foreach ($flowSteps as $text)
                    <li>
                      @unless ($loop->first)<div class="{{ $flowLink }}"></div>@endunless
                      <p class="{{ $loop->last ? $flowStepLast : $flowStep }}"><span class="{{ $flowNumber }}">{{ $loop->iteration }}</span>{{ $text }}</p>
                    </li>
                  @endforeach
                </ol>
              </div>
              <div>
                <span class="{{ $featureIcon }}">{{ $icon('flow', 'size-5') }}</span>
                <h3 class="{{ $featureTitle }}">Workflows that close the loop</h3>
                <p class="{{ $featureText }}">Post to a team channel, open a ticket, or pause an ad campaign. Every action is logged with the data that triggered it.</p>
              </div>
            </li>
            <li class="{{ $featureWide }}">
              <div aria-hidden="true" class="{{ $featureArt }}">
                <ul class="{{ $sourceGrid }}">
                  @foreach ($sources as $source)
                    <li class="{{ $sourceChip }}">{{ $icon('database', $sourceIcon) }}{{ $source }}<span class="{{ $sourceDot }}"></span></li>
                  @endforeach
                </ul>
              </div>
              <div>
                <span class="{{ $featureIcon }}">{{ $icon('database', 'size-5') }}</span>
                <h3 class="{{ $featureTitle }}">Connects to the data you already have</h3>
                <p class="{{ $featureText }}">Read-only connections to warehouses, databases, and spreadsheets. Most teams are live in an afternoon, without moving a single table.</p>
              </div>
            </li>
          </ul>
        </section>

        <section id="how" aria-labelledby="nalar-how" class="{{ $section }}">
          <div class="{{ $sectionHead }}">
            <h2 id="nalar-how" class="{{ $h2 }}">From raw tables to a decision in three steps</h2>
            <p class="{{ $lead }}">Use the CLI, the web app, or both. Everything you set up in one shows up in the other.</p>
          </div>
          <x-markas.tabs :items="$tabItems" default-value="connect" class="{{ $howTabs }}">
            <x-slot:connect>{{ $panels['connect'] }}</x-slot:connect>
            <x-slot:ask>{{ $panels['ask'] }}</x-slot:ask>
            <x-slot:automate>{{ $panels['automate'] }}</x-slot:automate>
          </x-markas.tabs>
        </section>

        <section id="customers" aria-labelledby="nalar-customers" class="{{ $section }}">
          <div class="{{ $sectionHead }}">
            <h2 id="nalar-customers" class="{{ $h2 }}">Teams that stopped waiting for the Monday report</h2>
          </div>
          <div class="{{ $storyCard }}">
            <figure>
              <blockquote class="{{ $storyQuote }}">We used to spend Monday morning arguing about why a number moved. Now the reason is in the channel before anyone asks, and the meeting is about what to do next.</blockquote>
              <figcaption class="{{ $person }}">
                <img src="/template-images/nalar/clara.webp" alt="" width="48" height="48" loading="lazy" decoding="async" class="{{ $photoLg }}" />
                <div>
                  <p class="{{ $personName }}">Clara Wijaya</p>
                  <p class="{{ $personRole }}">Head of Growth, Sagara Commerce</p>
                </div>
              </figcaption>
            </figure>
            <dl class="{{ $metricList }}">
              @foreach ($metrics as $item)
                <div class="{{ $metric }}"><dt class="{{ $metricLabel }}">{{ $item['label'] }}</dt><dd class="{{ $metricValue }}">{{ $item['value'] }}</dd></div>
              @endforeach
            </dl>
          </div>
          <ul class="{{ $quoteGrid }}">
            @foreach ($quotes as $quote)
              <li class="{{ $quoteCard }}">
                <blockquote class="{{ $quoteText }}">{{ $quote['text'] }}</blockquote>
                <div class="{{ $person }}">
                  <img src="{{ $quote['photo'] }}" alt="" width="40" height="40" loading="lazy" decoding="async" class="{{ $photoMd }}" />
                  <div>
                    <p class="{{ $personName }}">{{ $quote['name'] }}</p>
                    <p class="{{ $personRole }}">{{ $quote['role'] }}</p>
                  </div>
                </div>
              </li>
            @endforeach
          </ul>
        </section>

        <section id="pricing" aria-labelledby="nalar-pricing" class="{{ $section }}">
          <div class="{{ $pricingHead }}">
            <div class="{{ $sectionHead }}">
              <h2 id="nalar-pricing" class="{{ $h2 }}">Pricing that grows with your data</h2>
              <p class="{{ $lead }}">Start free on three sources. Upgrade when Nalar is part of how your team works.</p>
            </div>
            <x-markas.toggle-group label="Billing period" :items="$billing" value="monthly" x-model="period" />
          </div>
          <ul data-billing="monthly" x-bind:data-billing="period" class="{{ $planGrid }}">
            @foreach ($plans as $plan)
              <li class="{{ $plan['featured'] ? $planFeatured : $planCard }}">
                <div class="{{ $planTop }}">
                  <h3 class="{{ $planName }}">{{ $plan['name'] }}</h3>
                  @if ($plan['featured'])
                    <x-markas.badge variant="primary">{{ $plan['featured'] }}</x-markas.badge>
                  @endif
                </div>
                <p class="{{ $planPrice }}" x-text="price({{ $loop->index }})">{{ $plan['monthly'] }}</p>
                <p class="{{ $planUnit }}" x-text="unit({{ $loop->index }})">{{ $unitOf($plan, 'monthly') }}</p>
                <p class="{{ $planDesc }}">{{ $plan['desc'] }}</p>
                <ul class="{{ $planList }}">
                  @foreach ($plan['features'] as $feature)
                    <li class="{{ $planItem }}">{{ $icon('check', $planIcon) }}{{ $feature }}</li>
                  @endforeach
                </ul>
                <div class="{{ $planSpacer }}"></div>
                <a href="#start" class="{{ $plan['featured'] ? $planCtaFeatured : $planCta }}">{{ $plan['cta'] }}</a>
              </li>
            @endforeach
          </ul>
        </section>

        <section id="faq" aria-labelledby="nalar-faq" class="{{ $faqLayout }}">
          <div class="{{ $faqAside }}">
            <h2 id="nalar-faq" class="{{ $h2 }}">Questions before you connect</h2>
            <p class="{{ $lead }}">Talk to the engineers who build Nalar, not a sales script.</p>
            <x-markas.button variant="secondary" x-on:click="notify('Call requested', 'An engineer will email you a time slot within one working day.')">Book a 20 minute call</x-markas.button>
          </div>
          <x-markas.faq :items="$faqs" :exclusive="true" class="{{ $faqList }}" />
        </section>

        <section id="start" aria-labelledby="nalar-start" class="{{ $ctaWrap }}">
          <div class="{{ $ctaCard }}">
            <div class="{{ $sectionHead }}">
              <h2 id="nalar-start" class="{{ $h2 }}">Put Nalar on your own data this week</h2>
              <p class="{{ $lead }}">Early access is open for teams in Indonesia and Southeast Asia. Connect a source, ask the first question, and keep everything you build.</p>
            </div>
            <form class="{{ $ctaForm }}" novalidate x-on:submit.prevent="submit()">
              <label for="{{ $FORM_ID }}-email" class="{{ $fieldLabel }}">Work email</label>
              <div class="{{ $fieldRow }}">
                <div class="{{ $fieldWrap }}">
                  <x-markas.input :id="$FORM_ID.'-email'" type="email" name="email" autocomplete="email" placeholder="nama@perusahaan.co.id" x-model="email" x-bind:aria-invalid="error ? 'true' : null" x-bind:aria-describedby="error ? '{{ $FORM_ID }}-error' : null" />
                  <template x-if="error"><p id="{{ $FORM_ID }}-error" class="{{ $fieldError }}" x-text="error"></p></template>
                </div>
                <x-markas.button type="submit">Request access</x-markas.button>
              </div>
              <p class="{{ $ctaNote }}">Free for 3 sources. No credit card needed.</p>
            </form>
          </div>
        </section>
      </main>

      <x-markas.footer class="{{ $footer }}" description="Nalar explains what changed in your business data and sends it to the team that can act." :columns="$footerColumns" :legal="$legal" copyright="© 2026 Nalar. Built with MarkasUI.">
        <x-slot:brand>{{ $brand }}</x-slot:brand>
      </x-markas.footer>
      <x-markas.toast />
    </div>
  </div>
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
