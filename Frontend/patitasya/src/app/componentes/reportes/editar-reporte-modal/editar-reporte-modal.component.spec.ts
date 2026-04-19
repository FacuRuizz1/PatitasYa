import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReporteModalComponent } from './editar-reporte-modal.component';

describe('EditarReporteModalComponent', () => {
  let component: EditarReporteModalComponent;
  let fixture: ComponentFixture<EditarReporteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarReporteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarReporteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
