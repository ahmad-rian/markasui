import { Button } from "../../components/button/Button";
import { Drawer } from "../../components/drawer/Drawer";

const link =
  "block rounded-md px-3 py-2 font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle motion-reduce:transition-none";

export default function DrawerLeftExample() {
  return (
    <div className="flex justify-center">
      <Drawer
        side="left"
        title="Menu"
        trigger={
          <Button
            variant="secondary"
            aria-label="Open menu"
            className="size-10 px-0"
          >
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
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        }
      >
        <nav aria-label="Main">
          <ul className="grid gap-1">
            <li>
              <a className={link} href="#dashboard">
                Dashboard
              </a>
            </li>
            <li>
              <a className={link} href="#projects">
                Projects
              </a>
            </li>
            <li>
              <a className={link} href="#team">
                Team
              </a>
            </li>
            <li>
              <a className={link} href="#settings">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </Drawer>
    </div>
  );
}
