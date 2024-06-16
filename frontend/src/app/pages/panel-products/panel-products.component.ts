import { Component, ViewChild, inject } from '@angular/core';
import { ProductType } from 'src/app/interfaces/product-type.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { NewProductComponent } from './new-product/new-product.component';
import { PanelComponent } from 'src/app/component/panel/panel.component';
import { EditableItem } from 'src/app/interfaces/editable-item.interface';
import { ProductEditableService } from 'src/app/services/product-editable.service';
import { NewRecordService } from 'src/app/services/new-record.service';
import { PanelService } from 'src/app/services/panel.service';
import { providePanelServiceEndpoint } from 'src/app/constants/endpoint.constant';

@Component({
    selector: 'app-panel-products',
    templateUrl: './panel-products.component.html',
    styleUrls: ['./panel-products.component.css'],
    providers: [NewRecordService, PanelService, providePanelServiceEndpoint('api/product')],
})
export class PanelProductsComponent extends PanelComponent<Product> {
    productEditableService: ProductEditableService = inject(ProductEditableService);
    productEditableTypeList: EditableItem<ProductType>[] = this.productEditableService.getProductEditableTypeList();

    @ViewChild(NewProductComponent, { static: false })
    newProductComponent!: NewProductComponent;

    getProductEditableTypeById(id: number): ProductType {
        return this.productEditableService.getProductEditableTypeById(id);
    }

    getProductEditableTypeByProductType(type: ProductType): EditableItem<ProductType> {
        return this.productEditableService.getProductEditableTypeByProductType(type);
    }

    isNotDiscount(product: Product): boolean {
        return product.type !== 'discount';
    }

    isNotPromotion(product: Product): boolean {
        return product.type !== 'promotion';
    }

    override getEmptyRecord(): Product {
        return new Product();
    }
}
