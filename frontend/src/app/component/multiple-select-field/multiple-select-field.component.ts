import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MultipleSelect } from 'src/app/interfaces/multiple-select.interface';

@Component({
    selector: 'app-multiple-select-field',
    templateUrl: './multiple-select-field.component.html',
    styleUrls: ['./multiple-select-field.component.css'],
})
export class MultipleSelectFieldComponent<T extends MultipleSelect> {
    @Input('value') values!: T[];
    @Input() availableValues!: T[];

    @Input() selectedValuesLabel: string = 'Wybrane elementy';
    @Input() noSelectedValuesLabel: string = 'Brak wybranych elementów';
    @Input() noSearchValuesLabel: string = 'Nie znaleziono';

    @Output() valueChange = new EventEmitter<T[]>();

    searchValue: string = '';
    isDropdownShown: boolean = false;

    @ViewChild('dropdown', { static: false }) dropdownRef!: ElementRef<HTMLUListElement>;

    get filteredAvailableValues() {
        return this.availableValues.filter(
            (availableValue) =>
                availableValue.label.includes(this.searchValue) &&
                !this.values.some((value) => value.label.includes(this.searchValue))
        );
    }

    onAddValue(value: T) {
        this.addValue(value);
        this.resetSearchValue();
        this.hideDropdown();
    }

    onRemoveValue(value: T) {
        this.removeValue(value);
    }

    resetSearchValue() {
        this.searchValue = '';
    }

    addValue(value: T) {
        this.valueChange.emit([...this.values, value]);
    }

    removeValue(value: T) {
        this.valueChange.emit(this.values.filter((availableValue) => availableValue.id != value.id));
    }

    showDropdown() {
        this.isDropdownShown = true;
    }

    hideDropdown() {
        this.isDropdownShown = false;
    }
}
