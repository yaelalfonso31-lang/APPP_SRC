import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PasoSolicitudComponent } from './paso-solicitud/paso-solicitud';
import { ContenedorWizardComponent } from './contenedor-wizard/contenedor-wizard';

import { PasoPoliticaComponent } from './paso-politica/paso-politica';
import { PasoPagoComponent } from './paso-pago/paso-pago';
import { PasoComportamientoComponent } from './paso-comportamiento/paso-comportamiento';
import { PasoRecomendacionesComponent } from './paso-recomendaciones/paso-recomendaciones';

import { FormularioVisitaService } from './formulario-visita';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ContenedorWizardComponent,
    PasoSolicitudComponent,
    PasoPoliticaComponent,
    PasoPagoComponent,
    PasoComportamientoComponent,
    PasoRecomendacionesComponent
  ],
  providers: [FormularioVisitaService],
  exports: [ContenedorWizardComponent]
})
export class ReservaVisitaModule { }