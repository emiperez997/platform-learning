import { Status } from '@prisma/client';

export class UpdateTeacherDto {
  firstName?: string;
  lastName?: string;
  status?: Status;
}
