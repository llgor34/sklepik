import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getShortDate() {
    return moment().format('YY-MM-DD');
  }

  getDate() {
    return moment().format('DD.MM.YY');
  }
}
