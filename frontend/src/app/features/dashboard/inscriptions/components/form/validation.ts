import { Validators } from '@angular/forms';

export const formGroup = {
  courseId: ['', Validators.required],
  studentId: ['', Validators.required],
  status: ['', Validators.required],
};
