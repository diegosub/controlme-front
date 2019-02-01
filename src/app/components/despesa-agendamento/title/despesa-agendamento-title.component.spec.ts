import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaAgendamentoTitleComponent } from './despesa-agendamento-title.component';

describe('DespesaAgendamentoTitleComponent', () => {
  let component: DespesaAgendamentoTitleComponent;
  let fixture: ComponentFixture<DespesaAgendamentoTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaAgendamentoTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaAgendamentoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
