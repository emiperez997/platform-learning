import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FullNamePipe } from '../../../../../shared/pipes/full-name.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { StatusDirective } from '../../../../../shared/directives/status.directive';

import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { InscriptionsService } from '../../../../../core/services/inscriptions/inscriptions.service';
import {
  Inscription,
  inscriptionColumns,
} from '../../../../../core/services/inscriptions/models/Inscription';
import { FormDialogComponent } from '../form/form.component';

@Component({
  selector: 'app-inscriptions-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FullNamePipe,
    StatusPipe,
    StatusDirective,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [InscriptionsService],
})
export class TableComponent implements OnInit {
  @Input() createButton: boolean = true;
  @Input() courseId?: number;
  isLoading = true;
  firstLoading = true;

  displayedColumns: string[] = inscriptionColumns;
  dataSource!: MatTableDataSource<Inscription>;
  skeletonRows: any[] = Array(5).fill({});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private inscriptionsService: InscriptionsService,
    private dialog: MatDialog,
  ) {}

  loadInscriptions() {
    this.inscriptionsService.getInscriptions().subscribe((inscriptions) => {
      if (this.courseId) {
        inscriptions = inscriptions.filter(
          (inscription) => inscription.courseId === this.courseId,
        );
      }

      this.dataSource = new MatTableDataSource(inscriptions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.firstLoading = false;
    });
  }

  ngOnInit() {
    this.loadInscriptions();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openForm() {
    this.dialog
      .open(FormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (inscription) => {
          if (!!inscription) {
            this.isLoading = true;
            this.inscriptionsService.addInscription(inscription).subscribe({
              next: (inscriptions) => {
                this.dataSource.data = [...inscriptions];
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
  }

  editInscription(inscription: Inscription) {
    this.dialog
      .open(FormDialogComponent, {
        data: inscription,
      })
      .afterClosed()
      .subscribe({
        next: (inscription) => {
          if (!!inscription) {
            this.isLoading = true;
            this.inscriptionsService.updateInscription(inscription).subscribe({
              next: (inscriptions) => {
                this.dataSource.data = [...inscriptions];
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
  }

  deleteInscription(id: number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmar Eliminación',
          message: '¿Está seguro de eliminar este alumno?',
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.isLoading = true;
            this.inscriptionsService.deleteInscription(id).subscribe({
              next: (inscriptions) => {
                this.dataSource.data = [...inscriptions];
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
  }
}
