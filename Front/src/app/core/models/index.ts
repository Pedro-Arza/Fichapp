export interface Empleado {
  id: string; nombre_completo: string; email: string;
  foto_url?: string; departamento_id?: string; turno_id?: string;
  rol?: string; fecha_ingreso: string;
  estado: 'activo' | 'inactivo' | 'suspendido';
  Departamento?: { nombre: string };
  Turno?: { nombre: string; hora_inicio: string; hora_fin: string };
}
export interface Fichaje {
  id: string; empleado_id: string;
  tipo: 'entrada' | 'salida_comida' | 'vuelta_comida' | 'inicio_descanso' | 'fin_descanso' | 'salida';
  fecha_hora: string; ubicacion?: string; notas?: string;
}
export interface Ausencia {
  id: string; empleado_id: string;
  tipo: 'vacaciones' | 'baja_medica' | 'permiso' | 'ausencia_justificada' | 'ausencia_injustificada' | 'teletrabajo';
  fecha_inicio: string; fecha_fin: string; motivo?: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  notas_aprobacion?: string;
}
export interface LoginResponse { token: string; empleado: Empleado; }
export interface AuthUser {
  id: string; email: string; rol?: string;
  nombre_completo: string; foto_url?: string;
}