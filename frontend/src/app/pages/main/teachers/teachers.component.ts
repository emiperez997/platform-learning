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
import { FormDialogComponent } from '../../../common/components/form-dialog/form-dialog.component';

import { StatusPipe } from '../../../common/pipes/status-pipe';
import { StatusDirective } from '../../../common/directives/status.directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ConfirmDialogComponent } from '../../../common/components/confirm-dialog/confirm-dialog.component';

import { FullNamePipe } from '../../../common/pipes/full-name.pipe';
import { TeachersService } from './services/teacher.service';
import { Teacher, teacherColumns } from './services/models/Teacher';

@Component({
  selector: 'app-teachers',
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
    StatusPipe,
    StatusDirective,
    FullNamePipe,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  providers: [TeachersService],
})
export class TeachersComponent implements OnInit {
  @Input() createButton: boolean = true;
  isLoading = true;
  firstLoading = true;

  displayedColumns: string[] = teacherColumns;
  dataSource!: MatTableDataSource<Teacher>;
  skeletonRows: any[] = Array(5).fill({});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private teacherService: TeachersService,
    private dialog: MatDialog,
  ) {}

  loadStudents() {
    this.teacherService.getTeachers().subscribe((teachers) => {
      this.dataSource = new MatTableDataSource(teachers);
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
        next: (teacher) => {
          if (!!teacher) {
            this.isLoading = true;
            this.teacherService.addTeacher(teacher).subscribe({
              next: (teachers) => {
                this.dataSource.data = [...teachers];
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
  }

  editTeacher(teacher: Teacher) {
    this.dialog
      .open(FormDialogComponent, {
        data: teacher,
      })
      .afterClosed()
      .subscribe({
        next: (teacher) => {
          if (!!teacher) {
            this.isLoading = true;
            this.teacherService.updateTeacher(teacher).subscribe({
              next: (teachers) => {
                this.dataSource.data = [...teachers];
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
  }

  deleteTeacher(id: number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmación',
          message: '¿Estás seguro de que quieres eliminar este alumno?',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.isLoading = true;
          this.teacherService.deleteTeacher(id).subscribe({
            next: (teachers) => {
              this.dataSource.data = [...teachers];
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        }
      });
  }
}
