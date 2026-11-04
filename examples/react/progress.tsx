import { Progress } from "../../components/progress/Progress";

export default function ProgressFixture() {
  return (
    <div className="grid gap-5">
      <Progress label="Mengunggah berkas" value={60} />
      <Progress label="Penyimpanan terpakai" value={3} max={4} />
      <Progress label="Menyiapkan laporan" />
    </div>
  );
}
