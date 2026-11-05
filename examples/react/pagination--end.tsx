import { Pagination } from "../../components/pagination/Pagination";

export default function PaginationEndExample() {
  return <Pagination page={10} total={10} href="?p={page}" />;
}
