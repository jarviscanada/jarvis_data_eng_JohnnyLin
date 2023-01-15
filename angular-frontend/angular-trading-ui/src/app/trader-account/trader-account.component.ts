import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Trader } from '../trader';
import { TraderListService } from '../trader-list.service';
import { DepositFundDialogComponent } from '../deposit-fund-dialog/deposit-fund-dialog.component';
import { WithdrawFundDialogComponent } from '../withdraw-fund-dialog/withdraw-fund-dialog.component';

@Component({
  selector: 'app-trader-account',
  templateUrl: './trader-account.component.html',
  styleUrls: ['./trader-account.component.css']
})
export class TraderAccountComponent implements OnInit {

  trader: Trader = {} as Trader;

  constructor( 
    private traderListService: TraderListService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTrader();
  }

  getTrader(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.traderListService.getTrader(id).subscribe(trader => this.trader = trader);
  }

  openDepositDialog(): void {
    const dialogRef = this.dialog.open(DepositFundDialogComponent);
    dialogRef.afterClosed().subscribe(amount => {
      if(amount) {
        this.depositFunds(Number(amount));
      }
    });
  }

  openWithdrawDialog(): void {
    const dialogRef = this.dialog.open(WithdrawFundDialogComponent);
    dialogRef.afterClosed().subscribe(amount =>  {
      if(amount) {
        this.withdrawFunds(Number(amount));
      }
    });
  }

  depositFunds(amount: number): void {
    this.traderListService.depositAmount(this.trader.id, amount);
  }

  withdrawFunds(amount: number): void {
    this.traderListService.withdrawAmount(this.trader.id, amount);
  }
}
