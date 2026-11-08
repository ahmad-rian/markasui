import { NotFound } from "../../components/not-found/NotFound";

export default function NotFoundGlitchExample() {
  return (
    <NotFound
      variant="glitch"
      code="500"
      title="Something went wrong"
      description="Our server hit an unexpected error. Please try again in a moment."
    />
  );
}
