import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { StudentService } from "./student.service";
import { Student } from "./interfaces/Student";
import { CreateStudentDto } from "./dto/CreateStudentDto";
import { UpdateStudentDto } from "./dto/UpdateStudentDto";

@Controller("/students")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudents(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get("/:id")
  getStudentById(@Param("id") id: number): Promise<Student> {
    if (isNaN(Number(id))) {
      throw new HttpException("Invalid id", 400);
    }
    return this.studentService.findOne(Number(id));
  }

  @Get("/:id/courses")
  getStudentCourses(id: string): string {
    return `GET /students/${id}/courses`;
  }

  @Post()
  createStudent(@Body() student: CreateStudentDto): Promise<Student> {
    return this.studentService.create(student);
  }

  @Put("/:id")
  updateStudent(
    @Param("id") id: number,
    @Body() student: UpdateStudentDto,
  ): Promise<Student> {
    console.log(Number(id));

    if (isNaN(Number(id))) {
      throw new HttpException("Invalid id", 400);
    }
    return this.studentService.update(Number(id), student);
  }

  @Delete("/:id")
  deleteStudent(@Param() id: number): Promise<Student> {
    if (isNaN(Number(id))) {
      throw new HttpException("Invalid id", 400);
    }
    return this.studentService.delete(Number(id));
  }
}
