import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from 'src/app/interfaces/filter.interface';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
    @Input() filters!: Filter[];
    @Input() activeFilterIdx!: number;
    @Output() activeFilterIdxChange = new EventEmitter<number>();

    setActiveFilter(idx: number) {
        this.activeFilterIdxChange.emit(idx);
    }
}
