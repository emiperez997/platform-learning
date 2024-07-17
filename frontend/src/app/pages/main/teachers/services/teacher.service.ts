import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from './models/Teacher';
import { config } from '../../../../common/config/constants';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private students: Teacher[] = [];

  constructor() {}

  getTeachers(): Observable<Teacher[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/teachers`)
        .then((response) => response.json())
        .then((data) => {
          this.students = data;
          observer.next(this.students);
          observer.complete();
        });
    });
  }

  // getStudents(): Student[] {
  //   return this.students;
  // }

  addTeacher(teacher: Teacher): Observable<Teacher[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/teachers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
      })
        .then((response) => response.json())
        .then((data) => {
          this.students.push(data);
          observer.next(this.students);
          observer.complete();
        });
    });
  }

  updateTeacher(teacher: Teacher): Observable<Teacher[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/teachers/${teacher.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.students.findIndex((s) => s.id === teacher.id);
          this.students[index] = data;
          observer.next(this.students);
          observer.complete();
        });
    });
  }

  deleteTeacher(id: number): Observable<Teacher[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/teachers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.students.findIndex((s) => s.id === id);
          this.students.splice(index, 1);
          observer.next(this.students);
          observer.complete();
        });
    });
  }
}
