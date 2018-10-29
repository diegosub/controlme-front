import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoIntvComponent } from './cartao-intv.component';

describe('CartaoIntvComponent', () => {
  let component: CartaoIntvComponent;
  let fixture: ComponentFixture<CartaoIntvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoIntvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoIntvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
