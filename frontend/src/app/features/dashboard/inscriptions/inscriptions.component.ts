import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { FormDialogComponent } from './components/form/form.component';

@Component({
  selector: 'app-inscriptions',
  standalone: true,
  imports: [TableComponent, FormDialogComponent],
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss',
})
export class InscriptionsComponent {}
