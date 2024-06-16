export interface OrderObj {
    orderBy?: string;
    orderType?: OrderType;
}

export type OrderType = 'asc' | 'desc';
