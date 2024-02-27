import { Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss'
})
export class TablePaginationComponent {
  @Input() rowsPerPageOptions: number[] = [];
  @Input() count: number = 0;
  @Input() rowsPerPage: number = 0;
  @Input() page: number = 0;
  @Input() onPageChange: (event: any, newPage: number) => void = () => {};
  @Input() onRowsPerPageChange: (event: any, newRowsPerPage: number) => void = () => {};

  handlePageChange(event: any) {
    const {previousPage, pageIndex, pageSize, length} = event;

    if (previousPage !== pageIndex) {
      this.onPageChange(event, pageIndex)
    }
    if (pageSize !== this.rowsPerPage) {
      this.onRowsPerPageChange(event, pageSize)
    }
  }

}
