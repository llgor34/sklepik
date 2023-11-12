import { Response } from './response.interface';

export interface HoursSettlementResponse extends Response {
  hoursSettlement: HoursSettlement[];
}

export interface HoursSettlement {
  id: number;
  activity_name: string;
  work_date: string;
  name: string;
  surname: string;
  description: string | null;
  amount: number;
}
