import { Component, Input } from "@angular/core";

@Component({
    template: '',
})

export class UseMSTDataGrid {

    @Input() rowData: MstGridRowsDataType[] = [];
    @Input() colData: MstGridColsDataType[] = [];
    @Input() rowsPerPageOptions: number[] = [];
    @Input() page: number = 0;

    @Input() filterField: string = '';
    @Input() filterValue: string = '';
    @Input() filterType: string = '';

    @Input() order: 'asc' | 'desc' | undefined = undefined;
    @Input() orderBy: string = ''
    
    @Input() rowsPerPage: number;

    constructor() {
        this.rowsPerPage = this.rowsPerPageOptions[0];
    }

    updateFilter(property: {
        filterField: string;
        filterValue: string;
        filterType: string;
    }) {
        this.filterField = property.filterField;
        this.filterValue = property.filterValue;
        this.filterType = property.filterType;
    }

    updateOrder(property: {
        order: 'asc' | 'desc' | undefined;
        orderBy: string;
    }) {
        this.order = property.order;
        this.orderBy = property.orderBy;
    }

    resetPage() {
        this.page = 0;
    }
}
