import get from 'lodash/get';

export const sortComparator = <Key extends keyof any>(
    order: string,
    orderBy: Key,
): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string}) => number) => {
    return order === 'desc' 
        ? (a, b) => descendingComparator(a, b, orderBy) 
        : (a, b) => -descendingComparator(a, b, orderBy);
};

const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    let _b = get(b, orderBy) || '';
    let _a = get(a, orderBy) || '';

    if (typeof _a === 'string') {
        _a = _a.toLowerCase();
        _b = _b.toLowerCase();
    }
    if (_b < _a) {
        return -1;
    }
    if (_b > _a) {
        return 1;
    }
    return 0;
};

export const stableSort = <T>(array: readonly T[], comparator: (a: T, b: T) => number) => {
    const stabalizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabalizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        };
        return a[1] - b[1];
    })
    return stabalizedThis.map((el) => el[0]);
}