@php
    use Illuminate\Support\HtmlString;

    // Data contoh (semua nama dan data pasien fiktif) dibagi dengan Alpine lewat satu blok JSON.
    $data = json_decode(<<<'JSON'
    {
    "icons": {"pulse":"M3 12h4l3-8 4 16 3-8h4","calendar":"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2","users":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75","doctor":"M5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 12 0V4a2 2 0 0 0-2-2h-1M8 15v1a6 6 0 0 0 12 0v-4M22 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0","pill":"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7ZM8.5 8.5l7 7","receipt":"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1ZM8 8h8M8 12h8M8 16h5","sliders":"M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4M14 4v4M6 10v4M12 16v4","bell":"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0","plus":"M12 5v14M5 12h14","check":"M20 6 9 17l-5-5"},
    "pages": {"today":{"label":"Today","title":"Today","icon":"pulse"},"appointments":{"label":"Agenda","title":"Appointments","icon":"calendar"},"patients":{"label":"Patients","title":"Patients","icon":"users"},"doctors":{"label":"Doctors","title":"Doctors","icon":"doctor"},"pharmacy":{"label":"Pharmacy","title":"Pharmacy","icon":"pill"},"billing":{"label":"Billing","title":"Billing","icon":"receipt"},"settings":{"label":"Settings","title":"Settings","icon":"sliders"}},
    "pageIds": ["today","appointments","patients","doctors","pharmacy","billing","settings"],
    "DEFAULT_PAGE": "today",
    "TITLE_ID": "sehati-page-title",
    "PATIENT_DRAWER": "sehati-patient-drawer",
    "APPOINTMENT_MODAL": "sehati-appointment-modal",
    "INVOICE_MODAL": "sehati-invoice-modal",
    "CLINIC": "Klinik Sehati Bandung",
    "TODAY": "Thu, 19 Nov 2026",
    "doctors": [{"id":"d1","name":"dr. Ratna Dewi","poli":"General","room":"Room 1","tone":"c1","load":14,"hours":["08-14","08-14","13-19","08-14","08-14","Off"]},{"id":"d2","name":"drg. Bima Santoso","poli":"Dental","room":"Room 2","tone":"c2","load":9,"hours":["09-15","Off","09-15","09-15","09-15","09-13"]},{"id":"d3","name":"dr. Laras Putri, Sp.A","poli":"Pediatrics","room":"Room 3","tone":"c3","load":7,"hours":["13-19","13-19","08-14","08-14","Off","08-12"]},{"id":"d4","name":"dr. Yoga Pratama, Sp.PD","poli":"Internal medicine","room":"Room 4","tone":"c4","load":0,"hours":["Off","08-14","08-14","Off","13-19","08-12"]}],
    "ROOMS": 3,
    "TODAY_INDEX": 3,
    "patients": [{"id":"p1","mrn":"RM-00412","name":"Siti Aminah","sex":"F","age":34,"payer":"BPJS","doctor":"d1","last":"12 Oct 2026","phone":"+62 812 5550 0141","blood":"O+","city":"Bandung","allergies":["Penicillin"]},{"id":"p2","mrn":"RM-00398","name":"Budi Santoso","sex":"M","age":52,"payer":"Umum","doctor":"d1","last":"3 Nov 2026","phone":"+62 812 5550 0122","blood":"A+","city":"Cimahi","allergies":["Sulfa drugs","Shellfish"]},{"id":"p3","mrn":"RM-00377","name":"Made Wirawan","sex":"M","age":61,"payer":"BPJS","doctor":"d1","last":"28 Oct 2026","phone":"+62 812 5550 0109","blood":"B+","city":"Bandung","allergies":[]},{"id":"p4","mrn":"RM-00431","name":"Dewi Lestari","sex":"F","age":28,"payer":"Umum","doctor":"d2","last":"21 Jul 2026","phone":"+62 812 5550 0163","blood":"AB+","city":"Lembang","allergies":["Latex"]},{"id":"p5","mrn":"RM-00405","name":"Agus Salim","sex":"M","age":45,"payer":"BPJS","doctor":"d2","last":"9 Sep 2026","phone":"+62 812 5550 0137","blood":"O+","city":"Bandung","allergies":[]},{"id":"p6","mrn":"RM-00440","name":"Putri Ayu","sex":"F","age":6,"payer":"Umum","doctor":"d3","last":"5 Nov 2026","phone":"+62 812 5550 0178","blood":"A+","city":"Cimahi","allergies":["Egg protein"]},{"id":"p7","mrn":"RM-00442","name":"Rizky Ramadhan","sex":"M","age":4,"payer":"BPJS","doctor":"d3","last":"30 Oct 2026","phone":"+62 812 5550 0185","blood":"B+","city":"Bandung","allergies":[]},{"id":"p8","mrn":"RM-00366","name":"Nur Hidayati","sex":"F","age":57,"payer":"Umum","doctor":"d1","last":"14 Oct 2026","phone":"+62 812 5550 0104","blood":"O-","city":"Sumedang","allergies":["Aspirin"]}],
    "queue": [{"id":"q1","no":"A-012","patient":"p1","doctor":"d1","type":"Consultation","at":"08:42","status":"serving"},{"id":"q4","no":"B-007","patient":"p4","doctor":"d2","type":"Scaling","at":"08:50","status":"serving"},{"id":"q2","no":"A-013","patient":"p2","doctor":"d1","type":"Follow-up","at":"08:55","status":"waiting"},{"id":"q6","no":"C-005","patient":"p6","doctor":"d3","type":"Immunization","at":"09:02","status":"waiting"},{"id":"q5","no":"B-008","patient":"p5","doctor":"d2","type":"Extraction","at":"09:05","status":"waiting"},{"id":"q3","no":"A-014","patient":"p3","doctor":"d1","type":"Lab review","at":"09:10","status":"waiting"},{"id":"q7","no":"C-006","patient":"p7","doctor":"d3","type":"Consultation","at":"09:14","status":"waiting"},{"id":"q8","no":"A-015","patient":"p8","doctor":"d1","type":"Consultation","at":"09:21","status":"waiting"}],
    "DONE_BASE": 21,
    "UP_NEXT": 5,
    "visitTypes": [{"label":"General","count":14,"tone":"c1"},{"label":"Dental","count":9,"tone":"c2"},{"label":"Pediatrics","count":7,"tone":"c3"},{"label":"Lab","count":4,"tone":"c4"},{"label":"Vaccination","count":3,"tone":"c5"}],
    "VISIT_TOTAL": 37,
    "flow": [{"hour":"08","count":3},{"hour":"09","count":6},{"hour":"10","count":8},{"hour":"11","count":5},{"hour":"12","count":2},{"hour":"13","count":4},{"hour":"14","count":6},{"hour":"15","count":3}],
    "FLOW_MAX": 8,
    "days": [{"id":"mon","label":"Mon","date":"16"},{"id":"tue","label":"Tue","date":"17"},{"id":"wed","label":"Wed","date":"18"},{"id":"thu","label":"Thu","date":"19"},{"id":"fri","label":"Fri","date":"20"},{"id":"sat","label":"Sat","date":"21"}],
    "TODAY_DAY": "thu",
    "slots": ["08:00","09:00","10:00","11:00","13:00","14:00","15:00"],
    "appointmentList": [{"id":"a1","patient":"Siti Aminah","doctor":"d1","day":"mon","time":"08:00"},{"id":"a2","patient":"Agus Salim","doctor":"d2","day":"mon","time":"10:00"},{"id":"a3","patient":"Budi Santoso","doctor":"d1","day":"tue","time":"09:00"},{"id":"a4","patient":"Putri Ayu","doctor":"d3","day":"tue","time":"13:00"},{"id":"a5","patient":"Dewi Lestari","doctor":"d2","day":"wed","time":"11:00"},{"id":"a6","patient":"Made Wirawan","doctor":"d1","day":"thu","time":"08:00"},{"id":"a7","patient":"Rizky Ramadhan","doctor":"d3","day":"thu","time":"10:00"},{"id":"a8","patient":"Nur Hidayati","doctor":"d1","day":"thu","time":"13:00"},{"id":"a9","patient":"Dewi Lestari","doctor":"d2","day":"fri","time":"09:00"},{"id":"a10","patient":"Siti Aminah","doctor":"d4","day":"fri","time":"14:00"},{"id":"a11","patient":"Budi Santoso","doctor":"d4","day":"sat","time":"08:00"}],
    "blankAppointment": {"id":"","patient":"","doctor":"d1","day":"thu","time":"08:00"},
    "visitDates": ["12 Oct 2026","3 Sep 2026","21 Jul 2026"],
    "visitPool": [{"title":"General checkup","note":"Blood pressure stable, continue current medication."},{"title":"Follow-up visit","note":"Lab results reviewed, no changes needed."},{"title":"Dental scaling","note":"Mild gingivitis, advised flossing daily."},{"title":"Vaccination","note":"Influenza vaccine given, no reaction observed."},{"title":"Lab panel","note":"Fasting glucose and lipid profile ordered."}],
    "vitalDefs": [{"label":"Systolic","unit":"mmHg","base":110,"step":5,"spread":14},{"label":"Heart rate","unit":"bpm","base":66,"step":3,"spread":12},{"label":"Resp. rate","unit":"/min","base":14,"step":1,"spread":3}],
    "wave": [0,3,-2,4,1],
    "patientTabs": [{"value":"profile","label":"Profile"},{"value":"visits","label":"Visits"},{"value":"vitals","label":"Vitals"},{"value":"allergies","label":"Allergies"}],
    "prescriptions": [{"id":"r1","no":"RX-2051","patient":"Siti Aminah","doctor":"d1","items":"Amoxicillin 500 mg x15, Paracetamol 500 mg x10","dispensed":false},{"id":"r2","no":"RX-2052","patient":"Dewi Lestari","doctor":"d2","items":"Ibuprofen 400 mg x10, Chlorhexidine rinse x1","dispensed":false},{"id":"r3","no":"RX-2053","patient":"Made Wirawan","doctor":"d1","items":"Metformin 500 mg x60, Amlodipine 5 mg x30","dispensed":false},{"id":"r4","no":"RX-2054","patient":"Putri Ayu","doctor":"d3","items":"Cetirizine syrup x1, Zinc 20 mg x10","dispensed":false},{"id":"r5","no":"RX-2050","patient":"Nur Hidayati","doctor":"d1","items":"Omeprazole 20 mg x14","dispensed":true}],
    "stock": [{"name":"Amoxicillin 500 mg","form":"Capsule","stock":320,"min":200,"exp":"Aug 2027"},{"name":"Paracetamol 500 mg","form":"Tablet","stock":1240,"min":500,"exp":"Jan 2028"},{"name":"Cetirizine 10 mg","form":"Tablet","stock":45,"min":150,"exp":"Mar 2027"},{"name":"Metformin 500 mg","form":"Tablet","stock":610,"min":300,"exp":"Nov 2027"},{"name":"Amlodipine 5 mg","form":"Tablet","stock":90,"min":200,"exp":"Jun 2027"},{"name":"Ibuprofen 400 mg","form":"Tablet","stock":260,"min":200,"exp":"Sep 2027"},{"name":"Chlorhexidine rinse","form":"Bottle","stock":0,"min":20,"exp":"Dec 2026"},{"name":"ORS sachet","form":"Sachet","stock":180,"min":100,"exp":"May 2028"}],
    "stockStates": {"ok":{"label":"In stock","badge":"success","bar":"bg-success"},"low":{"label":"Low stock","badge":"warning","bar":"bg-warning"},"out":{"label":"Out of stock","badge":"danger","bar":"bg-danger"}},
    "invoices": [{"id":"i1","no":"INV-1182","patient":"Siti Aminah","payer":"BPJS","date":"19 Nov","covered":150000,"paid":false,"items":[{"label":"Consultation","amount":150000},{"label":"Amoxicillin 500 mg","amount":45000}]},{"id":"i2","no":"INV-1181","patient":"Budi Santoso","payer":"Umum","date":"19 Nov","covered":0,"paid":false,"items":[{"label":"Consultation","amount":150000},{"label":"Blood panel","amount":220000}]},{"id":"i3","no":"INV-1180","patient":"Dewi Lestari","payer":"Umum","date":"19 Nov","covered":0,"paid":true,"items":[{"label":"Dental scaling","amount":450000},{"label":"Fluoride treatment","amount":120000}]},{"id":"i4","no":"INV-1179","patient":"Made Wirawan","payer":"BPJS","date":"18 Nov","covered":210000,"paid":true,"items":[{"label":"Consultation","amount":150000},{"label":"Metformin 500 mg","amount":60000}]},{"id":"i5","no":"INV-1178","patient":"Putri Ayu","payer":"Umum","date":"18 Nov","covered":0,"paid":false,"items":[{"label":"Pediatric visit","amount":175000},{"label":"Immunization","amount":310000}]},{"id":"i6","no":"INV-1177","patient":"Agus Salim","payer":"BPJS","date":"18 Nov","covered":350000,"paid":false,"items":[{"label":"Tooth extraction","amount":350000},{"label":"Ibuprofen 400 mg","amount":30000}]},{"id":"i7","no":"INV-1176","patient":"Nur Hidayati","payer":"Umum","date":"17 Nov","covered":0,"paid":true,"items":[{"label":"Consultation","amount":150000},{"label":"ECG","amount":250000}]}],
    "statusFilters": [{"id":"all","label":"All"},{"id":"unpaid","label":"Unpaid"},{"id":"paid","label":"Paid"}],
    "payerFilters": ["All payers","BPJS","Umum"],
    "openingHours": [{"day":"Monday","hours":"08:00 - 20:00","open":true},{"day":"Tuesday","hours":"08:00 - 20:00","open":true},{"day":"Wednesday","hours":"08:00 - 20:00","open":true},{"day":"Thursday","hours":"08:00 - 20:00","open":true},{"day":"Friday","hours":"08:00 - 20:00","open":true},{"day":"Saturday","hours":"08:00 - 14:00","open":true},{"day":"Sunday","hours":"09:00 - 12:00","open":false}],
    "alerts": [{"id":"queue","label":"Queue call announcements","note":"Play a chime and read the number in the waiting room.","on":true},{"id":"reminder","label":"WhatsApp appointment reminders","note":"Sent one day before the visit at 17:00.","on":true},{"id":"stock","label":"Low stock alerts","note":"Notify the pharmacist when an item drops below its minimum.","on":false}],
    "notifications": [{"title":"Low stock: Cetirizine 10 mg","time":"12 min ago"},{"title":"BPJS claim INV-1179 approved","time":"1 hour ago"},{"title":"dr. Laras Putri starts at 13:00 today","time":"2 hours ago"}],
    "userMenu": [{"label":"My profile","value":"Profile opened"},{"label":"Switch clinic","value":"Clinic switched"},{"separator":true},{"label":"Sign out","value":"Signed out","danger":true}],
    "faceTones": ["bg-(--tpl-av1)","bg-(--tpl-av2)","bg-(--tpl-av3)","bg-(--tpl-av4)","bg-(--tpl-av5)"],
    "tones": {"c1":"bg-(--tpl-c1)","c2":"bg-(--tpl-c2)","c3":"bg-(--tpl-c3)","c4":"bg-(--tpl-c4)","c5":"bg-(--tpl-c5)"}
    }
    JSON, true);

    // Kelas Tailwind, identik dengan versi React dan Vue.
    $palette = '[--tpl-c1:#0d9488] [--tpl-c2:#2563eb] [--tpl-c3:#d97706] [--tpl-c4:#7c3aed] [--tpl-c5:#e11d48] [--tpl-av1:#ccfbf1] [--tpl-av2:#dbeafe] [--tpl-av3:#fef3c7] [--tpl-av4:#ede9fe] [--tpl-av5:#ffe4e6] [--tpl-av-ink:#1f2937] dark:[--tpl-c1:#2dd4bf] dark:[--tpl-c2:#60a5fa] dark:[--tpl-c3:#fbbf24] dark:[--tpl-c4:#a78bfa] dark:[--tpl-c5:#fb7185]';
    $shell = '[--tpl-c1:#0d9488] [--tpl-c2:#2563eb] [--tpl-c3:#d97706] [--tpl-c4:#7c3aed] [--tpl-c5:#e11d48] [--tpl-av1:#ccfbf1] [--tpl-av2:#dbeafe] [--tpl-av3:#fef3c7] [--tpl-av4:#ede9fe] [--tpl-av5:#ffe4e6] [--tpl-av-ink:#1f2937] dark:[--tpl-c1:#2dd4bf] dark:[--tpl-c2:#60a5fa] dark:[--tpl-c3:#fbbf24] dark:[--tpl-c4:#a78bfa] dark:[--tpl-c5:#fb7185] min-h-dvh bg-canvas text-sm text-ink lg:pl-16 xl:pr-80';
    $focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $rail = 'fixed inset-y-0 left-0 z-20 hidden w-16 flex-col items-center gap-1 border-r border-line bg-surface py-3 lg:flex';
    $railBase = 'inline-flex size-10 items-center justify-center rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $railActive = 'bg-primary-soft text-primary';
    $railIdle = 'text-muted hover:bg-subtle hover:text-ink';
    $bottomBar = 'fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-surface px-1 lg:hidden';
    $bottomBase = 'flex h-14 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $bottomActive = 'text-primary';
    $bottomIdle = 'text-muted hover:text-ink';
    $logo = 'inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary';
    $topbar = 'sticky top-0 z-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-surface px-4 py-2.5 lg:px-6';
    $iconTrigger = '[&>button]:relative [&>button]:px-2.5';
    $userTrigger = '[&>button]:gap-2 [&>button]:px-1.5 sm:[&>button]:pr-3';
    $main = 'grid min-w-0 content-start gap-5 px-4 pt-5 pb-24 lg:px-6 lg:pb-8';
    $todayPanel = 'fixed inset-y-0 right-0 z-10 hidden w-80 flex-col gap-5 overflow-y-auto border-l border-line bg-surface p-5 xl:flex';
    $card = 'rounded-xl border border-line bg-surface';
    $h2 = 'text-base font-semibold';
    $h3 = 'text-sm font-semibold';
    $note = 'text-xs text-muted';
    $statGrid = 'grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line';
    $statCell = 'bg-surface p-4';
    $statValue = 'mt-1 text-2xl font-semibold tracking-tight tabular-nums';
    $ticket = 'rounded-lg border border-primary-line bg-primary-soft p-3';
    $ticketFree = 'flex min-h-[86px] items-center rounded-lg border border-dashed border-line p-3 text-muted';
    $ticketNo = 'text-2xl font-semibold tracking-tight tabular-nums';
    $queueRow = 'flex items-center gap-3 py-2';
    $queueNo = 'w-12 shrink-0 font-semibold tabular-nums';
    $tableWrap = 'overflow-x-auto rounded-xl border border-line bg-surface';
    $table = 'w-full border-collapse';
    $th = 'px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap text-muted';
    $td = 'border-t border-line px-4 py-2.5 whitespace-nowrap';
    $linkButton = 'rounded-sm text-left font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $chip = 'inline-flex h-8 items-center rounded-lg px-3 font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $chipOn = 'bg-primary-soft text-primary';
    $chipOff = 'text-muted hover:bg-subtle hover:text-ink';
    $slotCell = 'h-16 border-t border-l border-line p-1 align-top';
    $slotToday = 'bg-primary-soft/40';
    $booking = 'flex w-full min-w-0 items-center gap-1.5 rounded-md bg-subtle px-2 py-1 text-left text-xs font-medium transition-colors duration-150 hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $face = 'inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-(--tpl-av-ink) select-none';
    $dot = 'size-2 shrink-0 rounded-full';
    $field = 'rounded-lg bg-subtle p-3';

    $html = fn (string $markup) => new HtmlString($markup);
    $svg = fn (string $path, string $class) => '<svg class="'.$class.'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path '.$path.' /></svg>';
    // Ikon garis 24px. $iconOf memakai nama ikon dari ekspresi Alpine.
    $icon = fn (string $name, string $class = 'size-5') => $html($svg('d="'.$data['icons'][$name].'"', $class));
    $iconOf = fn (string $expr, string $class = 'size-5') => $html($svg(':d="icons['.e($expr).']"', $class));
    // Avatar inisial berwarna dari palet lokal, nama dari ekspresi Alpine.
    $faceOf = fn (string $expr, string $class) => $html('<span aria-hidden="true" class="'.$face.' '.$class.'" :class="faceTone('.e($expr).')" x-text="initials('.e($expr).')"></span>');
    // Judul bagian dengan catatan kecil; $expr (opsional) ekspresi Alpine untuk catatan yang berubah.
    $head = fn (string $id, string $title, string $text, string $expr = '') => $html('<div><h2 id="'.$id.'" class="'.$h2.'">'.e($title).'</h2><p data-note class="'.$note.' mt-0.5"'.($expr ? ' x-text="'.e($expr).'"' : '').'>'.e($text).'</p></div>');
    $headRow = 'flex flex-wrap items-end justify-between gap-3';
    $rooms = array_slice($data['doctors'], 0, $data['ROOMS']);
    $doctorName = fn (string $id) => collect($data['doctors'])->firstWhere('id', $id)['name'];
    $stockState = fn (array $item) => $item['stock'] === 0 ? 'out' : ($item['stock'] < $item['min'] ? 'low' : 'ok');
    $doctorOption = fn (array $doctor) => $doctor['name'].' ('.$doctor['poli'].')';
@endphp

{{-- Indentasi HTML keluaran dibuang supaya halaman tetap ringan; tampilan tidak berubah. --}}
@php ob_start(); @endphp

<script type="application/json" id="sehati-data">{!! json_encode($data, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE) !!}</script>
<div
  class="{{ $shell }}"
  x-data="{
    ...JSON.parse(document.getElementById('sehati-data').textContent),
    page: 'today',
    queueState: {},
    patientId: 'p1',
    unread: true,
    search: '',
    init() {
      this.queueState = Object.fromEntries(this.queue.map((item) => [item.id, item.status]));
      this.page = this.readHash();
    },
    {{-- Halaman aktif disimpan di hash URL supaya bisa dibagikan dan tombol Back bekerja. --}}
    readHash() {
      const id = window.location.hash.slice(1);
      return id in this.pages ? id : this.DEFAULT_PAGE;
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
    flags(items, key, value) {
      return Object.fromEntries(items.map((item) => [item[key], value(item)]));
    },
    rupiah(value) {
      return 'Rp ' + value.toLocaleString('id-ID');
    },
    {{-- Inisial tanpa gelar (dr., drg., Sp.A). --}}
    initials(name) {
      return name.split(',')[0].split(' ').filter((word) => !word.endsWith('.')).filter((_, index, words) => index === 0 || index === words.length - 1).map((word) => word.charAt(0)).join('').toUpperCase();
    },
    {{-- Warna avatar inisial yang selalu sama untuk nama yang sama. --}}
    faceTone(name) {
      return this.faceTones[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % this.faceTones.length];
    },
    doctorById(id) {
      return this.doctors.find((item) => item.id === id);
    },
    patientById(id) {
      return this.patients.find((item) => item.id === id);
    },
    dayById(id) {
      return this.days.find((item) => item.id === id);
    },
    sexLabel(patient) {
      return patient.age + ' yr, ' + (patient.sex === 'F' ? 'female' : 'male');
    },
    servingOf(doctorId) {
      return this.queue.find((item) => item.doctor === doctorId && this.queueState[item.id] === 'serving');
    },
    waitingOf(doctorId) {
      return this.queue.filter((item) => this.queueState[item.id] === 'waiting' && (!doctorId || item.doctor === doctorId));
    },
    countOf(status) {
      return this.queue.filter((item) => this.queueState[item.id] === status).length;
    },
    callNext(doctorId) {
      const doctor = this.doctorById(doctorId);
      const serving = this.servingOf(doctorId);
      const next = this.waitingOf(doctorId)[0];
      if (!next) return;
      this.queueState = { ...this.queueState, ...(serving ? { [serving.id]: 'done' } : null), [next.id]: 'serving' };
      this.notify('Calling ' + next.no, this.patientById(next.patient).name + ' to ' + doctor.room);
    },
    finish(doctorId) {
      const serving = this.servingOf(doctorId);
      if (!serving) return;
      this.queueState = { ...this.queueState, [serving.id]: 'done' };
      this.notify('Visit completed', serving.no + ', ' + this.patientById(serving.patient).name, 'success');
    },
    get patient() {
      return this.patientById(this.patientId);
    },
    get patientIndex() {
      return this.patients.indexOf(this.patient);
    },
    get profile() {
      const patient = this.patient;
      return [['MRN', patient.mrn], ['Age and sex', this.sexLabel(patient)], ['Phone', patient.phone], ['Blood type', patient.blood], ['Insurance', patient.payer], ['City', patient.city]];
    },
    get visits() {
      return this.visitDates.map((date, offset) => ({ date, ...this.visitPool[(this.patientIndex + offset) % this.visitPool.length] }));
    },
    get vitals() {
      const index = this.patientIndex;
      return this.vitalDefs.map((def) => ({ def, values: this.wave.map((_, at) => def.base + ((index * def.step) % def.spread) + this.wave[(at + index * def.step) % this.wave.length]) }));
    },
    {{-- Titik polyline sparkline di viewBox 100 x 32. --}}
    spark(values) {
      const min = Math.min(...values);
      const span = Math.max(...values) - min || 1;
      return values.map((value, at) => at * 25 + ',' + (28 - Math.round(((value - min) * 24) / span))).join(' ');
    },
    openPatient(id) {
      this.patientId = id;
      document.getElementById(this.PATIENT_DRAWER).showModal();
    },
    find() {
      const needle = this.search.trim().toLowerCase();
      const match = this.patients.find((item) => (item.name + ' ' + item.mrn).toLowerCase().includes(needle));
      if (!needle) return;
      if (match) this.openPatient(match.id);
      else this.notify('No patient found', 'Nothing matches &quot;' + this.search.trim() + '&quot;', 'danger');
    },
  }"
  x-on:hashchange.window="page = readHash(); $nextTick(() => document.getElementById(TITLE_ID).focus())"
>
  <nav aria-label="Main" class="{{ $rail }}">
    <span aria-hidden="true" class="{{ $logo }} mb-3">{{ $icon('plus') }}</span>
    <template x-for="id in pageIds" :key="id">
      <button type="button" :aria-label="pages[id].title" :title="pages[id].title" class="{{ $railBase }}" :class="[page === id ? @js($railActive) : @js($railIdle), id === 'settings' && 'mt-auto']" :aria-current="current(id)" @click="go(id)">{{ $iconOf('pages[id].icon') }}</button>
    </template>
  </nav>

  <header class="{{ $topbar }}">
    <span aria-hidden="true" class="{{ $logo }} lg:hidden">{{ $icon('plus') }}</span>
    <div class="min-w-0 flex-1">
      <h1 id="{{ $data['TITLE_ID'] }}" tabindex="-1" class="truncate text-base leading-tight font-semibold focus:outline-none" x-text="pages[page].title">Today</h1>
      <p class="{{ $note }} truncate">{{ $data['CLINIC'] }} · {{ $data['TODAY'] }}</p>
    </div>
    <form role="search" class="order-last w-full sm:order-none sm:w-60" @submit.prevent="find()">
      <x-markas.input type="search" aria-label="Search patients" placeholder="Search patient or MRN" x-model="search" />
    </form>
    <x-markas.popover align="end" class="{{ $iconTrigger }}">
      <x-slot:trigger>{{ $icon('bell') }}<span data-unread class="sr-only" x-text="unread ? 'Notifications, 3 unread' : 'Notifications'">Notifications, 3 unread</span><template x-if="unread"><span aria-hidden="true" class="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"></span></template></x-slot:trigger>
      <div class="grid gap-3">
        <p class="{{ $h3 }}">Notifications</p>
        <ul class="grid gap-3">
          @foreach ($data['notifications'] as $item)
            <li class="flex gap-2">
              <span aria-hidden="true" class="{{ $dot }} mt-1.5" :class="unread ? 'bg-primary' : 'bg-line'"></span>
              <div>
                <p class="font-medium">{{ $item['title'] }}</p>
                <p class="{{ $note }}">{{ $item['time'] }}</p>
              </div>
            </li>
          @endforeach
        </ul>
        <x-markas.button variant="secondary" size="sm" x-bind:disabled="!unread" @click="unread = false">Mark all as read</x-markas.button>
      </div>
    </x-markas.popover>
    <x-markas.dropdown-menu :items="$data['userMenu']" class="{{ $userTrigger }}" x-on:markas-select="notify($event.detail)">
      <x-slot:trigger>{{ $faceOf("'Ayu Kartika'", 'size-7 text-[11px]') }}<span class="sr-only">Account, </span><span class="hidden sm:inline">Ayu Kartika</span></x-slot:trigger>
    </x-markas.dropdown-menu>
  </header>

  <main class="{{ $main }}">
    {{-- Today --}}
    <template x-if="page === 'today'">
      <div class="contents">
        <dl class="{{ $statGrid }} lg:grid-cols-4">
          @foreach ([['Waiting', "countOf('waiting')", 'across 3 rooms'], ['In consultation', "countOf('serving')", 'rooms occupied'], ['Completed', "DONE_BASE + countOf('done')", 'visits since 08:00'], ['Avg. wait', "'14 min'", '2 min faster than Wednesday']] as [$label, $expr, $text])
            <div class="{{ $statCell }}">
              <dt class="{{ $note }}">{{ $label }}</dt>
              <dd data-stat="{{ $label }}" class="{{ $statValue }}" x-text="{{ $expr }}"></dd>
              <dd class="{{ $note }}">{{ $text }}</dd>
            </div>
          @endforeach
        </dl>

        <section aria-labelledby="sehati-board-title" class="grid gap-3">
          <div class="{{ $headRow }}">{{ $head('sehati-board-title', 'Queue board', 'Call the next number when a room is ready.') }}</div>
          <div class="grid gap-4 md:grid-cols-3">
            @foreach ($rooms as $doctor)
              @php $d = "'".$doctor['id']."'"; @endphp
              <article data-room="{{ $doctor['id'] }}" aria-label="{{ $doctor['room'] }}, {{ $doctor['name'] }}" class="{{ $card }} flex flex-col gap-3 p-4">
                <div class="flex items-center gap-3">
                  {{ $faceOf("doctorById($d).name", 'size-9 text-xs') }}
                  <div class="min-w-0">
                    <h3 class="{{ $h3 }} truncate">{{ $doctor['name'] }}</h3>
                    <p class="{{ $note }}">{{ $doctor['poli'] }} · {{ $doctor['room'] }}</p>
                  </div>
                </div>
                <template x-if="servingOf({{ $d }})">
                  <div data-serving class="{{ $ticket }}">
                    <p class="text-xs font-medium text-primary">Now serving</p>
                    <p class="{{ $ticketNo }}" x-text="servingOf({{ $d }}).no"></p>
                    <p class="truncate text-xs" x-text="patientById(servingOf({{ $d }}).patient).name + ', ' + servingOf({{ $d }}).type"></p>
                  </div>
                </template>
                <template x-if="!servingOf({{ $d }})">
                  <p data-serving class="{{ $ticketFree }}">Room is free</p>
                </template>
                <div>
                  <p data-waiting class="{{ $note }}" x-text="waitingOf({{ $d }}).length + ' waiting'"></p>
                  <ul class="divide-y divide-line">
                    <template x-for="item in waitingOf({{ $d }})" :key="item.id">
                      <li class="{{ $queueRow }}">
                        <span class="{{ $queueNo }}" x-text="item.no"></span>
                        <button type="button" class="{{ $linkButton }} min-w-0 flex-1 truncate" @click="openPatient(item.patient)" x-text="patientById(item.patient).name"></button>
                        <span class="{{ $note }} tabular-nums" x-text="item.at"></span>
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="mt-auto grid grid-cols-2 gap-2">
                  <x-markas.button variant="secondary" size="sm" x-bind:disabled="!servingOf({{ $d }})" @click="finish({{ $d }})">Mark done</x-markas.button>
                  <x-markas.button size="sm" x-bind:disabled="waitingOf({{ $d }}).length === 0" @click="callNext({{ $d }})">Call next</x-markas.button>
                </div>
              </article>
            @endforeach
          </div>
        </section>

        <div class="grid gap-4 md:grid-cols-2">
          <section aria-labelledby="sehati-types-title" class="{{ $card }} grid content-start gap-4 p-4">
            <div class="{{ $headRow }}">{{ $head('sehati-types-title', 'Visits by type', $data['VISIT_TOTAL'].' visits registered today') }}</div>
            <div role="img" aria-label="{{ implode(', ', array_map(fn ($type) => $type['label'].' '.$type['count'], $data['visitTypes'])) }}" class="flex h-3 gap-0.5 overflow-hidden rounded-full">
              @foreach ($data['visitTypes'] as $type)
                <span class="{{ $data['tones'][$type['tone']] }}" style="flex-grow: {{ $type['count'] }}"></span>
              @endforeach
            </div>
            <ul class="grid gap-2">
              @foreach ($data['visitTypes'] as $type)
                <li class="flex items-center gap-2">
                  <span aria-hidden="true" class="{{ $dot }} {{ $data['tones'][$type['tone']] }}"></span>
                  <span class="flex-1">{{ $type['label'] }}</span>
                  <span class="font-medium tabular-nums">{{ $type['count'] }}</span>
                  <span class="{{ $note }} w-9 text-right tabular-nums">{{ round($type['count'] / $data['VISIT_TOTAL'] * 100) }}%</span>
                </li>
              @endforeach
            </ul>
          </section>

          <section aria-labelledby="sehati-flow-title" class="{{ $card }} flex flex-col gap-4 p-4">
            <div class="{{ $headRow }}">{{ $head('sehati-flow-title', 'Patient flow', 'Check-ins per hour, peak at 10:00') }}</div>
            <ol aria-label="Check-ins per hour" class="flex min-h-36 flex-1 items-end gap-2">
              @foreach ($data['flow'] as $item)
                <li class="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span class="text-xs font-medium tabular-nums">{{ $item['count'] }}</span>
                  <span aria-hidden="true" class="w-full rounded-t-md {{ $item['count'] === $data['FLOW_MAX'] ? 'bg-primary' : 'bg-primary-line' }}" style="height: {{ $item['count'] / $data['FLOW_MAX'] * 70 }}%"></span>
                  <span class="{{ $note }} tabular-nums"><span class="sr-only">at </span>{{ $item['hour'] }}</span>
                </li>
              @endforeach
            </ol>
          </section>
        </div>
      </div>
    </template>

    {{-- Appointments --}}
    <template x-if="page === 'appointments'">
      <section
        aria-labelledby="sehati-week-title"
        class="grid gap-3"
        x-data="{
          list: appointmentList,
          doctorFilter: 'all',
          form: { ...blankAppointment },
          errors: { patient: '', slot: '' },
          get shown() {
            return this.list.filter((item) => this.doctorFilter === 'all' || item.doctor === this.doctorFilter);
          },
          inSlot(day, time) {
            return this.shown.filter((item) => item.day === day && item.time === time);
          },
          dialog() {
            return document.getElementById(this.APPOINTMENT_MODAL);
          },
          edit(appointment) {
            this.form = { ...appointment };
            this.errors = { patient: '', slot: '' };
            this.dialog().showModal();
          },
          {{-- Nama wajib diisi dan satu dokter hanya punya satu pasien per slot. --}}
          check() {
            const form = this.form;
            return {
              patient: form.patient.trim() ? '' : 'Enter the patient name.',
              slot: this.list.some((item) => item.id !== form.id && item.doctor === form.doctor && item.day === form.day && item.time === form.time) ? 'That slot is already booked for this doctor.' : '',
            };
          },
          save() {
            this.errors = this.check();
            if (this.errors.patient || this.errors.slot) return;
            const saved = { ...this.form, patient: this.form.patient.trim() };
            const nextId = 'a' + (1 + Math.max(0, ...this.list.map((item) => Number(item.id.slice(1)))));
            this.list = saved.id ? this.list.map((item) => (item.id === saved.id ? saved : item)) : [...this.list, { ...saved, id: nextId }];
            this.dialog().close();
            this.notify(saved.id ? 'Appointment rescheduled' : 'Appointment booked', saved.patient + ', ' + this.dayById(saved.day).label + ' ' + saved.time, 'success');
          },
          cancel() {
            this.list = this.list.filter((item) => item.id !== this.form.id);
            this.dialog().close();
            this.notify('Appointment cancelled', this.form.patient);
          },
        }"
      >
        <div class="{{ $headRow }}">
          {{ $head('sehati-week-title', 'Week of 16 Nov 2026', '11 appointments', "shown.length + ' appointments'") }}
          <div class="flex flex-wrap items-end gap-2">
            <x-markas.select aria-label="Filter by doctor" class="sm:w-56" x-model="doctorFilter">
              <option value="all">All doctors</option>
              @foreach ($data['doctors'] as $doctor)
                <option value="{{ $doctor['id'] }}">{{ $doctorOption($doctor) }}</option>
              @endforeach
            </x-markas.select>
            <x-markas.button @click="edit(blankAppointment)">{{ $icon('plus', 'size-4') }}New appointment</x-markas.button>
          </div>
        </div>
        <div class="{{ $tableWrap }}">
          <table class="{{ $table }} min-w-[720px] table-fixed">
            <thead>
              <tr>
                <th scope="col" class="{{ $th }} w-16">Time</th>
                @foreach ($data['days'] as $day)
                  <th scope="col" class="{{ $th }} border-l border-line{{ $day['id'] === $data['TODAY_DAY'] ? ' text-primary' : '' }}">{{ $day['label'] }} {{ $day['date'] }}</th>
                @endforeach
              </tr>
            </thead>
            <tbody>
              <template x-for="time in slots" :key="time">
                <tr>
                  <th scope="row" class="border-t border-line px-4 py-2 text-left align-top text-xs font-medium text-muted tabular-nums" x-text="time"></th>
                  <template x-for="day in days" :key="day.id">
                    <td :data-slot="day.id + '-' + time" class="{{ $slotCell }}" :class="day.id === TODAY_DAY && @js($slotToday)">
                      <div class="grid gap-1">
                        <template x-for="item in inSlot(day.id, time)" :key="item.id">
                          <button type="button" :data-appointment="item.id" :aria-label="item.patient + ', ' + doctorById(item.doctor).name + ', ' + day.label + ' ' + time" class="{{ $booking }}" @click="edit(item)"><span aria-hidden="true" class="{{ $dot }}" :class="tones[doctorById(item.doctor).tone]"></span><span class="truncate" x-text="item.patient"></span></button>
                        </template>
                      </div>
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <ul aria-label="Doctors" class="flex flex-wrap gap-x-4 gap-y-1">
          @foreach ($data['doctors'] as $doctor)
            <li class="{{ $note }} flex items-center gap-1.5"><span aria-hidden="true" class="{{ $dot }} {{ $data['tones'][$doctor['tone']] }}"></span>{{ $doctor['name'] }}</li>
          @endforeach
        </ul>

        <x-markas.modal :id="$data['APPOINTMENT_MODAL']">
          <x-slot:title><span x-text="form.id ? 'Edit appointment' : 'New appointment'">New appointment</span></x-slot:title>
          <div class="grid gap-4 text-ink">
            <div class="grid gap-1.5">
              <x-markas.input id="sehati-appointment-patient" label="Patient name" x-model="form.patient" x-bind:aria-invalid="errors.patient ? 'true' : null" x-bind:aria-describedby="errors.patient ? 'sehati-appointment-patient-error' : null" />
              <template x-if="errors.patient"><p id="sehati-appointment-patient-error" class="text-sm text-danger" x-text="errors.patient"></p></template>
            </div>
            <x-markas.select label="Doctor" x-model="form.doctor">
              @foreach ($data['doctors'] as $doctor)
                <option value="{{ $doctor['id'] }}">{{ $doctorOption($doctor) }}</option>
              @endforeach
            </x-markas.select>
            <div class="grid grid-cols-2 gap-3">
              <x-markas.select label="Day" x-model="form.day">
                @foreach ($data['days'] as $day)
                  <option value="{{ $day['id'] }}">{{ $day['label'] }}, {{ $day['date'] }} Nov</option>
                @endforeach
              </x-markas.select>
              <x-markas.select label="Time" x-model="form.time">
                @foreach ($data['slots'] as $time)
                  <option value="{{ $time }}">{{ $time }}</option>
                @endforeach
              </x-markas.select>
            </div>
            <template x-if="errors.slot"><p role="alert" class="text-danger" x-text="errors.slot"></p></template>
          </div>
          <x-slot:footer>
            <template x-if="form.id"><x-markas.button variant="danger" @click="cancel()">Cancel appointment</x-markas.button></template>
            <x-markas.button @click="save()"><span class="contents" x-text="form.id ? 'Save changes' : 'Book appointment'">Book appointment</span></x-markas.button>
          </x-slot:footer>
        </x-markas.modal>
      </section>
    </template>

    {{-- Patients --}}
    <template x-if="page === 'patients'">
      <section
        aria-labelledby="sehati-patients-title"
        class="grid gap-3"
        x-data="{
          query: '',
          get shown() {
            const needle = this.query.trim().toLowerCase();
            return this.patients.filter((item) => (item.name + ' ' + item.mrn).toLowerCase().includes(needle));
          },
        }"
      >
        <div class="{{ $headRow }}">
          {{ $head('sehati-patients-title', 'Patient records', '8 of 8 patients', "shown.length + ' of ' + patients.length + ' patients'") }}
          <div class="w-full sm:w-64"><x-markas.input type="search" aria-label="Filter patients" placeholder="Filter by name or MRN" x-model="query" /></div>
        </div>
        <div class="{{ $tableWrap }}">
          <table class="{{ $table }}">
            <thead>
              <tr>
                <th scope="col" class="{{ $th }}">Patient</th>
                <th scope="col" class="{{ $th }} hidden sm:table-cell">MRN</th>
                <th scope="col" class="{{ $th }}">Insurance</th>
                <th scope="col" class="{{ $th }} hidden md:table-cell">Doctor</th>
                <th scope="col" class="{{ $th }} hidden md:table-cell">Last visit</th>
              </tr>
            </thead>
            <tbody>
              <template x-for="item in shown" :key="item.id">
                <tr :data-patient="item.id">
                  <td class="{{ $td }}">
                    <div class="flex items-center gap-3">
                      {{ $faceOf('item.name', 'size-8 text-xs') }}
                      <div>
                        <button type="button" class="{{ $linkButton }}" @click="openPatient(item.id)" x-text="item.name"></button>
                        <p class="{{ $note }}" x-text="sexLabel(item)"></p>
                      </div>
                    </div>
                  </td>
                  <td class="{{ $td }} hidden tabular-nums sm:table-cell" x-text="item.mrn"></td>
                  <td class="{{ $td }}"><template x-if="item.payer === 'BPJS'"><x-markas.badge variant="primary" :dot="false"><span x-text="item.payer"></span></x-markas.badge></template><template x-if="item.payer !== 'BPJS'"><x-markas.badge :dot="false"><span x-text="item.payer"></span></x-markas.badge></template></td>
                  <td class="{{ $td }} hidden md:table-cell" x-text="doctorById(item.doctor).name"></td>
                  <td class="{{ $td }} hidden text-muted md:table-cell" x-text="item.last"></td>
                </tr>
              </template>
            </tbody>
          </table>
          <template x-if="shown.length === 0"><p class="border-t border-line p-4 text-muted">No patients match this filter.</p></template>
        </div>
      </section>
    </template>

    {{-- Doctors --}}
    <template x-if="page === 'doctors'">
      <section
        aria-labelledby="sehati-roster-title"
        class="grid gap-3"
        x-data="{
          available: flags(doctors, 'id', (doctor) => doctor.hours[TODAY_INDEX] !== 'Off'),
          toggle(id, on) {
            this.available = { ...this.available, [id]: on };
            this.notify(on ? 'Accepting patients' : 'Set to away', this.doctorById(id).name);
          },
        }"
      >
        <div class="{{ $headRow }}">{{ $head('sehati-roster-title', 'Roster', '3 of 4 doctors accepting patients', "Object.values(available).filter(Boolean).length + ' of ' + doctors.length + ' doctors accepting patients'") }}</div>
        <ul class="grid gap-4 md:grid-cols-2">
          @foreach ($data['doctors'] as $doctor)
            @php $d = "'".$doctor['id']."'"; @endphp
            <li data-doctor="{{ $doctor['id'] }}" class="{{ $card }} grid gap-4 p-4">
              <div class="flex items-start gap-3">
                {{ $faceOf("doctorById($d).name", 'size-11 text-sm') }}
                <div class="min-w-0 flex-1">
                  <h3 class="{{ $h3 }} truncate">{{ $doctor['name'] }}</h3>
                  <p class="{{ $note }}">{{ $doctor['poli'] }} · {{ $doctor['room'] }} · {{ $doctor['load'] }} patients today</p>
                </div>
                <x-markas.badge variant="success" x-show="available[{{ $d }}]">Available</x-markas.badge>
                <x-markas.badge x-show="!available[{{ $d }}]">Away</x-markas.badge>
              </div>
              <dl class="grid grid-cols-6 gap-1 text-center">
                @foreach ($data['days'] as $index => $day)
                  <div class="rounded-md py-1.5 {{ $day['id'] === $data['TODAY_DAY'] ? 'bg-primary-soft' : 'bg-subtle' }}">
                    <dt class="{{ $note }}">{{ $day['label'] }}</dt>
                    <dd class="text-xs font-medium tabular-nums{{ $doctor['hours'][$index] === 'Off' ? ' text-muted' : '' }}">{{ $doctor['hours'][$index] }}</dd>
                  </div>
                @endforeach
              </dl>
              <x-markas.switch label="Accepting patients" x-bind:checked="available[{{ $d }}]" x-on:change="toggle({{ $d }}, $event.target.checked)" />
            </li>
          @endforeach
        </ul>
      </section>
    </template>

    {{-- Pharmacy --}}
    <template x-if="page === 'pharmacy'">
      <div
        class="contents"
        x-data="{
          dispensed: flags(prescriptions, 'id', (item) => item.dispensed),
          lowOnly: false,
          dispense(item) {
            this.dispensed = { ...this.dispensed, [item.id]: true };
            this.notify('Prescription dispensed', item.no + ' for ' + item.patient, 'success');
          },
        }"
      >
        <section aria-labelledby="sehati-rx-title" class="grid gap-3">
          <div class="{{ $headRow }}">{{ $head('sehati-rx-title', 'Prescription queue', '4 waiting to be dispensed', "prescriptions.filter((item) => !dispensed[item.id]).length + ' waiting to be dispensed'") }}</div>
          <ul class="{{ $card }} divide-y divide-line">
            @foreach ($data['prescriptions'] as $index => $item)
              <li data-rx="{{ $item['id'] }}" class="flex flex-wrap items-center gap-x-4 gap-y-2 p-4">
                <div class="min-w-0 flex-1 basis-56">
                  <p class="font-medium"><span class="tabular-nums">{{ $item['no'] }}</span> · {{ $item['patient'] }}</p>
                  <p class="{{ $note }} mt-0.5">{{ $item['items'] }}</p>
                </div>
                <p class="{{ $note }} hidden md:block">{{ $doctorName($item['doctor']) }}</p>
                <template x-if="dispensed['{{ $item['id'] }}']"><x-markas.badge variant="success">Dispensed</x-markas.badge></template>
                <template x-if="!dispensed['{{ $item['id'] }}']"><x-markas.button variant="secondary" size="sm" aria-label="Dispense {{ $item['no'] }}" @click="dispense(prescriptions[{{ $index }}])">{{ $icon('check', 'size-4') }}Dispense</x-markas.button></template>
              </li>
            @endforeach
          </ul>
        </section>

        <section aria-labelledby="sehati-stock-title" class="grid gap-3">
          <div class="{{ $headRow }}">
            {{ $head('sehati-stock-title', 'Stock', count(array_filter($data['stock'], fn ($item) => $stockState($item) !== 'ok')).' items need reorder') }}
            <x-markas.switch label="Low stock only" x-model="lowOnly" />
          </div>
          <div class="{{ $tableWrap }}">
            <table class="{{ $table }}">
              <thead>
                <tr>
                  <th scope="col" class="{{ $th }}">Item</th>
                  <th scope="col" class="{{ $th }}">On hand</th>
                  <th scope="col" class="{{ $th }} hidden sm:table-cell">Minimum</th>
                  <th scope="col" class="{{ $th }}">Status</th>
                  <th scope="col" class="{{ $th }} hidden md:table-cell">Expires</th>
                </tr>
              </thead>
              <tbody>
                @foreach ($data['stock'] as $item)
                  @php $state = $data['stockStates'][$stockState($item)]; @endphp
                  <tr data-stock="{{ $stockState($item) }}" @if ($stockState($item) === 'ok') x-show="!lowOnly" @endif>
                    <td class="{{ $td }}">
                      <p class="font-medium">{{ $item['name'] }}</p>
                      <p class="{{ $note }}">{{ $item['form'] }}</p>
                    </td>
                    <td class="{{ $td }}">
                      <p class="font-medium tabular-nums">{{ $item['stock'] }}</p>
                      <span aria-hidden="true" class="mt-1 block h-1 w-20 overflow-hidden rounded-full bg-subtle"><span class="block h-full rounded-full {{ $state['bar'] }}" style="width: {{ min(100, round($item['stock'] / ($item['min'] * 2) * 100)) }}%"></span></span>
                    </td>
                    <td class="{{ $td }} hidden text-muted tabular-nums sm:table-cell">{{ $item['min'] }}</td>
                    <td class="{{ $td }}"><x-markas.badge :variant="$state['badge']">{{ $state['label'] }}</x-markas.badge></td>
                    <td class="{{ $td }} hidden text-muted md:table-cell">{{ $item['exp'] }}</td>
                  </tr>
                @endforeach
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </template>

    {{-- Billing --}}
    <template x-if="page === 'billing'">
      <div
        class="contents"
        x-data="{
          paid: flags(invoices, 'id', (item) => item.paid),
          status: 'all',
          payer: payerFilters[0],
          openId: 'i1',
          get invoice() {
            return this.invoices.find((item) => item.id === this.openId);
          },
          subtotal(invoice) {
            return invoice.items.reduce((sum, item) => sum + item.amount, 0);
          },
          due(invoice) {
            return this.subtotal(invoice) - invoice.covered;
          },
          get shown() {
            return this.invoices.filter((item) => (this.status === 'all' || (this.status === 'paid') === this.paid[item.id]) && (this.payer === this.payerFilters[0] || item.payer === this.payer));
          },
          sum(items, pick) {
            return items.reduce((total, item) => total + pick(item), 0);
          },
          get totals() {
            return [
              this.sum(this.invoices.filter((item) => !this.paid[item.id]), (item) => this.due(item)),
              this.sum(this.invoices.filter((item) => this.paid[item.id]), (item) => this.due(item)),
              this.sum(this.invoices, (item) => item.covered),
            ];
          },
          view(id) {
            this.openId = id;
            document.getElementById(this.INVOICE_MODAL).showModal();
          },
          markPaid() {
            this.paid = { ...this.paid, [this.invoice.id]: true };
            document.getElementById(this.INVOICE_MODAL).close();
            this.notify('Payment recorded', this.invoice.no + ', ' + this.rupiah(this.due(this.invoice)), 'success');
          },
        }"
      >
        <dl class="{{ $statGrid }} sm:grid-cols-3">
          @foreach ([['Outstanding', 'awaiting payment'], ['Collected', 'paid by patients this week'], ['BPJS claims', 'covered by BPJS Kesehatan']] as $index => [$label, $text])
            <div class="{{ $statCell }}{{ $index === 0 ? ' max-sm:col-span-2' : '' }}">
              <dt class="{{ $note }}">{{ $label }}</dt>
              <dd data-total="{{ $label }}" class="{{ $statValue }}" x-text="rupiah(totals[{{ $index }}])"></dd>
              <dd class="{{ $note }}">{{ $text }}</dd>
            </div>
          @endforeach
        </dl>

        <section aria-labelledby="sehati-invoices-title" class="grid gap-3">
          <div class="{{ $headRow }}">
            {{ $head('sehati-invoices-title', 'Invoices', '7 of 7 invoices', "shown.length + ' of ' + invoices.length + ' invoices'") }}
            <div class="flex flex-wrap items-center gap-2">
              <div role="group" aria-label="Filter by payment status" class="flex gap-1">
                @foreach ($data['statusFilters'] as $item)
                  <button type="button" class="{{ $chip }}" :class="status === '{{ $item['id'] }}' ? @js($chipOn) : @js($chipOff)" :aria-pressed="status === '{{ $item['id'] }}' ? 'true' : 'false'" @click="status = '{{ $item['id'] }}'">{{ $item['label'] }}</button>
                @endforeach
              </div>
              <x-markas.select aria-label="Filter by payer" class="w-36" x-model="payer">
                @foreach ($data['payerFilters'] as $item)
                  <option>{{ $item }}</option>
                @endforeach
              </x-markas.select>
            </div>
          </div>
          <div class="{{ $tableWrap }}">
            <table class="{{ $table }}">
              <thead>
                <tr>
                  <th scope="col" class="{{ $th }}">Invoice</th>
                  <th scope="col" class="{{ $th }} hidden sm:table-cell">Payer</th>
                  <th scope="col" class="{{ $th }} hidden md:table-cell">Date</th>
                  <th scope="col" class="{{ $th }} text-right">Amount due</th>
                  <th scope="col" class="{{ $th }}">Status</th>
                </tr>
              </thead>
              <tbody>
                <template x-for="item in shown" :key="item.id">
                  <tr :data-invoice="item.id">
                    <td class="{{ $td }}">
                      <button type="button" class="{{ $linkButton }} tabular-nums" @click="view(item.id)" x-text="item.no"></button>
                      <p class="{{ $note }}" x-text="item.patient"></p>
                    </td>
                    <td class="{{ $td }} hidden sm:table-cell"><template x-if="item.payer === 'BPJS'"><x-markas.badge variant="primary" :dot="false"><span x-text="item.payer"></span></x-markas.badge></template><template x-if="item.payer !== 'BPJS'"><x-markas.badge :dot="false"><span x-text="item.payer"></span></x-markas.badge></template></td>
                    <td class="{{ $td }} hidden text-muted md:table-cell" x-text="item.date"></td>
                    <td class="{{ $td }} text-right font-medium tabular-nums" x-text="rupiah(due(item))"></td>
                    <td class="{{ $td }}"><x-markas.badge variant="success" x-show="paid[item.id]">Paid</x-markas.badge><x-markas.badge variant="warning" x-show="!paid[item.id]">Unpaid</x-markas.badge></td>
                  </tr>
                </template>
              </tbody>
            </table>
            <template x-if="shown.length === 0"><p class="border-t border-line p-4 text-muted">No invoices match these filters.</p></template>
          </div>
        </section>

        <x-markas.modal :id="$data['INVOICE_MODAL']">
          <x-slot:title><span x-text="'Invoice ' + invoice.no">Invoice</span></x-slot:title>
          <div class="grid gap-4 text-ink">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-medium" x-text="invoice.patient"></p>
                <p class="{{ $note }}" x-text="invoice.date + ' 2026 · ' + invoice.payer"></p>
              </div>
              <x-markas.badge variant="success" x-show="paid[invoice.id]">Paid</x-markas.badge><x-markas.badge variant="warning" x-show="!paid[invoice.id]">Unpaid</x-markas.badge>
            </div>
            <dl class="grid gap-2 border-y border-line py-3">
              <template x-for="item in invoice.items" :key="item.label">
                <div class="flex justify-between gap-3">
                  <dt x-text="item.label"></dt>
                  <dd class="tabular-nums" x-text="rupiah(item.amount)"></dd>
                </div>
              </template>
              <div class="flex justify-between gap-3 text-muted">
                <dt>BPJS coverage</dt>
                <dd class="tabular-nums" x-text="'- ' + rupiah(invoice.covered)"></dd>
              </div>
            </dl>
            <p class="flex items-baseline justify-between gap-3 font-semibold">Amount due<span data-due class="text-lg tabular-nums" x-text="rupiah(due(invoice))"></span></p>
          </div>
          <x-slot:footer>
            <x-markas.button variant="secondary" type="submit" value="close">Close</x-markas.button>
            <template x-if="!paid[invoice.id]"><x-markas.button @click="markPaid()">Mark as paid</x-markas.button></template>
          </x-slot:footer>
        </x-markas.modal>
      </div>
    </template>

    {{-- Settings --}}
    <template x-if="page === 'settings'">
      <div
        class="grid items-start gap-4 lg:grid-cols-2"
        x-data="{
          clinicName: CLINIC,
          nameError: '',
          openDays: flags(openingHours, 'day', (item) => item.open),
          enabled: flags(alerts, 'id', (item) => item.on),
          saveProfile() {
            const missing = this.clinicName.trim() === '';
            this.nameError = missing ? 'Enter the clinic name.' : '';
            if (!missing) this.notify('Clinic profile saved', this.clinicName.trim(), 'success');
          },
          setAlert(index, on) {
            const item = this.alerts[index];
            this.enabled = { ...this.enabled, [item.id]: on };
            this.notify(on ? 'Notification enabled' : 'Notification disabled', item.label);
          },
        }"
      >
        <section aria-labelledby="sehati-profile-title" class="{{ $card }} grid gap-4 p-4 lg:row-span-2">
          <div class="{{ $headRow }}">{{ $head('sehati-profile-title', 'Clinic profile', 'Shown on invoices and appointment reminders.') }}</div>
          <form novalidate class="grid gap-4" @submit.prevent="saveProfile()">
            <div class="grid gap-1.5">
              <x-markas.input id="sehati-clinic-name" label="Clinic name" x-model="clinicName" x-bind:aria-invalid="nameError ? 'true' : null" x-bind:aria-describedby="nameError ? 'sehati-clinic-name-error' : null" />
              <template x-if="nameError"><p id="sehati-clinic-name-error" class="text-sm text-danger" x-text="nameError"></p></template>
            </div>
            <x-markas.input label="Phone" type="tel" value="+62 22 5550 0100" />
            <x-markas.input label="Address" value="Jl. Cendana No. 12, Bandung" />
            <x-markas.input label="BPJS provider code" value="0114-B-027" />
            <div><x-markas.button type="submit">Save profile</x-markas.button></div>
          </form>
        </section>

        <section aria-labelledby="sehati-hours-title" class="{{ $card }} grid gap-3 p-4">
          <div class="{{ $headRow }}">{{ $head('sehati-hours-title', 'Opening hours', 'Patients can only book inside these hours.') }}</div>
          <ul class="divide-y divide-line">
            @foreach ($data['openingHours'] as $item)
              <li data-day="{{ $item['day'] }}" class="flex items-center justify-between gap-3 py-2">
                <x-markas.switch :label="$item['day']" x-model="openDays.{{ $item['day'] }}" />
                <span class="tabular-nums" :class="!openDays.{{ $item['day'] }} && 'text-muted'" x-text="openDays.{{ $item['day'] }} ? '{{ $item['hours'] }}' : 'Closed'"></span>
              </li>
            @endforeach
          </ul>
        </section>

        <section aria-labelledby="sehati-alerts-title" class="{{ $card }} grid gap-3 p-4">
          <div class="{{ $headRow }}">{{ $head('sehati-alerts-title', 'Notifications', 'Choose what the front desk and pharmacy hear about.') }}</div>
          <ul class="grid gap-4">
            @foreach ($data['alerts'] as $index => $item)
              <li>
                <x-markas.switch :label="$item['label']" x-bind:checked="enabled.{{ $item['id'] }}" x-on:change="setAlert({{ $index }}, $event.target.checked)" />
                <p class="{{ $note }} mt-1 pl-[52px]">{{ $item['note'] }}</p>
              </li>
            @endforeach
          </ul>
        </section>
      </div>
    </template>
  </main>

  <aside aria-labelledby="sehati-panel-title" class="{{ $todayPanel }}">
    <div>
      <h2 id="sehati-panel-title" class="{{ $h2 }}">Live queue</h2>
      <p class="{{ $note }}">{{ $data['TODAY'] }} · open until 20:00</p>
    </div>
    <dl class="{{ $statGrid }} grid-cols-3">
      @foreach ([['Waiting', "countOf('waiting')"], ['In room', "countOf('serving')"], ['Done', "DONE_BASE + countOf('done')"]] as [$label, $expr])
        <div class="bg-surface px-3 py-2">
          <dt class="{{ $note }}">{{ $label }}</dt>
          <dd data-count="{{ $label }}" class="text-lg font-semibold tabular-nums" x-text="{{ $expr }}"></dd>
        </div>
      @endforeach
    </dl>
    <section aria-labelledby="sehati-now-title" class="grid gap-2">
      <h3 id="sehati-now-title" class="{{ $h3 }}">Now serving</h3>
      <ul class="grid gap-2">
        @foreach ($rooms as $doctor)
          @php $d = "'".$doctor['id']."'"; @endphp
          <li data-now="{{ $doctor['id'] }}" class="flex items-center gap-3 rounded-lg border p-3" :class="servingOf({{ $d }}) ? 'border-primary-line bg-primary-soft' : 'border-dashed border-line'">
            <span class="{{ $ticketNo }} w-20 text-xl" x-text="servingOf({{ $d }}) ? servingOf({{ $d }}).no : 'Free'"></span>
            <div class="min-w-0">
              <p class="truncate font-medium" x-text="servingOf({{ $d }}) ? patientById(servingOf({{ $d }}).patient).name : 'No patient'"></p>
              <p class="{{ $note }} truncate">{{ $doctor['room'] }} · {{ $doctor['poli'] }}</p>
            </div>
          </li>
        @endforeach
      </ul>
    </section>
    <section aria-labelledby="sehati-next-title" class="grid gap-1">
      <h3 id="sehati-next-title" class="{{ $h3 }}">Up next</h3>
      <template x-if="waitingOf().length === 0"><p data-next class="text-muted">The waiting room is empty.</p></template>
      <template x-if="waitingOf().length > 0">
        <ol data-next class="divide-y divide-line">
          <template x-for="item in waitingOf().slice(0, UP_NEXT)" :key="item.id">
            <li class="{{ $queueRow }}">
              <span class="{{ $queueNo }}" x-text="item.no"></span>
              <div class="min-w-0 flex-1">
                <p class="truncate" x-text="patientById(item.patient).name"></p>
                <p class="{{ $note }} truncate" x-text="doctorById(item.doctor).room + ' · ' + item.type"></p>
              </div>
              <span class="{{ $note }} tabular-nums" x-text="item.at"></span>
            </li>
          </template>
        </ol>
      </template>
    </section>
  </aside>

  <nav aria-label="Main mobile" class="{{ $bottomBar }}">
    <template x-for="id in pageIds" :key="id">
      <button type="button" class="{{ $bottomBase }}" :class="page === id ? @js($bottomActive) : @js($bottomIdle)" :aria-current="current(id)" @click="go(id)">{{ $iconOf('pages[id].icon') }}<span class="max-w-full truncate" x-text="pages[id].label"></span></button>
    </template>
  </nav>

  <x-markas.drawer :id="$data['PATIENT_DRAWER']" title="Patient record">
    <div class="grid gap-4 text-ink">
      <div class="flex items-center gap-3">
        {{ $faceOf('patient.name', 'size-12 text-sm') }}
        <div class="min-w-0">
          <p data-patient-name class="text-base font-semibold" x-text="patient.name"></p>
          <p class="{{ $note }}" x-text="patient.mrn + ' · ' + doctorById(patient.doctor).name"></p>
        </div>
      </div>
      <x-markas.tabs :items="array_column($data['patientTabs'], 'label', 'value')">
        <x-slot:profile>
          <dl class="grid grid-cols-2 gap-2">
            <template x-for="[label, value] in profile" :key="label">
              <div class="{{ $field }}">
                <dt class="{{ $note }}" x-text="label"></dt>
                <dd class="mt-0.5 font-medium" :data-field="label" x-text="value"></dd>
              </div>
            </template>
          </dl>
        </x-slot:profile>
        <x-slot:visits>
          <ol class="ml-1.5 grid gap-4 border-l border-line">
            <template x-for="visit in visits" :key="visit.date">
              <li class="relative pl-4">
                <span aria-hidden="true" class="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-primary ring-4 ring-surface"></span>
                <p class="{{ $note }}" x-text="visit.date"></p>
                <p class="font-medium" x-text="visit.title"></p>
                <p class="text-muted" x-text="visit.note"></p>
              </li>
            </template>
          </ol>
        </x-slot:visits>
        <x-slot:vitals>
          <ul class="grid gap-2">
            <template x-for="vital in vitals" :key="vital.def.label">
              <li class="{{ $field }} flex items-center justify-between gap-3">
                <div>
                  <p class="{{ $note }}" x-text="vital.def.label"></p>
                  <p class="font-semibold tabular-nums" x-text="vital.values[vital.values.length - 1] + ' ' + vital.def.unit"></p>
                </div>
                <svg role="img" :aria-label="vital.def.label + ' over the last 5 visits: ' + vital.values.join(', ')" viewBox="0 0 100 32" class="h-8 w-28 text-primary" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline :points="spark(vital.values)" /></svg>
              </li>
            </template>
          </ul>
        </x-slot:vitals>
        <x-slot:allergies>
          <template x-if="patient.allergies.length === 0"><p data-allergies>No known allergies.</p></template>
          <template x-if="patient.allergies.length > 0">
            <ul data-allergies class="flex flex-wrap gap-2">
              <template x-for="item in patient.allergies" :key="item">
                <li><x-markas.badge variant="danger"><span x-text="item"></span></x-markas.badge></li>
              </template>
            </ul>
          </template>
        </x-slot:allergies>
      </x-markas.tabs>
    </div>
    <x-slot:footer>
      <x-markas.button variant="secondary" type="submit" value="close">Close</x-markas.button>
      <x-markas.button type="submit" value="remind" @click="notify('Reminder sent', 'WhatsApp to ' + patient.name, 'success')">Send reminder</x-markas.button>
    </x-slot:footer>
  </x-markas.drawer>
  <x-markas.toast />
</div>
@php echo preg_replace('/^[ \t]+/m', '', ob_get_clean()); @endphp
