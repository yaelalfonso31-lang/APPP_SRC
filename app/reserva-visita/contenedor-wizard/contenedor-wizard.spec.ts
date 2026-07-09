import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorWizard } from './contenedor-wizard';

describe('ContenedorWizard', () => {
  let component: ContenedorWizard;
  let fixture: ComponentFixture<ContenedorWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorWizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
