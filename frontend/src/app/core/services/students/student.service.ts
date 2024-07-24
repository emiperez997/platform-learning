import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mockStudents } from './data/mock';
import { Student } from './models/Student';
import { config } from '../../../shared/config/constants';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private students: Student[] = [];

  constructor() {}

  getStudents(): Observable<Student[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/students`)
        .then((response) => response.json())
        .then((data) => {
          this.students = data;
          observer.next(this.students);
          observer.complete();
        });
    });
  }

  addStudent(student: Student): Observable<Student[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      })
        .then((response) => response.json())
        .then((data) => {
          this.students = [...this.students, data];
          observer.next(this.students);
          observer.complete();
        });
    });
  }

  updateStudent(student: Student): Observable<Student[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/students/${student.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.students.findIndex((s) => s.id === student.id);
          this.students[index] = data;
          observer.next(this.students);
          observer.complete();
        });
    });
  }

  deleteStudent(id: number): Observable<Student[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/students/${id}`, {
        method: 'DELETE',
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
