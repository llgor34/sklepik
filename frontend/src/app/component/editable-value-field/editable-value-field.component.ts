import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { EditableFieldComponent } from '../editable-field/editable-field.component';

@Component({
    selector: 'app-editable-value-field',
    templateUrl: './editable-value-field.component.html',
    styleUrls: ['./editable-value-field.component.css'],
})
export class EditableValueFieldComponent<T> extends EditableFieldComponent<T> {
    @ViewChildren('input', { read: ElementRef }) inputElementQueryList!: QueryList<ElementRef<HTMLElement>>;

    @Input() isEncrypted = false;

    @Input() override set value(value: T) {
        this.originalValue = value;
        this.newValue = value;
    }

    override isNewValueDifferentThanOriginal(): boolean {
        return this.newValue !== this.originalValue;
    }

    override emitNewValue() {
        this.valueChange.emit(this.newValue);
    }

    override resetNewValue() {
        this.newValue = this.originalValue;
    }
}
