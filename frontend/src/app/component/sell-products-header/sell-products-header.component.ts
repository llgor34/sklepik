import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-sell-products-header',
    templateUrl: './sell-products-header.component.html',
    styleUrls: ['./sell-products-header.component.css'],
})
export class SellProductsHeaderComponent {
    productCode: number | null = null;

    @Input() isEndSellDisabled: boolean = false;

    @Output() search = new EventEmitter<number>();
    @Output() endSell = new EventEmitter<void>();

    @ViewChild('productCodeControl', { static: true })
    productCodeControl!: ElementRef;

    onSearch(): void {
        if (!this.productCode) return;
        this.search.emit(this.productCode);
        this.resetProductCodeControl();
        this.focusProductCodeControl();
    }

    onEndSell(): void {
        this.endSell.emit();
        this.resetProductCodeControl();
        this.focusProductCodeControl();
    }

    private focusProductCodeControl() {
        this.productCodeControl.nativeElement.focus();
    }

    private resetProductCodeControl() {
        this.productCode = null;
    }
}
