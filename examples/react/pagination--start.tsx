import { Pagination } from "../../components/pagination/Pagination";

export default function PaginationStartExample() {
  return <Pagination page={1} total={10} href="?p={page}" />;
}
