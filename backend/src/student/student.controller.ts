import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { StudentService } from "./student.service";
import { Admin } from "./interfaces/Admin.ts";

@Controller("/students")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudents(): Promise<Admin[]> {
    return this.studentService.findAll();
  }

  @Get("/:id")
  getStudentById(id: string): Promise<Admin> {
    return this.studentService.findOne(id);
  }

  @Get("/:id/courses")
  getStudentCourses(id: string): string {
    return `GET /students/${id}/courses`;
  }

  @Get("/:id/courses/:courseId")
  getStudentCourse(id: string, courseId: string): string {
    return `GET /students/${id}/courses/${courseId}`;
  }

  @Post()
  createStudent(): string {
    return "POST /students";
  }

  @Put("/:id")
  updateStudent(id: string): string {
    return `PUT /students/${id}`;
  }

  @Delete("/:id")
  deleteStudent(id: string): string {
    return `DELETE /students/${id}`;
  }
}
