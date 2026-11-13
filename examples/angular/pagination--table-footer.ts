import { Component } from "@angular/core";
import { Pagination } from "../../components/pagination/pagination.component";

@Component({
  selector: "markas-example",
  imports: [Pagination],
  template: `
    <div class="grid gap-3 border-t border-line pt-3">
      <p class="text-sm text-muted">Showing 21 to 30 of 97 results</p>
      <nav markas-pagination page="3" total="10" [href]="href"></nav>
    </div>
  `,
})
export default class PaginationTableFooterExample {
  protected readonly href = "?p={page}";
}
