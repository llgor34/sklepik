import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from 'src/app/interfaces/filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
    @Input() filters!: Filter[];
    @Input() activeFilter!: string;
    @Output() activeFilterChange = new EventEmitter<string>();

    setActiveFilter(value: string) {
        this.activeFilterChange.emit(value);
    }
}
