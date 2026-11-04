import { Pagination } from "../../components/pagination/Pagination";

export default function PaginationFixture() {
  return <Pagination page={5} total={10} href="?halaman={page}" />;
}
