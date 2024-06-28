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

  @IsInt()
  @IsNotEmpty()
  classNumber: number;

  @IsDateString()
  @IsNotEmpty()
  beginDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  categories: string[];

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
