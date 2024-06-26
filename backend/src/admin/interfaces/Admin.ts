import { Status } from "@prisma/client";

export interface Admin {
  id: number;
  email: string;
  password: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
