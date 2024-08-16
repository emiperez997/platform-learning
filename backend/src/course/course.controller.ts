import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { CourseService } from "./course.service";
import { Course } from "./interfaces/Course";
import { CreateCourseDto } from "./dto/CreateCourseDto";
import { UpdateCourseDto } from "./dto/UpdateCourseDto";
import { AuthGuard } from "src/auth/guards/AuthGuard";

@Controller("/courses")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Post()
  async create(@Body(ValidationPipe) course: CreateCourseDto): Promise<Course> {
    console.log(course);

    return this.courseService.create(course);
  }

  @Put("/:id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) course: UpdateCourseDto,
  ): Promise<Course> {
    return this.courseService.update(id, course);
  }

  @Delete("/:id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.courseService.delete(id);
  }
}
