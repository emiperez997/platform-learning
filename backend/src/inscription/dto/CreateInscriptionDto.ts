import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { InscriptionStatus } from "@prisma/client";

export class CreateInscriptionDto {
  @IsInt()
  @IsNotEmpty()
  courseId: number;

  @IsInt()
  @IsNotEmpty()
  studentId: number;

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
