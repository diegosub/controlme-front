import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaAgendamentoSaveComponent } from './receita-agendamento-save.component';

describe('ReceitaAgendamentoSaveComponent', () => {
  let component: ReceitaAgendamentoSaveComponent;
  let fixture: ComponentFixture<ReceitaAgendamentoSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitaAgendamentoSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaAgendamentoSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
