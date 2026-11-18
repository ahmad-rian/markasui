@php
    // Kelas Tailwind dan data contoh, identik dengan versi React (satu blok JSON hasil salinan konstanta React).
    $data = json_decode(<<<'JSON'
    {"focusRing":"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","root":"min-h-dvh bg-canvas text-ink","container":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8","navbarEdge":"mx-auto mt-3 max-w-[calc(100%-1.5rem)] sm:max-w-[calc(100%-3rem)] lg:max-w-[68rem]","footerEdge":"px-[max(1rem,calc((100%-72rem)/2))]","brandLink":"flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","brandMark":"flex size-7 items-center justify-center rounded-full bg-primary text-on-primary","navCta":"inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","primaryLink":"inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","secondaryLink":"inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-6 text-base font-medium whitespace-nowrap text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","hero":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:pt-20 lg:pb-24","h1":"text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl","heroLead":"mt-5 max-w-lg text-lg leading-relaxed text-pretty text-muted","heroActions":"mt-8 flex flex-wrap gap-3","statList":"mt-12 grid max-w-lg grid-cols-3 divide-x divide-line border-t border-line pt-6","statItem":"grid gap-1 px-4 first:pl-0","statValue":"-order-1 text-lg font-semibold tracking-tight tabular-nums sm:text-xl","statLabel":"text-sm text-muted","heroMedia":"relative lg:pl-8","heroImage":"aspect-[4/5] w-full rounded-3xl bg-subtle object-cover object-[50%_25%] sm:aspect-[5/4] lg:aspect-[6/7]","balanceCard":"absolute bottom-4 left-4 grid w-[min(18rem,calc(100%-2rem))] gap-3 rounded-2xl border border-line bg-surface p-5 shadow-overlay lg:bottom-10 lg:left-0","balanceHead":"flex items-center justify-between gap-2","balanceLabel":"text-sm text-muted","balanceAmount":"text-2xl font-semibold tracking-tight tabular-nums","goalRow":"grid gap-2 border-t border-line pt-3","goalText":"flex justify-between gap-2 text-xs text-muted","goalTrack":"h-1.5 overflow-hidden rounded-full bg-subtle","goalBar":"h-full w-[78%] rounded-full bg-primary","section":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-20 py-16 sm:py-24","sectionHead":"grid max-w-2xl gap-4","h2":"text-3xl font-semibold tracking-tight text-balance sm:text-4xl","lead":"text-lg leading-relaxed text-pretty text-muted","lifestyle":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-20 py-4","lifestylePanel":"relative grid min-h-[30rem] content-start overflow-hidden rounded-3xl bg-subtle p-3 sm:min-h-[38rem] sm:p-4","lifestyleImage":"absolute inset-0 size-full object-cover object-[50%_80%]","lifestyleHead":"relative grid max-w-md gap-3 rounded-2xl bg-surface/90 p-6 backdrop-blur-md sm:p-8","lifestyleTitle":"text-3xl font-semibold tracking-tight text-balance sm:text-4xl","lifestyleText":"text-base leading-relaxed text-pretty text-muted","pillarGrid":"mt-3 grid gap-3 md:grid-cols-3","pillarCard":"grid content-start gap-3 rounded-2xl border border-line bg-surface p-6","pillarIcon":"flex size-10 items-center justify-center rounded-full bg-primary-soft text-primary","pillarTitle":"text-lg font-semibold tracking-tight","pillarText":"text-sm leading-relaxed text-pretty text-muted","simGrid":"mt-10 grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]","simForm":"grid content-start gap-8 rounded-2xl border border-line bg-surface p-5 sm:p-8","fieldGroup":"grid gap-3","fieldLabel":"text-sm font-medium","filterScroll":"max-w-full overflow-x-auto","simResult":"grid content-start gap-6 rounded-2xl bg-primary-soft p-5 sm:p-8","resultLabel":"text-sm text-muted","resultAmount":"mt-1 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl","splitTrack":"flex h-3 overflow-hidden rounded-full bg-surface","splitPaid":"h-full bg-primary","splitList":"grid gap-3 text-sm","splitRow":"flex items-center justify-between gap-3","splitKey":"flex items-center gap-2 text-muted","dotPaid":"size-2.5 rounded-full bg-primary","dotGrowth":"size-2.5 rounded-full border border-primary bg-surface","splitValue":"font-medium tabular-nums","simNote":"text-xs leading-relaxed text-pretty text-muted","productGrid":"mt-10 grid gap-4 lg:grid-cols-3","productCard":"flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6","productHead":"flex items-center justify-between gap-2","productName":"text-lg font-semibold tracking-tight","productRate":"text-4xl font-semibold tracking-tight tabular-nums","productUnit":"mt-1 text-sm text-muted","productText":"text-sm leading-relaxed text-pretty text-muted","featureList":"grid flex-1 content-start gap-3 border-t border-line pt-5 text-sm","featureItem":"flex gap-2","checkIcon":"mt-0.5 size-4 shrink-0 text-primary","trustWrap":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-20 pb-4","trustBand":"grid gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12","trustTitle":"text-xl font-semibold tracking-tight","trustText":"mt-2 text-sm leading-relaxed text-pretty text-muted","trustGrid":"grid gap-6 sm:grid-cols-2","trustItem":"flex gap-3","trustIcon":"flex size-9 shrink-0 items-center justify-center rounded-lg bg-subtle text-ink","trustName":"text-sm font-semibold","trustNote":"mt-1 text-sm leading-relaxed text-pretty text-muted","faqLayout":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-20 py-16 sm:py-24 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16","faqAside":"grid content-start justify-items-start gap-4","faqList":"[&>div]:max-w-none [&>div]:gap-0","appWrap":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-20 pb-20 sm:pb-24","appBand":"grid gap-8 rounded-3xl bg-primary-soft p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12","appTitle":"text-3xl font-semibold tracking-tight text-balance sm:text-4xl","appText":"mt-3 text-base leading-relaxed text-pretty text-muted","storeRow":"mt-6 flex flex-wrap gap-3","linkForm":"grid gap-2","linkRow":"grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]","linkField":"h-11 bg-surface text-base sm:text-sm","linkButton":"h-11 shrink-0","fieldError":"text-sm text-danger","fieldHint":"text-sm text-muted","footer":"px-[max(1rem,calc((100%-72rem)/2))] bg-canvas","icons":{"sprout":"M12 20v-8m0 0c0-4 3-7 7-7 0 4-3 7-7 7Zm0 0C12 8 9 5 5 5c0 4 3 7 7 7","arrow":"M5 12h14m-6-6 6 6-6 6","check":"m5 12.5 4.5 4.5L19 7.5","layers":"m12 4 8 4-8 4-8-4Zm-8 8 8 4 8-4m-16 4 8 4 8-4","chart":"M4 19h16M6 15l4-4 3 3 5-6","flag":"M5 21V4m0 0h11l-2 4 2 4H5","lock":"M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z","bank":"M3 10h18L12 4Zm2 0v8m4-8v8m6-8v8m4-8v8M3 20h18","shield":"M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6Z","badge":"M12 3l2.5 2 3.2-.3.8 3.1 2.5 2-1.4 2.9.4 3.2-3.1.8-2 2.5-2.9-1.4-2.9 1.4-2-2.5-3.1-.8.4-3.2L3 10.2l2.5-2 .8-3.1 3.2.3Z"},"IMG":"/template-images/tabungan","PHONE_ID":"tabungan-phone","MONTHS":12,"DEFAULT_MONTHLY":1000000,"DEFAULT_YEARS":5,"DEFAULT_PLAN":"balanced","nav":[{"label":"Save","href":"#save"},{"label":"Invest","href":"#invest"},{"label":"Plan","href":"#plan"},{"label":"Advice","href":"#advice"},{"label":"About","href":"#about"}],"stats":[{"value":"1,2 million","label":"savers"},{"value":"Rp 4,8 T","label":"saved so far"},{"value":"4,8 / 5","label":"app rating"}],"pillars":[{"icon":"layers","title":"Build capital","text":"Put aside from Rp 10.000 at a time, or set an automatic transfer on payday and forget about it."},{"icon":"chart","title":"Grow your money","text":"Move savings you will not need for a while into mutual funds or gold, without a minimum balance."},{"icon":"flag","title":"Fund your dreams","text":"Name a goal, pick a date, and see exactly how much to put aside each month to get there."}],"plans":[{"value":"savings","label":"Savings 4,5%","rate":0.045},{"value":"balanced","label":"Balanced 7%","rate":0.07},{"value":"equity","label":"Equity 10%","rate":0.1}],"presets":[500000,1000000,2500000],"products":[{"id":"saver","name":"Tunas Saver","cta":"Open a Saver pocket","tag":"Most opened","rate":"4,5%","unit":"a year, paid daily","text":"A savings pocket for money you might need soon. Withdraw to any bank in minutes.","features":["No minimum balance","Free transfers to all banks","Up to 10 goal pockets"]},{"id":"funds","name":"Mutual funds","cta":"Start investing","tag":"","rate":"7,1%","unit":"5-year average, balanced fund","text":"Money market, bond, balanced, and equity funds from licensed fund managers.","features":["Start from Rp 10.000","No buying or selling fees","Monthly auto-invest"]},{"id":"gold","name":"Digital gold","cta":"Buy gold","tag":"","rate":"0,01 g","unit":"smallest purchase","text":"Buy 24 karat gold by the gram, stored in an insured vault and backed one to one.","features":["Live buy and sell prices","Print to physical gold from 5 g","Gift gold to family"]}],"trust":[{"icon":"lock","name":"Bank-grade encryption","note":"Your data and transactions are encrypted in transit and at rest."},{"icon":"bank","name":"Funds held by a custodian bank","note":"Your money sits in segregated accounts, never mixed with ours."},{"icon":"shield","name":"Two-step login","note":"Every new device needs your PIN and a one-time code."},{"icon":"badge","name":"Licensed and supervised","note":"Licence no. KEP-0417/2026. Tunas is a fictional brand: show your real licence here."}],"faqs":[{"question":"Is my money safe with Tunas?","answer":"Savings are held in segregated accounts at our custodian bank, and fund units are registered in your own name, so they stay yours even if Tunas stops operating."},{"question":"How much do I need to start?","answer":"Rp 10.000. There is no minimum balance and no monthly fee for savings, funds, or gold."},{"question":"How fast can I withdraw?","answer":"Savings reach your bank account within minutes. Mutual fund sales settle in one to three working days, depending on the fund."},{"question":"Are the simulator returns guaranteed?","answer":"No. Savings interest is fixed for the month, but fund and gold returns change with the market. The simulator shows an estimate, not a promise."},{"question":"Which documents do I need to sign up?","answer":"Your e-KTP and a selfie. Most accounts are verified within ten minutes."}],"footerColumns":[{"title":"Products","links":[{"label":"Tunas Saver","href":"#invest"},{"label":"Mutual funds","href":"#invest"},{"label":"Digital gold","href":"#invest"}]},{"title":"Company","links":[{"label":"About","href":"#about"},{"label":"Careers","href":"/careers"},{"label":"Press","href":"/press"}]},{"title":"Help","links":[{"label":"FAQ","href":"#advice"},{"label":"Contact","href":"/contact"},{"label":"Report fraud","href":"/fraud"}]}],"legal":[{"label":"Privacy","href":"/privacy"},{"label":"Terms","href":"/terms"},{"label":"Risk disclosure","href":"/risk"}]}
    JSON, true);
    extract($data);

    $icon = fn (string $name, string $class) => new Illuminate\Support\HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $rupiah = fn (float $value) => 'Rp '.number_format(round($value), 0, ',', '.');
    $rates = array_column($plans, 'rate', 'value');
    // Proyeksi bawaan dihitung sama dengan project() di React; Alpine menghitung ulang saat input berubah.
    $months = $DEFAULT_YEARS * $MONTHS;
    $r = $rates[$DEFAULT_PLAN] / $MONTHS;
    $paid = $DEFAULT_MONTHLY * $months;
    $total = round($DEFAULT_MONTHLY * ((1 + $r) ** $months - 1) / $r);
    $brand = new Illuminate\Support\HtmlString('<a href="#top" class="'.$brandLink.'"><span class="'.$brandMark.'">'.$icon('sprout', 'size-4').'</span>Tunas</a>');
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  id="top"
  class="{{ $root }}"
  x-data="{
    monthly: {{ $DEFAULT_MONTHLY }},
    years: {{ $DEFAULT_YEARS }},
    plan: @js($DEFAULT_PLAN),
    rates: @js($rates),
    phone: '',
    phoneError: '',
    init() {
      {{-- ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan pilihan sebelumnya. --}}
      this.$watch('plan', (value, previous) => { if (!value) this.plan = previous; });
    },
    rupiah(value) { return 'Rp ' + String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); },
    yearsLabel(years) { return years === 1 ? '1 year' : years + ' years'; },
    get result() {
      const monthly = Number(this.monthly) || 0;
      const months = Number(this.years) * {{ $MONTHS }};
      const paid = monthly * months;
      const r = (this.rates[this.plan] ?? 0) / {{ $MONTHS }};
      const total = Math.round(r === 0 ? paid : (monthly * ((1 + r) ** months - 1)) / r);
      return { paid, total, growth: total - paid };
    },
    get share() { return this.result.total > 0 ? Math.round((this.result.paid / this.result.total) * 100) + '%' : '0%'; },
    notify(title, description, variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    sendLink() {
      const value = this.phone.replace(/[\s-]/g, '');
      if (!/^(\+62|62|0)8\d{8,11}$/.test(value)) { this.phoneError = 'Enter an Indonesian mobile number, like 0812 3456 7890.'; return; }
      this.phoneError = '';
      this.phone = '';
      this.notify('Download link sent', 'Check the SMS we sent to ' + value + '.', 'success');
    },
  }"
>
  <x-markas.navbar variant="floating" :sticky="true" :links="$nav" class="{{ $navbarEdge }}" x-on:click="if ($event.target.closest('[data-state=open] a')) open = false">
    <x-slot:brand>{{ $brand }}</x-slot:brand>
    <x-slot:actions>
      <a href="#download" class="{{ $navCta }}">Get started</a>
    </x-slot:actions>
  </x-markas.navbar>

  <main>
    <section aria-labelledby="tabungan-title" class="{{ $hero }}">
      <div>
        <h1 id="tabungan-title" class="{{ $h1 }}">Bigger plans, starting today</h1>
        <p class="{{ $heroLead }}">Save for the trip, the house, or the rainy day. Grow it in funds and gold when you are ready, all from Rp 10.000 and one app.</p>
        <div class="{{ $heroActions }}">
          <a href="#download" class="{{ $primaryLink }}">Get started{{ $icon('arrow', 'size-4') }}</a>
          <a href="#plan" class="{{ $secondaryLink }}">Try the simulator</a>
        </div>
        <dl class="{{ $statList }}">
          @foreach ($stats as $stat)
            <div class="{{ $statItem }}">
              <dt class="{{ $statLabel }}">{{ $stat['label'] }}</dt>
              <dd class="{{ $statValue }}">{{ $stat['value'] }}</dd>
            </div>
          @endforeach
        </dl>
      </div>
      <figure class="{{ $heroMedia }}">
        <img src="{{ $IMG }}/traveller.webp" alt="Smiling young woman with a backpack checking her phone at a train station" width="960" height="1120" decoding="async" class="{{ $heroImage }}" />
        <figcaption class="{{ $balanceCard }}">
          <div class="{{ $balanceHead }}">
            <span class="{{ $balanceLabel }}">My savings</span>
            <x-markas.badge variant="success" :dot="false">+12,5%</x-markas.badge>
          </div>
          <p class="{{ $balanceAmount }}">Rp 58.300.000</p>
          <div class="{{ $goalRow }}">
            <p class="{{ $goalText }}"><span>Trip to Japan</span><span>78% of Rp 75.000.000</span></p>
            <div class="{{ $goalTrack }}"><div class="{{ $goalBar }}"></div></div>
          </div>
        </figcaption>
      </figure>
    </section>

    <section id="save" aria-labelledby="tabungan-save" class="{{ $lifestyle }}">
      <div class="{{ $lifestylePanel }}">
        <img src="{{ $IMG }}/family-park.webp" alt="A family walking hand in hand along a tree-lined park path" width="1600" height="760" loading="lazy" decoding="async" class="{{ $lifestyleImage }}" />
        <div class="{{ $lifestyleHead }}">
          <h2 id="tabungan-save" class="{{ $lifestyleTitle }}">Save today to live better tomorrow</h2>
          <p class="{{ $lifestyleText }}">Small amounts, set aside often, add up to the things that matter. Tunas makes the habit automatic.</p>
        </div>
      </div>
      <ul class="{{ $pillarGrid }}">
        @foreach ($pillars as $pillar)
          <li class="{{ $pillarCard }}">
            <span class="{{ $pillarIcon }}">{{ $icon($pillar['icon'], 'size-5') }}</span>
            <h3 class="{{ $pillarTitle }}">{{ $pillar['title'] }}</h3>
            <p class="{{ $pillarText }}">{{ $pillar['text'] }}</p>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="plan" aria-labelledby="tabungan-plan" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="tabungan-plan" class="{{ $h2 }}">See where a monthly habit can take you</h2>
        <p class="{{ $lead }}">Pick an amount, a time frame, and how you want to grow it. The projection updates as you go.</p>
      </div>
      <div class="{{ $simGrid }}">
        <form class="{{ $simForm }}" aria-label="Savings simulator" x-on:submit.prevent>
          <x-markas.currency-input label="Monthly amount" name="monthly" :min="10000" :max="100000000" :value="$DEFAULT_MONTHLY" :presets="$presets" x-model="monthly" />
          <x-markas.slider label="Duration in years" name="years" :min="1" :max="20" :value="$DEFAULT_YEARS" x-model.number="years" />
          <div class="{{ $fieldGroup }}">
            <p class="{{ $fieldLabel }}">Expected return a year</p>
            <div class="{{ $filterScroll }}">
              <x-markas.toggle-group label="Expected return a year" :items="$plans" :value="$DEFAULT_PLAN" x-model="plan" />
            </div>
          </div>
        </form>
        <div class="{{ $simResult }}" aria-live="polite">
          <div>
            <p class="{{ $resultLabel }}">Projected total after <span data-sim-years="" x-text="yearsLabel(Number(years))">{{ $DEFAULT_YEARS }} years</span></p>
            <p data-sim-total="" class="{{ $resultAmount }}" x-text="rupiah(result.total)">{{ $rupiah($total) }}</p>
          </div>
          <div class="{{ $splitTrack }}" aria-hidden="true">
            <div class="{{ $splitPaid }}" style="width: {{ round($paid / $total * 100) }}%" x-bind:style="{ width: share }"></div>
          </div>
          <dl class="{{ $splitList }}">
            <div class="{{ $splitRow }}">
              <dt class="{{ $splitKey }}"><span class="{{ $dotPaid }}"></span>You put in</dt>
              <dd data-sim-paid="" class="{{ $splitValue }}" x-text="rupiah(result.paid)">{{ $rupiah($paid) }}</dd>
            </div>
            <div class="{{ $splitRow }}">
              <dt class="{{ $splitKey }}"><span class="{{ $dotGrowth }}"></span>Expected growth</dt>
              <dd data-sim-growth="" class="{{ $splitValue }}" x-text="rupiah(result.growth)">{{ $rupiah($total - $paid) }}</dd>
            </div>
          </dl>
          <x-markas.button size="lg" x-on:click="notify('Plan saved', rupiah(Number(monthly) || 0) + ' a month for ' + yearsLabel(Number(years)) + '. Finish sign-up in the app to start your first transfer.', 'success')">Start this plan</x-markas.button>
          <p class="{{ $simNote }}">Estimate only, compounded monthly. Fund and gold returns go up and down and are not guaranteed.</p>
        </div>
      </div>
    </section>

    <section id="invest" aria-labelledby="tabungan-invest" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="tabungan-invest" class="{{ $h2 }}">One app for saving and investing</h2>
        <p class="{{ $lead }}">Start with savings, add funds or gold when you are ready. Move between them any time.</p>
      </div>
      <ul class="{{ $productGrid }}">
        @foreach ($products as $product)
          <li data-product="{{ $product['id'] }}" class="{{ $productCard }}">
            <div class="{{ $productHead }}">
              <h3 class="{{ $productName }}">{{ $product['name'] }}</h3>
              @if ($product['tag'])
                <x-markas.badge variant="primary" :dot="false">{{ $product['tag'] }}</x-markas.badge>
              @endif
            </div>
            <div>
              <p class="{{ $productRate }}">{{ $product['rate'] }}</p>
              <p class="{{ $productUnit }}">{{ $product['unit'] }}</p>
            </div>
            <p class="{{ $productText }}">{{ $product['text'] }}</p>
            <ul class="{{ $featureList }}">
              @foreach ($product['features'] as $feature)
                <li class="{{ $featureItem }}">{{ $icon('check', $checkIcon) }}{{ $feature }}</li>
              @endforeach
            </ul>
            <x-markas.button :variant="$product['tag'] ? 'primary' : 'secondary'" x-on:click="notify('{{ $product['name'] }} selected', 'Open the Tunas app to finish in about two minutes.')">{{ $product['cta'] }}</x-markas.button>
          </li>
        @endforeach
      </ul>
    </section>

    <div id="about" class="{{ $trustWrap }}">
      <section aria-labelledby="tabungan-trust" class="{{ $trustBand }}">
        <div>
          <h2 id="tabungan-trust" class="{{ $trustTitle }}">Your money is protected</h2>
          <p class="{{ $trustText }}">PT Tunas Finansial Nusantara works with a custodian bank and licensed fund managers. We never lend out your savings.</p>
        </div>
        <ul class="{{ $trustGrid }}">
          @foreach ($trust as $item)
            <li class="{{ $trustItem }}">
              <span class="{{ $trustIcon }}">{{ $icon($item['icon'], 'size-5') }}</span>
              <div>
                <p class="{{ $trustName }}">{{ $item['name'] }}</p>
                <p class="{{ $trustNote }}">{{ $item['note'] }}</p>
              </div>
            </li>
          @endforeach
        </ul>
      </section>
    </div>

    <section id="advice" aria-labelledby="tabungan-faq" class="{{ $faqLayout }}">
      <div class="{{ $faqAside }}">
        <h2 id="tabungan-faq" class="{{ $h2 }}">Questions before you start</h2>
        <p class="{{ $lead }}">Not sure where to put your money? Our licensed advisors answer for free, with no sales targets.</p>
        <x-markas.button variant="secondary" x-on:click="notify('Advisor chat opened', 'A licensed advisor replies within 15 minutes, 08.00 to 22.00 WIB.')">Ask an advisor</x-markas.button>
      </div>
      <x-markas.faq :items="$faqs" :exclusive="true" class="{{ $faqList }}" />
    </section>

    <div id="download" class="{{ $appWrap }}">
      <section aria-labelledby="tabungan-app" class="{{ $appBand }}">
        <div>
          <h2 id="tabungan-app" class="{{ $appTitle }}">Your plans, in your pocket</h2>
          <p class="{{ $appText }}">Open an account in ten minutes with your e-KTP. Free on iPhone and Android.</p>
          <div class="{{ $storeRow }}">
            <x-markas.button variant="secondary" x-on:click="notify('Opening the iPhone store', 'Tunas is free to download. Sign-up takes about ten minutes.')">Download for iPhone</x-markas.button>
            <x-markas.button variant="secondary" x-on:click="notify('Opening the Android store', 'Tunas is free to download. Sign-up takes about ten minutes.')">Download for Android</x-markas.button>
          </div>
        </div>
        <form class="{{ $linkForm }}" novalidate x-on:submit.prevent="sendLink()">
          <label for="{{ $PHONE_ID }}" class="{{ $fieldLabel }}">Get the link by SMS</label>
          <div class="{{ $linkRow }}">
            <x-markas.input :id="$PHONE_ID" type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="0812 3456 7890" class="{{ $linkField }}" aria-describedby="{{ $PHONE_ID }}-note" x-model="phone" x-bind:aria-invalid="phoneError ? 'true' : null" />
            <x-markas.button type="submit" class="{{ $linkButton }}">Send link</x-markas.button>
          </div>
          <p id="{{ $PHONE_ID }}-note" x-bind:class="phoneError ? @js($fieldError) : @js($fieldHint)" x-text="phoneError || 'One SMS, no marketing messages.'">One SMS, no marketing messages.</p>
        </form>
      </section>
    </div>
  </main>

  <x-markas.footer class="{{ $footer }}" description="Savings, mutual funds, and digital gold for everyday plans in Indonesia." :columns="$footerColumns" :legal="$legal" copyright="© 2026 PT Tunas Finansial Nusantara. Built with MarkasUI.">
    <x-slot:brand>{{ $brand }}</x-slot:brand>
  </x-markas.footer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
