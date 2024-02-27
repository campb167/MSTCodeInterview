import get from 'lodash/get';

export const filterComparator = <T>(
    data: any,
    filterField: keyof T,
    filterValue: string,
    filterType: string
): boolean => {
    if (filterType === 'textFilter') {
        const filterRegEx = new RegExp(filterValue, 'gi');
        const _data = get(data, filterField) || '';
        console.log(_data.toString().match(filterRegEx) ? true : false);
        return _data.toString().match(filterRegEx) ? true : false;
    }
    // could possibly add date range filters or multiple choice filters here if necessary
    return true;
}

export const chunkToPage = (rows: any[], skip: number, limit: number) => {
    return rows.slice(skip, skip + limit);
}