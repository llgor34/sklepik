import { Component, Input } from '@angular/core';
import { EditableItem } from 'src/app/interfaces/editable-item.interface';
import { EditableFieldComponent } from '../editable-field/editable-field.component';

@Component({
    selector: 'app-editable-list-field',
    templateUrl: './editable-list-field.component.html',
    styleUrls: ['./editable-list-field.component.css'],
})
export class EditableListFieldComponent extends EditableFieldComponent<number | null> {
    @Input() list: EditableItem[] | null = [];

    @Input() override set value(value: number | null) {
        this.originalValue = value;
        this.newValue = value;
    }

    override emitNewValue() {
        this.valueChange.emit(this.newValue!);
    }

    override resetNewValue() {
        this.newValue = this.originalValue;
    }

    override isNewValueDifferentThanOriginal(): boolean {
        return !this.isOriginalValueSameAsNewValue();
    }

    isOriginalValueSameAsNewValue(): boolean {
        return this.originalValue === this.newValue;
    }

    getItemById(id: number): EditableItem | null {
        if (!this.list) {
            return null;
        }
        return this.list.filter((item) => item.id === id)[0];
    }

    getItemLabelById(id: number | null): string | null {
        if (!id) {
            return null;
        }
        return this.getItemById(id)?.label ?? null;
    }
}
