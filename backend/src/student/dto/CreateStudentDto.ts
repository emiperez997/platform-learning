import { Status } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum([Status.ACTIVE, Status.INACTIVE], {
    message: "Invalid status",
  })
  status: Status;
}
