import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { StudentsService } from './services/students.service';

import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
  providers: [StudentsService],
})
export class StudentsComponent {}
