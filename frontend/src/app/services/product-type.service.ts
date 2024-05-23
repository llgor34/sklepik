import { Injectable } from '@angular/core';
import { ProductType } from '../interfaces/product-type.interface';
import { EditableItem } from '../interfaces/editable-item.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductTypeService {
    getProductTypeList(): ProductType[] {
        return ['article', 'product', 'discount', 'promotion'];
    }

    getProductEditableTypeList(): EditableItem<ProductType>[] {
        return this.getProductTypeList().map((productType, idx) => ({ id: idx, label: productType }));
    }

    getProductEditableTypeById(id: number): ProductType {
        return this.getProductEditableTypeList().filter((productEditableType) => productEditableType.id === id)[0]
            .label;
    }

    getProductEditableTypeByProductType(type: ProductType): EditableItem<ProductType> {
        return this.getProductEditableTypeList().filter((productEditableType) => productEditableType.label === type)[0];
    }
}
