import { Select } from "../../components/select/Select";

const icon = "pointer-events-none absolute bottom-3 left-3 size-4 text-muted";

export default function SelectIconExample() {
  return (
    <div className="grid gap-4">
      <div className="relative">
        <Select
          name="language"
          label="Language"
          defaultValue="en"
          className="pl-9!"
        >
          <option value="en">English</option>
          <option value="id">Bahasa Indonesia</option>
          <option value="ja">Japanese</option>
        </Select>
        <svg
          className={icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      </div>
      <div className="relative">
        <Select
          name="currency"
          label="Currency"
          defaultValue="usd"
          className="pl-9!"
        >
          <option value="idr">IDR, Indonesian rupiah</option>
          <option value="usd">USD, US dollar</option>
          <option value="eur">EUR, Euro</option>
        </Select>
        <svg
          className={icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      </div>
    </div>
  );
}
