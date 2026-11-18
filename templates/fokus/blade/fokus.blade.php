@php
    // Kelas Tailwind dan data contoh, identik dengan versi React (satu blok JSON hasil salinan konstanta React).
    $data = json_decode(<<<'JSON'
    {"focusRing":"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","root":"relative min-h-dvh bg-canvas text-ink","container":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8","footerEdge":"px-[max(1rem,calc((100%-72rem)/2+2rem))]","navWrap":"dark absolute inset-x-6 top-6 z-30 sm:inset-x-10 sm:top-10 lg:inset-x-12 lg:top-12","navbar":"mx-auto max-w-4xl border-ink/15! bg-canvas/55! shadow-none! backdrop-blur-xl","brandLink":"flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","brandMark":"flex size-7 items-center justify-center rounded-full bg-ink text-canvas","startLink":"inline-flex h-9 items-center rounded-full bg-ink px-4 text-sm font-medium whitespace-nowrap text-canvas transition-colors duration-150 hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","frame":"dark m-2 rounded-[36px] border border-line bg-subtle p-2.5 pb-5 sm:m-3 sm:rounded-[44px] sm:p-4 sm:pb-8","windowPane":"relative isolate flex min-h-[660px] flex-col overflow-hidden rounded-[28px] ring-1 ring-ink/10 ring-inset sm:min-h-[720px] sm:rounded-[32px] lg:min-h-[760px]","heroImage":"absolute inset-0 -z-10 size-full object-cover object-[50%_70%]","heroShade":"absolute inset-0 -z-10 bg-linear-to-b from-canvas/70 via-canvas/55 via-45% to-canvas/55 sm:via-canvas/50 sm:to-canvas/15","heroBody":"flex flex-1 flex-col items-center px-5 pt-32 pb-6 text-center text-ink sm:px-10 sm:pt-40 sm:pb-10","chip":"inline-flex items-center gap-2 rounded-full border border-ink/15 bg-canvas/35 px-3 py-1.5 text-sm text-ink backdrop-blur-md","chipDot":"size-1.5 shrink-0 rounded-full bg-success","h1":"mt-6 max-w-3xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl","heroLead":"mt-5 max-w-xl text-lg leading-relaxed text-pretty text-ink text-shadow-sm text-shadow-canvas/60","heroForm":"mt-9 grid w-full max-w-md gap-2 text-left","heroRow":"grid gap-2 rounded-2xl border border-ink/15 bg-canvas/45 p-1.5 backdrop-blur-xl sm:grid-cols-[minmax(0,1fr)_auto] sm:rounded-full","heroField":"h-11! rounded-full! border-transparent! bg-transparent! px-4! text-base! placeholder:text-ink/70! aria-invalid:border-danger! sm:text-sm!","heroButton":"inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium whitespace-nowrap text-canvas transition-colors duration-150 hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","heroNote":"px-4 text-center text-sm text-ink","heroError":"px-4 text-center text-sm font-medium text-ink","sessionCard":"mt-auto hidden w-full max-w-sm items-center gap-4 rounded-2xl border border-ink/15 bg-canvas/45 p-4 text-left backdrop-blur-xl sm:flex","sessionRing":"flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink/20 border-t-ink text-xs font-semibold tabular-nums","sessionTitle":"text-sm font-semibold","sessionText":"text-sm text-ink/80","section":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-6 py-16 sm:py-24","sectionHead":"grid max-w-2xl gap-4","sectionCenter":"mx-auto grid max-w-2xl gap-4 text-center","h2":"text-3xl font-semibold tracking-tight text-balance sm:text-4xl","lead":"text-lg leading-relaxed text-pretty text-muted","howGrid":"grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16","howImage":"aspect-[4/5] w-full rounded-3xl bg-subtle object-cover lg:max-w-md","stepList":"mt-10 grid gap-8","stepItem":"grid grid-cols-[auto_minmax(0,1fr)] gap-4","stepNumber":"flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary tabular-nums","stepTitle":"text-lg font-semibold tracking-tight","stepText":"mt-1 text-base leading-relaxed text-pretty text-muted","bento":"mt-12 grid gap-4 lg:grid-cols-3","bentoCard":"flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8","bentoTitle":"text-lg font-semibold tracking-tight","bentoText":"mt-2 text-sm leading-relaxed text-pretty text-muted","batchList":"mt-auto grid gap-2","batchItem":"flex items-center justify-between gap-3 rounded-xl bg-subtle px-3 py-2.5 text-sm","batchApp":"font-medium","batchCount":"text-muted tabular-nums","timerBox":"mt-auto rounded-2xl bg-subtle p-5","timerValue":"text-4xl font-semibold tracking-tight tabular-nums","timerLabel":"mt-1 text-sm text-muted","timerTrack":"mt-4 h-1.5 overflow-hidden rounded-full bg-line","timerBar":"h-full w-[64%] rounded-full bg-primary","chart":"mt-auto grid gap-3","chartBars":"flex h-32 items-end gap-2","chartBar":"flex-1 rounded-md bg-primary","chartDays":"flex gap-2 text-center text-xs text-muted","chartDay":"flex-1","chartNote":"text-sm text-muted","previewGrid":"grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16","profileScroll":"mt-8 max-w-full overflow-x-auto","profileText":"mt-6 text-base leading-relaxed text-pretty text-muted","phoneWrap":"flex justify-center rounded-3xl bg-subtle px-4 py-10 sm:py-14","phone":"w-full max-w-[300px] rounded-[2.75rem] border border-line bg-surface p-2.5 shadow-overlay","screen":"grid gap-4 rounded-[2.25rem] bg-canvas px-5 pt-6 pb-7","screenTop":"flex items-center justify-between text-xs text-muted","screenTitle":"text-xl font-semibold tracking-tight","screenSub":"text-sm text-muted","screenCard":"grid gap-1 rounded-2xl bg-surface p-4","screenLabel":"text-xs text-muted","screenValue":"text-2xl font-semibold tracking-tight tabular-nums","allowList":"grid gap-2","allowItem":"flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-2.5 text-sm","storyGrid":"mt-12 grid gap-4 lg:grid-cols-3","storyCard":"flex h-full flex-col justify-between gap-8 rounded-3xl bg-subtle p-6 sm:p-8","quoteText":"text-base leading-relaxed text-pretty","person":"flex items-center gap-3","personName":"text-sm font-medium","personRole":"text-sm text-muted","pricingHead":"flex flex-wrap items-end justify-between gap-6","billingRow":"flex flex-wrap items-center gap-3","saveNote":"text-sm text-muted","planGrid":"mt-10 grid gap-4 lg:grid-cols-3","planCard":"flex flex-col rounded-3xl border border-line bg-surface p-6","planFeatured":"flex flex-col rounded-3xl border-2 border-primary bg-surface p-[23px]","planHead":"flex items-center justify-between gap-2","planName":"text-base font-semibold","planText":"mt-4 text-sm leading-relaxed text-muted","planPrice":"mt-6 flex items-baseline gap-1","planAmount":"text-3xl font-semibold tracking-tight","planUnit":"text-sm text-muted","planNote":"mt-1 text-sm text-muted","featureList":"mt-6 mb-8 grid flex-1 content-start gap-3 border-t border-line pt-6 text-sm","featureItem":"flex gap-2","featureIcon":"mt-0.5 size-4 shrink-0 text-primary","planButton":"w-full","faqLayout":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-6 py-16 sm:py-24 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16","faqAside":"grid content-start justify-items-start gap-4","faqList":"[&>div]:max-w-none [&>div]:gap-0","bandWrap":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24","band":"grid overflow-hidden rounded-3xl bg-subtle lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]","bandImage":"aspect-[4/3] size-full bg-line object-cover","bandBody":"grid content-center justify-items-start gap-4 p-6 sm:p-10 lg:p-14","bandTitle":"text-2xl font-semibold tracking-tight text-balance sm:text-3xl","bandText":"text-base leading-relaxed text-pretty text-muted","bandLink":"mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","footer":"px-[max(1rem,calc((100%-72rem)/2+2rem))] bg-canvas","icons":{"leaf":"M5 19c0-8 5-13 14-14-1 9-6 14-14 14Zm0 0 7-7","check":"m5 12.5 4.5 4.5L19 7.5"},"EMAIL_ID":"fokus-email","EMAIL_HINT":"Free during the beta. One email when your invite is ready.","EMAIL_ERROR":"Enter a valid email address, like nama@email.com.","nav":[{"label":"How it works","href":"#how"},{"label":"Features","href":"#features"},{"label":"Pricing","href":"#pricing"},{"label":"FAQ","href":"#faq"}],"steps":[{"title":"Choose what can wait","text":"Mark the apps and people that can always reach you. Everything else waits quietly in Teduh."},{"title":"Work in quiet blocks","text":"Start a session from your phone or laptop. Your status updates in team chat so nobody wonders where you went."},{"title":"Catch up in one batch","text":"Held notifications arrive together at times you pick, sorted by person and by how urgent they are."}],"batches":[{"app":"Team chat","count":"9 messages"},{"app":"Email","count":"14 emails"},{"app":"Delivery and rides","count":"4 updates"},{"app":"Social","count":"23 alerts"}],"week":[{"day":"Mon","bar":"h-[46%]"},{"day":"Tue","bar":"h-[72%]"},{"day":"Wed","bar":"h-[60%]"},{"day":"Thu","bar":"h-[88%]"},{"day":"Fri","bar":"h-[54%]"},{"day":"Sat","bar":"h-[22%]"},{"day":"Sun","bar":"h-[12%]"}],"profiles":[{"value":"work","label":"Deep work","text":"Only your calendar, favourite contacts, and mentions from your own team get through. Everything else waits for the noon batch.","title":"Deep work","sub":"Until 12.00, then one batch","stat":"2h 40m","statLabel":"Focused today","held":"18 held","allowed":[{"app":"Calendar","rule":"Meetings only"},{"app":"Phone","rule":"Favourites"},{"app":"Team chat","rule":"Mentions"}]},{"value":"evening","label":"Evening","text":"Work apps go silent at 18.00. Family groups and delivery updates still arrive, and everything else waits for tomorrow morning.","title":"Evening","sub":"18.00 to 07.00","stat":"0","statLabel":"Work pings after 18.00","held":"31 held","allowed":[{"app":"Family group","rule":"Always"},{"app":"Delivery and rides","rule":"Live orders"},{"app":"Phone","rule":"Everyone"}]},{"value":"weekend","label":"Weekend","text":"One batch on Saturday morning and one on Sunday evening. Your phone stays a phone for the rest of the weekend.","title":"Weekend","sub":"Batches at 09.00 and 19.00","stat":"2","statLabel":"Batches this weekend","held":"54 held","allowed":[{"app":"Phone","rule":"Favourites"},{"app":"Maps","rule":"Always"},{"app":"Bank","rule":"Security codes"}]}],"stories":[{"name":"Dimas Pratama","role":"Backend Engineer, Bandung","quote":"I used to check my phone every few minutes without noticing. After two weeks with Teduh my longest focus block went from 25 minutes to almost two hours."},{"name":"Laras Wulandari","role":"Founder of a wellbeing studio, Yogyakarta","quote":"We recommend Teduh to clients who say they cannot switch off. The evening profile alone changed how a lot of them sleep."},{"name":"Kevin Tanoto","role":"Head of Product, remote team of 40","quote":"Our team shares focus hours now. People know when to expect replies, so nobody feels guilty for not answering in five minutes."}],"billingOptions":[{"value":"monthly","label":"Monthly"},{"value":"yearly","label":"Yearly"}],"plans":[{"id":"free","name":"Free","tag":"","monthly":0,"yearly":0,"unit":"/month","text":"For trying a calmer phone on your own.","features":["One focus profile","Two batches a day","Seven days of reports"]},{"id":"plus","name":"Plus","tag":"Most chosen","monthly":39000,"yearly":31000,"unit":"/month","text":"For people who want their attention back for good.","features":["Unlimited profiles and batches","Laptop and phone in sync","Weekly focus report","Sleep and evening schedules"]},{"id":"teams","name":"Teams","tag":"","monthly":59000,"yearly":47000,"unit":"/member","text":"For remote teams that agree on quiet hours.","features":["Everything in Plus","Shared focus hours and status","Team report without personal data","Admin and invoices in Rupiah"]}],"faqs":[{"question":"Does Teduh read my messages?","answer":"No. Teduh only sees which app sent a notification and when. Message content stays on your phone and is never uploaded."},{"question":"Will I miss something urgent?","answer":"Calls from favourites, security codes, and anything you mark as urgent always come through. You can also let a contact break through by calling twice."},{"question":"Which devices are supported?","answer":"Android 10 and newer, iOS 17 and newer, and a desktop app for Windows and macOS that keeps your laptop in the same session."},{"question":"When does the beta open?","answer":"We invite people from the waitlist every week. Most invites go out within three weeks of signing up."},{"question":"Can my company pay for Teams?","answer":"Yes. Teams is billed per member in Rupiah, with tax invoices for Indonesian companies and a 30 day pilot for up to 20 people."}],"footerColumns":[{"title":"Product","links":[{"label":"How it works","href":"#how"},{"label":"Features","href":"#features"},{"label":"Pricing","href":"#pricing"}]},{"title":"Company","links":[{"label":"About","href":"/about"},{"label":"Blog","href":"/blog"},{"label":"Careers","href":"/careers"}]},{"title":"Support","links":[{"label":"FAQ","href":"#faq"},{"label":"Contact","href":"/contact"},{"label":"For teams","href":"#pricing"}]}],"legal":[{"label":"Privacy","href":"/privacy"},{"label":"Terms","href":"/terms"}]}
    JSON, true);
    extract($data);

    $icon = fn (string $name, string $class) => new Illuminate\Support\HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $rupiah = fn (int $value) => 'Rp '.number_format($value, 0, ',', '.');
    $planNoteOf = fn (array $plan, string $billing) => $plan['monthly'] === 0
        ? 'Free forever'
        : ($billing === 'yearly' ? 'Billed '.$rupiah($plan['yearly'] * 12).' a year' : 'Billed monthly, cancel anytime');
    $brand = new Illuminate\Support\HtmlString('<a href="#top" class="'.$brandLink.'"><span class="'.$brandMark.'">'.$icon('leaf', 'size-4').'</span>Teduh</a>');
    $profileItems = array_map(fn ($item) => ['value' => $item['value'], 'label' => $item['label']], $profiles);
    $profileData = array_column(array_map(fn ($item) => array_diff_key($item, ['allowed' => 0]), $profiles), null, 'value');
    $first = $profiles[0];
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  id="top"
  class="{{ $root }}"
  x-data="{
    profileId: @js($first['value']),
    profiles: @js($profileData),
    billing: 'monthly',
    email: '',
    emailError: '',
    init() {
      {{-- ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan pilihan sebelumnya. --}}
      this.$watch('profileId', (value, previous) => { if (!value) this.profileId = previous; });
      this.$watch('billing', (value, previous) => { if (!value) this.billing = previous; });
    },
    get profile() { return this.profiles[this.profileId] ?? this.profiles[@js($first['value'])]; },
    notify(title, description, variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    submit() {
      const value = this.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { this.emailError = @js($EMAIL_ERROR); return; }
      this.emailError = '';
      this.email = '';
      this.notify('You are on the waitlist', 'We will email ' + value + ' when your invite is ready.', 'success');
    },
  }"
>
  <div class="{{ $navWrap }}">
    <x-markas.navbar variant="floating" :links="$nav" class="{{ $navbar }}" x-on:click="if ($event.target.closest('[data-state=open] a')) open = false">
      <x-slot:brand>{{ $brand }}</x-slot:brand>
      <x-slot:actions>
        <a href="#join" class="{{ $startLink }}">Get started</a>
      </x-slot:actions>
    </x-markas.navbar>
  </div>

  <main>
    <section aria-labelledby="fokus-title" class="{{ $frame }}">
      <div class="{{ $windowPane }}">
        <img src="/template-images/fokus/hero-valley.webp" alt="Green valley with grassland and forest under mountains and a bright blue sky with white clouds" width="1600" height="1000" fetchpriority="high" decoding="async" class="{{ $heroImage }}" />
        <div aria-hidden="true" class="{{ $heroShade }}"></div>
        <div class="{{ $heroBody }}">
          <p class="{{ $chip }}"><span aria-hidden="true" class="{{ $chipDot }}"></span>Private beta for Android and iOS</p>
          <h1 id="fokus-title" class="{{ $h1 }}">Quiet your phone. Keep your focus.</h1>
          <p class="{{ $heroLead }}">Teduh holds back notifications while you work and delivers them in calm batches, so the important ones still reach you.</p>
          <form id="join" class="{{ $heroForm }}" novalidate x-on:submit.prevent="submit()">
            <label for="{{ $EMAIL_ID }}" class="sr-only">Email address</label>
            <div class="{{ $heroRow }}">
              <x-markas.input :id="$EMAIL_ID" type="email" name="email" autocomplete="email" placeholder="nama@email.com" class="{{ $heroField }}" aria-describedby="{{ $EMAIL_ID }}-note" x-model="email" x-bind:aria-invalid="emailError ? 'true' : null" />
              <button type="submit" class="{{ $heroButton }}">Join the waitlist</button>
            </div>
            <p id="{{ $EMAIL_ID }}-note" class="{{ $heroNote }}" x-bind:class="emailError ? @js($heroError) : @js($heroNote)" x-text="emailError || @js($EMAIL_HINT)">{{ $EMAIL_HINT }}</p>
          </form>
          <div class="{{ $sessionCard }}">
            <span aria-hidden="true" class="{{ $sessionRing }}">42m</span>
            <div>
              <p class="{{ $sessionTitle }}">Focus session, 42 minutes left</p>
              <p class="{{ $sessionText }}">Writing the Q1 plan. 14 notifications held until 11.00.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="how" aria-labelledby="fokus-how" class="{{ $section }}">
      <div class="{{ $howGrid }}">
        <img src="/template-images/fokus/desk-notebook.webp" alt="Open notebook on a bright white desk next to a closed laptop" width="640" height="800" loading="lazy" decoding="async" class="{{ $howImage }}" />
        <div>
          <div class="{{ $sectionHead }}">
            <h2 id="fokus-how" class="{{ $h2 }}">How Teduh gives you your mornings back</h2>
            <p class="{{ $lead }}">No app blocking and no willpower tricks. Teduh changes when notifications arrive, not whether they do.</p>
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
      </div>
    </section>

    <section id="features" aria-labelledby="fokus-features" class="{{ $section }}">
      <div class="{{ $sectionCenter }}">
        <h2 id="fokus-features" class="{{ $h2 }}">Fewer interruptions, without missing what matters</h2>
        <p class="{{ $lead }}">Three tools that work together on your phone and your laptop.</p>
      </div>
      <ul class="{{ $bento }}">
        <li class="{{ $bentoCard }}">
          <div>
            <h3 class="{{ $bentoTitle }}">Notification batching</h3>
            <p class="{{ $bentoText }}">Non-urgent alerts wait and arrive together at 09.00, 12.00, and 16.00, or whenever you choose.</p>
          </div>
          <ul class="{{ $batchList }}">
            @foreach ($batches as $batch)
              <li class="{{ $batchItem }}"><span class="{{ $batchApp }}">{{ $batch['app'] }}</span><span class="{{ $batchCount }}">{{ $batch['count'] }}</span></li>
            @endforeach
          </ul>
        </li>
        <li class="{{ $bentoCard }}">
          <div>
            <h3 class="{{ $bentoTitle }}">Focus sessions</h3>
            <p class="{{ $bentoText }}">Start a session with one tap. Your team chat status changes, and your laptop goes quiet at the same time.</p>
          </div>
          <div class="{{ $timerBox }}">
            <p class="{{ $timerValue }}">42:18</p>
            <p class="{{ $timerLabel }}">left in this session</p>
            <div class="{{ $timerTrack }}"><div class="{{ $timerBar }}"></div></div>
          </div>
        </li>
        <li class="{{ $bentoCard }}">
          <div>
            <h3 class="{{ $bentoTitle }}">Weekly reports</h3>
            <p class="{{ $bentoText }}">See when you focus best and which apps pull you away, in one short report every Monday.</p>
          </div>
          <div class="{{ $chart }}">
            <div aria-hidden="true" class="{{ $chartBars }}">
              @foreach ($week as $item)
                <div class="{{ $chartBar }} {{ $item['bar'] }}"></div>
              @endforeach
            </div>
            <div aria-hidden="true" class="{{ $chartDays }}">
              @foreach ($week as $item)
                <span class="{{ $chartDay }}">{{ $item['day'] }}</span>
              @endforeach
            </div>
            <p class="{{ $chartNote }}">14h 20m focused this week, up 3h from last week.</p>
          </div>
        </li>
      </ul>
    </section>

    <section id="preview" aria-labelledby="fokus-preview" class="{{ $section }}">
      <div class="{{ $previewGrid }}">
        <div>
          <div class="{{ $sectionHead }}">
            <h2 id="fokus-preview" class="{{ $h2 }}">A profile for every part of your day</h2>
            <p class="{{ $lead }}">Teduh switches profiles on its own based on time and place. Pick one to see what gets through.</p>
          </div>
          <div class="{{ $profileScroll }}">
            <x-markas.toggle-group label="Focus profiles" :items="$profileItems" :value="$first['value']" x-model="profileId" />
          </div>
          <p class="{{ $profileText }}" x-text="profile.text">{{ $first['text'] }}</p>
        </div>
        <div class="{{ $phoneWrap }}">
          <div data-profile="{{ $first['value'] }}" x-bind:data-profile="profileId" class="{{ $phone }}">
            <div class="{{ $screen }}">
              <div class="{{ $screenTop }}"><span>09.41</span><span x-text="profile.held">{{ $first['held'] }}</span></div>
              <div>
                <p data-screen-title="" class="{{ $screenTitle }}" x-text="profile.title">{{ $first['title'] }}</p>
                <p class="{{ $screenSub }}" x-text="profile.sub">{{ $first['sub'] }}</p>
              </div>
              <div class="{{ $screenCard }}">
                <p class="{{ $screenLabel }}" x-text="profile.statLabel">{{ $first['statLabel'] }}</p>
                <p class="{{ $screenValue }}" x-text="profile.stat">{{ $first['stat'] }}</p>
              </div>
              @foreach ($profiles as $item)
                <ul class="{{ $allowList }}" aria-label="Allowed to break through" x-show="profileId === @js($item['value'])" @if (! $loop->first) style="display: none" @endif>
                  @foreach ($item['allowed'] as $entry)
                    <li class="{{ $allowItem }}"><span>{{ $entry['app'] }}</span><x-markas.badge :dot="false">{{ $entry['rule'] }}</x-markas.badge></li>
                  @endforeach
                </ul>
              @endforeach
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="stories" aria-labelledby="fokus-stories" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="fokus-stories" class="{{ $h2 }}">From people in the beta</h2>
      </div>
      <ul class="{{ $storyGrid }}">
        @foreach ($stories as $story)
          <li>
            <figure class="{{ $storyCard }}">
              <blockquote class="{{ $quoteText }}">{{ $story['quote'] }}</blockquote>
              <figcaption class="{{ $person }}">
                <x-markas.avatar :name="$story['name']" size="md" />
                <div>
                  <p class="{{ $personName }}">{{ $story['name'] }}</p>
                  <p class="{{ $personRole }}">{{ $story['role'] }}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="pricing" aria-labelledby="fokus-pricing" class="{{ $section }}">
      <div class="{{ $pricingHead }}">
        <div class="{{ $sectionHead }}">
          <h2 id="fokus-pricing" class="{{ $h2 }}">Simple pricing, free while in beta</h2>
          <p class="{{ $lead }}">Everyone on the waitlist uses Plus for free until launch. Pick the plan you want afterwards.</p>
        </div>
        <div class="{{ $billingRow }}">
          <x-markas.toggle-group label="Billing period" :items="$billingOptions" value="monthly" x-model="billing" />
          <span class="{{ $saveNote }}">Save 20% with yearly</span>
        </div>
      </div>
      <ul class="{{ $planGrid }}">
        @foreach ($plans as $plan)
          <li data-plan="{{ $plan['id'] }}" class="{{ $plan['tag'] ? $planFeatured : $planCard }}">
            <div class="{{ $planHead }}">
              <h3 class="{{ $planName }}">{{ $plan['name'] }}</h3>
              @if ($plan['tag'])
                <x-markas.badge variant="primary" :dot="false">{{ $plan['tag'] }}</x-markas.badge>
              @endif
            </div>
            <p class="{{ $planText }}">{{ $plan['text'] }}</p>
            <p class="{{ $planPrice }}">
              <span data-price="" class="{{ $planAmount }}" x-text="billing === 'yearly' ? @js($rupiah($plan['yearly'])) : @js($rupiah($plan['monthly']))">{{ $rupiah($plan['monthly']) }}</span>
              <span class="{{ $planUnit }}">{{ $plan['unit'] }}</span>
            </p>
            <p class="{{ $planNote }}" x-text="billing === 'yearly' ? @js($planNoteOf($plan, 'yearly')) : @js($planNoteOf($plan, 'monthly'))">{{ $planNoteOf($plan, 'monthly') }}</p>
            <ul class="{{ $featureList }}">
              @foreach ($plan['features'] as $feature)
                <li class="{{ $featureItem }}">{{ $icon('check', $featureIcon) }}{{ $feature }}</li>
              @endforeach
            </ul>
            <x-markas.button :variant="$plan['tag'] ? 'primary' : 'secondary'" class="{{ $planButton }}" x-on:click="notify('{{ $plan['name'] }} plan selected', 'We saved your choice. It applies when your beta invite arrives.')">Choose {{ $plan['name'] }}</x-markas.button>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="faq" aria-labelledby="fokus-faq" class="{{ $faqLayout }}">
      <div class="{{ $faqAside }}">
        <h2 id="fokus-faq" class="{{ $h2 }}">Questions, answered</h2>
        <p class="{{ $lead }}">Something else on your mind? A real person from our team in Jakarta reads every message.</p>
        <x-markas.button variant="secondary" x-on:click="notify('Message sent', 'Our team replies within one working day, in English or Bahasa Indonesia.')">Ask a question</x-markas.button>
      </div>
      <x-markas.faq :items="$faqs" :exclusive="true" class="{{ $faqList }}" />
    </section>

    <div class="{{ $bandWrap }}">
      <section aria-labelledby="fokus-teams" class="{{ $band }}">
        <img src="/template-images/fokus/window-break.webp" alt="Person sitting by a large window in a warm home office, looking at snowy trees outside" width="800" height="600" loading="lazy" decoding="async" class="{{ $bandImage }}" />
        <div class="{{ $bandBody }}">
          <h2 id="fokus-teams" class="{{ $bandTitle }}">Quiet hours for the whole team</h2>
          <p class="{{ $bandText }}">Remote teams use Teduh to agree on focus hours, so replies can wait without anyone feeling ignored. Try it with your team for 30 days.</p>
          <a href="#join" class="{{ $bandLink }}">Join the waitlist</a>
        </div>
      </section>
    </div>
  </main>

  <x-markas.footer class="{{ $footer }}" description="A calmer phone for productivity, wellbeing, and remote work. Made in Jakarta." :columns="$footerColumns" :legal="$legal" copyright="© 2026 Teduh. Built with MarkasUI.">
    <x-slot:brand>{{ $brand }}</x-slot:brand>
  </x-markas.footer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
