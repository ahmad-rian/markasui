<x-markas.dropdown-menu
    label="Aksi"
    :items="[
        ['label' => 'Ubah', 'value' => 'ubah'],
        ['label' => 'Duplikat', 'value' => 'duplikat'],
        ['label' => 'Arsipkan', 'value' => 'arsipkan', 'disabled' => true],
        ['separator' => true],
        ['label' => 'Hapus', 'value' => 'hapus', 'danger' => true],
    ]"
/>
