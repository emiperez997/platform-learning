import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StatusDirective } from '../../../../../shared/directives/status.directive';
import { FullNamePipe } from '../../../../../shared/pipes/full-name.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import {
  Course,
  courseColumns,
} from '../../../../../core/services/courses/models/Course';
import { CoursesService } from '../../../../../core/services/courses/courses.service';

import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
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
    NgxSkeletonLoaderModule,
    RouterLink,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() createButton: boolean = true;
  isLoading = true;
  firstLoading = true;

  displayedColumns: string[] = courseColumns;
  dataSource!: MatTableDataSource<Course>;
  skeletonRows: any[] = Array(5).fill({});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private courseService: CoursesService,
    private dialog: MatDialog,
  ) {}

  loadStudents() {
    this.courseService.getCourses().subscribe((courses) => {
      this.dataSource = new MatTableDataSource(courses);
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
        next: (course) => {
          if (!!course) {
            this.isLoading = true;
            this.courseService.addCourse(course).subscribe({
              next: (courses) => {
                this.dataSource.data = [...courses];
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
  }

  editCourse(course: Course) {
    this.dialog
      .open(FormDialogComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (course) => {
          if (!!course) {
            this.isLoading = true;
            this.courseService.updateCourse(course).subscribe({
              next: (courses) => {
                this.dataSource.data = [...courses];
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
  }

  deleteCourse(id: number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmar Eliminación',
          message: '¿Está seguro de eliminar este curso?',
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.isLoading = true;
            this.courseService.deleteCourse(id).subscribe({
              next: (courses) => {
                this.dataSource.data = [...courses];
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
