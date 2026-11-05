import { Carousel } from "../../components/carousel/Carousel";

const products = [
  { name: "Desk lamp", price: "$48" },
  { name: "Notebook set", price: "$18" },
  { name: "Wool throw", price: "$64" },
  { name: "Ceramic mug", price: "$14" },
];

export default function CarouselMultipleExample() {
  return (
    <Carousel label="Popular products" perView={2}>
      {products.map((product) => (
        <div
          key={product.name}
          className="rounded-xl border border-line bg-surface p-4"
        >
          <div className="h-24 rounded-lg bg-subtle" />
          <p className="mt-3 text-sm font-medium text-ink">{product.name}</p>
          <p className="text-sm text-muted">{product.price}</p>
        </div>
      ))}
    </Carousel>
  );
}
