import { InscriptionStatus } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateInscriptionDto {
  @IsEnum(
    [
      InscriptionStatus.PENDING,
      InscriptionStatus.ACCEPTED,
      InscriptionStatus.REJECTED,
    ],
    {
      message: "Invalid status",
    },
  )
  status: InscriptionStatus;
}
