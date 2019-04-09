import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaFixaComponent } from "./despesa-fixa.component";

describe('DespesaFixaComponent', () => {
  let component: DespesaFixaComponent;
  let fixture: ComponentFixture<DespesaFixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaFixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
