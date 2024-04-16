import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-editable-field',
    templateUrl: './editable-field.component.html',
    styleUrls: ['./editable-field.component.css'],
})
export class EditableFieldComponent<T> {
    originalValue!: T;
    newValue!: T;
    isInEditMode = false;

    @Input() isInListMode = false;
    @Input() list!: string[];

    @Input() set value(value: T) {
        this.originalValue = value;
        this.newValue = value;
    }

    @Output() valueChange = new EventEmitter<T>();

    toggleEditMode() {
        this.isInEditMode = !this.isInEditMode;
    }

    onNewValueConfirm() {
        this.valueChange.emit(this.newValue);
        this.toggleEditMode();
        this.resetNewValue();
    }

    onNewValueReset() {
        this.toggleEditMode();
        this.resetNewValue();
    }

    resetNewValue() {
        this.newValue = this.originalValue;
    }
}
