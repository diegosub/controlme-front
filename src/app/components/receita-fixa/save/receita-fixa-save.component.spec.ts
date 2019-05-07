import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaFixaSaveComponent } from './receita-fixa-save.component';

describe('ReceitaFixaSaveComponent', () => {
  let component: ReceitaFixaSaveComponent;
  let fixture: ComponentFixture<ReceitaFixaSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitaFixaSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaFixaSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
