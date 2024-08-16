import { CourseStatus } from "@prisma/client";

export interface CreateCourseData {
  title?: string;
  description?: string;
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
