import { Component, ViewChild, OnInit } from '@angular/core';

import { Trader } from '../trader';
import { TraderListService } from '../trader-list.service';
import { MatDialog } from '@angular/material/dialog';
import { NewTraderDialogComponent } from '../new-trader-dialog/new-trader-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-trader-list',
  templateUrl: './trader-list.component.html',
  styleUrls: ['./trader-list.component.css']
})
export class TraderListComponent implements OnInit {

  traderList: Trader[] = [];
  tableColumns: String[] = [];

  @ViewChild('traderTable') traderTable!: MatTable<any>;

  constructor(private traderListService: TraderListService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTraderList();
    this.getColumns();
  }

  getTraderList() {
    this.traderListService.getDataSource().subscribe(traderList => this.traderList = traderList);
  }

  getColumns() {
    this.tableColumns = this.traderListService.getColumns();
  }

  addTrader(trader: Trader): void {
    this.traderListService.addTrader(trader);
    this.traderTable.renderRows();
  }

  deleteTrader(event: Event, id: number): void {
    try {
      this.traderListService.deleteTrader(id);
      this.traderTable.renderRows();
    } catch (err) {
      console.log(err);
    }
  }

  openNewTraderDialog() {
    const dialogRef = this.dialog.open(NewTraderDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addTrader(result);
      };
    });
  }
}