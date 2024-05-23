import { Injectable, inject } from '@angular/core';
import { ProductType } from '../interfaces/product-type.interface';
import { EditableItem } from '../interfaces/editable-item.interface';
import { ProductsService } from './products.service';

@Injectable({
    providedIn: 'root',
})
export class ProductEditableService {
    productsService: ProductsService = inject(ProductsService);

    getProductEditableTypeList(): EditableItem<ProductType>[] {
        return this.productsService.getProductTypeList().map((productType, idx) => ({ id: idx, label: productType }));
    }

    getProductEditableTypeById(id: number): ProductType {
        return this.getProductEditableTypeList().filter((productEditableType) => productEditableType.id === id)[0]
            .label;
    }

    getProductEditableTypeByProductType(type: ProductType): EditableItem<ProductType> {
        return this.getProductEditableTypeList().filter((productEditableType) => productEditableType.label === type)[0];
    }
}
