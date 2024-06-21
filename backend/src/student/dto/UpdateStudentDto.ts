import { Status } from '@prisma/client';

export class UpdateStudentDto {
  firstName?: string;
  lastName?: string;
  status?: Status;
}
