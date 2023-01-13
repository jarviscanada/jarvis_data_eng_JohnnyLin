import { Component } from '@angular/core';

import { Trader } from '../trader';

@Component({
  selector: 'app-new-trader-dialog',
  templateUrl: './new-trader-dialog.component.html',
  styleUrls: ['./new-trader-dialog.component.css']
})
export class NewTraderDialogComponent {
 
  trader: Trader = { 
    key: '',
    id: 0,
    firstName: '',
    lastName: '',
    dob: '',
    country: '',
    email: '',
    amount: 0,
    actions: `<button (click)="deleteTrader">Delete Trader</button>`,
  }

  constructor(){ }

  formatDob(): void {
    this.trader.dob = new Date(Date.parse(this.trader.dob)).toLocaleDateString();
  }
}
