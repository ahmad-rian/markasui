import { Badge } from "../../components/badge/Badge";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";

export default function CardProductExample() {
  return (
    <Card
      className="mx-auto max-w-xs"
      footer={<Button className="w-full">Add to cart</Button>}
    >
      <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-subtle text-faint">
        <svg
          className="size-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 7h12l1 13H5L6 7zm3 0V6a3 3 0 0 1 6 0v1" />
        </svg>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="grid gap-1">
          <h3 className="text-base font-semibold text-ink">Linen tote bag</h3>
          <p className="text-muted">Natural, 38 x 42 cm</p>
        </div>
        <p className="text-base font-semibold text-ink">$32.00</p>
      </div>
      <div className="mt-3">
        <Badge variant="success">In stock</Badge>
      </div>
    </Card>
  );
}
