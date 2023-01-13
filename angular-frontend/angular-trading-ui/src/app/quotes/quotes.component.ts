import { Component, OnInit } from '@angular/core';

import { Quote } from '../quote';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  quoteList: Quote[] = [];
  tableColumns: string[] = [];

  constructor( private quotesService: QuotesService ) {}

  ngOnInit(): void {
    this.getQuoteList();
    this.getColumns();
  }

  getQuoteList(): void {
    this.quotesService.getDataSource().subscribe(quoteList => this.quoteList = quoteList);
  }

  getColumns(): void {
    this.tableColumns = this.quotesService.getColumns();
  }

}
