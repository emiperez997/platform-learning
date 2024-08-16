import { CourseStatus } from "@prisma/client";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  beginDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsEnum(
    [CourseStatus.STARTED, CourseStatus.FINISHED, CourseStatus.SCHEDULED],
    { message: "Invalid Status" },
  )
  @IsOptional()
  status?: CourseStatus;

  @IsInt()
  @IsOptional()
  teacherId?: number;
}
