import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoSolicitud } from './paso-solicitud';

describe('PasoSolicitud', () => {
  let component: PasoSolicitud;
  let fixture: ComponentFixture<PasoSolicitud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoSolicitud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoSolicitud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
