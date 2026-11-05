import { Pagination } from "../../components/pagination/Pagination";

export default function PaginationTableFooterExample() {
  return (
    <div className="grid gap-3 border-t border-line pt-3">
      <p className="text-sm text-muted">Showing 21 to 30 of 97 results</p>
      <Pagination page={3} total={10} href="?p={page}" />
    </div>
  );
}
