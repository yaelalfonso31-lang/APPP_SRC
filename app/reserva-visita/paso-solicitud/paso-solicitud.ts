import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormularioVisitaService } from '../servicios/formulario-visita.service';

@Component({
  selector: 'app-paso-solicitud',
  templateUrl: './paso-solicitud.component.html',
  styleUrls: ['./paso-solicitud.component.css']
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
      this.form.get('num_grupos')?.valueChanges.subscribe(() => this.calcularTotales());
      this.form.get('estudiantes_grupo')?.valueChanges.subscribe(() => this.calcularTotales());
      this.form.get('num_padres')?.valueChanges.subscribe(() => this.calcularTotales());
      this.form.get('servicio')?.valueChanges.subscribe(() => this.calcularTotales());
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
      this.form.patchValue({
        total_estudiantes: totales.totalEstudiantes,
        monto_total: totales.montoTotal,
        monto_anticipo: totales.montoAnticipo
      });
    }
  }

  getPrecioServicio(): number {
    const servicio = this.form?.get('servicio')?.value;
    const precios: { [key: string]: number } = {
      visita_guiada: 30,
      visita_tematica: 99,
      conociendo_medio_ambiente: 125,
      crea_herbario: 125,
      fosiles_plantas: 99,
      detective_botanico: 99,
      horticultura: 125,
      insectos: 99,
      lombricomposta: 125,
      terrarios: 145,
      colecta_plantas: 190,
      plantas_medicinales: 190
    };
    return precios[servicio] || 0;
  }

  // Método para manejar el cambio de servicio
  onServicioChange(event: Event): void {
    this.calcularTotales();
  }
}