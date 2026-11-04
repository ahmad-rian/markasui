import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";

export default function CardFixture() {
  return (
    <Card
      title="Pro plan"
      description="For small teams that are growing."
      footer={
        <>
          <Button size="sm">Choose plan</Button>
          <Button variant="ghost" size="sm">
            Compare
          </Button>
        </>
      }
    >
      Includes 10 team members, 50 GB of storage, and monthly reports.
    </Card>
  );
}
