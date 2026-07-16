import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// 2. Importar CommonModule para que funcionen los *ngFor y *ngIf del HTML
import { CommonModule } from '@angular/common';
import { FormularioVisitaService } from '../formulario-visita';
@Component({
  selector: 'app-paso-solicitud',
  templateUrl: './paso-solicitud.html',
  styleUrls: ['./paso-solicitud.scss'],
  imports: [
    // 3. Declarar las importaciones aquí
    ReactiveFormsModule,
    CommonModule
  ],
})
export class PasoSolicitudComponent implements OnChanges {
  @Input() form!: FormGroup;

  constructor(private formularioService: FormularioVisitaService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && this.form) {
      // Configurar el servicio de fecha/hora con flatpickr después de que el DOM esté listo
      setTimeout(() => {
        this.inicializarFlatpickr();
      }, 0);

      // Suscribirse a cambios para recalcular totales
      this.form.get('detalles.num_grupos')?.valueChanges.subscribe(() => this.calcularTotales());
      this.form.get('detalles.estudiantes_grupo')?.valueChanges.subscribe(() => this.calcularTotales());
      this.form.get('detalles.num_padres')?.valueChanges.subscribe(() => this.calcularTotales());
      this.form.get('detalles.servicio')?.valueChanges.subscribe(() => this.calcularTotales());
    }
  }

  inicializarFlatpickr(): void {
    // Esta función se ejecutará desde el HTML con (window:load) o usando @ViewChild
    // Alternativa: usar ngAfterViewInit
  }

  getProfesores(): FormArray {
    return this.formularioService.getProfesores(this.form);
  }

  getTelefonos(): FormArray {
    return this.formularioService.getTelefonos(this.form);
  }

  getCorreos(): FormArray {
    return this.formularioService.getCorreos(this.form);
  }

  agregarProfesor(): void {
    this.formularioService.agregarCampo(this.getProfesores());
  }

  agregarTelefono(): void {
    this.formularioService.agregarCampo(this.getTelefonos());
  }

  agregarCorreo(): void {
    this.formularioService.agregarCampo(this.getCorreos());
  }

  eliminarProfesor(index: number): void {
    this.formularioService.eliminarCampo(this.getProfesores(), index);
  }

  eliminarTelefono(index: number): void {
    this.formularioService.eliminarCampo(this.getTelefonos(), index);
  }

  eliminarCorreo(index: number): void {
    this.formularioService.eliminarCampo(this.getCorreos(), index);
  }

  calcularTotales(): void {
    if (this.form) {
      const totales = this.formularioService.calcularTotales(this.form);
      this.form.get('detalles')?.patchValue({
        total_estudiantes: totales.totalEstudiantes,
        monto_total: `$${totales.montoTotal.toFixed(2)} MXN`,
        monto_anticipo: `$${totales.montoAnticipo.toFixed(2)} MXN`
      });
    }
  }

  getPrecioServicio(): number {
    const servicio = this.form?.get('detalles.servicio')?.value;
    const precios = this.formularioService.obtenerPrecios();
    return precios[servicio] || 0;
  }

  // Método para manejar el cambio de servicio
  onServicioChange(event: Event): void {
    this.calcularTotales();
  }
}