import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaIntvComponent } from './conta-intv.component';

describe('ContaIntvComponent', () => {
  let component: ContaIntvComponent;
  let fixture: ComponentFixture<ContaIntvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaIntvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaIntvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
