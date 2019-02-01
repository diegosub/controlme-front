import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaAgendamentoSaveComponent } from './despesa-agendamento-save.component';

describe('DespesaAgendamentoSaveComponent', () => {
  let component: DespesaAgendamentoSaveComponent;
  let fixture: ComponentFixture<DespesaAgendamentoSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaAgendamentoSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaAgendamentoSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
