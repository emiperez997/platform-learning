import { Status } from "@prisma/client";
import { Course } from "src/course/interfaces/Course";

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
  courses?: Course[];
}
