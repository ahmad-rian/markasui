import { Pagination } from "../../components/pagination/Pagination";

export default function PaginationFewPagesExample() {
  return <Pagination page={2} total={4} href="?p={page}" />;
}
