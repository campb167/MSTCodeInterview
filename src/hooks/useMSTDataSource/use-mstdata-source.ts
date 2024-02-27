import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { chunkToPage, filterComparator } from "../../utils/mstTable.utils";
import { sortComparator, stableSort } from "../../utils/sorting.utils";

@Component({
    template: ''
})

export class UseMSTDataSource implements OnChanges {
    @Input() dataSet: {
        rowData: MstGridRowsDataType[]
        rowCount: number
    } = {
        rowData: [],
        rowCount: 0
    };
    @Input() params: MstDataGridParams = {
        limit: 10,
        skip: 0,
        sortField: 'count',
        sortDirection: 'asc',
        filterField: '',
        filterValue: '',
        filterType: ''
    }

    rowData: MstGridRowsDataType[] = [];

    constructor() {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        const {limit, skip, sortField, sortDirection, filterField, filterValue, filterType} = this.params
        if (!this.dataSet || !this.dataSet.rowData) {
            throw {
                type: 'noData',
                message: 'Invalid data format'
            }
        }
        let _data: any = {...this.dataSet}
        let rowData = _data.rowData;

        if (filterField && filterValue) {
            rowData = rowData.filter((data: MstGridRowsDataType) => 
                filterComparator(this.dataSet, filterField, filterValue, filterType)
            )
        }

        if (sortField && sortDirection) {
            rowData = stableSort(rowData, sortComparator(sortDirection, sortField));
        } else {
            rowData = stableSort(rowData, sortComparator('asc', 'count'));
        }

        const chunkedData = chunkToPage([...rowData], skip, limit);
        this.rowData = chunkedData;
    }
}
