import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Trader } from './trader';

@Injectable({
  providedIn: 'root'
})
export class TraderListService {

  traderList: Trader[] = [
    {
      key: '1', id: 1, firstName: 'Mike', lastName: 'Spencer', dob: new Date().toLocaleDateString(),
      country: 'Canada', email: 'mike@test.com', amount: 0,
      actions: `<button (click)="deleteTrader">Delete Trader</button>`
    },
    {
      key: '2', id: 2, firstName: 'Hellen', lastName: 'Miller', dob: new Date().toLocaleDateString(),
      country: 'Austria', email: 'hellen@test.com', amount: 0,
      actions: `<button (click)="deleteTrader">Delete Trader</button>`
    },
  ]

  constructor() { }

  getDataSource(): Observable<Trader[]> {
    return of(this.traderList);
  }

  getColumns(): string[] {
    return ['First Name', 'Last Name', 'Email', 'DateOfBirth', 'Country', 'Actions'];
  }

  addTrader(trader: Trader) {
    this.traderList.push(trader);
  }

  deleteTrader(id: number): void {
    this.traderList.splice(this.traderList.findIndex(trader => trader.id === id), 1);
  }
}
