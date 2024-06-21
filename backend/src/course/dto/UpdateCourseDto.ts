import { CourseStatus } from '@prisma/client';

export class UpdateCourseDto {
  title?: string;
  description?: string;
  beginDate?: Date;
  endDate?: Date;
  categories?: string[];
  status?: CourseStatus;
  teacherId?: number;
}
