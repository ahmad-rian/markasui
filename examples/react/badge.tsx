import { Badge } from "../../components/badge/Badge";

export default function BadgeFixture() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Draf</Badge>
      <Badge variant="primary">Baru</Badge>
      <Badge variant="success">Aktif</Badge>
      <Badge variant="warning">Tertunda</Badge>
      <Badge variant="danger">Gagal</Badge>
    </div>
  );
}
