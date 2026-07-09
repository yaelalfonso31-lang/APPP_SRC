import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PasoSolicitudComponent } from './paso-solicitud/paso-solicitud.component';
import { ContenedorWizardComponent } from './contenedor-wizard/contenedor-wizard.component';

import { PasoPoliticaComponent } from './paso-politica/paso-politica.component';
import { PasoPagoComponent } from './paso-pago/paso-pago.component';
import { PasoComportamientoComponent } from './paso-comportamiento/paso-comportamiento.component';
import { PasoRecomendacionesComponent } from './paso-recomendaciones/paso-recomendaciones.component';

import { FormularioVisitaService } from './servicios/formulario-visita.service';

@NgModule({
  declarations: [
    ContenedorWizardComponent,
    PasoSolicitudComponent,
    PasoPoliticaComponent,
    PasoPagoComponent,
    PasoComportamientoComponent,
    PasoRecomendacionesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [FormularioVisitaService],
  exports: [ContenedorWizardComponent]
})
export class ReservaVisitaModule { }