import { Response } from './response.interface';
import { Company } from './company.interferface';

export interface ProductRaw {
  id: number;
  type: string;
  short_name: string;
  full_name: string;
  price: number;
  code: string;
  company: Company;
}

export interface Product extends ProductRaw {
  amount: number;
}

export interface ProductResponse extends Response {
  product: ProductRaw | null;
}
