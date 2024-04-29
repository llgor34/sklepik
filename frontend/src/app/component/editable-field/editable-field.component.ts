import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { first } from 'rxjs';

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

    @ViewChildren('input', { read: ElementRef }) inputElementQueryList!: QueryList<ElementRef<HTMLInputElement>>;
    @ViewChildren('select', { read: ElementRef }) selectElementQueryList!: QueryList<ElementRef<HTMLSelectElement>>;

    onNewValueConfirm() {
        if (this.newValue !== this.originalValue) {
            this.valueChange.emit(this.newValue);
        }
        this.toggleEditMode();
        this.resetNewValue();
    }

    onNewValueReset() {
        this.toggleEditMode();
        this.resetNewValue();
    }

    toggleEditMode() {
        this.isInEditMode = !this.isInEditMode;
        if (this.isInEditMode) {
            this.toggleElementFocus();
        }
    }

    toggleElementFocus() {
        if (this.isInListMode) {
            this.selectElementQueryList.changes
                .pipe(first())
                .subscribe((elements: QueryList<ElementRef<HTMLSelectElement>>) => this.focusElement(elements.first));
        } else {
            this.inputElementQueryList.changes
                .pipe(first())
                .subscribe((elements: QueryList<ElementRef<HTMLInputElement>>) => this.focusElement(elements.first));
        }
    }

    focusElement(element: ElementRef<HTMLSelectElement | HTMLInputElement>) {
        element.nativeElement.focus();
    }

    resetNewValue() {
        this.newValue = this.originalValue;
    }
}
