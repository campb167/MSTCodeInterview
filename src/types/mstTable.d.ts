interface MstDataGridProps {
    gridRows: MstGridRowsDataType[];
    gridCols: MstGridColsDataType[];
    gridTitle?: string;
    gridMessageLabels?: MstGridMessageLabelsType;
    gripOptions?: {
        includeRowIndex?: boolean;
        includePagination?: boolean;
        includeFiltering?: boolean;
        hideHeader?: boolean;
        hideFooter?: boolean;
    };
    sorting?: {
        order?: 'asc' | 'desc';
        orderBy: string;
    };
    filtering?: {
        filterField: string;
    };
    pagination?: {
        limit: number;
        page: number;
        rowCount: number;
        rowsPerPageOptions: number[];
        rowsPerPage: number;
    }
    gridCallbacks?: {
        onRequestSort?: (event: any, field: any) => void; //change to SortTypes
        onRequestFilter?: (event: any, filter: any) => void; //change to FilterTypes
        onResetFilter?: (event: any) => void;
        onPageChange?: (event: any, page: number) => void;
        onRowsPerPageChange?: (event: any, limit: number) => void;
    }
}

interface MstGridRowsDataType {
    [key: string]: any;
}

interface MstGridColsDataType {
    field: string;
    title?: string;
    width?: number;
    isSortable?: boolean;
    beingSorted?: boolean;
    sortDir?: 'asc' | 'desc' | null
}

interface MstGridMessageLabelsType {
    noDataMessage?: string;
    fetchErrorMessage?: string;
}

interface MstDataGridParams {
    //pagination
    limit: number;
    skip: number;
    // sorting
    sortField: string;
    sortDirection: 'asc' | 'desc' | undefined;
    //filtering
    filterField: string;
    filterValue: string;
    filterType: string;
}