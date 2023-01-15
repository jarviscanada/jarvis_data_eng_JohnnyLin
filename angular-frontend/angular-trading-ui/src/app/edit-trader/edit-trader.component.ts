import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Trader } from '../trader';
import { TraderListService } from '../trader-list.service';

@Component({
  selector: 'app-edit-trader',
  templateUrl: './edit-trader.component.html',
  styleUrls: ['./edit-trader.component.css']
})
export class EditTraderComponent {

  @Input() trader!: Trader;
  @Input() editModel!: { firstName: string; lastName: string; email: string };
  @Output() toggleEdit = new EventEmitter();

  constructor( private traderListService: TraderListService ) {}

  onEditSubmit(): void {
    this.traderListService.editTrader(this.trader.id, this.editModel.firstName, this.editModel.lastName, this.editModel.email);
    this.toggleEdit.emit();
  }
}
