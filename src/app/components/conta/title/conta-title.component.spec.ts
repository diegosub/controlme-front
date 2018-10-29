import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaTitleComponent } from './conta-title.component';

describe('ContaTitleComponent', () => {
  let component: ContaTitleComponent;
  let fixture: ComponentFixture<ContaTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
