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
import { StudentService } from "./student.service";
import { Student } from "./interfaces/Student";
import { CreateStudentDto } from "./dto/CreateStudentDto";
import { UpdateStudentDto } from "./dto/UpdateStudentDto";
import { AuthGuard } from "src/auth/guards/AuthGuard";

@Controller("/students")
// @UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudents(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get("/:id")
  getStudentById(@Param("id", ParseIntPipe) id: number): Promise<Student> {
    return this.studentService.findOne(Number(id));
  }

  @Get("/:id/courses")
  getStudentCourses(id: string): string {
    return `GET /students/${id}/courses`;
  }

  @Post()
  createStudent(
    @Body(ValidationPipe) student: CreateStudentDto,
  ): Promise<Student> {
    return this.studentService.create(student);
  }

  @Put("/:id")
  updateStudent(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) student: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentService.update(Number(id), student);
  }

  @Delete("/:id")
  deleteStudent(@Param("id", ParseIntPipe) id: number): Promise<Student> {
    return this.studentService.delete(Number(id));
  }
}
