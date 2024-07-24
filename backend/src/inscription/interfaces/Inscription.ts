import { InscriptionStatus } from "@prisma/client";
import { Course } from "src/course/interfaces/Course";
import { Student } from "src/student/interfaces/Student";

export interface Inscription {
  id: number;
  courseId: number;
  studentId: number;
  course?: Course;
  student?: Student;
  status?: InscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}
