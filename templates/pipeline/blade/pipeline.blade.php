@php
    use Illuminate\Support\HtmlString;

    // Data contoh dan kelas warna dibagi dengan Alpine lewat satu blok JSON.
    $data = json_decode(<<<'JSON'
    {
    "icons": {"grid":"M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z","users":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75","board":"M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z","calendar":"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2","chat":"M7.9 20A9 9 0 1 0 4 16.1L2 22z","settings":"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1","bell":"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0","plus":"M12 5v14M5 12h14","search":"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3","filter":"M3 6h18M7 12h10M10 18h4","flame":"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.2.3 1.6 1.3 2.7 2.5 2.7","arrow":"M7 17 17 7M7 7h10v10","video":"M15 10l5-3v10l-5-3M4 6h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2","mic":"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3M19 10v2a7 7 0 0 1-14 0v-2M12 19v3","speaker":"M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14","end":"M10.7 13.3a16 16 0 0 0 3.4 2.6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 4.2 2 2 0 0 1 5.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.4 2.1L9.1 9.9M22 2 2 22","file":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5","mail":"M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M22 6l-10 7L2 6","check":"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M8.5 12l2.5 2.5 4.5-5","clock":"M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20","menu":"M4 6h16M4 12h16M4 18h16","send":"m22 2-7 20-4-9-9-4zM22 2 11 13","next":"m9 18 6-6-6-6"},
    "pages": {"workspace":{"label":"Workspace","title":"Workspace","icon":"grid"},"leads":{"label":"Leads","title":"Leads","icon":"users"},"pipeline":{"label":"Pipeline","title":"Pipeline","icon":"board"},"calendar":{"label":"Calendar","title":"Calendar","icon":"calendar"},"messages":{"label":"Messages","title":"Messages","icon":"chat"}},
    "pageIds": ["workspace","leads","pipeline","calendar","messages"],
    "stats": [{"value":"34","unit":"Deals","badge":"+6","tone":"lime"},{"value":"20","unit":"won","badge":"59%","tone":"lime"},{"value":"3","unit":"lost","badge":"-2","tone":"rose"}],
    "hourMarks": ["12 pm","1 pm","2 pm","3 pm","4 pm","5 pm"],
    "meetings": [{"id":"m1","start":12,"title":"Discovery Call","time":"12:00 pm","who":"Rina Wijaya"},{"id":"m2","start":14,"title":"Video Call","time":"2:00 pm","who":"Bagus Hartono"},{"id":"m3","start":15,"title":"Contract Review","time":"3:00 pm","who":"Sinta Maharani"},{"id":"m4","start":16,"title":"Payment Terms","time":"4:00 pm","who":"Yudi Pranoto"},{"id":"m5","start":17,"title":"Demo Recap","time":"5:00 pm","who":"Wulan Sari"}],
    "interests": {"hot":{"label":"Hot Client","dot":"bg-(--tpl-hot)"},"great":{"label":"Great interest","dot":"bg-(--tpl-great)"},"medium":{"label":"Medium","dot":"bg-(--tpl-medium)"},"low":{"label":"Low","dot":"bg-(--tpl-low)"},"none":{"label":"Non interest","dot":"bg-(--tpl-none)"}},
    "interestIds": ["hot","great","medium","low","none"],
    "leads": [{"id":"l1","name":"Bagus Hartono","role":"Head of Sales","company":"Sinar Retail","source":"Website","interest":"hot","value":85000000,"email":"bagus@sinarretail.id","phone":"+62 812 3301 4410"},{"id":"l2","name":"Rina Wijaya","role":"Operations Lead","company":"Kopi Lereng","source":"Referral","interest":"great","value":45000000,"email":"rina@kopilereng.id","phone":"+62 813 2290 1175"},{"id":"l3","name":"Dodi Saputra","role":"Founder","company":"Rumah Tenun","source":"Event","interest":"medium","value":18500000,"email":"dodi@rumahtenun.id","phone":"+62 811 4502 8830"},{"id":"l4","name":"Sinta Maharani","role":"Marketing Manager","company":"Arunika Travel","source":"Social","interest":"hot","value":120000000,"email":"sinta@arunika.id","phone":"+62 812 7781 0042"},{"id":"l5","name":"Yudi Pranoto","role":"Finance Director","company":"Baja Mulia","source":"Cold email","interest":"low","value":32000000,"email":"yudi@bajamulia.id","phone":"+62 815 6610 2297"},{"id":"l6","name":"Wulan Sari","role":"Product Owner","company":"Lumbung Data","source":"Website","interest":"great","value":64000000,"email":"wulan@lumbungdata.id","phone":"+62 817 1203 5546"},{"id":"l7","name":"Hendra Gunawan","role":"Procurement","company":"Kertas Nusa","source":"Referral","interest":"none","value":12000000,"email":"hendra@kertasnusa.id","phone":"+62 819 8830 1204"},{"id":"l8","name":"Maya Puspita","role":"Chief Executive","company":"Studio Rupa","source":"Event","interest":"medium","value":27500000,"email":"maya@studiorupa.id","phone":"+62 812 0045 7718"}],
    "leadChips": [{"id":"all","label":"All"},{"id":"hot","label":"Hot Client"},{"id":"great","label":"Great interest"},{"id":"medium","label":"Medium"},{"id":"low","label":"Low"},{"id":"none","label":"Non interest"}],
    "tasks": [{"id":"t1","lead":"l1","meeting":"m2","title":"Video Call","app":"video","date":"Mon, 9 Nov","time":"2:00 pm - 2:45 pm","amount":0,"status":"Call scheduled","tags":["hot","today"]},{"id":"t2","lead":"l2","meeting":"m1","title":"Send Proposal","app":"file","date":"Mon, 9 Nov","time":"Before 5:00 pm","amount":45000000,"status":"Waiting Proposal","tags":["today"]},{"id":"t3","lead":"l4","meeting":"m3","title":"Contract Review","app":"file","date":"Tue, 10 Nov","time":"10:00 am","amount":120000000,"status":"In progress","tags":["hot"]},{"id":"t4","lead":"l5","meeting":"m4","title":"Follow-up Email","app":"mail","date":"Fri, 6 Nov","time":"9:00 am","amount":0,"status":"Not started","tags":["overdue"]},{"id":"t5","lead":"l6","meeting":"m5","title":"Demo Recap","app":"check","date":"Mon, 9 Nov","time":"11:00 am","amount":0,"status":"Done","tags":[]}],
    "taskFilters": [{"id":"all","label":"All"},{"id":"hot","label":"Hot"},{"id":"today","label":"Due Today"},{"id":"overdue","label":"Overdue"},{"id":"done","label":"Completed"}],
    "statusMenu": [{"label":"Call scheduled","value":"Call scheduled"},{"label":"Waiting Proposal","value":"Waiting Proposal"},{"label":"In progress","value":"In progress"},{"label":"Not started","value":"Not started"},{"label":"Done","value":"Done"}],
    "summary": [{"time":"00:00","text":"Intro and the tools Sinar Retail uses today"},{"time":"06:40","text":"Follow-ups are slow across their three branches"},{"time":"14:15","text":"Pricing for 40 seats on the annual plan"}],
    "documents": [{"name":"Proposal.pdf","size":"2,4 MB"},{"name":"Pricing.xlsx","size":"860 KB"}],
    "stages": ["Qualified","Proposal","Negotiation","Won"],
    "dealList": [{"id":"d1","company":"Sinar Retail","who":"Bagus Hartono","value":85000000,"stage":"Negotiation"},{"id":"d2","company":"Kopi Lereng","who":"Rina Wijaya","value":45000000,"stage":"Proposal"},{"id":"d3","company":"Arunika Travel","who":"Sinta Maharani","value":120000000,"stage":"Negotiation"},{"id":"d4","company":"Rumah Tenun","who":"Dodi Saputra","value":18500000,"stage":"Qualified"},{"id":"d5","company":"Lumbung Data","who":"Wulan Sari","value":64000000,"stage":"Won"},{"id":"d6","company":"Studio Rupa","who":"Maya Puspita","value":27500000,"stage":"Qualified"}],
    "week": [{"day":"9","label":"Mon","items":[{"time":"12:00 pm","title":"Discovery Call","who":"Rina Wijaya"},{"time":"2:00 pm","title":"Video Call","who":"Bagus Hartono"},{"time":"3:00 pm","title":"Contract Review","who":"Sinta Maharani"},{"time":"4:00 pm","title":"Payment Terms","who":"Yudi Pranoto"},{"time":"5:00 pm","title":"Demo Recap","who":"Wulan Sari"}]},{"day":"10","label":"Tue","items":[{"time":"10:00 am","title":"Contract Review","who":"Sinta Maharani"},{"time":"1:30 pm","title":"Pipeline Sync","who":"Dodi Saputra"}]},{"day":"11","label":"Wed","items":[]},{"day":"12","label":"Thu","items":[{"time":"9:30 am","title":"Onboarding Kickoff","who":"Wulan Sari"}]},{"day":"13","label":"Fri","items":[{"time":"3:00 pm","title":"Quarterly Review","who":"Maya Puspita"}]}],
    "threadList": [{"id":"c1","who":"Bagus Hartono","messages":[{"mine":false,"text":"Can we move the call to 2 pm? Our branch heads want to join.","time":"9:12 am"},{"mine":true,"text":"Sure, 2 pm works. I will send the new invite.","time":"9:20 am"}]},{"id":"c2","who":"Rina Wijaya","messages":[{"mine":false,"text":"Looking forward to the proposal. Please include the training cost.","time":"Yesterday"}]},{"id":"c3","who":"Sinta Maharani","messages":[{"mine":true,"text":"The contract draft is ready for your legal team.","time":"Fri"},{"mine":false,"text":"Thanks, we will review it on Tuesday.","time":"Fri"}]}],
    "faceTones": ["bg-(--tpl-av1)","bg-(--tpl-av2)","bg-(--tpl-av3)","bg-(--tpl-av4)","bg-(--tpl-av5)"],
    "statBadges": {"lime":"bg-(--tpl-lime) text-(--tpl-lime-ink)","rose":"bg-(--tpl-rose) text-(--tpl-rose-ink)"},
    "taskTones": {"lime":{"card":"bg-(--tpl-lime) text-(--tpl-lime-ink)","sub":"text-(--tpl-lime-muted)","soft":"bg-(--tpl-white) text-(--tpl-lime-ink)","menu":"[&>button]:bg-(--tpl-white) [&>button]:text-(--tpl-lime-ink)"},"plain":{"card":"bg-surface text-ink","sub":"text-muted","soft":"bg-subtle text-ink","menu":"[&>button]:bg-subtle [&>button]:text-ink"}},
    "DAY_START": 12,
    "DAY_HOURS": 6,
    "NOW": 13.333333333333334,
    "MEETING_SPAN": 0.75,
    "LEAD_PREVIEW": 3
    }
    JSON, true);

    // Kelas Tailwind, identik dengan versi React dan Vue.
    $palette = '[--tpl-bg:#eceef0] [--tpl-night:#121412] [--tpl-on-night:#f4f5f2] [--tpl-night-muted:#a8aea8] [--tpl-night-line:#2d322d] [--tpl-night-soft:#1f231f] [--tpl-lime:#d7f36c] [--tpl-lime-ink:#1b2208] [--tpl-lime-muted:#3d4a14] [--tpl-white:#ffffff] [--tpl-rose:#fde2e2] [--tpl-rose-ink:#8a1c1c] [--tpl-hot:#ef4444] [--tpl-great:#16a34a] [--tpl-medium:#f59e0b] [--tpl-low:#3b82f6] [--tpl-none:#a1a1aa] [--tpl-portrait-a:#d9e4ff] [--tpl-portrait-b:#f6dccb] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd0da] [--tpl-av3:#fde68a] [--tpl-av4:#bfecd6] [--tpl-av5:#ddd3fb] [--tpl-av-ink:#1f2937] [--tpl-shadow:0_16px_40px_-24px_#0f172a40] dark:[--tpl-bg:#0b0d0b] dark:[--tpl-night:#000000] dark:[--tpl-night-line:#2a2f2a] dark:[--tpl-night-soft:#171a17] dark:[--tpl-lime:#c9e862] dark:[--tpl-rose:#3b1717] dark:[--tpl-rose-ink:#fecaca] dark:[--tpl-portrait-a:#28344f] dark:[--tpl-portrait-b:#4a3426] dark:[--tpl-shadow:0_16px_40px_-24px_#00000099]';
    $shell = '[--tpl-bg:#eceef0] [--tpl-night:#121412] [--tpl-on-night:#f4f5f2] [--tpl-night-muted:#a8aea8] [--tpl-night-line:#2d322d] [--tpl-night-soft:#1f231f] [--tpl-lime:#d7f36c] [--tpl-lime-ink:#1b2208] [--tpl-lime-muted:#3d4a14] [--tpl-white:#ffffff] [--tpl-rose:#fde2e2] [--tpl-rose-ink:#8a1c1c] [--tpl-hot:#ef4444] [--tpl-great:#16a34a] [--tpl-medium:#f59e0b] [--tpl-low:#3b82f6] [--tpl-none:#a1a1aa] [--tpl-portrait-a:#d9e4ff] [--tpl-portrait-b:#f6dccb] [--tpl-av1:#c7dafd] [--tpl-av2:#fbd0da] [--tpl-av3:#fde68a] [--tpl-av4:#bfecd6] [--tpl-av5:#ddd3fb] [--tpl-av-ink:#1f2937] [--tpl-shadow:0_16px_40px_-24px_#0f172a40] dark:[--tpl-bg:#0b0d0b] dark:[--tpl-night:#000000] dark:[--tpl-night-line:#2a2f2a] dark:[--tpl-night-soft:#171a17] dark:[--tpl-lime:#c9e862] dark:[--tpl-rose:#3b1717] dark:[--tpl-rose-ink:#fecaca] dark:[--tpl-portrait-a:#28344f] dark:[--tpl-portrait-b:#4a3426] dark:[--tpl-shadow:0_16px_40px_-24px_#00000099] min-h-dvh bg-(--tpl-bg) text-ink';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $roundButton = 'relative inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $railBase = 'inline-flex size-12 items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $railActive = 'bg-primary text-on-primary';
    $railIdle = 'bg-surface text-muted hover:text-ink';
    $menuItem = 'flex h-11 w-full items-center gap-3 rounded-full px-4 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuIdle = 'text-ink hover:bg-subtle';
    $chip = 'inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $chipOn = 'bg-surface text-ink shadow-(--tpl-shadow)';
    $chipOff = 'text-muted ring-1 ring-line ring-inset hover:text-ink';
    $face = 'inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none';
    $card = 'relative flex flex-col rounded-[28px] p-5';
    $socket = 'absolute top-0 right-0 z-10 flex size-[58px] items-start justify-end rounded-bl-[26px] bg-(--tpl-bg) before:absolute before:top-0 before:right-full before:size-6 before:bg-[radial-gradient(circle_at_0_100%,transparent_24px,var(--tpl-bg)_24.5px)] after:absolute after:top-full after:right-0 after:size-6 after:bg-[radial-gradient(circle_at_0_100%,transparent_24px,var(--tpl-bg)_24.5px)]';
    $cornerButton = 'inline-flex size-12 items-center justify-center rounded-full bg-surface text-ink shadow-(--tpl-shadow) transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $selectable = 'block max-w-full truncate text-left after:absolute after:inset-0 after:rounded-[28px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary';
    $sourceChip = 'inline-flex h-7 items-center rounded-full bg-subtle px-3 text-xs font-medium';
    $darkButton = 'inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-(--tpl-night) text-(--tpl-on-night) transition-opacity duration-150 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $callControl = 'inline-flex size-11 items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $controlOn = 'bg-subtle text-ink hover:bg-line';
    $controlOff = 'bg-(--tpl-night) text-(--tpl-on-night)';
    $statusTrigger = '[&>button]:h-9 [&>button]:rounded-full [&>button]:border-0 [&>button]:px-3.5';
    $panel = 'rounded-[28px] bg-surface p-5';
    $pillButton = 'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $slotBase = 'absolute top-0 flex h-8 items-center gap-1.5 rounded-full bg-(--tpl-lime) pr-2.5 pl-1 text-[11px] font-semibold whitespace-nowrap text-(--tpl-lime-ink) transition-shadow duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $slotOn = 'ring-2 ring-(--tpl-on-night) ring-offset-2 ring-offset-(--tpl-night)';
    $h2 = 'text-2xl font-semibold tracking-tight';

    $html = fn (string $markup) => new HtmlString($markup);
    $svg = fn (string $path, string $class) => '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path '.$path.' /></svg>';
    // Ikon garis 24px. $iconOf memakai nama ikon dari ekspresi Alpine.
    $icon = fn (string $name, string $class = 'size-5') => $html($svg('d="'.$data['icons'][$name].'"', $class));
    $iconOf = fn (string $expr, string $class = 'size-5') => $html($svg(':d="icons['.e($expr).']"', $class));
    // Avatar inisial berwarna dari palet lokal, nama dari ekspresi Alpine.
    $faceOf = fn (string $expr, string $class) => $html('<span aria-hidden="true" class="'.$face.' '.$class.'" :class="faceTone('.e($expr).')" x-text="initials('.e($expr).')"></span>');
    // Tombol ↗ di soket sudut kartu. $label dan $click berupa ekspresi Alpine.
    $corner = fn (string $label, string $click) => $html('<span class="'.$socket.'"><button type="button" :aria-label="'.e($label).'" class="'.$cornerButton.'" @click="'.e($click).'">'.$icon('arrow').'</button></span>');
    // Grup chip filter: $items dan $model berupa ekspresi Alpine.
    $chips = fn (string $label, string $items, string $model) => $html('<div role="group" aria-label="'.$label.'" class="flex flex-wrap gap-2"><template x-for="item in '.e($items).'" :key="item.id"><button type="button" class="'.$chip.'" :class="'.e($model).' === item.id ? '.e(json_encode($chipOn)).' : '.e(json_encode($chipOff)).'" :aria-pressed="'.e($model).' === item.id ? \'true\' : \'false\'" @click="'.e($model).' = item.id"><template x-if="item.id === \'hot\'">'.$icon('flame', 'size-4 text-(--tpl-hot)').'</template><span x-text="item.label"></span></button></template></div>');
    // Grid kartu lead untuk daftar dari ekspresi Alpine.
    $leadGrid = fn (string $items) => $html('<template x-if="'.e($items).'.length === 0"><p class="text-sm text-muted">No leads match this filter.</p></template><template x-if="'.e($items).'.length &gt; 0"><ul class="grid gap-4 md:grid-cols-2 2xl:grid-cols-3"><template x-for="lead in '.e($items).'" :key="lead.id"><li :data-lead="lead.id" class="'.$card.' min-h-48 bg-surface"><div class="flex items-center gap-3 pr-14">'.$faceOf('lead.name', 'size-12 text-sm').'<div class="min-w-0"><h3 class="truncate text-xl font-semibold tracking-tight"><button type="button" class="'.$selectable.'" @click="openLead(lead.id)" x-text="lead.name"></button></h3><p class="text-sm text-muted" x-text="lead.role + \' @ \' + lead.company"></p></div></div>'.$corner("'Open ' + lead.name", 'openLead(lead.id)').'<dl class="mt-auto grid grid-cols-2 gap-3 pt-6"><div><dt class="text-xs text-muted">Source</dt><dd class="mt-1.5"><span class="'.$sourceChip.'" x-text="lead.source"></span></dd></div><div><dt class="text-xs text-muted">Interest</dt><dd class="mt-1.5 flex h-7 items-center gap-2 text-sm font-medium"><span aria-hidden="true" class="size-2 rounded-full" :class="interests[lead.interest].dot"></span><span x-text="interests[lead.interest].label"></span></dd></div></dl></li></template></ul></template>');
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp

<script type="application/json" id="pipeline-data">{!! json_encode($data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE) !!}</script>
<div
  class="{{ $shell }}"
  x-data="{
    ...JSON.parse(document.getElementById('pipeline-data').textContent),
    page: 'workspace',
    leadId: 'l1',
    meetingId: 'm2',
    callOpen: true,
    {{-- Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. --}}
    readHash() {
      const id = window.location.hash.slice(1);
      return id in this.pages ? id : 'workspace';
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
    {{-- Huruf pertama kata pertama dan terakhir, sama dengan Avatar. --}}
    initials(name) {
      return name.split(' ').filter((_, index, words) => index === 0 || index === words.length - 1).map((word) => word.charAt(0)).join('').toUpperCase();
    },
    {{-- Warna avatar inisial yang selalu sama untuk nama yang sama. --}}
    faceTone(name) {
      return this.faceTones[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % this.faceTones.length];
    },
    rupiah(value) {
      return 'Rp ' + value.toLocaleString('id-ID');
    },
    plural(count, word) {
      return count + ' ' + word + (count === 1 ? '' : 's');
    },
    at(hour) {
      return ((hour - this.DAY_START) / this.DAY_HOURS) * 100 + '%';
    },
    leadById(id) {
      return this.leads.find((item) => item.id === id);
    },
    get lead() {
      return this.leadById(this.leadId);
    },
    get meeting() {
      return this.meetings.find((item) => item.id === this.meetingId);
    },
    matchesLead(lead, filter) {
      return filter === 'all' || lead.interest === filter;
    },
    openLead(id) {
      this.leadId = id;
      document.getElementById('pipeline-lead-drawer').showModal();
    },
    pickMeeting(id) {
      this.meetingId = id;
      this.callOpen = true;
    },
  }"
  x-init="page = readHash()"
  x-on:hashchange.window="page = readHash(); $nextTick(() => document.getElementById('pipeline-page-title').focus())"
>
  <header class="flex h-20 items-center gap-4 px-4 lg:px-6">
    <x-markas.drawer title="Menu" side="left">
      <x-slot:trigger>
        <button type="button" aria-label="Open menu" class="{{ $roundButton }} lg:hidden">{{ $icon('menu') }}</button>
      </x-slot:trigger>
      <form method="dialog" class="grid gap-1">
        <template x-for="id in pageIds" :key="id">
          <button type="submit" class="{{ $menuItem }}" :class="page === id ? @js($railActive) : @js($menuIdle)" :aria-current="current(id)" @click="go(id)">{{ $iconOf('pages[id].icon') }}<span x-text="pages[id].label"></span></button>
        </template>
      </form>
    </x-markas.drawer>
    <div class="flex shrink-0 items-center gap-2.5">
      <span aria-hidden="true" class="flex size-11 items-center justify-center rounded-full bg-(--tpl-night) text-(--tpl-lime) dark:ring-1 dark:ring-line"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 17V7M12 17V4M19 17v-6" /></svg></span>
      <p class="text-lg font-bold tracking-tight">Pipeline</p>
    </div>
    <section aria-labelledby="pipeline-schedule-title" class="mx-auto hidden h-16 max-w-[880px] min-w-0 flex-1 items-center gap-5 rounded-full bg-(--tpl-night) pr-4 pl-6 text-(--tpl-on-night) xl:flex dark:ring-1 dark:ring-line">
      <div class="shrink-0 leading-tight">
        <h2 id="pipeline-schedule-title" class="text-sm font-semibold">Your Schedule</h2>
        <p class="text-xs text-(--tpl-night-muted)">Mon, 9 Nov 2026</p>
      </div>
      <div class="relative h-12 min-w-0 flex-1">
        <div aria-hidden="true" class="absolute inset-x-0 top-0 flex text-[10px] text-(--tpl-night-muted)">
          @foreach ($data['hourMarks'] as $mark)
            <span class="flex-1 border-l border-(--tpl-night-line) pl-1.5">{{ $mark }}</span>
          @endforeach
        </div>
        <ul aria-label="Meetings today" class="absolute inset-x-0 bottom-0 h-8">
          <template x-for="item in meetings" :key="item.id">
            <li>
              <button type="button" class="{{ $slotBase }}" :class="meetingId === item.id && @js($slotOn)" :aria-pressed="meetingId === item.id ? 'true' : 'false'" :style="{ left: at(item.start), width: 'calc(' + (MEETING_SPAN / DAY_HOURS) * 100 + '% - 4px)' }" @click="pickMeeting(item.id)">{{ $faceOf('item.who', 'size-6 text-[9px]') }}<span x-text="item.time"></span><span class="sr-only" x-text="', ' + item.title + ' with ' + item.who"></span></button>
            </li>
          </template>
        </ul>
        <span aria-hidden="true" class="absolute -top-1 bottom-0 w-0.5 rounded-full bg-(--tpl-lime) before:absolute before:-top-1 before:-left-[3px] before:size-2 before:rounded-full before:bg-(--tpl-lime)" :style="{ left: at(NOW) }"></span>
        <span class="sr-only">Now 1:20 pm</span>
      </div>
    </section>
    <div class="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
      <button type="button" aria-label="Notifications, 3 unread" class="{{ $roundButton }}" @click="notify('3 unread notifications', 'Sinta Maharani signed the NDA')">{{ $icon('bell') }}<span aria-hidden="true" class="absolute top-2.5 right-2.5 size-2 rounded-full bg-danger ring-2 ring-surface"></span></button>
      <x-markas.avatar name="Ahmad Fauzi" size="md" class="ring-2 ring-surface" />
    </div>
  </header>

  <div class="px-4 pb-10 lg:grid lg:grid-cols-[48px_minmax(0,1fr)] lg:gap-6 lg:px-6">
    <div class="hidden lg:block">
      <nav aria-label="Workspace" class="sticky top-6 flex flex-col items-center gap-2">
        <template x-for="id in pageIds" :key="id">
          <button type="button" class="{{ $railBase }}" :class="page === id ? @js($railActive) : @js($railIdle)" :aria-label="pages[id].label" :aria-current="current(id)" @click="go(id)">{{ $iconOf('pages[id].icon') }}</button>
        </template>
        <span aria-hidden="true" class="my-1 h-px w-6 bg-line"></span>
        <button type="button" aria-label="Settings" class="{{ $railBase }} {{ $railIdle }}" @click="notify('Settings', 'Workspace settings are up to date')">{{ $icon('settings') }}</button>
      </nav>
    </div>

    <main class="grid min-w-0 content-start gap-8">
      <div class="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 pt-2">
        <div class="flex flex-wrap items-end gap-4">
          <div>
            <p class="text-sm text-muted" x-text="'Pipeline / ' + pages[page].label">Pipeline / Workspace</p>
            <h1 id="pipeline-page-title" tabindex="-1" class="mt-1 text-[34px] leading-none font-extrabold tracking-[0.14em] uppercase focus:outline-none sm:text-[56px]" x-text="pages[page].title">Workspace</h1>
          </div>
          <button type="button" class="{{ $pillButton }} mb-1" @click="notify('Task created', 'Follow up with Maya Puspita, tomorrow 10:00 am', 'success')">{{ $icon('plus', 'size-4') }}New Task</button>
        </div>
        <dl class="flex flex-wrap gap-x-8 gap-y-3">
          @foreach ($data['stats'] as $stat)
            <div class="flex items-start gap-2">
              <dt class="sr-only">{{ $stat['unit'] }}</dt>
              <dd class="flex items-baseline gap-1.5"><span class="text-[44px] leading-none font-semibold tracking-tight tabular-nums">{{ $stat['value'] }}</span><span class="text-base text-muted">{{ $stat['unit'] }}</span></dd>
              <dd class="rounded-full px-2 py-0.5 text-xs font-semibold {{ $data['statBadges'][$stat['tone']] }}">{{ $stat['badge'] }}</dd>
            </div>
          @endforeach
        </dl>
      </div>

      {{-- Workspace --}}
      <template x-if="page === 'workspace'">
        <div
          class="grid min-w-0 content-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"
          x-data="{
            leadFilter: 'all',
            taskFilter: 'all',
            searching: false,
            query: '',
            byInterest: false,
            status: Object.fromEntries(tasks.map((task) => [task.id, task.status])),
            controls: { camera: true, mic: true, speaker: true },
            get shownLeads() {
              const needle = this.query.trim().toLowerCase();
              return this.leads
                .filter((item) => this.matchesLead(item, this.leadFilter) && item.name.toLowerCase().includes(needle))
                .sort((a, b) => (this.byInterest ? this.interestIds.indexOf(a.interest) - this.interestIds.indexOf(b.interest) : 0))
                .slice(0, this.LEAD_PREVIEW);
            },
            get shownTaskIds() {
              const filter = this.taskFilter;
              return this.tasks.filter((task) => filter === 'all' || (filter === 'done' ? this.status[task.id] === 'Done' : task.tags.includes(filter))).map((task) => task.id);
            },
            tone(id) {
              return this.taskTones[this.shownTaskIds[0] === id ? 'lime' : 'plain'];
            },
            calling(task) {
              return this.callOpen && this.meetingId === task.meeting;
            },
            changeStatus(task, value) {
              this.status = { ...this.status, [task.id]: value };
              this.notify('Status updated', task.title + ': ' + value, 'success');
            },
            toggleCall(task) {
              const same = this.calling(task);
              this.meetingId = task.meeting;
              this.callOpen = !same;
            },
            endCall() {
              this.callOpen = false;
              this.controls = { camera: true, mic: true, speaker: true };
              this.notify('Call ended', this.meeting.title + ' with ' + this.meeting.who);
            },
          }"
        >
          <div class="grid min-w-0 content-start gap-8">
            <section aria-labelledby="pipeline-leads-title" class="grid gap-4">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <h2 id="pipeline-leads-title" class="{{ $h2 }}">New Leads <span class="ml-1 text-muted underline decoration-2 underline-offset-[6px]" x-text="leads.length"></span></h2>
                <div class="flex gap-2">
                  <button type="button" aria-label="Search leads" class="{{ $roundButton }}" :aria-expanded="searching ? 'true' : 'false'" @click="searching = !searching">{{ $icon('search') }}</button>
                  <button type="button" aria-label="Sort by interest" class="{{ $roundButton }}" :class="byInterest && 'bg-primary text-on-primary hover:bg-primary'" :aria-pressed="byInterest ? 'true' : 'false'" @click="byInterest = !byInterest">{{ $icon('filter') }}</button>
                </div>
              </div>
              <template x-if="searching">
                <x-markas.input label="Search by name" type="search" class="max-w-sm" x-model="query" />
              </template>
              {{ $chips('Filter leads by interest', 'leadChips', 'leadFilter') }}
              {{ $leadGrid('shownLeads') }}
            </section>

            <section aria-labelledby="pipeline-tasks-title" class="grid gap-4">
              <h2 id="pipeline-tasks-title" class="{{ $h2 }}">Your Days Tasks <span class="ml-1 text-muted underline decoration-2 underline-offset-[6px]" x-text="tasks.length"></span></h2>
              {{ $chips('Filter tasks', 'taskFilters', 'taskFilter') }}
              <p class="text-sm text-muted" x-show="shownTaskIds.length === 0">No tasks in this view.</p>
              <ul class="grid gap-4 md:grid-cols-2 2xl:grid-cols-3" x-show="shownTaskIds.length > 0">
                @foreach ($data['tasks'] as $index => $task)
                  @php
                    $person = collect($data['leads'])->firstWhere('id', $task['lead']);
                    $tid = $task['id'];
                  @endphp
                  <li data-task="{{ $tid }}" class="{{ $card }} min-h-64" :class="tone('{{ $tid }}').card" x-show="shownTaskIds.includes('{{ $tid }}')" x-data="{ task: tasks[{{ $index }}] }">
                    <div class="flex items-center gap-3 pr-24">
                      {{ $faceOf("'".$person['name']."'", 'size-11 text-sm') }}
                      <div class="min-w-0">
                        <p class="truncate font-semibold">{{ $person['name'] }}</p>
                        <p class="truncate text-xs" :class="tone('{{ $tid }}').sub">{{ $person['role'] }}</p>
                      </div>
                    </div>
                    <button type="button" aria-label="Remind me about {{ $task['title'] }}" class="absolute top-1 right-[66px] inline-flex size-10 items-center justify-center rounded-full {{ $focusRing }}" :class="tone('{{ $tid }}').soft" @click="notify('Reminder set', task.title + ', ' + task.time)">{{ $icon('bell', 'size-4') }}</button>
                    {{ $corner("'Open ".$task['title']."'", 'openLead(task.lead)') }}
                    <span aria-hidden="true" class="mt-5 inline-flex size-11 items-center justify-center rounded-2xl" :class="tone('{{ $tid }}').soft">{{ $icon($task['app']) }}</span>
                    <h3 class="mt-3 text-2xl font-semibold tracking-tight">{{ $task['title'] }}</h3>
                    <p class="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm" :class="tone('{{ $tid }}').sub"><span class="inline-flex items-center gap-1.5">{{ $icon('calendar', 'size-4') }}{{ $task['date'] }}</span><span class="inline-flex items-center gap-1.5">{{ $icon('clock', 'size-4') }}{{ $task['time'] }}</span></p>
                    @if ($task['amount'] > 0)
                      <p class="mt-2 text-lg font-semibold tabular-nums">Rp {{ number_format($task['amount'], 0, ',', '.') }}</p>
                    @endif
                    <div class="mt-auto flex items-center justify-between gap-2 pt-5">
                      <x-markas.dropdown-menu id="pipeline-status-{{ $tid }}" :items="$data['statusMenu']" class="{{ $statusTrigger }}" x-bind:class="tone('{{ $tid }}').menu" x-on:markas-select="changeStatus(task, $event.detail)"><x-slot:trigger><span class="sr-only">{{ $task['title'] }} status: </span><span data-status x-text="status['{{ $tid }}']">{{ $task['status'] }}</span></x-slot:trigger></x-markas.dropdown-menu>
                      <div class="flex gap-2">
                        <button type="button" aria-label="Message {{ $person['name'] }}" class="{{ $darkButton }}" @click="go('messages')">{{ $icon('chat', 'size-4') }}</button>
                        <button type="button" aria-label="Video call with {{ $person['name'] }}" class="{{ $darkButton }}" :aria-pressed="calling(task) ? 'true' : 'false'" @click="toggleCall(task)">{{ $icon('video', 'size-4') }}</button>
                      </div>
                    </div>
                  </li>
                @endforeach
              </ul>
            </section>
          </div>

          <aside aria-label="Call and summary" class="grid content-start gap-4 xl:sticky xl:top-6">
            <template x-if="callOpen">
              <section aria-labelledby="pipeline-call-title" data-call class="rounded-[28px] bg-surface p-3 shadow-(--tpl-shadow)">
                <div class="relative aspect-[4/3] overflow-hidden rounded-3xl bg-linear-160 from-(--tpl-portrait-a) to-(--tpl-portrait-b)">
                  <span aria-hidden="true" class="absolute bottom-0 left-1/2 h-[34%] w-[62%] -translate-x-1/2 rounded-t-full bg-(--tpl-white)/45"></span>
                  {{ $faceOf('meeting.who', 'absolute top-[22%] left-1/2 size-24 -translate-x-1/2 text-2xl ring-4 ring-(--tpl-white)/60') }}
                  <span class="absolute top-3 left-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-(--tpl-night) px-2.5 text-xs font-medium text-(--tpl-on-night) tabular-nums"><span aria-hidden="true" class="size-2 rounded-full bg-danger"></span>12:48</span>
                  <span class="absolute top-3 right-3 inline-flex size-14 items-center justify-center rounded-2xl bg-(--tpl-night)">{{ $faceOf("'Ahmad Fauzi'", 'size-8 text-[11px]') }}</span>
                  <span class="absolute bottom-3 left-3 inline-flex h-7 items-center rounded-full bg-surface px-3 text-xs font-semibold" x-text="meeting.who"></span>
                </div>
                <div class="px-2 pt-3">
                  <h2 id="pipeline-call-title" class="font-semibold" x-text="meeting.title"></h2>
                  <p class="text-xs text-muted" x-text="meeting.time + ' with ' + meeting.who"></p>
                </div>
                <div class="flex items-center justify-center gap-2 pt-3 pb-1">
                  @foreach ([['camera', 'Camera', 'video'], ['mic', 'Microphone', 'mic'], ['speaker', 'Speaker', 'speaker']] as [$key, $label, $name])
                    <button type="button" aria-label="{{ $label }}" class="{{ $callControl }}" :class="controls.{{ $key }} ? @js($controlOn) : @js($controlOff)" :aria-pressed="controls.{{ $key }} ? 'true' : 'false'" @click="controls = { ...controls, {{ $key }}: !controls.{{ $key }} }">{{ $icon($name) }}</button>
                  @endforeach
                  <button type="button" aria-label="End call" class="inline-flex h-11 w-16 items-center justify-center rounded-full bg-danger text-(--tpl-white) transition-opacity duration-150 hover:opacity-90 {{ $focusRing }}" @click="endCall()">{{ $icon('end') }}</button>
                </div>
              </section>
            </template>
            <template x-if="!callOpen">
              <section aria-labelledby="pipeline-call-title" data-call-closed class="{{ $panel }}">
                <h2 id="pipeline-call-title" class="font-semibold">No active call</h2>
                <p class="mt-1 text-sm text-muted">Pick a meeting from your schedule or start a video call from a task.</p>
                <button type="button" class="{{ $pillButton }} mt-4" @click="callOpen = true">{{ $icon('video', 'size-4') }}<span x-text="'Join ' + meeting.title"></span></button>
              </section>
            </template>
            <section aria-labelledby="pipeline-summary-title" class="rounded-[28px] bg-(--tpl-night) p-5 text-(--tpl-on-night) dark:ring-1 dark:ring-line">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h2 id="pipeline-summary-title" class="text-lg font-semibold">Summary</h2>
                  <p class="text-xs text-(--tpl-night-muted)">Last call with Bagus Hartono</p>
                </div>
                <button type="button" aria-label="Open summary" class="inline-flex size-9 items-center justify-center rounded-full bg-(--tpl-night-soft) {{ $focusRing }}" @click="notify('Summary opened', 'Call notes, 3 highlights')">{{ $icon('arrow', 'size-4') }}</button>
              </div>
              <ol class="mt-4 grid gap-3">
                @foreach ($data['summary'] as $item)
                  <li class="grid grid-cols-[44px_1fr] gap-3"><span class="pt-0.5 text-xs text-(--tpl-night-muted) tabular-nums">{{ $item['time'] }}</span><p class="border-l border-(--tpl-night-line) pl-3 text-sm">{{ $item['text'] }}</p></li>
                @endforeach
              </ol>
              <h3 class="mt-5 text-sm font-semibold">Documents</h3>
              <ul class="mt-2 grid grid-cols-2 gap-3">
                @foreach ($data['documents'] as $doc)
                  <li class="rounded-2xl bg-(--tpl-night-soft) p-3">
                    <span aria-hidden="true" class="grid h-16 content-start gap-1.5 rounded-xl bg-(--tpl-night-line) p-2.5"><span class="h-1.5 w-3/4 rounded-full bg-(--tpl-night-muted)"></span><span class="h-1.5 w-full rounded-full bg-(--tpl-night-soft)"></span><span class="h-1.5 w-2/3 rounded-full bg-(--tpl-night-soft)"></span></span>
                    <p class="mt-2 truncate text-xs font-medium">{{ $doc['name'] }}</p>
                    <p class="text-xs text-(--tpl-night-muted)">{{ $doc['size'] }}</p>
                  </li>
                @endforeach
              </ul>
              <h3 class="mt-5 text-sm font-semibold">Goal</h3>
              <p class="mt-1 text-sm text-(--tpl-night-muted)">Close the 40 seat annual plan before 30 Nov, starting with a pilot in the Bandung branch.</p>
            </section>
          </aside>
        </div>
      </template>

      {{-- Leads --}}
      <template x-if="page === 'leads'">
        <section
          aria-labelledby="pipeline-all-leads"
          class="grid gap-4"
          x-data="{
            allFilter: 'all',
            allQuery: '',
            get allLeads() {
              const needle = this.allQuery.trim().toLowerCase();
              return this.leads.filter((item) => this.matchesLead(item, this.allFilter) && (item.name + ' ' + item.company).toLowerCase().includes(needle));
            },
          }"
        >
          <div class="flex flex-wrap items-end justify-between gap-3">
            <h2 id="pipeline-all-leads" class="{{ $h2 }}" x-text="plural(allLeads.length, 'lead')"></h2>
            <div class="w-full max-w-xs"><x-markas.input label="Search leads" type="search" x-model="allQuery" /></div>
          </div>
          {{ $chips('Filter leads by interest', 'leadChips', 'allFilter') }}
          {{ $leadGrid('allLeads') }}
        </section>
      </template>

      {{-- Pipeline --}}
      <template x-if="page === 'pipeline'">
        <div
          class="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          x-data="{
            deals: dealList.map((item) => ({ ...item })),
            nextStage(stage) {
              return this.stages[this.stages.indexOf(stage) + 1];
            },
            stageDeals(stage) {
              return this.deals.filter((deal) => deal.stage === stage);
            },
            stageTotal(stage) {
              return this.stageDeals(stage).reduce((sum, deal) => sum + deal.value, 0);
            },
            move(deal) {
              const next = this.nextStage(deal.stage);
              this.deals = this.deals.map((item) => (item.id === deal.id ? { ...item, stage: next } : item));
              this.notify('Moved to ' + next, deal.company, 'success');
            },
          }"
        >
          <template x-for="stage in stages" :key="stage">
            <section :aria-label="stage" :data-stage="stage" class="grid content-start gap-3 rounded-[28px] p-3 ring-1 ring-line ring-inset">
              <div class="flex items-baseline justify-between gap-2 px-2 pt-1">
                <h2 class="font-semibold" x-text="stage"></h2>
                <p class="text-xs text-muted tabular-nums" x-text="stageDeals(stage).length + ' · ' + rupiah(stageTotal(stage))"></p>
              </div>
              <template x-for="deal in stageDeals(stage)" :key="deal.id">
                <article :data-deal="deal.id" class="grid gap-3 rounded-3xl bg-surface p-4">
                  <div class="flex items-center gap-3">
                    {{ $faceOf('deal.who', 'size-9 text-xs') }}
                    <div class="min-w-0">
                      <h3 class="truncate font-semibold" x-text="deal.company"></h3>
                      <p class="truncate text-xs text-muted" x-text="deal.who"></p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between gap-2">
                    <p class="font-semibold tabular-nums" x-text="rupiah(deal.value)"></p>
                    <template x-if="stage !== 'Won'">
                      <button type="button" class="{{ $darkButton }}" :aria-label="'Move ' + deal.company + ' to ' + nextStage(stage)" @click="move(deal)">{{ $icon('next', 'size-4') }}</button>
                    </template>
                  </div>
                </article>
              </template>
            </section>
          </template>
        </div>
      </template>

      {{-- Calendar --}}
      <template x-if="page === 'calendar'">
        <section aria-labelledby="pipeline-agenda-title" class="{{ $panel }} grid gap-5" x-data="{ day: '9', get currentDay() { return this.week.find((item) => item.day === this.day); } }">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 id="pipeline-agenda-title" class="{{ $h2 }}" x-text="'November ' + day"></h2>
            <button type="button" class="{{ $pillButton }}" @click="notify('Meeting added', currentDay.label + ', ' + day + ' Nov at 4:00 pm')">{{ $icon('plus', 'size-4') }}Add meeting</button>
          </div>
          <div role="group" aria-label="Pick a day" class="grid grid-cols-5 gap-2">
            <template x-for="item in week" :key="item.day">
              <button type="button" class="grid h-16 place-content-center rounded-2xl text-center transition-colors duration-150 {{ $focusRing }}" :class="day === item.day ? @js($railActive) : 'bg-subtle text-ink hover:bg-line'" :aria-pressed="day === item.day ? 'true' : 'false'" @click="day = item.day"><span class="text-xs" x-text="item.label"></span><span class="text-lg font-semibold tabular-nums" x-text="item.day"></span></button>
            </template>
          </div>
          <p data-agenda class="text-sm text-muted" x-show="currentDay.items.length === 0">No meetings on this day.</p>
            <ul data-agenda class="grid gap-2" x-show="currentDay.items.length > 0">
              <template x-for="item in currentDay.items" :key="item.time">
                <li class="flex items-center gap-3 rounded-2xl bg-subtle p-3">
                  <span class="w-20 shrink-0 text-sm font-semibold tabular-nums" x-text="item.time"></span>
                  {{ $faceOf('item.who', 'size-8 text-[11px]') }}
                  <div class="min-w-0">
                    <p class="truncate text-sm font-medium" x-text="item.title"></p>
                    <p class="truncate text-xs text-muted" x-text="item.who"></p>
                  </div>
                </li>
              </template>
            </ul>
        </section>
      </template>

      {{-- Messages --}}
      <template x-if="page === 'messages'">
        <div
          class="grid gap-4 md:grid-cols-[280px_minmax(0,1fr)]"
          x-data="{
            threads: threadList.map((item) => ({ ...item })),
            activeId: 'c1',
            draft: '',
            get activeThread() {
              return this.threads.find((item) => item.id === this.activeId);
            },
            send() {
              const text = this.draft.trim();
              if (!text) return;
              this.threads = this.threads.map((item) => (item.id === this.activeId ? { ...item, messages: [...item.messages, { mine: true, text, time: 'Now' }] } : item));
              this.draft = '';
              this.notify('Message sent', this.activeThread.who);
            },
          }"
        >
          <ul aria-label="Conversations" class="{{ $panel }} grid grid-cols-1 content-start gap-1 p-2">
            <template x-for="item in threads" :key="item.id">
              <li>
                <button type="button" class="flex w-full items-center gap-3 rounded-3xl p-3 text-left transition-colors duration-150 {{ $focusRing }}" :class="activeId === item.id ? 'bg-subtle' : 'hover:bg-subtle'" :aria-pressed="activeId === item.id ? 'true' : 'false'" @click="activeId = item.id">
                  {{ $faceOf('item.who', 'size-10 text-xs') }}
                  <span class="min-w-0"><span class="block truncate text-sm font-semibold" x-text="item.who"></span><span class="block truncate text-xs text-muted" x-text="item.messages[item.messages.length - 1].text"></span></span>
                </button>
              </li>
            </template>
          </ul>
          <section aria-labelledby="pipeline-thread-title" class="{{ $panel }} grid content-start gap-4">
            <h2 id="pipeline-thread-title" class="text-lg font-semibold" x-text="activeThread.who"></h2>
            <ol data-thread class="grid gap-2">
              <template x-for="(message, index) in activeThread.messages" :key="index">
                <li class="max-w-[80%] rounded-3xl px-4 py-2.5 text-sm" :class="message.mine ? 'justify-self-end bg-(--tpl-night) text-(--tpl-on-night)' : 'justify-self-start bg-subtle'">
                  <p x-text="message.text"></p>
                  <p class="mt-1 text-xs" :class="message.mine ? 'text-(--tpl-night-muted)' : 'text-muted'" x-text="message.time"></p>
                </li>
              </template>
            </ol>
            <form class="flex items-end gap-2" @submit.prevent="send()">
              <div class="min-w-0 flex-1"><x-markas.input label="Message" x-model="draft" /></div>
              <button type="submit" class="{{ $pillButton }}">{{ $icon('send', 'size-4') }}Send</button>
            </form>
          </section>
        </div>
      </template>
    </main>
  </div>

  <x-markas.drawer id="pipeline-lead-drawer" title="Lead details">
    <div class="grid gap-5 text-ink">
      <div class="flex items-center gap-3">
        {{ $faceOf('lead.name', 'size-14 text-base') }}
        <div class="min-w-0">
          <p class="text-lg font-semibold" x-text="lead.name"></p>
          <p class="text-sm text-muted" x-text="lead.role + ' @ ' + lead.company"></p>
        </div>
      </div>
      <dl class="grid grid-cols-2 gap-3">
        <template x-for="[label, value] in [['Interest', interests[lead.interest].label], ['Source', lead.source], ['Deal value', rupiah(lead.value)], ['Phone', lead.phone]]" :key="label">
          <div class="rounded-2xl bg-subtle p-3">
            <dt class="text-xs text-muted" x-text="label"></dt>
            <dd class="mt-1 text-sm font-medium" :data-field="label" x-text="value"></dd>
          </div>
        </template>
      </dl>
      <p class="text-sm text-muted" x-text="'Email ' + lead.email"></p>
    </div>
    <x-slot:footer>
      <x-markas.button variant="secondary" type="submit" value="close">Close</x-markas.button>
      <x-markas.button type="submit" value="schedule" @click="notify('Call scheduled', lead.name + ', tomorrow 10:00 am', 'success')">Schedule call</x-markas.button>
    </x-slot:footer>
  </x-markas.drawer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
