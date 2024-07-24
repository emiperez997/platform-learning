import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
})
export class TeachersComponent {}
