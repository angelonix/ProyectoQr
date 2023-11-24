import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrosClasesPage } from './registros-clases.page';

describe('RegistrosClasesPage', () => {
  let component: RegistrosClasesPage;
  let fixture: ComponentFixture<RegistrosClasesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrosClasesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrosClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
