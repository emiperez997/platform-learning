import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Status } from "@prisma/client";

export class CreateAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum([Status.ACTIVE, Status.INACTIVE], {
    message: "Invalid status",
  })
  @IsNotEmpty()
  status: Status;
}
