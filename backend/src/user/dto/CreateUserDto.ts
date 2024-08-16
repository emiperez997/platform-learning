import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { Role, Status } from "@prisma/client";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsEnum([Status.ACTIVE, Status.INACTIVE], {
    message: "Invalid status",
  })
  @IsNotEmpty()
  status: Status;

  @IsEnum([Role.ADMIN, Role.COORDINATOR], {
    message: "Invalid role",
  })
  @IsNotEmpty()
  role: Role;
}
