import { MatFormFieldModule } from '@angular/material/form-field';
import { InscriptionsService } from '../../../../../core/services/inscriptions/inscriptions.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentsService } from '../../../../../core/services/students/student.service';
import { CoursesService } from '../../../../../core/services/courses/courses.service';
import { MatSelectModule } from '@angular/material/select';
import { Course } from '../../../../../core/services/courses/models/Course';
import { Student } from '../../../../../core/services/students/models/Student';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Inscription } from '../../../../../core/services/inscriptions/models/Inscription';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-inscriptions-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [InscriptionsService, StudentsService, CoursesService],
})
export class FormDialogComponent implements OnInit {
  createForm: FormGroup;
  courses: Course[] = [];
  students: Student[] = [];
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<FormDialogComponent>,
    private studentService: StudentsService,
    private courseService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public editingInscription?: Inscription,
  ) {
    this.createForm = this.fb.group({
      id: [''],
      courseId: [
        { value: '', disabled: this.editingInscription ? true : false },
        Validators.required,
      ],
      studentId: [
        { value: '', disabled: this.editingInscription ? true : false },
        Validators.required,
      ],
      status: ['PENDING', Validators.required],
    });

    if (this.editingInscription) {
      this.isEditing = true;
      console.log(editingInscription);

      this.createForm.patchValue(this.editingInscription);
      this.courses = [this.editingInscription.course!];
      this.students = [this.editingInscription.student!];
    }
  }

  ngOnInit() {
    if (!this.isEditing) {
      this.courseService.getCourses().subscribe((courses) => {
        this.createForm.get('courseId')?.setValue(courses[0].id);
        this.courses = courses;
      });

      this.studentService.getStudents().subscribe((students) => {
        this.createForm.get('studentId')?.setValue(students[0].id);
        this.students = students;
      });
    }
  }

  inputValid(inputName: 'courseId' | 'studentId' | 'status') {
    return (
      this.createForm.get(inputName)?.valid &&
      this.createForm.get(inputName)?.touched
    );
  }

  inputInvalid(inputName: 'courseId' | 'studentId' | 'status') {
    return (
      this.createForm.get(inputName)?.invalid &&
      this.createForm.get(inputName)?.touched &&
      this.createForm.get(inputName)?.dirty
    );
  }

  onSubmit(): void {
    console.log(this.createForm.value);

    if (!this.createForm.invalid) {
      if (!this.editingInscription) {
        this.matDialogRef.close({
          ...this.createForm.value,
          courseId: Number(this.createForm.get('courseId')?.value),
          studentId: Number(this.createForm.get('studentId')?.value),
        });
      } else {
        this.matDialogRef.close(this.createForm.value);
      }
    }
  }
}
