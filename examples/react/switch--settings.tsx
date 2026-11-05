import { Switch } from "../../components/switch/Switch";

const row = "flex items-start justify-between gap-4 p-4";
const text = "grid gap-0.5";
const title = "text-sm font-medium text-ink";
const description = "text-sm text-muted";

export default function SwitchSettingsExample() {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-surface">
      <div className={row}>
        <div className={text}>
          <p className={title}>Push notifications</p>
          <p className={description}>Alerts on your phone for new messages.</p>
        </div>
        <Switch name="push" aria-label="Push notifications" defaultChecked />
      </div>
      <div className={row}>
        <div className={text}>
          <p className={title}>Weekly digest</p>
          <p className={description}>A summary of activity every Monday.</p>
        </div>
        <Switch name="digest" aria-label="Weekly digest" defaultChecked />
      </div>
      <div className={row}>
        <div className={text}>
          <p className={title}>Product news</p>
          <p className={description}>Occasional emails about new features.</p>
        </div>
        <Switch name="news" aria-label="Product news" />
      </div>
    </div>
  );
}
