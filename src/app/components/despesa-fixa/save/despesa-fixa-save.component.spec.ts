import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaFixaSaveComponent } from './despesa-fixa-save.component';

describe('DespesaFixaSaveComponent', () => {
  let component: DespesaFixaSaveComponent;
  let fixture: ComponentFixture<DespesaFixaSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaFixaSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaFixaSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
