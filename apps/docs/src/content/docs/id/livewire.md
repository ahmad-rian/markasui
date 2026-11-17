---
title: Livewire
description: Pakai komponen Blade di Livewire 4 (dan 3) dengan wire:model, render ulang, dan wire:navigate.
seoTitle: "Komponen UI Livewire 4 untuk Laravel Blade"
seoDescription: "Pakai komponen Blade MarkasUI di Livewire 4 dan 3: wire:model di setiap kontrol form, dialog tetap terbuka saat render ulang, id stabil, dan dukungan wire:navigate."
---

Komponen Blade jalan di Livewire 4 tanpa setup tambahan, dan di Livewire 3 dengan cara yang sama. Kontrol form menerima `wire:model`, dialog dan menu yang terbuka tetap terbuka saat komponen dirender ulang, dan tidak ada yang rusak setelah `wire:navigate`.

## Setup

Ikuti [instalasi Laravel (Blade)](/id/docs/installation) dengan satu perubahan: **jangan pasang atau jalankan Alpine.js sendiri.** Livewire sudah membawa Alpine dan menjalankannya. Memuat salinan kedua membuat setiap `x-data` berjalan dua kali dan merusak `wire:model`.

```bash
npm install tailwindcss @tailwindcss/vite
```

Biarkan `resources/js/app.js` tanpa import Alpine. Livewire menyisipkan script-nya di halaman yang merender komponen. Kalau layout tidak punya komponen Livewire, tambahkan `@livewireScripts` sebelum `</body>`.

Untuk mendaftarkan data atau plugin Alpine sendiri, dengarkan `alpine:init`, yang berjalan sebelum Alpine mulai:

```js
document.addEventListener("alpine:init", () => {
  Alpine.data("counter", () => ({ count: 0 }));
});
```

Kalau Anda membundel Livewire sendiri, pakai `@livewireScriptConfig` di layout lalu jalankan dari `app.js`:

```js
import {
  Livewire,
  Alpine,
} from "../../vendor/livewire/livewire/dist/livewire.esm";

Alpine.data("counter", () => ({ count: 0 }));
Livewire.start();
```

Tidak ada komponen yang butuh plugin Alpine. Livewire sudah membawa morph, intersect, collapse, focus, anchor, mask, dan resize (Livewire 4 menambah sort), jadi direktif itu bisa dipakai di markup Anda tanpa memasang apa pun.

## wire:model

Setiap komponen form menerima `wire:model` dengan modifier biasa (`.live`, `.blur`, `.change`, `.debounce.300ms`, `.throttle`). Ada dua pola, tergantung di mana nilainya disimpan.

**Kontrol native.** Atribut jatuh ke `input`, `textarea`, atau `select` asli, jadi Livewire memperlakukannya seperti HTML biasa.

| Komponen                | Terhubung ke           | Contoh                                                       |
| ----------------------- | ---------------------- | ------------------------------------------------------------ |
| Input, Textarea, Select | string                 | `<x-markas.input label="Nama" wire:model.live="name" />`     |
| Checkbox, Switch        | boolean                | `<x-markas.switch label="Notifikasi" wire:model="notify" />` |
| Checkbox dengan `value` | array nilai tercentang | `<x-markas.checkbox value="vue" wire:model="tags" />`        |
| Radio group             | nilai terpilih         | `<x-markas.radio-group name="plan" wire:model="plan" ... />` |

Radio group menyalin `wire:model` ke setiap radio.

**Kontrol Alpine.** Nilainya ada di state Alpine, jadi `wire:model` dipasang di root komponen yang punya `x-modelable`. Perubahan dari server ikut masuk: set `$this->country = 'jp'` menampilkan "Jepang" di combobox.

| Komponen                    | Terhubung ke                                           |
| --------------------------- | ------------------------------------------------------ |
| Slider                      | angka                                                  |
| Combobox                    | value terpilih (bukan teks ketikan)                    |
| Currency input              | angka polos, misalnya `12500000`                       |
| Input OTP                   | kode gabungan sebagai satu string                      |
| Toggle                      | boolean                                                |
| Toggle group                | string atau `null` (single), array (`type="multiple"`) |
| Modal, Drawer, Alert dialog | status terbuka (boolean)                               |
| File dropzone               | file terunggah, atau array dengan `multiple`           |

`x-model` bekerja dengan cara yang sama untuk Alpine biasa.

Di kontrol Alpine, `.blur` dan `.enter` mendengarkan elemen root dan tidak terpicu oleh input di dalamnya. Pakai `.live`, `.live.debounce`, atau `.change`.

### Membuka dialog dari server

```blade
<x-markas.modal title="Ubah profil" wire:model="showEdit">
    ...
</x-markas.modal>
```

```php
public bool $showEdit = false;

public function save(): void
{
    // ...
    $this->showEdit = false;
}
```

Menutup dengan Escape, tombol tutup, atau backdrop mengembalikan properti ke `false`.

### Unggah file

Tambahkan `use WithFileUploads;` di komponen lalu hubungkan dropzone:

```blade
<x-markas.file-dropzone multiple accept="image/*" :max-size="5242880" wire:model="photos" />
```

Hanya file yang lolos `accept`, `maxSize`, dan `maxFiles` yang diunggah. Progres unggah mengisi setiap bar. Tetap validasi lagi di server.

## Event

Komponen memancarkan event browser seperti `markas-select`, `markas-change`, `markas-action`, dan `markas-cancel`. Livewire bisa mendengarkan event apa pun dengan `wire:` ditambah nama event:

```blade
<x-markas.dropdown-menu label="Aksi" :items="$actions" wire:markas-select="run($event.detail)" />

<x-markas.alert-dialog title="Hapus project?" wire:model="confirming" wire:markas-action="delete">
    Tindakan ini tidak bisa dibatalkan.
</x-markas.alert-dialog>
```

`x-on:markas-select="$wire.run($event.detail)"` sama hasilnya. `wire:click`, `wire:loading`, dan atribut `wire:` lain diteruskan apa adanya. Event yang dipancarkan tiap komponen tercantum di halamannya.

Untuk menampilkan toast dari action, kirim event toast. Livewire memancarkannya di `window`, tempat `<x-markas.toast />` mendengarkan:

```php
$this->dispatch('markas-toast', title: 'Tersimpan', variant: 'success');
```

## Render ulang

Livewire memperbarui halaman dengan menggabungkan (morph) HTML baru ke HTML lama. Komponen disusun agar render ulang mempertahankan apa yang dilihat user:

- **Id tidak berubah.** Id otomatis berasal dari `wire:model` komponen (atau `wire:key`, atau `name`) ditambah urutannya, bukan dari nilai acak. Livewire mencocokkan elemen lewat id, jadi id yang berubah akan mengganti elemen dan menghilangkan fokus saat mengetik. Isi `id` sendiri kalau butuh nilai tetap, misalnya untuk `<label>` atau `aria-describedby`.
- **Yang terbuka tetap terbuka.** Dialog, drawer, accordion `details`, dan panel Popover API (dropdown, popover, tooltip, daftar combobox) memakai `wire:ignore.self`. Livewire tetap memperbarui isinya, tapi tidak menyentuh status terbuka dan posisinya. Pengecualiannya daftar opsi combobox: setelah render pertama daftar itu dipegang Alpine (lihat [Performa](#performa)).
- **State Alpine tetap.** Tab aktif, slide carousel, item yang di-toggle, dan state animasi tidak di-reset.

Komponen yang menggambar dengan JavaScript (drag elements, stacking cards, canvas pixel trail, ikon theme toggle) dan lapisan dekoratif yang dibangkitkan dilewati morph sepenuhnya lewat `wire:ignore`.

### Island

`@island` di Livewire 4 dirender ulang sendiri, jadi id otomatis di dalamnya tidak bisa bergantung pada komponen di sekitarnya. Beri komponen di dalam island yang tidak punya `wire:model` sebuah `id` atau `wire:key`:

```blade
@island(name: 'stats')
    <x-markas.tabs wire:key="stats-tabs" :items="$periods">...</x-markas.tabs>
@endisland
```

### wire:key di daftar

Beri setiap item di loop sebuah `wire:key`, seperti anjuran Livewire. Di komponen MarkasUI, `wire:key` juga menjadi dasar id otomatis:

```blade
@foreach ($users as $user)
    <x-markas.checkbox wire:key="user-{{ $user->id }}" :label="$user->name" value="{{ $user->id }}" wire:model="selected" />
@endforeach
```

## wire:navigate

Komponen dengan listener global (scroll, resize, hotkey Ctrl+K, event toast) melepasnya di `destroy()` milik Alpine saat halaman berganti, jadi bolak-balik halaman tidak menumpuk listener atau membuka dua dialog. Komponen yang mulai saat dimuat, seperti number ticker atau typing text, mulai lagi di halaman baru.

Letakkan bagian bersama seperti `<x-markas.toast />` atau navbar di layout. Bungkus dengan `@persist('toast')` kalau state-nya harus bertahan saat navigasi.

## Performa

Setiap update merender ulang seluruh komponen Livewire di server lalu menggabungkan (morph) HTML barunya ke halaman. Tiga hal menentukan kecepatannya: kerja Blade di server, ukuran HTML yang dikirim balik, dan jumlah elemen yang dilewati morph di browser.

### Di server

Kerja Blade per komponen kecil: beberapa string class dan satu pencarian id, tanpa query atau akses file. Sebagian besar waktu per komponen adalah penanganan anonymous component milik Laravel sendiri (sekitar 0,05 sampai 0,1 ms per komponen di laptop), jadi aktifkan semua cache saat deploy:

```bash
composer install --no-dev --optimize-autoloader
php artisan optimize
```

`optimize` menyimpan cache config, route, event, dan view Blade yang sudah dikompilasi (`php artisan view:cache` saja untuk view). Biarkan OPcache aktif di production. Komponen yang disalin CLI ada di `resources/views/components/markas`, yang sudah dikenali Laravel sebagai `<x-markas.*>`. Kalau disimpan di folder lain, daftarkan folder itu sekali dengan prefix, jangan include view lewat path:

```php
// AppServiceProvider::boot()
Blade::anonymousComponentPath(resource_path('views/ui/markas'), 'markas');
```

### Lebih sedikit yang dikirim dan di-morph

- Batasi `:options` dan `:items` ke pilihan yang memang dibutuhkan user. Keduanya dicetak ke HTML (dan ke state Alpine) di setiap render. Buat di property `#[Computed]` agar daftar dibuat sekali per request.
- Komponen Livewire mengirim seluruh HTML-nya di setiap update, walau yang berubah hanya satu property yang tidak terkait. Pecah halaman menjadi komponen yang lebih kecil, atau pakai `@island` di Livewire 4 agar render ulang hanya mencakup bagian yang berubah. Muat bagian yang berat dengan `lazy` (atau `defer` di Livewire 4).
- Lapisan dekoratif (stars, sparkles, meteors, beams, background lines dan boxes), ikon theme toggle, dan daftar opsi combobox dilewati morph dengan `wire:ignore`. Semuanya digambar sekali lalu dipegang CSS atau Alpine, jadi props yang membentuknya (`count`, `seed`, `cols`, `options`) dibaca di render pertama. Untuk menggambar ulang dengan props baru, ganti `wire:key`-nya.

### Mengetik

`wire:model.live` di input teks menunggu 150 ms setelah tombol terakhir sebelum memanggil server (bawaan Livewire). Kontrol Alpine yang nilainya berubah saat diketik atau digeser (currency input, input OTP, slider) mendapat debounce 150 ms yang sama kalau ditulis `wire:model.live` tanpa waktu sendiri, jadi satu rentetan ketikan mengirim satu request, bukan satu per tombol. Tulis `.debounce.500ms` atau `.throttle` untuk memilih sendiri, dan pakai `wire:model` biasa kalau nilainya baru penting saat submit:

```blade
<x-markas.input label="Cari" wire:model.live.debounce.250ms="search" />
<x-markas.currency-input label="Jumlah" wire:model.live="amount" />
```

### x-model di dalam komponen Livewire

Hubungkan kontrol Alpine ke Livewire dengan `wire:model`. Kalau dihubungkan ke state Alpine lokal dengan `x-model` di dalam komponen Livewire, setiap update Livewire menyisakan salinan elemen yang sudah terlepas (masalah Alpine pada `x-modelable` saat morph, masih ada sampai Alpine 3.17), jadi memori bertambah di setiap update. Pakai `wire:model`, atau letakkan state Alpine itu di luar komponen Livewire.

### Budget

`pnpm test:livewire` mengukur setiap komponen di app Laravel dengan cache di atas aktif: waktu render Blade, ukuran HTML (mentah dan gzip), ukuran atribut Alpine, elemen yang dilewati morph, waktu init Alpine dan morph, pertambahan listener dan node DOM selama 20 update, dan jumlah request per rentetan ketikan. Ukuran byte dan jumlah elemen diberi budget pasti di `tests/livewire/perf-budgets.json`, waktu diberi batas longgar.

## Livewire 3

Semua di atas jalan di Livewire 3.6 ke atas. Perbedaannya ada di sisi Livewire:

- Livewire 4 mendaftarkan route halaman penuh dengan `Route::livewire()`. Di Livewire 3 pakai `Route::get('/path', Component::class)`.
- Livewire 4 menambah island, single file component, dan `wire:ref`. Fitur itu tidak mengubah perilaku komponen.
- Kedua versi mencocokkan elemen saat morph lewat `wire:key`, `wire:id`, lalu `id` (Livewire 3 memeriksa `wire:key` dulu, Livewire 4 `wire:id` dulu), karena itu id yang stabil penting di keduanya.
- Livewire 3 tidak membawa plugin sort Alpine. Tidak ada komponen yang memakainya.

Setiap perubahan diuji di CI terhadap Livewire 3 dan 4 di app Laravel baru: setiap komponen dirender ulang tanpa kehilangan elemen atau state, kontrol form terhubung dua arah, dan `wire:navigate` tidak menambah listener. Jalankan pengecekan yang sama dengan `pnpm test:livewire` (`LIVEWIRE=3` untuk versi 3).
