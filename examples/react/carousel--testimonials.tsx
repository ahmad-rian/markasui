import { Carousel } from "../../components/carousel/Carousel";

const quotes = [
  {
    text: "We moved our whole team over in a weekend. Planning meetings are half as long now.",
    name: "Dewi Lestari",
    role: "Head of Product, Lumen",
  },
  {
    text: "The weekly dashboard replaced three spreadsheets and a lot of status pings.",
    name: "Budi Santoso",
    role: "Engineering Manager, Arka",
  },
  {
    text: "Simple enough for new hires, flexible enough for our client projects.",
    name: "Siti Aminah",
    role: "Founder, Studio Rana",
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
