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

    @Input() set value(value: T) {}
    @Output() valueChange = new EventEmitter<NonNullable<T>>();

    onNewValueConfirm(): void {
        if (this.isNewValueDifferentThanOriginal()) {
            this.emitNewValue();
        }
        this.toggleEditMode();
        this.resetNewValue();
    }

    onNewValueReset(): void {
        this.toggleEditMode();
        this.resetNewValue();
    }

    toggleEditMode(): void {
        this.isInEditMode = !this.isInEditMode;
    }

    isNewValueDifferentThanOriginal(): boolean {
        return true;
    }

    emitNewValue(): void {}

    resetNewValue(): void {}
}
