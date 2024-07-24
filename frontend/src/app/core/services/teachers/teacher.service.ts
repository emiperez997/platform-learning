import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from './models/Teacher';
import { mockTeachers } from './data/mock';
import { config } from '../../../shared/config/constants';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private teachers: Teacher[] = [];

  constructor() {}

  getTeachers(): Observable<Teacher[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/teachers`)
        .then((response) => response.json())
        .then((data) => {
          this.teachers = data;
          observer.next(this.teachers);
          observer.complete();
        });
    });
  }

  getTeacher(id: number): Observable<Teacher> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/teachers/${id}`)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

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
          this.teachers = [...this.teachers, data];
          observer.next(this.teachers);
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
          const index = this.teachers.findIndex((s) => s.id === teacher.id);
          this.teachers[index] = data;
          observer.next(this.teachers);
          observer.complete();
        });
    });
  }

  deleteTeacher(id: number): Observable<Teacher[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/teachers/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.teachers.findIndex((s) => s.id === id);
          this.teachers.splice(index, 1);
          observer.next(this.teachers);
          observer.complete();
        });
    });
  }
}
