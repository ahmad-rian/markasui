import { NotFound } from "../../components/not-found/NotFound";

export default function NotFoundSplitExample() {
  return (
    <NotFound
      variant="split"
      title="This page wandered off"
      description="We could not find what you were looking for. It may have been renamed or removed."
    />
  );
}
