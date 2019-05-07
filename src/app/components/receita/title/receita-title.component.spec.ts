import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaTitleComponent } from './receita-title.component';

describe('ReceitaTitleComponent', () => {
  let component: ReceitaTitleComponent;
  let fixture: ComponentFixture<ReceitaTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitaTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
