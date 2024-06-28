import { Status } from "@prisma/client";

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
  courses?: string[];
}
