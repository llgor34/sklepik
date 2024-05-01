import { Component, EventEmitter, Output } from '@angular/core';
import { ProductRecord } from 'src/app/interfaces/product-record.interface';
import { ProductType } from 'src/app/interfaces/product-type.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent {
    records: ProductRecord[] = [];

    @Output() productCreate = new EventEmitter<Product>();

    constructor(private productsService: ProductsService) {}

    addRecord() {
        this.records.push(new ProductRecord());
    }

    protected onAddRecord(record: ProductRecord, idx: number) {
        this.productCreate.emit({ ...record, price: +record.price! } as Product);
        this.onDeleteRecord(idx);
    }

    protected onDeleteRecord(idx: number) {
        this.records.splice(idx, 1);
    }

    protected getProductTypeList(): ProductType[] {
        return this.productsService.getProductTypeList();
    }
}
