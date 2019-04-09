import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DespesaFixaTitleComponent } from './despesa-fixa-title.component';

describe('DespesaFixaTitleComponent', () => {
  let component: DespesaFixaTitleComponent;
  let fixture: ComponentFixture<DespesaFixaTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesaFixaTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaFixaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
