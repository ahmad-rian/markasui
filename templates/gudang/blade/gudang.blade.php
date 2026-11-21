@php
    use Illuminate\Support\HtmlString;

    // Data contoh dibagi dengan Alpine lewat satu blok JSON.
    $data = json_decode(<<<'JSON'
    {
    "icons": {"menu":"M4 6h16M4 12h16M4 18h16","box":"M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8","search":"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3","bell":"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0","plus":"M12 5v14M5 12h14","check":"m5 12.5 4.5 4.5L19 7.5","sort":"m6 15 6-6 6 6","next":"M5 12h14M13 6l6 6-6 6","download":"M12 4v11M7 10l5 5 5-5M5 20h14"},
    "pages": {"overview":{"label":"Overview","title":"Overview"},"products":{"label":"Products","title":"Products"},"movements":{"label":"Stock movements","title":"Stock movements"},"orders":{"label":"Purchase orders","title":"Purchase orders"},"shipments":{"label":"Shipments","title":"Shipments"},"suppliers":{"label":"Suppliers","title":"Suppliers"},"reports":{"label":"Reports","title":"Reports"},"settings":{"label":"Settings","title":"Settings"}},
    "pageIds": ["overview","products","movements","orders","shipments","suppliers","reports","settings"],
    "DEFAULT_PAGE": "overview",
    "TITLE_ID": "gudang-page-title",
    "PRODUCT_DRAWER": "gudang-product-drawer",
    "PRODUCT_MODAL": "gudang-product-modal",
    "ADJUST_MODAL": "gudang-adjust-modal",
    "CONTACT_MODAL": "gudang-contact-modal",
    "TODAY": "2026-11-20",
    "TODAY_LABEL": "Fri, 20 Nov 2026",
    "TAX_RATE": 0.11,
    "NEAR_CAPACITY": 90,
    "warehouses": {"jkt":{"label":"Jakarta","code":"JKT","site":"Cakung DC"},"sby":{"label":"Surabaya","code":"SBY","site":"Rungkut DC"},"mdn":{"label":"Medan","code":"MDN","site":"KIM Mabar DC"}},
    "whIds": ["jkt","sby","mdn"],
    "DEFAULT_WH": "jkt",
    "productList": [{"id":"p1","sku":"BEV-1042","name":"Teh Melati Botol 450 ml","category":"Beverages","unit":"carton","price":86000,"reorder":400,"supplier":"s1","stock":{"jkt":1840,"sby":620,"mdn":310}},{"id":"p2","sku":"BEV-1108","name":"Kopi Gayo Bubuk 250 g","category":"Beverages","unit":"carton","price":412000,"reorder":150,"supplier":"s2","stock":{"jkt":96,"sby":240,"mdn":180}},{"id":"p3","sku":"STP-2015","name":"Beras Pandan Wangi 5 kg","category":"Staples","unit":"sack","price":74500,"reorder":600,"supplier":"s3","stock":{"jkt":2460,"sby":1380,"mdn":540}},{"id":"p4","sku":"STP-2033","name":"Minyak Goreng Sawit 2 L","category":"Staples","unit":"carton","price":198000,"reorder":300,"supplier":"s4","stock":{"jkt":0,"sby":410,"mdn":265}},{"id":"p5","sku":"STP-2071","name":"Gula Pasir 1 kg","category":"Staples","unit":"bale","price":162000,"reorder":250,"supplier":"s5","stock":{"jkt":730,"sby":190,"mdn":420}},{"id":"p6","sku":"STP-2096","name":"Mi Instan Ayam Bawang","category":"Staples","unit":"carton","price":108000,"reorder":500,"supplier":"s3","stock":{"jkt":3120,"sby":1760,"mdn":0}},{"id":"p7","sku":"HSH-3004","name":"Deterjen Bubuk 1,8 kg","category":"Household","unit":"carton","price":236000,"reorder":200,"supplier":"s6","stock":{"jkt":540,"sby":88,"mdn":230}},{"id":"p8","sku":"HSH-3027","name":"Sabun Cuci Piring 800 ml","category":"Household","unit":"carton","price":144000,"reorder":180,"supplier":"s6","stock":{"jkt":410,"sby":372,"mdn":96}}],
    "categories": ["Beverages","Staples","Household"],
    "stockStatus": {"ok":{"label":"In stock","variant":"success"},"low":{"label":"Low stock","variant":"warning"},"out":{"label":"Out of stock","variant":"danger"}},
    "productColumns": [{"key":"name","label":"Product"},{"key":"category","label":"Category"},{"key":"jkt","label":"JKT"},{"key":"sby","label":"SBY"},{"key":"mdn","label":"MDN"}],
    "supplierList": [{"id":"s1","name":"PT Tirta Melati Abadi","city":"Bekasi","category":"Beverages","lead":3,"rating":4.7,"onTime":96,"contact":"Hendra Wijaya","phone":"+62 21 8840 1127","email":"hendra@tirtamelati.co.id"},{"id":"s2","name":"CV Gayo Lestari","city":"Takengon","category":"Beverages","lead":9,"rating":4.4,"onTime":88,"contact":"Cut Meutia","phone":"+62 643 2210 45","email":"meutia@gayolestari.id"},{"id":"s3","name":"PT Lumbung Pangan Nusantara","city":"Karawang","category":"Staples","lead":4,"rating":4.8,"onTime":97,"contact":"Bambang Sutrisno","phone":"+62 267 8455 310","email":"bambang@lumbungpangan.co.id"},{"id":"s4","name":"PT Sawit Makmur Sejati","city":"Dumai","category":"Staples","lead":7,"rating":4.1,"onTime":82,"contact":"Rina Siregar","phone":"+62 765 4390 882","email":"rina@sawitmakmur.co.id"},{"id":"s5","name":"PT Manis Jaya Rafinasi","city":"Cilegon","category":"Staples","lead":5,"rating":4.5,"onTime":91,"contact":"Yohanes Gunawan","phone":"+62 254 3981 204","email":"yohanes@manisjaya.co.id"},{"id":"s6","name":"PT Bersih Cemerlang","city":"Tangerang","category":"Household","lead":2,"rating":4.6,"onTime":94,"contact":"Dewi Lestari","phone":"+62 21 5577 0931","email":"dewi@bersihcemerlang.co.id"}],
    "supplierSorts": [{"value":"rating","label":"Highest rating"},{"value":"lead","label":"Shortest lead time"},{"value":"onTime","label":"Best on-time rate"}],
    "moveTypes": {"in":{"label":"Inbound","variant":"success"},"out":{"label":"Outbound","variant":"primary"},"transfer":{"label":"Transfer","variant":"neutral"},"adjust":{"label":"Adjustment","variant":"warning"}},
    "ledger": [{"id":"m1","wh":"jkt","date":"2026-11-20","time":"09:42","type":"in","product":"p3","qty":400,"ref":"GRN-20418","note":"PO-2611-009 from Lumbung Pangan"},{"id":"m2","wh":"jkt","date":"2026-11-20","time":"08:15","type":"out","product":"p6","qty":-260,"ref":"SO-48211","note":"Toko Sumber Rejeki, Bandung"},{"id":"m3","wh":"jkt","date":"2026-11-19","time":"16:30","type":"transfer","product":"p1","qty":-300,"ref":"TRF-0312","note":"To Surabaya"},{"id":"m4","wh":"jkt","date":"2026-11-19","time":"11:05","type":"adjust","product":"p2","qty":-4,"ref":"ADJ-0088","note":"Damaged in handling"},{"id":"m5","wh":"jkt","date":"2026-11-18","time":"14:20","type":"in","product":"p7","qty":180,"ref":"GRN-20402","note":"PO-2611-011 from Bersih Cemerlang"},{"id":"m6","wh":"jkt","date":"2026-11-17","time":"10:10","type":"out","product":"p5","qty":-120,"ref":"SO-48190","note":"Koperasi Sejahtera, Serang"},{"id":"m7","wh":"sby","date":"2026-11-20","time":"10:20","type":"transfer","product":"p1","qty":300,"ref":"TRF-0312","note":"From Jakarta"},{"id":"m8","wh":"sby","date":"2026-11-20","time":"07:50","type":"out","product":"p3","qty":-210,"ref":"SO-48214","note":"UD Tani Makmur, Malang"},{"id":"m9","wh":"sby","date":"2026-11-19","time":"15:10","type":"out","product":"p6","qty":-340,"ref":"SO-48203","note":"Koperasi Karya Bakti, Gresik"},{"id":"m10","wh":"sby","date":"2026-11-18","time":"09:00","type":"adjust","product":"p7","qty":-6,"ref":"ADJ-0087","note":"Cycle count variance"},{"id":"m11","wh":"sby","date":"2026-11-17","time":"13:45","type":"in","product":"p4","qty":200,"ref":"GRN-20395","note":"PO-2611-006 from Sawit Makmur"},{"id":"m12","wh":"sby","date":"2026-11-16","time":"11:30","type":"transfer","product":"p8","qty":-60,"ref":"TRF-0309","note":"To Medan"},{"id":"m13","wh":"mdn","date":"2026-11-20","time":"11:15","type":"transfer","product":"p8","qty":60,"ref":"TRF-0309","note":"From Surabaya"},{"id":"m14","wh":"mdn","date":"2026-11-20","time":"08:40","type":"out","product":"p2","qty":-36,"ref":"SO-48216","note":"Kedai Kopi Horas, Pematangsiantar"},{"id":"m15","wh":"mdn","date":"2026-11-19","time":"14:00","type":"out","product":"p6","qty":-150,"ref":"SO-48205","note":"UD Maju Bersama, Pekanbaru"},{"id":"m16","wh":"mdn","date":"2026-11-18","time":"10:30","type":"adjust","product":"p4","qty":12,"ref":"ADJ-0086","note":"Found during cycle count"},{"id":"m17","wh":"mdn","date":"2026-11-17","time":"09:20","type":"in","product":"p5","qty":160,"ref":"GRN-20391","note":"PO-2611-004 from Manis Jaya"},{"id":"m18","wh":"mdn","date":"2026-11-16","time":"15:00","type":"out","product":"p1","qty":-90,"ref":"SO-48177","note":"Toko Harapan, Padang"}],
    "moveFilters": [{"value":"all","label":"All"},{"value":"in","label":"Inbound"},{"value":"out","label":"Outbound"},{"value":"transfer","label":"Transfer"},{"value":"adjust","label":"Adjustment"}],
    "reasons": ["Cycle count","Damaged","Expired","Found stock"],
    "ADJUST_TIME": "14:05",
    "NEXT_ADJUSTMENT": 89,
    "days": ["Sat","Sun","Mon","Tue","Wed","Thu","Fri"],
    "flows": {"jkt":[[820,760],[540,610],[1100,910],[760,1020],[1310,990],[890,1140],[1240,986]],"sby":[[480,520],[310,290],[690,640],[850,700],[560,780],[640,590],[720,815]],"mdn":[[260,240],[120,180],[380,310],[300,420],[450,330],[340,290],[410,362]]},
    "AXIS_STEP": 500,
    "seriesOptions": [{"value":"both","label":"Both"},{"value":"in","label":"Inbound"},{"value":"out","label":"Outbound"}],
    "zones": {"jkt":[{"label":"Zone A, ambient racking","value":78},{"label":"Zone B, cold room","value":64},{"label":"Zone C, bulk floor","value":92},{"label":"Zone D, staging dock","value":41}],"sby":[{"label":"Zone A, ambient racking","value":66},{"label":"Zone B, cold room","value":48},{"label":"Zone C, bulk floor","value":73},{"label":"Zone D, staging dock","value":57}],"mdn":[{"label":"Zone A, ambient racking","value":52},{"label":"Zone B, cold room","value":95},{"label":"Zone C, bulk floor","value":61},{"label":"Zone D, staging dock","value":34}]},
    "poSteps": ["draft","sent","received"],
    "poStatus": {"draft":{"label":"Draft","variant":"neutral","action":"Send to supplier","done":"Sent to supplier"},"sent":{"label":"Sent","variant":"primary","action":"Receive goods","done":"Goods received"},"received":{"label":"Received","variant":"success","action":"","done":""}},
    "orderList": [{"id":"PO-2611-014","wh":"jkt","supplier":"s3","status":"sent","eta":"21 Nov 2026","lines":[{"product":"p3","qty":400},{"product":"p6","qty":600}]},{"id":"PO-2611-015","wh":"jkt","supplier":"s4","status":"draft","eta":"24 Nov 2026","lines":[{"product":"p4","qty":300}]},{"id":"PO-2611-011","wh":"jkt","supplier":"s6","status":"received","eta":"18 Nov 2026","lines":[{"product":"p7","qty":180},{"product":"p8","qty":120}]},{"id":"PO-2611-013","wh":"sby","supplier":"s5","status":"sent","eta":"22 Nov 2026","lines":[{"product":"p5","qty":240}]},{"id":"PO-2611-012","wh":"sby","supplier":"s6","status":"draft","eta":"25 Nov 2026","lines":[{"product":"p7","qty":200},{"product":"p8","qty":90}]},{"id":"PO-2611-006","wh":"sby","supplier":"s4","status":"received","eta":"17 Nov 2026","lines":[{"product":"p4","qty":200}]},{"id":"PO-2611-016","wh":"mdn","supplier":"s3","status":"sent","eta":"23 Nov 2026","lines":[{"product":"p6","qty":500},{"product":"p3","qty":300}]},{"id":"PO-2611-017","wh":"mdn","supplier":"s1","status":"draft","eta":"26 Nov 2026","lines":[{"product":"p1","qty":360}]},{"id":"PO-2611-004","wh":"mdn","supplier":"s5","status":"received","eta":"17 Nov 2026","lines":[{"product":"p5","qty":160}]}],
    "orderFilters": [{"value":"all","label":"All"},{"value":"draft","label":"Draft"},{"value":"sent","label":"Sent"},{"value":"received","label":"Received"}],
    "lineColumns": [{"key":"item","label":"Item"},{"key":"qty","label":"Qty","align":"right"},{"key":"cost","label":"Unit cost","align":"right"},{"key":"subtotal","label":"Subtotal","align":"right"},{"key":"onHand","label":"On hand","align":"right"}],
    "stages": ["Picking","Packed","Shipped","Delivered"],
    "shipmentList": [{"id":"SO-48211","wh":"jkt","customer":"Toko Sumber Rejeki","city":"Bandung","items":26,"courier":"JNE Trucking","tracking":"JN3390127761","stage":"Picking"},{"id":"SO-48212","wh":"jkt","customer":"Mitra Swalayan","city":"Bogor","items":48,"courier":"Armada Gudang","tracking":"AG-B-9214-TXA","stage":"Picking"},{"id":"SO-48208","wh":"jkt","customer":"CV Berkah Abadi","city":"Semarang","items":32,"courier":"SiCepat Cargo","tracking":"SC8821904417","stage":"Packed"},{"id":"SO-48201","wh":"jkt","customer":"Toko Anugerah","city":"Cirebon","items":18,"courier":"J&T Cargo","tracking":"JT5510982236","stage":"Shipped"},{"id":"SO-48190","wh":"jkt","customer":"Koperasi Sejahtera","city":"Serang","items":12,"courier":"JNE Trucking","tracking":"JN3390127754","stage":"Delivered"},{"id":"SO-48214","wh":"sby","customer":"UD Tani Makmur","city":"Malang","items":21,"courier":"Armada Gudang","tracking":"AG-L-7730-KC","stage":"Picking"},{"id":"SO-48213","wh":"sby","customer":"Toko Barokah","city":"Kediri","items":15,"courier":"SiCepat Cargo","tracking":"SC8821904455","stage":"Packed"},{"id":"SO-48209","wh":"sby","customer":"Swalayan Delta","city":"Sidoarjo","items":40,"courier":"J&T Cargo","tracking":"JT5510982301","stage":"Packed"},{"id":"SO-48203","wh":"sby","customer":"Koperasi Karya Bakti","city":"Gresik","items":34,"courier":"JNE Trucking","tracking":"JN3390127702","stage":"Shipped"},{"id":"SO-48195","wh":"sby","customer":"Toko Lestari","city":"Madiun","items":9,"courier":"SiCepat Cargo","tracking":"SC8821904380","stage":"Delivered"},{"id":"SO-48216","wh":"mdn","customer":"Kedai Kopi Horas","city":"Pematangsiantar","items":6,"courier":"JNE Trucking","tracking":"JN3390127790","stage":"Picking"},{"id":"SO-48215","wh":"mdn","customer":"Toko Sinar Deli","city":"Binjai","items":22,"courier":"Armada Gudang","tracking":"AG-BK-8102-MD","stage":"Picking"},{"id":"SO-48210","wh":"mdn","customer":"Minimarket Tapian","city":"Tebing Tinggi","items":14,"courier":"J&T Cargo","tracking":"JT5510982340","stage":"Packed"},{"id":"SO-48205","wh":"mdn","customer":"UD Maju Bersama","city":"Pekanbaru","items":30,"courier":"SiCepat Cargo","tracking":"SC8821904402","stage":"Shipped"},{"id":"SO-48177","wh":"mdn","customer":"Toko Harapan","city":"Padang","items":11,"courier":"JNE Trucking","tracking":"JN3390127688","stage":"Delivered"}],
    "couriers": ["JNE Trucking","SiCepat Cargo","J&T Cargo","Armada Gudang"],
    "ageBuckets": ["0 to 30 days","31 to 60 days","61 to 90 days","Over 90 days"],
    "ageing": {"jkt":[58,24,12,6],"sby":[49,28,15,8],"mdn":[44,27,17,12]},
    "movers": {"jkt":[{"product":"p6","units":4180},{"product":"p3","units":3350},{"product":"p1","units":2920},{"product":"p5","units":1460},{"product":"p7","units":980}],"sby":[{"product":"p3","units":2740},{"product":"p6","units":2510},{"product":"p1","units":1630},{"product":"p4","units":1120},{"product":"p8","units":640}],"mdn":[{"product":"p6","units":1980},{"product":"p5","units":1210},{"product":"p3","units":1090},{"product":"p2","units":520},{"product":"p1","units":470}]},
    "periods": [{"value":"30","label":"30 days"},{"value":"90","label":"90 days"}],
    "QUARTER_FACTOR": 2.8,
    "exportFormats": ["CSV","PDF"],
    "stockUnits": ["Carton","Pallet","Piece"],
    "weightUnits": ["Kilogram","Ton"],
    "alerts": [{"key":"low","label":"Low stock alerts","hint":"When an item drops below its reorder point"},{"key":"delay","label":"Inbound delays","hint":"When a purchase order misses its arrival date"},{"key":"exception","label":"Shipment exceptions","hint":"Failed pickups and returned parcels"},{"key":"digest","label":"Daily summary email","hint":"Sent at 07:00 to warehouse managers"}],
    "defaultAlerts": ["low","delay","exception"],
    "SAFETY_DEFAULT": "14",
    "SAFETY_MAX": 90,
    "USER": {"name":"Rudi Hartono","initials":"RH","role":"Warehouse manager"},
    "notices": [{"title":"Minyak Goreng Sawit 2 L is out of stock in Jakarta","time":"12 minutes ago"},{"title":"PO-2611-014 from Lumbung Pangan arrives tomorrow","time":"1 hour ago"},{"title":"SO-48190 was delivered to Koperasi Sejahtera","time":"Yesterday, 16:20"}],
    "userMenu": [{"label":"Profile","value":"Profile"},{"label":"Team members","value":"Team members"},{"separator":true},{"label":"Sign out","value":"Sign out"}],
    "emptyProduct": {"name":"","sku":"","category":"Beverages","stock":""},
    "emptyAdjustment": {"product":"p1","qty":"","reason":"Cycle count"}
    }
    JSON, true);

    // Kelas Tailwind, identik dengan versi React dan Vue.
    $shell = 'min-h-dvh bg-canvas text-ink';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $iconButton = 'inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink transition-colors duration-150 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $whGroup = 'flex shrink-0 items-center gap-0.5 rounded-lg bg-subtle p-0.5 max-sm:order-last max-sm:w-full';
    $whBase = 'inline-flex h-9 items-center justify-center rounded-md px-2.5 max-sm:flex-1 text-sm font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $whOn = 'bg-surface text-ink ring-1 ring-line';
    $whOff = 'text-muted hover:text-ink';
    $tabBase = 'inline-flex h-11 items-center border-b-2 px-3 text-sm whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $tabOn = 'border-primary font-medium text-ink';
    $tabOff = 'border-transparent text-muted hover:text-ink';
    $menuItem = 'flex h-10 w-full items-center rounded-lg px-3 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $menuOn = 'bg-primary-soft text-primary';
    $menuOff = 'text-ink hover:bg-subtle';
    $bellTrigger = '[&>button]:relative [&>button]:size-10 [&>button]:px-0';
    $userTrigger = '[&>button]:gap-1.5 [&>button]:px-1.5';
    $userFace = 'inline-flex size-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-on-primary';
    $card = 'rounded-xl border border-line bg-surface';
    $cardHead = 'flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-2.5';
    $cardTitle = 'text-sm font-semibold';
    $toolbar = 'flex flex-wrap items-center gap-2';
    $toolbarEnd = 'flex flex-wrap items-center gap-2 sm:ml-auto';
    $scroller = 'overflow-x-auto';
    $table = 'w-full border-collapse text-sm';
    $th = 'h-10 border-b border-line bg-subtle px-4 text-left text-xs font-medium whitespace-nowrap text-muted';
    $td = 'border-b border-line px-4 py-2.5 whitespace-nowrap';
    $sortButton = '-mx-1 inline-flex h-7 items-center gap-1 rounded-sm px-1 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $mono = 'font-mono text-xs text-muted';
    $linkButton = 'rounded-sm text-left font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $kpiGrid = 'grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line';
    $kpiCell = 'grid content-start gap-1 bg-surface p-4';
    $kpiValue = 'text-2xl font-semibold tracking-tight tabular-nums';
    $bar = 'w-full max-w-6 rounded-t-sm';
    $barIn = 'bg-primary';
    $barOut = 'bg-primary-line';
    $legendDot = 'size-2 rounded-xs';
    $warnBar = '[&::-moz-progress-bar]:bg-warning [&::-webkit-progress-value]:bg-warning';
    $stepDot = 'flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold';
    $stepDone = 'border-primary bg-primary text-on-primary';
    $stepNow = 'border-primary text-primary';
    $stepNext = 'border-line text-muted';
    $orderItem = 'grid w-full gap-1 border-b border-line px-4 py-3 text-left transition-colors duration-150 last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary -outline-offset-2';
    $orderOn = 'bg-primary-soft';
    $orderOff = 'hover:bg-subtle';
    $meter = 'h-2 overflow-hidden rounded-full bg-subtle';
    $fieldGrid = 'grid items-start gap-4 sm:grid-cols-2';
    $formFooter = 'flex flex-wrap justify-end gap-2 pt-2';

    $html = fn (string $markup) => new HtmlString($markup);
    // Ikon garis 24px. $attrs untuk atribut tambahan (mis. :class Alpine).
    $icon = fn (string $name, string $class = 'size-5', string $attrs = '') => $html('<svg class="'.$class.'" '.$attrs.' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.$data['icons'][$name].'" /></svg>');
    // Pesan error di bawah field, isi dari ekspresi Alpine.
    $error = fn (string $id, string $expr) => $html('<template x-if="'.$expr.'"><p id="'.$id.'" class="text-sm text-danger" x-text="'.$expr.'"></p></template>');
    // Hint yang berganti menjadi pesan error.
    $note = fn (string $id, string $expr, string $hint) => $html('<p id="'.$id.'" class="text-sm" :class="'.$expr.' ? \'text-danger\' : \'text-muted\'" x-text="'.$expr.' || '.e(json_encode($hint)).'"></p>');
    $stockLabel = $html('Opening stock in <span x-text="warehouses[wh].label"></span>');
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp

<script type="application/json" id="gudang-data">{!! json_encode(array_diff_key($data, ['icons' => 1]), JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE) !!}</script>
<div
  class="{{ $shell }}"
  x-data="{
    ...JSON.parse(document.getElementById('gudang-data').textContent),
    page: 'overview',
    {{-- view mengikuti page; dikosongkan sesaat saat gudang berganti supaya state halaman dibuat ulang. --}}
    view: '',
    wh: 'jkt',
    query: '',
    unread: true,
    {{-- Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. --}}
    readHash() {
      const id = window.location.hash.slice(1);
      return id in this.pages ? id : this.DEFAULT_PAGE;
    },
    open(id) {
      this.page = id;
      this.view = id;
    },
    go(id) {
      window.location.assign('#' + id);
    },
    current(id) {
      return this.page === id ? 'page' : null;
    },
    setWarehouse(id) {
      if (id === this.wh) return;
      this.wh = id;
      this.view = '';
      this.$nextTick(() => (this.view = this.page));
    },
    notify(title, description = '', variant = 'success') {
      this.$dispatch('markas-toast', { title, description, variant });
    },
    openDialog(id) {
      document.getElementById(id).showModal();
    },
    closeDialog(id) {
      document.getElementById(id).close();
    },
    num(value) {
      return value.toLocaleString('id-ID');
    },
    signed(value) {
      return (value > 0 ? '+' : '') + this.num(value);
    },
    rupiah(value) {
      return 'Rp ' + this.num(value);
    },
    {{-- Rupiah ringkas untuk angka besar: miliar (M) atau juta (jt). --}}
    compact(value) {
      return value >= 1e9 ? 'Rp ' + (value / 1e9).toFixed(2).replace('.', ',') + ' M' : 'Rp ' + (value / 1e6).toFixed(1).replace('.', ',') + ' jt';
    },
    plural(count, word) {
      return count + ' ' + word + (count === 1 ? '' : 's');
    },
    shortDate(iso) {
      return Number(iso.slice(8)) + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(iso.slice(5, 7)) - 1];
    },
    productById(id) {
      return this.productList.find((item) => item.id === id);
    },
    supplierById(id) {
      return this.supplierList.find((item) => item.id === id);
    },
    statusOf(product, wh) {
      return product.stock[wh] === 0 ? 'out' : product.stock[wh] <= product.reorder ? 'low' : 'ok';
    },
    stockValue(wh) {
      return this.productList.reduce((sum, item) => sum + item.stock[wh] * item.price, 0);
    },
    orderTotal(order) {
      return order.lines.reduce((sum, line) => sum + line.qty * this.productById(line.product).price, 0);
    },
    toggleIn(list, id) {
      return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
    },
  }"
  x-init="open(readHash())"
  x-on:hashchange.window="open(readHash()); $nextTick(() => document.getElementById('gudang-page-title').focus())"
>
  <header class="border-b border-line bg-surface">
    <div class="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 py-2 sm:gap-3 lg:px-6">
      <x-markas.drawer title="Menu" side="left">
        <x-slot:trigger>
          <button type="button" aria-label="Open menu" class="{{ $iconButton }} lg:hidden">{{ $icon('menu') }}</button>
        </x-slot:trigger>
        <form method="dialog" class="grid gap-1">
          @foreach ($data['pages'] as $id => $meta)
            <button type="submit" class="{{ $menuItem }}" :class="page === '{{ $id }}' ? @js($menuOn) : @js($menuOff)" :aria-current="current('{{ $id }}')" @click="go('{{ $id }}')">{{ $meta['label'] }}</button>
          @endforeach
        </form>
      </x-markas.drawer>
      <div class="flex shrink-0 items-center gap-2">
        <span aria-hidden="true" class="flex size-8 items-center justify-center rounded-lg bg-primary text-on-primary">{{ $icon('box', 'size-4.5') }}</span>
        <p class="text-base font-semibold tracking-tight">Gudang</p>
      </div>
      <div role="group" aria-label="Warehouse" class="{{ $whGroup }}">
        @foreach ($data['warehouses'] as $id => $meta)
          <button type="button" class="{{ $whBase }}" :class="wh === '{{ $id }}' ? @js($whOn) : @js($whOff)" :aria-pressed="wh === '{{ $id }}' ? 'true' : 'false'" @click="setWarehouse('{{ $id }}')">{{ $meta['label'] }}</button>
        @endforeach
      </div>
      <div class="ml-auto flex items-center gap-2">
        <form role="search" class="w-64 max-lg:hidden" @submit.prevent="go('products')">
          <x-markas.input type="search" aria-label="Search products" placeholder="Search SKU or product" x-model="query" />
        </form>
        <x-markas.popover align="end" class="{{ $bellTrigger }}">
          <x-slot:trigger>{{ $icon('bell') }}<span class="sr-only" x-text="unread ? 'Notifications, {{ count($data['notices']) }} unread' : 'Notifications'"></span><template x-if="unread"><span aria-hidden="true" class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"></span></template></x-slot:trigger>
          <p class="font-semibold">Notifications</p>
          <ul class="mt-2">
            @foreach ($data['notices'] as $notice)
              <li class="border-b border-line py-2 last:border-b-0">
                <p :class="unread && 'font-medium'">{{ $notice['title'] }}</p>
                <p class="text-xs text-muted">{{ $notice['time'] }}</p>
              </li>
            @endforeach
          </ul>
          <x-markas.button variant="secondary" size="sm" class="mt-2 w-full" x-bind:disabled="!unread" @click="unread = false">Mark all as read</x-markas.button>
        </x-markas.popover>
        <x-markas.dropdown-menu :items="$data['userMenu']" class="{{ $userTrigger }}" x-on:markas-select="notify($event.detail, USER.name + ', ' + USER.role)">
          <x-slot:trigger><span aria-hidden="true" class="{{ $userFace }}">{{ $data['USER']['initials'] }}</span><span class="sr-only">Account menu</span></x-slot:trigger>
        </x-markas.dropdown-menu>
      </div>
    </div>
    <nav aria-label="Sections" class="mx-auto flex max-w-[1440px] gap-1 px-3 max-lg:hidden">
      @foreach ($data['pages'] as $id => $meta)
        <button type="button" class="{{ $tabBase }}" :class="page === '{{ $id }}' ? @js($tabOn) : @js($tabOff)" :aria-current="current('{{ $id }}')" @click="go('{{ $id }}')">{{ $meta['label'] }}</button>
      @endforeach
    </nav>
  </header>

  <main class="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] content-start gap-5 px-4 pt-5 pb-12 lg:px-6">
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h1 id="gudang-page-title" tabindex="-1" class="text-xl font-semibold tracking-tight focus:outline-none" x-text="pages[page].title">{{ $data['pages']['overview']['title'] }}</h1>
      <p data-context class="text-sm text-muted" x-text="warehouses[wh].label + ' · ' + warehouses[wh].site + ' · ' + TODAY_LABEL"></p>
    </div>

    {{-- Overview --}}
    <template x-if="view === 'overview'">
      <div
        class="contents"
        x-data="{
          series: 'both',
          get flow() {
            return this.flows[this.wh];
          },
          get axisMax() {
            return Math.ceil(Math.max(...this.flow.flat()) / this.AXIS_STEP) * this.AXIS_STEP;
          },
          get today() {
            return this.flow[this.flow.length - 1];
          },
          get yesterday() {
            return this.flow[this.flow.length - 2];
          },
          get totalIn() {
            return this.flow.reduce((sum, day) => sum + day[0], 0);
          },
          get totalOut() {
            return this.flow.reduce((sum, day) => sum + day[1], 0);
          },
          get short() {
            return this.productList.filter((item) => this.statusOf(item, this.wh) !== 'ok');
          },
          get full() {
            return this.zones[this.wh].filter((zone) => zone.value >= this.NEAR_CAPACITY);
          },
          get kpis() {
            return [
              { label: 'Stock value', value: this.compact(this.stockValue(this.wh)), note: this.plural(this.productList.length, 'SKU') + ' on hand' },
              { label: 'Below reorder point', value: String(this.short.length), note: this.short.filter((item) => this.statusOf(item, this.wh) === 'out').length + ' out of stock' },
              { label: 'Inbound today', value: this.num(this.today[0]), note: this.signed(this.today[0] - this.yesterday[0]) + ' units vs yesterday' },
              { label: 'Outbound today', value: this.num(this.today[1]), note: this.signed(this.today[1] - this.yesterday[1]) + ' units vs yesterday' },
            ];
          },
          get activity() {
            return this.ledger.filter((move) => move.wh === this.wh).slice(0, 5);
          },
        }"
      >
        <dl class="{{ $kpiGrid }} lg:grid-cols-4">
          <template x-for="kpi in kpis" :key="kpi.label">
            <div class="{{ $kpiCell }}">
              <dt class="text-xs text-muted" x-text="kpi.label"></dt>
              <dd :data-kpi="kpi.label" class="{{ $kpiValue }}" x-text="kpi.value"></dd>
              <dd class="text-xs text-muted" x-text="kpi.note"></dd>
            </div>
          </template>
        </dl>

        <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section class="{{ $card }}" aria-labelledby="gudang-flow-title">
            <div class="{{ $cardHead }}">
              <h2 id="gudang-flow-title" class="{{ $cardTitle }}">Stock movement, last 7 days</h2>
              <x-markas.toggle-group label="Chart series" :items="$data['seriesOptions']" value="both" x-effect="if (selected.length) series = selected[0]; else selected = [series]" />
            </div>
            <div class="p-4">
              <div role="img" :aria-label="'Units per day for the last 7 days. Today: ' + num(today[0]) + ' inbound and ' + num(today[1]) + ' outbound.'" class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2">
                <div class="flex h-44 flex-col justify-between text-right text-xs text-muted tabular-nums">
                  <span x-text="num(axisMax)"></span>
                  <span x-text="num(axisMax / 2)"></span>
                  <span>0</span>
                </div>
                <div class="flex h-44 items-end gap-2 border-b border-line bg-[linear-gradient(var(--color-line)_1px,transparent_1px)] bg-size-[100%_50%] sm:gap-4">
                  <template x-for="(day, index) in flow" :key="index">
                    <div :data-day="days[index]" class="flex h-full flex-1 items-end justify-center gap-1">
                      <template x-if="series !== 'out'"><span data-bar="in" class="{{ $bar }} {{ $barIn }}" :style="{ height: (day[0] / axisMax) * 100 + '%' }"></span></template>
                      <template x-if="series !== 'in'"><span data-bar="out" class="{{ $bar }} {{ $barOut }}" :style="{ height: (day[1] / axisMax) * 100 + '%' }"></span></template>
                    </div>
                  </template>
                </div>
                <span></span>
                <div class="flex gap-2 text-center text-xs text-muted sm:gap-4">
                  @foreach ($data['days'] as $day)
                    <span class="flex-1">{{ $day }}</span>
                  @endforeach
                </div>
              </div>
              <dl class="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-3 text-sm">
                <div class="flex items-center gap-2">
                  <span aria-hidden="true" class="{{ $legendDot }} {{ $barIn }}"></span>
                  <dt class="text-muted">Inbound</dt>
                  <dd class="font-medium tabular-nums" x-text="num(totalIn)"></dd>
                </div>
                <div class="flex items-center gap-2">
                  <span aria-hidden="true" class="{{ $legendDot }} {{ $barOut }}"></span>
                  <dt class="text-muted">Outbound</dt>
                  <dd class="font-medium tabular-nums" x-text="num(totalOut)"></dd>
                </div>
                <div class="flex items-center gap-2 sm:ml-auto">
                  <dt class="text-muted">Net change</dt>
                  <dd class="font-medium tabular-nums" x-text="signed(totalIn - totalOut) + ' units'"></dd>
                </div>
              </dl>
            </div>
          </section>

          <section class="{{ $card }}" aria-labelledby="gudang-zones-title">
            <div class="{{ $cardHead }}">
              <h2 id="gudang-zones-title" class="{{ $cardTitle }}">Capacity by zone</h2>
              <span class="text-xs text-muted" x-text="warehouses[wh].site"></span>
            </div>
            <ul class="grid gap-4 p-4">
              {{-- Label zona sama di semua gudang; nilai dan persen diisi Alpine. --}}
              @foreach ($data['zones']['jkt'] as $index => $zone)
                <li x-effect="$el.querySelector('label + span').textContent = zones[wh][{{ $index }}].value + '%'">
                  <x-markas.progress :label="$zone['label']" :value="$zone['value']" x-bind:value="zones[wh][{{ $index }}].value" x-bind:class="zones[wh][{{ $index }}].value >= NEAR_CAPACITY && @js($warnBar)" />
                </li>
              @endforeach
            </ul>
            <p class="border-t border-line px-4 py-3 text-xs text-muted" x-text="full.length > 0 ? full[0].label.slice(0, 6) + ' is above ' + NEAR_CAPACITY + '%. Plan a transfer before the next inbound.' : 'All zones have room for the next inbound.'"></p>
          </section>
        </div>

        <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section class="{{ $card }}" aria-labelledby="gudang-activity-title">
            <div class="{{ $cardHead }}">
              <h2 id="gudang-activity-title" class="{{ $cardTitle }}">Recent activity</h2>
              <x-markas.button variant="ghost" size="sm" @click="go('movements')">Open ledger{{ $icon('next', 'size-4') }}</x-markas.button>
            </div>
            <ul>
              <template x-for="move in activity" :key="move.id">
                <li :data-activity="move.id" class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-b border-line px-4 py-2.5 last:border-b-0 sm:grid-cols-[104px_minmax(0,1fr)_auto]">
                  <span class="max-sm:col-span-2">@foreach ($data['moveTypes'] as $key => $meta)<x-markas.badge :variant="$meta['variant']" x-show="move.type === '{{ $key }}'">{{ $meta['label'] }}</x-markas.badge>@endforeach</span>
                  <span class="min-w-0">
                    <span class="block truncate text-sm font-medium" x-text="productById(move.product).name"></span>
                    <span class="block truncate text-xs text-muted" x-text="shortDate(move.date) + ', ' + move.time + ' · ' + move.ref + ' · ' + move.note"></span>
                  </span>
                  <span class="text-sm font-medium tabular-nums" x-text="signed(move.qty)"></span>
                </li>
              </template>
            </ul>
          </section>

          <section class="{{ $card }}" aria-labelledby="gudang-short-title">
            <div class="{{ $cardHead }}">
              <h2 id="gudang-short-title" class="{{ $cardTitle }}">Below reorder point</h2>
              <span class="text-xs text-muted" x-text="plural(short.length, 'item')"></span>
            </div>
            <ul>
              <template x-for="item in short" :key="item.id">
                <li :data-short="item.id" class="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-b-0">
                  <span class="min-w-0 flex-1">
                    <span class="block truncate text-sm font-medium" x-text="item.name"></span>
                    <span class="block text-xs text-muted tabular-nums" x-text="num(item.stock[wh]) + ' of ' + num(item.reorder) + ' ' + item.unit"></span>
                  </span>
                  <x-markas.button variant="secondary" size="sm" x-bind:aria-label="'Reorder ' + item.name" @click="notify('Draft PO created', item.name + ' from ' + supplierById(item.supplier).name)">Reorder</x-markas.button>
                </li>
              </template>
            </ul>
          </section>
        </div>
      </div>
    </template>

    {{-- Products --}}
    <template x-if="view === 'products'">
      <div
        class="contents"
        x-data="{
          items: productList,
          category: 'all',
          sort: { key: 'name', asc: true },
          picked: [],
          productId: 'p1',
          draft: { ...emptyProduct },
          errors: {},
          sortValue(item) {
            return this.sort.key in item.stock ? item.stock[this.sort.key] : item[this.sort.key];
          },
          get rows() {
            const needle = this.query.trim().toLowerCase();
            return this.items
              .filter((item) => (this.category === 'all' || item.category === this.category) && (item.name + ' ' + item.sku).toLowerCase().includes(needle))
              .toSorted((a, b) => {
                const [x, y] = [this.sortValue(a), this.sortValue(b)];
                const order = typeof x === 'number' ? x - y : x.localeCompare(String(y));
                return this.sort.asc ? order : -order;
              });
          },
          get allPicked() {
            return this.rows.length > 0 && this.rows.every((row) => this.picked.includes(row.id));
          },
          get product() {
            return this.items.find((item) => item.id === this.productId) ?? this.items[0];
          },
          get history() {
            return this.ledger.filter((move) => move.product === this.product.id);
          },
          ariaSort(key) {
            return this.sort.key !== key ? null : this.sort.asc ? 'ascending' : 'descending';
          },
          bulk(title) {
            this.notify(title, this.plural(this.picked.length, 'product'));
            this.picked = [];
          },
          openProduct(id) {
            this.productId = id;
            this.openDialog(this.PRODUCT_DRAWER);
          },
          newProduct() {
            this.draft = { ...this.emptyProduct };
            this.errors = {};
            this.openDialog(this.PRODUCT_MODAL);
          },
          submitProduct() {
            const sku = this.draft.sku.trim().toUpperCase();
            const stock = Number(this.draft.stock);
            const found = {
              name: this.draft.name.trim() ? '' : 'Enter a product name',
              sku: !/^[A-Z]{3}-\d{4}$/.test(sku) ? 'Use the format ABC-1234' : this.items.some((item) => item.sku === sku) ? 'This SKU already exists' : '',
              stock: this.draft.stock.trim() !== '' && Number.isInteger(stock) && stock >= 0 ? '' : 'Enter a quantity of 0 or more',
            };
            this.errors = found;
            if (Object.values(found).some(Boolean)) return;
            const added = { id: 'p' + (this.items.length + 1), sku, name: this.draft.name.trim(), category: this.draft.category, unit: 'carton', price: 0, reorder: 0, supplier: 's1', stock: { jkt: 0, sby: 0, mdn: 0, [this.wh]: stock } };
            this.items = [added, ...this.items];
            this.closeDialog(this.PRODUCT_MODAL);
            this.notify('Product added', added.name + ' (' + sku + ')');
          },
        }"
      >
        <div class="{{ $toolbar }}">
          <div class="w-full sm:w-64">
            <x-markas.input type="search" aria-label="Filter products" placeholder="Filter by name or SKU" x-model="query" />
          </div>
          <div class="w-full sm:w-44">
            <x-markas.select aria-label="Category" x-model="category">
              <option value="all">All categories</option>
              @foreach ($data['categories'] as $item)
                <option>{{ $item }}</option>
              @endforeach
            </x-markas.select>
          </div>
          <div class="{{ $toolbarEnd }}">
            <x-markas.button variant="secondary" @click="notify('Export started', 'products.csv')">{{ $icon('download', 'size-4') }}Export</x-markas.button>
            <x-markas.button @click="newProduct()">{{ $icon('plus', 'size-4') }}Add product</x-markas.button>
          </div>
        </div>

        <section class="{{ $card }}" aria-label="Product list">
          <template x-if="picked.length > 0">
            <div data-bulk class="{{ $cardHead }} bg-primary-soft">
              <p class="text-sm font-medium" x-text="picked.length + ' selected'"></p>
              <div class="flex flex-wrap gap-2">
                <x-markas.button size="sm" @click="bulk('Draft PO created')">Create PO</x-markas.button>
                <x-markas.button size="sm" variant="secondary" @click="bulk('Labels sent to printer')">Print labels</x-markas.button>
                <x-markas.button size="sm" variant="ghost" @click="picked = []">Clear</x-markas.button>
              </div>
            </div>
          </template>
          <div class="{{ $scroller }} rounded-t-xl">
            <table class="{{ $table }} min-w-[760px]">
              <thead>
                <tr>
                  <th scope="col" class="{{ $th }} w-10">
                    <x-markas.checkbox aria-label="Select all products" x-bind:checked="allPicked" @change="picked = allPicked ? [] : rows.map((row) => row.id)" />
                  </th>
                  @foreach ($data['productColumns'] as $column)
                    @php $key = $column['key']; @endphp
                    <th scope="col" :aria-sort="ariaSort('{{ $key }}')" class="{{ $th }}{{ isset($data['warehouses'][$key]) ? ' text-right' : '' }}">
                      <button type="button" class="{{ $sortButton }}" @click="sort = { key: '{{ $key }}', asc: sort.key === '{{ $key }}' ? !sort.asc : true }">{{ $column['label'] }}{{ $icon('sort', 'size-3.5', ':class="[sort.key === \''.$key.'\' ? \'text-ink\' : \'text-faint\', sort.key === \''.$key.'\' && !sort.asc && \'rotate-180\']"') }}</button>
                    </th>
                  @endforeach
                  <th scope="col" class="{{ $th }}">Status</th>
                </tr>
              </thead>
              <tbody>
                <template x-for="item in rows" :key="item.id">
                  <tr :data-product="item.sku">
                    <td class="{{ $td }}">
                      <x-markas.checkbox x-bind:id="'gudang-pick-' + item.id" x-bind:aria-label="'Select ' + item.name" x-bind:checked="picked.includes(item.id)" @change="picked = toggleIn(picked, item.id)" />
                    </td>
                    <td class="{{ $td }}">
                      <button type="button" class="{{ $linkButton }}" @click="openProduct(item.id)" x-text="item.name"></button>
                      <span class="{{ $mono }} block" x-text="item.sku"></span>
                    </td>
                    <td class="{{ $td }} text-muted" x-text="item.category"></td>
                    @foreach ($data['whIds'] as $id)
                      <td class="{{ $td }} text-right tabular-nums" :class="wh === '{{ $id }}' ? 'font-medium' : 'text-muted'" x-text="num(item.stock.{{ $id }})"></td>
                    @endforeach
                    <td class="{{ $td }}">@foreach ($data['stockStatus'] as $key => $meta)<x-markas.badge :variant="$meta['variant']" x-show="statusOf(item, wh) === '{{ $key }}'">{{ $meta['label'] }}</x-markas.badge>@endforeach</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <p data-count class="px-4 py-3 text-xs text-muted" x-text="rows.length > 0 ? plural(rows.length, 'product') + ' · status for ' + warehouses[wh].label : 'No products match this filter.'"></p>
        </section>

        <x-markas.drawer id="gudang-product-drawer" title="Product details">
          <div class="grid gap-5 text-ink">
            <div>
              <p class="text-base font-semibold" x-text="product.name"></p>
              <p class="{{ $mono }}" x-text="product.sku + ' · ' + product.category"></p>
            </div>
            <dl class="grid gap-2">
              @foreach ($data['warehouses'] as $id => $meta)
                <div class="flex items-center justify-between gap-4">
                  <dt class="text-muted">{{ $meta['label'] }}</dt>
                  <dd data-stock="{{ $id }}" class="font-medium tabular-nums" x-text="num(product.stock.{{ $id }}) + ' ' + product.unit"></dd>
                </div>
              @endforeach
              <div class="flex items-center justify-between gap-4 border-t border-line pt-2">
                <dt class="text-muted">Reorder point</dt>
                <dd class="font-medium tabular-nums" x-text="num(product.reorder) + ' ' + product.unit"></dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-muted">Unit cost</dt>
                <dd class="font-medium tabular-nums" x-text="rupiah(product.price)"></dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-muted">Supplier</dt>
                <dd class="font-medium" x-text="supplierById(product.supplier).name"></dd>
              </div>
            </dl>
            <div>
              <h3 class="{{ $cardTitle }}">Stock history</h3>
              <template x-if="history.length === 0"><p class="mt-2 text-muted">No movements yet.</p></template>
              <template x-if="history.length > 0">
                <ul class="mt-2">
                  <template x-for="move in history" :key="move.id">
                    <li :data-history="move.id" class="flex items-center justify-between gap-3 border-b border-line py-2 last:border-b-0">
                      <span>
                        <span class="block font-medium" x-text="moveTypes[move.type].label + ' · ' + warehouses[move.wh].label"></span>
                        <span class="block text-xs text-muted" x-text="shortDate(move.date) + ', ' + move.time + ' · ' + move.ref"></span>
                      </span>
                      <span class="font-medium tabular-nums" x-text="signed(move.qty)"></span>
                    </li>
                  </template>
                </ul>
              </template>
            </div>
          </div>
          <x-slot:footer>
            <x-markas.button variant="secondary" type="submit" value="close">Close</x-markas.button>
            <x-markas.button type="submit" value="reorder" @click="notify('Draft PO created', product.name)">Create PO</x-markas.button>
          </x-slot:footer>
        </x-markas.drawer>

        <x-markas.modal id="gudang-product-modal" title="Add product">
          <form novalidate class="grid gap-4" @submit.prevent="submitProduct()">
            <div class="grid gap-1.5">
              <x-markas.input label="Product name" name="name" x-model="draft.name" x-bind:aria-invalid="errors.name ? 'true' : null" x-bind:aria-describedby="errors.name ? 'gudang-name-error' : null" />
              {{ $error('gudang-name-error', 'errors.name') }}
            </div>
            <div class="{{ $fieldGrid }}">
              <div class="grid content-start gap-1.5">
                <x-markas.input label="SKU" name="sku" placeholder="ABC-1234" x-model="draft.sku" x-bind:aria-invalid="errors.sku ? 'true' : null" x-bind:aria-describedby="errors.sku ? 'gudang-sku-error' : null" />
                {{ $error('gudang-sku-error', 'errors.sku') }}
              </div>
              <x-markas.select label="Category" name="category" x-model="draft.category">
                @foreach ($data['categories'] as $item)
                  <option>{{ $item }}</option>
                @endforeach
              </x-markas.select>
            </div>
            <div class="grid gap-1.5">
              <x-markas.input :label="$stockLabel" name="stock" inputmode="numeric" x-model="draft.stock" x-bind:aria-invalid="errors.stock ? 'true' : null" x-bind:aria-describedby="errors.stock ? 'gudang-stock-error' : null" />
              {{ $error('gudang-stock-error', 'errors.stock') }}
            </div>
            <div class="{{ $formFooter }}">
              <x-markas.button type="button" variant="secondary" @click="closeDialog(PRODUCT_MODAL)">Cancel</x-markas.button>
              <x-markas.button type="submit">Save product</x-markas.button>
            </div>
          </form>
        </x-markas.modal>
      </div>
    </template>

    {{-- Stock movements --}}
    <template x-if="view === 'movements'">
      <div
        class="contents"
        x-data="{
          moves: ledger,
          type: 'all',
          from: '',
          to: '',
          draft: { ...emptyAdjustment },
          error: '',
          get rows() {
            return this.moves.filter((move) => move.wh === this.wh && (this.type === 'all' || move.type === this.type) && (!this.from || move.date >= this.from) && (!this.to || move.date <= this.to));
          },
          get net() {
            return this.rows.reduce((sum, move) => sum + move.qty, 0);
          },
          newAdjustment() {
            this.draft = { ...this.emptyAdjustment };
            this.error = '';
            this.openDialog(this.ADJUST_MODAL);
          },
          submitAdjustment() {
            const qty = Number(this.draft.qty);
            const valid = this.draft.qty.trim() !== '' && Number.isInteger(qty) && qty !== 0;
            this.error = valid ? '' : 'Enter a whole number other than 0';
            if (!valid) return;
            const count = this.moves.length - this.ledger.length;
            const added = { id: 'm' + (this.moves.length + 1), wh: this.wh, date: this.TODAY, time: this.ADJUST_TIME, type: 'adjust', product: this.draft.product, qty, ref: 'ADJ-' + String(this.NEXT_ADJUSTMENT + count).padStart(4, '0'), note: this.draft.reason };
            this.moves = [added, ...this.moves];
            this.closeDialog(this.ADJUST_MODAL);
            this.notify('Adjustment recorded', this.productById(added.product).name + ': ' + this.signed(qty) + ' ' + this.productById(added.product).unit);
          },
        }"
      >
        <div class="{{ $toolbar }}">
          <div class="{{ $scroller }} max-w-full">
            <x-markas.toggle-group label="Filter by type" :items="$data['moveFilters']" value="all" x-effect="if (selected.length) type = selected[0]; else selected = [type]" />
          </div>
          <div class="flex items-center gap-2">
            <x-markas.input type="date" aria-label="From date" x-model="from" />
            <span class="text-sm text-muted">to</span>
            <x-markas.input type="date" aria-label="To date" x-model="to" />
          </div>
          <div class="{{ $toolbarEnd }}">
            <x-markas.button @click="newAdjustment()">{{ $icon('plus', 'size-4') }}New adjustment</x-markas.button>
          </div>
        </div>

        <section class="{{ $card }}" aria-label="Stock ledger">
          <div class="{{ $scroller }} rounded-t-xl">
            <table class="{{ $table }} min-w-[820px]">
              <thead>
                <tr>
                  @foreach (['Date', 'Reference', 'Type', 'Product'] as $label)
                    <th scope="col" class="{{ $th }}">{{ $label }}</th>
                  @endforeach
                  <th scope="col" class="{{ $th }} text-right">Quantity</th>
                  <th scope="col" class="{{ $th }}">Note</th>
                </tr>
              </thead>
              <tbody>
                <template x-for="move in rows" :key="move.id">
                  <tr :data-move="move.ref">
                    <td class="{{ $td }} tabular-nums" x-text="shortDate(move.date) + ', ' + move.time"></td>
                    <td class="{{ $td }} {{ $mono }}" x-text="move.ref"></td>
                    <td class="{{ $td }}">@foreach ($data['moveTypes'] as $key => $meta)<x-markas.badge :variant="$meta['variant']" x-show="move.type === '{{ $key }}'">{{ $meta['label'] }}</x-markas.badge>@endforeach</td>
                    <td class="{{ $td }}">
                      <span class="block font-medium" x-text="productById(move.product).name"></span>
                      <span class="{{ $mono }} block" x-text="productById(move.product).sku"></span>
                    </td>
                    <td class="{{ $td }} text-right font-medium tabular-nums" x-text="signed(move.qty)"></td>
                    <td class="{{ $td }} text-muted" x-text="move.note"></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <p data-count class="px-4 py-3 text-xs text-muted" x-text="rows.length > 0 ? plural(rows.length, 'movement') + ' · net ' + signed(net) + ' units' : 'No movements in this range.'"></p>
        </section>

        <x-markas.modal id="gudang-adjust-modal" title="New adjustment">
          <form novalidate class="grid gap-4" @submit.prevent="submitAdjustment()">
            <x-markas.select label="Product" name="product" x-model="draft.product">
              @foreach ($data['productList'] as $item)
                <option value="{{ $item['id'] }}">{{ $item['sku'] }} · {{ $item['name'] }}</option>
              @endforeach
            </x-markas.select>
            <div class="{{ $fieldGrid }}">
              <div class="grid content-start gap-1.5">
                <x-markas.input label="Quantity change" name="qty" inputmode="numeric" placeholder="-12" aria-describedby="gudang-qty-note" x-model="draft.qty" x-bind:aria-invalid="error ? 'true' : null" />
                {{ $note('gudang-qty-note', 'error', 'Negative writes stock off') }}
              </div>
              <x-markas.select label="Reason" name="reason" x-model="draft.reason">
                @foreach ($data['reasons'] as $item)
                  <option>{{ $item }}</option>
                @endforeach
              </x-markas.select>
            </div>
            <div class="{{ $formFooter }}">
              <x-markas.button type="button" variant="secondary" @click="closeDialog(ADJUST_MODAL)">Cancel</x-markas.button>
              <x-markas.button type="submit">Record adjustment</x-markas.button>
            </div>
          </form>
        </x-markas.modal>
      </div>
    </template>

    {{-- Purchase orders --}}
    <template x-if="view === 'orders'">
      <div
        class="contents"
        x-data="{
          status: Object.fromEntries(orderList.map((order) => [order.id, order.status])),
          arrived: [],
          filter: 'all',
          orderId: '',
          get list() {
            return this.orderList.filter((order) => order.wh === this.wh && (this.filter === 'all' || this.status[order.id] === this.filter));
          },
          get order() {
            return this.list.find((item) => item.id === this.orderId) ?? this.list[0];
          },
          get step() {
            return this.order ? this.poSteps.indexOf(this.status[this.order.id]) : 0;
          },
          stepDoneAt(index) {
            return index < this.step || this.step === this.poSteps.length - 1;
          },
          {{-- Stok di gudang ini ditambah barang PO yang diterima selama sesi ini. --}}
          onHand(productId) {
            return this.productById(productId).stock[this.wh] + this.orderList.filter((item) => item.wh === this.wh && this.arrived.includes(item.id)).flatMap((item) => item.lines).filter((line) => line.product === productId).reduce((sum, line) => sum + line.qty, 0);
          },
          get lineRows() {
            return (this.order?.lines ?? []).map((line) => ({ item: this.productById(line.product).name, qty: this.num(line.qty), cost: this.rupiah(this.productById(line.product).price), subtotal: this.rupiah(line.qty * this.productById(line.product).price), onHand: this.num(this.onHand(line.product)) }));
          },
          {{-- Tabel dirender server dengan sel kosong; isinya ditulis dari baris PO terpilih. --}}
          fillLines(root) {
            const rows = root.querySelectorAll('tbody tr');
            this.lineRows.forEach((row, r) => this.lineColumns.forEach((column, c) => (rows[r].children[c].textContent = row[column.key])));
          },
          advance(target) {
            const from = this.status[target.id];
            const next = this.poSteps[this.poSteps.indexOf(from) + 1];
            const units = target.lines.reduce((sum, line) => sum + line.qty, 0);
            this.status = { ...this.status, [target.id]: next };
            this.orderId = target.id;
            this.filter = 'all';
            if (next === 'received') this.arrived = [...this.arrived, target.id];
            this.notify(this.poStatus[from].done, next === 'received' ? target.id + ': ' + this.signed(units) + ' units added to ' + this.warehouses[this.wh].label : target.id + ' to ' + this.supplierById(target.supplier).name);
          },
        }"
      >
        <div class="{{ $toolbar }}">
          <x-markas.toggle-group label="Filter by status" :items="$data['orderFilters']" value="all" x-effect="if (selected.length) filter = selected[0]; else selected = [filter]" x-init="$watch('filter', (next) => (selected = [next]))" />
          <div class="{{ $toolbarEnd }}">
            <x-markas.button @click="notify('Draft PO created', 'For ' + warehouses[wh].label)">{{ $icon('plus', 'size-4') }}New order</x-markas.button>
          </div>
        </div>

        <div class="grid items-start gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
          <section class="{{ $card }} overflow-hidden" aria-label="Orders">
            <template x-if="list.length === 0"><p class="px-4 py-6 text-sm text-muted">No purchase orders with this status.</p></template>
            <template x-if="list.length > 0">
              <ul>
                <template x-for="item in list" :key="item.id">
                  <li>
                    <button type="button" class="{{ $orderItem }}" :class="item.id === order.id ? @js($orderOn) : @js($orderOff)" :aria-pressed="item.id === order.id ? 'true' : 'false'" @click="orderId = item.id">
                      <span class="flex items-center justify-between gap-3">
                        <span class="font-mono text-xs font-medium" x-text="item.id"></span>
                        @foreach ($data['poStatus'] as $key => $meta)<x-markas.badge :variant="$meta['variant']" x-show="status[item.id] === '{{ $key }}'">{{ $meta['label'] }}</x-markas.badge>@endforeach
                      </span>
                      <span class="truncate text-sm font-medium" x-text="supplierById(item.supplier).name"></span>
                      <span class="text-xs text-muted tabular-nums" x-text="rupiah(orderTotal(item)) + ' · ETA ' + item.eta"></span>
                    </button>
                  </li>
                </template>
              </ul>
            </template>
          </section>

          <template x-if="order">
            <section class="{{ $card }}" :data-order="order.id" aria-labelledby="gudang-order-title">
              <div class="{{ $cardHead }}">
                <div>
                  <h2 id="gudang-order-title" class="font-mono text-sm font-semibold" x-text="order.id"></h2>
                  <p class="text-xs text-muted" x-text="supplierById(order.supplier).name + ' · ETA ' + order.eta"></p>
                </div>
                <template x-if="poStatus[status[order.id]].action">
                  <x-markas.button size="sm" @click="advance(order)" x-text="poStatus[status[order.id]].action"></x-markas.button>
                </template>
              </div>
              <div class="grid gap-5 p-4">
                <ol class="flex items-center gap-2" aria-label="Order progress">
                  @foreach ($data['poSteps'] as $index => $id)
                    <li data-step="{{ $id }}" :aria-current="{{ $index }} === step ? 'step' : null" class="flex items-center gap-2 text-sm not-last:flex-1 not-last:after:h-px not-last:after:flex-1 not-last:after:bg-line">
                      <span aria-hidden="true" class="{{ $stepDot }}" :class="stepDoneAt({{ $index }}) ? @js($stepDone) : {{ $index }} === step ? @js($stepNow) : @js($stepNext)">
                        <template x-if="stepDoneAt({{ $index }})">{{ $icon('check', 'size-3.5') }}</template>
                        <template x-if="!stepDoneAt({{ $index }})"><span>{{ $index + 1 }}</span></template>
                      </span>
                      <span :class="{{ $index }} <= step ? 'font-medium' : 'text-muted'">{{ $data['poStatus'][$id]['label'] }}</span>
                    </li>
                  @endforeach
                </ol>
                @foreach ([1, 2] as $count)
                  <template x-if="order.lines.length === {{ $count }}">
                    <x-markas.table label="Line items" size="sm" :columns="$data['lineColumns']" :rows="array_fill(0, $count, [])" x-effect="fillLines($el)" />
                  </template>
                @endforeach
                <dl class="ml-auto grid w-full max-w-xs gap-1.5 text-sm">
                  <div class="flex justify-between gap-4">
                    <dt class="text-muted">Subtotal</dt>
                    <dd class="tabular-nums" x-text="rupiah(orderTotal(order))"></dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="text-muted">PPN 11%</dt>
                    <dd class="tabular-nums" x-text="rupiah(Math.round(orderTotal(order) * TAX_RATE))"></dd>
                  </div>
                  <div class="flex justify-between gap-4 border-t border-line pt-1.5 font-semibold">
                    <dt>Total</dt>
                    <dd data-total class="tabular-nums" x-text="rupiah(Math.round(orderTotal(order) * (1 + TAX_RATE)))"></dd>
                  </div>
                </dl>
              </div>
            </section>
          </template>
        </div>
      </div>
    </template>

    {{-- Shipments --}}
    <template x-if="view === 'shipments'">
      <div
        class="contents"
        x-data="{
          stage: Object.fromEntries(shipmentList.map((item) => [item.id, item.stage])),
          courier: 'all',
          get list() {
            return this.shipmentList.filter((item) => item.wh === this.wh && (this.courier === 'all' || item.courier === this.courier));
          },
          get openCount() {
            return this.list.filter((item) => this.stage[item.id] !== this.stages.at(-1)).length;
          },
          inStage(name) {
            return this.list.filter((item) => this.stage[item.id] === name);
          },
          nextStage(item) {
            return this.stages[this.stages.indexOf(this.stage[item.id]) + 1];
          },
          advance(item) {
            const next = this.nextStage(item);
            this.stage = { ...this.stage, [item.id]: next };
            this.notify(item.id + ' moved to ' + next, item.customer + ', ' + item.city);
          },
        }"
      >
        <div class="{{ $toolbar }}">
          <div class="w-full sm:w-52">
            <x-markas.select aria-label="Courier" x-model="courier">
              <option value="all">All couriers</option>
              @foreach ($data['couriers'] as $item)
                <option>{{ $item }}</option>
              @endforeach
            </x-markas.select>
          </div>
          <p data-open class="text-sm text-muted" x-text="plural(openCount, 'open order') + ' from ' + warehouses[wh].label"></p>
          <div class="{{ $toolbarEnd }}">
            <x-markas.button variant="secondary" @click="notify('Manifest sent to printer', plural(openCount, 'order'))">Print manifest</x-markas.button>
          </div>
        </div>

        <div class="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
          @foreach ($data['stages'] as $name)
            <section data-stage="{{ $name }}" aria-label="{{ $name }}" class="rounded-xl bg-subtle p-2">
              <h2 class="flex items-center justify-between px-2 py-1.5 text-sm font-semibold">{{ $name }}<span class="text-xs font-medium text-muted tabular-nums" x-text="inStage('{{ $name }}').length"></span></h2>
              <ul class="grid gap-2">
                <template x-for="item in inStage('{{ $name }}')" :key="item.id">
                  <li :data-shipment="item.id" class="{{ $card }} grid gap-2 p-3">
                    <div>
                      <p class="{{ $mono }}" x-text="item.id"></p>
                      <p class="truncate text-sm font-medium" x-text="item.customer"></p>
                      <p class="text-xs text-muted" x-text="item.city + ' · ' + item.items + ' cartons'"></p>
                    </div>
                    <p class="border-t border-line pt-2 text-xs"><span x-text="item.courier"></span><span class="{{ $mono }} block" x-text="item.tracking"></span></p>
                    <template x-if="nextStage(item)">
                      <x-markas.button variant="secondary" size="sm" x-bind:aria-label="'Move to ' + nextStage(item) + ': ' + item.id" @click="advance(item)"><span x-text="'Move to ' + nextStage(item)"></span>{{ $icon('next', 'size-4') }}</x-markas.button>
                    </template>
                  </li>
                </template>
              </ul>
            </section>
          @endforeach
        </div>
      </div>
    </template>

    {{-- Suppliers --}}
    <template x-if="view === 'suppliers'">
      <div
        class="contents"
        x-data="{
          sort: 'rating',
          supplierId: 's1',
          message: '',
          error: '',
          get list() {
            return this.supplierList.toSorted((a, b) => (this.sort === 'lead' ? a.lead - b.lead : b[this.sort] - a[this.sort]));
          },
          get supplier() {
            return this.supplierById(this.supplierId);
          },
          facts(item) {
            return [
              { label: 'Lead time', value: this.plural(item.lead, 'day') },
              { label: 'Rating', value: item.rating.toFixed(1).replace('.', ',') + ' / 5' },
              { label: 'On time', value: item.onTime + '%' },
            ];
          },
          contact(id) {
            this.supplierId = id;
            this.message = '';
            this.error = '';
            this.openDialog(this.CONTACT_MODAL);
          },
          submitMessage() {
            this.error = this.message.trim() ? '' : 'Write a message first';
            if (!this.message.trim()) return;
            this.closeDialog(this.CONTACT_MODAL);
            this.notify('Message sent', this.supplier.contact + ' at ' + this.supplier.name);
          },
        }"
      >
        <div class="{{ $toolbar }}">
          <div class="w-full sm:w-56">
            <x-markas.select aria-label="Sort suppliers" x-model="sort">
              @foreach ($data['supplierSorts'] as $item)
                <option value="{{ $item['value'] }}">{{ $item['label'] }}</option>
              @endforeach
            </x-markas.select>
          </div>
          <div class="{{ $toolbarEnd }}">
            <x-markas.button @click="notify('Invitation sent', 'Supplier onboarding form')">{{ $icon('plus', 'size-4') }}Invite supplier</x-markas.button>
          </div>
        </div>

        <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <template x-for="item in list" :key="item.id">
            <li :data-supplier="item.id" class="{{ $card }}">
              <div class="p-4">
                <h2 class="truncate text-sm font-semibold" x-text="item.name"></h2>
                <p class="text-xs text-muted" x-text="item.city + ' · ' + item.category"></p>
              </div>
              <dl class="grid grid-cols-3 border-y border-line">
                <template x-for="fact in facts(item)" :key="fact.label">
                  <div class="border-r border-line px-4 py-2.5 last:border-r-0">
                    <dt class="text-xs text-muted" x-text="fact.label"></dt>
                    <dd class="text-sm font-medium tabular-nums" x-text="fact.value"></dd>
                  </div>
                </template>
              </dl>
              <div class="flex items-center justify-between gap-3 px-4 py-2.5">
                <p class="truncate text-xs text-muted" x-text="item.contact"></p>
                <x-markas.button variant="secondary" size="sm" x-bind:aria-label="'Contact ' + item.name" @click="contact(item.id)">Contact</x-markas.button>
              </div>
            </li>
          </template>
        </ul>

        <x-markas.modal id="gudang-contact-modal" title="Contact supplier">
          <form novalidate class="grid gap-4" @submit.prevent="submitMessage()">
            <div class="text-ink">
              <p class="font-medium" x-text="supplier.contact"></p>
              <p class="text-muted" x-text="supplier.name"></p>
              <p class="mt-2 tabular-nums" x-text="supplier.phone"></p>
              <p x-text="supplier.email"></p>
            </div>
            <div class="grid gap-1.5">
              <x-markas.input label="Message" name="message" placeholder="Ask about stock, price, or delivery" x-model="message" x-bind:aria-invalid="error ? 'true' : null" x-bind:aria-describedby="error ? 'gudang-message-error' : null" />
              {{ $error('gudang-message-error', 'error') }}
            </div>
            <div class="{{ $formFooter }}">
              <x-markas.button type="button" variant="secondary" @click="closeDialog(CONTACT_MODAL)">Cancel</x-markas.button>
              <x-markas.button type="submit">Send message</x-markas.button>
            </div>
          </form>
        </x-markas.modal>
      </div>
    </template>

    {{-- Reports --}}
    <template x-if="view === 'reports'">
      <div
        class="contents"
        x-data="{
          period: '30',
          get value() {
            return this.stockValue(this.wh);
          },
          get list() {
            return this.movers[this.wh].map((item) => ({ ...item, units: Math.round(item.units * (this.period === '90' ? this.QUARTER_FACTOR : 1)) }));
          },
          get kpis() {
            return [
              { label: 'Stock value', value: this.compact(this.value) },
              { label: 'Aged over 90 days', value: this.compact(Math.round((this.value * this.ageing[this.wh].at(-1)) / 100)) },
              { label: 'Units moved, ' + this.period + ' days', value: this.num(this.list.reduce((sum, item) => sum + item.units, 0)) },
            ];
          },
          exportReport(format) {
            this.notify(format + ' export ready', 'stock-report-' + this.warehouses[this.wh].code.toLowerCase() + '-' + this.period + 'd.' + format.toLowerCase());
          },
        }"
      >
        <div class="{{ $toolbar }}">
          <x-markas.toggle-group label="Period" :items="$data['periods']" value="30" x-effect="if (selected.length) period = selected[0]; else selected = [period]" />
          <div class="{{ $toolbarEnd }}">
            @foreach ($data['exportFormats'] as $format)
              <x-markas.button variant="secondary" @click="exportReport('{{ $format }}')">{{ $icon('download', 'size-4') }}Export {{ $format }}</x-markas.button>
            @endforeach
          </div>
        </div>

        <dl class="{{ $kpiGrid }} lg:grid-cols-3">
          <template x-for="(kpi, index) in kpis" :key="index">
            <div class="{{ $kpiCell }}" :class="index === 2 && 'max-lg:col-span-2'">
              <dt class="text-xs text-muted" x-text="kpi.label"></dt>
              <dd :data-kpi="index" class="{{ $kpiValue }}" x-text="kpi.value"></dd>
            </div>
          </template>
        </dl>

        <div class="grid items-start gap-5 lg:grid-cols-2">
          <section class="{{ $card }}" aria-labelledby="gudang-ageing-title">
            <div class="{{ $cardHead }}">
              <h2 id="gudang-ageing-title" class="{{ $cardTitle }}">Stock ageing</h2>
              <span class="text-xs text-muted">Share of stock value</span>
            </div>
            <ul class="grid gap-4 p-4">
              @foreach ($data['ageBuckets'] as $index => $label)
                <li data-age="{{ $index }}" class="grid gap-1.5">
                  <span class="flex items-baseline justify-between gap-3 text-sm">
                    <span class="font-medium">{{ $label }}</span>
                    <span class="text-muted tabular-nums" x-text="compact((value * ageing[wh][{{ $index }}]) / 100) + ' · ' + ageing[wh][{{ $index }}] + '%'"></span>
                  </span>
                  <span aria-hidden="true" class="{{ $meter }}"><span class="block h-full rounded-full {{ $loop->last ? 'bg-warning' : $barIn }}" :style="{ width: ageing[wh][{{ $index }}] + '%' }"></span></span>
                </li>
              @endforeach
            </ul>
          </section>

          <section class="{{ $card }}" aria-labelledby="gudang-movers-title">
            <div class="{{ $cardHead }}">
              <h2 id="gudang-movers-title" class="{{ $cardTitle }}">Top movers</h2>
              <span class="text-xs text-muted">Units shipped</span>
            </div>
            <ol class="grid gap-4 p-4">
              <template x-for="(item, index) in list" :key="item.product">
                <li :data-mover="index" class="grid gap-1.5">
                  <span class="flex items-baseline justify-between gap-3 text-sm">
                    <span class="truncate font-medium" x-text="index + 1 + '. ' + productById(item.product).name"></span>
                    <span class="text-muted tabular-nums" x-text="num(item.units)"></span>
                  </span>
                  <span aria-hidden="true" class="{{ $meter }}"><span class="block h-full rounded-full {{ $barOut }}" :style="{ width: (item.units / list[0].units) * 100 + '%' }"></span></span>
                </li>
              </template>
            </ol>
          </section>
        </div>
      </div>
    </template>

    {{-- Settings --}}
    <template x-if="view === 'settings'">
      <form
        novalidate
        class="grid max-w-3xl gap-5"
        aria-label="Warehouse settings"
        x-data="{
          safety: SAFETY_DEFAULT,
          auto: true,
          unit: stockUnits[0],
          weight: weightUnits[0],
          enabled: [...defaultAlerts],
          error: '',
          save() {
            const days = Number(this.safety);
            const valid = Number.isInteger(days) && days >= 1 && days <= this.SAFETY_MAX;
            this.error = valid ? '' : 'Enter a number from 1 to ' + this.SAFETY_MAX;
            if (!valid) return;
            this.notify('Settings saved', 'Safety stock ' + this.plural(days, 'day') + ', ' + this.plural(this.enabled.length, 'alert') + ' on');
          },
          reset() {
            this.safety = this.SAFETY_DEFAULT;
            this.auto = true;
            this.enabled = [...this.defaultAlerts];
            this.error = '';
            this.notify('Settings reset', 'Defaults restored', 'default');
          },
        }"
        @submit.prevent="save()"
      >
        <section class="{{ $card }}" aria-labelledby="gudang-rules-title">
          <div class="{{ $cardHead }}">
            <h2 id="gudang-rules-title" class="{{ $cardTitle }}">Reorder rules</h2>
          </div>
          <div class="grid gap-4 p-4">
            <div class="grid max-w-xs gap-1.5">
              <x-markas.input label="Safety stock (days)" name="safety" inputmode="numeric" aria-describedby="gudang-safety-note" x-model="safety" x-bind:aria-invalid="error ? 'true' : null" />
              {{ $note('gudang-safety-note', 'error', 'Days of average demand kept as a buffer') }}
            </div>
            <x-markas.switch label="Create a draft PO when an item drops below its reorder point" name="auto" x-model="auto" />
          </div>
        </section>

        <section class="{{ $card }}" aria-labelledby="gudang-units-title">
          <div class="{{ $cardHead }}">
            <h2 id="gudang-units-title" class="{{ $cardTitle }}">Units</h2>
          </div>
          <div class="{{ $fieldGrid }} p-4">
            <x-markas.select label="Default stock unit" name="unit" x-model="unit">
              @foreach ($data['stockUnits'] as $item)
                <option>{{ $item }}</option>
              @endforeach
            </x-markas.select>
            <x-markas.select label="Weight" name="weight" x-model="weight">
              @foreach ($data['weightUnits'] as $item)
                <option>{{ $item }}</option>
              @endforeach
            </x-markas.select>
          </div>
        </section>

        <section class="{{ $card }}" aria-labelledby="gudang-alerts-title">
          <div class="{{ $cardHead }}">
            <h2 id="gudang-alerts-title" class="{{ $cardTitle }}">Notifications</h2>
            <span data-alerts class="text-xs text-muted" x-text="enabled.length + ' of ' + alerts.length + ' on'"></span>
          </div>
          <ul>
            @foreach ($data['alerts'] as $alert)
              <li class="flex items-center justify-between gap-4 border-b border-line px-4 py-3 last:border-b-0">
                <span>
                  <span class="block text-sm font-medium">{{ $alert['label'] }}</span>
                  <span class="block text-xs text-muted">{{ $alert['hint'] }}</span>
                </span>
                <x-markas.switch aria-label="{{ $alert['label'] }}" name="{{ $alert['key'] }}" value="{{ $alert['key'] }}" x-model="enabled" />
              </li>
            @endforeach
          </ul>
        </section>

        <div class="flex flex-wrap gap-2">
          <x-markas.button type="submit">Save changes</x-markas.button>
          <x-markas.button type="button" variant="secondary" @click="reset()">Reset</x-markas.button>
        </div>
      </form>
    </template>
  </main>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
