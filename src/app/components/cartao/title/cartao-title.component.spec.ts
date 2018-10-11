import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoTitleComponent } from './cartao-title.component';

describe('CartaoTitleComponent', () => {
  let component: CartaoTitleComponent;
  let fixture: ComponentFixture<CartaoTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
