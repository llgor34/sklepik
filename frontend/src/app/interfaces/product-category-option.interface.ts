import { ProductOption } from './product-option.interface';

export interface ProductCategoryOption {
  category_id: number;
  category_name: string;
  options: ProductOption[];
}
