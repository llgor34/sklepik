import { ProductType } from './product-type.interface';
import { Response } from './response.interface';

export interface SellmentCloseDataResponse extends Response {
    data: SellmentCloseRaport;
}

export interface SellmentCloseRaport {
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
