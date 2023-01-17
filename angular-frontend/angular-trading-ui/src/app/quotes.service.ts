import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Quote } from './quote';
import { QuoteApi } from './quote-api';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private quotesUrl = 'https://jarvis-express-trading-app.herokuapp.com/api/quote/dailyList';

  constructor( private http: HttpClient ) { }

  getDataSource(): Observable<Quote[]> {
    return this.http.get<QuoteApi[]>(this.quotesUrl).pipe(
      map(quotes => quotes.map(this.mapToQuote)));
  }

  getColumns(): string[] {
    return ['Ticker', 'Last Price', 'Bid Price', 'Bid Size', 'Ask Price', 'Ask Size'];
  }

  mapToQuote(quote: QuoteApi): Quote {
    return {
      ticker: quote.ticker,
      lastPrice: quote.last_price,
      bidPrice: quote.bid_price,
      bidSize: quote.bid_size,
      askPrice: quote.ask_price,
      askSize: quote.ask_size
    };
  }
}
