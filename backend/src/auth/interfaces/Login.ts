import { Role } from "@prisma/client";

export interface Login {
  email: string;
  password?: string;
  sub?: number;
  role?: Role;
}
