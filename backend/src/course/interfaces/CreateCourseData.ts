import { CourseStatus } from "@prisma/client";

export interface CreateCourseData {
  title?: string;
  description?: string;
  classNumber?: number;
  beginDate?: Date;
  endDate?: Date;
  status?: CourseStatus;
  categories?: string[];
  teacher?: {
    connect: {
      id: number;
    };
  };
}
