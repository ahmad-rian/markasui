import { Input } from "../../components/input/Input";

const prefix =
  "pointer-events-none absolute bottom-0 left-3 flex h-10 items-center text-sm text-muted";
const suffix =
  "pointer-events-none absolute right-3 bottom-0 flex h-10 items-center text-sm text-muted";
const addon =
  "pointer-events-none absolute bottom-0 left-0 flex h-10 items-center border-r border-line px-3 text-sm text-muted";

export default function InputAddonsExample() {
  return (
    <div className="grid gap-4">
      <div className="relative">
        <Input
          name="price"
          label="Price"
          placeholder="0.00"
          inputMode="decimal"
          className="pr-14! pl-7!"
        />
        <span className={prefix} aria-hidden="true">
          $
        </span>
        <span className={suffix}>USD</span>
      </div>
      <div className="relative">
        <Input
          name="website"
          label="Website"
          placeholder="example.com"
          className="pl-21!"
        />
        <span className={addon}>https://</span>
      </div>
      <div className="relative">
        <Input
          name="username"
          label="Username"
          defaultValue="budisantoso"
          className="pl-7!"
        />
        <span className={prefix} aria-hidden="true">
          @
        </span>
      </div>
    </div>
  );
}
