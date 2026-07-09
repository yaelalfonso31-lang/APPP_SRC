import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormularioVisitaService } from '../servicios/formulario-visita.service';
@Component({
  selector: 'app-contenedor-wizard',
  templateUrl: './contenedor-wizard.html',
  styleUrls: ['./contenedor-wizard.scss']
})
export class ContenedorWizardComponent {
  pasoActual = 1;
  formSolicitud: FormGroup;

  constructor(private formularioService: FormularioVisitaService) {
    this.formSolicitud = this.formularioService.crearFormularioSolicitud();
  }

  cambiarPaso(paso: number): void {
    this.pasoActual = paso;
  }

  pasoAnterior(): void {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  pasoSiguiente(): void {
    if (this.pasoActual < 5) {
      this.pasoActual++;
    }
  }

  get pasos() {
    return [
      { numero: 1, label: 'Solicitud', icon: 'bi-clipboard' },
      { numero: 2, label: 'Política', icon: 'bi-file-earmark-text' },
      { numero: 3, label: 'Pago', icon: 'bi-cash' },
      { numero: 4, label: 'Comportamiento', icon: 'bi-person-check' },
      { numero: 5, label: 'Recomendaciones', icon: 'bi-star' }
    ];
  }

  isPasoCompletado(paso: number): boolean {
    if (paso < this.pasoActual) return true;
    return false;
  }

  isPasoActivo(paso: number): boolean {
    return paso === this.pasoActual;
  }
}