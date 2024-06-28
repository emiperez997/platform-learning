import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { InscriptionStatus } from "@prisma/client";

export class CreateInscriptionDto {
  @IsInt()
  @IsNotEmpty()
  courseId: number;

  @IsInt()
  @IsNotEmpty()
  studentId: number;
}
