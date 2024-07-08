import { Role, Status } from "@prisma/client";

export interface User {
  id: number;
  email: string;
  password: string;
  status: Status;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
