import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaCartaoTitleComponent } from './despesa-cartao-title.component';

describe('DespesaCartaoTitleComponent', () => {
  let component: DespesaCartaoTitleComponent;
  let fixture: ComponentFixture<DespesaCartaoTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaCartaoTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaCartaoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
