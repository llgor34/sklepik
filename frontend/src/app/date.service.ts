import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getShortDate() {
    return moment().format('DD-MM-YY');
  }

  getDate() {
    return moment().format('YYYY-MM-DD');
  }

  getDatetime() {
    return moment().format('YYYY-MM-DD HH:mm');
  }
}
