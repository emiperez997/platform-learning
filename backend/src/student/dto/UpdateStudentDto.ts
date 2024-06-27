import { Status } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  @IsEnum([Status.ACTIVE, Status.INACTIVE], {
    message: "Invalid status",
  })
  status?: Status;
}
