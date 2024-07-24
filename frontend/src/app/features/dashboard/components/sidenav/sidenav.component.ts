import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';
import { ListItem } from './models/ListItem';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  listItems: ListItem[] = [
    {
      name: 'Inicio',
      icon: 'home',
      url: '/dashboard',
    },
    {
      name: 'Cursos',
      icon: 'school',
      url: 'courses',
    },
    {
      name: 'Alumnos',
      icon: 'people',
      url: 'students',
    },
    {
      name: 'Inscripciones',
      icon: 'add',
      url: 'inscriptions',
    },
    {
      name: 'Profesores',
      icon: 'person',
      url: 'teachers',
    },
  ];
}
