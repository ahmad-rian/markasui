import { Alert } from "../../components/alert/Alert";

export default function AlertWithoutTitleExample() {
  return (
    <div className="grid gap-3">
      <Alert role="status">
        Your changes are saved as a draft until you publish.
      </Alert>
      <Alert variant="success">Your password has been changed.</Alert>
      <Alert variant="warning">This link expires in 24 hours.</Alert>
      <Alert variant="danger">
        You do not have permission to edit this page.
      </Alert>
    </div>
  );
}
