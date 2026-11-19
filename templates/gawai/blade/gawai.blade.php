@php
    // Kelas Tailwind dan data contoh, identik dengan versi React (satu blok JSON hasil salinan konstanta React).
    $data = json_decode(<<<'JSON'
    {"focusRing":"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","root":"min-h-dvh bg-canvas text-ink","container":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8","navbarEdge":"bg-canvas/80 px-[max(0rem,calc((100%-70rem)/2))]","footerEdge":"px-[max(1rem,calc((100%-72rem)/2))]","brandLink":"flex items-center gap-2 rounded-md text-base font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","brandMark":"flex size-7 items-center justify-center rounded-full bg-primary text-on-primary","navActions":"flex items-center gap-1","iconButton":"relative inline-flex size-9 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","iconSize":"size-5","countBadge":"absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] leading-4 font-semibold text-on-primary","hero":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6","heroCard":"relative grid overflow-hidden rounded-[2rem] bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]","heroCopy":"relative z-10 flex flex-col justify-center gap-6 p-6 pt-10 sm:p-12 lg:py-20 lg:pr-0 lg:pl-14","kicker":"text-sm font-medium text-primary","h1":"text-5xl leading-[0.95] font-semibold tracking-tighter text-balance sm:text-7xl lg:text-8xl","heroLead":"max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg","heroActions":"flex flex-wrap items-center gap-3","primaryLink":"inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","ghostButton":"h-12 rounded-full! px-5 text-base","heroMedia":"relative min-h-80 sm:min-h-[28rem] lg:min-h-0","heroImage":"absolute inset-0 size-full object-cover object-[60%_50%] lg:scale-110","heroChip":"absolute right-4 bottom-4 flex items-center gap-3 rounded-2xl bg-surface/90 p-2 pr-4 shadow-overlay backdrop-blur-md sm:right-6 sm:bottom-6","chipImage":"size-14 rounded-xl object-cover","chipName":"text-sm font-medium","chipPrice":"text-sm text-muted","section":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-20 pt-20 sm:pt-28","sectionHead":"flex flex-wrap items-end justify-between gap-x-8 gap-y-4","h2":"text-3xl font-semibold tracking-tight text-balance sm:text-5xl sm:tracking-tighter","lead":"mt-3 max-w-xl text-base text-pretty text-muted sm:text-lg","bento":"mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(15rem,auto))]","tileBase":"group relative flex flex-col overflow-hidden rounded-[1.75rem] p-6","tileAccent":"group relative flex flex-col overflow-hidden rounded-[1.75rem] p-6 min-h-[26rem] bg-primary text-on-primary sm:col-span-2 lg:row-span-2","tileWide":"group relative flex flex-col overflow-hidden rounded-[1.75rem] p-6 min-h-60 bg-surface sm:col-span-2","tileSmall":"group relative flex flex-col overflow-hidden rounded-[1.75rem] p-6 min-h-60 bg-surface","tileTitle":"relative z-10 text-2xl font-semibold tracking-tight","tileText":"relative z-10 mt-1 max-w-[16rem] text-sm text-pretty opacity-90","tileImageAccent":"absolute bottom-3 left-3 h-[60%] w-[calc(100%-1.5rem)] rounded-[1.25rem] object-cover","tileImageWide":"absolute right-0 bottom-0 h-[58%] w-[70%] rounded-tl-3xl object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none sm:h-full sm:w-1/2 sm:rounded-tl-none","tileImageSmall":"absolute right-0 bottom-0 h-[58%] w-[70%] rounded-tl-3xl object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none","tileArrow":"relative z-10 mt-auto inline-flex size-11 items-center justify-center rounded-full transition-transform duration-150 group-hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","arrowAccent":"relative z-10 mt-auto inline-flex size-11 items-center justify-center rounded-full transition-transform duration-150 group-hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary bg-on-primary text-primary focus-visible:outline-on-primary","arrowPlain":"relative z-10 mt-auto inline-flex size-11 items-center justify-center rounded-full transition-transform duration-150 group-hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary bg-primary text-on-primary","toolbar":"mt-8 flex flex-wrap items-center justify-between gap-3","filterScroll":"-mx-4 max-w-[calc(100%+2rem)] overflow-x-auto px-4 sm:mx-0 sm:max-w-full sm:px-0","countText":"text-sm text-muted","productGrid":"mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3","productCard":"flex flex-col rounded-[1.75rem] bg-surface p-3","productMedia":"relative overflow-hidden rounded-[1.25rem] bg-subtle","productImage":"aspect-[5/4] w-full object-cover","productBadge":"absolute top-3 left-3","productBody":"flex flex-1 flex-col gap-1 px-3 pt-4 pb-2","productName":"text-lg font-semibold tracking-tight","productSpec":"text-sm text-muted","productFoot":"mt-auto flex items-center justify-between gap-3 pt-4","priceText":"text-base font-medium","quickButton":"rounded-full!","modalBody":"grid gap-5 text-ink sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]","modalImage":"aspect-square w-full rounded-2xl bg-subtle object-cover","modalInfo":"grid content-start gap-4","modalName":"text-xl font-semibold tracking-tight","modalSpecs":"grid gap-1.5 text-sm text-muted","specItem":"flex gap-2","specIcon":"mt-0.5 size-4 shrink-0 text-primary","optionLabel":"mb-2 text-sm font-medium","modalPrice":"text-2xl font-semibold tracking-tight","modalNote":"text-sm text-muted","band":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28","bandCard":"grid gap-10 rounded-[2rem] bg-surface p-6 sm:p-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16","pointList":"mt-8 grid gap-6 sm:grid-cols-3 sm:gap-4","pointIcon":"flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary","pointTitle":"mt-4 text-base font-semibold","pointText":"mt-1 text-sm leading-relaxed text-pretty text-muted","consultCard":"grid gap-5 rounded-[1.5rem] bg-primary-soft p-6","person":"flex items-center gap-4","personName":"text-base font-semibold","personRole":"text-sm text-muted","consultText":"text-sm leading-relaxed text-pretty text-muted","consultButton":"h-12 w-full rounded-full! text-base","deliveryGrid":"mt-8 grid gap-3 sm:gap-4 md:grid-cols-3","deliveryCard":"flex flex-col gap-3 rounded-[1.75rem] bg-surface p-6","deliveryIcon":"size-6 text-primary","deliveryTitle":"mt-2 text-lg font-semibold tracking-tight","deliveryText":"text-sm leading-relaxed text-pretty text-muted","deliveryMeta":"mt-auto border-t border-line pt-3 text-sm font-medium text-primary","faqLayout":"mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 scroll-mt-20 pt-20 sm:pt-28 grid gap-10 pb-24 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16","faqAside":"grid content-start justify-items-start gap-4","faqList":"[&>div]:max-w-none [&>div]:gap-0","quizForm":"grid gap-6 text-ink","quizStep":"grid gap-2","quizLabel":"text-sm font-medium","quizScroll":"max-w-full overflow-x-auto","fieldError":"text-sm text-danger","fieldHint":"text-sm text-muted","field":"h-11 text-base sm:text-sm","footer":"px-[max(1rem,calc((100%-72rem)/2))] bg-canvas","icons":{"orbit":"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 12c0-2.2 3.6-4 8-4s8 1.8 8 4-3.6 4-8 4-8-1.8-8-4Z","search":"M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm9 2-4-4","bag":"M5 8h14l-1 12H6L5 8Zm4 0V7a3 3 0 0 1 6 0v1","arrow":"M5 12h14m-6-6 6 6-6 6","check":"m5 12.5 4.5 4.5L19 7.5","box":"M4 8 12 4l8 4v8l-8 4-8-4V8Zm0 0 8 4 8-4M12 12v8","setup":"M4 7h10M18 7h2M4 17h4M12 17h8M16 5v4M10 15v4","support":"M5 13v-1a7 7 0 0 1 14 0v1M5 13a2 2 0 0 0 2 2h1v-5H7a2 2 0 0 0-2 2Zm14 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Zm-3 2v1a3 3 0 0 1-3 3h-1","truck":"M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z","clock":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2","store":"M4 9h16l-1-4H5L4 9Zm0 0v10h16V9M9 19v-5h6v5"},"TITLE":"Closer to the future.","QUICK_ID":"gawai-quick-view","SEARCH_ID":"gawai-search","SEARCH_FIELD":"gawai-search-field","HELP_ID":"gawai-help","PHONE_ID":"gawai-phone","nav":[{"label":"Catalog","href":"#catalog"},{"label":"New","href":"#popular"},{"label":"Delivery","href":"#delivery"},{"label":"Help","href":"#faq"}],"filters":[{"value":"all","label":"All"},{"value":"phones","label":"Phones"},{"value":"tablets","label":"Tablets"},{"value":"laptops","label":"Laptops"},{"value":"audio","label":"Audio"},{"value":"accessories","label":"Accessories"}],"tiles":[{"id":"phones","title":"Smartphones","text":"Flagships and everyday phones, all with official warranty.","image":"cat-phones","alt":"Close-up of a lilac phone's triple camera","style":"accent"},{"id":"laptops","title":"Laptops","text":"Thin, quiet, and ready for a full workday.","image":"cat-laptops","alt":"Top view of a silver laptop keyboard","style":"wide"},{"id":"audio","title":"Headphones","text":"Over-ear, in-ear, and studio.","image":"cat-headphones","alt":"Grey over-ear headphones on white","style":"small"},{"id":"accessories","title":"Accessories","text":"Chargers, watches, and power banks.","image":"cat-accessories","alt":"Black chargers and power banks on marble","style":"small"}],"products":[{"id":"phone","name":"Arka Phone 12","category":"phones","image":"phone-standing","badge":"New","spec":"6.4-inch OLED, 50 MP camera","price":8499000,"optionName":"Storage","options":[{"value":"128","label":"128 GB","add":0},{"value":"256","label":"256 GB","add":1000000},{"value":"512","label":"512 GB","add":3000000}],"specs":["120 Hz display, bright enough for midday sun","Two days of battery, 45 W charging","Five years of security updates"]},{"id":"tablet","name":"Arka Tab 11","category":"tablets","image":"tablet","badge":"","spec":"11-inch display, pen included","price":6999000,"optionName":"Storage","options":[{"value":"128","label":"128 GB","add":0},{"value":"256","label":"256 GB","add":1200000}],"specs":["Pen with 4,096 pressure levels in the box","Up to 12 hours of video","Works as a second screen for your laptop"]},{"id":"laptop","name":"Lumen Book 14","category":"laptops","image":"cat-laptops","badge":"","spec":"14-inch, 16 GB memory","price":13999000,"optionName":"Storage","options":[{"value":"512","label":"512 GB","add":0},{"value":"1024","label":"1 TB","add":2500000}],"specs":["1.2 kg aluminium body","Fanless, silent under load","18 hours of battery"]},{"id":"buds","name":"Sora Buds Pro","category":"audio","image":"earbuds","badge":"New","spec":"Noise cancelling, 30 h with case","price":1899000,"optionName":"Colour","options":[{"value":"graphite","label":"Graphite","add":0},{"value":"copper","label":"Copper","add":0}],"specs":["Adaptive noise cancelling","Six microphones for clear calls","Wireless charging case"]},{"id":"headphones","name":"Sora Studio","category":"audio","image":"cat-headphones","badge":"","spec":"Wired, 50 mm drivers","price":1299000,"optionName":"Cable","options":[{"value":"1.2","label":"1.2 m","add":0},{"value":"3","label":"3 m coiled","add":150000}],"specs":["Flat, honest sound for mixing","Folds flat for travel","Replaceable ear pads"]},{"id":"watch","name":"Sora Watch 3","category":"accessories","image":"smartwatch","badge":"","spec":"Heart rate and sleep, 5 day battery","price":2799000,"optionName":"Size","options":[{"value":"41","label":"41 mm","add":0},{"value":"45","label":"45 mm","add":300000}],"specs":["Water resistant to 50 m","Built-in GPS for runs and rides","Works with Android and iOS"]}],"points":[{"icon":"box","title":"Check on delivery","text":"Open the box in front of the courier. If anything is wrong, it goes straight back at our cost."},{"icon":"setup","title":"Setup help","text":"We move your photos, chats, and apps to the new device, in store or over a video call."},{"icon":"support","title":"After-sales support","text":"One number for warranty claims and repairs, for as long as you own the device."}],"uses":[{"value":"work","label":"Work"},{"value":"photos","label":"Photos"},{"value":"gaming","label":"Gaming"},{"value":"everyday","label":"Everyday"}],"budgets":[{"value":"low","label":"Under Rp 5 jt","phrase":"under Rp 5 jt"},{"value":"mid","label":"Rp 5 to 10 jt","phrase":"between Rp 5 and 10 jt"},{"value":"high","label":"Over Rp 10 jt","phrase":"over Rp 10 jt"}],"delivery":[{"icon":"truck","title":"Same day in 6 cities","text":"Order by 14.00 for delivery the same evening in Jakarta, Bandung, Surabaya, Medan, Semarang, and Makassar.","meta":"Free on orders over Rp 2 jt"},{"icon":"clock","title":"2 to 4 days elsewhere","text":"Insured shipping to every province, with tracking from our warehouse to your door.","meta":"From Rp 25.000"},{"icon":"store","title":"Pick up in store","text":"Collect from one of nine Lintang stores within two hours and set the device up with our staff.","meta":"Always free"}],"faqs":[{"question":"Are your devices official and new?","answer":"Yes. We are an authorised reseller, so every device is new, sealed, and covered by the official Indonesian warranty with a registered IMEI."},{"question":"Can I pay in instalments?","answer":"Yes. Pay in 3, 6, or 12 months with most Indonesian credit cards, or use a paylater service at checkout."},{"question":"What if the device is faulty?","answer":"Return it within 14 days for a replacement. After that, we handle the warranty claim with the maker for you."},{"question":"Do you take trade-ins?","answer":"Yes. Bring your old phone or laptop to any store, or book a courier pickup, and we take its value off your new device."}],"footerColumns":[{"title":"Shop","links":[{"label":"Smartphones","href":"#catalog"},{"label":"Laptops","href":"#catalog"},{"label":"Audio","href":"#catalog"}]},{"title":"Service","links":[{"label":"Delivery","href":"#delivery"},{"label":"Trade-in","href":"/trade-in"},{"label":"Warranty","href":"/warranty"}]},{"title":"Lintang","links":[{"label":"Stores","href":"/stores"},{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}]}],"legal":[{"label":"Privacy","href":"/privacy"},{"label":"Terms","href":"/terms"}]}

    JSON, true);
    extract($data);

    $icon = fn (string $name, string $class) => new Illuminate\Support\HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $image = fn (string $name) => '/template-images/gawai/'.$name.'.webp';
    $rupiah = fn (int $value) => 'Rp '.number_format($value, 0, ',', '.');
    $tileClass = ['accent' => $tileAccent, 'wide' => $tileWide, 'small' => $tileSmall];
    $tileImageClass = ['accent' => $tileImageAccent, 'wide' => $tileImageWide, 'small' => $tileImageSmall];
    $brand = new Illuminate\Support\HtmlString('<a href="#top" class="'.$brandLink.'"><span class="'.$brandMark.'">'.$icon('orbit', 'size-4').'</span>Lintang</a>');
    $first = $products[0];
    $total = count($products);
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  id="top"
  class="{{ $root }}"
  x-data="{
    filter: 'all',
    products: @js($products),
    selectedId: @js($first['id']),
    option: @js($first['options'][0]['value']),
    cart: [],
    query: '',
    use: 'everyday',
    budget: 'mid',
    budgets: @js($budgets),
    phone: '',
    phoneError: '',
    init() {
      {{-- ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan pilihan sebelumnya. --}}
      for (const key of ['filter', 'option', 'use', 'budget']) this.$watch(key, (value, previous) => { if (!value) this[key] = previous; });
    },
    rupiah(value) { return 'Rp ' + String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); },
    itemsLabel(count) { return count + ' ' + (count === 1 ? 'item' : 'items'); },
    get selected() { return this.products.find((product) => product.id === this.selectedId); },
    get selectedOption() { return this.selected.options.find((entry) => entry.value === this.option) ?? this.selected.options[0]; },
    get selectedPrice() { return this.selected.price + this.selectedOption.add; },
    get visibleCount() { return this.products.filter((product) => this.filter === 'all' || product.category === this.filter).length; },
    notify(title, description, variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    dialog(id) { return document.getElementById(id); },
    openQuick(id) {
      this.selectedId = id;
      this.option = this.selected.options[0].value;
      this.dialog(@js($QUICK_ID)).showModal();
    },
    onQuickClose(dialog) {
      if (dialog.returnValue === 'add') {
        const name = this.selected.name + ', ' + this.selectedOption.label;
        this.cart = [...this.cart, { name, price: this.selectedPrice }];
        this.notify('Added to cart', name + '. ' + this.rupiah(this.selectedPrice) + '.', 'success');
      }
      dialog.returnValue = '';
    },
    showCart() {
      if (this.cart.length === 0) return this.notify('Your cart is empty', 'Open any device and choose Add to cart.');
      const total = this.cart.reduce((sum, line) => sum + line.price, 0);
      this.notify('Your cart has ' + this.itemsLabel(this.cart.length), 'Total ' + this.rupiah(total) + '. Checkout opens in the next step.');
    },
    search() {
      const value = this.query.trim();
      if (!value) return;
      this.dialog(@js($SEARCH_ID)).close();
      this.query = '';
      this.notify('Results for ' + value, 'Showing devices in stock at your nearest store first.');
    },
    askConsultant() {
      const value = this.phone.replace(/[\s-]/g, '');
      if (!/^(\+62|0)8\d{7,11}$/.test(value)) { this.phoneError = 'Enter a WhatsApp number, like 0812 3456 7890.'; return; }
      this.phoneError = '';
      this.phone = '';
      this.dialog(@js($HELP_ID)).close();
      const phrase = this.budgets.find((item) => item.value === this.budget)?.phrase ?? '';
      this.notify('Nadia will message you', 'Two or three ' + this.use + ' picks ' + phrase + ', on WhatsApp in about 5 minutes.', 'success');
    },
    openHelp() { this.dialog(@js($HELP_ID)).showModal(); },
  }"
>
  <x-markas.navbar variant="blur" :sticky="true" :links="$nav" class="{{ $navbarEdge }}" x-on:click="if ($event.target.closest('[data-state=open] a')) open = false">
    <x-slot:brand>{{ $brand }}</x-slot:brand>
    <x-slot:actions>
      <div class="{{ $navActions }}">
        <button type="button" aria-label="Search" class="{{ $iconButton }}" x-on:click="dialog(@js($SEARCH_ID)).showModal()">{{ $icon('search', $iconSize) }}</button>
        <button type="button" aria-label="Cart, 0 items" x-bind:aria-label="'Cart, ' + itemsLabel(cart.length)" class="{{ $iconButton }}" x-on:click="showCart()">
          {{ $icon('bag', $iconSize) }}
          <span aria-hidden="true" data-cart-count="" class="{{ $countBadge }}" x-show="cart.length > 0" x-text="cart.length" style="display: none"></span>
        </button>
      </div>
    </x-slot:actions>
  </x-markas.navbar>

  <main>
    <section aria-labelledby="gawai-title" class="{{ $hero }}">
      <div class="{{ $heroCard }}">
        <div class="{{ $heroCopy }}">
          <p class="{{ $kicker }}">Authorised reseller since 2014</p>
          <h1 id="gawai-title" class="{{ $h1 }}">{{ $TITLE }}</h1>
          <p class="{{ $heroLead }}">Phones, laptops, and audio from makers you trust, delivered the same day in six cities and set up by people who know them.</p>
          <div class="{{ $heroActions }}">
            <a href="#catalog" class="{{ $primaryLink }}">Choose a device{{ $icon('arrow', 'size-4') }}</a>
            <x-markas.button variant="ghost" class="{{ $ghostButton }}" x-on:click="openHelp()">Help me choose</x-markas.button>
          </div>
        </div>
        <div class="{{ $heroMedia }}">
          <img src="{{ $image('hero-phone') }}" alt="A slim phone with a silver frame resting at an angle on a light grey surface" width="1400" height="1050" fetchpriority="high" decoding="async" class="{{ $heroImage }}" />
          <div class="{{ $heroChip }}">
            <img src="{{ $image('earbuds') }}" alt="" width="56" height="56" decoding="async" class="{{ $chipImage }}" />
            <div>
              <p class="{{ $chipName }}">Sora Buds Pro</p>
              <p class="{{ $chipPrice }}">From Rp 1.899.000</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="catalog" aria-labelledby="gawai-catalog" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <div>
          <h2 id="gawai-catalog" class="{{ $h2 }}">Find yours</h2>
          <p class="{{ $lead }}">Four shelves, each one picked by our staff. Nothing we would not use ourselves.</p>
        </div>
      </div>
      <ul class="{{ $bento }}">
        @foreach ($tiles as $tile)
          <li class="{{ $tileClass[$tile['style']] }}">
            <h3 class="{{ $tileTitle }}">{{ $tile['title'] }}</h3>
            <p class="{{ $tileText }}">{{ $tile['text'] }}</p>
            <img src="{{ $image($tile['image']) }}" alt="{{ $tile['alt'] }}" width="{{ $tile['style'] === 'accent' ? 800 : 600 }}" height="{{ $tile['style'] === 'accent' ? 800 : 600 }}" loading="lazy" decoding="async" class="{{ $tileImageClass[$tile['style']] }}" />
            <a href="#popular" aria-label="Shop {{ strtolower($tile['title']) }}" class="{{ $tile['style'] === 'accent' ? $arrowAccent : $arrowPlain }}" x-on:click="filter = @js($tile['id'])">{{ $icon('arrow', 'size-5') }}</a>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="popular" aria-labelledby="gawai-popular" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <div>
          <h2 id="gawai-popular" class="{{ $h2 }}">Popular now</h2>
          <p class="{{ $lead }}">What people asked about most in our stores this month.</p>
        </div>
      </div>
      <div class="{{ $toolbar }}">
        <div class="{{ $filterScroll }}">
          <x-markas.toggle-group label="Filter devices by type" :items="$filters" value="all" x-model="filter" />
        </div>
        <p aria-live="polite" class="{{ $countText }}" x-text="filter === 'all' ? 'Showing all {{ $total }} devices' : 'Showing ' + visibleCount + ' of {{ $total }} devices'">Showing all {{ $total }} devices</p>
      </div>
      <ul class="{{ $productGrid }}">
        @foreach ($products as $product)
          <li data-device="{{ $product['id'] }}" class="{{ $productCard }}" x-show="filter === 'all' || filter === @js($product['category'])">
            <div class="{{ $productMedia }}">
              <img src="{{ $image($product['image']) }}" alt="" width="600" height="600" loading="lazy" decoding="async" class="{{ $productImage }}" />
              @if ($product['badge'])
                <x-markas.badge variant="neutral" :dot="false" class="{{ $productBadge }}">{{ $product['badge'] }}</x-markas.badge>
              @endif
            </div>
            <div class="{{ $productBody }}">
              <h3 class="{{ $productName }}">{{ $product['name'] }}</h3>
              <p class="{{ $productSpec }}">{{ $product['spec'] }}</p>
              <div class="{{ $productFoot }}">
                <p class="{{ $priceText }}">from {{ $rupiah($product['price']) }}</p>
                <x-markas.button variant="secondary" size="sm" class="{{ $quickButton }}" aria-label="Quick view, {{ $product['name'] }}" x-on:click="openQuick('{{ $product['id'] }}')">Quick view</x-markas.button>
              </div>
            </div>
          </li>
        @endforeach
      </ul>
      <x-markas.modal :id="$QUICK_ID" title="Quick view" x-on:close="onQuickClose($event.currentTarget)">
        <div class="{{ $modalBody }}">
          <img src="{{ $image($first['image']) }}" x-bind:src="'/template-images/gawai/' + selected.image + '.webp'" alt="" width="600" height="600" decoding="async" class="{{ $modalImage }}" />
          <div class="{{ $modalInfo }}">
            <div>
              <p data-quick-name="" class="{{ $modalName }}" x-text="selected.name">{{ $first['name'] }}</p>
              <p class="{{ $productSpec }}" x-text="selected.spec">{{ $first['spec'] }}</p>
            </div>
            @foreach ($products as $product)
              <ul class="{{ $modalSpecs }}" x-show="selectedId === @js($product['id'])" @if (! $loop->first) style="display: none" @endif>
                @foreach ($product['specs'] as $spec)
                  <li class="{{ $specItem }}">{{ $icon('check', $specIcon) }}{{ $spec }}</li>
                @endforeach
              </ul>
            @endforeach
            @foreach ($products as $product)
              <div x-show="selectedId === @js($product['id'])" @if (! $loop->first) style="display: none" @endif>
                <p class="{{ $optionLabel }}">{{ $product['optionName'] }}</p>
                <x-markas.toggle-group :label="$product['optionName']" :items="$product['options']" :value="$product['options'][0]['value']" x-model="option" />
              </div>
            @endforeach
            <div>
              <p data-quick-price="" class="{{ $modalPrice }}" x-text="rupiah(selectedPrice)">{{ $rupiah($first['price']) }}</p>
              <p class="{{ $modalNote }}" x-text="'Or ' + rupiah(Math.round(selectedPrice / 12)) + ' a month for 12 months, 0% interest'">Or {{ $rupiah((int) round($first['price'] / 12)) }} a month for 12 months, 0% interest</p>
            </div>
          </div>
        </div>
        <x-slot:footer>
          <x-markas.button variant="secondary" type="submit" value="cancel">Close</x-markas.button>
          <x-markas.button type="submit" value="add">Add to cart</x-markas.button>
        </x-slot:footer>
      </x-markas.modal>
    </section>

    <div class="{{ $band }}">
      <section aria-labelledby="gawai-calm" class="{{ $bandCard }}">
        <div>
          <h2 id="gawai-calm" class="{{ $h2 }}">Good tech. Calm purchase.</h2>
          <p class="{{ $lead }}">Buying a device should not feel like a gamble. Every order comes with three things, at no extra cost.</p>
          <ul class="{{ $pointList }}">
            @foreach ($points as $point)
              <li>
                <span class="{{ $pointIcon }}">{{ $icon($point['icon'], 'size-5') }}</span>
                <h3 class="{{ $pointTitle }}">{{ $point['title'] }}</h3>
                <p class="{{ $pointText }}">{{ $point['text'] }}</p>
              </li>
            @endforeach
          </ul>
        </div>
        <div class="{{ $consultCard }}">
          <div class="{{ $person }}">
            <x-markas.avatar :src="$image('consultant')" alt="" name="Nadia Rahma" size="lg" />
            <div>
              <p class="{{ $personName }}">Nadia Rahma</p>
              <p class="{{ $personRole }}">Product consultant, Lintang Senopati</p>
            </div>
          </div>
          <p class="{{ $consultText }}">Tell me what you need it for and your budget. I will reply on WhatsApp with two or three honest options, usually within 5 minutes.</p>
          <x-markas.button class="{{ $consultButton }}" x-on:click="openHelp()">Help me choose</x-markas.button>
        </div>
      </section>
    </div>

    <section id="delivery" aria-labelledby="gawai-delivery" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <div>
          <h2 id="gawai-delivery" class="{{ $h2 }}">Delivery and pickup</h2>
          <p class="{{ $lead }}">Every parcel is insured and sealed. You pay only when it arrives, if you prefer.</p>
        </div>
      </div>
      <ul class="{{ $deliveryGrid }}">
        @foreach ($delivery as $item)
          <li class="{{ $deliveryCard }}">
            {{ $icon($item['icon'], $deliveryIcon) }}
            <h3 class="{{ $deliveryTitle }}">{{ $item['title'] }}</h3>
            <p class="{{ $deliveryText }}">{{ $item['text'] }}</p>
            <p class="{{ $deliveryMeta }}">{{ $item['meta'] }}</p>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="faq" aria-labelledby="gawai-faq" class="{{ $faqLayout }}">
      <div class="{{ $faqAside }}">
        <h2 id="gawai-faq" class="{{ $h2 }}">Questions before you buy</h2>
        <p class="{{ $lead }}">Still unsure? A consultant can compare two devices for you.</p>
        <x-markas.button variant="secondary" class="{{ $quickButton }}" x-on:click="openHelp()">Ask a consultant</x-markas.button>
      </div>
      <x-markas.faq :items="$faqs" :exclusive="true" class="{{ $faqList }}" />
    </section>
  </main>

  <x-markas.footer class="{{ $footer }}" description="An authorised reseller of phones, laptops, and audio, with nine stores in Indonesia." :columns="$footerColumns" :legal="$legal" copyright="© 2026 Lintang. Built with MarkasUI.">
    <x-slot:brand>{{ $brand }}</x-slot:brand>
  </x-markas.footer>

  <x-markas.modal :id="$SEARCH_ID" title="Search Lintang">
    <form role="search" class="{{ $quizForm }}" x-on:submit.prevent="search()">
      <label for="{{ $SEARCH_FIELD }}" class="{{ $quizLabel }}">Device or model</label>
      <div class="{{ $quizStep }}">
        <x-markas.input :id="$SEARCH_FIELD" type="search" name="q" placeholder="Try phone, 14-inch laptop, earbuds" class="{{ $field }}" x-model="query" />
        <x-markas.button type="submit">Search</x-markas.button>
      </div>
    </form>
  </x-markas.modal>

  <x-markas.drawer :id="$HELP_ID" title="Help me choose">
    <form class="{{ $quizForm }}" novalidate x-on:submit.prevent="askConsultant()">
      <div class="{{ $quizStep }}">
        <p class="{{ $quizLabel }}">What will you use it for?</p>
        <div class="{{ $quizScroll }}">
          <x-markas.toggle-group label="What will you use it for?" :items="$uses" value="everyday" x-model="use" />
        </div>
      </div>
      <div class="{{ $quizStep }}">
        <p class="{{ $quizLabel }}">Your budget</p>
        <div class="{{ $quizScroll }}">
          <x-markas.toggle-group label="Your budget" :items="$budgets" value="mid" x-model="budget" />
        </div>
      </div>
      <div class="{{ $quizStep }}">
        <label for="{{ $PHONE_ID }}" class="{{ $quizLabel }}">WhatsApp number</label>
        <x-markas.input :id="$PHONE_ID" type="tel" name="phone" autocomplete="tel" placeholder="0812 3456 7890" class="{{ $field }}" aria-describedby="{{ $PHONE_ID }}-note" x-model="phone" x-bind:aria-invalid="phoneError ? 'true' : null" />
        <p id="{{ $PHONE_ID }}-note" class="{{ $fieldHint }}" x-bind:class="phoneError ? @js($fieldError) : @js($fieldHint)" x-text="phoneError || 'Nadia replies from 08.00 to 22.00 WIB.'">Nadia replies from 08.00 to 22.00 WIB.</p>
      </div>
      <x-markas.button type="submit" class="{{ $consultButton }}">Send to Nadia</x-markas.button>
    </form>
  </x-markas.drawer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
