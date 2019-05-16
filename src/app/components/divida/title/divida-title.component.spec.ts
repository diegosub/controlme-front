import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividaTitleComponent } from './divida-title.component';

describe('DividaTitleComponent', () => {
  let component: DividaTitleComponent;
  let fixture: ComponentFixture<DividaTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividaTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
