import { Marquee } from "../../components/marquee/Marquee";

const first = ["Accordion", "Avatar", "Badge", "Button", "Card", "Carousel"];
const second = ["Modal", "Popover", "Select", "Slider", "Tabs", "Tooltip"];
const chip =
  "rounded-lg bg-subtle px-3 py-1.5 text-sm whitespace-nowrap text-ink";

export default function MarqueeRowsExample() {
  return (
    <div className="flex flex-col gap-3">
      <Marquee duration={25}>
        {first.map((name) => (
          <span key={name} className={chip}>
            {name}
          </span>
        ))}
      </Marquee>
      <Marquee duration={25} reverse>
        {second.map((name) => (
          <span key={name} className={chip}>
            {name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
