import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaFixaComponent } from "./receita-fixa.component";

describe('ReceitaFixaComponent', () => {
  let component: ReceitaFixaComponent;
  let fixture: ComponentFixture<ReceitaFixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitaFixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
