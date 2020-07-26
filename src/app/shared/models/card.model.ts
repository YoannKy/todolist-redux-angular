export interface Card {
  arrhythmias: string[];
  created_date: string;
  id: number;
  patient_name: string;
  status: status;
  found?: boolean;
  expanded?: boolean;
}

export enum status {
  pending = 'PENDING',
  done = 'DONE',
  rejected = 'REJECTED',
}
