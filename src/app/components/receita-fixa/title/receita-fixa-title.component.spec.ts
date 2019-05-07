import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceitaFixaTitleComponent } from './receita-fixa-title.component';

describe('ReceitaFixaTitleComponent', () => {
  let component: ReceitaFixaTitleComponent;
  let fixture: ComponentFixture<ReceitaFixaTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitaFixaTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaFixaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
