import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { ContenedorWizardComponent } from './reserva-visita/contenedor-wizard/contenedor-wizard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'reserva-visita', component: ContenedorWizardComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }