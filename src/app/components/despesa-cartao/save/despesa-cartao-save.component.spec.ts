import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaCartaoSaveComponent } from './despesa-cartao-save.component';

describe('DespesaCartaoSaveComponent', () => {
  let component: DespesaCartaoSaveComponent;
  let fixture: ComponentFixture<DespesaCartaoSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaCartaoSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaCartaoSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
