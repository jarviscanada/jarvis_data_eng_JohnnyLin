import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositFundDialogComponent } from './deposit-fund-dialog.component';

describe('DepositFundDialogComponent', () => {
  let component: DepositFundDialogComponent;
  let fixture: ComponentFixture<DepositFundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositFundDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositFundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
