import { Status } from "@prisma/client";
import { Inscription } from "src/inscription/interfaces/Inscription";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
  courses?: Inscription[];
}
