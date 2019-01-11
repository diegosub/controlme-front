import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaCartaoComponent } from './despesa-cartao.component';

describe('DespesaCartaoComponent', () => {
  let component: DespesaCartaoComponent;
  let fixture: ComponentFixture<DespesaCartaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaCartaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
