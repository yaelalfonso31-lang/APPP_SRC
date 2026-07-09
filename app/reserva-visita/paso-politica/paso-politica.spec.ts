import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoPolitica } from './paso-politica';

describe('PasoPolitica', () => {
  let component: PasoPolitica;
  let fixture: ComponentFixture<PasoPolitica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoPolitica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoPolitica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
