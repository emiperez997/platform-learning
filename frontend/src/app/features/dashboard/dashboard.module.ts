import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { TitleDirective } from '../../shared/directives/title.directive';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { TeachersComponent } from './teachers/teachers.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    HomeComponent,
    StudentsComponent,
    TeachersComponent,

    ToolbarComponent,
    SidenavComponent,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,

    TitleDirective,
    RouterOutlet,
  ],
})
export class DashboardModule {}
