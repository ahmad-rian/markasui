import { NotFound } from "../../components/not-found/NotFound";

export default function NotFoundTerminalExample() {
  return (
    <NotFound
      variant="terminal"
      path="/docs/setup"
      description="The command could not find that page. Check the address or head back home."
    />
  );
}
