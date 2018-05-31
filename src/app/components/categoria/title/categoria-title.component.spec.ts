import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaTitleComponent } from './categoria-title.component';

describe('CategoriaTitleComponent', () => {
  let component: CategoriaTitleComponent;
  let fixture: ComponentFixture<CategoriaTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
