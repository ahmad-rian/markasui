import { Input } from "../../components/input/Input";

export default function InputFixture() {
  return (
    <div className="grid gap-4">
      <Input
        name="nama"
        label="Nama lengkap"
        placeholder="Budi Santoso"
        hint="Sesuai KTP."
      />
      <Input
        name="email"
        type="email"
        label="Email"
        defaultValue="budi@"
        error="Format email belum benar."
      />
      <Input
        name="kode"
        label="Kode undangan"
        defaultValue="MARKAS-2026"
        disabled
      />
    </div>
  );
}
