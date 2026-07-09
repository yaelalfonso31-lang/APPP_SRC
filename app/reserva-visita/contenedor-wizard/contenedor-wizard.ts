import { Component } from '@angular/core';
// 1. Importar el módulo de formularios reactivos
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormularioVisitaService } from '../formulario-visita';

// 2. Importar TODOS los componentes hijos
import { PasoSolicitudComponent } from '../paso-solicitud/paso-solicitud';
import { PasoPoliticaComponent } from '../paso-politica/paso-politica';
import { PasoPagoComponent } from '../paso-pago/paso-pago';
import { PasoComportamientoComponent } from '../paso-comportamiento/paso-comportamiento';
import { PasoRecomendacionesComponent } from '../paso-recomendaciones/paso-recomendaciones';

@Component({
  selector: 'app-contenedor-wizard',
  standalone: true, // Confirma que tu componente es Standalone
  imports: [
    // 3. Agregar los módulos y componentes aquí para que el HTML los reconozca
    ReactiveFormsModule,
    PasoSolicitudComponent,
    PasoPoliticaComponent,
    PasoPagoComponent,
    PasoComportamientoComponent,
    PasoRecomendacionesComponent
  ],
  templateUrl: './contenedor-wizard.html',
  styleUrls: ['./contenedor-wizard.scss'] // O .css dependiendo de tu configuración
})

export class ContenedorWizardComponent {
  pasoActual = 1;
  formSolicitud: FormGroup;

  constructor(private formularioService: FormularioVisitaService) {
    if ('crearFormularioSolicitud' in this.formularioService &&
      typeof (this.formularioService as any).crearFormularioSolicitud === 'function') {
      this.formSolicitud = (this.formularioService as any).crearFormularioSolicitud();
    } else {
      this.formSolicitud = new FormGroup({});
    }
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