import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainComponent } from './main.component';
import { TitleDirective } from '../../common/directives/title.directive';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ToolbarComponent,
    SidenavComponent,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    TitleDirective,
    StudentsComponent,
    TeachersComponent,
  ],
  exports: [MainComponent],
})
export class MainModule {}
