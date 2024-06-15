import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-sticky-table',
    templateUrl: './sticky-table.component.html',
    styleUrls: ['./sticky-table.component.css'],
})
export class StickyTableComponent {
    @Input() tableHeadTemplate: TemplateRef<any> | null = null;
}
