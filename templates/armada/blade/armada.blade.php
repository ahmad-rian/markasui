@php
    // Kelas Tailwind dan data contoh, identik dengan versi React (satu blok JSON hasil salinan konstanta React).
    $data = json_decode(<<<'JSON'
    {"focusRing":"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","root":"relative min-h-dvh bg-canvas text-ink","container":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8","footerEdge":"px-[max(1rem,calc((100%-72rem)/2+2rem))]","navWrap":"absolute inset-x-5 top-5 z-30 sm:inset-x-8 sm:top-7","navbar":"mx-auto max-w-5xl","brandLink":"flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","brandMark":"flex size-7 items-center justify-center rounded-lg bg-primary text-on-primary","signIn":"hidden h-9 items-center rounded-full px-3 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","demoLink":"hidden h-9 items-center gap-2 rounded-full bg-primary pr-1 pl-4 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","demoIcon":"flex size-7 items-center justify-center rounded-full bg-on-primary text-primary","hero":"relative isolate m-2 flex min-h-[680px] flex-col overflow-hidden rounded-[28px] bg-subtle sm:m-3 lg:min-h-[780px]","heroImage":"absolute inset-0 -z-10 size-full object-cover object-[62%_center]","heroShade":"dark absolute inset-0 -z-10 bg-linear-to-b from-canvas/55 via-canvas/40 to-canvas/85 sm:via-canvas/15","heroBody":"dark flex flex-1 flex-col justify-between gap-14 px-5 pt-32 pb-6 text-ink sm:px-10 sm:pt-40 sm:pb-10 lg:px-14 lg:pb-12","chip":"inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/10 px-3 py-1.5 text-sm text-ink backdrop-blur-md","chipDot":"size-1.5 shrink-0 rounded-full bg-success","h1":"mt-6 max-w-4xl text-5xl leading-[1.02] font-light tracking-tight text-balance sm:text-6xl lg:text-[5.5rem]","h1Strong":"font-semibold","heroActions":"mt-10 flex flex-wrap items-center gap-x-6 gap-y-5","heroCta":"inline-flex h-12 items-center gap-3 rounded-full bg-ink pr-1.5 pl-6 text-base font-medium whitespace-nowrap text-canvas transition-colors duration-150 hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","heroCtaIcon":"flex size-9 items-center justify-center rounded-full bg-canvas text-ink","trust":"flex items-center gap-3","trustText":"max-w-40 text-sm leading-snug text-ink/85","heroFoot":"grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12","heroText":"max-w-md text-base leading-relaxed text-pretty text-ink/85","vesselCard":"w-full rounded-2xl border border-ink/15 bg-canvas/45 p-4 backdrop-blur-xl sm:max-w-sm","vesselTop":"flex items-center justify-between gap-3","vesselName":"text-sm font-semibold","vesselRoute":"mt-1 text-sm text-ink/80","vesselTrack":"mt-4 h-1 overflow-hidden rounded-full bg-ink/15","vesselBar":"h-full w-[62%] rounded-full bg-ink","vesselMeta":"mt-3 flex justify-between gap-3 text-xs text-ink/80","logoWrap":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16","section":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-6 py-16 sm:py-24","sectionHead":"grid max-w-2xl gap-4","h2":"text-3xl font-semibold tracking-tight text-balance sm:text-4xl","lead":"text-lg leading-relaxed text-pretty text-muted","platformGrid":"mt-12 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14","moduleAside":"grid content-start gap-6","moduleScroll":"max-w-full overflow-x-auto","moduleTitle":"text-xl font-semibold tracking-tight","moduleText":"mt-3 text-base leading-relaxed text-pretty text-muted","pointList":"grid gap-3 border-t border-line pt-6 text-sm","pointItem":"flex gap-2","pointIcon":"mt-0.5 size-4 shrink-0 text-primary","panel":"rounded-2xl border border-line bg-surface p-4 shadow-overlay sm:p-6","panelHead":"flex items-center justify-between gap-3","panelTitle":"text-sm font-semibold","panelSub":"text-xs text-muted","statGrid":"mt-5 grid grid-cols-3 gap-2 sm:gap-3","statCell":"rounded-xl bg-subtle p-3 sm:p-4","statLabel":"text-xs leading-snug text-muted","statValue":"mt-2 text-lg font-semibold tracking-tight tabular-nums sm:text-2xl","rowList":"mt-5 divide-y divide-line border-t border-line","row":"flex items-center justify-between gap-4 py-3","rowName":"text-sm font-medium","rowDetail":"text-xs text-muted","rowEnd":"flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3","rowValue":"text-sm tabular-nums","sectorGrid":"mt-12 grid gap-4 md:grid-cols-3","sectorCard":"flex flex-col overflow-hidden rounded-2xl border border-line bg-surface","sectorImage":"aspect-[4/3] w-full bg-subtle object-cover","sectorBody":"grid gap-2 p-6","sectorTitle":"text-lg font-semibold tracking-tight","sectorText":"text-sm leading-relaxed text-pretty text-muted","sectorFacts":"mt-3 grid gap-2 border-t border-line pt-4 text-sm","caseCard":"grid gap-10 rounded-3xl bg-subtle p-6 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:p-14","caseLabel":"text-sm font-medium text-muted","caseQuote":"mt-6 text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl","person":"mt-8 flex items-center gap-3","personName":"text-sm font-medium","personRole":"text-sm text-muted","metricList":"grid content-end gap-6","metric":"flex flex-col-reverse gap-1 border-t border-line pt-5","metricValue":"text-4xl font-semibold tracking-tight tabular-nums","metricLabel":"text-sm text-muted","demoGrid":"grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16","stepList":"mt-10 grid gap-6","stepItem":"grid grid-cols-[auto_minmax(0,1fr)] gap-4","stepNumber":"flex size-8 items-center justify-center rounded-full border border-line bg-surface text-sm font-medium tabular-nums","stepTitle":"text-base font-semibold","stepText":"mt-1 text-sm leading-relaxed text-pretty text-muted","formCard":"grid gap-5 rounded-2xl border border-line bg-surface p-5 shadow-overlay sm:grid-cols-2 sm:p-8","formTitle":"text-lg font-semibold tracking-tight sm:col-span-2","fieldWrap":"grid content-start gap-1.5","fieldLabel":"text-sm font-medium","fieldError":"text-sm text-danger","formFoot":"grid gap-3 sm:col-span-2","submitButton":"w-full","formNote":"text-sm text-muted","faqLayout":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-6 py-16 sm:py-24 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16","faqAside":"grid content-start justify-items-start gap-4","faqList":"[&>div]:max-w-none [&>div]:gap-0","footer":"px-[max(1rem,calc((100%-72rem)/2+2rem))] bg-canvas","icons":{"bow":"M3 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M12 3v10M8 7l4-4 4 4","arrow":"M7 17 17 7M8 7h9v9","check":"m5 12.5 4.5 4.5L19 7.5"},"FORM_ID":"armada-demo","nav":[{"label":"Platform","href":"#platform"},{"label":"Solutions","href":"#solutions"},{"label":"Customers","href":"#customers"},{"label":"FAQ","href":"#faq"}],"leaders":[{"name":"Rudi Hartono"},{"name":"Maya Wijaya"},{"name":"Agus Salim"},{"name":"Dewi Lestari"}],"logos":[{"name":"Bahari Lines","path":"M3 15a9 9 0 0 1 18 0Z"},{"name":"Selat Logistik","path":"M4 4h7v16H4ZM13 9h7v11h-7Z"},{"name":"Tirta Marine","path":"M12 2 21 7v10l-9 5-9-5V7Z"},{"name":"Dermaga Port Group","path":"M12 2 22 12 12 22 2 12Z"},{"name":"Karang Offshore","path":"M12 3 22 20H2Z"}],"modules":[{"value":"tracking","label":"Tracking","title":"Live vessel tracking","text":"AIS positions every minute, merged with noon reports and port calls, so the map in the office matches what the master sees on the bridge.","points":["Positions refreshed every 60 seconds","ETA recalculated from speed, weather, and berth windows","Alerts for route deviation and port congestion"],"panel":"Fleet position","sub":"47 vessels, updated 1 min ago","stats":[{"label":"Underway","value":"38"},{"label":"At berth","value":"9"},{"label":"ETA accuracy","value":"42 min"}],"rows":[{"name":"KM Bahari Jaya","detail":"Tanjung Priok to Tanjung Perak","value":"13.8 kn","status":"On time","tone":"success"},{"name":"MV Selat Mas","detail":"Batam to Singapore","value":"11.2 kn","status":"On time","tone":"success"},{"name":"KM Tirta Kencana","detail":"Makassar to Bitung","value":"9.6 kn","status":"Delayed","tone":"warning"}]},{"value":"fuel","label":"Fuel","title":"Fuel and emissions","text":"Fuel burn per voyage from flow meters and bunker notes, with CO2 and CII ratings calculated the way your auditor expects them.","points":["Daily consumption per vessel and per leg","CII rating forecast for the full year","Bunker delivery notes matched to tank soundings"],"panel":"Fuel this week","sub":"Fleet total, all vessels","stats":[{"label":"Fuel burned","value":"412 t"},{"label":"CO2 emitted","value":"1,283 t"},{"label":"Fleet CII","value":"B"}],"rows":[{"name":"KM Bahari Jaya","detail":"Container, 1,700 TEU","value":"36.2 t/day","status":"Rating B","tone":"success"},{"name":"MV Selat Mas","detail":"Feeder, 900 TEU","value":"21.4 t/day","status":"Rating C","tone":"neutral"},{"name":"KM Tirta Kencana","detail":"General cargo","value":"18.9 t/day","status":"Rating D","tone":"warning"}]},{"value":"maintenance","label":"Maintenance","title":"Planned maintenance","text":"Running hours from the engine room feed your maintenance plan, so work orders open before a part fails and not after.","points":["Work orders from running hours and calendar","Spare parts reserved at the next port of call","Class survey dates on one timeline"],"panel":"Work orders","sub":"Next 14 days","stats":[{"label":"Open","value":"27"},{"label":"Due soon","value":"8"},{"label":"Overdue","value":"1"}],"rows":[{"name":"Main engine overhaul","detail":"KM Bahari Jaya, 12,000 h","value":"3 days","status":"Planned","tone":"neutral"},{"name":"Ballast pump seal","detail":"MV Selat Mas","value":"Today","status":"Due","tone":"warning"},{"name":"Lifeboat inspection","detail":"KM Tirta Kencana","value":"Done","status":"Closed","tone":"success"}]},{"value":"crew","label":"Crew","title":"Crew and certificates","text":"Rotations, rest hours, and certificates for every seafarer, with reminders long before a certificate keeps a vessel in port.","points":["Crew changes planned around port calls","Rest hour records ready for inspection","Certificate expiry alerts 90 days ahead"],"panel":"Crew overview","sub":"All vessels, this month","stats":[{"label":"On board","value":"612"},{"label":"Crew changes","value":"22"},{"label":"Expiring certs","value":"14"}],"rows":[{"name":"Capt. Hendra Wijaya","detail":"Master, KM Bahari Jaya","value":"Sign off 2 Dec","status":"Relief set","tone":"success"},{"name":"Siti Rahma","detail":"Chief Officer, MV Selat Mas","value":"GMDSS cert","status":"Renew","tone":"warning"},{"name":"Yosef Manuhutu","detail":"2nd Engineer, KM Tirta Kencana","value":"Rest hours","status":"Compliant","tone":"success"}]}],"sectors":[{"id":"shipping","image":"/template-images/armada/sector-shipping.webp","alt":"Aerial view of a loaded container ship leaving a white wake on green water","title":"Shipping lines","text":"Container, bulk, and tanker operators who need on-time arrivals and lower fuel bills across long routes.","facts":["Voyage performance per leg","Charter party speed and consumption checks"]},{"id":"ports","image":"/template-images/armada/sector-port.webp","alt":"Container terminal from above, with cranes loading a ship beside stacked containers","title":"Ports and logistics","text":"Terminals and forwarders who plan berths, trucks, and yards around ships that arrive when the data says they will.","facts":["Arrival forecasts for berth planning","Shared vessel views for agents and customers"]},{"id":"offshore","image":"/template-images/armada/sector-offshore.webp","alt":"Supply vessel alongside an offshore rig at sunset, with a crane lifting cargo","title":"Offshore operators","text":"Supply and crew boat fleets serving rigs and platforms, where every hour on location is billed and checked.","facts":["Time on location per contract","Weather windows for crew transfers"]}],"metrics":[{"value":"8.6%","label":"less fuel per nautical mile"},{"value":"31%","label":"fewer unplanned off-hire days"},{"value":"2 weeks","label":"from kickoff to the full fleet live"}],"steps":[{"title":"A 30 minute call","text":"Tell us about your fleet, routes, and the reports you build by hand today."},{"title":"Your fleet on the map","text":"We load 90 days of AIS history for your vessels, so the demo shows your own voyages."},{"title":"A free 60 day pilot","text":"Run Haluan on up to five vessels with your crew and office team before you decide."}],"fleetSizes":[{"value":"","label":"Choose fleet size"},{"value":"1-10","label":"1 to 10 vessels"},{"value":"11-50","label":"11 to 50 vessels"},{"value":"51-200","label":"51 to 200 vessels"},{"value":"200+","label":"More than 200 vessels"}],"faqs":[{"question":"Which data sources does Haluan connect to?","answer":"Satellite and terrestrial AIS, noon reports, engine flow meters, and your existing planned maintenance system. Most fleets connect in under two weeks."},{"question":"Do we need to install hardware on board?","answer":"No. Tracking and reporting work with the AIS your vessels already carry. Flow meter data is optional and adds more accurate fuel figures."},{"question":"Does it work with limited connectivity at sea?","answer":"Yes. The crew app works offline and syncs noon reports and rest hours whenever the vessel has a connection, even over narrow VSAT links."},{"question":"How is pricing calculated?","answer":"Per vessel per month, billed in Rupiah or US dollars. Fuel and crew modules are optional, and the pilot on five vessels is free for 60 days."},{"question":"Where is our data stored?","answer":"In data centres in Jakarta, with daily backups. You own your data and can export everything as CSV or through the API at any time."}],"footerColumns":[{"title":"Platform","links":[{"label":"Tracking","href":"#platform"},{"label":"Fuel and emissions","href":"#platform"},{"label":"Maintenance","href":"#platform"}]},{"title":"Solutions","links":[{"label":"Shipping lines","href":"#solutions"},{"label":"Ports and logistics","href":"#solutions"},{"label":"Offshore","href":"#solutions"}]},{"title":"Company","links":[{"label":"Customers","href":"#customers"},{"label":"Careers","href":"/careers"},{"label":"Contact","href":"#demo"}]}],"legal":[{"label":"Privacy","href":"/privacy"},{"label":"Terms","href":"/terms"}]}
    JSON, true);
    extract($data);

    $icon = fn (string $name, string $class) => new Illuminate\Support\HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $brand = new Illuminate\Support\HtmlString('<a href="#top" class="'.$brandLink.'"><span class="'.$brandMark.'">'.$icon('bow', 'size-4').'</span>Haluan</a>');
    $moduleItems = array_map(fn ($item) => ['value' => $item['value'], 'label' => $item['label']], $modules);
    $moduleData = array_column(array_map(fn ($item) => ['value' => $item['value'], 'title' => $item['title'], 'text' => $item['text'], 'panel' => $item['panel'], 'sub' => $item['sub']], $modules), null, 'value');
    $first = $modules[0];
    $fields = [
        ['key' => 'name', 'label' => 'Full name', 'type' => 'text', 'autocomplete' => 'name', 'placeholder' => 'Rina Siregar'],
        ['key' => 'email', 'label' => 'Work email', 'type' => 'email', 'autocomplete' => 'email', 'placeholder' => 'nama@perusahaan.co.id'],
        ['key' => 'company', 'label' => 'Company', 'type' => 'text', 'autocomplete' => 'organization', 'placeholder' => 'PT Bahari Lines'],
    ];
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  id="top"
  class="{{ $root }}"
  x-data="{
    moduleId: @js($first['value']),
    modules: @js($moduleData),
    values: { name: '', email: '', company: '', fleet: '' },
    errors: {},
    init() {
      {{-- ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan pilihan sebelumnya. --}}
      this.$watch('moduleId', (value, previous) => { if (!value) this.moduleId = previous; });
    },
    get current() { return this.modules[this.moduleId] ?? this.modules[@js($first['value'])]; },
    notify(title, description, variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    submit() {
      const errors = {};
      if (!this.values.name.trim()) errors.name = 'Enter your full name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.values.email.trim())) errors.email = 'Enter a work email, like nama@perusahaan.co.id.';
      if (!this.values.company.trim()) errors.company = 'Enter your company name.';
      if (!this.values.fleet) errors.fleet = 'Choose your fleet size.';
      this.errors = errors;
      if (Object.keys(errors).length > 0) return;
      this.notify('Demo request sent', 'Thanks, ' + this.values.name.trim().split(/\s+/)[0] + '. A fleet specialist will email ' + this.values.email.trim() + ' within one working day.', 'success');
      this.values = { name: '', email: '', company: '', fleet: '' };
    },
  }"
>
  <div class="{{ $navWrap }}">
    <x-markas.navbar variant="floating" :links="$nav" class="{{ $navbar }}" x-on:click="if ($event.target.closest('[data-state=open] a')) open = false">
      <x-slot:brand>{{ $brand }}</x-slot:brand>
      <x-slot:actions>
        <a href="/login" class="{{ $signIn }}">Sign in</a>
        <a href="#demo" class="{{ $demoLink }}">Get a demo<span class="{{ $demoIcon }}">{{ $icon('arrow', 'size-3.5') }}</span></a>
      </x-slot:actions>
    </x-markas.navbar>
  </div>

  <main>
    <section aria-labelledby="armada-title" class="{{ $hero }}">
      <img src="/template-images/armada/hero-ship.webp" alt="Container ship loaded with stacked containers sailing on a calm grey-blue sea" width="1600" height="1067" fetchpriority="high" decoding="async" class="{{ $heroImage }}" />
      <div aria-hidden="true" class="{{ $heroShade }}"></div>
      <div class="{{ $heroBody }}">
        <div>
          <p class="{{ $chip }}"><span aria-hidden="true" class="{{ $chipDot }}"></span>New: CII forecasts for 2027</p>
          <h1 id="armada-title" class="{{ $h1 }}">Every vessel. <strong class="{{ $h1Strong }}">One</strong> clear view.</h1>
          <div class="{{ $heroActions }}">
            <a href="#demo" class="{{ $heroCta }}">Book a demo<span class="{{ $heroCtaIcon }}">{{ $icon('arrow', 'size-4') }}</span></a>
            <div class="{{ $trust }}">
              <x-markas.avatar-group :items="$leaders" size="sm" group-label="Fleet managers using Haluan" />
              <p class="{{ $trustText }}">Trusted by 40+ shipping lines and ports</p>
            </div>
          </div>
        </div>
        <div class="{{ $heroFoot }}">
          <p class="{{ $heroText }}">Haluan brings positions, fuel burn, maintenance, and crew into one live picture, so operations teams in Jakarta, Surabaya, and Singapore act before a small issue becomes a delay.</p>
          <div class="{{ $vesselCard }}">
            <div class="{{ $vesselTop }}">
              <p class="{{ $vesselName }}">KM Bahari Jaya</p>
              <x-markas.badge variant="success">Underway</x-markas.badge>
            </div>
            <p class="{{ $vesselRoute }}">Tanjung Priok to Tanjung Perak</p>
            <div class="{{ $vesselTrack }}"><div class="{{ $vesselBar }}"></div></div>
            <p class="{{ $vesselMeta }}"><span>13.8 knots</span><span>ETA today, 14.20 WIB</span></p>
          </div>
        </div>
      </div>
    </section>

    <div class="{{ $logoWrap }}">
      <x-markas.logo-cloud title="Running voyages for shipping lines, ports, and offshore fleets" :logos="$logos" variant="marquee" />
    </div>

    <section id="platform" aria-labelledby="armada-platform" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="armada-platform" class="{{ $h2 }}">One platform from the bridge to the back office</h2>
        <p class="{{ $lead }}">Four modules that share the same vessel data. Start with tracking and add the rest when your team is ready.</p>
      </div>
      <div class="{{ $platformGrid }}">
        <div class="{{ $moduleAside }}">
          <div class="{{ $moduleScroll }}">
            <x-markas.toggle-group label="Platform modules" :items="$moduleItems" :value="$first['value']" x-model="moduleId" />
          </div>
          <div>
            <h3 class="{{ $moduleTitle }}" x-text="current.title">{{ $first['title'] }}</h3>
            <p class="{{ $moduleText }}" x-text="current.text">{{ $first['text'] }}</p>
          </div>
          @foreach ($modules as $item)
            <ul class="{{ $pointList }}" x-show="moduleId === @js($item['value'])" @if (! $loop->first) style="display: none" @endif>
              @foreach ($item['points'] as $point)
                <li class="{{ $pointItem }}">{{ $icon('check', $pointIcon) }}{{ $point }}</li>
              @endforeach
            </ul>
          @endforeach
        </div>
        <div data-module="{{ $first['value'] }}" x-bind:data-module="moduleId" class="{{ $panel }}">
          <div class="{{ $panelHead }}">
            <div>
              <p data-panel-title="" class="{{ $panelTitle }}" x-text="current.panel">{{ $first['panel'] }}</p>
              <p class="{{ $panelSub }}" x-text="current.sub">{{ $first['sub'] }}</p>
            </div>
            <x-markas.badge variant="success">Live</x-markas.badge>
          </div>
          @foreach ($modules as $item)
            <dl class="{{ $statGrid }}" x-show="moduleId === @js($item['value'])" @if (! $loop->first) style="display: none" @endif>
              @foreach ($item['stats'] as $stat)
                <div class="{{ $statCell }}"><dt class="{{ $statLabel }}">{{ $stat['label'] }}</dt><dd class="{{ $statValue }}">{{ $stat['value'] }}</dd></div>
              @endforeach
            </dl>
          @endforeach
          @foreach ($modules as $item)
            <ul class="{{ $rowList }}" x-show="moduleId === @js($item['value'])" @if (! $loop->first) style="display: none" @endif>
              @foreach ($item['rows'] as $entry)
                <li class="{{ $row }}">
                  <div>
                    <p class="{{ $rowName }}">{{ $entry['name'] }}</p>
                    <p class="{{ $rowDetail }}">{{ $entry['detail'] }}</p>
                  </div>
                  <div class="{{ $rowEnd }}">
                    <span class="{{ $rowValue }}">{{ $entry['value'] }}</span>
                    <x-markas.badge :variant="$entry['tone']">{{ $entry['status'] }}</x-markas.badge>
                  </div>
                </li>
              @endforeach
            </ul>
          @endforeach
        </div>
      </div>
    </section>

    <section id="solutions" aria-labelledby="armada-solutions" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="armada-solutions" class="{{ $h2 }}">Built for the way your fleet earns</h2>
        <p class="{{ $lead }}">The same platform, set up for the reports and alerts each kind of operator checks every morning.</p>
      </div>
      <ul class="{{ $sectorGrid }}">
        @foreach ($sectors as $sector)
          <li class="{{ $sectorCard }}">
            <img src="{{ $sector['image'] }}" alt="{{ $sector['alt'] }}" width="720" height="540" loading="lazy" decoding="async" class="{{ $sectorImage }}" />
            <div class="{{ $sectorBody }}">
              <h3 class="{{ $sectorTitle }}">{{ $sector['title'] }}</h3>
              <p class="{{ $sectorText }}">{{ $sector['text'] }}</p>
              <ul class="{{ $sectorFacts }}">
                @foreach ($sector['facts'] as $fact)
                  <li class="{{ $pointItem }}">{{ $icon('check', $pointIcon) }}{{ $fact }}</li>
                @endforeach
              </ul>
            </div>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="customers" aria-labelledby="armada-customers" class="{{ $section }}">
      <h2 id="armada-customers" class="sr-only">Customer story</h2>
      <div class="{{ $caseCard }}">
        <figure>
          <p class="{{ $caseLabel }}">Bahari Lines, 34 container vessels</p>
          <blockquote class="{{ $caseQuote }}">We used to find out about a slow voyage from the fuel invoice. Now the duty officer sees it on the second day and calls the master while there is still time to recover.</blockquote>
          <figcaption class="{{ $person }}">
            <x-markas.avatar name="Ratna Sihombing" size="md" />
            <div>
              <p class="{{ $personName }}">Ratna Sihombing</p>
              <p class="{{ $personRole }}">Head of Fleet Operations, Bahari Lines</p>
            </div>
          </figcaption>
        </figure>
        <dl class="{{ $metricList }}">
          @foreach ($metrics as $item)
            <div class="{{ $metric }}"><dt class="{{ $metricLabel }}">{{ $item['label'] }}</dt><dd class="{{ $metricValue }}">{{ $item['value'] }}</dd></div>
          @endforeach
        </dl>
      </div>
    </section>

    <section id="demo" aria-labelledby="armada-demo" class="{{ $section }}">
      <div class="{{ $demoGrid }}">
        <div>
          <div class="{{ $sectionHead }}">
            <h2 id="armada-demo" class="{{ $h2 }}">See your own fleet in Haluan</h2>
            <p class="{{ $lead }}">No slides. We show your vessels, your routes, and last quarter's fuel figures in the first call.</p>
          </div>
          <ol class="{{ $stepList }}">
            @foreach ($steps as $step)
              <li class="{{ $stepItem }}">
                <span aria-hidden="true" class="{{ $stepNumber }}">{{ $loop->iteration }}</span>
                <div>
                  <h3 class="{{ $stepTitle }}">{{ $step['title'] }}</h3>
                  <p class="{{ $stepText }}">{{ $step['text'] }}</p>
                </div>
              </li>
            @endforeach
          </ol>
        </div>
        <form class="{{ $formCard }}" novalidate aria-labelledby="{{ $FORM_ID }}-title" x-on:submit.prevent="submit()">
          <h3 id="{{ $FORM_ID }}-title" class="{{ $formTitle }}">Request a demo</h3>
          @foreach ($fields as $item)
            <div class="{{ $fieldWrap }}">
              <label for="{{ $FORM_ID }}-{{ $item['key'] }}" class="{{ $fieldLabel }}">{{ $item['label'] }}</label>
              <x-markas.input :id="$FORM_ID.'-'.$item['key']" :type="$item['type']" :name="$item['key']" :autocomplete="$item['autocomplete']" :placeholder="$item['placeholder']" x-model="values.{{ $item['key'] }}" x-bind:aria-invalid="errors.{{ $item['key'] }} ? 'true' : null" x-bind:aria-describedby="errors.{{ $item['key'] }} ? '{{ $FORM_ID }}-{{ $item['key'] }}-error' : null" />
              <template x-if="errors.{{ $item['key'] }}"><p id="{{ $FORM_ID }}-{{ $item['key'] }}-error" class="{{ $fieldError }}" x-text="errors.{{ $item['key'] }}"></p></template>
            </div>
          @endforeach
          <div class="{{ $fieldWrap }}">
            <label for="{{ $FORM_ID }}-fleet" class="{{ $fieldLabel }}">Fleet size</label>
            <x-markas.select :id="$FORM_ID.'-fleet'" name="fleet" x-model="values.fleet" x-bind:aria-invalid="errors.fleet ? 'true' : null" x-bind:aria-describedby="errors.fleet ? '{{ $FORM_ID }}-fleet-error' : null">
              @foreach ($fleetSizes as $size)
                <option value="{{ $size['value'] }}">{{ $size['label'] }}</option>
              @endforeach
            </x-markas.select>
            <template x-if="errors.fleet"><p id="{{ $FORM_ID }}-fleet-error" class="{{ $fieldError }}" x-text="errors.fleet"></p></template>
          </div>
          <div class="{{ $formFoot }}">
            <x-markas.button type="submit" size="lg" class="{{ $submitButton }}">Request a demo</x-markas.button>
            <p class="{{ $formNote }}">We reply within one working day, 08.00 to 17.00 WIB.</p>
          </div>
        </form>
      </div>
    </section>

    <section id="faq" aria-labelledby="armada-faq" class="{{ $faqLayout }}">
      <div class="{{ $faqAside }}">
        <h2 id="armada-faq" class="{{ $h2 }}">Questions from operations teams</h2>
        <p class="{{ $lead }}">Want to check something specific to your fleet? Our team has run vessels before they built software for them.</p>
        <x-markas.button variant="secondary" x-on:click="notify('We will call you back', 'A fleet specialist calls within two working hours, 08.00 to 17.00 WIB.')">Request a call back</x-markas.button>
      </div>
      <x-markas.faq :items="$faqs" :exclusive="true" class="{{ $faqList }}" />
    </section>
  </main>

  <x-markas.footer class="{{ $footer }}" description="Fleet operations software for shipping lines, ports, and offshore operators in Southeast Asia." :columns="$footerColumns" :legal="$legal" copyright="© 2026 Haluan. Built with MarkasUI.">
    <x-slot:brand>{{ $brand }}</x-slot:brand>
  </x-markas.footer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
