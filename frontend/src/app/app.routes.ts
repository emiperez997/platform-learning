import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { CoursesComponent } from './features/dashboard/courses/courses.component';
import { StudentsComponent } from './features/dashboard/students/students.component';
import { InscriptionsComponent } from './features/dashboard/inscriptions/inscriptions.component';
import { TeachersComponent } from './features/dashboard/teachers/teachers.component';
import { DetailComponent as CourseDetail } from './features/dashboard/courses/pages/details/detail.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'courses/:id',
        component: CourseDetail,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'inscriptions',
        component: InscriptionsComponent,
      },
      {
        path: 'teachers',
        component: TeachersComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
