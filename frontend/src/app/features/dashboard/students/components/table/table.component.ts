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
import { FormDialogComponent } from '../../../../../shared/components/form-dialog/form-dialog.component';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { StudentsService } from '../../../../../core/services/students/student.service';
import {
  Student,
  studentColumns,
} from '../../../../../core/services/students/models/Student';

@Component({
  selector: 'app-students-table',
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
  providers: [StudentsService],
})
export class TableComponent implements OnInit {
  @Input() createButton: boolean = true;
  isLoading = true;
  firstLoading = true;

  displayedColumns: string[] = studentColumns;
  dataSource!: MatTableDataSource<Student>;
  skeletonRows: any[] = Array(5).fill({});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private studentService: StudentsService,
    private dialog: MatDialog,
  ) {}

  loadStudents() {
    this.studentService.getStudents().subscribe((students) => {
      this.dataSource = new MatTableDataSource(students);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.firstLoading = false;
    });
  }

  ngOnInit() {
    this.loadStudents();
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
        next: (student) => {
          if (!!student) {
            this.isLoading = true;
            this.studentService.addStudent(student).subscribe({
              next: (students) => {
                this.dataSource.data = [...students];
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
  }

  editStudent(student: Student) {
    this.dialog
      .open(FormDialogComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (student) => {
          if (!!student) {
            this.isLoading = true;
            this.studentService.updateStudent(student).subscribe({
              next: (students) => {
                this.dataSource.data = [...students];
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
  }

  deleteStudent(id: number) {
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
            this.studentService.deleteStudent(id).subscribe({
              next: (students) => {
                this.dataSource.data = [...students];
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
