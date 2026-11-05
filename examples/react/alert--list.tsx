import { Alert } from "../../components/alert/Alert";

export default function AlertListExample() {
  return (
    <Alert variant="danger" title="Please fix 3 errors">
      <ul className="grid list-disc gap-1 pl-5">
        <li>Email address is required.</li>
        <li>Password must be at least 8 characters.</li>
        <li>Accept the terms to continue.</li>
      </ul>
    </Alert>
  );
}
