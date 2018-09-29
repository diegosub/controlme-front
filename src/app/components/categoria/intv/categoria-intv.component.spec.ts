import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaIntvComponent } from './categoria-intv.component';

describe('CategoriaIntvComponent', () => {
  let component: CategoriaIntvComponent;
  let fixture: ComponentFixture<CategoriaIntvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaIntvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaIntvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
