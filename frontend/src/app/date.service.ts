import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getShortDate() {
    return moment().format('DD-MM-YY');
  }

  getFullDate() {
    return moment().format('DD-MM-YYYY');
  }
}
