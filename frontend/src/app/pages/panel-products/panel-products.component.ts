import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductType } from 'src/app/interfaces/product-type.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { NewProductComponent } from './new-product/new-product.component';
import { PanelComponent } from 'src/app/component/panel/panel.component';

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

    getProductTypeList(): ProductType[] {
        return this.productsService.getProductTypeList();
    }

    onAddNewEmptyRecord() {
        this.newProductComponent.addRecord();
    }
}
