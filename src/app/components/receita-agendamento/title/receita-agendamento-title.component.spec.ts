import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaAgendamentoTitleComponent } from './receita-agendamento-title.component';

describe('ReceitaAgendamentoTitleComponent', () => {
  let component: ReceitaAgendamentoTitleComponent;
  let fixture: ComponentFixture<ReceitaAgendamentoTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitaAgendamentoTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaAgendamentoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
