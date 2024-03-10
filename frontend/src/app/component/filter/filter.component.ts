import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from 'src/app/interfaces/filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
    @Input() filters!: Filter[];
    @Input() activeFilterIdx!: number;
    @Output() activeFilterIdxChange = new EventEmitter<number>();

    setActiveFilter(idx: number) {
        this.activeFilterIdxChange.emit(idx);
    }
}
