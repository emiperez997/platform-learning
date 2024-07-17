import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../pages/main/students/services/models/student';
import { Teacher } from '../../pages/main/teachers/services/models/Teacher';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(value: Student | Teacher, ...args: unknown[]): string {
    return `${value.firstName} ${value.lastName}`;
  }
}
