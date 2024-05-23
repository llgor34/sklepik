import { Component, Input } from '@angular/core';
import { EditableItem } from 'src/app/interfaces/editable-item.interface';
import { EditableFieldComponent } from '../editable-field/editable-field.component';

@Component({
    selector: 'app-editable-list-field',
    templateUrl: './editable-list-field.component.html',
    styleUrls: ['./editable-list-field.component.css'],
})
export class EditableListFieldComponent extends EditableFieldComponent<EditableItem | null> {
    @Input() list: EditableItem[] | null = [];

    @Input() override set value(value: EditableItem | null) {
        if (!value) {
            return;
        }

        if (this.isOriginalValueSameAs(value)) {
            return;
        }

        this.originalValue = value;
        this.newValue = { ...value };
    }

    override emitNewValue() {
        this.valueChange.emit(this.newValue!);
    }

    override resetNewValue() {
        this.newValue = { ...this.originalValue! };
    }

    override isNewValueDifferentThanOriginal(): boolean {
        return this.newValue?.id !== this.originalValue?.id;
    }

    isOriginalValueSameAs(value: EditableItem): boolean {
        return this.originalValue?.id === value.id && this.originalValue.label === value.label;
    }

    onNewValueChange(id: number) {
        const item = this.getItemById(id);
        this.newValue = { ...item };
    }

    getItemById(id: number) {
        return this.list!.filter((item) => item.id === id)[0];
    }
}
