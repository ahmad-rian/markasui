import { Button } from "../../components/button/Button";
import { Drawer } from "../../components/drawer/Drawer";

export default function DrawerFixture() {
  return (
    <Drawer
      title="Filter products"
      trigger={<Button variant="secondary">Open filters</Button>}
      footer={
        <>
          <Button variant="secondary" type="submit" value="cancel">
            Cancel
          </Button>
          <Button type="submit" value="apply">
            Apply
          </Button>
        </>
      }
    >
      Choose a category and price range to filter the product list.
    </Drawer>
  );
}
