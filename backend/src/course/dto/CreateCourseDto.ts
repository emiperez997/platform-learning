import { CourseStatus } from '@prisma/client';

export class CreateCourseDto {
  title: string;
  description: string;
  classNumber: number;
  beginDate: Date;
  endDate: Date;
  categories: string[];
  status: CourseStatus;
  teacherId: number;
}
