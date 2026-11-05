import { Avatar } from "../../components/avatar/Avatar";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";

export default function CardProfileExample() {
  return (
    <Card
      className="mx-auto max-w-sm"
      footer={
        <>
          <Button size="sm">Message</Button>
          <Button variant="secondary" size="sm">
            View profile
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-4">
        <Avatar name="Sarah Miller" size="lg" alt="" />
        <div className="grid gap-0.5">
          <h3 className="text-base font-semibold text-ink">Sarah Miller</h3>
          <p className="text-muted">Product designer at Northwind</p>
        </div>
      </div>
      <p className="mt-4 text-muted">
        Designs onboarding flows and keeps the component library tidy.
      </p>
    </Card>
  );
}
