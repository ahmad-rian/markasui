import { Carousel } from "../../components/carousel/Carousel";

const card = "flex h-40 flex-col justify-end rounded-xl bg-subtle p-5";
const title = "text-sm font-medium text-ink";
const text = "mt-1 text-sm text-muted";

export default function CarouselFixture() {
  return (
    <Carousel label="Product tour" showDots>
      <div className={card}>
        <p className={title}>Plan your week</p>
        <p className={text}>
          Drag tasks onto the calendar to block focus time.
        </p>
      </div>
      <div className={card}>
        <p className={title}>Share with your team</p>
        <p className={text}>Invite teammates and assign tasks in one click.</p>
      </div>
      <div className={card}>
        <p className={title}>Track progress</p>
        <p className={text}>
          See what shipped this week on a single dashboard.
        </p>
      </div>
    </Carousel>
  );
}
