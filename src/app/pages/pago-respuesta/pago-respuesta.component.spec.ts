import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoRespuestaComponent } from './pago-respuesta.component';

describe('PagoRespuestaComponent', () => {
  let component: PagoRespuestaComponent;
  let fixture: ComponentFixture<PagoRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoRespuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
