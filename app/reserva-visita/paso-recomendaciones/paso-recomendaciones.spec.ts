import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoRecomendaciones } from './paso-recomendaciones';

describe('PasoRecomendaciones', () => {
  let component: PasoRecomendaciones;
  let fixture: ComponentFixture<PasoRecomendaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoRecomendaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoRecomendaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
