import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent {
    @Input() searchValue!: string;
    @Output() searchValueChange = new EventEmitter<string>();
}
