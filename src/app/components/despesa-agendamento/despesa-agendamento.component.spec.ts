import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaAgendamentoComponent } from './despesa-agendamento.component';

describe('DespesaAgendamentoComponent', () => {
  let component: DespesaAgendamentoComponent;
  let fixture: ComponentFixture<DespesaAgendamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaAgendamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
