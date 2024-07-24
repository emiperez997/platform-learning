import { Injectable } from '@angular/core';
import { Course } from './models/Course';
import { mockCourses } from './data/mock';
import { Observable } from 'rxjs';
import { TeachersService } from '../teachers/teacher.service';
import { config } from '../../../shared/config/constants';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [];

  constructor(private teachersService: TeachersService) {}

  getCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/courses`)
        .then((response) => response.json())
        .then((data) => {
          this.courses = data;
          observer.next(this.courses);
          observer.complete();
        });
    });
  }

  getCourse(id: number): Observable<Course | undefined> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/courses/${id}`)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  addCourse(course: Course): Observable<Course[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      })
        .then((response) => response.json())
        .then((data) => {
          this.courses = [...this.courses, data];
          observer.next(this.courses);
          observer.complete();
        });
    });
  }

  updateCourse(course: Course): Observable<Course[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/courses/${course.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.courses.findIndex((c) => c.id === course.id);
          this.courses[index] = data;
          observer.next(this.courses);
          observer.complete();
        });
    });
  }

  deleteCourse(id: number): Observable<Course[]> {
    return new Observable((observer) => {
      fetch(`${config.apiUrl}/courses/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.courses.findIndex((c) => c.id === id);
          this.courses.splice(index, 1);
          observer.next(this.courses);
          observer.complete();
        });
    });
  }
}
