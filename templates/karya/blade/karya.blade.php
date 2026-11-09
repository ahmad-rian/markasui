@php
    use Illuminate\Support\HtmlString;

    /* Palet lokal, kelas, dan data: identik dengan versi React dan Vue. */
    $palette = '[--tpl-bg:#f1f1ee] [--tpl-paper:#ffffff] [--tpl-ink:#151515] [--tpl-sun:#ffd84a] [--tpl-pink:#ffb4d0] [--tpl-sky:#a8d2ff] [--tpl-mint:#a6e4bf] [--tpl-orange:#ff9d5c] [--tpl-lilac:#cfbaff] [--tpl-night:#171717] [--tpl-on-night:#f5f5f1] dark:[--tpl-bg:#111110] dark:[--tpl-paper:#f4f4f0] dark:[--tpl-sun:#f1cb42] dark:[--tpl-pink:#eea5c2] dark:[--tpl-sky:#9cc6f1] dark:[--tpl-mint:#98d6b1] dark:[--tpl-orange:#f09252] dark:[--tpl-lilac:#bda6f3] dark:[--tpl-night:#232322]';
    $motionCss = '@keyframes karya-fall{from{translate:0 -420px;transform:rotate(-28deg);opacity:0}30%{opacity:1}}@media (prefers-reduced-motion:no-preference){[data-motion=on] [data-reveal]{transition:opacity .7s cubic-bezier(.2,.7,.2,1),translate .7s cubic-bezier(.2,.7,.2,1)}[data-motion=on] [data-reveal]:not([data-shown]){opacity:0;translate:0 24px}[data-motion=on] [data-pile]:not([data-shown]) [data-pill]{opacity:0}[data-motion=on] [data-pile][data-shown] [data-pill]{animation:karya-fall .9s cubic-bezier(.3,1.25,.55,1) var(--d) backwards}}';
    $root = 'min-h-dvh overflow-x-clip bg-(--tpl-bg) text-ink [scroll-behavior:smooth] motion-reduce:[scroll-behavior:auto]';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $headerWrap = 'sticky top-4 z-40 flex justify-center px-4';
    $navPill = 'relative flex items-center gap-1 rounded-full border border-line bg-surface p-1.5 shadow-overlay';
    $monogram = 'inline-flex size-9 items-center justify-center rounded-full bg-(--tpl-night) font-serif text-lg text-(--tpl-on-night) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $navList = 'hidden items-center sm:flex';
    $navLink = 'inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $navIdle = 'text-muted hover:bg-subtle hover:text-ink';
    $navOn = 'bg-subtle text-ink';
    $navDot = 'size-1.5 rounded-full bg-primary';
    $mailButton = 'inline-flex size-9 items-center justify-center rounded-full bg-(--tpl-sun) text-(--tpl-ink) transition-transform duration-150 ease-out hover:-rotate-12 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuButton = 'inline-flex size-9 items-center justify-center rounded-full text-ink hover:bg-subtle sm:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuPanel = 'absolute inset-x-0 top-full mt-2 grid gap-1 rounded-3xl border border-line bg-surface p-2 shadow-overlay sm:hidden';
    $menuLink = 'flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-medium text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $hero = 'grid scroll-mt-24 justify-items-center px-4 pt-16 text-center md:pt-24';
    $hello = 'flex items-center gap-2.5 text-lg font-medium md:text-xl';
    $helloAvatar = 'inline-flex size-9 -rotate-6 items-center justify-center rounded-full bg-(--tpl-pink) text-xs font-semibold text-(--tpl-ink) ring-4 ring-surface';
    $heroTitle = 'mt-6 max-w-5xl font-serif text-5xl leading-[1.02] font-normal tracking-tight text-balance md:text-7xl lg:text-[5.75rem]';
    $heroLine = 'md:block';
    $lead = 'mt-6 max-w-xl text-base text-pretty text-muted md:text-lg';
    $strong = 'font-semibold text-ink';
    $pile = 'relative mt-8 h-64 w-full max-w-6xl touch-pan-y md:mt-6 md:h-80';
    $pillBase = 'absolute inline-flex cursor-grab touch-none items-center rounded-full border-2 border-(--tpl-ink) px-4 py-2.5 font-mono text-xs font-semibold tracking-wide whitespace-nowrap text-(--tpl-ink) uppercase shadow-[0_4px_0_var(--tpl-ink)] select-none active:cursor-grabbing md:px-8 md:py-4 md:text-base';
    $dotBase = 'absolute inline-flex size-11 cursor-grab touch-none items-center justify-center rounded-full border-2 border-(--tpl-ink) text-(--tpl-ink) shadow-[0_4px_0_var(--tpl-ink)] select-none active:cursor-grabbing md:size-14';
    $pileFront = 'z-20';
    $pileBack = 'z-10';
    $tidyButton = 'absolute top-0 right-4 z-30 inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-xs font-medium text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $wrap = 'mx-auto max-w-6xl px-4 md:px-6';
    $section = 'scroll-mt-24 py-20 md:py-28';
    $sectionHead = 'flex flex-wrap items-end justify-between gap-4';
    $h2 = 'font-serif text-4xl font-normal tracking-tight md:text-6xl';
    $sideNote = 'font-mono text-xs tracking-wide text-muted uppercase';
    $caseGrid = 'mt-12 grid gap-6 md:grid-cols-2';
    $caseCard = 'group relative grid gap-5 rounded-[2rem] p-4 text-(--tpl-ink) transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none md:p-5';
    $caseShot = 'relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-(--tpl-ink) bg-(--tpl-paper)';
    $caseFoot = 'flex items-start justify-between gap-4 px-2 pb-2';
    $caseTitle = 'font-serif text-3xl font-normal tracking-tight';
    $caseLead = 'mt-1 max-w-sm text-sm text-(--tpl-ink)/80';
    $tagList = 'mt-3 flex flex-wrap gap-1.5';
    $tag = 'rounded-full border border-(--tpl-ink)/30 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide uppercase';
    $caseOpen = 'inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-(--tpl-ink) text-(--tpl-paper) transition-transform duration-200 ease-out group-hover:rotate-45 after:absolute after:inset-0 after:rounded-[2rem] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $mockBar = 'h-2 rounded-full';
    $playGrid = 'mt-12 grid gap-6 md:grid-cols-3';
    $playCard = 'grid content-start gap-5 rounded-[2rem] bg-surface p-5';
    $playStage = 'grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl';
    $playTitle = 'text-lg font-semibold';
    $small = 'text-sm text-muted';
    $aboutGrid = 'mt-12 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]';
    $portrait = 'relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-(--tpl-ink) bg-(--tpl-sun)';
    $bio = 'grid gap-5 text-lg text-pretty text-muted';
    $timeline = 'mt-10 grid scroll-mt-28 gap-0 border-l-2 border-line';
    $timelineItem = 'relative grid gap-1 pb-8 pl-7 last:pb-0';
    $timelineDot = 'absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-surface';
    $timelineYears = 'font-mono text-xs tracking-wide text-muted uppercase';
    $timelineRole = 'text-lg font-semibold text-ink';
    $contactCard = 'grid gap-10 rounded-[2.5rem] bg-(--tpl-night) p-6 text-(--tpl-on-night) md:p-12 lg:grid-cols-[1fr_1.1fr]';
    $contactTitle = 'font-serif text-4xl leading-[1.05] font-normal tracking-tight text-balance md:text-6xl';
    $contactLead = 'mt-5 max-w-md text-base text-(--tpl-on-night)/80';
    $mailLink = 'mt-8 inline-flex items-center gap-2 rounded-full bg-(--tpl-sun) px-5 py-3 text-sm font-semibold text-(--tpl-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $form = 'grid gap-5 rounded-3xl bg-surface p-6 text-ink md:p-8';
    $field = 'grid gap-1.5';
    $errorText = 'text-sm text-danger';
    $footer = 'mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-10 text-sm text-muted md:px-6';
    $footerNav = 'flex flex-wrap gap-4';
    $quietLink = 'rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $caseBody = 'grid gap-4';
    $caseMeta = 'grid grid-cols-3 gap-3 text-sm';
    $caseLabel = 'text-xs text-muted';
    $caseValue = 'font-medium text-ink';
    $caseSteps = 'grid list-decimal gap-1 pl-5';
    $caseStats = 'grid grid-cols-3 gap-3';
    $caseStat = 'grid gap-0.5 rounded-xl border border-line p-3';
    $caseNumber = 'text-xl font-semibold text-ink';
    $srOnly = 'sr-only';
    $icons = ['mail' => 'M4 6h16v12H4zM4 7l8 6 8-6', 'file' => 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5', 'menu' => 'M4 7h16M4 12h16M4 17h16', 'close' => 'M18 6 6 18M6 6l12 12', 'arrow' => 'M7 17 17 7M8 7h9v9', 'star' => 'M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z', 'smile' => 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01', 'bolt' => 'M13 2 4 14h7l-1 8 9-12h-7z', 'heart' => 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z', 'reset' => 'M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4'];
    $nav = [['id' => 'work', 'label' => 'Work'], ['id' => 'playground', 'label' => 'Playground'], ['id' => 'about', 'label' => 'About'], ['id' => 'cv', 'label' => 'CV', 'icon' => 'file']];
    $sectionIds = ['home', 'work', 'playground', 'about', 'cv', 'contact'];
    $pills = [['id' => 'corners', 'label' => 'Rounding corners', 'className' => 'bottom-2 left-[2%] -rotate-6 bg-(--tpl-sun) [--d:0ms]'], ['id' => 'pop', 'label' => 'Making it pop', 'className' => 'bottom-20 left-[16%] rotate-12 bg-(--tpl-pink) [--d:120ms]'], ['id' => 'systems', 'label' => 'Thinking systems', 'className' => 'bottom-0 left-[32%] -rotate-2 bg-(--tpl-sky) [--d:240ms]'], ['id' => 'rectangles', 'label' => 'Moving rectangles', 'className' => 'bottom-16 left-[47%] -rotate-12 bg-(--tpl-mint) [--d:360ms]'], ['id' => 'prototyping', 'label' => 'Prototyping', 'className' => 'bottom-2 left-[64%] rotate-6 bg-(--tpl-orange) [--d:480ms]'], ['id' => 'reframing', 'label' => 'Reframing problems', 'className' => 'bottom-40 left-[7%] rotate-3 bg-(--tpl-lilac) [--d:600ms]'], ['id' => 'testing', 'label' => 'Testing', 'className' => 'bottom-32 left-[70%] -rotate-6 bg-(--tpl-night) text-(--tpl-on-night) [--d:720ms]']];
    $stickers = [['id' => 'smile', 'icon' => 'smile', 'className' => 'bottom-32 left-[31%] rotate-12 bg-(--tpl-sun) [--d:180ms]'], ['id' => 'star', 'icon' => 'star', 'className' => 'bottom-20 left-[85%] -rotate-12 bg-(--tpl-pink) [--d:420ms]'], ['id' => 'bolt', 'icon' => 'bolt', 'className' => 'bottom-40 left-[52%] rotate-6 bg-(--tpl-sky) [--d:540ms]'], ['id' => 'heart', 'icon' => 'heart', 'className' => 'bottom-1 left-[88%] -rotate-6 bg-(--tpl-mint) [--d:660ms]']];
    $DRAG_LIMIT_X = 640;
    $DRAG_LIMIT_TOP = -480;
    $DRAG_LIMIT_BOTTOM = 40;
    $cases = [['id' => 'ledger', 'name' => 'Ledger', 'lead' => 'Month end close for finance teams that live in spreadsheets.', 'tone' => 'bg-(--tpl-sun) hover:-rotate-1', 'tags' => ['B2B', 'Fintech', '2025'], 'role' => 'Lead product designer', 'timeline' => '7 months', 'team' => '2 designers, 8 engineers', 'problem' => 'Finance teams reconciled 4,000 transactions a month by hand. Every close took nine days and ended in a late night of copy and paste.', 'steps' => ['Sat with five finance teams in Jakarta during their close week.', 'Turned 23 manual checks into one review queue with clear owners.', 'Shipped bulk matching with an undo that people actually trust.'], 'stats' => [['4 days', 'faster month end'], ['71%', 'auto matched'], ['Rp1,8 M', 'saved per team monthly']]], ['id' => 'muat', 'name' => 'Muat', 'lead' => 'Dispatch board for trucking fleets moving goods across Java.', 'tone' => 'bg-(--tpl-sky) hover:rotate-1', 'tags' => ['B2B', 'Logistics', '2024'], 'role' => 'Senior product designer', 'timeline' => '6 months', 'team' => '3 designers, 11 engineers', 'problem' => 'Dispatchers juggled WhatsApp groups and paper manifests, so a single late truck could quietly break a whole day of deliveries.', 'steps' => ['Rode along on three night routes from Cikarang to Semarang.', 'Designed a board where every card shows its delay risk first.', 'Tested drag to reassign with dispatchers until it felt like paper.'], 'stats' => [['32%', 'fewer late drops'], ['1,200', 'trucks per day'], ['2 min', 'to reassign a load']]], ['id' => 'tenun', 'name' => 'Tenun', 'lead' => 'A design system that keeps six product teams speaking one language.', 'tone' => 'bg-(--tpl-pink) hover:rotate-1', 'tags' => ['Design system', 'Tokens', '2023'], 'role' => 'Design system lead', 'timeline' => '12 months', 'team' => '4 designers, 6 engineers', 'problem' => 'Six squads had built nine different date pickers. Small changes took weeks because nobody knew which version was the real one.', 'steps' => ['Audited 340 screens and grouped every pattern by intent.', 'Defined tokens first, then rebuilt 48 components on top of them.', 'Ran weekly office hours so adoption felt like help, not policy.'], 'stats' => [['48', 'shared components'], ['90%', 'screens migrated'], ['3x', 'faster UI reviews']]], ['id' => 'sehat', 'name' => 'Sehat', 'lead' => 'Scheduling for clinics where every minute of a doctor matters.', 'tone' => 'bg-(--tpl-mint) hover:-rotate-1', 'tags' => ['B2B', 'Health', '2022'], 'role' => 'Product designer', 'timeline' => '5 months', 'team' => '1 designer, 5 engineers', 'problem' => 'Front desk staff booked patients across three tools, which led to double bookings and long waits in clinics around Surabaya.', 'steps' => ['Shadowed front desks in four clinics for a full week.', 'Merged booking, queue, and reminders into one week view.', 'Added a calm overbooking warning instead of a hard block.'], 'stats' => [['45%', 'fewer double bookings'], ['18 min', 'shorter waits'], ['62', 'clinics onboard']]]];
    $ledgerBars = ['h-[40%]', 'h-[62%]', 'h-[48%]', 'h-[80%]', 'h-[56%]', 'h-[92%]', 'h-[70%]'];
    $muatColumns = [['Loading', 3], ['On the road', 2], ['Delivered', 2]];
    $tenunSwatches = ['bg-(--tpl-sun)', 'bg-(--tpl-pink)', 'bg-(--tpl-sky)', 'bg-(--tpl-mint)', 'bg-(--tpl-lilac)'];
    $sehatSlots = ['col-start-1 row-start-1 row-span-2 bg-(--tpl-sky)', 'col-start-2 row-start-2 row-span-2 bg-(--tpl-pink)', 'col-start-3 row-start-1 bg-(--tpl-sun)', 'col-start-4 row-start-3 row-span-2 bg-(--tpl-lilac)', 'col-start-5 row-start-2 bg-(--tpl-orange)', 'col-start-3 row-start-4 bg-(--tpl-mint)'];
    $ledgerTiles = [['Matched', '3.412'], ['Review', '148'], ['Open', '22']];
    $weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    $RADIUS_DEFAULT = 16;
    $TINT_DEFAULT = 60;
    $about = ['I am Rania Putri, a product designer based in Yogyakarta. For eight years I have worked on tools people use all day at work: finance back offices, dispatch rooms, and clinic front desks.', 'I like the unglamorous parts. Edge cases, empty states, the forty fields nobody wants to talk about. That is usually where a product starts to feel simple.'];
    $experience = [['years' => '2024 to now', 'role' => 'Lead product designer', 'company' => 'Arunika', 'detail' => 'Payroll and finance tools for 900 companies.'], ['years' => '2021 to 2024', 'role' => 'Senior product designer', 'company' => 'Muatan Logistik', 'detail' => 'Dispatch, fleet, and driver apps across Java.'], ['years' => '2019 to 2021', 'role' => 'Product designer', 'company' => 'Klinikita', 'detail' => 'Booking and queue software for private clinics.'], ['years' => '2017 to 2019', 'role' => 'UI designer', 'company' => 'Studio Lokal', 'detail' => 'Websites and brands for small Indonesian businesses.']];
    $footerLinks = [['label' => 'Work', 'href' => '#work'], ['label' => 'Playground', 'href' => '#playground'], ['label' => 'CV', 'href' => '#cv'], ['label' => 'Back to top', 'href' => '#home']];
    $CASE_ID = 'karya-case';
    $EMAIL = 'hello@rania.design';
    $MIN_MESSAGE = 10;
    $EMPTY_FORM = ['name' => '', 'email' => '', 'message' => ''];

    $cx = fn (...$c) => implode(' ', array_filter($c));
    $icon = fn (string $name, string $class) => new HtmlString('<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>');
    $popBase = 'rounded-full border-2 border-(--tpl-ink) bg-(--tpl-orange) px-6 py-3 font-mono text-sm font-semibold text-(--tpl-ink) uppercase transition-transform duration-300 ease-out motion-reduce:transition-none';
    $popOn = 'scale-110 -rotate-6 shadow-[0_8px_0_var(--tpl-ink)]';
    $popOff = 'shadow-[0_2px_0_var(--tpl-ink)]';
    $caseData = array_map(fn ($c) => array_intersect_key($c, array_flip(['id', 'name', 'role', 'timeline', 'team', 'problem', 'steps', 'stats'])), $cases);
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  class="{{ $cx($root, $palette) }}"
  x-data="{
    active: 'home',
    menuOpen: false,
    offsets: {},
    front: '',
    drag: null,
    radius: {{ $RADIUS_DEFAULT }},
    tint: {{ $TINT_DEFAULT }},
    pop: false,
    caseId: @js($cases[0]['id']),
    ids: @js($sectionIds),
    cases: @js($caseData),
    values: { name: '', email: '', message: '' },
    errors: {},
    get current() { return this.cases.find((item) => item.id === this.caseId); },
    readHash() { const id = window.location.hash.slice(1); return this.ids.includes(id) ? id : 'home'; },
    {{-- Elemen data-reveal dan tumpukan stiker muncul saat masuk layar; dilewati saat reduced motion. --}}
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
      element.querySelectorAll('[data-reveal],[data-pile]').forEach((item) => observer.observe(item));
    },
    clamp(value, min, max) { return Math.min(max, Math.max(min, value)); },
    startDrag(id, event) {
      event.currentTarget.setPointerCapture(event.pointerId);
      const [ox, oy] = this.offsets[id] ?? [0, 0];
      this.drag = { id, x: event.clientX, y: event.clientY, ox, oy };
      this.front = id;
    },
    moveDrag(event) {
      const state = this.drag;
      if (!state) return;
      const x = this.clamp(state.ox + event.clientX - state.x, -{{ $DRAG_LIMIT_X }}, {{ $DRAG_LIMIT_X }});
      const y = this.clamp(state.oy + event.clientY - state.y, {{ $DRAG_LIMIT_TOP }}, {{ $DRAG_LIMIT_BOTTOM }});
      this.offsets = { ...this.offsets, [state.id]: [x, y] };
    },
    placed(id) { const offset = this.offsets[id]; return offset ? 'translate: ' + offset[0] + 'px ' + offset[1] + 'px' : ''; },
    tidy() { this.offsets = {}; this.front = ''; },
    openCase(id) {
      this.caseId = id;
      const dialog = document.getElementById(@js($CASE_ID));
      if (dialog instanceof HTMLDialogElement && !dialog.open) dialog.showModal();
    },
    nextCase() {
      const index = this.cases.findIndex((item) => item.id === this.caseId);
      this.caseId = this.cases[(index + 1) % this.cases.length].id;
    },
    submit() {
      const values = this.values;
      const errors = {};
      if (!values.name.trim()) errors.name = 'Tell me your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address, like you@company.com.';
      if (values.message.trim().length < {{ $MIN_MESSAGE }}) errors.message = 'Write at least 10 characters about your project.';
      this.errors = errors;
      if (Object.keys(errors).length) return;
      const first = values.name.trim().split(/\s+/)[0];
      this.$dispatch('markas-toast', { title: 'Message sent', description: 'Thanks ' + first + ', I will reply to ' + values.email.trim() + ' within two days.', variant: 'success' });
      this.values = { name: '', email: '', message: '' };
    },
  }"
  x-init="active = readHash(); startReveal($el)"
  x-on:hashchange.window="active = readHash()"
>
  <style>{!! $motionCss !!}</style>
  <header class="{{ $headerWrap }}">
    <div class="{{ $navPill }}">
      <a href="#home" class="{{ $monogram }}" aria-label="Rania Putri, home">R</a>
      <nav aria-label="Main" class="{{ $navList }}">
        @foreach ($nav as $item)
          <a href="#{{ $item['id'] }}" class="{{ $navLink }}" :class="active === @js($item['id']) ? @js($navOn) : @js($navIdle)" :aria-current="active === @js($item['id']) ? 'location' : null"><template x-if="active === @js($item['id'])"><span class="{{ $navDot }}"></span></template>{{ $item['label'] }}@isset($item['icon']){{ $icon($item['icon'], 'size-4') }}@endisset</a>
        @endforeach
      </nav>
      <button type="button" class="{{ $menuButton }}" aria-controls="karya-menu" :aria-expanded="menuOpen ? 'true' : 'false'" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" x-on:click="menuOpen = !menuOpen"><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="menuOpen ? @js($icons['close']) : @js($icons['menu'])" d="{{ $icons['menu'] }}" /></svg></button>
      <a href="#contact" class="{{ $mailButton }}" aria-label="Contact">{{ $icon('mail', 'size-4') }}</a>
      <template x-if="menuOpen">
        <nav id="karya-menu" aria-label="Mobile" class="{{ $menuPanel }}" x-on:keydown.escape="menuOpen = false">
          @foreach ($nav as $item)
            <a href="#{{ $item['id'] }}" class="{{ $menuLink }}" :aria-current="active === @js($item['id']) ? 'location' : null" x-on:click="menuOpen = false">{{ $item['label'] }}@isset($item['icon']){{ $icon($item['icon'], 'size-4') }}@endisset</a>
          @endforeach
        </nav>
      </template>
    </div>
  </header>

  <main>
    <section id="home" aria-labelledby="karya-title" class="{{ $hero }}">
      <p class="{{ $hello }}">Hello<span class="{{ $helloAvatar }}" aria-hidden="true">RP</span>I'm Rania</p>
      <h1 id="karya-title" class="{{ $heroTitle }}"><span class="{{ $heroLine }}">I design products that </span><span class="{{ $heroLine }}"><em>feel</em> simple, even </span><span class="{{ $heroLine }}">when they're not.</span></h1>
      <p class="{{ $lead }}">Product designer in Yogyakarta. Eight years of untangling <strong class="{{ $strong }}">complex B2B workflows</strong> and building the <strong class="{{ $strong }}">design system</strong> that keeps them consistent.</p>
      <div class="{{ $pile }}" data-pile="">
        <button type="button" class="{{ $tidyButton }}" x-on:click="tidy()">{{ $icon('reset', 'size-3.5') }}Tidy up</button>
        <ul aria-label="Things I do">
          @foreach ($pills as $item)
            <li data-pill="{{ $item['id'] }}" class="{{ $cx($pillBase, $item['className']) }}" :class="front === @js($item['id']) ? @js($pileFront) : @js($pileBack)" :style="placed(@js($item['id']))" x-on:pointerdown="startDrag(@js($item['id']), $event)" x-on:pointermove="moveDrag($event)" x-on:pointerup="drag = null" x-on:pointercancel="drag = null">{{ $item['label'] }}</li>
          @endforeach
          @foreach ($stickers as $item)
            <li data-pill="{{ $item['id'] }}" class="{{ $cx($dotBase, $item['className']) }}" :class="front === @js($item['id']) ? @js($pileFront) : @js($pileBack)" :style="placed(@js($item['id']))" x-on:pointerdown="startDrag(@js($item['id']), $event)" x-on:pointermove="moveDrag($event)" x-on:pointerup="drag = null" x-on:pointercancel="drag = null">{{ $icon($item['icon'], 'size-5 md:size-6') }}<span class="{{ $srOnly }}">{{ $item['id'] }}</span></li>
          @endforeach
        </ul>
      </div>
    </section>

    <section id="work" aria-labelledby="karya-work-title" class="{{ $cx($wrap, $section) }}">
      <div class="{{ $sectionHead }}" data-reveal="">
        <h2 id="karya-work-title" class="{{ $h2 }}">Selected work</h2>
        <p class="{{ $sideNote }}">Case studies, 2022 to 2025</p>
      </div>
      <ul class="{{ $caseGrid }}" data-reveal="">
        @foreach ($cases as $item)
          <li class="{{ $cx($caseCard, $item['tone']) }}">
            <div class="{{ $caseShot }}">
              @if ($item['id'] === 'ledger')
                <div class="absolute inset-0 grid grid-cols-[3rem_1fr]" aria-hidden="true">
                  <div class="grid content-start gap-2 border-r-2 border-(--tpl-ink)/10 bg-(--tpl-ink)/5 p-3"><span class="size-6 rounded-lg bg-(--tpl-ink)"></span><span class="size-6 rounded-lg bg-(--tpl-ink)/15"></span><span class="size-6 rounded-lg bg-(--tpl-ink)/15"></span><span class="size-6 rounded-lg bg-(--tpl-ink)/15"></span></div>
                  <div class="grid content-start gap-3 p-4">
                    <div class="flex items-center justify-between"><p class="text-xs font-semibold">March close</p><span class="rounded-full bg-(--tpl-sun) px-2 py-0.5 text-[10px] font-semibold">Day 3 of 5</span></div>
                    <div class="grid grid-cols-3 gap-2">
                      @foreach ($ledgerTiles as [$label, $value])
                        <div class="rounded-xl border-2 border-(--tpl-ink)/10 p-2"><p class="text-[10px] text-(--tpl-ink)/70">{{ $label }}</p><p class="text-sm font-semibold">{{ $value }}</p></div>
                      @endforeach
                    </div>
                    <div class="flex h-32 items-end gap-2 rounded-xl border-2 border-(--tpl-ink)/10 p-2 md:h-40">
                      @foreach ($ledgerBars as $index => $height)
                        <span class="{{ $cx('flex-1 rounded-md', $height, $index === 5 ? 'bg-(--tpl-ink)' : 'bg-(--tpl-sun)') }}"></span>
                      @endforeach
                    </div>
                  </div>
                </div>
              @elseif ($item['id'] === 'muat')
                <div class="absolute inset-0 grid gap-3 p-4" aria-hidden="true">
                  <div class="flex items-center justify-between"><p class="text-xs font-semibold">Dispatch, Cikarang hub</p><span class="rounded-full bg-(--tpl-ink) px-2 py-0.5 text-[10px] font-semibold text-(--tpl-paper)">42 trucks</span></div>
                  <div class="grid grid-cols-3 gap-2">
                    @foreach ($muatColumns as [$label, $count])
                      <div class="grid content-start gap-2 rounded-xl bg-(--tpl-ink)/5 p-2">
                        <p class="text-[10px] font-semibold">{{ $label }}</p>
                        @for ($i = 0; $i < $count; $i++)
                          <div class="grid gap-1.5 rounded-lg border-2 border-(--tpl-ink)/10 bg-(--tpl-paper) p-2"><span class="{{ $cx($mockBar, 'w-4/5 bg-(--tpl-ink)/20') }}"></span><span class="{{ $cx($mockBar, 'w-1/3', $i === 0 && $label === 'On the road' ? 'bg-(--tpl-orange)' : 'bg-(--tpl-sky)') }}"></span></div>
                        @endfor
                      </div>
                    @endforeach
                  </div>
                </div>
              @elseif ($item['id'] === 'tenun')
                <div class="absolute inset-0 grid content-center gap-4 p-5" aria-hidden="true">
                  <div class="flex gap-2">
                    @foreach ($tenunSwatches as $tone)
                      <span class="{{ $cx('h-10 flex-1 rounded-xl border-2 border-(--tpl-ink)', $tone) }}"></span>
                    @endforeach
                  </div>
                  <div class="flex flex-wrap items-center gap-2"><span class="rounded-full bg-(--tpl-ink) px-4 py-2 text-xs font-semibold text-(--tpl-paper)">Primary</span><span class="rounded-full border-2 border-(--tpl-ink) px-4 py-1.5 text-xs font-semibold">Secondary</span><span class="flex h-6 w-11 items-center justify-end rounded-full bg-(--tpl-ink) p-1"><span class="size-4 rounded-full bg-(--tpl-pink)"></span></span></div>
                  <div class="flex items-end justify-between border-t-2 border-(--tpl-ink)/10 pt-3"><span class="font-serif text-5xl leading-none">Aa</span><span class="font-mono text-[10px] font-semibold">48 COMPONENTS</span></div>
                </div>
              @else
                <div class="absolute inset-0 grid gap-2 p-4" aria-hidden="true">
                  <div class="grid grid-cols-5 gap-2 text-center text-[10px] font-semibold">
                    @foreach ($weekDays as $day)
                      <span>{{ $day }}</span>
                    @endforeach
                  </div>
                  <div class="grid grid-cols-5 grid-rows-4 gap-2 rounded-xl bg-(--tpl-ink)/5 p-2">
                    @foreach ($sehatSlots as $slot)
                      <span class="{{ $cx('rounded-lg border-2 border-(--tpl-ink)', $slot) }}"></span>
                    @endforeach
                  </div>
                </div>
              @endif
            </div>
            <div class="{{ $caseFoot }}">
              <div>
                <h3 class="{{ $caseTitle }}">{{ $item['name'] }}</h3>
                <p class="{{ $caseLead }}">{{ $item['lead'] }}</p>
                <ul class="{{ $tagList }}" aria-label="Tags">
                  @foreach ($item['tags'] as $text)
                    <li class="{{ $tag }}">{{ $text }}</li>
                  @endforeach
                </ul>
              </div>
              <button type="button" class="{{ $caseOpen }}" aria-label="Open case study: {{ $item['name'] }}" x-on:click="openCase(@js($item['id']))">{{ $icon('arrow', 'size-5') }}</button>
            </div>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="playground" aria-labelledby="karya-play-title" class="{{ $cx($wrap, $section) }}">
      <div class="{{ $sectionHead }}" data-reveal="">
        <h2 id="karya-play-title" class="{{ $h2 }}">Playground</h2>
        <p class="{{ $sideNote }}">Small experiments, try them</p>
      </div>
      <ul class="{{ $playGrid }}" data-reveal="">
        <li class="{{ $playCard }}">
          <div class="{{ $cx($playStage, 'bg-(--tpl-lilac)') }}" aria-hidden="true"><div data-radius="" class="size-28 border-2 border-(--tpl-ink) bg-(--tpl-sun)" style="border-radius: {{ $RADIUS_DEFAULT }}px" :style="{ borderRadius: radius + 'px' }"></div></div>
          <div><h3 class="{{ $playTitle }}">Rounding corners</h3><p class="{{ $small }}">The oldest debate in the studio, now with a slider.</p></div>
          <x-markas.slider id="karya-radius" label="Corner radius" :min="0" :max="56" :value="$RADIUS_DEFAULT" x-model.number="radius" />
        </li>
        <li class="{{ $playCard }}">
          <div class="{{ $cx($playStage, 'bg-subtle') }}" aria-hidden="true"><div data-tint="" class="size-28 rounded-3xl border-2 border-line" style="background-color: color-mix(in oklab, var(--color-primary) {{ $TINT_DEFAULT }}%, var(--color-surface))" :style="{ backgroundColor: 'color-mix(in oklab, var(--color-primary) ' + tint + '%, var(--color-surface))' }"></div></div>
          <div><h3 class="{{ $playTitle }}">Token tint</h3><p class="{{ $small }}">Mixes the primary token into the surface, like a real theme would.</p></div>
          <x-markas.slider id="karya-tint" label="Primary mix" :min="10" :max="100" :step="10" :value="$TINT_DEFAULT" x-model.number="tint" />
        </li>
        <li class="{{ $playCard }}">
          <div class="{{ $cx($playStage, 'bg-(--tpl-mint)') }}" aria-hidden="true"><span data-pop="off" :data-pop="pop ? 'on' : 'off'" class="{{ $popBase }}" :class="pop ? @js($popOn) : @js($popOff)">Ship it</span></div>
          <div><h3 class="{{ $playTitle }}">Making it pop</h3><p class="{{ $small }}">What every client asks for, in one honest switch.</p></div>
          <x-markas.switch id="karya-pop" label="Make it pop" x-model="pop" />
        </li>
      </ul>
    </section>

    <section id="about" aria-labelledby="karya-about-title" class="{{ $cx($wrap, $section) }}">
      <h2 id="karya-about-title" class="{{ $h2 }}" data-reveal="">About</h2>
      <div class="{{ $aboutGrid }}">
        <div class="{{ $portrait }}" role="img" aria-label="Illustrated portrait of Rania" data-reveal="">
          <span class="absolute -bottom-16 left-1/2 h-56 w-64 -translate-x-1/2 rounded-t-full border-2 border-(--tpl-ink) bg-(--tpl-orange)"></span>
          <span class="absolute top-[18%] left-1/2 flex size-40 -translate-x-1/2 items-center justify-center rounded-full border-2 border-(--tpl-ink) bg-(--tpl-pink) font-serif text-5xl text-(--tpl-ink)">RP</span>
          <span class="absolute top-8 right-8 size-10 rotate-12 rounded-xl border-2 border-(--tpl-ink) bg-(--tpl-sky)"></span>
          <span class="absolute top-1/2 left-6 size-8 rounded-full border-2 border-(--tpl-ink) bg-(--tpl-mint)"></span>
        </div>
        <div data-reveal="">
          <div class="{{ $bio }}">
            @foreach ($about as $text)
              <p>{{ $text }}</p>
            @endforeach
          </div>
          <ol id="cv" class="{{ $timeline }}" aria-label="Experience">
            @foreach ($experience as $index => $item)
              <li class="{{ $timelineItem }}"><span class="{{ $cx($timelineDot, $index === 0 ? 'bg-primary' : 'bg-faint') }}" aria-hidden="true"></span><p class="{{ $timelineYears }}">{{ $item['years'] }}</p><p class="{{ $timelineRole }}">{{ $item['role'] }}, {{ $item['company'] }}</p><p class="{{ $small }}">{{ $item['detail'] }}</p></li>
            @endforeach
          </ol>
        </div>
      </div>
    </section>

    <section id="contact" aria-labelledby="karya-contact-title" class="{{ $cx($wrap, $section) }}">
      <div class="{{ $contactCard }}" data-reveal="">
        <div>
          <h2 id="karya-contact-title" class="{{ $contactTitle }}">Got a messy workflow? Let's make it <em>feel</em> simple.</h2>
          <p class="{{ $contactLead }}">Tell me what your team is wrestling with. I reply to every message within two working days.</p>
          <a href="mailto:{{ $EMAIL }}" class="{{ $mailLink }}">{{ $icon('mail', 'size-4') }}{{ $EMAIL }}</a>
        </div>
        <form class="{{ $form }}" novalidate aria-label="Contact form" x-on:submit.prevent="submit()">
          <div class="{{ $field }}">
            <x-markas.input id="karya-name" label="Name" name="name" autocomplete="name" placeholder="Andi Pratama" x-model="values.name" x-bind:aria-invalid="errors.name ? 'true' : null" x-bind:aria-describedby="errors.name ? 'karya-name-error' : null" />
            <template x-if="errors.name"><p id="karya-name-error" class="{{ $errorText }}" x-text="errors.name"></p></template>
          </div>
          <div class="{{ $field }}">
            <x-markas.input id="karya-email" label="Email" type="email" name="email" autocomplete="email" placeholder="you@company.com" x-model="values.email" x-bind:aria-invalid="errors.email ? 'true' : null" x-bind:aria-describedby="errors.email ? 'karya-email-error' : null" />
            <template x-if="errors.email"><p id="karya-email-error" class="{{ $errorText }}" x-text="errors.email"></p></template>
          </div>
          <div class="{{ $field }}">
            <x-markas.textarea id="karya-message" label="Project details" name="message" :rows="4" placeholder="What is your team building, and what feels hard?" x-model="values.message" x-bind:aria-invalid="errors.message ? 'true' : null" x-bind:aria-describedby="errors.message ? 'karya-message-error' : null" />
            <template x-if="errors.message"><p id="karya-message-error" class="{{ $errorText }}" x-text="errors.message"></p></template>
          </div>
          <x-markas.button type="submit" size="lg">Send message</x-markas.button>
        </form>
      </div>
    </section>
  </main>

  <footer class="{{ $footer }}">
    <p>&copy; 2026 Rania Putri. Built with MarkasUI.</p>
    <nav aria-label="Footer" class="{{ $footerNav }}">
      @foreach ($footerLinks as $link)
        <a href="{{ $link['href'] }}" class="{{ $quietLink }}">{{ $link['label'] }}</a>
      @endforeach
    </nav>
  </footer>

  <x-markas.modal :id="$CASE_ID">
    <x-slot:title><span x-text="current.name">{{ $cases[0]['name'] }}</span></x-slot:title>
    <div class="{{ $caseBody }}">
      <dl class="{{ $caseMeta }}">
        <div><dt class="{{ $caseLabel }}">Role</dt><dd class="{{ $caseValue }}" x-text="current.role"></dd></div>
        <div><dt class="{{ $caseLabel }}">Timeline</dt><dd class="{{ $caseValue }}" x-text="current.timeline"></dd></div>
        <div><dt class="{{ $caseLabel }}">Team</dt><dd class="{{ $caseValue }}" x-text="current.team"></dd></div>
      </dl>
      <p x-text="current.problem"></p>
      <ol class="{{ $caseSteps }}"><template x-for="step in current.steps" :key="step"><li x-text="step"></li></template></ol>
      <div class="{{ $caseStats }}"><template x-for="stat in current.stats" :key="stat[1]"><p class="{{ $caseStat }}"><span class="{{ $caseNumber }}" x-text="stat[0]"></span><span class="{{ $caseLabel }}" x-text="stat[1]"></span></p></template></div>
    </div>
    <x-slot:footer>
      <x-markas.button variant="secondary" type="submit">Done</x-markas.button>
      <x-markas.button x-on:click="nextCase()">Next project</x-markas.button>
    </x-slot:footer>
  </x-markas.modal>
  <x-markas.toast />
</div>
@php echo preg_replace('/>\s+</', '><', ob_get_clean()); @endphp
