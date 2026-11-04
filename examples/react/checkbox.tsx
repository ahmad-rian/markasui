import { Checkbox } from "../../components/checkbox/Checkbox";

export default function CheckboxFixture() {
  return (
    <div className="grid gap-4">
      <Checkbox
        name="syarat"
        label="Saya setuju dengan syarat layanan"
        defaultChecked
      />
      <Checkbox
        name="kabar"
        label="Kirimi saya kabar terbaru"
        description="Paling banyak satu email per bulan."
      />
      <Checkbox name="arsip" label="Arsipkan otomatis" disabled />
    </div>
  );
}
