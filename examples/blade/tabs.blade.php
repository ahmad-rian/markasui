<x-markas.tabs :items="['akun' => 'Akun', 'sandi' => 'Kata sandi', 'notifikasi' => 'Notifikasi']" default-value="akun">
    <x-slot:akun>Ubah nama dan email akun Anda.</x-slot:akun>
    <x-slot:sandi>Ganti kata sandi secara berkala.</x-slot:sandi>
    <x-slot:notifikasi>Atur email yang ingin Anda terima.</x-slot:notifikasi>
</x-markas.tabs>
