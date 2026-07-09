import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'

})
export class FormularioVisitaService {
  // Esta variable almacenará TODO el estado del formulario de los 5 pasos
  public visitaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.visitaForm = this.fb.group({

      // ==========================================
      // SECCIÓN 1: Datos de la Institución
      // ==========================================
      institucion: this.fb.group({
        escuela: ['', Validators.required],
        calle: ['', Validators.required],
        num_ext: ['', Validators.required],
        num_int: [''], // Opcional
        colonia: ['', Validators.required],
        cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
        municipio: ['', Validators.required]
      }),

      // ==========================================
      // SECCIÓN 2: Contacto y Nivel
      // ==========================================
      contacto: this.fb.group({
        // FormArrays para permitir agregar múltiples valores dinámicamente
        profesores: this.fb.array([this.fb.control('', Validators.required)]),
        telefonos: this.fb.array([this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')])]),
        correos: this.fb.array([this.fb.control('', [Validators.required, Validators.email])]),
        nivel: ['', Validators.required],
        grado: ['', Validators.required]
      }),

      // ==========================================
      // SECCIÓN 3: Detalles del Servicio
      // ==========================================
      detalles: this.fb.group({
        servicio: ['', Validators.required],
        fecha: ['', Validators.required],
        hora: ['', Validators.required],
        num_grupos: [1, [Validators.required, Validators.min(1)]],
        estudiantes_grupo: [20, [Validators.required, Validators.min(10), Validators.max(60)]],
        num_maestros: [2, [Validators.required, Validators.min(0)]],
        num_padres: [0, [Validators.required, Validators.min(0)]],
        lunch: ['', Validators.required]
      }),

      // ==========================================
      // SECCIÓN 4: Reporte de Pago (Paso 3 del HTML)
      // ==========================================
      pago: this.fb.group({
        comprobante: [null, Validators.required], // Almacenará el archivo adjunto
        nombre_titular: ['', Validators.required],
        monto_pagar: ['', Validators.required],
        concepto_pago: ['', Validators.required]
      })

      // Nota: Los pasos 2, 4 y 5 de tu HTML son informativos y no requieren validación de campos
    });
  }

  // ==========================================
  // GETTERS Y MÉTODOS PARA CAMPOS DINÁMICOS
  // ==========================================

  // Getters para FormArrays
  getProfesores(form: FormGroup): FormArray {
    return form.get('profesores') as FormArray;
  }

  getTelefonos(form: FormGroup): FormArray {
    return form.get('telefonos') as FormArray;
  }

  getCorreos(form: FormGroup): FormArray {
    return form.get('correos') as FormArray;
  }

  agregarCampo(array: FormArray): void {
    array.push(this.fb.control(''));
  }

  eliminarCampo(array: FormArray, index: number): void {
    if (array.length > 1) {
      array.removeAt(index);
    }
  }

  // Calcular totales
  calcularTotales(form: FormGroup): { totalEstudiantes: number; montoTotal: number; montoAnticipo: number } {
    const numGrupos = form.get('num_grupos')?.value || 1;
    const estudiantesPorGrupo = form.get('estudiantes_grupo')?.value || 0;
    const padres = form.get('num_padres')?.value || 0;
    const totalEstudiantes = (numGrupos * estudiantesPorGrupo) + padres;

    // Obtener precio del servicio seleccionado
    const servicio = form.get('servicio')?.value;
    const precios = this.obtenerPrecios();
    const precioUnitario = precios[servicio] || 0;
    const montoTotal = totalEstudiantes * precioUnitario;

    return {
      totalEstudiantes,
      montoTotal,
      montoAnticipo: montoTotal * 0.5
    };
  }

  private obtenerPrecios(): { [key: string]: number } {
    return {
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
  }
}