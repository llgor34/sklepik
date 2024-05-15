import { Response } from './response.interface';

export interface ActivityResponse extends Response {
    activities: Activity[];
}

export interface Activity {
    id: number;
    name: string;
}

export interface HoursSettlementForm {
    workerId: number;
    activityId: number;
    amount: number;
    description: string;
    date: string;
}
