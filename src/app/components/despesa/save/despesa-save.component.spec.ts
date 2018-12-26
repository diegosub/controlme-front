import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaSaveComponent } from './despesa-save.component';

describe('DespesaSaveComponent', () => {
  let component: DespesaSaveComponent;
  let fixture: ComponentFixture<DespesaSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
