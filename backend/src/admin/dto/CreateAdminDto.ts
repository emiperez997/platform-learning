import { Status } from '@prisma/client';

export interface CreateAdminDto {
  email: string;
  password: string;
  status: Status;
}
