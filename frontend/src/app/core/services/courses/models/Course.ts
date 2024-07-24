import { Student } from '../../students/models/Student';
import { Teacher } from '../../teachers/models/Teacher';

export interface Course {
  id: number;
  title: string;
  description: string;
  beginDate: Date;
  endDate: Date;
  teacher?: Teacher;
  teacherId: number;
  students?: Student[];
  status: CourseStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const courseColumns: string[] = [
  'id',
  'title',
  'beginDate',
  'endDate',
  'status',
  'createdAt',
  'updatedAt',
  'actions',
];

export enum CourseStatus {
  SCHEDULED = 'SCHEDULED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}
