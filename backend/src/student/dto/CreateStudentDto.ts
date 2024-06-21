import { Status } from '@prisma/client';

export class CreateStudentDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: Status;
}
