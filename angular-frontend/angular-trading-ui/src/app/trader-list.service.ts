import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap, catchError } from 'rxjs';

import { Trader } from './trader';
import { TraderApi } from './trader-api';

@Injectable({
  providedIn: 'root'
})
export class TraderListService {

  private tradersUrl = 'https://jarvis-express-trading-app.herokuapp.com/api/traders';

  traderList: Trader[] = [];

  constructor( private http: HttpClient ) { }

  getDataSource(): Observable<Trader[]> {
    return this.http.get<TraderApi[]>(this.tradersUrl).pipe(
      map(traders => traders.map(this.mapToTrader)), 
      tap(traders => this.traderList = traders));
  }

  getColumns(): string[] {
    return ['First Name', 'Last Name', 'Email', 'DateOfBirth', 'Country', 'Actions'];
  }

  addTrader(trader: Trader): Observable<Trader> {
    console.log(this.mapToNoIdTraderApi(trader));
    return this.http.post<TraderApi>(this.tradersUrl, this.mapToNoIdTraderApi(trader)).pipe(
      map(this.mapToTrader),
      tap(trader => this.traderList.push(trader)),
      catchError(error => {
        console.error(error);
        return of();
      })
    );
  }

  deleteTrader(id: number): Observable<any> {
    const deleteUrl = `${this.tradersUrl}/${id}`;
    return this.http.delete<TraderApi>(deleteUrl).pipe(
      tap(() => this.traderList.splice(this.traderList.findIndex(trader => trader.id === id), 1)),
      catchError(error => {
        console.error(error);
        return of();
      })
    )
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

  editTrader(id: number, firstName: string, lastName: string, email: string): void {
    const index = this.traderList.findIndex((trader) => trader.id === id);
    this.traderList[index].firstName = firstName;
    this.traderList[index].lastName = lastName;
    this.traderList[index].email = email;
  }

  mapToTrader(trader: TraderApi): Trader {
    return Object.assign({
      key: trader.id.toString(),
      amount: 0,
      actions: ''
    }, trader);
  }

  mapToNoIdTraderApi(trader: Trader): TraderApi {
    return (({firstName, lastName, email, dob, country}) => ({firstName, lastName, email, dob, country}))(trader) as TraderApi;
  }
}
