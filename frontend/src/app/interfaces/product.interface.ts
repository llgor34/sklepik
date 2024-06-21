import { Company } from './company.interferface';
import { ProductType } from './product-type.interface';
import { ProductCategoryOption } from './product-category-option.interface';
import { ProductCategorySelectedOption } from './product-category-selected-option.interface';
import { NumeratedIdx } from './numerated.interface';

export class Product {
    constructor(
        public id: number | null = null,
        public type: ProductType | null = null,
        public short_name: string | null = null,
        public full_name: string | null = null,
        public price: number | null = null,
        public code: string | null = null,
        public stock_amount: number = 0,
        public company: Company | null = null,
        public product_category_options: ProductCategoryOption[] | null = null,
        public maxDiscountAmount: number | null = null
    ) {}
}

export type NumeratedByIdxProduct = Product & NumeratedIdx;

export interface NumeratedProduct extends Product {
    amount: number;
    selectedOptions: ProductCategorySelectedOption[];
}
