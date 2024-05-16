import { NumeratedIdx } from './numerated.interface';

export class HoursSettlement {
    constructor(
        public id: number | null = null,
        public activity_name: string | null = null,
        public activity_id: number | null = null,
        public work_date: string | null = null,
        public worker_name: string | null = null,
        public worker_surname: string | null = null,
        public worker_id: number | null = null,
        public description: string | null = null,
        public amount: number | null = null
    ) {}
}

export type NumeratedHoursSettlement = HoursSettlement & NumeratedIdx;
