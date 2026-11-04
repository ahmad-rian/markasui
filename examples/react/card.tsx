import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";

export default function CardFixture() {
  return (
    <Card
      title="Paket Pro"
      description="Untuk tim kecil yang sedang tumbuh."
      footer={
        <>
          <Button size="sm">Pilih paket</Button>
          <Button variant="ghost" size="sm">
            Bandingkan
          </Button>
        </>
      }
    >
      Termasuk 10 anggota tim, penyimpanan 50 GB, dan laporan bulanan.
    </Card>
  );
}
