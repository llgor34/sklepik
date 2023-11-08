import { Response } from './response.interface';
import { Company } from './company.interferface';
import { ProductType } from './product-type.interface';

export interface ProductRaw {
  id: number;
  type: ProductType;
  short_name: string;
  full_name: string;
  price: number;
  code: string;
  company: Company;
  maxDiscountAmount?: number;
}

export interface Product extends ProductRaw {
  amount: number;
}

export interface ProductResponse extends Response {
  product: ProductRaw | null;
}
