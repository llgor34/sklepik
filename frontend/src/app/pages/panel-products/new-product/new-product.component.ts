import { Component, inject } from '@angular/core';
import { NewRecordComponent } from 'src/app/component/new-record/new-record.component';
import { ProductType } from 'src/app/interfaces/product-type.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.css', '../../panel-default/panel-new-record.component.css'],
})
export class NewProductComponent extends NewRecordComponent<Product> {
    productService: ProductsService = inject(ProductsService);

    override addRecord() {
        super.addRecord(new Product());
    }

    protected override onAddConfirmRecord(record: Product, idx: number): void {
        super.onAddConfirmRecord({ ...record, price: +record.price! }, idx);
    }

    protected getProductTypeList(): ProductType[] {
        return this.productService.getProductTypeList();
    }
}
