import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "@prisma/client";

export class UpdateTeacherDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEnum([Status.ACTIVE, Status.INACTIVE], {
    message: "Invalid status",
  })
  @IsOptional()
  status?: Status;
}
