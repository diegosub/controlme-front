import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaTitleComponent } from './transferencia-title.component';

describe('TransferenciaTitleComponent', () => {
  let component: TransferenciaTitleComponent;
  let fixture: ComponentFixture<TransferenciaTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenciaTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
