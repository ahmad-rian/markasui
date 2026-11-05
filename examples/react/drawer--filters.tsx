import { Button } from "../../components/button/Button";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { Drawer } from "../../components/drawer/Drawer";

export default function DrawerFiltersExample() {
  return (
    <div className="flex justify-center">
      <Drawer
        title="Filter products"
        trigger={
          <Button variant="secondary">
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 5h18M6 12h12M10 19h4" />
            </svg>
            Filters
          </Button>
        }
        footer={
          <>
            <Button variant="secondary" type="submit" value="reset">
              Reset
            </Button>
            <Button type="submit" value="apply">
              Show results
            </Button>
          </>
        }
      >
        <fieldset className="grid gap-3">
          <legend className="mb-3 font-medium text-ink">Category</legend>
          <Checkbox name="category-shoes" label="Shoes" />
          <Checkbox name="category-bags" label="Bags" />
          <Checkbox name="category-accessories" label="Accessories" />
        </fieldset>
      </Drawer>
    </div>
  );
}
