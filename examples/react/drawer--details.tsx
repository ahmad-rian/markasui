import { Button } from "../../components/button/Button";
import { Drawer } from "../../components/drawer/Drawer";

export default function DrawerDetailsExample() {
  return (
    <div className="flex justify-center">
      <Drawer
        title="Order #1042"
        trigger={<Button variant="secondary">View order</Button>}
        footer={
          <>
            <Button variant="secondary" type="submit" value="close">
              Close
            </Button>
            <Button type="submit" value="ship">
              Mark as shipped
            </Button>
          </>
        }
      >
        <dl className="grid grid-cols-2 gap-y-3">
          <dt>Customer</dt>
          <dd className="text-ink">Rina Hartono</dd>
          <dt>Placed on</dt>
          <dd className="text-ink">12 Oct 2026</dd>
          <dt>Items</dt>
          <dd className="text-ink">3</dd>
          <dt>Total</dt>
          <dd className="font-medium text-ink">$128.00</dd>
        </dl>
      </Drawer>
    </div>
  );
}
