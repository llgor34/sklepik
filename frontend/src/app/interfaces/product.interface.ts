import { Response } from './response.interface';
import { Company } from './company.interferface';
import { ProductType } from './product-type.interface';
import { ProductCategoryOption } from './product-category-option.interface';
import { ProductCategorySelectedOption } from './product-category-selected-option.interface';
import { NumeratedIdx } from './numerated.interface';

export interface Product {
    id: number;
    type: ProductType;
    short_name: string;
    full_name: string;
    price: number;
    code: string;
    company: Company;
    product_category_options: ProductCategoryOption[];
    maxDiscountAmount?: number;
}

export type NumeratedByIdxProduct = Product & NumeratedIdx;

export interface NumeratedProduct extends Product {
    amount: number;
    selectedOptions: ProductCategorySelectedOption[];
}

export interface ProductResponse extends Response {
    product: Product | null;
}

export interface ProductsResponse extends Response {
    products: Product[];
}
