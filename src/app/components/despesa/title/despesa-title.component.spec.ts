import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaTitleComponent } from './despesa-title.component';

describe('DespesaTitleComponent', () => {
  let component: DespesaTitleComponent;
  let fixture: ComponentFixture<DespesaTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
