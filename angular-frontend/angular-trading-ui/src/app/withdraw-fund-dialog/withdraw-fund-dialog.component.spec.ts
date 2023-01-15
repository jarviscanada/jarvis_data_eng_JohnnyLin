import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawFundDialogComponent } from './withdraw-fund-dialog.component';

describe('WithdrawFundDialogComponent', () => {
  let component: WithdrawFundDialogComponent;
  let fixture: ComponentFixture<WithdrawFundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawFundDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawFundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
