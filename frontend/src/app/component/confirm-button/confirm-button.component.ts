import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-confirm-button',
    templateUrl: './confirm-button.component.html',
    styleUrls: ['./confirm-button.component.css'],
})
export class ConfirmButtonComponent {
    @Output() confirm = new EventEmitter<void>();
    isInConfirmMode = false;

    onConfirm() {
        if (!this.isInConfirmMode) {
            this.isInConfirmMode = true;
            return;
        }

        this.isInConfirmMode = false;
        this.confirm.emit();
    }

    onCancel() {
        this.isInConfirmMode = false;
    }
}
