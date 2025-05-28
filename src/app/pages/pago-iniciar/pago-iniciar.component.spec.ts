import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoIniciarComponent } from './pago-iniciar.component';

describe('PagoIniciarComponent', () => {
  let component: PagoIniciarComponent;
  let fixture: ComponentFixture<PagoIniciarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoIniciarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoIniciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
