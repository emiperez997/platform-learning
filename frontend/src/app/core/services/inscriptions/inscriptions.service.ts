import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from './models/Inscription';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/student.service';
import { config } from '../../../shared/config/constants';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  private inscriptions: Inscription[] = [];

  constructor() {}

  getInscriptions() {
    return new Observable<Inscription[]>((subscriber) => {
      fetch(`${config.apiUrl}/inscriptions`)
        .then((response) => response.json())
        .then((data) => {
          this.inscriptions = data;
          subscriber.next(this.inscriptions);
          subscriber.complete();
        });
    });
  }

  addInscription(inscription: Inscription) {
    return new Observable<Inscription[]>((subscriber) => {
      fetch(`${config.apiUrl}/inscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inscription),
      })
        .then((response) => response.json())
        .then((data) => {
          fetch(`${config.apiUrl}/inscriptions`)
            .then((response) => response.json())
            .then((data) => {
              this.inscriptions = [...this.inscriptions, data];
              subscriber.next(this.inscriptions);
              subscriber.complete();
            });
        });
    });
  }

  updateInscription(inscription: Inscription) {
    return new Observable<Inscription[]>((subscriber) => {
      fetch(`${config.apiUrl}/inscriptions/${inscription.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inscription),
      })
        .then((response) => response.json())
        .then((data) => {
          fetch(`${config.apiUrl}/inscriptions`)
            .then((response) => response.json())
            .then((data) => {
              this.inscriptions = [...this.inscriptions, data];
              subscriber.next(this.inscriptions);
              subscriber.complete();
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  deleteInscription(id: number) {
    return new Observable<Inscription[]>((subscriber) => {
      fetch(`${config.apiUrl}/inscriptions/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.inscriptions.findIndex(
            (inscription) => inscription.id === id,
          );
          this.inscriptions.splice(index, 1);
          subscriber.next(this.inscriptions);
          subscriber.complete();
        });
    });
  }
}
