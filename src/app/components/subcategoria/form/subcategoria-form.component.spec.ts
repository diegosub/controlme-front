import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriaFormComponent } from './subcategoria-form.component';

describe('SubcategoriaFormComponent', () => {
  let component: SubcategoriaFormComponent;
  let fixture: ComponentFixture<SubcategoriaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoriaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
