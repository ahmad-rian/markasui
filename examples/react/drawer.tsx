import { Button } from "../../components/button/Button";
import { Drawer } from "../../components/drawer/Drawer";

export default function DrawerFixture() {
  return (
    <Drawer
      title="Filter produk"
      trigger={<Button variant="secondary">Buka filter</Button>}
      footer={
        <>
          <Button variant="secondary" type="submit" value="batal">
            Batal
          </Button>
          <Button type="submit" value="terapkan">
            Terapkan
          </Button>
        </>
      }
    >
      Pilih kategori dan rentang harga untuk menyaring daftar produk.
    </Drawer>
  );
}
