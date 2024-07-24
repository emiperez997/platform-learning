import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TableComponent } from './components/table/table.component';
import { StudentsService } from '../../../core/services/students/student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
  providers: [StudentsService],
})
export class StudentsComponent {}
