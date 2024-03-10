export interface Filter {
    label: string;
    filterFn: FilterFn;
}

export type FilterFn = (...args: any[]) => boolean;
