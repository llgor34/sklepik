import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ProductType } from 'src/app/interfaces/product-type.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { NewProductComponent } from './new-product/new-product.component';
import { PanelComponent } from 'src/app/component/panel/panel.component';
import { EditableItem } from 'src/app/interfaces/editable-item.interface';
import { ProductEditableService } from 'src/app/services/product-editable.service';
import { NewRecordService } from 'src/app/services/new-record.service';

@Component({
    selector: 'app-panel-products',
    templateUrl: './panel-products.component.html',
    styleUrls: ['./panel-products.component.css'],
    providers: [NewRecordService],
})
export class PanelProductsComponent extends PanelComponent<Product> implements OnInit {
    productsService: ProductsService = inject(ProductsService);
    productEditableService: ProductEditableService = inject(ProductEditableService);

    productEditableTypeList: EditableItem<ProductType>[] = this.productEditableService.getProductEditableTypeList();

    @ViewChild(NewProductComponent, { static: false })
    newProductComponent!: NewProductComponent;

    ngOnInit(): void {
        super.initializeComponent(
            this.productsService.getProducts$,
            this.productsService.updateProduct$,
            this.productsService.deleteProduct$,
            this.productsService.createProduct$
        );
    }

    getProductEditableTypeById(id: number): ProductType {
        return this.productEditableService.getProductEditableTypeById(id);
    }

    getProductEditableTypeByProductType(type: ProductType): EditableItem<ProductType> {
        return this.productEditableService.getProductEditableTypeByProductType(type);
    }

    override getEmptyRecord(): Product {
        return new Product();
    }
}
