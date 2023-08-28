import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-by-value-field',
  templateUrl: './edit-by-value-field.component.html',
  styleUrls: ['./edit-by-value-field.component.css'],
})
export class EditByValueFieldComponent {
  control = new FormControl(0);

  @Input() btnClass!: string;
  @Input() btnText!: string;

  @Output() btnClick = new EventEmitter<number>();

  onButtonClick() {
    this.btnClick.emit(this.control.value!);
    this.control.reset();
  }
}
