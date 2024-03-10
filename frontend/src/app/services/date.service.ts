import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class DateService {
    getDate() {
        return moment().format('DD.MM.YY');
    }

    getLongDate() {
        return moment().format('YYYY-MM-DD');
    }

    formateDate(date: string, format: string) {
        return moment(date).format(format);
    }
}
