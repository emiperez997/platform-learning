import { CourseStatus } from "@prisma/client";
import { Inscription } from "src/inscription/interfaces/Inscription";
import { Teacher } from "src/teacher/interfaces/Teacher";

export interface Course {
  id: number;
  title: string;
  description: string;
  classNumber: number;
  currentClass: number;
  beginDate: Date;
  endDate: Date;
  status: CourseStatus;
  categories: string[];
  students?: Inscription[];
  createdAt: Date;
  updatedAt: Date;
  teacher?: Teacher;
  teacherId: number;
}
