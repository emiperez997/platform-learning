import { InscriptionStatus } from '@prisma/client';

export interface CreateInscriptionDto {
  courseId: number;
  studentId: number;
  status: InscriptionStatus;
}
