import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Card, status } from '@shared/models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  private _cards: Card[] = [
  {
    arrhythmias: [
      'AFib',
      'AV Block',
      'Pause',
      'PSVC',
      'PVC',
    ],
    created_date: '2020-03-10T13:14:59+0000',
    id: 0,
    patient_name: 'Bob',
    status: status.pending,
  },
  {
    arrhythmias: [
      'Pause',
    ],
    created_date: '2020-01-01T00:12:21+0000',
    id: 1,
    patient_name: 'Bill',
    status: status.rejected,
  },
  {
    arrhythmias: [
      'AFib',
      'Pause',
    ],
    created_date: '2019-12-31T00:11:14+0000',
    id: 2,
    patient_name: 'Elsa',
    status: status.done,
  },
  {
    arrhythmias: [
      'PVC',
      'PSVC',
      'AFib',
    ],
    created_date: '2019-01-23T00:18:34+0000',
    id: 3,
    patient_name: 'Flora',
    status: status.rejected,
  },
  {
    arrhythmias: [
      'AV Block',
      'PVC',
    ],
    created_date: '2019-02-21T00:08:58+0000',
    id: 4,
    patient_name: 'Marc',
    status: status.pending,
  },
  {
    arrhythmias: [
      'Pause',
      'PVC',
      'PSVC',
    ],
    created_date: '2019-02-21T00:09:32+0000',
    id: 5,
    patient_name: 'John',
    status: status.pending,
  },
];

  get cards(): Observable<Card[]> {
    return of(this._cards).pipe(delay(3000));
  }
}
