import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FilterToolbarComponent } from './filter-toolbar/filter-toolbar.component';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';

@Component({
  selector: 'app-mst-table',
  standalone: true,
  templateUrl: './mst-table.component.html',
  styleUrl: './mst-table.component.scss',
  imports: [MatIconButton, MatIcon, FilterToolbarComponent, TablePaginationComponent]
})

export class MstTableComponent implements OnInit, OnChanges {

  @Input() props: MstDataGridProps;

  colData: MstGridColsDataType[] = [];
  rowData: MstGridRowsDataType[] = [];
  showToolbar: boolean = false;
  sorting: {
    order?: 'asc' | 'desc';
    orderBy: string
  }

  constructor() {
    this.props = {
      gridRows: [],
      gridCols: [],
    }
    this.sorting = {
      order: 'asc',
      orderBy: ''
    } 
  }

  ngOnInit(): void {
    this.initialiseColData();
    this.rowData = this.initialiseRowData();
    this.handleRequestFilter.bind(this)
    if (this.props.sorting) {
      this.sorting = this.props.sorting
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.props.sorting) {
      this.sorting = this.props.sorting
    }
  }

  initialiseColData() {
    this.props.pagination?.rowsPerPageOptions
    const result = []
    if (this.props.gripOptions?.includeRowIndex) {
      this.colData.push({
        field: 'count',
        width: 30,
        isSortable: false
      })
    }
    this.colData.push(...this.props.gridCols.map((column, index) => {
      return {
        ...column,
        id: `mstCol-${column.field}-${index}`,
        isSortable: !column.isSortable || true,
      }
      
    }))
  }

  initialiseRowData() {
    return this.props.gridRows.map((row, index) => {
      return{
        ...row,
        count: (index + 1)
      }
    })
  }

  handleToggleFilterToolbar() {
    this.showToolbar = !this.showToolbar;
  }

  handlePageChange(event: unknown, newPage: number) {    
    this.props.gridCallbacks?.onPageChange && this.props.gridCallbacks?.onPageChange(event, newPage)
  }

  handleRequestSort(event: unknown, property: any) {
    const orderBy = property.field;
    const order = this.props.sorting?.order === 'asc' ? 'desc' : 'asc';
    this.props.gridCallbacks?.onRequestSort && this.props.gridCallbacks?.onRequestSort(event, {order: order, orderBy: orderBy});
  }

  handleRequestFilter(event: any, filter: any) {
    this.props.gridCallbacks?.onRequestFilter && this.props.gridCallbacks.onRequestFilter(event, filter)
  }

  handleResetFilter(event: any) {
    this.handleToggleFilterToolbar();
    this.props.gridCallbacks?.onResetFilter && this.props.gridCallbacks.onResetFilter(event)
  }

  handleRowsPerPageChange(event: any, newRowsPerPage: number) {
    this.props.gridCallbacks?.onRowsPerPageChange && this.props.gridCallbacks?.onRowsPerPageChange(event, newRowsPerPage);
  }

}
