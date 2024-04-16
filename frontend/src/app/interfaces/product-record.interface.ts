import { ProductType } from './product-type.interface';

export class ProductRecord {
    constructor(
        public id: number | null = null,
        public code: string | null = null,
        public type: ProductType | null = null,
        public short_name: string | null = null,
        public full_name: string | null = null,
        public price: number | null = null
    ) {}
}
