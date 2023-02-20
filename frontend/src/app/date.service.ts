import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getShortTodayDate() {
    return moment().format('DD.MM.YY');
  }
}
