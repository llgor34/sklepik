import moment from 'moment';

export function dateToRaportPDFFormat(date) {
    return moment(date).format('DD.MM.YY');
}

export function dateToRaportPreviewDataFormat(date) {
    return moment(date).format('DD.MM.YYYY | hh:mm');
}
