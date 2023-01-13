import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTraderDialogComponent } from './new-trader-dialog.component';

describe('NewTraderDialogComponent', () => {
  let component: NewTraderDialogComponent;
  let fixture: ComponentFixture<NewTraderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTraderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTraderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
