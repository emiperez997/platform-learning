import { CourseStatus } from "@prisma/client";
import { Inscription } from "src/inscription/interfaces/Inscription";
import { Teacher } from "src/teacher/interfaces/Teacher";

export interface Course {
  id: number;
  title: string;
  description: string;
  beginDate: Date;
  endDate: Date;
  status: CourseStatus;
  students?: Inscription[];
  createdAt: Date;
  updatedAt: Date;
  teacher?: Teacher;
  teacherId: number;
}
