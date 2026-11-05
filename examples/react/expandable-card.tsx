import { Button } from "../../components/button/Button";
import { ExpandableCard } from "../../components/expandable-card/ExpandableCard";

const grid = "grid grid-cols-2 gap-3";
const art = "flex h-full items-center justify-center text-ink";
const specs = "grid gap-1 text-muted";
const price = "text-base font-semibold text-ink";

const products = [
  {
    name: "Desk lamp",
    price: "$48",
    summary: "Warm dimmable light with a weighted brass base.",
    specs: ["Three brightness levels", "USB-C powered", "Ships in 2 days"],
    tone: "bg-primary-soft",
    icon: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11.2V16h6v-1.8A6 6 0 0 0 12 3Z",
  },
  {
    name: "Linen notebook",
    price: "$18",
    summary: "Lay-flat binding and 160 pages of dotted paper.",
    specs: ["A5, 160 pages", "Recycled cover", "Ships tomorrow"],
    tone: "bg-success/15",
    icon: "M6 4h11a1 1 0 0 1 1 1v15H7a1 1 0 0 1-1-1V4Zm0 13h12M10 8h5",
  },
  {
    name: "Ceramic mug",
    price: "$14",
    summary: "Hand-glazed stoneware that keeps coffee warm longer.",
    specs: ["350 ml", "Dishwasher safe", "Ships in 3 days"],
    tone: "bg-warning/15",
    icon: "M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Zm11 2h1.5a2.5 2.5 0 0 1 0 5H16",
  },
  {
    name: "Wool throw",
    price: "$64",
    summary: "Soft merino blanket woven in a classic herringbone.",
    specs: ["130 x 170 cm", "Machine washable", "Ships in 5 days"],
    tone: "bg-subtle",
    icon: "M4 6h16v12H4zM4 10h16M4 14h16",
  },
];

export default function ExpandableCardFixture() {
  return (
    <div className={grid}>
      {products.map((product) => (
        <ExpandableCard
          key={product.name}
          title={product.name}
          description={product.summary}
          media={
            <span className={`${art} ${product.tone}`}>
              <svg
                className="size-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={product.icon} />
              </svg>
            </span>
          }
          footer={<Button>Add to cart</Button>}
        >
          <p className={price}>{product.price}</p>
          <ul className={specs}>
            {product.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </ExpandableCard>
      ))}
    </div>
  );
}
