<x-markas.accordion :items="['pengiriman' => 'Berapa lama pengiriman?', 'pembayaran' => 'Metode pembayaran apa saja?', 'retur' => 'Bagaimana cara retur barang?']" default-value="pengiriman">
    <x-slot:pengiriman>Pesanan tiba dalam 2 sampai 4 hari kerja.</x-slot:pengiriman>
    <x-slot:pembayaran>Transfer bank, kartu kredit, dan dompet digital.</x-slot:pembayaran>
    <x-slot:retur>Ajukan retur dalam 7 hari lewat halaman pesanan.</x-slot:retur>
</x-markas.accordion>
