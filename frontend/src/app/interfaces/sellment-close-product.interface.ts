import { ProductType } from './product-type.interface';

export interface SellmentCloseRaport {
    raport: SellmentCloseRaportData;
    raportInfo: SellmentCloseRaportInfo;
}

export interface SellmentCloseRaportData {
    totalPrice: number;
    totalPriceWithDiscounts: number;
    totalCashPrice: number;
    totalNonCashPrice: number;
    products: {
        article: SellmentCloseRaportProductData;
        product: SellmentCloseRaportProductData;
        discount: SellmentCloseRaportProductData;
        promotion: SellmentCloseRaportProductData;
    };
}

export interface SellmentCloseRaportInfo {
    date: string;
    number: number;
    year_number: string;
    id: number;
}

export interface SellmentCloseRaportProductData {
    totalPriceLabel: string;
    totalPrice: number;
    products: SellmentCloseRaportProducts[];
}

export interface SellmentCloseRaportProducts {
    short_name: string;
    type: ProductType;
    code: string;
    amount: number;
    price: number;
    totalPrice: number;
}
