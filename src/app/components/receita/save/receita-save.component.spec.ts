import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaSaveComponent } from './receita-save.component';

describe('DespesaSaveComponent', () => {
  let component: ReceitaSaveComponent;
  let fixture: ComponentFixture<ReceitaSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitaSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
