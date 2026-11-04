import { Textarea } from "../../components/textarea/Textarea";

export default function TextareaFixture() {
  return (
    <div className="grid gap-4">
      <Textarea
        name="bio"
        label="Bio singkat"
        placeholder="Ceritakan sedikit tentang Anda"
        hint="Maksimal 200 karakter."
      />
      <Textarea
        name="alamat"
        label="Alamat"
        rows={2}
        defaultValue="Jl. Merdeka"
        error="Alamat belum lengkap."
      />
    </div>
  );
}
