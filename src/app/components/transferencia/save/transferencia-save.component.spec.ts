import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaSaveComponent } from './transferencia-save.component';

describe('TransferenciaSaveComponent', () => {
  let component: TransferenciaSaveComponent;
  let fixture: ComponentFixture<TransferenciaSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenciaSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
