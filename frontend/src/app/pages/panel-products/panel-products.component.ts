import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { ProductType } from 'src/app/interfaces/product-type.interface';
import { NumeratedByIdxProduct, Product } from 'src/app/interfaces/product.interface';
import { TableBodyContext } from 'src/app/interfaces/table-body-context.interface';
import { ProductsService } from 'src/app/services/products.service';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductRecord } from 'src/app/interfaces/product-record.interface';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-panel-products',
    templateUrl: './panel-products.component.html',
    styleUrls: ['./panel-products.component.css'],
})
export class PanelProductsComponent implements OnInit {
    products$!: Observable<Product[]>;
    productContext!: TableBodyContext<NumeratedByIdxProduct[]>;
    refreshProducts$ = new BehaviorSubject(null);

    @ViewChild(NewProductComponent, { static: false }) newProductComponent!: NewProductComponent;

    constructor(private productsService: ProductsService, private toastService: ToastService) {}

    ngOnInit(): void {
        this.products$ = this.refreshProducts$.pipe(
            switchMap(() => this.productsService.getProducts$()),
            shareReplay(1)
        );
    }

    getProductTypeList(): ProductType[] {
        return this.productsService.getProductTypeList();
    }

    onFieldChange(product: NumeratedByIdxProduct, obj: { [key: string]: any }) {
        const key: string = Object.keys(obj)[0];

        this.productsService.updateProduct$(product.id, { [key]: obj[key] }).subscribe(() => {
            (product as any)[key] = obj[key];
            this.showUpdateSuccess(key);
        });
    }

    onDeleteProduct(id: number) {
        this.productsService.deleteProduct$(id).subscribe(() => {
            this.refreshProducts();
            this.showDeleteSuccess(id);
        });
    }

    onCreateProduct(productRecord: ProductRecord) {
        this.productsService.createProduct$(productRecord).subscribe(() => {
            this.refreshProducts();
            this.showCreateSuccess();
        });
    }

    refreshProducts() {
        this.refreshProducts$.next(null);
    }

    onAddNewEmptyRecord() {
        this.newProductComponent.addRecord();
    }

    showUpdateSuccess(propertyName: string) {
        this.toastService.showSuccess(`Pomyślnie zaktualizowano ${propertyName} produktu`);
    }

    showDeleteSuccess(id: number) {
        this.toastService.showSuccess(`Pomyślnie usunięto produkt o id ${id}`);
    }

    showCreateSuccess() {
        this.toastService.showSuccess(`Pomyślnie dodano nowy produkt`);
    }
}
