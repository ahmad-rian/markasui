import { Carousel } from "../../components/carousel/Carousel";

const quotes = [
  {
    text: "We moved our admin panel to MarkasUI in a weekend. Design reviews are half as long now.",
    name: "Dewi Lestari",
    role: "Head of Product, Jakarta",
  },
  {
    text: "One set of tokens for Blade and Vue replaced three style guides and a lot of pixel nudging.",
    name: "Budi Santoso",
    role: "Engineering Manager, Bandung",
  },
  {
    text: "Simple enough for client handoffs, flexible enough for every brand I work with.",
    name: "Siti Aminah",
    role: "Freelance developer, Yogyakarta",
  },
];

export default function CarouselTestimonialsExample() {
  return (
    <Carousel label="Customer stories" showDots>
      {quotes.map((quote) => (
        <figure
          key={quote.name}
          className="rounded-xl border border-line bg-surface p-6"
        >
          <blockquote className="text-base text-ink">{quote.text}</blockquote>
          <figcaption className="mt-4 text-sm">
            <span className="font-medium text-ink">{quote.name}</span>
            <span className="block text-muted">{quote.role}</span>
          </figcaption>
        </figure>
      ))}
    </Carousel>
  );
}
