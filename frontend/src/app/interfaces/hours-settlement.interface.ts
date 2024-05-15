import { NumeratedIdx } from './numerated.interface';

export interface HoursSettlement {
    id: number;
    activity_name: string;
    work_date: string;
    name: string;
    surname: string;
    description: string | null;
    amount: number;
}

export type NumeratedHoursSettlement = HoursSettlement & NumeratedIdx;
