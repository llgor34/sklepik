import { NumeratedIdx } from './numerated.interface';

export interface HoursSettlement {
    id: number;
    activity_name: string;
    activity_id: number;
    work_date: string;
    worker_name: string;
    worker_surname: string;
    worker_id: number;
    description: string | null;
    amount: number;
}

export type NumeratedHoursSettlement = HoursSettlement & NumeratedIdx;
