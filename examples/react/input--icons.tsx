import { Input } from "../../components/input/Input";

const icon = "pointer-events-none absolute bottom-3 left-3 size-4 text-muted";

export default function InputIconsExample() {
  return (
    <div className="grid gap-4">
      <div className="relative">
        <Input
          type="search"
          name="q"
          aria-label="Search projects"
          placeholder="Search projects"
          className="pl-9!"
        />
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
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </div>
      <div className="relative">
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="you@example.com"
          className="pl-9!"
        />
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
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </div>
      <div className="relative">
        <Input
          type="password"
          name="password"
          label="Password"
          defaultValue="correct-horse"
          className="pl-9!"
        />
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
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </div>
    </div>
  );
}
