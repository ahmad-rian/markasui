import { Alert } from "../../components/alert/Alert";

export default function AlertFixture() {
  return (
    <div className="grid gap-3">
      <Alert title="Pembaruan tersedia" role="status">
        Versi 2.1 bisa dipasang kapan saja.
      </Alert>
      <Alert variant="success" title="Pembayaran diterima">
        Faktur sudah dikirim ke email Anda.
      </Alert>
      <Alert variant="warning" title="Kuota hampir habis">
        Ruang penyimpanan tersisa 10%.
      </Alert>
      <Alert variant="danger" title="Gagal menyimpan">
        Periksa koneksi internet lalu coba lagi.
      </Alert>
    </div>
  );
}
