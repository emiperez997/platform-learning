import { CourseStatus } from "@prisma/client";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  beginDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsEnum(
    [CourseStatus.STARTED, CourseStatus.FINISHED, CourseStatus.SCHEDULED],
    {
      message: "Invalid Status",
    },
  )
  status: CourseStatus;

  @IsInt()
  @IsNotEmpty()
  teacherId: number;
}
