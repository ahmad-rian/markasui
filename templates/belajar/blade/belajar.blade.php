@php
    // Kelas Tailwind dan data contoh, identik dengan versi React (satu blok JSON hasil salinan konstanta React).
    $data = json_decode(<<<'JSON'
    {"focusRing":"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","root":"min-h-dvh bg-canvas text-ink","container":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8","navbarEdge":"px-[max(0rem,calc((100%-70rem)/2))]","footerEdge":"px-[max(0rem,calc((100%-72rem)/2))]","brandLink":"flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","brandMark":"flex size-7 items-center justify-center rounded-lg bg-primary text-on-primary","signIn":"hidden h-8 items-center rounded-md px-3 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","startLink":"inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","heroLink":"inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","lottieInk":"[&_path]:stroke-current [&_path[fill^=rgb]]:fill-current [&_svg]:block","hero":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 grid items-center gap-12 pt-12 pb-16 sm:pt-20 lg:grid-cols-2 lg:gap-16 lg:pt-24 lg:pb-24","eyebrow":"flex items-center gap-2 text-sm text-muted","eyebrowDot":"size-1.5 shrink-0 rounded-full bg-primary","h1":"mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl","heroLead":"mt-5 max-w-xl text-lg leading-relaxed text-pretty text-muted","heroActions":"mt-8 flex flex-wrap gap-3","factList":"mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted","fact":"flex items-center gap-2","checkIcon":"size-4 shrink-0 text-primary","heroCard":"rounded-2xl border border-line bg-surface p-2 shadow-overlay","heroStage":"grid aspect-[4/3] place-items-center rounded-xl bg-primary-soft bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-size-[28px_28px] bg-center [--grid-line:color-mix(in_oklab,var(--color-primary)_8%,transparent)]","heroLottie":"size-[64%] text-primary [&_path]:stroke-current [&_path[fill^=rgb]]:fill-current [&_svg]:block","nextRow":"flex items-center gap-3 px-3 pt-4","nextLabel":"text-xs text-muted","nextTitle":"text-sm font-medium","progressRow":"flex items-center gap-3 px-3 pt-4 pb-3","progressTrack":"h-1.5 flex-1 overflow-hidden rounded-full bg-subtle","progressBar":"h-full w-3/8 rounded-full bg-primary","progressText":"text-xs whitespace-nowrap text-muted","logoWrap":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20","section":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-16 py-16 sm:py-24","sectionHead":"grid max-w-2xl gap-4","h2":"text-3xl font-semibold tracking-tight text-balance sm:text-4xl","lead":"text-lg leading-relaxed text-pretty text-muted","toolbar":"mt-10 flex flex-wrap items-center justify-between gap-4","filterScroll":"max-w-full overflow-x-auto","countText":"text-sm text-muted","courseGrid":"mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4","courseCard":"flex flex-col rounded-xl border border-line bg-surface","courseBody":"flex flex-1 flex-col p-5","courseTop":"flex items-center justify-between gap-2","topicText":"text-sm font-medium text-primary","courseTitle":"mt-4 text-lg leading-snug font-semibold tracking-tight","courseText":"mt-2 text-sm leading-relaxed text-pretty text-muted","courseMeta":"mt-auto pt-4 text-sm text-muted","courseFoot":"flex items-center justify-between gap-3 border-t border-line px-5 py-4","priceText":"text-base font-semibold","modalBody":"grid gap-5 text-ink","modalTitle":"mt-2 text-xl font-semibold tracking-tight","modalText":"mt-2 text-sm leading-relaxed text-muted","factGrid":"grid grid-cols-3 gap-2 text-sm","factCell":"rounded-lg bg-subtle p-3","factTerm":"text-xs text-muted","factValue":"mt-1 font-medium","projectBox":"rounded-lg border border-line p-4 text-sm","projectTerm":"font-medium","projectText":"mt-1 leading-relaxed text-muted","modalMentor":"flex items-center justify-between gap-4","person":"flex items-center gap-3","personName":"text-sm font-medium","personRole":"text-sm text-muted","modalPrice":"text-lg font-semibold whitespace-nowrap","stepGrid":"mt-12 grid gap-10 md:grid-cols-3 md:gap-8","stepArt":"flex size-28 items-center justify-center rounded-xl border border-line bg-surface","stepLottie":"size-24 text-ink [&_path]:stroke-current [&_path[fill^=rgb]]:fill-current [&_svg]:block","stepLabel":"mt-6 text-sm font-medium text-primary","stepTitle":"mt-2 text-lg font-semibold tracking-tight","stepText":"mt-2 text-base leading-relaxed text-pretty text-muted","mentorGrid":"mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4","mentorCard":"grid content-start gap-4 rounded-xl border border-line bg-surface p-5","mentorName":"text-base font-semibold","mentorBio":"text-sm leading-relaxed text-pretty text-muted","mentorTeaches":"border-t border-line pt-4 text-sm text-muted","storyGrid":"mt-12 grid gap-4 lg:grid-cols-3","storyCard":"flex h-full flex-col justify-between gap-8 rounded-xl bg-subtle p-6","quoteText":"text-base leading-relaxed text-pretty","pricingHead":"flex flex-wrap items-end justify-between gap-6","billingRow":"flex flex-wrap items-center gap-3","saveNote":"text-sm text-muted","planGrid":"mt-10 grid gap-4 lg:grid-cols-3","planCard":"flex flex-col rounded-xl border border-line bg-surface p-6","planFeatured":"flex flex-col rounded-xl border-2 border-primary bg-surface p-[23px]","planHead":"flex items-center justify-between gap-2","planName":"text-base font-semibold","planPrice":"mt-6 flex items-baseline gap-1","planAmount":"text-3xl font-semibold tracking-tight","planUnit":"text-sm text-muted","planNote":"mt-1 text-sm text-muted","planText":"mt-4 text-sm leading-relaxed text-muted","featureList":"mt-6 mb-8 grid flex-1 content-start gap-3 border-t border-line pt-6 text-sm","featureItem":"flex gap-2","featureIcon":"mt-0.5 size-4 shrink-0 text-primary","planButton":"w-full","faqLayout":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-16 py-16 sm:py-24 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16","faqAside":"grid content-start justify-items-start gap-4","faqList":"[&>div]:max-w-none [&>div]:gap-0","bandWrap":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24","band":"grid gap-8 rounded-2xl bg-subtle p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12","bandTitle":"text-2xl font-semibold tracking-tight text-balance sm:text-3xl","bandText":"mt-3 text-base leading-relaxed text-pretty text-muted","form":"grid gap-2","fieldLabel":"text-sm font-medium","fieldRow":"flex flex-col gap-2 sm:flex-row","field":"h-11 bg-surface text-base sm:text-sm","fieldButton":"h-11 shrink-0","fieldError":"text-sm text-danger","fieldHint":"text-sm text-muted","footer":"px-[max(0rem,calc((100%-72rem)/2))] bg-canvas","icons":{"book":"M4 6.5c2.5-1.3 5-1.3 8 .7 3-2 5.5-2 8-.7v11c-2.5-1.3-5-1.3-8 .7-3-2-5.5-2-8-.7zM12 7.2v11","check":"m5 12.5 4.5 4.5L19 7.5","arrow":"M5 12h14m-6-6 6 6-6 6"},"TITLE":"Learn the job from people who do it","MODAL_ID":"belajar-course-modal","EMAIL_ID":"belajar-email","nav":[{"label":"Courses","href":"#courses"},{"label":"How it works","href":"#how"},{"label":"Mentors","href":"#mentors"},{"label":"Pricing","href":"#pricing"},{"label":"FAQ","href":"#faq"}],"heroFacts":["8 to 10 weeks","2 live sessions a week","Reviewed final project"],"logos":[{"name":"Sagara","path":"M3 15a9 9 0 0 1 18 0Z"},{"name":"Kopi Kita","path":"M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"},{"name":"Nusantara Labs","path":"M12 2 21 7v10l-9 5-9-5V7Z"},{"name":"Arunika","path":"M12 3 22 20H2Z"},{"name":"Lumbung","path":"M12 2 22 12 12 22 2 12Z"},{"name":"Teras Data","path":"M4 4h7v16H4ZM13 9h7v11h-7Z"}],"topics":[{"value":"all","label":"All"},{"value":"data","label":"Data"},{"value":"product","label":"Product"},{"value":"design","label":"Design"},{"value":"marketing","label":"Marketing"}],"mentors":[{"id":"rina","name":"Rina Siregar","role":"Senior Data Analyst","bio":"Nine years of analytics in retail and fintech. Still writes SQL every morning."},{"id":"ayu","name":"Ayu Lestari","role":"Group Product Manager","bio":"Has shipped payment and lending products used by millions of Indonesians."},{"id":"nadia","name":"Nadia Putri","role":"Lead Product Designer","bio":"Runs a design team of twelve and hires junior designers every year."},{"id":"bayu","name":"Bayu Saputra","role":"Head of Growth","bio":"Grew two consumer apps from launch to their first million users."}],"courses":[{"id":"sql","title":"SQL for data analysis","topic":"data","level":"Beginner","weeks":8,"starts":"12 Jan","price":2400000,"mentor":"rina","text":"Query real sales data, join messy tables, and answer the questions your manager asks every week.","project":"A weekly sales report built from a retail dataset of 2 million orders."},{"id":"python","title":"Python for analysts","topic":"data","level":"Intermediate","weeks":10,"starts":"2 Feb","price":3200000,"mentor":"rina","text":"Clean data with pandas, automate the spreadsheets you rebuild by hand, and chart the results.","project":"A notebook that cleans, analyses, and charts a year of ride booking data."},{"id":"pm","title":"Product management fundamentals","topic":"product","level":"Beginner","weeks":10,"starts":"19 Jan","price":3500000,"mentor":"ayu","text":"Find the problem worth solving, write a clear spec, and work with engineers and designers.","project":"A product spec and launch plan for a feature in an app you use daily."},{"id":"experiments","title":"Product analytics and experiments","topic":"product","level":"Intermediate","weeks":8,"starts":"9 Feb","price":2900000,"mentor":"ayu","text":"Choose the right metrics, design A/B tests, and explain the results to people who decide.","project":"An experiment plan and readout for a checkout flow change."},{"id":"figma","title":"UI design with Figma","topic":"design","level":"Beginner","weeks":8,"starts":"12 Jan","price":2700000,"mentor":"nadia","text":"Layout, type, and components in Figma, from the first wireframe to a clickable prototype.","project":"A mobile app redesign with a small component library."},{"id":"research","title":"UX research in practice","topic":"design","level":"Intermediate","weeks":6,"starts":"26 Jan","price":2200000,"mentor":"nadia","text":"Plan interviews, run usability tests, and turn what you hear into decisions a team can act on.","project":"A usability study with five participants and a findings report."},{"id":"ads","title":"Performance marketing","topic":"marketing","level":"Beginner","weeks":8,"starts":"19 Jan","price":2500000,"mentor":"bayu","text":"Plan paid campaigns, set budgets, and read the numbers that show what is working.","project":"A one month campaign plan with budget, targeting, and reporting."},{"id":"seo","title":"Content strategy and SEO","topic":"marketing","level":"Beginner","weeks":6,"starts":"2 Feb","price":1900000,"mentor":"bayu","text":"Research what people search for, plan a content calendar, and write pages that rank.","project":"A three month content plan and two published articles."}],"SCHEDULE":"Tue and Thu, 19.30 WIB","steps":[{"lottie":"study","label":"At your own pace","title":"Watch and read before class","text":"Short lessons of 15 to 20 minutes that fit a commute. Each one ends with a small exercise."},{"lottie":"mentor","label":"Live, twice a week","title":"Work through it with a mentor","text":"Evening sessions with your mentor and up to 24 classmates. Bring your questions and your exercise."},{"lottie":"certificate","label":"Final two weeks","title":"Finish with a reviewed project","text":"Your mentor reviews your project in detail. Pass the review to get a certificate with a public link."}],"stories":[{"name":"Putri Anggraini","role":"Data Analyst, Medan","course":"SQL for data analysis","quote":"I used to build reports by hand in Excel. Eight weeks later I wrote the queries for our weekly sales review, and the notes on my project were more useful than anything I had read online."},{"name":"Fajar Ramadhan","role":"Associate Product Manager, Jakarta","course":"Product management fundamentals","quote":"The live sessions felt like a real product team. We argued about scope, wrote specs, and got honest feedback. I talked about my final project in three interviews."},{"name":"Melati Kusuma","role":"UI Designer, Bandung","course":"UI design with Figma","quote":"I could follow along after work, and the recordings saved me twice when my shift ran late. Nadia reviewed every screen I made, not just the final one."}],"billingOptions":[{"value":"monthly","label":"Monthly"},{"value":"yearly","label":"Yearly"}],"plans":[{"id":"free","name":"Free","tag":"","monthly":0,"yearly":0,"text":"Try the format before you commit.","features":["One free lesson from every course","Community forum","Monthly live Q&A with a mentor"]},{"id":"plus","name":"Plus","tag":"","monthly":249000,"yearly":199000,"text":"Self-paced learning across every course.","features":["All recorded lessons and exercises","Project templates and datasets","Certificates for self-paced tracks"]},{"id":"cohort","name":"Cohort","tag":"Most chosen","monthly":899000,"yearly":719000,"text":"Live cohorts with a mentor, all year.","features":["Everything in Plus","Join any live cohort, one at a time","Mentor review of every project","A career session with a recruiter"]}],"faqs":[{"question":"Do I need experience before joining?","answer":"Not for beginner courses. Intermediate courses list what you should know first, and a short placement quiz tells you if you are ready."},{"question":"How much time does a course take each week?","answer":"Plan for six to eight hours: two live sessions of 90 minutes, plus lessons and exercises at your own pace."},{"question":"What if I miss a live session?","answer":"Every session is recorded and posted within a few hours. Your mentor also answers questions in the cohort chat."},{"question":"Can my company pay for the course?","answer":"Yes. We issue invoices with full tax details and offer team plans for five or more people."},{"question":"Can I get a refund?","answer":"Yes. You get a full refund if you cancel before the end of the first week of your cohort."}],"footerColumns":[{"title":"Learn","links":[{"label":"Courses","href":"#courses"},{"label":"How it works","href":"#how"},{"label":"Pricing","href":"#pricing"}]},{"title":"Company","links":[{"label":"About","href":"/about"},{"label":"Mentors","href":"#mentors"},{"label":"Careers","href":"/careers"}]},{"title":"Support","links":[{"label":"FAQ","href":"#faq"},{"label":"Contact","href":"/contact"},{"label":"For teams","href":"/teams"}]}],"legal":[{"label":"Privacy","href":"/privacy"},{"label":"Terms","href":"/terms"}]}
    JSON, true);
    extract($data);

    $icon = fn (string $name, string $class) => new Illuminate\Support\HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $rupiah = fn (int $value) => 'Rp '.number_format($value, 0, ',', '.');
    $mentorById = array_column($mentors, null, 'id');
    $topicLabels = array_column($topics, 'label', 'value');
    $coursesBy = fn (string $id) => implode(', ', array_column(array_filter($courses, fn ($course) => $course['mentor'] === $id), 'title'));
    $planNoteOf = fn (array $plan, string $billing) => $plan['monthly'] === 0
        ? 'No card needed'
        : ($billing === 'yearly' ? 'Billed '.$rupiah($plan['yearly'] * 12).' a year' : 'Billed monthly, cancel anytime');
    // Data kursus untuk modal: teks dan harga yang sudah diformat.
    $courseData = array_map(fn ($course) => [
        'id' => $course['id'], 'title' => $course['title'], 'topic' => $course['topic'], 'topicLabel' => $topicLabels[$course['topic']],
        'level' => $course['level'], 'text' => $course['text'], 'weeks' => $course['weeks'].' weeks', 'starts' => $course['starts'],
        'project' => $course['project'], 'mentor' => $course['mentor'], 'price' => $rupiah($course['price']),
    ], $courses);
    $total = count($courses);
    $brand = new Illuminate\Support\HtmlString('<a href="#top" class="'.$brandLink.'"><span class="'.$brandMark.'">'.$icon('book', 'size-4').'</span>Benak</a>');
    // Lottie: butuh window.loadLottie yang mengembalikan lottie-web (lihat templates/belajar/lottie/CREDITS.md).
    $lottie = <<<'JS'
    {
      animation: null,
      observer: null,
      async init() {
        const load = window.loadLottie;
        if (!load) return;
        try {
          const [lottie, data] = await Promise.all([
            load(),
            fetch(this.$el.dataset.src).then((response) => {
              if (!response.ok) throw new Error(response.statusText);
              return response.json();
            }),
          ]);
          if (!this.$el.isConnected) return;
          const item = lottie.loadAnimation({ container: this.$el, renderer: 'svg', loop: false, autoplay: false, animationData: data });
          this.animation = item;
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
            item.goToAndStop(item.totalFrames - 1, true);
          } else {
            this.observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? item.play() : item.pause()), { threshold: 0.4 });
            this.observer.observe(this.$el);
          }
          this.$el.dataset.lottie = 'ready';
        } catch {
          this.$el.dataset.lottie = 'error';
        }
      },
      destroy() {
        this.observer?.disconnect();
        this.animation?.destroy();
      },
    }
    JS;
    $lottieBox = fn (string $name, string $class) => new Illuminate\Support\HtmlString(
        '<div x-data="'.e($lottie).'" data-src="/lottie/belajar/'.$name.'.json" data-lottie-name="'.$name.'" aria-hidden="true" class="'.$class.'"></div>'
    );
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  id="top"
  class="{{ $root }}"
  x-data="{
    topic: 'all',
    billing: 'monthly',
    courses: @js($courseData),
    selected: @js($courseData[0]),
    email: '',
    emailError: '',
    init() {
      {{-- ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan pilihan sebelumnya. --}}
      this.$watch('topic', (value, previous) => { if (!value) this.topic = previous; });
      this.$watch('billing', (value, previous) => { if (!value) this.billing = previous; });
    },
    get visibleCount() { return this.courses.filter((course) => this.topic === 'all' || course.topic === this.topic).length; },
    notify(title, description, variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    openCourse(id) { this.selected = this.courses.find((course) => course.id === id); document.getElementById(@js($MODAL_ID)).showModal(); },
    onModalClose(dialog) {
      if (dialog.returnValue === 'apply') this.notify('Application started', 'We saved a seat for you in ' + this.selected.title + '. Finish your application within 48 hours.', 'success');
      dialog.returnValue = '';
    },
    submit() {
      const value = this.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { this.emailError = 'Enter a valid email address, like nama@email.com.'; return; }
      this.emailError = '';
      this.email = '';
      this.notify('You are subscribed', 'The first lesson is on its way to ' + value + '.', 'success');
    },
  }"
>
  <x-markas.navbar variant="blur" :sticky="true" :links="$nav" class="{{ $navbarEdge }}" x-on:click="if ($event.target.closest('[data-state=open] a')) open = false">
    <x-slot:brand>{{ $brand }}</x-slot:brand>
    <x-slot:actions>
      <a href="/login" class="{{ $signIn }}">Sign in</a>
      <a href="#courses" class="{{ $startLink }}">Start learning</a>
    </x-slot:actions>
  </x-markas.navbar>

  <main>
    <section aria-labelledby="belajar-title" class="{{ $hero }}">
      <div>
        <p class="{{ $eyebrow }}"><span aria-hidden="true" class="{{ $eyebrowDot }}"></span>Next cohorts start 12 January 2027</p>
        <h1 id="belajar-title" class="{{ $h1 }}">{{ $TITLE }}</h1>
        <p class="{{ $heroLead }}">Live, mentor-led courses in data, product, design, and marketing. Small cohorts, weekly projects, and feedback in Bahasa Indonesia, planned around a full-time job.</p>
        <div class="{{ $heroActions }}">
          <a href="#courses" class="{{ $heroLink }}">Browse courses{{ $icon('arrow', 'size-4') }}</a>
          <x-markas.button variant="secondary" size="lg" x-on:click="notify('Free lesson unlocked', 'Lesson 1 of SQL for data analysis is ready. It takes about 15 minutes.')">Try a free lesson</x-markas.button>
        </div>
        <ul class="{{ $factList }}">
          @foreach ($heroFacts as $item)
            <li class="{{ $fact }}">{{ $icon('check', $checkIcon) }}{{ $item }}</li>
          @endforeach
        </ul>
      </div>
      <figure class="{{ $heroCard }}">
        <div class="{{ $heroStage }}">{{ $lottieBox('hero', $heroLottie) }}</div>
        <figcaption>
          <div class="{{ $nextRow }}">
            <x-markas.avatar name="Rina Siregar" size="sm" />
            <div>
              <p class="{{ $nextLabel }}">Up next in your cohort</p>
              <p class="{{ $nextTitle }}">Live review: joining sales tables</p>
              <p class="{{ $nextLabel }}">Thursday, 19.30 WIB with Rina Siregar</p>
            </div>
          </div>
          <div class="{{ $progressRow }}">
            <div class="{{ $progressTrack }}"><div class="{{ $progressBar }}"></div></div>
            <span class="{{ $progressText }}">Week 3 of 8</span>
          </div>
        </figcaption>
      </figure>
    </section>

    <div class="{{ $logoWrap }}">
      <x-markas.logo-cloud title="Our graduates work at teams like these" :logos="$logos" />
    </div>

    <section id="courses" aria-labelledby="belajar-courses" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="belajar-courses" class="{{ $h2 }}">Pick a course that fits your week</h2>
        <p class="{{ $lead }}">Every course runs as a cohort of up to 24 people, with two live evening sessions a week and a project you keep.</p>
      </div>
      <div class="{{ $toolbar }}">
        <div class="{{ $filterScroll }}">
          <x-markas.toggle-group label="Filter courses by topic" :items="$topics" value="all" x-model="topic" />
        </div>
        <p aria-live="polite" class="{{ $countText }}" x-text="topic === 'all' ? 'Showing all {{ $total }} courses' : 'Showing ' + visibleCount + ' of {{ $total }} courses'">Showing all {{ $total }} courses</p>
      </div>
      <ul class="{{ $courseGrid }}">
        @foreach ($courses as $course)
          <li data-course="{{ $course['id'] }}" class="{{ $courseCard }}" x-show="topic === 'all' || topic === @js($course['topic'])">
            <div class="{{ $courseBody }}">
              <div class="{{ $courseTop }}">
                <span class="{{ $topicText }}">{{ $topicLabels[$course['topic']] }}</span>
                <x-markas.badge :dot="false">{{ $course['level'] }}</x-markas.badge>
              </div>
              <h3 class="{{ $courseTitle }}">{{ $course['title'] }}</h3>
              <p class="{{ $courseText }}">{{ $course['text'] }}</p>
              <p class="{{ $courseMeta }}">{{ $course['weeks'] }} weeks, starts {{ $course['starts'] }}</p>
            </div>
            <div class="{{ $courseFoot }}">
              <span class="{{ $priceText }}">{{ $rupiah($course['price']) }}</span>
              <x-markas.button variant="secondary" size="sm" aria-label="Details, {{ $course['title'] }}" x-on:click="openCourse('{{ $course['id'] }}')">Details</x-markas.button>
            </div>
          </li>
        @endforeach
      </ul>
      <x-markas.modal :id="$MODAL_ID" title="Course details" x-on:close="onModalClose($event.currentTarget)">
        <div class="{{ $modalBody }}">
          <div>
            <div class="{{ $courseTop }}">
              <span class="{{ $topicText }}" x-text="selected.topicLabel">{{ $courseData[0]['topicLabel'] }}</span>
              <x-markas.badge :dot="false"><span x-text="selected.level">{{ $courseData[0]['level'] }}</span></x-markas.badge>
            </div>
            <p data-modal-title="" class="{{ $modalTitle }}" x-text="selected.title">{{ $courseData[0]['title'] }}</p>
            <p class="{{ $modalText }}" x-text="selected.text">{{ $courseData[0]['text'] }}</p>
          </div>
          <dl class="{{ $factGrid }}">
            <div class="{{ $factCell }}"><dt class="{{ $factTerm }}">Length</dt><dd class="{{ $factValue }}" x-text="selected.weeks">{{ $courseData[0]['weeks'] }}</dd></div>
            <div class="{{ $factCell }}"><dt class="{{ $factTerm }}">Starts</dt><dd class="{{ $factValue }}" x-text="selected.starts">{{ $courseData[0]['starts'] }}</dd></div>
            <div class="{{ $factCell }}"><dt class="{{ $factTerm }}">Live</dt><dd class="{{ $factValue }}">{{ $SCHEDULE }}</dd></div>
          </dl>
          <div class="{{ $projectBox }}">
            <p class="{{ $projectTerm }}">What you will build</p>
            <p class="{{ $projectText }}" x-text="selected.project">{{ $courseData[0]['project'] }}</p>
          </div>
          <div class="{{ $modalMentor }}">
            @foreach ($mentors as $mentor)
              <div class="{{ $person }}" x-show="selected.mentor === @js($mentor['id'])" @if (! $loop->first) style="display: none" @endif>
                <x-markas.avatar :name="$mentor['name']" size="sm" />
                <div>
                  <p class="{{ $personName }}">{{ $mentor['name'] }}</p>
                  <p class="{{ $personRole }}">{{ $mentor['role'] }}</p>
                </div>
              </div>
            @endforeach
            <p class="{{ $modalPrice }}" x-text="selected.price">{{ $courseData[0]['price'] }}</p>
          </div>
        </div>
        <x-slot:footer>
          <x-markas.button variant="secondary" type="submit" value="cancel">Close</x-markas.button>
          <x-markas.button type="submit" value="apply">Apply for this cohort</x-markas.button>
        </x-slot:footer>
      </x-markas.modal>
    </section>

    <section id="how" aria-labelledby="belajar-how" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="belajar-how" class="{{ $h2 }}">How a course works</h2>
        <p class="{{ $lead }}">About six to eight hours a week, most of it in the evening. You learn on your own first, then practise with people.</p>
      </div>
      <ol class="{{ $stepGrid }}">
        @foreach ($steps as $step)
          <li>
            <div class="{{ $stepArt }}">{{ $lottieBox($step['lottie'], $stepLottie) }}</div>
            <p class="{{ $stepLabel }}">{{ $step['label'] }}</p>
            <h3 class="{{ $stepTitle }}">{{ $step['title'] }}</h3>
            <p class="{{ $stepText }}">{{ $step['text'] }}</p>
          </li>
        @endforeach
      </ol>
    </section>

    <section id="mentors" aria-labelledby="belajar-mentors" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="belajar-mentors" class="{{ $h2 }}">Taught by people who still do the work</h2>
        <p class="{{ $lead }}">Every mentor works in the field they teach and leads at most two cohorts a year.</p>
      </div>
      <ul class="{{ $mentorGrid }}">
        @foreach ($mentors as $mentor)
          <li class="{{ $mentorCard }}">
            <x-markas.avatar :name="$mentor['name']" size="lg" />
            <div>
              <h3 class="{{ $mentorName }}">{{ $mentor['name'] }}</h3>
              <p class="{{ $personRole }}">{{ $mentor['role'] }}</p>
            </div>
            <p class="{{ $mentorBio }}">{{ $mentor['bio'] }}</p>
            <p class="{{ $mentorTeaches }}">Teaches {{ $coursesBy($mentor['id']) }}</p>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="stories" aria-labelledby="belajar-stories" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="belajar-stories" class="{{ $h2 }}">From recent graduates</h2>
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
                  <p class="{{ $personRole }}">{{ $story['role'] }}, {{ $story['course'] }}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="pricing" aria-labelledby="belajar-pricing" class="{{ $section }}">
      <div class="{{ $pricingHead }}">
        <div class="{{ $sectionHead }}">
          <h2 id="belajar-pricing" class="{{ $h2 }}">Pay per course, or learn all year</h2>
          <p class="{{ $lead }}">Course prices above are one-time. A membership suits you if you plan to keep learning.</p>
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
              <span class="{{ $planUnit }}">/month</span>
            </p>
            <p class="{{ $planNote }}" x-text="billing === 'yearly' ? @js($planNoteOf($plan, 'yearly')) : @js($planNoteOf($plan, 'monthly'))">{{ $planNoteOf($plan, 'monthly') }}</p>
            <ul class="{{ $featureList }}">
              @foreach ($plan['features'] as $feature)
                <li class="{{ $featureItem }}">{{ $icon('check', $featureIcon) }}{{ $feature }}</li>
              @endforeach
            </ul>
            <x-markas.button :variant="$plan['tag'] ? 'primary' : 'secondary'" class="{{ $planButton }}" x-on:click="notify('{{ $plan['name'] }} plan selected', 'Checkout opens in the next step. You can switch plans later.')">Choose {{ $plan['name'] }}</x-markas.button>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="faq" aria-labelledby="belajar-faq" class="{{ $faqLayout }}">
      <div class="{{ $faqAside }}">
        <h2 id="belajar-faq" class="{{ $h2 }}">Questions, answered</h2>
        <p class="{{ $lead }}">Not sure which course fits? An advisor can look at your goals and suggest one.</p>
        <x-markas.button variant="secondary" x-on:click="notify('Chat opened', 'An advisor usually replies within 10 minutes, 09.00 to 21.00 WIB.')">Chat with an advisor</x-markas.button>
      </div>
      <x-markas.faq :items="$faqs" :exclusive="true" class="{{ $faqList }}" />
    </section>

    <div class="{{ $bandWrap }}">
      <section aria-labelledby="belajar-newsletter" class="{{ $band }}">
        <div>
          <h2 id="belajar-newsletter" class="{{ $bandTitle }}">One free lesson every Tuesday</h2>
          <p class="{{ $bandText }}">A ten minute lesson from one of our mentors, with an exercise you can finish over coffee.</p>
        </div>
        <form class="{{ $form }}" novalidate x-on:submit.prevent="submit()">
          <label for="{{ $EMAIL_ID }}" class="{{ $fieldLabel }}">Email address</label>
          <div class="{{ $fieldRow }}">
            <x-markas.input :id="$EMAIL_ID" type="email" name="email" autocomplete="email" placeholder="nama@email.com" class="{{ $field }}" aria-describedby="{{ $EMAIL_ID }}-note" x-model="email" x-bind:aria-invalid="emailError ? 'true' : null" />
            <x-markas.button type="submit" class="{{ $fieldButton }}">Subscribe</x-markas.button>
          </div>
          <p id="{{ $EMAIL_ID }}-note" class="{{ $fieldHint }}" x-bind:class="emailError ? @js($fieldError) : @js($fieldHint)" x-text="emailError || 'One email a week. Unsubscribe in one click.'">One email a week. Unsubscribe in one click.</p>
        </form>
      </section>
    </div>
  </main>

  <x-markas.footer class="{{ $footer }}" description="Live online courses for working professionals in Indonesia." :columns="$footerColumns" :legal="$legal" copyright="© 2026 Benak. Built with MarkasUI.">
    <x-slot:brand>{{ $brand }}</x-slot:brand>
  </x-markas.footer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
