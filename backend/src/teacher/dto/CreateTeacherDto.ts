import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Status } from "@prisma/client";

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum([Status.ACTIVE, Status.INACTIVE], {
    message: "Invalid status",
  })
  status: Status;
}
