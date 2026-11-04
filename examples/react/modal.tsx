import { Button } from "../../components/button/Button";
import { Modal } from "../../components/modal/Modal";

export default function ModalFixture() {
  return (
    <Modal
      title="Hapus proyek?"
      trigger={<Button variant="danger">Hapus proyek</Button>}
      footer={
        <>
          <Button variant="secondary" type="submit" value="batal">
            Batal
          </Button>
          <Button variant="danger" type="submit" value="hapus">
            Ya, hapus
          </Button>
        </>
      }
    >
      Proyek dan semua datanya akan dihapus permanen.
    </Modal>
  );
}
