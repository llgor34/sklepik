import { Component, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/raport.interface';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css'],
})
export class CardTableComponent {
  @Input() cards!: Card[];
}
