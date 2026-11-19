@php
    // Kelas Tailwind dan data contoh, identik dengan versi React (satu blok JSON hasil salinan konstanta React).
    $data = json_decode(<<<'JSON'
    {"focusRing":"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","focusOnPrimary":"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary","root":"min-h-dvh bg-canvas text-ink","container":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8","footerEdge":"px-[max(1rem,calc((100%-78rem)/2))]","srOnly":"sr-only","promoBar":"bg-primary-strong px-4 py-2 text-center text-xs leading-5 text-on-primary sm:text-sm","header":"sticky top-0 z-30 bg-primary text-on-primary","headerRow":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center gap-3","brandLink":"flex shrink-0 items-center gap-2.5 rounded-full text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary","brandMark":"flex size-9 shrink-0 items-center justify-center rounded-full bg-on-primary text-primary","brandName":"text-xl font-black tracking-tight","navList":"ml-6 hidden items-center gap-1 lg:flex","navLink":"rounded-full px-3 py-2 text-sm font-medium text-on-primary transition-colors duration-150 hover:bg-on-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary","headerActions":"ml-auto flex items-center gap-2","chatButton":"hidden h-10 items-center gap-2 rounded-full border border-on-primary/40 px-4 text-sm font-semibold text-on-primary transition-colors duration-150 hover:bg-on-primary/10 sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary","basketButton":"inline-flex h-10 items-center gap-2 rounded-full bg-on-primary pr-2 pl-4 text-sm font-semibold text-primary transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary","basketCount":"inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-on-primary tabular-nums","iconSm":"size-4 shrink-0","iconMd":"size-5 shrink-0","hero":"bg-primary text-on-primary","heroGrid":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 items-center gap-4 pt-10 pb-10 sm:gap-6 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)_minmax(0,1fr)] lg:gap-10 lg:pt-16 lg:pb-14","heroCopy":"col-span-2 text-center lg:col-span-1 lg:col-start-2 lg:row-start-1","heroKicker":"inline-flex items-center gap-2 rounded-full bg-on-primary/10 px-3.5 py-1.5 text-sm font-medium","h1":"mt-5 text-[2.6rem] leading-[0.95] font-black tracking-[-0.04em] text-balance sm:text-7xl lg:text-[5.5rem]","heroLead":"mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty sm:text-lg","heroActions":"mt-8 flex flex-wrap justify-center gap-3","heroPrimary":"inline-flex h-12 items-center gap-2 rounded-full bg-on-primary px-6 text-base font-semibold text-primary transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary","heroSecondary":"inline-flex h-12 items-center gap-2 rounded-full border border-on-primary/40 px-6 text-base font-semibold text-on-primary transition-colors duration-150 hover:bg-on-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary","heroPhotoLeft":"lg:col-start-1 lg:row-start-1 lg:self-start","heroPhotoRight":"lg:col-start-3 lg:row-start-1 lg:self-end","heroImage":"aspect-[4/5] w-full rounded-[2rem] bg-primary-strong object-cover","statsList":"grid grid-cols-2 gap-x-6 gap-y-6 border-t border-on-primary/25 py-8 sm:py-10 lg:grid-cols-4","statValue":"text-4xl font-black tracking-tight sm:text-5xl","statLabel":"mt-1 text-sm leading-snug sm:text-base","section":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-20 pt-16 sm:pt-24","sectionHead":"flex flex-wrap items-end justify-between gap-x-6 gap-y-4","kicker":"text-sm font-semibold text-primary","h2":"mt-2 text-3xl leading-[1.05] font-black tracking-[-0.03em] text-balance sm:text-5xl","lead":"mt-3 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg","catGrid":"mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4","catLink":"group flex h-full flex-col overflow-hidden rounded-3xl bg-primary-soft text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","catMedia":"overflow-hidden","catImage":"aspect-[5/4] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none","catBody":"flex flex-1 flex-col gap-1 p-4 sm:p-5","catName":"text-lg font-black tracking-tight sm:text-2xl","catText":"text-sm leading-snug text-pretty text-muted","catFoot":"mt-auto flex items-center justify-between gap-2 pt-4 text-sm font-semibold","catArrow":"flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none","storyGrid":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-20 grid gap-8 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16","storyMedia":"relative","storyImage":"aspect-[4/5] w-full rounded-[2rem] bg-subtle object-cover","storyNote":"absolute right-4 bottom-4 left-4 rounded-2xl bg-surface p-4 text-sm leading-relaxed text-ink shadow-overlay sm:right-auto sm:max-w-xs","storyText":"mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg","factList":"mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6","factValue":"text-2xl font-black tracking-tight text-primary sm:text-4xl","factLabel":"mt-1 text-sm leading-snug text-muted","rackHead":"text-xl font-black tracking-tight sm:text-2xl","rackList":"-mx-4 mt-5 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-6 sm:gap-6 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden","rackLink":"group flex w-28 shrink-0 snap-start flex-col items-center gap-3 rounded-2xl text-center sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","rackImage":"aspect-square w-full rounded-full bg-subtle object-cover ring-4 ring-primary-soft transition-shadow duration-150 group-hover:ring-primary motion-reduce:transition-none","rackLabel":"text-sm font-semibold","toolbar":"mt-8 flex flex-wrap items-center justify-between gap-4","filterRow":"flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2","filterScroll":"-mx-4 max-w-[calc(100%+2rem)] overflow-x-auto px-4 sm:mx-0 sm:max-w-full sm:px-0","filterGroup":"bg-primary-soft [&>[data-state=on]]:bg-primary [&>[data-state=on]]:text-on-primary","countText":"text-sm text-muted","stripControls":"hidden items-center gap-2 sm:flex","stripButton":"inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","strip":"-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8 [&::-webkit-scrollbar]:hidden","productCard":"flex w-[16.5rem] shrink-0 snap-start flex-col rounded-3xl border border-line bg-surface p-3 sm:w-72","productMedia":"relative overflow-hidden rounded-2xl bg-subtle","productImage":"aspect-square w-full object-cover","productTag":"absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-on-primary","productBody":"flex flex-1 flex-col px-1 pt-4","productName":"text-lg leading-snug font-black tracking-tight","productText":"mt-1 text-sm leading-snug text-pretty text-muted","productFoot":"mt-auto flex items-center justify-between gap-3 pt-4","productPrice":"text-lg font-bold tabular-nums","addButton":"rounded-full! pr-4 pl-3","howBand":"mt-16 scroll-mt-20 bg-primary-soft py-16 sm:mt-24 sm:py-24","howGrid":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16","howImage":"aspect-[3/2] w-full rounded-[2rem] bg-subtle object-cover","stepList":"mt-8 grid gap-6","stepItem":"grid grid-cols-[auto_minmax(0,1fr)] gap-4","stepNumber":"flex size-11 items-center justify-center rounded-full bg-primary text-base font-black text-on-primary","stepTitle":"text-lg font-black tracking-tight sm:text-xl","stepText":"mt-1 text-sm leading-relaxed text-pretty text-muted sm:text-base","ratingLine":"flex items-center gap-2 text-sm text-muted","ratingValue":"text-base font-bold text-ink","reviewGrid":"mt-8 grid gap-4 md:grid-cols-3","reviewCard":"flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8","stars":"flex gap-0.5 text-primary","star":"size-5 fill-current","reviewText":"text-lg leading-relaxed font-medium tracking-tight text-pretty","person":"mt-auto flex items-center gap-3","personName":"text-sm font-semibold","personMeta":"text-sm text-muted","faqLayout":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-20 pt-16 sm:pt-24 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16","faqAside":"grid content-start justify-items-start gap-4","faqList":"[&>div]:max-w-none [&>div]:gap-0","faqButton":"rounded-full! px-5","newsWrap":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24","newsBand":"grid gap-8 rounded-[2rem] bg-primary p-6 text-on-primary sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-12","newsTitle":"text-3xl leading-[1.05] font-black tracking-[-0.03em] text-balance sm:text-5xl","newsText":"mt-3 text-base leading-relaxed text-pretty sm:text-lg","form":"grid gap-2","fieldLabel":"text-sm font-semibold","fieldRow":"grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]","field":"h-12 rounded-full! border-transparent! px-5 text-base focus-visible:outline-on-primary!","fieldButton":"h-12 shrink-0 rounded-full! bg-on-primary! px-6 text-base! font-semibold text-primary! hover:opacity-90 focus-visible:outline-on-primary!","fieldError":"text-sm font-semibold","fieldHint":"text-sm","footer":"px-[max(1rem,calc((100%-78rem)/2))] [&>div[aria-hidden]>p]:from-primary [&>div[aria-hidden]>p]:via-primary/70","footerBrand":"flex items-center gap-2.5 rounded-full text-lg font-black tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","footerMark":"flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary","payRow":"flex flex-wrap items-center gap-2","payBadge":"rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-ink","cartList":"grid gap-4","cartLine":"grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3","cartImage":"size-14 rounded-xl bg-subtle object-cover","cartName":"truncate text-sm font-semibold text-ink","cartMeta":"text-sm text-muted tabular-nums","stepper":"flex items-center gap-1","stepButton":"inline-flex size-8 items-center justify-center rounded-full border border-line text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","stepValue":"w-6 text-center text-sm font-semibold text-ink tabular-nums","cartEmpty":"py-10 text-center text-sm text-muted","cartSummary":"mt-6 grid gap-2 border-t border-line pt-4","summaryRow":"flex justify-between text-base font-semibold text-ink","shipNote":"text-sm text-muted","icons":{"wheat":"M12 21V8m0 0c0-2.5 1.5-4.5 3.5-5-.2 2.6-1.5 4.3-3.5 5Zm0 0c0-2.5-1.5-4.5-3.5-5 .2 2.6 1.5 4.3 3.5 5Zm0 6c0-2.5 1.5-4.5 3.5-5-.2 2.6-1.5 4.3-3.5 5Zm0 0c0-2.5-1.5-4.5-3.5-5 .2 2.6 1.5 4.3 3.5 5Zm0 6c0-2.5 1.5-4.5 3.5-5-.2 2.6-1.5 4.3-3.5 5Zm0 0c0-2.5-1.5-4.5-3.5-5 .2 2.6 1.5 4.3 3.5 5Z","bag":"M5 8h14l-1 12H6L5 8Zm4 0V7a3 3 0 0 1 6 0v1","chat":"M4 20l1.3-3.9A8 8 0 1 1 8 19.3L4 20Zm5-8h.01M12 12h.01M15 12h.01","plus":"M12 5v14M5 12h14","minus":"M5 12h14","arrow":"M5 12h14m-6-6 6 6-6 6","back":"M19 12H5m6-6-6 6 6 6","star":"M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z","pin":"M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"},"TITLE":"Jogja's favourite bread, delivered warm to your door","BRAND":"Pawon Ragi","CART_ID":"roti-cart","EMAIL_ID":"roti-email","STRIP_ID":"roti-strip","FREE_DELIVERY":150000,"EMAIL_HINT":"One email every Friday. Unsubscribe in one click.","EMAIL_ERROR":"Enter a valid email address, like nama@email.com.","nav":[{"label":"Menu","href":"#menu"},{"label":"Our story","href":"#story"},{"label":"How it's made","href":"#how"},{"label":"Reviews","href":"#reviews"},{"label":"FAQ","href":"#faq"}],"stats":[{"value":"5.000+","label":"happy customers across Jogja"},{"value":"98%","label":"of orders arrive still warm"},{"value":"6.000+","label":"five-star reviews since 2019"},{"value":"100%","label":"real butter, never margarine"}],"categories":[{"value":"all","label":"All"},{"value":"bread","label":"Bread"},{"value":"pastry","label":"Pastry"},{"value":"pretzel","label":"Pretzels"},{"value":"hampers","label":"Hampers"}],"categoryCards":[{"value":"bread","label":"Bread","text":"Roti sobek and slow sourdough","image":"cat-bread"},{"value":"pastry","label":"Pastry","text":"Croissants and cinnamon rolls","image":"cat-pastry"},{"value":"pretzel","label":"Pretzels","text":"Chewy, salted or sweet","image":"cat-pretzel"},{"value":"hampers","label":"Hampers","text":"Gift boxes with a handwritten card","image":"hampers"}],"products":[{"id":"croissant-butter","name":"Butter croissant","category":"pastry","price":32000,"text":"French butter, 27 layers, out of the oven at 6 am.","tag":"Best seller"},{"id":"roti-sobek","name":"Roti sobek","category":"bread","price":45000,"text":"Twelve pull-apart milk buns that stay soft for three days.","tag":""},{"id":"pretzel-salt","name":"Salted butter pretzel","category":"pretzel","price":28000,"text":"Dark, chewy crust with sea salt from Madura.","tag":"Best seller"},{"id":"cinnamon-roll","name":"Cinnamon roll","category":"pastry","price":34000,"text":"Kerinci cinnamon and a cream cheese glaze.","tag":"New"},{"id":"sourdough","name":"Country sourdough","category":"bread","price":65000,"text":"800 g loaf, fermented 18 hours, sliced on request.","tag":""},{"id":"pretzel-cinnamon","name":"Cinnamon sugar pretzel","category":"pretzel","price":30000,"text":"Brushed with butter and rolled while warm.","tag":""},{"id":"croissant-almond","name":"Almond croissant","category":"pastry","price":38000,"text":"Baked twice with almond cream and toasted flakes.","tag":""},{"id":"hampers","name":"Cookie hampers","category":"hampers","price":185000,"text":"Twelve cookies in a gift box with a handwritten card.","tag":"Pre-order"}],"rack":[{"image":"round-croissants","label":"Croissants","value":"pastry"},{"image":"round-pretzel","label":"Pretzels","value":"pretzel"},{"image":"round-buns","label":"Cinnamon buns","value":"pastry"},{"image":"round-loaves","label":"Country loaves","value":"bread"},{"image":"round-trays","label":"Morning trays","value":"all"},{"image":"round-croissant","label":"Almond croissant","value":"pastry"}],"facts":[{"value":"2019","label":"first bake, in a garage"},{"value":"14","label":"bakers and couriers"},{"value":"3 am","label":"first dough of the day"}],"steps":[{"title":"Slow dough","text":"Every dough rests 18 hours in the cold, so the bread tastes deeper and keeps longer."},{"title":"Shaped by hand","text":"Eight bakers fold, roll, and twist each piece. No machine touches it after the mixer."},{"title":"Baked at dawn","text":"The deck oven fires at 4 am, and the first trays come out at 6."},{"title":"At your door by 10","text":"Couriers leave Kotabaru at 7 with insulated bags, so your order arrives warm."}],"reviews":[{"name":"Rara Wulandari","meta":"Orders every Sunday, Condongcatur","text":"The roti sobek is gone before my kids leave for school. It still smells like the oven when the courier rings."},{"name":"Dimas Prakoso","meta":"Office pantry order, Kotagede","text":"We order 40 croissants for Monday meetings. They always arrive before 9 and nobody has ever had a soggy one."},{"name":"Ayu Paramitha","meta":"Sent hampers to Semarang","text":"I sent cookie hampers to my parents for their anniversary. The handwritten card made my mum cry, in a good way."}],"faqs":[{"question":"Where do you deliver?","answer":"Anywhere in Kota Yogyakarta, Sleman, and Bantul, from 7 to 10 am. Order by 10 pm for the next morning. Hampers ship anywhere in Java by next-day courier."},{"question":"How do I order on WhatsApp?","answer":"Fill your basket here and tap Order on WhatsApp. Your order arrives as a ready-made message; we confirm the delivery slot and send a QRIS code within 15 minutes."},{"question":"How long does the bread keep?","answer":"Croissants and pretzels are best on the day. Roti sobek stays soft for three days in a sealed bag, and sourdough keeps for five. Warm anything for four minutes at 180 °C."},{"question":"Can I order for an event?","answer":"Yes. For 50 pieces or more, message us three days ahead and we will bake a separate batch, label the boxes, and deliver at the time you choose."},{"question":"Is your kitchen halal?","answer":"We use no pork, lard, or alcohol, and every ingredient comes from certified suppliers. Our halal certificate number is printed on each box."}],"footerColumns":[{"title":"Shop","links":[{"label":"Bread","href":"#menu"},{"label":"Pastry","href":"#menu"},{"label":"Hampers","href":"#menu"}]},{"title":"Bakery","links":[{"label":"Our story","href":"#story"},{"label":"How it's made","href":"#how"},{"label":"Reviews","href":"#reviews"}]},{"title":"Help","links":[{"label":"FAQ","href":"#faq"},{"label":"Delivery areas","href":"/delivery"},{"label":"Contact","href":"/contact"}]}],"legal":[{"label":"Privacy","href":"/privacy"},{"label":"Terms","href":"/terms"}],"payments":["QRIS","Bank transfer","Virtual account","Debit card","Cash on delivery"],"ratingStars":[1,2,3,4,5],"chatToast":{"title":"Opening WhatsApp","description":"Chat with Pawon Ragi at +62 812 2019 0600. We reply within 15 minutes, 7 am to 9 pm."}}
    JSON, true);
    extract($data);

    $icon = fn (string $name, string $class) => new Illuminate\Support\HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $image = fn (string $name) => '/template-images/roti/'.$name.'.webp';
    $rupiah = fn (int $value) => 'Rp '.number_format($value, 0, ',', '.');
    $priceFrom = fn (string $category) => 'From '.$rupiah(min(array_map(fn ($item) => $item['price'], array_filter($products, fn ($item) => $item['category'] === $category))));
    $total = count($products);
    $footerBrandHtml = new Illuminate\Support\HtmlString('<a href="#top" class="'.$footerBrand.'"><span class="'.$footerMark.'">'.$icon('wheat', $iconMd).'</span>'.e($BRAND).'</a>');
    // Nama dan harga setiap bake untuk keranjang (dihitung di browser).
    $catalog = array_map(fn ($item) => ['id' => $item['id'], 'name' => $item['name'], 'price' => $item['price'], 'category' => $item['category']], $products);
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  id="top"
  class="{{ $root }}"
  x-data="{
    category: 'all',
    cart: {},
    email: '',
    emailError: '',
    catalog: @js($catalog),
    init() {
      {{-- ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan pilihan sebelumnya. --}}
      this.$watch('category', (value, previous) => {
        if (!value) { this.category = previous; return; }
        this.$refs.strip.scrollTo({ left: 0 });
      });
    },
    rupiah(value) { return 'Rp ' + String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); },
    itemsWord(count) { return count === 1 ? 'item' : 'items'; },
    itemsLabel(count) { return count + ' ' + this.itemsWord(count); },
    item(id) { return this.catalog.find((entry) => entry.id === id) ?? this.catalog[0]; },
    get lines() { return Object.entries(this.cart).map(([id, qty]) => ({ ...this.item(id), qty })); },
    get cartCount() { return this.lines.reduce((sum, line) => sum + line.qty, 0); },
    get subtotal() { return this.lines.reduce((sum, line) => sum + line.qty * line.price, 0); },
    get visibleCount() { return this.catalog.filter((entry) => this.category === 'all' || entry.category === this.category).length; },
    get deliveryNote() {
      return this.subtotal >= @js($FREE_DELIVERY) ? 'Free delivery applied. Arrives tomorrow, 7 to 10 am.' : 'Add ' + this.rupiah(@js($FREE_DELIVERY) - this.subtotal) + ' more for free delivery in Jogja.';
    },
    notify(detail) { this.$dispatch('markas-toast', detail); },
    scrollStrip(direction) {
      const list = this.$refs.strip;
      list.scrollBy({ left: direction * list.clientWidth * 0.8 });
    },
    addToCart(id) {
      const count = this.cartCount;
      this.cart = { ...this.cart, [id]: (this.cart[id] ?? 0) + 1 };
      this.notify({ title: 'Added to your basket', description: this.item(id).name + '. Your basket has ' + this.itemsLabel(count + 1) + '.', variant: 'success' });
    },
    changeQty(id, step) {
      const qty = (this.cart[id] ?? 0) + step;
      this.cart = qty > 0 ? { ...this.cart, [id]: qty } : Object.fromEntries(Object.entries(this.cart).filter(([key]) => key !== id));
    },
    openCart() { document.getElementById(@js($CART_ID)).showModal(); },
    chat() { this.notify(@js($chatToast)); },
    onCartClose(dialog) {
      if (dialog.returnValue === 'checkout') this.notify({ title: 'Sending your order on WhatsApp', description: this.itemsLabel(this.cartCount) + ', ' + this.rupiah(this.subtotal) + '. We will confirm your delivery slot in a few minutes.', variant: 'success' });
      dialog.returnValue = '';
    },
    subscribe() {
      const value = this.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { this.emailError = @js($EMAIL_ERROR); return; }
      this.emailError = '';
      this.email = '';
      this.notify({ title: 'You are on the list', description: 'The Friday bake list goes to ' + value + '.', variant: 'success' });
    },
  }"
>
  <p class="{{ $promoBar }}">Free delivery in Jogja on orders over Rp 150.000. Order by 10 pm for tomorrow morning.</p>
  <header class="{{ $header }}">
    <div class="{{ $headerRow }}">
      <a href="#top" class="{{ $brandLink }}"><span class="{{ $brandMark }}">{{ $icon('wheat', $iconMd) }}</span><span class="{{ $brandName }}">{{ $BRAND }}</span></a>
      <nav aria-label="Main" class="{{ $navList }}">
        @foreach ($nav as $link)
          <a href="{{ $link['href'] }}" class="{{ $navLink }}">{{ $link['label'] }}</a>
        @endforeach
      </nav>
      <div class="{{ $headerActions }}">
        <button type="button" class="{{ $chatButton }}" x-on:click="chat()">{{ $icon('chat', $iconSm) }}Order on WhatsApp</button>
        <button type="button" class="{{ $basketButton }}" x-on:click="openCart()">{{ $icon('bag', $iconSm) }}Basket <span data-cart-count="" class="{{ $basketCount }}" x-text="cartCount">0</span> <span class="{{ $srOnly }}" x-text="itemsWord(cartCount)">items</span></button>
      </div>
    </div>
  </header>

  <main>
    <section aria-labelledby="roti-title" class="{{ $hero }}">
      <div class="{{ $heroGrid }}">
        <div class="{{ $heroCopy }}">
          <p class="{{ $heroKicker }}">{{ $icon('pin', $iconSm) }}Baked daily in Kotabaru, Yogyakarta</p>
          <h1 id="roti-title" class="{{ $h1 }}">{{ $TITLE }}</h1>
          <p class="{{ $heroLead }}">Croissants, roti sobek, and soft pretzels made with real butter and an 18-hour dough. Order by 10 pm and we deliver warm between 7 and 10 the next morning.</p>
          <div class="{{ $heroActions }}">
            <a href="#menu" class="{{ $heroPrimary }}">Order now{{ $icon('arrow', $iconSm) }}</a>
            <button type="button" class="{{ $heroSecondary }}" x-on:click="chat()">{{ $icon('chat', $iconSm) }}Chat on WhatsApp</button>
          </div>
        </div>
        <div class="{{ $heroPhotoLeft }}">
          <img src="{{ $image('hero-pretzels') }}" alt="A basket of glossy brown pretzels on the bakery counter" width="640" height="800" fetchpriority="high" decoding="async" class="{{ $heroImage }}" />
        </div>
        <div class="{{ $heroPhotoRight }}">
          <img src="{{ $image('hero-buns') }}" alt="A tray of cinnamon buns fresh from the oven" width="640" height="800" fetchpriority="high" decoding="async" class="{{ $heroImage }}" />
        </div>
      </div>
      <div class="{{ $container }}">
        <ul aria-label="Pawon Ragi in numbers" class="{{ $statsList }}">
          @foreach ($stats as $stat)
            <li>
              <p class="{{ $statValue }}">{{ $stat['value'] }}</p>
              <p class="{{ $statLabel }}">{{ $stat['label'] }}</p>
            </li>
          @endforeach
        </ul>
      </div>
    </section>

    <section aria-labelledby="roti-categories" class="{{ $section }}">
      <p class="{{ $kicker }}">Fresh today</p>
      <h2 id="roti-categories" class="{{ $h2 }}">What we bake</h2>
      <ul class="{{ $catGrid }}">
        @foreach ($categoryCards as $card)
          <li>
            <a href="#menu" class="{{ $catLink }}" x-on:click="category = @js($card['value'])">
              <div class="{{ $catMedia }}">
                <img src="{{ $image($card['image']) }}" alt="" width="640" height="512" loading="lazy" decoding="async" class="{{ $catImage }}" />
              </div>
              <div class="{{ $catBody }}">
                <h3 class="{{ $catName }}">{{ $card['label'] }}</h3>
                <p class="{{ $catText }}">{{ $card['text'] }}</p>
                <p class="{{ $catFoot }}">{{ $priceFrom($card['value']) }}<span class="{{ $catArrow }}">{{ $icon('arrow', $iconSm) }}</span></p>
              </div>
            </a>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="story" aria-labelledby="roti-story" class="{{ $storyGrid }}">
      <figure class="{{ $storyMedia }}">
        <img src="{{ $image('story') }}" alt="A baker in a hijab wrapping a loaf in brown paper in the Pawon Ragi kitchen" width="800" height="1000" loading="lazy" decoding="async" class="{{ $storyImage }}" />
        <figcaption class="{{ $storyNote }}">Sekar wraps the first delivery run herself, every morning at 6.45.</figcaption>
      </figure>
      <div>
        <p class="{{ $kicker }}">Our story</p>
        <h2 id="roti-story" class="{{ $h2 }}">Sekar and the team</h2>
        <p class="{{ $storyText }}">Pawon Ragi started in 2019 with one oven in Sekar's garage and a WhatsApp group of twelve neighbours. She baked the roti sobek her grandmother made in Kotagede, then added the croissants and pretzels she learned to laminate and knot in a bakery job abroad.</p>
        <p class="{{ $storyText }}">Today fourteen bakers and couriers work from a small kitchen on Jalan Suroto. The recipes have not changed: real butter, local flour, and no shortcuts on time.</p>
        <ul class="{{ $factList }}">
          @foreach ($facts as $fact)
            <li>
              <p class="{{ $factValue }}">{{ $fact['value'] }}</p>
              <p class="{{ $factLabel }}">{{ $fact['label'] }}</p>
            </li>
          @endforeach
        </ul>
      </div>
    </section>

    <section aria-labelledby="roti-rack" class="{{ $section }}">
      <h2 id="roti-rack" class="{{ $rackHead }}">On the racks this morning</h2>
      <ul class="{{ $rackList }}">
        @foreach ($rack as $item)
          <li>
            <a href="#menu" class="{{ $rackLink }}" x-on:click="category = @js($item['value'])">
              <img src="{{ $image($item['image']) }}" alt="" width="320" height="320" loading="lazy" decoding="async" class="{{ $rackImage }}" />
              <span class="{{ $rackLabel }}">{{ $item['label'] }}</span>
            </a>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="menu" aria-labelledby="roti-menu" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <div>
          <p class="{{ $kicker }}">Order for tomorrow</p>
          <h2 id="roti-menu" class="{{ $h2 }}">Our bakes</h2>
          <p class="{{ $lead }}">Prices are per piece unless noted. Everything is baked the morning it is delivered.</p>
        </div>
      </div>
      <div class="{{ $toolbar }}">
        <div class="{{ $filterRow }}">
          <div class="{{ $filterScroll }}">
            <x-markas.toggle-group label="Filter bakes by category" :items="$categories" value="all" class="{{ $filterGroup }}" x-model="category" />
          </div>
          <p aria-live="polite" class="{{ $countText }}" x-text="category === 'all' ? 'Showing all {{ $total }} bakes' : 'Showing ' + visibleCount + ' of {{ $total }} bakes'">Showing all {{ $total }} bakes</p>
        </div>
        <div class="{{ $stripControls }}">
          <button type="button" aria-label="Scroll bakes back" aria-controls="{{ $STRIP_ID }}" class="{{ $stripButton }}" x-on:click="scrollStrip(-1)">{{ $icon('back', $iconMd) }}</button>
          <button type="button" aria-label="Scroll more bakes" aria-controls="{{ $STRIP_ID }}" class="{{ $stripButton }}" x-on:click="scrollStrip(1)">{{ $icon('arrow', $iconMd) }}</button>
        </div>
      </div>
      <ul id="{{ $STRIP_ID }}" x-ref="strip" class="{{ $strip }}">
        @foreach ($products as $product)
          <li data-product="{{ $product['id'] }}" class="{{ $productCard }}" x-show="category === 'all' || category === @js($product['category'])">
            <div class="{{ $productMedia }}">
              <img src="{{ $image($product['id']) }}" alt="" width="560" height="560" loading="lazy" decoding="async" class="{{ $productImage }}" />
              @if ($product['tag'] !== '')
                <span class="{{ $productTag }}">{{ $product['tag'] }}</span>
              @endif
            </div>
            <div class="{{ $productBody }}">
              <h3 class="{{ $productName }}">{{ $product['name'] }}</h3>
              <p class="{{ $productText }}">{{ $product['text'] }}</p>
              <div class="{{ $productFoot }}">
                <p class="{{ $productPrice }}">{{ $rupiah($product['price']) }}</p>
                <x-markas.button size="sm" class="{{ $addButton }}" aria-label="Add to basket, {{ $product['name'] }}" x-on:click="addToCart('{{ $product['id'] }}')">{{ $icon('plus', $iconSm) }}Add</x-markas.button>
              </div>
            </div>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="how" aria-labelledby="roti-how" class="{{ $howBand }}">
      <div class="{{ $howGrid }}">
        <div>
          <p class="{{ $kicker }}">How it's made</p>
          <h2 id="roti-how" class="{{ $h2 }}">Eighteen hours from flour to your table</h2>
          <ol class="{{ $stepList }}">
            @foreach ($steps as $index => $step)
              <li class="{{ $stepItem }}">
                <span aria-hidden="true" class="{{ $stepNumber }}">{{ $index + 1 }}</span>
                <div>
                  <h3 class="{{ $stepTitle }}">{{ $step['title'] }}</h3>
                  <p class="{{ $stepText }}">{{ $step['text'] }}</p>
                </div>
              </li>
            @endforeach
          </ol>
        </div>
        <img src="{{ $image('oven') }}" alt="Two bakers shaping dough on a long table in front of a brick oven" width="1200" height="800" loading="lazy" decoding="async" class="{{ $howImage }}" />
      </div>
    </section>

    <section id="reviews" aria-labelledby="roti-reviews" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <div>
          <p class="{{ $kicker }}">Reviews</p>
          <h2 id="roti-reviews" class="{{ $h2 }}">What people are saying</h2>
        </div>
        <p class="{{ $ratingLine }}"><span class="{{ $ratingValue }}">4.9 out of 5</span>from 6.100 reviews</p>
      </div>
      <ul class="{{ $reviewGrid }}">
        @foreach ($reviews as $review)
          <li>
            <figure class="{{ $reviewCard }}">
              <p class="{{ $stars }}">
                @foreach ($ratingStars as $value)
                  {{ $icon('star', $star) }}
                @endforeach
                <span class="{{ $srOnly }}">Rated 5 out of 5</span>
              </p>
              <blockquote class="{{ $reviewText }}">{{ $review['text'] }}</blockquote>
              <figcaption class="{{ $person }}">
                <x-markas.avatar :name="$review['name']" size="md" />
                <div>
                  <p class="{{ $personName }}">{{ $review['name'] }}</p>
                  <p class="{{ $personMeta }}">{{ $review['meta'] }}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="faq" aria-labelledby="roti-faq" class="{{ $faqLayout }}">
      <div class="{{ $faqAside }}">
        <p class="{{ $kicker }}">FAQ</p>
        <h2 id="roti-faq" class="{{ $h2 }}">Good to know</h2>
        <p class="{{ $lead }}">Still wondering about something? Our team answers on WhatsApp from 7 am to 9 pm, every day.</p>
        <x-markas.button variant="secondary" class="{{ $faqButton }}" x-on:click="chat()">{{ $icon('chat', $iconSm) }}Ask on WhatsApp</x-markas.button>
      </div>
      <x-markas.faq :items="$faqs" :exclusive="true" class="{{ $faqList }}" />
    </section>

    <div class="{{ $newsWrap }}">
      <section aria-labelledby="roti-news" class="{{ $newsBand }}">
        <div>
          <h2 id="roti-news" class="{{ $newsTitle }}">Stay in the loop</h2>
          <p class="{{ $newsText }}">New bakes every Friday, early pre-order slots for holiday hampers, and one discount code a month.</p>
        </div>
        <form class="{{ $form }}" novalidate x-on:submit.prevent="subscribe()">
          <label for="{{ $EMAIL_ID }}" class="{{ $fieldLabel }}">Email address</label>
          <div class="{{ $fieldRow }}">
            <x-markas.input :id="$EMAIL_ID" type="email" name="email" autocomplete="email" placeholder="nama@email.com" class="{{ $field }}" aria-describedby="{{ $EMAIL_ID }}-note" x-model="email" x-bind:aria-invalid="emailError ? 'true' : null" />
            <x-markas.button type="submit" class="{{ $fieldButton }}">Subscribe</x-markas.button>
          </div>
          <p id="{{ $EMAIL_ID }}-note" class="{{ $fieldHint }}" x-bind:class="emailError ? @js($fieldError) : @js($fieldHint)" x-text="emailError || @js($EMAIL_HINT)">{{ $EMAIL_HINT }}</p>
        </form>
      </section>
    </div>
  </main>

  <x-markas.footer variant="big-brand" class="{{ $footer }}" description="An artisan bakery on Jalan Suroto, Kotabaru, Yogyakarta. Open every day, 6 am to 9 pm." :columns="$footerColumns" :legal="$legal" copyright="© 2026 Pawon Ragi. Built with MarkasUI." :wordmark="$BRAND">
    <x-slot:brand>{{ $footerBrandHtml }}</x-slot:brand>
    <x-slot:actions>
      <ul aria-label="Payment methods" class="{{ $payRow }}">
        @foreach ($payments as $method)
          <li class="{{ $payBadge }}">{{ $method }}</li>
        @endforeach
      </ul>
    </x-slot:actions>
  </x-markas.footer>

  <x-markas.drawer :id="$CART_ID" title="Your basket" x-on:close="onCartClose($event.currentTarget)">
    <p class="{{ $cartEmpty }}" x-show="lines.length === 0">Your basket is empty. Add a bake to get started.</p>
    <ul class="{{ $cartList }}" x-show="lines.length > 0" style="display: none">
      <template x-for="line in lines" x-bind:key="line.id">
        <li x-bind:data-cart-line="line.id" class="{{ $cartLine }}">
          <img x-bind:src="'/template-images/roti/' + line.id + '.webp'" alt="" width="56" height="56" loading="lazy" decoding="async" class="{{ $cartImage }}" />
          <div class="min-w-0">
            <p class="{{ $cartName }}" x-text="line.name"></p>
            <p class="{{ $cartMeta }}" x-text="line.qty + ' x ' + rupiah(line.price)"></p>
          </div>
          <div class="{{ $stepper }}">
            <button type="button" x-bind:aria-label="'Remove one ' + line.name" class="{{ $stepButton }}" x-on:click="changeQty(line.id, -1)">{{ $icon('minus', $iconSm) }}</button>
            <span class="{{ $stepValue }}" x-text="line.qty"></span>
            <button type="button" x-bind:aria-label="'Add one ' + line.name" class="{{ $stepButton }}" x-on:click="changeQty(line.id, 1)">{{ $icon('plus', $iconSm) }}</button>
          </div>
        </li>
      </template>
    </ul>
    <div class="{{ $cartSummary }}">
      <p class="{{ $summaryRow }}"><span>Subtotal</span><span data-subtotal="" x-text="rupiah(subtotal)">Rp 0</span></p>
      <p class="{{ $shipNote }}" x-text="deliveryNote">Add Rp 150.000 more for free delivery in Jogja.</p>
    </div>
    <x-slot:footer>
      <x-markas.button variant="secondary" type="submit" value="cancel">Keep browsing</x-markas.button>
      <x-markas.button type="submit" value="checkout" disabled x-bind:disabled="cartCount === 0">Order on WhatsApp</x-markas.button>
    </x-slot:footer>
  </x-markas.drawer>

  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
