<div class="grid gap-6">
    <x-markas.radio-group
        name="paket"
        label="Paket langganan"
        value="pro"
        :options="[
            ['value' => 'gratis', 'label' => 'Gratis', 'description' => 'Untuk proyek pribadi.'],
            ['value' => 'pro', 'label' => 'Pro', 'description' => 'Untuk tim kecil hingga 10 orang.'],
            ['value' => 'bisnis', 'label' => 'Bisnis', 'description' => 'Untuk organisasi dengan kebutuhan khusus.'],
        ]"
    />
    <x-markas.radio-group
        name="tagihan"
        label="Siklus tagihan"
        value="bulanan"
        orientation="horizontal"
        :options="[
            ['value' => 'bulanan', 'label' => 'Bulanan'],
            ['value' => 'tahunan', 'label' => 'Tahunan'],
        ]"
    />
</div>
