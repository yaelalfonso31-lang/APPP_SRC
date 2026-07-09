import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoComportamiento } from './paso-comportamiento';

describe('PasoComportamiento', () => {
  let component: PasoComportamiento;
  let fixture: ComponentFixture<PasoComportamiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoComportamiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoComportamiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
