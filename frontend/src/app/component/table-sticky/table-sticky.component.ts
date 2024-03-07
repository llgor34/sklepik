import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-table-sticky',
    templateUrl: './table-sticky.component.html',
    styleUrls: ['./table-sticky.component.css'],
})
export class TableStickyComponent {
    @Input() records!: any[];
    @Input() tableContentTemplate!: TemplateRef<any>;
}
