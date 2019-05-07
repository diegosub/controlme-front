import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaAgendamentoComponent } from './receita-agendamento.component';

describe('ReceitaAgendamentoComponent', () => {
  let component: ReceitaAgendamentoComponent;
  let fixture: ComponentFixture<ReceitaAgendamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitaAgendamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
