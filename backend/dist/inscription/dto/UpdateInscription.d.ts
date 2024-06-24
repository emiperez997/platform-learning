import { InscriptionStatus } from '@prisma/client';
export interface UpdateInscriptionDto {
    status: InscriptionStatus;
}
