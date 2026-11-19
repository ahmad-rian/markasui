@php
    // Kelas Tailwind dan data contoh, identik dengan versi React (satu blok JSON hasil salinan konstanta React).
    $data = json_decode(<<<'JSON'
    {"focusRing":"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","root":"min-h-dvh bg-canvas pb-28 text-ink md:pb-0","container":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8","footerEdge":"px-[max(1rem,calc((100%-78rem)/2))]","promoBar":"bg-primary px-4 py-2 text-center text-xs leading-5 text-on-primary sm:text-sm","promoCode":"font-semibold","header":"sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur-md","headerRow":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-3 py-3 lg:grid-cols-[auto_auto_minmax(0,1fr)_auto] lg:gap-x-6","iconButton":"relative inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","iconSize":"size-6","countBadge":"absolute top-0.5 right-0.5 h-4 min-w-4 rounded-full bg-danger px-1 text-center text-[10px] leading-4 font-semibold text-on-primary","brandLink":"flex min-w-0 items-center gap-2.5 rounded-md text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","brandMark":"flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary","brandName":"block text-lg leading-5 font-semibold tracking-tight","brandTagline":"hidden truncate text-xs text-muted sm:block","actions":"col-start-3 row-start-1 flex items-center gap-0.5 sm:gap-1 lg:col-start-4","accountLink":"relative hidden size-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-subtle sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","searchForm":"col-span-3 row-start-2 flex items-center gap-2 lg:col-span-1 lg:col-start-3 lg:row-start-1","searchField":"relative min-w-0 flex-1","searchIcon":"pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted","searchInput":"h-11 rounded-full! bg-subtle pl-11 text-base sm:text-sm","searchButton":"h-11 shrink-0 rounded-full! px-5","srOnly":"sr-only","categoryNav":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-5","categoryList":"-mx-4 flex snap-x gap-1 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:justify-between sm:px-0 [&::-webkit-scrollbar]:hidden","categoryLink":"group flex w-[4.75rem] shrink-0 snap-start flex-col items-center gap-2 rounded-xl py-1 text-center text-xs font-medium text-ink sm:w-24 sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","categoryBubble":"flex size-14 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 group-hover:border-primary group-hover:bg-primary-soft sm:size-16","categoryIcon":"size-6 sm:size-7","hero":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6","heroCard":"grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]","heroCopy":"flex flex-col justify-center p-6 sm:p-10 lg:py-14 lg:pr-6 lg:pl-14","eyebrow":"inline-flex items-center gap-2 text-sm font-medium text-primary","eyebrowDot":"size-2 shrink-0 rounded-full bg-danger","h1":"mt-4 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl","heroLead":"mt-4 max-w-lg text-base leading-relaxed text-pretty text-muted sm:text-lg","heroActions":"mt-7 flex flex-wrap gap-3","primaryLink":"inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-medium whitespace-nowrap text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","secondaryLink":"inline-flex h-12 items-center justify-center rounded-full border border-line bg-surface px-6 text-base font-medium whitespace-nowrap text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","heroMedia":"relative min-h-72 bg-subtle sm:min-h-96 lg:min-h-0","heroImage":"absolute inset-0 size-full object-cover","offerTag":"absolute top-4 right-4 grid size-24 place-content-center rounded-full bg-danger text-center text-on-primary shadow-overlay sm:top-6 sm:right-6 sm:size-28","offerSmall":"text-xs font-medium","offerBig":"text-3xl leading-none font-semibold tracking-tight sm:text-4xl","heroChip":"absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl border border-line bg-surface p-2 pr-4 shadow-overlay sm:bottom-6 sm:left-6","chipImage":"size-12 shrink-0 rounded-xl bg-subtle object-cover","chipName":"truncate text-sm font-medium","chipPrice":"text-sm font-semibold","chipWas":"ml-1.5 text-xs font-normal text-muted line-through","trustList":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-3 gap-2 sm:gap-4","trustItem":"flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface p-3 text-center sm:flex-row sm:gap-3 sm:p-4 sm:text-left","trustIcon":"flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary","trustTitle":"text-xs leading-tight font-medium sm:text-sm","trustText":"hidden text-sm text-muted sm:block","section":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-36 pt-14 sm:pt-20","sectionHead":"flex flex-wrap items-end justify-between gap-x-6 gap-y-3","h2":"text-2xl font-semibold tracking-tight text-balance sm:text-3xl","lead":"mt-2 text-base text-pretty text-muted","textLink":"inline-flex items-center gap-1 rounded-md text-sm font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","dealCard":"mt-6 grid overflow-hidden rounded-3xl border border-line bg-surface md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]","dealMedia":"relative aspect-square bg-subtle md:aspect-auto","dealImage":"absolute inset-0 size-full object-cover object-[50%_75%]","dealBody":"flex flex-col gap-5 p-5 sm:p-8 lg:p-10","dealLabel":"inline-flex items-center gap-1.5 self-start rounded-full bg-danger px-3 py-1 text-xs font-semibold text-on-primary","dealIcon":"size-3.5","dealTitle":"text-xl leading-snug font-semibold tracking-tight text-balance sm:text-2xl","dealPriceRow":"flex flex-wrap items-baseline gap-x-3 gap-y-1","dealPrice":"text-3xl font-semibold tracking-tight","dealWas":"text-base text-muted line-through","dealOff":"text-sm font-semibold text-danger","timerLabel":"text-sm text-muted","timerGrid":"mt-2 grid max-w-sm grid-cols-4 gap-2","timerCell":"rounded-xl bg-primary-soft px-2 py-3 text-center","timerValue":"block text-2xl leading-none font-semibold tracking-tight text-primary tabular-nums sm:text-3xl","timerUnit":"mt-1 block text-xs text-muted","stockRow":"flex items-center justify-between text-sm","stockTrack":"mt-2 h-2 overflow-hidden rounded-full bg-subtle","stockBar":"h-full w-[68%] rounded-full bg-danger","dealActions":"flex flex-wrap items-center gap-3","dealButton":"h-12 rounded-full! px-6 text-base","dealNote":"text-sm text-muted","tileGrid":"mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6","tileLink":"group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","tileImage":"aspect-[4/5] w-full rounded-2xl bg-subtle object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none","tileName":"mt-3 text-sm font-medium","tileCount":"text-sm text-muted","toolbar":"mt-6 flex flex-wrap items-center justify-between gap-3","filterScroll":"-mx-4 max-w-[calc(100%+2rem)] overflow-x-auto px-4 sm:mx-0 sm:max-w-full sm:px-0","countText":"text-sm text-muted","productGrid":"mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4","productCard":"flex flex-col","productMedia":"relative overflow-hidden rounded-2xl bg-subtle","productImage":"aspect-square w-full object-cover","discountBadge":"absolute top-2 left-2 rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-on-primary","wishButton":"absolute top-2 right-2 inline-flex size-9 items-center justify-center rounded-full bg-surface text-ink shadow-overlay transition-colors duration-150 hover:text-danger aria-pressed:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","wishIcon":"size-5 [[aria-pressed=true]_&]:fill-current","productBody":"flex flex-1 flex-col pt-3","productName":"line-clamp-2 text-sm leading-snug font-medium text-pretty sm:text-base","ratingRow":"mt-1.5 flex items-center gap-1 text-xs text-muted","starIcon":"size-3.5 fill-current text-warning","ratingValue":"font-medium text-ink","priceRow":"mt-1.5 flex flex-wrap items-baseline gap-x-2","priceNow":"text-base font-semibold","priceWas":"text-xs text-muted line-through","cityText":"mt-1 text-xs text-muted","addButton":"mt-3 w-full rounded-full!","promoGrid":"mt-6 grid gap-4 md:grid-cols-2","promoCard":"grid overflow-hidden rounded-3xl bg-primary-soft sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]","promoCopy":"flex flex-col items-start gap-3 p-6 sm:p-8","promoKicker":"text-sm font-medium text-primary","promoTitle":"text-2xl font-semibold tracking-tight text-balance","promoText":"text-sm leading-relaxed text-pretty text-muted","promoLink":"mt-auto inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-on-primary transition-colors duration-150 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","promoImage":"aspect-[16/10] size-full object-cover sm:aspect-auto","carouselWrap":"mt-6","slideGrid":"grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4","bestCard":"flex h-full flex-col rounded-2xl border border-line bg-surface p-2.5 sm:p-3","bestMedia":"relative","bestRank":"absolute top-2 left-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-on-primary shadow-overlay","bestImage":"aspect-square w-full rounded-xl bg-subtle object-cover","bestBody":"flex flex-1 flex-col gap-1 px-1 pt-3","bestFoot":"mt-auto flex items-center justify-between gap-2 pt-2","bestAdd":"inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","storyGrid":"mt-14 grid gap-4 sm:mt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]","quoteCard":"flex flex-col justify-between gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-10","quoteStars":"flex gap-0.5 text-warning","quoteStar":"size-5 fill-current","quoteText":"mt-4 text-xl leading-relaxed font-medium tracking-tight text-pretty sm:text-2xl","person":"flex items-center gap-3","personName":"text-sm font-medium","personRole":"text-sm text-muted","sellCard":"flex flex-col gap-5 rounded-3xl bg-primary p-6 text-on-primary sm:p-10","sellTitle":"text-2xl font-semibold tracking-tight text-balance","sellText":"text-base leading-relaxed text-pretty opacity-80","sellList":"grid gap-3 text-sm","sellItem":"flex gap-2","sellIcon":"mt-0.5 size-4 shrink-0","sellButton":"mt-auto inline-flex h-11 items-center justify-center self-start rounded-full bg-on-primary px-5 text-sm font-medium text-primary transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary","bandWrap":"mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20","band":"grid gap-6 rounded-3xl border border-primary-line bg-primary-soft p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12","bandTitle":"text-2xl font-semibold tracking-tight text-balance sm:text-3xl","bandText":"mt-2 text-base leading-relaxed text-pretty text-muted","form":"grid gap-2","fieldLabel":"text-sm font-medium","fieldRow":"flex flex-col gap-2 sm:flex-row","field":"h-11 rounded-full! bg-surface px-4 text-base sm:flex-1 sm:text-sm","fieldButton":"h-11 shrink-0 rounded-full! px-5","fieldError":"text-sm text-danger","fieldHint":"text-sm text-muted","drawerList":"grid gap-1","drawerLink":"flex items-center gap-3 rounded-lg px-2 py-2.5 text-base font-medium text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","drawerIcon":"flex size-9 items-center justify-center rounded-full bg-subtle text-ink","drawerHeading":"mt-6 mb-2 px-2 text-sm text-muted","drawerPlain":"block rounded-lg px-2 py-2 text-sm text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary","cartList":"grid gap-4","cartLine":"flex items-center gap-3","cartImage":"size-14 shrink-0 rounded-xl bg-subtle object-cover","cartName":"line-clamp-1 text-sm font-medium text-ink","cartMeta":"text-sm text-muted","cartTotal":"ml-auto text-sm font-semibold whitespace-nowrap text-ink","cartEmpty":"py-10 text-center text-sm text-muted","cartSummary":"mt-6 grid gap-2 border-t border-line pt-4","summaryRow":"flex justify-between text-base font-semibold text-ink","shipNote":"text-sm text-muted","bottomNav":"fixed inset-x-3 bottom-3 z-30 md:hidden","footer":"px-[max(1rem,calc((100%-78rem)/2))] bg-canvas","icons":{"menu":"M4 7h16M4 12h16M4 17h16","search":"M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm9 2-4-4","user":"M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0","heart":"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z","bag":"M5 8h14l-1 12H6L5 8Zm4 0V7a3 3 0 0 1 6 0v1","truck":"M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z","returns":"M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4","shield":"M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Zm-3 9 2 2 4-4","star":"M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z","arrow":"M5 12h14m-6-6 6 6-6 6","plus":"M12 5v14M5 12h14","check":"m5 12.5 4.5 4.5L19 7.5","bolt":"M13 3 5 14h6l-1 7 8-11h-6l1-7Z","fashion":"M8 4 4 7l2 4 2-1v10h8V10l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4Z","electronics":"M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm4 15h2","beauty":"M9 21h6v-9H9v9Zm1-9V7l4-3v8","home":"M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 11h18v6H3zM5 17v2m14-2v2","grocery":"M3 10h18l-2 9H5l-2-9Zm5 0 3-6m5 6-3-6","sports":"M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12","all":"M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"},"TITLE":"Everything you need, all in one place","CART_ID":"pasar-cart","MENU_ID":"pasar-menu","SEARCH_ID":"pasar-search","EMAIL_ID":"pasar-email","FREE_SHIPPING":150000,"DEAL_CYCLE":259200000,"WIB_OFFSET":25200000,"categories":[{"value":"all","label":"All","icon":"all"},{"value":"fashion","label":"Fashion","icon":"fashion"},{"value":"electronics","label":"Electronics","icon":"electronics"},{"value":"beauty","label":"Beauty","icon":"beauty"},{"value":"home","label":"Home","icon":"home"},{"value":"grocery","label":"Grocery","icon":"grocery"},{"value":"sports","label":"Sports","icon":"sports"}],"categoryItems":[{"value":"all","label":"All"},{"value":"fashion","label":"Fashion"},{"value":"electronics","label":"Electronics"},{"value":"beauty","label":"Beauty"},{"value":"home","label":"Home"},{"value":"grocery","label":"Grocery"},{"value":"sports","label":"Sports"}],"categoryRow":[{"value":"fashion","label":"Fashion","icon":"fashion"},{"value":"electronics","label":"Electronics","icon":"electronics"},{"value":"beauty","label":"Beauty","icon":"beauty"},{"value":"home","label":"Home","icon":"home"},{"value":"grocery","label":"Grocery","icon":"grocery"},{"value":"sports","label":"Sports","icon":"sports"},{"value":"all","label":"All","icon":"all"}],"trust":[{"icon":"truck","title":"Free shipping","text":"On orders over Rp 150.000"},{"icon":"returns","title":"Easy returns","text":"30 days, picked up from your door"},{"icon":"shield","title":"Secure payment","text":"QRIS, virtual account, or card"}],"tiles":[{"value":"fashion","label":"Fashion","count":"18.420 products","image":"cat-fashion"},{"value":"electronics","label":"Electronics","count":"9.310 products","image":"cat-electronics"},{"value":"beauty","label":"Beauty","count":"7.865 products","image":"cat-beauty"},{"value":"home","label":"Home and living","count":"12.040 products","image":"cat-home"},{"value":"grocery","label":"Grocery","count":"5.270 products","image":"cat-grocery"},{"value":"sports","label":"Sports","count":"4.190 products","image":"cat-sports"}],"products":[{"id":"headphones","name":"Over-ear wired headphones","category":"electronics","price":189000,"was":349000,"rating":"4.7","sold":"2.4k sold","city":"Jakarta Barat"},{"id":"sneakers","name":"Suede and canvas low-top sneakers","category":"fashion","price":279000,"was":459000,"rating":"4.8","sold":"1.1k sold","city":"Bandung"},{"id":"smartwatch","name":"Fitness smartwatch with heart rate","category":"electronics","price":449000,"was":899000,"rating":"4.6","sold":"3.2k sold","city":"Surabaya"},{"id":"skincare-set","name":"Skincare starter set, 6 pieces","category":"beauty","price":199000,"was":399000,"rating":"4.8","sold":"4.1k sold","city":"Medan"},{"id":"sunglasses","name":"Cat-eye sunglasses, UV400","category":"fashion","price":89000,"was":179000,"rating":"4.5","sold":"860 sold","city":"Denpasar"},{"id":"mug","name":"Stoneware coffee mug, 350 ml","category":"home","price":45000,"was":69000,"rating":"4.9","sold":"7.8k sold","city":"Yogyakarta"},{"id":"fruit-box","name":"Weekly fruit and vegetable box","category":"grocery","price":125000,"was":150000,"rating":"4.8","sold":"6.1k sold","city":"Bogor"},{"id":"dumbbells","name":"Hex dumbbells, 2 x 5 kg","category":"sports","price":319000,"was":429000,"rating":"4.7","sold":"940 sold","city":"Semarang"}],"bestSellers":[{"id":"headphones-studio","name":"Wireless headphones, 40 hour battery","price":399000,"was":799000,"rating":"4.8","sold":"9.3k sold"},{"id":"speaker-mini","name":"Mini Bluetooth speaker, 5 W","price":129000,"was":229000,"rating":"4.8","sold":"5.6k sold"},{"id":"cups-stack","name":"Handmade ceramic cups, set of 4","price":159000,"was":219000,"rating":"4.9","sold":"1.4k sold"},{"id":"sunglasses-black","name":"Classic browline sunglasses","price":99000,"was":199000,"rating":"4.7","sold":"3.9k sold"},{"id":"yoga-set","name":"Yoga starter kit, 4 pieces","price":249000,"was":389000,"rating":"4.7","sold":"2.2k sold"},{"id":"speaker-pebble","name":"Speaker with light show, 20 W","price":219000,"was":329000,"rating":"4.6","sold":"2.8k sold"},{"id":"headphones-corded","name":"Retro on-ear headphones","price":259000,"was":359000,"rating":"4.6","sold":"1.7k sold"},{"id":"mug-white","name":"Classic white mug, 300 ml","price":29000,"was":39000,"rating":"4.8","sold":"12k sold"}],"bestPages":[[{"id":"headphones-studio","name":"Wireless headphones, 40 hour battery","price":399000,"was":799000,"rating":"4.8","sold":"9.3k sold"},{"id":"speaker-mini","name":"Mini Bluetooth speaker, 5 W","price":129000,"was":229000,"rating":"4.8","sold":"5.6k sold"},{"id":"cups-stack","name":"Handmade ceramic cups, set of 4","price":159000,"was":219000,"rating":"4.9","sold":"1.4k sold"},{"id":"sunglasses-black","name":"Classic browline sunglasses","price":99000,"was":199000,"rating":"4.7","sold":"3.9k sold"}],[{"id":"yoga-set","name":"Yoga starter kit, 4 pieces","price":249000,"was":389000,"rating":"4.7","sold":"2.2k sold"},{"id":"speaker-pebble","name":"Speaker with light show, 20 W","price":219000,"was":329000,"rating":"4.6","sold":"2.8k sold"},{"id":"headphones-corded","name":"Retro on-ear headphones","price":259000,"was":359000,"rating":"4.6","sold":"1.7k sold"},{"id":"mug-white","name":"Classic white mug, 300 ml","price":29000,"was":39000,"rating":"4.8","sold":"12k sold"}]],"deal":{"id":"flash-speaker","name":"Portable speaker with 20 hour battery, splash resistant","price":349000,"was":899000,"sold":68,"stock":100},"catalog":[{"id":"headphones","name":"Over-ear wired headphones","category":"electronics","price":189000,"was":349000,"rating":"4.7","sold":"2.4k sold","city":"Jakarta Barat"},{"id":"sneakers","name":"Suede and canvas low-top sneakers","category":"fashion","price":279000,"was":459000,"rating":"4.8","sold":"1.1k sold","city":"Bandung"},{"id":"smartwatch","name":"Fitness smartwatch with heart rate","category":"electronics","price":449000,"was":899000,"rating":"4.6","sold":"3.2k sold","city":"Surabaya"},{"id":"skincare-set","name":"Skincare starter set, 6 pieces","category":"beauty","price":199000,"was":399000,"rating":"4.8","sold":"4.1k sold","city":"Medan"},{"id":"sunglasses","name":"Cat-eye sunglasses, UV400","category":"fashion","price":89000,"was":179000,"rating":"4.5","sold":"860 sold","city":"Denpasar"},{"id":"mug","name":"Stoneware coffee mug, 350 ml","category":"home","price":45000,"was":69000,"rating":"4.9","sold":"7.8k sold","city":"Yogyakarta"},{"id":"fruit-box","name":"Weekly fruit and vegetable box","category":"grocery","price":125000,"was":150000,"rating":"4.8","sold":"6.1k sold","city":"Bogor"},{"id":"dumbbells","name":"Hex dumbbells, 2 x 5 kg","category":"sports","price":319000,"was":429000,"rating":"4.7","sold":"940 sold","city":"Semarang"},{"id":"headphones-studio","name":"Wireless headphones, 40 hour battery","price":399000,"was":799000,"rating":"4.8","sold":"9.3k sold"},{"id":"speaker-mini","name":"Mini Bluetooth speaker, 5 W","price":129000,"was":229000,"rating":"4.8","sold":"5.6k sold"},{"id":"cups-stack","name":"Handmade ceramic cups, set of 4","price":159000,"was":219000,"rating":"4.9","sold":"1.4k sold"},{"id":"sunglasses-black","name":"Classic browline sunglasses","price":99000,"was":199000,"rating":"4.7","sold":"3.9k sold"},{"id":"yoga-set","name":"Yoga starter kit, 4 pieces","price":249000,"was":389000,"rating":"4.7","sold":"2.2k sold"},{"id":"speaker-pebble","name":"Speaker with light show, 20 W","price":219000,"was":329000,"rating":"4.6","sold":"2.8k sold"},{"id":"headphones-corded","name":"Retro on-ear headphones","price":259000,"was":359000,"rating":"4.6","sold":"1.7k sold"},{"id":"mug-white","name":"Classic white mug, 300 ml","price":29000,"was":39000,"rating":"4.8","sold":"12k sold"},{"id":"flash-speaker","name":"Portable speaker with 20 hour battery, splash resistant","price":349000,"was":899000,"sold":68,"stock":100}],"timerUnits":["Days","Hrs","Mins","Secs"],"promos":[{"kicker":"New season","title":"Linen and cotton for hot days","text":"Shirts, dresses, and wide trousers from 300 local labels, from Rp 129.000.","cta":"Shop fashion","category":"fashion","image":"promo-fashion"},{"kicker":"Home refresh","title":"Make the living room feel new","text":"Cushions, rugs, lamps, and ceramics up to 40% off this week.","cta":"Shop home","category":"home","image":"promo-home"}],"sellPoints":["Open a shop in ten minutes, no monthly fee","Pickup from your door by six courier partners","Payouts to any Indonesian bank every day"],"bottomItems":[{"value":"home","label":"Home","icon":"M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z","href":"#top"},{"value":"categories","label":"Categories","icon":"M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z","href":"#categories"},{"value":"deals","label":"Deals","icon":"M3 12V4h8l10 10-8 8L3 12Zm5-4h.01","href":"#deals"},{"value":"wishlist","label":"Wishlist","icon":"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z","href":"#products"},{"value":"account","label":"Account","icon":"M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0"}],"menuLinks":[{"label":"Track my order","href":"/orders"},{"label":"Help centre","href":"/help"},{"label":"Sell on Pasarloka","href":"/sell"}],"footerColumns":[{"title":"Shop","links":[{"label":"Categories","href":"#categories"},{"label":"Flash deals","href":"#deals"},{"label":"Best sellers","href":"#best"}]},{"title":"Sell","links":[{"label":"Open a shop","href":"/sell"},{"label":"Seller centre","href":"/seller"},{"label":"Shipping rates","href":"/shipping"}]},{"title":"Help","links":[{"label":"Track my order","href":"/orders"},{"label":"Returns","href":"/returns"},{"label":"Contact us","href":"/contact"}]}],"legal":[{"label":"Privacy","href":"/privacy"},{"label":"Terms","href":"/terms"}]}

    JSON, true);
    extract($data);

    $icon = fn (string $name, string $class) => new Illuminate\Support\HtmlString(
        '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$icons[$name].'" /></svg>'
    );
    $image = fn (string $name) => '/template-images/pasar/'.$name.'.webp';
    $rupiah = fn (int $value) => 'Rp '.number_format($value, 0, ',', '.');
    $percentOff = fn (int $price, int $was) => '-'.round((1 - $price / $was) * 100).'%';
    $itemsLabel = fn (int $count) => $count.' '.($count === 1 ? 'item' : 'items');
    $total = count($products);
    $brandMarkHtml = '<span class="'.$brandMark.'">'.$icon('bag', 'size-5').'</span>';
    $brand = new Illuminate\Support\HtmlString('<a href="#top" class="'.$brandLink.'">'.$brandMarkHtml.'<span class="min-w-0"><span class="'.$brandName.'">Pasarloka</span><span class="'.$brandTagline.'">Shop from 40.000 local sellers</span></span></a>');
    $footerBrand = new Illuminate\Support\HtmlString('<a href="#top" class="'.$brandLink.'">'.$brandMarkHtml.'Pasarloka</a>');
    // Nama dan harga setiap barang untuk keranjang (dihitung di browser).
    $catalogData = array_map(fn ($item) => ['id' => $item['id'], 'name' => $item['name'], 'price' => $item['price']], $catalog);
    $initialCart = ['mug' => 1, 'sunglasses' => 1];
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp
<div
  id="top"
  class="{{ $root }}"
  x-data="{
    category: 'all',
    cart: @js($initialCart),
    wishlist: ['smartwatch'],
    now: null,
    query: '',
    email: '',
    emailError: '',
    catalog: @js($catalogData),
    products: @js(array_map(fn ($product) => ['id' => $product['id'], 'category' => $product['category']], $products)),
    timerId: 0,
    init() {
      {{-- ToggleGroup mengosongkan pilihan saat item aktif diklik lagi; kembalikan pilihan sebelumnya. --}}
      this.$watch('category', (value, previous) => { if (!value) this.category = previous; });
      const tick = () => (this.now = Date.now());
      tick();
      this.timerId = setInterval(tick, 1000);
    },
    destroy() { clearInterval(this.timerId); },
    rupiah(value) { return 'Rp ' + String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); },
    itemsLabel(count) { return count + ' ' + (count === 1 ? 'item' : 'items'); },
    item(id) { return this.catalog.find((entry) => entry.id === id) ?? this.catalog[0]; },
    get lines() { return Object.entries(this.cart).map(([id, qty]) => ({ ...this.item(id), qty })); },
    get cartCount() { return this.lines.reduce((sum, line) => sum + line.qty, 0); },
    get subtotal() { return this.lines.reduce((sum, line) => sum + line.qty * line.price, 0); },
    get visibleCount() { return this.products.filter((product) => this.category === 'all' || product.category === this.category).length; },
    get shippingNote() {
      return this.subtotal >= @js($FREE_SHIPPING) ? 'Free shipping applied to this order.' : 'Add ' + this.rupiah(@js($FREE_SHIPPING) - this.subtotal) + ' more for free shipping.';
    },
    {{-- Sisa waktu flash deal: berganti setiap tiga hari, tepat tengah malam WIB. --}}
    timer(index) {
      if (this.now === null) return '--';
      const seconds = Math.floor((@js($DEAL_CYCLE) - ((this.now + @js($WIB_OFFSET)) % @js($DEAL_CYCLE))) / 1000);
      const parts = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
      return String(parts[index]).padStart(2, '0');
    },
    notify(title, description, variant = 'default') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    addToCart(id) {
      const count = this.cartCount;
      this.cart = { ...this.cart, [id]: (this.cart[id] ?? 0) + 1 };
      this.notify('Added to cart', this.item(id).name + '. Your cart has ' + this.itemsLabel(count + 1) + '.', 'success');
    },
    toggleWish(id) {
      this.wishlist = this.wishlist.includes(id) ? this.wishlist.filter((entry) => entry !== id) : [...this.wishlist, id];
    },
    open(id) { document.getElementById(id).showModal(); },
    pickFromMenu(value) { this.category = value; document.getElementById(@js($MENU_ID)).close(); },
    search() {
      const value = this.query.trim();
      if (value) this.notify('Results for ' + value, 'Sorted by best match. Filter by price, city, and rating on the next page.');
      else this.notify('Type something to search', 'Try headphones, batik, or rice.');
    },
    onCartClose(dialog) {
      if (dialog.returnValue === 'checkout') this.notify('Taking you to checkout', this.itemsLabel(this.cartCount) + ', ' + this.rupiah(this.subtotal) + '. Pay with QRIS, virtual account, or card.', 'success');
      dialog.returnValue = '';
    },
    onTab(value) {
      if (value === 'account') this.notify('Sign in to see your account', 'Orders, saved addresses, and vouchers live here.');
    },
    subscribe() {
      const value = this.email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { this.emailError = 'Enter a valid email address, like nama@email.com.'; return; }
      this.emailError = '';
      this.email = '';
      this.notify('You are subscribed', 'Next Thursday\'s deals are on their way to ' + value + '.', 'success');
    },
  }"
>
  <p class="{{ $promoBar }}">Free shipping on orders over Rp 150.000. New here? Use <span class="{{ $promoCode }}">PASARBARU</span> for 10% off.</p>
  <header class="{{ $header }}">
    <div class="{{ $headerRow }}">
      <button type="button" aria-label="Open menu" class="{{ $iconButton }}" x-on:click="open(@js($MENU_ID))">{{ $icon('menu', $iconSize) }}</button>
      {{ $brand }}
      <form role="search" class="{{ $searchForm }}" x-on:submit.prevent="search()">
        <div class="{{ $searchField }}">
          <label for="{{ $SEARCH_ID }}" class="{{ $srOnly }}">Search products</label>
          {{ $icon('search', $searchIcon) }}
          <x-markas.input :id="$SEARCH_ID" type="search" name="q" placeholder="Search headphones, batik, rice..." class="{{ $searchInput }}" x-model="query" />
        </div>
        <x-markas.button type="submit" class="{{ $searchButton }}">Search</x-markas.button>
      </form>
      <div class="{{ $actions }}">
        <a href="/account" aria-label="Account" class="{{ $accountLink }}">{{ $icon('user', $iconSize) }}</a>
        <a href="#products" aria-label="Wishlist, 1 item" x-bind:aria-label="'Wishlist, ' + itemsLabel(wishlist.length)" class="{{ $iconButton }}">
          {{ $icon('heart', $iconSize) }}
          <span aria-hidden="true" class="{{ $countBadge }}" x-show="wishlist.length > 0" x-text="wishlist.length">1</span>
        </a>
        <button type="button" aria-label="Cart, 2 items" x-bind:aria-label="'Cart, ' + itemsLabel(cartCount)" class="{{ $iconButton }}" x-on:click="open(@js($CART_ID))">
          {{ $icon('bag', $iconSize) }}
          <span aria-hidden="true" data-cart-count="" class="{{ $countBadge }}" x-show="cartCount > 0" x-text="cartCount">2</span>
        </button>
      </div>
    </div>
  </header>

  <main>
    <nav aria-label="Shop by category" class="{{ $categoryNav }}">
      <ul class="{{ $categoryList }}">
        @foreach ($categoryRow as $item)
          <li><a href="#products" class="{{ $categoryLink }}" x-on:click="category = @js($item['value'])"><span class="{{ $categoryBubble }}">{{ $icon($item['icon'], $categoryIcon) }}</span>{{ $item['label'] }}</a></li>
        @endforeach
      </ul>
    </nav>

    <section aria-labelledby="pasar-title" class="{{ $hero }}">
      <div class="{{ $heroCard }}">
        <div class="{{ $heroCopy }}">
          <p class="{{ $eyebrow }}"><span aria-hidden="true" class="{{ $eyebrowDot }}"></span>Payday sale, until 30 November</p>
          <h1 id="pasar-title" class="{{ $h1 }}">{{ $TITLE }}</h1>
          <p class="{{ $heroLead }}">Fashion, gadgets, groceries, and home goods from local sellers across Indonesia, with same-day delivery in 12 cities.</p>
          <div class="{{ $heroActions }}">
            <a href="#deals" class="{{ $primaryLink }}">Shop the sale{{ $icon('arrow', 'size-4') }}</a>
            <a href="#categories" class="{{ $secondaryLink }}">Browse categories</a>
          </div>
        </div>
        <div class="{{ $heroMedia }}">
          <img src="{{ $image('hero-bags') }}" alt="A hand holding red, white, and brown paper shopping bags" width="1200" height="900" fetchpriority="high" decoding="async" class="{{ $heroImage }}" />
          <p class="{{ $offerTag }}"><span class="{{ $offerSmall }}">Up to</span><span class="{{ $offerBig }}">60%</span><span class="{{ $offerSmall }}">off</span></p>
          <div class="{{ $heroChip }}">
            <img src="{{ $image('smartwatch') }}" alt="" width="48" height="48" decoding="async" class="{{ $chipImage }}" />
            <div class="min-w-0">
              <p class="{{ $chipName }}">Fitness smartwatch</p>
              <p class="{{ $chipPrice }}">Rp 449.000<span class="{{ $chipWas }}">Rp 899.000</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ul aria-label="Why shop with us" class="{{ $trustList }}">
      @foreach ($trust as $item)
        <li class="{{ $trustItem }}">
          <span class="{{ $trustIcon }}">{{ $icon($item['icon'], 'size-5') }}</span>
          <div>
            <p class="{{ $trustTitle }}">{{ $item['title'] }}</p>
            <p class="{{ $trustText }}">{{ $item['text'] }}</p>
          </div>
        </li>
      @endforeach
    </ul>

    <section id="deals" aria-labelledby="pasar-deals" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <div>
          <h2 id="pasar-deals" class="{{ $h2 }}">Flash deal</h2>
          <p class="{{ $lead }}">A new deal every three days, while stock lasts.</p>
        </div>
      </div>
      <div class="{{ $dealCard }}">
        <div class="{{ $dealMedia }}">
          <img src="{{ $image('flash-speaker') }}" alt="A dark grey portable speaker on a white table" width="600" height="600" loading="lazy" decoding="async" class="{{ $dealImage }}" />
        </div>
        <div class="{{ $dealBody }}">
          <p class="{{ $dealLabel }}">{{ $icon('bolt', $dealIcon) }}Flash deal</p>
          <h3 class="{{ $dealTitle }}">{{ $deal['name'] }}</h3>
          <p class="{{ $dealPriceRow }}">
            <span class="{{ $dealPrice }}">{{ $rupiah($deal['price']) }}</span>
            <span class="{{ $dealWas }}">{{ $rupiah($deal['was']) }}</span>
            <span class="{{ $dealOff }}">{{ $percentOff($deal['price'], $deal['was']) }}</span>
          </p>
          <div>
            <p id="pasar-timer-label" class="{{ $timerLabel }}">Deal ends in</p>
            <div role="timer" aria-labelledby="pasar-timer-label" class="{{ $timerGrid }}">
              @foreach ($timerUnits as $index => $unit)
                <p class="{{ $timerCell }}"><span data-timer="{{ $unit }}" class="{{ $timerValue }}" x-text="timer({{ $index }})">--</span><span class="{{ $timerUnit }}">{{ $unit }}</span></p>
              @endforeach
            </div>
          </div>
          <div>
            <p class="{{ $stockRow }}"><span>{{ $deal['sold'] }} of {{ $deal['stock'] }} sold</span><span class="{{ $dealNote }}">Limit 2 per customer</span></p>
            <div class="{{ $stockTrack }}"><div class="{{ $stockBar }}"></div></div>
          </div>
          <div class="{{ $dealActions }}">
            <x-markas.button class="{{ $dealButton }}" x-on:click="addToCart('{{ $deal['id'] }}')">{{ $icon('bag', 'size-5') }}Add to cart</x-markas.button>
            <span class="{{ $dealNote }}">Ships from Jakarta Utara</span>
          </div>
        </div>
      </div>
    </section>

    <section id="categories" aria-labelledby="pasar-categories" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <h2 id="pasar-categories" class="{{ $h2 }}">Popular categories</h2>
        <a href="#products" class="{{ $textLink }}" x-on:click="category = 'all'">See all products{{ $icon('arrow', 'size-4') }}</a>
      </div>
      <ul class="{{ $tileGrid }}">
        @foreach ($tiles as $tile)
          <li>
            <a href="#products" class="{{ $tileLink }}" x-on:click="category = @js($tile['value'])">
              <img src="{{ $image($tile['image']) }}" alt="" width="480" height="600" loading="lazy" decoding="async" class="{{ $tileImage }}" />
              <p class="{{ $tileName }}">{{ $tile['label'] }}</p>
              <p class="{{ $tileCount }}">{{ $tile['count'] }}</p>
            </a>
          </li>
        @endforeach
      </ul>
    </section>

    <section id="products" aria-labelledby="pasar-products" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <div>
          <h2 id="pasar-products" class="{{ $h2 }}">Today's picks</h2>
          <p class="{{ $lead }}">Prices drop at midnight WIB. Free returns on everything.</p>
        </div>
      </div>
      <div class="{{ $toolbar }}">
        <div class="{{ $filterScroll }}">
          <x-markas.toggle-group label="Filter products by category" :items="$categoryItems" value="all" x-model="category" />
        </div>
        <p aria-live="polite" class="{{ $countText }}" x-text="category === 'all' ? 'Showing all {{ $total }} products' : 'Showing ' + visibleCount + ' of {{ $total }} products'">Showing all {{ $total }} products</p>
      </div>
      <ul class="{{ $productGrid }}">
        @foreach ($products as $product)
          <li data-product="{{ $product['id'] }}" class="{{ $productCard }}" x-show="category === 'all' || category === @js($product['category'])">
            <div class="{{ $productMedia }}">
              <img src="{{ $image($product['id']) }}" alt="" width="480" height="480" loading="lazy" decoding="async" class="{{ $productImage }}" />
              <span class="{{ $discountBadge }}">{{ $percentOff($product['price'], $product['was']) }}</span>
              <button type="button" aria-label="Save {{ $product['name'] }}" aria-pressed="{{ $product['id'] === 'smartwatch' ? 'true' : 'false' }}" x-bind:aria-pressed="wishlist.includes(@js($product['id'])) ? 'true' : 'false'" class="{{ $wishButton }}" x-on:click="toggleWish(@js($product['id']))">{{ $icon('heart', $wishIcon) }}</button>
            </div>
            <div class="{{ $productBody }}">
              <h3 class="{{ $productName }}">{{ $product['name'] }}</h3>
              <p class="{{ $ratingRow }}">{{ $icon('star', $starIcon) }}<span class="{{ $ratingValue }}">{{ $product['rating'] }}</span><span aria-hidden="true">·</span>{{ $product['sold'] }}</p>
              <p class="{{ $priceRow }}"><span class="{{ $priceNow }}">{{ $rupiah($product['price']) }}</span><span class="{{ $priceWas }}">{{ $rupiah($product['was']) }}</span></p>
              <p class="{{ $cityText }}">{{ $product['city'] }}</p>
              <x-markas.button variant="secondary" size="sm" class="{{ $addButton }}" aria-label="Add to cart, {{ $product['name'] }}" x-on:click="addToCart('{{ $product['id'] }}')">Add to cart</x-markas.button>
            </div>
          </li>
        @endforeach
      </ul>
    </section>

    <section aria-labelledby="pasar-promos" class="{{ $section }}">
      <h2 id="pasar-promos" class="{{ $h2 }}">Edits for the week</h2>
      <ul class="{{ $promoGrid }}">
        @foreach ($promos as $promo)
          <li class="{{ $promoCard }}">
            <div class="{{ $promoCopy }}">
              <p class="{{ $promoKicker }}">{{ $promo['kicker'] }}</p>
              <h3 class="{{ $promoTitle }}">{{ $promo['title'] }}</h3>
              <p class="{{ $promoText }}">{{ $promo['text'] }}</p>
              <a href="#products" class="{{ $promoLink }}" x-on:click="category = @js($promo['category'])">{{ $promo['cta'] }}{{ $icon('arrow', 'size-4') }}</a>
            </div>
            <img src="{{ $image($promo['image']) }}" alt="" width="800" height="500" loading="lazy" decoding="async" class="{{ $promoImage }}" />
          </li>
        @endforeach
      </ul>
    </section>

    <section id="best" aria-labelledby="pasar-best" class="{{ $section }}">
      <div class="{{ $sectionHead }}">
        <div>
          <h2 id="pasar-best" class="{{ $h2 }}">Best sellers this week</h2>
          <p class="{{ $lead }}">Ranked by orders in the last seven days.</p>
        </div>
      </div>
      <div class="{{ $carouselWrap }}">
        <x-markas.carousel label="Best sellers" :show-dots="true">
          @foreach ($bestPages as $pageIndex => $page)
            <x-slot :name="'slide-'.$pageIndex">
              <ol start="{{ $pageIndex * 4 + 1 }}" class="{{ $slideGrid }}">
                @foreach ($page as $index => $item)
                  <li class="{{ $bestCard }}">
                    <div class="{{ $bestMedia }}">
                      <img src="{{ $image($item['id']) }}" alt="" width="480" height="480" loading="lazy" decoding="async" class="{{ $bestImage }}" />
                      <span aria-hidden="true" class="{{ $bestRank }}">{{ $pageIndex * 4 + $index + 1 }}</span>
                    </div>
                    <div class="{{ $bestBody }}">
                      <h3 class="{{ $productName }}">{{ $item['name'] }}</h3>
                      <p class="{{ $ratingRow }}">{{ $icon('star', $starIcon) }}<span class="{{ $ratingValue }}">{{ $item['rating'] }}</span><span aria-hidden="true">·</span>{{ $item['sold'] }}</p>
                      <div class="{{ $bestFoot }}">
                        <p class="{{ $priceNow }}">{{ $rupiah($item['price']) }}</p>
                        <button type="button" aria-label="Add to cart, {{ $item['name'] }}" class="{{ $bestAdd }}" x-on:click="addToCart(@js($item['id']))">{{ $icon('plus', 'size-4') }}</button>
                      </div>
                    </div>
                  </li>
                @endforeach
              </ol>
            </x-slot>
          @endforeach
        </x-markas.carousel>
      </div>
    </section>

    <div class="{{ $container }}">
      <div class="{{ $storyGrid }}">
        <figure class="{{ $quoteCard }}">
          <div>
            <p class="{{ $quoteStars }}">
              @for ($star = 0; $star < 5; $star++)
                {{ $icon('star', $quoteStar) }}
              @endfor
              <span class="{{ $srOnly }}">Rated 5 out of 5</span>
            </p>
            <blockquote class="{{ $quoteText }}">I ordered a rice cooker on Tuesday night and it reached my door in Makassar on Thursday. The lid arrived cracked, and the seller sent a new one the same day I asked.</blockquote>
          </div>
          <figcaption class="{{ $person }}">
            <x-markas.avatar name="Dewi Lestari" size="md" />
            <div>
              <p class="{{ $personName }}">Dewi Lestari</p>
              <p class="{{ $personRole }}">Bought from 14 sellers this year, Makassar</p>
            </div>
          </figcaption>
        </figure>
        <section aria-labelledby="pasar-sell" class="{{ $sellCard }}">
          <h2 id="pasar-sell" class="{{ $sellTitle }}">Sell on Pasarloka</h2>
          <p class="{{ $sellText }}">Over 40.000 small businesses sell here, from batik makers in Pekalongan to coffee roasters in Toraja.</p>
          <ul class="{{ $sellList }}">
            @foreach ($sellPoints as $point)
              <li class="{{ $sellItem }}">{{ $icon('check', $sellIcon) }}{{ $point }}</li>
            @endforeach
          </ul>
          <button type="button" class="{{ $sellButton }}" x-on:click="notify('Seller sign-up opened', 'Have your KTP and a bank account ready. It takes about ten minutes.')">Open your shop</button>
        </section>
      </div>
    </div>

    <div class="{{ $bandWrap }}">
      <section aria-labelledby="pasar-newsletter" class="{{ $band }}">
        <div>
          <h2 id="pasar-newsletter" class="{{ $bandTitle }}">Get deals before they go live</h2>
          <p class="{{ $bandText }}">Every Thursday: next week's flash deals and vouchers from new sellers. No spam.</p>
        </div>
        <form class="{{ $form }}" novalidate x-on:submit.prevent="subscribe()">
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

  <x-markas.footer class="{{ $footer }}" description="An online marketplace for local sellers across Indonesia." :columns="$footerColumns" :legal="$legal" copyright="© 2026 Pasarloka. Built with MarkasUI.">
    <x-slot:brand>{{ $footerBrand }}</x-slot:brand>
  </x-markas.footer>

  <x-markas.drawer :id="$MENU_ID" side="left" title="Shop by category">
    <ul class="{{ $drawerList }}">
      @foreach ($categoryRow as $item)
        <li><a href="#products" class="{{ $drawerLink }}" x-on:click="pickFromMenu(@js($item['value']))"><span class="{{ $drawerIcon }}">{{ $icon($item['icon'], 'size-5') }}</span>{{ $item['label'] }}</a></li>
      @endforeach
    </ul>
    <p class="{{ $drawerHeading }}">Help and account</p>
    <ul>
      @foreach ($menuLinks as $link)
        <li><a href="{{ $link['href'] }}" class="{{ $drawerPlain }}">{{ $link['label'] }}</a></li>
      @endforeach
    </ul>
  </x-markas.drawer>

  <x-markas.drawer :id="$CART_ID" title="Your cart" x-on:close="onCartClose($event.currentTarget)">
    <p class="{{ $cartEmpty }}" x-show="lines.length === 0" style="display: none">Your cart is empty.</p>
    <ul class="{{ $cartList }}" x-show="lines.length > 0">
      <template x-for="line in lines" x-bind:key="line.id">
        <li x-bind:data-cart-line="line.id" class="{{ $cartLine }}">
          <img x-bind:src="'/template-images/pasar/' + line.id + '.webp'" alt="" width="56" height="56" loading="lazy" decoding="async" class="{{ $cartImage }}" />
          <div class="min-w-0">
            <p class="{{ $cartName }}" x-text="line.name"></p>
            <p class="{{ $cartMeta }}" x-text="line.qty + ' x ' + rupiah(line.price)"></p>
          </div>
          <p class="{{ $cartTotal }}" x-text="rupiah(line.qty * line.price)"></p>
        </li>
      </template>
    </ul>
    <div class="{{ $cartSummary }}">
      <p class="{{ $summaryRow }}"><span>Subtotal</span><span data-subtotal="" x-text="rupiah(subtotal)">Rp 134.000</span></p>
      <p class="{{ $shipNote }}" x-text="shippingNote"></p>
    </div>
    <x-slot:footer>
      <x-markas.button variant="secondary" type="submit" value="cancel">Keep shopping</x-markas.button>
      <x-markas.button type="submit" value="checkout" x-bind:disabled="cartCount === 0">Checkout</x-markas.button>
    </x-slot:footer>
  </x-markas.drawer>

  <x-markas.bottom-navigation :items="$bottomItems" default-value="home" nav-label="Shop" class="{{ $bottomNav }}" x-on:change="onTab($event.detail)" />
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
