import { Course } from '../../courses/models/Course';
import { Student } from '../../students/models/Student';

export interface Inscription {
  id: number;
  course?: Course;
  courseId: number;
  student?: Student;
  studentId: number;
  status: InscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum InscriptionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export const inscriptionColumns: string[] = [
  'id',
  'course',
  'student',
  'status',
  'createdAt',
  'updatedAt',
  'actions',
];
