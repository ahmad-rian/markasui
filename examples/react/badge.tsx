import { Badge } from "../../components/badge/Badge";

export default function BadgeFixture() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Draft</Badge>
      <Badge variant="primary">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Failed</Badge>
    </div>
  );
}
