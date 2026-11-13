import { Component } from "@angular/core";
import { Pagination } from "../../components/pagination/pagination.component";

@Component({
  selector: "markas-example",
  imports: [Pagination],
  template: `<nav markas-pagination page="2" total="4" [href]="href"></nav>`,
})
export default class PaginationFewPagesExample {
  protected readonly href = "?p={page}";
}
