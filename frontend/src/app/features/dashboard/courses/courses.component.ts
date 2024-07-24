import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {}
