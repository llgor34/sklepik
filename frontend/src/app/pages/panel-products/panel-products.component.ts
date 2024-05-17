import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductType } from 'src/app/interfaces/product-type.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { NewProductComponent } from './new-product/new-product.component';
import { PanelComponent } from 'src/app/component/panel/panel.component';
import { EditableItem } from 'src/app/interfaces/editable-item.interface';

@Component({
    selector: 'app-panel-products',
    templateUrl: './panel-products.component.html',
    styleUrls: ['./panel-products.component.css'],
})
export class PanelProductsComponent extends PanelComponent<Product> implements OnInit {
    @ViewChild(NewProductComponent, { static: false }) newProductComponent!: NewProductComponent;

    constructor(private productsService: ProductsService) {
        super();
    }

    ngOnInit(): void {
        super.initializeComponent(
            this.productsService.getProducts$(),
            this.productsService.updateProduct$,
            this.productsService.deleteProduct$,
            this.productsService.createProduct$
        );
    }

    // TODO: refactor backend, so prouduct.type instead of string, will be {id: number, label: string}
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

    getProductTypeList(): ProductType[] {
        return this.productsService.getProductTypeList();
    }

    // TODO: REFACTOR END

    onAddNewEmptyRecord() {
        this.newProductComponent.addRecord();
    }
}
