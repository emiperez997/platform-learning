import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): string {
    switch (value) {
      case 'ACTIVE':
        return 'Activo';
      case 'INACTIVE':
        return 'Inactivo';
      case 'SCHEDULED':
        return 'Programado';
      case 'STARTED':
        return 'Iniciado';
      case 'FINISHED':
        return 'Finalizado';
      case 'PENDING':
        return 'Pendiente';
      case 'REJECTED':
        return 'Rechazado';
      case 'ACCEPTED':
        return 'Aceptado';
      default:
        return 'Desconocido';
    }
  }
}
