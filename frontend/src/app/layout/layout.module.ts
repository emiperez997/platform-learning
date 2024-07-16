import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TableComponent as StudentsTableComponent } from '../pages/students/table/table.component';
import { TableComponent as TeachersTableComponent } from '../pages/teachers/table/table.component';
import { TitleDirective } from '../common/directives/title.directive';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    ToolbarComponent,
    SidenavComponent,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    TitleDirective,
    StudentsTableComponent,
    TeachersTableComponent,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
