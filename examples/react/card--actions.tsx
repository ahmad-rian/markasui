import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";

export default function CardActionsExample() {
  return (
    <Card
      title="Delete project"
      description="This removes the project, its files, and all deployments. This cannot be undone."
      footer={
        <>
          <Button variant="secondary" size="sm" className="ml-auto">
            Cancel
          </Button>
          <Button variant="danger" size="sm">
            Delete project
          </Button>
        </>
      }
    >
      <p className="text-muted">
        Project: <span className="font-medium text-ink">marketing-site</span>
      </p>
    </Card>
  );
}
