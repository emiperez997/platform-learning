import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { formGroup } from './validation';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../../../../core/services/courses/models/Course';
import { TeachersService } from '../../../../../core/services/teachers/teacher.service';
import { Teacher } from '../../../../../core/services/teachers/models/Teacher';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
  providers: [provideNativeDateAdapter(), TeachersService],
})
export class FormDialogComponent implements OnInit {
  createForm: FormGroup;
  isEditing: boolean = false;
  teachers: Teacher[] = [];
  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeachersService,
    private matDialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingCourse?: Course,
  ) {
    this.createForm = this.fb.group(formGroup);

    if (this.editingCourse) {
      this.isEditing = true;
      this.createForm.patchValue(this.editingCourse);
    }
  }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    console.log(this.createForm);

    console.log(this.createForm.errors);

    if (!this.createForm.invalid) {
      this.matDialogRef.close(this.createForm.value);
    }
  }

  inputValid(inputName: 'title' | 'description' | 'beginDate' | 'endDate') {
    return (
      this.createForm.get(inputName)?.valid &&
      this.createForm.get(inputName)?.touched
    );
  }

  inputInvalid(inputName: 'title' | 'description' | 'beginDate' | 'endDate') {
    return (
      this.createForm.get(inputName)?.invalid &&
      this.createForm.get(inputName)?.touched &&
      this.createForm.get(inputName)?.dirty
    );
  }

  getError(inputName: 'title' | 'description' | 'beginDate' | 'endDate') {
    if (!this.createForm.get(inputName)?.errors) {
      return null;
    }

    const errors = Object.keys(
      this.createForm.get(inputName)?.errors as string[],
    );

    if (errors.length === 0) {
      return null;
    }

    let message = '';

    errors.forEach((error) => {
      switch (error) {
        case 'required':
          message += 'Este campo es requerido';
          break;
        case 'minlength':
          message += 'Este campo debe tener al menos 3 caracteres';
          break;

        default:
          break;
      }
    });

    return message;
  }
}
