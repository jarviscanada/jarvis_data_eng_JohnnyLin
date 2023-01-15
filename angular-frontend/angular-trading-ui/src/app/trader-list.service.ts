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
      country: 'Canada', email: 'mike@test.com', amount: 100.32,
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

  genId(): number {
    return this.traderList.length > 0 ? Math.max(...this.traderList.map(trader => trader.id)) + 1 : 1;
  }

  addTrader(trader: Trader) {
    let id = this.genId();
    trader.id = id;
    trader.key = id.toString();
    this.traderList.push(trader);
  }

  deleteTrader(id: number): void {
    this.traderList.splice(this.traderList.findIndex(trader => trader.id === id), 1);
  }

  getTrader(id: number): Observable<Trader> {
    return of(this.traderList.find(trader => trader.id === id)!);
  }

  depositAmount(id: number, amount: number): void {
    const index = this.traderList.findIndex(trader => trader.id === id);
    this.traderList[index].amount = Number((this.traderList[index].amount + amount).toFixed(2));
  }
  
  withdrawAmount(id: number, amount: number):void {
    const index = this.traderList.findIndex(trader => trader.id === id);
    const newAmount = Number((this.traderList[index].amount - amount).toFixed(2));
    this.traderList[index].amount = newAmount >= 0 ? newAmount : 0;
  }

  editTrader(id: number, firstName: string, lastName: string, email: string) {
    const index = this.traderList.findIndex((trader) => trader.id === id);
    this.traderList[index].firstName = firstName;
    this.traderList[index].lastName = lastName;
    this.traderList[index].email = email;
  }
}
