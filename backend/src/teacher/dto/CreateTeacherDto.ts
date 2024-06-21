import { Status } from '@prisma/client';

export class CreateTeacherDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: Status;
}
