import { Button } from "../../components/button/Button";

export default function ButtonFixture() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Simpan</Button>
        <Button variant="secondary">Batal</Button>
        <Button variant="ghost">Lainnya</Button>
        <Button variant="danger">Hapus</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Kecil</Button>
        <Button size="md">Sedang</Button>
        <Button size="lg">Besar</Button>
        <Button disabled>Nonaktif</Button>
      </div>
    </div>
  );
}
