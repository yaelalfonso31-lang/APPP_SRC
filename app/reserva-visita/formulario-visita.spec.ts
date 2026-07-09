import { TestBed } from '@angular/core/testing';

import { FormularioVisita } from './formulario-visita';

describe('FormularioVisita', () => {
  let service: FormularioVisita;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioVisita);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
