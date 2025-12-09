export interface Cliente {
  idCliente?: number;
  dni: string;
  nombres: string;
  apellidos: string;
  email?: string;
  telefono?: string;
  fechaNacimiento?: string;
  direccion?: string;
  contactoEmergencia?: string;
  notasMedicas?: string;
  fotoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
