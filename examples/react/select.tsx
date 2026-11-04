import { Select } from "../../components/select/Select";

export default function SelectFixture() {
  return (
    <div className="grid gap-4">
      <Select
        name="kota"
        label="Kota"
        hint="Pilih kota domisili."
        defaultValue="bandung"
      >
        <option value="jakarta">Jakarta</option>
        <option value="bandung">Bandung</option>
        <option value="surabaya">Surabaya</option>
      </Select>
      <Select name="peran" label="Peran" error="Peran wajib dipilih.">
        <option value="">Pilih peran</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </Select>
      <Select name="paket" label="Paket" disabled>
        <option value="gratis">Gratis</option>
      </Select>
    </div>
  );
}
