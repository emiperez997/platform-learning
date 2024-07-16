import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "@prisma/client";

export class UpdateTeacherDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum([Status.ACTIVE, Status.INACTIVE], {
    message: "Invalid status",
  })
  @IsOptional()
  status?: Status;
}
